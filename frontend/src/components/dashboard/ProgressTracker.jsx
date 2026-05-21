import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import WellnessStatCard from "../ui/cards/WellnessStatCard";
import { useDashboard } from "../../context/DashboardContext";
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/animations";

export default function ProgressTracker() {
  const { dashboardInsights } = useDashboard();
  return (
    <DashboardSection id="progress">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <SectionHeading
          animate
          eyebrow="Your Journey"
          title="Wellness Stats & Progress"
        />
        <p className="text-sm font-medium text-wellness-muted max-w-sm">
          {dashboardInsights[0].value > 0 
            ? `You're on a ${dashboardInsights[0].value}-day streak! Keep building healthy habits.` 
            : `Today is a great day to start your wellness journey.`}
        </p>
      </div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {dashboardInsights.map((stat) => (
          <WellnessStatCard key={stat.id} stat={stat} />
        ))}
      </motion.div>
    </DashboardSection>
  );
}
