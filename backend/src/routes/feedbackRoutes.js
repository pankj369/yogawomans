import express from "express";
import { submitFeedback } from "../controllers/feedbackController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Specific rate limiter for feedback to prevent spam
const feedbackLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds cooldown
  max: 1, // 1 request per 30 seconds
  message: {
    success: false,
    message: "You can only submit feedback once every 30 seconds. Please wait.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", feedbackLimiter, optionalAuth, submitFeedback);

export default router;
