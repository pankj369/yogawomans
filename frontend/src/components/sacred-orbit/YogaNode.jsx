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
            className={`relative z-20 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-[1.5px] overflow-hidden flex items-center justify-center backdrop-blur-md transition-all duration-300 ${isActive ? 'bg-[#0A0A0A] border-[#E9781F] scale-110 shadow-[0_0_25px_rgba(233,120,31,0.6)]' : 'bg-[#0F2E1D]/80 border-[#1E7A46] group-hover:scale-105 group-hover:border-[#00E676]/50'}`}
          >
            {/* Real image will go here. Using icon as placeholder */}
            <span className="text-xl md:text-3xl opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true">{data.icon}</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
