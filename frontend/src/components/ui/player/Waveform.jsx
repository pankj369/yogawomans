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
            className="w-1.5 rounded-full bg-gradient-to-t from-[#8FA68E] to-[#E27229]"
            style={{
              height: defaultHeight,
              boxShadow: "0 0 10px rgba(143, 166, 142, 0.4)",
            }}
            animate={
              isPlaying
                ? {
                    height: [
                      defaultHeight,
                      defaultHeight * 1.8, // Inhale (4s)
                      defaultHeight * 1.8, // Hold (7s)
                      defaultHeight * 0.8, // Exhale (8s)
                      defaultHeight,
                    ],
                    opacity: [0.6, 1, 1, 0.5, 0.6]
                  }
                : {
                    height: defaultHeight,
                    opacity: 0.5
                  }
            }
            transition={
              isPlaying
                ? {
                    duration: 19, // 4 + 7 + 8
                    times: [0, 0.21, 0.58, 1, 1], // Timing mapped to 4-7-8 rhythm
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1, // Subtle wave ripple effect
                  }
                : {
                    type: "spring",
                    stiffness: 60,
                  }
            }
          />
        );
      })}
    </div>
  );
}
