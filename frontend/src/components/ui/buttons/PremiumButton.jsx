import { motion } from "framer-motion";

export default function PremiumButton({
  children,
  variant = "primary", // "primary" | "secondary" | "outline"
  icon: Icon,
  onClick,
  className = "",
  fullWidth = false,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-200 ease-spring active:translate-y-0";
  
  const variants = {
    primary: "bg-btn-primary text-white shadow-glow2 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(231,123,53,0.32)]",
    healing: "bg-btn-healing text-white shadow-md hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(45,99,56,0.18)]",
    secondary: "bg-wellness-greenLight text-wellness-greenDark hover:bg-[#e4f2dc] hover:-translate-y-0.5 hover:shadow-liftSm",
    outline: "border border-wellness-green/35 bg-white/55 text-wellness-greenDark hover:bg-white hover:-translate-y-0.5 hover:shadow-liftSm"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-base" />}
      {children}
    </button>
  );
}
