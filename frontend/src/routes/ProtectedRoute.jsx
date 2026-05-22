import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Skeleton from "../components/ui/loaders/Skeleton";

export default function ProtectedRoute({ requireProfileSetup = false }) {
  const { isAuthenticated, profileSetupComplete, profileSetupSkipped, isAuthReady } = useAuth();
  const location = useLocation();

  // 1. Wait until Auth Context confirms it has finished fetching Firebase & Backend data
  if (!isAuthReady) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDFBF7]">
        <div className="flex flex-col items-center gap-6">
          {/* Elegant premium spinner replacing the basic one */}
          <Skeleton variant="circular" className="h-20 w-20 bg-wellness-orange/10" />
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-sm font-bold uppercase tracking-widest text-wellness-muted"
          >
            Securing Session...
          </motion.p>
        </div>
      </div>
    );
  }

  // 2. Auth is resolved, user is explicitly NOT authenticated
  if (!isAuthenticated) {
    // Only redirect if we are not already on the login page (defensive)
    if (location.pathname === "/login") return null;
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3. User is authenticated, but route requires profile setup
  if (requireProfileSetup && !profileSetupComplete && !profileSetupSkipped) {
    if (location.pathname === "/profile-setup") return <Outlet />;
    return <Navigate to="/profile-setup" replace />;
  }

  // 4. All checks passed
  return <Outlet />;
}
