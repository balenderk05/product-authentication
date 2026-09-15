import {
  findBatchByNumber,
  createBatch,
  findBatchById,
  findBatchesByBrand,
  countBatchesByBrand,
} from "./batch.repository.js";

import { findProductById } from "../product/product.repository.js";

import {
  insertProductUnits,
  findUnitsByBatch,
  countUnitsByBatch,
} from "../productUnit/productUnit.repository.js";

import { generateUniqueCodes } from "../../utils/generateCode.js";

import AppError from "../../utils/AppError.js";

const createNewBatch = async (productId, brandId, data) => {
  const { batchNumber, quantity } = data;

  const product = await findProductById(productId, brandId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const existingBatch = await findBatchByNumber(brandId, batchNumber);

  if (existingBatch) {
    throw new AppError(
      "Batch with this batch number already exists. No new codes were generated.",
      409,
    );
  }

  const batch = await createBatch({
    batchNumber: batchNumber.toUpperCase(),
    product: product._id,
    brand: brandId,
    quantity,
    status: "ACTIVE",
  });

  const codes = generateUniqueCodes(quantity);

  const units = codes.map((verificationCode) => ({
    product: product._id,
    brand: brandId,
    batch: batch._id,
    verificationCode,
    status: "ACTIVE",
    qrGenerated: false,
  }));

  const createdUnits = await insertProductUnits(units);

  return {
    batch: {
      id: batch._id,
      batchNumber: batch.batchNumber,
      quantity: batch.quantity,
      status: batch.status,
    },

    product: {
      id: product._id,
      name: product.name,
    },

    totalGenerated: createdUnits.length,
  };
};

const getBatchDetails = async (batchId, brandId) => {
  const batch = await findBatchById(batchId, brandId);

  if (!batch) {
    throw new AppError("Batch not found", 404);
  }

  const totalUnits = await countUnitsByBatch(batchId, brandId);

  return {
    batch: {
      id: batch._id,
      batchNumber: batch.batchNumber,
      quantity: batch.quantity,
      exportStatus: batch.exportStatus,
      exportedAt: batch.exportedAt,
      status: batch.status,
      createdAt: batch.createdAt,
    },

    product: batch.product,

    totalUnits,
  };
};

const getBatchUnits = async (batchId, brandId, page = 1, limit = 50) => {
  const batch = await findBatchById(batchId, brandId);

  if (!batch) {
    throw new AppError("Batch not found", 404);
  }

  const skip = (page - 1) * limit;

  const [units, totalUnits] = await Promise.all([
    findUnitsByBatch(batchId, brandId, skip, limit),

    countUnitsByBatch(batchId, brandId),
  ]);

  const totalPages = Math.ceil(totalUnits / limit);

  return {
    batch: {
      id: batch._id,
      batchNumber: batch.batchNumber,
      product: batch.product,
    },

    pagination: {
      page,
      limit,
      totalUnits,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },

    units,
  };
};

const getAllBatches = async (brandId, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const [batches, totalBatches] = await Promise.all([
    findBatchesByBrand(brandId, skip, limit),

    countBatchesByBrand(brandId),
  ]);

  const totalPages = Math.ceil(totalBatches / limit);

  return {
    pagination: {
      page,
      limit,
      totalBatches,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },

    batches,
  };
};

export { createNewBatch, getBatchDetails, getBatchUnits, getAllBatches };
