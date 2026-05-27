import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, CheckCircle2, PlayCircle, Bookmark, RefreshCw, Music, Activity } from "lucide-react";
import PremiumButton from "./ui/PremiumButton";
import { useNavigate } from "react-router-dom";
import { wellnessCategories } from "../data/wellnessRecommendationData";
import StaggerGroup from "./ui/animations/StaggerGroup";
import { generatePlanApi, saveGeneratedPlan } from "../services/planService";
import { useAuth } from "../context/AuthContext";
import fotlogo from "../assets/images/fotlogo.png";

// Emotional AI Generators
const getEmotionalSummary = (goalId) => {
  switch (goalId) {
    case "stress":
      return "Your nervous system appears overloaded today. This calming sequence restores emotional balance and dissolves internal tension.";
    case "sleep":
      return "Your body is asking for deep rest. This soothing sequence quiets your mind and prepares your nervous system for profound sleep.";
    case "focus":
      return "Your mental energy feels scattered. This intentional journey anchors your attention, clearing fog for sharp clarity.";
    case "anxiety":
      return "Anxiety often disconnects us from our body. This grounding flow will re-center your energy and calm your racing thoughts.";
    case "energy":
      return "You are seeking vitality. This dynamic sequence will awaken your subtle energy channels and bring a radiant glow to your day.";
    default:
      return "Your body and mind are seeking alignment. This intentional sequence reconnects your awareness and restores inner harmony.";
  }
};

const DURATIONS = [
  { id: "10min", label: "10 min", icon: "⏱️" },
  { id: "20min", label: "20 min", icon: "⏳" },
  { id: "30min", label: "30 min", icon: "🕒" },
  { id: "45min", label: "45 min", icon: "🕤" },
  { id: "60min", label: "60 min", icon: "🕰️" },
];

const LEVELS = [
  { id: "beginner", label: "Beginner", icon: "🌱" },
  { id: "intermediate", label: "Intermed.", icon: "🌿" },
  { id: "advanced", label: "Advanced", icon: "🌳" },
];

const AI_MESSAGES = [
  "Analyzing your wellness needs...",
  "Understanding your emotional state...",
  "Building your personalized healing flow...",
  "Matching breathwork and meditation...",
  "Creating your AI wellness plan..."
];

