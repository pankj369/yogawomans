import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { chatWithCoach, getCoachHistory } from "../controllers/coachController.js";

import { aiRateLimiter, promptInjectionGuard } from "../middleware/aiSecurity.js";

const router = express.Router();

router.use(requireAuth);

router.get("/history", getCoachHistory);
router.post("/chat", aiRateLimiter, promptInjectionGuard, chatWithCoach);

export default router;
