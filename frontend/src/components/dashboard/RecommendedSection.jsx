import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import SessionCard from "../ui/cards/SessionCard";

export default function RecommendedSection({ items = [], onOpenDetails }) {
  return (
    <DashboardSection id="recommended">
      <SectionHeading
        animate
        eyebrow="Curated for you"
        title="Recommended Sessions"
        className="mb-6"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <SessionCard
            key={item.id}
            session={item}
            onClick={onOpenDetails}
            isBookmarked={false} // Would be wired up to state
          />
        ))}
      </div>
    </DashboardSection>
  );
}
