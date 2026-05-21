import { motion } from "framer-motion";
import { Play } from "lucide-react";
import GlassCard from "./GlassCard";
import { hoverLift } from "../../../utils/animations";

export default function MediaCard({ item, onClick, progress }) {
  return (
    <motion.div
      variants={hoverLift}
      whileHover="hover"
      initial="rest"
      className="relative cursor-pointer group flex-shrink-0 w-72 sm:w-80"
      onClick={() => onClick?.(item)}
    >
      <div className="relative h-44 w-full overflow-hidden rounded-3xl border border-white/20">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white shadow-glow2 transform transition-transform duration-300 scale-90 group-hover:scale-100">
            <Play fill="white" size={24} className="ml-1" />
          </div>
        </div>

        {/* Progress Bar (if continuing) */}
        {progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
            <div 
              className="h-full bg-wellness-orange"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="font-heading text-lg font-bold leading-tight line-clamp-1">{item.title}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
            <span>{item.duration} min</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span>{item.instructor}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
