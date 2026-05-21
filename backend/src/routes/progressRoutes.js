import express from "express";
import {
  saveProgress,
  getProgress,
} from "../controllers/progressController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", saveProgress);
router.get("/", getProgress);

export default router;
