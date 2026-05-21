import axios from "axios";
import { readStorage } from "../utils/storage";

const AUTH_TOKEN_KEY = "yogawomans_auth_token";

// Get stored token
const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return readStorage(window.localStorage, AUTH_TOKEN_KEY, null) ||
         readStorage(window.sessionStorage, AUTH_TOKEN_KEY, null);
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized - token expired/invalid
      if (status === 401) {
        // Don't redirect on auth endpoints
        const isAuthEndpoint = error.config?.url?.includes('/auth/');
        if (!isAuthEndpoint) {
          // Trigger logout by dispatching event
          window.dispatchEvent(new CustomEvent('auth:logout', { detail: { reason: 'token_expired' }}));
        }
      }

      console.error("API Error:", data?.message || "Server error");
    } else if (error.request) {
      console.error("Network Error:", error.message);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Token management functions
export const setAuthToken = (token) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
};

export const removeAuthToken = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getAuthToken = getStoredToken;

export default apiClient;