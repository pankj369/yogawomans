import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import ProgressRing from "../progress/ProgressRing";
import { hoverLift } from "../../../utils/animations";

export default function WellnessStatCard({ stat }) {
  const Icon = stat.icon;
  
  return (
    <motion.div variants={hoverLift} whileHover="hover" initial="rest">
      <GlassCard className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-wellness-muted">{stat.label}</p>
            <p className="mt-2 font-heading text-3xl font-bold text-wellness-dark">
              {stat.value}
            </p>
          </div>
          {Icon && (
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm"
              style={{ color: stat.color }}
            >
              <Icon size={18} />
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <ProgressRing value={stat.value} total={stat.total} color={stat.color} size={48} strokeWidth={4} />
          <p className="text-xs text-wellness-muted leading-relaxed flex-1">
            {stat.subtext || "Keep up the great work! Your consistency is building healthy habits."}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
