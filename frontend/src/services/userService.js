import apiClient from "./apiClient";
import { isConfigured } from "../config/firebase";

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMyProfile = async () => {
  if (!isConfigured) {
    await mockDelay(500);
    return { profile: { full_name: "Mock User" } };
  }

  try {
    const response = await apiClient.get("/auth/me");
    return { profile: response.data };
  } catch (error) {
    console.error("Failed to fetch profile", error);
    return { profile: null };
  }
};

export const updateProfile = async (profileData) => {
  if (!isConfigured) {
    await mockDelay(500);
    return { success: true, profile: profileData };
  }

  try {
    // We mock the update since actual writes happen via /onboarding or specific feature endpoints
    console.warn("Direct updateProfile is deprecated. Use feature-specific API endpoints.");
    return { success: true, profile: profileData };
  } catch (error) {
    throw error;
  }
};