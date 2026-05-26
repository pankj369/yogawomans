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
      className="group relative overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-8 sm:p-10 shadow-glass backdrop-blur-[18px] transition-all duration-300 hover:border-wellness-glow/20"
    >
      {/* Background depth & glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,230,118,0.12)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-wellness-orange/5 blur-[60px] transition-all duration-700 group-hover:bg-wellness-orange/15 group-hover:blur-[80px]" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
        
        <div className="flex-1 text-white">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-wellness-orange mb-5">
            <Activity size={14} className="animate-pulse" />
            <span>Continue Your Healing Journey</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {lastSession.title}
          </h2>
          
          <div className="flex items-center gap-6 text-sm text-wellness-muted font-medium tracking-wide">
            <span className="flex items-center gap-2"><Clock size={16} /> {lastSession.duration} remaining</span>
            <span className="rounded-full border border-wellness-border bg-white/5 px-3 py-1 text-xs text-white">
              {lastSession.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end w-full md:w-auto gap-5 text-white">
          <div className="flex items-center gap-4 w-full md:w-48">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-wellness-muted">
              Progress
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${lastSession.progress}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-wellness-orange rounded-full shadow-[0_0_8px_#FF8A3D]"
              />
            </div>
            <span className="text-xs font-bold text-white">{lastSession.progress}%</span>
          </div>

          <PremiumButton 
            onClick={onContinue}
            icon={Play}
            className="w-full md:w-auto bg-wellness-glow hover:bg-wellness-glow/95 border border-wellness-glow/30 text-black font-extrabold shadow-[0_0_15px_rgba(0,230,118,0.25)] hover:scale-[1.03]"
          >
            Resume Flow
          </PremiumButton>
        </div>

      </div>
    </motion.section>
  );
}
