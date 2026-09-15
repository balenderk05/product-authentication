
import {
    findUnitsByProduct
} from "./productUnit.repository.js";

import {
    findProductById
} from "../product/product.repository.js";

import AppError from "../../utils/AppError.js";



const getProductUnits = async (
    productId,
    brandId
) => {
    const product = await findProductById(
        productId,
        brandId
    );

    if (!product) {
        throw new AppError(
            "Product not found",
            404
        );
    }

    return findUnitsByProduct(
        productId,
        brandId
    );
};



export {
    // generateProductCodes,
    getProductUnits
};