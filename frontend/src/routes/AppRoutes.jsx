import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "../utils/animations";
import Skeleton from "../components/ui/loaders/Skeleton";
import ProtectedRoute from "./ProtectedRoute";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const ProfileSetup = lazy(() => import("../pages/ProfileSetup"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const PricingPage = lazy(() => import("../pages/PricingPage"));
const Shop = lazy(() => import("../pages/Shop"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const PhysicalHealth = lazy(() => import("../pages/PhysicalHealth"));
const MentalHealth = lazy(() => import("../pages/MentalHealth"));
const GeneratedPlan = lazy(() => import("../pages/GeneratedPlan"));
const SessionPlayer = lazy(() => import("../pages/SessionPlayer"));

function AppRouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-wellness-bg">
      <div className="flex flex-col items-center gap-6">
        <Skeleton variant="circular" className="h-20 w-20 bg-wellness-orange/10" />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-bold uppercase tracking-widest text-wellness-muted"
        >
          Loading YogaWomans...
        </motion.p>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/auth" element={<Navigate to="/signup" replace />} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/pricing" element={<PageWrapper><PricingPage /></PageWrapper>} />
        <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
        <Route path="/shop/:slug" element={<PageWrapper><ProductDetail /></PageWrapper>} />
        <Route path="/generated-plan" element={<PageWrapper><GeneratedPlan /></PageWrapper>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/session/:planId" element={<PageWrapper><SessionPlayer /></PageWrapper>} />
          <Route path="/profile-setup" element={<PageWrapper><ProfileSetup /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
          <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />
          <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
        </Route>

        <Route element={<ProtectedRoute requireProfileSetup />}>
          <Route path="/physicalHealth" element={<PageWrapper><PhysicalHealth /></PageWrapper>} />
          <Route path="/mentalHealth" element={<PageWrapper><MentalHealth /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/dashboard/:section" element={<PageWrapper><Dashboard /></PageWrapper>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export { AppRouteLoader };
