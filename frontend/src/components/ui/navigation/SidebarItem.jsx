import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { itemFade } from "../../../utils/animations";

export default function SidebarItem({ item, onClose }) {
  const Icon = item.icon;

  return (
    <motion.li variants={itemFade}>
      <NavLink
        to={item.path}
        end={item.path === "/dashboard"}
        onClick={onClose}
        className={({ isActive }) =>
          [
            "group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300",
            isActive
              ? "bg-sidebar-item-active shadow-navitem text-wellness-glow"
              : "text-wellness-muted hover:text-white hover:bg-white/5",
          ].join(" ")
        }
      >
        {({ isActive }) => (
          <>
            {/* Active left bar - emerald glow accent */}
            {isActive && (
              <motion.span
                layoutId="sidebar-active-bar"
                className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-wellness-glow shadow-[0_0_10px_rgba(0,230,118,0.8)]"
              />
            )}

            {/* Icon container */}
            <span
              className={[
                "flex h-10 w-10 flex-shrink-0 items-center justify-center transition-all duration-300",
                isActive
                  ? "rounded-xl bg-wellness-glow/20 text-wellness-glow"
                  : "rounded-xl bg-transparent text-wellness-muted group-hover:bg-white/10 group-hover:text-white group-hover:-translate-y-0.5",
              ].join(" ")}
            >
              <Icon className="text-[1.2rem] transition-transform duration-300 group-hover:scale-110" />
            </span>

            <span className="truncate">{item.label}</span>

            {/* Hover glow dot */}
            {!isActive && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-wellness-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-[0_0_10px_rgba(0,230,118,0.5)]" />
            )}
          </>
        )}
      </NavLink>
    </motion.li>
  );
}
