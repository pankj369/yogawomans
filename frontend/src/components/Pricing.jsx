// src/components/Pricing.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter Free",
    emoji: "🌱",
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: "#2E7D32",
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
    name: "Wellness",
    emoji: "🌸",
    monthlyPrice: 999,
    yearlyPrice: 799,
    color: "#E8651A",
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
    cta: "JOIN WELLNESS PLAN",
    popular: true,
  },
  {
    name: "Transform",
    emoji: "🏆",
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    color: "#5B6ABF",
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
    popular: false,
  },
];

if (!document.head.querySelector("[data-pricing]")) {
  const s = document.createElement("style");
  s.setAttribute("data-pricing", "true");
  s.textContent = `
    @keyframes pr-up {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pr-badge-pulse {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.06); }
    }

    .pr-section {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(180deg, #fff 0%, #f6fbf3 100%);
      padding: 90px 28px;
      position: relative;
      overflow: hidden;
    }
    .pr-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

    .pr-header { text-align: center; margin-bottom: 48px; animation: pr-up 0.6s ease both; }
    .pr-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(46,125,50,0.09); color: #2E7D32;
      font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
      text-transform: uppercase; padding: 7px 18px; border-radius: 50px;
      margin-bottom: 16px; border: 1px solid rgba(46,125,50,0.18);
    }
    .pr-title {
      font-size: 42px; font-weight: 800; color: #1A2E1A; line-height: 1.18; margin: 0 0 16px;
    }
    .pr-title .ot { color: #E8651A; }
    .pr-subtitle { font-size: 16px; color: #777; max-width: 480px; margin: 0 auto 28px; line-height: 1.75; }

    /* Toggle */
    .pr-toggle-wrap { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 48px; }
    .pr-toggle-label { font-size: 14px; font-weight: 600; color: #888; transition: color 0.2s; }
    .pr-toggle-label.active { color: #1A2E1A; }
    .pr-toggle {
      width: 56px; height: 30px; border-radius: 50px;
      background: #2E7D32; border: none; cursor: pointer; position: relative;
      transition: background 0.3s; outline: none;
    }
    .pr-toggle-thumb {
      position: absolute; top: 4px; left: 4px;
      width: 22px; height: 22px; border-radius: 50%;
      background: #fff; transition: transform 0.3s ease;
      box-shadow: 0 2px 6px rgba(0,0,0,0.18);
    }
    .pr-toggle-thumb.yearly { transform: translateX(26px); }
    .pr-save-badge {
      background: #E8651A; color: #fff;
      font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 50px;
      animation: pr-badge-pulse 2s ease-in-out infinite;
    }

    /* Grid */
    .pr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: start; }

    .pr-card {
      background: rgba(255,255,255,0.7); border: 1px solid rgba(210,190,165,0.3);
      border-radius: 24px; padding: 36px 28px;
      backdrop-filter: blur(24px); box-shadow: 0 14px 35px rgba(0,0,0,0.03);
      transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
      animation: pr-up 0.6s ease both;
      position: relative; overflow: hidden;
    }
    .pr-card:nth-child(1) { animation-delay: 0.1s; }
    .pr-card:nth-child(2) { animation-delay: 0.2s; }
    .pr-card:nth-child(3) { animation-delay: 0.3s; }
    .pr-card.popular {
      border-color: rgba(226,114,41,0.4);
      box-shadow: 0 20px 60px rgba(226,114,41,0.08);
      transform: scale(1.03);
      background: rgba(255,255,255,0.85);
    }
    .pr-card.popular:hover { transform: scale(1.03) translateY(-4px); box-shadow: 0 30px 70px rgba(226,114,41,0.12); }
    .pr-card:not(.popular):hover { transform: translateY(-4px); box-shadow: 0 24px 50px rgba(0,0,0,0.05); }

    .pr-popular-ribbon {
      position: absolute; top: 18px; right: -28px;
      background: #E8651A; color: #fff;
      font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;
      padding: 6px 42px; transform: rotate(40deg);
    }

    .pr-plan-emoji { font-size: 36px; margin-bottom: 12px; }
    .pr-plan-name { font-size: 22px; font-weight: 800; color: #1A2E1A; margin: 0 0 4px; }
    .pr-plan-tagline { font-size: 13px; color: #888; margin: 0 0 24px; line-height: 1.5; }

    .pr-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 6px; }
    .pr-currency { font-size: 20px; font-weight: 700; color: #1A2E1A; }
    .pr-amount { font-size: 48px; font-weight: 900; color: #1A2E1A; line-height: 1; }
    .pr-period { font-size: 14px; color: #888; }
    .pr-billed-note { font-size: 12px; color: #aaa; margin-bottom: 28px; }

    .pr-divider { height: 1px; background: rgba(46,125,50,0.1); margin-bottom: 22px; }

    .pr-features { list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 10px; }
    .pr-feat-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #444; }
    .pr-feat-icon { font-size: 16px; flex-shrink: 0; }
    .pr-feat-miss { color: #ccc; text-decoration: line-through; }

    .pr-cta-btn {
      width: 100%; padding: 16px; border-radius: 999px; border: none; cursor: pointer;
      font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.08em;
      transition: transform 0.28s ease, box-shadow 0.28s ease;
    }
    .pr-cta-btn.primary {
      background: linear-gradient(135deg, #E27229, #d5631c);
      color: #fff;
      box-shadow: 0 16px 35px rgba(226,114,41,0.15);
    }
    .pr-cta-btn.secondary {
      background: rgba(255,255,255,0.5);
      color: #1A2E1A;
      border: 1px solid rgba(210,190,165,0.4);
    }
    .pr-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }

    .pr-footer-note {
      text-align: center; margin-top: 40px;
      font-size: 13px; color: #aaa;
      animation: pr-up 0.6s 0.5s ease both;
    }

    @media (max-width: 900px) {
      .pr-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
      .pr-card.popular { transform: scale(1); }
      .pr-title { font-size: 30px; }
    }
  `;
  document.head.appendChild(s);
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="pr-section">
      <div className="pr-inner">
        <div className="pr-header">
          <div className="pr-badge">💎 Simple Pricing</div>
          <h2 className="pr-title">Choose Your <span className="ot">Path</span></h2>
          <p className="pr-subtitle">
            Transparent pricing. No hidden fees. Cancel anytime. Start your free 7-day trial on any plan.
          </p>
          <div className="pr-toggle-wrap">
            <span className={`pr-toggle-label ${!yearly ? "active" : ""}`}>Monthly</span>
            <button className="pr-toggle" onClick={() => setYearly(!yearly)} type="button" aria-label="Toggle billing">
              <div className={`pr-toggle-thumb ${yearly ? "yearly" : ""}`} />
            </button>
            <span className={`pr-toggle-label ${yearly ? "active" : ""}`}>Yearly</span>
            <span className="pr-save-badge">Save 20%</span>
          </div>
        </div>

        <div className="pr-grid">
          {plans.map((plan) => (
            <div className={`pr-card ${plan.popular ? "popular" : ""}`} key={plan.name}>
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
              <ul className="pr-features">
                {plan.features.map((f) => (
                  <li className="pr-feat-item" key={f}>
                    <span className="pr-feat-icon">✅</span> {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li className="pr-feat-item pr-feat-miss" key={f}>
                    <span className="pr-feat-icon">✗</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className={`pr-cta-btn ${plan.popular ? "primary" : "secondary"}`}
                style={{display: 'inline-block'}}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="pr-footer-note">
          🔒 Secure payment · 7-day free trial · Cancel anytime · No credit card required to start
        </p>
      </div>
    </section>
  );
}
