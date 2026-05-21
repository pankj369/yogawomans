import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import { pricingPlans } from "../data/wellnessData";

export default function PricingPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { upgradePlan } = useDashboard();

  const selectPlan = (plan) => {
    upgradePlan(plan.name);
    auth.updateUser({ plan: plan.name });
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7ead7_0%,#fdf8f1_100%)] px-4 py-10 text-[#1a1a1a] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b6c48]">Upgrade</p>
          <h1 className="mt-2 text-4xl font-heading font-extrabold">Choose your premium wellness plan</h1>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <motion.article
              key={plan.id}
              whileHover={{ y: -5 }}
              className={`rounded-[2rem] border p-6 shadow-[0_20px_60px_rgba(72,42,8,0.1)] ${
                plan.highlighted ? "border-[#E8651A] bg-white" : "border-white/60 bg-white/70"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6c48]">{plan.name}</p>
              <h2 className="mt-3 text-3xl font-heading font-extrabold">{plan.price}</h2>
              <ul className="mt-5 space-y-3 text-sm text-[#5f5347]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#eff7ea] text-xs text-[#2E7D32]">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.div whileTap={{ scale: 0.96 }} className="mt-8">
                <button
                  type="button"
                  onClick={() => selectPlan(plan)}
                  className={`w-full rounded-full py-4 text-sm font-bold shadow-sm transition ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#E8651A] to-[#2E7D32] text-white"
                      : "bg-[#2E7D32] text-white"
                  }`}
                >
                  {plan.highlighted ? "Upgrade Premium" : "Choose Plan"}
                </button>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
