import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { useProgress } from "../hooks/useProgress";
import { usePlaylists } from "../hooks/usePlaylists";
import { useSavedMedia } from "../hooks/useSavedMedia";

const MediaContext = createContext(null);

const WATCH_HISTORY_KEY = "yogawomans_watch_history";
const BOOKMARKS_KEY = "yogawomans_bookmarks";

export function MediaProvider({ children }) {
  // Audio state
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [loopMode, setLoopMode] = useState("none"); // 'none' | 'one' | 'all'
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  // Video state
  const [activeVideo, setActiveVideo] = useState(null);

  // Ambient Sound State
  const [ambientTrack, setAmbientTrack] = useState(null);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [ambientVolume, setAmbientVolumeState] = useState(0.5);

  // Backend Hooks
  const { continueWatching, saveProgress } = useProgress();
  const { savedPlaylists } = usePlaylists();
  const { toggleSavedMedia, isSaved, savedMedia } = useSavedMedia();
  
  // Local state for instant UI feedback before backend syncs
  const [localHistory, setLocalHistory] = useState([]);
  
  // We'll merge backend history and local optimistic history
  const watchHistory = continueWatching.length > 0 ? continueWatching : localHistory;
  const bookmarks = savedMedia;

  const audioRef = useRef(null);
  const ambientRef = useRef(null);
  const { isAuthenticated } = useAuth();

  // Stop music when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      setIsPlaying(false);
      setCurrentTrack(null);
      setPlaylist([]);
      setCurrentIndex(-1);
      setProgress(0);
      setDuration(0);
      setActiveVideo(null);
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current.src = "";
      }
      setAmbientTrack(null);
      setIsAmbientPlaying(false);
    }
  }, [isAuthenticated]);

  // Initialize Audio Object on mount
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.volume = volume;
    audio.muted = isMuted;

    // Audio Event listeners
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration || 0);
    const handleLoadStart = () => setIsAudioLoading(true);
    const handleCanPlay = () => setIsAudioLoading(false);
    const handleEnded = () => {
      handleTrackEnded();
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    // Initialize Ambient Audio
    const ambientAudio = new Audio();
    ambientRef.current = ambientAudio;
    ambientAudio.loop = true; // Ambient sounds always loop
    ambientAudio.volume = ambientVolume;

    const handleAmbientPlay = () => setIsAmbientPlaying(true);
    const handleAmbientPause = () => setIsAmbientPlaying(false);
    ambientAudio.addEventListener("play", handleAmbientPlay);
    ambientAudio.addEventListener("pause", handleAmbientPause);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);

      ambientAudio.pause();
      ambientAudio.removeEventListener("play", handleAmbientPlay);
      ambientAudio.removeEventListener("pause", handleAmbientPause);
    };
  }, []);

  // Sync volume & mute settings
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Sync ambient volume
  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.volume = ambientVolume;
    }
  }, [ambientVolume]);

  // Backend Sync Throttle (Only save progress every 10 seconds to prevent API spam)
  const lastSyncTimeRef = useRef(0);
  const syncProgressToBackend = useCallback((itemId, currentProgressSecs) => {
    const now = Date.now();
    if (now - lastSyncTimeRef.current > 10000) {
      saveProgress(itemId, currentProgressSecs);
      lastSyncTimeRef.current = now;
    }
  }, [saveProgress]);

  // Ended handler
  const handleTrackEnded = () => {
    if (!audioRef.current) return;
    
    // Read state from ref equivalents because callback context might capture stale variables
    setLoopMode((currentLoop) => {
      if (currentLoop === "one") {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
        return currentLoop;
      }
      
      // Navigate queue
      setPlaylist((currentQueue) => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === -1 || currentQueue.length === 0) return -1;
          const nextIndex = prevIndex + 1;
          if (nextIndex < currentQueue.length) {
            const nextTrack = currentQueue[nextIndex];
            playAudioSrc(nextTrack);
            setCurrentTrack(nextTrack);
            return nextIndex;
          } else if (currentLoop === "all") {
            const firstTrack = currentQueue[0];
            playAudioSrc(firstTrack);
            setCurrentTrack(firstTrack);
            return 0;
          }
          setIsPlaying(false);
          return -1;
        });
        return currentQueue;
      });

      return currentLoop;
    });
  };

  const playAudioSrc = (track) => {
    if (!audioRef.current || !track.audioSrc) return;
    // Pause current
    audioRef.current.pause();
    // Update src
    audioRef.current.src = track.audioSrc;
    audioRef.current.load();
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch((e) => {
        console.error("Audio playback error: ", e);
        setIsPlaying(false);
      });
  };

  // Play a single track and optionally set a queue list
  const playTrack = (track, newQueue = []) => {
    if (!track) return;
    
    // Pause active video if any
    setActiveVideo(null);

    // If new queue is provided, load it
    let finalQueue = newQueue.length > 0 ? newQueue : [track];
    
    // Check if queue already contains this track
    let idx = finalQueue.findIndex((t) => t.id === track.id);
    if (idx === -1) {
      finalQueue = [...finalQueue, track];
      idx = finalQueue.length - 1;
    }

    setPlaylist(finalQueue);
    setCurrentIndex(idx);
    setCurrentTrack(track);
    playAudioSrc(track);

    // Save to continue watching / listening history (audio category)
    addToHistory(track);
  };

  // Play a whole playlist compilation queue
  const playPlaylist = (newQueue, startIndex = 0) => {
    if (!newQueue || newQueue.length === 0) return;
    const track = newQueue[startIndex] || newQueue[0];
    playTrack(track, newQueue);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const nextTrack = () => {
    if (playlist.length === 0 || currentIndex === -1) return;
    const nextIdx = currentIndex + 1;
    if (nextIdx < playlist.length) {
      const track = playlist[nextIdx];
      setCurrentIndex(nextIdx);
      setCurrentTrack(track);
      playAudioSrc(track);
    } else if (loopMode === "all") {
      const track = playlist[0];
      setCurrentIndex(0);
      setCurrentTrack(track);
      playAudioSrc(track);
    }
  };

  const prevTrack = () => {
    if (playlist.length === 0 || currentIndex === -1) return;
    
    // If we've played > 3 seconds, reset track progress instead of going back
    if (progress > 3) {
      seek(0);
      return;
    }

    const prevIdx = currentIndex - 1;
    if (prevIdx >= 0) {
      const track = playlist[prevIdx];
      setCurrentIndex(prevIdx);
      setCurrentTrack(track);
      playAudioSrc(track);
    } else if (loopMode === "all") {
      const lastIdx = playlist.length - 1;
      const track = playlist[lastIdx];
      setCurrentIndex(lastIdx);
      setCurrentTrack(track);
      playAudioSrc(track);
    }
  };

  const seek = (time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const setAudioVolume = (vol) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (clamped > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // Video Actions
  const playVideo = (video) => {
    // Pause audio if playing
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
    setActiveVideo(video);
    addToHistory(video);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  // Ambient Sound Actions
  const playAmbient = (track) => {
    if (!ambientRef.current || !track || !track.audioSrc) return;
    
    // If the same track is clicked and playing, pause it (toggle behavior)
    if (ambientTrack?.id === track.id && isAmbientPlaying) {
      ambientRef.current.pause();
      return;
    }

    ambientRef.current.pause();
    ambientRef.current.src = track.audioSrc;
    ambientRef.current.load();
    ambientRef.current.play()
      .then(() => {
        setAmbientTrack(track);
        setIsAmbientPlaying(true);
      })
      .catch((e) => console.error("Ambient playback error: ", e));
  };

  const stopAmbient = () => {
    if (ambientRef.current) {
      ambientRef.current.pause();
    }
    setAmbientTrack(null);
    setIsAmbientPlaying(false);
  };

  const setAmbientVolume = (vol) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setAmbientVolumeState(clamped);
  };

  // History & Progress tracker (Continue Watching / Resume playback)
  const addToHistory = (item) => {
    // Optimistic local update
    setLocalHistory((prev) => {
      const filtered = prev.filter((h) => h.id !== item.id);
      return [
        { ...item, progress: 0, percentage: 0, timestamp: Date.now() },
        ...filtered,
      ].slice(0, 12);
    });
    // Sync to backend immediately on start
    saveProgress(item.id, 0);
  };

  const updateMediaProgress = (itemId, time, durationSeconds) => {
    if (!itemId || !durationSeconds) return;
    const percent = Math.min(100, Math.round((time / durationSeconds) * 100));
    
    // Optimistic local update for smooth UI
    setLocalHistory((prev) =>
      prev.map((h) => {
        if (h.id === itemId) {
          return { ...h, progress: time, percentage: percent, timestamp: Date.now() };
        }
        return h;
      })
    );

    // Throttled backend sync
    syncProgressToBackend(itemId, time);
  };

  // Bookmarking / Save features
  const toggleBookmark = (item) => {
    toggleSavedMedia(item.id);
  };

  const isBookmarked = (itemId) => {
    return isSaved(itemId);
  };

  const removeFromHistory = (itemId) => {
    setLocalHistory((prev) => prev.filter((h) => h.id !== itemId));
    // Ideally we would have a backend endpoint to remove from history,
    // but for now local filter will hide it until next refresh
  };

  const value = {
    currentTrack,
    isPlaying,
    playlist,
    currentIndex,
    volume,
    isMuted,
    loopMode,
    progress,
    duration,
    isAudioLoading,
    activeVideo,
    watchHistory,
    bookmarks,
    playTrack,
    playPlaylist,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setAudioVolume,
    toggleMute,
    setLoopMode,
    playVideo,
    closeVideo,
    updateMediaProgress,
    toggleBookmark,
    isBookmarked,
    removeFromHistory,
    ambientTrack,
    isAmbientPlaying,
    ambientVolume,
    playAmbient,
    stopAmbient,
    setAmbientVolume,
  };

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMedia must be used within MediaProvider");
  }
  return context;
}
