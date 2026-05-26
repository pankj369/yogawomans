import { motion } from "framer-motion";
import { fadeUp, easings } from "../../utils/animations";
import { useRecommendations } from "../../hooks/useRecommendations";
import VoiceGuide from "./VoiceGuide";

export default function WellnessInsights() {
  const { insights: aiInsights, loading } = useRecommendations();
  const calmScore = aiInsights?.calmScore || 85;
  const momentum = aiInsights?.momentum === "Active" ? 92 : 78;

  const insights = [
    { label: "Calm Score", value: calmScore, color: "#00E676" }, // Emerald Glow
    { label: "Emotional Recovery", value: 92, color: "#FF8A3D" }, // Deep Orange
    { label: "Consistency", value: momentum, color: "#D4A64F" }, // Gold
    { label: "Energy Balance", value: 88, color: "#00E676" }, // Emerald Glow
  ];

  if (loading) {
    return (
      <div className="w-full animate-pulse rounded-[2.5rem] bg-wellness-glass p-8 sm:p-10 h-48 backdrop-blur-[18px] border border-wellness-border shadow-glass"></div>
    );
  }

  return (
    <motion.section 
      variants={fadeUp}
      className="rounded-[2.5rem] bg-wellness-glass p-8 sm:p-10 backdrop-blur-[18px] border border-wellness-border shadow-glass"
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-extrabold text-white">Wellness State</h2>
        <div className="mt-2 flex items-center justify-between gap-4 border-l-2 border-wellness-orange pl-3">
          <p className="text-sm text-wellness-muted font-medium tracking-wide italic flex-1">
            "{aiInsights?.message || "Your weekly holistic overview"}"
          </p>
          <VoiceGuide text={aiInsights?.message || "Your weekly holistic overview"} size={16} />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((insight, i) => (
          <motion.div 
            key={insight.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (i * 0.1), duration: 0.8, ease: easings.cinematic }}
            className="flex flex-col"
          >
            <div className="flex justify-between items-end mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-wellness-muted">
                {insight.label}
              </span>
              <span className="font-heading text-xl font-bold text-white">
                {insight.value}
              </span>
            </div>
            
            {/* Animated Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${insight.value}%` }}
                transition={{ duration: 1.5, delay: 0.6 + (i * 0.1), ease: easings.luxurious }}
                className="h-full rounded-full"
                style={{ backgroundColor: insight.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
