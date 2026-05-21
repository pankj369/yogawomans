import { db } from "../config/firebaseAdmin.js";

class ProgressService {
  /**
   * Save or update continue watching progress
   */
  async saveProgress(userId, mediaId, progressSeconds) {
    const progressRef = db.collection("continue_watching").doc(`${userId}_${mediaId}`);
    
    const progressData = {
      userId,
      mediaId,
      progressSeconds,
      lastWatchedAt: new Date().toISOString(),
    };

    await progressRef.set(progressData, { merge: true });
    return progressData;
  }

  /**
   * Get continue watching history for a user
   */
  async getContinueWatching(userId, limit = 10) {
    const snapshot = await db
      .collection("continue_watching")
      .where("userId", "==", userId)
      .orderBy("lastWatchedAt", "desc")
      .limit(limit)
      .get();

    if (snapshot.empty) return [];

    const progressList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Fetch media metadata for each progress item
    const mediaIds = progressList.map(item => item.mediaId);
    
    // We must chunk queries into batches of 10 for Firestore 'in' query if there are many.
    // For continue watching, limit is usually small.
    if (mediaIds.length === 0) return [];

    const mediaSnapshot = await db
      .collection("media")
      .where("__name__", "in", mediaIds)
      .get();

    const mediaMap = {};
    mediaSnapshot.forEach(doc => {
      mediaMap[doc.id] = { id: doc.id, ...doc.data() };
    });

    // Merge metadata
    return progressList.map(item => ({
      ...item,
      media: mediaMap[item.mediaId] || null,
    }));
  }
}

export default new ProgressService();
