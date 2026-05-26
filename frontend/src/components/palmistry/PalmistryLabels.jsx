import { motion } from "framer-motion";

export default function PalmistryLabels() {
  const palmLines = [
    { name: "Heart Line", desc: "Emotions & Love", icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
    { name: "Head Line", desc: "Mind & Wisdom", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" },
    { name: "Life Line", desc: "Vitality & Energy", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
    { name: "Fate Line", desc: "Destiny & Path", icon: "M12 2L2 22h20L12 2zm0 4.5l5.5 11h-11L12 6.5z" },
    { name: "Sun Line", desc: "Success & Joy", icon: "M12 2.5v2m0 15v2m9.5-9.5h-2m-15 0h-2m13.79-6.79l-1.42 1.42m-11.32 0l-1.42-1.42m14.15 14.15l-1.41-1.41m-11.32 0l-1.41 1.41M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" },
    { name: "Health Line", desc: "Wellness & Balance", icon: "M12 22C12 22 4 16 4 10C4 5.5 8 2 12 2C16 2 20 5.5 20 10C20 16 12 22 12 22ZM12 10C12 10 8 12 4 10M12 10C12 10 16 12 20 10" },
  ];

  return (
    <div className="w-full max-w-[280px] xl:max-w-[300px] flex flex-col gap-4 xl:gap-5 justify-center">
      {palmLines.map((line, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + (idx * 0.1), duration: 0.6 }}
          className="flex items-center gap-3 xl:gap-4 group cursor-default"
        >
          {/* Connector Line Element */}
          <div className="hidden lg:block w-6 xl:w-10 h-[1px] bg-gradient-to-r from-transparent via-[#D4A64F]/30 to-[#D4A64F]/60 group-hover:via-[#00E676]/50 group-hover:to-[#00E676] transition-colors shrink-0" />
          
          {/* Icon */}
          <div className="w-9 h-9 xl:w-11 xl:h-11 rounded-full border border-[#D4A64F]/40 flex items-center justify-center text-[#D4A64F] group-hover:border-[#00E676] group-hover:text-[#0A0A0A] group-hover:bg-[#00E676] group-hover:shadow-[0_0_15px_rgba(0,230,118,0.5)] transition-all duration-300 shrink-0 bg-[#0A0A0A]/85">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 xl:w-5 xl:h-5">
              <path d={line.icon} />
            </svg>
          </div>
          
          {/* Text Content */}
          <div className="flex flex-col">
            <span className="text-[#F7F3EC] font-semibold text-[13px] xl:text-[15px] group-hover:text-[#00E676] transition-colors leading-tight mb-0.5 tracking-wide">{line.name}</span>
            <span className="text-[#888] text-[11px] xl:text-xs leading-tight">{line.desc}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
