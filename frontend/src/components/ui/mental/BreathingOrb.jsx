import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import DashboardSection from "../sections/DashboardSection";
import SectionHeading from "../sections/SectionHeading";

export default function BreathingOrb({ cycleData }) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer;
    if (isActive) {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      } else {
        // Move to next phase
        const nextIndex = (currentPhaseIndex + 1) % cycleData.cycle.length;
        setCurrentPhaseIndex(nextIndex);
        setTimeLeft(cycleData.cycle[nextIndex].duration);
      }
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft, currentPhaseIndex, cycleData]);

  const handleStart = () => {
    if (!isActive) {
      setCurrentPhaseIndex(0);
      setTimeLeft(cycleData.cycle[0].duration);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhaseIndex(0);
    setTimeLeft(0);
  };

  const currentPhase = isActive ? cycleData.cycle[currentPhaseIndex].phase : "Ready";
  
  // Animation mapping for the orb based on phase
  const getOrbAnimation = () => {
    if (!isActive) return { scale: 1, opacity: 0.5 };
    switch (currentPhase) {
      case "Inhale": return { scale: 1.5, opacity: 0.9, backgroundColor: "#E9F5EB" };
      case "Hold": return { scale: 1.5, opacity: 0.8, backgroundColor: "#E9F5EB" };
      case "Exhale": return { scale: 0.8, opacity: 0.4, backgroundColor: "#F7F3EE" };
      default: return { scale: 1, opacity: 0.5 };
    }
  };

  const getTransitionDuration = () => {
    if (!isActive) return 0.5;
    return cycleData.cycle[currentPhaseIndex].duration;
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[3rem] bg-wellness-dark py-16 sm:py-24 px-4 text-white shadow-heroCard">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      
      {/* Background ambient glows */}
      <motion.div 
        animate={{ scale: isActive ? [1, 1.2, 1] : 1, opacity: isActive ? [0.1, 0.2, 0.1] : 0.1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-96 w-96 rounded-full bg-wellness-green blur-[100px]"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h3 className="font-heading text-2xl font-extrabold text-white/90 mb-1">{cycleData.title}</h3>
        <p className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-12">{cycleData.description}</p>

        {/* The Breathing Orb */}
        <div className="relative flex h-64 w-64 items-center justify-center mb-12">
          {/* Expanding Ring */}
          <motion.div
            animate={getOrbAnimation()}
            transition={{ duration: getTransitionDuration(), ease: "easeInOut" }}
            className="absolute h-48 w-48 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
          />
          {/* Core Orb */}
          <motion.div
            animate={{ scale: isActive && currentPhase === "Inhale" ? 1.2 : isActive && currentPhase === "Exhale" ? 0.8 : 1 }}
            transition={{ duration: getTransitionDuration(), ease: "easeInOut" }}
            className="absolute h-32 w-32 rounded-full bg-gradient-to-br from-white/90 to-white/40 shadow-glow2 flex items-center justify-center text-wellness-dark"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col items-center"
              >
                <span className="font-heading text-xl font-extrabold">{currentPhase}</span>
                {isActive && <span className="text-sm font-bold opacity-60 mt-0.5">{timeLeft}s</span>}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleReset}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handleStart}
            className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-wellness-dark hover:bg-wellness-cream transition-colors shadow-sm"
          >
            {isActive ? <><Pause size={18} /> Pause</> : <><Play size={18} className="ml-0.5" /> Start Breathwork</>}
          </button>
        </div>
      </div>
    </div>
  );
}
