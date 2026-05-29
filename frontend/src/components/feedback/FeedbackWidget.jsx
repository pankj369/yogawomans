import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import FeedbackModal from "./FeedbackModal";

export default function FeedbackWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <style>
        {`
          @keyframes subtle-breathe {
            0%, 85%, 100% { box-shadow: 0 8px 30px rgba(212,175,55,0.06); }
            92% { box-shadow: 0 8px 40px rgba(212,175,55,0.2); }
          }
          .feedback-btn-premium {
            animation: subtle-breathe 25s ease-in-out infinite;
          }
        `}
      </style>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.5 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-[15px] right-4 md:bottom-6 md:right-6 z-[9990] flex items-center justify-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-full backdrop-blur-[16px] bg-[rgba(255,248,240,0.92)] hover:bg-[rgba(255,255,255,0.98)] border border-[rgba(212,175,55,0.15)] transition-all duration-300 hover:-translate-y-[2px] feedback-btn-premium cursor-pointer"
      >
        <Sparkles className="w-[14px] h-[14px] md:w-4 md:h-4 text-[#1E7A46]" strokeWidth={2} />
        <span className="font-heading font-medium text-[#2C2C2C] text-[13px] md:text-[14px] tracking-wide">
          Share Feedback
        </span>
      </motion.button>

      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
