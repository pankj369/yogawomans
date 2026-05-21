export default function HeroOverlay({
  variant = "cinematic",
  opacity = 100
}) {
  const variants = {
    dark: "bg-black/60",
    gradient: "bg-gradient-to-t from-black/80 via-black/30 to-transparent",
    blur: "backdrop-blur-sm bg-black/40",
    cinematic: "bg-[linear-gradient(110deg,rgba(245,220,192,0.85)_0%,rgba(247,232,213,0.75)_34%,rgba(255,255,255,0.3)_100%)]",
    cinematicDark: "bg-[linear-gradient(110deg,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.05)_100%)]",
  };

  return (
    <>
      <div 
        className={`absolute inset-0 pointer-events-none ${variants[variant]}`}
        style={{ opacity: opacity / 100 }}
      />
      
      {/* Texture grain layer for organic feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}
