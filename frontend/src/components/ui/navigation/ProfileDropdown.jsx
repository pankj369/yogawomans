import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, User, Settings, LogOut, Heart } from "lucide-react";

const dropdownVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.14 } },
};

export default function ProfileDropdown({
  userInitials,
  userName,
  userEmail,
  isOpen,
  onToggle,
  onLogout,
  onClose,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2.5 rounded-full border border-wellness-border bg-white/5 pl-2 pr-3 py-1.5 shadow-glass backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-wellness-glow/20 hover:shadow-[0_0_15px_rgba(0,230,118,0.15)]"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-wellness-orange/80 to-wellness-green text-xs font-bold text-white">
          {userInitials}
          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#00E676] border border-wellness-bg shadow-[0_0_6px_#00E676]" />
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-wellness-gold">
            Welcome
          </span>
          <span className="block text-xs font-bold text-white truncate max-w-[100px]">{userName}</span>
        </span>
        <ChevronDown
          size={14}
          className={[
            "hidden text-wellness-muted transition-transform duration-200 sm:block",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 rounded-[2rem] border border-wellness-border bg-wellness-glass backdrop-blur-[24px] p-5 shadow-glass"
          >
            {/* User header */}
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3 border border-white/5">
              <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-wellness-orange to-wellness-glow text-sm font-bold text-white shadow-glow2">
                {userInitials}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#00E676] border-2 border-wellness-bg shadow-[0_0_6px_#00E676]" />
              </span>
              <div className="min-w-0">
                <p className="font-bold text-white truncate text-sm">{userName}</p>
                <p className="text-xs text-wellness-muted truncate mt-0.5">{userEmail}</p>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-wellness-muted transition duration-300 hover:bg-white/10 hover:text-white"
              >
                <User size={16} />
                My Profile
              </Link>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-wellness-muted transition duration-300 hover:bg-white/10 hover:text-white"
              >
                <Heart size={16} />
                My Wishlist
              </Link>
              <Link
                to="/settings"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-wellness-muted transition duration-300 hover:bg-white/10 hover:text-white"
              >
                <Settings size={16} />
                Settings
              </Link>
              <div className="my-2 mx-2 h-px bg-white/10" />
              <button
                type="button"
                onClick={onLogout}
                className="group flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left text-sm font-semibold text-wellness-muted transition duration-300 hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut size={16} className="transition-colors group-hover:text-red-500" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
