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
                className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/50 p-6 flex flex-col justify-between shadow-card hover:shadow-liftSm transition-all duration-300"
              >
                <div>
                  {/* Instructor Avatar and Category */}
                  <div className="flex items-center gap-3">
                    <img src={cls.image} alt={cls.instructor} className="h-11 w-11 rounded-full border border-white/60 object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-wellness-dark">{cls.instructor}</h4>
                      <p className="text-[10px] text-wellness-muted font-semibold uppercase tracking-wider">{cls.category}</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-wellness-dark mt-4 line-clamp-1">
                    {cls.title}
                  </h3>

                  <div className="mt-4 space-y-2 border-t border-wellness-softcream pt-4 text-xs font-semibold text-wellness-muted">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-wellness-orange" />
                      <span>Starts at {cls.time} today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-wellness-orange" />
                      <span>{cls.seatsLeft} seats remaining</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => handleBook(cls)}
                    className={`flex-1 rounded-full py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                      isBooked
                        ? "bg-wellness-greenLight border-wellness-greenLight text-wellness-green"
                        : "bg-white border-wellness-muted/20 text-wellness-dark hover:bg-wellness-cream"
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
                    className="rounded-full bg-wellness-dark hover:bg-black text-white px-5 py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1"
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
              className="mx-auto w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/30 bg-wellness-cream2 p-8 shadow-glass relative text-center flex flex-col items-center"
            >
              <button
                onClick={() => setJoiningClass(null)}
                className="absolute right-5 top-5 p-2 rounded-full bg-white/70 hover:bg-white text-wellness-muted transition-all"
              >
                <X size={16} />
              </button>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-wellness-orange/10 text-wellness-orange mb-4 shadow-sm">
                <Video size={28} className="animate-pulse" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-wellness-orange animate-pulse">Connecting Stream</span>
              <h3 className="font-heading text-2xl font-extrabold text-wellness-dark mt-2 leading-snug">{joiningClass.title}</h3>
              <p className="text-xs text-wellness-muted mt-2 max-w-xs">
                Redirecting to class broadcast room. Ensure your video source is working correctly.
              </p>

              <div className="mt-6 w-full space-y-2">
                <a
                  href={joiningClass.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setJoiningClass(null)}
                  className="block w-full text-center rounded-full bg-wellness-dark hover:bg-black text-white py-3 text-xs font-bold transition-all shadow-sm"
                >
                  Open Stream Link (Meet)
                </a>
                <button
                  onClick={() => setJoiningClass(null)}
                  className="w-full rounded-full bg-white/80 border border-wellness-muted/20 text-wellness-dark py-3 text-xs font-bold hover:bg-wellness-cream transition-colors"
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
