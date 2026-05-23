import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Calendar, Clock, CheckCircle2, Play } from "lucide-react";
import { useGeneratedPlans } from "../../hooks/useGeneratedPlans";
import PremiumButton from "../ui/PremiumButton";
import { useAuth } from "../../context/AuthContext";
import { wellnessCategories } from "../../data/wellnessRecommendationData";

export default function DashboardPlansSection() {
  const [plans, setPlans] = useState([]);
  const { user } = useAuth();
  const { generatedPlans } = useGeneratedPlans();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      setPlans(generatedPlans);
    }
  }, [user, generatedPlans]);

  const handleContinue = (plan) => {
    navigate("/generated-plan", {
      state: {
        goalId: plan.goal,
        durationId: plan.duration,
        levelId: plan.level
      }
    });
  };

  return (
    <section className="mb-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-wellness-dark">Your Healing Journeys</h2>
          <p className="mt-1 text-sm text-wellness-muted">Resume your personalized wellness plans.</p>
        </div>
        <PremiumButton 
          onClick={() => navigate("/")}
          variant="secondary"
          icon={Sparkles}
          className="px-5 py-2.5 !text-[10px]"
        >
          New Plan
        </PremiumButton>
      </div>

      {plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-[#EFE7DC] bg-white/40 p-12 text-center backdrop-blur-md shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-wellness-cream mb-4">
            <Sparkles size={24} className="text-[#E27229]" />
          </div>
          <h3 className="font-heading text-xl font-bold text-wellness-dark">No active journeys</h3>
          <p className="mt-2 text-sm text-wellness-muted max-w-sm">
            Generate your first personalized wellness plan to start transforming your routine.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-[#EFE7DC] bg-white/60 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1"
            >
              {/* Background accent glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E27229]/5 blur-2xl transition-all duration-500 group-hover:bg-[#E27229]/10" />

              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-[#EFE7DC] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E27229]">
                    {plan.goal}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-wellness-muted">
                    <Calendar size={12} className="text-[#8FA68E]" />
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="font-heading text-xl font-bold text-wellness-dark leading-tight group-hover:text-[#E27229] transition-colors duration-300">
                  {plan.title}
                </h3>
                
                <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-wellness-muted">
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#8FA68E]" /> {plan.duration}</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#E27229]" /> {plan.progress}%</span>
                </div>
                
                <div className="mt-5 pt-5 border-t border-[#EFE7DC]/50">
                  <PremiumButton 
                    onClick={() => handleContinue(plan)}
                    variant="ghost"
                    icon={Play}
                    fullWidth
                    className="!py-3"
                  >
                    Resume
                  </PremiumButton>
                </div>
              </div>
              
              {/* Subtle Progress Bar at very bottom edge */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-transparent">
                <div 
                  className="h-full bg-[#E27229]/80 transition-all duration-1000" 
                  style={{ width: `${plan.progress}%` }} 
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
