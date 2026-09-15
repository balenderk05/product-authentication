import Brand from "./auth.model.js";

const findBrandByEmail = async (email) => {
  return Brand.findOne({
    email: email.toLowerCase(),
  });
};

const findBrandByEmailWithPassword = async (email) => {
  return Brand.findOne({
    email: email.toLowerCase(),
  }).select("+password");
};

const createBrand = async (data) => {
  return Brand.create(data);
};

const findBrandById = async (brandId) => {
  return Brand.findById(brandId).select("-password");
};

const updateBrandById = async (brandId, data) => {
  return Brand.findByIdAndUpdate(
    brandId,
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password");
};

export {
  findBrandByEmail,
  findBrandByEmailWithPassword,
  createBrand,
  findBrandById,
  updateBrandById,
};
