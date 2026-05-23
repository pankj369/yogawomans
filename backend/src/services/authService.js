import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";

class AuthService {
  async registerUser(uid, email, username) {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      throw new AppError("User already exists", 400);
    }

    const newUser = {
      uid,
      email,
      fullName: username || email.split("@")[0],
      onboarding: {
        completed: false,
        skipped: false,
        completedAt: null,
      },
      preferences: {
        wellnessGoal: "",
        yogaStyle: "",
        ambientSound: "",
        notificationsEnabled: true,
      },
      premiumStatus: {
        isPremium: false,
        planType: "free",
        expiresAt: null,
      },
      wellnessStats: {
        currentStreak: 0,
        longestStreak: 0,
        totalSessions: 0,
        totalMinutes: 0,
        calmScore: 0,
        lastActiveAt: new Date().toISOString(),
      },
      personalization: {
        recommendedLevel: "beginner",
        recentMood: "",
        aiPersona: "calm",
      },
      dashboardState: {
        continueJourneyPlanId: null,
        activeSessionId: null,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await userRef.set(newUser);
    return newUser;
  }

  async completeOnboarding(uid, preferences) {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new AppError("User not found", 404);
    }

    const updates = {
      "onboarding.completed": true,
      "onboarding.completedAt": new Date().toISOString(),
      "preferences.wellnessGoal": preferences.goal || "",
      "preferences.yogaStyle": preferences.style || "",
      "preferences.ambientSound": preferences.ambient || "",
      "updatedAt": new Date().toISOString()
    };

    await userRef.update(updates);
    
    // Return updated user profile
    const updatedDoc = await userRef.get();
    return updatedDoc.data();
  }
}

export default new AuthService();
