import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, X, Lock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import HeroBanner from "../components/dashboard/HeroBanner";
import DashboardSection from "../components/ui/sections/DashboardSection";
import SectionHeading from "../components/ui/sections/SectionHeading";

import WorkoutStats from "../components/ui/health/WorkoutStats";
import FilterBar from "../components/ui/health/FilterBar";
import VideoPreviewCard from "../components/ui/health/VideoPreviewCard";
import YogaCategoryRow from "../components/ui/health/YogaCategoryRow";
import FeaturedProgramCard from "../components/ui/cards/FeaturedProgramCard";
import BreathingCard from "../components/ui/cards/BreathingCard";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useDashboard } from "../context/DashboardContext";
import { useMedia } from "../context/MediaContext";

import { physicalStats, physicalCategories, physicalVideos } from "../data/physicalHealthData";
import { featuredPrograms, breathingExercises } from "../data/wellnessData";
import physicalVideoFile from "../assets/videos/physicalhealth.mp4";

const physicalVideo = physicalVideoFile;

export default function PhysicalHealth() {
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useDashboard();
  const { playVideo } = useMedia();
  const hasProPlan = state?.activePlan === "Pro";

  const profile = auth.profile;
  const userName = profile?.full_name || "Yogi";

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredVideos = activeFilter === "All" 
    ? physicalVideos 
    : physicalVideos.filter(v => v.category === activeFilter);

  const handleVideoClick = (video) => {
    if (video.premium && !hasProPlan) {
      toast.showToast({
        type: "warning",
        title: "Pro Content Locked",
        message: "Please upgrade to the Transform Pro plan to unlock this workout.",
      });
      navigate("/pricing");
    } else {
      playVideo(video);
      toast.showToast({ title: "Starting Workout", message: `Loading ${video.title}...` });
    }
  };

  return (
    <DashboardLayout userName={userName} title="Physical Health">
      <div className="flex flex-col gap-12 lg:gap-16 pb-12">
        
        {/* Immersive Hero */}
        <HeroBanner
          userName="Transform Your Body."
          sectionTitle="Physical Health"
          description="Daily movement builds a stronger life. Access world-class workouts, track your progress, and transform your body with expert guidance."
          primaryLabel="Start Training"
          onResumeSession={() => handleVideoClick(physicalVideos[0])}
          secondaryLabel="Explore Programs"
          onExplorePrograms={() => {
            document.getElementById("workout-catalog")?.scrollIntoView({ behavior: "smooth" });
          }}
          videoSrc={physicalVideo}
          overlayVariant="cinematicDark"
          stats={[
            {
              id: "workouts-stat",
              label: "Weekly Workouts",
              value: "4 / 5",
              subtext: "Almost at your goal",
              icon: Activity,
              progress: 80,
              delay: 0.3,
            },
            {
              id: "calories-stat",
              label: "Calories Burned",
              value: "1,240",
              subtext: "This week",
              icon: Zap,
              progress: 65,
              delay: 0.45,
              className: "sm:ml-8 lg:ml-10",
            },
          ]}
        />

        {/* Workout Stats Tracker */}
        <DashboardSection id="stats">
          <SectionHeading
            animate
            eyebrow="Activity Tracking"
            title="Your Progress"
            className="mb-8"
          />
          <WorkoutStats stats={physicalStats} />
        </DashboardSection>

        {/* Top Picks Horizontal Row */}
        <DashboardSection id="top-picks">
          <SectionHeading
            animate
            eyebrow="Curated for you"
            title="Top Picks"
            className="mb-6"
          />
          <YogaCategoryRow 
            videos={physicalVideos} 
            onVideoClick={handleVideoClick} 
            hasProPlan={hasProPlan} 
          />
        </DashboardSection>

        {/* Dynamic Video Catalog */}

        <DashboardSection id="workout-catalog">
          <SectionHeading
            animate
            eyebrow="Explore Sessions"
            title="Training Library"
            description="Find the perfect routine for your energy level today."
            className="mb-8"
          />
          
          <FilterBar 
            filters={physicalCategories} 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

        {/* Body Focus Programs */}
        <DashboardSection id="programs">
          <SectionHeading
            animate
            eyebrow="Targeted Goals"
            title="Body Focus Programs"
            className="mb-8"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPrograms.map((program) => (
              <FeaturedProgramCard 
                key={program.id} 
                program={program} 
                onExplore={() => {
                  if (!hasProPlan) {
                    toast.showToast({
                      type: "warning",
                      title: "Pro Program Locked",
                      message: "Please upgrade to the Transform Pro plan to unlock this program.",
                    });
                    navigate("/pricing");
                  } else {
                    toast.showToast({ title: "Opening Program", message: program.title });
                  }
                }} 
              />
            ))}
          </div>
        </DashboardSection>

        {/* Warmup / Breathing Area */}
        <DashboardSection id="warmup">
          <SectionHeading
            animate
            eyebrow="Pre-workout prep"
            title="Warmup & Breathing"
            className="mb-8"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {breathingExercises.map((exercise) => (
              <BreathingCard 
                key={exercise.id} 
                exercise={exercise} 
                onStart={() => toast.showToast({ title: "Breathing prep", message: "Timer starting..." })} 
              />
            ))}
          </div>
        </DashboardSection>

      </div>
    </DashboardLayout>
  );
}