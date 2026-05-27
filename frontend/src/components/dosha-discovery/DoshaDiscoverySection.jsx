import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Sparkles, CheckCircle2, Lock, Wind, Flame, Mountain } from "lucide-react";
import PremiumButton from "../ui/PremiumButton";

// ----------------------------------------------------
// QUIZ DATA
// ----------------------------------------------------
const quizOptions = {
  energy: [
    { id: "vata", label: "Fast & Creative", icon: "✨" },
    { id: "pitta", label: "Intense & Focused", icon: "🔥" },
    { id: "kapha", label: "Calm & Steady", icon: "🌿" }
  ],
  digestion: [
    { id: "vata", label: "Irregular", icon: "⚖️" },
    { id: "pitta", label: "Strong", icon: "🍽️" },
    { id: "kapha", label: "Slow", icon: "🐌" }
  ],
  sleep: [
    { id: "vata", label: "Light", icon: "👀" },
    { id: "pitta", label: "Moderate", icon: "🌡️" },
    { id: "kapha", label: "Deep", icon: "🛌" }
  ],
  stress: [
    { id: "vata", label: "Restless", icon: "💭" },
    { id: "pitta", label: "Irritated", icon: "😤" },
    { id: "kapha", label: "Withdrawn", icon: "🐢" }
  ]
};

