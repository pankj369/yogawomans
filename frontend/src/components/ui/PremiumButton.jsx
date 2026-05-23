import { motion } from "framer-motion";
import { pressScale } from "../../utils/animations";

export default function PremiumButton({ 
  children, 
  onClick, 
  disabled = false,
  className = "",
  variant = "primary", // primary, secondary, ghost
  icon: Icon = null,
  fullWidth = false,
  type = "button"
}) {
  const baseStyles = "group relative flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#E27229] to-[#d5631c] text-white hover:shadow-[0_20px_50px_rgba(226,114,41,0.35)]",
    secondary: "bg-[#EFE7DC] text-[#3a4a3d] hover:bg-[#e6dbcc] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)]",
    ghost: "bg-transparent border border-[#EFE7DC] text-[#3a4a3d] hover:border-[#E27229]/50 hover:bg-white/50"
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variants={pressScale}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${disabledStyle} ${className}`}
    >
      {/* Primary variant glowing core */}
      {variant === 'primary' && !disabled && (
        <motion.div 
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_60%)]"
        />
      )}

      {/* Primary variant subtle continuous float (optional, could be removed if too busy) */}
      
      {Icon && (
        <motion.div
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <Icon size={16} strokeWidth={1.5} />
        </motion.div>
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
