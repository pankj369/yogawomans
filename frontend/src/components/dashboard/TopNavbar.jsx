import { useMemo, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Award, Flame, Play } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";
import { useMood } from "../../context/MoodContext";
import SearchBar from "../ui/navigation/SearchBar";
import NotificationButton from "../ui/navigation/NotificationButton";
import ProfileDropdown from "../ui/navigation/ProfileDropdown";
import PremiumButton from "../ui/buttons/PremiumButton";
import fotlogo from "../../assets/images/fotlogo.png";

export default function TopNavbar({ onMenuClick, query, onQueryChange, title, isScrolled }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const { notifications, markNotificationRead, state, isReturningUser } = useDashboard();
  const { activeTheme, setShowCheckInModal } = useMood();
  
  const [activePanel, setActivePanel] = useState(null);
  const panelRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const panelNotifications = useMemo(() => notifications.slice(0, 5), [notifications]);

  const userInitials = auth.user?.name?.slice(0, 2).toUpperCase() || "YW";
  const userName = auth.user?.name || "Member";
  const userEmail = auth.user?.email || "";
  const isPro = state?.activePlan === "Pro";
  const streakDays = state?.streakDays || 0;

  const dynamicGreeting = useMemo(() => {
    const hour = new Date().getHours();
    const firstName = userName.split(" ")[0] || "Yogi";
    
    if (isReturningUser && hour >= 5 && hour < 10) return `Welcome back, ${firstName} 🌅`;
    if (hour >= 5 && hour < 12) return `Good morning, ${firstName} 🌅`;
    if (hour >= 12 && hour < 17) return `Good afternoon, ${firstName} ☀️`;
    if (hour >= 17 && hour < 22) return `Good evening, ${firstName} 🌙`;
    return `Time to wind down, ${firstName} 🌌`;
  }, [userName, isReturningUser]);

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

  const headerStyles = isScrolled
    ? {
        background: "rgba(5,8,22,0.85)",
        backdropFilter: "blur(32px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
      }
    : {
        background: "rgba(5,8,22,0.58)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      };

  return (
    <header 
      style={headerStyles}
      className="sticky top-0 z-30 transition-all duration-300 w-full"
    >
      <div className="w-full" ref={panelRef}>
        
        {/* ── Desktop Header (visible only on lg viewports and up) ── */}
        <div className="hidden lg:flex items-center justify-between gap-6 px-8 py-4 w-full">
          {/* LEFT: Logo & Glow */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative group flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/dashboard")}>
              <div className="absolute inset-0 bg-[#00E676]/10 blur-md rounded-full scale-110 opacity-70 group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />
              <img
                src={fotlogo}
                alt="YogaWoman Logo"
                className="relative h-9 w-auto object-contain brightness-0 invert opacity-90 transition-transform duration-500 group-hover:scale-105"
              />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                YogaWoman
              </span>
            </div>
            {streakDays > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-wellness-orange/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-wellness-orange border border-wellness-orange/20 animate-pulse">
                <Flame size={10} /> {streakDays} Day Streak
              </span>
            )}
            <button
              onClick={() => setShowCheckInModal(true)}
              className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white/95 transition-all shadow-liftSm"
              style={{ borderColor: "var(--adaptive-glow-color)" }}
            >
              <span className="text-[12px]">{activeTheme.emoji}</span>
              <span>{activeTheme.name} Vibe</span>
            </button>
          </div>

          {/* CENTER: Floating Search Bar */}
          <div className="flex-1 max-w-md">
            <SearchBar query={query} onQueryChange={onQueryChange} />
          </div>

          {/* RIGHT: Upgrade button + Notifications + Profile */}
          <div className="flex items-center gap-4 shrink-0">
            {!isPro && (
              <PremiumButton
                variant="upgrade"
                icon={Award}
                onClick={() => navigate("/pricing")}
                className="!px-5 !py-2.5 !text-xs !gap-1.5"
              >
                Upgrade
              </PremiumButton>
            )}

            <NotificationButton
              notifications={panelNotifications}
              unreadCount={unreadCount}
              isOpen={activePanel === "notifications"}
              onToggle={() => togglePanel("notifications")}
              onRead={markNotificationRead}
            />

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

        {/* ── Mobile/Tablet Header (visible on viewports below lg) ── */}
        <div className="flex w-full items-center justify-between gap-3 lg:hidden px-4 py-3.5">
          {/* LEFT: hamburger menu + logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onMenuClick}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-liftSm transition hover:bg-white/10"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            
            <img
              src={fotlogo}
              alt="YogaWoman Logo"
              className="h-8 w-auto object-contain brightness-0 invert opacity-90"
              onClick={() => navigate("/dashboard")}
            />
          </div>

          {/* CENTER: minimal page title */}
          <div className="flex-1 text-center px-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white/90 line-clamp-1">
              {title || dynamicGreeting}
            </span>
          </div>

          {/* RIGHT: notifications + profile avatar */}
          <div className="flex items-center gap-2 shrink-0 relative">
            <button
              onClick={() => setShowCheckInModal(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base transition-all"
              style={{ borderColor: "var(--adaptive-glow-color)" }}
              title="Change vibe"
            >
              {activeTheme.emoji}
            </button>
            
            <NotificationButton
              notifications={panelNotifications}
              unreadCount={unreadCount}
              isOpen={activePanel === "notifications"}
              onToggle={() => togglePanel("notifications")}
              onRead={markNotificationRead}
            />
            
            <button
              onClick={() => togglePanel("profile")}
              className="relative h-9 w-9 rounded-full border border-wellness-border bg-white/5 flex items-center justify-center text-xs font-bold text-white shadow-glass transition hover:bg-white/10"
            >
              {userInitials}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-wellness-glow border-2 border-wellness-bg"></span>
            </button>

            {/* Profile dropdown relative container positioning for mobile */}
            <div className="absolute right-0 top-[calc(100%+8px)] z-50">
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
        </div>

      </div>
    </header>
  );
}
