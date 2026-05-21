import { motion } from "framer-motion";
import { Play, Lock, Flame, Clock } from "lucide-react";
import { hoverLift } from "../../../utils/animations";

export default function VideoPreviewCard({ video, isLocked, onClick }) {
  return (
    <motion.article
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-card cursor-pointer"
      onClick={() => onClick?.(video)}
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={video.image}
          alt={video.title}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            isLocked ? "blur-sm brightness-75 scale-105" : ""
          }`}
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {isLocked && <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />}
        
        {/* Top Badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          {video.premium && (
            <div className="flex items-center gap-1.5 rounded-full bg-wellness-dark/90 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-gold backdrop-blur-md shadow-sm">
              <Lock size={12} /> Premium
            </div>
          )}
          {video.category && (
            <div className="rounded-full bg-white/90 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-dark backdrop-blur-md shadow-sm">
              {video.category}
            </div>
          )}
        </div>

        {/* Play / Lock Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`flex h-16 w-16 items-center justify-center rounded-full shadow-xl transition-transform duration-300 ${
            isLocked 
              ? "bg-black/60 text-white backdrop-blur-md border border-white/20" 
              : "bg-white/90 text-wellness-dark backdrop-blur-md border border-white/40 scale-90 group-hover:scale-100"
          }`}>
            {isLocked ? <Lock size={24} /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </div>
        </div>

        {/* Lock Prompt */}
        {isLocked && (
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-xs font-bold text-white tracking-widest uppercase shadow-sm">Unlock to view</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 bg-wellness-cream2">
        <div>
          <h3 className="font-heading text-xl font-bold text-wellness-dark line-clamp-1 group-hover:text-wellness-green transition-colors">
            {video.title}
          </h3>
          <p className="mt-1.5 text-sm text-wellness-muted line-clamp-2 leading-relaxed font-medium">
            {video.description}
          </p>
        </div>
        
        <div className="mt-5 flex items-center justify-between text-xs font-bold text-wellness-dark">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-white/50 text-wellness-orange">
              <Clock size={14} /> {video.duration}m
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-white/50 text-wellness-red">
              <Flame size={14} /> {video.calories} kcal
            </span>
          </div>
          <span className="uppercase tracking-widest text-[0.65rem] text-wellness-muted">{video.level}</span>
        </div>
      </div>
    </motion.article>
  );
}
