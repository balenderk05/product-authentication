import verifyProduct from "./verification.service.js";

const verify = async (
    req,
    res,
    next
) => {
    try {
        const result =
            await verifyProduct(
                req.params.code
            );

        return res.status(200).json({
            success: true,
            message:
                "Product is genuine",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export {
    verify
};