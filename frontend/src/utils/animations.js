/**
 * Centralized Framer Motion animation presets for the Wellness Design System.
 * Use these across components for consistent movement and timing.
 */

export const easings = {
  spring: [0.22, 1, 0.36, 1],
  smooth: [0.4, 0, 0.2, 1],
  bounce: { type: "spring", stiffness: 260, damping: 24 },
  gentle: { type: "spring", stiffness: 100, damping: 20 },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: easings.spring } 
  },
  exit: { 
    opacity: 0, 
    y: -12, 
    transition: { duration: 0.3, ease: easings.smooth } 
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: 24 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: easings.spring } 
  },
};

export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -6, 
    scale: 1.015, 
    transition: { duration: 0.2, ease: "easeOut" } 
  },
};

export const floatingAnimation = {
  rest: { y: 0 },
  float: { 
    y: [-5, 5, -5], 
    transition: { 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut" 
    } 
  },
};

export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.45, ease: easings.spring } 
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easings.smooth } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const itemFade = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  closed: { opacity: 0, x: -10, transition: { duration: 0.2 } },
};

export const shimmer = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration: 1.5,
    },
  },
};

export const pressScale = {
  rest: { scale: 1 },
  tap: { scale: 0.96, transition: { duration: 0.1, ease: "easeOut" } },
};

export const emptyStateReveal = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: easings.smooth, delay: 0.1 } 
  },
};


