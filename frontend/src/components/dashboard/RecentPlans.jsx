import { motion } from "framer-motion";
import { Play, Calendar, Clock } from "lucide-react";
import { fadeUp } from "../../utils/animations";

export default function RecentPlans({ plans = [], onContinue }) {
  if (!plans || plans.length === 0) return null;

  return (
    <motion.section variants={fadeUp} className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-extrabold text-white">Your Sanctuary</h2>
        <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-wellness-orange hover:text-wellness-orange/80 transition-colors">
          View All History
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {plans.slice(0, 3).map((plan, index) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group flex items-center justify-between gap-4 rounded-[2rem] bg-wellness-glass p-5 backdrop-blur-[18px] border border-wellness-border shadow-glass transition-all hover:bg-white/5 hover:border-wellness-glow/20"
          >
            <div className="flex items-center gap-6">
              {/* Abstract Icon/Color representation */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-wellness-muted group-hover:bg-wellness-orange/20 group-hover:text-wellness-orange transition-colors border border-wellness-border">
                <Calendar size={18} />
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-wellness-orange">
                    {plan.goal}
                  </span>
                  <span className="text-[10px] text-wellness-muted font-medium flex items-center gap-1">
                    <Clock size={10} /> {plan.duration}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-white group-hover:text-wellness-orange transition-colors">
                  {plan.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-wellness-muted mb-1">
                  Consistency
                </span>
                <span className="text-sm font-semibold text-white">{plan.progress}%</span>
              </div>
              
              <button 
                onClick={() => onContinue(plan)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-wellness-border text-white transition-all hover:border-wellness-orange hover:bg-wellness-orange hover:text-black shadow-sm hover:shadow-[0_0_12px_rgba(255,138,61,0.3)]"
              >
                <Play size={14} fill="currentColor" className="ml-0.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
