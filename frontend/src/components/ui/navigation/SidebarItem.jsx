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
            "group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-500",
            isActive
              ? "bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-[#11281d]"
              : "text-[#8FA68E] hover:text-[#E27229] hover:bg-white/50",
          ].join(" ")
        }
      >
        {({ isActive }) => (
          <>
            {/* Active left bar - subtle gold/green accent */}
            {isActive && (
              <motion.span
                layoutId="sidebar-active-bar"
                className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#E27229]"
              />
            )}

            {/* Icon container */}
            <span
              className={[
                "flex h-10 w-10 flex-shrink-0 items-center justify-center transition-all duration-500",
                isActive
                  ? "rounded-xl bg-[#E27229]/10 text-[#E27229]"
                  : "rounded-xl bg-transparent text-[#8FA68E] group-hover:bg-[#EFE7DC]/50 group-hover:text-[#E27229] group-hover:shadow-sm group-hover:-translate-y-0.5",
              ].join(" ")}
            >
              <Icon className="text-[1.2rem] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
            </span>

            <span className="truncate">{item.label}</span>

            {/* Hover glow dot */}
            {!isActive && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#E27229] opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[0_0_10px_rgba(226,114,41,0.5)]" />
            )}
          </>
        )}
      </NavLink>
    </motion.li>
  );
}
