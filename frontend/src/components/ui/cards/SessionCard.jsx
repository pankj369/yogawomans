import { motion } from "framer-motion";
import { Play, Heart, Lock } from "lucide-react";
import { hoverLift } from "../../../utils/animations";
import { useMedia } from "../../../context/MediaContext";

export default function SessionCard({ session, onClick, onBookmark, isBookmarked }) {
  const { toggleBookmark, isBookmarked: contextIsBookmarked } = useMedia();
  
  const bookmarked = isBookmarked !== undefined ? isBookmarked : contextIsBookmarked(session.id);
  const handleBookmark = (e) => {
    e.stopPropagation();
    if (onBookmark) {
      onBookmark(session);
    } else {
      toggleBookmark(session);
    }
  };

  return (
    <motion.article
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-wellness-border bg-wellness-glass shadow-glass backdrop-blur-[18px] transition-all duration-300 hover:border-wellness-glow/30 hover:bg-white/5 hover:shadow-cardHover cursor-pointer"
      onClick={() => onClick?.(session)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={session.image}
          alt={session.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
        
        {/* Top Badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          {session.premium && (
            <div className="flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-orange backdrop-blur-md">
              <Lock size={10} /> Premium
            </div>
          )}
          {session.category && (
            <div className="rounded-full bg-black/60 border border-white/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {session.category}
            </div>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmark}
          className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-colors ${
            bookmarked ? "bg-wellness-orange border-wellness-orange text-white" : "bg-black/60 border-white/10 text-white hover:bg-wellness-orange hover:border-wellness-orange"
          }`}
        >
          <Heart size={14} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-heading text-lg font-bold text-white line-clamp-1 group-hover:text-wellness-glow transition-colors">
            {session.title}
          </h3>
          <p className="mt-1 text-sm text-wellness-muted line-clamp-2 leading-relaxed font-medium">
            {session.description}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-xs font-semibold text-wellness-muted border-t border-wellness-border pt-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-white/5 border border-wellness-border px-2 py-1 rounded-md text-white">
              <Play size={12} className="text-wellness-orange" /> {session.duration}m
            </span>
            <span className="text-wellness-muted">{session.level}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
