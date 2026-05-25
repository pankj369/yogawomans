import { motion } from "framer-motion";
import UploadDropzone from "./UploadDropzone";
import FeatureCards from "./FeatureCards";

export default function PalmistryRightPanel() {
  return (
    <div className="w-full flex flex-col z-20">
      
      {/* Premium Glass Panel Wrapper */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full rounded-[32px] border border-[#1E7A46]/20 bg-gradient-to-b from-[#0A0A0A]/90 to-[#0F2E1D]/80 backdrop-blur-2xl p-6 md:p-10 lg:p-12 xl:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col gap-8 md:gap-12"
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-[#D4A64F]">✦</span>
          <h3 className="text-xl md:text-2xl font-serif text-[#F7F3EC]">Upload Your Palm</h3>
          <span className="text-[#D4A64F]">✦</span>
        </div>
        <p className="text-center text-[#888] text-sm md:text-base -mt-6">
          AI will analyze your energy patterns and reveal personalized insights just for you.
        </p>

        {/* Upload Zone */}
        <UploadDropzone />

        {/* Generous Spacing for Visual Hierarchy */}
        <div className="mt-8 mb-4 flex flex-col gap-8 w-full">
          {/* Features 3x2 Grid */}
          <FeatureCards />
        </div>

        {/* Action Button */}
        <button className="w-full py-4 mt-2 rounded-full bg-gradient-to-r from-[#1E7A46] to-[#00E676] hover:from-[#00E676] hover:to-[#00E676] text-[#0A0A0A] font-bold text-lg tracking-wide shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] transition-all duration-300 flex items-center justify-center gap-3 group">
          <span className="text-xl text-white group-hover:animate-spin">✦</span> GET MY PALM READING
        </button>

      </motion.div>

      {/* Trust Indicators Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center justify-center md:justify-between gap-4 px-6 pt-6 w-full"
      >
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span className="text-[#888] text-xs"><strong className="text-[#F7F3EC] block">AI Secured</strong> Advanced Encryption</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span className="text-[#888] text-xs"><strong className="text-[#F7F3EC] block">Privacy First</strong> Your data is safe</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span className="text-[#888] text-xs"><strong className="text-[#F7F3EC] block">Trusted by 50K+</strong> Wellness Seekers</span>
        </div>
      </motion.div>

    </div>
  );
}
