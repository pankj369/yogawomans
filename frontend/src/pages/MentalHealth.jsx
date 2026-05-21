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

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useDashboard } from "../context/DashboardContext";
import { useMedia } from "../context/MediaContext";

import { mentalCategories, meditationSessions, healingAudio, breathingCycles, sleepStories, healingRoutines } from "../data/mentalHealthData";
import mentalVideo from "../assets/videos/physicalhealthherovideo.mp4";

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
          className="mx-auto w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/20 bg-[#0B1020] text-white shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-900/30 to-transparent" />
          
          <button onClick={onClose} className="absolute right-5 top-5 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition backdrop-blur-sm">
            <X size={20} />
          </button>

          <div className="relative z-10 p-10 text-center flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 mb-6 shadow-glow2">
              <Lock size={32} className="text-white" />
            </div>
            
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-purple-300 mb-2">Premium Healing</p>
            <h3 className="font-heading text-3xl font-extrabold mb-4">Deepen Your Journey</h3>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm mb-8">
              This session is locked. Upgrade to our Premium tier to access advanced meditations, sleep stories, and personalized emotional wellness routines.
            </p>
            
            <div className="w-full space-y-3">
              <button 
                onClick={() => navigate("/pricing")}
                className="w-full rounded-full bg-purple-600 text-white py-4 text-sm font-bold transition hover:bg-purple-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                View Plans & Upgrade
              </button>
              <button 
                onClick={onClose}
                className="w-full rounded-full bg-white/10 py-4 text-sm font-bold transition hover:bg-white/20"
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
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [completedRoutines, setCompletedRoutines] = useState([]);

  const filteredMeditations = activeFilter === "All" 
    ? meditationSessions 
    : meditationSessions.filter(v => v.category === activeFilter);

  const handleSessionClick = (session) => {
    if (session.premium && !hasProPlan) {
      setShowUpgradeModal(true);
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

        {/* Healing Audio */}
        <DashboardSection id="audio-healing">
          <SectionHeading
            animate
            eyebrow="Soundscapes"
            title="Healing Audio"
            description="Immersive ambient sounds for focus, relaxation, and emotional balance."
            className="mb-8"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {healingAudio.map((track) => (
              <TrackCard 
                key={track.id} 
                track={track} 
              />
            ))}
          </div>
        </DashboardSection>

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

      <PremiumUpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </DashboardLayout>
  );
}