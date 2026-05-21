import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import heroImage from "../assets/images/hero1.png";
import hero2 from "../assets/images/hero2.png";

function Hero() {
  return (
    <>
      {/* DESKTOP HERO */}
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

          {/* TEXT */}
          <div className="max-w-[700px]">

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading font-extrabold leading-[0.9] [paint-order:stroke_fill] [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)] drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)] text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem]"
            >

              <span className="block text-primaryOrange">
                Find Balance.
              </span>

              <span className="block text-primarywhite">
                Inner Peace.
              </span>

              <span className="block text-primaryGreen">
                Better You.
              </span>

            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 max-w-xl text-lg leading-relaxed text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)]"
            >
              Yoga and meditation for a healthier body,
              calmer mind, and happier life.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 flex items-center gap-4"
            >

              <Link
                to="/physicalHealth"
                className="rounded-full bg-primaryOrange px-8 py-4 font-heading text-sm font-bold text-white shadow-soft transition duration-300 hover:-translate-y-1"
              >
                Physical Health
              </Link>

              <Link
                to="/mentalHealth"
                className="rounded-full border-2 border-primaryGreen px-7 py-4 font-heading text-sm font-semibold text-primaryGreen transition duration-300 hover:bg-primaryGreen hover:text-white"
              >
                Mental Health
              </Link>

            </motion.div>

          </div>

          {/* Bottom Strip */}
          <div className="relative overflow-hidden border-t border-white/20 py-3">

            <div className="animate-marquee flex min-w-max items-center gap-10">

              <span className="font-heading text-xs uppercase tracking-[0.3em] text-primaryOrange">
                Surya Namaskar Classes
              </span>

              <span className="font-heading text-xs uppercase tracking-[0.3em] text-primaryGreen">
                Spiritual Wellness Journey
              </span>

              <span className="font-heading text-xs uppercase tracking-[0.3em] text-primaryOrange">
                Sacred Flow
              </span>

              <span className="font-heading text-xs uppercase tracking-[0.3em] text-primaryGreen">
                Breath • Balance • Harmony
              </span>

              <span className="font-heading text-xs uppercase tracking-[0.3em] text-primaryBlue">
                Mindfulness & Meditation
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* MOBILE HERO */}
          <section className="relative flex min-h-screen overflow-hidden md:hidden">
      
            {/* Background Image */}
            <img
              src={hero2}
              alt="Yoga Hero Mobile"
              className="absolute inset-0 h-full w-full object-cover"
            />
      
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10" />
      
            {/* Main Content */}
            <div className="relative z-10 flex w-full flex-col items-center px-6 pt-36 text-center">
      
              {/* TEXT CONTENT */}
              <div>
      
                {/* HEADING */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 90,
                  }}
                  className="
                    font-heading
                    text-[3.3rem]
                    font-extrabold
                    leading-[0.9]
                    [paint-order:stroke_fill]
                    [-webkit-text-stroke:1px_rgba(255,255,255,0.85)]
                    drop-shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                  "
                >
      
                  <span className="block text-primaryOrange ">
                    Find Balance.
                  </span>
      
                  <span className="block text-primarywhite">
                    Inner Peace.
                  </span>
      
                  <span className="block text-primaryGreen">
                    Better You.
                  </span>
      
                </motion.h1>
      
                {/* PARAGRAPH */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.3,
                  }}
                  className="
                    mx-auto
                    mt-5
                    max-w-[320px]
                    text-sm
                    leading-relaxed
                    text-white
                    drop-shadow-lg
                  "
                >
                  Transform your body and mind through yoga,
                  meditation, mindfulness, and peaceful wellness.
                </motion.p>
      
              </div>
      
              {/* BUTTONS */}
              <motion.div
                  initial={{ opacity: 0, y: 90 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1,
    delay: 0.6,
    type: "spring",
    stiffness: 70,
  }}
  className="mt-52 flex w-full flex-col items-center gap-4"
>
      
                {/* EXPLORE BUTTON */}
                <Link
                  to="/physicalHealth"
                  className="
                    flex
                    w-full
                    max-w-[290px]
                    items-center
                    justify-center
                    rounded-full
                    bg-primaryOrange
                    px-6
                    py-4
                    font-heading
                    text-sm
                    font-bold
                    text-white
                    shadow-xl
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:shadow-2xl
                    active:scale-95
                  "
                >
                  Physical Health
                </Link>
      
                <Link
                  to="/mentalHealth"
                  className="
                    flex
                    w-full
                    max-w-[290px]
                    items-center
                    justify-center
                    rounded-full
                    bg-primaryGreen
                    px-6
                    py-4
                    font-heading
                    text-sm
                    font-bold
                    text-white
                    shadow-xl
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:shadow-2xl
                    active:scale-95
                  "
                >
                  Mental Health
                </Link>
              </motion.div>
      
            </div>
      
            {/* BOTTOM STRIP */}
            <div
              className="
                absolute
                bottom-0
                left-0
                w-full
                overflow-hidden
                border-t
                border-white/10
                bg-black/20
                py-3
                backdrop-blur-md
              "
            >
      
              <div className="animate-marquee flex min-w-max items-center gap-8">
      
                <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-primaryOrange">
                  Surya Namaskar
                </span>
      
                <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-primaryGreen">
                  Wellness Journey
                </span>
      
                <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-primaryBlue">
                  Mindfulness
                </span>
      
                <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-primaryOrange">
                  Meditation Flow
                </span>
      
                <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-primaryGreen">
                  Breath & Harmony
                </span>
      
              </div>
      
            </div>
      
          </section>
    </>
  );
}

export default Hero;