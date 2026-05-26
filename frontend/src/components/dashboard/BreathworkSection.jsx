// src/components/dashboard/BreathworkSection.jsx
import { useState, useEffect } from "react";
import { Wind, BookOpen, Sparkles, Loader2 } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import BreathingOrb from "../ui/mental/BreathingOrb";
import { breathingCycles } from "../../data/mentalHealthData";
import { getAIWellnessProfile } from "../../services/userService";

const expandedCycles = [
  ...breathingCycles,
  {
    id: "coherent-breathing",
    title: "Coherent Breathing",
    description: "Equal inhale and exhale counts (5s In, 5s Out) to balance heart rate variability.",
    cycle: [
      { phase: "Inhale", duration: 5 },
      { phase: "Exhale", duration: 5 },
    ],
  },
];

// Helper to parse timings from profile strings like "4-7-8 Deep Calm"
const parseTimings = (name) => {
  const match = name.match(/(\d+)-(\d+)-(\d+)-?(\d+)?/);
  if (match) {
    const inhale = parseInt(match[1]);
    const hold1 = parseInt(match[2]);
    const exhale = parseInt(match[3]);
    const hold2 = match[4] ? parseInt(match[4]) : 0;
    
    const cycle = [{ phase: "Inhale", duration: inhale }];
    if (hold1 > 0) cycle.push({ phase: "Hold", duration: hold1 });
    cycle.push({ phase: "Exhale", duration: exhale });
    if (hold2 > 0) cycle.push({ phase: "Hold", duration: hold2 });
    
    return cycle;
  }
  
  // Default fallback if no match found
  return [
    { phase: "Inhale", duration: 4 },
    { phase: "Hold", duration: 4 },
    { phase: "Exhale", duration: 4 },
    { phase: "Hold", duration: 4 },
  ];
};

export default function BreathworkSection() {
  const [selectedCycleId, setSelectedCycleId] = useState("box-breathing");
  const [aiRoutine, setAiRoutine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAIProfile() {
      try {
        const res = await getAIWellnessProfile();
        if (res.success && res.data?.breathingRoutines?.length > 0) {
          const routine = res.data.breathingRoutines[0];
          const parsedCycle = parseTimings(routine.name);
          
          const aiCycle = {
            id: "ai-personalized",
            title: routine.name,
            description: `${routine.purpose}. Dynamic timings parsed directly from your AI Wellness Profile.`,
            cycle: parsedCycle,
            isAi: true
          };
          
          setAiRoutine(aiCycle);
          setSelectedCycleId("ai-personalized");
        }
      } catch (err) {
        console.error("Failed to load AI breathwork profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAIProfile();
  }, []);

  const allCycles = aiRoutine ? [aiRoutine, ...expandedCycles] : expandedCycles;
  const activeCycle = allCycles.find((c) => c.id === selectedCycleId) || allCycles[0];

  return (
    <div className="space-y-12">
      <DashboardSection id="breathwork-main">
        <div className="grid gap-8 lg:grid-cols-5 items-start">
          {/* Instructions and Selection (Left 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-wellness-glow/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-glow border border-wellness-glow/30">
                <Wind size={12} /> Breathwork Studio
              </span>
              <h2 className="font-heading text-3xl font-extrabold text-white mt-4">Change your breath, change your mind.</h2>
              <p className="mt-3 text-sm text-wellness-muted leading-relaxed font-medium">
                Pranayama breath control is one of the fastest ways to regulate your autonomic nervous system. Select a cycle to begin practicing.
              </p>
            </div>

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-xs font-bold text-wellness-glow/80 animate-pulse">
                <Loader2 size={14} className="animate-spin" /> Fetching AI personalized routines...
              </div>
            )}

            {/* Cycle Selectors */}
            <div className="space-y-3">
              {allCycles.map((cycle) => (
                <button
                  key={cycle.id}
                  onClick={() => setSelectedCycleId(cycle.id)}
                  className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 ${
                    selectedCycleId === cycle.id
                      ? cycle.isAi
                        ? "bg-wellness-gold/20 border-wellness-gold/40 text-white shadow-[0_0_20px_rgba(212,166,79,0.15)]"
                        : "bg-wellness-glow/20 border-wellness-glow/30 text-white shadow-navitem"
                      : "bg-white/5 border-wellness-border text-wellness-muted hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                        selectedCycleId === cycle.id
                          ? cycle.isAi
                            ? "bg-wellness-gold/30 text-wellness-gold"
                            : "bg-wellness-glow/30 text-wellness-glow"
                          : "bg-white/5 text-wellness-muted"
                      }`}
                    >
                      {cycle.isAi ? <Sparkles size={20} /> : <Wind size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-heading text-sm font-bold truncate ${
                          selectedCycleId === cycle.id ? "text-white" : "text-white/80"
                        }`}>{cycle.title}</h4>
                        {cycle.isAi && (
                          <span className="rounded bg-wellness-gold/20 px-1 py-0.5 text-[8px] font-extrabold uppercase text-wellness-gold">AI Recommended</span>
                        )}
                      </div>
                      <p className="text-xs text-wellness-muted mt-0.5 line-clamp-2 leading-relaxed font-medium">{cycle.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Wellness Tip */}
            <div className="rounded-3xl border border-wellness-border bg-white/5 p-5 flex items-start gap-3 backdrop-blur-sm">
              <BookOpen size={18} className="text-wellness-gold mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white">Wellness Tip</h5>
                <p className="text-[11px] text-wellness-muted mt-1 leading-relaxed font-medium">
                  Keep your posture tall, relax your shoulders, and breathe from the diaphragm. Follow the expanding orb.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Breathing Orb (Right 3 cols on lg) */}
          <div className="lg:col-span-3">
            <BreathingOrb key={activeCycle.id} cycleData={activeCycle} />
          </div>
        </div>
      </DashboardSection>
    </div>
  );
}
