import { motion } from "framer-motion";
import { Play, Pause, Headphones, Bookmark, BookmarkCheck } from "lucide-react";
import { useMedia } from "../../../context/MediaContext";
import { hoverLift } from "../../../utils/animations";

export default function TrackCard({ track }) {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    toggleBookmark,
    isBookmarked,
  } = useMedia();

  const isCurrent = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;
  const bookmarked = isBookmarked(track.id);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <motion.div
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className={`group relative flex items-center justify-between overflow-hidden rounded-3xl border p-4 shadow-glass backdrop-blur-[18px] transition-all duration-300 cursor-pointer ${
        isCurrent
          ? "border-wellness-orange bg-wellness-glow/10 shadow-[0_0_15px_rgba(0,230,118,0.05)]"
          : "border-wellness-border bg-wellness-glass hover:bg-white/5 hover:border-wellness-glow/30"
      }`}
      onClick={handlePlayClick}
    >
      <div className="flex items-center gap-4">
        {/* Cover Art */}
        <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white/5 border border-wellness-border shadow-sm flex-shrink-0">
          <img
            src={track.image}
            alt={track.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/25 opacity-40 group-hover:opacity-60 transition-opacity" />
          
          {/* Overlay Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayClick}
              className={`h-8 w-8 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all duration-200 ${
                isCurrent
                  ? "bg-wellness-orange text-white"
                  : "bg-wellness-glow/20 border border-wellness-glow/40 text-wellness-glow hover:bg-wellness-glow hover:text-black"
              }`}
            >
              {isCurrentlyPlaying ? (
                <Pause fill="currentColor" size={12} className={isCurrent ? "text-white" : "text-wellness-glow"} />
              ) : (
                <Play fill="currentColor" size={12} className={`ml-0.5 ${isCurrent ? "text-white" : "text-wellness-glow"}`} />
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="min-w-0 pr-2">
          <h4 className={`font-heading text-sm sm:text-base font-bold truncate leading-snug transition-colors duration-200 ${
            isCurrent ? "text-wellness-orange" : "text-white group-hover:text-wellness-orange"
          }`}>
            {track.title}
          </h4>
          <p className="text-[11px] font-semibold text-wellness-muted truncate mt-0.5">
            {track.instructor ? `${track.instructor} • ` : ""}{track.category} • {track.duration}m
          </p>
        </div>
      </div>

      {/* Bookmark Action */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark(track);
        }}
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
          bookmarked
            ? "bg-wellness-orange/15 text-wellness-orange hover:bg-wellness-orange hover:text-white"
            : "bg-white/5 border border-wellness-border text-wellness-muted hover:bg-wellness-orange hover:text-white"
        }`}
        title={bookmarked ? "Bookmarked" : "Bookmark track"}
      >
        {bookmarked ? (
          <BookmarkCheck size={16} className="fill-current" />
        ) : (
          <Bookmark size={16} />
        )}
      </button>
    </motion.div>
  );
}
