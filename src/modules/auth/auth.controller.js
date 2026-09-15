import { registerBrand, loginBrand } from "./auth.service.js";

const register = async (req, res, next) => {
  try {
    const brand = await registerBrand(req.body);

    return res.status(201).json({
      success: true,
      message: "Brand registered successfully",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await loginBrand(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login };
