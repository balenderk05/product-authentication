import Batch from "./batch.model.js";

const findBatchByNumber = async (brandId, batchNumber) => {
  return Batch.findOne({
    brand: brandId,
    batchNumber: batchNumber.toUpperCase(),
  });
};

const createBatch = async (data) => {
  return Batch.create(data);
};

const findBatchById = async (batchId, brandId) => {
  return Batch.findOne({
    _id: batchId,
    brand: brandId,
  }).populate({
    path: "product",
    select: "name category image manufacturer",
  });
};

const findBatchesByBrand = async (brandId, skip, limit) => {
  return Batch.find({
    brand: brandId,
  })
    .populate({
      path: "product",
      select: "name category image",
    })
    .select("batchNumber product quantity exportStatus exportedAt status createdAt")
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);
};

const countBatchesByBrand = async (brandId) => {
  return Batch.countDocuments({
    brand: brandId,
  });
};

const countBatchesByProduct = async (productId, brandId) => {
  return Batch.countDocuments({
    product: productId,
    brand: brandId,
  });
};

const markBatchAsExported = async (batchId, brandId) => {
  return Batch.findOneAndUpdate(
    {
      _id: batchId,
      brand: brandId,
      exportStatus: "NOT_EXPORTED",
    },
    {
      $set: {
        exportStatus: "EXPORTED",
        exportedAt: new Date(),
      },
    },
    {
      new: true,
    },
  );
};

export {
  findBatchByNumber,
  createBatch,
  findBatchById,
  findBatchesByBrand,
  countBatchesByBrand,
  countBatchesByProduct,
  markBatchAsExported,
};
