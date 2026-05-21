import React from "react";
import { motion } from "framer-motion";
import { emptyStateReveal, floatingAnimation } from "../../../utils/animations";

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = "" 
}) {
  return (
    <motion.div
      variants={emptyStateReveal}
      initial="hidden"
      animate="visible"
      className={`flex flex-col items-center justify-center rounded-[2.5rem] border border-white/40 bg-white/30 p-12 text-center shadow-glass backdrop-blur-xl ${className}`}
    >
      {Icon && (
        <motion.div
          variants={floatingAnimation}
          initial="rest"
          animate="float"
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/60 shadow-liftSm"
        >
          <Icon className="text-wellness-orange" size={32} />
        </motion.div>
      )}
      <h3 className="font-heading text-2xl font-bold text-wellness-dark">{title}</h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-wellness-muted">{description}</p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-8 rounded-full border border-wellness-muted/30 bg-white/80 px-8 py-3 text-sm font-bold text-wellness-dark shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-liftSm"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
