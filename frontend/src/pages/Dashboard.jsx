import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X, Headphones, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import HeroBanner from "../components/dashboard/HeroBanner";
const homeVideo = "";
const meditationVideo = "";
const physicalVideo = "";
import DailyRoutine from "../components/dashboard/DailyRoutine";
import RecommendedSection from "../components/dashboard/RecommendedSection";
import ProgressTracker from "../components/dashboard/ProgressTracker";
import LiveClasses from "../components/dashboard/LiveClasses";
import Footer from "../components/dashboard/Footer";

// New Content Sections
import ContinueWatchingSection from "../components/dashboard/ContinueWatchingSection";
import RecentlyPlayedSection from "../components/dashboard/RecentlyPlayedSection";
import FeaturedProgramsSection from "../components/dashboard/FeaturedProgramsSection";
import FocusMusicSection from "../components/dashboard/FocusMusicSection";
import BreathingExercisesSection from "../components/dashboard/BreathingExercisesSection";
import SavedSanctuary from "../components/dashboard/SavedSanctuary";
import MeditationSection from "../components/dashboard/MeditationSection";
import SleepSection from "../components/dashboard/SleepSection";
import BreathworkSection from "../components/dashboard/BreathworkSection";
import WisdomSection from "../components/dashboard/WisdomSection";
import LiveClassesSection from "../components/dashboard/LiveClassesSection";
import KidsYogaSection from "../components/dashboard/KidsYogaSection";
import JournalSection from "../components/dashboard/JournalSection";
import AICoachSection from "../components/dashboard/AICoachSection";
import DashboardPlansSection from "../components/dashboard/DashboardPlansSection";
import HealthMetricsSection from "../components/dashboard/metrics/HealthMetricsSection";
import YogaWorldSection from "../components/dashboard/yogaWorld/YogaWorldSection";
import EmptyState from "../components/ui/states/EmptyState";
import { Search } from "lucide-react";
import PalmistryDashboard from "../components/dashboard/palmistry/PalmistryDashboard";
import SacredOrbitSection from "../components/sacred-orbit/SacredOrbitSection";
// import DoshaDashboard from "../components/dashboard/dosha/DoshaDashboard";
import { ENABLE_PALMISTRY } from "../config/features";

// Premium Wellness OS Components
import DashboardHero from "../components/dashboard/dashboardHero/DashboardHero";
import WellnessInsights from "../components/dashboard/WellnessInsights";
import SpiritualMilestones from "../components/dashboard/SpiritualMilestones";
import ContinueJourney from "../components/dashboard/ContinueJourney";
import RecentPlans from "../components/dashboard/RecentPlans";
import AIRecommendations from "../components/dashboard/AIRecommendations";
import { useGeneratedPlans } from "../hooks/useGeneratedPlans";
import { suryaService } from "../services/suryaService";

import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import { useToast } from "../context/ToastContext";
import { useMedia } from "../context/MediaContext";
import { sessionCatalog } from "../data/wellnessData";

const sectionMeta = {
  home: { title: "Today feels lighter already", hero: "Morning sanctuary", focus: "All your wellness rituals in one place." },
  meditation: { title: "Meditation", hero: "Mindful stillness", focus: "Slow down and reset with guided calm." },
  sleep: { title: "Sleep", hero: "Night restoration", focus: "Wind down with soothing sessions and soundscapes." },
  wisdom: { title: "Wisdom", hero: "Spiritual insight", focus: "Reflect, learn, and deepen your practice." },
  breathwork: { title: "Breathwork", hero: "Breath reset", focus: "Use the breath to energize or release tension." },
  kids: { title: "Kids Yoga", hero: "Family flow", focus: "Gentle movement for younger yogis." },
  saved: { title: "Saved Sanctuary", hero: "Your Sanctuary", focus: "Return to the practices that center you." },
  plans: { title: "AI Generated Plans", hero: "Your Healing Journeys", focus: "Continue your personalized wellness paths." },
  metrics: { title: "Health Metrics", hero: "Wellness Dashboard", focus: "Immersive tracking of your vital health stats." },
  "yoga-world": { title: "Yoga World", hero: "Global Wellness", focus: "Connect with the latest in mindfulness and yoga science." },
  palmistry: { title: "AI Palmistry", hero: "Spiritual Insights", focus: "Analyze your palm for energetic wellness insights." },
  surya: { title: "Surya Sessions", hero: "Sun Salutations", focus: "Flow through the 12 postures of Surya Namaskar." },
  insights: { title: "Wellness Insights", hero: "Your Energy State", focus: "Understand your sleep, consistency, and recovery patterns." },
  history: { title: "Practice History", hero: "Your Practice History", focus: "Look back at your completed wellness sessions." },
  support: { title: "Support", hero: "Mindful Support", focus: "We are here to assist and guide your wellness practice." },
};

