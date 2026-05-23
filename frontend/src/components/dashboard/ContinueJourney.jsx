import { motion } from "framer-motion";
import { Play, Activity, Clock } from "lucide-react";
import { fadeLeft } from "../../utils/animations";
import PremiumButton from "../ui/PremiumButton";

export default function ContinueJourney({ 
  lastSession = {
    title: "Deep Nervous System Reset",
    duration: "20 mins",
    progress: 40,
    category: "Restorative"
  },
  onContinue
}) {
  if (!lastSession) return null;

  return (
    <motion.section 
      variants={fadeLeft}
      className="group relative overflow-hidden rounded-[2.5rem] bg-[#11281d] p-8 sm:p-10 shadow-[0_20px_40px_rgba(17,40,29,0.15)] transition-all hover:shadow-[0_30px_60px_rgba(17,40,29,0.2)]"
    >
      {/* Background depth & glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(47,107,59,0.4)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#E27229]/10 blur-[60px] transition-all duration-700 group-hover:bg-[#E27229]/20 group-hover:blur-[80px]" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
        
        <div className="flex-1 text-white">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E27229] mb-5">
            <Activity size={14} className="animate-pulse" />
            <span>Continue Your Healing Journey</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mb-4">
            {lastSession.title}
          </h2>
          
          <div className="flex items-center gap-6 text-sm text-[#8FA68E] font-medium tracking-wide">
            <span className="flex items-center gap-2"><Clock size={16} /> {lastSession.duration} remaining</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
              {lastSession.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end w-full md:w-auto gap-5">
          <div className="flex items-center gap-4 w-full md:w-48">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8FA68E]">
              Progress
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${lastSession.progress}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-[#E27229] rounded-full"
              />
            </div>
            <span className="text-xs font-bold text-white">{lastSession.progress}%</span>
          </div>

          <PremiumButton 
            onClick={onContinue}
            icon={Play}
            className="w-full md:w-auto bg-white/10 border border-white/20 hover:bg-white hover:text-[#11281d] text-white"
          >
            Resume Flow
          </PremiumButton>
        </div>

      </div>
    </motion.section>
  );
}
