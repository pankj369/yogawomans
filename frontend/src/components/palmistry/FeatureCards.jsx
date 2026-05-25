import { motion } from "framer-motion";

const features = [
  {
    title: "Energy Balance",
    desc: "Understand your inner energy flow",
    icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" // Simplified Scales/Balance
  },
  {
    title: "Emotional Flow",
    desc: "Decode your emotional patterns",
    icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" // Heart
  },
  {
    title: "Stress Indicators",
    desc: "Identify stress & tension zones",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" // Mind/Head
  },
  {
    title: "Life Rhythm",
    desc: "Explore your life journey flow",
    icon: "M22 12h-4l-3 9L9 3l-3 9H2" // Wave/Pulse
  },
  {
    title: "Inner Strength",
    desc: "Reveal your inner power & resilience",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" // Shield
  },
  {
    title: "Wellness Potential",
    desc: "Unlock your natural healing potential",
    icon: "M12 22C12 22 4 16 4 10C4 5.5 8 2 12 2C16 2 20 5.5 20 10C20 16 12 22 12 22ZM12 10C12 10 8 12 4 10M12 10C12 10 16 12 20 10" // Lotus
  }
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          className="group flex flex-col items-center justify-center text-center p-4 rounded-xl border border-white/5 bg-[#0A0A0A]/40 hover:bg-[#1E7A46]/10 hover:border-[#00E676]/30 transition-all duration-300 cursor-default"
        >
          <div className="w-10 h-10 mb-3 text-[#00E676] flex items-center justify-center drop-shadow-[0_0_8px_rgba(0,230,118,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(0,230,118,0.8)] transition-all">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d={feature.icon} />
            </svg>
          </div>
          <h5 className="text-[#F7F3EC] font-medium text-sm mb-1 group-hover:text-white transition-colors">
            {feature.title}
          </h5>
          <p className="text-[#888] text-[11px] leading-tight group-hover:text-gray-300 transition-colors">
            {feature.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
