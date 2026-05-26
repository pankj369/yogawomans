import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeTransitionOverlay({ direction = "to-dark", onComplete }) {
  const [phase, setPhase] = useState("entering"); // 'entering' | 'transitioning' | 'complete'

  useEffect(() => {
    // 1. Initial fade-in of overlay (0 - 300ms)
    // 2. Morph the background and animate the glowing center symbol (300ms - 1100ms)
    // 3. Dissolve overlay (1100ms - 1400ms)
    const transitionTimer = setTimeout(() => {
      setPhase("transitioning");
    }, 300);

    const completeTimer = setTimeout(() => {
      setPhase("complete");
      if (onComplete) onComplete();
    }, 1400);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Dynamic backgrounds based on transition direction
  const isToDark = direction === "to-dark";
  const startBg = isToDark ? "#F7F3EC" : "#050816";
  const endBg = isToDark ? "#050816" : "#F7F3EC";

  const glowColor = isToDark ? "rgba(0, 230, 118, 0.25)" : "rgba(200, 155, 60, 0.2)";

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ zIndex: 99999 }}
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
        >
          {/* Background Layer with Morphing Color */}
          <motion.div
            initial={{ backgroundColor: startBg }}
            animate={{ backgroundColor: phase === "transitioning" ? endBg : startBg }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          />

          {/* Atmospheric Glowing Auras */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: phase === "transitioning" ? 0.35 : 0.15,
              scale: phase === "transitioning" ? 1.3 : 1 
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ backgroundColor: glowColor }}
            className="absolute w-[600px] h-[600px] rounded-full blur-[90px] pointer-events-none"
          />

          {/* Central Sacred Symbol (Lotus SVG) */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(5px)" }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              filter: "blur(0px)" 
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Elegant Lotus Path */}
            <motion.svg
              animate={{ 
                rotate: [0, 5, 0],
                scale: [1, 1.04, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-24 h-24 text-luxury-gold drop-shadow-[0_0_20px_rgba(200,155,60,0.25)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Spiritual Lotus Flower outline */}
              <path d="M12 2C12 2 9 8 9 12C9 16 12 22 12 22C12 22 15 16 15 12C15 8 12 2 12 2Z" />
              <path d="M12 8C10.5 8 5 11 5 13.5C5 16 8.5 17.5 12 17.5" />
              <path d="M12 8C13.5 8 19 11 19 13.5C19 16 15.5 17.5 12 17.5" />
              <path d="M12 11.5C9 11.5 7 14 7 15.5C7 17 9.5 19 12 19" />
              <path d="M12 11.5C15 11.5 17 14 17 15.5C17 17 14.5 19 12 19" />
            </motion.svg>

            {/* Glowing Text */}
            <motion.h2 
              initial={{ letterSpacing: "0.2em", opacity: 0.6 }}
              animate={{ letterSpacing: "0.3em", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`mt-6 font-heading text-xl font-bold uppercase ${
                isToDark ? "text-white" : "text-luxury-text"
              }`}
            >
              YogaWomans
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`mt-2 text-[9px] uppercase tracking-[0.4em] font-semibold ${
                isToDark ? "text-white/60" : "text-luxury-muted"
              }`}
            >
              Aligning Energies
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
