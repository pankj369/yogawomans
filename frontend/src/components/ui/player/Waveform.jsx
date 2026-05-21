import { motion } from "framer-motion";

export default function Waveform({ isPlaying, barCount = 18 }) {
  const bars = Array.from({ length: barCount });

  return (
    <div className="flex items-center justify-center gap-1.5 h-16 px-4">
      {bars.map((_, i) => {
        // Vary default heights for organic look
        const defaultHeight = 12 + (i % 4) * 8 + Math.sin(i) * 6;
        
        return (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-wellness-green via-[#a0bca1] to-wellness-orange"
            style={{
              height: defaultHeight,
              boxShadow: "0 0 10px rgba(47, 107, 59, 0.15)",
            }}
            animate={
              isPlaying
                ? {
                    height: [
                      defaultHeight,
                      Math.max(8, defaultHeight * 2.2),
                      Math.max(6, defaultHeight * 0.4),
                      defaultHeight,
                    ],
                  }
                : {
                    height: defaultHeight,
                  }
            }
            transition={
              isPlaying
                ? {
                    duration: 1.2 + (i % 3) * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.05,
                  }
                : {
                    type: "spring",
                    stiffness: 100,
                  }
            }
          />
        );
      })}
    </div>
  );
}
