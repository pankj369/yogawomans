import { motion } from "framer-motion";

export default function PremiumButton({
  children,
  variant = "primary", // "primary" | "secondary" | "outline"
  icon: Icon,
  onClick,
  className = "",
  fullWidth = false,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-300 ease-spring active:translate-y-0";
  
  const variants = {
    primary: "bg-btn-primary text-white shadow-glow2 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(231,123,53,0.32)]",
    healing: "bg-btn-healing text-white shadow-md hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(45,99,56,0.18)]",
    secondary: "bg-wellness-greenLight text-wellness-greenDark hover:bg-[#e4f2dc] hover:-translate-y-0.5 hover:shadow-liftSm",
    outline: "border border-wellness-green/35 bg-white/55 text-wellness-greenDark hover:bg-white hover:-translate-y-0.5 hover:shadow-liftSm",
    upgrade: "bg-gradient-to-r from-emerald-500 via-teal-400 to-[#00E676] text-black font-extrabold border border-wellness-glow/20 hover:-translate-y-0.5"
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      {...(variant === "upgrade" ? {
        animate: { 
          boxShadow: [
            "0 0 12px rgba(0, 230, 118, 0.25)",
            "0 0 25px rgba(0, 230, 118, 0.55)",
            "0 0 12px rgba(0, 230, 118, 0.25)"
          ]
        },
        transition: { 
          repeat: Infinity, 
          duration: 3, 
          ease: "easeInOut" 
        }
      } : {})}
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-base" />}
      {children}
    </motion.button>
  );
}
