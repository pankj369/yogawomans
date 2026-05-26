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
 * Chat with AI Wellness Coach
 * POST /api/coach/chat
 */
export const chatWithCoach = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { messages, mood } = req.body;

  if (!messages || !Array.isArray(messages)) {
    res.status(400);
    throw new Error("A valid messages array is required.");
  }

  // Fetch user profile for context
  const userDoc = await db.collection("users").doc(uid).get();
  const profile = userDoc.exists ? userDoc.data() : {};

  // Limit message history to last 10 messages to save tokens
  const trimmedMessages = messages.slice(-10);

  const aiReply = await aiService.chatWithCoach(trimmedMessages, profile, mood);

  // Grab the user's latest message to persist
  const newUserMessage = messages[messages.length - 1];
  
  // Create a structured AI message to persist
  const newAiMessage = {
    id: `coach-${Date.now()}`,
    sender: "coach",
    text: aiReply.content,
    timestamp: new Date().toISOString()
  };

  // Persist both messages
  await coachService.appendMessages(uid, [
    {
      id: `user-${Date.now()}`,
      sender: "user",
      text: newUserMessage.content,
      timestamp: new Date().toISOString()
    },
    newAiMessage
  ]);

  res.status(200).json({
    success: true,
    data: aiReply,
  });
});
