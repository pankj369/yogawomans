import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ScrollReveal from "../../ui/animations/ScrollReveal";

export default function BreathingVisualizer() {
  const [phase, setPhase] = useState("Inhale");
  const controls = useAnimation();

  useEffect(() => {
    let isSubscribed = true;

    const breatheSequence = async () => {
      while (isSubscribed) {
        setPhase("Inhale");
        await controls.start({
          scale: 1.8,
          opacity: 0.8,
          boxShadow: "0 0 100px rgba(0, 230, 118, 0.4)",
          transition: { duration: 4, ease: "easeInOut" }
        });

        if (!isSubscribed) break;
        setPhase("Hold");
        await new Promise(r => setTimeout(r, 2000));

        if (!isSubscribed) break;
        setPhase("Exhale");
        await controls.start({
          scale: 0.8,
          opacity: 0.3,
          boxShadow: "0 0 20px rgba(30, 122, 70, 0.2)",
          transition: { duration: 4, ease: "easeInOut" }
        });

        if (!isSubscribed) break;
        setPhase("Hold");
        await new Promise(r => setTimeout(r, 2000));
      }
    };

    breatheSequence();

    return () => {
      isSubscribed = false;
      controls.stop();
    };
  }, [controls]);

  return (
    <section className="relative w-full py-32 bg-[#0F2E1D] overflow-hidden flex flex-col items-center justify-center border-t border-b border-white/5">
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1E7A46]/20 via-[#0F2E1D] to-[#0A0A0A] z-0" />
      
      <ScrollReveal className="relative z-10 w-full flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96">
          {/* Static outer ring */}
          <div className="absolute inset-0 rounded-full border border-white/5" />
          
          {/* Animated breathing orb */}
          <motion.div
            animate={controls}
            className="absolute rounded-full bg-gradient-to-tr from-[#00E676]/30 to-[#1E7A46]/30 backdrop-blur-3xl w-32 h-32 md:w-48 md:h-48"
          />

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[#F7F3EC] text-2xl md:text-4xl font-extrabold tracking-widest uppercase drop-shadow-lg"
            >
              {phase}
            </motion.p>
          </div>
        </div>

        <p className="mt-16 text-[#888] text-sm md:text-base tracking-[0.2em] uppercase text-center max-w-md px-4">
          Synchronize your breath to connect with your inner calm before moving forward.
        </p>
      </ScrollReveal>
    </section>
  );
}
