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
      --orbit-radius: 130px;
    }
    @media (min-width: 640px) {
      .sacred-orbit-container {
        --orbit-radius: 180px;
      }
    }
    @media (min-width: 768px) {
      .sacred-orbit-container {
        --orbit-radius: 220px;
      }
    }
    @media (min-width: 1024px) {
      .sacred-orbit-container {
        --orbit-radius: 260px;
      }
    }
    @media (min-width: 1280px) {
      .sacred-orbit-container {
        --orbit-radius: 290px;
      }
    }
  `;
  document.head.appendChild(s);
}

export default function SacredOrbitSection({ isDashboard = false }) {
  const [activeNode, setActiveNode] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className={`relative w-full overflow-hidden flex flex-col justify-center ${
      isDashboard ? "py-4 bg-transparent" : "min-h-screen bg-[#0A0A0A] py-12 md:py-20 xl:py-16"
    }`}>
      {/* Background Gradients (only on standalone page) */}
      {!isDashboard && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F2E1D] via-[#0A0A0A] to-[#0A0A0A] opacity-90 z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] xl:w-[800px] h-[600px] xl:h-[800px] bg-[#1E7A46]/10 rounded-full blur-[120px] xl:blur-[150px] pointer-events-none z-0" />
          <AmbientParticles />
        </>
      )}
      
      <div className={`relative w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 z-10 flex flex-col sacred-orbit-container ${isHovered ? 'sacred-orbit-hovered' : ''}`}>
        
        {/* Top 3-Column Layout */}
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-6 items-center justify-between w-full">
          
          {/* Left Panel */}
          <div className="w-full xl:w-[320px] 2xl:w-[380px] flex justify-center xl:justify-start flex-shrink-0 order-1">
            <LeftContentPanel />
          </div>

          {/* Center Orbit */}
          <div className="relative flex-grow flex justify-center items-center w-full min-h-[380px] sm:min-h-[500px] md:min-h-[600px] xl:min-h-[650px] order-2 my-6 xl:my-0">
             
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <CenterLotus />
             </div>

             <div className="scale-95 md:scale-100 transition-transform duration-500">
               <RotatingOrbit 
                 activeNode={activeNode} 
                 setActiveNode={setActiveNode} 
                 isHovered={isHovered}
                 setIsHovered={setIsHovered}
               />
             </div>
          </div>

          {/* Right Panel */}
          <div className="w-full xl:w-[320px] 2xl:w-[380px] flex justify-center xl:justify-end flex-shrink-0 order-3">
            <RightInfoPanel />
          </div>

        </div>

        {/* Bottom Benefits Row & Footer Text */}
        <BenefitsRow />

      </div>
    </section>
  );
}
