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
    full_name,
    username,
    avatar,
    phone,
    age,
    gender,
    height,
    weight,
    wellness_goal,
    experience_level,
    preferred_yoga_style,
    onboarding_completed,
    isPremium, // Optional explicit triggers
  } = req.body;

  const updateData = {
    full_name,
    username,
    avatar,
    phone,
    age,
    gender,
    height,
    weight,
    wellness_goal,
    experience_level,
    preferred_yoga_style,
    onboarding_completed,
    isPremium,
    updated_at: new Date().toISOString(),
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