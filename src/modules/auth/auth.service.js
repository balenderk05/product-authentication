import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  findBrandByEmail,
  findBrandByEmailWithPassword,
  createBrand,
} from "./auth.repository.js";

import AppError from "../../utils/AppError.js";

const registerBrand = async (data) => {
  const { name, email, password, phone, website } = data;

  const existingBrand = await findBrandByEmail(email);

  if (existingBrand) {
    throw new AppError("Brand with this email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const brand = await createBrand({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    phone,
    website,
  });

  return {
    id: brand._id,
    name: brand.name,
    email: brand.email,
    phone: brand.phone,
    website: brand.website,
  };
};

const loginBrand = async (data) => {
  const { email, password } = data;

  const brand = await findBrandByEmailWithPassword(email);

  if (!brand) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!brand.isActive) {
    throw new AppError("Brand account is inactive", 403);
  }

  const isPasswordValid = await bcrypt.compare(password, brand.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      brandId: brand._id.toString(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );

  return {
    token,
    brand: {
      id: brand._id,
      name: brand.name,
      email: brand.email,
      phone: brand.phone,
      website: brand.website,
    },
  };
};

export { registerBrand, loginBrand };
