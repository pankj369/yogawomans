import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile as updateFirebaseProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";
import apiClient from "./apiClient";

export const signupUser = async (userData) => {
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
};

export const loginUser = async (userData) => {
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
};

export const logoutUser = async () => {
  // 1. Notify Backend
  try {
    await apiClient.post("/auth/logout");
  } catch (e) {
    console.warn("Backend logout failed, continuing with client logout.", e);
  }
  // 2. Sign out locally
  await signOut(auth);
};

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
  return { success: true };
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get("/auth/me");
    return response.data;
  } catch (e) {
    console.warn("Failed to fetch user profile from backend.", e);
    return null;
  }
};

export const completeOnboarding = async (preferences) => {
  try {
    const response = await apiClient.post("/auth/onboarding", preferences);
    return { success: true, user: response.data };
  } catch (e) {
    console.error("Failed to complete onboarding", e);
    return { success: false, message: e.response?.data?.message || e.message };
  }
};