import planGeneratorAI from "./ai/planGeneratorAI.js";
import wellnessAI from "./ai/wellnessAI.js";
import chatbotAI from "./ai/chatbotAI.js";

class AIService {
  /**
   * Generates a fully personalized wellness plan in structured JSON format.
   */
  async generateWellnessPlan(preferences, duration, focus, uid = null) {
    return planGeneratorAI.generateWellnessPlan(preferences, duration, focus, uid);
  }

  /**
   * Generates an AI Wellness Profile based on user onboarding data.
   */
  async generateWellnessProfile(profileData, uid = null) {
    return wellnessAI.generateWellnessProfile(profileData, uid);
  }

  /**
   * Generates dynamic, emotionally intelligent dashboard insights.
   */
  async generateInsights(profile, stats, history, mood) {
    return wellnessAI.generateInsights(profile, stats, history, mood);
  }

  /**
   * Conversational endpoint for the AI Coach
   */
  async chatWithCoach(messageHistory, profile, mood, uid = null) {
    return chatbotAI.chatWithCoach(messageHistory, profile, mood, uid);
  }
}

export default new AIService();
