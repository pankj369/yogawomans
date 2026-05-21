import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import sacredimage from "../assets/images/sacredimage.png";

const stats = [
  { icon: "🧘", end: 10000, suffix: "+", label: "Students" },
  { icon: "⭐", end: 50, suffix: "+", label: "Expert Instructors" },
  { icon: "🏆", end: 15, suffix: "+", label: "Years Experience" },
  { icon: "🌍", end: 25, suffix: "+", label: "Cities Reached" },
];

const features = [
  {
    icon: "🌿",
    title: "Ancient Roots",
    desc: "Grounded in 5000+ years of yogic tradition and wisdom.",
  },
  {
    icon: "💡",
    title: "Modern Approach",
    desc: "Science-backed methods tailored for today's lifestyle.",
  },
  {
    icon: "🤝",
    title: "Community First",
    desc: "A nurturing space where every journey is celebrated.",
  },
];

const trustBadges = [
  { icon: "✓", label: "Certified Instructors" },
  { icon: "✓", label: "Trusted by 10k+ Students" },
  { icon: "✓", label: "Online & Offline Classes" },
];

// Inject fonts + keyframes once
if (!document.head.querySelector("[data-yoga-about]")) {
  const s = document.createElement("style");
  s.setAttribute("data-yoga-about", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700&display=swap');

    @keyframes yoga-fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes yoga-scaleIn {
      from { opacity: 0; transform: scale(0.88); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes yoga-floatOrb {
      0%, 100% { transform: translateY(0px) scale(1); }
      50%       { transform: translateY(-18px) scale(1.04); }
    }
    @keyframes yoga-rotateLotus {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes yoga-countUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes yoga-floatingImage {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }

    .yoga-about-section *,
    .yoga-about-section *::before,
    .yoga-about-section *::after {
      box-sizing: border-box;
    }

    .yoga-about-section {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(180deg, #ffffff 0%, #f6fbf3 100%);
      padding: 90px 28px;
      position: relative;
      overflow: hidden;
    }

    /* ---------- Background orbs ---------- */
    .yoga-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
    .yoga-orb-1 {
      width: 420px; height: 420px;
      top: -140px; left: -120px;
      background: radial-gradient(circle, rgba(46,125,50,0.07) 0%, transparent 70%);
      animation: yoga-floatOrb 7s ease-in-out infinite;
    }
    .yoga-orb-2 {
      width: 320px; height: 320px;
      bottom: -100px; right: -80px;
      background: radial-gradient(circle, rgba(232,101,26,0.07) 0%, transparent 70%);
      animation: yoga-floatOrb 9s ease-in-out infinite reverse;
    }
    .yoga-orb-3 {
      width: 200px; height: 200px;
      top: 40%; left: 50%;
      transform: translateX(-50%);
      background: radial-gradient(circle, rgba(46,125,50,0.04) 0%, transparent 70%);
      animation: yoga-floatOrb 11s ease-in-out infinite;
    }

    /* ---------- Inner layout ---------- */
    .yoga-about-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 72px;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    /* ---------- LEFT SIDE ---------- */
    .yoga-left { }

    .yoga-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(46,125,50,0.09);
      color: #2E7D32;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 7px 18px;
      border-radius: 50px;
      margin-bottom: 22px;
      border: 1px solid rgba(46,125,50,0.18);
    }

    .yoga-heading {
      font-size: 42px;
      font-weight: 800;
      color: #1A2E1A;
      line-height: 1.18;
      margin: 0 0 24px;
    }
    .yoga-heading .accent-orange { color: #E8651A; }
    .yoga-heading .accent-green  { color: #2E7D32; }

    .yoga-desc {
      font-family: 'Lato', sans-serif;
      font-size: 16.5px;
      color: #555;
      line-height: 1.8;
      margin: 0 0 32px;
      max-width: 480px;
    }

    /* Feature pills */
    .yoga-features {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 38px;
    }
    .yoga-feature-pill {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(255,255,255,0.72);
      border: 1px solid rgba(46,125,50,0.12);
      border-radius: 18px;
      padding: 18px 20px;
      backdrop-filter: blur(18px);
      transition: transform 0.28s ease, border-color 0.28s ease, background 0.28s ease;
    }
    .yoga-feature-pill:hover {
      border-color: rgba(46,125,50,0.24);
      background: rgba(46,125,50,0.08);
      transform: translateX(4px);
    }
    .yoga-pill-icon {
      font-size: 24px;
      flex-shrink: 0;
    }
    .yoga-pill-title {
      font-size: 14px;
      font-weight: 700;
      color: #1A2E1A;
      margin: 0 0 4px;
    }
    .yoga-pill-desc {
      font-family: 'Lato', sans-serif;
      font-size: 13px;
      color: #777;
      margin: 0;
    }

    /* CTA button */
    .yoga-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, rgba(46,125,50,0.95), rgba(232,101,26,0.95));
      color: #fff;
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 700;
      padding: 16px 38px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.18);
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      box-shadow: 0 18px 40px rgba(46,125,50,0.18);
      transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .yoga-cta-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top left, rgba(255,255,255,0.3), transparent 38%);
      opacity: 0.4;
      transition: opacity 0.3s ease;
    }
    .yoga-cta-btn:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 24px 54px rgba(232,101,26,0.22);
    }
    .yoga-cta-btn:hover::before {
      opacity: 0.55;
    }
    .yoga-cta-btn .arrow {
      font-size: 18px;
      transition: transform 0.3s ease;
      position: relative;
      display: inline-flex;
    }
    .yoga-cta-btn:hover .arrow {
      transform: translateX(5px);
    }

    .yoga-trust-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 28px;
    }
    .yoga-trust-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 999px;
      background: rgba(255,255,255,0.72);
      border: 1px solid rgba(46,125,50,0.12);
      font-size: 12px;
      font-weight: 700;
      color: #1A2E1A;
      backdrop-filter: blur(16px);
      transition: transform 0.25s ease, border-color 0.25s ease;
    }
    .yoga-trust-badge:hover {
      transform: translateY(-2px);
      border-color: rgba(46,125,50,0.24);
    }

    /* ---------- RIGHT SIDE ---------- */
    .yoga-right {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .yoga-image-panel {
      position: relative;
      overflow: hidden;
      width: 100%;
      max-width: 100%;
      border-radius: 34px;
      background: rgba(255,255,255,0.72);
      border: 1px solid rgba(46,125,50,0.16);
      box-shadow: 0 30px 70px rgba(46,125,50,0.08);
      padding: 24px;
      backdrop-filter: blur(20px);
      transition: transform 0.35s ease, box-shadow 0.35s ease;
    }
    .yoga-image-panel:hover {
      transform: translateY(-5px);
      box-shadow: 0 36px 88px rgba(46,125,50,0.14);
    }
    .yoga-image-glow {
      position: absolute;
      inset: -24px;
      background: radial-gradient(circle at 50% 20%, rgba(232,101,26,0.16), transparent 42%);
      filter: blur(32px);
      pointer-events: none;
      z-index: 0;
    }
    .yoga-yoga-image {
      position: relative;
      width: 100%;
      height: auto;
      border-radius: 28px;
      object-fit: cover;
      box-shadow: 0 18px 40px rgba(0,0,0,0.12);
      animation: yoga-floatingImage 12s ease-in-out infinite;
      z-index: 1;
    }
    .yoga-image-label {
      position: absolute;
      right: 20px;
      bottom: 20px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 999px;
      background: rgba(255,255,255,0.72);
      border: 1px solid rgba(232,101,26,0.16);
      color: #1A2E1A;
      font-size: 12px;
      font-weight: 700;
      backdrop-filter: blur(16px);
      z-index: 2;
    }

    .yoga-visual-card {
      background: rgba(255,255,255,0.72);
      border: 1px solid rgba(46,125,50,0.15);
      border-radius: 28px;
      padding: 40px 34px;
      position: relative;
      overflow: hidden;
      width: 100%;
      max-width: 100%;
      backdrop-filter: blur(24px);
      box-shadow: 0 22px 60px rgba(46,125,50,0.1);
    }
    .yoga-visual-card::before {
      content: '';
      position: absolute;
      top: -28px;
      right: -28px;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: rgba(232,101,26,0.12);
      filter: blur(16px);
    }
    .yoga-visual-card::after {
      content: '';
      position: absolute;
      bottom: -20px;
      left: -20px;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: rgba(46,125,50,0.10);
      filter: blur(14px);
    }

    .yoga-quote-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 66px;
      height: 66px;
      border-radius: 50%;
      background: rgba(46,125,50,0.12);
      color: #2E7D32;
      font-size: 32px;
      margin-bottom: 22px;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5);
    }
    .yoga-quote {
      font-family: 'Lato', sans-serif;
      font-size: 18px;
      font-style: italic;
      color: #1A2E1A;
      font-weight: 700;
      line-height: 1.75;
      margin: 0 0 18px;
      position: relative;
      z-index: 1;
    }
    .yoga-quote-attr {
      font-family: 'Lato', sans-serif;
      font-size: 13px;
      color: #66755c;
      margin: 0;
      position: relative;
      z-index: 1;
    }
    .yoga-quote-lotus {
      position: absolute;
      right: 24px;
      top: 30px;
      font-size: 24px;
      color: rgba(232,101,26,0.24);
      animation: yoga-rotateLotus 16s linear infinite;
      z-index: 0;
    }

    .yoga-stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .yoga-stat-card {
      background: rgba(255,255,255,0.72);
      border: 1.5px solid rgba(46,125,50,0.14);
      border-radius: 22px;
      padding: 24px 18px;
      text-align: center;
      transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
      cursor: default;
      backdrop-filter: blur(18px);
    }
    .yoga-stat-card:hover {
      border-color: rgba(46,125,50,0.22);
      transform: translateY(-6px);
      box-shadow: 0 18px 34px rgba(46,125,50,0.12);
    }
    .yoga-stat-icon {
      font-size: 28px;
      margin-bottom: 12px;
    }
    .yoga-stat-value {
      font-size: 32px;
      font-weight: 800;
      color: #1A2E1A;
      line-height: 1.05;
      margin-bottom: 8px;
    }
    .yoga-stat-value span {
      color: #E8651A;
    }
    .yoga-stat-label {
      font-family: 'Lato', sans-serif;
      font-size: 12px;
      color: #888;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* ---------- Divider ---------- */
    .yoga-section-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 64px;
      position: relative;
      z-index: 1;
    }
    .yoga-div-line {
      flex: 1;
      max-width: 160px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(46,125,50,0.3), transparent);
    }

    /* ---------- Animations on mount ---------- */
    .yoga-anim-left {
      animation: yoga-fadeUp 0.7s ease both;
    }
    .yoga-anim-right {
      animation: yoga-scaleIn 0.7s 0.2s ease both;
    }
    .yoga-anim-stat {
      animation: yoga-countUp 0.5s ease both;
    }
    .yoga-anim-stat:nth-child(1) { animation-delay: 0.1s; }
    .yoga-anim-stat:nth-child(2) { animation-delay: 0.2s; }
    .yoga-anim-stat:nth-child(3) { animation-delay: 0.3s; }
    .yoga-anim-stat:nth-child(4) { animation-delay: 0.4s; }

    /* ---------- Responsive ---------- */
    @media (max-width: 768px) {
      .yoga-about-section {
        padding: 72px 20px;
      }
      .yoga-about-inner {
        grid-template-columns: 1fr;
        gap: 36px;
      }
      .yoga-heading { font-size: 34px; }
      .yoga-left { order: 1; }
      .yoga-right {
        order: 2;
        align-items: center;
      }
      .yoga-trust-grid { grid-template-columns: 1fr; }
      .yoga-image-panel { padding: 20px; }
      .yoga-visual-card { padding: 30px 24px; }
      .yoga-quote { font-size: 18px; }
    }
  `;
  document.head.appendChild(s);
}

export default function AboutUs() {
  const [visible, setVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.getBoundingClientRect().top;
      setScrollOffset(Math.max(-28, Math.min(28, -top * 0.04)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="yoga-about-section" ref={sectionRef}>
      {/* Background orbs */}
      <div className="yoga-orb yoga-orb-1" aria-hidden="true" />
      <div className="yoga-orb yoga-orb-2" aria-hidden="true" />
      <div className="yoga-orb yoga-orb-3" aria-hidden="true" />

      <div className="yoga-about-inner">

        {/* ── LEFT ── */}
        <div className={`yoga-left ${visible ? "yoga-anim-left" : ""}`}
             style={{ opacity: visible ? 1 : 0 }}>

          <div className="yoga-badge">
            <span>🌿</span> Who We Are
          </div>

          <h2 className="yoga-heading">
            Ancient <span className="accent-orange">Wisdom,</span>
            <br />
            Modern <span className="accent-green">Wellness</span>
          </h2>

          <p className="yoga-desc">
            At YOGAWOMANS, we believe that true wellness begins from within.
            Founded on the timeless principles of yoga, we bring together
            expert instructors, personalized programs, and a supportive
            community to help you transform your mind, body, and soul.
          </p>

          {/* Feature pills */}
          <div className="yoga-features">
            {features.map((f) => (
              <div className="yoga-feature-pill" key={f.title}>
                <span className="yoga-pill-icon" aria-hidden="true">{f.icon}</span>
                <div>
                  <p className="yoga-pill-title">{f.title}</p>
                  <p className="yoga-pill-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/auth" className="yoga-cta-btn" style={{display: 'inline-block'}}>
            Discover Our Story
            <span className="arrow" aria-hidden="true">→</span>
          </Link>

          <div className="yoga-trust-grid">
            {trustBadges.map((badge) => (
              <div className="yoga-trust-badge" key={badge.label}>
                <span aria-hidden="true">{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className={`yoga-right ${visible ? "yoga-anim-right" : ""}`}
             style={{ opacity: visible ? 1 : 0 }}>

          <div className="yoga-image-panel"
               style={{ transform: `translateY(${scrollOffset}px)` }}>
            <div className="yoga-image-glow" aria-hidden="true" />
            <img
              src={sacredimage}
              alt="Yoga woman practicing wellness"
              className="yoga-yoga-image"
            />
            <div className="yoga-image-label">Sacred Flow</div>
          </div>

          <div className="yoga-visual-card">
            <div className="yoga-quote-icon" aria-hidden="true">“</div>
            <p className="yoga-quote">
              "Yoga is not about touching your toes.<br />
              It's about what you learn on the way down."
            </p>
            <p className="yoga-quote-attr">— Jigar Gor</p>
            <div className="yoga-quote-lotus" aria-hidden="true">🪷</div>
          </div>
        </div>
      </div>

      {/* Bottom decorative divider */}
      <div className="yoga-section-divider" aria-hidden="true">
        <div className="yoga-div-line" />
        <span style={{ fontSize: 20 }}>🪷</span>
        <div className="yoga-div-line" />
      </div>
    </section>
  );
}
