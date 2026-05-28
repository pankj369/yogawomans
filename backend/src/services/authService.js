import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";

class AuthService {
  async registerUser(uid, email, username) {
    try {
      const userRef = db.collection("users").doc(uid);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        // Ensure critical fields exist
        const data = userDoc.data();
        if (data.premiumStatus === undefined) await userRef.update({ premiumStatus: false });
        if (data.streak === undefined) await userRef.update({ streak: 0 });
        return { ...data, premiumStatus: data.premiumStatus || false, streak: data.streak || 0 };
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
    } catch (error) {
      throw new AppError("Failed to register user in database: " + error.message, 500);
    }
  }

  async completeOnboarding(uid, preferences) {
    try {
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
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to update user profile: " + error.message, 500);
    }
  }
}

export default new AuthService();
