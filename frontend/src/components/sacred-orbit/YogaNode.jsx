import { motion } from "framer-motion";

export default function YogaNode({ data, angle, isHovered, onHover, onMouseLeave, isActive }) {
  // The bulletproof 3-layer coordinate system
  return (
    <div
      className="absolute top-1/2 left-1/2 w-0 h-0 z-20"
      style={{
        // LAYER 1: Position on Orbit
        // Push the node out to the orbit ring, then un-rotate to make it mathematically upright
        transform: `rotate(${angle}deg) translateX(var(--orbit-radius)) rotate(${-angle}deg)`,
      }}
      onMouseEnter={() => onHover(data)}
      onMouseLeave={onMouseLeave}
    >
      {/* LAYER 2: Counter-Rotation */}
      {/* This strictly cancels the parent orbit spin. No translations allowed here to avoid overrides! */}
      <div
        className="w-0 h-0"
        style={{
          animation: isHovered ? "none" : "yoga-counter-spin 120s linear infinite",
        }}
      >
        {/* LAYER 3: Visual Centering & Content */}
        {/* Uses negative translate to center the entire block perfectly over the coordinate origin */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto group cursor-pointer">
          
          {/* Node Image Container ONLY */}
          <div
            className={`relative z-20 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-[1.5px] overflow-hidden flex items-center justify-center backdrop-blur-md transition-all duration-300 ${isActive ? 'bg-[#0A0A0A] border-[#E9781F] scale-110 shadow-[0_0_25px_rgba(233,120,31,0.6)]' : 'bg-[#0F2E1D]/80 border-[#1E7A46] group-hover:scale-105 group-hover:border-[#00E676]/50'}`}
          >
            <img 
              src={new URL(`../../assets/images/surya/surya-step-${parseInt(data.phase, 10)}.png`, import.meta.url).href}
              alt={data.name}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" 
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}
