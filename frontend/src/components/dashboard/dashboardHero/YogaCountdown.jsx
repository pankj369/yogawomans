import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function YogaCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const now = new Date();
    let targetYear = now.getFullYear();
    const targetDate = new Date(targetYear, 5, 21); // Month is 0-indexed (5 = June)
    
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 p-8 sm:p-12 shadow-2xl h-full flex flex-col justify-center"
    >
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-wellness-greenLight/20 via-gray-900 to-gray-900" />
      <div className="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(167,243,208,0.1)_360deg)]" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-wellness-green/20 px-4 py-1.5 text-sm font-bold text-wellness-greenLight border border-wellness-green/30 mb-6 shadow-[0_0_15px_rgba(167,243,208,0.2)]"
        >
          <Globe size={16} /> Global Celebration
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg"
        >
          International Day of <span className="text-transparent bg-clip-text bg-gradient-to-r from-wellness-greenLight to-emerald-300">Yoga</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 text-lg text-white/70 max-w-2xl"
        >
          Join millions around the world on June 21st in a unified flow for global harmony, peace, and wellness.
        </motion.p>

        {/* Countdown Timer */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((block, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_0_30px_rgba(167,243,208,0.1)] transition-transform hover:scale-105 hover:bg-white/15">
                <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-wider glow-text">
                  {block.value.toString().padStart(2, "0")}
                </span>
              </div>
              <span className="mt-3 text-xs font-bold uppercase tracking-widest text-wellness-greenLight opacity-80">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
