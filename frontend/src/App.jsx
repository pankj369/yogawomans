import React, { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
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
import ThemeTransitionOverlay from "./components/ui/animations/ThemeTransitionOverlay";

const getThemeForPath = (path) => {
  const lightPaths = ["/", "/pricing", "/generated-plan"];
  if (lightPaths.includes(path)) return "light";
  if (path.startsWith("/shop")) return "light";
  return "dark";
};

function MainAppContent() {
  const [showLoader, setShowLoader] = useState(true);
  const [transitionState, setTransitionState] = useState(null); // { direction: 'to-dark' | 'to-light' }
  const [prevTheme, setPrevTheme] = useState(null);
  
  const location = useLocation();
  const currentTheme = getThemeForPath(location.pathname);

  // Initial loader logic
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedCinematic");
    if (hasLoaded) {
      setShowLoader(false);
    } else {
      sessionStorage.setItem("hasLoadedCinematic", "true");
    }
  }, []);

  // Theme switch transition logic
  useEffect(() => {
    if (prevTheme && prevTheme !== currentTheme) {
      setTransitionState({
        direction: currentTheme === "dark" ? "to-dark" : "to-light"
      });
    }
    setPrevTheme(currentTheme);
  }, [currentTheme, prevTheme]);

  return (
    <div className="overflow-x-hidden">
      {showLoader && (
        <CinematicLoader onComplete={() => setShowLoader(false)} />
      )}
      {transitionState && (
        <ThemeTransitionOverlay 
          direction={transitionState.direction} 
          onComplete={() => setTransitionState(null)} 
        />
      )}
      <AppRoutes />
    </div>
  );
}

function App() {
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
                      <MainAppContent />
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
