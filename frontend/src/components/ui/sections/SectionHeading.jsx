import { motion } from "framer-motion";
import { fadeUp } from "../../../utils/animations";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  animate = false,
  className = "",
}) {
  const alignmentClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
  
  const content = (
    <div className={`${alignmentClass} ${className}`}>
      {eyebrow && (
        <p className="text-label">{eyebrow}</p>
      )}
      <h2 className="mt-1 text-section-heading">{title}</h2>
      {description && (
        <p className="mt-2 text-body max-w-2xl">{description}</p>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div variants={fadeUp}>
        {content}
      </motion.div>
    );
  }

  return content;
}
