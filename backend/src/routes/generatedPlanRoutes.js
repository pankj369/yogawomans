import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  savePlan,
  getUserPlans,
  getPlanById,
  updatePlanProgress,
  generatePlan,
} from "../controllers/generatedPlanController.js";

const router = express.Router();

router.use(requireAuth); // Protect all plan routes

router.post("/generate", generatePlan);
router.post("/", savePlan);
router.get("/", getUserPlans);
router.get("/:id", getPlanById);
router.patch("/:id/progress", updatePlanProgress);

export default router;
