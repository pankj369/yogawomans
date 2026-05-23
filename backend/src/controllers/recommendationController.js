import asyncHandler from "express-async-handler";
import recommendationService from "../services/recommendationService.js";

/**
 * Get personalized dashboard insights and recommendations
 * GET /api/recommendations/dashboard
 */
export const getDashboardRecommendations = asyncHandler(async (req, res) => {
  const { uid } = req.user;

  const data = await recommendationService.getDashboardRecommendations(uid);

  res.status(200).json({
    success: true,
    message: "Recommendations generated successfully",
    data,
  });
});
