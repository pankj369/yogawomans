/**
 * FindSolution Component - Personalized Wellness Recommendation System
 * Premium AI-powered wellness recommendations with beautiful UI/UX
 * Features: Interactive cards, animated modal, multi-step forms, personalized recommendations
 * Powered by Framer Motion animations and Tailwind CSS styling
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WellnessCard from "./wellness/WellnessCard";
import WellnessModal from "./wellness/WellnessModal";
import { wellnessCategories } from "../data/wellnessRecommendationData";

function FindSolution() {
  const [activeCard, setActiveCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle card click - open modal
  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setActiveCard(category.id);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setActiveCard(null);
  };

  // Animation variants for staggered card animations
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

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[linear-gradient(180deg,#f7f4ee_0%,#fffaf4_35%,#f3f8ef_100%)]
        px-4
        py-24
        md:px-10
      "
    >
      {/* Decorative animated background elements */}
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-purple-400/10 blur-3xl"
      />

      {/* BADGE - Animated entrance */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-5 flex justify-center"
      >
        <div className="yc-badge ">
            🧘 Yoga Solution
          </div>
      </motion.div>

      {/* HEADING - Main title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center"
      >
        <h2
          className="
            text-center
            text-4xl
            font-extrabold
            leading-tight
            text-gray-900
            sm:text-5xl
          "
        >
          Find <span className="text-orange-500">Solution</span> For... 
        </h2>

        <p
          className="
            mx-auto
            mt-5
            max-w-[650px]
            text-center
            text-[15px]
            leading-relaxed
            text-gray-600
            sm:text-[17px]
          "
        >
          Discover personalized yoga, meditation, and breathing exercises tailored to your wellness goals.
          Click any card to get started with your AI-powered wellness journey.
        </p>
      </motion.div>

      {/* DIVIDER - Decorative separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 flex items-center justify-center gap-4 origin-center"
      >
        <div className="h-[2px] w-14 rounded-full bg-gradient-to-r from-blue-400 to-transparent" />
        <motion.span
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="text-2xl"
        >
          🪷
        </motion.span>
        <div className="h-[2px] w-14 rounded-full bg-gradient-to-l from-purple-400 to-transparent" />
      </motion.div>

      {/* CARDS GRID - Responsive wellness category cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          mx-auto
          mt-14
          grid
          max-w-[1400px]
          grid-cols-2
          gap-4
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
        "
      >
        {wellnessCategories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            onClick={() => handleCardClick(category)}
          >
            <WellnessCard
              category={category}
              isActive={activeCard === category.id}
              onClick={() => handleCardClick(category)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Highlighted description card for active category */}
      {activeCard && selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="
            mx-auto
            mt-12
            max-w-[950px]
            rounded-[30px]
            border border-white/40
            bg-white/80
            p-7
            shadow-[0_20px_50px_rgba(0,0,0,0.1)]
            backdrop-blur-2xl
          "
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="
                flex
                h-20
                w-20
                flex-shrink-0
                items-center
                justify-center
                rounded-[24px]
                bg-gradient-to-br from-blue-100 to-purple-100
                text-4xl
              "
            >
              {selectedCategory.icon}
            </motion.div>

            {/* Content */}
            <div >
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedCategory.label} Wellness
              </h3>

              <p className="mt-3 text-[15px] leading-relaxed text-gray-700">
                {selectedCategory.description}
              </p>

              {/* CTA - Click to start form */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(selectedCategory)}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-gradient-to-r from-blue-500 to-purple-500
                  px-6
                  py-2
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  hover:shadow-xl
                  transition-all
                "
              >
                Start Personalization → 
              </motion.button>
            </div>

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCard(null);
                setSelectedCategory(null);
              }}
              className="
                flex
                h-10
                w-10
                flex-shrink-0
                items-center
                justify-center
                rounded-full
                bg-red-100/80
                text-red-600
                hover:bg-red-200
                transition-colors
              "
            >
              ✕
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Wellness Modal - Opens when user clicks a card */}
      {selectedCategory && (
        <WellnessModal
          category={selectedCategory}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}

      {/* CTA Button - Link to explore all classes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-14 flex flex-col items-center gap-4"
      >
        <p className="text-center text-gray-600 text-sm">
          💡 Select any wellness category above to get personalized recommendations
        </p>

        <Link
          to="/auth"
          className="
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-[linear-gradient(135deg,#c77732,#d9924c)]
            px-8
            py-4
            text-sm
            font-semibold
            uppercase
            tracking-[0.08em]
            text-white
            shadow-[0_14px_35px_rgba(199,119,50,0.28)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-[0_20px_45px_rgba(199,119,50,0.35)]
          "
        >
          🧘 Explore All Premium Classes
        </Link>
      </motion.div>

      {/* Features section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 mx-auto max-w-[1100px]"
      >
       <div
  className="
    mt-10

    flex
    flex-wrap
    items-center
    justify-center

    gap-4
    sm:gap-6
    lg:gap-10
  "
>

  {/* ITEM */}
  <div className="flex items-center gap-3">
    <span className="text-2xl">🎯</span>

    <div>
      <h4 className="text-sm font-semibold text-[#11281d]">
        AI-Powered
      </h4>

      <p className="text-xs text-[#667267]">
        Smart recommendations
      </p>
    </div>
  </div>





  {/* ITEM */}
  <div className="flex items-center gap-3">
    <span className="text-2xl">⚡</span>

    <div>
      <h4 className="text-sm font-semibold text-[#11281d]">
        Instant Results
      </h4>

      <p className="text-xs text-[#667267]">
        Wellness plans in seconds
      </p>
    </div>
  </div>





  {/* ITEM */}
  <div className="flex items-center gap-3">
    <span className="text-2xl">🔄</span>

    <div>
      <h4 className="text-sm font-semibold text-[#11281d]">
        Adjust Anytime
      </h4>

      <p className="text-xs text-[#667267]">
        Retake anytime
      </p>
    </div>
  </div>

</div>
      </motion.div>
    </section>
  );
}

export default FindSolution;