import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import FeaturedProgramCard from "../ui/cards/FeaturedProgramCard";
import { featuredPrograms } from "../../data/wellnessData";

export default function FeaturedProgramsSection({ onExplore }) {
  return (
    <DashboardSection id="featured-programs">
      <SectionHeading
        animate
        eyebrow="Deepen your practice"
        title="Featured Programs"
        className="mb-6"
      />
      <div className="grid gap-6 md:grid-cols-2">
        {featuredPrograms.map((program) => (
          <FeaturedProgramCard 
            key={program.id} 
            program={program} 
            onExplore={onExplore} 
          />
        ))}
      </div>
    </DashboardSection>
  );
}
