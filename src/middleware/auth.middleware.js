import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";

import { findBrandById } from "../modules/auth/auth.repository.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication token is required", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const brand = await findBrandById(decoded.brandId);

    if (!brand) {
      throw new AppError("Brand account not found", 401);
    }

    if (!brand.isActive) {
      throw new AppError("Brand account is inactive", 403);
    }

    req.brand = brand;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid authentication token", 401));
    }

    if (error.name === "TokenExpiredError") {
      return next(new AppError("Authentication token expired", 401));
    }

    next(error);
  }
};

export default authenticate;
