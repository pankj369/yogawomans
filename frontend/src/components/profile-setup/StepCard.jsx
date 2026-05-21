export default function StepCard({ eyebrow, title, subtitle, children }) {
  return (
    <div className="rounded-[2rem] border border-white/50 bg-white/60 p-5 shadow-[0_20px_80px_rgba(72,42,8,0.12)] backdrop-blur-2xl sm:p-8">
      <div className="mb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#8b6c48]">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-heading font-extrabold text-[#2c251d] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6e5b49] sm:text-base">
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
}
