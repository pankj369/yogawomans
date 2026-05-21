import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import HeroBanner from "../components/dashboard/HeroBanner";
import homeVideo from "../assets/videos/111097-689925374.mp4";
import meditationVideo from "../assets/videos/63229-506616446.mp4";
import physicalVideo from "../assets/videos/physicalhealthherovideo.mp4";
import DailyRoutine from "../components/dashboard/DailyRoutine";
import RecommendedSection from "../components/dashboard/RecommendedSection";
import ProgressTracker from "../components/dashboard/ProgressTracker";
import LiveClasses from "../components/dashboard/LiveClasses";
import Footer from "../components/dashboard/Footer";

// New Content Sections
import ContinueWatchingSection from "../components/dashboard/ContinueWatchingSection";
import FeaturedProgramsSection from "../components/dashboard/FeaturedProgramsSection";
import FocusMusicSection from "../components/dashboard/FocusMusicSection";
import BreathingExercisesSection from "../components/dashboard/BreathingExercisesSection";
import SavedSanctuary from "../components/dashboard/SavedSanctuary";
import MeditationSection from "../components/dashboard/MeditationSection";
import SleepSection from "../components/dashboard/SleepSection";
import BreathworkSection from "../components/dashboard/BreathworkSection";
import MusicSection from "../components/dashboard/MusicSection";
import MovementSection from "../components/dashboard/MovementSection";
import WisdomSection from "../components/dashboard/WisdomSection";
import LiveClassesSection from "../components/dashboard/LiveClassesSection";
import KidsYogaSection from "../components/dashboard/KidsYogaSection";
import JournalSection from "../components/dashboard/JournalSection";
import AICoachSection from "../components/dashboard/AICoachSection";


import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import { useToast } from "../context/ToastContext";
import { useMedia } from "../context/MediaContext";
import { sessionCatalog } from "../data/wellnessData";

