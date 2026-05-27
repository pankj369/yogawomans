import { openai } from "../../config/aiConfig.js";
import { getCoachSystemPrompt } from "../../utils/aiPrompts.js";
import telemetry from "../../utils/telemetry.js";
import memoryAI from "./memoryAI.js";
import moodAI from "./moodAI.js";

class ChatbotAI {
  /**
   * Conversational endpoint for the AI Coach
   * Uses Server-Sent Events (SSE) if 'res' is provided.
   */
  async chatWithCoachStream(userMessage, profile, uid, res) {
    const startTime = Date.now();
    
    // Get user mood and past memory
    const currentMood = await moodAI.getLatestMood(uid);
    const pastMessages = await memoryAI.getRecentConversation(uid, 10);
    
    const systemPrompt = {
      role: "system",
      content: getCoachSystemPrompt(profile, currentMood)
    };

    const messages = [
      systemPrompt,
      ...pastMessages,
      { role: "user", content: userMessage }
    ];

    const hasKey = process.env.OPENAI_API_KEY && 
                   process.env.OPENAI_API_KEY.trim() !== "" && 
                   !process.env.OPENAI_API_KEY.startsWith("YOUR_");

    if (hasKey) {
      try {
        const stream = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: messages,
          temperature: 0.7,
          stream: true,
        });

        // Set up SSE headers
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        let fullReply = "";

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            fullReply += content;
            res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
          }
        }

        res.write("data: [DONE]\n\n");
        res.end();

        const duration = Date.now() - startTime;
        telemetry.trackAiMetric("coach_chatbot_stream", duration, true, 300);
        
        // Save the exchange to memory
        await memoryAI.saveMessage(uid, "user", userMessage);
        await memoryAI.saveMessage(uid, "assistant", fullReply);

        return;
      } catch (error) {
        telemetry.trackAiMetric("coach_chatbot_stream", Date.now() - startTime, false);
        console.error("OpenAI Chat Stream Error:", error);
        // Fallthrough to fallback if error
      }
    }

    // Fallback response if no key or error
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    const fallbackMessage = "I'm having a little trouble connecting to my creative center right now, but please remember to take a deep breath. Slowing down resolves all tension. I'm right here with you.";
    
    // Simulate streaming the fallback
    const words = fallbackMessage.split(" ");
    for (const word of words) {
      await new Promise(r => setTimeout(r, 50));
      res.write(`data: ${JSON.stringify({ text: word + " " })}\n\n`);
    }
    
    res.write("data: [DONE]\n\n");
    res.end();
    
    await memoryAI.saveMessage(uid, "user", userMessage);
    await memoryAI.saveMessage(uid, "assistant", fallbackMessage);
  }
}

export default new ChatbotAI();
