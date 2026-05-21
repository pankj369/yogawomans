import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import RoutineCard from "../ui/cards/RoutineCard";
import { dailyRoutine } from "../../data/wellnessData";
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/animations";

export default function DailyRoutine({ completedItems = [], onStartSession, onToggleComplete }) {
  // Check how many are completed
  const completedCount = dailyRoutine.filter(item => completedItems.includes(item.id)).length;
  const progress = Math.round((completedCount / dailyRoutine.length) * 100);

  return (
    <DashboardSection id="routine">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <SectionHeading
          animate
          eyebrow="Your Path to Balance"
          title="Daily Wellness Routine"
          description="Small, consistent steps build lasting transformation. Complete today's checklist."
        />
        
        {/* Overall progress indicator */}
        <div className="flex items-center gap-4 bg-white/70 px-4 py-3 rounded-2xl border border-white/60 shadow-sm max-w-xs">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-wellness-muted mb-1">Today's Progress</p>
            <div className="h-1.5 w-full bg-wellness-softcream rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-wellness-orange to-wellness-green transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="font-heading text-xl font-bold text-wellness-dark">{progress}%</p>
        </div>
      </div>

      <motion.div 
        variants={staggerContainer(0.08, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {dailyRoutine.map((item) => (
          <RoutineCard
            key={item.id}
            task={item}
            isCompleted={completedItems.includes(item.id)}
            onToggle={onToggleComplete}
          />
        ))}
      </motion.div>
    </DashboardSection>
  );
}
