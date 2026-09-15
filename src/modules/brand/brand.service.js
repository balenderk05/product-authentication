import { findBrandById, updateBrand } from "./brand.repository.js";

import AppError from "../../utils/AppError.js";

const getProfile = async (brandId) => {
  const brand = await findBrandById(brandId);

  if (!brand) {
    throw new AppError("Brand not found", 404);
  }

  return brand;
};

const updateProfile = async (brandId, data) => {
  const brand = await updateBrand(brandId, data);

  if (!brand) {
    throw new AppError("Brand not found", 404);
  }

  return brand;
};

export { getProfile, updateProfile };
