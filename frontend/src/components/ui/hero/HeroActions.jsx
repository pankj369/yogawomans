import { motion } from "framer-motion";
import { fadeUp } from "../../../utils/animations";
import PremiumButton from "../buttons/PremiumButton";
import { Play, ArrowRight } from "lucide-react";

export default function HeroActions({ onPrimaryClick, primaryLabel, onSecondaryClick, secondaryLabel }) {
  return (
    <motion.div
      variants={fadeUp}
      className="mt-8 flex flex-col gap-4 sm:flex-row relative z-10"
    >
      <PremiumButton
        variant="primary"
        onClick={onPrimaryClick}
        icon={Play}
        className="!bg-white !text-wellness-dark hover:!bg-wellness-cream shadow-[0_10px_40px_rgba(255,255,255,0.25)]"
      >
        {primaryLabel}
      </PremiumButton>
      <PremiumButton
        variant="outline"
        onClick={onSecondaryClick}
        className="!border-white/40 !bg-white/10 !text-white hover:!bg-white/20 backdrop-blur-md"
      >
        {secondaryLabel}
        <ArrowRight className="ml-2" size={18} />
      </PremiumButton>
    </motion.div>
  );
}
