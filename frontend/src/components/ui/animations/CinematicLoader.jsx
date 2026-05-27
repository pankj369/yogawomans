// src/components/ui/animations/CinematicLoader.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import fotlogo from "../../../assets/images/fotlogo.png";

export default function CinematicLoader({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Logo and glows fade in (0-1.2s)
    // Stage 2: Breathing scale pulse (1.2-2.6s)
    // Stage 3: Fade out everything (2.6-3.8s)
    
    const timer1 = setTimeout(() => setStage(1), 1200);
    const timer2 = setTimeout(() => setStage(2), 2600);
    const timer3 = setTimeout(() => {
      setStage(3);
      if (onComplete) onComplete();
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          key="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050816] overflow-hidden"
        >
          {/* Ambient Background Glows */}
          <motion.div 
            animate={{ 
              scale: stage >= 2 ? [1.1, 1.25, 1.1] : 1.1,
              opacity: stage >= 1 ? [0.2, 0.35, 0.2] : 0 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(0,230,118,0.18)_0%,_transparent_70%)] blur-[80px]"
          />
          <motion.div 
            animate={{ 
              scale: stage >= 2 ? [1.1, 1.2, 1.1] : 1.1,
              opacity: stage >= 1 ? [0.1, 0.2, 0.1] : 0 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(212,166,79,0.12)_0%,_transparent_70%)] blur-[100px]"
          />

          {/* Logo Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            {/* Pulsing Glowing Logo Image Container */}
            <motion.div
              animate={{ 
                scale: [1, 1.06, 1],
                filter: [
                  "drop-shadow(0 0 20px rgba(0, 230, 118, 0.2))",
                  "drop-shadow(0 0 35px rgba(0, 230, 118, 0.4))",
                  "drop-shadow(0 0 20px rgba(0, 230, 118, 0.2))"
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md p-4"
            >
              <img 
                src={fotlogo} 
                alt="YogaWoman Logo" 
                className="w-full h-full object-contain brightness-0 invert" 
              />
            </motion.div>
            
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-heading font-black text-white tracking-[0.25em] uppercase">
                YogaWoman
              </h1>
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 140, opacity: 0.8 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                className="h-[1.5px] bg-gradient-to-r from-transparent via-[#00E676] to-transparent mt-3 mx-auto"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 1 ? 0.6 : 0 }}
                transition={{ duration: 1 }}
                className="mt-4 text-[9px] font-bold uppercase tracking-[0.4em] text-white/70"
              >
                Awaken Your Spirit
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
