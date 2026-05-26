// src/components/dashboard/SpiritualMilestones.jsx
import { Award, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const milestonesList = [
  {
    id: "rooted-oak",
    title: "Rooted Oak",
    description: "Establish a grounded habit (3+ day streak)",
    emoji: "🌳",
    color: "#2E7D32",
    glowColor: "rgba(46, 125, 50, 0.25)",
    check: (streak, score) => streak >= 3,
    requirementText: "3 Day Streak"
  },
  {
    id: "lotus-of-calm",
    title: "Lotus of Calm",
    description: "Flow through a full week of practice (7+ day streak)",
    emoji: "🪷",
    color: "#1565C0",
    glowColor: "rgba(21, 101, 192, 0.25)",
    check: (streak, score) => streak >= 7,
    requirementText: "7 Day Streak"
  },
  {
    id: "resilient-flame",
    title: "Resilient Flame",
    description: "Ignite your inner fire (Wellness Score >= 50)",
    emoji: "🔥",
    color: "#E8651A",
    glowColor: "rgba(232, 101, 26, 0.25)",
    check: (streak, score) => score >= 50,
    requirementText: "50 Wellness Score"
  },
  {
    id: "ascended-spirit",
    title: "Ascended Spirit",
    description: "Reach deep spiritual focus (15+ day streak)",
    emoji: "🦚",
    color: "#6A1B9A",
    glowColor: "rgba(106, 27, 154, 0.25)",
    check: (streak, score) => streak >= 15,
    requirementText: "15 Day Streak"
  },
  {
    id: "nirvana-pioneer",
    title: "Nirvana Pioneer",
    description: "Achieve complete balance (Wellness Score >= 80)",
    emoji: "🧘‍♀️",
    color: "#D4A64F",
    glowColor: "rgba(212, 166, 79, 0.3)",
    check: (streak, score) => score >= 80,
    requirementText: "80 Wellness Score"
  }
];

export default function SpiritualMilestones({ streak = 0, wellnessScore = 0 }) {
  // Ensure wellnessScore is a number
  const scoreNum = Number(wellnessScore) || 0;

  const unlockedCount = milestonesList.filter(m => m.check(streak, scoreNum)).length;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-[2.5rem] bg-wellness-glass p-6 sm:p-8 backdrop-blur-[18px] border border-wellness-border shadow-glass relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-wellness-gold/5 blur-[50px] pointer-events-none" />

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-gold mb-1">
            <Sparkles size={12} /> Healing Milestones
          </span>
          <h2 className="font-heading text-2xl font-extrabold text-white">Spiritual Achievements</h2>
          <p className="text-xs text-wellness-muted mt-0.5 font-medium">Unlock sacred badges as you deepen your daily alignment.</p>
        </div>

        <div className="shrink-0 flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
          <Award size={18} className="text-wellness-gold animate-bounce" />
          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider text-wellness-muted">Unlocked</p>
            <p className="font-heading text-sm font-black text-white">{unlockedCount} / {milestonesList.length} Badges</p>
          </div>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-5">
        {milestonesList.map((badge, idx) => {
          const isUnlocked = badge.check(streak, scoreNum);

          return (
            <motion.div
              key={badge.id}
              whileHover={{ y: isUnlocked ? -4 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`relative flex flex-col items-center justify-center p-5 rounded-3xl border text-center transition-all duration-300 ${
                isUnlocked
                  ? "bg-white/5 border-white/15 shadow-sm"
                  : "bg-black/10 border-white/5 opacity-55"
              }`}
              style={{
                boxShadow: isUnlocked ? `0 10px 25px -5px ${badge.glowColor}` : "none"
              }}
            >
              {/* Unlock Indicator */}
              {isUnlocked && (
                <div className="absolute top-3 right-3 text-wellness-glow">
                  <CheckCircle2 size={12} fill="rgba(0, 230, 118, 0.2)" />
                </div>
              )}

              {/* Badge Icon */}
              <div 
                className={`relative flex h-16 w-16 items-center justify-center rounded-full mb-3 text-4xl select-none transition-all duration-500 ${
                  isUnlocked 
                    ? "scale-100 filter-none animate-pulse-ring" 
                    : "scale-90 grayscale opacity-40"
                }`}
                style={{
                  background: isUnlocked 
                    ? `radial-gradient(circle, ${badge.glowColor} 0%, transparent 80%)` 
                    : "rgba(255,255,255,0.02)"
                }}
              >
                {badge.emoji}
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center text-white/40">
                    <Lock size={14} className="mt-1" />
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <h4 className={`text-xs font-extrabold ${isUnlocked ? "text-white" : "text-white/40"}`}>
                {badge.title}
              </h4>
              <p className="text-[9px] text-wellness-muted font-medium mt-1 leading-normal line-clamp-2 px-1">
                {isUnlocked ? badge.description : `Requires ${badge.requirementText}`}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
