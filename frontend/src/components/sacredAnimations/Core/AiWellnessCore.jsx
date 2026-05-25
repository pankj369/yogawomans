import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../../ui/animations/ScrollReveal";

const coreFeatures = [
  { id: 1, label: "AI Plans", icon: "🧠", angle: 0 },
  { id: 2, label: "Meditation", icon: "🧘‍♀️", angle: 60 },
  { id: 3, label: "Recovery", icon: "🌿", angle: 120 },
  { id: 4, label: "Breathing", icon: "🌬️", angle: 180 },
  { id: 5, label: "Yoga", icon: "🕉️", angle: 240 },
  { id: 6, label: "Metrics", icon: "📊", angle: 300 },
];

export default function AiWellnessCore() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full py-32 bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center">
      <ScrollReveal className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-24 z-20">
          <p className="text-[#00E676] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            Intelligence Meets Soul
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#F7F3EC] mb-4">
            AI Wellness Core
          </h2>
          <p className="text-[#888] max-w-lg mx-auto">
            The beating heart of YogaWomans. Our sacred AI engine synthesizes your metrics, mood, and goals to generate perfect wellness pathways.
          </p>
        </div>

        {/* Sacred Geometry Wheel */}
        <div 
          className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-[2px] border-[#1E7A46]/30 border-dashed"
            animate={{ rotate: isHovered ? 0 : 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner Ring */}
          <motion.div
            className="absolute inset-10 rounded-full border border-[#E9781F]/20"
            animate={{ rotate: isHovered ? 0 : -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* Center Brain/Lotus Core */}
          <motion.div
            className="absolute z-20 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#0F2E1D] border border-[#00E676]/40 shadow-[0_0_80px_rgba(0,230,118,0.3)] flex flex-col items-center justify-center backdrop-blur-xl"
            animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 40px rgba(0,230,118,0.2)", "0 0 80px rgba(0,230,118,0.5)", "0 0 40px rgba(0,230,118,0.2)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              {activeFeature ? (
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center px-2"
                >
                  <span className="text-3xl block mb-1" aria-hidden="true">{activeFeature.icon}</span>
                  <span className="text-[#00E676] font-bold text-sm tracking-wider uppercase">
                    {activeFeature.label}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <span className="text-4xl text-[#00E676] block mb-2" aria-hidden="true">🧠</span>
                  <span className="text-white/50 text-[10px] uppercase tracking-[0.2em]">Core Active</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Orbiting Nodes */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: isHovered ? 0 : 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {coreFeatures.map((feature) => (
              <div
                key={feature.id}
                className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 pointer-events-auto cursor-pointer"
                style={{
                  transform: `rotate(${feature.angle}deg) translateX(var(--wheel-radius, 150px)) rotate(-${feature.angle}deg)`,
                }}
                onMouseEnter={() => setActiveFeature(feature)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                {/* Counter rotation for the icon so it stays upright against the parent's spin */}
                <motion.div
                  className="w-full h-full relative z-30 rounded-full bg-[#0A0A0A] border border-[#1E7A46] flex items-center justify-center transition-all duration-300"
                  animate={{ 
                    rotate: isHovered ? 0 : -360,
                    scale: activeFeature?.id === feature.id ? 1.2 : 1,
                    borderColor: activeFeature?.id === feature.id ? '#00E676' : '#1E7A46',
                    boxShadow: activeFeature?.id === feature.id ? '0 0 30px rgba(0,230,118,0.4)' : 'none'
                  }}
                  transition={{ 
                    rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.2 }
                  }}
                >
                  <span className="text-2xl" aria-hidden="true">{feature.icon}</span>
                </motion.div>
              </div>
            ))}
          </motion.div>

        </div>
      </ScrollReveal>
      
      {/* Mobile radius override */}
      <style>{`
        @media (min-width: 768px) {
          :root { --wheel-radius: 250px; }
        }
      `}</style>
    </section>
  );
}
