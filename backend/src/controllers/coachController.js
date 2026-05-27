import asyncHandler from "express-async-handler";
import aiService from "../services/aiService.js";
import coachService from "../services/coachService.js";
import { db } from "../config/firebaseAdmin.js";

/**
 * Get AI Coach conversation history
 * GET /api/coach/history
 */
export const getCoachHistory = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const history = await coachService.getHistory(uid);

  res.status(200).json({
    success: true,
    data: history,
  });
});

/**
 * Chat with AI Wellness Coach (Streaming SSE)
 * POST /api/coach/chat
 */
export const chatWithCoach = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { message } = req.body;

  if (!message) {
    res.status(400);
    throw new Error("A valid message string is required.");
  }

  // Fetch user profile for context
  const userDoc = await db.collection("users").doc(uid).get();
  const profile = userDoc.exists ? userDoc.data() : {};

  // Delegate entirely to chatbotAI stream function
  // It handles SSE response formatting directly
  const chatbotAI = (await import("../services/ai/chatbotAI.js")).default;
  await chatbotAI.chatWithCoachStream(message, profile, uid, res);
});
