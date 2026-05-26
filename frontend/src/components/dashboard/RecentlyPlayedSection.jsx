import React from "react";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import { useDashboard } from "../../context/DashboardContext";
import { Play } from "lucide-react";

export default function RecentlyPlayedSection({ onOpenSession }) {
  const { recentlyPlayed } = useDashboard();

  if (!recentlyPlayed || recentlyPlayed.length === 0) return null;

  return (
    <DashboardSection id="recently-played">
      <SectionHeading
        animate
        eyebrow="Your Journey"
        title="Recently Opened"
        className="mb-6"
      />
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {recentlyPlayed.map((session) => (
          <button
            key={`recent-${session.id}`}
            onClick={() => onOpenSession(session)}
            className="group relative flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] border border-wellness-border bg-wellness-glass p-3 shadow-glass backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-1 hover:border-wellness-glow/30 hover:bg-white/5 hover:shadow-cardHover sm:w-[320px]"
          >
            <div className="relative h-36 w-full overflow-hidden rounded-2xl">
              <img
                src={session.image}
                alt={session.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wellness-glow/20 text-wellness-glow border border-wellness-glow/40 shadow-lg backdrop-blur-sm">
                  <Play size={20} className="ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-left">
              <h4 className="font-heading text-sm font-bold text-white group-hover:text-wellness-glow line-clamp-1 transition-colors">{session.title}</h4>
              <p className="mt-0.5 text-[0.7rem] uppercase tracking-wider text-wellness-muted font-medium">{session.instructor} • {session.duration} min</p>
            </div>
          </button>
        ))}
      </div>
    </DashboardSection>
  );
}
