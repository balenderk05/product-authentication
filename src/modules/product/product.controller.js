import {
  createNewProduct,
  getProducts,
  getProduct,
  updateExistingProduct,
  deleteProduct,
} from "./product.service.js";

const create = async (req, res, next) => {
  try {
    const product = await createNewProduct(req.brand._id, req.body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const products = await getProducts(req.brand._id);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const product = await getProduct(req.params.id, req.brand._id);

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const product = await updateExistingProduct(
      req.params.id,
      req.brand._id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await deleteProduct(req.params.id, req.brand._id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { create, getAll, getOne, update, remove };
