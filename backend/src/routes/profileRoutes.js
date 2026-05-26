import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getMyProfile,
  updateProfile,
  getAIWellnessProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.use(requireAuth);

// GET CURRENT USER PROFILE
router.get("/me", getMyProfile);

// UPDATE USER PROFILE
router.put("/update", updateProfile);

// GET AI WELLNESS PROFILE
router.get("/ai-wellness", getAIWellnessProfile);

export default router;