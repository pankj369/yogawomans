import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users, Globe, Clock, DollarSign, Award, Heart } from "lucide-react";
import sacredimage from "../assets/images/sacredimage.png";
import ScrollReveal from "./ui/animations/ScrollReveal";
import StaggerGroup from "./ui/animations/StaggerGroup";

const features = [
  {
    icon: Users,
    title: "Expert Instructors",
    desc: "Certified yoga teachers with 10+ years of hands-on teaching experience.",
  },
  {
    icon: Globe,
    title: "Online & Offline Classes",
    desc: "Practice from home or join us at our serene studio — your choice.",
  },
  {
    icon: Award,
    title: "Personalized Programs",
    desc: "Custom yoga plans based on your unique goals and current fitness level.",
  },
  {
    icon: Heart,
    title: "Global Community",
    desc: "Join 10,000+ students across 25+ cities who've transformed their lives.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Morning, evening & weekend batches designed to fit your lifestyle.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    desc: "Premium yoga experience at prices that everyone can comfortably afford.",
  },
];

const stats = [
  { value: "10K+", label: "Students" },
  { value: "25+", label: "Cities" },
  { value: "120+", label: "Sessions" },
];

if (!document.head.querySelector("[data-yoga-why]")) {
  const s = document.createElement("style");
  s.setAttribute("data-yoga-why", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700&display=swap');

    @keyframes yw-floatGlow {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-10px) scale(1.02); }
    }

    .yw-section {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(180deg, #fef7f0 0%, #f5e6d3 50%, #e8d5c4 100%);
      padding: 90px 28px;
      position: relative;
      overflow: hidden;
    }

    .yw-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
    .yw-orb-1 {
      width: 400px;
      height: 400px;
      top: -100px;
      left: -100px;
      background: radial-gradient(circle, rgba(232,101,26,0.08) 0%, transparent 70%);
      animation: yw-floatGlow 8s ease-in-out infinite;
    }
    .yw-orb-2 {
      width: 350px;
      height: 350px;
      bottom: -80px;
      right: -80px;
      background: radial-gradient(circle, rgba(46,125,50,0.06) 0%, transparent 70%);
      animation: yw-floatGlow 10s ease-in-out infinite reverse;
    }

    .yw-inner {
      max-width: 1400px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 60px;
    }

    .yw-hero-row {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .yw-hero-left { }

    .yw-hero-right {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .yw-top {
      text-align: center;
      margin-bottom: 30px;
    }
    .ins-badge {
      display: inline-block;
      background: linear-gradient(135deg, #E8651A, #FF8A65);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
      box-shadow: 0 16px 35px rgba(226, 114, 41, 0.12);
    }
    .yw-heading {
      font-size: 42px;
      font-weight: 800;
      color: #1A2E1A;
      margin: 0 0 16px;
      line-height: 1.2;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    .yw-heading .acc { color: #E8651A; }
    .yw-subtext {
      font-family: 'Lato', sans-serif;
      font-size: 18px;
      color: #555;
      line-height: 1.7;
      margin: 0;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .yw-stats {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }
    .yw-stat {
      text-align: center;
      padding: 12px 16px;
      background: rgba(255,255,255,0.7);
      border-radius: 12px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(46,125,50,0.1);
      min-width: 80px;
      flex: 1;
      max-width: 100px;
    }
    .yw-stat-value {
      font-size: 20px;
      font-weight: 800;
      color: #2E7D32;
      margin-bottom: 2px;
    }
    .yw-stat-label {
      font-size: 11px;
      color: #777;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .yw-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .yw-card {
      background: rgba(255,255,255,0.6);
      border: 1px solid rgba(46,125,50,0.15);
      border-radius: 24px;
      padding: 24px 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.03);
      transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      position: relative;
      overflow: hidden;
      cursor: default;
    }
    .yw-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(232,101,26,0.05), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 24px;
    }
    .yw-card:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow: 0 24px 50px rgba(0,0,0,0.05);
      border-color: rgba(210,190,165,0.4);
    }
    .yw-card:hover::before {
      opacity: 1;
    }

    .yw-icon-wrap {
      width: 60px;
      height: 60px;
      border-radius: 16px;
      background: rgba(46,125,50,0.1);
      border: 1px solid rgba(46,125,50,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2E7D32;
      margin-bottom: 16px;
      transition: all 0.3s ease;
    }
    .yw-card:hover .yw-icon-wrap {
      background: rgba(226,114,41,0.1);
      border-color: rgba(226,114,41,0.2);
      color: #E27229;
      transform: scale(1.04);
    }

    .yw-card-title {
      font-size: 16px;
      font-weight: 700;
      color: #1A2E1A;
      margin: 0 0 8px;
    }
    .yw-card-desc {
      font-family: 'Lato', sans-serif;
      font-size: 13px;
      color: #666;
      line-height: 1.5;
      margin: 0;
    }

    .yw-card-num {
      position: absolute;
      top: 16px;
      right: 18px;
      font-size: 48px;
      font-weight: 900;
      color: rgba(46,125,50,0.05);
      line-height: 1;
      z-index: 0;
    }

    .yw-image-container {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }
    .yw-image-glow {
      position: absolute;
      inset: -40px;
      background: radial-gradient(circle at 50% 30%, rgba(232,101,26,0.2), transparent 60%);
      border-radius: 50%;
      filter: blur(40px);
      animation: yw-floatGlow 6s ease-in-out infinite;
      z-index: 0;
    }
    .yw-yoga-image {
      position: relative;
      width: 100%;
      height: auto;
      border-radius: 32px;
      object-fit: contain;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1), 0 0 40px rgba(232,101,26,0.15);
      z-index: 1;
    }

    /* Desktop layout */
    @media (min-width: 1025px) {
      .yw-hero-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 80px;
        align-items: center;
      }
      .yw-hero-left { order: 1; }
      .yw-hero-right { order: 2; justify-content: flex-end; }
      .yw-yoga-image { width: 550px; }
      .yw-image-glow { inset: -50px; }
    }

    /* Tablet */
    @media (max-width: 1024px) and (min-width: 769px) {
      .yw-grid { grid-template-columns: repeat(2, 1fr); }
      .yw-heading { font-size: 36px; }
      .yw-subtext { font-size: 16px; }
    }

    /* Mobile */
    @media (max-width: 768px) {
      .yw-section { padding: 60px 20px; }
      .yw-inner { gap: 30px; }
      .yw-heading { font-size: 28px; max-width: 100%; }
      .yw-subtext { font-size: 15px; max-width: 100%; }
      .yw-stats { gap: 12px; margin-bottom: 20px; }
      .yw-stat { padding: 10px 12px; min-width: 70px; max-width: 80px; }
      .yw-stat-value { font-size: 18px; }
      .yw-stat-label { font-size: 10px; }
      .yw-image-container { margin-bottom: 20px; max-width: 300px; }
      .yw-yoga-image { width: 260px; }
      .yw-grid { grid-template-columns: 1fr; gap: 16px; }
      .yw-card { padding: 20px 16px; border-radius: 20px; }
      .yw-card-num { font-size: 40px; }
      .yw-icon-wrap { width: 50px; height: 50px; margin-bottom: 12px; }
      .yw-card-title { font-size: 15px; }
      .yw-card-desc { font-size: 12px; }
    }
  `;
  document.head.appendChild(s);
}

export default function WhyChooseUs() {

  return (
    <section className="yw-section">
      <div className="yw-orb yw-orb-1" aria-hidden="true" />
      <div className="yw-orb yw-orb-2" aria-hidden="true" />

      <div className="yw-inner">
        <div className="yw-hero-row">
          <div className="yw-hero-left">
            <ScrollReveal>
              <div className="yw-top">
                <div className="ins-badge">
                  🌸 why choose yogawoman
                </div>
                <h2 className="yw-heading">
                  Transform Your Mind, Body & <span className="acc">Inner Energy</span>
                </h2>
                <p className="yw-subtext">
                  More than yoga classes — experience complete spiritual wellness.
                </p>
              </div>
            </ScrollReveal>

            <StaggerGroup className="yw-stats" staggerDelay={0.15}>
              {stats.map((stat, i) => (
                <div className="yw-stat" key={stat.label}>
                  <div className="yw-stat-value">{stat.value}</div>
                  <div className="yw-stat-label">{stat.label}</div>
                </div>
              ))}
            </StaggerGroup>
          </div>

          <div className="yw-hero-right">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="yw-image-container">
                <div className="yw-image-glow" aria-hidden="true" />
                <img
                  src={sacredimage}
                  alt="Yoga woman in spiritual pose"
                  className="yw-yoga-image"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <StaggerGroup className="yw-grid" staggerDelay={0.1}>
          {features.map((f, i) => (
            <div
              className="yw-card h-full"
              key={f.title}
            >
              <span className="yw-card-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="yw-icon-wrap" aria-hidden="true">
                <f.icon size={32} />
              </div>
              <h3 className="yw-card-title">{f.title}</h3>
              <p className="yw-card-desc">{f.desc}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
