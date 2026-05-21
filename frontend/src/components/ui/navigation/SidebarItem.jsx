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
            "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300",
            isActive
              ? "bg-white/80 shadow-liftSm text-wellness-dark"
              : "text-wellness-muted hover:text-wellness-dark hover:bg-white/50",
          ].join(" ")
        }
      >
        {({ isActive }) => (
          <>
            {/* Active left bar - subtle gold/green accent */}
            {isActive && (
              <motion.span
                layoutId="sidebar-active-bar"
                className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[#A37E58] to-[#2D6338]"
              />
            )}

            {/* Icon container */}
            <span
              className={[
                "flex h-9 w-9 flex-shrink-0 items-center justify-center transition-all duration-300",
                isActive
                  ? "rounded-xl bg-wellness-orange/10 text-wellness-orange"
                  : "rounded-xl bg-transparent text-wellness-muted group-hover:bg-white group-hover:text-wellness-dark group-hover:shadow-liftSm group-hover:-translate-y-0.5",
              ].join(" ")}
            >
              <Icon className="text-[1.1rem] transition-transform duration-300 group-hover:scale-110" />
            </span>

            <span className="truncate">{item.label}</span>

            {/* Hover glow dot */}
            {!isActive && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-wellness-orange opacity-0 transition-opacity group-hover:opacity-60" />
            )}
          </>
        )}
      </NavLink>
    </motion.li>
  );
}
