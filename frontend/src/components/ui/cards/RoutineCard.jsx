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
          ? "border-wellness-green/20 bg-wellness-greenLight shadow-sm"
          : "border-white/70 bg-white/70 hover:bg-white/95 shadow-liftSm hover:shadow-card"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-200 ${
            isCompleted
              ? "bg-[#2D6338] text-white shadow-sm"
              : "bg-white text-wellness-orange shadow-sm"
          }`}
        >
          {Icon ? <Icon size={20} /> : <Check size={20} />}
        </div>
        <div className="text-left">
          <p className={`font-heading text-base font-bold transition-colors ${
            isCompleted ? "text-[#2D6338] opacity-80" : "text-wellness-dark group-hover:text-[#2D6338]"
          }`}>
            {task.title}
          </p>
          <p className="text-xs font-semibold text-wellness-muted mt-0.5">
            {task.duration ? `${task.duration} mins` : task.subtitle}
          </p>
        </div>
      </div>

      <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200 ${
        isCompleted ? "border-[#2D6338] bg-[#2D6338] text-white" : "border-[#8C847A]/30"
      }`}>
        {isCompleted && <Check size={12} strokeWidth={3} />}
      </div>
    </motion.button>
  );
}
