import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Lock, ArrowRight, EyeOff } from "lucide-react";

export default function DoshaAnalysisPreview({ liveScores, isLocked, onStart }) {
  const [curiosityIndex, setCuriosityIndex] = useState(0);

  // Dynamic emotional curiosity triggers
  const curiosityHeadlines = [
    "Scanning energetic blueprint...",
    "Hidden nervous system imbalance detected.",
    "Your dominant dosha is not what you think...",
    "Your sleep pattern reveals elevated Vata.",
    "Your emotional energy is fluctuating today.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCuriosityIndex((prev) => (prev + 1) % curiosityHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [curiosityHeadlines.length]);

  const doshas = [
    { name: "Vata", percent: liveScores.vata, color: "#64C8FF", trait: "Creative & Restless" },
    { name: "Pitta", percent: liveScores.pitta, color: "#FF7832", trait: "Driven & Focused" },
    { name: "Kapha", percent: liveScores.kapha, color: "#64DC96", trait: "Grounded & Stable" },
  ];

  // Sort doshas by percentage to determine dominance for the UI display
  const sortedDoshas = [...doshas].sort((a, b) => b.percent - a.percent);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex h-full flex-col justify-center rounded-[2rem] border border-white/10 bg-[#050814]/80 p-8 shadow-glass backdrop-blur-xl relative overflow-hidden"
    >
      {/* Glow Effect Top Right */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-wellness-glow/20 blur-[50px]" />

      <div className="mb-6 flex items-center justify-between relative z-10">
        <div>
          <h3 className="font-heading text-2xl font-bold text-white">Live AI Analysis</h3>
          <p className="text-sm font-medium text-wellness-muted">Real-time prediction engine</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-inner">
          <Sparkles size={18} className="text-wellness-glow animate-pulse" />
        </div>
      </div>

      {/* Dynamic Curiosity Headline */}
      <div className="mb-6 rounded-2xl bg-wellness-glow/10 border border-wellness-glow/20 p-3 relative z-10">
        <motion.p
          key={curiosityIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold text-wellness-glow text-center uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <EyeOff size={14} /> {curiosityHeadlines[curiosityIndex]}
        </motion.p>
      </div>

      <div className="space-y-6 relative z-10">
        {sortedDoshas.map((dosha, index) => (
          <div key={dosha.name}>
            <div className="mb-2 flex items-center justify-between text-sm font-bold">
              <span className="text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: dosha.color, color: dosha.color }} />
                {dosha.name}
              </span>
              {/* Tease the highest one, blur the rest if locked */}
              {index === 0 || !isLocked ? (
                <span style={{ color: dosha.color }}>{dosha.percent}%</span>
              ) : (
                <span className="text-white/20 filter blur-[4px] select-none">??%</span>
              )}
            </div>
            
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 border border-white/5 relative">
              <motion.div
                animate={{ width: isLocked && index !== 0 ? "30%" : `${dosha.percent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${isLocked && index !== 0 ? 'opacity-30' : ''}`}
                style={{ backgroundColor: dosha.color, boxShadow: `0 0 10px ${dosha.color}` }}
              />
            </div>
            <p className="mt-1.5 text-[0.65rem] uppercase tracking-wider text-wellness-muted">
              {index === 0 || !isLocked ? dosha.trait : <span className="filter blur-[3px]">Locked Trait</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Locked Deep Insights */}
      <div className="mt-8 relative z-10">
        <div className="rounded-2xl bg-white/5 p-4 border border-white/5 relative overflow-hidden min-h-[80px]">
          {/* Blurred Content */}
          <div className={`flex items-start gap-3 transition-all duration-700 ${isLocked ? 'filter blur-md opacity-40 select-none' : ''}`}>
            <Brain size={16} className="mt-1 shrink-0 text-white" />
            <p className="text-xs text-white leading-relaxed font-medium">
              We have detected a deep imbalance in your nervous system. Your sleep architecture is compromised due to excess air element. We recommend grounding practices.
            </p>
          </div>
          
          {/* Lock Overlay */}
          {isLocked && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]"
            >
              <Lock size={20} className="text-wellness-gold mb-2" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-wellness-gold">Insights Locked</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* CTA */}
      <button 
        onClick={onStart}
        className="mt-6 group flex w-full items-center justify-center gap-3 rounded-full bg-wellness-glow px-6 py-4 font-extrabold text-black transition-all hover:bg-wellness-glow/90 hover:scale-[1.02] shadow-[0_0_25px_rgba(0,230,118,0.25)] relative z-10"
      >
        {isLocked ? "Unlock Full Blueprint" : "Create Free Account"}
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>
      
      <p className="text-center text-[10px] font-medium text-wellness-muted mt-4 relative z-10 uppercase tracking-widest">
        Free AI Wellness Analysis
      </p>
    </motion.div>
  );
}
