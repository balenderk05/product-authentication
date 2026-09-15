import express from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import { createBatchSchema } from "./batch.validation.js";

import {
  create,
  getDetails,
  getUnits,
  getAll,
  exportBatchFile,
} from "./batch.controller.js";

const router = express.Router();

router.use(authenticate);

router.post(
  "/products/:productId/batches",
  validate(createBatchSchema),
  create,
);
router.get("/batches", getAll);

router.get("/batches/:batchId/export", exportBatchFile);
router.get("/batches/:batchId", getDetails);

router.get("/batches/:batchId/units", getUnits);

export default router;
