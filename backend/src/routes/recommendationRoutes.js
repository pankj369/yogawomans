import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getDashboardRecommendations } from "../controllers/recommendationController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/dashboard", getDashboardRecommendations);

export default router;
