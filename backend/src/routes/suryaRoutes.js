import express from "express";
import { getRecentSessions, saveSession, getStreak } from "../controllers/suryaController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/recent", getRecentSessions);
router.post("/save", saveSession);
router.get("/streak", getStreak);

export default router;
