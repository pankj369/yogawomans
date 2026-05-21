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
      className="group flex w-full items-start gap-3 rounded-2xl p-3 text-left transition hover:bg-wellness-cream"
    >
      <span
        className={[
          "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full transition",
          notification.unread ? "bg-wellness-orange" : "bg-wellness-sage/40",
        ].join(" ")}
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-wellness-dark group-hover:text-wellness-green">
          {notification.title}
        </p>
        <p className="mt-0.5 text-xs text-wellness-muted">{notification.time}</p>
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
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/50 bg-white/65 text-wellness-dark shadow-liftSm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-card"
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
              className="absolute right-2 top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-wellness-orange text-[0.5rem] font-bold text-white border-2 border-white"
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
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 rounded-3xl border border-white/60 bg-white/96 p-4 shadow-heroCard backdrop-blur-2xl"
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-label">Notifications</p>
              {unreadCount > 0 && (
                <span className="rounded-full bg-wellness-orange/10 px-2.5 py-0.5 text-xs font-bold text-wellness-orange">
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
                <p className="py-4 text-center text-sm text-wellness-muted">
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
