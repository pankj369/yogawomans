import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PremiumButton from "../buttons/PremiumButton";
import { hoverLift } from "../../../utils/animations";

export default function FeaturedProgramCard({ program, onExplore }) {
  return (
    <motion.div
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="relative overflow-hidden rounded-5xl bg-black text-white shadow-heroCard group cursor-pointer"
      onClick={() => onExplore?.(program)}
    >
      <img
        src={program.image}
        alt={program.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-end p-8 sm:p-10">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-wellness-gold/90 mb-2">
          Featured Program
        </p>
        <h3 className="font-heading text-3xl sm:text-4xl font-bold leading-tight tracking-tight drop-shadow-sm mb-3">
          {program.title}
        </h3>
        <p className="max-w-md text-sm text-white/80 leading-relaxed font-medium mb-6 line-clamp-2">
          {program.description}
        </p>
        
        <div className="flex items-center gap-3 mt-auto">
          <PremiumButton
            variant="outline"
            className="!border-white/40 !bg-white/10 !text-white hover:!bg-white/20 backdrop-blur-md"
            onClick={(e) => {
              e.stopPropagation();
              onExplore?.(program);
            }}
          >
            Start Series <ArrowRight size={16} className="ml-2" />
          </PremiumButton>
          <span className="text-xs font-semibold text-white/60">
            {program.duration} Sessions
          </span>
        </div>
      </div>
    </motion.div>
  );
}
