import apiClient from "./apiClient";

export const getMyProfile = async () => {
  try {
    const response = await apiClient.get("/auth/me");
    return { profile: response.data };
  } catch (error) {
    console.error("Failed to fetch profile", error);
    return { profile: null };
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await apiClient.put("/profile/update", profileData);
    return { success: true, profile: response.data };
  } catch (error) {
    console.error("Failed to update profile", error);
    throw error;
  }
};

export const getAIWellnessProfile = async () => {
  try {
    const response = await apiClient.get("/profile/ai-wellness");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch AI Wellness Profile", error);
    return { success: false, data: null };
  }
};