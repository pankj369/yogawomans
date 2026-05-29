// src/context/MoodContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const MoodContext = createContext(null);

export const moodThemes = {
  calm: {
    id: "calm",
    name: "Calm",
    emoji: "🌊",
    primaryColor: "#1565C0",
    glowColor: "rgba(21, 101, 192, 0.4)",
    glowRGB: "21, 101, 192",
    gradientStart: "rgba(21, 101, 192, 0.12)",
    description: "Soothing flow and ocean-like peace to relax your mind."
  },
  stressed: {
    id: "stressed",
    name: "Stressed",
    emoji: "🧘",
    primaryColor: "#6A1B9A",
    glowColor: "rgba(106, 27, 154, 0.4)",
    glowRGB: "106, 27, 154",
    gradientStart: "rgba(106, 27, 154, 0.12)",
    description: "Lavender sanctuary to release tension and find center."
  },
  tired: {
    id: "tired",
    name: "Tired",
    emoji: "🌅",
    primaryColor: "#E77B35",
    glowColor: "rgba(231, 123, 53, 0.4)",
    glowRGB: "231, 123, 53",
    gradientStart: "rgba(231, 123, 53, 0.12)",
    description: "Warm amber glow to gently restore your natural vitality."
  },
  focused: {
    id: "focused",
    name: "Focused",
    emoji: "🌲",
    primaryColor: "#2E7D32",
    glowColor: "rgba(46, 125, 50, 0.4)",
    glowRGB: "46, 125, 50",
    gradientStart: "rgba(46, 125, 50, 0.12)",
    description: "Deep forest sanctuary to sharpen clarity and awareness."
  },
  happy: {
    id: "happy",
    name: "Happy",
    emoji: "✨",
    primaryColor: "#FF8A3D",
    glowColor: "rgba(255, 138, 61, 0.4)",
    glowRGB: "255, 138, 61",
    gradientStart: "rgba(255, 138, 61, 0.12)",
    description: "Radiant golden vibes to amplify joy and expand energy."
  }
};

export function MoodProvider({ children }) {
  const [mood, setMoodState] = useState("calm");
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  const dismissCheckInModal = useCallback(() => {
    setShowCheckInModal(false);
    sessionStorage.setItem("yogawoman_mood_skipped", "true");
  }, []);

  // Load mood and check-in status on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("yogawoman_mood_state");
      const hasSkippedThisSession = sessionStorage.getItem("yogawoman_mood_skipped");

      if (hasSkippedThisSession) {
        setShowCheckInModal(false);
      } else if (stored) {
        const { currentMood, lastCheckInDate } = JSON.parse(stored);
        if (currentMood && moodThemes[currentMood]) {
          setMoodState(currentMood);
        }
        
        const today = new Date().toDateString();
        if (lastCheckInDate === today) {
          setCheckedInToday(true);
        } else {
          // It's a new day, prompt the user for check-in
          setShowCheckInModal(true);
        }
      } else {
        // No prior state, show check-in modal
        setShowCheckInModal(true);
      }
    } catch (e) {
      console.error("Failed to load mood state:", e);
      if (!sessionStorage.getItem("yogawoman_mood_skipped")) {
        setShowCheckInModal(true);
      }
    }
  }, []);

  // Update CSS custom variables on the body/document element when mood changes
  useEffect(() => {
    const root = document.documentElement;
    const theme = moodThemes[mood] || moodThemes.calm;
    
    root.style.setProperty("--adaptive-glow-color", theme.glowColor);
    root.style.setProperty("--adaptive-glow-color-rgb", theme.glowRGB);
    root.style.setProperty("--adaptive-primary", theme.primaryColor);
    root.style.setProperty("--adaptive-glow-gradient-start", theme.gradientStart);
  }, [mood]);

  const updateMood = (newMood) => {
    if (!moodThemes[newMood]) return;
    
    setMoodState(newMood);
    setCheckedInToday(true);
    setShowCheckInModal(false);
    
    const today = new Date().toDateString();
    localStorage.setItem(
      "yogawoman_mood_state",
      JSON.stringify({
        currentMood: newMood,
        lastCheckInDate: today
      })
    );
  };

  const activeTheme = moodThemes[mood] || moodThemes.calm;

  return (
    <MoodContext.Provider
      value={{
        mood,
        setMood: updateMood,
        checkedInToday,
        showCheckInModal,
        setShowCheckInModal,
        dismissCheckInModal,
        activeTheme,
        themes: moodThemes
      }}
    >
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood must be used within MoodProvider");
  }
  return context;
}
