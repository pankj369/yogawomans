import { db } from "../../config/firebaseAdmin.js";

class MemoryAI {
  /**
   * Retrieves the recent conversation history for context.
   */
  async getRecentConversation(uid, limit = 10) {
    if (!db || !uid) return [];
    try {
      const snapshot = await db
        .collection("users")
        .doc(uid)
        .collection("ai_conversations")
        .orderBy("timestamp", "desc")
        .limit(limit)
        .get();

      const messages = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({ role: data.role, content: data.content });
      });

      // Reverse to chronological order for the LLM
      return messages.reverse();
    } catch (error) {
      console.error("Error retrieving AI memory:", error);
      return [];
    }
  }

  /**
   * Saves a message to the conversation history.
   */
  async saveMessage(uid, role, content) {
    if (!db || !uid) return;
    try {
      await db
        .collection("users")
        .doc(uid)
        .collection("ai_conversations")
        .add({
          role,
          content,
          timestamp: new Date().toISOString()
        });
    } catch (error) {
      console.error("Error saving AI message:", error);
    }
  }
}

export default new MemoryAI();
