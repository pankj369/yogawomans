import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  dashboardNotifications,
  dailyRoutine,
  featuredSessions,
  liveClasses,
  recommendationTopics,
  sessionCatalog,
} from "../data/wellnessData";
import { loadProfileSetupState } from "../pages/profileSetupStorage";
import { useAuth } from "./AuthContext";
import { Flame, Clock, Activity, Sparkles } from "lucide-react";

const DashboardContext = createContext(null);
const DASHBOARD_STATE_KEY = "yogawomans_dashboard_state";

const defaultDashboardState = {
  lastSessionId: featuredSessions[0].id,
  completedSessions: [],
  completedRoutine: [],
  favorites: [],
  liveJoined: [],
  meditationMinutes: 220,
  yogaSessionsCompleted: 18,
  streakDays: 6,
  lastActiveDate: new Date(Date.now() - 86400000).toLocaleDateString('en-CA'), // yesterday
  wellnessScore: 84,
  notificationsRead: [],
  activePlan: "Basic",
  settings: {
    darkMode: false,
    notifications: true,
    language: "English",
    privateProfile: true,
  },
};

function buildRecommendationSeed(profile, dashboardState) {
  const goals = profile?.data?.goals || [];
  const completed = dashboardState.completedSessions.length;
  const pool = sessionCatalog.slice();

  const weightFor = (session) => {
    let score = 0;
    if (goals.some((goal) => session.tags?.some((tag) => goal.toLowerCase().includes(tag.toLowerCase())))) {
      score += 3;
    }
    if (session.level === "Gentle" && profile?.data?.stressLevel) score += 2;
    if (session.level === "Beginner" && completed < 5) score += 2;
    if (session.premium) score -= 0.5;
    return score;
  };

  return pool
    .map((session) => ({ ...session, recommendationScore: weightFor(session) }))
    .sort((a, b) => b.recommendationScore - a.recommendationScore);
}

export function DashboardProvider({ children }) {
  const auth = useAuth();
  const profile = loadProfileSetupState();
  const [state, setState] = useLocalStorage(DASHBOARD_STATE_KEY, defaultDashboardState, "localStorage");
  const [modalSession, setModalSession] = useState(null);
  const [meetingClass, setMeetingClass] = useState(null);

  useEffect(() => {
    if (!state.lastSessionId && featuredSessions.length) {
      setState((current) => ({ ...current, lastSessionId: featuredSessions[0].id }));
    }
  }, [state.lastSessionId, setState]);

  // Real Streak Verification on app load / dashboard refresh
  useEffect(() => {
    const todayStr = new Date().toLocaleDateString('en-CA');
    
    // If lastActiveDate is not set, initialize it to yesterday to validate the initial default streak
    if (!state.lastActiveDate) {
      const yesterdayStr = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
      setState((current) => ({
        ...current,
        lastActiveDate: yesterdayStr,
      }));
      return;
    }

    const lastActive = new Date(state.lastActiveDate);
    const today = new Date(todayStr);
    const diffTime = today - lastActive;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    // If they missed yesterday (diffDays > 1), reset streak
    if (diffDays > 1 && state.streakDays > 0) {
      setState((current) => ({
        ...current,
        streakDays: 0,
      }));
    }
  }, [state.lastActiveDate, state.streakDays, setState]);

  const lastSession = sessionCatalog.find((session) => session.id === state.lastSessionId) || sessionCatalog[0];

  const toggleFavorite = (session) => {
    setState((current) => {
      const exists = current.favorites.includes(session.id);
      return {
        ...current,
        favorites: exists
          ? current.favorites.filter((id) => id !== session.id)
          : [...current.favorites, session.id],
      };
    });
  };

  const openSession = (session) => {
    setState((current) => ({
      ...current,
      lastSessionId: session.id,
    }));
    setModalSession(session);
  };

  const markSessionCompleted = (sessionId, minutes = 0) => {
    setState((current) => {
      const completedSessions = current.completedSessions.includes(sessionId)
        ? current.completedSessions
        : [...current.completedSessions, sessionId];

      const todayStr = new Date().toLocaleDateString('en-CA');
      let newStreak = current.streakDays;

      if (!current.lastActiveDate) {
        newStreak = 1;
      } else if (current.lastActiveDate === todayStr) {
        // Already active today, streak remains same
      } else {
        const lastActive = new Date(current.lastActiveDate);
        const today = new Date(todayStr);
        const diffTime = today - lastActive;
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          newStreak = current.streakDays + 1;
        } else {
          newStreak = 1; // Broken streak, start fresh
        }
      }

      return {
        ...current,
        completedSessions,
        meditationMinutes: current.meditationMinutes + minutes,
        yogaSessionsCompleted: current.yogaSessionsCompleted + 1,
        streakDays: Math.min(newStreak, 30),
        lastActiveDate: todayStr,
        wellnessScore: Math.min(current.wellnessScore + 1, 100),
      };
    });
  };

  const completeRoutine = (routineId) => {
    setState((current) => ({
      ...current,
      completedRoutine: current.completedRoutine.includes(routineId)
        ? current.completedRoutine
        : [...current.completedRoutine, routineId],
      wellnessScore: Math.min(current.wellnessScore + 0.5, 100),
    }));
  };

  const joinClass = (liveClass) => {
    setState((current) => ({
      ...current,
      liveJoined: current.liveJoined.includes(liveClass.id)
        ? current.liveJoined
        : [...current.liveJoined, liveClass.id],
    }));
    setMeetingClass(liveClass);
  };

  const markNotificationRead = (id) => {
    setState((current) => ({
      ...current,
      notificationsRead: current.notificationsRead.includes(id)
        ? current.notificationsRead
        : [...current.notificationsRead, id],
    }));
  };

  const updateSetting = (key, value) => {
    setState((current) => ({
      ...current,
      settings: {
        ...current.settings,
        [key]: value,
      },
    }));
  };

  const upgradePlan = (planName) => {
    setState((current) => ({
      ...current,
      activePlan: planName,
    }));
  };

  const recommendations = useMemo(
    () => buildRecommendationSeed(profile, state).slice(0, 5),
    [profile, state]
  );

  const unreadNotifications = dashboardNotifications.filter(
    (item) => !state.notificationsRead.includes(item.id)
  );

  const dynamicInsights = useMemo(() => [
    { id: "streak", label: "Weekly streak", value: state.streakDays, total: 7, color: "#E8651A", icon: Flame },
    { id: "meditation", label: "Meditation minutes", value: state.meditationMinutes, total: 300, color: "#2E7D32", icon: Clock },
    { id: "sessions", label: "Yoga sessions completed", value: state.yogaSessionsCompleted, total: 25, color: "#1565C0", icon: Activity },
    { id: "score", label: "Wellness score", value: Math.round(state.wellnessScore), total: 100, color: "#8a6a3c", icon: Sparkles },
  ], [state.streakDays, state.meditationMinutes, state.yogaSessionsCompleted, state.wellnessScore]);

  const value = useMemo(
    () => ({
      state,
      profile,
      auth,
      modalSession,
      meetingClass,
      lastSession,
      featuredSessions,
      dailyRoutine,
      liveClasses,
      dashboardInsights: dynamicInsights,
      notifications: unreadNotifications,
      recommendations,
      setModalSession,
      setMeetingClass,
      toggleFavorite,
      openSession,
      markSessionCompleted,
      completeRoutine,
      joinClass,
      markNotificationRead,
      updateSetting,
      upgradePlan,
    }),
    [state, profile, auth, modalSession, meetingClass, lastSession, recommendations, unreadNotifications, dynamicInsights]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
}
