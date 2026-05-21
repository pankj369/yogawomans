import { motion } from "framer-motion";

export default function AmbientGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] rounded-full bg-wellness-orange mix-blend-screen blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[80%] rounded-full bg-wellness-green mix-blend-screen blur-[140px]"
      />
    </div>
  );
}
