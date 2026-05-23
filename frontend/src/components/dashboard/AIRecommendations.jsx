import { motion } from "framer-motion";
import { Sparkles, Music, Wind, Activity } from "lucide-react";
import { fadeUp } from "../../utils/animations";

export default function AIRecommendations({ onSelect }) {
  const recommendations = [
    {
      id: "rec1",
      title: "Evening Wind Down",
      category: "Yoga",
      duration: "15 min",
      reason: "To balance your morning cortisol levels",
      icon: Activity,
      color: "bg-[#8FA68E]/20 text-[#2F6B3B]"
    },
    {
      id: "rec2",
      title: "Deep Nervous System Reset",
      category: "Breathwork",
      duration: "10 min",
      reason: "Because you've been highly active today",
      icon: Wind,
      color: "bg-[#E27229]/20 text-[#E27229]"
    },
    {
      id: "rec3",
      title: "Delta Wave Sleep",
      category: "Soundscape",
      duration: "45 min",
      reason: "To improve your deep sleep cycle tonight",
      icon: Music,
      color: "bg-[#C89B63]/20 text-[#C89B63]"
    }
  ];

  return (
    <motion.section variants={fadeUp} className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-[#11281d]">For Your Evening</h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#8FA68E]">
            <Sparkles size={14} className="text-[#E27229]" /> Curated for your current energy
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {recommendations.map((rec, index) => (
          <motion.button
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.1) }}
            onClick={() => onSelect(rec)}
            className="group relative flex flex-col items-start overflow-hidden rounded-[2rem] bg-white/40 p-6 text-left backdrop-blur-md border border-[#EFE7DC] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${rec.color} transition-transform group-hover:scale-110`}>
              <rec.icon size={20} />
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#11281d]">
                {rec.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#EFE7DC]" />
              <span className="text-[10px] font-semibold text-[#8FA68E]">
                {rec.duration}
              </span>
            </div>
            
            <h3 className="font-serif text-xl font-light text-[#11281d] mb-2 leading-tight">
              {rec.title}
            </h3>
            
            <p className="text-xs text-[#8FA68E] leading-relaxed italic">
              "{rec.reason}"
            </p>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
