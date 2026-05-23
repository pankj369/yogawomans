import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import {
  AuthInput,
  AuthLayout,
  SocialButtons,
  getPasswordStrength,
  strengthClasses,
  strengthLabels,
  variants,
} from "./AuthShared";

function LoginForm({ onForgot, onSuccess }) {
  const [form, setForm] = useState({ email: "", password: ""});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const validate = () => {
  const e = {};

  if (!form.email) {
    e.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    e.email = "Enter a valid email";
  }

  if (!form.password) {
    e.password = "Password is required";
  }

  return e;
};

  const [apiError, setApiError] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    setApiError("");

    try {
      const response = await loginUser({
        email: form.email,
        password: form.password,
      });

      if (response.success) {
        onSuccess({
          email: response.user?.email || form.email,
          token: response.token,
          rememberMe,
          id: response.user?.id,
          name: response.user?.name || form.email.split("@")[0],
        });
      } else {
        setApiError(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      let errorMsg = "Unable to connect to server. Please try again.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        errorMsg = "Invalid email or password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMsg = "Too many failed attempts. Please try again later or reset your password.";
      } else if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }

      setApiError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (ev) => {
    setForm({ ...form, [k]: ev.target.value });
    setErrors({ ...errors, [k]: "" });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="auth-title">Welcome Back 🙏</h2>
      <p className="auth-subtitle">Sign in to continue your yoga journey</p>

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
        <label className="auth-label">Password</label>
        <AuthInput
          icon="🔒"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
          name="password"
          autoComplete="current-password"
        />
        {errors.password && <span className="auth-error-msg">⚠ {errors.password}</span>}
      </div>

      {apiError && (
        <div className="auth-error-banner">
          <span>⚠️ {apiError}</span>
        </div>
      )}

      <div className="auth-check-row">
        <input
          type="checkbox"
          className="auth-check"
          id="remember-me"
          checked={rememberMe}
          onChange={() => setRememberMe((current) => !current)}
        />
        <label htmlFor="remember-me" className="auth-check-lbl">
          Remember me on this device
        </label>
      </div>

      <button type="button" className="auth-forgot" onClick={onForgot}>
        Forgot password?
      </button>

      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? "🔄 Signing In…" : "Sign In →"}
      </button>

      <div className="auth-or">
        <div className="auth-or-line" />
        <span className="auth-or-text">or continue with</span>
        <div className="auth-or-line" />
      </div>

      <SocialButtons />

      <p className="auth-switch">
        Don't have an account?{" "}
        <Link to="/signup" className="auth-switch-btn">
          Create one free →
        </Link>
      </p>
    </form>
  );
}

function ForgotPasswordForm({ onBack, onReset }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  if (sent)
    return (
      <div className="auth-success-box">
        <span className="auth-success-icon">📬</span>
        <h3 className="auth-success-title">Check Your Email</h3>
        <p className="auth-success-text">
          We've sent a password reset link to <b>{email}</b>. Check your inbox and follow the instructions.
        </p>
        <button className="auth-submit" type="button" onClick={() => onReset(email)}>
          Enter Reset Code →
        </button>
        <p className="auth-switch" style={{ marginTop: 16 }}>
          <button type="button" className="auth-switch-btn" onClick={onBack}>
            ← Back to Login
          </button>
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <button type="button" className="auth-back" onClick={onBack}>
        ← Back to Login
      </button>
      <h2 className="auth-title">Forgot Password? 🔑</h2>
      <p className="auth-subtitle">Enter your registered email and we'll send you a reset link.</p>

      <div className="auth-field">
        <label className="auth-label">Email Address</label>
        <AuthInput
          icon="📧"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          error={error}
          name="email"
          autoComplete="email"
        />
        {error && <span className="auth-error-msg">⚠ {error}</span>}
      </div>

      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? "📤 Sending…" : "Send Reset Link →"}
      </button>
    </form>
  );
}

function ResetPasswordForm({ email, onBack, onDone }) {
  const [form, setForm] = useState({ code: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.code || form.code.length < 6) e.code = "Enter the 6-digit code";
    if (!form.password || form.password.length < 8) e.password = "At least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    onDone();
  };

  const set = (k) => (ev) => {
    setForm({ ...form, [k]: ev.target.value });
    setErrors({ ...errors, [k]: "" });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <button type="button" className="auth-back" onClick={onBack}>
        ← Back
      </button>
      <h2 className="auth-title">Reset Password 🔐</h2>
      <p className="auth-subtitle">
        Enter the 6-digit code sent to <b style={{ color: "#2E7D32" }}>{email}</b>
      </p>

      <div className="auth-field">
        <label className="auth-label">Verification Code</label>
        <AuthInput
          icon="🔢"
          placeholder="Enter 6-digit OTP"
          value={form.code}
          onChange={set("code")}
          error={errors.code}
          name="otp"
        />
        {errors.code && <span className="auth-error-msg">⚠ {errors.code}</span>}
      </div>

      <div className="auth-field">
        <label className="auth-label">New Password</label>
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
        <label className="auth-label">Confirm New Password</label>
        <AuthInput
          icon="🔐"
          type="password"
          placeholder="Re-enter new password"
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
          name="confirm-password"
          autoComplete="new-password"
        />
        {errors.confirm && <span className="auth-error-msg">⚠ {errors.confirm}</span>}
      </div>

      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? "🔄 Updating…" : "Update Password →"}
      </button>
    </form>
  );
}

function ResetSuccess({ onLogin }) {
  return (
    <div className="auth-success-box">
      <span className="auth-success-icon">✅</span>
      <h3 className="auth-success-title">Password Updated!</h3>
      <p className="auth-success-text">
        Your password has been reset successfully. You can now sign in with your new password.
      </p>
      <button className="auth-submit" type="button" onClick={onLogin}>
        Go to Login →
      </button>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [view, setView] = useState("login");
  const [resetEmail, setResetEmail] = useState("");

  const returnTo = location.state?.returnTo;
  const planState = location.state?.planState;

  if (auth.isAuthenticated) {
    if (returnTo) {
      return <Navigate to={returnTo} state={planState} replace />;
    }
    return <Navigate to={auth.profileSetupComplete ? "/dashboard" : "/profile-setup"} replace />;
  }

  const showLogin = () => setView("login");
  const showForgot = () => setView("forgot");
  const showReset = (email) => {
    setResetEmail(email);
    setView("reset");
  };
  const showResetOk = () => setView("reset-success");
  const handleAuthSuccess = ({ email, token, rememberMe, id, name }) => {
    const session = auth.login({
      email,
      token,
      rememberMe,
      id,
      name,
    });
    
    if (returnTo) {
      navigate(returnTo, { 
        state: { 
          planState, 
          actionPending: location.state?.actionPending 
        }, 
        replace: true 
      });
    } else {
      navigate(session.profileSetupComplete ? "/dashboard" : "/profile-setup", { replace: true });
    }
  };

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        <motion.div key={view} variants={variants} initial="enter" animate="center" exit="exit">
          {view === "login" && <LoginForm onForgot={showForgot} onSuccess={handleAuthSuccess} />}
          {view === "forgot" && <ForgotPasswordForm onBack={showLogin} onReset={showReset} />}
          {view === "reset" && <ResetPasswordForm email={resetEmail} onBack={showForgot} onDone={showResetOk} />}
          {view === "reset-success" && <ResetSuccess onLogin={showLogin} />}
        </motion.div>
      </AnimatePresence>
    </AuthLayout>
  );
}
