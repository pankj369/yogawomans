import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { chatWithCoach, getCoachHistory } from "../controllers/coachController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/history", getCoachHistory);
router.post("/chat", chatWithCoach);

export default router;
