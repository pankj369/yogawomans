import { db } from "../config/firebaseAdmin.js";
import statsService from "./statsService.js";

class ActivityService {
  /**
   * Log a new completed wellness session
   */
  async logActivity(userId, activityData) {
    const { mediaId, type, duration } = activityData; // type: 'yoga' | 'meditation' | 'breathing'
    
    const activity = {
      userId,
      mediaId: mediaId || null,
      type,
      duration: Number(duration) || 0,
      completedAt: new Date().toISOString(),
    };

    const docRef = await db.collection("user_activity").add(activity);

    // Update global user wellness stats asynchronously
    await statsService.updateUserStats(userId, activity.duration, activity.type);

    return { id: docRef.id, ...activity };
  }

  /**
   * Fetch recent activity for a user
   */
  async getUserActivity(userId, limit = 20) {
    const snapshot = await db
      .collection("user_activity")
      .where("userId", "==", userId)
      .orderBy("completedAt", "desc")
      .limit(limit)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}

export default new ActivityService();
