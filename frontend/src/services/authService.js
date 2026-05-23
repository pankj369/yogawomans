import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile as updateFirebaseProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, isConfigured } from "../config/firebase";
import apiClient from "./apiClient";

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const signupUser = async (userData) => {
  if (isConfigured) {
    // 1. Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const user = userCredential.user;

    // 2. Set Display Name locally in Firebase
    if (userData.name) {
      await updateFirebaseProfile(user, {
        displayName: userData.name,
      });
    }

    // 3. Sync with Backend to create Firestore `users/{uid}` document
    // We pass username in the body as fallback if displayName isn't updated quickly enough
    const response = await apiClient.post("/auth/register", {
      username: userData.name || userData.email.split("@")[0],
    });

    const token = await user.getIdToken();

    return {
      success: true,
      token,
      user: response.data || {
        id: user.uid,
        email: user.email,
        name: user.displayName || userData.name,
      },
    };
  }

  // Fallback if Firebase is not configured
  await mockDelay(1000);
  return {
    success: true,
    token: "mock.jwt.token",
    user: { id: "mock-id", email: userData.email, name: userData.name },
  };
};

export const loginUser = async (userData) => {
  if (isConfigured) {
    // 1. Authenticate with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const user = userCredential.user;

    // 2. Sync login with backend (verifies user exists in Firestore and updates Last Login if applicable)
    const response = await apiClient.post("/auth/login");
    const token = await user.getIdToken();

    return {
      success: true,
      token,
      user: response.data || {
        id: user.uid,
        email: user.email,
        name: user.displayName,
      },
    };
  }

  // Fallback if Firebase is not configured
  await mockDelay(1000);
  return {
    success: true,
    token: "mock.jwt.token",
    user: { id: "mock-id", email: userData.email, name: userData.email.split("@")[0] },
  };
};

export const logoutUser = async () => {
  if (isConfigured) {
    // 1. Notify Backend
    try {
      await apiClient.post("/auth/logout");
    } catch (e) {
      console.warn("Backend logout failed, continuing with client logout.");
    }
    // 2. Sign out locally
    await signOut(auth);
  } else {
    await mockDelay(500);
  }
};

export const resetPassword = async (email) => {
  if (isConfigured) {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  }
  await mockDelay(1000);
  return { success: true };
};

export const getCurrentUser = async () => {
  if (isConfigured) {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (e) {
      console.warn("Failed to fetch user profile from backend.", e);
      return null;
    }
  }
  await mockDelay(500);
  return { id: "mock-id", email: "mock@example.com", name: "Mock User", onboarding: { completed: false } };
};

export const completeOnboarding = async (preferences) => {
  if (isConfigured) {
    try {
      const response = await apiClient.post("/auth/onboarding", preferences);
      return { success: true, user: response.data };
    } catch (e) {
      console.error("Failed to complete onboarding", e);
      return { success: false, message: e.response?.data?.message || e.message };
    }
  }
  await mockDelay(500);
  return { success: true, user: { onboarding: { completed: true } } };
};