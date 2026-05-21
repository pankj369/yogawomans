import { motion } from "framer-motion";

export default function OverlayLayer({
  variant = "dark", // "dark" | "light" | "cinematic"
  opacity = 100, // 0-100
  className = "",
}) {
  const variants = {
    dark: "bg-black",
    light: "bg-white",
    cinematic: "bg-[linear-gradient(180deg,transparent_0%,rgba(26,26,26,0.62)_100%)]",
  };

  const opacityClass = `opacity-${opacity}`;

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${variants[variant]} ${variant !== 'cinematic' ? opacityClass : ''} ${className}`}
    />
  );
}
