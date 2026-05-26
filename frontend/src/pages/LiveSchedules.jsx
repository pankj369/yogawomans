// src/pages/LiveSchedules.jsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Video, User, Check, Flame, Users, Bell, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import { useToast } from "../context/ToastContext";
import { liveClasses } from "../data/wellnessData";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Static schedules mapping to simulate weekday calendar filtering
const SCHEDULED_CLASSES = {
  Monday: [
    { id: "sc-1", title: "Sunrise Alignment Vinyasa", instructor: "Ananya Iyer", time: "07:00 AM", seatsLeft: 12, duration: 60, difficulty: "Intermediate", premium: false, category: "Morning Flow" },
    { id: "sc-2", title: "Pranayama Breathwork", instructor: "Priya Nair", time: "11:30 AM", seatsLeft: 25, duration: 30, difficulty: "Beginner", premium: false, category: "Breath Sync" },
    { id: "sc-3", title: "Cosmic Healing Nidra", instructor: "Kavitha Rao", time: "07:30 PM", seatsLeft: 4, duration: 75, difficulty: "Gentle", premium: true, category: "Sleep Recovery" },
  ],
  Tuesday: [
    { id: "sc-4", title: "Deep Spine Yin", instructor: "Kavitha Rao", time: "08:00 AM", seatsLeft: 8, duration: 60, difficulty: "Gentle", premium: true, category: "Restorative" },
    { id: "sc-5", title: "Power Core Heat", instructor: "Ananya Iyer", time: "06:00 PM", seatsLeft: 18, duration: 50, difficulty: "Advanced", premium: true, category: "Strength Flow" },
  ],
  Wednesday: [
    { id: "sc-6", title: "Hatha Heart Opener", instructor: "Meera Sharma", time: "07:30 AM", seatsLeft: 15, duration: 60, difficulty: "All Levels", premium: false, category: "Spiritual Path" },
    { id: "sc-7", title: "Chakra Balance Meditation", instructor: "Priya Nair", time: "08:15 PM", seatsLeft: 20, duration: 40, difficulty: "Beginner", premium: true, category: "Chakra Healing" },
  ],
  Thursday: [
    { id: "sc-8", title: "Sunrise Alignment Vinyasa", instructor: "Ananya Iyer", time: "07:00 AM", seatsLeft: 14, duration: 60, difficulty: "Intermediate", premium: false, category: "Morning Flow" },
    { id: "sc-9", title: "Sound Bath Relaxation", instructor: "Kavitha Rao", time: "06:30 PM", seatsLeft: 3, duration: 60, difficulty: "Gentle", premium: true, category: "Sleep Recovery" },
  ],
  Friday: [
    { id: "sc-10", title: "Sunset Restorative Flow", instructor: "Meera Sharma", time: "05:30 PM", seatsLeft: 10, duration: 75, difficulty: "Gentle", premium: false, category: "Restorative" },
  ],
  Saturday: [
    { id: "sc-11", title: "Masterclass: Kundalini Ascension", instructor: "Priya Nair", time: "10:00 AM", seatsLeft: 2, duration: 90, difficulty: "Advanced", premium: true, category: "Spiritual Path" },
  ],
  Sunday: [
    { id: "sc-12", title: "Satsang Community Meditation", instructor: "Meera Sharma", time: "11:00 AM", seatsLeft: 40, duration: 60, difficulty: "All Levels", premium: false, category: "Chakra Healing" },
  ],
};

