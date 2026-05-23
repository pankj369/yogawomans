import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ambientGlow, easings } from "../../../utils/animations";

export default function CinematicLoader({ 
  messages = [
    "Feeling your energy...",
    "Analyzing your wellness needs...",
    "Balancing nervous system recovery...",
    "Curating your personalized flow...",
    "Finalizing your journey..."
  ],
  durationPerMessage = 1500 
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, durationPerMessage);
    return () => clearInterval(interval);
  }, [messages.length, durationPerMessage]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 1, ease: easings.luxurious } }}
      className="flex min-h-[60vh] w-full flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Cinematic "Breathing" Background Aura */}
      <motion.div
        variants={ambientGlow}
        animate="animate"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,114,41,0.15)_0%,transparent_70%)] blur-[50px]"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Breathing Core */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.8, 0.3], 
            scale: [0.85, 1.15, 0.85],
            filter: ["blur(15px)", "blur(25px)", "blur(15px)"]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(226,114,41,0.5)_0%,transparent_70%)]"
        />

        {/* Dynamic Text Cycler */}
        <div className="h-12 w-full text-center flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={step}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.8, ease: easings.cinematic }}
              className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-[#E27229]"
            >
              {messages[step]}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
