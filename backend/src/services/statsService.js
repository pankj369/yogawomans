import { db } from "../config/firebaseAdmin.js";

class StatsService {
  /**
   * Update user's aggregate wellness statistics
   */
  async updateUserStats(userId, durationMinutes, type) {
    const statsRef = db.collection("wellness_stats").doc(userId);
    
    // We use a transaction to safely read and increment stats and check streak
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(statsRef);
      
      const now = new Date();
      
      if (!doc.exists) {
        // First time stats creation
        transaction.set(statsRef, {
          userId,
          totalMeditationMinutes: type === 'meditation' ? durationMinutes : 0,
          totalYogaMinutes: type === 'yoga' ? durationMinutes : 0,
          totalSessionsCompleted: 1,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityDate: now.toISOString(),
        });
        return;
      }

      const data = doc.data();
      let newStreak = data.currentStreak || 0;
      let newLongestStreak = data.longestStreak || 0;
      
      const lastActivity = data.lastActivityDate ? new Date(data.lastActivityDate) : null;
      
      if (lastActivity) {
        const diffTime = Math.abs(now - lastActivity);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // Continuous streak
          newStreak += 1;
        } else if (diffDays > 1) {
          // Streak broken
          newStreak = 1;
        }
        // if diffDays === 0, same day, no streak increment
      } else {
        newStreak = 1;
      }
      
      if (newStreak > newLongestStreak) {
        newLongestStreak = newStreak;
      }

      transaction.update(statsRef, {
        totalMeditationMinutes: (data.totalMeditationMinutes || 0) + (type === 'meditation' ? durationMinutes : 0),
        totalYogaMinutes: (data.totalYogaMinutes || 0) + (type === 'yoga' ? durationMinutes : 0),
        totalSessionsCompleted: (data.totalSessionsCompleted || 0) + 1,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: now.toISOString(),
      });
    });
  }

  /**
   * Get user's wellness stats
   */
  async getUserStats(userId) {
    const doc = await db.collection("wellness_stats").doc(userId).get();
    
    if (!doc.exists) {
      return {
        totalMeditationMinutes: 0,
        totalYogaMinutes: 0,
        totalSessionsCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
      };
    }

    return doc.data();
  }
}

export default new StatsService();
