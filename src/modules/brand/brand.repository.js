import Brand from "../auth/auth.model.js";

const findBrandById = async (brandId) => {
  return Brand.findById(brandId).select("-password");
};

const updateBrand = async (brandId, data) => {
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

export { findBrandById, updateBrand };
