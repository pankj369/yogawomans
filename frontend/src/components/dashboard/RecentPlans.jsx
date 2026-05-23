import { motion } from "framer-motion";
import { Play, Calendar, Clock } from "lucide-react";
import { fadeUp } from "../../utils/animations";

export default function RecentPlans({ plans = [], onContinue }) {
  if (!plans || plans.length === 0) return null;

  return (
    <motion.section variants={fadeUp} className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-extrabold text-[#11281d]">Your Sanctuary</h2>
        <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E27229] hover:text-[#d5631c] transition-colors">
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
            className="group flex items-center justify-between gap-4 rounded-[2rem] bg-white/40 p-5 backdrop-blur-md border border-[#EFE7DC] transition-all hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-6">
              {/* Abstract Icon/Color representation */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#EFE7DC]/50 text-[#8FA68E] group-hover:bg-[#E27229]/10 group-hover:text-[#E27229] transition-colors">
                <Calendar size={18} />
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E27229]">
                    {plan.goal}
                  </span>
                  <span className="text-[10px] text-[#8FA68E] font-medium flex items-center gap-1">
                    <Clock size={10} /> {plan.duration}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-light text-[#11281d] group-hover:text-[#E27229] transition-colors">
                  {plan.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8FA68E] mb-1">
                  Consistency
                </span>
                <span className="text-sm font-semibold text-[#11281d]">{plan.progress}%</span>
              </div>
              
              <button 
                onClick={() => onContinue(plan)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EFE7DC] text-[#3a4a3d] transition-all hover:border-[#E27229] hover:bg-[#E27229] hover:text-white"
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
