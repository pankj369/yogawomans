import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Clock, Play, Sparkles, Volume2, CloudRain, Star } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import SessionCard from "../ui/cards/SessionCard";
import TrackCard from "../ui/cards/TrackCard";
import { useDashboard } from "../../context/DashboardContext";
import { useMedia } from "../../context/MediaContext";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { sleepStories, healingAudio } from "../../data/mentalHealthData";

export default function SleepSection() {
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = useDashboard();
  const { playTrack, playVideo, togglePlay, isPlaying } = useMedia();
  const hasProPlan = state?.activePlan === "Pro";

  // Sleep Timer States
  const [timerMinutes, setTimerMinutes] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Filter healingAudio for sleep-oriented items
  const sleepAudio = healingAudio.filter(
    (track) => track.category === "Sleep Sounds" || track.category === "Nature Ambience"
  );

  useEffect(() => {
    let interval = null;
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (timerActive && secondsLeft === 0) {
      setTimerActive(false);
      if (isPlaying) {
        togglePlay(); // Auto-pause playing audio
      }
      toast.showToast({
        type: "success",
        title: "Sleep Timer Complete",
        message: "Your wind-down session has ended. Rest well.",
      });
    }
    return () => clearInterval(interval);
  }, [timerActive, secondsLeft, isPlaying, togglePlay, toast]);

  const handleStartTimer = () => {
    if (timerActive) {
      setTimerActive(false);
    } else {
      setSecondsLeft(timerMinutes * 60);
      setTimerActive(true);
      toast.showToast({
        title: "Sleep Timer Started",
        message: `Audio will auto-pause in ${timerMinutes} minutes.`,
      });
    }
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    setSecondsLeft(0);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const handleStoryClick = (story) => {
    if (story.premium && !hasProPlan) {
      toast.showToast({
        type: "warning",
        title: "Premium Sleep Story",
        message: "Please upgrade to unlock sleep stories.",
      });
      navigate("/pricing");
      return;
    }
    playTrack(story);
    toast.showToast({ title: "Playing Story", message: `Loading ${story.title}...` });
  };

  return (
    <div className="space-y-12">
      {/* Night Sanctuary & Sleep Timer Widget */}
      <DashboardSection id="sleep-sanctuary">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Sleep Welcome Card */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-8 text-white shadow-glass backdrop-blur-[18px]">
            {/* Soft decorative stars */}
            <div className="absolute inset-0 opacity-30">
              <Star className="absolute top-8 left-12 text-yellow-200 animate-pulse" size={12} />
              <Star className="absolute top-24 right-16 text-yellow-100 animate-pulse delay-700" size={8} />
              <Star className="absolute bottom-16 left-24 text-yellow-100 animate-pulse delay-300" size={10} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-wellness-border px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-purple-300 backdrop-blur-md">
                  <Moon size={12} /> Sleep Sanctuary
                </span>
                <h3 className="font-heading text-3xl font-extrabold mt-6 leading-tight">Time to rest your mind.</h3>
                <p className="mt-3 text-sm text-purple-200/70 leading-relaxed max-w-sm font-medium">
                  Drift into high-quality sleep with comforting, immersive storytelling and deep ambient wave loops.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-purple-200/50">
                <Volume2 size={16} /> Ambient volume optimized for nighttime listening
              </div>
            </div>
          </div>

          {/* Interactive Sleep Timer */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-8 shadow-glass backdrop-blur-[18px]">
            <div className="flex flex-col h-full justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-orange">
                  <Clock size={12} /> Auto-Pause Helper
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white mt-2">Sleep Timer</h3>
                <p className="text-xs text-wellness-muted mt-1 font-medium">Set a timer to automatically pause your playback when you fall asleep.</p>
              </div>

              <div className="my-6">
                {timerActive ? (
                  <div className="flex flex-col items-center justify-center py-4 bg-white/5 rounded-3xl border border-wellness-border shadow-sm">
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-wellness-orange animate-pulse">Timer Active</p>
                    <p className="font-heading text-4xl font-extrabold text-white mt-1">{formatTime(secondsLeft)}</p>
                    <p className="text-xs text-wellness-muted mt-1 font-medium">Rest easy • Autopauses playbacks</p>
                  </div>
                ) : (
                  <div className="flex justify-center gap-3">
                    {[15, 30, 45, 60].map((min) => (
                      <button
                        key={min}
                        onClick={() => setTimerMinutes(min)}
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-bold transition-all ${
                          timerMinutes === min
                            ? "bg-wellness-orange border-wellness-orange text-white shadow-md"
                            : "bg-white/5 border-wellness-border text-wellness-muted hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {min}m
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleStartTimer}
                  className={`flex-1 rounded-full py-3.5 text-sm font-extrabold transition-all text-center flex items-center justify-center ${
                    timerActive
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-sm"
                      : "bg-wellness-glow hover:bg-wellness-glow/90 text-black shadow-sm"
                  }`}
                >
                  {timerActive ? "Stop Timer" : "Start Sleep Timer"}
                </button>
                {timerActive && (
                  <button
                    onClick={handleResetTimer}
                    className="px-6 rounded-full bg-white/5 border border-wellness-border text-white text-sm font-bold hover:bg-white/10 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardSection>

      {/* Sleep Stories Grid */}
      <DashboardSection id="sleep-stories">
        <SectionHeading
          animate
          eyebrow="Soothing Narratives"
          title="Sleep Stories"
          description="Fall asleep to stories from beautiful and tranquil corners of the world."
          className="mb-8"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sleepStories.map((story) => (
            <SessionCard
              key={story.id}
              session={story}
              onClick={handleStoryClick}
            />
          ))}
        </div>
      </DashboardSection>

      {/* Soothing Sleep Soundscapes */}
      <DashboardSection id="sleep-music">
        <SectionHeading
          animate
          eyebrow="Soundscapes"
          title="Night Soundscapes"
          description="Soft ambient soundtracks and nature rhythms to block out noise and clear the mind."
          className="mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sleepAudio.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
            />
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
