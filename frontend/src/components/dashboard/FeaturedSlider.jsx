import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiLock, FiPlay, FiHeart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { featuredSessions } from "../../data/wellnessData";

// ─── Section header ────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <p className="text-label">{eyebrow}</p>
        <h2 className="mt-1 text-section-heading">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ─── Session Card ──────────────────────────────────────────────────────────
function SessionCard({ session, onOpenDetails, onToggleWishlist, onPreview, wishlisted }) {
  return (
    <motion.article
      whileHover={{ y: -7, scale: 1.015 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/60 bg-wellness-cream2 shadow-card"
    >
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={session.image}
          alt={session.title}
          className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-110"
          onClick={() => onOpenDetails?.(session)}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-transparent to-transparent" />

        {/* Premium / Free badge */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-wellness-dark backdrop-blur-sm">
          {session.premium ? (
            <><FiLock className="text-wellness-orange text-[0.65rem]" /> Premium</>
          ) : (
            <span className="text-wellness-green">✓ Included</span>
          )}
        </div>

        {/* Duration badge */}
        <div className="absolute right-4 top-4 rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
          {session.duration} min
        </div>

        {/* Wishlist heart */}
        <button
          type="button"
          onClick={() => onToggleWishlist?.(session)}
          aria-label={wishlisted ? "Remove from saved" : "Save session"}
          className={[
            "absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full transition",
            wishlisted
              ? "bg-wellness-orange text-white shadow-glow2"
              : "bg-white/75 text-wellness-muted hover:bg-white hover:text-wellness-orange",
          ].join(" ")}
        >
          <FiHeart className={["text-sm", wishlisted ? "fill-white" : ""].join(" ")} />
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-14 left-4 right-14">
          <p className="font-heading text-base font-bold text-white leading-snug">
            {session.title}
          </p>
          <p className="mt-0.5 text-xs text-white/80">with {session.instructor}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="space-y-3.5 px-4 py-4">
        <p className="text-sm leading-6 text-wellness-muted line-clamp-2">{session.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {session.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-wellness-greenLight px-2.5 py-1 text-xs font-semibold text-wellness-green"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => onPreview?.(session)}
            className="flex-1 rounded-full border border-wellness-border bg-white/80 px-4 py-2.5 text-xs font-semibold text-wellness-dark transition hover:bg-white hover:shadow-liftSm"
          >
            <FiPlay className="mr-1.5 inline text-wellness-orange" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => onOpenDetails?.(session)}
            className="rounded-full bg-btn-primary px-4 py-2.5 text-xs font-semibold text-white shadow-glow2 transition hover:-translate-y-0.5"
          >
            Start
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Exported Component ────────────────────────────────────────────────────
export default function FeaturedSlider({
  items = featuredSessions,
  onOpenDetails,
  onToggleWishlist,
  onPreview,
  isWishlisted = () => false,
}) {
  const [swiper, setSwiper] = useState(null);

  return (
    <motion.section
      id="meditate"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className="wellness-section"
    >
      <SectionHeader eyebrow="Featured" title="Popular on YogaWoman">
        <div className="flex gap-2">
          {[
            { action: () => swiper?.slidePrev(), icon: FiChevronLeft, label: "Previous" },
            { action: () => swiper?.slideNext(), icon: FiChevronRight, label: "Next" },
          ].map(({ action, icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={action}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-wellness-border bg-white/70 text-wellness-dark transition hover:bg-white hover:shadow-liftSm"
            >
              <Icon className="text-base" />
            </button>
          ))}
        </div>
      </SectionHeader>

      <Swiper
        onSwiper={setSwiper}
        spaceBetween={16}
        slidesPerView={1.08}
        breakpoints={{
          640:  { slidesPerView: 1.6  },
          1024: { slidesPerView: 2.2  },
          1280: { slidesPerView: 2.85 },
          1536: { slidesPerView: 3.3  },
        }}
      >
        {items.map((session) => (
          <SwiperSlide key={session.id}>
            <SessionCard
              session={session}
              onOpenDetails={onOpenDetails}
              onToggleWishlist={onToggleWishlist}
              onPreview={onPreview}
              wishlisted={isWishlisted(session.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}
