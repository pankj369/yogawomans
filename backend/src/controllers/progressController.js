import asyncHandler from "express-async-handler";
import progressService from "../services/progressService.js";

/**
 * Save user continue watching progress
 * POST /api/progress
 */
export const saveProgress = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const { mediaId, progressSeconds } = req.body;

  if (!mediaId || progressSeconds === undefined) {
    res.status(400);
    throw new Error("Please provide mediaId and progressSeconds");
  }

  const savedProgress = await progressService.saveProgress(userId, mediaId, progressSeconds);

  res.status(200).json({
    success: true,
    message: "Progress saved",
    data: savedProgress,
  });
});

/**
 * Fetch continue watching history for the user
 * GET /api/progress
 */
export const getProgress = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;

  const progressList = await progressService.getContinueWatching(userId, limit);

  res.status(200).json({
    success: true,
    data: progressList,
  });
});
