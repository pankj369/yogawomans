import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ requireProfileSetup = false }) {
  const auth = useAuth();
  const { isAuthenticated, profileSetupComplete, profileSetupSkipped, isAuthReady } = auth;
  const location = useLocation();

  // Wait for auth initialization (Firebase + Backend sync) before making redirect decisions.
  if (isAuthReady === false) {
    // Return a seamless loading state or null
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

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
