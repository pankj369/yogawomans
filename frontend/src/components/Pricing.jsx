// src/components/Pricing.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ui/animations/ScrollReveal";
import StaggerGroup from "./ui/animations/StaggerGroup";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import { useToast } from "../context/ToastContext";
import { updateProfile } from "../services/userService";

const plans = [
  {
    id: "basic",
    name: "Starter Free",
    internalName: "Basic",
    emoji: "🌱",
    monthlyPrice: 0,
    yearlyPrice: 0,
    tagline: "Start your wellness journey free",
    features: [
      "Access to beginner yoga classes",
      "3 live sessions every month",
      "Daily guided meditation",
      "Basic breathing exercises",
      "Community WhatsApp support",
      "Access on mobile & desktop",
    ],
    missing: [
      "1-on-1 consultations",
      "Retreat access",
      "Advanced wellness roadmap",
      "Priority support",
    ],
    cta: "START FREE",
    popular: false,
  },
  {
    id: "plus",
    name: "Wellness Plus",
    internalName: "Plus",
    emoji: "🌸",
    monthlyPrice: 999,
    yearlyPrice: 799,
    tagline: "Complete wellness experience",
    features: [
      "Unlimited live yoga classes",
      "Unlimited recorded sessions",
      "Advanced meditation programs",
      "Weekly live Q&A sessions",
      "Personal wellness tracking",
      "Nutrition & diet guidance",
      "Priority community support",
      "Access to member-only workshops",
    ],
    missing: ["1-on-1 consultations", "Retreat access"],
    cta: "JOIN WELLNESS",
    popular: false,
  },
  {
    id: "pro",
    name: "Transform Pro",
    internalName: "Pro",
    emoji: "🏆",
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    tagline: "Ultimate transformation experience",
    features: [
      "Everything included in Wellness",
      "1-on-1 private yoga sessions",
      "Personalized yoga roadmap",
      "Dedicated wellness mentor",
      "Exclusive masterclasses",
      "Retreat discounts (30% off)",
      "Priority instructor access",
      "VIP community access",
    ],
    missing: [],
    cta: "TRANSFORM NOW",
    popular: true,
  },
];

// Helper to generate floating particles
const generateParticles = () => {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 2, // 2px to 5px
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 12, // 12s to 27s
    color: Math.random() > 0.5 ? "#D6A756" : "#F7F3EC", // Soft Gold or Soft Cream
  }));
};

