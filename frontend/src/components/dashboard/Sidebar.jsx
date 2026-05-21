import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, TrendingUp } from "lucide-react";
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

  return (
    <aside className="glass-sidebar flex h-full w-[268px] flex-col px-4 py-5 shadow-sidebar">
      {/* ── Logo ── */}
      <div className="mb-8 flex items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-3">
          <img
            src={fotlogo}
            alt="YogaWomans Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/60 text-[#736B63] transition hover:bg-white hover:text-wellness-dark"
          >
            <X className="text-lg" />
          </button>
        )}
      </div>

      {/* ── Navigation Groups ── */}
      <nav className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-1">
        {dashboardMenuGroups.map(({ group, items }) => (
          <SidebarGroup key={group} group={group} items={items} onClose={onClose} />
        ))}
      </nav>

      {/* ── Wellness Stats Card ── */}
      <div className="mt-5 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-liftSm backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:shadow-card hover:bg-white/95">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-label text-[0.6rem]">Today</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-heading text-2xl font-bold text-wellness-dark">
                {wellnessScore}
              </span>
              <span className="text-xs font-semibold text-wellness-muted">/100</span>
            </div>
            <p className="mt-0.5 text-[0.7rem] font-medium text-wellness-muted">Wellness index</p>
          </div>

          {/* Progress ring */}
          <div className="relative h-14 w-14">
            <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90 filter drop-shadow-sm">
              <circle cx="28" cy="28" r="22" stroke="rgba(210,190,165,0.2)" strokeWidth="5" fill="none" />
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
                  <stop offset="0%"   stopColor="#E27229" />
                  <stop offset="100%" stopColor="#EC9558" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[0.65rem] font-bold text-wellness-dark">
              {wellnessScore}%
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-wellness-orange/5 px-3 py-2 text-wellness-orange">
          <TrendingUp className="text-sm" />
          <p className="text-xs font-bold">
            {streakDays}-day streak 🔥
          </p>
        </div>
      </div>

      {/* ── Logout ── */}
      <button
        type="button"
        onClick={handleLogout}
        className="group mt-4 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#736B63] transition-all duration-200 hover:text-red-600 hover:bg-red-50/40"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-[#736B63] group-hover:bg-white group-hover:text-red-600 group-hover:shadow-sm transition-all duration-200">
          <LogOut className="text-[1.1rem]" />
        </span>
        Logout
      </button>
    </aside>
  );
}

// ─── Exported Component ────────────────────────────────────────────────────
export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop — fixed */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block">
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
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
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
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <SidebarPanel onClose={onClose} isMobile={true} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
