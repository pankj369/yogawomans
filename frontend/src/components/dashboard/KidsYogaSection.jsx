import { motion } from "framer-motion";
import { Sparkles, Heart, Star, Play, Lock } from "lucide-react";
import DashboardSection from "../ui/sections/DashboardSection";
import SectionHeading from "../ui/sections/SectionHeading";
import { useMedia } from "../../context/MediaContext";
import { useToast } from "../../context/ToastContext";
import { useDashboard } from "../../context/DashboardContext";
import { useNavigate } from "react-router-dom";

// Cover images from existing assets
import vinyasaImg from "../../assets/images/vinyasa.png";
import yinImg from "../../assets/images/yin.png";
import powerImg from "../../assets/images/power.png";

// Audio tracks
import audioCalmMind from "../../assets/audios/music_for_video-please-calm-my-mind-125566.mp3";
import audioRestNow from "../../assets/audios/mixkit-rest-now-584.mp3";
import audioValleySunset from "../../assets/audios/mixkit-valley-sunset-127.mp3";

const kidsSessions = [
  {
    id: "kids-1",
    title: "Jungle Safari Yoga",
    instructor: "Meera Sharma",
    duration: 10,
    level: "Playful",
    image: vinyasaImg,
    premium: false,
    description: "Stretch like a tall giraffe, roar like a lion, and jump like a happy tree frog!",
    mediaType: "audio",
    audioSrc: audioRestNow,
  },
  {
    id: "kids-2",
    title: "Cosmic Space Explorer Flow",
    instructor: "Ananya Iyer",
    duration: 12,
    level: "Exciting",
    image: powerImg,
    premium: true,
    description: "Launch into orbit! Practice rocket breath, stretch for stars, and float peacefully in zero gravity.",
    mediaType: "audio",
    audioSrc: audioCalmMind,
  },
  {
    id: "kids-3",
    title: "Ocean Mermaid Restorative",
    instructor: "Kavitha Rao",
    duration: 15,
    level: "Relaxing",
    image: yinImg,
    premium: false,
    description: "Sway like seaweed, stretch like a dolphin, and calm your mind with deep blue ocean breathing.",
    mediaType: "audio",
    audioSrc: audioValleySunset,
  },
];

export default function KidsYogaSection() {
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = useDashboard();
  const { playTrack } = useMedia();
  const hasProPlan = state?.activePlan === "Pro";

  const handleStart = (session) => {
    if (session.premium && !hasProPlan) {
      toast.showToast({
        type: "warning",
        title: "Kids Premium",
        message: "This kids session requires Pro. Upgrade to unlock.",
      });
      navigate("/pricing");
      return;
    }
    playTrack(session);
    toast.showToast({
      type: "success",
      title: "Jungle/Space Yoga Ready!",
      message: `Loading child-friendly play flow: ${session.title}...`,
    });
  };

  return (
    <div className="space-y-12">
      <DashboardSection id="kids-playflow">
        <SectionHeading
          animate
          eyebrow="Family Playtime"
          title="Kids Yoga & Poses"
          description="Fun, engaging practices specifically structured for kids to build balance and calm."
          className="mb-8"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {kidsSessions.map((session) => (
            <motion.div
              key={session.id}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/50 p-5 flex flex-col justify-between shadow-card hover:shadow-liftSm transition-all duration-300"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden rounded-2xl">
                  <img src={session.image} alt={session.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {session.premium && (
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-wellness-orange">
                      <Lock size={10} /> Premium
                    </div>
                  )}
                  <div className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md h-8 w-8 text-white">
                    <Star size={14} className="fill-current text-yellow-300" />
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-wellness-dark mt-4">
                  {session.title}
                </h3>
                <p className="text-xs text-wellness-muted font-bold mt-0.5">with {session.instructor}</p>
                <p className="text-xs text-wellness-muted mt-2 leading-relaxed line-clamp-2">
                  {session.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-wellness-softcream flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-wellness-orange bg-wellness-orange/5 px-2.5 py-1 rounded-md">
                  {session.duration} mins • {session.level}
                </span>

                <button
                  onClick={() => handleStart(session)}
                  className="h-9 w-9 rounded-full bg-wellness-dark text-white hover:bg-black flex items-center justify-center transition-colors"
                >
                  <Play size={14} fill="white" className="ml-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
