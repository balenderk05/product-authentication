import express from "express";

import authenticate from "../../middleware/auth.middleware.js";

import { getBrandProfile, updateBrandProfile } from "./brand.controller.js";

import validate from "../../middleware/validate.middleware.js";

import updateBrandSchema from "./brand.validation.js";

const router = express.Router();

router.use(authenticate);

router.get("/profile", getBrandProfile);

router.patch("/profile", validate(updateBrandSchema), updateBrandProfile);

export default router;
