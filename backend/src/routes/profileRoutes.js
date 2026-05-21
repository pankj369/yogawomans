import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getMyProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();



// GET CURRENT USER PROFILE
router.get("/me", authMiddleware, getMyProfile);



// UPDATE USER PROFILE
router.put("/update", authMiddleware, updateProfile);



export default router;