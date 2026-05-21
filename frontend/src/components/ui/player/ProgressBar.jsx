import { useState } from "react";

export default function ProgressBar({ progress = 0, duration = 0, onChange }) {
  const [hoverWidth, setHoverWidth] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("0:00");

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = percent * duration;
    onChange?.(seekTime);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverWidth(percent * 100);
    setTooltipText(formatTime(percent * duration));
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 w-full font-inter select-none">
      <span className="text-xs font-semibold text-wellness-muted w-10 text-right">
        {formatTime(progress)}
      </span>

      <div
        onClick={handleSeek}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex-1 h-3 flex items-center cursor-pointer group"
      >
        {/* Track Background */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-wellness-softcream transition-all group-hover:h-2" />

        {/* Hover Highlight */}
        {showTooltip && (
          <div
            className="absolute h-1.5 rounded-full bg-wellness-green/20 transition-all group-hover:h-2"
            style={{ width: `${hoverWidth}%` }}
          />
        )}

        {/* Active Progress */}
        <div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-wellness-green to-wellness-orange transition-all group-hover:h-2 shadow-sm"
          style={{ width: `${progressPercentage}%` }}
        />

        {/* Scrubber Handle */}
        <div
          className="absolute h-3 w-3 rounded-full bg-white border border-wellness-orange shadow-md scale-0 group-hover:scale-100 transition-transform duration-150"
          style={{ left: `calc(${progressPercentage}% - 6px)` }}
        />

        {/* Tooltip */}
        {showTooltip && (
          <div
            className="absolute bottom-5 -translate-x-1/2 bg-wellness-dark text-white text-[10px] font-bold px-2 py-1 rounded shadow-md pointer-events-none"
            style={{ left: `${hoverWidth}%` }}
          >
            {tooltipText}
          </div>
        )}
      </div>

      <span className="text-xs font-semibold text-wellness-muted w-10 text-left">
        {formatTime(duration)}
      </span>
    </div>
  );
}
