import { useMemo, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Award } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import SearchBar from "../ui/navigation/SearchBar";
import NotificationButton from "../ui/navigation/NotificationButton";
import ProfileDropdown from "../ui/navigation/ProfileDropdown";
import PremiumButton from "../ui/buttons/PremiumButton";

export default function TopNavbar({ onMenuClick, query, onQueryChange, title }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const { notifications, markNotificationRead, state } = useDashboard();
  
  const [activePanel, setActivePanel] = useState(null);
  const panelRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const panelNotifications = useMemo(() => notifications.slice(0, 5), [notifications]);

  const userInitials = auth.user?.name?.slice(0, 2).toUpperCase() || "YW";
  const userName = auth.user?.name || "Member";
  const userEmail = auth.user?.email || "";
  const isPro = state?.activePlan === "Pro";

  const handleLogout = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setActivePanel(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const togglePanel = (name) =>
    setActivePanel((current) => (current === name ? null : name));

  return (
    <header className="glass-navbar sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8" ref={panelRef}>
        
        {/* ── Left — menu + title ── */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            id="navbar-menu-btn"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/55 bg-white/65 text-wellness-dark shadow-liftSm transition hover:-translate-y-0.5 hover:bg-white lg:hidden hover:shadow-card"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="hidden sm:block">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.32em] text-wellness-gold">
              YogaWomans
            </p>
            <p className="text-sm font-bold text-wellness-dark leading-tight mt-0.5">
              {title || "Today feels lighter already"}
            </p>
          </div>
        </div>

        {/* ── Center — Search ── */}
        <div className="hidden flex-1 max-w-sm md:flex transition-all duration-300">
          <SearchBar query={query} onQueryChange={onQueryChange} />
        </div>

        {/* ── Right — actions ── */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Upgrade badge */}
          {!isPro && (
            <div className="hidden sm:block">
              <PremiumButton
                variant="primary"
                icon={Award}
                onClick={() => navigate("/pricing")}
                className="!px-4 !py-2 !text-xs !gap-1.5"
              >
                Upgrade
              </PremiumButton>
            </div>
          )}

          {/* Notifications */}
          <NotificationButton
            notifications={panelNotifications}
            unreadCount={unreadCount}
            isOpen={activePanel === "notifications"}
            onToggle={() => togglePanel("notifications")}
            onRead={markNotificationRead}
          />

          {/* Profile dropdown */}
          <ProfileDropdown
            userInitials={userInitials}
            userName={userName}
            userEmail={userEmail}
            isOpen={activePanel === "profile"}
            onToggle={() => togglePanel("profile")}
            onLogout={handleLogout}
            onClose={() => setActivePanel(null)}
          />
          
        </div>
      </div>
    </header>
  );
}
