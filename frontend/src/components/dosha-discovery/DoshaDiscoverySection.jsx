import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Sparkles, CheckCircle2, Lock } from "lucide-react";
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
// PREMIUM SELECTOR (Styled like FindSolution)
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
        className="group relative flex w-full items-center justify-between gap-2 sm:gap-5 rounded-[2rem] border border-[#E27229]/30 bg-white px-4 py-2 sm:px-6 sm:py-3.5 font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#11281d] shadow-[0_20px_40px_rgba(226,114,41,0.06)] backdrop-blur-xl transition-all duration-500 -translate-y-1"
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
  const [viewState, setViewState] = useState("quiz"); // start directly in quiz for interactivity

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

  const liveScores = getLiveScores();

  return (
    <section className="relative bg-[#F7F3EE] px-4 py-20 md:px-10 lg:py-24 min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Ambient Lighting / Atmospheric Mesh Gradients */}
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

      <div className="relative z-10 w-full max-w-[1400px] flex flex-col xl:flex-row items-center xl:items-start gap-12 xl:gap-20">
        
        {/* Left Side: Conversational UI */}
        <div className="flex-1 w-full text-center xl:text-left">
          <div className="mb-8 lg:mb-12 flex flex-col items-center xl:items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2E7D32]/20 bg-[#2E7D32]/10 px-[18px] py-[7px] text-[11px] font-bold uppercase tracking-[0.14em] text-[#2E7D32] mb-4">
              ✨ AI DOSHA ANALYZER
            </div>
            <h2 className="font-['Poppins',sans-serif] text-[30px] sm:text-[42px] font-extrabold leading-[1.18] text-[#1A2E1A] mb-4">
              Discover Your <span className="text-[#E8651A]">Dosha</span>
            </h2>
            <p className="font-['Poppins',sans-serif] text-[16px] leading-[1.75] text-[#777777] max-w-[520px] mx-auto xl:mx-0">
              Answer a few mindful questions and our AI wellness system will reveal your dominant dosha energy.
            </p>
          </div>

          {viewState === "quiz" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col flex-wrap items-center xl:items-start gap-y-4 sm:gap-y-6 text-center xl:text-left font-serif text-[26px] sm:text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight text-[#3a4a3d] leading-[1.4] lg:leading-[1.6]"
            >
              <div className="inline-block">
                <span className="whitespace-nowrap px-2">My energy feels</span>
                <PremiumSelector options={quizOptions.energy} selectedId={answers.energy} onChange={(v) => setAnswers({...answers, energy: v})} placeholder="energy" />
              </div>

              <div className="inline-block mt-4">
                <span className="whitespace-nowrap px-2">and my digestion is</span>
                <PremiumSelector options={quizOptions.digestion} selectedId={answers.digestion} onChange={(v) => setAnswers({...answers, digestion: v})} placeholder="digestion" />
                <span className="whitespace-nowrap px-2">.</span>
              </div>

              <div className="inline-block mt-4">
                <span className="whitespace-nowrap px-2">My sleep feels</span>
                <PremiumSelector options={quizOptions.sleep} selectedId={answers.sleep} onChange={(v) => setAnswers({...answers, sleep: v})} placeholder="sleep" />
              </div>

              <div className="inline-block mt-4">
                <span className="whitespace-nowrap px-2">and under stress I become</span>
                <PremiumSelector options={quizOptions.stress} selectedId={answers.stress} onChange={(v) => setAnswers({...answers, stress: v})} placeholder="reaction" />
                <span className="whitespace-nowrap px-2">.</span>
              </div>
              
              <div className="mt-16 w-full flex justify-center xl:justify-start">
                <PremiumButton onClick={() => setViewState("result")} icon={Sparkles} className="w-full sm:w-auto px-10 sm:px-16">
                  Reveal My Dosha Blueprint
                </PremiumButton>
              </div>
            </motion.div>
          )}

          {viewState === "result" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center xl:text-left"
            >
              <h3 className="text-4xl sm:text-5xl font-['Poppins',sans-serif] font-extrabold text-[#1A2E1A] mb-6">
                You are primarily <span style={{ color: getFinalResult().primary.color }}>{getFinalResult().primary.name}</span>
              </h3>
              <p className="text-xl text-[#777777] mb-12 font-serif">
                With secondary <span className="font-bold">{getFinalResult().secondary.name}</span> influence.
              </p>

              {/* Locked Premium Insights */}
              <div className="relative rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#EFE7DC] overflow-hidden p-8 sm:p-12 max-w-3xl">
                <div className="filter blur-[8px] opacity-40 pointer-events-none select-none">
                  <h3 className="text-2xl font-serif text-[#1A2E1A] mb-8">Your Ayurvedic Blueprint</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="h-6 bg-[#EFE7DC] rounded w-3/4"></div>
                      <div className="h-4 bg-[#f4eadf] rounded w-full"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[4px] p-6 text-center">
                  <div className="mb-6 rounded-full bg-[#E27229]/10 p-4 text-[#E27229]">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-3xl font-['Poppins',sans-serif] font-extrabold text-[#1A2E1A] mb-8">
                    Unlock your full blueprint
                  </h3>
                  <PremiumButton onClick={() => navigate("/login")} className="px-10">
                    LOGIN TO UNLOCK
                  </PremiumButton>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side: Live AI Preview (Desktop Only) */}
        <div className="hidden xl:block w-[450px] sticky top-32">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2.5rem] bg-white/80 backdrop-blur-xl p-10 shadow-[0_30px_60px_rgba(17,40,29,0.08)] border border-[#EFE7DC] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#f4eadf]/50 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <h4 className="text-xs font-bold text-[#2E7D32] tracking-[0.2em] uppercase">Live Calculation</h4>
                <div className="h-2.5 w-2.5 rounded-full bg-[#E27229] shadow-[0_0_10px_rgba(226,114,41,0.6)] animate-pulse" />
              </div>

              <div className="space-y-8">
                {/* VATA */}
                <div>
                  <div className="flex justify-between text-base mb-3 font-['Poppins',sans-serif] font-bold">
                    <span className="text-[#1A2E1A]">VATA</span>
                    <span className="text-[#7DB4C4]">{liveScores.vata}%</span>
                  </div>
                  <div className="h-3 w-full bg-[#EFE7DC] rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${liveScores.vata}%` }} transition={{ duration: 0.6, ease: "easeOut" }} className="h-full bg-[#7DB4C4] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
                  </div>
                </div>

                {/* PITTA */}
                <div>
                  <div className="flex justify-between text-base mb-3 font-['Poppins',sans-serif] font-bold">
                    <span className="text-[#1A2E1A]">PITTA</span>
                    <span className="text-[#E59849]">{liveScores.pitta}%</span>
                  </div>
                  <div className="h-3 w-full bg-[#EFE7DC] rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${liveScores.pitta}%` }} transition={{ duration: 0.6, ease: "easeOut" }} className="h-full bg-[#E59849] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
                  </div>
                </div>

                {/* KAPHA */}
                <div>
                  <div className="flex justify-between text-base mb-3 font-['Poppins',sans-serif] font-bold">
                    <span className="text-[#1A2E1A]">KAPHA</span>
                    <span className="text-[#6EA885]">{liveScores.kapha}%</span>
                  </div>
                  <div className="h-3 w-full bg-[#EFE7DC] rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${liveScores.kapha}%` }} transition={{ duration: 0.6, ease: "easeOut" }} className="h-full bg-[#6EA885] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[#EFE7DC]/60 text-center">
                <p className="text-sm font-['Poppins',sans-serif] text-[#777777]">
                  AI is analyzing your mind-body pattern in real-time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
