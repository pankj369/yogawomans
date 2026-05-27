import { db } from "../config/firebaseAdmin.js";
import chatbotAI from "./ai/chatbotAI.js";
import logger from "../utils/logger.js";
import telemetry from "../utils/telemetry.js";

// Standard FAQs for keyword matching
const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ["price", "pricing", "subscription", "upgrade", "membership", "pro", "premium", "cost"],
    answer: "You can upgrade to YogaWomans Pro in your billing dashboard or via /pricing. Pro unlocks GPT-4 Vision palm readings, customized daily multi-week wellness routines, and premium live classes.",
  },
  {
    keywords: ["goals", "profile", "change preferences", "reset", "onboarding"],
    answer: "To update your wellness goals or restart your onboarding assessment, go to your Profile Settings (/settings) or retake the onboarding setup at /profile-setup.",
  },
  {
    keywords: ["palm", "upload", "palmistry", "vision", "camera", "photo"],
    answer: "Make sure you upload a clear photo of your palm in JPG, PNG, or WEBP format. File size must be under 5MB. If vision analysis fails, our systems automatically trigger a high-quality fallback reading.",
  },
  {
    keywords: ["payment", "checkout", "stripe", "credit card", "buy"],
    answer: "We support secure card payments at checkout. Rest assured, your order creation and card details are fully encrypted and protected under SSL protocols.",
  },
];

class SupportService {
  /**
   * Submits a support ticket and schedules/processes an AI auto-reply suggestions scan.
   */
  async createTicket(uid, email, subject, message) {
    const ticketId = Date.now().toString();
    const ticket = {
      id: ticketId,
      userId: uid,
      email,
      subject,
      message,
      status: "open",
      createdAt: new Date().toISOString(),
      replies: [],
    };

    // 1. Scan keywords for matching FAQ
    const msgLower = message.toLowerCase();
    let autoAnswer = null;

    for (const faq of FAQ_KNOWLEDGE_BASE) {
      const match = faq.keywords.some((keyword) => msgLower.includes(keyword));
      if (match) {
        autoAnswer = faq.answer;
        break;
      }
    }

    // 2. Generate customized AI suggestion
    let aiReply = "Thank you for reaching out to YogaWomans Support. We have received your ticket and a member of our team will respond shortly.";
    
    if (autoAnswer) {
      // Create a customized soothing wrapper from Aria
      aiReply = `Hello, I'm Aria, your AI Wellness Assistant. I noticed you had questions about this. Here is a quick help suggestion:\n\n"${autoAnswer}"\n\nIf this doesn't fully resolve your concern, a member of our support team will follow up directly.`;
    } else {
      // Call modular chatbot AI to compile a supportive reply
      try {
        const coachResponse = await chatbotAI.chatWithCoach(
          [{ role: "user", content: `A user has filed a support ticket. Message: "${message}". Write a short, empathetic customer service support auto-reply acknowledging their message.` }],
          { name: "Support Practitioner" },
          "calm",
          uid
        );
        aiReply = `Hi, this is Aria from YogaWomans Support. Acknowledging your request: "${coachResponse.content}"`;
      } catch (err) {
        logger.error("Failed to generate custom AI support ticket response:", err);
      }
    }

    // 3. Append AI auto-reply
    ticket.replies.push({
      sender: "AI Assistant",
      message: aiReply,
      createdAt: new Date().toISOString(),
    });

    const ticketRef = db.collection("support_tickets").doc(ticketId);
    await ticketRef.set(ticket);

    logger.info(`Support ticket created with ID: ${ticketId} (AI auto-replied: ${autoAnswer ? "Yes (FAQ)" : "Yes (Chatbot)"})`);
    telemetry.trackUserEvent(uid, "SUPPORT_TICKET_SUBMITTED", { autoAnswered: !!autoAnswer });

    return ticket;
  }

  /**
   * Retrieves all support tickets for a user.
   */
  async getUserTickets(uid) {
    const ticketsRef = db.collection("support_tickets").where("userId", "==", uid);
    const snapshot = await ticketsRef.orderBy("createdAt", "desc").get();

    const tickets = [];
    snapshot.forEach((doc) => {
      tickets.push(doc.data());
    });

    return tickets;
  }
}

export const supportService = new SupportService();
export default supportService;
