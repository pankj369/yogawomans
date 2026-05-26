import { motion } from "framer-motion";
import PalmistryLeftContent from "./PalmistryLeftContent";
import GlowingHand from "./GlowingHand";
import PalmistryLabels from "./PalmistryLabels";
import PalmistryRightPanel from "./PalmistryRightPanel";
import PalmistryStatsRow from "./PalmistryStatsRow";

export default function PalmistrySection() {
  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden py-10 xl:py-16 flex flex-col justify-center z-10 font-sans">
      
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: "radial-gradient(#00E676 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[#1E7A46]/10 blur-[150px] mix-blend-screen" />
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full bg-[#D4A64F]/5 blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl xl:max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full flex flex-col">
        
        {/* TOP SECTION: 3-Zone Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-8 items-center mb-8 xl:mb-12">
          
          {/* LEFT: Content & Titles (~30%) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4 z-20 flex flex-col justify-center h-full"
          >
            <PalmistryLeftContent />
          </motion.div>

          {/* CENTER: Glowing Hand Visualization (~40%) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-4 flex items-center justify-center min-h-[350px] sm:min-h-[450px] xl:min-h-[500px] z-10 relative"
          >
            <GlowingHand />
          </motion.div>

          {/* RIGHT: Palm Labels (~30%) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="hidden lg:flex lg:col-span-4 z-20 justify-center lg:justify-end xl:pl-4"
          >
            <PalmistryLabels />
          </motion.div>

        </div>

        {/* BOTTOM SECTION: Upload & Analysis Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-4xl mx-auto z-30 relative"
        >
          <PalmistryRightPanel />
        </motion.div>

        {/* BOTTOM: Stats Footer */}
        <div className="mt-6 xl:mt-8">
          <PalmistryStatsRow />
        </div>

      </div>
    </section>
  );
}
