import apiClient from "./apiClient";

export const saveProgress = async (mediaId, progressSeconds) => {
  return await apiClient.post("/progress", { mediaId, progressSeconds });
};

export const getProgress = async (limit = 10) => {
  return await apiClient.get(`/progress?limit=${limit}`);
};
