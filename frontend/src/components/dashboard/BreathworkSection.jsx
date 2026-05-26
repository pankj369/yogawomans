import { useState } from "react";
import { Wind, BookOpen } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import BreathingOrb from "../ui/mental/BreathingOrb";
import { breathingCycles } from "../../data/mentalHealthData";

const expandedCycles = [
  ...breathingCycles,
  {
    id: "coherent-breathing",
    title: "Coherent Breathing",
    description: "Equal inhale and exhale counts (5s In, 5s Out) to balance heart rate variability.",
    duration: 5,
    cycle: [
      { phase: "Inhale", duration: 5 },
      { phase: "Exhale", duration: 5 },
    ],
  },
];

export default function BreathworkSection() {
  const [selectedCycleId, setSelectedCycleId] = useState("box-breathing");

  const activeCycle = expandedCycles.find((c) => c.id === selectedCycleId) || expandedCycles[0];

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

            {/* Cycle Selectors */}
            <div className="space-y-3">
              {expandedCycles.map((cycle) => (
                <button
                  key={cycle.id}
                  onClick={() => setSelectedCycleId(cycle.id)}
                  className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 ${
                    selectedCycleId === cycle.id
                      ? "bg-wellness-glow/20 border-wellness-glow/30 text-white shadow-navitem"
                      : "bg-white/5 border-wellness-border text-wellness-muted hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                        selectedCycleId === cycle.id
                          ? "bg-wellness-glow/30 text-wellness-glow"
                          : "bg-white/5 text-wellness-muted"
                      }`}
                    >
                      <Wind size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-heading text-sm font-bold truncate ${
                        selectedCycleId === cycle.id ? "text-white" : "text-white/80"
                      }`}>{cycle.title}</h4>
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
