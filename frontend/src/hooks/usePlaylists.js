import { useState, useEffect, useCallback } from "react";
import * as playlistApi from "../services/playlistApi";
import { useAuth } from "../context/AuthContext";

export function usePlaylists() {
  const { user } = useAuth();
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set()); // Fast lookup O(1)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSavedPlaylists = useCallback(async () => {
    if (!user) {
      setSavedPlaylists([]);
      setSavedIds(new Set());
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await playlistApi.getSavedPlaylists();
      if (res.success) {
        setSavedPlaylists(res.data);
        const ids = new Set(res.data.map(item => item.playlistId));
        setSavedIds(ids);
      }
    } catch (err) {
      console.error("Failed to fetch saved playlists:", err);
      setError(err.message || "Failed to load saved playlists");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSavedPlaylists();
  }, [fetchSavedPlaylists]);

  const toggleFavorite = async (playlistId) => {
    const isCurrentlySaved = savedIds.has(playlistId);

    // Optimistic UI update
    setSavedIds(prev => {
      const next = new Set(prev);
      if (isCurrentlySaved) next.delete(playlistId);
      else next.add(playlistId);
      return next;
    });

    try {
      if (isCurrentlySaved) {
        await playlistApi.unsavePlaylist(playlistId);
      } else {
        await playlistApi.savePlaylist(playlistId);
      }
      // Re-sync to ensure exact state if needed
      fetchSavedPlaylists();
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      // Revert optimistic update on failure
      fetchSavedPlaylists();
    }
  };

  const isSaved = (playlistId) => savedIds.has(playlistId);

  return {
    savedPlaylists,
    loading,
    error,
    toggleFavorite,
    isSaved,
    refreshPlaylists: fetchSavedPlaylists,
  };
}
