import asyncHandler from "express-async-handler";
import aiService from "../services/aiService.js";
import { db } from "../config/firebaseAdmin.js";

/**
 * Chat with AI Wellness Coach
 * POST /api/coach/chat
 */
export const chatWithCoach = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    res.status(400);
    throw new Error("A valid messages array is required.");
  }

  // Fetch user profile for context
  const userDoc = await db.collection("users").doc(uid).get();
  const profile = userDoc.exists ? userDoc.data() : {};

  // Limit message history to last 10 messages to save tokens
  const trimmedMessages = messages.slice(-10);

  const aiReply = await aiService.chatWithCoach(trimmedMessages, profile);

  res.status(200).json({
    success: true,
    data: aiReply,
  });
});
