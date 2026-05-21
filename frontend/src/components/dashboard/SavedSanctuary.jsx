import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, FolderHeart, Video, Music } from "lucide-react";
import { useMedia } from "../../context/MediaContext";
import VideoPreviewCard from "../ui/health/VideoPreviewCard";
import TrackCard from "../ui/cards/TrackCard";

export default function SavedSanctuary({ handleSessionOpen, hasProPlan }) {
  const { bookmarks } = useMedia();
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'video' | 'audio'

  const filteredBookmarks = bookmarks.filter((item) => {
    if (activeFilter === "video") return item.mediaType === "video";
    if (activeFilter === "audio") return item.mediaType === "audio";
    return true;
  });

  const videoCount = bookmarks.filter((i) => i.mediaType === "video").length;
  const audioCount = bookmarks.filter((i) => i.mediaType === "audio").length;

  return (
    <section className="space-y-6">
      {/* Tab Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-wellness-softcream/40 pb-4">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-wellness-dark flex items-center gap-2">
            <FolderHeart className="text-wellness-orange" size={24} />
            <span>Saved Sanctuary</span>
          </h2>
          <p className="text-xs font-semibold text-wellness-muted mt-1">
            Access your curated wellness collection anytime.
          </p>
        </div>

        {bookmarks.length > 0 && (
          <div className="flex p-1 bg-white/45 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeFilter === "all"
                  ? "bg-wellness-orange text-white shadow-md"
                  : "text-wellness-muted hover:text-wellness-dark"
              }`}
            >
              All ({bookmarks.length})
            </button>
            <button
              onClick={() => setActiveFilter("video")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeFilter === "video"
                  ? "bg-wellness-orange text-white shadow-md"
                  : "text-wellness-muted hover:text-wellness-dark"
              }`}
            >
              <Video size={12} />
              <span>Workouts ({videoCount})</span>
            </button>
            <button
              onClick={() => setActiveFilter("audio")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeFilter === "audio"
                  ? "bg-wellness-orange text-white shadow-md"
                  : "text-wellness-muted hover:text-wellness-dark"
              }`}
            >
              <Music size={12} />
              <span>Audios ({audioCount})</span>
            </button>
          </div>
        )}
      </div>

      {/* Bookmarks Grid / Empty State */}
      <AnimatePresence mode="wait">
        {filteredBookmarks.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredBookmarks.map((item) => {
              if (item.mediaType === "video") {
                return (
                  <VideoPreviewCard
                    key={item.id}
                    video={item}
                    isLocked={item.premium && !hasProPlan}
                    onClick={handleSessionOpen}
                  />
                );
              } else {
                return <TrackCard key={item.id} track={item} />;
              }
            })}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col items-center justify-center p-12 text-center rounded-[2.5rem] border border-white/40 bg-white/20 backdrop-blur-md shadow-glass max-w-lg mx-auto"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-wellness-cream text-wellness-orange mb-5 shadow-sm border border-white/50">
              <Bookmark size={28} />
            </div>
            <h3 className="font-heading text-lg font-bold text-wellness-dark mb-2">
              No saved items found
            </h3>
            <p className="text-xs text-wellness-muted leading-relaxed max-w-sm mb-6">
              {bookmarks.length === 0
                ? "Start adding sessions, audio meditations, or workout classes to your bookmarks by clicking the bookmark or heart icon on any session card."
                : "No items match your active tab filter."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
