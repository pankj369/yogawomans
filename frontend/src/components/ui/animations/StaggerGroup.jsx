import { motion } from "framer-motion";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function StaggerGroup({ children, className = "", staggerDelay = 0.1, delayOffset = 0 }) {
  const customContainer = {
    ...containerVariants,
    show: {
      ...containerVariants.show,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayOffset,
      },
    }
  };

  return (
    <motion.div
      variants={customContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return <motion.div variants={itemVariants}>{child}</motion.div>;
        }
        return child;
      })}
    </motion.div>
  );
}
