import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signupUser } from "../services/authService";
import {
  AuthInput,
  AuthLayout,
  SocialButtons,
  getPasswordStrength,
  strengthClasses,
  strengthLabels,
} from "./AuthShared";

function RegisterForm({ onLogin, onComplete }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Full name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone) e.phone = "Contact number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, "")))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!agreed) e.agreed = "Please accept the terms";
    return e;
  };

const handleSubmit = async (ev) => {
  ev.preventDefault();

  const e = validate();

  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  try {
    setLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      rememberMe: true,
    };

    const response = await signupUser(payload);

setDone(true);

if (onComplete) {
  onComplete(response);
}
  } catch (error) {
    console.error("Signup Error:", error);

    setErrors({
      api:
        error?.response?.data?.message ||
        "Signup failed. Please try again.",
    });

  } finally {
    setLoading(false);
  }
};
  const set = (k) => (ev) => {
    setForm({ ...form, [k]: ev.target.value });
    setErrors({ ...errors, [k]: "" });
  };

  if (done)
    return (
      <div className="auth-success-box">
        <span className="auth-success-icon">🎉</span>
        <h3 className="auth-success-title">Account Created!</h3>
        <p className="auth-success-text">
          Welcome to YOGAWOMANS! We've sent a verification link to <b>{form.email}</b>.
          Please check your inbox to activate your account.
        </p>
        <button className="auth-submit" type="button" onClick={onLogin}>
          Go to Login →
        </button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="auth-title">Join yogawomans 🌿</h2>
      <p className="auth-subtitle">Create your free account and begin the journey</p>

      <div className="auth-field">
        <label className="auth-label">Full Name</label>
        <AuthInput
          icon="👤"
          placeholder="Your full name"
          value={form.name}
          onChange={set("name")}
          error={errors.name}
          name="name"
          autoComplete="name"
        />
        {errors.name && <span className="auth-error-msg">⚠ {errors.name}</span>}
      </div>

      <div className="auth-field">
        <label className="auth-label">Email Address</label>
        <AuthInput
          icon="📧"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
          name="email"
          autoComplete="email"
        />
        {errors.email && <span className="auth-error-msg">⚠ {errors.email}</span>}
      </div>

      <div className="auth-field">
        <label className="auth-label">Contact Number</label>
        <div className="auth-input-wrap" style={{ display: "flex", alignItems: "center" }}>
          <span className="auth-input-icon">📞</span>
          <span
            style={{
              position: "absolute",
              left: 42,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 14,
              fontWeight: 700,
              color: "#2E7D32",
              borderRight: "1.5px solid rgba(46,125,50,0.25)",
              paddingRight: 10,
              lineHeight: 1,
              pointerEvents: "none",
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            +91
          </span>
          <input
            name="phone"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={form.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              set("phone")({ target: { value: val } });
            }}
            autoComplete="tel"
            maxLength={10}
            className={`auth-input${errors.phone ? " error" : form.phone ? " success" : ""}`}
            style={{ paddingLeft: 80 }}
          />
        </div>
        {form.phone && (
          <span
            style={{
              fontFamily: "'Lato',sans-serif",
              fontSize: 11,
              color: /^[6-9]\d{9}$/.test(form.phone) ? "#2E7D32" : "#aaa",
              marginTop: 4,
              display: "block",
            }}
          >
            {form.phone.length}/10 digits
            {/^[6-9]\d{9}$/.test(form.phone) ? " ✅" : ""}
          </span>
        )}
        {errors.phone && <span className="auth-error-msg">⚠ {errors.phone}</span>}
      </div>

      <div className="auth-field">
        <label className="auth-label">Password</label>
        <AuthInput
          icon="🔒"
          type="password"
          placeholder="Min. 8 characters"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
          name="new-password"
          autoComplete="new-password"
        />
        {form.password && (
          <div className="auth-pw-strength">
            <div className="auth-pw-bars">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`auth-pw-bar${strength >= i ? ` ${strengthClasses[strength]}` : ""}`}
                />
              ))}
            </div>
            <span className="auth-pw-label">{strengthLabels[strength]} password</span>
          </div>
        )}
        {errors.password && <span className="auth-error-msg">⚠ {errors.password}</span>}
      </div>

      <div className="auth-field">
        <label className="auth-label">Confirm Password</label>
        <AuthInput
          icon="🔐"
          type="password"
          placeholder="Re-enter your password"
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
          name="confirm-password"
          autoComplete="new-password"
        />
        {errors.confirm && <span className="auth-error-msg">⚠ {errors.confirm}</span>}
      </div>

      <div className="auth-check-row">
        <input
          type="checkbox"
          className="auth-check"
          id="terms"
          checked={agreed}
          onChange={() => {
            setAgreed(!agreed);
            setErrors({ ...errors, agreed: "" });
          }}
        />
        <label htmlFor="terms" className="auth-check-lbl">
          I agree to the <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a> of YOGAWOMANS
        </label>
      </div>
      {errors.agreed && (
        <span className="auth-error-msg" style={{ marginTop: -12, display: "block", marginBottom: 12 }}>
          ⚠ {errors.agreed}
        </span>
      )}
{errors.api && (
  <span className="auth-error-msg">
    ⚠ {errors.api}
  </span>
)}
      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? "🌱 Creating Account…" : "Create Account →"}
      </button>

      <div className="auth-or">
        <div className="auth-or-line" />
        <span className="auth-or-text">or sign up with</span>
        <div className="auth-or-line" />
      </div>

      <SocialButtons />

      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login" className="auth-switch-btn">
          Sign In →
        </Link>
      </p>
    </form>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to={auth.profileSetupComplete ? "/dashboard" : "/profile-setup"} replace />;
  }
  return (
    <AuthLayout>
      <RegisterForm
        onLogin={() => navigate("/login")}
       onComplete={() => {
  navigate("/login");
}}
      />
    </AuthLayout>
  );
}
