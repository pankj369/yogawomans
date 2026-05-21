import asyncHandler from "express-async-handler";
import activityService from "../services/activityService.js";
import statsService from "../services/statsService.js";

/**
 * Log a completed wellness session (Yoga, Meditation, etc.)
 * POST /api/wellness/log
 */
export const logSession = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const { mediaId, type, duration } = req.body;

  if (!type || !duration) {
    res.status(400);
    throw new Error("Please provide type and duration for the session");
  }

  const activity = await activityService.logActivity(userId, { mediaId, type, duration });

  res.status(201).json({
    success: true,
    message: "Session logged successfully",
    data: activity,
  });
});

/**
 * Get user's aggregated wellness stats
 * GET /api/wellness/stats
 */
export const getStats = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;

  const stats = await statsService.getUserStats(userId);

  res.status(200).json({
    success: true,
    data: stats,
  });
});

/**
 * Get recent activity history
 * GET /api/wellness/activity
 */
export const getActivityHistory = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const limit = req.query.limit ? parseInt(req.query.limit) : 20;

  const activities = await activityService.getUserActivity(userId, limit);

  res.status(200).json({
    success: true,
    data: activities,
  });
});