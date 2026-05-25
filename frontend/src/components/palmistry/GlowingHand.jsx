import { motion } from "framer-motion";
import palmImage from "../../assets/images/palmimage.png";

export default function GlowingHand() {
  const palmLines = [
    { name: "Heart Line", desc: "Emotions & Love", yOffset: 80, icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
    { name: "Head Line", desc: "Mind & Wisdom", yOffset: 140, icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" },
    { name: "Life Line", desc: "Vitality & Energy", yOffset: 200, icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
    { name: "Fate Line", desc: "Destiny & Path", yOffset: 260, icon: "M12 2L2 22h20L12 2zm0 4.5l5.5 11h-11L12 6.5z" },
    { name: "Sun Line", desc: "Success & Joy", yOffset: 320, icon: "M12 2.5v2m0 15v2m9.5-9.5h-2m-15 0h-2m13.79-6.79l-1.42 1.42m-11.32 0l-1.42-1.42m14.15 14.15l-1.41-1.41m-11.32 0l-1.41 1.41M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" },
    { name: "Health Line", desc: "Wellness & Balance", yOffset: 380, icon: "M12 22C12 22 4 16 4 10C4 5.5 8 2 12 2C16 2 20 5.5 20 10C20 16 12 22 12 22ZM12 10C12 10 8 12 4 10M12 10C12 10 16 12 20 10" },
  ];

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center z-10">
      
      {/* Outer Sacred Circular Base */}
      <motion.div 
        className="absolute bottom-[-100px] w-[800px] h-[250px] rounded-[100%] border border-[#D4A64F]/30 bg-gradient-to-t from-[#D4A64F]/10 to-transparent flex items-center justify-center pointer-events-none"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[500px] h-[150px] rounded-[100%] border border-[#00E676]/40 flex items-center justify-center drop-shadow-[0_0_15px_rgba(0,230,118,0.5)]">
           <div className="w-[200px] h-[50px] rounded-[100%] border border-[#E9781F]/50 bg-[#D4A64F] blur-sm animate-pulse" />
        </div>
      </motion.div>

      {/* Main Hand Image Overlay */}
      <div className="relative z-10 w-[480px] h-[800px] -mt-10 lg:scale-110 xl:scale-125">
        {/* Palm Image */}
        <img 
          src={palmImage} 
          alt="Golden Palm" 
          className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,230,118,0.2)]"
        />



        {/* Floating Line Labels on Right Side */}
        <div className="absolute top-0 -right-[150px] xl:-right-[250px] h-full hidden lg:flex flex-col justify-between py-24 w-[250px]">
          {palmLines.map((line, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (idx * 0.1) }}
              className="flex items-center gap-4 group"
            >
              {/* Connector line mapping to hand */}
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4A64F]/50 group-hover:to-[#00E676] transition-colors" />
              
              <div className="w-10 h-10 rounded-full border border-[#D4A64F]/40 flex items-center justify-center text-[#D4A64F] group-hover:border-[#00E676] group-hover:text-[#00E676] group-hover:shadow-[0_0_15px_rgba(0,230,118,0.3)] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={line.icon} />
                </svg>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[#D4A64F] font-semibold text-sm group-hover:text-[#00E676] transition-colors">{line.name}</span>
                <span className="text-[#888] text-xs">{line.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
