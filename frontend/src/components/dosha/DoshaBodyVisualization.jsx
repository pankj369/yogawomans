import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../../utils/animations";

export default function DoshaBodyVisualization({ activeDosha = null }) {
  const doshaKey = activeDosha?.toLowerCase() || "default";

  // Glow colors
  const glowColors = {
    vata: "rgba(100, 200, 255, 0.6)",
    pitta: "rgba(255, 120, 50, 0.6)",
    kapha: "rgba(100, 220, 150, 0.6)",
    default: "rgba(230, 210, 150, 0.3)",
  };
  const activeColor = glowColors[doshaKey];

  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden lg:h-[600px]">
      
      {/* Background Aura (Breathing Pulse) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 m-auto h-[320px] w-[320px] rounded-full blur-[90px]"
        style={{ backgroundColor: activeColor }}
      />

      {/* Futuristic Orbit Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 m-auto h-[420px] w-[420px] rounded-full border border-white/10 border-t-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 m-auto h-[500px] w-[500px] rounded-full border border-white/5 border-b-white/20 shadow-[0_0_30px_rgba(255,255,255,0.02)]"
      />

      {/* Silhouette SVG */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 h-[400px] w-[180px] lg:h-[500px] lg:w-[220px]"
      >
        <svg
          viewBox="0 0 100 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          {/* Main Abstract Silhouette */}
          <path
            d="M50 10C42 10 38 18 38 25C38 32 42 40 50 40C58 40 62 32 62 25C62 18 58 10 50 10Z 
               M50 45C35 45 25 55 25 70C25 80 30 110 35 140C40 170 45 220 45 230C45 235 48 240 50 240C52 240 55 235 55 230C55 220 60 170 65 140C70 110 75 80 75 70C75 55 65 45 50 45Z"
            fill="url(#bodyGradient)"
            stroke="url(#bodyOutline)"
            strokeWidth="0.5"
          />

          <AnimatePresence>
            {/* VATA: Nervous System Networks (Air/Ether) */}
            {doshaKey === "vata" && (
              <motion.g
                key="vata-nerves"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[
                  "M50 25 Q35 70 30 140",
                  "M50 25 Q65 70 70 140",
                  "M50 45 Q40 110 45 220",
                  "M50 45 Q60 110 55 220",
                  "M50 25 Q20 50 25 80",
                  "M50 25 Q80 50 75 80"
                ].map((path, i) => (
                  <motion.path
                    key={i}
                    d={path}
                    stroke="#64C8FF"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                    fill="none"
                    animate={{ strokeDashoffset: [20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="opacity-60 drop-shadow-[0_0_5px_#64C8FF]"
                  />
                ))}
              </motion.g>
            )}

            {/* PITTA: Metabolic Fire / Core Energy (Fire/Water) */}
            {doshaKey === "pitta" && (
              <motion.g
                key="pitta-core"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.ellipse
                  cx="50" cy="115" rx="15" ry="25"
                  fill="url(#pittaFire)"
                  className="mix-blend-screen"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.ellipse
                  cx="50" cy="115" rx="8" ry="15"
                  fill="#FFD200"
                  className="mix-blend-screen blur-[2px]"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.g>
            )}

            {/* KAPHA: Grounding Roots / Stability (Earth/Water) */}
            {doshaKey === "kapha" && (
              <motion.g
                key="kapha-roots"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[
                  "M45 230 Q40 240 30 250",
                  "M50 240 Q50 250 50 250",
                  "M55 230 Q60 240 70 250",
                  "M35 140 Q30 180 20 200",
                  "M65 140 Q70 180 80 200"
                ].map((path, i) => (
                  <motion.path
                    key={i}
                    d={path}
                    stroke="#64DC96"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    animate={{ pathLength: [0, 1], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                    className="drop-shadow-[0_0_8px_#64DC96]"
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Chakras / Energy Nodes (Always present but react to dosha) */}
          {[
            { cy: 25, color: "#e2b7f3", name: "Crown" },
            { cy: 55, color: "#9cbff9", name: "Throat" },
            { cy: 85, color: "#8df2c6", name: "Heart" },
            { cy: 115, color: "#f9e076", name: "Solar Plexus" }, // Pitta center
            { cy: 140, color: "#f7a972", name: "Sacral" },
            { cy: 165, color: "#f47373", name: "Root" }, // Kapha center
          ].map((node, i) => {
            // Highlight specific chakras based on dosha
            const isHighlighted = 
              (doshaKey === "vata" && (node.name === "Crown" || node.name === "Throat")) ||
              (doshaKey === "pitta" && node.name === "Solar Plexus") ||
              (doshaKey === "kapha" && (node.name === "Root" || node.name === "Sacral"));
            
            const scaleBase = isHighlighted ? 1.5 : 0.8;
            const opacityBase = isHighlighted ? 1 : 0.4;

            return (
              <motion.circle
                key={i}
                cx="50"
                cy={node.cy}
                r="3"
                fill={node.color}
                animate={{ 
                  opacity: [opacityBase, opacityBase + 0.5, opacityBase], 
                  scale: [scaleBase, scaleBase + 0.4, scaleBase] 
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                style={{ filter: `drop-shadow(0px 0px ${isHighlighted ? '8px' : '3px'} ${node.color})` }}
              />
            );
          })}

          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.04)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
            </linearGradient>
            <linearGradient id="bodyOutline" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
            </linearGradient>
            <radialGradient id="pittaFire" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF7832" />
              <stop offset="100%" stopColor="rgba(255, 120, 50, 0)" />
            </radialGradient>
          </defs>
        </svg>

        {/* Floating Ambient Particles over body */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -120, 0],
                x: [0, (Math.random() - 0.5) * 60, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 bottom-1/4 h-1 w-1 rounded-full bg-white mix-blend-screen"
              style={{
                left: `${35 + Math.random() * 30}%`,
                backgroundColor: activeColor.replace(/0\.\d+\)/, '1)'),
                filter: `blur(1px) drop-shadow(0 0 5px ${activeColor.replace(/0\.\d+\)/, '1)')})`
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
