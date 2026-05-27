export const AUTH_FLAG = "yogawoman_logged_in";
export const PROFILE_SETUP_KEY = "yogawoman_profile_setup_v1";

export const defaultProfileSetupState = {
  step: 0,
  completed: false,
  skipped: false,
  data: {
    fullName: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    country: "",
    profileImage: "",
    profileImageName: "",
    medicalConditions: "",
    injuries: "",
    backPain: "",
    bloodPressure: "",
    diabetes: "",
    pregnancy: "",
    mentalWellness: "",
    allergies: "",
    activityLevel: "",
    sleepQuality: "",
    stressLevel: "",
    waterIntake: "",
    meditationExperience: "",
    smokingAlcohol: "",
    goals: [],
  },
};

export const safeParseState = (raw) => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const loadProfileSetupState = () => {
  if (typeof window === "undefined") return defaultProfileSetupState;
  const parsed = safeParseState(window.localStorage.getItem(PROFILE_SETUP_KEY));
  if (!parsed || typeof parsed !== "object") return defaultProfileSetupState;
  return {
    ...defaultProfileSetupState,
    ...parsed,
    data: {
      ...defaultProfileSetupState.data,
      ...(parsed.data || {}),
    },
  };
};

export const persistProfileSetupState = (state) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_SETUP_KEY, JSON.stringify(state));
};

export const markProfileSetupCompleted = (data) => {
  const state = {
    step: 3,
    completed: true,
    skipped: false,
    data,
  };
  persistProfileSetupState(state);
  return state;
};

export const markProfileSetupSkipped = () => {
  const current = loadProfileSetupState();
  const state = {
    ...current,
    skipped: true,
    completed: false,
  };
  persistProfileSetupState(state);
  return state;
};
