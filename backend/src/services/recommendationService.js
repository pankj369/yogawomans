import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";
import aiService from "./aiService.js";
import recommendationAI from "./ai/recommendationAI.js";

const mediaCatalog = [
  { id: "sunrise-vinyasa", title: "Sunrise Vinyasa Flow", category: "yoga", tags: ["Flow", "Energy", "Morning"], level: "All levels", premium: false },
  { id: "deep-yin", title: "Deep Yin Release", category: "yoga", tags: ["Yin", "Restorative", "Evening", "stress relief", "anxiety"], level: "Gentle", premium: true },
  { id: "power-core", title: "Power Core Yoga", category: "yoga", tags: ["Strength", "Core", "Power", "energy"], level: "Intermediate", premium: true },
  { id: "sacred-stillness", title: "Sacred Stillness", category: "meditation", tags: ["Meditation", "Stillness", "Breath", "anxiety", "stress relief"], level: "All levels", premium: false },
  { id: "breath-reset", title: "Breath Reset", category: "breathwork", tags: ["Breath", "Reset", "Calm", "anxiety"], level: "Beginner", premium: false },
  { id: "morning-sun", title: "Morning Sun Salutation", category: "yoga", tags: ["Sun", "Flow", "Strength", "morning", "energy"], level: "All levels", premium: false },
];

class RecommendationService {
  async getDashboardRecommendations(uid, mood) {
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) throw new AppError("User not found", 404);
    
    const userData = userDoc.data();
    const preferences = userData.preferences || {};
    const stats = userData.wellnessStats || { currentStreak: 0, calmScore: 0, totalSessions: 0 };
    const dismissed = preferences.dismissedRecommendations || [];

    const historySnapshot = await db.collection("continue_watching")
      .where("userId", "==", uid)
      .orderBy("lastWatchedAt", "desc")
      .limit(5)
      .get();
    
    const recentMediaIds = historySnapshot.docs.map(doc => doc.data().mediaId);
    const insightData = await aiService.generateInsights(userData, stats, historySnapshot.docs, mood);

    // Call modular recommendation scoring engine
    const scoredCatalog = recommendationAI.scoreCatalog(mediaCatalog, preferences, recentMediaIds, mood, uid);
    const recommendedSessions = scoredCatalog.slice(0, 3);

    // Save history
    await db.collection("recommendation_history").add({
      userId: uid,
      insight: insightData,
      recommendedIds: recommendedSessions.map(r => r.id),
      createdAt: new Date().toISOString()
    });

    return { insight: insightData, recommendedSessions };
  }

  async dismissRecommendation(uid, mediaId) {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();
    if (!userDoc.exists) throw new AppError("User not found", 404);
    
    const prefs = userDoc.data().preferences || {};
    const dismissed = prefs.dismissedRecommendations || [];
    if (!dismissed.includes(mediaId)) {
      dismissed.push(mediaId);
      await userRef.update({ "preferences.dismissedRecommendations": dismissed });
    }
    return true;
  }
}

export default new RecommendationService();
