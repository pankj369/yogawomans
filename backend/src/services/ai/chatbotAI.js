import { openai } from "../../config/aiConfig.js";
import { getCoachSystemPrompt } from "../../utils/aiPrompts.js";
import telemetry from "../../utils/telemetry.js";

class ChatbotAI {
  /**
   * Conversational endpoint for the AI Coach
   */
  async chatWithCoach(messageHistory, profile, mood, uid = null) {
    const startTime = Date.now();
    const systemPrompt = {
      role: "system",
      content: getCoachSystemPrompt(profile, mood)
    };

    const hasKey = process.env.OPENAI_API_KEY && 
                   process.env.OPENAI_API_KEY.trim() !== "" && 
                   !process.env.OPENAI_API_KEY.startsWith("YOUR_");

    if (hasKey) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [systemPrompt, ...messageHistory],
          temperature: 0.7,
        });

        const replyContent = response.choices[0].message.content;
        const duration = Date.now() - startTime;

        telemetry.trackAiMetric("coach_chatbot", duration, true, 300);
        if (uid) telemetry.trackUserEvent(uid, "COACH_CHAT_TRIGGERED", { source: "openai" });

        return {
          role: "assistant",
          content: replyContent
        };
      } catch (error) {
        const duration = Date.now() - startTime;
        telemetry.trackAiMetric("coach_chatbot", duration, false);
        telemetry.captureException(error, { userId: uid, service: "coach_chatbot" });
        console.error("OpenAI Chat Error:", error);
      }
    }

    // Fallback response for safety and UX
    // Introduce short latency simulator
    await new Promise((resolve) => setTimeout(resolve, 300));
    const duration = Date.now() - startTime;

    telemetry.trackAiMetric("coach_chatbot_fallback", duration, true, 0);
    if (uid) telemetry.trackUserEvent(uid, "COACH_CHAT_TRIGGERED", { source: "fallback" });

    return {
      role: "assistant",
      content: "I'm having a little trouble connecting to my creative center right now, but please remember to take a deep breath. Slowing down resolves all tension. I'm right here with you."
    };
  }
}

export default new ChatbotAI();
