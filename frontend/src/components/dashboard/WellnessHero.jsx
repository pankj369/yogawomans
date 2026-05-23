import { motion } from "framer-motion";
import { Sparkles, Flame, Heart } from "lucide-react";
import { fadeUp } from "../../utils/animations";

export default function WellnessHero({ userName = "Yogi" }) {
  return (
    <motion.div 
      variants={fadeUp}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white/80 to-[#F7F3EE]/90 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] backdrop-blur-xl border border-white"
    >
      {/* Ambient Breathing Glows */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(226,114,41,0.2)_0%,transparent_70%)] blur-[40px]"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute -left-10 -bottom-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(143,166,142,0.15)_0%,transparent_70%)] blur-[50px]"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        
        {/* Left: Greeting & Emotional Guidance */}
        <div className="max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8FA68E] mb-4"
          >
            <Sparkles size={14} className="text-[#E27229]" />
            <span>Daily Check-in</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#11281d] mb-4 tracking-tight"
          >
            Welcome back, {userName}.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg sm:text-xl text-[#3a4a3d] font-light leading-relaxed"
          >
            Your nervous system is finding its rhythm. You are maintaining a steady, grounded energy this week. Keep nurturing this space.
          </motion.p>
        </div>

        {/* Right: Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-4 sm:gap-6"
        >
          {/* Streak Card */}
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white/60 p-6 backdrop-blur-md border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow min-w-[120px]">
            <Flame size={24} className="text-[#E27229] mb-2" />
            <span className="font-heading text-3xl font-extrabold text-[#11281d]">4</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8FA68E] mt-1">Day Streak</span>
          </div>
          
          {/* Daily Status */}
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white/60 p-6 backdrop-blur-md border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow min-w-[120px]">
            <Heart size={24} className="text-[#8FA68E] mb-2" />
            <span className="font-heading text-3xl font-extrabold text-[#11281d]">Calm</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8FA68E] mt-1">Morning State</span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
