import asyncHandler from "express-async-handler";
import generatedPlanService from "../services/generatedPlanService.js";

/**
 * Generate a new plan via AI and save it
 * POST /api/plans/generate
 */
export const generatePlan = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { preferences, duration, focus } = req.body;

  if (!preferences || !duration || !focus) {
    res.status(400);
    throw new Error("preferences, duration, and focus are required");
  }

  const generatedPlan = await generatedPlanService.generateAndSavePlan(uid, preferences, duration, focus);

  res.status(201).json({
    success: true,
    message: "AI Plan generated successfully",
    data: generatedPlan,
  });
});

/**
 * Save a newly generated plan (Legacy/Frontend Generated)
 * POST /api/plans
 */
export const savePlan = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const planData = req.body;

  if (!planData || Object.keys(planData).length === 0) {
    res.status(400);
    throw new Error("Plan data is required");
  }

  const savedPlan = await generatedPlanService.savePlan(uid, planData);

  res.status(201).json({
    success: true,
    message: "Plan saved successfully",
    data: savedPlan,
  });
});

/**
 * Get all saved plans for the current user
 * GET /api/plans
 */
export const getUserPlans = asyncHandler(async (req, res) => {
  const { uid } = req.user;

  const plans = await generatedPlanService.getUserPlans(uid);

  res.status(200).json({
    success: true,
    message: "Plans retrieved successfully",
    data: plans,
  });
});

/**
 * Get a specific plan by ID
 * GET /api/plans/:id
 */
export const getPlanById = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { id } = req.params;

  const plan = await generatedPlanService.getPlanById(id, uid);

  res.status(200).json({
    success: true,
    message: "Plan retrieved successfully",
    data: plan,
  });
});

/**
 * Update plan progress
 * PATCH /api/plans/:id/progress
 */
export const updatePlanProgress = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { id } = req.params;
  const { completionPercentage } = req.body;

  if (completionPercentage === undefined) {
    res.status(400);
    throw new Error("completionPercentage is required");
  }

  const updatedPlan = await generatedPlanService.updateProgress(id, uid, completionPercentage);

  res.status(200).json({
    success: true,
    message: "Plan progress updated",
    data: updatedPlan,
  });
});
