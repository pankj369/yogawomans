import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getMyProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.use(requireAuth);

// GET CURRENT USER PROFILE
router.get("/me", getMyProfile);

// UPDATE USER PROFILE
router.put("/update", updateProfile);

export default router;