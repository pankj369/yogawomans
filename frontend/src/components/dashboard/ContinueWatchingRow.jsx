import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ContinueWatchingCard from "../ui/cards/ContinueWatchingCard";

export default function ContinueWatchingRow({ items }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-card backdrop-blur-md transition-all hover:bg-white hover:scale-110 md:group-hover:flex"
      >
        <ChevronLeft size={24} className="text-wellness-dark" />
      </button>

      {/* Scrolling Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-2 px-1 -mx-1"
      >
        {items.map((item) => (
          <ContinueWatchingCard 
            key={item.id} 
            item={item} 
          />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-card backdrop-blur-md transition-all hover:bg-white hover:scale-110 md:group-hover:flex"
      >
        <ChevronRight size={24} className="text-wellness-dark" />
      </button>
    </div>
  );
}
