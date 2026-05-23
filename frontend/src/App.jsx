import React from "react";
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
                    <div className="overflow-x-hidden">
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
