import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import TrackCard from "../ui/cards/TrackCard";
import { audioTracks } from "../../data/wellnessData";

export default function FocusMusicSection() {
  return (
    <DashboardSection id="music">
      <SectionHeading
        animate
        eyebrow="Set the mood"
        title="Focus Music & Ambient Audio"
        className="mb-6"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {audioTracks.map((track) => (
          <TrackCard 
            key={track.id} 
            track={track} 
          />
        ))}
      </div>
    </DashboardSection>
  );
}
