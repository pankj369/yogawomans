import StepCard from "./StepCard";

const activityLevels = ["Low", "Light", "Moderate", "Active", "Very active"];
const sleepQualities = ["Poor", "Fair", "Good", "Excellent"];
const stressLevels = ["Low", "Moderate", "High", "Very high"];
const waterIntake = ["Less than 1L", "1-2L", "2-3L", "3L+"];
const meditationExperience = ["None", "Beginner", "Some experience", "Regular practice"];
const habits = ["Never", "Occasionally", "Weekly", "Daily"];

export default function LifestyleStep({ data, onChange, onBack, onNext, onSkip }) {
  const fields = [
    ["activityLevel", "Activity level", activityLevels],
    ["sleepQuality", "Sleep quality", sleepQualities],
    ["stressLevel", "Stress level", stressLevels],
    ["waterIntake", "Water intake", waterIntake],
    ["meditationExperience", "Meditation experience", meditationExperience],
    ["smokingAlcohol", "Smoking / alcohol habits", habits],
  ];

  return (
    <StepCard
      eyebrow="Step 3 of 4"
      title="Lifestyle"
      subtitle="These answers help us shape a plan that feels realistic, not restrictive."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([key, label, options]) => (
          <label key={key}>
            <span className="mb-2 block text-sm font-semibold text-[#4a3a2b]">{label}</span>
            <select
              value={data[key]}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#2c251d] outline-none transition focus:border-[#8a6a3c] focus:ring-4 focus:ring-[#e8d7c1]"
            >
              <option value="">Select</option>
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
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
            onClick={onNext}
            className="rounded-full bg-[#2E7D32] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(46,125,50,0.22)] transition hover:-translate-y-0.5 hover:bg-[#256428]"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </StepCard>
  );
}
