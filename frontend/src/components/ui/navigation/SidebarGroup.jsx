import { motion } from "framer-motion";
import SidebarItem from "./SidebarItem";

const itemStagger = {
  open:   { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
  closed: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
};

export default function SidebarGroup({ group, items, onClose }) {
  return (
    <div className="mb-4">
      <p className="mb-2 px-4 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#8C847A]">
        {group}
      </p>
      <motion.ul variants={itemStagger} className="space-y-1.5">
        {items.map((item) => (
          <SidebarItem key={item.path} item={item} onClose={onClose} />
        ))}
      </motion.ul>
    </div>
  );
}
