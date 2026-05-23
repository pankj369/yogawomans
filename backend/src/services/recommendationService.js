import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";
import aiService from "./aiService.js";

// Mock Database of Media for Recommendation Purposes
// In a real app, this would query a 'media' collection in Firestore.
const mediaCatalog = [
  { id: "med-01", title: "Morning Clarity", category: "meditation", tags: ["morning", "focus", "energy"], level: "Beginner", premium: false },
  { id: "med-02", title: "Deep Sleep Release", category: "meditation", tags: ["sleep", "stress relief", "evening"], level: "All Levels", premium: false },
  { id: "yoga-01", title: "Gentle Morning Flow", category: "yoga", tags: ["morning", "flexibility", "gentle"], level: "Beginner", premium: false },
  { id: "yoga-02", title: "Core Power", category: "yoga", tags: ["strength", "energy", "power"], level: "Intermediate", premium: true },
  { id: "breath-01", title: "Anxiety Relief Breathing", category: "breathwork", tags: ["anxiety", "stress relief", "calm"], level: "Beginner", premium: false },
  { id: "sound-01", title: "Forest Rain Ambient", category: "ambient", tags: ["focus", "sleep", "calm"], level: "All Levels", premium: false }
];

class RecommendationService {
  /**
   * Generates dynamic insights and media recommendations based on user profile & history
   */
  async getDashboardRecommendations(uid) {
    // 1. Fetch User Data
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      throw new AppError("User not found", 404);
    }
    const userData = userDoc.data();
    
    const preferences = userData.preferences || {};
    const stats = userData.wellnessStats || { currentStreak: 0, calmScore: 0, totalSessions: 0 };
    const goals = preferences.goals || [];
    const stressLevel = preferences.stressLevel || 5;

    // 2. Fetch Recent Activity
    const historySnapshot = await db.collection("progress")
      .where("userId", "==", uid)
      .orderBy("lastWatchedAt", "desc")
      .limit(5)
      .get();
    
    const recentMediaIds = historySnapshot.docs.map(doc => doc.data().mediaId);
    
    // 3. Generate Insight String using OpenAI
    const insightData = await aiService.generateInsights(userData, stats, historySnapshot.docs);

    // 4. Rank and Filter Catalog (Algorithm)
    let scoredCatalog = mediaCatalog.map(media => {
      let score = 0;
      
      const hasMatchingGoal = goals.some(goal => 
        media.tags.some(tag => goal.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(goal.toLowerCase()))
      );
      if (hasMatchingGoal) score += 3;

      if (stressLevel >= 7 && media.tags.includes("stress relief")) score += 4;
      if (stressLevel >= 7 && media.tags.includes("anxiety")) score += 4;
      if (stressLevel <= 4 && media.tags.includes("energy")) score += 2;
      
      if (preferences.fitnessLevel === "Beginner" && media.level === "Beginner") score += 2;

      if (recentMediaIds.includes(media.id)) score -= 2;

      return { ...media, recommendationScore: score };
    });

    // Sort by score descending
    scoredCatalog.sort((a, b) => b.recommendationScore - a.recommendationScore);

    // 5. Structure the Response
    return {
      insight: insightData,
      recommendedSessions: scoredCatalog.slice(0, 4) // Return top 4
    };
  }
}

export default new RecommendationService();
