import { motion } from "framer-motion";
import { BatteryCharging, Brain, HeartPulse } from "lucide-react";

export default function DoshaScores() {
  const scores = [
    { label: "Energy Score", value: 82, color: "#FFD200", icon: BatteryCharging },
    { label: "Nervous System", value: 45, color: "#64C8FF", icon: Brain },
    { label: "Recovery", value: 70, color: "#64DC96", icon: HeartPulse },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {scores.map((score, idx) => {
        const Icon = score.icon;
        return (
          <motion.div
            key={score.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-black/40 p-4"
          >
            <div className="relative mb-3 flex h-20 w-20 items-center justify-center">
              {/* Background Ring */}
              <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="6"
                />
                {/* Progress Ring */}
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke={score.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="214" // 2 * PI * 34 approx
                  initial={{ strokeDashoffset: 214 }}
                  animate={{ strokeDashoffset: 214 - (214 * score.value) / 100 }}
                  transition={{ duration: 1.5, delay: 0.5 + idx * 0.2, ease: "easeOut" }}
                  style={{ filter: `drop-shadow(0 0 4px ${score.color})` }}
                />
              </svg>
              <span className="text-xl font-bold text-white relative z-10">{score.value}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-white/80">
              <Icon size={14} style={{ color: score.color }} />
              <span className="text-xs font-bold uppercase tracking-wider">{score.label}</span>
            </div>
            <p className="mt-1 text-[10px] text-white/50 text-center">
              {score.value < 50 ? "Needs Attention" : score.value < 75 ? "Balanced" : "Optimal"}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
