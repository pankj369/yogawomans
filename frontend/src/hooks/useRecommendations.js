import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/apiClient";
import { useAuth } from "../context/AuthContext";

export function useRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = useCallback(async () => {
    if (!user) {
      setRecommendations([]);
      setInsights(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await apiClient.get("/recommendations/dashboard");
      if (res?.data?.success) {
        setRecommendations(res.data.data.recommendedSessions || []);
        setInsights(res.data.data.insight || null);
      }
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
      setError(err.message || "Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    recommendations,
    insights,
    loading,
    error,
    refreshRecommendations: fetchRecommendations,
  };
}
