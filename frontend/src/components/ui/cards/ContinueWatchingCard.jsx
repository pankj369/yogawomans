import { motion } from "framer-motion";
import { Play, Headphones, Tv, Trash2 } from "lucide-react";
import { useMedia } from "../../../context/MediaContext";
import { hoverLift } from "../../../utils/animations";

export default function ContinueWatchingCard({ item }) {
  const { playTrack, playVideo, removeFromHistory } = useMedia();

  const handlePlay = (e) => {
    e.stopPropagation();
    if (item.mediaType === "video") {
      playVideo(item);
    } else {
      playTrack(item);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeFromHistory(item.id);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === undefined) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const isVideo = item.mediaType === "video";
  const percentage = item.percentage || 0;

  return (
    <motion.div
      variants={hoverLift}
      whileHover="hover"
      initial="rest"
      className="relative cursor-pointer group flex-shrink-0 w-72 sm:w-80 rounded-3xl overflow-hidden border border-white/40 bg-white/10 backdrop-blur-md shadow-card transition-all hover:border-white/60"
      onClick={handlePlay}
    >
      {/* Thumbnail Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-90" />

        {/* Media type icon badge (top-left) */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white tracking-wide uppercase">
          {isVideo ? (
            <>
              <Tv size={10} className="text-wellness-orange" />
              <span>Video</span>
            </>
          ) : (
            <>
              <Headphones size={10} className="text-wellness-gold" />
              <span>Audio</span>
            </>
          )}
        </div>

        {/* Delete button (top-right) */}
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white/60 hover:text-white hover:bg-black/70 transition opacity-0 group-hover:opacity-100 z-10"
          title="Remove from history"
        >
          <Trash2 size={12} />
        </button>

        {/* Play Icon hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white shadow-glow2 transform transition-transform duration-300 scale-90 group-hover:scale-100">
            <Play fill="white" size={20} className="ml-0.5" />
          </div>
        </div>

        {/* Continue Text / Percentage details */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h4 className="font-heading text-base font-bold leading-tight line-clamp-1">
            {item.title}
          </h4>
          <div className="mt-1 flex items-center justify-between text-[11px] text-white/70 font-semibold">
            <span>{item.instructor ? `with ${item.instructor}` : item.category}</span>
            <span>
              {percentage}% ({formatTime(item.progress)} left)
            </span>
          </div>
        </div>
      </div>

      {/* Progress slider bar at the bottom */}
      <div className="w-full h-2 bg-white/15 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-wellness-orange to-wellness-gold transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </motion.div>
  );
}