// ----------------------------------------------------
// PREMIUM SELECTOR
// ----------------------------------------------------
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
    <div className="relative inline-block mx-2 sm:mx-3 align-middle" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex w-full items-center justify-between gap-2 sm:gap-4 rounded-[2rem] border border-[#E27229]/30 bg-white px-4 py-2 sm:px-6 sm:py-3 font-serif text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#11281d] shadow-[0_20px_40px_rgba(226,114,41,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1"
      >
        <span className="whitespace-nowrap">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#f4eadf] text-[#2B3B2E] transition-colors duration-300 group-hover:bg-[#E27229] group-hover:text-white"
        >
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
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
                className={`group flex w-full items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-left transition-all duration-300 ${selectedId === option.id
                    ? "bg-[#f4eadf] text-[#11281d] shadow-[inset_0_2px_10px_rgba(226,114,41,0.05)]"
                    : "text-[#3a4a3d] hover:bg-[#EFE7DC]/50 hover:text-[#11281d] hover:translate-x-1"
                  }`}
              >
                {option.icon && (
                  <span className={`flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full text-lg sm:text-xl shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${selectedId === option.id ? 'bg-white shadow-md' : 'bg-[#f4eadf]'}`}>
                    {option.icon}
                  </span>
                )}
                <span className={`text-lg tracking-wide ${selectedId === option.id ? 'font-bold' : 'font-medium'}`}>
                  {option.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default function DoshaDiscoverySection() {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState("quiz");

  const [answers, setAnswers] = useState({
    energy: "vata",
    digestion: "pitta",
    sleep: "kapha",
    stress: "vata"
  });

  const getLiveScores = () => {
    let vata = 0, pitta = 0, kapha = 0;
    let answered = 0;

    Object.values(answers).forEach((val) => {
      if (val === "vata") { vata++; answered++; }
      if (val === "pitta") { pitta++; answered++; }
      if (val === "kapha") { kapha++; answered++; }
    });

    if (answered === 0) return { vata: 33, pitta: 33, kapha: 34 };

    return {
      vata: Math.round((vata / answered) * 100),
      pitta: Math.round((pitta / answered) * 100),
      kapha: Math.round((kapha / answered) * 100)
    };
  };

  const getFinalResult = () => {
    const scores = getLiveScores();
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    const details = {
      vata: { name: "Vata", color: "#7DB4C4", desc: "Creative, visionary, and constantly in motion." },
      pitta: { name: "Pitta", color: "#E59849", desc: "Intelligent, focused, and ambitious." },
      kapha: { name: "Kapha", color: "#6EA885", desc: "Calm, deeply grounded, and fiercely loyal." }
    };

    return {
      primary: details[sorted[0][0]],
      secondary: details[sorted[1][0]]
    };
  };

  return (
    <section className="relative bg-[#F7F3EE] px-4 py-12 lg:py-0 h-screen max-h-[850px] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Ambient Lighting */}
      <motion.div
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.05, 1], backgroundColor: 'rgba(226,114,41,0.15)' }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[5%] top-[10%] h-[700px] w-[700px] rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1], backgroundColor: 'rgba(43,59,46,0.1)' }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute right-[5%] bottom-[5%] h-[800px] w-[800px] rounded-full blur-[120px]"
      />

      <div className="relative z-10 w-full max-w-[900px] flex flex-col items-center text-center">
        
        {/* Header Block */}
        <div className="mb-6 lg:mb-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2E7D32]/20 bg-[#2E7D32]/10 px-[16px] py-[6px] text-[10px] font-bold uppercase tracking-[0.15em] text-[#2E7D32] mb-3">
            ✨ AI DOSHA ANALYZER
          </div>
          <h2 className="font-heading text-[32px] sm:text-[42px] font-extrabold leading-[1.1] text-[#1A2E1A] mb-3">
            Discover Your <span className="text-[#E8651A]">Dosha</span>
          </h2>
          <p className="text-[15px] text-[#777777] max-w-[450px]">
            Answer a few mindful questions and our AI wellness system will reveal your dominant dosha energy.
          </p>
        </div>

        {/* Quiz Flow */}
        {viewState === "quiz" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col flex-wrap items-center justify-center gap-y-4 sm:gap-y-5 text-center font-serif text-[24px] sm:text-3xl md:text-4xl lg:text-[50px] font-medium tracking-tight text-[#3a4a3d] leading-[1.3] lg:leading-[1.5]"
          >
            <div className="inline-block">
              <span className="whitespace-nowrap px-2">My energy feels</span>
              <PremiumSelector options={quizOptions.energy} selectedId={answers.energy} onChange={(v) => setAnswers({...answers, energy: v})} placeholder="energy" />
            </div>

            <div className="inline-block">
              <span className="whitespace-nowrap px-2">and my digestion is</span>
              <PremiumSelector options={quizOptions.digestion} selectedId={answers.digestion} onChange={(v) => setAnswers({...answers, digestion: v})} placeholder="digestion" />
              <span className="whitespace-nowrap px-2">.</span>
            </div>

            <div className="inline-block">
              <span className="whitespace-nowrap px-2">My sleep feels</span>
              <PremiumSelector options={quizOptions.sleep} selectedId={answers.sleep} onChange={(v) => setAnswers({...answers, sleep: v})} placeholder="sleep" />
            </div>

            <div className="inline-block">
              <span className="whitespace-nowrap px-2">and under stress I become</span>
              <PremiumSelector options={quizOptions.stress} selectedId={answers.stress} onChange={(v) => setAnswers({...answers, stress: v})} placeholder="reaction" />
              <span className="whitespace-nowrap px-2">.</span>
            </div>
            
            <div className="mt-10 w-full flex justify-center">
              <PremiumButton onClick={() => setViewState("result")} icon={Sparkles} className="px-10 sm:px-14 py-3 sm:py-4">
                Reveal My Dosha Blueprint
              </PremiumButton>
            </div>
          </motion.div>
        )}

        {/* Results Flow */}
        {viewState === "result" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 w-full flex flex-col items-center"
          >
            {/* Primary Result Spotlight */}
            <div className="mb-6 w-full max-w-2xl p-6 sm:p-8 rounded-[2rem] border border-[#EFE7DC] bg-white/70 shadow-[0_15px_40px_rgba(17,40,29,0.04)] backdrop-blur-md transition-all">
              <div className="flex flex-col items-center text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5c6861] mb-2">Your Primary Energy</span>
                <h3 className="text-4xl sm:text-[50px] font-heading font-extrabold text-[#1A2E1A] mb-3 leading-none">
                  <span style={{ color: getFinalResult().primary.color }}>{getFinalResult().primary.name}</span>
                </h3>
                <p className="text-sm sm:text-base text-[#3a4a3d] font-medium max-w-[400px]">
                  {getFinalResult().primary.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-[#EFE7DC]/60 w-full flex justify-center">
                  <p className="text-[11px] sm:text-xs text-[#777777] italic tracking-wide">
                    With secondary <span className="font-bold not-italic">{getFinalResult().secondary.name}</span> influence.
                  </p>
                </div>
              </div>
            </div>

            {/* The 3 Body Types Summary */}
            <div className="w-full max-w-2xl mb-8">
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2E7D32] mb-3 text-center">
                The 3 Ayurvedic Body Types
              </h4>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="group flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-[1.5rem] border border-[#7DB4C4]/20 bg-[#7DB4C4]/5 hover:bg-[#7DB4C4]/10 transition-colors">
                  <Wind size={18} className="text-[#7DB4C4] mb-1.5 transition-transform group-hover:scale-110" />
                  <span className="text-xs sm:text-sm font-bold text-[#1A2E1A]">VATA</span>
                  <span className="text-[9px] sm:text-[10px] text-[#777777] uppercase tracking-wider">The Creator</span>
                </div>
                <div className="group flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-[1.5rem] border border-[#E59849]/20 bg-[#E59849]/5 hover:bg-[#E59849]/10 transition-colors">
                  <Flame size={18} className="text-[#E59849] mb-1.5 transition-transform group-hover:scale-110" />
                  <span className="text-xs sm:text-sm font-bold text-[#1A2E1A]">PITTA</span>
                  <span className="text-[9px] sm:text-[10px] text-[#777777] uppercase tracking-wider">The Achiever</span>
                </div>
                <div className="group flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-[1.5rem] border border-[#6EA885]/20 bg-[#6EA885]/5 hover:bg-[#6EA885]/10 transition-colors">
                  <Mountain size={18} className="text-[#6EA885] mb-1.5 transition-transform group-hover:scale-110" />
                  <span className="text-xs sm:text-sm font-bold text-[#1A2E1A]">KAPHA</span>
                  <span className="text-[9px] sm:text-[10px] text-[#777777] uppercase tracking-wider">The Peacemaker</span>
                </div>
              </div>
            </div>

            {/* Locked Premium Insights (Curiosity Cliff) */}
            <div className="relative rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#EFE7DC] overflow-hidden p-8 sm:p-10 w-full max-w-2xl mx-auto group">
              <div className="filter blur-[8px] opacity-30 pointer-events-none select-none transition-opacity duration-500 group-hover:opacity-10">
                <h3 className="text-2xl font-serif text-[#1A2E1A] mb-8">Your Ayurvedic Blueprint</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="h-6 bg-[#EFE7DC] rounded w-3/4"></div>
                    <div className="h-4 bg-[#f4eadf] rounded w-full"></div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[6px] p-6 text-center">
                <div className="mb-3 rounded-full bg-[#E27229]/10 p-3 text-[#E27229]">
                  <Lock size={24} />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#E27229] mb-2">Deep Analysis Ready</p>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1A2E1A] mb-3">
                  Unlock your full blueprint
                </h3>
                <p className="text-[13px] text-[#777777] mb-6 max-w-[320px]">
                  Discover how your Dosha affects your sleep architecture, digestive fire, and daily energy.
                </p>
                <PremiumButton onClick={() => navigate("/login")} className="px-10 py-3 text-sm">
                  LOGIN TO UNLOCK
                </PremiumButton>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
