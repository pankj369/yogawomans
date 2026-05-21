import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Smile, Heart, Menu } from "lucide-react";

import heroImage from "../assets/images/hero1.png";
import hero2 from "../assets/images/hero2.png";

function Hero() {
  return (
    <>
      {/* ========================================================= */}
      {/* 1. DESKTOP HERO SECTION                                    */}
      {/* ========================================================= */}
      <section id="home" className="relative hidden min-h-screen overflow-hidden md:block">
        {/* Background Image */}
        <img
          src={heroImage}
          alt="Yoga Hero Desktop"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col justify-between px-10 pt-36 lg:px-16">
          {/* TEXT CONTENT */}
          <div className="max-w-[700px]">
            {/* Heading (Updated to Match the Bold Impact Screenshot Style) */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
                font-sans
                font-extrabold 
                tracking-tight 
                leading-[1.1] 
                drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)] 
                text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6rem]
              "
            >
              <span className="block text-wellness-orange">
                Find Balance.
              </span>
              <span className="block text-[#FAF8F5]">
                Inner Peace.
              </span>
              <span className="block text-wellness-green">
                Better You.
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 drop-shadow-md"
            >
              Yoga and meditation for a healthier body, calmer mind, and happier life.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 flex items-center gap-4"
            >
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  to="/physicalHealth"
                  className="btn-wellness-primary shadow-2xl"
                >
                  Physical Health
                </Link>
              </motion.div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  to="/mentalHealth"
                  className="btn-wellness-secondary border-none bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-wellness-dark shadow-2xl"
                >
                  Mental Health
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Strip */}
          <div className="relative overflow-hidden border-t border-white/20 py-3">
            <div className="animate-marquee flex min-w-max items-center gap-10">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#E25C1D]">
                Surya Namaskar Classes
              </span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#237A3B]">
                Spiritual Wellness Journey
              </span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#E25C1D]">
                Sacred Flow
              </span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#237A3B]">
                Breath • Balance • Harmony
              </span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-sky-400">
                Mindfulness & Meditation
              </span>
            </div>
          </div>
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
                text-4xl sm:text-[3.2rem] 
                font-extrabold 
                tracking-tight 
                leading-[1.1] 
                drop-shadow-[0_6px_20px_rgba(0,0,0,0.15)]
              "
            >
              <span className="block text-wellness-orange">
                Find Balance.
              </span>
              <span className="block text-[#FAF8F5]">
                Inner Peace.
              </span>
              <span className="block text-wellness-green">
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
                className="group flex w-full items-center justify-between rounded-full border border-orange-400/30 bg-gradient-to-r from-[#E25C1D]/80 to-amber-600/70 p-1.5 pr-6 font-sans text-sm font-semibold text-white shadow-[0_8px_32px_rgba(226,92,29,0.2)] backdrop-blur-md transition-all duration-300 active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#E25C1D] shadow-inner">
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
                className="group flex w-full items-center justify-between rounded-full border border-emerald-500/30 bg-gradient-to-r from-[#237A3B]/70 to-teal-800/60 p-1.5 pr-6 font-sans text-sm font-semibold text-white shadow-[0_8px_32px_rgba(35,122,59,0.15)] backdrop-blur-md transition-all duration-300 active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#237A3B] shadow-inner">
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