import { db } from "../config/firebaseAdmin.js";
import asyncHandler from "express-async-handler";

// GET CURRENT USER PROFILE
export const getMyProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;

  const userDoc = await db.collection("users").doc(userId).get();

  if (!userDoc.exists) {
    res.status(404);
    throw new Error("Profile not found");
  }

  return res.status(200).json({
    success: true,
    profile: { id: userDoc.id, ...userDoc.data() },
  });
});

// UPDATE USER PROFILE
export const updateProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;

  const {
    username,
    avatar,
    wellnessGoals,
    preferences,
    onboardingCompleted,
    premiumStatus,
    streak,
    calmScore,
  } = req.body;

  const updateData = {
    username,
    avatar,
    wellnessGoals,
    preferences,
    onboardingCompleted,
    premiumStatus,
    streak,
    calmScore,
    updatedAt: new Date().toISOString(),
  };

  // Remove undefined values
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === undefined) delete updateData[key];
  });

  const userRef = db.collection("users").doc(userId);
  await userRef.set(updateData, { merge: true });

  const updatedDoc = await userRef.get();

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    profile: { id: updatedDoc.id, ...updatedDoc.data() },
  });
});