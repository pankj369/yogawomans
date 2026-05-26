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
import physicalVideo from "../assets/videos/physicalhealthherovideo.mp4";

function PremiumUpgradeModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 px-4 py-8 backdrop-blur-xl flex items-center justify-center"
      >
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.98 }}
          className="mx-auto w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass text-white shadow-glass backdrop-blur-xl relative"
        >
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-wellness-gold/15 to-transparent pointer-events-none" />
          
          <button onClick={onClose} className="absolute right-5 top-5 z-10 p-2 rounded-full bg-white/5 border border-wellness-border hover:bg-white/10 transition backdrop-blur-sm">
            <X size={20} />
          </button>

          <div className="relative z-10 p-10 text-center flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-wellness-gold to-yellow-600 mb-6 shadow-glow2">
              <Lock size={32} className="text-white" />
            </div>
            
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-wellness-gold mb-2">Premium Content</p>
            <h3 className="font-heading text-3xl font-extrabold mb-4">Unlock Your Potential</h3>
            <p className="text-sm text-wellness-muted leading-relaxed max-w-sm mb-8 font-medium">
              This session is locked. Upgrade to our Premium tier to access our entire library of expert-led physical wellness programs, advanced tracking, and personalized coaching.
            </p>
            
            <div className="w-full space-y-3">
              <button 
                onClick={() => navigate("/pricing")}
                className="w-full rounded-full bg-wellness-gold text-black py-4 text-sm font-extrabold transition hover:bg-yellow-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                View Plans & Upgrade
              </button>
              <button 
                onClick={onClose}
                className="w-full rounded-full bg-white/5 border border-wellness-border py-4 text-sm font-bold transition hover:bg-white/10"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

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
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const filteredVideos = activeFilter === "All" 
    ? physicalVideos 
    : physicalVideos.filter(v => v.category === activeFilter);

  const handleVideoClick = (video) => {
    if (video.premium && !hasProPlan) {
      setShowUpgradeModal(true);
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
                  if (!hasProPlan) setShowUpgradeModal(true);
                  else toast.showToast({ title: "Opening Program", message: program.title });
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

      <PremiumUpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </DashboardLayout>
  );
}