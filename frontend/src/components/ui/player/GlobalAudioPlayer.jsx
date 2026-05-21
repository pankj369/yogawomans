import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  ChevronUp,
  ChevronDown,
  X,
  Music,
  Bookmark,
  BookmarkCheck,
  ListMusic
} from "lucide-react";
import { useMedia } from "../../../context/MediaContext";
import ProgressBar from "./ProgressBar";
import VolumeSlider from "./VolumeSlider";
import Waveform from "./Waveform";
import PlaylistPanel from "./PlaylistPanel";

export default function GlobalAudioPlayer() {
  const {
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
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setAudioVolume,
    toggleMute,
    setLoopMode,
    toggleBookmark,
    isBookmarked,
  } = useMedia();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  if (!currentTrack) return null;

  const bookmarked = isBookmarked(currentTrack.id);

  const cycleLoopMode = () => {
    if (loopMode === "none") setLoopMode("all");
    else if (loopMode === "all") setLoopMode("one");
    else setLoopMode("none");
  };

  return (
    <AnimatePresence>
      {!isExpanded ? (
        /* ─── MINI PLAYER (Compact floating pill) ─── */
        <motion.div
          key="mini-player"
          initial={{ y: 120, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 220, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] w-full max-w-[23rem] sm:max-w-[26rem] px-4"
        >
          <div 
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-4 rounded-[2rem] border border-white/60 bg-white/95 p-3 shadow-heroCard backdrop-blur-2xl cursor-pointer hover:bg-wellness-cream2 transition-colors duration-200"
          >
            {/* Thumbnail */}
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl flex-shrink-0 bg-wellness-softcream">
              {currentTrack.image ? (
                <img src={currentTrack.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-wellness-orange">
                  <Music size={16} />
                </div>
              )}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                  <div className="flex gap-0.5 items-end h-2">
                    <span className="w-0.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <span className="w-0.5 h-2.5 bg-white rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0 pr-1">
              <h5 className="font-heading text-xs font-bold text-wellness-dark truncate">
                {currentTrack.title}
              </h5>
              <p className="text-[9px] font-bold text-wellness-muted truncate uppercase tracking-widest mt-0.5">
                {currentTrack.category || "Audio Meditation"}
              </p>
            </div>

            {/* Mini Controls */}
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-wellness-dark text-white shadow-sm hover:bg-black transition-transform active:scale-95"
              >
                {isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" className="ml-0.5" />}
              </button>
              <button
                onClick={nextTrack}
                className="flex h-8 w-8 items-center justify-center rounded-full text-wellness-muted hover:text-wellness-dark transition-colors"
                title="Next track"
              >
                <SkipForward size={16} />
              </button>
              <button
                onClick={() => setIsExpanded(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-wellness-muted hover:text-wellness-dark transition-colors"
                title="Expand"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* ─── EXPANDED CINEMATIC PLAYER ─── */
        <motion.div
          key="expanded-player"
          initial={{ y: 250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 250, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:w-[28rem] z-[80] overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/95 p-6 shadow-glass backdrop-blur-3xl"
        >
          {/* Blurred Background Art */}
          <div className="absolute inset-0 -z-10 opacity-[0.04] blur-3xl pointer-events-none">
            {currentTrack.image && (
              <img src={currentTrack.image} alt="" className="w-full h-full object-cover scale-150" />
            )}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-4 border-b border-wellness-softcream/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-wellness-gold bg-wellness-warm/50 px-2.5 py-1 rounded-full">
                Now Playing
              </span>
              {isAudioLoading && (
                <span className="text-[10px] font-semibold text-wellness-muted animate-pulse">
                  Loading...
                </span>
              )}
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-wellness-softcream/60 text-wellness-muted hover:bg-wellness-softcream hover:text-wellness-dark transition"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              {/* Cover Art */}
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-3xl flex-shrink-0 bg-wellness-cream shadow-md">
                {currentTrack.image ? (
                  <img src={currentTrack.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-wellness-orange">
                    <Music size={24} />
                  </div>
                )}
              </div>

              {/* Title & Instructor */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-heading text-lg font-extrabold text-wellness-dark truncate">
                    {currentTrack.title}
                  </h4>
                  <button
                    onClick={() => toggleBookmark(currentTrack)}
                    className="text-wellness-muted hover:text-wellness-orange transition-colors flex-shrink-0"
                    title={bookmarked ? "Saved" : "Save Session"}
                  >
                    {bookmarked ? (
                      <BookmarkCheck size={20} className="text-wellness-orange fill-current" />
                    ) : (
                      <Bookmark size={20} />
                    )}
                  </button>
                </div>
                <p className="text-xs font-bold text-wellness-muted uppercase tracking-wider mt-1 truncate">
                  {currentTrack.instructor ? `with ${currentTrack.instructor}` : currentTrack.category}
                </p>
                <p className="text-[10px] font-semibold text-wellness-orange bg-wellness-greenLight/60 px-2 py-0.5 rounded-full inline-block mt-2">
                  {currentTrack.category || "Sound Healing"}
                </p>
              </div>
            </div>

            {/* Waveform Visualization */}
            <Waveform isPlaying={isPlaying && !isAudioLoading} />

            {/* Progress seekbar */}
            <ProgressBar progress={progress} duration={duration} onChange={seek} />

            {/* Interactive controls */}
            <div className="flex items-center justify-between px-2 pt-1">
              {/* Loop/Repeat */}
              <button
                onClick={cycleLoopMode}
                className={`p-2 rounded-xl transition ${
                  loopMode !== "none"
                    ? "bg-wellness-orange/10 text-wellness-orange font-bold"
                    : "text-wellness-muted hover:text-wellness-dark"
                }`}
                title={`Repeat: ${loopMode}`}
              >
                <div className="relative">
                  <Repeat size={18} />
                  {loopMode === "one" && (
                    <span className="absolute -top-1 -right-1 text-[8px] bg-wellness-orange text-white rounded-full w-3 h-3 flex items-center justify-center scale-90">
                      1
                    </span>
                  )}
                </div>
              </button>

              {/* Prev / Play / Next */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevTrack}
                  className="p-2 rounded-full text-wellness-muted hover:text-wellness-dark transition-colors active:scale-95"
                >
                  <SkipBack size={20} fill="currentColor" />
                </button>

                <button
                  onClick={togglePlay}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-wellness-dark text-white shadow-glow2 hover:bg-black transition-transform active:scale-95"
                >
                  {isPlaying ? (
                    <Pause size={24} fill="currentColor" />
                  ) : (
                    <Play size={24} fill="currentColor" className="ml-1" />
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  className="p-2 rounded-full text-wellness-muted hover:text-wellness-dark transition-colors active:scale-95"
                >
                  <SkipForward size={20} fill="currentColor" />
                </button>
              </div>

              {/* Toggle Queue */}
              <button
                onClick={() => setShowQueue(!showQueue)}
                className={`p-2 rounded-xl transition ${
                  showQueue
                    ? "bg-wellness-green/10 text-wellness-green font-bold"
                    : "text-wellness-muted hover:text-wellness-dark"
                }`}
                title="Up Next Queue"
              >
                <ListMusic size={18} />
              </button>
            </div>

            {/* Volume slider & mute */}
            <div className="flex items-center justify-between border-t border-wellness-softcream/40 pt-4 px-1">
              <span className="text-[10px] font-bold text-wellness-muted uppercase tracking-wider">
                Volume
              </span>
              <VolumeSlider
                value={volume}
                onChange={setAudioVolume}
                isMuted={isMuted}
                onMuteToggle={toggleMute}
              />
            </div>

            {/* Queue Panel */}
            <AnimatePresence>
              {showQueue && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-3"
                >
                  <PlaylistPanel
                    playlist={playlist}
                    currentIndex={currentIndex}
                    isPlaying={isPlaying}
                    onTrackSelect={(track) => playTrack(track, playlist)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
