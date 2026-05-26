import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import GlobalAudioPlayer from "../ui/player/GlobalAudioPlayer";
import VideoPlayerOverlay from "../ui/player/VideoPlayerOverlay";
import defaultVideo from "../../assets/videos/166793-835662244.mp4";
import { useMood } from "../../context/MoodContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Heart } from "lucide-react";

export default function DashboardLayout({
  children,
  userName = "Yogi",
  title,
  query,
  onQueryChange,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { mood, setMood, showCheckInModal, setShowCheckInModal, themes } = useMood();

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 20);
  };

  return (
    <div className="h-screen w-full bg-wellness-black text-white relative overflow-hidden flex">
      {/* Persistent Fullscreen Ambient Video Background System */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.06] filter blur-[3px]"
          src={defaultVideo}
        />
        {/* Dark Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(5,8,22,0.82) 0%, rgba(5,8,22,0.92) 100%)"
          }}
        />
      </div>

      {/* Immersive cinematic background glows for the command center */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top_left,_var(--adaptive-glow-gradient-start),_transparent_50%)] pointer-events-none z-0 transition-all duration-1000" />
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top_right,_rgba(233,120,31,0.08),_transparent_40%)] pointer-events-none z-0" />
      
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area — offset for desktop floating sidebar and independently scrollable */}
      <div 
        onScroll={handleScroll}
        className="flex-1 h-full overflow-y-auto lg:pl-[278px] relative z-10 no-scrollbar"
      >
        <TopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          userName={userName}
          title={title}
          query={query}
          onQueryChange={onQueryChange}
          isScrolled={isScrolled}
        />

        <main className="space-y-6 px-4 py-6 pb-32 sm:px-6 lg:px-8 lg:py-7 lg:pb-32">
          {children}
        </main>
      </div>

      {/* Global Media Players */}
      <div className="relative z-50">
        <GlobalAudioPlayer />
        <VideoPlayerOverlay />
      </div>

      {/* Daily Mindful Check-in Overlay Modal */}
      <AnimatePresence>
        {showCheckInModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckInModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-wellness-surface p-8 shadow-heroCard backdrop-blur-2xl z-10"
            >
              {/* Top ambient glow matching the active theme */}
              <div 
                className="absolute -top-24 -left-24 h-48 w-48 rounded-full blur-[60px] opacity-20 pointer-events-none transition-all duration-1000"
                style={{ backgroundColor: "var(--adaptive-primary)" }}
              />

              {/* Close button */}
              <button
                onClick={() => setShowCheckInModal(false)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>

              <div className="relative z-10 text-center space-y-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-wellness-glow/20 to-wellness-glow/5 border border-wellness-glow/30 text-wellness-glow">
                  <Heart size={22} className="animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-extrabold text-white">How is your energy today?</h3>
                  <p className="text-sm text-wellness-muted leading-relaxed max-w-md mx-auto">
                    Let Aria align your AI Wellness Operating System, adapting glows, meditation rhythms, and custom coaching to your current vibration.
                  </p>
                </div>

                {/* Mood Grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 pt-4">
                  {Object.values(themes).map((t) => {
                    const isActive = mood === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setMood(t.id)}
                        className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? "bg-white/10 border-white/30 text-white scale-[1.03]"
                            : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/15"
                        }`}
                        style={{
                          boxShadow: isActive ? `0 0 20px ${t.glowColor}` : 'none'
                        }}
                      >
                        <span className="text-3xl animate-bounce" style={{ animationDelay: `${t.id === 'calm' ? 0.1 : t.id === 'stressed' ? 0.2 : 0.3}s` }}>{t.emoji}</span>
                        <span className="text-xs font-bold tracking-wide">{t.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => setShowCheckInModal(false)}
                    className="text-xs font-bold uppercase tracking-widest text-wellness-muted hover:text-white transition-all"
                  >
                    Skip & Keep Current Vibe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
