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
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/60 bg-wellness-cream2 shadow-card cursor-pointer"
      onClick={() => onClick?.(session)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={session.image}
          alt={session.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
        
        {/* Top Badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          {session.premium && (
            <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-orange backdrop-blur-md">
              <Lock size={10} /> Premium
            </div>
          )}
          {session.category && (
            <div className="rounded-full bg-black/40 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {session.category}
            </div>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmark}
          className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
            bookmarked ? "bg-wellness-orange text-white" : "bg-black/30 text-white hover:bg-wellness-orange"
          }`}
        >
          <Heart size={14} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-heading text-lg font-bold text-wellness-dark line-clamp-1 group-hover:text-wellness-green transition-colors">
            {session.title}
          </h3>
          <p className="mt-1 text-sm text-wellness-muted line-clamp-2 leading-relaxed">
            {session.description}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-xs font-semibold text-wellness-muted border-t border-wellness-softcream pt-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm">
              <Play size={12} className="text-wellness-orange" /> {session.duration}m
            </span>
            <span>{session.level}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
