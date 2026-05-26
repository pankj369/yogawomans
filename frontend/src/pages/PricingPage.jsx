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
    <div className="min-h-screen bg-gradient-to-b from-luxury-bg to-luxury-surface/40 px-4 py-20 text-luxury-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold">Upgrade</p>
          <h1 className="mt-3 text-4xl font-heading font-extrabold sm:text-5xl">Choose your premium wellness plan</h1>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <motion.article
              key={plan.id}
              whileHover={{ y: -5 }}
              className={`rounded-[2rem] border p-8 shadow-sm transition-all duration-300 flex flex-col ${
                plan.highlighted ? "border-luxury-emerald bg-white shadow-md" : "border-luxury-surface bg-luxury-card"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-luxury-gold">{plan.name}</p>
              <h2 className="mt-3 text-3xl font-heading font-extrabold">{plan.price}</h2>
              <ul className="mt-6 space-y-3.5 text-sm text-luxury-muted flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-luxury-emerald/10 text-xs text-luxury-emerald font-bold">
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
                      ? "bg-luxury-emerald hover:bg-luxury-emerald/90 text-white"
                      : "bg-luxury-surface hover:bg-luxury-surface/80 text-luxury-text"
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
