import { motion } from "framer-motion";
import { Play, Pause, Headphones } from "lucide-react";
import { hoverLift } from "../../../utils/animations";

export default function AudioCard({ track, isPlaying, onPlayToggle }) {
  return (
    <motion.div
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="group relative flex items-center justify-between overflow-hidden rounded-3xl border border-wellness-border bg-wellness-glass p-4 shadow-glass backdrop-blur-[18px] transition-all duration-300 hover:bg-white/5 hover:border-wellness-glow/30 cursor-pointer"
      onClick={() => onPlayToggle?.(track)}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
          <img 
            src={track.image} 
            alt={track.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            {isPlaying ? (
              <Pause fill="white" size={16} className="text-white" />
            ) : (
              <Play fill="white" size={16} className="text-white ml-0.5" />
            )}
          </div>
        </div>
        
        <div>
          <h4 className="font-heading text-base font-bold text-white group-hover:text-wellness-glow transition-colors line-clamp-1">{track.title}</h4>
          <p className="text-xs font-semibold text-wellness-muted">{track.category} • {track.duration}m</p>
        </div>
      </div>

      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-wellness-border text-wellness-muted transition-colors hover:bg-wellness-orange hover:border-wellness-orange hover:text-white">
        <Headphones size={16} />
      </button>
    </motion.div>
  );
}
