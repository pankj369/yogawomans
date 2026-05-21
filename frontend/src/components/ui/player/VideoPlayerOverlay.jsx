import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMedia } from "../../../context/MediaContext";
import VideoPlayer from "./VideoPlayer";

export default function VideoPlayerOverlay() {
  const { activeVideo, closeVideo } = useMedia();

  // Escape key to close player
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeVideo();
      }
    };
    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent body scrolling when video is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideo, closeVideo]);

  return (
    <AnimatePresence>
      {activeVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 md:p-8"
        >
          {/* Background Close Click */}
          <div 
            className="absolute inset-0 z-0 cursor-default" 
            onClick={closeVideo} 
          />

          {/* Video Player Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="relative z-10 w-full max-w-5xl aspect-video bg-black shadow-2xl overflow-hidden md:rounded-3xl"
          >
            <VideoPlayer video={activeVideo} onClose={closeVideo} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
