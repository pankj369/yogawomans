import { motion } from "framer-motion";
import { fadeUp, hoverLift } from "../../../utils/animations";
import GlassCard from "../cards/GlassCard";

export default function WorkoutStats({ stats }) {
  return (
    <motion.div
      variants={fadeUp}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12"
    >
      {stats.map((stat, i) => (
        <motion.div key={i} variants={hoverLift} whileHover="hover" initial="rest">
          <GlassCard className="p-5 border-white/40 bg-white/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-wellness-muted">{stat.label}</p>
                <p className="mt-1 font-heading text-2xl font-extrabold text-wellness-dark">
                  {stat.value}
                </p>
                <p className="text-xs text-wellness-muted mt-0.5">{stat.unit}</p>
              </div>
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm"
                style={{ color: stat.color }}
              >
                <stat.icon size={18} />
              </div>
            </div>
            {stat.progress !== undefined && (
              <div className="mt-4 flex items-center justify-between">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-wellness-softcream">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: stat.color, width: `${stat.progress}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="ml-3 text-xs font-bold text-wellness-dark">{stat.progress}%</span>
              </div>
            )}
          </GlassCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
