import { motion } from "framer-motion";

export default function BenefitsRow() {
  const benefits = [
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ), 
      title: "Strengthens Heart", desc: "Improves circulation & health." 
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v4" />
          <path d="M12 8c-3-2-6-1-8 2 0 4 3 8 8 10 5-2 8-6 8-10-2-3-5-4-8-2Z" />
          <path d="M9 11c-1 1-1 3 0 4" />
          <path d="M15 11c1 1 1 3 0 4" />
        </svg>
      ), 
      title: "Better Breathing", desc: "Expands lung oxygen flow." 
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C12 2 9 6 9 10C9 14 12 16 12 16C12 16 15 14 15 10C15 6 12 2 12 2Z"/>
          <path d="M12 16C12 16 8 18 5 15C2 12 4 8 4 8C4 8 7 11 9 12C11 13 12 16 12 16Z"/>
          <path d="M12 16C12 16 16 18 19 15C22 12 20 8 20 8C20 8 17 11 15 12C13 13 12 16 12 16Z"/>
          <path d="M12 22C12 22 9 22 7 20C5 18 6 16 6 16C6 16 8 17 10 18C11 18.5 12 22 12 22Z"/>
          <path d="M12 22C12 22 15 22 17 20C19 18 18 16 18 16C18 16 16 17 14 18C13 18.5 12 22 12 22Z"/>
        </svg>
      ), 
      title: "Calms The Mind", desc: "Reduces stress & brings balance." 
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      ), 
      title: "Boosts Metabolism", desc: "Activates digestive fire." 
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8" />
          <path d="M8.5 12h7" />
        </svg>
      ), 
      title: "Builds Immunity", desc: "Strengthens natural defense." 
    },
  ];

  return (
    <div className="hidden lg:block w-full mt-10 xl:mt-12 z-30 pointer-events-auto max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 xl:gap-5 bg-[#0F2E1D]/20 border border-white/5 p-4 md:p-5 xl:p-6 rounded-[2rem] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-center md:items-start lg:items-center xl:items-start gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-default text-center md:text-left lg:text-center xl:text-left group"
          >
            <div className="relative w-12 h-12 xl:w-14 xl:h-14 flex-shrink-0 flex items-center justify-center">
              {/* Ambient glowing aura */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-[#1E7A46]/30 blur-md group-hover:bg-[#00E676]/40 transition-colors duration-500"
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />
              {/* Glassmorphism Border Container */}
              <div className="relative z-10 w-full h-full rounded-full border border-[#1E7A46]/60 bg-gradient-to-br from-[#0F2E1D]/90 to-[#0A0A0A] backdrop-blur-md flex items-center justify-center text-[#E9781F] group-hover:text-[#00E676] group-hover:border-[#00E676] group-hover:shadow-[0_0_15px_rgba(0,230,118,0.4)] group-hover:scale-110 transition-all duration-300">
                {b.icon}
              </div>
            </div>
            <div className="flex-1 mt-1 xl:mt-0">
              <h5 className="text-[#F7F3EC] font-semibold text-[13px] xl:text-sm mb-0.5 group-hover:text-[#00E676] transition-colors leading-tight">{b.title}</h5>
              <p className="text-[#888] text-[11px] xl:text-xs leading-relaxed">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Quote & Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between mt-8 xl:mt-10 px-4 md:px-8 xl:px-12"
      >
        <div className="flex items-start gap-4 max-w-lg mb-6 md:mb-0 text-center md:text-left">
          <span className="text-4xl text-[#E9781F] font-serif leading-none mt-1 hidden md:block">"</span>
          <div>
            <p className="text-[#F7F3EC] text-lg xl:text-xl font-serif mb-2 leading-relaxed">
              When you grow from the inside out,<br className="hidden md:block" /> light shines from within.
            </p>
            <p className="text-[#888] text-xs xl:text-sm italic">
              – Surya Is The Greatest Healer
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 xl:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full border border-[#E9781F]/30 bg-[#E9781F]/10 flex items-center justify-center text-[#E9781F] shadow-[0_0_10px_rgba(233,120,31,0.15)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="xl:w-6 xl:h-6">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <div>
              <p className="text-[#F7F3EC] text-xs xl:text-sm font-semibold tracking-wide">Best time to practice</p>
              <p className="text-[#888] text-[10px] xl:text-xs mt-0.5">Early Morning: 4:30 AM – 7:00 AM</p>
            </div>
          </div>
          
          <div className="hidden sm:block w-[1px] h-10 bg-white/10 my-auto" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full border border-[#00E676]/30 bg-[#00E676]/10 flex items-center justify-center text-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.15)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="xl:w-6 xl:h-6">
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <div>
              <p className="text-[#F7F3EC] text-xs xl:text-sm font-semibold tracking-wide">Facing the Sun</p>
              <p className="text-[#888] text-[10px] xl:text-xs mt-0.5">East Direction</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
