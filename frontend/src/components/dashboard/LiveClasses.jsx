import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import LiveClassCard from "../ui/cards/LiveClassCard";
import { liveClasses } from "../../data/wellnessData";

export default function LiveClasses({ joined = [], onJoin }) {
  return (
    <DashboardSection id="live">
      <SectionHeading
        animate
        eyebrow="Connect & Flow Together"
        title="Live Wellness Classes"
        className="mb-6"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {liveClasses.map((liveClass) => (
          <LiveClassCard
            key={liveClass.id}
            liveClass={liveClass}
            isJoined={joined.includes(liveClass.id)}
            onJoin={onJoin}
          />
        ))}
      </div>
    </DashboardSection>
  );
}
