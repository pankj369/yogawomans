import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getSession } from "../controllers/sessionController.js";

const router = express.Router();

router.get("/", authMiddleware, getSession);

export default router;