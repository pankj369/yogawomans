import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { suryaService } from "../../services/suryaService";

export default function RightInfoPanel() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const handleStartFlow = async () => {
    if (user) {
      showToast({ title: "Practice Started", message: "Your 12-step flow is beginning." });
      const res = await suryaService.saveSession(user.id, { title: "Surya Namaskar 12-Step", duration: 20 });
      if (res && res.newStreak !== undefined) {
        updateUser({
          wellnessStats: {
            ...(user.wellnessStats || {}),
            currentStreak: res.newStreak
          }
        });
      }
      navigate("/dashboard/surya");
    } else {
      sessionStorage.setItem("pending_action_type", "surya");
      sessionStorage.setItem("pending_action_data", "start-flow");
      navigate("/login", { state: { returnTo: "/dashboard/surya" } });
    }
  };
  const benefits = [
    "Improves flexibility & strength",
    "Enhances energy & immunity",
    "Supports weight management",
    "Boosts mental clarity",
    "Balances all body systems"
  ];

  return (
    <div className="flex flex-col justify-center h-full w-full z-30 pointer-events-auto gap-4 xl:gap-5 max-w-[320px] mx-auto xl:mx-0">
      
      {/* About Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-4 xl:p-5 rounded-3xl bg-[#0F2E1D]/40 border border-white/5 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-left"
      >
        <div className="flex items-center gap-2 mb-2.5 xl:mb-3">
          <span className="text-[#E9781F] text-base xl:text-lg drop-shadow-[0_0_10px_rgba(233,120,31,0.3)]">☀️</span>
          <h4 className="text-base xl:text-lg text-[#F7F3EC] font-serif leading-none mt-1">About Surya Namaskar</h4>
        </div>
        
        <p className="text-[#888] text-xs xl:text-[13px] leading-relaxed mb-4">
          Surya Namaskar is a complete yoga practice in itself. It's a combination of 12 powerful poses that work on your body, mind and breath.
        </p>

        <ul className="space-y-2.5 xl:space-y-3">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#00E676] text-[10px] mt-0.5">✔️</span>
              <span className="text-white/80 text-xs leading-tight">{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Today's Practice Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="p-4 xl:p-5 rounded-3xl bg-[#0F2E1D]/40 border border-white/5 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-left flex flex-col"
      >
        <div className="flex items-center gap-2 mb-4 xl:mb-5">
          <span className="text-[#E9781F] text-base xl:text-lg drop-shadow-[0_0_10px_rgba(233,120,31,0.3)]">☀️</span>
          <h4 className="text-base xl:text-lg text-[#F7F3EC] font-serif leading-none mt-1">Today's Practice</h4>
        </div>

        <div className="flex items-center justify-between mb-5 xl:mb-6 bg-[#0A0A0A]/30 p-2.5 rounded-2xl border border-white/5">
          <p className="text-white/70 text-xs font-medium">0 / 12 Steps Completed</p>
          <div className="w-10 h-10 rounded-full border-[2.5px] border-[#1E7A46] border-t-[#00E676] flex items-center justify-center shadow-[0_0_15px_rgba(0,230,118,0.2)]">
            <span className="text-[#F7F3EC] font-bold text-[10px]">0%</span>
          </div>
        </div>

        <button 
          onClick={handleStartFlow}
          className="w-full py-3 xl:py-3.5 rounded-full bg-gradient-to-r from-[#1E7A46] to-[#00E676] text-[#0A0A0A] font-bold text-[11px] xl:text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(0,230,118,0.2)] hover:shadow-[0_0_25px_rgba(0,230,118,0.5)] transition-all duration-300 mb-3"
        >
          Start Your Flow
        </button>

        <button className="w-full text-center text-[#E9781F] text-[10px] xl:text-[11px] font-semibold uppercase tracking-widest hover:text-white transition-colors">
          View All Benefits ›
        </button>
      </motion.div>
    </div>
  );
}
