import { motion } from "framer-motion";
import { Play, ListMusic } from "lucide-react";
import { useMedia } from "../../../context/MediaContext";
import { hoverLift } from "../../../utils/animations";

export default function PlaylistCard({ playlist }) {
  const { playPlaylist, currentTrack, isPlaying } = useMedia();

  const handlePlay = (e) => {
    e.stopPropagation();
    if (playlist.tracks && playlist.tracks.length > 0) {
      playPlaylist(playlist.tracks, 0);
    }
  };

  const isCurrentPlaylistPlaying = 
    isPlaying && 
    playlist.tracks?.some(t => t.id === currentTrack?.id);

  return (
    <motion.div
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="group relative flex flex-col rounded-3xl overflow-hidden border border-wellness-border bg-wellness-glass backdrop-blur-[18px] p-5 shadow-glass transition-all duration-300 cursor-pointer hover:border-wellness-glow/30 hover:bg-white/5 hover:shadow-cardHover"
      onClick={handlePlay}
    >
      {/* Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-white/5 border border-wellness-border shadow-sm mb-4">
        <img
          src={playlist.image}
          alt={playlist.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

        {/* Hover play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-wellness-glow/20 backdrop-blur-md border border-wellness-glow/40 text-wellness-glow shadow-glow2 transform transition-transform duration-300 scale-90 group-hover:scale-100">
            <Play fill="currentColor" size={24} className="ml-1" />
          </div>
        </div>

        {/* Track count badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-wider uppercase">
          <ListMusic size={12} className="text-wellness-orange" />
          <span>{playlist.tracks?.length || 0} Sessions</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold text-wellness-orange tracking-widest uppercase bg-white/5 border border-wellness-border px-2.5 py-1 rounded-full inline-block mb-2">
            {playlist.category}
          </span>
          <h4 className="font-heading text-lg font-bold text-white group-hover:text-wellness-glow transition-colors leading-snug">
            {playlist.title}
          </h4>
          <p className="text-xs font-semibold text-wellness-muted mt-1.5 line-clamp-2">
            {playlist.description}
          </p>
        </div>

        {/* Play Status Footer */}
        {isCurrentPlaylistPlaying && (
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-wellness-orange">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wellness-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-wellness-orange"></span>
            </span>
            <span>Now Playing</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
