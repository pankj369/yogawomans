import { db } from "../../config/firebaseAdmin.js";

class MoodAI {
  /**
   * Gets the user's latest mood entry.
   */
  async getLatestMood(uid) {
    if (!db || !uid) return "Calm"; // Default fallback
    try {
      const snapshot = await db
        .collection("users")
        .doc(uid)
        .collection("ai_mood_logs")
        .orderBy("timestamp", "desc")
        .limit(1)
        .get();

      if (!snapshot.empty) {
        return snapshot.docs[0].data().mood;
      }
      return "Calm";
    } catch (error) {
      console.error("Error retrieving mood:", error);
      return "Calm";
    }
  }

  /**
   * Saves a new mood entry.
   */
  async saveMood(uid, mood, source = "manual") {
    if (!db || !uid) return;
    try {
      await db
        .collection("users")
        .doc(uid)
        .collection("ai_mood_logs")
        .add({
          mood,
          source, // 'manual' or 'inferred'
          timestamp: new Date().toISOString()
        });
      
      // Update the user's profile with current mood for quick access
      await db.collection("users").doc(uid).update({ currentMood: mood });
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  }
}

export default new MoodAI();
