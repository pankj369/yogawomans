import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UploadDropzone from "./UploadDropzone";

export default function PalmistryRightPanel() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartReading = () => {
    if (user) {
      navigate("/dashboard/palmistry");
    } else {
      navigate("/login", { state: { returnTo: "/dashboard/palmistry" } });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col z-20 px-4 sm:px-0">
      
      {/* Premium Glass Panel Wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full rounded-[24px] border border-[#1E7A46]/20 bg-gradient-to-b from-[#0A0A0A]/90 to-[#0F2E1D]/80 backdrop-blur-2xl p-5 xl:p-6 shadow-[0_0_40px_rgba(0,0,0,0.4)] flex flex-col gap-4 xl:gap-5 mx-auto"
      >
        
        {/* 1. Upload Title */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#D4A64F] text-sm">✦</span>
          <h3 className="text-xl xl:text-2xl font-serif text-[#F7F3EC]">Upload Your Palm</h3>
          <span className="text-[#D4A64F] text-sm">✦</span>
        </div>
        
        {/* 2. Upload Subtitle */}
        <p className="text-center text-[#888] text-xs xl:text-sm -mt-3 max-w-md mx-auto">
          AI will analyze your energy patterns and reveal personalized insights just for you.
        </p>

        {/* 3. Upload Dropzone */}
        <div className="w-full max-w-xl mx-auto">
          <UploadDropzone />
        </div>

        {/* 4. Trust Indicators (Feature Cards equivalent) */}
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-3 px-2 pt-2 w-full max-w-xl mx-auto border-t border-[#1E7A46]/20 mt-1">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span className="text-[#888] text-[10px]"><strong className="text-[#F7F3EC] font-medium">AI Secured</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span className="text-[#888] text-[10px]"><strong className="text-[#F7F3EC] font-medium">Privacy First</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span className="text-[#888] text-[10px]"><strong className="text-[#F7F3EC] font-medium">Trusted by 50K+</strong></span>
          </div>
        </div>

        {/* 5. CTA Button */}
        <div className="w-full max-w-md mx-auto mt-2">
          <button 
            onClick={handleStartReading}
            className="w-full py-3 xl:py-3.5 rounded-full bg-gradient-to-r from-[#1E7A46] to-[#00E676] hover:from-[#00E676] hover:to-[#00E676] text-[#0A0A0A] font-bold text-sm xl:text-base tracking-wide shadow-[0_0_15px_rgba(0,230,118,0.2)] hover:shadow-[0_0_25px_rgba(0,230,118,0.5)] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span className="text-base text-white group-hover:animate-spin">✦</span> GET MY PALM READING
          </button>
        </div>

      </motion.div>
    </div>
  );
}
