import express from "express";


import { verificationCodeSchema } from "./verification.validation.js";

import { verify } from "./verification.controller.js";

const router = express.Router();

router.get(
  "/:code",
  (req, res, next) => {
    const result = verificationCodeSchema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    next();
  },
  verify,
);

export default router;
