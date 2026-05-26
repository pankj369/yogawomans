import { motion } from "framer-motion";
import palmImage from "../../assets/images/palmimage.png";

const OrbitRing = ({ sizeClass, duration, reverse = false, styleClass }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <motion.div
      className={`rounded-full ${sizeClass} ${styleClass}`}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const EnergyPulse = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <motion.div
      className="w-[200px] sm:w-[250px] md:w-[350px] h-[200px] sm:h-[250px] md:h-[350px] rounded-full bg-gradient-to-tr from-[#1E7A46]/30 to-[#00E676]/10 blur-[40px] sm:blur-[60px] md:blur-[80px]"
      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const ParticleLayer = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <motion.div
      className="w-[250px] sm:w-[350px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] rounded-full relative"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-[15%] left-[15%] w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#D4A64F] blur-[1px] shadow-[0_0_15px_rgba(212,166,79,0.8)]" />
      <div className="absolute bottom-[20%] right-[10%] w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#00E676] blur-[1px] shadow-[0_0_10px_rgba(0,230,118,0.8)]" />
      <div className="absolute top-[60%] right-[5%] w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#E9781F] blur-[1px] shadow-[0_0_12px_rgba(233,120,31,0.8)]" />
    </motion.div>
  </div>
);

export default function GlowingHand() {
  return (
    <div className="relative w-full max-w-[500px] h-[480px] sm:h-[500px] xl:h-[540px] flex items-center justify-center mx-auto z-10">
      
      {/* Background Cinematic Orbit System */}
      <div className="absolute inset-0 z-0 scale-50 sm:scale-75 md:scale-90 xl:scale-100 flex items-center justify-center pointer-events-none">
        <EnergyPulse />
        
        {/* Deep background slow ring */}
        <OrbitRing 
          sizeClass="w-[450px] h-[450px]" 
          duration={60} 
          styleClass="border border-[#1E7A46]/30 border-dashed opacity-50" 
        />
        
        {/* Middle golden dotted ring */}
        <OrbitRing 
          sizeClass="w-[350px] h-[350px]" 
          duration={45} 
          reverse={true} 
          styleClass="border-[2px] border-[#D4A64F]/30 border-dotted opacity-70" 
        />

        {/* Inner solid glowing ring */}
        <OrbitRing 
          sizeClass="w-[280px] h-[280px]" 
          duration={30} 
          styleClass="border border-[#00E676]/40 opacity-80 shadow-[0_0_30px_rgba(0,230,118,0.15)_inset]" 
        />

        <ParticleLayer />
      </div>

      {/* Outer Sacred Circular Base */}
      <motion.div 
        className="absolute bottom-[-20px] w-[200px] sm:w-[300px] md:w-[400px] h-[80px] sm:h-[100px] md:h-[140px] rounded-[100%] border border-[#D4A64F]/30 bg-gradient-to-t from-[#D4A64F]/10 to-transparent flex items-center justify-center pointer-events-none z-0"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[150px] sm:w-[200px] md:w-[260px] h-[40px] sm:h-[50px] md:h-[70px] rounded-[100%] border border-[#00E676]/40 flex items-center justify-center drop-shadow-[0_0_10px_rgba(0,230,118,0.3)]">
           <div className="w-[60px] sm:w-[80px] md:w-[100px] h-[14px] sm:h-[18px] md:h-[24px] rounded-[100%] border border-[#E9781F]/50 bg-[#D4A64F]/50 blur-sm animate-pulse" />
        </div>
      </motion.div>

      {/* Main Hand Image Overlay */}
      <div className="relative z-10 w-[200px] h-[300px] sm:w-[280px] sm:h-[420px] md:w-[320px] md:h-[480px] xl:w-[360px] xl:h-[540px] flex items-center justify-center">
        {/* Palm Image */}
        <img 
          src={palmImage} 
          alt="Golden Palm" 
          className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,230,118,0.25)]"
        />
      </div>
      
    </div>
  );
}
