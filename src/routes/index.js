import express from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import brandRoutes from "../modules/brand/brand.routes.js";
import productRoutes from "../modules/product/product.routes.js";
import productUnitRoutes from "../modules/productUnit/productUnit.routes.js";
import verificationRoutes from "../modules/verification/verification.routes.js";
import batchRoutes from "../modules/batch/batch.routes.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Authentication API",
    version: "1.0.0",
  });
});

router.use("/verify", verificationRoutes);
router.use("/auth", authRoutes);

router.use("/brands", brandRoutes);
router.use("/products", productRoutes);
router.use("/", productUnitRoutes);
router.use("/", batchRoutes);

export default router;
