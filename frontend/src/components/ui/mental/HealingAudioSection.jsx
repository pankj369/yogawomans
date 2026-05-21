import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Music, Volume2, Play, Pause, Sparkles, Sliders, RefreshCw } from "lucide-react";
import DashboardSection from "../sections/DashboardSection";
import SectionHeading from "../sections/SectionHeading";
import TrackCard from "../cards/TrackCard";
import { healingAudio } from "../../../data/mentalHealthData";
import { audioTracks } from "../../../data/wellnessData";

// Nature Mixer Assets
import audioRain from "../../../assets/audios/mixkit-light-rain-loop-2393.wav";
import audioBirds from "../../../assets/audios/mixkit-little-birds-singing-in-the-trees-17.wav";
import audioOcean from "../../../assets/audios/oceanframemusic-relax-515144.mp3";
import audioWind from "../../../assets/audios/mixkit-valley-sunset-127.mp3";

const mixerTracks = [
  { id: "rain", label: "Rain Showers", icon: "🌧️", src: audioRain },
  { id: "birds", label: "Forest Birds", icon: "🐦", src: audioBirds },
  { id: "ocean", label: "Ocean Waves", icon: "🌊", src: audioOcean },
  { id: "wind", label: "Soft Breeze", icon: "🍃", src: audioWind },
];

export default function HealingAudioSection() {
  // Sound Mixer States
  const [activeMixer, setActiveMixer] = useState({
    rain: false,
    birds: false,
    ocean: false,
    wind: false,
  });
  const [volumes, setVolumes] = useState({
    rain: 0.5,
    birds: 0.5,
    ocean: 0.5,
    wind: 0.5,
  });

  // Audio Refs
  const audioRefs = useRef({
    rain: null,
    birds: null,
    ocean: null,
    wind: null,
  });

  // Manage Sound Mixer Lifecycles
  useEffect(() => {
    // Initialize Audio Objects
    mixerTracks.forEach((track) => {
      if (!audioRefs.current[track.id]) {
        const audio = new Audio(track.src);
        audio.loop = true;
        audioRefs.current[track.id] = audio;
      }
    });

    // Cleanup on Unmount
    return () => {
      Object.keys(audioRefs.current).forEach((key) => {
        if (audioRefs.current[key]) {
          audioRefs.current[key].pause();
          audioRefs.current[key] = null;
        }
      });
    };
  }, []);

  const handleToggleTrack = (id) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    const shouldPlay = !activeMixer[id];
    setActiveMixer((prev) => ({ ...prev, [id]: shouldPlay }));

    if (shouldPlay) {
      audio.volume = volumes[id];
      audio.play().catch((err) => console.log("Audio play blocked by browser policies:", err));
    } else {
      audio.pause();
    }
  };

  const handleVolumeChange = (id, vol) => {
    setVolumes((prev) => ({ ...prev, [id]: vol }));
    const audio = audioRefs.current[id];
    if (audio) {
      audio.volume = vol;
    }
  };

  const handleMuteAll = () => {
    setActiveMixer({
      rain: false,
      birds: false,
      ocean: false,
      wind: false,
    });
    Object.keys(audioRefs.current).forEach((key) => {
      if (audioRefs.current[key]) {
        audioRefs.current[key].pause();
      }
    });
  };

  return (
    <div className="space-y-12">
      {/* Sound Mixer Control Panel */}
      <DashboardSection id="sound-mixer">
        <SectionHeading
          animate
          eyebrow="Interactive Sanctuary"
          title="Personal Soundscape Mixer"
          description="Create your custom ambient environment by layering natural frequencies together."
          className="mb-8"
        />

        <div className="relative overflow-hidden rounded-[2.5rem] bg-white/40 p-8 border border-white/60 shadow-glass backdrop-blur-md">
          <div className="grid gap-8 lg:grid-cols-5 items-center">
            {/* Left Mixer Stats */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-wellness-orange">
                  <Sliders size={12} /> Ambient Layering
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-wellness-dark mt-2">Natural Synergy</h3>
                <p className="text-xs text-wellness-muted mt-1 leading-relaxed">
                  Toggle multiple nature loops and slide volumes to mix a custom meditative ambiance. Sounds will play in the background.
                </p>
              </div>

              {Object.values(activeMixer).some(Boolean) && (
                <button
                  onClick={handleMuteAll}
                  className="rounded-full bg-red-500/10 border border-red-500/20 text-red-600 px-5 py-2 text-xs font-bold hover:bg-red-500/20 transition-all flex items-center gap-2"
                >
                  <RefreshCw size={12} /> Clear Mixer / Mute All
                </button>
              )}
            </div>

            {/* Mixer Grid Controls */}
            <div className="lg:col-span-3 grid gap-4 sm:grid-cols-2">
              {mixerTracks.map((track) => {
                const isActive = activeMixer[track.id];
                return (
                  <div
                    key={track.id}
                    className={`p-4 rounded-3xl border transition-all duration-300 ${
                      isActive
                        ? "bg-white border-wellness-orange shadow-liftSm"
                        : "bg-white/50 border-white/30 hover:bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{track.icon}</span>
                        <span className="text-xs font-bold text-wellness-dark">{track.label}</span>
                      </div>
                      <button
                        onClick={() => handleToggleTrack(track.id)}
                        className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-wellness-orange text-white"
                            : "bg-wellness-softcream text-wellness-muted hover:bg-wellness-cream"
                        }`}
                      >
                        {isActive ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                      </button>
                    </div>

                    {/* Vol Slider */}
                    <div className="mt-4 flex items-center gap-3">
                      <Volume2 size={12} className="text-wellness-muted" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volumes[track.id]}
                        onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value))}
                        disabled={!isActive}
                        className={`flex-1 h-1 rounded-lg appearance-none cursor-pointer ${
                          isActive ? "bg-wellness-orange/50" : "bg-wellness-muted/20"
                        }`}
                        style={{
                          accentColor: isActive ? "#E27229" : "#ccc",
                        }}
                      />
                      <span className="text-[10px] font-bold text-wellness-muted w-7 text-right">
                        {Math.round(volumes[track.id] * 100)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DashboardSection>

      {/* Focus Music Soundtracks */}
      <DashboardSection id="focus-music">
        <SectionHeading
          animate
          eyebrow="Sound Healing"
          title="Concentration & Mind Flow"
          description="Binaural beats, ambient loops, and focus-enhancing melodies."
          className="mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {audioTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </DashboardSection>

      {/* Ambient Soundscapes */}
      <DashboardSection id="ambient-scapes">
        <SectionHeading
          animate
          eyebrow="Therapy Frequencies"
          title="Healing & Restoration"
          description="Solfeggio frequencies and deep meditations for stress relief."
          className="mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {healingAudio.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
