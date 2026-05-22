import axios from "axios";
import { auth } from "../config/firebase";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Firebase ID Token
apiClient.interceptors.request.use(
  async (config) => {
    // Attempt to get the current Firebase user's ID token safely
    const user = auth?.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error fetching Firebase ID token:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global Errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Standardize response format (since our backend wraps with { success, data })
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized! Token may be expired.");
      // Optional: Trigger a custom event to force global logout from AuthContext if desired
    }
    return Promise.reject(error);
  }
);

export default apiClient;
