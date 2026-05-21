import { Activity, Flame, Heart, Timer } from "lucide-react";

import vinyasaImg from "../assets/images/vinyasa.png";
import powerImg from "../assets/images/power.png";
import heroImg from "../assets/images/hero.png";
import meditationImg from "../assets/images/meditation.png";

// Local Videos
import videoYogaNature from "../assets/videos/63229-506616446.mp4";
import videoYogaSunset from "../assets/videos/111097-689925374.mp4";
import videoYogaForest from "../assets/videos/166793-835662244.mp4";
import videoTinyHouse from "../assets/videos/From KlickPin CF Tiny House Design Ideas That Will Inspire You 71200 - Pin-881298220844727364.mp4";

export const physicalStats = [
  { label: "Active Calories", value: "1,240", unit: "kcal", icon: Flame, color: "#E77B35", progress: 75 },
  { label: "Weekly Progress", value: "3", unit: "workouts", icon: Activity, color: "#2F6B3B", progress: 60 },
  { label: "Current Streak", value: "5", unit: "days", icon: Timer, color: "#1565C0" },
  { label: "Heart Rate Avg", value: "112", unit: "bpm", icon: Heart, color: "#D32F2F" },
];

export const physicalCategories = ["All", "Beginner", "Morning Flow", "Strength", "Flexibility", "Recovery"];

export const physicalVideos = [
  {
    id: "pv-1",
    title: "Morning Energy Flow",
    instructor: "Ananya Iyer",
    category: "Morning Flow",
    duration: 15,
    level: "Beginner",
    calories: 120,
    image: heroImg,
    premium: false,
    description: "Start your day with this gentle, awakening sun salutation sequence.",
    mediaType: "video",
    videoSrc: videoYogaNature,
  },
  {
    id: "pv-2",
    title: "Full Body Strength",
    instructor: "Meera Sharma",
    category: "Strength",
    duration: 35,
    level: "Intermediate",
    calories: 280,
    image: powerImg,
    premium: false,
    description: "Build foundational core and upper body strength using bodyweight holds.",
    mediaType: "video",
    videoSrc: videoYogaSunset,
  },
  {
    id: "pv-3",
    title: "Deep Hip Openers",
    instructor: "Kavitha Rao",
    category: "Flexibility",
    duration: 25,
    level: "All Levels",
    calories: 150,
    image: vinyasaImg,
    premium: true,
    description: "Release tension stored in the hips and lower back with deep yin holds.",
    mediaType: "video",
    videoSrc: videoYogaForest,
  },
  {
    id: "pv-4",
    title: "Post-Workout Recovery",
    instructor: "Priya Nair",
    category: "Recovery",
    duration: 20,
    level: "Beginner",
    calories: 80,
    image: meditationImg,
    premium: true,
    description: "Cool down and stretch out tight muscles after a heavy workout.",
    mediaType: "video",
    videoSrc: videoTinyHouse,
  },
];
