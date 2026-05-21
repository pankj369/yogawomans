import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  logSession,
  getStats,
  getActivityHistory,
} from "../controllers/wellnessController.js";

const router = express.Router();

router.use(requireAuth); // Protect all wellness routes

router.post("/log", logSession);
router.get("/stats", getStats);
router.get("/activity", getActivityHistory);

export default router;