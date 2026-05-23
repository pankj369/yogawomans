import { useState, useEffect } from "react";
import heroBackground from "../../assets/images/herobg.png";
import defaultHeroVideo from "../../assets/videos/111097-689925374.mp4";
import { Play, Wind, Activity } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

// Import reusable hero architecture
import WellnessHero from "../ui/hero/WellnessHero";
import VideoBackground from "../ui/background/VideoBackground";
import AmbientGlow from "../ui/hero/AmbientGlow";
import HeroOverlay from "../ui/hero/HeroOverlay";
import HeroContent from "../ui/hero/HeroContent";
import HeroActions from "../ui/hero/HeroActions";
import FloatingStatCard from "../ui/cards/FloatingStatCard";

export default function HeroBanner({
  userName,
  lastSession: propLastSession,
  onResumeSession,
  onExplorePrograms,
  sectionTitle,
  videoSrc,
  description,
  primaryLabel = "Resume Session",
  secondaryLabel = "Explore Programs",
  stats,
  overlayVariant = "cinematicDark",
}) {
  const [isReturning, setIsReturning] = useState(false);
  const { state, lastSession: contextLastSession } = useDashboard() || {};

  useEffect(() => {
    const hasVisited = localStorage.getItem("yogawomans_has_visited");
    if (hasVisited) {
      setIsReturning(true);
    } else {
      localStorage.setItem("yogawomans_has_visited", "true");
    }
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const activeLastSession = propLastSession || contextLastSession;
  const streakDays = state?.streakDays ?? 6;

  const defaultDescription = activeLastSession
    ? `Resume "${activeLastSession.title}" or explore something new — your practice awaits.`
    : "Your wellness sanctuary is ready. Begin your practice whenever you are.";

  // Determine user-friendly personalized greeting
  const displayTitle = sectionTitle === "Morning sanctuary" || !sectionTitle
    ? `${isReturning ? "Welcome back" : "Welcome"}, ${userName}`
    : `${userName}`;

  // Render stats cards reactively if not explicitly passed
  const renderedStats = stats || [
    {
      id: "meditation-card",
      label: "Daily Calm",
      value: activeLastSession?.title || "Guided Meditation",
      subtext: `${activeLastSession?.duration || 12} min completed`,
      icon: Play,
      progress: 68,
      delay: 0.3,
    },
    {
      id: "streak-card",
      label: "Wellness Streak",
      value: `${streakDays} Days`,
      subtext: "You're on a roll!",
      icon: Activity,
      progress: 85,
      delay: 0.45,
      className: "sm:ml-8 lg:ml-10",
    },
  ];

  return (
    <WellnessHero className="min-h-[440px] sm:min-h-[500px]">
      
      {/* ── Background System ── */}
      <VideoBackground
        videoSrc={videoSrc || defaultHeroVideo}
        posterSrc={heroBackground}
        overlay="none" // We handle overlay explicitly via HeroOverlay below
      />
      <AmbientGlow />
      <HeroOverlay variant={overlayVariant} opacity={95} />

      {/* ── Content Grid ── */}
      <div className="relative z-20 grid h-full w-full gap-10 px-6 py-10 sm:px-12 sm:py-16 lg:grid-cols-[1fr_340px] lg:items-center xl:grid-cols-[1fr_380px]">
        
        {/* Left: Cinematic Text & Actions */}
        <div className="flex flex-col justify-center">
          <HeroContent
            greeting={sectionTitle || greeting}
            userName={displayTitle}
            description={description || defaultDescription}
          />
          <HeroActions
            primaryLabel={primaryLabel}
            onPrimaryClick={onResumeSession}
            secondaryLabel={secondaryLabel}
            onSecondaryClick={onExplorePrograms}
          />
        </div>

        {/* Right: Floating Glass Widgets */}
        <div className="flex flex-col gap-5 justify-center mt-6 lg:mt-0">
          {renderedStats.map((card, idx) => (
            <FloatingStatCard
              key={card.id || idx}
              label={card.label}
              value={card.value}
              subtext={card.subtext}
              icon={card.icon}
              progress={card.progress}
              delay={card.delay}
              className={card.className}
            />
          ))}
        </div>

      </div>
    </WellnessHero>
  );
}
