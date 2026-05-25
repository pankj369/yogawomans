import { motion } from "framer-motion";
import { useState } from "react";

export default function UploadDropzone() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full">
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Glow Behind Dropzone */}
        <motion.div 
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00E676] to-[#1E7A46] opacity-0 blur-xl group-hover:opacity-40 transition-opacity duration-500"
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Dropzone Container */}
        <div className="relative w-full py-8 md:py-10 rounded-2xl border border-dashed border-[#00E676]/60 bg-transparent flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:border-[#00E676] group-hover:bg-[#00E676]/5">
          
          <div className="relative z-10 flex flex-col items-center gap-3">
            {/* Upload Icon */}
            <motion.div 
              animate={{ y: isHovered ? -3 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-[#00E676] drop-shadow-[0_0_10px_rgba(0,230,118,0.5)]"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </motion.div>

            <div>
              <p className="text-[#F7F3EC] text-sm md:text-base font-medium group-hover:text-white transition-colors">
                Drag & Drop your palm image here <br/> or click to upload
              </p>
              <p className="text-[#888] text-xs mt-2 group-hover:text-gray-400 transition-colors uppercase tracking-wider">
                JPG, PNG up to 10MB
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
