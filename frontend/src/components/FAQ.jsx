// src/components/FAQ.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "Kya main beginner hun toh bhi join kar sakti hun?",
    a: "Bilkul! Hamare Starter aur Wellness plans beginners ke liye specially design ki gayi hain. Hamare instructors har level ke saath kaam karte hain — aapko koi prior experience ki zaroorat nahi hai.",
  },
  {
    q: "Classes online hain ya offline?",
    a: "Dono options available hain! Hamare paas live online classes hain jo aap ghar se join kar sakti hain, aur hamare studio locations mein in-person classes bhi available hain. Recorded sessions bhi milte hain jo aap apni convenience se dekh sakti hain.",
  },
  {
    q: "Kya 1-on-1 session book kar sakti hun?",
    a: "Haan! Transform plan mein 2 personal sessions per month included hain. Baaki plans mein aap additional sessions book kar sakti hain at a discounted rate.",
  },
  {
    q: "Agar mujhe class miss ho jaye toh kya hoga?",
    a: "Koi problem nahi! Sabhi live classes record ki jaati hain aur 48 ghante ke andar aapke account mein available ho jaati hain. Aap kabhi bhi, kahin bhi dekh sakti hain.",
  },
  {
    q: "Kya payment ke baad refund milta hai?",
    a: "Haan, hamare paas 7-day free trial hai. Agar aap pehle 7 din mein santusht nahi hain toh full refund milega — koi sawaal nahi. Uske baad bhi partial refund possible hai, hamare support team se baat karein.",
  },
  {
    q: "Kya retreats sirf Transform plan members ke liye hain?",
    a: "Nahi! Retreats sabke liye open hain, lekin Transform plan members ko 30% discount milta hai. Wellness plan members ko 15% discount milta hai. Upcoming retreats Events section mein dekh sakti hain.",
  },
  {
    q: "Kya pregnancy ke dauran yoga kar sakti hain?",
    a: "Haan, bilkul! Hamare paas certified prenatal yoga instructors hain. Lekin please pehle apne doctor se consult zaroor karein aur humein batayein taaki hum suitable modifications provide kar sakein.",
  },
];

if (!document.head.querySelector("[data-faq]")) {
  const s = document.createElement("style");
  s.setAttribute("data-faq", "true");
  s.textContent = `
    @keyframes faq-up {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes faq-expand {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .faq-section {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(180deg, #f6fbf3 0%, #fff 100%);
      padding: 90px 28px;
      position: relative;
    }
    .faq-inner { max-width: 780px; margin: 0 auto; }
    .faq-header { text-align: center; margin-bottom: 52px; animation: faq-up 0.6s ease both; }
    .faq-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(46,125,50,0.09); color: #2E7D32;
      font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
      text-transform: uppercase; padding: 7px 18px; border-radius: 50px;
      margin-bottom: 16px; border: 1px solid rgba(46,125,50,0.18);
    }
    .faq-title { font-size: 42px; font-weight: 800; color: #1A2E1A; margin: 0 0 14px; }
    .faq-title .ot { color: #E8651A; }
    .faq-subtitle { font-size: 16px; color: #777; margin: 0; line-height: 1.75; }

    .faq-list { display: flex; flex-direction: column; gap: 14px; }

    .faq-item {
      background: rgba(255,255,255,0.85);
      border: 1.5px solid rgba(46,125,50,0.1);
      border-radius: 20px;
      overflow: hidden;
      backdrop-filter: blur(16px);
      box-shadow: 0 4px 16px rgba(46,125,50,0.04);
      transition: border-color 0.28s ease, box-shadow 0.28s ease;
      animation: faq-up 0.5s ease both;
    }
    .faq-item:nth-child(1)  { animation-delay: 0.05s; }
    .faq-item:nth-child(2)  { animation-delay: 0.10s; }
    .faq-item:nth-child(3)  { animation-delay: 0.15s; }
    .faq-item:nth-child(4)  { animation-delay: 0.20s; }
    .faq-item:nth-child(5)  { animation-delay: 0.25s; }
    .faq-item:nth-child(6)  { animation-delay: 0.30s; }
    .faq-item:nth-child(7)  { animation-delay: 0.35s; }
    .faq-item.open {
      border-color: rgba(46,125,50,0.22);
      box-shadow: 0 8px 30px rgba(46,125,50,0.1);
    }

    .faq-question {
      width: 100%; background: none; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: space-between;
      padding: 22px 26px; gap: 16px; text-align: left;
    }
    .faq-q-text {
      font-size: 15px; font-weight: 700; color: #1A2E1A; line-height: 1.5; flex: 1;
    }
    .faq-icon {
      width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: 700;
      background: rgba(46,125,50,0.08); color: #2E7D32;
      transition: background 0.28s ease, transform 0.28s ease;
    }
    .faq-item.open .faq-icon {
      background: #2E7D32; color: #fff; transform: rotate(45deg);
    }

    .faq-answer {
      padding: 0 26px 22px;
      font-size: 15px; color: #666; line-height: 1.8;
      animation: faq-expand 0.3s ease both;
      border-top: 1px solid rgba(46,125,50,0.08);
      padding-top: 16px;
    }

    .faq-footer {
      text-align: center; margin-top: 48px;
      background: rgba(46,125,50,0.05);
      border: 1px solid rgba(46,125,50,0.12);
      border-radius: 24px; padding: 32px;
      animation: faq-up 0.6s 0.4s ease both;
    }
    .faq-footer p { font-size: 16px; color: #444; margin: 0 0 16px; }
    .faq-contact-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: linear-gradient(135deg, #2E7D32, #E8651A);
      color: #fff; border: none; cursor: pointer;
      font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
      padding: 14px 32px; border-radius: 999px;
      transition: transform 0.28s ease, box-shadow 0.28s ease;
      box-shadow: 0 12px 32px rgba(46,125,50,0.2);
    }
    .faq-contact-btn:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(46,125,50,0.26); }

    @media (max-width: 600px) {
      .faq-title { font-size: 30px; }
      .faq-question { padding: 18px 18px; }
      .faq-answer { padding: 0 18px 18px; padding-top: 14px; }
    }
  `;
  document.head.appendChild(s);
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="faq-header">
          <div className="faq-badge">❓ Got Questions?</div>
          <h2 className="faq-title">Frequently Asked <span className="ot">Questions</span></h2>
          <p className="faq-subtitle">
            Sab kuch clear ho jaye — yahan aapke sabse common sawaalon ke jawaab hain.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              className={`faq-item ${openIdx === i ? "open" : ""}`}
              key={i}
            >
              <button
                className="faq-question"
                type="button"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                <span className="faq-q-text">{faq.q}</span>
                <span className="faq-icon">+</span>
              </button>
              {openIdx === i && (
                <div className="faq-answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <p>Aur koi sawaal hai? Hum help karne ke liye yahan hain! 🙏</p>
          <Link to="/auth" className="faq-contact-btn" style={{display: 'inline-block'}}>
            💬 Chat With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
