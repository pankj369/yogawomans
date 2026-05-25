import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/apiClient";
import { useAuth } from "../context/AuthContext";
import { sessionCatalog } from "../data/wellnessData";

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
        // Map backend recommendations to rich catalog data
        const backendRecs = res.data.data.recommendedSessions || [];
        const mappedRecs = backendRecs.map(rec => {
          const catalogItem = sessionCatalog.find(item => item.id === rec.id);
          return catalogItem ? { ...catalogItem, recommendationScore: rec.recommendationScore } : rec;
        });

        setRecommendations(mappedRecs);
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

  const dismissRecommendation = async (mediaId) => {
    // Optimistic UI update
    setRecommendations(prev => prev.filter(r => r.id !== mediaId));
    try {
      await apiClient.post(`/recommendations/dismiss/${mediaId}`);
    } catch (err) {
      console.error("Failed to dismiss recommendation:", err);
      fetchRecommendations();
    }
  };

  return {
    recommendations,
    insights,
    loading,
    error,
    dismissRecommendation,
    refreshRecommendations: fetchRecommendations,
  };
}
