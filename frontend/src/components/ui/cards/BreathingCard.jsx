import { motion } from "framer-motion";
import { Wind } from "lucide-react";
import GlassCard from "./GlassCard";
import { hoverLift } from "../../../utils/animations";
import PremiumButton from "../buttons/PremiumButton";

export default function BreathingCard({ exercise, onStart }) {
  return (
    <motion.div variants={hoverLift} initial="rest" whileHover="hover">
      <GlassCard className="p-6 border-white/60 bg-gradient-to-br from-[#eff7ea] to-white/70">
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-wellness-green shadow-sm">
            <Wind size={24} />
          </div>
          <span className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-wellness-greenDark backdrop-blur-sm shadow-sm border border-white/40">
            {exercise.duration} min
          </span>
        </div>
        
        <h4 className="font-heading text-xl font-bold text-wellness-dark">{exercise.title}</h4>
        <p className="mt-2 text-sm text-wellness-muted leading-relaxed line-clamp-2">
          {exercise.description}
        </p>
        
        <div className="mt-6">
          <PremiumButton
            variant="secondary"
            onClick={() => onStart?.(exercise)}
            fullWidth
            className="!py-2.5 !shadow-sm"
          >
            Start Breathing
          </PremiumButton>
        </div>
      </GlassCard>
    </motion.div>
  );
}
