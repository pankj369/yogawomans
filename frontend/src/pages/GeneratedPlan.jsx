import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, PlayCircle, Heart, RefreshCw, Bookmark, Sparkles, Clock, Calendar, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { wellnessCategories } from "../data/wellnessRecommendationData";
import { useAuth } from "../context/AuthContext";
import { useGeneratedPlans } from "../hooks/useGeneratedPlans";
import { generatePlanApi, saveGeneratedPlan } from "../services/planService";
import CinematicLoader from "../components/ui/loaders/CinematicLoader";

// AI Message Sequences
const AI_MESSAGES = [
  "Feeling your energy...",
  "Analyzing your wellness needs...",
  "Balancing nervous system recovery...",
  "Curating your personalized flow...",
  "Finalizing your journey..."
];

// Emotional AI Generators
const getEmotionalSummary = (goalId) => {
  switch (goalId) {
    case "stress":
      return "Your nervous system appears overloaded today. This calming sequence was designed to restore emotional balance and dissolve internal tension.";
    case "sleep":
      return "Your body is asking for deep rest. This soothing sequence will help quiet your mind and prepare your nervous system for profound, restorative sleep.";
    case "focus":
      return "Your mental energy feels scattered. This intentional journey will gently anchor your attention, clearing mental fog and bringing sharp, grounded clarity.";
    case "flexibility":
    case "strength":
      return "Your physical vessel is holding onto resistance. This gentle opening sequence will help release trapped energy and restore fluid, comfortable movement.";
    default:
      return "Your body and mind are seeking alignment. This intentional sequence was curated to reconnect your awareness and gently restore inner harmony.";
  }
};

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// Expandable Timeline Phase Component
function TimelinePhase({ step, index, isExpanded, onToggle, isLast }) {
  return (
    <motion.div variants={itemVariants} className="relative pl-12 sm:pl-16">
      {/* Timeline Continuous Line */}
      {!isLast && (
        <div className="absolute left-[13px] sm:left-[17px] top-8 bottom-[-32px] w-[1px] bg-[#EFE7DC]" />
      )}
      
      {/* Animated Minimalist Dot */}
      <div className="absolute left-0 sm:left-1 top-3 flex items-center justify-center">
        <motion.div 
          animate={{ scale: isExpanded ? 1 : 0.7 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute h-[28px] w-[28px] rounded-full border-[6px] border-[#F7F3EE] transition-colors duration-700 z-10 ${isExpanded ? 'bg-[#E27229]' : 'bg-[#EFE7DC]'}`} 
        />
        {/* Soft active breathing glow */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.2, scale: 2.5 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
              className="absolute h-full w-full rounded-full bg-[#E27229]"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Header - Clickable Trigger */}
      <button 
        onClick={onToggle}
        className="group relative flex w-full flex-col items-start justify-between gap-1 pb-6 text-left sm:flex-row sm:items-center sm:gap-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
          <span className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-500 ${isExpanded ? 'text-[#E27229]' : 'text-[#6E6A66]/50'}`}>
            Phase 0{index + 1}
          </span>
          <span className={`font-serif text-3xl sm:text-4xl font-light transition-colors duration-500 ${isExpanded ? 'text-[#11281d]' : 'text-[#3a4a3d]/40 group-hover:text-[#11281d]/80'}`}>
            {step.type}
          </span>
        </div>
        <div className={`mt-2 text-xs font-medium uppercase tracking-[0.2em] transition-opacity duration-500 sm:mt-0 ${isExpanded ? 'text-[#C89B63]' : 'text-[#C89B63]/40 group-hover:text-[#C89B63]/80'}`}>
          {step.duration}
        </div>
      </button>

      {/* Expandable Content Panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden pb-12"
          >
            <div className="pr-4 sm:pr-8">
              
              {/* Future-Ready Image Placeholder */}
              <div className="mb-6 flex h-32 w-full items-center justify-center rounded-2xl bg-[#EFE7DC]/30 border border-[#EFE7DC] sm:h-48">
                <div className="flex flex-col items-center gap-2 text-[#8FA68E]/60">
                  <ImageIcon size={24} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.2em]">AI Visual Guidance</span>
                </div>
              </div>

              <h4 className="mb-4 font-serif text-2xl font-light text-[#11281d]">{step.name || step.title}</h4>
              <p className="mb-6 text-lg font-light leading-relaxed text-[#3a4a3d]">{step.description}</p>
              {step.items && (
                <div className="flex flex-wrap gap-3">
                  {step.items.map((item, i) => (
                    <span key={i} className="inline-flex items-center rounded-full bg-[#EFE7DC]/50 px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-[#E27229]">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// History Tab Component
function HistoryList({ userId, onContinue }) {
  const { generatedPlans } = useGeneratedPlans();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth UX
    const timer = setTimeout(() => {
      // Filter if necessary, but generatedPlans is already user's plans in a robust app
      setPlans(generatedPlans);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [generatedPlans]);

  if (loading) {
    return (
      <div className="flex py-20 justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 rounded-full border-[2px] border-[#EFE7DC] border-t-[#E27229]"
        />
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-light text-[#6E6A66]">You have no saved journeys yet.</p>
        <p className="mt-2 text-sm text-[#8FA68E]">Generate a new plan to start your history.</p>
      </div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {plans.map((plan) => (
        <motion.div 
          variants={itemVariants}
          key={plan.id}
          className="group relative overflow-hidden rounded-3xl border border-[#EFE7DC]/60 bg-white/40 p-6 backdrop-blur-md transition-all hover:bg-white/60 hover:shadow-xl"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFE7DC] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E27229]">
                  {plan.goal}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#E27229]/80">
                  <Calendar size={12} />
                  {new Date(plan.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-light text-[#11281d]">
                {plan.title}
              </h3>
              <div className="mt-3 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.15em] text-[#3a4a3d]">
                <span className="flex items-center gap-1"><Clock size={14} /> {plan.duration}</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-[#E27229]" /> {plan.progress}% Done</span>
              </div>
            </div>
            
            <button 
              onClick={() => onContinue(plan)}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E27229] to-[#d5631c] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:shadow-[0_10px_20px_rgba(226,114,41,0.3)] sm:w-auto w-full"
            >
              Continue <ArrowLeft size={14} className="rotate-180" />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#EFE7DC]">
            <div className="h-full bg-[#E27229] transition-all" style={{ width: `${plan.progress}%` }} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function GeneratedPlan() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { setCurrentPlan } = useGeneratedPlans();
  
  const [isGenerating, setIsGenerating] = useState(true);
  const [generationStep, setGenerationStep] = useState(0);
  const [planData, setPlanData] = useState(null);
  const [expandedPhaseId, setExpandedPhaseId] = useState("phase-1");
  const [activeTab, setActiveTab] = useState("practice"); // 'practice' | 'history'
  const [isSaving, setIsSaving] = useState(false);

  // Determine state safely
  // If no state, we default to stress/20min so History tab can still load without crashing if navigated directly.
  const state = location.state?.planState || location.state || {};
  const goalId = state.goalId || "stress";
  const durationId = state.durationId || "20min";
  const levelId = state.levelId || "beginner";

  const category = wellnessCategories.find((c) => c.id === goalId) || wellnessCategories[0];
  
  const DURATION_MAP = {
    "10min": 10,
    "20min": 20,
    "30min": 30,
    "45min": 45,
    "60min": 60,
  };
  const totalMinutes = DURATION_MAP[durationId] || 20;

  // On Mobile, prioritize History if authenticated and user didn't explicitly request generation
  useEffect(() => {
    if (auth.isAuthenticated && !location.state && window.innerWidth < 768) {
      setActiveTab("history");
    }
  }, [auth.isAuthenticated, location.state]);

  // Cinematic loader handles message cycling now

  useEffect(() => {
    // If navigated without state and not authenticated, go home. 
    // If authenticated, we allow it so they can see History.
    if (!location.state && !auth.isAuthenticated) {
      navigate("/");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const userPreferences = auth.user?.preferences || {};
        
        // Call the OpenAI-powered backend generator
        const generatedAIPlan = await generatePlanApi(userPreferences, durationId, goalId);
        
        // Enrich plan for UI specifics
        const uiPlanData = {
          ...generatedAIPlan,
          title: generatedAIPlan.title || category.label || "Wellness Journey",
          goal: goalId,
          duration: durationId,
          level: levelId,
          emotionalSummary: getEmotionalSummary(goalId),
          sessionCount: generatedAIPlan.schedule?.length || 0,
          calmScore: 85,
          generatedPhases: generatedAIPlan.schedule?.map((day, idx) => ({
            id: `phase-${idx + 1}`,
            name: `Day ${day.day}: ${day.theme}`,
            description: day.theme,
            duration: day.sessions?.[0]?.durationMin ? `${day.sessions[0].durationMin} min` : "15 min",
            type: day.sessions?.[0]?.type || "Practice",
            items: day.sessions?.map(s => s.title) || []
          })) || [],
          progress: 0,
          completed: false,
        };

        setPlanData(uiPlanData);
        setCurrentPlan(uiPlanData);
      } catch (error) {
        console.error("Error generating:", error);
      } finally {
        setIsGenerating(false);
      }
    }, 5000); 

    return () => clearTimeout(timer);
  }, [goalId, durationId, levelId, navigate, category.label, totalMinutes, auth.isAuthenticated, location.state]);

  // Execute pending actions automatically if logged in
  useEffect(() => {
    if (!isGenerating && planData && auth.isAuthenticated) {
      const pendingAction = location.state?.actionPending;
      if (pendingAction) {
        // Clear the pending action so it doesn't loop
        navigate(location.pathname, { 
          replace: true, 
          state: { 
            planState: { goalId, durationId, levelId } 
          } 
        });

        // Execute the action
        if (pendingAction === "start") {
          handleStartSession(true); // pass true to skip auth gate since we just authenticated
        } else if (pendingAction === "save") {
          handleSaveJourney(true);
        }
      }
    }
  }, [isGenerating, planData, auth.isAuthenticated, location.state, navigate, goalId, durationId, levelId]);

  const handleAuthGate = (actionType) => {
    if (!auth.isAuthenticated) {
      // Preserve state and redirect to login
      navigate("/login", { 
        state: { 
          returnTo: "/generated-plan", 
          planState: { goalId, durationId, levelId },
          actionPending: actionType 
        } 
      });
      return false;
    }
    return true;
  };

  const handleStartSession = async (skipGate = false) => {
    if (!skipGate && !handleAuthGate("start")) return;
    
    // Save first if not already saved, then start
    try {
      let savedPlanId = "current";
      if (auth.user?.id && planData) {
        savedPlanId = await saveGeneratedPlan(auth.user.id, planData);
      }
      
      navigate(`/session/${savedPlanId}`, { state: { planData } });
    } catch (e) {
      console.error(e);
      // Fallback if save fails
      navigate(`/session/current`, { state: { planData } });
    }
  };

  const handleSaveJourney = async (skipGate = false) => {
    if (!skipGate && !handleAuthGate("save")) return;
    
    setIsSaving(true);
    try {
      if (auth.user?.id && planData) {
        await saveGeneratedPlan(auth.user.id, planData);
        alert("Journey saved successfully to your History!");
        setActiveTab("history");
      }
    } catch (e) {
      alert("Failed to save journey.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinueHistory = (historyPlan) => {
    // Re-generate the view with the history plan's state
    navigate("/generated-plan", {
      state: {
        goalId: historyPlan.goal,
        durationId: historyPlan.duration,
        levelId: historyPlan.level
      },
      replace: true
    });
    setActiveTab("practice");
  };

  if (isGenerating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F3EE]">
        <CinematicLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] font-sans selection:bg-[#EFE7DC] selection:text-[#2F6B3B] overflow-x-hidden relative pb-32">
      
      {/* Cinematic "Breathing" Background Aura */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed left-1/2 top-0 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(238,226,204,0.5)_0%,transparent_70%)] blur-[100px]"
      />

      {/* Floating Header & Navigation */}
      <div className="absolute left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-8 sm:px-12">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-[#E27229]/80 uppercase transition-colors hover:text-[#E27229]"
        >
          <ArrowLeft size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-x-2" />
          Planner
        </motion.button>
        
        {/* Immersive Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex rounded-full border border-[#EFE7DC] bg-white/40 p-1 backdrop-blur-md"
        >
          <button 
            onClick={() => setActiveTab("practice")}
            className={`rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'practice' ? 'bg-[#E27229] text-white shadow-md' : 'text-[#3a4a3d] hover:text-[#E27229]'}`}
          >
            Practice
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'history' ? 'bg-[#E27229] text-white shadow-md' : 'text-[#3a4a3d] hover:text-[#E27229]'}`}
          >
            History
          </button>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-24 sm:px-12 sm:pt-40">
        
        <AnimatePresence mode="wait">
          {activeTab === "practice" ? (
            <motion.div 
              key="practice"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
            >
              {/* ================= TOP SECTION ================= */}
              <div className="mb-10 sm:mb-24 flex flex-col items-center text-center">
                <motion.div variants={itemVariants} className="mb-4 sm:mb-8 inline-flex items-center gap-3 rounded-full border border-[#EFE7DC] bg-white/60 px-5 py-2 text-[9px] font-bold tracking-[0.3em] text-[#E27229] uppercase backdrop-blur-md shadow-sm">
                  <Sparkles size={12} className="text-[#E27229]" />
                  Your Healing Journey
                </motion.div>

                <motion.h1 variants={itemVariants} className="mb-4 sm:mb-8 font-serif text-5xl font-light leading-[1.1] tracking-tight text-[#11281d] sm:text-6xl md:text-7xl">
                  {category.label}
                </motion.h1>

                <motion.div variants={itemVariants} className="hidden sm:flex mb-12 flex-wrap justify-center gap-x-6 gap-y-4 text-[10px] font-bold tracking-[0.25em] text-[#E27229] uppercase">
                  <span>{totalMinutes} Mins</span>
                  <span className="text-[#EFE7DC]">•</span>
                  <span>{planData?.sessionCount} Phases</span>
                  <span className="text-[#EFE7DC]">•</span>
                  <span>Calm Score {planData?.calmScore}</span>
                </motion.div>

                <motion.div variants={itemVariants} className="hidden sm:block relative w-full">
                  <div className="absolute -left-4 -top-8 text-8xl font-serif text-[#EFE7DC]/50 leading-none">"</div>
                  <p className="relative z-10 px-4 text-xl font-light leading-relaxed text-[#3a4a3d] italic sm:text-2xl">
                    {planData?.emotionalSummary}
                  </p>
                </motion.div>
              </div>

              {/* ================= MIDDLE SECTION ================= */}
              <motion.div variants={itemVariants} className="mb-24">
                <div className="relative border-y border-[#EFE7DC]/50 py-10 sm:py-16">
                  {planData?.generatedPhases?.map((step, index) => (
                    <TimelinePhase
                      key={step.id || `phase-${index}`}
                      step={step}
                      index={index}
                      isExpanded={expandedPhaseId === (step.id || `phase-${index}`)}
                      onToggle={() => setExpandedPhaseId(expandedPhaseId === (step.id || `phase-${index}`) ? null : (step.id || `phase-${index}`))}
                      isLast={index === planData.generatedPhases.length - 1}
                    />
                  ))}
                </div>
              </motion.div>

              {/* ================= BOTTOM SECTION ================= */}
              <motion.div variants={itemVariants} className="flex flex-col items-center pb-20">
                <button 
                  onClick={handleStartSession}
                  className="group relative flex w-full max-w-[320px] items-center justify-center gap-4 overflow-hidden rounded-full bg-gradient-to-r from-[#E27229] to-[#d5631c] px-8 py-5 text-[11px] font-bold tracking-[0.2em] text-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(226,114,41,0.35)] uppercase hover:-translate-y-1"
                >
                  <motion.div 
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_60%)]"
                  />
                  <PlayCircle size={18} strokeWidth={1.5} className="relative z-10 transition-transform duration-500 group-hover:scale-110" />
                  <span className="relative z-10">Start Session</span>
                </button>

                <div className="mt-8 flex flex-wrap justify-center gap-6">
                  <button 
                    onClick={handleSaveJourney}
                    disabled={isSaving}
                    className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#3a4a3d] transition-colors hover:text-[#E27229] uppercase disabled:opacity-50"
                  >
                    <Heart size={14} strokeWidth={2} className="transition-transform duration-500 group-hover:scale-110" />
                    {isSaving ? "Saving..." : "Save Journey"}
                  </button>
                  <button 
                    onClick={() => navigate("/")}
                    className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#3a4a3d] transition-colors hover:text-[#E27229] uppercase"
                  >
                    <RefreshCw size={14} strokeWidth={2} className="transition-transform duration-700 group-hover:rotate-180" />
                    Regenerate
                  </button>
                  <button 
                    onClick={() => auth.isAuthenticated ? setActiveTab("history") : handleAuthGate("continue")}
                    className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#3a4a3d] transition-colors hover:text-[#E27229] uppercase"
                  >
                    <Bookmark size={14} strokeWidth={2} className="transition-transform duration-500 group-hover:scale-110" />
                    Continue Later
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-[60vh]"
            >
              <div className="mb-12 text-center">
                <h2 className="font-serif text-4xl font-light text-[#11281d]">Your Journey History</h2>
                <p className="mt-4 text-[#3a4a3d]">Resume past sessions and track your consistency.</p>
              </div>

              {!auth.isAuthenticated ? (
                <div className="rounded-3xl border border-[#EFE7DC] bg-white/60 p-12 text-center backdrop-blur-md">
                  <h3 className="mb-4 font-serif text-2xl text-[#11281d]">Sign in to view history</h3>
                  <p className="mb-8 text-[#3a4a3d]">Create an account to save your generated plans and track your wellness progress over time.</p>
                  <button 
                    onClick={() => handleAuthGate("history")}
                    className="rounded-full bg-gradient-to-r from-[#E27229] to-[#d5631c] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:shadow-[0_10px_30px_rgba(226,114,41,0.3)] transition-all"
                  >
                    Sign In / Sign Up
                  </button>
                </div>
              ) : (
                <HistoryList userId={auth.user?.id} onContinue={handleContinueHistory} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
