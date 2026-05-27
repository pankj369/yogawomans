import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";

class AuthService {
  async registerUser(uid, email, username) {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return userDoc.data();
    }

    const newUser = {
      uid,
      username: username || email.split("@")[0],
      email,
      avatar: "",
      premiumStatus: false,
      onboardingCompleted: false,
      wellnessGoals: [],
      preferences: {},
      streak: 0,
      calmScore: 0,
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

    // Extract goals separately and keep the rest in preferences
    const { goals, ...restPreferences } = preferences;

    const updates = {
      onboardingCompleted: true,
      wellnessGoals: goals || [],
      preferences: restPreferences || {},
      updatedAt: new Date().toISOString()
    };

    await userRef.update(updates);
    
    // Return updated user profile
    const updatedDoc = await userRef.get();
    return updatedDoc.data();
  }
}

export default new AuthService();
