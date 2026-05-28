import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, Wind, Smile, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import HeroBanner from "../components/dashboard/HeroBanner";
import DashboardSection from "../components/ui/sections/DashboardSection";
import SectionHeading from "../components/ui/sections/SectionHeading";

import MoodTracker from "../components/ui/mental/MoodTracker";
import BreathingOrb from "../components/ui/mental/BreathingOrb";
import SessionCard from "../components/ui/cards/SessionCard";
import TrackCard from "../components/ui/cards/TrackCard";
import FilterBar from "../components/ui/health/FilterBar";
import RoutineCard from "../components/ui/cards/RoutineCard";
import HealingAudioSection from "../components/ui/mental/HealingAudioSection";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useDashboard } from "../context/DashboardContext";
import { useMedia } from "../context/MediaContext";

import { mentalCategories, meditationSessions, healingAudio, breathingCycles, sleepStories, healingRoutines } from "../data/mentalHealthData";
const mentalVideo = "";

export default function MentalHealth() {
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useDashboard();
  const { playTrack, playVideo } = useMedia();
  const hasProPlan = state?.activePlan === "Pro";

  const profile = auth.profile;
  const userName = profile?.full_name || "Yogi";

  const [activeFilter, setActiveFilter] = useState("All");
  const [completedRoutines, setCompletedRoutines] = useState([]);

  const filteredMeditations = activeFilter === "All" 
    ? meditationSessions 
    : meditationSessions.filter(v => v.category === activeFilter);

  const handleSessionClick = (session) => {
    if (session.premium && !hasProPlan) {
      toast.showToast({
        type: "warning",
        title: "Pro Session Locked",
        message: "Please upgrade to the Transform Pro plan to unlock this session.",
      });
      navigate("/pricing");
    } else {
      if (session.mediaType === "video") {
        playVideo(session);
      } else {
        playTrack(session);
      }
      toast.showToast({ title: "Starting Session", message: `Loading ${session.title}...` });
    }
  };

  const toggleRoutine = (id) => {
    setCompletedRoutines((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
    if (!completedRoutines.includes(id)) {
      toast.showToast({ title: "Routine Completed", message: "Great job taking time for yourself!" });
    }
  };

  return (
    <DashboardLayout userName={userName} title="Mental Health">
      <div className="flex flex-col gap-12 lg:gap-16 pb-12">
        
        {/* Immersive Hero */}
        <HeroBanner
          userName="Find Peace Within."
          sectionTitle="Mental Health"
          description="Breathe. Relax. Heal. A premium sanctuary for your emotional well-being."
          primaryLabel="Start Meditation"
          onResumeSession={() => handleSessionClick(meditationSessions[0])}
          secondaryLabel="Explore Healing Programs"
          onExplorePrograms={() => {
            document.getElementById("audio-healing")?.scrollIntoView({ behavior: "smooth" });
          }}
          videoSrc={mentalVideo}
          overlayVariant="cinematicDark"
          stats={[
            {
              id: "meditation-mins-stat",
              label: "Meditation Minutes",
              value: "25 Mins",
              subtext: "Daily Goal: 30 Mins",
              icon: Wind,
              progress: 83,
              delay: 0.3,
            },
            {
              id: "stress-stat",
              label: "Stress Reduction",
              value: "Low",
              subtext: "Feeling calm and centered",
              icon: Smile,
              progress: 90,
              delay: 0.45,
              className: "sm:ml-8 lg:ml-10",
            },
          ]}
        />

        {/* Mood Tracker */}
        <MoodTracker />

        {/* Daily Healing Routines */}
        <DashboardSection id="routines">
          <SectionHeading
            animate
            eyebrow="Your Path"
            title="Daily Healing Routines"
            description="Build emotional resilience with personalized mini-habits."
            className="mb-8"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {healingRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                task={routine}
                isCompleted={completedRoutines.includes(routine.id)}
                onToggle={toggleRoutine}
              />
            ))}
          </div>
        </DashboardSection>

        {/* Meditation Experience */}
        <DashboardSection id="meditation">
          <SectionHeading
            animate
            eyebrow="Guided Practice"
            title="Meditation Experience"
            description="Reduce stress and cultivate mindfulness with our guided sessions."
            className="mb-8"
          />
          
          <FilterBar 
            filters={mentalCategories} 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMeditations.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onClick={handleSessionClick}
              />
            ))}
            {filteredMeditations.length === 0 && (
              <p className="col-span-full py-10 text-center text-wellness-muted font-medium">
                No sessions found in this category.
              </p>
            )}
          </div>
        </DashboardSection>

        {/* Interactive Breathing */}
        <DashboardSection id="breathing">
          <SectionHeading
            animate
            eyebrow="Breath Control"
            title="Breathing Exercises"
            description="Use your breath to reset your nervous system."
            className="mb-8"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {breathingCycles.map((cycle) => (
              <BreathingOrb key={cycle.id} cycleData={cycle} />
            ))}
          </div>
        </DashboardSection>

        <HealingAudioSection />

        {/* Sleep Wellness Section */}
        <DashboardSection id="sleep-wellness">
          <SectionHeading
            animate
            eyebrow="Deep Rest"
            title="Sleep Wellness"
            description="Drift off peacefully with our soothing sleep stories and guided night routines."
            className="mb-8"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sleepStories.map((story) => (
              <SessionCard
                key={story.id}
                session={story}
                onClick={handleSessionClick}
              />
            ))}
          </div>
        </DashboardSection>

      </div>
    </DashboardLayout>
  );
}