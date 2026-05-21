/**
 * ResultSection Component
 * Displays personalized wellness recommendations in an organized layout
 * Features: Categorized recommendations, smooth animations, responsive grid
 */

import { motion } from "framer-motion";
import RecommendationCard from "./RecommendationCard";

const ResultSection = ({ recommendations, category, answers }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const categories = [
    {
      key: "yogaPoses",
      title: "Recommended Yoga Poses",
      icon: "🧘",
      color: "blue",
      description: "Carefully selected poses to help achieve your wellness goal",
    },
    {
      key: "meditations",
      title: "Meditation Practices",
      icon: "🧠",
      color: "purple",
      description: "Guided meditations to calm your mind and deepen awareness",
    },
    {
      key: "breathingExercises",
      title: "Breathing Exercises",
      icon: "🌬️",
      color: "green",
      description: "Pranayama techniques for nervous system balance",
    },
    {
      key: "music",
      title: "Relaxing Music",
      icon: "🎵",
      color: "pink",
      description: "Curated music for deep relaxation and mindfulness",
    },
    {
      key: "tips",
      title: "Daily Wellness Tips",
      icon: "💡",
      color: "amber",
      description: "Actionable tips to integrate wellness into your daily life",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Header with personalization message */}
      <motion.div
        variants={itemVariants}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="mb-4 flex justify-center"
        >
          <span className="text-6xl">✨</span>
        </motion.div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Your Personalized Wellness Plan
        </h2>
        <p className="text-gray-600">
          Based on your responses, we've created a customized routine designed specifically for your goals
        </p>
      </motion.div>

      {/* Recommendations by category */}
      {categories.map((section) => (
        (!recommendations[section.key] || recommendations[section.key].length === 0) ? null : (
          <motion.section key={section.key} variants={itemVariants} className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
              <motion.span
                className="text-3xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {section.icon}
              </motion.span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-2xl opacity-30"
              >
                ◉
              </motion.div>
            </div>

            {/* Recommendations Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {recommendations[section.key].map((recommendation, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <RecommendationCard
                    recommendation={recommendation}
                    type={section.key}
                    index={index}
                    color={section.color}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )
      ))}

      {/* Personalization Summary */}
      <motion.section variants={itemVariants} className="pt-8 border-t border-white/20">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/30 backdrop-blur-md p-6">
          <h3 className="mb-4 font-bold text-gray-800 text-lg flex items-center gap-2">
            <span>📋</span> Your Personalization Summary
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(answers).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg bg-white/20 p-3 backdrop-blur"
              >
                <p className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {typeof value === "string"
                    ? value.charAt(0).toUpperCase() + value.slice(1)
                    : Array.isArray(value)
                    ? value.length > 1
                      ? `${value.length} selected`
                      : value[0].charAt(0).toUpperCase() + value[0].slice(1)
                    : value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Action CTAs */}
      <motion.section variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 font-bold text-white shadow-lg hover:shadow-xl transition-all"
        >
          📅 Start Your Journey
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 rounded-xl border-2 border-blue-500 px-8 py-4 font-bold text-blue-600 hover:bg-blue-50 transition-all"
        >
          💾 Save My Plan
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 rounded-xl border-2 border-gray-300 px-8 py-4 font-bold text-gray-700 hover:bg-gray-50 transition-all"
        >
          🔄 Get New Plan
        </motion.button>
      </motion.section>

      {/* Encouragement Message */}
      <motion.div
        variants={itemVariants}
        className="text-center p-6 rounded-2xl bg-gradient-to-r from-amber-100/50 to-orange-100/50 border border-amber-200"
      >
        <p className="text-gray-700 text-sm font-medium">
          💪 Remember: Consistency is more important than intensity. Start where you are and progress at your own pace.
          Every practice brings you closer to your wellness goals!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ResultSection;
