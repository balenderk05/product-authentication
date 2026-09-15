import { ZipArchive } from "archiver";
import { Parser } from "json2csv";

import {
  findBatchById,
  markBatchAsExported,
} from "../../modules/batch/batch.repository.js";

import {
  findAllUnitsByBatch,
  markUnitsAsQrGenerated,
} from "../../modules/productUnit/productUnit.repository.js";

import {
  generateQRCodeBuffer,
  getVerificationUrl,
} from "../../utils/generateQRCode.js";

import AppError from "../../utils/AppError.js";

const exportBatch = async (batchId, brandId, res) => {
  const batch = await findBatchById(batchId, brandId);

  if (!batch) {
    throw new AppError("Batch not found", 404);
  }

  if (batch.exportStatus === "EXPORTED") {
    throw new AppError(
      "QR codes for this batch have already been exported",
      409,
    );
  }

  const units = await findAllUnitsByBatch(batchId, brandId);

  if (!units.length) {
    throw new AppError("No product units found for this batch", 404);
  }

  const csvRows = units.map((unit) => ({
    verificationCode: unit.verificationCode,

    verificationUrl: getVerificationUrl(unit.verificationCode),

    status: unit.status,

    createdAt: unit.createdAt,
  }));

  const parser = new Parser({
    fields: ["verificationCode", "verificationUrl", "status", "createdAt"],
  });

  const csv = parser.parse(csvRows);

  const fileName = `${batch.batchNumber}-export.zip`;

  res.setHeader("Content-Type", "application/zip");

  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

  const archive = new ZipArchive({
    zlib: {
      level: 9,
    },
  });

  archive.on("error", (error) => {
    console.error("ZIP archive error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Failed to create ZIP file",
      });
    } else {
      res.destroy(error);
    }
  });

  archive.pipe(res);

  archive.append(csv, {
    name: "codes.csv",
  });

  for (const unit of units) {
    const qrBuffer = await generateQRCodeBuffer(unit.verificationCode);

    archive.append(qrBuffer, {
      name: `qr/${unit.verificationCode}.png`,
    });
  }

  await archive.finalize();

  const exportedBatch = await markBatchAsExported(batchId, brandId);

  if (!exportedBatch) {
    console.error("Batch export status could not be updated");

    return;
  }

  await markUnitsAsQrGenerated(batchId, brandId);
};

export default exportBatch;
