import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import CinematicLoader from "../components/ui/animations/CinematicLoader";

export default function ProtectedRoute({ requireProfileSetup = false }) {
  const { isAuthenticated, profileSetupComplete, profileSetupSkipped, isAuthReady } = useAuth();
  const location = useLocation();

  // 1. Wait until Auth Context confirms it has finished fetching Firebase & Backend data
  if (!isAuthReady) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]">
        <CinematicLoader indefinite={true} />
      </div>
    );
  }

  // 2. Auth is resolved, user is explicitly NOT authenticated
  if (!isAuthenticated) {
    // Avoid double redirect if we are somehow rendering this on the login route
    if (location.pathname === "/login") return <Outlet />;
    return <Navigate to="/login" replace state={{ returnTo: location.pathname + location.search }} />;
  }

  // 3. User is authenticated, but route requires profile setup
  if (requireProfileSetup && !profileSetupComplete && !profileSetupSkipped) {
    // Defensive check to avoid navigating to a route we are already on
    if (location.pathname === "/profile-setup") return <Outlet />;
    return <Navigate to="/profile-setup" replace />;
  }

  // 4. All checks passed safely
  return <Outlet />;
}
