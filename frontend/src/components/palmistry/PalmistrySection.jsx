import { motion } from "framer-motion";
import PalmistryLeftContent from "./PalmistryLeftContent";
import GlowingHand from "./GlowingHand";
import PalmistryRightPanel from "./PalmistryRightPanel";
import PalmistryStatsRow from "./PalmistryStatsRow";

export default function PalmistrySection() {
  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden py-24 z-10 font-sans">
      
      {/* Ambient Background Effects (Darker, subtler, starry like reference) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle green star-like particles could be added here, we'll use a CSS pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: "radial-gradient(#00E676 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[#1E7A46]/10 blur-[150px] mix-blend-screen" />
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full bg-[#D4A64F]/5 blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: Content & Hero Hand */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center mb-16 lg:mb-24">
          
          {/* LEFT: Content & Titles */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 xl:col-span-4 lg:pr-4 z-20"
          >
            <PalmistryLeftContent />
          </motion.div>

          {/* RIGHT/CENTER: Glowing Hand Visualization (Hero) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-8 flex items-center justify-center min-h-[500px] lg:min-h-[700px] z-10"
          >
            <GlowingHand />
          </motion.div>

        </div>

        {/* BOTTOM SECTION: Upload & Analysis Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-5xl mx-auto z-30 relative"
        >
          <PalmistryRightPanel />
        </motion.div>

        {/* BOTTOM: Stats Footer */}
        <PalmistryStatsRow />

      </div>
    </section>
  );
}
