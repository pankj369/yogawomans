import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Wind, Flame, Leaf, Lock, Sparkles, ArrowRight, Brain, Zap, HeartPulse, Compass } from "lucide-react";
import DoshaBodyVisualization from "./DoshaBodyVisualization";
import DoshaAnalysisPreview from "./DoshaAnalysisPreview";

// Expanded 10-Question Engine (Categorized)
const questions = [
  // CATEGORY 1: PHYSICAL BODY
  {
    category: "Physical Body",
    icon: HeartPulse,
    text: "How would you describe your natural body structure?",
    options: [
      { text: "Lean, thin, hard to gain weight.", emoji: "🌬️", dosha: "vata", hoverClass: "hover:border-[#64C8FF]/50 hover:shadow-[0_0_15px_rgba(100,200,255,0.2)]" },
      { text: "Athletic, medium build, easy to build muscle.", emoji: "🔥", dosha: "pitta", hoverClass: "hover:border-[#FF7832]/50 hover:shadow-[0_0_15px_rgba(255,120,50,0.2)]" },
      { text: "Solid, heavy, easy to gain weight.", emoji: "🌿", dosha: "kapha", hoverClass: "hover:border-[#64DC96]/50 hover:shadow-[0_0_15px_rgba(100,220,150,0.2)]" },
    ]
  },
  {
    category: "Physical Body",
    icon: HeartPulse,
    text: "How does your skin usually feel?",
    options: [
      { text: "Dry, rough, prone to flaking.", emoji: "🍂", dosha: "vata", hoverClass: "hover:border-[#64C8FF]/50 hover:shadow-[0_0_15px_rgba(100,200,255,0.2)]" },
      { text: "Warm, oily, sensitive, prone to redness.", emoji: "☀️", dosha: "pitta", hoverClass: "hover:border-[#FF7832]/50 hover:shadow-[0_0_15px_rgba(255,120,50,0.2)]" },
      { text: "Thick, smooth, pale, prone to excess oil.", emoji: "💧", dosha: "kapha", hoverClass: "hover:border-[#64DC96]/50 hover:shadow-[0_0_15px_rgba(100,220,150,0.2)]" },
    ]
  },
  // CATEGORY 2: DIGESTION & ENERGY
  {
    category: "Digestion & Energy",
    icon: Zap,
    text: "What is your typical energy pattern?",
    options: [
      { text: "Bursts of high energy, followed by crashes.", emoji: "⚡", dosha: "vata", hoverClass: "hover:border-[#64C8FF]/50 hover:shadow-[0_0_15px_rgba(100,200,255,0.2)]" },
      { text: "Intense, sharp, burns out if I skip meals.", emoji: "🔥", dosha: "pitta", hoverClass: "hover:border-[#FF7832]/50 hover:shadow-[0_0_15px_rgba(255,120,50,0.2)]" },
      { text: "Slow to start, but steady all day long.", emoji: "🐢", dosha: "kapha", hoverClass: "hover:border-[#64DC96]/50 hover:shadow-[0_0_15px_rgba(100,220,150,0.2)]" },
    ]
  },
  {
    category: "Digestion & Energy",
    icon: Zap,
    text: "How is your appetite usually?",
    options: [
      { text: "Irregular, sometimes hungry, sometimes not.", emoji: "⚖️", dosha: "vata", hoverClass: "hover:border-[#64C8FF]/50 hover:shadow-[0_0_15px_rgba(100,200,255,0.2)]" },
      { text: "Strong, hangry if food is delayed.", emoji: "🍽️", dosha: "pitta", hoverClass: "hover:border-[#FF7832]/50 hover:shadow-[0_0_15px_rgba(255,120,50,0.2)]" },
      { text: "Constant, slow, can easily skip meals.", emoji: "🐌", dosha: "kapha", hoverClass: "hover:border-[#64DC96]/50 hover:shadow-[0_0_15px_rgba(100,220,150,0.2)]" },
    ]
  },
  {
    category: "Digestion & Energy",
    icon: Zap,
    text: "Describe your sleep architecture.",
    options: [
      { text: "Light, easily awakened, hard to fall asleep.", emoji: "👀", dosha: "vata", hoverClass: "hover:border-[#64C8FF]/50 hover:shadow-[0_0_15px_rgba(100,200,255,0.2)]" },
      { text: "Moderate, but wake up feeling hot.", emoji: "🌡️", dosha: "pitta", hoverClass: "hover:border-[#FF7832]/50 hover:shadow-[0_0_15px_rgba(255,120,50,0.2)]" },
      { text: "Deep, heavy, difficult to wake up.", emoji: "🛌", dosha: "kapha", hoverClass: "hover:border-[#64DC96]/50 hover:shadow-[0_0_15px_rgba(100,220,150,0.2)]" },
    ]
  },
  // CATEGORY 3: EMOTIONAL STATE
  {
    category: "Emotional State",
    icon: Brain,
    text: "How do you typically react to stress?",
    options: [
      { text: "Anxiety, overthinking, fear.", emoji: "🌪️", dosha: "vata", hoverClass: "hover:border-[#64C8FF]/50 hover:shadow-[0_0_15px_rgba(100,200,255,0.2)]" },
      { text: "Frustration, anger, intense problem-solving.", emoji: "🌋", dosha: "pitta", hoverClass: "hover:border-[#FF7832]/50 hover:shadow-[0_0_15px_rgba(255,120,50,0.2)]" },
      { text: "Withdrawal, stubbornness, shutting down.", emoji: "🧊", dosha: "kapha", hoverClass: "hover:border-[#64DC96]/50 hover:shadow-[0_0_15px_rgba(100,220,150,0.2)]" },
    ]
  },
  {
    category: "Emotional State",
    icon: Brain,
    text: "How is your memory and learning style?",
    options: [
      { text: "Learn fast, forget fast.", emoji: "🕊️", dosha: "vata", hoverClass: "hover:border-[#64C8FF]/50 hover:shadow-[0_0_15px_rgba(100,200,255,0.2)]" },
      { text: "Sharp memory, highly logical.", emoji: "🎯", dosha: "pitta", hoverClass: "hover:border-[#FF7832]/50 hover:shadow-[0_0_15px_rgba(255,120,50,0.2)]" },
      { text: "Learn slow, but never forget.", emoji: "🐘", dosha: "kapha", hoverClass: "hover:border-[#64DC96]/50 hover:shadow-[0_0_15px_rgba(100,220,150,0.2)]" },
    ]
  },
  // CATEGORY 4: LIFESTYLE & HABITS
  {
    category: "Lifestyle & Habits",
    icon: Compass,
    text: "What is your typical movement style?",
    options: [
      { text: "Fast, restless, always doing something.", emoji: "🏃‍♀️", dosha: "vata", hoverClass: "hover:border-[#64C8FF]/50 hover:shadow-[0_0_15px_rgba(100,200,255,0.2)]" },
      { text: "Purposeful, precise, goal-oriented.", emoji: "🚶‍♀️", dosha: "pitta", hoverClass: "hover:border-[#FF7832]/50 hover:shadow-[0_0_15px_rgba(255,120,50,0.2)]" },
      { text: "Slow, steady, relaxed.", emoji: "🧘‍♀️", dosha: "kapha", hoverClass: "hover:border-[#64DC96]/50 hover:shadow-[0_0_15px_rgba(100,220,150,0.2)]" },
    ]
  },
  {
    category: "Lifestyle & Habits",
    icon: Compass,
    text: "How do you handle routines?",
    options: [
      { text: "Dislike them, prefer spontaneity.", emoji: "🎨", dosha: "vata", hoverClass: "hover:border-[#64C8FF]/50 hover:shadow-[0_0_15px_rgba(100,200,255,0.2)]" },
      { text: "Strict, organized, frustrated if broken.", emoji: "📅", dosha: "pitta", hoverClass: "hover:border-[#FF7832]/50 hover:shadow-[0_0_15px_rgba(255,120,50,0.2)]" },
      { text: "Love routine, hard to change habits.", emoji: "🏠", dosha: "kapha", hoverClass: "hover:border-[#64DC96]/50 hover:shadow-[0_0_15px_rgba(100,220,150,0.2)]" },
    ]
  },
  {
    category: "Lifestyle & Habits",
    icon: Compass,
    text: "How do you prefer your climate/environment?",
    options: [
      { text: "Hate cold and wind, prefer warmth.", emoji: "🌴", dosha: "vata", hoverClass: "hover:border-[#64C8FF]/50 hover:shadow-[0_0_15px_rgba(100,200,255,0.2)]" },
      { text: "Hate intense heat, prefer cool breezes.", emoji: "❄️", dosha: "pitta", hoverClass: "hover:border-[#FF7832]/50 hover:shadow-[0_0_15px_rgba(255,120,50,0.2)]" },
      { text: "Hate damp/cold, prefer dry warmth.", emoji: "🏜️", dosha: "kapha", hoverClass: "hover:border-[#64DC96]/50 hover:shadow-[0_0_15px_rgba(100,220,150,0.2)]" },
    ]
  }
];

