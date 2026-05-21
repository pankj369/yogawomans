import { motion } from "framer-motion";
import { floatingAnimation } from "../../../utils/animations";

export default function FloatingBadge({
  icon: Icon,
  label,
  value,
  colorClass = "text-wellness-green",
  bgClass = "bg-wellness-greenLight",
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      variants={floatingAnimation}
      whileHover="float"
      className={`flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-heroCard backdrop-blur-xl ${className}`}
    >
      {Icon && (
        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${bgClass}`}>
          <Icon className={`text-sm ${colorClass}`} />
        </div>
      )}
      <div>
        <p className="font-heading text-base font-extrabold text-wellness-dark leading-tight">{value}</p>
        <p className="text-[0.68rem] font-semibold text-wellness-muted leading-tight">{label}</p>
      </div>
    </motion.div>
  );
}
