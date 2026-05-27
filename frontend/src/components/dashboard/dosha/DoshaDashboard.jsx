import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Flame, Leaf, Sparkles, Activity, Target, Brain, Waves, Coffee, Sun, Moon } from "lucide-react";
import DoshaBodyVisualization from "../../dosha/DoshaBodyVisualization";
import DoshaScores from "./DoshaScores";
import DoshaJourney from "./DoshaJourney";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function DoshaDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const doshaProfile = {
    dominant: "Vata",
    alerts: [
      { id: 1, type: "warning", message: "Elevated Vata detected from recent sleep logs. Grounding required." },
    ],
    rituals: [
      { time: "Morning", title: "Warm Ginger Water", icon: Coffee },
      { time: "Afternoon", title: "5-Min Box Breathing", icon: Wind },
      { time: "Evening", title: "Digital Sunset", icon: Moon },
    ]
  };

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
        activeTab === id 
          ? "bg-wellness-glow text-black shadow-[0_0_15px_rgba(0,230,118,0.3)]" 
          : "bg-white/5 text-wellness-muted hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-10">
      
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-wellness-glow/30 bg-wellness-glow/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-glow">
              <Sparkles size={12} /> AI Wellness Ecosystem
            </span>
          </div>
          <h2 className="font-heading text-4xl font-extrabold text-white">
            Ayurvedic <span className="text-wellness-glow">Blueprint</span>
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <TabButton id="overview" label="Overview" />
          <TabButton id="aahar" label="Aahar (Diet)" />
          <TabButton id="vihar" label="Vihar (Lifestyle)" />
          <TabButton id="journey" label="Healing Journey" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          
          {/* ===================== OVERVIEW TAB ===================== */}
          {activeTab === "overview" && (
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5 space-y-8">
                {/* Visual Body */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-[2.5rem] border border-white/10 bg-wellness-glass p-8 shadow-glass backdrop-blur-md text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#64C8FF]/10 to-transparent opacity-50 pointer-events-none" />
                  <h3 className="relative z-10 font-heading text-xl font-bold text-white mb-2">Prakriti vs Vikriti</h3>
                  <p className="relative z-10 text-xs text-wellness-muted mb-6">Your inherent nature vs current imbalance.</p>
                  
                  <div className="relative z-10 flex justify-center h-72 -mt-10 -mb-10 scale-[0.85] origin-center">
                    <DoshaBodyVisualization activeDosha={doshaProfile.dominant} />
                  </div>
                </motion.div>

                {/* Alerts */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-wellness-muted ml-2">Imbalance Alerts</h3>
                  {doshaProfile.alerts.map(alert => (
                    <div key={alert.id} className="flex items-start gap-3 rounded-2xl border border-[#FF7832]/30 bg-[#FF7832]/10 p-4 shadow-[0_0_15px_rgba(255,120,50,0.1)]">
                      <Activity size={18} className="text-[#FF7832] mt-0.5 shrink-0 animate-pulse" />
                      <p className="text-sm font-medium text-white/90">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                {/* Scoring System */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-wellness-muted ml-2 mb-3">AI Wellness Scores</h3>
                  <DoshaScores />
                </div>

                {/* Daily Rituals */}
                <div className="rounded-[2rem] border border-white/10 bg-wellness-glass p-8 shadow-glass backdrop-blur-md">
                  <h3 className="font-heading text-xl font-bold text-white mb-6">Today's Rituals</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {doshaProfile.rituals.map((ritual, idx) => (
                      <div key={idx} className="rounded-2xl bg-white/5 border border-white/5 p-4 text-center hover:bg-white/10 transition-colors">
                        <ritual.icon size={24} className="mx-auto text-wellness-glow mb-3" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-wellness-muted">{ritual.time}</p>
                        <p className="mt-1 text-sm font-bold text-white">{ritual.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== AAHAR (DIET) TAB ===================== */}
          {activeTab === "aahar" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-wellness-glass p-8">
                <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-3 mb-6">
                  <Leaf className="text-wellness-glow" /> Foods to Favor
                </h3>
                <p className="text-sm text-wellness-muted mb-6">To ground your elevated Vata, focus on warm, nourishing, and heavy qualities.</p>
                <ul className="space-y-4">
                  {[
                    "Cooked grains (oats, rice, quinoa)",
                    "Root vegetables (sweet potatoes, beets, carrots)",
                    "Warming spices (ginger, cinnamon, cardamom, cumin)",
                    "Healthy fats (ghee, sesame oil, avocado)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <span className="h-2 w-2 rounded-full bg-wellness-glow" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2rem] border border-[#FF7832]/20 bg-black/40 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 bg-[#FF7832]/10 blur-[50px] rounded-full" />
                <h3 className="relative z-10 font-heading text-2xl font-bold text-white flex items-center gap-3 mb-6">
                  <Flame className="text-[#FF7832]" /> Foods to Reduce
                </h3>
                <p className="relative z-10 text-sm text-wellness-muted mb-6">Avoid cold, dry, and light foods which aggravate Vata dosha.</p>
                <ul className="relative z-10 space-y-4">
                  {[
                    "Raw salads and cold vegetables",
                    "Dry crackers, rice cakes, popcorn",
                    "Iced drinks and carbonated beverages",
                    "Excess caffeine and stimulants"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90 bg-white/5 p-4 rounded-2xl border border-[#FF7832]/10">
                      <span className="h-2 w-2 rounded-full bg-[#FF7832]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ===================== VIHAR (LIFESTYLE) TAB ===================== */}
          {activeTab === "vihar" && (
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8 rounded-[2rem] border border-white/10 bg-wellness-glass p-8">
                <h3 className="font-heading text-2xl font-bold text-white mb-6">Lifestyle Optimization</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                    <Sun size={24} className="text-wellness-gold shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Morning Routine (Dinacharya)</h4>
                      <p className="text-sm text-wellness-muted">Wake up by 6:00 AM. Start with a warm oil massage (Abhyanga) using sesame oil, followed by a warm shower and 10 minutes of gentle stretching.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                    <Target size={24} className="text-[#64C8FF] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Exercise Recommendations</h4>
                      <p className="text-sm text-wellness-muted">Focus on slow, grounding movements. Yin Yoga, restorative yoga, swimming, or slow walking. Avoid high-intensity cardio that exhausts the nervous system.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                    <Moon size={24} className="text-[#9cbff9] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Evening Wind Down</h4>
                      <p className="text-sm text-wellness-muted">Screen-free by 9:00 PM. Drink warm nutmeg milk. Read or listen to calming music to prepare the mind for deep recovery sleep.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 rounded-[2rem] border border-white/10 bg-wellness-glow/5 p-8 text-center flex flex-col justify-center">
                <Brain size={48} className="mx-auto text-wellness-glow mb-4" />
                <h3 className="font-heading text-xl font-bold text-white mb-2">Set Your Primary Goal</h3>
                <p className="text-sm text-wellness-muted mb-6">Align your AI engine to a specific outcome.</p>
                <button className="w-full py-3 rounded-full bg-wellness-glow text-black font-bold shadow-[0_0_15px_rgba(0,230,118,0.2)]">
                  Edit Wellness Goal
                </button>
              </div>
            </div>
          )}

          {/* ===================== JOURNEY TAB ===================== */}
          {activeTab === "journey" && (
            <div className="max-w-3xl mx-auto rounded-[2rem] border border-white/10 bg-wellness-glass p-8 lg:p-12">
              <DoshaJourney />
            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
