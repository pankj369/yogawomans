import { useState, useEffect, useCallback } from "react";
import * as mediaApi from "../services/mediaApi";
import { useAuth } from "../context/AuthContext";
import { sessionCatalog } from "../data/wellnessData";

export function useSavedMedia() {
  const { user } = useAuth();
  const [savedMedia, setSavedMedia] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const fetchSavedMedia = useCallback(async () => {
    if (!user) {
      setSavedMedia([]);
      setSavedIds(new Set());
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await mediaApi.getSavedMedia();
      if (res.success) {
        // Map with static catalog for rich UI data if needed
        const mappedData = res.data.map(item => {
          const staticMedia = sessionCatalog.find(m => m.id === item.mediaId);
          return staticMedia ? { ...staticMedia, savedAt: item.savedAt } : null;
        }).filter(Boolean);

        setSavedMedia(mappedData);
        setSavedIds(new Set(res.data.map(item => item.mediaId)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchSavedMedia(); }, [fetchSavedMedia]);

  const toggleSavedMedia = async (mediaId) => {
    const isSaved = savedIds.has(mediaId);
    setSavedIds(prev => {
      const next = new Set(prev);
      if (isSaved) next.delete(mediaId);
      else next.add(mediaId);
      return next;
    });

    try {
      if (isSaved) await mediaApi.unsaveMedia(mediaId);
      else await mediaApi.saveMedia(mediaId);
      fetchSavedMedia();
    } catch (err) {
      fetchSavedMedia();
    }
  };

  return {
    savedMedia,
    loading,
    toggleSavedMedia,
    isSaved: (id) => savedIds.has(id),
    refreshSavedMedia: fetchSavedMedia
  };
}
