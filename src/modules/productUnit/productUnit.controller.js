import {
 
  getProductUnits,
} from "./productUnit.service.js";



const getUnits = async (req, res, next) => {
  try {
    const units = await getProductUnits(req.params.productId, req.brand._id);

    return res.status(200).json({
      success: true,
      message: "Product units fetched successfully",
      length: units.length,
      data: units,
    });
  } catch (error) {
    next(error);
  }
};

export { getUnits };
