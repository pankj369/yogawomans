import priyaImg from "../assets/images/priya.png";
import ananyaImg from "../assets/images/ananya.png";
import meeraImg from "../assets/images/meera.png";
import kavithaImg from "../assets/images/kavitha.png";
import ScrollReveal from "./ui/animations/ScrollReveal";
import StaggerGroup from "./ui/animations/StaggerGroup";

const instructors = [
  {
    name: "Priya Sharma",
    role: "Hatha & Vinyasa",
    exp: "12 years",
    image: priyaImg,
    whatsapp: "919876543210",
    color: "#2E7D32",
    specialties: ["Morning Flow", "Prenatal Yoga", "Meditation"],
    quote: "Every breath is a new beginning.",
  },

  {
    name: "Ananya Rao",
    role: "Kundalini & Yin",
    exp: "9 years",
    image: ananyaImg,
    whatsapp: "919876543210",
    color: "#E8651A",
    specialties: ["Energy Healing", "Yin Yoga", "Chakra Work"],
    quote: "Stillness is where strength is born.",
  },

  {
    name: "Meera Nair",
    role: "Power & Ashtanga",
    exp: "14 years",
    image: meeraImg,
    whatsapp: "919876543210",
    color: "#5B6ABF",
    specialties: ["Core Strength", "Flexibility", "Breathwork"],
    quote: "Push limits. Find peace within them.",
  },

  {
    name: "Kavitha Iyer",
    role: "Restorative & Therapy",
    exp: "10 years",
    image: kavithaImg,
    whatsapp: "919876543210",
    color: "#2E7D32",
    specialties: ["Back Therapy", "Stress Relief", "Gentle Flow"],
    quote: "Healing begins where effort ends.",
  },
];

if (!document.head.querySelector("[data-instructors]")) {

  const s = document.createElement("style");

  s.setAttribute("data-instructors", "true");

  s.textContent = `
    .ins-section{
      font-family:'Poppins',sans-serif;
      background:linear-gradient(180deg,#f6fbf3 0%,#ffffff 100%);
      padding:90px 28px;
      position:relative;
      overflow:hidden;
    }

    .ins-bg-pattern{
      position:absolute;
      inset:0;

      background-image:
      radial-gradient(circle,rgba(46,125,50,0.04) 1px,transparent 1px);

      background-size:32px 32px;

      pointer-events:none;
    }

    .ins-inner{
      max-width:1100px;
      margin:0 auto;
      position:relative;
      z-index:1;
    }

    .ins-header{
      text-align:center;
      margin-bottom:56px;
    }

    .ins-badge{
      display:inline-flex;
      align-items:center;
      gap:8px;

      background:rgba(46,125,50,0.09);

      color:#2E7D32;

      font-size:11px;
      font-weight:700;

      letter-spacing:0.14em;
      text-transform:uppercase;

      padding:7px 18px;

      border-radius:50px;

      margin-bottom:16px;

      border:1px solid rgba(46,125,50,0.18);
    }

    .ins-title{
      font-size:42px;
      font-weight:800;
      color:#1A2E1A;
      line-height:1.18;
      margin:0 0 16px;
    }

    .ins-title .ot{
      color:#E8651A;
    }

    .ins-subtitle{
      font-size:16px;
      color:#777;
      max-width:520px;
      margin:0 auto;
      line-height:1.75;
    }

    .ins-grid{
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:24px;
    }

    .ins-card{
      background:rgba(255,255,255,0.8);

      border:1.5px solid rgba(46,125,50,0.12);

      border-radius:28px;

      padding:32px 24px;

      text-align:center;

      backdrop-filter:blur(16px);

      box-shadow:0 8px 32px rgba(46,125,50,0.06);

      transition:
      transform 0.32s ease,
      box-shadow 0.32s ease,
      border-color 0.32s ease;

      position:relative;
      overflow:hidden;
    }

    .ins-card:hover{
      transform:translateY(-8px);

      box-shadow:
      0 24px 56px rgba(46,125,50,0.14);

      border-color:
      rgba(46,125,50,0.22);
    }

    .ins-exp-badge{
      display:inline-block;

      font-size:10px;
      font-weight:700;

      letter-spacing:0.1em;
      text-transform:uppercase;

      padding:4px 12px;

      border-radius:50px;

      margin-bottom:10px;

      color:#fff;
    }

    .ins-name{
      font-size:18px;
      font-weight:800;
      color:#1A2E1A;
      margin:0 0 4px;
    }

    .ins-role{
      font-size:13px;
      color:#888;
      margin:0 0 16px;
    }

    .ins-specialties{
      display:flex;
      flex-wrap:wrap;
      gap:6px;
      justify-content:center;
      margin-bottom:18px;
    }

    .ins-tag{
      font-size:11px;
      font-weight:600;

      padding:4px 10px;

      border-radius:50px;

      background:rgba(46,125,50,0.08);

      color:#2E7D32;

      border:1px solid rgba(46,125,50,0.14);
    }

    .ins-quote{
      font-size:13px;
      font-style:italic;
      color:#999;

      border-top:
      1px solid rgba(46,125,50,0.1);

      padding-top:14px;

      margin:0;
    }

    @media (max-width:900px){

      .ins-grid{
        grid-template-columns:repeat(2,1fr);
      }

    }

    @media (max-width:540px){

      .ins-grid{
        grid-template-columns:1fr;
      }

      .ins-title{
        font-size:30px;
      }

    }

  `;

  document.head.appendChild(s);
}

