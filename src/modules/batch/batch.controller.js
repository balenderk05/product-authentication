import {
  createNewBatch,
  getAllBatches,
  getBatchDetails,
  getBatchUnits,
} from "./batch.service.js";
import exportBatch from "../../services/export/batchExport.service.js";

const create = async (req, res, next) => {
  try {
    const result = await createNewBatch(
      req.params.productId,
      req.brand._id,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Batch and verification codes created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const result = await getBatchDetails(req.params.batchId, req.brand._id);

    return res.status(200).json({
      success: true,
      message: "Batch details fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUnits = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);

    const result = await getBatchUnits(
      req.params.batchId,
      req.brand._id,
      page,
      limit,
    );

    return res.status(200).json({
      success: true,
      message: "Batch units fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);

    const result = await getAllBatches(req.brand._id, page, limit);

    return res.status(200).json({
      success: true,
      message: "Batches fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const exportBatchFile = async (req, res, next) => {
  try {
    await exportBatch(req.params.batchId, req.brand._id, res);
  } catch (error) {
    next(error);
  }
};

export { create, getDetails, getUnits, getAll, exportBatchFile };