if (typeof window !== "undefined" && !document.head.querySelector("[data-pricing-luxury]")) {
  const s = document.createElement("style");
  s.setAttribute("data-pricing-luxury", "true");
  s.textContent = `
    @keyframes pr-float-particle {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      10% { opacity: 0.8; }
      90% { opacity: 0.8; }
      100% { transform: translateY(-900px) scale(0.6); opacity: 0; }
    }
    @keyframes pr-glow-breath {
      0%, 100% { box-shadow: 0 0 30px rgba(0, 200, 117, 0.15), 0 0 60px rgba(214, 167, 86, 0.05); }
      50% { box-shadow: 0 0 45px rgba(0, 200, 117, 0.3), 0 0 90px rgba(214, 167, 86, 0.15); }
    }
    @keyframes pr-badge-pulse-slow {
      0%, 100% { transform: scale(1); filter: brightness(1); }
      50% { transform: scale(1.05); filter: brightness(1.1); }
    }
    .pr-section {
      font-family: 'Outfit', 'Poppins', sans-serif;
      background: linear-gradient(135deg, #0B1220 0%, #1A1E2E 25%, #1A2A22 55%, #2B1F1A 100%);
      position: relative;
      overflow: hidden;
    }
    .pr-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 10; }
    
    .pr-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(0, 200, 117, 0.08); color: #00C875;
      font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
      text-transform: uppercase; padding: 8px 20px; border-radius: 50px;
      margin-bottom: 20px; border: 1px solid rgba(0, 200, 117, 0.2);
    }
    .pr-title {
      font-size: 48px; font-weight: 800; color: #F7F3EC; line-height: 1.15; margin: 0 0 16px;
      letter-spacing: -0.02em;
    }
    .pr-title span {
      background: linear-gradient(135deg, #D6A756 0%, #FF9A57 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .pr-subtitle { font-size: 16px; color: #B8C1CC; max-width: 550px; margin: 0 auto 36px; line-height: 1.75; font-weight: 400; }

    /* Custom Toggler */
    .pr-toggle-wrap { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 56px; }
    .pr-toggle-label { font-size: 14px; font-weight: 600; color: #B8C1CC; transition: color 0.3s; }
    .pr-toggle-label.active { color: #F7F3EC; }
    .pr-toggle {
      width: 64px; height: 34px; border-radius: 50px;
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer; position: relative;
      transition: background 0.3s, border-color 0.3s; outline: none;
    }
    .pr-toggle:hover { border-color: rgba(0, 200, 117, 0.4); }
    .pr-toggle-thumb {
      position: absolute; top: 4px; left: 4px;
      width: 24px; height: 24px; border-radius: 50%;
      background: linear-gradient(135deg, #00C875 0%, #008f52 100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 12px rgba(0, 200, 117, 0.4);
    }
    .pr-toggle-thumb.yearly { transform: translateX(30px); }
    .pr-save-badge {
      background: linear-gradient(135deg, #D6A756 0%, #FF9A57 100%); color: #0B1220;
      font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 50px;
      box-shadow: 0 4px 15px rgba(214, 167, 86, 0.25);
    }

    /* Cards Grid */
    .pr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; align-items: stretch; }

    .pr-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 28px; padding: 44px 32px;
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s;
      position: relative; overflow: hidden;
      display: flex; flex-direction: column;
    }
    .pr-card:hover {
      transform: translateY(-8px);
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow: 0 30px 60px rgba(0,0,0,0.4);
    }
    
    /* Premium recommended card style */
    .pr-card.popular {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(214, 167, 86, 0.35);
      box-shadow: 0 25px 55px rgba(0,0,0,0.35);
      animation: pr-glow-breath 6s ease-in-out infinite alternate;
    }
    .pr-card.popular:hover {
      border-color: rgba(214, 167, 86, 0.65);
    }

    /* Luxury popular ribbon */
    .pr-popular-ribbon {
      position: absolute; top: 22px; right: -32px;
      background: linear-gradient(135deg, #D6A756 0%, #FF9A57 100%);
      color: #0B1220;
      font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em;
      padding: 6px 44px; transform: rotate(40deg);
      box-shadow: 0 4px 12px rgba(214, 167, 86, 0.2);
      animation: pr-badge-pulse-slow 4s ease-in-out infinite;
    }

    .pr-plan-emoji { font-size: 40px; margin-bottom: 16px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2)); }
    .pr-plan-name { font-size: 24px; font-weight: 800; color: #F7F3EC; margin: 0 0 6px; }
    .pr-plan-tagline { font-size: 13.5px; color: #B8C1CC; margin: 0 0 28px; line-height: 1.5; font-weight: 400; }

    .pr-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 6px; }
    .pr-currency { font-size: 22px; font-weight: 700; color: #F7F3EC; }
    .pr-amount { font-size: 52px; font-weight: 900; color: #F7F3EC; line-height: 1; letter-spacing: -0.02em; }
    .pr-period { font-size: 15px; color: #B8C1CC; font-weight: 500; }
    .pr-billed-note { font-size: 12px; color: #B8C1CC; opacity: 0.6; margin-bottom: 32px; font-weight: 500; }

    .pr-divider { height: 1px; background: linear-gradient(to right, rgba(255, 255, 255, 0.01), rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.01)); margin-bottom: 28px; }

    .pr-features { list-style: none; padding: 0; margin: 0 0 36px; display: flex; flex-direction: column; gap: 12px; }
    .pr-feat-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: #F7F3EC; line-height: 1.4; }
    .pr-feat-icon { font-size: 14px; flex-shrink: 0; display: inline-flex; margin-top: 2px; }
    .pr-feat-icon.yes { color: #00C875; }
    .pr-feat-icon.no { color: rgba(255,255,255,0.2); }
    .pr-feat-miss { color: rgba(247, 243, 236, 0.35); text-decoration: line-through; }

    /* High-end CTA Buttons */
    .pr-cta-btn {
      width: 100%; padding: 18px; border-radius: 999px; cursor: pointer;
      font-size: 13.5px; font-weight: 800; text-align: center;
      text-transform: uppercase; letter-spacing: 0.12em;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      border: none; outline: none;
      display: inline-block;
    }
    
    .pr-cta-btn.primary {
      background: linear-gradient(135deg, #00C875 0%, #00a862 100%);
      color: #0B1220;
      box-shadow: 0 12px 30px rgba(0, 200, 117, 0.25);
    }
    .pr-cta-btn.primary:hover {
      transform: scale(1.02);
      box-shadow: 0 16px 40px rgba(0, 200, 117, 0.4);
    }
    
    .pr-cta-btn.secondary {
      background: rgba(255, 255, 255, 0.05);
      color: #F7F3EC;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .pr-cta-btn.secondary:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.25);
      transform: scale(1.02);
    }
    
    /* Special Transform Pro button */
    .pr-cta-btn.pro {
      background: linear-gradient(135deg, #D6A756 0%, #FF9A57 100%);
      color: #0B1220;
      box-shadow: 0 12px 30px rgba(214, 167, 86, 0.25);
    }
    .pr-cta-btn.pro:hover {
      transform: scale(1.02);
      box-shadow: 0 16px 40px rgba(214, 167, 86, 0.45);
    }

    .pr-footer-note {
      text-align: center; margin-top: 48px;
      font-size: 13px; color: #B8C1CC; opacity: 0.5;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    /* Mobile Fallback Container */
    .pr-mobile-fallback {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 48px 24px;
      margin: 40px auto;
      max-width: 380px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 28px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      position: relative;
      z-index: 10;
    }
    .pr-mobile-icon {
      font-size: 40px;
      margin-bottom: 16px;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
    }
    .pr-mobile-title {
      font-size: 20px;
      font-weight: 800;
      color: #F7F3EC;
      margin-bottom: 10px;
    }
    .pr-mobile-text {
      font-size: 13px;
      color: #B8C1CC;
      line-height: 1.6;
      margin-bottom: 24px;
      font-weight: 400;
    }
    .pr-mobile-btn {
      width: 100%;
      padding: 16px;
      border-radius: 999px;
      background: linear-gradient(135deg, #00C875 0%, #00a862 100%);
      color: #0B1220;
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.3s ease;
      text-align: center;
      border: none;
      cursor: pointer;
    }
    .pr-mobile-btn:hover {
      transform: scale(1.02);
      box-shadow: 0 12px 25px rgba(0, 200, 117, 0.3);
    }

    @media (max-width: 968px) {
      .pr-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; gap: 28px; }
      .pr-card { padding: 36px 24px; }
      .pr-title { font-size: 36px; }
    }

    @media (max-width: 768px) {
      .pr-inner { display: none !important; }
      .pr-mobile-fallback { display: flex !important; }
    }
  `;
  document.head.appendChild(s);
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { upgradePlan, state: dashboardState } = useDashboard();

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  const handlePlanSelection = async (plan) => {
    // If not authenticated, navigate to auth setup flow
    if (!auth.isAuthenticated) {
      toast.showToast({
        type: "info",
        title: "Create Account First",
        message: "Please sign up to activate your premium membership.",
      });
      navigate("/signup", { state: { selectedPlan: plan.internalName } });
      return;
    }

    // Process plan upgrade
    try {
      // 1. Update backend profile if not basic
      if (plan.internalName !== "Basic") {
        await updateProfile({ premiumStatus: true });
        auth.updateUser({ plan: plan.internalName, isPremium: true });
      } else {
        await updateProfile({ premiumStatus: false });
        auth.updateUser({ plan: plan.internalName, isPremium: false });
      }

      // 2. Update dashboard store activePlan
      upgradePlan(plan.internalName);

      toast.showToast({
        type: "success",
        title: "Plan Updated",
        message: `Successfully upgraded to the ${plan.name} plan!`,
      });

      // 3. Return to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Upgrade error:", err);
      toast.showToast({
        type: "error",
        title: "Upgrade Failed",
        message: "There was an error updating your subscription. Please try again.",
      });
    }
  };

  return (
    <section className="pr-section py-20 relative">
      {/* ─── Ambient Animated Background Blobs ─── */}
      <motion.div
        animate={{ 
          x: [-30, 30, -30],
          y: [-20, 20, -20],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-[#00C875]/3 to-[#00C875]/0 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ 
          x: [25, -25, 25],
          y: [30, -30, 30],
          scale: [1.05, 0.95, 1.05]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-[5%] w-[450px] h-[450px] bg-gradient-to-tr from-[#D6A756]/3 to-[#D6A756]/0 rounded-full blur-[125px] pointer-events-none"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              bottom: "-10px",
              backgroundColor: p.color,
            }}
            animate={{
              y: ["0px", "-900px"],
              opacity: [0, 0.65, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="pr-inner px-4">
        <ScrollReveal>
          <div className="pr-header text-center">
            <div className="pr-badge">💎 MEMBERSHIP PASS</div>
            <h2 className="pr-title">Choose Your <span>Path</span></h2>
            <p className="pr-subtitle">
              Embark on a customized journey of physical health, mindfulness, and luxury spiritual connection. Start today.
            </p>
            <div className="pr-toggle-wrap">
              <span className={`pr-toggle-label ${!yearly ? "active" : ""}`}>Monthly Billing</span>
              <button className="pr-toggle" onClick={() => setYearly(!yearly)} type="button" aria-label="Toggle billing">
                <div className={`pr-toggle-thumb ${yearly ? "yearly" : ""}`} />
              </button>
              <span className={`pr-toggle-label ${yearly ? "active" : ""}`}>Yearly Saver</span>
              <span className="pr-save-badge">Save 20%</span>
            </div>
          </div>
        </ScrollReveal>

        <StaggerGroup className="pr-grid" staggerDelay={0.12}>
          {plans.map((plan) => {
            const isCurrentPlan = dashboardState?.activePlan === plan.internalName;
            return (
              <div className={`pr-card ${plan.popular ? "popular" : ""} h-full`} key={plan.name}>
                {plan.popular && <div className="pr-popular-ribbon">Most Popular</div>}
                
                <div className="pr-plan-emoji">{plan.emoji}</div>
                <h3 className="pr-plan-name">{plan.name}</h3>
                <p className="pr-plan-tagline">{plan.tagline}</p>
                
                <div className="pr-price">
                  <span className="pr-currency">₹</span>
                  <span className="pr-amount">{yearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                  <span className="pr-period">/mo</span>
                </div>
                <p className="pr-billed-note">
                  {yearly ? "Billed annually" : "Billed monthly"}
                </p>
                
                <div className="pr-divider" />
                
                <ul className="pr-features flex-1">
                  {plan.features.map((f) => (
                    <li className="pr-feat-item" key={f}>
                      <span className="pr-feat-icon yes">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li className="pr-feat-item pr-feat-miss" key={f}>
                      <span className="pr-feat-icon no">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  type="button"
                  onClick={() => handlePlanSelection(plan)}
                  className={`pr-cta-btn mt-auto ${
                    isCurrentPlan 
                      ? "secondary opacity-60 cursor-default" 
                      : plan.popular 
                      ? "pro" 
                      : "primary"
                  }`}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? "Current Plan" : plan.cta}
                </button>
              </div>
            );
          })}
        </StaggerGroup>

        <ScrollReveal delay={0.35}>
          <p className="pr-footer-note">
            🔒 Secure payment · 7-day free trial · Cancel anytime · No credit card required to start
          </p>
        </ScrollReveal>
      </div>

      {/* Mobile fallback view */}
      <div className="pr-mobile-fallback">
        <div className="pr-mobile-icon">🖥️</div>
        <h3 className="pr-mobile-title">Elevate on Desktop</h3>
        <p className="pr-mobile-text">
          Our premium membership plans and AI onboarding pathways are optimized for larger displays. Please open this portal on a tablet or desktop computer to select your path.
        </p>
        <button
          type="button"
          onClick={() => navigate(auth.isAuthenticated ? "/dashboard" : "/")}
          className="pr-mobile-btn"
        >
          {auth.isAuthenticated ? "Back to Dashboard" : "Back to Home"}
        </button>
      </div>
    </section>
  );
}
