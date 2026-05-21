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
      username: username || email.split("@")[0],
      email,
      avatar: "",
      premiumStatus: false,
      streak: 0,
      createdAt: new Date().toISOString(),
      goals: [],
      preferences: {},
      onboardingCompleted: false,
    };

    await userRef.set(newUser);
    return newUser;
  }
}

export default new AuthService();
