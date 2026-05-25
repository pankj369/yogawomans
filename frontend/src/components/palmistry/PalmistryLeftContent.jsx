import { motion } from "framer-motion";

export default function PalmistryLeftContent() {
  return (
    <div className="flex flex-col justify-center h-full gap-8 z-20">
      
      {/* Beta Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00E676]/30 bg-[#00E676]/10 backdrop-blur-md w-max"
      >
        <span className="text-[#00E676] text-xs font-semibold tracking-wider uppercase">AI PALM ENERGY ANALYSIS</span>
      </motion.div>
      
      {/* Main Title */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#F7F3EC] leading-tight tracking-tight"
      >
        Discover The Energy <br /> Hidden In Your Hands
      </motion.h2>

      {/* Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-[#888] text-lg max-w-md"
      >
        Ancient palm wisdom meets modern AI wellness.
      </motion.p>

      <div className="w-12 h-[1px] bg-[#D4A64F]/50 my-2" />

      {/* Feature List */}
      <div className="flex flex-col gap-6 mt-4">
        {/* Feature 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-start gap-4"
        >
          <div className="mt-1 text-[#D4A64F]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <h4 className="text-[#00E676] font-semibold text-base mb-1">AI-Powered Insights</h4>
            <p className="text-[#888] text-sm">Advanced AI reads your palm patterns with spiritual accuracy.</p>
          </div>
        </motion.div>

        {/* Feature 2 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-start gap-4"
        >
          <div className="mt-1 text-[#D4A64F]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>
          <div>
            <h4 className="text-[#00E676] font-semibold text-base mb-1">100% Private & Secure</h4>
            <p className="text-[#888] text-sm">Your images and data are fully encrypted and protected.</p>
          </div>
        </motion.div>

        {/* Feature 3 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-start gap-4"
        >
          <div className="mt-1 text-[#D4A64F]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-[#00E676] font-semibold text-base mb-1">Personalized Guidance</h4>
            <p className="text-[#888] text-sm">Get insights that help you align your mind, body and soul.</p>
          </div>
        </motion.div>
      </div>

      {/* Action Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <button className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#00E676]/40 bg-transparent hover:bg-[#00E676]/10 text-[#F7F3EC] transition-all duration-300 group">
          <div className="w-6 h-6 rounded-full border border-[#D4A64F] flex items-center justify-center text-[#D4A64F] group-hover:bg-[#D4A64F] group-hover:text-[#0A0A0A] transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-wide">HOW IT WORKS</span>
        </button>
      </motion.div>

    </div>
  );
}
