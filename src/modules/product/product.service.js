import {
  createProduct,
  findProductById,
  findProductsByBrand,
  updateProduct,
  deactivateProduct,
} from "./product.repository.js";

import AppError from "../../utils/AppError.js";

const createNewProduct = async (brandId, data) => {
  const product = await createProduct({
    ...data,
    brand: brandId,
  });

  return product;
};

const getProducts = async (brandId) => {
  return findProductsByBrand(brandId);
};

const getProduct = async (productId, brandId) => {
  const product = await findProductById(productId, brandId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

const updateExistingProduct = async (productId, brandId, data) => {
  const product = await updateProduct(productId, brandId, data);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

const deleteProduct = async (productId, brandId) => {
  const product = await deactivateProduct(productId, brandId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

export {
  createNewProduct,
  getProducts,
  getProduct,
  updateExistingProduct,
  deleteProduct,
};
