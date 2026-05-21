import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ requireProfileSetup = false }) {
  const auth = useAuth();
  const { isAuthenticated, profileSetupComplete, profileSetupSkipped, isAuthReady } = auth;
  const location = useLocation();

  // Wait for auth initialization (storage/profile load) before making redirect decisions.
  if (isAuthReady === false) return null;

  if (!isAuthenticated) {
    if (location.pathname === "/login") return null;
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireProfileSetup && !profileSetupComplete && !profileSetupSkipped) {
    if (location.pathname === "/profile-setup") return <Outlet />;
    return <Navigate to="/profile-setup" replace />;
  }

  return <Outlet />;
}
