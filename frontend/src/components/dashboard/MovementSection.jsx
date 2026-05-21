import { useState } from "react";
import { Zap, Activity, Flame, ShieldAlert } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import FilterBar from "../ui/health/FilterBar";
import VideoPreviewCard from "../ui/health/VideoPreviewCard";
import { useDashboard } from "../../context/DashboardContext";
import { useMedia } from "../../context/MediaContext";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { physicalCategories, physicalVideos } from "../../data/physicalHealthData";

export default function MovementSection() {
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = useDashboard();
  const { playVideo } = useMedia();
  const hasProPlan = state?.activePlan === "Pro";

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredVideos = activeFilter === "All"
    ? physicalVideos
    : physicalVideos.filter((v) => v.category === activeFilter);

  const handleVideoClick = (video) => {
    if (video.premium && !hasProPlan) {
      toast.showToast({
        type: "warning",
        title: "Premium Workout",
        message: "Upgrade to Pro to unlock this physical training video.",
      });
      navigate("/pricing");
    } else {
      playVideo(video);
      toast.showToast({ title: "Starting Workout", message: `Loading ${video.title}...` });
    }
  };

  return (
    <div className="space-y-12">
      <DashboardSection id="movement-library">
        <SectionHeading
          animate
          eyebrow="Body Flow & Motion"
          title="Daily Movement Library"
          description="Build muscle elasticity, stability, and stamina with deliberate movement routines."
          className="mb-8"
        />

        <FilterBar
          filters={physicalCategories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {filteredVideos.map((video) => (
            <VideoPreviewCard
              key={video.id}
              video={video}
              isLocked={video.premium && !hasProPlan}
              onClick={handleVideoClick}
            />
          ))}
          {filteredVideos.length === 0 && (
            <p className="col-span-full py-10 text-center text-wellness-muted font-medium">
              No workouts found in this category.
            </p>
          )}
        </div>
      </DashboardSection>
    </div>
  );
}
