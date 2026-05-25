import { motion } from "framer-motion";

export default function AmbientGlow({ 
  color = "rgba(0, 230, 118, 0.15)", // Default premium glow (emerald)
  size = "500px", 
  top, right, bottom, left, 
  className = "" 
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none mix-blend-screen blur-[100px] ${className}`}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        width: size,
        height: size,
        top,
        right,
        bottom,
        left,
      }}
      animate={{
        scale: [1, 1.1, 0.9, 1],
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
      }}
      transition={{
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
}
