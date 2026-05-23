import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, X, CheckCircle2 } from "lucide-react";
import { updatePlanProgress } from "../services/planService";
import { useAuth } from "../context/AuthContext";
import { useMedia } from "../context/MediaContext";
import PremiumButton from "../components/ui/PremiumButton";
import AmbientSoundControls from "../components/ui/player/AmbientSoundControls";
import { easings } from "../utils/animations";

export default function SessionPlayer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { planId } = useParams();
  const { user } = useAuth();
  
  const planData = location.state?.planData;
  const timeline = planData?.timeline || [];

  // If directly accessed without state, send back
  useEffect(() => {
    if (!planData || timeline.length === 0) {
      navigate("/");
    }
  }, [planData, timeline, navigate]);

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showAmbient, setShowAmbient] = useState(false);
  
  const { playAmbient, stopAmbient } = useMedia();
  
  // Extract duration from strings like "4 mins" or "10 mins"
  const parseDurationSeconds = (durationString) => {
    const match = durationString.match(/(\d+)/);
    const minutes = match ? parseInt(match[0], 10) : 5;
    return minutes * 60;
  };

  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeForPhase, setTotalTimeForPhase] = useState(0);

  // Initialize phase
  useEffect(() => {
    if (timeline[currentPhaseIndex] && !showIntro) {
      const seconds = parseDurationSeconds(timeline[currentPhaseIndex].duration);
      setTimeLeft(seconds);
      setTotalTimeForPhase(seconds);
      setIsPlaying(true); // Auto-play when entering a phase
    }
  }, [currentPhaseIndex, timeline, showIntro]);

  // Intro Sequence Timer
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  // Timer countdown logic
  useEffect(() => {
    let interval = null;
    if (isPlaying && timeLeft > 0 && !sessionCompleted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying && !sessionCompleted) {
      handleNextPhase();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, sessionCompleted]);

  const handleNextPhase = async () => {
    if (currentPhaseIndex < timeline.length - 1) {
      setCurrentPhaseIndex(prev => prev + 1);
    } else {
      // Session Complete
      setIsPlaying(false);
      setSessionCompleted(true);
      stopAmbient();
      if (user?.id && planId && planId !== "current") {
        await updatePlanProgress(user.id, planId, 100);
      }
    }
  };

  const handlePrevPhase = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(prev => prev - 1);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentPhase = timeline[currentPhaseIndex];
  
  // Calculate progress circle stroke
  const progressPercentage = totalTimeForPhase > 0 ? ((totalTimeForPhase - timeLeft) / totalTimeForPhase) * 100 : 0;
  const strokeDasharray = 2 * Math.PI * 120; // r=120
  const strokeDashoffset = strokeDasharray * (1 - progressPercentage / 100);

  if (!planData) return null;

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center bg-[#F7F3EE] font-sans selection:bg-[#EFE7DC] selection:text-[#2F6B3B] overflow-hidden">
      
      {/* Cinematic Breathing Background */}
      <AnimatePresence>
        {!sessionCompleted && (
          <motion.div
            key="background"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isPlaying ? [0.2, 0.6, 0.2] : 0.3,
              scale: isPlaying ? [0.95, 1.05, 0.95] : 1
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,114,41,0.15)_0%,transparent_70%)] blur-[120px]"
          />
        )}
      </AnimatePresence>

      {/* Top Header / Exit */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easings.cinematic }}
            className="absolute top-0 flex w-full items-center justify-between px-8 py-8 z-50"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E27229]">
                {planData.goalId} Journey
              </span>
              <span className="text-sm font-semibold text-[#3a4a3d]">
                Phase {currentPhaseIndex + 1} of {timeline.length}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowAmbient(!showAmbient)}
                className="group flex h-12 px-6 items-center justify-center gap-2 rounded-full bg-white/40 text-[#11281d] font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all hover:bg-white hover:scale-105"
              >
                + Ambient Layer
              </button>
              <button 
                onClick={() => {
                  stopAmbient();
                  navigate(-1);
                }}
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/40 text-[#3a4a3d] backdrop-blur-md transition-all hover:bg-white hover:text-[#11281d] hover:scale-105"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            
            <AnimatePresence>
              {showAmbient && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-8 top-24 z-[60]"
                >
                  <AmbientSoundControls onClose={() => setShowAmbient(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {sessionCompleted ? (
          <motion.div 
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 flex flex-col items-center text-center px-6"
          >
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-[#E27229]/10 text-[#E27229]">
              <CheckCircle2 size={64} strokeWidth={1} />
            </div>
            <h1 className="font-serif text-5xl font-light text-[#11281d] mb-4">Journey Complete</h1>
            <p className="text-xl text-[#3a4a3d] font-light max-w-md mb-12">
              Your consistency is building emotional resilience. Take this sense of calm with you into the rest of your day.
            </p>
            <PremiumButton onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </PremiumButton>
          </motion.div>
        ) : showIntro ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: easings.luxurious }}
            className="z-10 flex flex-col items-center text-center px-6"
          >
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#11281d] tracking-wide mb-6">
              Take a deep breath.
            </h2>
            <p className="text-[#E27229] uppercase tracking-[0.3em] text-xs font-bold">
              Preparing your space...
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key={currentPhase?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="z-10 flex w-full max-w-3xl flex-col items-center text-center px-6"
          >
            {/* Phase Title */}
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C89B63] mb-4">
              {currentPhase?.type}
            </h2>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#11281d] mb-6">
              {currentPhase?.name || currentPhase?.title}
            </h1>
            <p className="text-lg font-light text-[#3a4a3d] max-w-xl mb-16">
              {currentPhase?.description}
            </p>

            {/* Circular Timer */}
            <div className="relative mb-16 flex items-center justify-center">
              <svg viewBox="0 0 260 260" className="-rotate-90 w-52 h-52 sm:w-[260px] sm:h-[260px]">
                {/* Background Ring */}
                <circle 
                  cx="130" cy="130" r="120" 
                  stroke="#EFE7DC" 
                  strokeWidth="4" 
                  fill="none" 
                />
                {/* Progress Ring */}
                <motion.circle 
                  cx="130" cy="130" r="120" 
                  stroke="#E27229" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeLinecap="round"
                  animate={{ strokeDashoffset }}
                  style={{ strokeDasharray }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </svg>
              
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-serif text-5xl font-light text-[#11281d] tracking-tight">
                  {formatTime(timeLeft)}
                </span>
                {isPlaying && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full bg-[#E27229]/5 blur-xl -z-10"
                  />
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8">
              <button 
                onClick={handlePrevPhase}
                disabled={currentPhaseIndex === 0}
                className="flex h-12 w-12 items-center justify-center rounded-full text-[#E27229]/60 transition hover:bg-[#EFE7DC]/50 hover:text-[#E27229] disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <SkipBack size={24} strokeWidth={1.5} fill={currentPhaseIndex > 0 ? "currentColor" : "none"} />
              </button>
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#E27229] to-[#d5631c] text-white shadow-[0_10px_30px_rgba(226,114,41,0.3)] transition-transform hover:scale-105 active:scale-95"
              >
                {isPlaying ? <Pause size={32} strokeWidth={1.5} fill="currentColor" /> : <Play size={32} strokeWidth={1.5} fill="currentColor" className="ml-2" />}
              </button>

              <button 
                onClick={handleNextPhase}
                className="flex h-12 w-12 items-center justify-center rounded-full text-[#E27229]/60 transition hover:bg-[#EFE7DC]/50 hover:text-[#E27229]"
              >
                <SkipForward size={24} strokeWidth={1.5} fill="currentColor" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
