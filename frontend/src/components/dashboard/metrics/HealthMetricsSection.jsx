import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Footprints,
  Flame,
  Droplets,
  Moon,
  Scale,
  Activity,
  HeartPulse,
  Plus,
  ChevronRight,
} from "lucide-react";
import MetricCard from "./MetricCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function HealthMetricsSection() {
  const [activeTab, setActiveTab] = useState("Today");
  const tabs = ["Today", "Week", "Month", "All Time"];

  // Mock Data
  const metricsData = [
    {
      id: "steps",
      title: "Steps",
      value: "8,432",
      unit: "steps",
      icon: Footprints,
      trend: "up",
      trendValue: "+12%",
      colorClass: "text-blue-400",
      bgClass: "bg-blue-400/10",
      chartPlaceholder: "M0 15 Q 25 5, 50 15 T 100 5",
    },
    {
      id: "calories",
      title: "Calories Burned",
      value: "450",
      unit: "kcal",
      icon: Flame,
      trend: "up",
      trendValue: "+5%",
      colorClass: "text-orange-400",
      bgClass: "bg-orange-400/10",
      chartPlaceholder: "M0 18 Q 20 10, 40 18 T 100 2",
    },
    {
      id: "water",
      title: "Water Intake",
      value: "2.1",
      unit: "L",
      icon: Droplets,
      trend: "down",
      trendValue: "-10%",
      colorClass: "text-cyan-400",
      bgClass: "bg-cyan-400/10",
      chartPlaceholder: "M0 10 Q 30 15, 60 5 T 100 15",
    },
    {
      id: "sleep",
      title: "Sleep",
      value: "7h 12m",
      unit: "",
      icon: Moon,
      trend: "up",
      trendValue: "+30m",
      colorClass: "text-indigo-400",
      bgClass: "bg-indigo-400/10",
      chartPlaceholder: "M0 15 L 20 15 L 25 5 L 35 18 L 40 15 L 100 15",
    },
    {
      id: "weight",
      title: "Weight",
      value: "64.5",
      unit: "kg",
      icon: Scale,
      trend: "neutral",
      trendValue: "0%",
      colorClass: "text-emerald-400",
      bgClass: "bg-emerald-400/10",
    },
    {
      id: "sugar",
      title: "Sugar Level",
      value: "95",
      unit: "mg/dL",
      icon: Activity,
      trend: "neutral",
      trendValue: "Stable",
      colorClass: "text-rose-400",
      bgClass: "bg-rose-400/10",
    },
    {
      id: "bp-top",
      title: "Blood Pressure (Sys)",
      value: "118",
      unit: "mmHg",
      icon: HeartPulse,
      trend: "down",
      trendValue: "-2",
      colorClass: "text-red-400",
      bgClass: "bg-red-400/10",
    },
    {
      id: "bp-bottom",
      title: "Blood Pressure (Dia)",
      value: "78",
      unit: "mmHg",
      icon: HeartPulse,
      trend: "up",
      trendValue: "+1",
      colorClass: "text-red-400",
      bgClass: "bg-red-400/10",
    },
    {
      id: "heart-rate",
      title: "Resting Heart Rate",
      value: "68",
      unit: "bpm",
      icon: HeartPulse,
      trend: "down",
      trendValue: "-2 bpm",
      colorClass: "text-pink-400",
      bgClass: "bg-pink-400/10",
      chartPlaceholder: "M0 15 Q 10 15, 15 15 L 20 5 L 25 20 L 30 15 Q 50 15, 100 15",
    },
  ];

  return (
    <div className="relative min-h-[80vh] rounded-[2.5rem] bg-gray-900 overflow-hidden text-white shadow-2xl">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-gray-900 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      <div className="relative z-10 p-6 sm:p-10">
        {/* Header Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight">
              Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Metrics</span>
            </h1>
            <p className="mt-2 text-white/60 text-lg">Your immersive wellness tracking dashboard.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-3"
          >
            <button className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105">
              <Plus size={16} /> Add Reading
            </button>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                activeTab === tab
                  ? "text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="metricsTab"
                  className="absolute inset-0 -z-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {metricsData.map((metric) => (
            <motion.div key={metric.id} variants={itemVariants}>
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </motion.div>

        {/* Health Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
              <Activity size={20} />
            </div>
            <h2 className="font-heading text-2xl font-bold">AI Health Insights</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 transition-colors hover:bg-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white/60">Recovery Score</span>
                  <span className="text-emerald-400 font-bold text-sm">Optimal</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                    className="h-full bg-emerald-400 rounded-full" 
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 transition-colors hover:bg-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white/60">Sleep Balance</span>
                  <span className="text-indigo-400 font-bold text-sm">Improving</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">Sleep quality decreased recently during weekends, but weekday recovery is strong.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5 transition-colors hover:bg-white/10 flex flex-col justify-center h-full">
                <h3 className="text-lg font-bold text-white mb-2">Weekly Summary</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    Hydration is improving this week. Keep hitting that 2L goal.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    Activity momentum is high. 4 days streak of hitting step goals!
                  </li>
                </ul>
                <button className="mt-4 flex w-max items-center gap-1 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
                  View full report <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
