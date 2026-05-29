import { motion } from "framer-motion";
import fotlogo from "../../assets/images/surya/suryamain2.png";

export default function CenterLotus() {
  return (
    <div className="relative flex items-center justify-center w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[260px] lg:h-[260px] z-10 pointer-events-none">
      
      {/* Outer ambient glow */}
      <motion.div
        className="absolute inset-[-60%] rounded-full bg-[#1E7A46]/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Sacred Geometry Mandala Placeholder (Animated SVG Ring) */}
      <motion.svg
        className="absolute inset-[-20%] w-[140%] h-[140%] opacity-40 text-[#E9781F]"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.2" />
        {/* Simple geometric sun rays */}
        {Array.from({ length: 24 }).map((_, i) => (
          <line 
            key={i} 
            x1="50" y1="8" 
            x2="50" y2="2" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            transform={`rotate(${i * 15} 50 50)`} 
          />
        ))}
      </motion.svg>

      {/* Center Image Container */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full p-1.5 md:p-2 bg-gradient-to-br from-[#E9781F] to-[#00E676] shadow-[0_0_60px_rgba(233,120,31,0.5)] pointer-events-auto cursor-pointer group">
        <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0A0A] relative flex items-center justify-center">
          
          {/* Breathing inner glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#1E7A46]/50 to-transparent"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo Image */}
          <div className="absolute inset-0 z-10">
             <img 
               src={fotlogo} 
               alt="YogaWomans" 
               className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700 ease-out" 
             />
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
