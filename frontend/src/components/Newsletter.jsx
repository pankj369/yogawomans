// src/components/Newsletter.jsx
import { useState } from "react";

if (!document.head.querySelector("[data-newsletter]")) {
  const s = document.createElement("style");
  s.setAttribute("data-newsletter", "true");
  s.textContent = `
    @keyframes nl-up {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes nl-float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      33%       { transform: translateY(-10px) rotate(3deg); }
      66%       { transform: translateY(-5px) rotate(-2deg); }
    }
    @keyframes nl-success {
      0%   { transform: scale(0.8); opacity: 0; }
      50%  { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes nl-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .nl-section {
      font-family: 'Poppins', sans-serif;
      padding: 90px 28px;
      background: linear-gradient(180deg, #fff 0%, #f6fbf3 100%);
      position: relative;
      overflow: hidden;
    }
    .nl-section::before {
      content: '';
      position: absolute;
      top: -120px; left: -120px;
      width: 400px; height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(46,125,50,0.06), transparent 70%);
      animation: nl-float 10s ease-in-out infinite;
    }
    .nl-section::after {
      content: '';
      position: absolute;
      bottom: -80px; right: -80px;
      width: 320px; height: 320px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(232,101,26,0.07), transparent 70%);
      animation: nl-float 13s ease-in-out infinite reverse;
    }

    .nl-inner {
      max-width: 680px; margin: 0 auto;
      position: relative; z-index: 1;
      text-align: center;
      animation: nl-up 0.7s ease both;
    }

    .nl-card {
      background: rgba(255,255,255,0.85);
      border: 1.5px solid rgba(46,125,50,0.14);
      border-radius: 36px;
      padding: 60px 52px;
      backdrop-filter: blur(24px);
      box-shadow: 0 24px 72px rgba(46,125,50,0.1);
      position: relative;
      overflow: hidden;
    }
    .nl-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, #2E7D32, #E8651A, #2E7D32);
      background-size: 200% auto;
      animation: nl-shimmer 3s linear infinite;
    }

    .nl-emoji {
      font-size: 52px;
      margin-bottom: 20px;
      display: block;
      animation: nl-float 6s ease-in-out infinite;
    }

    .nl-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(46,125,50,0.09); color: #2E7D32;
      font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
      text-transform: uppercase; padding: 7px 18px; border-radius: 50px;
      margin-bottom: 20px; border: 1px solid rgba(46,125,50,0.18);
    }

    .nl-title {
      font-size: 38px; font-weight: 800; color: #1A2E1A;
      line-height: 1.2; margin: 0 0 14px;
    }
    .nl-title .ot { color: #E8651A; }
    .nl-title .gr { color: #2E7D32; }

    .nl-subtitle {
      font-size: 16px; color: #666; line-height: 1.75; margin: 0 0 36px;
    }

    .nl-form {
      display: flex; gap: 12px; max-width: 500px; margin: 0 auto 24px;
    }
    .nl-input {
      flex: 1; padding: 16px 22px; border-radius: 999px;
      border: 1.5px solid rgba(46,125,50,0.18);
      background: rgba(255,255,255,0.9);
      font-family: 'Poppins', sans-serif; font-size: 14px; color: #1A2E1A;
      outline: none; transition: border-color 0.28s ease, box-shadow 0.28s ease;
    }
    .nl-input::placeholder { color: #aaa; }
    .nl-input:focus {
      border-color: #2E7D32;
      box-shadow: 0 0 0 3px rgba(46,125,50,0.1);
    }
    .nl-submit {
      padding: 16px 28px; border-radius: 999px; border: none; cursor: pointer;
      background: linear-gradient(135deg, #2E7D32, #E8651A);
      color: #fff; font-family: 'Poppins', sans-serif;
      font-size: 14px; font-weight: 700;
      white-space: nowrap;
      transition: transform 0.28s ease, box-shadow 0.28s ease;
      box-shadow: 0 12px 32px rgba(46,125,50,0.24);
    }
    .nl-submit:hover { transform: translateY(-3px); box-shadow: 0 18px 42px rgba(46,125,50,0.3); }
    .nl-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

    .nl-success {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      animation: nl-success 0.5s ease both;
    }
    .nl-success-icon { font-size: 56px; }
    .nl-success-text { font-size: 20px; font-weight: 800; color: #2E7D32; }
    .nl-success-sub { font-size: 14px; color: #888; }

    .nl-perks {
      display: flex; justify-content: center; flex-wrap: wrap; gap: 16px;
    }
    .nl-perk {
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; color: #666;
    }
    .nl-perk-icon { font-size: 16px; }

    .nl-privacy {
      font-size: 12px; color: #aaa; margin: 0;
    }

    @media (max-width: 600px) {
      .nl-card { padding: 40px 24px; }
      .nl-form { flex-direction: column; }
      .nl-title { font-size: 28px; }
      .nl-submit { width: 100%; }
    }
  `;
  document.head.appendChild(s);
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section className="nl-section">
      <div className="nl-inner">
        <div className="nl-card">
          {submitted ? (
            <div className="nl-success">
              <div className="nl-success-icon">🎉</div>
              <div className="nl-success-text">Aap join ho gayi hain! 🙏</div>
              <div className="nl-success-sub">
                Aapka pehla wellness tip jaldi hi aayega. Inbox check karte rahiye!
              </div>
            </div>
          ) : (
            <>
              <span className="nl-emoji">💌</span>
              <div className="nl-badge">✨ Free Wellness Tips</div>
              <h2 className="nl-title">
                Weekly <span className="gr">Yoga</span> &{" "}
                <span className="ot">Wellness</span> Tips
              </h2>
              <p className="nl-subtitle">
                Har hafte paayein expert yoga tips, breathing exercises, aur mindfulness
                practices — seedha aapke inbox mein. Bilkul free!
              </p>
              <form className="nl-form" onSubmit={handleSubmit}>
                <input
                  className="nl-input"
                  type="email"
                  placeholder="Aapka email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <button className="nl-submit" type="submit" disabled={loading}>
                  {loading ? "Joining..." : "Join Free →"}
                </button>
              </form>
              <div className="nl-perks">
                <div className="nl-perk"><span className="nl-perk-icon">✅</span> No spam, ever</div>
                <div className="nl-perk"><span className="nl-perk-icon">🎁</span> Free yoga guide on signup</div>
                <div className="nl-perk"><span className="nl-perk-icon">🔕</span> Unsubscribe anytime</div>
              </div>
              <p className="nl-privacy" style={{ marginTop: 16 }}>
                🔒 Aapki information 100% safe hai. Hum kabhi share nahi karte.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
