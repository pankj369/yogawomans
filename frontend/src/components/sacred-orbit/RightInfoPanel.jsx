import { motion } from "framer-motion";

export default function RightInfoPanel() {
  const benefits = [
    "Improves flexibility & strength",
    "Enhances energy & immunity",
    "Supports weight management",
    "Boosts mental clarity",
    "Balances all body systems"
  ];

  return (
    <div className="flex flex-col justify-center h-full w-full z-30 pointer-events-auto gap-5 xl:gap-6 max-w-sm mx-auto xl:mx-0">
      
      {/* About Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-5 xl:p-6 rounded-3xl bg-[#0F2E1D]/40 border border-white/5 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-left"
      >
        <div className="flex items-center gap-3 mb-3 xl:mb-4">
          <span className="text-[#E9781F] text-lg xl:text-xl drop-shadow-[0_0_10px_rgba(233,120,31,0.3)]">☀️</span>
          <h4 className="text-lg xl:text-xl text-[#F7F3EC] font-serif leading-none mt-1">About Surya Namaskar</h4>
        </div>
        
        <p className="text-[#888] text-[13px] xl:text-sm leading-relaxed mb-5">
          Surya Namaskar is a complete yoga practice in itself. It's a combination of 12 powerful poses that work on your body, mind and breath.
        </p>

        <ul className="space-y-3 xl:space-y-3.5">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#00E676] text-xs mt-0.5">✔️</span>
              <span className="text-white/80 text-[13px] leading-tight">{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Today's Practice Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="p-5 xl:p-6 rounded-3xl bg-[#0F2E1D]/40 border border-white/5 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-left flex flex-col"
      >
        <div className="flex items-center gap-3 mb-5 xl:mb-6">
          <span className="text-[#E9781F] text-lg xl:text-xl drop-shadow-[0_0_10px_rgba(233,120,31,0.3)]">☀️</span>
          <h4 className="text-lg xl:text-xl text-[#F7F3EC] font-serif leading-none mt-1">Today's Practice</h4>
        </div>

        <div className="flex items-center justify-between mb-6 xl:mb-8 bg-[#0A0A0A]/30 p-3 rounded-2xl border border-white/5">
          <p className="text-white/70 text-[13px] font-medium">0 / 12 Steps Completed</p>
          <div className="w-12 h-12 rounded-full border-[3px] border-[#1E7A46] border-t-[#00E676] flex items-center justify-center shadow-[0_0_15px_rgba(0,230,118,0.2)]">
            <span className="text-[#F7F3EC] font-bold text-xs">0%</span>
          </div>
        </div>

        <button className="w-full py-3.5 xl:py-4 rounded-full bg-gradient-to-r from-[#1E7A46] to-[#00E676] text-[#0A0A0A] font-bold text-xs xl:text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(0,230,118,0.2)] hover:shadow-[0_0_25px_rgba(0,230,118,0.5)] transition-all duration-300 mb-3 xl:mb-4">
          Start Your Flow
        </button>

        <button className="w-full text-center text-[#E9781F] text-[11px] xl:text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors">
          View All Benefits ›
        </button>
      </motion.div>
    </div>
  );
}
