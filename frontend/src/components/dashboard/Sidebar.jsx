import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, TrendingUp, Sparkles } from "lucide-react";
import { dashboardMenuGroups } from "../../data/wellnessData";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import SidebarGroup from "../ui/navigation/SidebarGroup";
import fotlogo from "../../assets/images/fotlogo.png";

// ─── Animation Variants ────────────────────────────────────────────────────
const sidebarVariants = {
  open:   { x: 0,      opacity: 1,    transition: { type: "spring", stiffness: 280, damping: 30 } },
  closed: { x: "-100%", opacity: 0.95, transition: { type: "spring", stiffness: 300, damping: 35 } },
};

// ─── Sidebar Panel ─────────────────────────────────────────────────────────
function SidebarPanel({ onClose, isMobile = false }) {
  const auth = useAuth();
  const { state } = useDashboard();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };

  const wellnessScore = state?.wellnessScore ?? 84;
  const streakDays = state?.streakDays ?? 6;
  const userInitials = auth.user?.name?.charAt(0).toUpperCase() || auth.user?.displayName?.charAt(0).toUpperCase() || "Y";
  const userPhoto = auth.user?.photoURL || auth.user?.image || null;

  return (
    <aside className={`flex h-full flex-col px-6 py-6 transition-all duration-300
      ${isMobile 
        ? "w-full border-0 bg-[rgba(5,8,22,0.96)] backdrop-blur-[28px] overflow-y-auto no-scrollbar" 
        : "rounded-[2.5rem] border border-wellness-border bg-[rgba(10,15,25,0.68)] backdrop-blur-[20px] shadow-glass w-[245px]"
      }`}
    >
      {/* ── Logo ── */}
      <div className="mb-8 flex items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-3">
          <img
            src={fotlogo}
            alt="YogaWoman Logo"
            className="h-10 w-auto object-contain brightness-0 invert opacity-90"
          />
        </div>

        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition hover:bg-white/10 hover:scale-105"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-1">
        {dashboardMenuGroups.map(({ group, items }) => (
          <SidebarGroup key={group} group={group} items={items} onClose={onClose} />
        ))}
      </nav>

      {/* ── Quick Action: Resume Journey (Temporarily hidden) ── */}
      {/* 
      {state?.lastSessionId && (
        <button
          onClick={() => {
            onClose();
            navigate("/dashboard");
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-3.5 text-sm font-bold text-white shadow-liftSm border border-white/10 transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-card hover:border-white/30"
        >
          <Play fill="currentColor" size={14} className="text-wellness-glow" /> Resume Journey
        </button>
      )}
      */}

      {/* ── Wellness Stats Card ── */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-wellness-glass p-4 shadow-liftSm backdrop-blur-[24px] transition duration-300 hover:-translate-y-1 hover:shadow-card hover:bg-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-label text-[0.6rem] text-wellness-glow">Today</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-heading text-2xl font-bold text-white">
                {wellnessScore}
              </span>
              <span className="text-xs font-semibold text-white/50">/100</span>
            </div>
            <p className="mt-0.5 text-[0.7rem] font-medium text-white/70">Wellness index</p>
          </div>

          {/* Progress ring */}
          <div className="relative h-14 w-14">
            <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90 filter drop-shadow-sm">
              <circle cx="28" cy="28" r="22" stroke="rgba(255,255,255,0.1)" strokeWidth="5" fill="none" />
              <motion.circle
                cx="28" cy="28" r="22"
                stroke="url(#sidebarRingGrad)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 22}
                initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - wellnessScore / 100) }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
              />
              <defs>
                <linearGradient id="sidebarRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#00E676" />
                  <stop offset="100%" stopColor="#1E7A46" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[0.65rem] font-bold text-white">
              {wellnessScore}%
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-wellness-glow">
          <TrendingUp className="text-sm" />
          <p className="text-xs font-bold text-white">
            {streakDays}-day streak <span className="text-wellness-orange">🔥</span>
          </p>
        </div>
      </div>

      {/* ── Bottom Section ── */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-wellness-glass font-bold text-wellness-glow border border-white/10 overflow-hidden">
            {userPhoto ? (
              <img src={userPhoto} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              userInitials
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white">
              {auth.user?.displayName || "Yogi"}
            </p>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-white/60">
              <TrendingUp size={12} className="text-wellness-glow" /> {streakDays} day streak
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              title="Log out"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-red-500/20 hover:text-red-400"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Exported Component ────────────────────────────────────────────────────
export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop — fixed & floating */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-4 lg:py-4 lg:z-40 lg:block">
        <SidebarPanel onClose={() => {}} isMobile={false} />
      </div>

      {/* Mobile — animated drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[9995] bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="sidebar-drawer"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-[10000] lg:hidden w-full h-full"
            >
              <SidebarPanel onClose={onClose} isMobile={true} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
