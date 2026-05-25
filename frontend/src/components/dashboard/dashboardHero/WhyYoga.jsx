import { motion } from "framer-motion";
import { Wind, Heart, Zap, Sparkles } from "lucide-react";

export default function WhyYoga() {
  const benefits = [
    { icon: Wind, title: "Nervous System Reset", desc: "Lower cortisol and activate parasympathetic healing." },
    { icon: Heart, title: "Emotional Balance", desc: "Process stored tension through mindful movement." },
    { icon: Zap, title: "Energy Restoration", desc: "Rebuild prana (vital energy) naturally without stimulants." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="h-full rounded-[2.5rem] bg-wellness-dark p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
    >
      {/* Soft glow circle */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-wellness-orange/20 blur-[80px] transition-opacity duration-700 hover:opacity-75" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-wellness-greenLight/20 blur-[80px] transition-opacity duration-700 hover:opacity-75" />

      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/90 mb-6 backdrop-blur-sm shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-white/10"
        >
          <Sparkles size={14} className="text-wellness-orange" /> Philosophy
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight"
        >
          Why Yoga <span className="text-wellness-orange glow-text">Today?</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 text-white/70 leading-relaxed text-sm sm:text-base font-medium max-w-md"
        >
          In a hyper-connected world, yoga is the ultimate technology for nervous system recovery, emotional balance, and energy restoration.
        </motion.p>
      </div>

      <div className="relative z-10 mt-10 grid gap-4">
        {benefits.map((benefit, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
            className="group flex gap-4 rounded-2xl bg-white/5 p-4 sm:p-5 border border-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-wellness-orange/20 text-wellness-orange transition-transform duration-300 group-hover:scale-110 group-hover:bg-wellness-orange group-hover:text-white">
              <benefit.icon size={20} />
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-wellness-orangeLight transition-colors duration-300">{benefit.title}</h4>
              <p className="mt-1 text-xs sm:text-sm text-white/60 leading-relaxed font-medium">{benefit.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
