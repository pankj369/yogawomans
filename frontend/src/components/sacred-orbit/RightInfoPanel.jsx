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
    <div className="flex flex-col justify-center h-full w-full z-30 pointer-events-auto gap-6 max-w-md mx-auto xl:mx-0">
      
      {/* About Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="p-6 md:p-8 rounded-3xl bg-[#0F2E1D]/40 border border-white/5 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-left"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[#E9781F] text-xl">☀️</span>
          <h4 className="text-xl text-[#F7F3EC] font-serif">About Surya Namaskar</h4>
        </div>
        
        <p className="text-[#888] text-sm leading-relaxed mb-6">
          Surya Namaskar is a complete yoga practice in itself. It's a combination of 12 powerful poses that work on your body, mind and breath.
        </p>

        <ul className="space-y-4">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-[#00E676] text-sm mt-0.5">✔️</span>
              <span className="text-white/80 text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Today's Practice Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="p-6 md:p-8 rounded-3xl bg-[#0F2E1D]/40 border border-white/5 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-left"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[#E9781F] text-xl">☀️</span>
          <h4 className="text-xl text-[#F7F3EC] font-serif">Today's Practice</h4>
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-white/70 text-sm">0 / 12 Steps Completed</p>
          <div className="w-14 h-14 rounded-full border-2 border-[#1E7A46] border-t-[#00E676] flex items-center justify-center shadow-[0_0_15px_rgba(0,230,118,0.2)]">
            <span className="text-[#F7F3EC] font-bold text-sm">0%</span>
          </div>
        </div>

        <button className="w-full py-4 rounded-full bg-gradient-to-r from-[#1E7A46] to-[#00E676] text-[#0A0A0A] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,230,118,0.5)] transition-shadow duration-300 mb-4">
          Start Your Flow
        </button>

        <button className="w-full text-center text-[#E9781F] text-sm font-semibold uppercase tracking-wider hover:text-white transition-colors">
          View All Benefits ›
        </button>
      </motion.div>
    </div>
  );
}
