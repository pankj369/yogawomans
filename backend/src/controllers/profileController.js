import { db } from "../config/firebaseAdmin.js";
import asyncHandler from "express-async-handler";
import aiService from "../services/aiService.js";

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

// GET OR GENERATE AI WELLNESS PROFILE
export const getAIWellnessProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const userDoc = await db.collection("users").doc(userId).get();

  if (!userDoc.exists) {
    res.status(404);
    throw new Error("Profile not found");
  }

  const userData = userDoc.data();
  
  // If it already exists, return it
  if (userData.aiWellnessProfile) {
    return res.status(200).json({
      success: true,
      data: userData.aiWellnessProfile
    });
  }

  // Otherwise, generate it using the onboarding preferences
  const preferences = userData.preferences || {};
  const goals = userData.wellnessGoals || [];
  
  const profileData = {
    ...preferences,
    goals,
    age: preferences.age,
    gender: preferences.gender,
    stressLevel: preferences.stressLevel,
    sleepQuality: preferences.sleepQuality,
    activityLevel: preferences.activityLevel,
    yogaExperience: preferences.yogaExperience,
    medicalConditions: preferences.medicalConditions,
    injuries: preferences.injuries
  };

  const aiWellnessProfile = await aiService.generateWellnessProfile(profileData);

  // Save back to Firestore
  await db.collection("users").doc(userId).update({
    aiWellnessProfile,
    updatedAt: new Date().toISOString()
  });

  return res.status(200).json({
    success: true,
    message: "AI Wellness Profile generated successfully",
    data: aiWellnessProfile
  });
});