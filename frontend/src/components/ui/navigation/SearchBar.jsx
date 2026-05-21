import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

export default function SearchBar({ query, onQueryChange }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div
      className={[
        "flex w-full items-center gap-3 rounded-full border px-4 py-2.5 transition-all duration-200",
        searchFocused
          ? "border-wellness-green/50 bg-white shadow-liftSm"
          : "border-white/50 bg-white/65 shadow-[0_8px_20px_rgba(72,42,8,0.05)]",
      ].join(" ")}
    >
      <Search className="flex-shrink-0 text-wellness-gold" size={18} />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange?.(e.target.value)}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        placeholder="Search sessions, instructors, music..."
        className="w-full bg-transparent text-sm text-wellness-dark outline-none placeholder:text-wellness-muted"
      />
      <AnimatePresence>
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            type="button"
            onClick={() => onQueryChange?.("")}
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-wellness-softcream text-wellness-muted hover:bg-wellness-cream hover:text-wellness-dark"
          >
            <X size={12} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
