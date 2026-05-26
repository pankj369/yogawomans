import express from "express";
import { analyzePalm, saveAnalysis, getAnalysisHistory } from "../controllers/palmistryController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.post("/analyze", analyzePalm);
router.post("/save", saveAnalysis);
router.get("/history", getAnalysisHistory);

export default router;
