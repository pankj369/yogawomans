import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VideoPreviewCard from "./VideoPreviewCard";

export default function YogaCategoryRow({ videos, onVideoClick, hasProPlan }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/row">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-wellness-glass border border-wellness-border text-white shadow-glass backdrop-blur-md transition-all hover:scale-110 hover:bg-white/10 hover:border-wellness-glow/20 md:group-hover/row:flex"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>

      {/* Scrolling Container */}
      <div 
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-2 px-1 -mx-1"
      >
        {videos.map((video) => (
          <div key={video.id} className="w-[300px] flex-shrink-0">
            <VideoPreviewCard
              video={video}
              isLocked={video.premium && !hasProPlan}
              onClick={onVideoClick}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-wellness-glass border border-wellness-border text-white shadow-glass backdrop-blur-md transition-all hover:scale-110 hover:bg-white/10 hover:border-wellness-glow/20 md:group-hover/row:flex"
      >
        <ChevronRight size={24} className="text-white" />
      </button>
    </div>
  );
}
