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
        <GlassCard hover className="p-5 border-white/30 bg-white/10 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">{label}</p>
              <p className="mt-2 font-heading text-xl font-bold text-white">{value}</p>
              {subtext && <p className="mt-1 text-xs text-white/80">{subtext}</p>}
            </div>
            {Icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                <Icon size={18} />
              </div>
            )}
          </div>
          
          {progress !== undefined && (
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-wellness-orange to-wellness-green"
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
