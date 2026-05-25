import { motion } from "framer-motion";

export default function LeftContentPanel() {
  return (
    <div className="flex flex-col justify-center h-full w-full z-30 pointer-events-auto items-center xl:items-start text-center xl:text-left">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="inline-block px-3 py-1 border border-[#1E7A46] rounded-full bg-[#1E7A46]/10 mb-6">
          <p className="text-[#00E676] text-xs font-bold tracking-widest uppercase">
            THE SCIENCE OF SUN & YOU
          </p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-serif text-[#F7F3EC] leading-none mb-6">
          Surya<br />
          Namaskar
        </h2>
        
        <div className="flex items-center justify-center w-12 h-12 mb-6">
          <span className="text-[#E9781F] text-3xl">🪷</span>
        </div>
        
        <h3 className="text-xl md:text-2xl text-[#F7F3EC] font-semibold leading-relaxed mb-4">
          12 Steps to Align Your Body,<br />Mind & Energy
        </h3>
        
        <p className="text-[#888] text-sm md:text-base leading-relaxed mb-10 max-w-sm">
          Experience the timeless flow that energizes your body, calms your mind and connects you with the power of the sun.
        </p>

        <button className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#E9781F] text-[#E9781F] hover:bg-[#E9781F] hover:text-[#0A0A0A] transition-all duration-300 group mx-auto xl:mx-0">
          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs group-hover:bg-[#0A0A0A] group-hover:text-[#E9781F] transition-all">
            ▶
          </span>
          <span className="font-semibold uppercase tracking-wider text-sm">Watch Full Flow</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 xl:mt-auto p-5 md:p-6 rounded-2xl bg-[#0F2E1D]/40 border border-white/5 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-start gap-4 mx-auto xl:mx-0 max-w-sm"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1E7A46]/20 flex items-center justify-center border border-[#1E7A46]/50">
          <span className="text-2xl">🔬</span>
        </div>
        <div className="text-center sm:text-left">
          <h4 className="text-[#F7F3EC] font-semibold mb-1">Ancient Wisdom,<br className="hidden sm:block" />Modern Science</h4>
          <p className="text-[#888] text-xs leading-relaxed">
            Backed by research. Loved by millions worldwide.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
