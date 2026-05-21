import apiClient from "./apiClient";

export const sessionService = {
  listSessions(params) {
    return apiClient.get("/sessions", { params });
  },
  getSession(id) {
    return apiClient.get(`/sessions/${id}`);
  },
  createSession(payload) {
    return apiClient.post("/sessions", payload);
  },
  markComplete(id) {
    return apiClient.post(`/sessions/${id}/complete`);
  },
};
