import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function MagneticButton({ 
  children, 
  className = "", 
  onClick, 
  strength = 15,
  glowColor = "rgba(0, 230, 118, 0.4)",
  ...props 
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / strength);
    const y = (clientY - (top + height / 2)) / (height / strength);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{ x: position.x, y: position.y }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Glow effect that follows mouse inside the button */}
      <motion.div
        className="absolute w-12 h-12 rounded-full blur-[20px] pointer-events-none"
        style={{
          background: glowColor,
          opacity: isHovered ? 1 : 0,
        }}
        animate={{
          x: position.x * (strength * 2),
          y: position.y * (strength * 2),
          left: "50%",
          top: "50%",
          translateX: "-50%",
          translateY: "-50%"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      <span className="relative z-10 block">{children}</span>
    </motion.button>
  );
}
