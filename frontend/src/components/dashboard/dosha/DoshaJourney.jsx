import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, ArrowRight } from "lucide-react";

export default function DoshaJourney() {
  const journeySteps = [
    { week: 1, title: "Stabilize Sleep", focus: "Regulate Vata", status: "completed", desc: "Established consistent 10PM bedtime and morning sunlight exposure." },
    { week: 2, title: "Reduce Stress", focus: "Nervous System", status: "current", desc: "Implementing daily 15-minute grounding meditation and reducing screen time." },
    { week: 3, title: "Improve Digestion", focus: "Pitta Balance", status: "locked", desc: "Integrating warm spices and structured meal timing." },
    { week: 4, title: "Emotional Clarity", focus: "Sattva Cultivation", status: "locked", desc: "Deepening breathwork and entering a state of emotional homeostasis." },
  ];

  return (
    <div className="relative space-y-6">
      <h3 className="font-heading text-xl font-bold text-white mb-8">Your AI Healing Journey</h3>
      
      <div className="absolute left-6 top-16 bottom-10 w-px bg-white/10" />

      {journeySteps.map((step, idx) => (
        <motion.div
          key={step.week}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.2 }}
          className={`relative flex gap-6 rounded-2xl border p-5 transition-all ${
            step.status === "current" 
              ? "border-[#64C8FF]/30 bg-[#64C8FF]/10 shadow-[0_0_30px_rgba(100,200,255,0.1)]" 
              : step.status === "completed"
              ? "border-white/5 bg-white/5"
              : "border-transparent bg-transparent opacity-50"
          }`}
        >
          {/* Timeline Node */}
          <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center bg-wellness-bg">
            {step.status === "completed" ? (
              <CheckCircle2 size={24} className="text-wellness-glow" />
            ) : step.status === "current" ? (
              <div className="h-4 w-4 rounded-full bg-[#64C8FF] shadow-[0_0_10px_#64C8FF] animate-pulse" />
            ) : (
              <CircleDashed size={24} className="text-white/30" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Week {step.week}</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                step.status === "current" ? "bg-[#64C8FF]/20 text-[#64C8FF]" : "bg-white/10 text-white/50"
              }`}>
                {step.focus}
              </span>
            </div>
            <h4 className={`text-lg font-bold ${step.status === "locked" ? "text-white/50" : "text-white"}`}>
              {step.title}
            </h4>
            <p className="mt-2 text-sm text-wellness-muted leading-relaxed">
              {step.desc}
            </p>
            
            {step.status === "current" && (
              <button className="mt-4 flex items-center gap-2 text-xs font-bold text-[#64C8FF] hover:text-white transition-colors">
                View Week {step.week} Protocol <ArrowRight size={14} />
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
