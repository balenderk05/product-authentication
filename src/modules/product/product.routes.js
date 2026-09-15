import express from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
  createProductSchema,
  updateProductSchema,
} from "./product.validation.js";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./product.controller.js";

const router = express.Router();

router.use(authenticate);

router.post("/", validate(createProductSchema), create);

router.get("/", getAll);

router.get("/:id", getOne);

router.patch("/:id", validate(updateProductSchema), update);

router.delete("/:id", remove);

export default router;
