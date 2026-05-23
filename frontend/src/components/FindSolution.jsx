import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { wellnessCategories } from "../data/wellnessRecommendationData";

// Ultra-premium Glassmorphic Selector
function PremiumSelector({ options, selectedId, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.id === selectedId);

  // Click outside to close
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
        className="group relative flex w-full items-center justify-between gap-3 sm:gap-5 rounded-[2rem] border border-[#EFE7DC]/80 bg-white/60 px-5 py-2.5 font-serif text-3xl font-medium tracking-tight text-[#11281d] shadow-[0_8px_30px_rgba(0,0,0,0.02)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#E27229]/30 hover:bg-white hover:shadow-[0_20px_40px_rgba(226,114,41,0.06)] sm:px-6 sm:py-3.5 sm:text-5xl lg:text-[56px]"
      >
        <span className="whitespace-nowrap">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#f4eadf] text-[#2B3B2E] transition-colors duration-300 group-hover:bg-[#E27229] group-hover:text-white sm:h-12 sm:w-12"
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute left-1/2 top-[calc(100%+16px)] z-50 max-h-[320px] w-max min-w-[280px] -translate-x-1/2 overflow-y-auto rounded-[2rem] border border-[#EFE7DC] bg-white/90 p-3 shadow-[0_40px_80px_-20px_rgba(17,40,29,0.15)] backdrop-blur-3xl custom-scrollbar"
          >
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
                  selectedId === option.id
                    ? "bg-[#f4eadf] text-[#11281d]"
                    : "text-[#3a4a3d] hover:bg-white/60 hover:text-[#11281d]"
                }`}
              >
                {option.icon && (
                  <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${selectedId === option.id ? 'bg-white shadow-md' : 'bg-[#f4eadf]'}`}>
                    {option.icon}
                  </span>
                )}
                <span className={`text-lg tracking-wide ${selectedId === option.id ? 'font-bold' : 'font-medium'}`}>
                  {option.label}
                </span>
                
                {selectedId === option.id && (
                  <motion.div layoutId="activeIndicator" className="ml-auto h-2 w-2 rounded-full bg-[#E27229]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

function FindSolution() {
  const [goalId, setGoalId] = useState("stress");
  const [durationId, setDurationId] = useState("20min");
  const [levelId, setLevelId] = useState("beginner");
  
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate("/generated-plan", { state: { goalId, durationId, levelId } });
  };

  // Dynamic Backgrounds based on Goal - using warm, soft brand tones
  const getBgColors = (goal) => {
    switch(goal) {
      case 'stress': return ['rgba(226,114,41,0.15)', 'rgba(43,59,46,0.1)']; // Subtle Orange/Green
      case 'sleep': return ['rgba(138,154,186,0.2)', 'rgba(43,59,46,0.15)']; // Night Blue / Green
      case 'focus': return ['rgba(226,114,41,0.2)', 'rgba(238,226,204,0.4)']; // Energizing Orange
      case 'flexibility': return ['rgba(43,59,46,0.15)', 'rgba(238,226,204,0.4)']; // Soft Teal/Green
      default: return ['rgba(238,226,204,0.3)', 'rgba(226,114,41,0.1)'];
    }
  };

  const [bg1, bg2] = getBgColors(goalId);

  return (
    <section className="relative overflow-hidden bg-[#F7F3EE] px-4 py-20 md:px-10 lg:py-24 min-h-[70vh] flex items-center justify-center">
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
        {/* Header matching Instructors style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 lg:mb-12 flex flex-col items-center justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2E7D32]/20 bg-[#2E7D32]/10 px-[18px] py-[7px] text-[11px] font-bold uppercase tracking-[0.14em] text-[#2E7D32] mb-4">
            ✨ AI WELLNESS ARCHITECT
          </div>
          
          <h2 className="font-['Poppins',sans-serif] text-[30px] sm:text-[42px] font-extrabold leading-[1.18] text-[#1A2E1A] mb-4">
            Generate <span className="text-[#E8651A]">Plans</span>
          </h2>
          
          <p className="font-['Poppins',sans-serif] text-[16px] leading-[1.75] text-[#777777] max-w-[520px] mx-auto">
            Tell us how you're feeling, and our AI will curate the perfect combination of breathing, movement, and meditation specifically for your needs today.
          </p>
        </motion.div>

        {/* Conversational Sentence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-6 text-center font-serif text-3xl font-medium tracking-tight text-[#3a4a3d] sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.6]"
        >
          <span className="whitespace-nowrap px-2">I want to improve my</span>
          
          <PremiumSelector
            options={wellnessCategories}
            selectedId={goalId}
            onChange={setGoalId}
            placeholder="wellness"
          />
          
          <span className="whitespace-nowrap px-2">for</span>
          
          <PremiumSelector
            options={DURATIONS}
            selectedId={durationId}
            onChange={setDurationId}
            placeholder="duration"
          />
          
          <span className="whitespace-nowrap px-2 mt-4 sm:mt-0">at a</span>
          
          <PremiumSelector
            options={LEVELS}
            selectedId={levelId}
            onChange={setLevelId}
            placeholder="level"
          />
          
          <span className="whitespace-nowrap px-2">level.</span>
        </motion.div>

        {/* Cinematic CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-16 lg:mt-20 flex justify-center"
        >
          <button
            onClick={handleGenerate}
            className="group relative flex h-20 items-center justify-center gap-4 overflow-hidden rounded-full bg-gradient-to-r from-[#E27229] to-[#d5631c] px-16 text-[12px] font-bold tracking-[0.25em] text-white shadow-[0_20px_40px_rgba(226,114,41,0.22)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(226,114,41,0.35)] uppercase"
          >
            {/* Breathing Glow Inside Button */}
            <motion.div 
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_60%)]"
            />
            
            <Sparkles size={16} className="relative z-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" />
            <span className="relative z-10">Generate My Wellness Plan</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default FindSolution;