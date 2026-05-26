import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { scaleReveal } from "../../../utils/animations";

// Dropdown animation (customized for dropdowns)
const dropdownVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.14 } },
};

function NotificationItem({ notification, onRead }) {
  return (
    <button
      type="button"
      onClick={() => onRead(notification.id)}
      className="group flex w-full items-start gap-3 rounded-2xl p-3.5 text-left transition duration-300 hover:bg-white/10 hover:shadow-glass border border-transparent hover:border-white/5"
    >
      <span
        className={[
          "mt-2 h-2 w-2 flex-shrink-0 rounded-full transition-all duration-300 group-hover:scale-110",
          notification.unread ? "bg-wellness-orange shadow-[0_0_8px_#FF8A3D]" : "bg-wellness-muted/30",
        ].join(" ")}
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white group-hover:text-wellness-glow transition-colors duration-300">
          {notification.title}
        </p>
        <p className="mt-0.5 text-xs text-wellness-muted/80">{notification.time}</p>
      </div>
    </button>
  );
}

export default function NotificationButton({
  notifications = [],
  unreadCount = 0,
  isOpen,
  onToggle,
  onRead,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-wellness-border bg-white/5 text-white shadow-glass transition hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-cardHover"
        aria-label="Notifications"
      >
        <Bell size={19} />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              variants={scaleReveal}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute right-2 top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-wellness-orange text-[0.5rem] font-bold text-white border-2 border-wellness-bg shadow-sm"
            >
              <span className="sr-only">New alerts</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 rounded-[2rem] border border-wellness-border bg-wellness-glass p-5 shadow-glass backdrop-blur-[24px]"
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-label text-[0.65rem] text-wellness-gold">Notifications</p>
              {unreadCount > 0 && (
                <span className="rounded-full bg-wellness-orange/15 px-2.5 py-0.5 text-xs font-bold text-wellness-orange border border-wellness-orange/10">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto no-scrollbar">
              {notifications.length ? (
                notifications.map((n) => (
                  <NotificationItem key={n.id} notification={n} onRead={onRead} />
                ))
              ) : (
                <p className="py-6 text-center text-sm text-wellness-muted font-medium">
                  All caught up ✨
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
