import { motion } from "framer-motion";
import YogaCountdown from "./YogaCountdown";
import WellnessNews from "./WellnessNews";
import WhyYoga from "./WhyYoga";

export default function DashboardHero({ userName, streak, calmScore }) {
  // Adding welcome message at the very top
  return (
    <div className="space-y-10 w-full">
      {/* Personalized Greeting */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2"
      >
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
          Welcome back, <span className="text-wellness-orange">{userName}</span>
        </h1>
        <p className="text-wellness-muted font-medium text-sm sm:text-base">
          Your wellness OS is ready. Currently on a <span className="text-wellness-orange font-bold">{streak} day streak</span> with a calm score of <span className="text-wellness-green font-bold">{calmScore}</span>.
        </p>
      </motion.div>

      {/* Main Hero Grid */}
      <div className="grid gap-10 lg:grid-cols-12 lg:grid-rows-1">
        {/* Left Side: Countdown */}
        <div className="lg:col-span-7 flex flex-col">
          <YogaCountdown />
        </div>

        {/* Right Side: Why Yoga Today */}
        <div className="lg:col-span-5 flex flex-col">
          <WhyYoga />
        </div>
      </div>

      {/* Wellness News spanning full width or 7 columns below */}
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <WellnessNews />
        </div>
      </div>
    </div>
  );
}
