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
      if (user) {
        if (isMounted) setFirebaseUser(user);
        try {
          // Fetch real profile from backend
          const profileData = await getCurrentUser();
          if (isMounted && profileData) {
            setBackendProfile(profileData);
            setAuthState((current) => ({
              ...current,
              isPremium: profileData.premiumStatus || current.isPremium,
            }));
          }
        } catch (error) {
          console.error("AuthContext: Failed to sync backend profile", error);
        }
      } else {
        if (isMounted) {
          setFirebaseUser(null);
          setBackendProfile(null);
        }
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
        payload.profileSetupComplete ?? profile.completed ?? authState.profileSetupComplete ?? false,
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
          name: backendProfile?.username || authState.profile?.fullName || firebaseUser.displayName || firebaseUser.email?.split("@")[0],
          avatar: backendProfile?.avatar || authState.profile?.avatar || firebaseUser.photoURL || "",
          role: "member",
          premiumStatus: backendProfile?.premiumStatus || authState.isPremium,
          streak: backendProfile?.streak || 0,
          goals: backendProfile?.goals || [],
          preferences: backendProfile?.preferences || {},
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

