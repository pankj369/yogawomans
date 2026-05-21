import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authMiddleware, getUser);

export default router;