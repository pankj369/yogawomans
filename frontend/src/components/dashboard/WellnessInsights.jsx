import { motion } from "framer-motion";
import { fadeUp, easings } from "../../utils/animations";
import { useRecommendations } from "../../hooks/useRecommendations";

export default function WellnessInsights() {
  const { insights: aiInsights, loading } = useRecommendations();
  const calmScore = aiInsights?.calmScore || 85;
  const momentum = aiInsights?.momentum === "Active" ? 92 : 78;

  const insights = [
    { label: "Calm Score", value: calmScore, color: "#8FA68E" },
    { label: "Emotional Recovery", value: 92, color: "#E27229" },
    { label: "Consistency", value: momentum, color: "#C89B63" },
    { label: "Energy Balance", value: 88, color: "#2F6B3B" },
  ];

  if (loading) {
    return (
      <div className="w-full animate-pulse rounded-[2.5rem] bg-white/40 p-8 sm:p-10 h-48 backdrop-blur-md border border-[#EFE7DC] shadow-sm"></div>
    );
  }

  return (
    <motion.section 
      variants={fadeUp}
      className="rounded-[2.5rem] bg-white/40 p-8 sm:p-10 backdrop-blur-md border border-[#EFE7DC] shadow-sm"
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-extrabold text-[#11281d]">Wellness State</h2>
        <p className="mt-2 text-sm text-[#8FA68E] font-medium tracking-wide italic border-l-2 border-[#E27229] pl-3">
          "{aiInsights?.message || "Your weekly holistic overview"}"
        </p>
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
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3a4a3d]">
                {insight.label}
              </span>
              <span className="font-serif text-2xl font-light text-[#11281d]">
                {insight.value}
              </span>
            </div>
            
            {/* Animated Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EFE7DC]/50">
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
