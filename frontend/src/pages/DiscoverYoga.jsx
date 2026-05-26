// src/pages/DiscoverYoga.jsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, BookOpen, Clock, Heart, Play, User, Award, Flame, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import { useToast } from "../context/ToastContext";
import { sessionCatalog } from "../data/wellnessData";

// Icons for categories
const CATEGORIES = [
  { name: "All", emoji: "🧘‍♀️" },
  { name: "Vinyasa", emoji: "✨" },
  { name: "Yin", emoji: "🌸" },
  { name: "Hatha", emoji: "🕊️" },
  { name: "Meditation", emoji: "🌙" },
  { name: "Restorative", emoji: "🍵" },
];

export default function DiscoverYoga() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { openSession, state: dashboardState, toggleFavorite } = useDashboard();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedSessions, setSavedSessions] = useState([]);
  const [particles, setParticles] = useState([]);

  // Generate background particles
  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1.5,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 18 + 12,
    }));
    setParticles(list);
  }, []);

  // Post-login action resume
  useEffect(() => {
    if (location.state?.actionPending && auth.isAuthenticated) {
      try {
        const action = JSON.parse(location.state.actionPending);
        if (action.type === "play-session") {
          const session = sessionCatalog.find(s => s.id === action.sessionId);
          if (session) {
            // Clear location state to prevent repeating
            window.history.replaceState({}, document.title);
            setTimeout(() => {
              openSession(session);
              toast.showToast({
                type: "success",
                title: "Journey Resumed",
                message: `Now starting: ${session.title}`,
              });
            }, 600);
          }
        }
      } catch (e) {
        console.error("Failed to parse actionPending state", e);
      }
    }
  }, [location.state, auth.isAuthenticated, openSession, toast]);

  // Filtered Sessions
  const filteredSessions = useMemo(() => {
    return sessionCatalog.filter((session) => {
      const matchSearch =
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (session.tags && session.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchCategory =
        activeCategory === "All" ||
        session.tags?.some((tag) => tag.toLowerCase() === activeCategory.toLowerCase());

      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleStartSession = (session) => {
    if (!auth.isAuthenticated) {
      toast.showToast({
        type: "info",
        title: "Sign In Required",
        message: "Please sign in to unlock and start sessions.",
      });
      navigate("/login", {
        state: {
          returnTo: "/discover-yoga",
          actionPending: JSON.stringify({ type: "play-session", sessionId: session.id }),
        },
      });
      return;
    }
    
    // Check Pro Plan requirements
    const isPro = dashboardState?.activePlan === "Pro";
    if (session.premium && !isPro) {
      toast.showToast({
        type: "warning",
        title: "Pro Content Locked",
        message: "This session is exclusive to Pro members. Please upgrade your pass.",
      });
      navigate("/pricing");
      return;
    }

    openSession(session);
  };

  const handleBookmark = (sessionId) => {
    if (!auth.isAuthenticated) {
      toast.showToast({ type: "warning", title: "Action Locked", message: "Log in to save sessions." });
      navigate("/login");
      return;
    }
    setSavedSessions((prev) =>
      prev.includes(sessionId) ? prev.filter((id) => id !== sessionId) : [...prev, sessionId]
    );
    toast.showToast({
      type: "success",
      title: savedSessions.includes(sessionId) ? "Removed Bookmark" : "Saved to Sanctuary",
      message: savedSessions.includes(sessionId) ? "Removed from library." : "Successfully added to bookmarks.",
    });
  };

  const isFavorited = (sessionId) => {
    return dashboardState?.favorites?.includes(sessionId) || false;
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] pb-24 relative overflow-hidden select-none">
      
      {/* ─── Ambient Glow Blobs ─── */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#00C875]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-gradient-to-tr from-[#D6A756]/3 to-transparent rounded-full blur-[100px] pointer-events-none" />
      
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#D6A756]/40"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              bottom: "-10px",
            }}
            animate={{
              y: ["0px", "-1000px"],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ─── Header & Search Sanctuary ─── */}
      <header className="pt-28 pb-12 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#00C875]/10 border border-[#00C875]/20 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.25em] text-[#00C875] uppercase">
              <Compass size={12} /> Explore Sanctuary
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold font-heading text-[#F7F3EC]">
              Discover Your Flow
            </h1>
            <p className="text-sm text-[#B8C1CC] max-w-xl font-medium">
              Adapt your mind, body, and spiritual breathwork with our state-of-the-art AI personalized library.
            </p>
          </div>

          {/* Luxury Search Bar */}
          <div className="w-full md:max-w-md relative">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md shadow-glass">
              <Search size={18} className="text-white/45" />
              <input
                type="text"
                placeholder="Search classes, styles, breathwork..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-[#F8FAFC] outline-none placeholder:text-white/35 font-medium"
              />
            </div>
          </div>
        </div>

        {/* ─── Filter Tabs ─── */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.name
                  ? "bg-gradient-to-r from-[#00C875] to-[#00a862] text-[#050816] shadow-[0_4px_15px_rgba(0,200,117,0.25)]"
                  : "border border-white/10 bg-white/5 text-[#B8C1CC] hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="px-6 lg:px-12 max-w-[1440px] mx-auto space-y-16">
        
        {/* Continue Section (Dynamic state helper) */}
        {auth.isAuthenticated && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-heading text-[#F7F3EC] tracking-wide flex items-center gap-2">
                <Clock size={18} className="text-[#D6A756]" /> Continue Practicing
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sessionCatalog.slice(0, 2).map((session) => (
                <div key={`cont-${session.id}`} className="rounded-[20px] bg-white/[0.03] border border-white/5 p-4 flex gap-4 items-center">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#0B1220] to-[#1A2A22] flex items-center justify-center text-2xl border border-white/10 shadow-inner">
                    {session.tags?.includes("Yin") ? "🌸" : "🌱"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate text-[#F7F3EC]">{session.title}</h4>
                    <p className="text-xs text-[#B8C1CC] truncate mt-1">Guided by {session.instructor}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00C875]" style={{ width: "65%" }} />
                      </div>
                      <span className="text-[10px] font-bold text-[#00C875]">65%</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStartSession(session)}
                    className="h-10 w-10 rounded-full bg-[#00C875]/10 border border-[#00C875]/30 flex items-center justify-center text-[#00C875] hover:bg-[#00C875] hover:text-[#050816] transition-all"
                  >
                    <Play size={16} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Session Catalog Explorer Grid ─── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-heading text-[#F7F3EC] tracking-wide">
            {activeCategory} Journeys ({filteredSessions.length})
          </h2>

          {filteredSessions.length === 0 ? (
            <div className="text-center py-20 rounded-[28px] border border-dashed border-white/10 bg-white/[0.02]">
              <AlertCircle className="mx-auto text-white/35 mb-4" size={44} />
              <h3 className="font-bold text-lg text-[#F7F3EC]">No flows found</h3>
              <p className="text-xs text-[#B8C1CC] mt-1 max-w-xs mx-auto">
                Try searching for a different keyword or check other categories.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filteredSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group relative rounded-3xl bg-white/[0.03] border border-white/[0.06] p-5 shadow-glass backdrop-blur-xl flex flex-col justify-between hover:border-[#D6A756]/30 hover:shadow-[0_12px_35px_rgba(214,167,86,0.06)] hover:-translate-y-1.5 transition-all duration-300"
                  >
                    
                    {session.premium && (
                      <div className="absolute top-4 left-4 z-20 rounded-full bg-gradient-to-r from-[#D6A756] to-[#FF9A57] px-3 py-1 text-[8.5px] font-extrabold tracking-widest text-[#050816] uppercase shadow-md">
                        Pro Lock 🔒
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      <button
                        onClick={() => toggleFavorite(session)}
                        className={`h-9 w-9 rounded-full flex items-center justify-center border transition backdrop-blur-md ${
                          isFavorited(session.id)
                            ? "bg-[#FF9A57]/20 border-[#FF9A57]/40 text-[#FF9A57]"
                            : "bg-black/40 border-white/10 text-white/70 hover:text-white"
                        }`}
                      >
                        <Heart size={14} fill={isFavorited(session.id) ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={() => handleBookmark(session.id)}
                        className={`h-9 w-9 rounded-full flex items-center justify-center border transition backdrop-blur-md ${
                          savedSessions.includes(session.id)
                            ? "bg-[#D6A756]/20 border-[#D6A756]/40 text-[#D6A756]"
                            : "bg-black/40 border-white/10 text-white/70 hover:text-white"
                        }`}
                      >
                        <BookOpen size={14} />
                      </button>
                    </div>

                    {/* Thumbnail placeholder with luxury accent */}
                    <div className="relative h-44 rounded-2xl bg-gradient-to-br from-[#0B1220] via-[#1A2E2E] to-[#1A1E2E] overflow-hidden border border-white/5 flex items-center justify-center">
                      <div className="text-4xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                        {session.tags?.includes("Yin") ? "🌸" : session.tags?.includes("Core") ? "🔥" : "🧘‍♀️"}
                      </div>
                      
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-300" />
                      
                      {/* Play Hover Overlay */}
                      <button
                        onClick={() => handleStartSession(session)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="h-12 w-12 rounded-full bg-[#00C875] flex items-center justify-center text-[#050816] shadow-glow">
                          <Play size={20} fill="currentColor" className="ml-0.5" />
                        </div>
                      </button>
                    </div>

                    {/* Content Details */}
                    <div className="mt-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#D6A756] uppercase tracking-wider">
                          <span>{session.level}</span>
                          <span>•</span>
                          <span>{session.duration} Mins</span>
                        </div>
                        
                        <h3 className="font-bold text-base mt-1 text-[#F7F3EC] group-hover:text-white transition duration-200">
                          {session.title}
                        </h3>
                        
                        <p className="text-xs text-[#B8C1CC] mt-2 line-clamp-2 leading-relaxed">
                          {session.description || "Embark on an immersive spiritual and mental flow to release cellular stress."}
                        </p>
                      </div>

                      <div className="mt-5 border-t border-white/5 pt-4 flex items-center justify-between">
                        <span className="text-[11px] text-[#B8C1CC]/70 font-semibold">
                          Instructor: {session.instructor}
                        </span>
                        <button
                          onClick={() => handleStartSession(session)}
                          className="rounded-full bg-white/5 border border-white/10 hover:bg-[#00C875] hover:text-[#050816] hover:border-transparent px-4 py-2 text-xs font-bold transition-all duration-300"
                        >
                          Start
                        </button>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* ─── AI Personalized Sadhana Roadmap ─── */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0B1220] via-[#101F18] to-[#1F1710] p-8 lg:p-12 shadow-glass relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[#00C875]/4 to-transparent rounded-full blur-[80px]" />
          
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#D6A756]/10 border border-[#D6A756]/20 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.2em] text-[#D6A756] uppercase">
              <Award size={12} /> AI Personalized Sadhana
            </span>
            <h2 className="text-3xl font-bold font-heading text-[#F7F3EC]">
              Unlock Your Custom Wellness Plan
            </h2>
            <p className="text-sm text-[#B8C1CC] leading-relaxed">
              Take our interactive wellness assessment. Our custom AI algorithm maps your palm lines and combines physical metrics to build a tailored yoga sequence.
            </p>
          </div>

          <button
            onClick={() => navigate(auth.isAuthenticated ? "/profile-setup" : "/signup")}
            className="rounded-full bg-[#D6A756] hover:bg-yellow-500 text-[#050816] px-8 py-4 text-sm font-extrabold tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
          >
            Start Assessment
          </button>
        </section>

        {/* ─── Instructors Spotlight ─── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-heading text-[#F7F3EC] tracking-wide text-center">
            Spotlight on Master Instructors
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Meera Sharma", role: "Vinyasa Flow Specialist", bio: "Fuses traditional Hatha with fluid body dynamics." },
              { name: "Kavitha Rao", role: "Yin & Sound Meditation", bio: "Guiding deep emotional releases for over 12 years." },
              { name: "Ananya Iyer", role: "Ashtanga & Core Strength", bio: "Builds inner fire and structural alignment." },
              { name: "Priya Nair", role: "Spiritual Breathwork Master", bio: "Focused on cosmic energy alignment." },
            ].map((inst) => (
              <div key={inst.name} className="rounded-3xl bg-white/[0.02] border border-white/5 p-6 text-center hover:border-[#D6A756]/20 transition-all duration-300">
                <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center mb-4">
                  <User size={28} className="text-[#D6A756]" />
                </div>
                <h4 className="font-bold text-base text-[#F7F3EC]">{inst.name}</h4>
                <p className="text-[11px] font-bold text-[#00C875] uppercase tracking-wider mt-1">{inst.role}</p>
                <p className="text-xs text-[#B8C1CC] mt-3 leading-relaxed">{inst.bio}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
}
