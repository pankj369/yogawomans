import { db } from "../config/firebaseAdmin.js";

/**
 * Enhanced Analytics tracker for AI events
 */
class AIAnalytics {
  async trackUsage(uid, feature, metrics) {
    if (!db) return;
    try {
      const { durationMs, success, tokensUsed, errorType } = metrics;
      
      // We can batch this or just write directly for now
      await db.collection("ai_usage_analytics").add({
        uid: uid || "anonymous",
        feature, // e.g. 'chat', 'palmistry', 'plan_generation'
        durationMs,
        success,
        tokensUsed: tokensUsed || 0,
        errorType: errorType || null,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Failed to track AI usage:", error);
    }
  }
}

export default new AIAnalytics();
