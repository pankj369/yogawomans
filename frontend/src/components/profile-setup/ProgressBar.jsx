export default function ProgressBar({ step, totalSteps }) {
  const percent = Math.round(((step + 1) / totalSteps) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-[#7a634d]">
        <span>Profile setup</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/35">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#2E7D32] via-[#8a6a3c] to-[#E8651A] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] font-medium text-[#8e7861]">
        <span>Basics</span>
        <span>Health</span>
        <span>Lifestyle</span>
        <span>Goals</span>
      </div>
    </div>
  );
}
