import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import navlogo from "../assets/images/navlogo.png";
import ProgressBar from "../components/profile-setup/ProgressBar";
import BasicInfoStep from "../components/profile-setup/BasicInfoStep";
import HealthHistoryStep from "../components/profile-setup/HealthHistoryStep";
import LifestyleStep from "../components/profile-setup/LifestyleStep";
import GoalsStep from "../components/profile-setup/GoalsStep";
import {
  loadProfileSetupState,
  markProfileSetupCompleted,
  markProfileSetupSkipped,
  persistProfileSetupState,
} from "./profileSetupStorage";
import {
  completeOnboarding,
} from "../services/authService";
import { getMyProfile } from "../services/userService";

const stepVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -32 : 32,
    scale: 0.98,
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};

export default function ProfileSetup() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [direction, setDirection] = useState(1);
  const [state, setState] = useState(() => loadProfileSetupState());
  const [loading, setLoading] = useState(false);

const [initialLoading, setInitialLoading] = useState(true);

const [error, setError] = useState("");
  const isLoggedIn = auth.isAuthenticated;
  const completed = state.completed === true;
  const totalSteps = 4;

  useEffect(() => {
    persistProfileSetupState(state);
  }, [state]);
useEffect(() => {
      
  const fetchProfile = async () => {

    try {

      const response = await getMyProfile();

      if (response?.profile) {

        const profile = response.profile;

        setState((prev) => ({
          ...prev,
          data: {
            ...prev.data,

            fullName: profile.full_name || "",

            phone: profile.phone || "",

            age: profile.age || "",

            gender: profile.gender || "",

            height: profile.height || "",

            weight: profile.weight || "",

            goals: profile.wellness_goal
              ? [profile.wellness_goal]
              : [],

            yogaStyle:
              profile.preferred_yoga_style || "",
          },
        }));
      }

    } catch (error) {

      console.error("Fetch profile error:", error);

    } finally {

      setInitialLoading(false);
    }
  };



  fetchProfile();

}, []);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (initialLoading) {
  return (
    <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
      Loading profile...
    </div>
  );
}

  if (completed) {
    return <Navigate to="/dashboard" replace />;
  }

  const currentStep = Math.min(Math.max(state.step ?? 0, 0), totalSteps - 1);

  const updateField = (field, value) => {
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
      },
    }));
  };

  const toggleGoal = (goal) => {
    setState((prev) => {
      const exists = prev.data.goals.includes(goal);
      return {
        ...prev,
        data: {
          ...prev.data,
          goals: exists
            ? prev.data.goals.filter((item) => item !== goal)
            : [...prev.data.goals, goal],
        },
      };
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    // Validate type (JPEG, PNG, WEBP)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only JPEG, PNG, and WEBP images are supported.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setState((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          profileImage: reader.result || "",
          profileImageName: file.name,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const goNext = () => {
    setDirection(1);
    setState((prev) => ({
      ...prev,
      step: Math.min((prev.step ?? 0) + 1, totalSteps - 1),
    }));
  };

  const goBack = () => {
    setDirection(-1);
    setState((prev) => ({
      ...prev,
      step: Math.max((prev.step ?? 0) - 1, 0),
    }));
  };

  const handleSkip = () => {
    markProfileSetupSkipped();
    auth.skipProfileSetup();
    navigate("/dashboard", { replace: true });
  };

  const handleComplete = async () => {

  try {

    setLoading(true);

    setError("");

    const payload = {
      ...state.data,
      goals: state.data.goals || [],
      style: state.data.yogaStyle || "",
      ambient: state.data.ambient || "nature"
    };

    const response = await completeOnboarding(payload);
    
    if (!response.success) {
      throw new Error(response.message || "Failed to save profile");
    }

    markProfileSetupCompleted(state.data);

    auth.completeProfileSetup(response.user);

    navigate("/dashboard", {
      replace: true,
    });

  } catch (error) {

    console.error(error);

    setError(
      error?.response?.data?.message ||
      "Failed to save profile"
    );

  } finally {

    setLoading(false);
  }
};

  const steps = [
    <BasicInfoStep
      key="basic"
      data={state.data}
      onChange={updateField}
      onNext={goNext}
      onSkip={handleSkip}
      onImageUpload={handleImageUpload}
    />,
    <HealthHistoryStep
      key="health"
      data={state.data}
      onChange={updateField}
      onBack={goBack}
      onNext={goNext}
      onSkip={handleSkip}
    />,
    <LifestyleStep
      key="lifestyle"
      data={state.data}
      onChange={updateField}
      onBack={goBack}
      onNext={goNext}
      onSkip={handleSkip}
    />,
    <GoalsStep
      key="goals"
      data={state.data}
      onToggleGoal={toggleGoal}
      onBack={goBack}
      onComplete={handleComplete}
      onSkip={handleSkip}
    />,
  ];

  const ActiveStep = steps[currentStep];

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(232,101,26,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(46,125,50,0.14),_transparent_26%),linear-gradient(180deg,#f9f2e8_0%,#eef6ea_100%)] px-4 py-6 text-[#2c251d] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <div className="mb-5 flex items-center justify-between rounded-[1.75rem] border border-white/60 bg-white/55 px-5 py-4 shadow-[0_16px_40px_rgba(72,42,8,0.08)] backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <img src={navlogo} alt="logo" className="h-8 w-auto object-contain" />
            <div>
              <h1 className="text-lg font-heading font-extrabold text-[#2c251d] sm:text-xl leading-none">
                Profile setup
              </h1>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSkip}
            className="rounded-full border border-[#d6c5af] px-4 py-2 text-xs font-semibold text-[#6c5847] transition hover:bg-white sm:px-5 sm:text-sm"
          >
            Skip for now
          </button>
        </div>

        <div className="mb-5 rounded-[1.75rem] border border-white/60 bg-white/50 px-5 py-4 shadow-[0_16px_40px_rgba(72,42,8,0.08)] backdrop-blur-2xl">
          <ProgressBar step={currentStep} totalSteps={totalSteps} />
        </div>

        <div className="grid flex-1 items-stretch gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative hidden overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(160deg,rgba(46,125,50,0.16),rgba(232,101,26,0.12),rgba(255,255,255,0.3))] p-8 shadow-[0_20px_80px_rgba(72,42,8,0.1)] backdrop-blur-2xl lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#7b6246]">Personalized wellness</p>
              <h2 className="mt-4 max-w-md text-4xl font-heading font-extrabold leading-tight text-[#2d251d]">
                Build a practice that feels grounded, safe, and truly yours.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-[#6c5847]">
                We use your answers to personalize classes, guidance, recovery, and daily recommendations.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Private", "Your onboarding is saved locally as you move"],
                ["Flexible", "Skip any time and return later"],
                ["Mindful", "Tailored to yoga, meditation, and recovery"],
                ["Warm", "An earthy, calm experience from start to finish"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-white/50 bg-white/55 p-4">
                  <p className="text-sm font-bold text-[#2c251d]">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#6d5a49]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {ActiveStep}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
              {error && (
  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
    {error}
  </div>
)}
        <p className="mt-5 text-center text-xs text-[#7d6a57]">
          Your progress is saved automatically in localStorage so you can continue anytime.
        </p>
      </div>
    </div>
  );
}
