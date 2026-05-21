import apiClient from "./apiClient";

export const logWellnessSession = async (mediaId, type, durationMinutes) => {
  return await apiClient.post("/wellness/log", { 
    mediaId, 
    type, 
    duration: durationMinutes 
  });
};

export const getWellnessStats = async () => {
  return await apiClient.get("/wellness/stats");
};

export const getActivityHistory = async (limit = 20) => {
  return await apiClient.get(`/wellness/activity?limit=${limit}`);
};