const sectionMeta = {
  home: { title: "Today feels lighter already", hero: "Morning sanctuary", focus: "All your wellness rituals in one place." },
  meditation: { title: "Meditation", hero: "Mindful stillness", focus: "Slow down and reset with guided calm." },
  sleep: { title: "Sleep", hero: "Night restoration", focus: "Wind down with soothing sessions and soundscapes." },
  music: { title: "Music", hero: "Sound healing", focus: "Find a rhythm that softens the nervous system." },
  wisdom: { title: "Wisdom", hero: "Spiritual insight", focus: "Reflect, learn, and deepen your practice." },
  movement: { title: "Movement", hero: "Daily motion", focus: "Build strength and flexibility with intention." },
  breathwork: { title: "Breathwork", hero: "Breath reset", focus: "Use the breath to energize or release tension." },
  kids: { title: "Kids Yoga", hero: "Family flow", focus: "Gentle movement for younger yogis." },
  saved: { title: "Saved Sanctuary", hero: "Your Sanctuary", focus: "Return to the practices that center you." },
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
        className="mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/40 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
      >
        <div className="relative h-72">
          <img src={session.image} alt={session.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md transition hover:bg-white/50 hover:scale-105"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/80">Session details</p>
            <h3 className="mt-1 font-heading text-4xl font-extrabold">{session.title}</h3>
            <p className="mt-1.5 text-sm text-white/90">with {session.instructor}</p>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8 bg-wellness-cream2">
          <p className="text-base leading-relaxed text-wellness-muted">{session.preview || session.description}</p>
          <div className="flex flex-wrap gap-2">
            {(session.tags || []).map((tag) => (
              <span key={tag} className="rounded-full bg-wellness-greenLight px-3 py-1.5 text-xs font-semibold text-wellness-green">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row pt-2">
            <button
              type="button"
              onClick={() => onStart(session)}
              className="rounded-full bg-wellness-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-black shadow-sm"
            >
              Start session
            </button>
            <button
              type="button"
              onClick={() => onPreview(session)}
              className="rounded-full bg-white border border-wellness-muted/30 px-6 py-3 text-sm font-bold text-wellness-dark transition hover:bg-wellness-cream flex items-center justify-center gap-2"
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
        className="mx-auto w-full max-w-2xl rounded-[2.5rem] border border-white/60 bg-wellness-cream2 p-8 shadow-glass"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-wellness-gold">Live class</p>
            <h3 className="mt-1 font-heading text-3xl font-extrabold text-wellness-dark">{liveClass.title}</h3>
            <p className="mt-1 text-sm text-wellness-muted">with {liveClass.instructor}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-white/70 p-3 text-wellness-muted transition hover:bg-white hover:text-wellness-dark hover:scale-105">
            <X size={20} />
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white/60 p-5 shadow-sm border border-white/50">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-wellness-gold">Starts at</p>
            <p className="mt-1 font-heading text-3xl font-extrabold text-wellness-dark">{liveClass.time}</p>
          </div>
          <div className="rounded-3xl bg-white/60 p-5 shadow-sm border border-white/50">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-wellness-gold">Seats left</p>
            <p className="mt-1 font-heading text-3xl font-extrabold text-wellness-dark">{liveClass.seatsLeft}</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-wellness-green/30 bg-wellness-greenLight p-5 text-sm text-wellness-greenDark text-center font-medium">
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
  
  if (auth.profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold bg-wellness-bg text-wellness-dark">
        Loading dashboard...
      </div>
    );
  }
  
  const profile = auth.profile;
  const userName = profile?.full_name || "Yogi";
  const hasProPlan = state.activePlan === "Pro";
  const activeSection = sectionMeta[section] || sectionMeta.home;

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

  const filteredResults = query.trim()
    ? sessionCatalog.filter((session) =>
        [session.title, session.instructor, session.category, ...(session.tags || [])]
          .join(" ")
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      )
    : [];

  const getVideoSrc = (sec) => {
    if (sec === "home") return meditationVideo;
    if (sec === "meditation" || sec === "movement") return physicalVideo;
    if (sec === "breathwork" || sec === "kids") return meditationVideo;
    return homeVideo;
  };

  return (
    <DashboardLayout userName={userName} title={activeSection.title} query={query} onQueryChange={setQuery}>
      <div className="flex flex-col gap-10 lg:gap-14 pb-10">
        
        <HeroBanner 
          userName={userName}
          lastSession={lastSession}
          onResumeSession={() => lastSession && handleSessionOpen(lastSession)}
          onExplorePrograms={() => navigate("/dashboard/meditation")}
          sectionTitle={activeSection.hero}
          videoSrc={getVideoSrc(section)}
        />

        {query.trim() && (
          <section className="bg-white/40 p-6 rounded-3xl border border-white/50 backdrop-blur-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-extrabold text-wellness-dark">Search results</h2>
              <p className="text-sm font-semibold text-wellness-muted">{filteredResults.length} matches</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredResults.map((session) => (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => handleSessionOpen(session)}
                  className="group flex gap-4 rounded-3xl border border-white/60 bg-white/70 p-3 text-left transition hover:bg-white hover:shadow-card"
                >
                  <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-2xl">
                    <img src={session.image} alt={session.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                  <div className="py-1">
                    <p className="font-heading text-sm font-bold text-wellness-dark line-clamp-2">{session.title}</p>
                    <p className="text-[0.65rem] uppercase tracking-wider text-wellness-muted mt-1">{session.instructor}</p>
                  </div>
                </button>
              ))}
              {!filteredResults.length && (
                <p className="py-4 text-sm font-medium text-wellness-muted">No sessions found. Try another keyword.</p>
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
        {section === "music" && <MusicSection />}
        {section === "movement" && <MovementSection />}
        {section === "wisdom" && <WisdomSection />}
        {section === "live" && <LiveClassesSection />}
        {section === "kids" && <KidsYogaSection />}
        {section === "journal" && <JournalSection />}
        {section === "ai-coach" && <AICoachSection />}

        {section === "home" && (
          <>
            {/* 1. Continue Watching */}
            {lastSession && <ContinueWatchingSection onResume={handleSessionOpen} />}
            
            {/* 2. Recommended Sessions */}
            <RecommendedSection items={recommendations} onOpenDetails={handleSessionOpen} />
            
            {/* 3. Daily Wellness Routine */}
            <DailyRoutine
              completedItems={state.completedRoutine}
              onStartSession={(item) => {
                const session = sessionCatalog.find((entry) => entry.id === item.sessionId);
                if (session) {
                  handleSessionOpen(session);
                  markSessionCompleted(session.id, item.duration);
                }
                completeRoutine(item.id);
              }}
              onToggleComplete={completeRoutine}
            />
            
            {/* 4 & 9. Featured Programs (Premium banners) */}
            <FeaturedProgramsSection onExplore={(program) => {
              toast.showToast({ title: "Exploring Program", message: `Opening ${program.title}` });
            }} />
            
            {/* 5. Focus Music & Ambient Audio */}
            <FocusMusicSection />
            
            {/* 6. Live Classes */}
            <LiveClasses
              joined={state.liveJoined}
              onJoin={(liveClass) => {
                joinClass(liveClass);
                setMeetingClass(liveClass);
                toast.showToast({ type: "success", title: "Live class joined", message: `You're in ${liveClass.title}.` });
              }}
            />
            
            {/* 7. Wellness Stats & Progress */}
            <ProgressTracker />
            
            {/* 8. Breathing Exercises */}
            <BreathingExercisesSection onStart={(exercise) => {
              toast.showToast({ title: "Breathing Session", message: `Starting ${exercise.title} timer...` });
            }} />
          </>
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
