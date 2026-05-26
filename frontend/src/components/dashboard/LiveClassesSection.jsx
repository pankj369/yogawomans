import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Users, Clock, Video, CheckCircle2, AlertCircle, X } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import { liveClasses as initialLiveClasses } from "../../data/wellnessData";
import { useToast } from "../../context/ToastContext";

export default function LiveClassesSection() {
  const toast = useToast();
  const [classesList, setClassesList] = useState(initialLiveClasses);
  const [bookedIds, setBookedIds] = useState([]);
  const [joiningClass, setJoiningClass] = useState(null);

  const handleBook = (cls) => {
    const isBooked = bookedIds.includes(cls.id);
    if (isBooked) {
      // Unbook
      setBookedIds((prev) => prev.filter((id) => id !== cls.id));
      setClassesList((prev) =>
        prev.map((c) => (c.id === cls.id ? { ...c, seatsLeft: c.seatsLeft + 1 } : c))
      );
      toast.showToast({ title: "Booking Cancelled", message: `You've cancelled your booking for ${cls.title}.` });
    } else {
      // Book
      if (cls.seatsLeft <= 0) {
        toast.showToast({ type: "error", title: "Class Full", message: "Sorry, this class has no seats left." });
        return;
      }
      setBookedIds((prev) => [...prev, cls.id]);
      setClassesList((prev) =>
        prev.map((c) => (c.id === cls.id ? { ...c, seatsLeft: c.seatsLeft - 1 } : c))
      );
      toast.showToast({ type: "success", title: "Class Booked!", message: `Your seat in ${cls.title} is confirmed.` });
    }
  };

  const handleJoin = (cls) => {
    setJoiningClass(cls);
  };

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classesList.map((cls) => {
            const isBooked = bookedIds.includes(cls.id);
            return (
              <motion.div
                key={cls.id}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-[2.5rem] border border-wellness-border bg-wellness-glass p-6 flex flex-col justify-between shadow-glass hover:border-wellness-glow/30 transition-all duration-300"
              >
                <div>
                  {/* Instructor Avatar and Category */}
                  <div className="flex items-center gap-3">
                    <img src={cls.image} alt={cls.instructor} className="h-11 w-11 rounded-full border border-wellness-border object-cover" />
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

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => handleBook(cls)}
                    className={`flex-1 rounded-full py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                      isBooked
                        ? "bg-wellness-glow/20 border-wellness-glow/40 text-wellness-glow"
                        : "bg-white/5 border-wellness-border text-white hover:bg-white/10"
                    }`}
                  >
                    {isBooked ? (
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
              </motion.div>
            );
          })}
        </div>
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
