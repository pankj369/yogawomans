import { motion } from "framer-motion";
import { staggerContainer } from "../../../utils/animations";

export default function WellnessHero({ children, className = "", id = "hero" }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer(0.12, 0.05)}
      className={`relative w-full overflow-hidden rounded-[2.5rem] bg-black shadow-2xl ${className}`}
    >
      {children}
    </motion.section>
  );
}
