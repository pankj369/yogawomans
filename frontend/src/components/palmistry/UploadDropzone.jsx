import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useToast } from "../../context/ToastContext";

export default function UploadDropzone({ onFileSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  const validateAndSelectFile = (file) => {
    if (!file) return;

    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      showToast({ 
        type: "error", 
        title: "Invalid File Type", 
        message: "Please upload a JPG, PNG, or WEBP image." 
      });
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast({ 
        type: "error", 
        title: "File Too Large", 
        message: "Maximum upload size is 5MB." 
      });
      return;
    }

    onFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Animated Glow Behind Dropzone */}
        <motion.div 
          className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00E676] to-[#1E7A46] blur-xl transition-opacity duration-500 ${
            isDragActive || isHovered ? "opacity-40" : "opacity-0"
          }`}
          animate={{ scale: isHovered || isDragActive ? 1.02 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Dropzone Container */}
        <div className={`relative w-full py-6 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center transition-all duration-300 ${
          isDragActive 
            ? "border-[#00E676] bg-[#00E676]/10" 
            : "border-[#00E676]/60 bg-transparent group-hover:border-[#00E676] group-hover:bg-[#00E676]/5"
        }`}>
          
          <div className="relative z-10 flex flex-col items-center gap-2">
            {/* Upload Icon */}
            <motion.div 
              animate={{ y: isHovered || isDragActive ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-[#00E676] drop-shadow-[0_0_8px_rgba(0,230,118,0.4)]"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </motion.div>

            <div>
              <p className="text-[#F7F3EC] text-xs xl:text-sm font-medium group-hover:text-white transition-colors">
                Drag & Drop your palm image here <br/> or click to upload
              </p>
              <p className="text-[#888] text-[10px] mt-1 group-hover:text-gray-400 transition-colors uppercase tracking-wider">
                JPG, PNG, WEBP up to 5MB
              </p>
            </div>
          </div>
        </div>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/png, image/jpeg, image/webp" 
        className="hidden" 
      />
    </div>
  );
}
