import { motion } from "framer-motion";

export default function ProgressRing({
  value,
  total,
  color = "#2E7D32", // wellness-green
  size = 80,
  strokeWidth = 6,
  label,
}) {
  const percent = Math.min(100, Math.max(0, Math.round((value / total) * 100)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90 filter drop-shadow-sm">
        {/* Background track */}
        <circle 
          cx={size / 2} cy={size / 2} r={radius} 
          stroke="currentColor" 
          className="text-wellness-softcream"
          strokeWidth={strokeWidth} 
          fill="none" 
        />
        {/* Animated fill */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: dashOffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span 
          className="font-heading font-bold text-wellness-dark leading-none tracking-tighter"
          style={{ fontSize: `${Math.max(9.5, size * 0.205)}px` }}
        >
          {percent}%
        </span>
        {label && <span className="text-[0.55rem] font-bold uppercase tracking-wider text-wellness-muted mt-0.5">{label}</span>}
      </div>
    </div>
  );
}
