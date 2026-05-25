import apiClient from "./apiClient";

export const saveMedia = async (mediaId) => {
  return await apiClient.post("/media/save", { mediaId });
};

export const unsaveMedia = async (mediaId) => {
  return await apiClient.delete(`/media/save/${mediaId}`);
};

export const getSavedMedia = async () => {
  return await apiClient.get("/media/saved");
};
