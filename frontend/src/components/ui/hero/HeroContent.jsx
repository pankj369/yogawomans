import { motion } from "framer-motion";
import { fadeUp } from "../../../utils/animations";

export default function HeroContent({ greeting, userName, description }) {
  return (
    <div className="max-w-2xl relative z-10">
      <motion.div variants={fadeUp} className="mt-3">
        {greeting && (
          <p className="text-sm sm:text-base font-semibold text-white/90 tracking-wide uppercase mb-2">
            {greeting}
          </p>
        )}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
          {userName}
        </h1>
      </motion.div>

      <motion.p variants={fadeUp} className="mt-5 max-w-lg text-base sm:text-lg text-white/95 leading-relaxed drop-shadow-sm font-medium">
        {description}
      </motion.p>
    </div>
  );
}
