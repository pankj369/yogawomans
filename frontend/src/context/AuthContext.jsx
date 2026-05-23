import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, isConfigured } from "../config/firebase";
import { readStorage, removeStorage, writeStorage } from "../utils/storage";
import { loadProfileSetupState } from "../pages/profileSetupStorage";
import { getCurrentUser } from "../services/authService";

const AUTH_STORAGE_KEY = "yogawomans_auth_session";
const AuthContext = createContext(null);

function getStorageTarget(rememberMe) {
  return rememberMe ? window.localStorage : window.sessionStorage;
}

function readAuthSnapshot() {
  if (typeof window === "undefined") {
    return {
      rememberMe: false,
      profileSetupComplete: false,
      profileSetupSkipped: false,
      isPremium: false,
    };
  }

  const session = readStorage(window.sessionStorage, AUTH_STORAGE_KEY, null);
  const persistent = readStorage(window.localStorage, AUTH_STORAGE_KEY, null);
  const snapshot = session || persistent || null;
  const profile = loadProfileSetupState();

  if (snapshot) {
    return {
      ...snapshot,
      profileSetupComplete: profile.completed || snapshot.profileSetupComplete || false,
      profileSetupSkipped: profile.skipped || snapshot.profileSetupSkipped || false,
    };
  }

  return {
    rememberMe: false,
    profileSetupComplete: profile.completed || false,
    profileSetupSkipped: profile.skipped || false,
    isPremium: false,
  };
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => readAuthSnapshot());
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [backendProfile, setBackendProfile] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!isConfigured) {
      const profile = loadProfileSetupState();
      setAuthState((current) => ({
        ...current,
        profileSetupComplete: profile.completed || current.profileSetupComplete || false,
        profileSetupSkipped: profile.skipped || current.profileSetupSkipped || false,
      }));
      setInitialized(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;
      
      if (user) {
        setFirebaseUser(user);
        try {
          // Fetch real profile from backend safely
          const profileData = await getCurrentUser();
          if (isMounted && profileData) {
            setBackendProfile(profileData);
            setAuthState((current) => ({
              ...current,
              isPremium: profileData.premiumStatus?.isPremium || current.isPremium,
              profileSetupComplete: profileData.onboarding?.completed || current.profileSetupComplete,
            }));
          }
        } catch (error) {
          console.error("AuthContext: Failed to sync backend profile", error);
        }
      } else {
        setFirebaseUser(null);
        setBackendProfile(null);
      }

      if (isMounted) {
        const localProfile = loadProfileSetupState();
        setAuthState((current) => ({
          ...current,
          profileSetupComplete: localProfile.completed || current.profileSetupComplete || false,
          profileSetupSkipped: localProfile.skipped || current.profileSetupSkipped || false,
        }));
        setInitialized(true);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !initialized) return;
    const target = getStorageTarget(authState.rememberMe);
    const snapshot = { ...authState };
    writeStorage(target, AUTH_STORAGE_KEY, snapshot);

    if (authState.rememberMe) {
      removeStorage(window.sessionStorage, AUTH_STORAGE_KEY);
    } else {
      removeStorage(window.localStorage, AUTH_STORAGE_KEY);
    }
  }, [authState, initialized]);

  const login = (payload) => {
    const profile = loadProfileSetupState();
    const rememberMe = Boolean(payload.rememberMe);
    const snapshot = {
      ...authState,
      rememberMe,
      profileSetupComplete:
        payload.backendUser?.onboarding?.completed ?? payload.profileSetupComplete ?? profile.completed ?? authState.profileSetupComplete ?? false,
      profileSetupSkipped:
        payload.profileSetupSkipped ?? profile.skipped ?? authState.profileSetupSkipped ?? false,
    };
    if (!isConfigured) {
      setFirebaseUser({
        uid: payload.id || payload.email || "user-1",
        email: payload.email,
        displayName: payload.name || payload.email,
      });
    }
    setAuthState(snapshot);
    // If backend profile data is passed directly during login, sync it
    if (payload.backendUser) {
       setBackendProfile(payload.backendUser);
    }
    return { ...snapshot, authenticated: true };
  };

  const register = (payload) => {
    const profile = loadProfileSetupState();
    const snapshot = {
      ...authState,
      rememberMe: Boolean(payload.rememberMe),
      profileSetupComplete: payload.profileSetupComplete ?? profile.completed ?? false,
      profileSetupSkipped: payload.profileSetupSkipped ?? profile.skipped ?? false,
    };
    if (!isConfigured) {
      setFirebaseUser({
        uid: payload.id || payload.email || "user-1",
        email: payload.email,
        displayName: payload.name || payload.email,
      });
    }
    setAuthState(snapshot);
    if (payload.backendUser) {
       setBackendProfile(payload.backendUser);
    }
    return { ...snapshot, authenticated: true };
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      removeStorage(window.localStorage, AUTH_STORAGE_KEY);
      removeStorage(window.sessionStorage, AUTH_STORAGE_KEY);
    }
    setAuthState({
      rememberMe: false,
      profileSetupComplete: false,
      profileSetupSkipped: false,
      isPremium: false,
    });
    if (!isConfigured) setFirebaseUser(null);
    setBackendProfile(null);
  };

  const completeProfileSetup = (profileData) => {
    setAuthState((current) => ({
      ...current,
      profileSetupComplete: true,
      profileSetupSkipped: false,
      profile: profileData,
    }));
  };

  const skipProfileSetup = () => {
    setAuthState((current) => ({
      ...current,
      profileSetupComplete: false,
      profileSetupSkipped: true,
    }));
  };

  const updateUser = (patch) => {
    setAuthState((current) => ({
      ...current,
      ...patch,
    }));
  };
  
  const grantPremium = () => {
    setAuthState((current) => ({
      ...current,
      isPremium: true,
    }));
  };

  const value = useMemo(() => {
    const isAuthenticated = Boolean(firebaseUser);
    
    // Merge Firebase Auth info with Backend Profile info seamlessly
    const userObj = firebaseUser
      ? {
          id: backendProfile?.uid || firebaseUser.uid,
          email: backendProfile?.email || firebaseUser.email,
          name: backendProfile?.fullName || authState.profile?.fullName || firebaseUser.displayName || firebaseUser.email?.split("@")[0],
          avatar: backendProfile?.avatar || authState.profile?.avatar || firebaseUser.photoURL || "",
          role: "member",
          premiumStatus: backendProfile?.premiumStatus || authState.isPremium,
          wellnessStats: backendProfile?.wellnessStats || { currentStreak: 0, calmScore: 0, totalSessions: 0, totalMinutes: 0 },
          preferences: backendProfile?.preferences || {},
          onboardingCompleted: backendProfile?.onboarding?.completed || authState.profileSetupComplete || false,
        }
      : null;

    return {
      ...authState,
      isAuthenticated,
      isAuthReady: initialized,
      user: userObj,
      login,
      register,
      logout,
      completeProfileSetup,
      skipProfileSetup,
      updateUser,
      grantPremium,
    };
  }, [authState, firebaseUser, backendProfile, initialized]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

