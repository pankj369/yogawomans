import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";
import aiService from "./aiService.js";

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
    const goals = preferences.goals || [];
    const stressLevel = preferences.stressLevel || 5;
    const dismissed = preferences.dismissedRecommendations || [];

    const historySnapshot = await db.collection("continue_watching")
      .where("userId", "==", uid)
      .orderBy("lastWatchedAt", "desc")
      .limit(5)
      .get();
    
    const recentMediaIds = historySnapshot.docs.map(doc => doc.data().mediaId);
    const insightData = await aiService.generateInsights(userData, stats, historySnapshot.docs, mood);

    let scoredCatalog = mediaCatalog.map(media => {
      if (dismissed.includes(media.id)) return { ...media, recommendationScore: -999 };
      let score = 0;
      
      const hasMatchingGoal = goals.some(goal => 
        media.tags.some(tag => goal.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(goal.toLowerCase()))
      );
      if (hasMatchingGoal) score += 3;

      // Base profile stress scoring
      if (stressLevel >= 7 && media.tags.includes("stress relief")) score += 4;
      if (stressLevel >= 7 && media.tags.includes("anxiety")) score += 4;
      if (stressLevel <= 4 && media.tags.includes("energy")) score += 2;

      // Real-time Mood Adaptive Weighting
      if (mood) {
        const moodLower = mood.toLowerCase();
        if (moodLower === "stressed") {
          if (media.tags.includes("stress relief") || media.tags.includes("anxiety")) score += 5;
          if (media.level === "Gentle" || media.category === "breathwork") score += 3;
        } else if (moodLower === "tired") {
          if (media.level === "Gentle" || media.category === "breathwork") score += 5;
          if (media.tags.includes("Restorative")) score += 4;
        } else if (moodLower === "focused") {
          if (media.category === "meditation" || media.category === "breathwork") score += 4;
          if (media.tags.includes("Reset")) score += 3;
        } else if (moodLower === "happy") {
          if (media.tags.includes("Energy") || media.tags.includes("Flow")) score += 4;
        } else if (moodLower === "calm") {
          if (media.tags.includes("Stillness") || media.tags.includes("Calm")) score += 4;
        }
      }
      
      if (preferences.fitnessLevel === "Beginner" && media.level === "Beginner") score += 2;
      if (recentMediaIds.includes(media.id)) score -= 2;

      return { ...media, recommendationScore: score };
    });

    scoredCatalog.sort((a, b) => b.recommendationScore - a.recommendationScore);
    const recommendedSessions = scoredCatalog.filter(m => m.recommendationScore > -100).slice(0, 3);

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
