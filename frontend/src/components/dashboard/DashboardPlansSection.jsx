import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { getUserPlans } from "../../services/planService";
import { useAuth } from "../../context/AuthContext";
import { wellnessCategories } from "../../data/wellnessRecommendationData";
import Skeleton from "../ui/loaders/Skeleton";

export default function DashboardPlansSection() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlans() {
      if (user?.id) {
        const data = await getUserPlans(user.id);
        setPlans(data);
      }
      setLoading(false);
    }
    fetchPlans();
  }, [user]);

  const handleContinue = (plan) => {
    navigate("/generated-plan", {
      state: {
        goalId: plan.goalId,
        durationId: plan.durationId,
        levelId: plan.levelId
      }
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 w-full rounded-3xl" />
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-wellness-dark">AI Generated Journeys</h2>
          <p className="mt-1 text-sm text-wellness-muted">Your personalized wellness plans.</p>
        </div>
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-full bg-wellness-dark px-5 py-2 text-xs font-bold text-white transition hover:bg-black uppercase tracking-wider"
        >
          <Sparkles size={14} /> New Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="rounded-3xl border border-white/50 bg-white/40 p-12 text-center backdrop-blur-sm">
          <Sparkles size={32} className="mx-auto mb-4 text-wellness-gold" />
          <h3 className="font-heading text-xl font-bold text-wellness-dark">No journeys found</h3>
          <p className="mt-2 text-sm text-wellness-muted">Generate your first AI wellness plan to see it here.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-5 backdrop-blur-md transition-all hover:bg-white hover:shadow-card"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-wellness-greenLight px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-wellness-greenDark">
                      {plan.goalId}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-wellness-muted">
                      <Calendar size={12} />
                      {plan.createdAt?.toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold text-wellness-dark">
                    {wellnessCategories.find(c => c.id === plan.goalId)?.label || "Wellness"} Journey
                  </h3>
                  
                  <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-wellness-muted">
                    <span className="flex items-center gap-1"><Clock size={14} /> {plan.durationId}</span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-wellness-green" /> {plan.completionPercentage}%</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={() => handleContinue(plan)}
                    className="flex w-full items-center justify-between rounded-2xl bg-wellness-cream px-4 py-3 text-sm font-bold text-wellness-dark transition hover:bg-wellness-dark hover:text-white"
                  >
                    Continue Journey <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