export default function Instructors() {

  return (

    <section className="ins-section">

      <div
        className="ins-bg-pattern"
        aria-hidden="true"
      />

      <div className="ins-inner">

        {/* HEADER */}
        <ScrollReveal>
          <div className="ins-header">

            <div className="ins-badge">
              🌸 Meet the Team
            </div>

            <h2 className="ins-title">
              Learn From the <span className="ot">Best Guru</span>
            </h2>

            <p className="ins-subtitle">
              Our certified instructors bring decades of experience,
              compassion, and deep yogic knowledge to guide your transformation.
            </p>

          </div>
        </ScrollReveal>

        {/* GRID */}
        <StaggerGroup className="ins-grid" staggerDelay={0.15}>
          {instructors.map((ins) => (

            <div
              className="ins-card h-full"
              key={ins.name}
              style={{ "--ins-accent": ins.color }}
            >

              {/* PROFILE IMAGE */}
              <div
                className="
                mx-auto
                mb-[18px]

                h-[90px]
                w-[90px]

                overflow-hidden
                rounded-full

                border-[3px]
                border-white/70

                shadow-[0_10px_24px_rgba(0,0,0,0.08)]
                "
              >

                <img
                  src={ins.image}
                  alt={ins.name}
                  className="
                  block
                  h-full
                  w-full
                  object-cover
                  "
                />

              </div>

              {/* EXPERIENCE */}
              <div
                className="ins-exp-badge"
                style={{ background: ins.color }}
              >
                {ins.exp}
              </div>

              {/* NAME */}
              <h3 className="ins-name">
                {ins.name}
              </h3>

              {/* ROLE */}
              <p className="ins-role">
                {ins.role}
              </p>

              {/* SPECIALTIES */}
              <div className="ins-specialties">

                {ins.specialties.map((sp) => (
                  <span
                    className="ins-tag"
                    key={sp}
                  >
                    {sp}
                  </span>
                ))}

              </div>

              {/* QUOTE */}
              <p className="ins-quote">
                "{ins.quote}"
              </p>

              {/* BOOK BUTTON */}
              <a
                href={`https://wa.me/${ins.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="
                mt-5
                inline-flex
                w-full

                items-center
                justify-center

                rounded-xl

                bg-[#E8651A]

                px-4
                py-3

                text-[13px]
                font-bold
                uppercase
                tracking-[0.05em]

                text-white

                transition-all
                duration-300

                hover:-translate-y-[2px]
                hover:bg-[#d45a14]

                hover:shadow-[0_14px_28px_rgba(232,101,26,0.22)]
                "
              >
                Book Session
              </a>

            </div>

          ))}
        </StaggerGroup>

      </div>

    </section>
  );
}
