import { motion } from "framer-motion";
import { Radio, Users } from "lucide-react";
import { hoverLift } from "../../../utils/animations";
import GlassCard from "./GlassCard";

export default function LiveClassCard({ liveClass, isJoined, onJoin }) {
  return (
    <motion.article
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="group relative overflow-hidden"
    >
      <GlassCard className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-wellness-glow/30 hover:bg-white/5 !rounded-3xl">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={liveClass.image} 
            alt={liveClass.instructor} 
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          
          {/* Live Badge */}
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md shadow-sm">
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wellness-orange opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-wellness-orange"></span>
            </div>
            Live Now
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-heading text-xl font-bold leading-tight group-hover:text-wellness-glow transition-colors">{liveClass.title}</h3>
            <p className="mt-1 text-xs text-white/80">with {liveClass.instructor}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-wellness-muted">
            <span className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-wellness-border px-3 py-1.5 text-white">
              <Radio size={14} className="text-wellness-orange" /> {liveClass.time}
            </span>
            <span className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-wellness-border px-3 py-1.5 text-white">
              <Users size={14} className="text-wellness-glow" /> {liveClass.seatsLeft} left
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-wellness-border pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-wellness-glow">
              {liveClass.category}
            </span>
            <button
              type="button"
              onClick={() => onJoin?.(liveClass)}
              className={[
                "rounded-full px-5 py-2.5 text-xs font-extrabold transition shadow-sm",
                isJoined
                  ? "bg-wellness-glow/20 border border-wellness-glow/40 text-wellness-glow cursor-default"
                  : "bg-wellness-glow text-black hover:bg-wellness-glow/90 hover:shadow-glow2 hover:-translate-y-0.5"
              ].join(" ")}
            >
              {isJoined ? "Joined" : "Join Class"}
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}
