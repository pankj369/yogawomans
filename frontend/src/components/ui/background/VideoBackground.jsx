import { motion } from "framer-motion";

/**
 * Reusable foundation for future immersive video backgrounds.
 * Supports fallback image, overlays, and responsive sizing.
 */
export default function VideoBackground({
  videoSrc,
  posterSrc,
  overlay = "dark", // "dark" | "light" | "cinematic" | "none"
  opacity = 0.4, // 0 to 1
  className = "",
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video / Poster layer */}
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          src={posterSrc}
          alt="Background"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      )}

      {/* Overlays */}
      {overlay !== "none" && (
        <div 
          className={`absolute inset-0 pointer-events-none ${
            overlay === "cinematic" 
              ? "bg-[linear-gradient(110deg,rgba(245,220,192,0.90)_0%,rgba(247,232,213,0.84)_34%,rgba(255,255,255,0.38)_100%)]" 
              : overlay === "light" ? "bg-white" : "bg-black"
          }`} 
          style={{ opacity: overlay === "cinematic" ? 1 : opacity }}
        />
      )}

      {/* Cinematic gradient & grain (common to premium feel) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(231,123,53,0.20),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(47,107,59,0.18),transparent_30%)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
