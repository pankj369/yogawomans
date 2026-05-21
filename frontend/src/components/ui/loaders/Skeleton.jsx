import React from "react";
import { motion } from "framer-motion";
import { shimmer } from "../../../utils/animations";

/**
 * Reusable skeleton loader with a cinematic shimmer effect.
 */
export default function Skeleton({ 
  className = "", 
  variant = "rounded" // 'circular' | 'rounded' | 'rectangular'
}) {
  const getRadius = () => {
    switch (variant) {
      case "circular": return "rounded-full";
      case "rectangular": return "rounded-none";
      case "rounded":
      default: return "rounded-2xl";
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-white/20 backdrop-blur-md ${getRadius()} ${className}`}
    >
      <motion.div
        variants={shimmer}
        initial="initial"
        animate="animate"
        className="absolute inset-0 z-10 w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
