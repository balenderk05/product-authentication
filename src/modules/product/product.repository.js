import Product from "./product.model.js";

const createProduct = async (data) => {
  return Product.create(data);
};

const findProductById = async (productId, brandId) => {
  return Product.findOne({
    _id: productId,
    brand: brandId,
    isActive: true,
  });
};

const findProductsByBrand = async (brandId) => {
  return Product.find({
    brand: brandId,
    isActive: true,
  }).sort({
    createdAt: -1,
  });
};

const updateProduct = async (productId, brandId, data) => {
  return Product.findOneAndUpdate(
    {
      _id: productId,
      brand: brandId,
      isActive: true,
    },
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

const deactivateProduct = async (productId, brandId) => {
  return Product.findOneAndUpdate(
    {
      _id: productId,
      brand: brandId,
      isActive: true,
    },
    {
      $set: {
        isActive: false,
      },
    },
    {
      new: true,
    },
  );
};

export {
  createProduct,
  findProductById,
  findProductsByBrand,
  updateProduct,
  deactivateProduct,
};
