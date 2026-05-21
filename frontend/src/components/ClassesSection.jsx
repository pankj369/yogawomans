import { useState } from "react";
import { Link } from "react-router-dom";

/* Class imagery */
import hathaImg from "../assets/images/hathayoga.png";
import vinyasaImg from "../assets/images/vinyasa.png";
import yinImg from "../assets/images/yin.png";
import meditationImg from "../assets/images/meditation.png";
import powerImg from "../assets/images/power.png";
import prenatalImg from "../assets/images/parental.png";

if (!document.head.querySelector("[data-yoga-classes]")) {
  const s = document.createElement("style");
  s.setAttribute("data-yoga-classes", "true");

  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700&display=swap');

    @keyframes yc-fadeUp {
      from{opacity:0;transform:translateY(28px);}
      to{opacity:1;transform:translateY(0);}
    }

    @keyframes yc-cardIn {
      from{opacity:0;transform:translateY(20px) scale(0.96);}
      to{opacity:1;transform:translateY(0) scale(1);}
    }

    .yc-section{
      font-family:'Poppins',sans-serif;
      background:#fff;
      padding:90px 28px;
      position:relative;
      overflow:hidden;
    }

    .yc-bg-pattern{
      position:absolute;
      inset:0;
      pointer-events:none;
      background-image:
      radial-gradient(circle,rgba(46,125,50,0.04) 1.5px,transparent 1.5px);
      background-size:28px 28px;
    }

    .yc-inner{
      max-width:1100px;
      margin:0 auto;
      position:relative;
      z-index:1;
    }

    .yc-top{
      text-align:center;
      margin-bottom:56px;
      animation:yc-fadeUp 0.6s ease both;
    }

    .yc-badge{
      display:inline-flex;
      align-items:center;
      gap:7px;
      background:rgba(46,125,50,0.09);
      color:#2E7D32;
      font-size:11px;
      font-weight:700;
      letter-spacing:0.14em;
      text-transform:uppercase;
      padding:7px 18px;
      border-radius:50px;
      border:1px solid rgba(46,125,50,0.18);
      margin-bottom:18px;
    }

    .yc-heading{
      font-size:42px;
      font-weight:800;
      color:#1A2E1A;
      margin:0 0 12px;
      line-height:1.2;
    }

    .yc-heading .acc-o{color:#E8651A;}
    .yc-heading .acc-g{color:#2E7D32;}

    .yc-subtext{
      font-family:'Lato',sans-serif;
      font-size:16px;
      color:#666;
      max-width:440px;
      margin:0 auto;
      line-height:1.7;
    }

    .yc-filters{
      display:flex;
      align-items:center;
      justify-content:center;
      flex-wrap:wrap;
      gap:10px;
      margin-bottom:44px;
    }

    .yc-filter-btn{
      padding:9px 22px;
      border-radius:50px;
      border:1.5px solid rgba(46,125,50,0.2);
      background:#fff;
      color:#555;
      font-family:'Poppins',sans-serif;
      font-size:13px;
      font-weight:600;
      cursor:pointer;
      transition:all 0.22s;
    }

    .yc-filter-btn.active,
    .yc-filter-btn:hover{
      background:#2E7D32;
      color:#fff;
      border-color:#2E7D32;
    }

    .yc-grid{
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:24px;
      margin-bottom:48px;
    }

    .yc-card{
      background:#fff;
      border:1px solid rgba(210,190,165,0.25);
      border-radius:24px;
      overflow:hidden;
      transition:all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      cursor:pointer;
      animation:yc-cardIn 0.5s ease both;
    }

    .yc-card:hover{
      transform:translateY(-4px);
      box-shadow:0 24px 50px rgba(0,0,0,0.04);
      border-color:rgba(210,190,165,0.5);
    }

    /* UPDATED HEADER */
    .yc-card-header{
      position:relative;
    }

    .yc-card-image{
      width:100%;
      height:240px;
      object-fit:cover;
      display:block;
    }

    .yc-card-title-wrap{
      padding:20px 24px 0;
    }

    .yc-card-title{
      font-size:19px;
      font-weight:700;
      color:#1A2E1A;
      margin:0;
    }

    .yc-popular-badge{
      position:absolute;
      top:16px;
      right:16px;
      background:#E8651A;
      color:#fff;
      font-size:10px;
      font-weight:700;
      padding:4px 12px;
      border-radius:50px;
      letter-spacing:0.06em;
      text-transform:uppercase;
    }

    .yc-card-body{
      padding:20px 24px 24px;
    }

    .yc-card-desc{
      font-family:'Lato',sans-serif;
      font-size:14px;
      color:#666;
      line-height:1.7;
      margin:0 0 18px;
    }

    .yc-card-meta{
      display:flex;
      flex-wrap:wrap;
      gap:8px;
      margin-bottom:18px;
    }

    .yc-meta-tag{
      display:inline-flex;
      align-items:center;
      gap:5px;
      background:#f0f7e6;
      color:#2E7D32;
      font-size:11px;
      font-weight:600;
      padding:5px 12px;
      border-radius:50px;
      border:1px solid rgba(46,125,50,0.15);
    }

    .yc-enroll-btn{
      width:100%;
      padding:12px;
      border-radius:10px;
      border:1.5px solid #2E7D32;
      background:transparent;
      color:#2E7D32;
      font-family:'Poppins',sans-serif;
      font-size:13px;
      font-weight:700;
      cursor:pointer;
      text-transform:uppercase;
      letter-spacing:0.05em;
      transition:all 0.22s;
      text-align:center;
    }

    .yc-enroll-btn:hover{
      background:#2E7D32;
      color:#fff;
    }

    .yc-cta-wrap{
      text-align:center;
    }

    .yc-cta-btn{
      display:inline-flex;
      align-items:center;
      gap:10px;
      background:linear-gradient(135deg, #E27229 0%, #d5631c 100%);
      color:#fff;
      font-family:'Poppins',sans-serif;
      font-size:15px;
      font-weight:700;
      padding:16px 44px;
      border-radius:50px;
      border:none;
      cursor:pointer;
      text-transform:uppercase;
      letter-spacing:0.06em;
      transition:all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
      box-shadow:0 16px 35px rgba(226, 114, 41, 0.12);
    }

    .yc-cta-btn:hover{
      transform:translateY(-2px);
      box-shadow:0 20px 40px rgba(226,114,41,0.2);
    }

    @media(max-width:900px){
      .yc-grid{
        grid-template-columns:1fr 1fr;
      }
    }

    @media(max-width:580px){

      .yc-section{
        padding:70px 16px;
      }

      .yc-grid{
        grid-template-columns:1fr;
      }

      .yc-heading{
        font-size:30px;
      }

      .yc-card-image{
        height:220px;
      }
    }
  `;

  document.head.appendChild(s);
}

const classes = [
  {
    id:1,
    image:hathaImg,
    title:"Hatha Yoga",
    desc:"Perfect for beginners. Focus on breathing, posture & deep relaxation.",
    level:"Beginner",
    duration:"60 min",
    time:"Morning",
    filter:"Beginner",
    popular:false,
  },

  {
    id:2,
    image:vinyasaImg,
    title:"Vinyasa Flow",
    desc:"Dynamic, flowing sequences that build strength and flexibility.",
    level:"Intermediate",
    duration:"75 min",
    time:"Evening",
    filter:"Intermediate",
    popular:true,
  },

  {
    id:3,
    image:yinImg,
    title:"Yin Yoga",
    desc:"Deep stretching and mindfulness for stress relief and recovery.",
    level:"All Levels",
    duration:"60 min",
    time:"Night",
    filter:"All Levels",
    popular:false,
  },

  {
    id:4,
    image:meditationImg,
    title:"Meditation",
    desc:"Guided mindfulness sessions for a calmer, more focused mind.",
    level:"All Levels",
    duration:"45 min",
    time:"Flexible",
    filter:"All Levels",
    popular:false,
  },

  {
    id:5,
    image:powerImg,
    title:"Power Yoga",
    desc:"High-energy workout that builds core strength and endurance.",
    level:"Advanced",
    duration:"90 min",
    time:"Morning",
    filter:"Advanced",
    popular:false,
  },

  {
    id:6,
    image:prenatalImg,
    title:"Prenatal Yoga",
    desc:"Gentle, safe yoga designed especially for mothers-to-be.",
    level:"All Levels",
    duration:"50 min",
    time:"Morning",
    filter:"All Levels",
    popular:false,
  },
];

const filters = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "All Levels"
];

export default function ClassesSection() {

  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? classes
      : classes.filter((c) => c.filter === activeFilter);

  return (
    <section id="classes" className="yc-section">

      <div className="yc-bg-pattern" aria-hidden="true" />

      <div className="yc-inner">

        <div className="yc-top">

          <div className="yc-badge">
            🧘 What We Offer
          </div>

          <h2 className="yc-heading">
            Yoga For <span className="acc-o">Every</span>{" "}
            <span className="acc-g">Body</span>
          </h2>

          <p className="yc-subtext">
            Choose from our wide range of expertly designed yoga programs
          </p>

        </div>

        {/* FILTERS */}
        <div className="yc-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`yc-filter-btn${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div className="yc-grid">

          {filtered.map((cls, i) => (

            <div
              className="yc-card"
              key={cls.id}
              style={{ animationDelay: `${i * 0.08}s` }}
            >

              {/* CARD HEADER */}
              <div className="yc-card-header">

                <img
                  src={cls.image}
                  alt={cls.title}
                  className="yc-card-image"
                />

                {cls.popular && (
                  <span className="yc-popular-badge">
                    Popular
                  </span>
                )}

              </div>

              {/* CARD BODY */}
              <div className="yc-card-body">

                <div className="yc-card-title-wrap">
                  <h3 className="yc-card-title">
                    {cls.title}
                  </h3>
                </div>

                <p className="yc-card-desc">
                  {cls.desc}
                </p>

                <div className="yc-card-meta">

                  <span className="yc-meta-tag">
                    📊 {cls.level}
                  </span>

                  <span className="yc-meta-tag">
                    ⏱ {cls.duration}
                  </span>

                  <span className="yc-meta-tag">
                    🌤 {cls.time}
                  </span>

                </div>

                <Link
                  to="/auth"
                  className="yc-enroll-btn"
                  style={{ display: "inline-block" }}
                >
                  Enroll Now
                </Link>

              </div>

            </div>
          ))}

        </div>

        <div className="yc-cta-wrap">

        <Link to="/auth" className="yc-cta-btn">
          View All Classes →
        </Link>

        </div>

      </div>

    </section>
  );
}
