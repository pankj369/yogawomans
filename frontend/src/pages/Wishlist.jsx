// src/pages/Wishlist.jsx
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Trash2, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useDashboard } from "../context/DashboardContext";
import { useToast } from "../context/ToastContext";
import DashboardLayout from "../components/dashboard/DashboardLayout";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Wishlist() {
  const auth = useAuth();
  const toast = useToast();
  const { profile } = useDashboard();
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist, clearWishlist } = useWishlist();

  const userName = profile?.full_name || auth.user?.name || "Yogi";

  const handleAddToCart = (productObj) => {
    const item = productObj.products;
    if (!item) return;

    const formattedProduct = {
      id: productObj.product_id,
      title: item.name,
      price: item.price,
      image: item.image_url,
      premium: item.is_featured,
      slug: item.slug
    };

    addToCart(formattedProduct);
    toast.showToast({
      type: "success",
      title: "Added to Cart 🛍️",
      message: `${formattedProduct.title} added from your Wishlist.`
    });
  };

  const handleRemove = (productObj) => {
    // toggleWishlist expects an object with an id field matching the product_id
    toggleWishlist({
      id: productObj.product_id
    });
    toast.showToast({
      type: "info",
      title: "Removed from Wishlist",
      message: "Product removed from your saved list."
    });
  };

  return (
    <DashboardLayout userName={userName} title="Wishlist">
      <div className="mx-auto max-w-6xl space-y-8 text-left font-body">

        {/* Header Sanctuary */}
        <div className="rounded-[2rem] border border-white/5 bg-white/[0.01] p-8 shadow-glass backdrop-blur-xl space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#D6A756]">
            <Sparkles size={12} /> Saved Items
          </div>
          <h1 className="text-3xl font-heading font-extrabold text-[#F7F3EC]">
            Your Sacred Wishlist
          </h1>
          <p className="text-xs text-[#B8C1CC] max-w-md font-medium leading-relaxed">
            Keep track of the spiritual wellness tools, crystals, and yoga essentials that resonate with your practice.
          </p>
        </div>

        {wishlistItems.length ? (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {wishlistItems.map((item, index) => {
                  const prod = item.products;
                  if (!prod) return null;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.01] hover:border-[#D6A756]/20 shadow-glass transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden h-52 w-full bg-black/20 border-b border-white/5">
                        <img
                          src={prod.image_url}
                          alt={prod.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {prod.is_featured && (
                          <div className="absolute top-4 left-4 z-10 rounded-full bg-gradient-to-r from-[#D6A756] to-[#FF9A57] px-2.5 py-1 text-[8px] font-extrabold tracking-widest text-[#050816] uppercase shadow-md">
                            Pro Exclusive
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[9px] font-bold text-[#D6A756] uppercase tracking-wider">
                            {prod.category || "Wellness"}
                          </span>
                          
                          <h2 className="text-base font-bold text-[#F7F3EC] group-hover:text-white transition-colors truncate">
                            {prod.name}
                          </h2>

                          <p className="text-xs text-[#B8C1CC]/80 leading-relaxed line-clamp-2">
                            {prod.description}
                          </p>

                          <div className="flex justify-between items-center pt-2">
                            <span className="text-sm font-black text-[#F8FAFC]">
                              {formatPrice(prod.price)}
                            </span>
                            <span className="text-[10px] text-[#B8C1CC] font-bold">
                              ★ {prod.rating || "4.8"}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="border-t border-white/5 pt-4 space-y-2.5">
                          <button
                            type="button"
                            onClick={() => handleAddToCart(item)}
                            className="w-full rounded-full bg-[#00C875] hover:bg-[#00b064] text-[#050816] py-3 text-xs font-extrabold uppercase tracking-widest transition flex items-center justify-center gap-1.5"
                          >
                            <ShoppingCart size={13} /> Add to Cart
                          </button>

                          <div className="flex justify-between items-center text-xs">
                            <Link
                              to={`/shop/${prod.slug}`}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D6A756] hover:underline"
                            >
                              View details <ArrowRight size={12} />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleRemove(item)}
                              className="text-white/40 hover:text-rose-400 font-bold transition flex items-center gap-1"
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Clear All Option */}
            <div className="pt-2">
              <button
                type="button"
                onClick={clearWishlist}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#B8C1CC] hover:bg-white/10 hover:text-white transition"
              >
                Clear All Wishlist
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-[2.5rem] border border-dashed border-white/10 bg-white/[0.01] p-16 text-center max-w-xl mx-auto space-y-4">
            <AlertCircle className="mx-auto text-white/35" size={48} />
            <h3 className="text-lg font-bold text-[#F7F3EC]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#B8C1CC] max-w-xs mx-auto leading-relaxed">
              Explore our alchemical marketplace to discover sacred crystals, singing bowls, and yoga tools to seed your list.
            </p>
            <div className="pt-4">
              <Link to="/store" className="inline-flex rounded-full bg-gradient-to-r from-[#D6A756] to-[#00C875] text-[#050816] px-6 py-3 text-xs font-extrabold uppercase tracking-widest transition hover:scale-105">
                Browse Marketplace
              </Link>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}