import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, History, Sparkles } from "lucide-react";

const SUGGESTIONS = ["Morning Flow", "Deep Sleep", "Anxiety Relief", "Core Strength", "Beginner Yoga"];
const RECENT_SEARCHES_KEY = "yogawomans_recent_searches";

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
    <div
      ref={containerRef}
      className={[
        "relative flex w-full items-center gap-3 rounded-full border px-4 py-2.5 transition-all duration-200 z-50",
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
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearchSubmit(query);
        }}
        onFocus={() => setSearchFocused(true)}
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
            onClick={() => {
              onQueryChange?.("");
              setSearchFocused(true);
            }}
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-wellness-softcream text-wellness-muted hover:bg-wellness-cream hover:text-wellness-dark"
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
            className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-[1.5rem] border border-white/50 bg-white/90 p-4 shadow-glass backdrop-blur-xl"
          >
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-wellness-muted">
                    <History size={12} /> Recent
                  </p>
                  <button
                    onClick={clearRecentSearches}
                    className="text-[0.65rem] font-bold text-wellness-muted hover:text-wellness-dark"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearchSubmit(term)}
                      className="rounded-full border border-wellness-softcream bg-white px-3 py-1.5 text-xs font-semibold text-wellness-dark shadow-sm transition hover:border-wellness-green hover:bg-wellness-greenLight"
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
                    className="rounded-full border border-wellness-softcream bg-wellness-cream px-3 py-1.5 text-xs font-semibold text-wellness-dark transition hover:bg-wellness-orange hover:text-white"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
