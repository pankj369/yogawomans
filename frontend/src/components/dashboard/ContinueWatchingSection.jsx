import { useMedia } from "../../context/MediaContext";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import ContinueWatchingRow from "./ContinueWatchingRow";

export default function ContinueWatchingSection() {
  const { watchHistory } = useMedia();

  if (!watchHistory || watchHistory.length === 0) return null;

  return (
    <DashboardSection id="continue-watching">
      <SectionHeading
        animate
        eyebrow="Pick up where you left off"
        title="Continue Watching"
        className="mb-6"
      />
      <ContinueWatchingRow items={watchHistory} />
    </DashboardSection>
  );
}
