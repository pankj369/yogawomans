import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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

function AppRouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7ead7]">
      <div className="rounded-[2rem] bg-white px-6 py-4 text-sm font-semibold text-[#2c251d] shadow-[0_20px_60px_rgba(72,42,8,0.1)]">
        Loading YogaWomans...
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Navigate to="/signup" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:slug" element={<ProductDetail />} />


      <Route element={<ProtectedRoute />}>
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      <Route element={<ProtectedRoute requireProfileSetup />}>
        <Route path="/physicalHealth" element={<PhysicalHealth />} />
        <Route path="/mentalHealth" element={<MentalHealth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:section" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export { AppRouteLoader };
