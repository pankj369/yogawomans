import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../../ui/animations/ScrollReveal";

const cardsData = [
  { id: 1, title: "AI Plans", desc: "Personalized journeys", color: "#00E676" },
  { id: 2, title: "Meditation", desc: "Guided calmness", color: "#E9781F" },
  { id: 3, title: "Recovery", desc: "Deep healing", color: "#34A853" },
  { id: 4, title: "Yoga", desc: "Sacred flow", color: "#AF52DE" },
  { id: 5, title: "Calm Music", desc: "Solfeggio frequencies", color: "#5B6ABF" },
  { id: 6, title: "Metrics", desc: "Track your soul", color: "#FF9500" },
];

export default function OrbitingWellnessCards() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full py-32 bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center">
      <ScrollReveal className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#F7F3EC] mb-4">
          The <span className="text-[#00E676]">Ecosystem</span>
        </h2>
        <p className="text-[#888] max-w-2xl mx-auto">
          Explore the orbiting pillars of your wellness journey.
        </p>
      </ScrollReveal>

      <div 
        className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center perspective-[1000px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Center Object */}
        <div className="absolute z-20 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#0F2E1D] to-[#1E7A46] shadow-[0_0_60px_rgba(0,230,118,0.4)] flex items-center justify-center">
          <span className="text-4xl text-white">✨</span>
        </div>

        {/* Orbit Path 1 */}
        <motion.div
          className="absolute inset-0 preserve-3d"
          animate={{ rotateY: isHovered ? 0 : 360, rotateX: 20 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {cardsData.slice(0, 3).map((card, index) => {
            const angle = (index / 3) * 360;
            return (
              <div
                key={card.id}
                className="absolute top-1/2 left-1/2 w-40 h-24 -ml-20 -mt-12"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(250px)`,
                }}
              >
                <motion.div
                  className="w-full h-full bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:border-white/40"
                  style={{ boxShadow: `0 4px 20px ${card.color}20` }}
                  animate={{ rotateY: isHovered ? 0 : -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <h3 className="text-white font-bold text-sm" style={{ color: card.color }}>{card.title}</h3>
                  <p className="text-white/50 text-xs mt-1">{card.desc}</p>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Orbit Path 2 (Reverse, different axis) */}
        <motion.div
          className="absolute inset-0 preserve-3d"
          animate={{ rotateY: isHovered ? 0 : -360, rotateZ: 20 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {cardsData.slice(3, 6).map((card, index) => {
            const angle = (index / 3) * 360 + 45; // Offset
            return (
              <div
                key={card.id}
                className="absolute top-1/2 left-1/2 w-40 h-24 -ml-20 -mt-12"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(320px)`,
                }}
              >
                <motion.div
                  className="w-full h-full bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:border-white/40"
                  style={{ boxShadow: `0 4px 20px ${card.color}20` }}
                  animate={{ rotateY: isHovered ? 0 : 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                >
                  <h3 className="text-white font-bold text-sm" style={{ color: card.color }}>{card.title}</h3>
                  <p className="text-white/50 text-xs mt-1">{card.desc}</p>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}
