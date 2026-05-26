import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { suryaService } from "../../services/suryaService";

export default function LeftContentPanel() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleWatchFlow = async () => {
    if (user) {
      showToast({ title: "Starting Session", message: "Loading Surya Namaskar Flow..." });
      await suryaService.saveSession(user.uid || user.id, { title: "Surya Namaskar Video", duration: 15 });
      navigate("/dashboard/surya");
    } else {
      sessionStorage.setItem("pending_action_type", "surya");
      sessionStorage.setItem("pending_action_data", "watch-flow");
      navigate("/login", { state: { returnTo: "/dashboard/surya" } });
    }
  };
  return (
    <div className="flex flex-col justify-center h-full w-full z-30 pointer-events-auto items-center xl:items-start text-center xl:text-left max-w-lg mx-auto xl:mx-0">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-6 xl:mb-8"
      >
        <div className="inline-flex px-3 py-1.5 border border-[#1E7A46]/40 rounded-full bg-[#1E7A46]/10 mb-5 xl:mb-6 shadow-[0_0_15px_rgba(30,122,70,0.15)]">
          <p className="text-[#00E676] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            THE SCIENCE OF SUN & YOU
          </p>
        </div>
        
        <h2 className="text-4xl sm:text-5xl xl:text-[3.5rem] font-serif text-[#F7F3EC] leading-[1.15] mb-5 tracking-tight">
          Surya<br />
          Namaskar
        </h2>
        
        <div className="flex items-center justify-center xl:justify-start w-12 h-12 mb-5 mx-auto xl:mx-0">
          <span className="text-[#E9781F] text-2xl sm:text-3xl drop-shadow-[0_0_10px_rgba(233,120,31,0.3)]">🪷</span>
        </div>
        
        <h3 className="text-lg sm:text-xl xl:text-2xl text-[#F7F3EC] font-semibold leading-relaxed mb-3 xl:mb-4">
          12 Steps to Align Your Body,<br className="hidden sm:block" /> Mind & Energy
        </h3>
        
        <p className="text-[#888] text-sm xl:text-[15px] leading-relaxed mb-8 max-w-sm mx-auto xl:mx-0">
          Experience the timeless flow that energizes your body, calms your mind and connects you with the power of the sun.
        </p>

        <button 
          onClick={handleWatchFlow}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#E9781F]/80 text-[#E9781F] hover:bg-[#E9781F] hover:text-[#0A0A0A] transition-all duration-300 group mx-auto xl:mx-0 hover:shadow-[0_0_20px_rgba(233,120,31,0.3)]"
        >
          <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] group-hover:bg-[#0A0A0A] group-hover:text-[#E9781F] transition-all">
            ▶
          </span>
          <span className="font-semibold uppercase tracking-widest text-xs">Watch Full Flow</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-6 xl:mt-auto p-4 sm:p-5 xl:p-6 rounded-2xl bg-[#0F2E1D]/40 border border-white/5 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-start gap-4 mx-auto xl:mx-0 w-full max-w-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
      >
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1E7A46]/20 flex items-center justify-center border border-[#1E7A46]/50 shadow-[0_0_15px_rgba(30,122,70,0.2)]">
          <span className="text-xl sm:text-2xl">🔬</span>
        </div>
        <div className="text-center sm:text-left">
          <h4 className="text-[#F7F3EC] font-semibold text-sm xl:text-base mb-1">Ancient Wisdom,<br className="hidden sm:block" />Modern Science</h4>
          <p className="text-[#888] text-xs xl:text-[13px] leading-relaxed">
            Backed by research. Loved by millions worldwide.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
