import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";
import { FaHeart, FaRegHeart, FaLock, FaPlay } from "react-icons/fa6";

function Rating({ value }) {
  const stars = Array.from({ length: 5 }, (_, index) => index < Math.round(value));

  return (
    <div className="flex items-center gap-1 text-amber-300">
      {stars.map((filled, index) => (
        <FaStar key={index} className={filled ? "text-amber-300" : "text-white/25"} />
      ))}
      <span className="ml-1 text-xs font-semibold text-white/70">{value.toFixed(1)}</span>
    </div>
  );
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
  onOpenDetails,
  onToggleWishlist,
  isWishlisted,
  onPreview,
}) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-[24px]"
    >
      <div className={`relative overflow-hidden bg-gradient-to-br ${product.accent} p-4`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.24),_transparent_45%)]" />
        <img
          src={product.image}
          alt={product.title}
          className="relative z-10 h-60 w-full cursor-pointer object-contain transition duration-500 ease-out group-hover:scale-105"
          onClick={onOpenDetails}
        />
        <div className="absolute left-4 top-4 z-20 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
          {product.category}
        </div>
        {product.premium && (
          <div className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
            <FaLock className="mr-1 inline" /> Premium
          </div>
        )}
      </div>

      <div className="space-y-4 p-5 text-slate-100">
        <div className="space-y-2">
          <h3
            className="cursor-pointer text-xl font-semibold text-white"
            onClick={onOpenDetails}
          >
            {product.title}
          </h3>
          <p className="text-sm leading-6 text-white/70">{product.description}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-2xl font-bold text-amber-200">{formatPrice(product.price)}</span>
          <Rating value={product.rating} />
        </div>

        <div className="flex items-center justify-between text-xs font-medium text-white/60">
          <span>{product.reviews} reviews</span>
          <span className="rounded-full bg-white/10 px-3 py-1">{product.category}</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onAddToCart(product)}
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/18"
          >
            Add to Cart
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onBuyNow(product)}
            className="flex-1 rounded-full bg-gradient-to-r from-[#E27229] to-[#d5631c] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(226,114,41,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(226,114,41,0.25)]"
          >
            Buy Now
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onToggleWishlist?.(product)}
            className="rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Toggle wishlist"
          >
            {isWishlisted ? <FaHeart className="text-rose-300" /> : <FaRegHeart />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onPreview?.(product)}
            className="rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Preview product"
          >
            <FaPlay />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
