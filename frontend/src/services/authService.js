import apiClient, { setAuthToken, removeAuthToken } from "./apiClient";

// Signup - create new user account
export const signupUser = async (userData) => {
  const response = await apiClient.post("/auth/signup", {
    email: userData.email,
    password: userData.password,
  });

  const { token, user, success } = response.data;

  if (success && token) {
    setAuthToken(token);
  }

  return response.data;
};

// Login - authenticate user
export const loginUser = async (userData) => {
  const response = await apiClient.post("/auth/login", {
    email: userData.email,
    password: userData.password,
  });

  const { token, user, success } = response.data;

  if (success && token) {
    setAuthToken(token);
  }

  return response.data;
};

// Logout - clear auth state
export const logoutUser = async () => {
  try {
    // Try to call logout endpoint if it exists
    await apiClient.post("/auth/logout");
  } catch (error) {
    // Continue with local logout even if API fails
    console.log("Logout API not available, proceeding with local logout");
  } finally {
    removeAuthToken();
  }
};

// Get current user profile
export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

// Check if user is authenticated
export const checkAuth = async () => {
  try {
    const response = await apiClient.get("/auth/verify");
    return { authenticated: true, user: response.data.user };
  } catch (error) {
    removeAuthToken();
    return { authenticated: false, user: null };
  }
};