// Ultra-premium Glassmorphic Selector
const PremiumSelector = ({ options, selectedId, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.id === selectedId);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block mx-2 sm:mx-3 align-middle text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex w-full items-center justify-between gap-2 sm:gap-5 rounded-[2rem] border border-[#E27229]/30 bg-white px-4 py-2 sm:px-6 sm:py-3.5 font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#11281d] shadow-[0_20px_40px_rgba(226,114,41,0.06)] backdrop-blur-xl transition-all duration-500 -translate-y-1 hover:border-[#E27229]/60"
      >
        <span className="whitespace-nowrap">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex h-8 w-8 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#f4eadf] text-[#2B3B2E] transition-colors duration-300 group-hover:bg-[#E27229] group-hover:text-white"
        >
          <ChevronDown className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.5} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-[calc(100%+8px)] sm:top-[calc(100%+16px)] left-1/2 -translate-x-1/2 z-50 max-h-[260px] sm:max-h-[320px] w-max min-w-[200px] sm:min-w-[280px] overflow-y-auto rounded-2xl sm:rounded-[2rem] border border-[#EFE7DC] bg-white/90 p-2 sm:p-3 shadow-[0_40px_80px_-20px_rgba(17,40,29,0.15)] backdrop-blur-3xl custom-scrollbar"
          >
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`group flex w-full items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-left transition-all duration-300 ${selectedId === option.id
                    ? "bg-[#f4eadf] text-[#11281d] shadow-[inset_0_2px_10px_rgba(226,114,41,0.05)]"
                    : "text-[#3a4a3d] hover:bg-[#EFE7DC]/50 hover:text-[#11281d] hover:translate-x-1"
                  }`}
              >
                {option.icon && (
                  <span className={`flex h-8 w-8 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full text-lg sm:text-2xl shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${selectedId === option.id ? 'bg-white shadow-md' : 'bg-[#f4eadf]'}`}>
                    {option.icon}
                  </span>
                )}
                <span className={`text-lg tracking-wide ${selectedId === option.id ? 'font-bold' : 'font-medium'}`}>
                  {option.label}
                </span>

                {selectedId === option.id && (
                  <motion.div 
                    layoutId="activeIndicator" 
                    className="ml-auto h-2 w-2 rounded-full bg-[#E27229] shadow-[0_0_8px_rgba(226,114,41,0.5)]" 
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FindSolution() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [goalId, setGoalId] = useState("stress");
  const [durationId, setDurationId] = useState("20min");
  const [levelId, setLevelId] = useState("beginner");

  const [flowState, setFlowState] = useState("idle"); // 'idle', 'generating', 'generated'
  const [loadingMessages, setLoadingMessages] = useState([]);
  const [planData, setPlanData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Dynamic Backgrounds based on Goal - warm, soft brand tones
  const getBgColors = (goal) => {
    switch (goal) {
      case 'stress': return ['rgba(226,114,41,0.15)', 'rgba(43,59,46,0.1)']; 
      case 'sleep': return ['rgba(138,154,186,0.2)', 'rgba(43,59,46,0.15)']; 
      case 'focus': return ['rgba(226,114,41,0.2)', 'rgba(238,226,204,0.4)']; 
      case 'flexibility': return ['rgba(43,59,46,0.15)', 'rgba(238,226,204,0.4)']; 
      default: return ['rgba(238,226,204,0.3)', 'rgba(226,114,41,0.1)'];
    }
  };

  const [bg1, bg2] = getBgColors(goalId);

  const handleGenerate = async () => {
    setFlowState("generating");
    setLoadingMessages([]);

    // Stagger loading messages for visual appeal
    let msgIdx = 0;
    const interval = setInterval(() => {
      setLoadingMessages(prev => {
        if (!prev.includes(AI_MESSAGES[msgIdx])) {
          return [...prev, AI_MESSAGES[msgIdx]];
        }
        return prev;
      });
      msgIdx++;
      if (msgIdx >= AI_MESSAGES.length) {
        clearInterval(interval);
      }
    }, 800);

    try {
      const userPreferences = auth.user?.preferences || {};
      const aiResponse = await generatePlanApi(userPreferences, durationId, goalId);
      const category = wellnessCategories.find((c) => c.id === goalId) || wellnessCategories[0];

      setPlanData({
        ...aiResponse,
        title: aiResponse.title || `${category.label} Flow`,
        goal: goalId,
        duration: durationId,
        level: levelId,
        emotionalSummary: getEmotionalSummary(goalId),
        calmScore: Math.floor(Math.random() * (98 - 82 + 1)) + 82, // +82% to +98%
      });

      // Show result smoothly after messages finish
      setTimeout(() => {
        setFlowState("generated");
      }, 4500);

    } catch (error) {
      console.error("API error, using fallback UI", error);
      const category = wellnessCategories.find((c) => c.id === goalId) || wellnessCategories[0];
      
      // Resilient Fallback UI data
      setPlanData({
        title: `${category.label} Restoration`,
        goal: goalId,
        duration: durationId,
        level: levelId,
        emotionalSummary: getEmotionalSummary(goalId),
        calmScore: 88,
        schedule: [
          { sessions: [{ title: "Box Breathing", type: "Breathwork", durationMin: 5 }] },
          { sessions: [{ title: "Gentle Surya Flow", type: "Yoga", durationMin: parseInt(durationId) - 10 }] },
          { sessions: [{ title: "Body Scan Meditation", type: "Meditation", durationMin: 5 }] }
        ]
      });

      setTimeout(() => {
        setFlowState("generated");
      }, 4500);
    }
  };

  const handleStartSession = () => {
    if (!auth.isAuthenticated) {
      navigate("/login", { state: { returnTo: "/dashboard" } });
    } else {
      navigate("/dashboard");
    }
  };

  const handleSavePlan = async () => {
    if (!auth.isAuthenticated) {
      // Redirect to login but remember what they were doing
      navigate("/login", { 
        state: { 
          returnTo: "/", 
        } 
      });
      return;
    }
    
    setIsSaving(true);
    try {
      if (auth.user?.id && planData) {
        await saveGeneratedPlan(auth.user.id, planData);
        alert("Plan successfully saved to your Journey History!");
      }
    } catch (e) {
      alert("Failed to save plan.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRegenerate = () => {
    setFlowState("idle");
    setPlanData(null);
  };

  return (
    <section className="relative bg-[#F7F3EE] px-4 py-20 md:px-10 lg:py-24 min-h-[70vh] flex items-center justify-center overflow-hidden">
      
      {/* Ambient Lighting / Atmospheric Mesh Gradients */}
      <motion.div
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.05, 1], backgroundColor: bg1 }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", backgroundColor: { duration: 2 } }}
        className="pointer-events-none absolute left-[5%] top-[10%] h-[700px] w-[700px] rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1], backgroundColor: bg2 }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2, backgroundColor: { duration: 2 } }}
        className="pointer-events-none absolute right-[5%] bottom-[5%] h-[800px] w-[800px] rounded-full blur-[120px]"
      />

      <div className="relative z-10 w-full max-w-[1200px] text-center">
        <AnimatePresence mode="wait">
          
          {/* ========================================= */}
          {/* STATE 1: IDLE / SELECTION                 */}
          {/* ========================================= */}
          {flowState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <StaggerGroup staggerDelay={0.2}>
                <div className="mb-8 lg:mb-12 flex flex-col items-center justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#2E7D32]/20 bg-[#2E7D32]/10 px-[18px] py-[7px] text-[11px] font-bold uppercase tracking-[0.14em] text-[#2E7D32] mb-4 shadow-sm backdrop-blur-md">
                    <Sparkles size={12} className="text-[#E8651A]" />
                    AI WELLNESS ARCHITECT
                  </div>
                  <h2 className="font-heading text-[34px] sm:text-[46px] font-extrabold leading-[1.18] text-[#1A2E1A] mb-4 tracking-tight">
                    Generate <span className="text-[#E8651A]">Plans</span>
                  </h2>
                  <p className="font-body text-[16px] leading-[1.75] text-[#5c6861] max-w-[560px] mx-auto font-medium">
                    Tell us how you're feeling, and our AI will curate the perfect combination of breathing, movement, and meditation specifically for your needs today.
                  </p>
                </div>

                <div className="mx-auto flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-3 gap-y-4 sm:gap-y-6 text-center font-serif text-[26px] sm:text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight text-[#3a4a3d] leading-[1.4] lg:leading-[1.6]">
                  <span className="whitespace-nowrap px-2">I want to improve my</span>
                  <PremiumSelector options={wellnessCategories} selectedId={goalId} onChange={setGoalId} />
                  <span className="whitespace-nowrap px-2">for</span>
                  <PremiumSelector options={DURATIONS} selectedId={durationId} onChange={setDurationId} />
                  <span className="whitespace-nowrap px-2 mt-4 sm:mt-0">at a</span>
                  <PremiumSelector options={LEVELS} selectedId={levelId} onChange={setLevelId} />
                  <span className="whitespace-nowrap px-2">level.</span>
                </div>

                <div className="mt-16 lg:mt-24 flex justify-center">
                  <PremiumButton onClick={handleGenerate} icon={Sparkles} className="w-full sm:w-auto px-10 sm:px-16 py-5 shadow-xl">
                    Generate My Wellness Plan
                  </PremiumButton>
                </div>
              </StaggerGroup>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* STATE 2: GENERATING (LOADING)             */}
          {/* ========================================= */}
          {flowState === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center min-h-[50vh]"
            >
              <div className="relative mb-12 flex items-center justify-center">
                {/* Breathing Orb */}
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute h-24 w-24 rounded-full bg-gradient-to-tr from-[#E8651A] to-[#2E7D32] blur-[30px]"
                />
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-2xl p-3"
                >
                  <img src={fotlogo} alt="YogaWoman Logo" className="w-full h-full object-contain brightness-0 opacity-80" />
                </motion.div>
              </div>

              <div className="space-y-4 max-w-md mx-auto text-left w-full pl-4 sm:pl-10">
                <AnimatePresence>
                  {loadingMessages.map((msg, idx) => (
                    <motion.div
                      key={msg}
                      initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="flex items-center gap-4 text-[#3a4a3d]"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2E7D32]/10 text-[#2E7D32]"
                      >
                        <CheckCircle2 size={14} />
                      </motion.div>
                      <span className="font-body text-base font-semibold">{msg}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* STATE 3: GENERATED (RESULT CARD)          */}
          {/* ========================================= */}
          {flowState === "generated" && planData && (
            <motion.div
              key="generated"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-4xl w-full"
            >
              {/* Premium Glassmorphic Card */}
              <div className="rounded-[2.5rem] border border-white/60 bg-white/55 p-6 sm:p-12 shadow-[0_20px_80px_rgba(46,125,50,0.08)] backdrop-blur-2xl text-left relative overflow-hidden">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Sparkles size={120} className="text-[#E8651A]" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#E8651A]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8651A]">
                    <Activity size={12} />
                    Plan Ready
                  </div>
                  <span className="text-xs font-bold text-[#5c6861] uppercase tracking-widest">{planData.duration} • {planData.level}</span>
                </div>

                <h3 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#1A2E1A] mb-4">
                  {planData.title}
                </h3>
                
                <p className="font-serif text-xl sm:text-2xl text-[#3a4a3d] italic leading-relaxed mb-10 max-w-2xl">
                  "{planData.emotionalSummary}"
                </p>

                {/* Exercises Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {planData.schedule?.map((phase, idx) => (
                    phase.sessions?.map((session, sIdx) => (
                      <div key={`${idx}-${sIdx}`} className="group rounded-2xl border border-white/40 bg-white/60 p-5 shadow-sm transition hover:bg-white hover:shadow-md">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2E7D32]">
                            {session.type || "Practice"}
                          </span>
                          <span className="text-[11px] font-bold text-[#E8651A]">{session.durationMin} mins</span>
                        </div>
                        <h4 className="font-heading text-lg font-bold text-[#1A2E1A]">{session.title}</h4>
                      </div>
                    ))
                  ))}
                  
                  {/* Ambient Music Card */}
                  <div className="rounded-2xl border border-[#E8651A]/10 bg-[#E8651A]/5 p-5 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#E8651A]/20 flex items-center justify-center text-[#E8651A]">
                      <Music size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8651A]">Audio</span>
                      <h4 className="font-heading text-base font-bold text-[#1A2E1A]">Ambient Healing Soundscapes</h4>
                    </div>
                  </div>
                </div>

                <div className="mb-10 flex items-center justify-between border-y border-white/40 py-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#5c6861]">Estimated Impact</span>
                    <span className="font-heading text-2xl font-bold text-[#2E7D32]">Calm Score: +{planData.calmScore}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#5c6861]">Total Time</span>
                    <span className="font-heading text-2xl font-bold text-[#1A2E1A]">{planData.duration}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button 
                    onClick={handleStartSession}
                    className="group flex w-full sm:w-auto flex-1 items-center justify-center gap-3 rounded-full bg-[#1A2E1A] px-8 py-5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#2B3B2E] hover:shadow-lg"
                  >
                    <PlayCircle size={18} className="transition-transform group-hover:scale-110" />
                    Start Session Now
                  </button>
                  
                  <div className="flex w-full sm:w-auto gap-4">
                    <button 
                      onClick={handleSavePlan}
                      disabled={isSaving}
                      className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full border border-white/60 bg-white/50 px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-[#1A2E1A] transition hover:bg-white disabled:opacity-50"
                    >
                      <Bookmark size={16} />
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button 
                      onClick={handleRegenerate}
                      className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full border border-white/60 bg-white/50 px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-[#1A2E1A] transition hover:bg-white"
                    >
                      <RefreshCw size={16} className="transition-transform hover:rotate-180" />
                      Redo
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}