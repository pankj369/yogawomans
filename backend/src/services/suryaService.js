import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";

class SuryaService {
  /**
   * Fetch recent Surya Namaskar sessions for a user.
   */
  async getRecentSessions(uid) {
    const sessionsRef = db.collection("users").doc(uid).collection("surya_sessions");
    const snapshot = await sessionsRef.orderBy("date", "desc").limit(10).get();
    
    const sessions = [];
    snapshot.forEach((doc) => {
      sessions.push(doc.data());
    });
    
    return sessions;
  }

  /**
   * Save a completed Surya Namaskar practice session.
   */
  async saveSession(uid, sessionData) {
    const userRef = db.collection("users").doc(uid);
    const sessionsRef = userRef.collection("surya_sessions");
    
    const newSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...sessionData
    };
    
    const docRef = sessionsRef.doc(newSession.id);
    await docRef.set(newSession);
    
    // Update streak
    const userDoc = await userRef.get();
    let currentStreak = 0;
    if (userDoc.exists) {
      const data = userDoc.data();
      currentStreak = data.suryaStreak || 0;
    }
    
    currentStreak += 1;
    await userRef.set({ suryaStreak: currentStreak }, { merge: true });
    
    return { session: newSession, newStreak: currentStreak };
  }

  /**
   * Get current streak.
   */
  async getStreak(uid) {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      return userDoc.data().suryaStreak || 0;
    }
    return 0;
  }
}

export default new SuryaService();
