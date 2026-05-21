import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";

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

  // Lists (Continue watching & Bookmarks)
  const [watchHistory, setWatchHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(WATCH_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const audioRef = useRef(null);
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

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Sync volume & mute settings
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

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

  // History & Progress tracker (Continue Watching / Resume playback)
  const addToHistory = (item) => {
    setWatchHistory((prev) => {
      const filtered = prev.filter((h) => h.id !== item.id);
      return [
        {
          ...item,
          progress: 0,
          percentage: 0,
          timestamp: Date.now(),
        },
        ...filtered,
      ].slice(0, 12); // Limit to last 12 items
    });
  };

  const updateMediaProgress = (itemId, time, durationSeconds) => {
    if (!itemId || !durationSeconds) return;
    const percent = Math.min(100, Math.round((time / durationSeconds) * 100));
    setWatchHistory((prev) =>
      prev.map((h) => {
        if (h.id === itemId) {
          return {
            ...h,
            progress: time,
            percentage: percent,
            timestamp: Date.now(),
          };
        }
        return h;
      })
    );
  };

  // Bookmarking / Save features
  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      if (exists) {
        return prev.filter((b) => b.id !== item.id);
      } else {
        return [{ ...item, bookmarkedAt: Date.now() }, ...prev];
      }
    });
  };

  const isBookmarked = (itemId) => {
    return bookmarks.some((b) => b.id === itemId);
  };

  const removeFromHistory = (itemId) => {
    setWatchHistory((prev) => prev.filter((h) => h.id !== itemId));
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
