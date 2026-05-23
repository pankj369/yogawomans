import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { chatWithCoach } from "../controllers/coachController.js";

const router = express.Router();

router.use(requireAuth);

router.post("/chat", chatWithCoach);

export default router;
