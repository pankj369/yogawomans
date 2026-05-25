import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useWellnessStore } from "../stores/useWellnessStore";
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
import { usePlaylists } from "../hooks/usePlaylists";
import { useWellnessStats } from "../hooks/useWellnessStats";
import { useProgress } from "../hooks/useProgress";

const DashboardContext = createContext(null);
// Legacy DASHBOARD_STATE_KEY removed
// defaultDashboardState migrated to useWellnessStore

function buildRecommendationSeed(profile, dashboardState, backendGoals = []) {
  const goals = profile?.data?.goals || backendGoals || [];
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
  
  // Real Backend Hooks
  const { savedPlaylists, toggleFavorite: toggleFavoriteApi, isSaved } = usePlaylists();
  const { stats, logSession: logSessionApi, activityHistory } = useWellnessStats();
  const { continueWatching, saveProgress: saveProgressApi } = useProgress();

  const state = useWellnessStore((s) => s.dashboardState);
  const setState = useWellnessStore((s) => s.setDashboardState);
  const [modalSession, setModalSession] = useState(null);
  const [meetingClass, setMeetingClass] = useState(null);

  // Derive final values from backend first, fallback to local storage
  const activeStreak = stats?.currentStreak !== undefined ? stats.currentStreak : (auth.user?.streak || state.streakDays);
  const totalMeditation = stats?.totalMeditationMinutes !== undefined ? stats.totalMeditationMinutes : (auth.user?.meditationMinutes || state.meditationMinutes);
  const totalYoga = stats?.totalSessionsCompleted !== undefined ? stats.totalSessionsCompleted : state.yogaSessionsCompleted;
  
  const isPremium = auth.user?.premiumStatus || state.activePlan !== "Basic";

  // Compute active favorites based on real backend data if available
  const activeFavorites = savedPlaylists.length > 0 
    ? savedPlaylists.map(p => p.playlistId) 
    : (state.favorites || []);

  // Compute session history based on backend continueWatching if available
  const activeHistory = continueWatching.length > 0 
    ? continueWatching.map(cw => ({ sessionId: cw.mediaId, timestamp: cw.lastWatchedAt }))
    : (state.sessionHistory || []);

  // Determine last session
  let lastSessionId = state.lastSessionId;
  if (continueWatching && continueWatching.length > 0) {
    lastSessionId = continueWatching[0].mediaId;
  }

  useEffect(() => {
    if (!lastSessionId && featuredSessions.length) {
      setState((current) => ({ ...current, lastSessionId: featuredSessions[0].id }));
    }
  }, [lastSessionId, setState]);

  const lastSession = sessionCatalog.find((session) => session.id === lastSessionId) || sessionCatalog[0];

  const toggleFavorite = async (session) => {
    // Fire backend request (which updates optimistic state internally)
    await toggleFavoriteApi(session.id);
    
    // Also keep local storage in sync as fallback
    setState((current) => {
      const favorites = current.favorites || [];
      const exists = favorites.includes(session.id);
      return {
        ...current,
        favorites: exists
          ? favorites.filter((id) => id !== session.id)
          : [...favorites, session.id],
      };
    });
  };

  const openSession = (session) => {
    setState((current) => {
      const sessionHistory = current.sessionHistory || [];
      const filteredHistory = sessionHistory.filter(h => h.sessionId !== session.id);
      return {
        ...current,
        lastSessionId: session.id,
        sessionHistory: [
          { sessionId: session.id, timestamp: new Date().toISOString(), progress: 0 },
          ...filteredHistory,
        ].slice(0, 20),
      };
    });
    setModalSession(session);
  };

  const markSessionCompleted = async (sessionId, minutes = 0) => {
    // 1. Fire Real Backend Log
    const sessionType = sessionCatalog.find(s => s.id === sessionId)?.category === "meditation" ? "meditation" : "yoga";
    await logSessionApi(sessionId, sessionType, minutes);
    await saveProgressApi(sessionId, minutes * 60);

    // 2. Keep local fallback in sync
    setState((current) => {
      const completedSessions = current.completedSessions || [];
      const isAlreadyCompleted = completedSessions.includes(sessionId);
      
      const newCompletedSessions = isAlreadyCompleted
        ? completedSessions
        : [...completedSessions, sessionId];

      const todayStr = new Date().toLocaleDateString('en-CA');
      let newStreak = current.streakDays || 0;

      if (!current.lastActiveDate) {
        newStreak = 1;
      } else if (current.lastActiveDate !== todayStr) {
        const lastActive = new Date(current.lastActiveDate);
        const today = new Date(todayStr);
        const diffDays = Math.round((today - lastActive) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) newStreak = (current.streakDays || 0) + 1;
        else newStreak = 1; 
      }

      return {
        ...current,
        completedSessions: newCompletedSessions,
        meditationMinutes: (current.meditationMinutes || 0) + (sessionType === 'meditation' ? minutes : 0),
        yogaSessionsCompleted: (current.yogaSessionsCompleted || 0) + (sessionType === 'yoga' ? 1 : 0),
        streakDays: Math.min(newStreak, 30),
        lastActiveDate: todayStr,
        wellnessScore: Math.min((current.wellnessScore || 0) + 1, 100),
      };
    });
  };

  const completeRoutine = (routineId) => {
    setState((current) => {
      const completedRoutine = current.completedRoutine || [];
      return {
        ...current,
        completedRoutine: completedRoutine.includes(routineId)
          ? completedRoutine
          : [...completedRoutine, routineId],
        wellnessScore: Math.min((current.wellnessScore || 0) + 0.5, 100),
      };
    });
  };

  const joinClass = (liveClass) => {
    setState((current) => {
      const liveJoined = current.liveJoined || [];
      return {
        ...current,
        liveJoined: liveJoined.includes(liveClass.id)
          ? liveJoined
          : [...liveJoined, liveClass.id],
      };
    });
    setMeetingClass(liveClass);
  };

  const markNotificationRead = (id) => {
    setState((current) => {
      const notificationsRead = current.notificationsRead || [];
      return {
        ...current,
        notificationsRead: notificationsRead.includes(id)
          ? notificationsRead
          : [...notificationsRead, id],
      };
    });
  };

  const updateSetting = (key, value) => {
    setState((current) => ({
      ...current,
      settings: {
        ...(current.settings || {}),
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
    () => buildRecommendationSeed(profile, state, auth.user?.goals).slice(0, 5),
    [profile, state, auth.user?.goals]
  );

  const recentlyPlayed = useMemo(() => {
    if (!activeHistory) return [];
    return activeHistory
      .map(h => sessionCatalog.find(s => s.id === h.sessionId))
      .filter(Boolean)
      .slice(0, 5);
  }, [activeHistory]);

  const completedSessions = state.completedSessions || [];
  const isReturningUser = activeStreak > 0 || completedSessions.length > 0;

  const notificationsRead = state.notificationsRead || [];
  const unreadNotifications = dashboardNotifications.filter(
    (item) => !notificationsRead.includes(item.id)
  );

  const dynamicInsights = useMemo(() => [
    { id: "streak", label: "Weekly streak", value: activeStreak, total: 7, color: "#E8651A", icon: Flame },
    { id: "meditation", label: "Meditation minutes", value: totalMeditation, total: 300, color: "#2E7D32", icon: Clock },
    { id: "sessions", label: "Yoga sessions completed", value: totalYoga, total: 25, color: "#1565C0", icon: Activity },
    { id: "score", label: "Wellness score", value: Math.round(state.wellnessScore || 0), total: 100, color: "#8a6a3c", icon: Sparkles },
  ], [activeStreak, totalMeditation, totalYoga, state.wellnessScore]);

  // Inject backend favorites into state for components that access it directly
  const finalState = { 
    ...state, 
    favorites: activeFavorites,
    notificationsRead: state.notificationsRead || [],
    completedSessions: state.completedSessions || [],
    completedRoutine: state.completedRoutine || [],
    liveJoined: state.liveJoined || [],
    sessionHistory: state.sessionHistory || [],
    wellnessScore: state.wellnessScore || 0,
    streakDays: state.streakDays || 0,
    meditationMinutes: state.meditationMinutes || 0,
    yogaSessionsCompleted: state.yogaSessionsCompleted || 0,
    settings: state.settings || {
      darkMode: false,
      notifications: true,
      language: "English",
      privateProfile: true,
    }
  };

  const value = useMemo(
    () => ({
      state: finalState,
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
      recentlyPlayed,
      isReturningUser,
      isPremium,
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
    [finalState, profile, auth, modalSession, meetingClass, lastSession, recommendations, recentlyPlayed, isReturningUser, isPremium, unreadNotifications, dynamicInsights]
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

