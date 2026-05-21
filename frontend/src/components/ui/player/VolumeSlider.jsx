import { Volume2, VolumeX, Volume1 } from "lucide-react";

export default function VolumeSlider({ value, onChange, isMuted, onMuteToggle }) {
  const currentVolume = isMuted ? 0 : value;

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    onChange?.(newVolume);
  };

  return (
    <div className="flex items-center gap-3 w-32 sm:w-40 group">
      <button
        onClick={onMuteToggle}
        className="text-wellness-muted hover:text-wellness-dark transition-colors flex-shrink-0"
      >
        {isMuted || value === 0 ? (
          <VolumeX size={18} />
        ) : value < 0.4 ? (
          <Volume1 size={18} />
        ) : (
          <Volume2 size={18} />
        )}
      </button>

      <div className="relative flex-1 flex items-center h-4">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={currentVolume}
          onChange={handleVolumeChange}
          className="w-full h-1 bg-wellness-softcream rounded-lg appearance-none cursor-pointer accent-wellness-green hover:accent-wellness-orange outline-none transition-all focus:outline-none"
          style={{
            background: `linear-gradient(to right, #2F6B3B 0%, #2F6B3B ${currentVolume * 100}%, #EFE7DC ${currentVolume * 100}%, #EFE7DC 100%)`
          }}
        />
      </div>
    </div>
  );
}
