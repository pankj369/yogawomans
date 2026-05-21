import { useState, useEffect, useCallback } from "react";
import * as statsApi from "../services/statsApi";
import { useAuth } from "../context/AuthContext";

export function useWellnessStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!user) {
      setStats(null);
      setActivityHistory([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [statsRes, activityRes] = await Promise.all([
        statsApi.getWellnessStats(),
        statsApi.getActivityHistory(10), // fetch last 10 activities
      ]);

      if (statsRes.success) {
        setStats(statsRes.data);
      }
      
      if (activityRes.success) {
        setActivityHistory(activityRes.data);
      }
    } catch (err) {
      console.error("Failed to fetch wellness stats:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const logSession = async (mediaId, type, durationMinutes) => {
    try {
      await statsApi.logWellnessSession(mediaId, type, durationMinutes);
      // Refresh stats after logging
      fetchStats();
    } catch (err) {
      console.error("Failed to log session:", err);
    }
  };

  return {
    stats,
    activityHistory,
    loading,
    logSession,
    refreshStats: fetchStats,
  };
}
