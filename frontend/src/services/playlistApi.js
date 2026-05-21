import apiClient from "./apiClient";

export const savePlaylist = async (playlistId) => {
  return await apiClient.post("/playlists/save", { playlistId });
};

export const unsavePlaylist = async (playlistId) => {
  return await apiClient.delete(`/playlists/save/${playlistId}`);
};

export const getSavedPlaylists = async () => {
  return await apiClient.get("/playlists/saved");
};
