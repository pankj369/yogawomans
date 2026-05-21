import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PremiumGate({ children, fallbackRoute = "/pricing" }) {
  const { isPremium, isAuthenticated } = useAuth();

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative group overflow-hidden rounded-[1.5rem]">
      {/* Blurred background content */}
      <div className="blur-md opacity-60 pointer-events-none select-none transition duration-500 group-hover:blur-lg">
        {children}
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-wellness-bg/90 to-transparent p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 p-6 shadow-xl"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-wellness-orange/20 text-wellness-orange">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-heading font-bold text-wellness-text">
            Premium Content
          </h3>
          <p className="mb-5 text-sm text-wellness-muted">
            Unlock exclusive classes, guided meditations, and personalized plans.
          </p>
          <Link
            to={fallbackRoute}
            className="rounded-full bg-wellness-success px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            Upgrade to Premium
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
