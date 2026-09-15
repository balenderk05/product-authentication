import ProductUnit from "./productUnit.model.js";

const insertProductUnits = async (units) => {
  return ProductUnit.insertMany(units, {
    ordered: true,
  });
};

const findByVerificationCode = async (verificationCode) => {
  return ProductUnit.findOne({
    verificationCode,
    status: "ACTIVE",
  })
    .populate({
      path: "product",
      select:
        "name description category image manufacturer manufacturingCountry",
    })
    .populate({
      path: "brand",
      select: "name logo website",
    });
};

const findUnitsByProduct = async (productId, brandId) => {
  return ProductUnit.find({
    product: productId,
    brand: brandId,
  })
    .select("verificationCode status batch createdAt")
    .sort({
      createdAt: -1,
    });
};

const findUnitsByBatch = async (batchId, brandId, skip, limit) => {
  return ProductUnit.find({
    batch: batchId,
    brand: brandId,
  })
    .select("verificationCode status createdAt")
    .sort({
      createdAt: 1,
    })
    .skip(skip)
    .limit(limit);
};

const countUnitsByBatch = async (batchId, brandId) => {
  return ProductUnit.countDocuments({
    batch: batchId,
    brand: brandId,
  });
};

const findAllUnitsByBatch = async (batchId, brandId) => {
  return ProductUnit.find({
    batch: batchId,
    brand: brandId,
  })
    .select("verificationCode status createdAt")
    .sort({
      createdAt: 1,
    });
};

const markUnitsAsQrGenerated = async (batchId, brandId) => {
  return ProductUnit.updateMany(
    {
      batch: batchId,
      brand: brandId,
      qrGenerated: false,
    },
    {
      $set: {
        qrGenerated: true,
      },
    },
  );
};
export {
  insertProductUnits,
  findByVerificationCode,
  findUnitsByProduct,
  findUnitsByBatch,
  countUnitsByBatch,
  findAllUnitsByBatch,
  markUnitsAsQrGenerated,
};
