import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { DashboardProvider } from "./context/DashboardContext";
import { ToastProvider } from "./context/ToastContext";
import { MediaProvider } from "./context/MediaContext";
import { PlanProvider } from "./context/PlanContext";
import AppRoutes, { AppRouteLoader } from "./routes/AppRoutes";
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <DashboardProvider>
              <ToastProvider>
                <MediaProvider>
                  <PlanProvider>
                    <Suspense fallback={<AppRouteLoader />}>
                      <div className="overflow-x-hidden">
                        <AppRoutes />
                      </div>
                    </Suspense>
                  </PlanProvider>
                </MediaProvider>
              </ToastProvider>
            </DashboardProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
