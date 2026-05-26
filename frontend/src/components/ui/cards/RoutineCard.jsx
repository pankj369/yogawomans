import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { hoverLift } from "../../../utils/animations";

export default function RoutineCard({ task, isCompleted, onToggle }) {
  const Icon = task.icon;

  return (
    <motion.button
      type="button"
      onClick={() => onToggle?.(task.id)}
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-3xl border p-4 transition-all duration-300 ${
        isCompleted
          ? "border-wellness-glow/30 bg-wellness-glow/10 shadow-[0_0_15px_rgba(0,230,118,0.1)]"
          : "border-wellness-border bg-wellness-glass hover:bg-white/5 hover:border-wellness-glow/30 shadow-glass"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-200 ${
            isCompleted
              ? "bg-wellness-glow text-black shadow-glow2"
              : "bg-white/5 border border-wellness-border text-wellness-orange"
          }`}
        >
          {Icon ? <Icon size={20} /> : <Check size={20} />}
        </div>
        <div className="text-left">
          <p className={`font-heading text-base font-bold transition-colors ${
            isCompleted ? "text-wellness-glow" : "text-white group-hover:text-wellness-orange"
          }`}>
            {task.title}
          </p>
          <p className="text-xs font-semibold text-wellness-muted mt-0.5">
            {task.duration ? `${task.duration} mins` : task.subtitle}
          </p>
        </div>
      </div>

      <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200 ${
        isCompleted ? "border-wellness-glow bg-wellness-glow text-black" : "border-wellness-border"
      }`}>
        {isCompleted && <Check size={12} strokeWidth={3} />}
      </div>
    </motion.button>
  );
}
