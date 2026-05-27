import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Users, Clock, Video, CheckCircle2, AlertCircle, X, Calendar } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import { liveClasses as localLiveClasses } from "../../data/wellnessData";
import { useToast } from "../../context/ToastContext";
import {
  getLiveClasses,
  getBookings,
  bookClass,
  cancelBooking,
} from "../../services/bookingService";

const localClassMap = localLiveClasses.reduce((acc, c) => {
  acc[c.id] = c.image;
  return acc;
}, {});

export default function LiveClassesSection() {
  const toast = useToast();
  const [classesList, setClassesList] = useState([]);
  const [bookedIds, setBookedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingPending, setBookingPending] = useState({});
  const [joiningClass, setJoiningClass] = useState(null);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        setLoading(true);
        const [classesData, bookingsData] = await Promise.all([
          getLiveClasses(),
          getBookings(),
        ]);
        if (active) {
          setClassesList(classesData);
          setBookedIds(bookingsData.map((b) => b.classId));
        }
      } catch (error) {
        console.error("Failed to load live classes:", error);
        toast.showToast({
          type: "error",
          title: "Loading Error",
          message: "Failed to retrieve live schedule. Please refresh and try again.",
        });
      } finally {
        if (active) setLoading(false);
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, []);

  const handleBook = async (cls) => {
    const isBooked = bookedIds.includes(cls.id);
    setBookingPending((prev) => ({ ...prev, [cls.id]: true }));

    try {
      if (isBooked) {
        // Unbook
        const res = await cancelBooking(cls.id);
        if (res.success) {
          setBookedIds((prev) => prev.filter((id) => id !== cls.id));
          setClassesList((prev) =>
            prev.map((c) => (c.id === cls.id ? { ...c, seatsLeft: res.seatsLeft } : c))
          );
          toast.showToast({
            type: "success",
            title: "Booking Cancelled",
            message: `You've cancelled your booking for ${cls.title}.`,
          });
        }
      } else {
        // Book
        if (cls.seatsLeft <= 0) {
          toast.showToast({
            type: "error",
            title: "Class Full",
            message: "Sorry, this class has no seats left.",
          });
          return;
        }
        const res = await bookClass(cls.id);
        if (res.success) {
          setBookedIds((prev) => [...prev, cls.id]);
          setClassesList((prev) =>
            prev.map((c) => (c.id === cls.id ? { ...c, seatsLeft: res.seatsLeft } : c))
          );
          toast.showToast({
            type: "success",
            title: "Class Booked!",
            message: `Your seat in ${cls.title} is confirmed.`,
          });
        }
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.showToast({
        type: "error",
        title: "Action Failed",
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setBookingPending((prev) => ({ ...prev, [cls.id]: false }));
    }
  };

  const handleJoin = (cls) => {
    setJoiningClass(cls);
  };

  const getGoogleCalendarLink = (cls) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dateStr = `${year}${month}${day}`;

    const [hour, minute] = cls.time.split(":");
    const startHour = hour.padStart(2, "0");
    const startMin = minute.padStart(2, "0");
    const endHour = String((parseInt(startHour) + 1) % 24).padStart(2, "0");

    const start = `${dateStr}T${startHour}${startMin}00`;
    const end = `${dateStr}T${endHour}${startMin}00`;

    const text = encodeURIComponent(`YogaWoman: ${cls.title}`);
    const details = encodeURIComponent(
      `Live Yoga class with instructor ${cls.instructor}.\n\nBroadcast URL: ${cls.meetingLink || "https://meet.google.com/placeholder"}`
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&sf=true&output=xml`;
  };

  const SkeletonCard = () => (
    <div className="rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-6 flex flex-col justify-between h-[280px] animate-pulse">
      <div>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-white/5" />
          <div className="space-y-2 flex-1">
            <div className="h-3 w-1/3 bg-white/5 rounded" />
            <div className="h-2 w-1/4 bg-white/5 rounded" />
          </div>
        </div>
        <div className="h-5 w-3/4 bg-white/5 rounded mt-6" />
        <div className="space-y-2 mt-4 pt-4 border-t border-wellness-border">
          <div className="h-3 w-1/2 bg-white/5 rounded" />
          <div className="h-3 w-2/5 bg-white/5 rounded" />
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <div className="h-9 flex-1 bg-white/5 rounded-full" />
        <div className="h-9 w-24 bg-white/5 rounded-full" />
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <DashboardSection id="live-hub">
        <SectionHeading
          animate
          eyebrow="Interactive Stream"
          title="Live Yoga Studio"
          description="Connect in real-time with our senior instructors for immersive group practices."
          className="mb-8"
        />

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classesList.map((cls) => {
              const isBooked = bookedIds.includes(cls.id);
              const isPending = bookingPending[cls.id] || false;
              const imgAsset = localClassMap[cls.id] || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400";

              return (
                <motion.div
                  key={cls.id}
                  whileHover={{ y: -6 }}
                  className="relative overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-6 flex flex-col justify-between shadow-glass hover:border-wellness-glow/30 transition-all duration-300"
                >
                  <div>
                    {/* Instructor Avatar and Category */}
                    <div className="flex items-center gap-3">
                      <img src={imgAsset} alt={cls.instructor} className="h-11 w-11 rounded-full border border-wellness-border object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{cls.instructor}</h4>
                        <p className="text-[10px] text-wellness-muted font-semibold uppercase tracking-wider">{cls.category}</p>
                      </div>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-white mt-4 line-clamp-1">
                      {cls.title}
                    </h3>

                    <div className="mt-4 space-y-2 border-t border-wellness-border pt-4 text-xs font-semibold text-wellness-muted">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-wellness-orange" />
                        <span>Starts at {cls.time} today</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-wellness-glow" />
                        <span>{cls.seatsLeft} seats remaining</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    {isBooked && (
                      <a
                        href={getGoogleCalendarLink(cls)}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full rounded-full border border-wellness-glow/20 bg-wellness-glow/10 hover:bg-wellness-glow/20 text-wellness-glow py-2 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Calendar size={13} /> Add to Google Calendar
                      </a>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBook(cls)}
                        disabled={isPending}
                        className={`flex-1 rounded-full py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                          isBooked
                            ? "bg-wellness-glow/20 border-wellness-glow/40 text-wellness-glow"
                            : "bg-white/5 border-wellness-border text-white hover:bg-white/10"
                        } disabled:opacity-50`}
                      >
                        {isPending ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : isBooked ? (
                          <>
                            <CheckCircle2 size={13} /> Booked
                          </>
                        ) : (
                          "Book Seat"
                        )}
                      </button>

                      <button
                        onClick={() => handleJoin(cls)}
                        className="rounded-full bg-wellness-glow hover:bg-wellness-glow/90 text-black px-5 py-2.5 text-xs font-extrabold transition-all flex items-center justify-center gap-1"
                      >
                        <Video size={13} /> Join Room
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </DashboardSection>

      {/* Connection Modal */}
      <AnimatePresence>
        {joiningClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 px-4 py-8 backdrop-blur-md flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              className="mx-auto w-full max-w-md overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-8 shadow-glass relative text-center flex flex-col items-center backdrop-blur-xl"
            >
              <button
                onClick={() => setJoiningClass(null)}
                className="absolute right-5 top-5 p-2 rounded-full bg-white/5 border border-wellness-border text-wellness-muted hover:text-white transition-all"
              >
                <X size={16} />
              </button>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-wellness-orange/10 text-wellness-orange mb-4 shadow-sm">
                <Video size={28} className="animate-pulse" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-wellness-orange animate-pulse">Connecting Stream</span>
              <h3 className="font-heading text-2xl font-extrabold text-white mt-2 leading-snug">{joiningClass.title}</h3>
              <p className="text-xs text-wellness-muted mt-2 max-w-xs font-medium">
                Redirecting to class broadcast room. Ensure your video source is working correctly.
              </p>

              <div className="mt-6 w-full space-y-2">
                <a
                  href={joiningClass.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setJoiningClass(null)}
                  className="block w-full text-center rounded-full bg-wellness-glow hover:bg-wellness-glow/90 text-black py-3 text-xs font-extrabold transition-all shadow-sm"
                >
                  Open Stream Link (Meet)
                </a>
                <button
                  onClick={() => setJoiningClass(null)}
                  className="w-full rounded-full bg-white/5 border border-wellness-border text-white py-3 text-xs font-bold hover:bg-white/10 transition-colors"
                >
                  Cancel Connection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
