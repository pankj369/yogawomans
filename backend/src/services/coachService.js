import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";

class CoachService {
  /**
   * Retrieves the conversation history for a user.
   */
  async getHistory(uid) {
    const doc = await db.collection("coach_conversations").doc(uid).get();
    if (!doc.exists) {
      return [];
    }
    return doc.data().messages || [];
  }

  /**
   * Appends new messages to the user's conversation history.
   */
  async appendMessages(uid, newMessages) {
    const docRef = db.collection("coach_conversations").doc(uid);
    const doc = await docRef.get();
    
    let messages = [];
    if (doc.exists) {
      messages = doc.data().messages || [];
    }

    // Append new messages
    messages = [...messages, ...newMessages];

    // Cap at the last 100 messages to prevent document size blowout
    if (messages.length > 100) {
      messages = messages.slice(messages.length - 100);
    }

    await docRef.set({
      messages,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return messages;
  }
}

export default new CoachService();
