import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, History, Sparkles } from "lucide-react";

const SUGGESTIONS = ["Morning Flow", "Deep Sleep", "Anxiety Relief", "Core Strength", "Beginner Yoga"];
const RECENT_SEARCHES_KEY = "yogawoman_recent_searches";

export default function SearchBar({ query, onQueryChange }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (searchQuery) => {
    if (!searchQuery.trim()) return;
    onQueryChange?.(searchQuery);
    
    setRecentSearches((prev) => {
      const filtered = prev.filter(q => q.toLowerCase() !== searchQuery.toLowerCase());
      const updated = [searchQuery, ...filtered].slice(0, 5);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
    setSearchFocused(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  return (
    <motion.div
      ref={containerRef}
      animate={{
        scale: searchFocused ? 1.025 : 1,
        boxShadow: searchFocused
          ? "0 0 25px rgba(0, 230, 118, 0.22), inset 0 0 10px rgba(255,255,255,0.05)"
          : "0 4px 20px rgba(0, 0, 0, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
      }}
      className={[
        "relative flex w-full items-center gap-3 rounded-full border px-4 py-2.5 transition-all duration-300 z-50",
        searchFocused
          ? "border-wellness-glow/70"
          : "border-wellness-border",
      ].join(" ")}
    >
      <Search className="flex-shrink-0 text-wellness-gold" size={18} />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearchSubmit(query);
        }}
        onFocus={() => setSearchFocused(true)}
        placeholder="Search sessions, instructors, music..."
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-wellness-muted/70 transition-all duration-300 focus:placeholder:translate-x-1"
      />
      <AnimatePresence>
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            type="button"
            onClick={() => {
              onQueryChange?.("");
              setSearchFocused(true);
            }}
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-wellness-muted hover:bg-white/20 hover:text-white"
          >
            <X size={12} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-[2rem] border border-wellness-border bg-wellness-glass p-6 shadow-glass backdrop-blur-[24px]"
          >
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-wellness-muted">
                    <History size={12} /> Recent
                  </p>
                  <button
                    onClick={clearRecentSearches}
                    className="text-[0.65rem] font-bold text-wellness-muted hover:text-white"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearchSubmit(term)}
                      className="rounded-full border border-wellness-border bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:border-wellness-glow hover:bg-wellness-glow/10"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-wellness-muted">
                <Sparkles size={12} /> Suggested
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearchSubmit(term)}
                    className="rounded-full border border-wellness-border bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-wellness-glow/10 hover:border-wellness-glow hover:text-wellness-glow"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
