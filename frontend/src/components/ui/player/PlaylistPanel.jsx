import { Play, Pause, Music, Trash2 } from "lucide-react";

export default function PlaylistPanel({
  playlist = [],
  currentIndex = -1,
  isPlaying = false,
  onTrackSelect,
}) {
  return (
    <div className="flex flex-col h-full bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 p-4">
      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
        <h4 className="font-heading text-sm font-bold text-wellness-dark">
          Up Next ({playlist.length} tracks)
        </h4>
        <span className="text-[10px] font-bold uppercase tracking-wider text-wellness-muted bg-white/40 px-2 py-1 rounded-full">
          Queue
        </span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 max-h-56 sm:max-h-72">
        {playlist.map((track, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={track.id + "-" + idx}
              onClick={() => onTrackSelect?.(track)}
              className={`flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition duration-200 group ${
                isActive
                  ? "bg-wellness-green text-white shadow-md"
                  : "bg-white/40 hover:bg-white/60 text-wellness-dark"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-wellness-cream text-wellness-muted group-hover:bg-white"
                }`}
              >
                {isActive && isPlaying ? (
                  <div className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                    <span className="w-0.5 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                ) : isActive ? (
                  <Play size={14} fill="currentColor" />
                ) : (
                  <Music size={14} className="group-hover:scale-110 transition-transform" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-bold truncate ${
                    isActive ? "text-white" : "text-wellness-dark"
                  }`}
                >
                  {track.title}
                </p>
                <p
                  className={`text-[10px] truncate uppercase tracking-widest mt-0.5 ${
                    isActive ? "text-white/80" : "text-wellness-muted"
                  }`}
                >
                  {track.instructor || track.category || "Audio"}
                </p>
              </div>

              <div className="text-[10px] font-semibold opacity-70 pr-1">
                {track.duration ? `${track.duration}m` : ""}
              </div>
            </div>
          );
        })}

        {playlist.length === 0 && (
          <p className="text-center py-8 text-xs font-medium text-wellness-muted">
            Queue is empty.
          </p>
        )}
      </div>
    </div>
  );
}
