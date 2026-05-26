import asyncHandler from "express-async-handler";
import suryaService from "../services/suryaService.js";
import { AppError } from "../middleware/errorMiddleware.js";

/**
 * GET /api/surya/recent
 */
export const getRecentSessions = asyncHandler(async (req, res, next) => {
  const { uid } = req.user;

  const sessions = await suryaService.getRecentSessions(uid);

  res.status(200).json({
    success: true,
    data: sessions,
  });
});

/**
 * POST /api/surya/save
 */
export const saveSession = asyncHandler(async (req, res, next) => {
  const { uid } = req.user;
  const { sessionData } = req.body;

  if (!sessionData) {
    return next(new AppError("Session data is required", 400));
  }

  const result = await suryaService.saveSession(uid, sessionData);

  res.status(201).json({
    success: true,
    message: "Session saved successfully",
    data: result,
  });
});

/**
 * GET /api/surya/streak
 */
export const getStreak = asyncHandler(async (req, res, next) => {
  const { uid } = req.user;

  const streak = await suryaService.getStreak(uid);

  res.status(200).json({
    success: true,
    data: streak,
  });
});
