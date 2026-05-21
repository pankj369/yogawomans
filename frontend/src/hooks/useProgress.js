import { useState, useEffect, useCallback } from "react";
import * as progressApi from "../services/progressApi";
import { useAuth } from "../context/AuthContext";

export function useProgress() {
  const { user } = useAuth();
  const [continueWatching, setContinueWatching] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setContinueWatching([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await progressApi.getProgress();
      if (res.success) {
        setContinueWatching(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch progress:", err);
      setError(err.message || "Failed to load progress");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const saveProgress = async (mediaId, seconds) => {
    try {
      await progressApi.saveProgress(mediaId, seconds);
      // Optimistically update or refetch
      fetchProgress();
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  return {
    continueWatching,
    loading,
    error,
    saveProgress,
    refreshProgress: fetchProgress,
  };
}
