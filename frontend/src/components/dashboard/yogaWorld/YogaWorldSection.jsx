import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Calendar, ArrowUpRight, Wind, Heart, Zap, Sparkles } from "lucide-react";

export default function YogaWorldSection() {
  // --- Countdown Timer Logic ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: June 21st (Current year or next year depending on now)
    const now = new Date();
    let targetYear = now.getFullYear();
    const targetDate = new Date(targetYear, 5, 21); // Month is 0-indexed, so 5 is June
    
    if (now.getTime() > targetDate.getTime()) {
      targetDate.setFullYear(targetYear + 1);
    }

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const newsItems = [
    {
      id: 1,
      category: "Yoga Science",
      title: "New study links daily Vinyasa to 40% reduction in cortisol levels.",
      date: "2 days ago",
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "text-cyan-400",
    },
    {
      id: 2,
      category: "Mindfulness",
      title: "How 10 minutes of breathwork changes your brain's neuroplasticity.",
      date: "5 days ago",
      color: "from-purple-500/20 to-pink-500/20",
      accent: "text-purple-400",
    },
    {
      id: 3,
      category: "Global Events",
      title: "Bali Spirit Festival announces 2026 lineup featuring 50+ master teachers.",
      date: "1 week ago",
      color: "from-emerald-500/20 to-teal-500/20",
      accent: "text-emerald-400",
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* Hero / Countdown Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 p-8 sm:p-12 shadow-2xl"
      >
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-wellness-greenLight/20 via-gray-900 to-gray-900" />
        <div className="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(167,243,208,0.1)_360deg)]" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-wellness-green/20 px-4 py-1.5 text-sm font-bold text-wellness-greenLight border border-wellness-green/30 mb-6">
            <Globe size={16} /> Global Celebration
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            International Day of <span className="text-transparent bg-clip-text bg-gradient-to-r from-wellness-greenLight to-emerald-300">Yoga</span>
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Join millions around the world on June 21st in a unified flow for global harmony, peace, and wellness.
          </p>

          {/* Countdown Timer */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((block, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_0_30px_rgba(167,243,208,0.1)]">
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wider">
                    {block.value.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="mt-3 text-xs font-bold uppercase tracking-widest text-wellness-greenLight">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Latest in Yoga World Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wellness-dark text-white">
              <Calendar size={20} />
            </div>
            <h2 className="font-heading text-2xl font-bold text-wellness-dark">Latest in Yoga World</h2>
          </div>
          
          <div className="grid gap-4">
            {newsItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-card hover:bg-white/90 sm:flex-row sm:items-center gap-4"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-[0.65rem] font-bold uppercase tracking-wider ${item.accent}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-wellness-muted">{item.date}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold leading-snug text-wellness-dark group-hover:text-black transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-wellness-muted/20 text-wellness-dark shadow-sm transition-transform group-hover:scale-110 group-hover:bg-wellness-dark group-hover:text-white sm:mt-0">
                  <ArrowUpRight size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Yoga Today Section */}
        <div className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-full rounded-[2.5rem] bg-wellness-dark p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
          >
            {/* Soft glow circle */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-wellness-orange/20 blur-[60px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-wellness-greenLight/20 blur-[60px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80 mb-6 backdrop-blur-sm">
                <Sparkles size={14} /> Philosophy
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
                Why Yoga <span className="text-wellness-orange">Today?</span>
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                In a hyper-connected world, yoga is the ultimate technology for nervous system recovery, emotional balance, and energy restoration.
              </p>
            </div>

            <div className="relative z-10 mt-10 grid gap-4">
              {[
                { icon: Wind, title: "Nervous System Reset", desc: "Lower cortisol and activate parasympathetic healing." },
                { icon: Heart, title: "Emotional Balance", desc: "Process stored tension through mindful movement." },
                { icon: Zap, title: "Energy Restoration", desc: "Rebuild prana (vital energy) naturally without stimulants." }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 rounded-2xl bg-white/5 p-4 border border-white/5 backdrop-blur-md transition-colors hover:bg-white/10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-wellness-orange/20 text-wellness-orange">
                    <benefit.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{benefit.title}</h4>
                    <p className="mt-1 text-xs text-white/60 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
