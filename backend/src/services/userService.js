import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";

class UserService {
  async getUserProfile(uid) {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new AppError("User not found", 404);
    }

    const data = userDoc.data();
    
    // Default structure for API response
    return {
      uid: data.uid,
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      premiumStatus: data.premiumStatus || false,
      streak: data.streak || 0,
      goals: data.goals || [],
      preferences: data.preferences || {},
      recentActivitySummary: [], // To be populated by progress APIs
    };
  }
}

export default new UserService();
