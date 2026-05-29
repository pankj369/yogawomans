import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquarePlus } from "lucide-react";
import FeedbackModal from "./FeedbackModal";

export default function FeedbackWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9990] flex items-center justify-center gap-2 px-5 py-3.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-sage-200 dark:border-sage-700 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group overflow-hidden"
        style={{
          boxShadow: '0 8px 32px rgba(167, 187, 172, 0.25)', // soft sage shadow
        }}
      >
        {/* Subtle pulse glow effect */}
        <div className="absolute inset-0 rounded-full bg-sage-400/20 dark:bg-sage-500/10 animate-ping opacity-20 pointer-events-none" style={{ animationDuration: '3s' }} />
        
        <MessageSquarePlus className="w-5 h-5 text-sage-600 dark:text-sage-400 group-hover:text-sage-700 transition-colors" />
        <span className="font-medium text-gray-800 dark:text-gray-200 text-sm hidden sm:inline-block">
          Feedback
        </span>
      </motion.button>

      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