export default function LiveSchedules() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { state: dashboardState, joinClass } = useDashboard();

  const [activeDay, setActiveDay] = useState("Monday");
  const [bookedSessions, setBookedSessions] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [countdown, setCountdown] = useState({ hours: 14, minutes: 24, seconds: 58 });
  const [particles, setParticles] = useState([]);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Background particles
  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1.5,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 16 + 10,
    }));
    setParticles(list);
  }, []);

  // Post-login action resume
  useEffect(() => {
    if (location.state?.actionPending && auth.isAuthenticated) {
      try {
        const action = JSON.parse(location.state.actionPending);
        if (action.type === "book-session") {
          // Clear location state to prevent repeating
          window.history.replaceState({}, document.title);
          setTimeout(() => {
            handleBookSpot(action.sessionId);
          }, 600);
        }
      } catch (e) {
        console.error("Failed to parse actionPending state", e);
      }
    }
  }, [location.state, auth.isAuthenticated]);

  const handleBookSpot = (sessionId) => {
    if (!auth.isAuthenticated) {
      toast.showToast({
        type: "info",
        title: "Sign In Required",
        message: "Please sign in to reserve your live spot.",
      });
      navigate("/login", {
        state: {
          returnTo: "/live-schedules",
          actionPending: JSON.stringify({ type: "book-session", sessionId }),
        },
      });
      return;
    }

    if (bookedSessions.includes(sessionId)) {
      toast.showToast({
        type: "info",
        title: "Already Reserved",
        message: "You have already booked a spot for this session.",
      });
      return;
    }

    setBookedSessions((prev) => [...prev, sessionId]);
    toast.showToast({
      type: "success",
      title: "Spot Reserved! 🧘‍♀️",
      message: "Check your email for the calendar invitation and link.",
    });
  };

  const handleToggleReminder = (sessionId) => {
    if (!auth.isAuthenticated) {
      toast.showToast({ type: "warning", title: "Action Locked", message: "Sign in to set reminders." });
      navigate("/login");
      return;
    }

    setReminders((prev) =>
      prev.includes(sessionId) ? prev.filter((id) => id !== sessionId) : [...prev, sessionId]
    );
    
    toast.showToast({
      type: "success",
      title: reminders.includes(sessionId) ? "Reminder Off" : "Reminder Set 🔔",
      message: reminders.includes(sessionId) ? "You will not receive alert notifications." : "We will alert you 10 minutes before class starts.",
    });
  };

  const activeClassesList = useMemo(() => {
    return SCHEDULED_CLASSES[activeDay] || [];
  }, [activeDay]);

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] pb-24 relative overflow-hidden select-none">
      
      {/* ─── Background Elements ─── */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#00C875]/4 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-40 right-20 w-[400px] h-[400px] bg-gradient-to-tr from-[#D6A756]/3 to-transparent rounded-full blur-[120px] pointer-events-none" />
      
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#D6A756]/30"
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

      {/* ─── Header Section ─── */}
      <header className="pt-28 pb-12 px-6 lg:px-12 max-w-[1440px] mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#00C875]/10 border border-[#00C875]/20 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.25em] text-[#00C875] uppercase">
          <span className="h-2 w-2 rounded-full bg-[#00C875] animate-ping" /> Live Sanctuary
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold font-heading text-[#F7F3EC]">
          Studio Schedules
        </h1>
        <p className="text-sm text-[#B8C1CC] max-w-xl mx-auto font-medium leading-relaxed">
          Practice live with world-class teachers. Set reminders, reserve class spots, and build your custom weekly discipline.
        </p>
      </header>

      {/* ─── Main Content ─── */}
      <main className="px-6 lg:px-12 max-w-[1440px] mx-auto space-y-16">
        
        {/* Countdown Event Banner */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#1A2A22]/30 via-[#0B1220] to-[#2B1F1A]/20 p-8 lg:p-12 shadow-glass backdrop-blur-md relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-[#00C875]/[0.01] pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#D6A756]/10 border border-[#D6A756]/20 px-3.5 py-1.5 text-[9.5px] font-bold tracking-[0.2em] text-[#D6A756] uppercase">
              <Flame size={12} className="animate-pulse" /> Upcoming Masterclass
            </span>
            <h2 className="text-3xl font-extrabold font-heading text-[#F7F3EC]">
              Kundalini Ascension Ritual
            </h2>
            <p className="text-sm text-[#B8C1CC] leading-relaxed">
              Join Priya Nair in this exclusive 90-minute live transmission. Learn to align your energetic spine and unlock daily wellness reserves.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
              <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2 text-center min-w-[70px]">
                <div className="text-lg font-bold text-[#F7F3EC]">{countdown.hours}</div>
                <div className="text-[9px] text-[#B8C1CC] font-bold uppercase tracking-wider">Hours</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2 text-center min-w-[70px]">
                <div className="text-lg font-bold text-[#F7F3EC]">{countdown.minutes}</div>
                <div className="text-[9px] text-[#B8C1CC] font-bold uppercase tracking-wider">Mins</div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2 text-center min-w-[70px]">
                <div className="text-lg font-bold text-[#F7F3EC]">{countdown.seconds}</div>
                <div className="text-[9px] text-[#B8C1CC] font-bold uppercase tracking-wider">Secs</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 relative z-10 w-full sm:w-auto">
            <button
              onClick={() => handleBookSpot("sc-11")}
              className="rounded-full bg-[#00C875] hover:bg-[#00a862] text-[#050816] px-8 py-4 text-sm font-extrabold tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {bookedSessions.includes("sc-11") ? "Reserved ✓" : "Book Free Spot"}
            </button>
            <button
              onClick={() => handleToggleReminder("sc-11")}
              className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-4 text-sm font-bold tracking-wider transition-all"
            >
              Set Alert
            </button>
          </div>
        </section>

        {/* ─── Calendar schedules ─── */}
        <section className="space-y-8">
          
          {/* Weekday Toggles */}
          <div className="flex overflow-x-auto gap-2.5 pb-2 scrollbar-none max-w-full">
            {WEEKDAYS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap min-w-[120px] text-center border ${
                  activeDay === day
                    ? "bg-gradient-to-br from-[#00C875] to-[#008f52] text-[#050816] border-transparent shadow-[0_8px_20px_rgba(0,200,117,0.2)]"
                    : "border-white/5 bg-white/[0.02] text-[#B8C1CC] hover:bg-white/5 hover:text-white"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Timezone Note */}
          <div className="flex items-center gap-2 text-xs text-[#B8C1CC]/60 font-medium">
            <Clock size={14} className="text-[#D6A756]" />
            <span>Schedules are displayed in your local timezone: Indian Standard Time (GMT+5:30)</span>
          </div>

          {/* Classes Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="wait">
              {activeClassesList.map((cls) => {
                const isBooked = bookedSessions.includes(cls.id);
                const hasReminder = reminders.includes(cls.id);
                return (
                  <motion.article
                    key={cls.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.28 }}
                    className="group relative rounded-3xl bg-white/[0.03] border border-white/[0.06] p-6 shadow-glass backdrop-blur-xl flex flex-col justify-between hover:border-[#D6A756]/20 transition-all duration-300"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[9.5px] font-bold text-[#D6A756] uppercase tracking-wider">
                          {cls.category}
                        </span>
                        {cls.premium && (
                          <span className="text-[9px] font-bold text-[#FF9A57] tracking-widest uppercase">
                            Pro Lock 🔒
                          </span>
                        )}
                      </div>

                      {/* Title & Info */}
                      <h3 className="mt-4 font-bold text-lg text-[#F7F3EC] group-hover:text-white transition">
                        {cls.title}
                      </h3>
                      <p className="text-xs text-[#B8C1CC] mt-1.5">Instructor: {cls.instructor}</p>

                      {/* Timings & capacity */}
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-xs text-[#B8C1CC] font-medium">
                          <Clock size={15} className="text-[#00C875]" />
                          <span>{cls.time} ({cls.duration} Mins)</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#B8C1CC] font-medium">
                          <Users size={15} className="text-[#D6A756]" />
                          <span className={cls.seatsLeft <= 5 ? "text-rose-400 font-semibold" : ""}>
                            {isBooked ? cls.seatsLeft - 1 : cls.seatsLeft} slots left
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 border-t border-white/5 pt-5 flex items-center gap-3">
                      <button
                        onClick={() => handleBookSpot(cls.id)}
                        className={`flex-1 rounded-full py-3.5 text-xs font-extrabold uppercase tracking-widest transition-all duration-300 ${
                          isBooked
                            ? "bg-white/10 text-white/60 cursor-default flex items-center justify-center gap-1.5"
                            : "bg-[#00C875] hover:bg-[#00a862] text-[#050816] shadow-md hover:-translate-y-0.5"
                        }`}
                        disabled={isBooked}
                      >
                        {isBooked ? (
                          <>
                            <Check size={12} /> Booked
                          </>
                        ) : (
                          "Book Spot"
                        )}
                      </button>
                      <button
                        onClick={() => handleToggleReminder(cls.id)}
                        className={`h-11 w-11 rounded-full border border-white/10 flex items-center justify-center transition-all ${
                          hasReminder
                            ? "bg-[#D6A756]/20 text-[#D6A756] border-[#D6A756]/30"
                            : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Bell size={15} />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Webinars Spotlight ─── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-heading text-[#F7F3EC] tracking-wide text-center">
            Upcoming Spiritual Webinars
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: "Aligning the Sacred Orbit", time: "Saturday, May 30th at 11:00 AM", instructor: "Meera & Priya", desc: "A joint theory and movement workshop exploring metabolic heat and energy channels." },
              { title: "Stress Recovery Dynamics", time: "Sunday, June 1st at 04:00 PM", instructor: "Kavitha Rao", desc: "Scientific backing on how Yin postures release physical trauma stored in joints." }
            ].map((web) => (
              <div key={web.title} className="rounded-3xl bg-white/[0.02] border border-white/5 p-6 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                <div>
                  <h4 className="font-bold text-lg text-[#F7F3EC]">{web.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#00C875] font-bold mt-1 uppercase tracking-wider">
                    <Calendar size={13} /> {web.time}
                  </div>
                  <p className="text-xs text-[#B8C1CC] mt-3 leading-relaxed">{web.desc}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[11px] text-[#B8C1CC]/70 font-semibold">Led by {web.instructor}</span>
                  <button
                    onClick={() => toast.showToast({ type: "success", title: "Webinar Saved", message: "We added this to your history page." })}
                    className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold hover:bg-white/10 transition"
                  >
                    Add to Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
}
