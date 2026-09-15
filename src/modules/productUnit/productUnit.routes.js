import express from "express";

import authenticate from "../../middleware/auth.middleware.js";




import { getUnits } from "./productUnit.controller.js";

const router = express.Router();

router.use(authenticate);


router.get("/products/:productId/units", getUnits);

export default router;
