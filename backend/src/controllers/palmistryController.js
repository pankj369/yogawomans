import asyncHandler from "express-async-handler";
import palmistryService from "../services/palmistryService.js";
import { AppError } from "../middleware/errorMiddleware.js";

/**
 * POST /api/palmistry/analyze
 */
export const analyzePalm = asyncHandler(async (req, res, next) => {
  const { uid } = req.user;
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return next(new AppError("Image URL is required for analysis", 400));
  }

  // Simulate analysis
  const report = await palmistryService.analyzePalm(uid, imageUrl);

  res.status(200).json({
    success: true,
    data: report,
  });
});

/**
 * POST /api/palmistry/save
 */
export const saveAnalysis = asyncHandler(async (req, res, next) => {
  const { uid } = req.user;
  const { report } = req.body;

  if (!report) {
    return next(new AppError("Report data is required", 400));
  }

  const savedReport = await palmistryService.saveAnalysis(uid, report);

  res.status(201).json({
    success: true,
    message: "Report saved successfully",
    data: savedReport,
  });
});

/**
 * GET /api/palmistry/history
 */
export const getAnalysisHistory = asyncHandler(async (req, res, next) => {
  const { uid } = req.user;

  const history = await palmistryService.getAnalysisHistory(uid);

  res.status(200).json({
    success: true,
    data: history,
  });
});
