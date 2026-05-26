import { motion } from "framer-motion";
import { floatingAnimation, fadeUp } from "../../../utils/animations";
import GlassCard from "../cards/GlassCard";

export default function FloatingStatCard({
  label,
  value,
  subtext,
  icon: Icon,
  delay = 0,
  progress,
  className = ""
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={className}
    >
      <motion.div
        variants={floatingAnimation}
        initial="rest"
        animate="float"
        transition={{ delay }}
      >
        <GlassCard hover className="p-5 border-wellness-border bg-wellness-glass hover:border-wellness-glow/30 hover:bg-white/5 shadow-glass backdrop-blur-[18px] transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">{label}</p>
              <p className="mt-2 font-heading text-xl font-bold text-white">{value}</p>
              {subtext && <p className="mt-1 text-xs text-white/80">{subtext}</p>}
            </div>
            {Icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-wellness-border text-wellness-glow backdrop-blur-md">
                <Icon size={18} />
              </div>
            )}
          </div>
          
          {progress !== undefined && (
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-wellness-orange to-wellness-gold"
                initial={{ width: "0%" }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: delay + 0.2 }}
              />
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
