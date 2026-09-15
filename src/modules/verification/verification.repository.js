import ProductUnit from "../productUnit/productUnit.model.js";

const findActiveProductByCode = async (
    verificationCode
) => {
    return ProductUnit.findOne({
        verificationCode: verificationCode.toUpperCase(),
        status: "ACTIVE"
    })
        .populate({
            path: "product",
            select: "name description category image manufacturer manufacturingCountry"
        })
        .populate({
            path: "brand",
            select: "name logo website"
        });
};

export {
    findActiveProductByCode
};