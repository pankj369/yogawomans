import { motion } from "framer-motion";

export default function BenefitsRow() {
  const benefits = [
    { 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ), 
      title: "Strengthens Heart", desc: "Improves circulation and cardiovascular health." 
    },
    { 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v4" />
          <path d="M12 8c-3-2-6-1-8 2 0 4 3 8 8 10 5-2 8-6 8-10-2-3-5-4-8-2Z" />
          <path d="M9 11c-1 1-1 3 0 4" />
          <path d="M15 11c1 1 1 3 0 4" />
        </svg>
      ), 
      title: "Better Breathing", desc: "Expands lung capacity and oxygen flow." 
    },
    { 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C12 2 9 6 9 10C9 14 12 16 12 16C12 16 15 14 15 10C15 6 12 2 12 2Z"/>
          <path d="M12 16C12 16 8 18 5 15C2 12 4 8 4 8C4 8 7 11 9 12C11 13 12 16 12 16Z"/>
          <path d="M12 16C12 16 16 18 19 15C22 12 20 8 20 8C20 8 17 11 15 12C13 13 12 16 12 16Z"/>
          <path d="M12 22C12 22 9 22 7 20C5 18 6 16 6 16C6 16 8 17 10 18C11 18.5 12 22 12 22Z"/>
          <path d="M12 22C12 22 15 22 17 20C19 18 18 16 18 16C18 16 16 17 14 18C13 18.5 12 22 12 22Z"/>
        </svg>
      ), 
      title: "Calms The Mind", desc: "Reduces stress and brings inner balance." 
    },
    { 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      ), 
      title: "Boosts Metabolism", desc: "Activates digestive fire and burns calories." 
    },
    { 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8" />
          <path d="M8.5 12h7" />
        </svg>
      ), 
      title: "Builds Immunity", desc: "Strengthens body's natural defense system." 
    },
  ];

  return (
    <div className="w-full mt-12 z-30 pointer-events-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 bg-[#0F2E1D]/20 border border-white/5 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-xl">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-default text-center md:text-left group"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center">
              {/* Ambient glowing aura */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-[#1E7A46]/30 blur-md group-hover:bg-[#00E676]/40 transition-colors duration-500"
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />
              {/* Glassmorphism Border Container */}
              <div className="relative z-10 w-full h-full rounded-full border-[1.5px] border-[#1E7A46]/60 bg-gradient-to-br from-[#0F2E1D]/90 to-[#0A0A0A] backdrop-blur-md flex items-center justify-center text-[#E9781F] group-hover:text-[#00E676] group-hover:border-[#00E676] group-hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] group-hover:scale-110 transition-all duration-300">
                {/* SVG scaling inside container */}
                <div className="scale-110 md:scale-150 transition-transform duration-300">
                  {b.icon}
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-[#F7F3EC] font-semibold text-sm md:text-base mb-1 group-hover:text-[#00E676] transition-colors">{b.title}</h5>
              <p className="text-[#888] text-xs leading-relaxed">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Quote & Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex flex-col md:flex-row items-center justify-between mt-12 px-4 md:px-12"
      >
        <div className="flex items-start gap-4 max-w-lg mb-8 md:mb-0">
          <span className="text-4xl text-[#E9781F] font-serif leading-none mt-1">"</span>
          <div>
            <p className="text-[#F7F3EC] text-lg md:text-2xl font-serif mb-3 leading-relaxed">
              When you grow from the inside out,<br />light shines from within.
            </p>
            <p className="text-[#888] text-sm italic">
              – Surya Is The Greatest Healer
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#E9781F]/30 bg-[#E9781F]/10 flex items-center justify-center text-[#E9781F]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <div>
              <p className="text-[#F7F3EC] text-sm font-semibold">Best time to practice</p>
              <p className="text-[#888] text-xs">Early Morning: 4:30 AM – 7:00 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#00E676]/30 bg-[#00E676]/10 flex items-center justify-center text-[#00E676]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <div>
              <p className="text-[#F7F3EC] text-sm font-semibold">Facing the Sun</p>
              <p className="text-[#888] text-xs">East Direction</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
