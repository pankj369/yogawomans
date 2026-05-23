import { motion, AnimatePresence } from "framer-motion";
import { CloudRain, Trees, Waves, Sparkles, Volume2, X } from "lucide-react";
import { useMedia } from "../../../context/MediaContext";
import VolumeSlider from "./VolumeSlider";

export const ambientTracks = [
  {
    id: "amb_rain",
    title: "Gentle Rain",
    icon: CloudRain,
    audioSrc: "https://cdn.pixabay.com/download/audio/2021/08/09/audio_1f2bc8cecb.mp3?filename=rain-and-thunder-16705.mp3"
  },
  {
    id: "amb_forest",
    title: "Forest Ambience",
    icon: Trees,
    audioSrc: "https://cdn.pixabay.com/download/audio/2021/08/09/audio_650b2a75d1.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3"
  },
  {
    id: "amb_ocean",
    title: "Ocean Waves",
    icon: Waves,
    audioSrc: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2491a9b244.mp3?filename=ocean-waves-112906.mp3"
  },
  {
    id: "amb_solfeggio",
    title: "432Hz Healing",
    icon: Sparkles,
    audioSrc: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_8245cd981b.mp3?filename=meditation-bowl-432-hz-14300.mp3"
  }
];

export default function AmbientSoundControls({ onClose }) {
  const {
    ambientTrack,
    isAmbientPlaying,
    ambientVolume,
    playAmbient,
    stopAmbient,
    setAmbientVolume
  } = useMedia();

  return (
    <div className="rounded-3xl bg-white/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-2xl border border-white/60 w-full max-w-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-heading text-lg font-extrabold text-[#11281d]">Ambient Sound</h4>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8FA68E]">Layer your experience</p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-[#8FA68E] hover:bg-[#EFE7DC]/50 hover:text-[#11281d] transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {ambientTracks.map((track) => {
          const isActive = ambientTrack?.id === track.id && isAmbientPlaying;
          const Icon = track.icon;
          return (
            <button
              key={track.id}
              onClick={() => playAmbient(track)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                isActive 
                  ? "border-[#E27229] bg-[#E27229]/10 text-[#E27229]" 
                  : "border-[#EFE7DC] bg-white/50 text-[#3a4a3d] hover:border-[#8FA68E] hover:bg-white"
              }`}
            >
              <div className="relative mb-2">
                <Icon size={24} />
                {isActive && (
                  <motion.span 
                    layoutId="ambientGlow"
                    className="absolute inset-0 rounded-full bg-[#E27229] blur-md opacity-40" 
                  />
                )}
              </div>
              <span className="text-[10px] font-bold text-center leading-tight">
                {track.title}
              </span>
            </button>
          );
        })}
      </div>

      {isAmbientPlaying && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden"
        >
          <div className="flex items-center justify-between border-t border-[#EFE7DC]/50 pt-4 px-1">
            <span className="text-[10px] font-bold text-[#8FA68E] uppercase tracking-wider flex items-center gap-2">
              <Volume2 size={12} /> Volume
            </span>
            <div className="w-32">
              <VolumeSlider
                value={ambientVolume}
                onChange={setAmbientVolume}
                isMuted={false}
                onMuteToggle={() => {}}
              />
            </div>
          </div>
          <button 
            onClick={stopAmbient}
            className="w-full mt-4 py-2 text-xs font-bold text-[#8FA68E] hover:text-[#11281d] transition-colors"
          >
            Turn off ambient sound
          </button>
        </motion.div>
      )}
    </div>
  );
}
