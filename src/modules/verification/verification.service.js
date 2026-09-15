import {
    findActiveProductByCode
} from "./verification.repository.js";

import AppError from "../../utils/AppError.js";

const verifyProduct = async (
    verificationCode
) => {
    const code =
        verificationCode
            .trim()
            .toUpperCase();

    const productUnit =
        await findActiveProductByCode(
            code
        );

    if (!productUnit) {
        throw new AppError(
            "Invalid or counterfeit product code",
            404
        );
    }

    if (!productUnit.product) {
        throw new AppError(
            "Product information not found",
            404
        );
    }

    return {
        verified: true,

        product: {
            id: productUnit.product._id,
            name: productUnit.product.name,
            description:
                productUnit.product.description,
            category:
                productUnit.product.category,
            image:
                productUnit.product.image,
            manufacturer:
                productUnit.product.manufacturer,
            manufacturingCountry:
                productUnit.product
                    .manufacturingCountry
        },

        brand: {
            id: productUnit.brand?._id,
            name: productUnit.brand?.name,
            logo: productUnit.brand?.logo,
            website:
                productUnit.brand?.website
        }
    };
};

export default verifyProduct;