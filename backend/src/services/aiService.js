import { openai } from "../config/aiConfig.js";
import { AppError } from "../middleware/errorMiddleware.js";

class AIService {
  /**
   * Generates a fully personalized wellness plan in structured JSON format.
   * @param {Object} preferences User preferences, goals, etc.
   * @param {String} duration E.g., '14 days'
   * @param {String} focus E.g., 'Stress Relief'
   */
  async generateWellnessPlan(preferences, duration, focus) {
    const prompt = `
You are an expert, emotionally intelligent holistic wellness architect for 'YogaWomans', a premium wellness platform.
Create a personalized ${duration} wellness plan focusing on '${focus}'.
The user has the following preferences:
- Fitness Level: ${preferences.fitnessLevel || 'Beginner'}
- Primary Goals: ${(preferences.goals || []).join(", ")}
- Current Stress Level (1-10): ${preferences.stressLevel || 5}

Return ONLY a valid JSON object matching this schema, with NO markdown formatting or code blocks:
{
  "title": "String - A beautiful, inspiring title for the plan",
  "description": "String - An empathetic overview of what this journey entails",
  "duration": "String - the duration requested",
  "focus": "String - the focus requested",
  "schedule": [
    {
      "day": "Number",
      "theme": "String - e.g., Grounding & Breath",
      "sessions": [
        {
          "title": "String - Name of the session",
          "type": "String - e.g., Yoga, Meditation, Breathwork",
          "durationMin": "Number",
          "reason": "String - Why this session is helpful today"
        }
      ]
    }
  ]
}
`;

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
   * Generates dynamic, emotionally intelligent dashboard insights.
   */
  async generateInsights(profile, stats, history) {
    const prompt = `
You are a calming, emotionally intelligent wellness guide.
Analyze the following user state and provide a SINGLE, short (1-2 sentences) insight to display on their dashboard.
- Name: ${profile.name || 'User'}
- Streak: ${stats.currentStreak || 0} days
- Calm Score (0-100): ${stats.calmScore || 50}
- Recent Activity: ${history.length} sessions completed recently.
- Current Goals: ${(profile.preferences?.goals || []).join(', ')}

Provide a warm, empathetic, and premium-sounding observation or suggestion. Do not use quotes around the output.
    `;

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
      }; // Fallback
    }
  }

  /**
   * Conversational endpoint for the AI Coach
   */
  async chatWithCoach(messageHistory, profile) {
    const systemPrompt = {
      role: "system",
      content: `You are 'YogaWomans AI Coach', an emotionally intelligent, empathetic, and calming wellness guide.
You help users with mindfulness, stress relief, yoga advice, and emotional support.
Keep your responses concise, warm, and highly supportive. Avoid clinical or robotic language.
The user's name is ${profile.name || 'friend'}. Their goals are: ${(profile.preferences?.goals || []).join(', ')}.`
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
      throw new AppError("Failed to communicate with AI Coach", 500);
    }
  }
}

export default new AIService();
