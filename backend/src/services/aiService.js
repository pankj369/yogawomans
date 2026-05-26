import { openai } from "../config/aiConfig.js";
import { AppError } from "../middleware/errorMiddleware.js";
import { getWellnessPlanPrompt, getInsightPrompt, getCoachSystemPrompt, getWellnessProfilePrompt } from "../utils/aiPrompts.js";

class AIService {
  /**
   * Generates a fully personalized wellness plan in structured JSON format.
   * @param {Object} preferences User preferences, goals, etc.
   * @param {String} duration E.g., '14 days'
   * @param {String} focus E.g., 'Stress Relief'
   */
  async generateWellnessPlan(preferences, duration, focus) {
    const prompt = getWellnessPlanPrompt(preferences, duration, focus);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Using mini for fast, structured generation
        messages: [{ role: "system", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const jsonContent = response.choices[0].message.content;
      return JSON.parse(jsonContent);
    } catch (error) {
      console.error("OpenAI Plan Generation Error:", error);
      throw new AppError("Failed to generate AI wellness plan", 500);
    }
  }

  /**
   * Generates an AI Wellness Profile based on user onboarding data.
   */
  async generateWellnessProfile(profileData) {
    const prompt = getWellnessProfilePrompt(profileData);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const jsonContent = response.choices[0].message.content;
      return JSON.parse(jsonContent);
    } catch (error) {
      console.error("OpenAI Wellness Profile Generation Error:", error);
      throw new AppError("Failed to generate AI wellness profile", 500);
    }
  }

  /**
   * Generates dynamic, emotionally intelligent dashboard insights.
   */
  async generateInsights(profile, stats, history) {
    const prompt = getInsightPrompt(profile, stats, history);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: prompt }],
        temperature: 0.6,
      });

      return {
        message: response.choices[0].message.content.trim(),
        calmScore: stats.calmScore || 50,
        momentum: (stats.currentStreak || 0) > 2 ? "Active" : "Resting"
      };
    } catch (error) {
      console.error("OpenAI Insights Generation Error:", error);
      return {
        message: "Take a deep breath and reconnect with your inner stillness.",
        calmScore: 50,
        momentum: "Resting"
      }; // Graceful Fallback
    }
  }

  /**
   * Conversational endpoint for the AI Coach
   */
  async chatWithCoach(messageHistory, profile) {
    const systemPrompt = {
      role: "system",
      content: getCoachSystemPrompt(profile)
    };

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [systemPrompt, ...messageHistory],
        temperature: 0.7,
      });

      return {
        role: "assistant",
        content: response.choices[0].message.content
      };
    } catch (error) {
      console.error("OpenAI Chat Error:", error);
      // Fallback response for safety and UX
      return {
        role: "assistant",
        content: "I'm having a little trouble connecting right now, but please remember to take a deep breath. I'll be right here when the connection stabilizes."
      };
    }
  }
}

export default new AIService();
