import telemetry from "../../utils/telemetry.js";

class RecommendationAI {
  /**
   * Scores and sorts a catalog of wellness items based on user preferences, history, and mood.
   */
  scoreCatalog(catalog, preferences = {}, recentMediaIds = [], mood = null, uid = null) {
    const startTime = Date.now();
    const goals = preferences.goals || [];
    const stressLevel = preferences.stressLevel || 5;
    const dismissed = preferences.dismissedRecommendations || [];

    const scoredCatalog = catalog.map((media) => {
      if (dismissed.includes(media.id)) return { ...media, recommendationScore: -999 };
      
      let score = 0;
      
      // Match categories or goals tags
      const hasMatchingGoal = goals.some((goal) => 
        media.tags.some((tag) => 
          goal.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(goal.toLowerCase())
        )
      );
      if (hasMatchingGoal) score += 3;

      // Base stress profile weight
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
      
      // Experience level adjustment
      if (preferences.fitnessLevel === "Beginner" && media.level === "Beginner") score += 2;
      
      // Prevent repetition by penalizing recently watched items
      if (recentMediaIds.includes(media.id)) score -= 2;

      return { ...media, recommendationScore: score };
    });

    // Sort descending
    scoredCatalog.sort((a, b) => b.recommendationScore - a.recommendationScore);
    
    const duration = Date.now() - startTime;
    telemetry.trackDbMetric("recommendation_scoring", duration);
    if (uid) {
      telemetry.trackUserEvent(uid, "CATALOG_RECOMMENDED", { itemsCount: catalog.length, mood });
    }

    return scoredCatalog.filter((m) => m.recommendationScore > -100);
  }
}

export default new RecommendationAI();
