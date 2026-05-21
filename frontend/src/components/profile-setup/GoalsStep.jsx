import StepCard from "./StepCard";

const goals = [
  "Weight loss",
  "Flexibility",
  "Stress relief",
  "Meditation",
  "Spiritual growth",
  "Better sleep",
  "Strength building",
];

export default function GoalsStep({ data, onToggleGoal, onBack, onComplete, onSkip }) {
  return (
    <StepCard
      eyebrow="Step 4 of 4"
      title="Goals"
      subtitle="Choose the outcomes you want to focus on. You can always refine them later."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {goals.map((goal) => {
          const checked = data.goals.includes(goal);
          return (
            <button
              key={goal}
              type="button"
              onClick={() => onToggleGoal(goal)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                checked
                  ? "border-[#2E7D32] bg-[#eff7ea] text-[#215c28] shadow-[0_10px_25px_rgba(46,125,50,0.12)]"
                  : "border-white/60 bg-white/80 text-[#4a3a2b] hover:border-[#d6c5af]"
              }`}
            >
              <span>{goal}</span>
              <span className={`ml-3 text-lg ${checked ? "opacity-100" : "opacity-35"}`}>
                {checked ? "✓" : "○"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-[#d6c5af] px-5 py-3 text-sm font-semibold text-[#6c5847] transition hover:bg-white"
        >
          Previous
        </button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onSkip}
            className="rounded-full border border-[#d6c5af] px-5 py-3 text-sm font-semibold text-[#6c5847] transition hover:bg-white"
          >
            Skip for now
          </button>
          <button
            type="button"
            onClick={onComplete}
            className="rounded-full bg-gradient-to-r from-[#2E7D32] to-[#E8651A] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(232,101,26,0.22)] transition hover:-translate-y-0.5"
          >
            Complete setup
          </button>
        </div>
      </div>
    </StepCard>
  );
}
