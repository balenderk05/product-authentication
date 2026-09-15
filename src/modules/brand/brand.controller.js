import { getProfile, updateProfile } from "./brand.service.js";

const getBrandProfile = async (req, res, next) => {
  try {
    const brand = await getProfile(req.brand._id);

    return res.status(200).json({
      success: true,
      message: "Brand profile fetched successfully",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const updateBrandProfile = async (req, res, next) => {
  try {
    const brand = await updateProfile(req.brand._id, req.body);

    return res.status(200).json({
      success: true,
      message: "Brand profile updated successfully",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

export { getBrandProfile, updateBrandProfile };
