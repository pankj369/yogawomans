import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

export default function WellnessNews() {
  const newsItems = [
    {
      id: 1,
      category: "Yoga Science",
      title: "Science Confirms Regular Yoga Boosts Brain Function.",
      date: "2 days ago",
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "text-cyan-400",
    },
    {
      id: 2,
      category: "Global Events",
      title: "Global Yoga Fest 2026 Announced for Next Summer.",
      date: "1 week ago",
      color: "from-emerald-500/20 to-teal-500/20",
      accent: "text-emerald-400",
    },
    {
      id: 3,
      category: "Mindfulness",
      title: "How 10 minutes of breathwork changes your neuroplasticity.",
      date: "5 days ago",
      color: "from-purple-500/20 to-pink-500/20",
      accent: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wellness-surface border border-wellness-border text-wellness-glow shadow-liftSm">
          <Calendar size={20} />
        </div>
        <h2 className="font-heading text-2xl font-bold text-white">Latest in Yoga World</h2>
      </div>
      
      <div className="grid gap-4 flex-1">
        {newsItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-wellness-border bg-wellness-glass p-6 shadow-glass backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-wellness-glow/30 hover:shadow-cardHover sm:flex-row sm:items-center gap-4 h-full"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
            
            <div className="relative z-10 space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className={`text-[0.65rem] font-bold uppercase tracking-wider ${item.accent}`}>
                  {item.category}
                </span>
                <span className="text-xs font-semibold text-wellness-muted">{item.date}</span>
              </div>
              <h3 className="font-heading text-lg font-bold leading-snug text-white group-hover:text-wellness-glow transition-colors duration-300">
                {item.title}
              </h3>
            </div>

            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 border border-wellness-border text-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-wellness-glow group-hover:text-black group-hover:shadow-md sm:mt-0">
              <ArrowUpRight size={20} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
