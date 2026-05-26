import asyncHandler from "express-async-handler";
import recommendationService from "../services/recommendationService.js";

/**
 * Get personalized dashboard insights and recommendations
 * GET /api/recommendations/dashboard
 */
export const getDashboardRecommendations = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { mood } = req.query;

  const data = await recommendationService.getDashboardRecommendations(uid, mood);

  res.status(200).json({
    success: true,
    message: "Recommendations generated successfully",
    data,
  });
});

/**
 * Dismiss a recommendation
 * POST /api/recommendations/dismiss/:mediaId
 */
export const dismissRecommendation = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { mediaId } = req.params;

  await recommendationService.dismissRecommendation(uid, mediaId);

  res.status(200).json({
    success: true,
    message: "Recommendation dismissed",
  });
});
