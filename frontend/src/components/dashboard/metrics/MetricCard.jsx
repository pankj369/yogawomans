import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  colorClass = "text-wellness-glow",
  bgClass = "bg-wellness-glow/10",
  chartPlaceholder,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative overflow-hidden rounded-[2rem] border border-wellness-border bg-wellness-glass p-6 shadow-glass backdrop-blur-md transition-all duration-300 hover:border-wellness-glow/30 hover:bg-white/5 hover:shadow-cardHover"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bgClass} ${colorClass}`}>
          <Icon size={24} />
        </div>
        <div className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
          {trend === "up" && <TrendingUp size={12} className="text-wellness-glow" />}
          {trend === "down" && <TrendingDown size={12} className="text-wellness-orange" />}
          {trend === "neutral" && <Minus size={12} className="text-wellness-muted" />}
          <span className={trend === "up" ? "text-wellness-glow" : trend === "down" ? "text-wellness-orange" : ""}>
            {trendValue}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-white/60">{title}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <h3 className="font-heading text-4xl font-extrabold text-white">{value}</h3>
          {unit && <span className="text-sm font-medium text-white/70">{unit}</span>}
        </div>
      </div>

      {chartPlaceholder && (
        <div className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-60">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 20">
            <motion.path
              d={chartPlaceholder}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={colorClass}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
