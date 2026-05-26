import apiClient from "./apiClient";

export const suryaService = {
  /**
   * Fetch recent Surya Namaskar sessions for a user.
   */
  async getRecentSessions(userId) {
    try {
      const response = await apiClient.get("/surya/recent");
      return response.data || [];
    } catch (error) {
      console.error("Failed to fetch recent surya sessions", error);
      return [];
    }
  },

  /**
   * Save a completed Surya Namaskar practice session.
   */
  async saveSession(userId, sessionData) {
    try {
      const response = await apiClient.post("/surya/save", { sessionData });
      return response.data;
    } catch (error) {
      console.error("Failed to save surya session", error);
      throw error;
    }
  },

  /**
   * Get current streak.
   */
  async getStreak(userId) {
    try {
      const response = await apiClient.get("/surya/streak");
      return response.data || 0;
    } catch (error) {
      console.error("Failed to fetch surya streak", error);
      return 0;
    }
  }
};
