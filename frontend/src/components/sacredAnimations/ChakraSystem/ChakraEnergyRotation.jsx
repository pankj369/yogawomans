import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chakraData } from "./chakraData";
import ScrollReveal from "../../ui/animations/ScrollReveal";

export default function ChakraEnergyRotation() {
  const [activeChakra, setActiveChakra] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [radius, setRadius] = useState(160);

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 120 : 220);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center py-24">
      {/* Dynamic Background Aura based on active chakra */}
      <motion.div
        className="absolute inset-0 z-0 blur-[120px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{
          background: activeChakra 
            ? `radial-gradient(circle at center, ${activeChakra.color}, transparent 60%)` 
            : 'radial-gradient(circle at center, #1E7A46, transparent 60%)'
        }}
      />

      <ScrollReveal className="z-10 relative flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#F7F3EC] mb-2 text-center">
          7 Energy <span className="text-[#00E676]">Chakras</span>
        </h2>
        <p className="text-[#888] text-sm md:text-base tracking-widest uppercase mb-16 text-center">
          Align Your Inner Universe
        </p>

        <div 
          className="relative flex items-center justify-center"
          style={{ width: radius * 2.5, height: radius * 2.5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Rotating Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[rgba(255,255,255,0.05)] border-dashed pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-[#1E7A46]/20 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />

          {/* Center Source */}
          <motion.div
            className="absolute flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#0F2E1D] border border-[#00E676]/30 shadow-[0_0_50px_rgba(0,230,118,0.2)] z-10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              {activeChakra ? (
                <motion.div
                  key={activeChakra.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center"
                >
                  <p className="text-xl md:text-2xl font-bold" style={{ color: activeChakra.color }}>
                    {activeChakra.sanskrit}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-white/70 mt-1">
                    {activeChakra.name}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <span className="text-3xl">🧘‍♀️</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Orbiting Nodes */}
          {chakraData.map((chakra, index) => {
            const angle = (index / 7) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = activeChakra?.id === chakra.id;

            return (
              <motion.div
                key={chakra.id}
                className="absolute w-12 h-12 md:w-16 md:h-16 flex items-center justify-center cursor-pointer z-20 group"
                style={{
                  x,
                  y,
                }}
                animate={!isHovered ? {
                  // If not hovered, let them subtly float
                  x: x + Math.cos(Date.now() / 1000 + index) * 5,
                  y: y + Math.sin(Date.now() / 1000 + index) * 5,
                } : { x, y }}
                transition={{ type: "spring", stiffness: 50 }}
                onMouseEnter={() => setActiveChakra(chakra)}
                onMouseLeave={() => setActiveChakra(null)}
              >
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: `0 0 20px ${chakra.glow}`, opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1.5 : 1 }}
                />

                <motion.div
                  className="relative w-full h-full rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 overflow-hidden"
                  style={{ background: 'rgba(10,10,10,0.8)' }}
                  animate={{ 
                    borderColor: isActive ? chakra.color : 'rgba(255,255,255,0.1)',
                    scale: isActive ? 1.1 : 1 
                  }}
                >
                  <span className="text-xl" aria-hidden="true">{chakra.icon}</span>
                </motion.div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-4 w-40 text-center pointer-events-none"
                  >
                    <p className="text-xs text-white/90 leading-tight">
                      {chakra.meaning}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
