import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { DashboardProvider } from "./context/DashboardContext";
import { ToastProvider } from "./context/ToastContext";
import { MediaProvider } from "./context/MediaContext";
import AppRoutes, { AppRouteLoader } from "./routes/AppRoutes";
import { Suspense } from "react";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import CinematicLoader from "./components/ui/animations/CinematicLoader";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  // Optional: Only show loader once per session
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedCinematic");
    if (hasLoaded) {
      setShowLoader(false);
    } else {
      sessionStorage.setItem("hasLoadedCinematic", "true");
    }
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <DashboardProvider>
              <ToastProvider>
                <MediaProvider>
                  <Suspense fallback={<AppRouteLoader />}>
                    <div className="overflow-x-hidden">
                      {showLoader && (
                        <CinematicLoader onComplete={() => setShowLoader(false)} />
                      )}
                      <AppRoutes />
                    </div>
                  </Suspense>
                </MediaProvider>
              </ToastProvider>
            </DashboardProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
