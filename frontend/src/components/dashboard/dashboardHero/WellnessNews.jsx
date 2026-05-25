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
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wellness-dark text-white shadow-liftSm">
          <Calendar size={20} />
        </div>
        <h2 className="font-heading text-2xl font-bold text-wellness-dark">Latest in Yoga World</h2>
      </div>
      
      <div className="grid gap-4 flex-1">
        {newsItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:bg-white/90 hover:border-white sm:flex-row sm:items-center gap-4 h-full"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
            
            <div className="relative z-10 space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className={`text-[0.65rem] font-bold uppercase tracking-wider ${item.accent}`}>
                  {item.category}
                </span>
                <span className="text-xs font-semibold text-wellness-muted">{item.date}</span>
              </div>
              <h3 className="font-heading text-lg font-bold leading-snug text-wellness-dark group-hover:text-black transition-colors duration-300">
                {item.title}
              </h3>
            </div>

            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-wellness-muted/10 text-wellness-dark shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-wellness-dark group-hover:text-white group-hover:shadow-md sm:mt-0">
              <ArrowUpRight size={20} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
