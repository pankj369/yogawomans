import { motion } from "framer-motion";
import { Filter, SlidersHorizontal } from "lucide-react";

export default function FilterBar({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 shadow-sm text-wellness-muted flex-shrink-0">
          <Filter size={14} />
        </div>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 shadow-sm ${
              activeFilter === filter
                ? "bg-wellness-green text-white shadow-md shadow-wellness-green/20"
                : "bg-white/70 text-wellness-muted hover:bg-white hover:text-wellness-dark"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <button className="hidden sm:flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-2 text-xs font-semibold text-wellness-dark transition hover:bg-white shadow-sm flex-shrink-0">
        <SlidersHorizontal size={14} />
        More Filters
      </button>
    </div>
  );
}
