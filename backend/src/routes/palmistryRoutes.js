import express from "express";
import { analyzePalm, saveAnalysis, getAnalysisHistory } from "../controllers/palmistryController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

import { visionRateLimiter } from "../middleware/aiSecurity.js";

const router = express.Router();

router.use(requireAuth);

router.post("/analyze", visionRateLimiter, analyzePalm);
router.post("/save", saveAnalysis);
router.get("/history", getAnalysisHistory);

export default router;
