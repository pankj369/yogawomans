import StepCard from "./StepCard";

const yesNoOptions = ["No", "Yes"];

export default function HealthHistoryStep({ data, onChange, onBack, onNext, onSkip }) {
  return (
    <StepCard
      eyebrow="Step 2 of 4"
      title="Health history"
      subtitle="Share any health context that helps us recommend a safer, more personal practice."
    >
      <div className="grid gap-4">
        {[
          ["medicalConditions", "Existing medical conditions", "Tell us about any ongoing conditions"],
          ["injuries", "Injuries", "Mention any recent or recurring injuries"],
          ["mentalWellness", "Mental wellness concerns", "Stress, anxiety, burnout, or mood concerns"],
          ["allergies", "Allergies", "Food, medication, or environmental allergies"],
        ].map(([key, label, placeholder]) => (
          <label key={key}>
            <span className="mb-2 block text-sm font-semibold text-[#4a3a2b]">{label}</span>
            <textarea
              value={data[key]}
              onChange={(e) => onChange(key, e.target.value)}
              rows={3}
              className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#2c251d] outline-none transition placeholder:text-[#a38c75] focus:border-[#8a6a3c] focus:ring-4 focus:ring-[#e8d7c1]"
              placeholder={placeholder}
            />
          </label>
        ))}

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["backPain", "Back pain"],
            ["bloodPressure", "Blood pressure"],
            ["diabetes", "Diabetes"],
            ["pregnancy", "Pregnancy"],
          ].map(([key, label]) => (
            <label key={key}>
              <span className="mb-2 block text-sm font-semibold text-[#4a3a2b]">{label}</span>
              <select
                value={data[key]}
                onChange={(e) => onChange(key, e.target.value)}
                className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#2c251d] outline-none transition focus:border-[#8a6a3c] focus:ring-4 focus:ring-[#e8d7c1]"
              >
                <option value="">Select</option>
                {yesNoOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
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
