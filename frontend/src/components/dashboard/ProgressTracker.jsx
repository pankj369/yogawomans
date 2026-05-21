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
      <SectionHeading
        animate
        eyebrow="Your Journey"
        title="Wellness Stats & Progress"
        className="mb-6"
      />

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
