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
        className="flex items-center gap-2.5 rounded-full border border-white/40 bg-white/50 pl-2 pr-3 py-1.5 shadow-liftSm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-card"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-wellness-orange/80 to-wellness-green text-xs font-bold text-white">
          {userInitials}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-wellness-gold">
            Welcome
          </span>
          <span className="block text-xs font-bold text-wellness-dark truncate max-w-[100px]">{userName}</span>
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
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 rounded-3xl border border-wellness-border bg-white/90 backdrop-blur-2xl p-4 shadow-glass"
          >
            {/* User header */}
            <div className="mb-3 flex items-center gap-3 rounded-2xl bg-wellness-cream px-3 py-3">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-wellness-orange/80 to-wellness-green text-sm font-bold text-white shadow-glow2">
                {userInitials}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-wellness-dark truncate">{userName}</p>
                <p className="text-xs text-wellness-muted truncate">{userEmail}</p>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-wellness-muted transition hover:bg-wellness-cream hover:text-wellness-dark"
              >
                <User size={16} />
                My Profile
              </Link>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-wellness-muted transition hover:bg-wellness-cream hover:text-wellness-dark"
              >
                <Heart size={16} />
                My Wishlist
              </Link>
              <Link
                to="/settings"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-wellness-muted transition hover:bg-wellness-cream hover:text-wellness-dark"
              >
                <Settings size={16} />
                Settings
              </Link>
              <div className="my-1 mx-3 h-px bg-wellness-softcream" />
              <button
                type="button"
                onClick={onLogout}
                className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold text-wellness-muted transition hover:bg-red-50 hover:text-red-600"
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
