import { motion } from "framer-motion";
import { Wind } from "lucide-react";
import GlassCard from "./GlassCard";
import { hoverLift } from "../../../utils/animations";
import PremiumButton from "../buttons/PremiumButton";

export default function BreathingCard({ exercise, onStart }) {
  return (
    <motion.div variants={hoverLift} initial="rest" whileHover="hover">
      <GlassCard className="p-6 transition-all duration-300 hover:border-wellness-glow/30 hover:bg-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-wellness-border text-wellness-glow shadow-glow2">
            <Wind size={24} />
          </div>
          <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-bold text-wellness-glow backdrop-blur-sm shadow-sm border border-wellness-border">
            {exercise.duration} min
          </span>
        </div>
        
        <h4 className="font-heading text-xl font-bold text-white group-hover:text-wellness-glow transition-colors">{exercise.title}</h4>
        <p className="mt-2 text-sm text-wellness-muted leading-relaxed line-clamp-2">
          {exercise.description}
        </p>
        
        <div className="mt-6">
          <PremiumButton
            variant="secondary"
            onClick={() => onStart?.(exercise)}
            fullWidth
            className="!py-2.5 !shadow-sm !bg-wellness-glow hover:!bg-wellness-glow/95 !text-black !font-extrabold !border-none"
          >
            Start Breathing
          </PremiumButton>
        </div>
      </GlassCard>
    </motion.div>
  );
}
