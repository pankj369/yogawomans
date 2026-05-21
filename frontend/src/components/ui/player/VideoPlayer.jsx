import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  ArrowLeft,
  Loader2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { useMedia } from "../../../context/MediaContext";

export default function VideoPlayer({ video, onClose }) {
  const {
    watchHistory,
    updateMediaProgress,
    toggleBookmark,
    isBookmarked,
  } = useMedia();

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeTime, setResumeTime] = useState(0);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const bookmarked = isBookmarked(video.id);

  // Check watch history for resume logic
  useEffect(() => {
    const historyItem = watchHistory.find((h) => h.id === video.id);
    if (historyItem && historyItem.progress > 5 && historyItem.percentage < 95) {
      setResumeTime(historyItem.progress);
      setShowResumePrompt(true);
    } else {
      setIsLoading(false);
    }
  }, [video.id]);

  // Controls auto-hide timer
  useEffect(() => {
    let timeout;
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timeout);
      if (isPlaying) {
        timeout = setTimeout(() => setShowControls(false), 3000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", resetTimer);
      container.addEventListener("click", resetTimer);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", resetTimer);
        container.removeEventListener("click", resetTimer);
      }
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setShowResumePrompt(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    setProgress(current);
    updateMediaProgress(video.id, current, videoRef.current.duration || duration);
  };

  const handleDurationChange = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = percent * duration;
    videoRef.current.currentTime = seekTime;
    setProgress(seekTime);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      videoRef.current.muted = vol === 0;
    }
    setIsMuted(vol === 0);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    videoRef.current.muted = nextMute;
  };

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleAcceptResume = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = resumeTime;
      setProgress(resumeTime);
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    setShowResumePrompt(false);
    setIsLoading(false);
  };

  const handleDeclineResume = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    setShowResumePrompt(false);
    setIsLoading(false);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video md:rounded-3xl overflow-hidden bg-black shadow-2xl group border border-white/10"
      onDoubleClick={toggleFullscreen}
    >
      {/* HTML5 Video element */}
      <video
        ref={videoRef}
        src={video.videoSrc}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => {
          if (!showResumePrompt) setIsLoading(false);
        }}
        onClick={handlePlayToggle}
        autoPlay={!showResumePrompt}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30">
          <Loader2 className="h-10 w-10 text-wellness-orange animate-spin" />
        </div>
      )}

      {/* Resume Playback Prompt Overlay */}
      {showResumePrompt && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/75 z-40 p-4">
          <div className="bg-wellness-dark border border-white/20 rounded-3xl p-6 max-w-sm text-center shadow-glass text-white">
            <h5 className="font-heading text-lg font-bold mb-2">Resume Session?</h5>
            <p className="text-sm text-white/70 mb-5">
              Would you like to pick up where you left off at{" "}
              <span className="text-wellness-orange font-bold">
                {formatTime(resumeTime)}
              </span>
              ?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleAcceptResume}
                className="px-5 py-2.5 rounded-full bg-wellness-orange text-white font-bold text-xs hover:bg-wellness-orange/95 transition"
              >
                Yes, Resume
              </button>
              <button
                onClick={handleDeclineResume}
                className="px-5 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Top Control Overlay (Back button, Title, Bookmark) */}
      <div
        className={`absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-5 flex items-center justify-between z-20 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-white leading-tight">
              {video.title}
            </h3>
            <p className="text-[10px] text-white/60 tracking-wider font-semibold uppercase mt-0.5">
              {video.instructor ? `with ${video.instructor}` : video.category}
            </p>
          </div>
        </div>

        <button
          onClick={() => toggleBookmark(video)}
          className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
          title={bookmarked ? "Bookmarked" : "Bookmark Session"}
        >
          {bookmarked ? (
            <BookmarkCheck size={18} className="text-wellness-orange fill-current" />
          ) : (
            <Bookmark size={18} />
          )}
        </button>
      </div>

      {/* Center Large Play/Pause Toggle Indicator */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/10 z-10 transition-opacity duration-300 pointer-events-none ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={handlePlayToggle}
          className="h-16 w-16 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:scale-105 pointer-events-auto hover:bg-black/70 transition shadow-lg"
        >
          {isPlaying ? (
            <Pause size={24} fill="white" className="text-white" />
          ) : (
            <Play size={24} fill="white" className="text-white ml-1" />
          )}
        </button>
      </div>

      {/* Cinematic Bottom Controls (Timeline, Scrubber, Volume, Rates, Fullscreen) */}
      <div
        className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 space-y-3.5 z-20 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Timeline Bar */}
        <div
          onClick={handleSeek}
          className="relative w-full h-1.5 rounded-full bg-white/30 cursor-pointer group/seek"
        >
          <div
            className="absolute h-full rounded-full bg-gradient-to-r from-wellness-orange to-wellness-gold"
            style={{ width: `${progressPercentage}%` }}
          />
          <div
            className="absolute h-3 w-3 rounded-full bg-white border border-wellness-orange shadow scale-0 group-hover/seek:scale-100 transition-transform duration-100"
            style={{ left: `calc(${progressPercentage}% - 6px)`, top: "-3px" }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between text-white font-inter">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium opacity-85">
              {formatTime(progress)} / {formatTime(duration)}
            </span>

            {/* Volume control */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={handleMuteToggle}
                className="text-white/80 hover:text-white transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-white/20 appearance-none rounded cursor-pointer accent-white opacity-0 group-hover/volume:opacity-100 transition-opacity outline-none"
                style={{
                  background: `linear-gradient(to right, #fff 0%, #fff ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Control */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center gap-1 text-xs font-semibold bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition"
              >
                <Settings size={14} />
                <span>{playbackRate === 1 ? "Normal" : `${playbackRate}x`}</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-8 right-0 bg-wellness-dark border border-white/10 rounded-xl py-1 shadow-glass z-40 text-xs w-24">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleSpeedChange(rate)}
                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 transition ${
                        playbackRate === rate ? "text-wellness-orange font-bold" : "text-white/70"
                      }`}
                    >
                      {rate === 1 ? "Normal" : `${rate}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
