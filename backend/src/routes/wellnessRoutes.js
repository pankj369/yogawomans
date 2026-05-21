import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createWellnessLog,
} from "../controllers/wellnessController.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createWellnessLog
);

export default router;