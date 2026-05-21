import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Play, Sparkles, Smile, Wind, Moon, Zap, Coffee } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import FilterBar from "../ui/health/FilterBar";
import SessionCard from "../ui/cards/SessionCard";
import { useDashboard } from "../../context/DashboardContext";
import { useMedia } from "../../context/MediaContext";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { meditationSessions, mentalCategories } from "../../data/mentalHealthData";

const moodOptions = [
  { id: "happy", label: "Happy", icon: Smile, color: "#2E7D32", recommendation: "med-4" },
  { id: "calm", label: "Calm", icon: Wind, color: "#1565C0", recommendation: "med-1" },
  { id: "tired", label: "Tired", icon: Moon, color: "#6A1B9A", recommendation: "med-2" },
  { id: "stressed", label: "Stressed", icon: Zap, color: "#D32F2F", recommendation: "med-1" },
  { id: "focused", label: "Focused", icon: Coffee, color: "#E77B35", recommendation: "med-3" },
];

export default function MeditationSection() {
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = useDashboard();
  const { playTrack, playVideo } = useMedia();
  const hasProPlan = state?.activePlan === "Pro";

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedMood, setSelectedMood] = useState(null);
  const [recommendedSession, setRecommendedSession] = useState(null);

  const filteredMeditations = activeFilter === "All"
    ? meditationSessions
    : meditationSessions.filter((s) => s.category === activeFilter);

  const handleSessionClick = (session) => {
    if (session.premium && !hasProPlan) {
      toast.showToast({ type: "warning", title: "Premium Session", message: "Please upgrade to access premium sessions." });
      navigate("/pricing");
      return;
    }
    if (session.mediaType === "video") {
      playVideo(session);
    } else {
      playTrack(session);
    }
    toast.showToast({ title: "Starting Session", message: `Loading ${session.title}...` });
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const session = meditationSessions.find((s) => s.id === mood.recommendation);
    if (session) {
      setRecommendedSession(session);
    }
  };

  return (
    <div className="space-y-12">
      {/* Mood Check-In & Recommendation */}
      <DashboardSection id="mood-meditation">
        <SectionHeading
          animate
          eyebrow="Mind Check-in"
          title="What is your mind state right now?"
          className="mb-8"
        />
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white/40 p-8 border border-white/60 shadow-glass backdrop-blur-md">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-4">
              {moodOptions.map((mood) => {
                const Icon = mood.icon;
                const isSelected = selectedMood?.id === mood.id;

                return (
                  <motion.button
                    key={mood.id}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMoodSelect(mood)}
                    className={`flex flex-col items-center gap-3 rounded-3xl border p-4 transition-all duration-300 w-24 sm:w-28 ${
                      isSelected
                        ? "bg-white shadow-lg border-white shadow-black/5"
                        : "bg-white/50 border-white/40 hover:bg-white/80"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300`}
                      style={{
                        backgroundColor: isSelected ? `${mood.color}20` : "transparent",
                        color: mood.color,
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <span className={`text-xs font-bold ${isSelected ? "text-wellness-dark" : "text-wellness-muted"}`}>
                      {mood.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {recommendedSession && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 max-w-md rounded-3xl bg-gradient-to-br from-wellness-orange/5 to-wellness-green/5 border border-wellness-orange/20 p-5 flex items-center gap-4"
                >
                  <div className="h-16 w-16 rounded-2xl overflow-hidden flex-shrink-0 relative">
                    <img src={recommendedSession.image} alt={recommendedSession.title} className="h-full w-full object-cover" />
                    {recommendedSession.premium && (
                      <div className="absolute inset-0 bg-black/35 flex items-center justify-center text-white">
                        <Lock size={12} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-orange">
                      <Sparkles size={10} /> Recommended for you
                    </span>
                    <h4 className="font-heading text-sm font-bold text-wellness-dark truncate mt-0.5">{recommendedSession.title}</h4>
                    <p className="text-xs text-wellness-muted truncate">{recommendedSession.instructor} • {recommendedSession.duration} mins</p>
                  </div>
                  <button
                    onClick={() => handleSessionClick(recommendedSession)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-wellness-dark text-white hover:bg-black transition-colors"
                  >
                    <Play size={14} fill="white" className="ml-0.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DashboardSection>

      {/* Guided Meditation Catalog */}
      <DashboardSection id="meditation-library">
        <SectionHeading
          animate
          eyebrow="Guided Practice"
          title="Meditation Sanctuary"
          description="Cultivate clarity and ground your thoughts with daily guidance."
          className="mb-8"
        />

        <FilterBar
          filters={mentalCategories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
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
    </div>
  );
}
