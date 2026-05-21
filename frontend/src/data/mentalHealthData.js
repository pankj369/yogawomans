import { Smile, Wind, Moon, Zap, Coffee, CloudRain, Music, Cloud } from "lucide-react";

import meditationImg from "../assets/images/meditation.png";
import sacredImg from "../assets/images/sacredimage.png";
import yinImg from "../assets/images/yin.png";
import ananyaImg from "../assets/images/ananya.png";

// Local Audios
import audioDana from "../assets/audios/danamusic-meditation-amp-relax-238980.mp3";
import audioLeberch from "../assets/audios/leberch-meditation-meditation-music-523576.mp3";
import audioRain from "../assets/audios/mixkit-light-rain-loop-2393.wav";
import audioBirds from "../assets/audios/mixkit-little-birds-singing-in-the-trees-17.wav";
import audioRestNow from "../assets/audios/mixkit-rest-now-584.mp3";
import audioValleySunset from "../assets/audios/mixkit-valley-sunset-127.mp3";
import audioVoxscape from "../assets/audios/mixkit-voxscape-571.mp3";
import audioWhatItTakes from "../assets/audios/mixkit-what-it-takes-616.mp3";
import audioCalmMind from "../assets/audios/music_for_video-please-calm-my-mind-125566.mp3";
import audioOcean from "../assets/audios/oceanframemusic-relax-515144.mp3";
import audioSleepMusic from "../assets/audios/viacheslavstarostin-meditation-relax-sleep-music-346733.mp3";

export const moodOptions = [
  { id: "happy", label: "Happy", icon: Smile, color: "#2E7D32" },
  { id: "calm", label: "Calm", icon: Wind, color: "#1565C0" },
  { id: "tired", label: "Tired", icon: Moon, color: "#6A1B9A" },
  { id: "stressed", label: "Stressed", icon: Zap, color: "#D32F2F" },
  { id: "focused", label: "Focused", icon: Coffee, color: "#E77B35" },
];

export const healingRoutines = [
  { id: "r1", title: "Morning Calm", subtitle: "Start your day centered", icon: Coffee, duration: 10 },
  { id: "r2", title: "Anxiety Reset", subtitle: "Quick nervous system reset", icon: Wind, duration: 5 },
  { id: "r3", title: "Night Relaxation", subtitle: "Prepare for deep sleep", icon: Moon, duration: 15 },
  { id: "r4", title: "Focus Reset", subtitle: "Clear mental fog", icon: Zap, duration: 8 },
];

export const sleepStories = [
  {
    id: "sleep-1",
    title: "Midnight in Kyoto",
    category: "Sleep Story",
    duration: 45,
    icon: Moon,
    image: yinImg,
    premium: false,
    description: "Wander through the tranquil bamboo forests of Kyoto under a starlit sky.",
    mediaType: "audio",
    audioSrc: audioDana,
  },
  {
    id: "sleep-2",
    title: "The Celestial Ocean",
    category: "Deep Rest",
    duration: 60,
    icon: Moon,
    image: sacredImg,
    premium: true,
    description: "Float effortlessly on the gentle waves of a cosmic sea.",
    mediaType: "audio",
    audioSrc: audioLeberch,
  },
];

export const mentalCategories = ["All", "Anxiety Relief", "Deep Sleep", "Focus", "Self Love", "Healing"];

export const meditationSessions = [
  {
    id: "med-1",
    title: "Anxiety Relief Breath",
    instructor: "Priya Nair",
    category: "Anxiety Relief",
    duration: 10,
    level: "Beginner",
    image: meditationImg,
    premium: false,
    description: "A calming guided meditation to reduce heart rate and quiet a racing mind.",
    mediaType: "audio",
    audioSrc: audioCalmMind,
  },
  {
    id: "med-2",
    title: "Deep Sleep Visualization",
    instructor: "Kavitha Rao",
    category: "Deep Sleep",
    duration: 25,
    level: "All Levels",
    image: yinImg,
    premium: true,
    description: "Drift into a deep, restorative sleep with this soothing guided journey.",
    mediaType: "audio",
    audioSrc: audioSleepMusic,
  },
  {
    id: "med-3",
    title: "Focus & Clarity",
    instructor: "Ananya Iyer",
    category: "Focus",
    duration: 15,
    level: "Intermediate",
    image: sacredImg,
    premium: false,
    description: "Clear mental fog and prepare for deep work with this mindfulness practice.",
    mediaType: "audio",
    audioSrc: audioOcean,
  },
  {
    id: "med-4",
    title: "Radical Self Love",
    instructor: "Meera Sharma",
    category: "Self Love",
    duration: 20,
    level: "All Levels",
    image: ananyaImg,
    premium: true,
    description: "A profound healing session focused on compassion and inner acceptance.",
    mediaType: "audio",
    audioSrc: audioRestNow,
  },
];

export const healingAudio = [
  {
    id: "audio-1",
    title: "Heavy Rain & Thunder",
    category: "Nature Ambience",
    duration: 120,
    icon: CloudRain,
    image: yinImg,
    mediaType: "audio",
    audioSrc: audioRain,
  },
  {
    id: "audio-2",
    title: "528Hz Healing Frequency",
    category: "Sound Healing",
    duration: 60,
    icon: Music,
    image: sacredImg,
    mediaType: "audio",
    audioSrc: audioVoxscape,
  },
  {
    id: "audio-3",
    title: "Deep Sleep Piano",
    category: "Sleep Sounds",
    duration: 90,
    icon: Moon,
    image: meditationImg,
    mediaType: "audio",
    audioSrc: audioWhatItTakes,
  },
  {
    id: "audio-4",
    title: "Forest Wind & Birds",
    category: "Nature Ambience",
    duration: 45,
    icon: Cloud,
    image: ananyaImg,
    mediaType: "audio",
    audioSrc: audioBirds,
  },
];

export const breathingCycles = [
  {
    id: "box-breathing",
    title: "Box Breathing",
    description: "Inhale 4s, Hold 4s, Exhale 4s, Hold 4s",
    duration: 5,
    cycle: [
      { phase: "Inhale", duration: 4 },
      { phase: "Hold", duration: 4 },
      { phase: "Exhale", duration: 4 },
      { phase: "Hold", duration: 4 },
    ],
  },
  {
    id: "relax-breathing",
    title: "4-7-8 Relaxation",
    description: "Inhale 4s, Hold 7s, Exhale 8s",
    duration: 3,
    cycle: [
      { phase: "Inhale", duration: 4 },
      { phase: "Hold", duration: 7 },
      { phase: "Exhale", duration: 8 },
    ],
  },
];
