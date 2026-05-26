import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Pricing from "../components/Pricing";
import { ArrowLeft } from "lucide-react";

export default function PricingPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleBack = () => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-luxury-text relative select-none">
      {/* Premium Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-liftSm backdrop-blur-md"
        >
          <ArrowLeft size={14} className="text-[#D6A756]" />
          <span>{auth.isAuthenticated ? "Back to Dashboard" : "Back to Home"}</span>
        </button>
      </div>

      {/* Render the full pricing view */}
      <Pricing />
    </div>
  );
}
