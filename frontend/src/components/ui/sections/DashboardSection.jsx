import { motion } from "framer-motion";
import { staggerContainer } from "../../../utils/animations";

export default function DashboardSection({
  id,
  children,
  animate = true,
  className = "",
  ...props
}) {
  if (animate) {
    return (
      <motion.section
        id={id}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.1)}
        className={`wellness-section ${className}`}
        {...props}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <section id={id} className={`wellness-section ${className}`} {...props}>
      {children}
    </section>
  );
}
