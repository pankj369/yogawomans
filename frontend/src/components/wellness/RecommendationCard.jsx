/**
 * RecommendationCard Component
 * Displays individual recommendation with details and benefits
 * Features: Icons, expandable content, hover effects, responsive layout
 */

import { motion } from "framer-motion";
import { useState } from "react";

const RecommendationCard = ({ recommendation, type, index, color = "blue" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses = {
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    purple: "from-purple-400 to-purple-600",
    pink: "from-pink-400 to-pink-600",
    orange: "from-orange-400 to-orange-600",
    amber: "from-amber-400 to-amber-600",
  };

  const gradientClass = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative
          w-full
          overflow-hidden
          rounded-2xl
          border
          backdrop-blur-md
          transition-all
          duration-300
          text-left
          ${
            isExpanded
              ? `border-white/40 bg-white/20 shadow-xl`
              : `border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15`
          }
        `}
      >
        {/* Gradient Background */}
        <div
          className={`
            absolute
            inset-0
            bg-gradient-to-br
            ${gradientClass}
            opacity-0
            group-hover:opacity-5
            transition-opacity
            duration-300
            -z-10
          `}
        />

        {/* Content */}
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            {/* Icon and Title */}
            <div className="flex items-start gap-3 flex-1">
              <motion.span
                className="text-3xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {recommendation.icon}
              </motion.span>

              <div>
                <h4 className="font-bold text-gray-800 text-lg leading-tight">
                  {recommendation.name}
                </h4>

                {/* Duration and difficulty */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {recommendation.duration && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100/80 px-3 py-1 text-xs font-medium text-blue-700">
                      ⏱️ {recommendation.duration}
                    </span>
                  )}
                  {recommendation.difficulty && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-700">
                      📊 {recommendation.difficulty}
                    </span>
                  )}
                  {recommendation.frequency && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100/80 px-3 py-1 text-xs font-medium text-green-700">
                      🎵 {recommendation.frequency}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Expand Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 mt-1"
            >
              ▼
            </motion.div>
          </div>

          {/* Description */}
          <p className="mt-3 text-sm text-gray-700 line-clamp-2">
            {recommendation.description}
          </p>

          {/* Benefits Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {recommendation.benefits?.slice(0, 2).map((benefit, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="inline-flex items-center gap-1 rounded-full bg-green-100/60 px-2 py-1 text-xs text-green-700 font-medium"
              >
                ✓ {benefit}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden border-t border-white/20"
        >
          <div className="space-y-4 p-5 bg-white/5">
            {/* Full Description */}
            {recommendation.description && (
              <div>
                <p className="text-sm text-gray-700">{recommendation.description}</p>
              </div>
            )}

            {/* Steps */}
            {recommendation.steps && recommendation.steps.length > 0 && (
              <div>
                <h5 className="mb-3 font-bold text-gray-800 text-sm">How to Practice:</h5>
                <ol className="space-y-2">
                  {recommendation.steps.map((step, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.05 }}
                      className="flex gap-3 text-sm text-gray-700"
                    >
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 font-bold text-blue-600 text-xs">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            )}

            {/* All Benefits */}
            {recommendation.benefits && recommendation.benefits.length > 0 && (
              <div>
                <h5 className="mb-3 font-bold text-gray-800 text-sm">Benefits:</h5>
                <ul className="space-y-2">
                  {recommendation.benefits.map((benefit, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.05 }}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 font-semibold text-white transition-all hover:shadow-lg mt-4"
            >
              Start This Practice →
            </motion.button>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default RecommendationCard;
