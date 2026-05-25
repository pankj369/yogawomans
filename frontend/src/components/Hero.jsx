import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Smile, Heart, Menu } from "lucide-react";

import heroImage from "../assets/images/hero1.png";
import hero2 from "../assets/images/hero2.png";
import AmbientGlow from "./ui/animations/AmbientGlow";
import MagneticButton from "./ui/animations/MagneticButton";

const textVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
  visible: (i) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <>
      {/* ========================================================= */}
      {/* 1. DESKTOP HERO SECTION                                    */}
      {/* ========================================================= */}
      <section id="home" className="relative hidden min-h-screen overflow-hidden md:block bg-[#050505]">
        {/* Parallax Background Image */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 h-full w-full">
          <img
            src={heroImage}
            alt="Yoga Hero Desktop"
            className="h-full w-full object-cover"
          />
          {/* Enhanced Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-wellness-black via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Ambient Floating Glows */}
        <AmbientGlow color="rgba(0, 230, 118, 0.12)" size="60vw" top="-10%" right="-10%" />
        <AmbientGlow color="rgba(233, 120, 31, 0.08)" size="50vw" bottom="10%" left="-10%" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col justify-between px-10 pt-36 lg:px-16 pb-12">
          {/* TEXT CONTENT */}
          <div className="max-w-[700px]">
            {/* Heading with Staggered Typography */}
            <motion.h1
              initial="hidden"
              animate="visible"
              className="
                font-sans
                font-extrabold 
                tracking-tight 
                leading-[1.1] 
                drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] 
                text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6rem]
              "
            >
              <motion.span custom={0} variants={textVariants} className="block text-wellness-orange [-webkit-text-stroke:1px_white]">
                Find Balance.
              </motion.span>
              <motion.span custom={1} variants={textVariants} className="block text-[#FAF8F5] [-webkit-text-stroke:1px_white]">
                Inner Peace.
              </motion.span>
              <motion.span custom={2} variants={textVariants} className="block text-wellness-green [-webkit-text-stroke:1px_white]">
                Better You.
              </motion.span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(5px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 drop-shadow-md"
            >
              Yoga and meditation for a healthier body, calmer mind, and happier life.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="mt-8 flex items-center gap-4"
            >
              <Link to="/physicalHealth">
                <MagneticButton className="btn-wellness-primary shadow-[0_0_30px_rgba(30,122,70,0.4)] border border-wellness-glow/30 px-8 py-3.5 text-sm uppercase tracking-widest text-white backdrop-blur-md rounded-full bg-wellness-green">
                  Physical Health
                </MagneticButton>
              </Link>

              <Link to="/mentalHealth">
                <MagneticButton glowColor="rgba(255,255,255,0.2)" className="btn-wellness-secondary shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/20 px-8 py-3.5 text-sm uppercase tracking-widest text-white backdrop-blur-md rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  Mental Health
                </MagneticButton>
              </Link>
            </motion.div>
          </div>

          {/* Bottom Strip */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="relative overflow-hidden border-t border-white/10 pt-4"
          >
            <div className="animate-marquee flex min-w-max items-center gap-10">
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.4em] text-wellness-orange">
                Surya Namaskar Classes
              </span>
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.4em] text-wellness-green">
                Spiritual Wellness Journey
              </span>
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.4em] text-wellness-orange">
                Sacred Flow
              </span>
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.4em] text-wellness-green">
                Breath • Balance • Harmony
              </span>
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.4em] text-wellness-glow">
                Mindfulness & Meditation
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MOBILE HERO SECTION                                      */}
      {/* ========================================================= */}
      <section className="relative flex min-h-screen w-full overflow-hidden md:hidden bg-[#1a1412]">
        {/* BACKGROUND IMAGE & OVERLAY */}
        <div className="absolute inset-0">
          <img
            src={hero2}
            alt="Yoga Hero Mobile"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* TOP GLASSMORPHIC HEADER */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/40 bg-orange-500/10 text-orange-400">
            🧘‍♀️
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md">
            <Menu size={20} />
          </button>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="relative z-10 flex w-full flex-col justify-between px-6 pt-28 pb-6">
          {/* UPPER TEXT CONTENT */}
          <div className="text-left w-full mt-4">
            <span className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200/80">
              ✨ Your Wellness Journey
            </span>

            {/* MAIN HEADING (Screenshot Style: Bold, Solid, Clean Stroke) */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 90 }}
              className="
                mt-4 
                font-sans 
                text-6xl sm:text-[3.8rem] 
                font-extrabold 
                tracking-tight 
                leading-[1.1] 
                drop-shadow-[0_6px_20px_rgba(0,0,0,0.15)]
              "
            >
              <span className="block text-wellness-orange [-webkit-text-stroke:0.5px_white]">
                Find Balance.
              </span>
              <span className="block text-[#FAF8F5] [-webkit-text-stroke:0.5px_white]">
                Inner Peace.
              </span>
              <span className="block text-wellness-green [-webkit-text-stroke:0.5px_white]">
                Better You.
              </span>
            </motion.h1>

            {/* PARAGRAPH */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 max-w-[290px] font-sans text-sm leading-relaxed text-stone-200/90"
            >
              Transform your body and mind through yoga, meditation, mindfulness, and peaceful wellness.
            </motion.p>

            {/* TRUSTED BY / RATINGS BADGE */}
            <div className="mt-5 flex items-center gap-3 border-l-2 border-orange-400/40 pl-3">
              <div className="flex -space-x-2">
                <div className="h-6 w-6 rounded-full bg-stone-400 border border-white/20" />
                <div className="h-6 w-6 rounded-full bg-stone-500 border border-white/20" />
                <div className="h-6 w-6 rounded-full bg-stone-600 border border-white/20" />
              </div>
              <div className="text-[11px] text-stone-300">
                <span className="font-bold text-white">10K+ Women</span> Trusted • <span className="text-amber-400">★ 4.8</span>
              </div>
            </div>
          </div>

          {/* MIDDLE ACTIONS (GRADIENT GLASS BUTTONS) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="my-auto flex w-full flex-col gap-3 pt-8"
          >
            {/* PHYSICAL HEALTH BUTTON */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                to="/physicalHealth"
                className="group flex w-full items-center justify-between rounded-full border border-wellness-orange/30 bg-gradient-to-r from-wellness-orange/80 to-amber-600/70 p-1.5 pr-6 font-sans text-sm font-semibold text-white shadow-[0_8px_32px_rgba(233,120,31,0.2)] backdrop-blur-md transition-all duration-300 active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-wellness-orange shadow-inner">
                    <Sparkles size={18} />
                  </div>
                  <span className="tracking-wide">Physical Health</span>
                </div>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* MENTAL HEALTH BUTTON */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                to="/mentalHealth"
                className="group flex w-full items-center justify-between rounded-full border border-wellness-green/30 bg-gradient-to-r from-wellness-green/70 to-teal-800/60 p-1.5 pr-6 font-sans text-sm font-semibold text-white shadow-[0_8px_32px_rgba(30,122,70,0.15)] backdrop-blur-md transition-all duration-300 active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-wellness-green shadow-inner">
                    <Smile size={18} />
                  </div>
                  <span className="tracking-wide">Mental Health</span>
                </div>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* BOTTOM GLASS PANEL FEATURES */}
          <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Feature 1 */}
              <div className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/10 text-orange-300">
                  🌱
                </div>
                <span className="mt-1.5 block text-[10px] font-bold text-white leading-tight">Yoga & Fitness</span>
                <span className="text-[8px] text-stone-300/70 mt-0.5 leading-none">Strengthen body</span>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center border-x border-white/10 px-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
                  💮
                </div>
                <span className="mt-1.5 block text-[10px] font-bold text-white leading-tight">Meditation</span>
                <span className="text-[8px] text-stone-300/70 mt-0.5 leading-none">Calm your mind</span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-300">
                  <Heart size={14} />
                </div>
                <span className="mt-1.5 block text-[10px] font-bold text-white leading-tight">Mindfulness</span>
                <span className="text-[8px] text-stone-300/70 mt-0.5 leading-none">Live in present</span>
              </div>
            </div>

            {/* Footer Sub-strip */}
            <div className="mt-3 flex items-center justify-center gap-2 border-t border-white/5 pt-2 text-[8px] uppercase tracking-[0.2em] text-stone-400">
              <span>Wellness</span> • <span className="text-emerald-400">Mindfulness</span> • <span>Meditation</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;