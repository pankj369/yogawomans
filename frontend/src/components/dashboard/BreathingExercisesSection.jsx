import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import BreathingCard from "../ui/cards/BreathingCard";
import { breathingExercises } from "../../data/wellnessData";

export default function BreathingExercisesSection({ onStart }) {
  return (
    <DashboardSection id="breathing">
      <SectionHeading
        animate
        eyebrow="Find your center"
        title="Breathing Exercises"
        className="mb-6"
      />
      <div className="grid gap-5 md:grid-cols-2">
        {breathingExercises.map((exercise) => (
          <BreathingCard 
            key={exercise.id} 
            exercise={exercise} 
            onStart={onStart} 
          />
        ))}
      </div>
    </DashboardSection>
  );
}
