import { suryaNamaskarFlow } from "./suryaNamaskarData";
import YogaNode from "./YogaNode";

export default function RotatingOrbit({ activeNode, setActiveNode, isHovered, setIsHovered }) {
  return (
    <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] mx-auto z-20">
      
      {/* 
        The Orbit Ring Graphic
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          style={{
            animation: isHovered ? "none" : "yoga-spin 120s linear infinite",
          }}
        >
          {/* Outer dashed ring */}
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="rgba(233, 120, 31, 0.3)" // Orange glow
            strokeWidth="0.3"
            strokeDasharray="1 2"
          />
          {/* Inner solid ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(0, 230, 118, 0.15)"
            strokeWidth="0.2"
          />
        </svg>
      </div>

      {/* 
        The Rotating Container for Nodes
      */}
      <div 
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          animation: isHovered ? "none" : "yoga-spin 120s linear infinite",
        }}
      >
        
        {suryaNamaskarFlow.map((nodeData, index) => {
          // Adjust angle so Pranamasana (node 0) starts near the top (e.g. -90 degrees)
          const angle = (index / 12) * 360 - 90;
          return (
            <YogaNode
              key={nodeData.phase}
              data={nodeData}
              angle={angle}
              isActive={activeNode?.phase === nodeData.phase}
              onHover={(data) => {
                setIsHovered(true);
                setActiveNode(data);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setActiveNode(null);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
