import {
  Activity, BookOpen, Clock, Droplets, Feather, Headphones,
  Heart, Moon, Music, Sun, Wind, Zap, Users, Briefcase,
  Bookmark, Edit3, Settings, Cpu, Radio, Lock, Sparkles
} from "lucide-react";

import ananyaImg from "../assets/images/ananya.png";
import meeraImg from "../assets/images/meera.png";
import kavithaImg from "../assets/images/kavitha.png";
import priyaImg from "../assets/images/priya.png";
import vinyasaImg from "../assets/images/vinyasa.png";
import yinImg from "../assets/images/yin.png";
import powerImg from "../assets/images/power.png";
import meditationImg from "../assets/images/meditation.png";
import sacredImg from "../assets/images/sacredimage.png";
import heroImg from "../assets/images/hero.png";

// Local Audios
import audioRestNow from "../assets/audios/mixkit-rest-now-584.mp3";
import audioRelaxBeat from "../assets/audios/mixkit-relax-beat-292.mp3";
import audioWhatItTakes from "../assets/audios/mixkit-what-it-takes-616.mp3";
import audioCalmMind from "../assets/audios/music_for_video-please-calm-my-mind-125566.mp3";
import audioValleySunset from "../assets/audios/mixkit-valley-sunset-127.mp3";
import audioVoxscape from "../assets/audios/mixkit-voxscape-571.mp3";

// Local Videos
import videoYogaNature from "../assets/videos/63229-506616446.mp4";
import videoYogaSunset from "../assets/videos/111097-689925374.mp4";
import videoYogaForest from "../assets/videos/166793-835662244.mp4";
import videoTinyHouse from "../assets/videos/From KlickPin CF Tiny House Design Ideas That Will Inspire You 71200 - Pin-881298220844727364.mp4";
import videoHeroBg from "../assets/videos/hero-bg.mp4";

// Grouped sidebar navigation — each group has a label and an items array
export const dashboardMenuGroups = [
  {
    group: "Main",
    items: [
      { label: "Dashboard",       path: "/dashboard",              icon: Activity  },
      { label: "Physical Health", path: "/physicalHealth",     icon: Zap       },
      { label: "Mental Health",   path: "/mentalHealth",       icon: Briefcase },
    ],
  },
  {
    group: "Wellness",
    items: [
      { label: "Meditation",      path: "/dashboard/meditation",   icon: Moon      },
      { label: "Sleep",           path: "/dashboard/sleep",        icon: Moon       },
      { label: "Breathwork",      path: "/dashboard/breathwork",   icon: Wind      },
      { label: "Wisdom",          path: "/dashboard/wisdom",       icon: BookOpen   },
    ],
  },
  {
    group: "Programs",
    items: [
      { label: "Live Classes",    path: "/dashboard/live",         icon: Radio      },
      { label: "Kids Yoga",       path: "/dashboard/kids",         icon: Heart      },
      { label: "Saved",           path: "/dashboard/saved",        icon: Bookmark },
      { label: "Journal",         path: "/dashboard/journal",      icon: Edit3    },
    ],
  },
  {
    group: "AI & Settings",
    items: [
      { label: "AI Wellness Coach",path: "/dashboard/ai-coach",    icon: Cpu      },
      { label: "Generated Plans",  path: "/dashboard/plans",       icon: Sparkles },
      { label: "Settings",        path: "/settings",               icon: Settings },
    ],
  },
];

// Flat version kept for any legacy consumers
export const dashboardMenu = dashboardMenuGroups.flatMap((g) => g.items);

export const featuredSessions = [
  {
    id: "sunrise-vinyasa",
    title: "Sunrise Vinyasa Flow",
    instructor: "Meera Sharma",
    duration: 24,
    level: "All levels",
    image: vinyasaImg,
    premium: false,
    description: "Open the body with an uplifting morning sequence.",
    preview: "A flowing morning session to awaken joints and breath.",
    tags: ["Flow", "Energy", "Morning"],
    mediaType: "video",
    videoSrc: videoYogaNature,
  },
  {
    id: "deep-yin",
    title: "Deep Yin Release",
    instructor: "Kavitha Rao",
    duration: 18,
    level: "Gentle",
    image: yinImg,
    premium: true,
    description: "A calming deep-stretch ritual for the nervous system.",
    preview: "Hold each posture and let the body soften slowly.",
    tags: ["Yin", "Restorative", "Evening"],
    mediaType: "video",
    videoSrc: videoYogaSunset,
  },
  {
    id: "power-core",
    title: "Power Core Yoga",
    instructor: "Ananya Iyer",
    duration: 32,
    level: "Intermediate",
    image: powerImg,
    premium: true,
    description: "Strengthen your center with controlled heat-building movement.",
    preview: "A focused core sequence to energize and tone.",
    tags: ["Strength", "Core", "Power"],
    mediaType: "video",
    videoSrc: videoYogaForest,
  },
  {
    id: "sacred-stillness",
    title: "Sacred Stillness",
    instructor: "Priya Nair",
    duration: 20,
    level: "All levels",
    image: sacredImg,
    premium: false,
    description: "A quiet meditation to reconnect with inner spaciousness.",
    preview: "Guided pause for inner quiet and spiritual grounding.",
    tags: ["Meditation", "Stillness", "Breath"],
    mediaType: "audio",
    audioSrc: audioCalmMind,
  },
];