export default function DoshaLandingSection() {
  const navigate = useNavigate();
  
  // State for the interactive flow
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  
  // Base scores
  const [scores, setScores] = useState({
    vata: 33,
    pitta: 33,
    kapha: 34
  });

  const handleAnswer = (doshaType) => {
    setScores(prev => {
      const newScores = { ...prev };
      newScores[doshaType] += 20;
      
      const total = newScores.vata + newScores.pitta + newScores.kapha;
      return {
        vata: Math.round((newScores.vata / total) * 100),
        pitta: Math.round((newScores.pitta / total) * 100),
        kapha: Math.round((newScores.kapha / total) * 100),
      };
    });

    // The "Curiosity Cliff" - Lock after question 6 (index 5)
    if (currentStep === 5) {
      setIsLocked(true);
    } else if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const getDominantDosha = () => {
    if (!quizStarted) return "default";
    if (scores.vata > scores.pitta && scores.vata > scores.kapha) return "vata";
    if (scores.pitta > scores.vata && scores.pitta > scores.kapha) return "pitta";
    return "kapha";
  };

  const handleRedirect = () => navigate("/login");

  return (
    <section className="relative w-full overflow-hidden bg-wellness-bg py-24 sm:py-32">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-wellness-bg to-wellness-bg" />
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-wellness-glow/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-wellness-gold/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-xs font-extrabold uppercase tracking-[0.3em] text-wellness-glow"
          >
            Interactive AI Body Scanner
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="mt-3 font-heading text-4xl font-extrabold text-white sm:text-5xl"
          >
            Discover Your <span className="text-wellness-muted font-light italic">Ayurvedic Blueprint</span>
          </motion.h2>
        </div>

        {/* 3-Column Cinematic Layout */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center min-h-[600px]">
          
          {/* LEFT: Infographic OR Interactive Questionnaire */}
          <div className="flex flex-col justify-center lg:col-span-4 lg:pr-4 h-full relative">
            <AnimatePresence mode="wait">
              
              {/* STAGE 1: Infographic Poster */}
              {!quizStarted && (
                <motion.div
                  key="infographic-poster"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="rounded-[2rem] border border-white/10 bg-wellness-glass p-8 shadow-glass backdrop-blur-md relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-wellness-glow/10 to-transparent opacity-50" />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-wellness-glow/20 mb-2">
                      <Sparkles className="text-wellness-glow" size={24} />
                    </div>
                    
                    <h3 className="font-heading text-3xl font-bold text-white">
                      The Ancient Code to <br/>Modern Healing
                    </h3>
                    
                    <p className="text-sm text-wellness-muted leading-relaxed">
                      Ayurveda defines three primary energetic forces (Doshas) that govern your body and mind: <span className="text-[#64C8FF] font-bold">Vata</span>, <span className="text-[#FF7832] font-bold">Pitta</span>, and <span className="text-[#64DC96] font-bold">Kapha</span>. 
                    </p>
                    
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-white/90 font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#64C8FF] shadow-[0_0_8px_#64C8FF]" /> Identifies nervous system imbalances
                      </li>
                      <li className="flex items-center gap-3 text-sm text-white/90 font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#FF7832] shadow-[0_0_8px_#FF7832]" /> Optimizes digestion & metabolism
                      </li>
                      <li className="flex items-center gap-3 text-sm text-white/90 font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#64DC96] shadow-[0_0_8px_#64DC96]" /> Maps emotional energy patterns
                      </li>
                    </ul>

                    <button 
                      onClick={() => setQuizStarted(true)}
                      className="mt-4 w-full flex items-center justify-center gap-3 rounded-full bg-wellness-glow px-6 py-4 font-extrabold text-black transition-all hover:bg-wellness-glow/90 hover:scale-[1.02] shadow-[0_0_25px_rgba(0,230,118,0.25)]"
                    >
                      Take the Dosha Quiz <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: Live Questionnaire */}
              {quizStarted && !isLocked && (
                <motion.div
                  key={`question-${currentStep}`}
                  initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-bold text-wellness-glow uppercase tracking-widest flex items-center gap-2">
                      {(() => {
                        const Icon = questions[currentStep].icon;
                        return <Icon size={14} />;
                      })()}
                      {questions[currentStep].category}
                    </p>
                    <p className="text-[10px] text-wellness-muted font-bold tracking-widest">
                      {currentStep + 1} / {questions.length}
                    </p>
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold text-white mb-8">
                    {questions[currentStep].text}
                  </h3>
                  
                  <div className="space-y-4">
                    {questions[currentStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option.dosha)}
                        className={`w-full group flex items-center gap-4 rounded-2xl border border-white/5 bg-black/40 p-4 text-left transition-all duration-300 ${option.hoverClass}`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-xl transition-transform group-hover:scale-110">
                          {option.emoji}
                        </div>
                        <span className="text-sm font-medium text-white/90 group-hover:text-white leading-relaxed">
                          {option.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: Locked State (Curiosity Cliff) */}
              {isLocked && (
                <motion.div
                  key="locked-state"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="rounded-[2rem] border border-wellness-gold/30 bg-wellness-gold/10 p-10 shadow-[0_0_40px_rgba(255,210,0,0.1)] backdrop-blur-md text-center"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-wellness-gold/20">
                    <Lock size={28} className="text-wellness-gold" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-4">
                    Deep Analysis Required
                  </h3>
                  <p className="text-sm text-wellness-muted mb-8 leading-relaxed">
                    Our AI has successfully mapped your primary energetic blueprint. To complete the final lifestyle questions and unlock your personalized Aahar/Vihar roadmap, please create a free account.
                  </p>
                  <button 
                    onClick={handleRedirect}
                    className="w-full rounded-full bg-wellness-gold px-6 py-4 font-extrabold text-black transition-all hover:bg-wellness-gold/90 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,210,0,0.3)]"
                  >
                    Unlock My Wellness Blueprint
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: Live Body Visualization */}
          <div className="lg:col-span-4 flex justify-center items-center h-full">
            <DoshaBodyVisualization activeDosha={getDominantDosha()} />
          </div>

          {/* RIGHT: Live AI Analysis Preview */}
          <div className="lg:col-span-4 lg:pl-4 h-full">
            <DoshaAnalysisPreview 
              liveScores={scores} 
              isLocked={isLocked} 
              onStart={quizStarted ? handleRedirect : () => setQuizStarted(true)} 
            />
          </div>

        </div>
      </div>
    </section>
  );
}
