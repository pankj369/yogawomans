import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import ScrollReveal from "./ui/animations/ScrollReveal";

import ananyaImg from "../assets/images/ananya.png";
import meeraImg from "../assets/images/meera.png";
import priyaImg from "../assets/images/priya.png";
import kavithaImg from "../assets/images/kavitha.png";

// Inject marquee style block into document head on mount
if (typeof window !== "undefined" && !document.head.querySelector("[data-testimonials-marquee]")) {
  const s = document.createElement("style");
  s.setAttribute("data-testimonials-marquee", "true");
  s.textContent = `
    @keyframes marquee-left {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }
    @keyframes marquee-right {
      0% { transform: translate3d(-50%, 0, 0); }
      100% { transform: translate3d(0, 0, 0); }
    }
    .marquee-wrapper {
      overflow: hidden;
      width: 100%;
      position: relative;
      display: flex;
      user-select: none;
      mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
    }
    .marquee-row {
      display: flex;
      width: max-content;
      gap: 28px;
      padding: 20px 0;
    }
    .marquee-left-anim {
      animation: marquee-left 45s linear infinite;
    }
    .marquee-right-anim {
      animation: marquee-right 45s linear infinite;
    }
    .marquee-wrapper:hover .marquee-left-anim,
    .marquee-wrapper:hover .marquee-right-anim {
      animation-play-state: paused;
    }
  `;
  document.head.appendChild(s);
}

const testimonials = [
  {
    name: "Ananya R.",
    location: "Mumbai, India",
    role: "AI Personalized Sadhana",
    image: ananyaImg,
    text: "The AI-generated flows adapted perfectly to my chronic back pain. I've found a combination of physical strength and spiritual softness that I couldn't find anywhere else.",
    rating: 5
  },
  {
    name: "Meera K.",
    location: "London, UK",
    role: "Stress & Burnout Recovery",
    image: meeraImg,
    text: "Through the emotional health integration and daily meditation recommendations, I successfully recovered from severe executive burnout. It is a true sanctuary.",
    rating: 5
  },
  {
    name: "Priya S.",
    location: "California, USA",
    role: "Palmistry & Self-Discovery",
    image: priyaImg,
    text: "The AI Palmistry analysis was shockingly accurate. It connected my hand lines with physical energy blockages and recommended specific flows that changed everything.",
    rating: 5
  },
  {
    name: "Kavitha M.",
    location: "Bangalore, India",
    role: "Sacred Orbit Integration",
    image: kavithaImg,
    text: "YogaWomans is not just a yoga app—it's an emotional companion. The interactive Surya Namaskar tracker feels like practicing with a master teacher right in my living room.",
    rating: 5
  }
];

// Helper to generate floating warm particles
const generateParticles = () => {
  return Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1.5, // 1.5px to 4.5px
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 14 + 10, // 10s to 24s
    color: Math.random() > 0.5 ? "#D6A756" : "#F7F3EC" // Soft Gold or Soft Cream
  }));
};

function TestimonialCard({ item }) {
  return (
    <div className="group relative w-[300px] sm:w-[360px] flex-shrink-0 flex flex-col justify-between h-[230px] rounded-[24px] bg-white/[0.06] backdrop-blur-[18px] border border-white/[0.08] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-500 ease-spring hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(214,167,86,0.08)] hover:border-[#D6A756]/30">
      
      {/* Soft warm gold inner glow on card hover */}
      <div className="absolute inset-0 rounded-[24px] bg-[#D6A756]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full border border-white/10 p-0.5 group-hover:border-[#D6A756]/50 group-hover:shadow-[0_0_12px_rgba(214,167,86,0.25)] transition-all duration-300 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="text-left">
            <h4 className="font-heading text-sm font-bold text-[#F7F3EC]">{item.name}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-[#D6A756] font-semibold tracking-wide">{item.role}</span>
              <span className="text-[9px] text-[#B8C1CC]">•</span>
              <span className="text-[9px] text-[#B8C1CC] font-medium">{item.location}</span>
            </div>
          </div>
        </div>

        {/* Testimonial Text */}
        <p className="mt-4 text-[12px] sm:text-[13px] leading-relaxed text-[#C9D1D9] italic text-left line-clamp-4 font-medium">
          "{item.text}"
        </p>
      </div>

      {/* Footer stars */}
      <div className="mt-4 flex items-center gap-1 text-[#D6A756]" aria-label="5 star rating">
        {Array.from({ length: item.rating }).map((_, index) => (
          <FaStar key={index} className="w-3.5 h-3.5 fill-current" />
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  // Duplicate items to ensure seamless loop
  const row1Items = [...testimonials, ...testimonials];
  const row2Items = [
    testimonials[2], testimonials[3], testimonials[0], testimonials[1],
    testimonials[2], testimonials[3], testimonials[0], testimonials[1]
  ];

  return (
    <section 
      id="testimonials" 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0B1220 0%, #1A1E2E 25%, #1A2A22 55%, #2B1F1A 100%)"
      }}
    >
      
      {/* ─── Ambient Animated Background Blobs ─── */}
      <motion.div
        animate={{ 
          x: [-20, 20, -20],
          y: [-30, 30, -30],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-[#00C875]/4 to-[#00C875]/0 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{ 
          x: [30, -30, 30],
          y: [20, -20, 20],
          scale: [1.05, 0.95, 1.05]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-[10%] w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-[#D6A756]/4 to-[#D6A756]/0 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none"
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
              backgroundColor: p.color
            }}
            animate={{
              y: ["0px", "-800px"],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <ScrollReveal>
            <p className="inline-flex items-center justify-center rounded-full bg-[#00C875]/10 border border-[#00C875]/20 px-4 py-2 text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#00C875] uppercase mb-4">
              WHAT PEOPLE EXPERIENCE
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3EC] tracking-tight">
              Real wellness stories from real people.
            </h2>
            <p className="mt-4 text-xs sm:text-sm lg:text-base text-[#B8C1CC] max-w-2xl mx-auto font-medium leading-relaxed">
              Discover the deep physical, emotional, and spiritual alignment felt by the YogaWomans community.
            </p>
          </ScrollReveal>
        </div>

        {/* Marquee Rows Container */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* Row 1: Left Scroll */}
          <div className="marquee-wrapper">
            <div className="marquee-row marquee-left-anim">
              {row1Items.map((item, idx) => (
                <TestimonialCard key={`row1-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 2: Right Scroll */}
          <div className="marquee-wrapper hidden md:flex">
            <div className="marquee-row marquee-right-anim">
              {row2Items.map((item, idx) => (
                <TestimonialCard key={`row2-${idx}`} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;

