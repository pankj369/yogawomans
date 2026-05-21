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
      <GlassCard className="h-full flex flex-col overflow-hidden border-white/60 bg-wellness-cream2 !rounded-3xl shadow-card">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={liveClass.image} 
            alt={liveClass.instructor} 
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          
          {/* Live Badge */}
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-wellness-dark backdrop-blur-md shadow-sm">
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wellness-orange opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-wellness-orange"></span>
            </div>
            Live Now
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-heading text-xl font-bold leading-tight">{liveClass.title}</h3>
            <p className="mt-1 text-xs text-white/80">with {liveClass.instructor}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div className="flex items-center justify-between text-sm font-semibold text-wellness-muted">
            <span className="flex items-center gap-1.5 rounded-xl bg-white/60 px-3 py-1.5">
              <Radio size={14} className="text-wellness-orange" /> {liveClass.time}
            </span>
            <span className="flex items-center gap-1.5 rounded-xl bg-white/60 px-3 py-1.5">
              <Users size={14} className="text-wellness-green" /> {liveClass.seatsLeft} left
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-wellness-softcream pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-wellness-green">
              {liveClass.category}
            </span>
            <button
              type="button"
              onClick={() => onJoin?.(liveClass)}
              className={[
                "rounded-full px-5 py-2.5 text-xs font-bold transition shadow-sm",
                isJoined
                  ? "bg-wellness-greenLight text-wellness-green cursor-default"
                  : "bg-wellness-dark text-white hover:bg-black hover:shadow-liftSm hover:-translate-y-0.5"
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
