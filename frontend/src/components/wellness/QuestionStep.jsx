/**
 * QuestionStep Component
 * Displays individual question with single or multiple choice options
 * Features: Smooth animations, toggle selections, progress indication
 */

import { motion, AnimatePresence } from "framer-motion";

const QuestionStep = ({ question, selectedAnswers, onAnswerChange, isActive, stepNumber, totalSteps }) => {
  const isSingleChoice = question.type === "single";

  const handleToggle = (optionId) => {
    if (isSingleChoice) {
      // Single choice: replace selection
      onAnswerChange(question.id, optionId);
    } else {
      // Multiple choice: toggle selection
      const currentAnswers = selectedAnswers[question.id] || [];
      if (currentAnswers.includes(optionId)) {
        onAnswerChange(
          question.id,
          currentAnswers.filter((id) => id !== optionId)
        );
      } else {
        onAnswerChange(question.id, [...currentAnswers, optionId]);
      }
    }
  };

  const isAnswered = selectedAnswers[question.id]?.length > 0;
  const selectedValue = selectedAnswers[question.id];

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Question {stepNumber} of {totalSteps}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {Math.round((stepNumber / totalSteps) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/30 overflow-hidden backdrop-blur">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stepNumber / totalSteps) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
              />
            </div>
          </div>

          {/* Question */}
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-6 text-xl font-bold text-gray-800"
          >
            {question.question}
          </motion.h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected =
                isSingleChoice
                  ? selectedValue === option.id
                  : selectedValue?.includes(option.id);

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.3 }}
                  onClick={() => handleToggle(option.id)}
                  className={`
                    relative
                    w-full
                    group
                    rounded-xl
                    border-2
                    p-4
                    text-left
                    transition-all
                    duration-300
                    backdrop-blur-sm
                    ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/80 shadow-lg shadow-blue-200/50"
                        : "border-white/30 bg-white/10 hover:border-white/50 hover:bg-white/20"
                    }
                  `}
                >
                  {/* Animated border on select */}
                  <motion.div
                    layout
                    className="flex items-center gap-4"
                  >
                    {/* Checkbox */}
                    <motion.div
                      animate={isSelected ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      className={`
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-lg
                        border-2
                        transition-all
                        ${
                          isSelected
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300 bg-white/50 group-hover:border-blue-300"
                        }
                      `}
                    >
                      {isSelected && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {option.icon && <span className="text-lg">{option.icon}</span>}
                        <span className="font-semibold text-gray-800">{option.label}</span>
                      </div>
                    </div>

                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-3 w-3 rounded-full bg-blue-500"
                      />
                    )}
                  </motion.div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </motion.button>
              );
            })}
          </div>

          {/* Answer summary */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 rounded-lg bg-green-50/80 border border-green-200 p-3"
              >
                <p className="text-sm text-green-700 font-medium">
                  ✓ Answer recorded. You can proceed to the next question.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionStep;