function SessionModal({ session, onClose, onPreview, onStart }) {
  if (!session) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-black/50 px-4 py-8 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        className="mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl"
      >
        <div className="relative h-72">
          <img src={session.image} alt={session.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-wellness-border text-white backdrop-blur-md transition hover:bg-white/10 hover:scale-105"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/80">Session details</p>
            <h3 className="mt-1 font-heading text-4xl font-extrabold">{session.title}</h3>
            <p className="mt-1.5 text-sm text-white/90">with {session.instructor}</p>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8 bg-transparent">
          <p className="text-base leading-relaxed text-wellness-muted font-medium">{session.preview || session.description}</p>
          <div className="flex flex-wrap gap-2">
            {(session.tags || []).map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 border border-wellness-border px-3 py-1.5 text-xs font-semibold text-wellness-glow">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row pt-2">
            <button
              type="button"
              onClick={() => onStart(session)}
              className="rounded-full bg-wellness-glow hover:bg-wellness-glow/90 text-black px-6 py-3 text-sm font-extrabold transition hover:shadow-glow2"
            >
              Start session
            </button>
            <button
              type="button"
              onClick={() => onPreview(session)}
              className="rounded-full bg-white/5 border border-wellness-border px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <Play size={16} /> Play preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MeetingModal({ liveClass, onClose }) {
  if (!liveClass) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[95] bg-black/50 px-4 py-8 backdrop-blur-md flex items-center justify-center"
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        className="mx-auto w-full max-w-2xl rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-8 shadow-glass backdrop-blur-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-wellness-gold">Live class</p>
            <h3 className="mt-1 font-heading text-3xl font-extrabold text-white">{liveClass.title}</h3>
            <p className="mt-1 text-sm text-wellness-muted font-medium">with {liveClass.instructor}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-white/5 border border-wellness-border p-3 text-wellness-muted transition hover:bg-white/10 hover:text-white hover:scale-105">
            <X size={20} />
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-5 shadow-glass border border-wellness-border">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-wellness-gold">Starts at</p>
            <p className="mt-1 font-heading text-3xl font-extrabold text-white">{liveClass.time}</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5 shadow-glass border border-wellness-border">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-wellness-gold">Seats left</p>
            <p className="mt-1 font-heading text-3xl font-extrabold text-white">{liveClass.seatsLeft}</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-wellness-glow/20 bg-wellness-glow/10 p-5 text-sm text-wellness-glow text-center font-semibold shadow-[0_0_15px_rgba(0,230,118,0.1)]">
          Meeting room is ready. Your instructor will admit you shortly.
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { section = "home" } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const toast = useToast();
  
  const {
    state,
    modalSession,
    meetingClass,
    lastSession,
    recommendations,
    markSessionCompleted,
    completeRoutine,
    joinClass,
    setModalSession,
    setMeetingClass,
  } = useDashboard();

  const { playTrack, playVideo } = useMedia();
  
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [suryaStreak, setSuryaStreak] = useState(0);

  // Fetch Surya Namaskar streak
  useEffect(() => {
    if (auth.user?.id || auth.user?.uid) {
      suryaService.getStreak(auth.user.id || auth.user.uid).then(setSuryaStreak).catch(console.error);
    }
  }, [auth.user]);

  const DASHBOARD_CATEGORIES = ["All", "Meditation", "Yoga", "Sleep", "Breathwork"];
  const { generatedPlans, unfinishedPlan } = useGeneratedPlans();
  
  if (!auth.isAuthReady) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold bg-wellness-bg text-white">
        Loading dashboard...
      </div>
    );
  }
  
  const userName = auth.user?.name || "Yogi";
  // Combine base streak with Surya streak for demonstration
  const currentStreak = (auth.user?.wellnessStats?.currentStreak || 0) + suryaStreak;
  const calmScore = auth.user?.wellnessStats?.calmScore || 0;
  const hasProPlan = auth.isPremium || state.activePlan === "Pro";
  const activeSection = sectionMeta[section] || sectionMeta.home;

  const continueJourneySession = unfinishedPlan ? {
    id: unfinishedPlan.id,
    title: unfinishedPlan.title,
    duration: unfinishedPlan.duration,
    progress: unfinishedPlan.progress || 0,
    category: unfinishedPlan.goal || "Journey",
    originalPlan: unfinishedPlan
  } : lastSession;

  const handleSessionOpen = (session) => {
    if (session.premium && !hasProPlan) {
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

  const filteredResults = (query.trim() || selectedCategory !== "All")
    ? sessionCatalog.filter((session) => {
        const matchesQuery = query.trim() === "" || [session.title, session.instructor, session.category, ...(session.tags || [])]
          .join(" ")
          .toLowerCase()
          .includes(query.trim().toLowerCase());
        const matchesCategory = selectedCategory === "All" || session.category?.toLowerCase().includes(selectedCategory.toLowerCase());
        return matchesQuery && matchesCategory;
      })
    : [];

  const getVideoSrc = (sec) => {
    if (sec === "home") return meditationVideo;
    if (sec === "meditation") return physicalVideo;
    if (sec === "breathwork" || sec === "kids") return meditationVideo;
    return homeVideo;
  };

  return (
    <DashboardLayout userName={userName} title={activeSection.title} query={query} onQueryChange={setQuery}>
      <div className="flex flex-col gap-10 lg:gap-14 pb-10">
        
        {section === "home" ? (
          <DashboardHero userName={userName} streak={currentStreak} calmScore={calmScore} />
        ) : section === "plans" ? (
          <HeroBanner 
            userName={userName}
            lastSession={lastSession}
            onResumeSession={() => lastSession && handleSessionOpen(lastSession)}
            onExplorePrograms={() => navigate("/dashboard/meditation")}
            sectionTitle={activeSection.hero}
            videoSrc={getVideoSrc(section)}
          />
        ) : null}

        {section !== "palmistry" && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-2">
            {DASHBOARD_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold border transition-all duration-300 ${
                  selectedCategory === cat 
                    ? "bg-wellness-glow/25 border-wellness-glow/40 text-wellness-glow shadow-[0_0_15px_rgba(0,230,118,0.15)]" 
                    : "bg-white/5 border-wellness-border text-wellness-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {(query.trim() || selectedCategory !== "All") && (
          <section className="bg-wellness-glass p-6 rounded-3xl border border-wellness-border shadow-glass backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-extrabold text-white">Search results</h2>
              <p className="text-sm font-semibold text-wellness-muted">{filteredResults.length} matches</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredResults.map((session) => (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => handleSessionOpen(session)}
                  className="group flex gap-4 rounded-3xl border border-wellness-border bg-white/5 p-3 text-left transition hover:bg-white/10 hover:border-wellness-glow/30 hover:shadow-card"
                >
                  <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-2xl">
                    <img src={session.image} alt={session.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                  <div className="py-1">
                    <p className="font-heading text-sm font-bold text-white group-hover:text-wellness-glow line-clamp-2">{session.title}</p>
                    <p className="text-[0.65rem] uppercase tracking-wider text-wellness-muted mt-1">{session.instructor}</p>
                  </div>
                </button>
              ))}
              {!filteredResults.length && (
                <div className="col-span-full">
                  <EmptyState 
                    icon={Search} 
                    title="No matches found" 
                    description={`We couldn't find any sessions matching "${query}". Try adjusting your search keywords.`} 
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* --- PREMIUM CONTENT SECTIONS --- */}

        {section === "saved" && (
          <SavedSanctuary handleSessionOpen={handleSessionOpen} hasProPlan={hasProPlan} />
        )}
        {section === "meditation" && <MeditationSection />}
        {section === "sleep" && <SleepSection />}
        {section === "breathwork" && <BreathworkSection />}
        {section === "wisdom" && <WisdomSection />}
        {section === "live" && <LiveClassesSection />}
        {section === "kids" && <KidsYogaSection />}
        {section === "journal" && <JournalSection />}
        {section === "ai-coach" && <AICoachSection />}
        {section === "plans" && <DashboardPlansSection />}
        {section === "metrics" && <HealthMetricsSection />}
        {section === "yoga-world" && <YogaWorldSection />}
        {/* {section === "dosha" && <DoshaDashboard />} */}
        {section === "palmistry" && ENABLE_PALMISTRY && <PalmistryDashboard />}
        {section === "surya" && <SacredOrbitSection isDashboard />}
        {section === "insights" && <WellnessInsights />}
        {section === "history" && (
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wellness-glow/20 border border-wellness-glow/30 text-wellness-glow shadow-glow2">
                <Clock size={20} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-white">Practice History</h2>
            </div>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <RecentPlans plans={generatedPlans} onContinue={(plan) => navigate("/generated-plan", { state: { goalId: plan.goal, durationId: plan.duration, levelId: plan.level } })} />
              </div>
              <div className="lg:col-span-6">
                <RecentlyPlayedSection onOpenSession={handleSessionOpen} />
              </div>
            </div>
          </div>
        )}
        {section === "support" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wellness-gold/20 border border-wellness-gold/30 text-wellness-gold shadow-[0_0_15px_rgba(212,166,79,0.2)]">
                <Headphones size={20} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-white">YogaWoman Support</h2>
            </div>
            <div className="rounded-[2rem] border border-wellness-border bg-wellness-glass p-8 shadow-glass backdrop-blur-[18px] space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">How can we help your practice?</h3>
                <p className="text-sm text-wellness-muted mt-1 font-medium">Send a message to our mindful support team, and we will get back to you shortly.</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); toast.showToast({ type: "success", title: "Message Sent", message: "Thank you. Our support team will contact you soon." }); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-wellness-muted mb-2">Subject</label>
                  <input required className="w-full bg-white/5 border border-wellness-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-wellness-glow/40 transition-colors font-medium" placeholder="How can we assist you today?" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-wellness-muted mb-2">Message</label>
                  <textarea required rows={4} className="w-full bg-white/5 border border-wellness-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-wellness-glow/40 transition-colors resize-none font-medium" placeholder="Share your thoughts or questions here..." />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-full bg-wellness-glow hover:bg-wellness-glow/95 text-black font-extrabold shadow-[0_0_15px_rgba(0,230,118,0.25)] transition-all hover:scale-[1.01]">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}

        {section === "home" && (
          <div className="flex flex-col gap-10 lg:gap-14">
            {/* Mobile: Priority ordering (Continue first) */}
            <div className="flex flex-col gap-10 lg:gap-14">
              <div className="order-1 lg:order-none">
                {continueJourneySession && (
                  <ContinueJourney 
                    lastSession={continueJourneySession} 
                    onContinue={() => {
                      if (continueJourneySession.originalPlan) {
                        navigate("/generated-plan", {
                          state: { 
                            goalId: continueJourneySession.originalPlan.goal, 
                            durationId: continueJourneySession.originalPlan.duration, 
                            levelId: continueJourneySession.originalPlan.level 
                          }
                        });
                      } else {
                        handleSessionOpen(continueJourneySession);
                      }
                    }} 
                  />
                )}
              </div>
              
              <div className="order-2 lg:order-none">
                <WellnessInsights />
              </div>

              <div className="order-2 lg:order-none">
                <SpiritualMilestones streak={currentStreak} wellnessScore={state.wellnessScore || calmScore} />
              </div>

              <div className="order-3 lg:order-none space-y-10 lg:space-y-14">
                <ContinueWatchingSection />
                <RecentlyPlayedSection />
              </div>

              <div className="order-4 lg:order-none grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <RecentPlans 
                    plans={generatedPlans} 
                    onContinue={(plan) => {
                      navigate("/generated-plan", {
                        state: { goalId: plan.goal, durationId: plan.duration, levelId: plan.level }
                      });
                    }} 
                  />
                </div>
                <div className="lg:col-span-5">
                  <AIRecommendations 
                    onSelect={(rec) => toast.showToast({ title: "AI Suggestion", message: `Opening ${rec.title}` })} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>

      <AnimatePresence>
        {modalSession && (
          <SessionModal
            session={modalSession}
            onClose={() => setModalSession(null)}
            onPreview={(session) => toast.showToast({ title: "Preview", message: session.preview || session.description })}
            onStart={(session) => {
              markSessionCompleted(session.id, session.duration);
              setModalSession(null);
              toast.showToast({ type: "success", title: "Session started", message: session.title });
            }}
          />
        )}
        {meetingClass && <MeetingModal liveClass={meetingClass} onClose={() => setMeetingClass(null)} />}
      </AnimatePresence>
    </DashboardLayout>
  );
}
