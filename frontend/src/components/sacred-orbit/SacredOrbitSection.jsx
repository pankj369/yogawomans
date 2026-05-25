import { useState } from "react";
import CenterLotus from "./CenterLotus";
import RotatingOrbit from "./RotatingOrbit";
import AmbientParticles from "./AmbientParticles";
import LeftContentPanel from "./LeftContentPanel";
import RightInfoPanel from "./RightInfoPanel";
import BenefitsRow from "./BenefitsRow";

// Inject required global styles for infinite spin and counter-spin
if (!document.head.querySelector("[data-sacred-orbit]")) {
  const s = document.createElement("style");
  s.setAttribute("data-sacred-orbit", "true");
  s.textContent = `
    @keyframes yoga-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes yoga-counter-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    
    .yoga-node-counter-rotate {
      animation: yoga-counter-spin 120s linear infinite;
    }
    
    /* Pause animations when hovered */
    .sacred-orbit-hovered [style*="yoga-counter-spin"],
    .sacred-orbit-hovered [style*="yoga-spin"] {
      animation-play-state: paused !important;
    }

    /* Set custom orbit radii for different screen sizes */
    .sacred-orbit-container {
      --orbit-radius: 140px;
    }
    @media (min-width: 640px) {
      .sacred-orbit-container {
        --orbit-radius: 200px;
      }
    }
    @media (min-width: 768px) {
      .sacred-orbit-container {
        --orbit-radius: 250px;
      }
    }
    @media (min-width: 1024px) {
      .sacred-orbit-container {
        --orbit-radius: 300px;
      }
    }
  `;
  document.head.appendChild(s);
}

export default function SacredOrbitSection() {
  const [activeNode, setActiveNode] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden py-16 md:py-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F2E1D] via-[#0A0A0A] to-[#0A0A0A] opacity-90 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1E7A46]/10 rounded-full blur-[150px] pointer-events-none z-0" />
      
      {/* Floating Particles */}
      <AmbientParticles />

      <div className={`relative w-full max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12 z-10 flex flex-col sacred-orbit-container ${isHovered ? 'sacred-orbit-hovered' : ''}`}>
        
        {/* Top 3-Column Layout */}
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-8 items-center justify-between w-full">
          
          {/* Left Panel */}
          <div className="w-full md:w-2/3 xl:w-[320px] 2xl:w-[380px] flex justify-center xl:justify-start flex-shrink-0 order-1 xl:order-1">
            <LeftContentPanel />
          </div>

          {/* Center Orbit */}
          <div className="relative flex-grow flex justify-center items-center w-full min-h-[400px] sm:min-h-[550px] md:min-h-[700px] order-2 xl:order-2 my-12 xl:my-0">
             
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <CenterLotus />
             </div>

             <RotatingOrbit 
               activeNode={activeNode} 
               setActiveNode={setActiveNode} 
               isHovered={isHovered}
               setIsHovered={setIsHovered}
             />
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-2/3 xl:w-[320px] 2xl:w-[380px] flex justify-center xl:justify-end flex-shrink-0 order-3 xl:order-3">
            <RightInfoPanel />
          </div>

        </div>

        {/* Bottom Benefits Row & Footer Text */}
        <BenefitsRow />

      </div>
    </section>
  );
}
