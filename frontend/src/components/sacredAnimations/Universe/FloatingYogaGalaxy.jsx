import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FloatingYogaGalaxy({ children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for different layers
  const yLayer1 = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);
  const yLayer2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const yLayer3 = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-transparent">
      
      {/* Background Parallax Silhouettes / Energy Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Layer 1 - Deep background */}
        <motion.div style={{ y: yLayer1 }} className="absolute top-[10%] left-[5%] opacity-10 blur-[8px]">
          <span className="text-[120px] md:text-[200px]" aria-hidden="true">🧘‍♀️</span>
        </motion.div>
        
        {/* Layer 2 - Midground */}
        <motion.div style={{ y: yLayer2 }} className="absolute top-[40%] right-[10%] opacity-20 blur-[4px]">
          <span className="text-[100px] md:text-[150px]" aria-hidden="true">🕊️</span>
        </motion.div>

        {/* Layer 3 - Foreground glowing orb */}
        <motion.div style={{ y: yLayer3 }} className="absolute bottom-[20%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#E9781F]/5 blur-[120px]" />
        <motion.div style={{ y: yLayer1 }} className="absolute top-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-[#1E7A46]/5 blur-[150px]" />

      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
