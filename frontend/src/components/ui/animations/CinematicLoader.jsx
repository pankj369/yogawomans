import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import fotlogo from "../../../assets/images/fotlogo.png"; // fallback if path is correct

export default function CinematicLoader({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Logo fades in (0-1s)
    // Stage 2: Glow pulses (1-2.5s)
    // Stage 3: Fade out everything (2.5-3.5s)
    
    const timer1 = setTimeout(() => setStage(1), 800);
    const timer2 = setTimeout(() => setStage(2), 2200);
    const timer3 = setTimeout(() => {
      setStage(3);
      if (onComplete) onComplete();
    }, 3200);

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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden"
        >
          {/* Ambient Background Glows */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: stage >= 1 ? 0.3 : 0, scale: stage >= 1 ? 1.2 : 0.8 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(0,230,118,0.15)_0%,_transparent_70%)] blur-[80px]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: stage >= 1 ? 0.2 : 0, scale: stage >= 1 ? 1.2 : 0.8 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(233,120,31,0.1)_0%,_transparent_70%)] blur-[100px]"
          />

          {/* Logo Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* If the image path is tricky, we can use a stylized text or ensure the import is correct */}
            <div className="text-4xl font-heading font-extrabold text-white tracking-widest uppercase">
              Yoga<span className="text-wellness-glow">Womans</span>
            </div>
            
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-wellness-glow to-transparent mt-4"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 1 ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-white/50"
            >
              Awaken Your Spirit
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