export const dailyRoutine = [
  {
    id: "morning-meditation",
    title: "Morning Meditation",
    duration: 10,
    icon: Sun,
    gradient: "from-[#fff2dd] via-[#fef8f0] to-[#eaf7e5]",
    sessionId: "sacred-stillness",
  },
  {
    id: "breathwork",
    title: "Breathwork",
    duration: 8,
    icon: Wind,
    gradient: "from-[#eff7ea] via-[#f8f1e8] to-[#fff4e5]",
    sessionId: "deep-yin",
  },
  {
    id: "stretch-session",
    title: "Stretch Session",
    duration: 14,
    icon: Feather,
    gradient: "from-[#fdf1e5] via-[#fff8f1] to-[#e9f6f1]",
    sessionId: "sunrise-vinyasa",
  },
  {
    id: "night-relaxation",
    title: "Night Relaxation",
    duration: 12,
    icon: Moon,
    gradient: "from-[#f7ead7] via-[#fdf7ef] to-[#eff7ea]",
    sessionId: "deep-yin",
  },
];

export const liveClasses = [
  {
    id: "live-1",
    title: "Gentle Flow for Energy",
    instructor: "Ananya Iyer",
    time: "07:00",
    category: "Morning Yoga",
    seatsLeft: 18,
    image: ananyaImg,
    meetingLink: "https://meet.google.com/placeholder",
  },
  {
    id: "live-2",
    title: "Evening Reset Session",
    instructor: "Kavitha Rao",
    time: "18:30",
    category: "Stress Relief",
    seatsLeft: 9,
    image: kavithaImg,
    meetingLink: "https://meet.google.com/placeholder",
  },
  {
    id: "live-3",
    title: "Sleep Wind Down",
    instructor: "Meera Sharma",
    time: "21:00",
    category: "Night Relaxation",
    seatsLeft: 22,
    image: meeraImg,
    meetingLink: "https://meet.google.com/placeholder",
  },
];

export const recommendationTopics = [
  { id: "yoga", title: "Yoga Sessions", icon: Feather },
  { id: "sleep", title: "Sleep Music", icon: Music },
  { id: "healing", title: "Spiritual Healing", icon: Heart },
  { id: "chakra", title: "Chakra Therapy", icon: Heart },
  { id: "sound", title: "Sound Meditation", icon: Headphones },
  { id: "breath", title: "Breath Sync", icon: Wind },
];

export const dashboardInsights = [
  { id: "streak", label: "Weekly streak", value: 6, total: 7, color: "#E8651A" },
  { id: "meditation", label: "Meditation minutes", value: 220, total: 300, color: "#2E7D32" },
  { id: "sessions", label: "Yoga sessions completed", value: 18, total: 25, color: "#1565C0" },
  { id: "score", label: "Wellness score", value: 84, total: 100, color: "#8a6a3c" },
];

export const dashboardNotifications = [
  { id: "n1", title: "Your evening flow is ready.", time: "2m ago", unread: true },
  { id: "n2", title: "3 new live classes added.", time: "Today", unread: true },
  { id: "n3", title: "Streak milestone unlocked.", time: "Yesterday", unread: false },
];

export const sessionCatalog = [
  ...featuredSessions,
  {
    id: "breath-reset",
    title: "Breath Reset",
    instructor: "Meera Sharma",
    duration: 14,
    level: "Beginner",
    image: meditationImg,
    premium: false,
    description: "A short reset for clarity and gentle energy.",
    preview: "This practice helps slow the mind and expand the rib cage.",
    tags: ["Breath", "Reset", "Calm"],
    mediaType: "audio",
    audioSrc: audioRestNow,
  },
  {
    id: "morning-sun",
    title: "Morning Sun Salutation",
    instructor: "Ananya Iyer",
    duration: 22,
    level: "All levels",
    image: heroImg,
    premium: false,
    description: "A grounded sun sequence to start the day with focus.",
    preview: "Build heat, balance, and intention for the day ahead.",
    tags: ["Sun", "Flow", "Strength"],
    mediaType: "video",
    videoSrc: videoTinyHouse,
  },
];

export const pricingPlans = [
  { id: "basic", name: "Basic", price: "Free", features: ["Daily routine", "Dashboard access", "Limited sessions"] },
  { id: "plus", name: "Plus", price: "₹499/mo", features: ["Full library", "Live classes", "Session previews"] },
  { id: "pro", name: "Pro", price: "₹999/mo", features: ["1:1 coaching", "Unlimited classes", "Priority support"], highlighted: true },
];

export const audioTracks = [
  { id: "focus-1", title: "Deep Focus Binaural", category: "Focus Music", duration: 45, image: sacredImg, mediaType: "audio", audioSrc: audioRelaxBeat },
  { id: "sleep-1", title: "Heavy Rain & Thunder", category: "Sleep Sounds", duration: 120, image: yinImg, mediaType: "audio", audioSrc: audioValleySunset },
  { id: "med-1", title: "Healing Frequencies", category: "Meditation Audio", duration: 30, image: meditationImg, mediaType: "audio", audioSrc: audioVoxscape },
];

export const featuredPrograms = [
  { id: "fp-1", title: "7-Day Calm Mind", description: "A week-long journey into mindfulness and stress reduction.", duration: 7, image: heroImg },
  { id: "fp-2", title: "Deep Sleep Recovery", description: "Guided evening routines to drastically improve sleep quality.", duration: 14, image: yinImg },
];

export const breathingExercises = [
  { id: "b-1", title: "Box Breathing", duration: 5, description: "Equal counts of inhaling, holding, exhaling, and pausing to center the nervous system." },
  { id: "b-2", title: "4-7-8 Relaxation", duration: 4, description: "A tranquilizing breath pattern to prepare the body for deep rest." },
];
