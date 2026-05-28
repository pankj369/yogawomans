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
  async (error) => {
    const originalRequest = error.config;
    
    // Prevent infinite loops by checking _retry flag
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/login') {
      originalRequest._retry = true;
      try {
        const user = auth?.currentUser;
        if (user) {
          // Force refresh the Firebase token
          const token = await user.getIdToken(true);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          // Retry the original request
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.warn("⚠️ Token refresh failed, initiating logout.", refreshError);
        window.dispatchEvent(new CustomEvent("auth:logout"));
        return Promise.reject(refreshError);
      }
      
      console.warn("⚠️ Unauthorized! Token expired and no user session.");
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }

    // Extract standardized error message from our backend format
    if (error.response && error.response.data && error.response.data.message) {
      error.message = error.response.data.message;
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
