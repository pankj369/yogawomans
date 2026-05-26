import { motion } from "framer-motion";
import { Sparkles, Play, X } from "lucide-react";
import { fadeUp } from "../../utils/animations";
import { useRecommendations } from "../../hooks/useRecommendations";

export default function AIRecommendations({ onSelect }) {
  const { recommendations, loading, dismissRecommendation } = useRecommendations();

  if (loading) {
    return (
      <div className="w-full animate-pulse space-y-4">
        <div className="h-6 w-1/3 rounded-full bg-wellness-muted/20"></div>
        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 rounded-3xl bg-wellness-muted/10"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <motion.section variants={fadeUp} className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-white">For Your Evening</h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-wellness-muted">
            <Sparkles size={14} className="text-wellness-orange" /> Curated for your current energy
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
            className="group relative flex flex-col items-start overflow-hidden rounded-[2rem] bg-wellness-glass p-6 text-left backdrop-blur-[18px] border border-wellness-border transition-all duration-300 hover:-translate-y-1 hover:border-wellness-glow/30 hover:bg-white/5 hover:shadow-cardHover"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-wellness-glow/20 text-wellness-glow border border-wellness-glow/30 transition-transform group-hover:scale-110`}>
              <Play size={20} className="ml-1" />
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); dismissRecommendation(rec.id); }}
              className="absolute top-4 right-4 rounded-full bg-white/5 border border-wellness-border p-2 text-wellness-muted hover:bg-white/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Dismiss recommendation"
            >
              <X size={14} />
            </button>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-wellness-orange">
                {rec.category || "Wellness"}
              </span>
              <span className="h-1 w-1 rounded-full bg-wellness-border" />
              <span className="text-[10px] font-semibold text-wellness-muted">
                {rec.duration || "15 min"}
              </span>
            </div>
            
            <h3 className="font-heading text-lg font-bold text-white mb-2 leading-tight">
              {rec.title}
            </h3>
            
            <p className="text-xs text-wellness-muted leading-relaxed italic line-clamp-2">
              Recommended for your current energy and goals.
            </p>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
