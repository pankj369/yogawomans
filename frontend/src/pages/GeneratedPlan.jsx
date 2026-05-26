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
        <div className="absolute left-[13px] sm:left-[17px] top-8 bottom-[-32px] w-[1px] bg-luxury-surface" />
      )}
      
      {/* Animated Minimalist Dot */}
      <div className="absolute left-0 sm:left-1 top-3 flex items-center justify-center">
        <motion.div 
          animate={{ scale: isExpanded ? 1 : 0.7 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute h-[28px] w-[28px] rounded-full border-[6px] border-luxury-bg transition-colors duration-700 z-10 ${isExpanded ? 'bg-luxury-emerald' : 'bg-luxury-surface'}`} 
        />
        {/* Soft active breathing glow */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.2, scale: 2.5 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
              className="absolute h-full w-full rounded-full bg-luxury-emerald"
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
          <span className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-500 ${isExpanded ? 'text-luxury-emerald' : 'text-luxury-muted'}`}>
            Phase 0{index + 1}
          </span>
          <span className={`font-heading text-xl sm:text-2xl font-bold transition-colors duration-500 ${isExpanded ? 'text-luxury-text' : 'text-luxury-muted group-hover:text-luxury-text'}`}>
            {step.type}
          </span>
        </div>
        <div className={`mt-2 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity duration-500 sm:mt-0 ${isExpanded ? 'text-luxury-gold' : 'text-luxury-gold/40 group-hover:text-luxury-gold/80'}`}>
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
              <div className="mb-6 flex h-32 w-full items-center justify-center rounded-2xl bg-luxury-surface/50 border border-luxury-surface/80 sm:h-48">
                <div className="flex flex-col items-center gap-2 text-luxury-muted">
                  <ImageIcon size={24} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.2em]">AI Visual Guidance</span>
                </div>
              </div>

              <h4 className="mb-2 font-heading text-xl font-bold text-luxury-text">{step.name || step.title}</h4>
              <p className="mb-6 text-sm leading-relaxed text-luxury-muted font-medium">{step.description}</p>
              
              {/* Individual Exercises/Sessions */}
              {step.sessions && step.sessions.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-muted">AI Recommended Exercises</p>
                  <div className="grid gap-3">
                    {step.sessions.map((session, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white border border-luxury-surface shadow-sm hover:border-luxury-emerald/30 transition-all duration-300">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-luxury-emerald/10 text-luxury-emerald text-[9px] font-extrabold uppercase tracking-wider">
                              {session.type || "Yoga"}
                            </span>
                            <h5 className="font-heading text-sm font-bold text-luxury-text">{session.title}</h5>
                          </div>
                          <span className="text-xs text-luxury-gold font-bold">{session.durationMin || session.duration} mins</span>
                        </div>
                        {session.reason && (
                          <p className="text-xs text-luxury-muted leading-relaxed font-medium">
                            <span className="text-luxury-text/70 font-semibold">AI Insight:</span> {session.reason}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : step.items && step.items.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {step.items.map((item, i) => (
                    <span key={i} className="inline-flex items-center rounded-full bg-white border border-luxury-surface px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-luxury-emerald shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
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
          className="h-8 w-8 rounded-full border-[2px] border-white/10 border-t-wellness-orange"
        />
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-light text-wellness-muted">You have no saved journeys yet.</p>
        <p className="mt-2 text-sm text-wellness-orange">Generate a new plan to start your history.</p>
      </div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {plans.map((plan) => (
        <motion.div 
          variants={itemVariants}
          key={plan.id}
          className="group relative overflow-hidden rounded-3xl border border-luxury-surface bg-luxury-card p-6 backdrop-blur-[18px] transition-all duration-300 hover:bg-white hover:border-luxury-emerald/30 hover:shadow-md"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-luxury-surface px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-luxury-emerald shadow-sm">
                  {plan.goal}
                </span>
                <span className="flex items-center gap-1 text-xs text-luxury-muted font-semibold">
                  <Calendar size={12} className="text-luxury-emerald" />
                  {new Date(plan.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-luxury-text group-hover:text-luxury-emerald transition-colors">
                {plan.title}
              </h3>
              <div className="mt-3 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.15em] text-luxury-muted">
                <span className="flex items-center gap-1"><Clock size={14} /> {plan.duration}</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-luxury-emerald" /> {plan.progress}% Done</span>
              </div>
            </div>
            
            <button 
              onClick={() => onContinue(plan)}
              className="flex items-center justify-center gap-2 rounded-full bg-luxury-emerald px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-luxury-emerald/90 transition-all sm:w-auto w-full shadow-sm"
            >
              Continue <ArrowLeft size={14} className="rotate-180" />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-luxury-surface">
            <div className="h-full bg-gradient-to-r from-luxury-emerald to-luxury-gold transition-all" style={{ width: `${plan.progress}%` }} />
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
    // If state contains planData (e.g. from history), bypass AI generation completely
    if (state.planData) {
      setPlanData(state.planData);
      setCurrentPlan(state.planData);
      setIsGenerating(false);
      return;
    }

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
            items: day.sessions?.map(s => s.title) || [],
            sessions: day.sessions || []
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
  }, [goalId, durationId, levelId, navigate, category.label, totalMinutes, auth.isAuthenticated, location.state, state.planData]);

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
        planState: {
          goalId: historyPlan.goal,
          durationId: historyPlan.duration,
          levelId: historyPlan.level,
          planData: historyPlan
        }
      },
      replace: true
    });
    setPlanData(historyPlan);
    setCurrentPlan(historyPlan);
    setIsGenerating(false);
    setActiveTab("practice");
  };

  if (isGenerating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-luxury-bg">
        <CinematicLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-bg font-sans selection:bg-luxury-emerald/20 selection:text-luxury-text overflow-x-hidden relative pb-32 text-luxury-text">
      
      {/* Cinematic "Breathing" Background Aura */}
      <motion.div
        animate={{ opacity: [0.1, 0.15, 0.1], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed left-1/2 top-0 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,168,107,0.04)_0%,transparent_70%)] blur-[100px]"
      />

      {/* Floating Header & Navigation */}
      <div className="absolute left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-8 sm:px-12">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-luxury-emerald uppercase transition-colors hover:text-luxury-emerald/80"
        >
          <ArrowLeft size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-x-2" />
          Planner
        </motion.button>
        
        {/* Immersive Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex rounded-full border border-luxury-surface bg-white/72 p-1 backdrop-blur-md shadow-sm"
        >
          <button 
            onClick={() => setActiveTab("practice")}
            className={`rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'practice' ? 'bg-luxury-emerald text-white shadow-sm' : 'text-luxury-muted hover:text-luxury-text'}`}
          >
            Practice
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'history' ? 'bg-luxury-emerald text-white shadow-sm' : 'text-luxury-muted hover:text-luxury-text'}`}
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
                <motion.div variants={itemVariants} className="mb-4 sm:mb-8 inline-flex items-center gap-3 rounded-full border border-luxury-surface bg-white/72 px-5 py-2 text-[9px] font-bold tracking-[0.3em] text-luxury-emerald uppercase backdrop-blur-md shadow-sm">
                  <Sparkles size={12} className="text-luxury-emerald" />
                  Your Healing Journey
                </motion.div>

                <motion.h1 variants={itemVariants} className="mb-4 sm:mb-8 font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-luxury-text">
                  {category.label}
                </motion.h1>

                <motion.div variants={itemVariants} className="hidden sm:flex mb-12 flex-wrap justify-center gap-x-6 gap-y-4 text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase">
                  <span>{totalMinutes} Mins</span>
                  <span className="text-luxury-surface">•</span>
                  <span>{planData?.sessionCount} Phases</span>
                  <span className="text-luxury-surface">•</span>
                  <span>Calm Score {planData?.calmScore}</span>
                </motion.div>

                <motion.div variants={itemVariants} className="hidden sm:block relative w-full">
                  <div className="absolute -left-4 -top-8 text-8xl font-serif text-luxury-surface/50 leading-none">"</div>
                  <p className="relative z-10 px-4 text-xl font-light leading-relaxed text-luxury-text/90 italic sm:text-2xl">
                    {planData?.emotionalSummary}
                  </p>
                </motion.div>
              </div>

              {/* ================= MIDDLE SECTION ================= */}
              <motion.div variants={itemVariants} className="mb-24">
                <div className="relative border-y border-luxury-surface py-10 sm:py-16">
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
                  className="group relative flex w-full max-w-[320px] items-center justify-center gap-4 overflow-hidden rounded-full bg-luxury-emerald px-8 py-5 text-[11px] font-bold tracking-[0.2em] text-white transition-all duration-500 hover:shadow-lg uppercase hover:-translate-y-1 shadow-sm"
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
                    className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-luxury-muted transition-colors hover:text-luxury-emerald uppercase disabled:opacity-50"
                  >
                    <Heart size={14} strokeWidth={2} className="transition-transform duration-500 group-hover:scale-110" />
                    {isSaving ? "Saving..." : "Save Journey"}
                  </button>
                  <button 
                    onClick={() => navigate("/")}
                    className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-luxury-muted transition-colors hover:text-luxury-emerald uppercase"
                  >
                    <RefreshCw size={14} strokeWidth={2} className="transition-transform duration-700 group-hover:rotate-180" />
                    Regenerate
                  </button>
                  <button 
                    onClick={() => auth.isAuthenticated ? setActiveTab("history") : handleAuthGate("continue")}
                    className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-luxury-muted transition-colors hover:text-luxury-emerald uppercase"
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
                <h2 className="font-heading text-3xl font-bold text-luxury-text">Your Journey History</h2>
                <p className="mt-4 text-luxury-muted font-medium">Resume past sessions and track your consistency.</p>
              </div>

              {!auth.isAuthenticated ? (
                <div className="rounded-3xl border border-luxury-surface bg-luxury-card p-12 text-center shadow-sm">
                  <h3 className="mb-4 font-heading text-2xl text-luxury-text">Sign in to view history</h3>
                  <p className="mb-8 text-luxury-muted font-medium">Create an account to save your generated plans and track your wellness progress over time.</p>
                  <button 
                    onClick={() => handleAuthGate("history")}
                    className="rounded-full bg-luxury-emerald px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-luxury-emerald/95 transition-all shadow-md"
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
