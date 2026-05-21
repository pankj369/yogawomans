import { useState } from "react";
import { AUTH_FLAG as PROFILE_AUTH_FLAG } from "./profileSetupStorage";
import navlogo from "../assets/images/navlogo.png";
// ─── Inline styles injected once ───────────────────────────────────────────
if (typeof document !== "undefined" && !document.head.querySelector("[data-yoga-auth]")) {
  const s = document.createElement("style");
  s.setAttribute("data-yoga-auth", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700&display=swap');

    @keyframes auth-float {
      0%,100%{transform:translateY(0) rotate(-6deg);}
      50%{transform:translateY(-14px) rotate(-6deg);}
    }
    @keyframes auth-float2 {
      0%,100%{transform:translateY(0) rotate(10deg);}
      50%{transform:translateY(-10px) rotate(10deg);}
    }
    @keyframes auth-spin-slow {
      from{transform:rotate(0deg);}
      to{transform:rotate(360deg);}
    }
    @keyframes auth-pulse-ring {
      0%{transform:scale(1);opacity:0.5;}
      100%{transform:scale(1.5);opacity:0;}
    }
    @keyframes auth-shimmer {
      0%{background-position:200% center;}
      100%{background-position:-200% center;}
    }

    .auth-page {
      font-family:'Poppins',sans-serif;
      min-height:100vh;
      display:grid;
      grid-template-columns:1fr 1fr;
      background:#0f1f0f;
      position:relative;
      overflow:hidden;
    }

    /* ── Left decorative panel ── */
.auth-left {
  position: relative;

  background:
    radial-gradient(circle at top left, rgba(46,125,50,0.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(232,101,26,0.14), transparent 30%),
    linear-gradient(160deg,#071407 0%,#102510 45%,#183818 100%);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 70px 60px;

  overflow: hidden;
}
.auth-left-content{
  width:100%;
  max-width:520px;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  margin:auto;

  position:relative;
  z-index:2;

  transform:translateY(-90px);
}

    .auth-left-blob {
      position:absolute;border-radius:50%;pointer-events:none;
    }
    .auth-left-blob-1{
      width:420px;height:420px;top:-120px;left:-120px;
      background:radial-gradient(circle,rgba(46,125,50,0.22) 0%,transparent 70%);
    }
    .auth-left-blob-2{
      width:340px;height:340px;bottom:-80px;right:-80px;
      background:radial-gradient(circle,rgba(232,101,26,0.14) 0%,transparent 70%);
    }
    .auth-left-blob-3{
      width:200px;height:200px;top:40%;left:60%;
      background:radial-gradient(circle,rgba(46,125,50,0.1) 0%,transparent 70%);
    }

    .auth-float-emoji{
      position:absolute;font-size:38px;opacity:0.18;pointer-events:none;
    }
    .auth-float-emoji:nth-child(1){top:10%;left:8%;animation:auth-float 5s ease-in-out infinite;}
    .auth-float-emoji:nth-child(2){top:18%;right:10%;animation:auth-float2 6.5s ease-in-out infinite;}
    .auth-float-emoji:nth-child(3){bottom:22%;left:10%;animation:auth-float 7s ease-in-out infinite 1s;}
    .auth-float-emoji:nth-child(4){bottom:14%;right:8%;animation:auth-float2 5.5s ease-in-out infinite 0.5s;}

    .auth-logo-wrap{
      position:relative;width:100px;height:100px;
      display:flex;align-items:center;justify-content:center;margin-bottom:32px;
    }
    .auth-logo-ring{
      position:absolute;inset:0;border-radius:50%;
      border:2px solid rgba(232,101,26,0.35);
      animation:auth-pulse-ring 2.2s ease-out infinite;
    }
    .auth-logo-ring-2{
      position:absolute;inset:0;border-radius:50%;
      border:2px solid rgba(232,101,26,0.2);
      animation:auth-pulse-ring 2.2s ease-out infinite 0.8s;
    }
    .auth-logo-inner{
      width:80px;height:80px;border-radius:50%;
      background:rgba(255,255,255,0.07);
      border:1.5px solid rgba(255,255,255,0.13);
      display:flex;align-items:center;justify-content:center;
      font-size:38px;position:relative;z-index:1;
    }

.auth-brand-name{
  font-size:52px;
  font-weight:800;

  color:#ffffff;

  line-height:1;

  letter-spacing:0.08em;

  margin:0;
}
.auth-brand-tag{
  font-size:13px;

  font-weight:500;

  color:rgba(255,255,255,0.55);

  letter-spacing:0.28em;

  text-transform:uppercase;

  margin-top:-10px;
}

.auth-quote{
  width:100%;
  max-width:420px;

  background:rgba(255,255,255,0.05);

  border:1px solid rgba(255,255,255,0.08);

  backdrop-filter:blur(18px);

  border-radius:28px;

  padding:36px 34px;

  text-align:center;

  position:relative;

  box-shadow:
    0 20px 60px rgba(0,0,0,0.22),
    inset 0 1px 0 rgba(255,255,255,0.05);
}
    .auth-quote-mark{
      font-size:56px;line-height:0.6;color:rgba(232,101,26,0.25);
      font-family:serif;font-weight:900;display:block;margin-bottom:10px;
    }
    .auth-quote-text{
      font-family:'Lato',sans-serif;font-size:15px;
      color:rgba(255,255,255,0.65);line-height:1.75;font-style:italic;
      margin-bottom:16px;
    }
    .auth-quote-author{
      font-size:13px;font-weight:700;color:#E8651A;
    }

 .auth-stats{
  display:flex;

  align-items:center;
  justify-content:center;

  gap:28px;

  margin-top:6px;
}
.auth-stat{
  text-align:center;
  min-width:90px;
}
    .auth-stat-val{font-size:22px;font-weight:800;color:#E8651A;}
    .auth-stat-lbl{
      font-family:'Lato',sans-serif;font-size:11px;
      color:rgba(255,255,255,0.4);margin-top:2px;
    }

    /* ── Right form panel ── */
    .auth-right{
      background:#fff;
      display:flex;flex-direction:column;
      align-items:center;justify-content:center;
      padding:48px 56px;overflow-y:auto;
      position:relative;
    }
    .auth-right::before{
      content:'';position:absolute;top:0;left:0;right:0;height:5px;
      background:linear-gradient(90deg,#2E7D32,#E8651A,#2E7D32);
    }

    .auth-form-inner{width:100%;max-width:420px;}

    .auth-tab-row{
      display:flex;gap:0;margin-bottom:32px;
      background:#f5f5f5;border-radius:14px;padding:4px;
    }
    .auth-tab{
      flex:1;padding:11px;border:none;border-radius:11px;
      font-family:'Poppins',sans-serif;font-size:14px;font-weight:600;
      cursor:pointer;transition:all 0.22s;background:transparent;color:#888;
    }
    .auth-tab.active{
      background:#fff;color:#1A2E1A;
      box-shadow:0 2px 12px rgba(0,0,0,0.1);
    }

    .auth-title{
      font-size:26px;font-weight:800;color:#1A2E1A;margin:0 0 6px;
    }
    .auth-subtitle{
      font-family:'Lato',sans-serif;font-size:14px;color:#888;margin:0 0 28px;
    }

    /* Input fields */
    .auth-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
    .auth-label{
      font-size:13px;font-weight:600;color:#333;
    }
    .auth-input-wrap{position:relative;}
    .auth-input-icon{
      position:absolute;left:14px;top:50%;transform:translateY(-50%);
      font-size:16px;pointer-events:none;
    }
    .auth-input{
      width:100%;padding:13px 14px 13px 42px;
      border:1.5px solid rgba(46,125,50,0.2);border-radius:12px;
      font-family:'Poppins',sans-serif;font-size:14px;color:#222;
      background:#fafdf8;outline:none;transition:all 0.22s;
      box-sizing:border-box;
    }
    .auth-input:focus{
      border-color:#2E7D32;background:#fff;
      box-shadow:0 0 0 3px rgba(46,125,50,0.1);
    }
    .auth-input.error{border-color:#e53935;background:#fff5f5;}
    .auth-input.success{border-color:#2E7D32;}

    .auth-toggle-pw{
      position:absolute;right:14px;top:50%;transform:translateY(-50%);
      background:none;border:none;cursor:pointer;font-size:16px;
      color:#888;padding:0;
    }

    .auth-error-msg{
      font-family:'Lato',sans-serif;font-size:12px;color:#e53935;margin-top:4px;
    }

    /* Password strength */
    .auth-pw-strength{margin-top:6px;}
    .auth-pw-bars{display:flex;gap:4px;margin-bottom:4px;}
    .auth-pw-bar{
      flex:1;height:4px;border-radius:2px;background:#e0e0e0;
      transition:background 0.3s;
    }
    .auth-pw-bar.weak{background:#e53935;}
    .auth-pw-bar.fair{background:#E8651A;}
    .auth-pw-bar.good{background:#43a047;}
    .auth-pw-bar.strong{background:#2E7D32;}
    .auth-pw-label{
      font-family:'Lato',sans-serif;font-size:11px;color:#888;
    }

    /* Checkbox */
    .auth-check-row{
      display:flex;align-items:flex-start;gap:10px;margin-bottom:20px;
    }
    .auth-check{
      width:18px;height:18px;border-radius:4px;border:1.5px solid rgba(46,125,50,0.3);
      flex-shrink:0;margin-top:1px;cursor:pointer;accent-color:#2E7D32;
    }
    .auth-check-lbl{
      font-family:'Lato',sans-serif;font-size:13px;color:#666;line-height:1.5;
    }
    .auth-check-lbl a{color:#2E7D32;font-weight:700;text-decoration:none;}

    /* Forgot password link */
    .auth-forgot{
      display:block;text-align:right;margin-top:-8px;margin-bottom:20px;
      font-family:'Lato',sans-serif;font-size:13px;
      color:#E8651A;font-weight:700;text-decoration:none;cursor:pointer;
      background:none;border:none;
    }
    .auth-forgot:hover{text-decoration:underline;}

    /* Submit button */
    .auth-submit{
      width:100%;padding:15px;border-radius:14px;
      background:#2E7D32;color:#fff;
      font-family:'Poppins',sans-serif;font-size:15px;font-weight:700;
      border:none;cursor:pointer;transition:all 0.28s;
      text-transform:uppercase;letter-spacing:0.07em;
      display:flex;align-items:center;justify-content:center;gap:8px;
    }
    .auth-submit:hover{
      background:#E8651A;transform:translateY(-2px);
      box-shadow:0 10px 28px rgba(232,101,26,0.32);
    }
    .auth-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none;}

    /* Divider */
    .auth-or{
      display:flex;align-items:center;gap:12px;margin:24px 0;
    }
    .auth-or-line{flex:1;height:1px;background:#e0e0e0;}
    .auth-or-text{
      font-family:'Lato',sans-serif;font-size:13px;color:#aaa;white-space:nowrap;
    }

    /* Social buttons */
    .auth-socials{display:flex;flex-direction:column;gap:12px;}
    .auth-social-btn{
      width:100%;padding:13px 20px;border-radius:12px;
      border:1.5px solid #e0e0e0;background:#fff;
      font-family:'Poppins',sans-serif;font-size:14px;font-weight:600;
      cursor:pointer;transition:all 0.22s;
      display:flex;align-items:center;justify-content:center;gap:12px;
      color:#333;
    }
    .auth-social-btn:hover{border-color:#2E7D32;background:#f8fdf5;transform:translateY(-1px);}
    .auth-social-icon{font-size:20px;width:24px;text-align:center;}

    /* Switch mode text */
    .auth-switch{
      text-align:center;margin-top:24px;
      font-family:'Lato',sans-serif;font-size:14px;color:#888;
    }
    .auth-switch-btn{
      background:none;border:none;
      color:#2E7D32;font-weight:700;cursor:pointer;font-family:'Lato',sans-serif;font-size:14px;
    }
    .auth-switch-btn:hover{text-decoration:underline;}

    /* Success state */
    .auth-success-box{
      text-align:center;padding:20px 0;
    }
    .auth-success-icon{font-size:56px;margin-bottom:16px;display:block;}
    .auth-success-title{font-size:22px;font-weight:800;color:#2E7D32;margin-bottom:8px;}
    .auth-success-text{
      font-family:'Lato',sans-serif;font-size:14px;color:#666;line-height:1.6;margin-bottom:24px;
    }

    /* Back link */
    .auth-back{
      display:inline-flex;align-items:center;gap:6px;
      background:none;border:none;cursor:pointer;
      font-family:'Poppins',sans-serif;font-size:13px;font-weight:600;
      color:#2E7D32;margin-bottom:20px;padding:0;
    }
    .auth-back:hover{text-decoration:underline;}

    /* Responsive */
@media(max-width:768px){

  .auth-page{
    grid-template-columns:1fr;
  }

  .auth-left{
    display:none;
  }

  .auth-right{
    padding:32px 22px;
    min-height:100vh;
  }

  .auth-form-inner{
    max-width:100%;
  }

}
  `;
  document.head.appendChild(s);
}

// ─── Helpers ────────────────────────────────────────────────────────────────
export const getPasswordStrength = (pw) => {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

export const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
export const strengthClasses = ["", "weak", "fair", "good", "strong"];
export const AUTH_FLAG = PROFILE_AUTH_FLAG;

export const variants = {
  enter:  { opacity: 0, x: 24,  transition: { duration: 0.3 } },
  center: { opacity: 1, x: 0,   transition: { duration: 0.3 } },
  exit:   { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

// ─── Input component ─────────────────────────────────────────────────────────
export function AuthInput({ icon, type = "text", placeholder, value, onChange, error, name, autoComplete }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="auth-input-wrap">
      <span className="auth-input-icon">{icon}</span>
      <input
        name={name}
        type={isPassword ? (show ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`auth-input${error ? " error" : value ? " success" : ""}`}
      />
      {isPassword && (
        <button
          type="button"
          className="auth-toggle-pw"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  );
}

// ─── Left Panel ──────────────────────────────────────────────────────────────
export function LeftPanel() {
  return (
    <div className="auth-left">
      <div className="auth-left-blob auth-left-blob-1" />
      <div className="auth-left-blob auth-left-blob-2" />
      <div className="auth-left-blob auth-left-blob-3" />

      <div className="auth-left-content">
        <div className="auth-logo-wrap" style={{ margin: "0 auto 24px" }}>
          <div className="auth-logo-ring" />
          <div className="auth-logo-ring-2" />
          <img
                      src={navlogo}
                      alt="logo"
                      className="h-16 w-auto object-contain"
                    />
        </div>


        <div className="auth-brand-tag">Body · Mind · Soul</div>

        <div className="auth-quote">
          <span className="auth-quote-mark">"</span>
          <p className="auth-quote-text">
            Yoga is not about touching your toes. It's about what you learn
            on the way down — about yourself and your journey.
          </p>
          <span className="auth-quote-author">— Ancient Wisdom</span>
        </div>

        <div className="auth-stats">
          {[
            { val: "10K+", lbl: "Students" },
            { val: "50+",  lbl: "Instructors" },
            { val: "4.9★", lbl: "Rating" },
          ].map((s) => (
            <div className="auth-stat" key={s.lbl}>
              <div className="auth-stat-val">{s.val}</div>
              <div className="auth-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Social Buttons ──────────────────────────────────────────────────────────
export function SocialButtons() {
  const socials = [
    {
      name: "Continue with Google",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
    },
    {
      name: "Continue with Facebook",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "Continue with Instagram",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433"/>
              <stop offset="25%" stopColor="#e6683c"/>
              <stop offset="50%" stopColor="#dc2743"/>
              <stop offset="75%" stopColor="#cc2366"/>
              <stop offset="100%" stopColor="#bc1888"/>
            </linearGradient>
          </defs>
          <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="auth-socials">
      {socials.map((s) => (
        <button key={s.name} className="auth-social-btn" type="button">
          <span className="auth-social-icon">{s.icon}</span>
          {s.name}
        </button>
      ))}
    </div>
  );
}

export function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <LeftPanel />
      <div className="auth-right">
        <div className="auth-form-inner">{children}</div>
      </div>
    </div>
  );
}
