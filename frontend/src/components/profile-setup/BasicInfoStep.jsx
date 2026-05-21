import StepCard from "./StepCard";

const genderOptions = ["Female", "Male", "Non-binary", "Prefer not to say"];
const countryOptions = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
  "UAE",
  "Other",
];

export default function BasicInfoStep({ data, onChange, onBack, onNext, onSkip, onImageUpload }) {
  return (
    <StepCard
      eyebrow="Step 1 of 4"
      title="Basic information"
      subtitle="Start with the essentials so we can tailor your wellness journey with care."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-[#4a3a2b]">Full name</span>
          <input
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#2c251d] outline-none transition focus:border-[#8a6a3c] focus:ring-4 focus:ring-[#e8d7c1]"
            placeholder="Your full name"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm font-semibold text-[#4a3a2b]">Age</span>
          <input
            type="number"
            min="10"
            max="100"
            value={data.age}
            onChange={(e) => onChange("age", e.target.value)}
            className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#2c251d] outline-none transition focus:border-[#8a6a3c] focus:ring-4 focus:ring-[#e8d7c1]"
            placeholder="Age"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm font-semibold text-[#4a3a2b]">Gender</span>
          <select
            value={data.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#2c251d] outline-none transition focus:border-[#8a6a3c] focus:ring-4 focus:ring-[#e8d7c1]"
          >
            <option value="">Select gender</option>
            {genderOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-2 block text-sm font-semibold text-[#4a3a2b]">Height</span>
          <input
            value={data.height}
            onChange={(e) => onChange("height", e.target.value)}
            className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#2c251d] outline-none transition focus:border-[#8a6a3c] focus:ring-4 focus:ring-[#e8d7c1]"
            placeholder="e.g. 165 cm"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm font-semibold text-[#4a3a2b]">Weight</span>
          <input
            value={data.weight}
            onChange={(e) => onChange("weight", e.target.value)}
            className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#2c251d] outline-none transition focus:border-[#8a6a3c] focus:ring-4 focus:ring-[#e8d7c1]"
            placeholder="e.g. 58 kg"
          />
        </label>

        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-[#4a3a2b]">Country</span>
          <select
            value={data.country}
            onChange={(e) => onChange("country", e.target.value)}
            className="w-full rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-[#2c251d] outline-none transition focus:border-[#8a6a3c] focus:ring-4 focus:ring-[#e8d7c1]"
          >
            <option value="">Select country</option>
            {countryOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5">
        <span className="mb-2 block text-sm font-semibold text-[#4a3a2b]">Profile image</span>
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#c9b79f] bg-[#f8f1e8] px-4 py-8 text-center">
          <input type="file" accept="image/*" className="hidden" onChange={onImageUpload} />
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt="Profile preview"
              className="mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
          ) : (
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl text-[#8a6a3c] shadow-inner">
              ⬆
            </div>
          )}
          <p className="text-sm font-semibold text-[#4a3a2b]">
            Upload a profile image
          </p>
          <p className="mt-1 text-xs text-[#7e6955]">
            JPG, PNG, or WEBP. Keep it clear and friendly.
          </p>
          {data.profileImageName && (
            <p className="mt-2 text-xs font-medium text-[#8b6c48]">{data.profileImageName}</p>
          )}
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
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
    </StepCard>
  );
}
