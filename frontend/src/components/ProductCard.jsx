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
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="group overflow-hidden rounded-[28px] border border-white/20 bg-white/10 shadow-[0_24px_80px_rgba(24,16,10,0.18)] backdrop-blur-2xl"
    >
      <div className={`relative overflow-hidden bg-gradient-to-br ${product.accent} p-4`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.24),_transparent_45%)]" />
        <img
          src={product.image}
          alt={product.title}
          className="relative z-10 h-60 w-full cursor-pointer object-contain transition duration-500 group-hover:scale-105"
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
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/18"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => onBuyNow(product)}
            className="flex-1 rounded-full bg-gradient-to-r from-[#E8651A] to-[#f1a15d] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(232,101,26,0.3)] transition duration-300 hover:-translate-y-0.5"
          >
            Buy Now
          </button>
          <button
            type="button"
            onClick={() => onToggleWishlist?.(product)}
            className="rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Toggle wishlist"
          >
            {isWishlisted ? <FaHeart className="text-rose-300" /> : <FaRegHeart />}
          </button>
          <button
            type="button"
            onClick={() => onPreview?.(product)}
            className="rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Preview product"
          >
            <FaPlay />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
