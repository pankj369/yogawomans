import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getDashboardRecommendations, dismissRecommendation } from "../controllers/recommendationController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/dashboard", getDashboardRecommendations);
router.post("/dismiss/:mediaId", dismissRecommendation);

export default router;
