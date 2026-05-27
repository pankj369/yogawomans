import asyncHandler from "express-async-handler";
import authService from "../services/authService.js";
import userService from "../services/userService.js";
import { AppError } from "../middleware/errorMiddleware.js";
import { auth } from "../config/firebaseAdmin.js";

/**
 * Register a new user in Firestore
 * POST /api/auth/register
 * Expects Firebase Bearer token in headers to be pre-verified by middleware, OR
 * expects the frontend to send the token in the body for initial registration if not using middleware.
 * We will use the middleware, so `req.user` is available.
 */
export const register = asyncHandler(async (req, res, next) => {
  const { uid, email, name } = req.user; // Provided by requireAuth middleware
  
  const newUser = await authService.registerUser(uid, email, name || req.body.username);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: newUser,
  });
});

/**
 * Login user
 * POST /api/auth/login
 * The frontend already authenticates with Firebase and gets the token.
 * This route just acts as a sync/handshake to ensure the user document exists
 * or to update a lastLogin timestamp.
 */
export const login = asyncHandler(async (req, res, next) => {
  const { uid, email, name } = req.user; // Provided by requireAuth middleware

  let userProfile;
  try {
    userProfile = await userService.getUserProfile(uid);
  } catch (error) {
    if (error.statusCode === 404 || error.message === "User not found") {
      console.log(`Auto-registering missing Firestore profile for UID: ${uid}`);
      userProfile = await authService.registerUser(uid, email, name);
    } else {
      throw error;
    }
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: userProfile,
  });
});

/**
 * Get current authenticated user profile
 * GET /api/auth/me
 */
export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const { uid, email, name } = req.user;

  let userProfile;
  try {
    userProfile = await userService.getUserProfile(uid);
  } catch (error) {
    if (error.statusCode === 404 || error.message === "User not found") {
      console.log(`Auto-registering missing Firestore profile for UID: ${uid}`);
      userProfile = await authService.registerUser(uid, email, name);
    } else {
      throw error;
    }
  }

  res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    data: userProfile,
  });
});

/**
 * Complete onboarding and save preferences
 * POST /api/auth/onboarding
 */
export const completeOnboarding = asyncHandler(async (req, res, next) => {
  const { uid } = req.user;
  const preferences = req.body;

  const updatedProfile = await authService.completeOnboarding(uid, preferences);

  res.status(200).json({
    success: true,
    message: "Onboarding completed successfully",
    data: updatedProfile,
  });
});

/**
 * Logout
 * POST /api/auth/logout
 * Mostly handled on frontend for Firebase, but backend can optionally revoke refresh tokens.
 */
export const logout = asyncHandler(async (req, res, next) => {
  const { uid } = req.user;
  
  // Optionally revoke all tokens for this user
  await auth.revokeRefreshTokens(uid);

  res.status(200).json({
    success: true,
    message: "Logged out successfully across all devices",
  });
});

