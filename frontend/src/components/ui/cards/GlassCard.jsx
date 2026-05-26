import { motion } from "framer-motion";
import { fadeUp, hoverLift } from "../../../utils/animations";

export default function GlassCard({
  children,
  className = "",
  animate = false,
  hover = false,
  delay = 0,
  ...props
}) {
  const baseClasses = "rounded-4xl border border-wellness-border bg-wellness-glass shadow-glass backdrop-blur-[18px]";
  
  if (animate || hover) {
    return (
      <motion.div
        variants={animate ? fadeUp : undefined}
        whileHover={hover ? hoverLift.hover : undefined}
        transition={{ delay }}
        className={`${baseClasses} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}
