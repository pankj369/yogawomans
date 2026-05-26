// src/pages/Store.jsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Eye, Trash2, Plus, Minus, Search, X, Award, Star, AlertCircle, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useDashboard } from "../context/DashboardContext";
import { useToast } from "../context/ToastContext";
import { getAllProducts, getAllCategories } from "../services/productService";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Store() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  
  const { cartItems, cartTotal, updateQuantity, removeFromCart, addToCart, cartCount } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { state: dashboardState } = useDashboard();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [particles, setParticles] = useState([]);

  // Fetch real store products
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);

        const transformedProducts = productsResponse.products.map((product) => ({
          id: product.id,
          title: product.name,
          description: product.description,
          price: product.price,
          image: product.image_url,
          category: product.categories?.name || "Wellness",
          accent: "from-[#1B2A1F] via-[#2E4735] to-[#E8651A]",
          rating: 4.8,
          reviews: 120,
          premium: product.is_featured,
          slug: product.slug,
          stock: product.stock,
        }));

        const transformedCategories = [
          "All",
          ...categoriesResponse.categories.map((c) => c.name),
        ];

        setProducts(transformedProducts);
        setCategories(transformedCategories);
      } catch (err) {
        console.error("Failed to load store products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, []);

  // Generate background particles
  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1.5,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 18 + 12,
    }));
    setParticles(list);
  }, []);

  // Post-login action resume
  useEffect(() => {
    if (location.state?.actionPending && auth.isAuthenticated) {
      try {
        const action = JSON.parse(location.state.actionPending);
        if (action.type === "buy-now") {
          // Clear location state to prevent repeating
          window.history.replaceState({}, document.title);
          setTimeout(() => {
            const product = products.find(p => p.id === action.productId);
            if (product) {
              addToCart(product);
              navigate("/checkout");
            }
          }, 600);
        }
      } catch (e) {
        console.error("Failed to parse actionPending state", e);
      }
    }
  }, [location.state, auth.isAuthenticated, products, addToCart, navigate]);

  // Filters products
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];
    const query = search.trim().toLowerCase();

    return products.filter((p) => {
      const matchCategory =
        activeCategory === "All" || p.category?.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch =
        !query ||
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query);

      return matchCategory && matchSearch;
    });
  }, [products, search, activeCategory]);

  const handleBuyNow = (product) => {
    if (product.premium && dashboardState?.activePlan !== "Pro") {
      toast.showToast({
        type: "warning",
        title: "Pro Membership Required",
        message: "This exclusive product requires a Pro Plan.",
      });
      navigate("/pricing");
      return;
    }

    if (!auth.isAuthenticated) {
      toast.showToast({ type: "info", title: "Sign In Required", message: "Please sign in to proceed with checkout." });
      navigate("/login", {
        state: {
          returnTo: "/store",
          actionPending: JSON.stringify({ type: "buy-now", productId: product.id }),
        },
      });
      return;
    }

    addToCart(product);
    navigate("/checkout");
  };

  const handleAddToCart = (product) => {
    if (product.premium && dashboardState?.activePlan !== "Pro") {
      toast.showToast({
        type: "warning",
        title: "Pro Membership Required",
        message: "This product is reserved for Pro members.",
      });
      navigate("/pricing");
      return;
    }
    addToCart(product);
    toast.showToast({
      type: "success",
      title: "Added to Cart 🛍️",
      message: `${product.title} has been added to your basket.`,
    });
  };

  const handleCheckout = () => {
    if (!auth.isAuthenticated) {
      toast.showToast({ type: "info", title: "Sign In Required", message: "Sign in to complete your checkout." });
      navigate("/login", {
        state: {
          returnTo: "/store",
          actionPending: JSON.stringify({ type: "checkout" }),
        },
      });
      return;
    }
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] pb-24 relative overflow-hidden select-none">
      
      {/* ─── Ambient Glow Blobs ─── */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#00C875]/4 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-40 right-20 w-[350px] h-[350px] bg-gradient-to-tr from-[#D6A756]/2 to-transparent rounded-full blur-[110px] pointer-events-none" />
      
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#D6A756]/25"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              bottom: "-10px",
            }}
            animate={{
              y: ["0px", "-1000px"],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ─── Header Sanctuary ─── */}
      <header className="pt-28 pb-12 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#D6A756]/10 border border-[#D6A756]/20 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.25em] text-[#D6A756] uppercase">
              <ShoppingBag size={12} /> Wellness Marketplace
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold font-heading text-[#F7F3EC]">
              Signature Sanctuary Store
            </h1>
            <p className="text-sm text-[#B8C1CC] max-w-xl font-medium">
              Pure copper bottles, incense kits, and luxury organic mats to craft your personal daily meditation space.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:max-w-md">
            {/* Search */}
            <div className="flex-1 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-md">
              <Search size={18} className="text-white/45" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-[#F8FAFC] outline-none placeholder:text-white/35 font-medium"
              />
            </div>
            
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition backdrop-blur-md"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-[#E8651A] text-white text-[10px] font-bold flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#D6A756] to-[#FF9A57] text-[#050816] shadow-[0_4px_15px_rgba(214,167,86,0.25)]"
                  : "border border-white/10 bg-white/5 text-[#B8C1CC] hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* ─── Main Products Grid ─── */}
      <main className="px-6 lg:px-12 max-w-[1440px] mx-auto">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-96 rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24 rounded-[30px] border border-dashed border-white/10 bg-white/[0.01]">
            <AlertCircle className="mx-auto text-white/35 mb-4" size={48} />
            <h3 className="font-bold text-lg text-[#F7F3EC]">No items found</h3>
            <p className="text-xs text-[#B8C1CC] mt-1 max-w-xs mx-auto">
              We couldn't find matches for your search. Try other categories.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((prod) => (
              <motion.article
                key={prod.id}
                layout
                className="group relative rounded-3xl bg-white/[0.03] border border-white/[0.06] p-5 shadow-glass flex flex-col justify-between hover:border-[#D6A756]/30 hover:shadow-[0_12px_35px_rgba(214,167,86,0.06)] hover:-translate-y-1.5 transition-all duration-300"
              >
                {prod.premium && (
                  <div className="absolute top-4 left-4 z-20 rounded-full bg-gradient-to-r from-[#D6A756] to-[#FF9A57] px-3 py-1 text-[8.5px] font-extrabold tracking-widest text-[#050816] uppercase shadow-md">
                    Pro Exclusive 🔒
                  </div>
                )}

                <button
                  onClick={() => toggleWishlist(prod.id)}
                  className={`absolute top-4 right-4 z-20 h-9 w-9 rounded-full flex items-center justify-center border transition backdrop-blur-md ${
                    isWishlisted(prod.id)
                      ? "bg-[#FF9A57]/20 border-[#FF9A57]/40 text-[#FF9A57]"
                      : "bg-black/40 border-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  <Heart size={14} fill={isWishlisted(prod.id) ? "currentColor" : "none"} />
                </button>

                {/* Thumbnail */}
                <div className="relative h-56 rounded-2xl bg-gradient-to-br from-[#0B1220] via-[#161F1A] to-[#1A1E2E] overflow-hidden border border-white/5 flex items-center justify-center">
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-5xl">🧘</div>
                  )}

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-300" />
                  
                  {/* Action Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setPreviewProduct(prod)}
                      className="h-11 w-11 rounded-full bg-white text-[#050816] flex items-center justify-center shadow-lg hover:scale-105 transition"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleAddToCart(prod)}
                      className="h-11 w-11 rounded-full bg-[#00C875] text-[#050816] flex items-center justify-center shadow-lg hover:scale-105 transition"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#D6A756] uppercase tracking-wider">
                      {prod.category}
                    </span>
                    <h3 className="font-bold text-base mt-1 text-[#F7F3EC] group-hover:text-white transition duration-200">
                      {prod.title}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex text-[#D6A756]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-[#B8C1CC]">(120 Reviews)</span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-white/5 pt-4 flex items-center justify-between">
                    <span className="text-base font-black text-[#F8FAFC]">
                      {formatPrice(prod.price)}
                    </span>
                    <button
                      onClick={() => handleBuyNow(prod)}
                      className="rounded-full bg-white/5 border border-white/10 hover:bg-[#D6A756] hover:text-[#050816] hover:border-transparent px-4 py-2 text-xs font-bold transition-all duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      {/* ─── Cart Drawer Overlay ─── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[400px] bg-[#0B1220] border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 bg-[#050816]/50">
                <div>
                  <h2 className="text-lg font-bold text-[#F7F3EC] font-heading">Your Sanctuary Cart</h2>
                  <p className="text-[10px] uppercase tracking-widest text-[#B8C1CC] mt-0.5">{cartCount} Items Selected</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 flex gap-4">
                      <div className="h-20 w-20 rounded-xl bg-white/5 border border-white/5 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {item.products?.image_url ? (
                          <img src={item.products.image_url} alt={item.title} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-3xl">🧘</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-sm truncate text-[#F7F3EC]">{item.title}</h4>
                            <p className="text-[10px] text-[#B8C1CC] mt-0.5">{formatPrice(item.products?.price)}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/40 hover:text-rose-400 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center rounded-full border border-white/10 bg-black/20">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-white/60 hover:text-white"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-2 text-xs font-bold text-[#F7F3EC]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-white/60 hover:text-white"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="text-xs font-extrabold text-[#D6A756]">
                            {formatPrice((item.products?.price || 0) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                    <span className="text-4xl mb-3">🛍️</span>
                    <h4 className="font-bold text-sm text-[#F7F3EC]">Your cart is empty</h4>
                    <p className="text-xs text-[#B8C1CC] max-w-[200px] mt-1 mx-auto leading-relaxed">
                      Add wellness tools to start your sanctuary journey.
                    </p>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-white/10 p-5 bg-[#050816]/50">
                <div className="flex justify-between items-center text-xs text-[#B8C1CC] mb-4">
                  <span>Subtotal</span>
                  <span className="text-base font-extrabold text-[#F8FAFC]">{formatPrice(cartTotal)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full rounded-full bg-gradient-to-r from-[#D6A756] to-[#FF9A57] text-[#050816] py-4 text-xs font-extrabold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── Quick Preview Modal ─── */}
      <AnimatePresence>
        {previewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewProduct(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0B1220] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden z-10 flex flex-col md:flex-row"
            >
              {/* Close */}
              <button
                onClick={() => setPreviewProduct(null)}
                className="absolute right-4 top-4 z-20 h-9 w-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white"
              >
                <X size={16} />
              </button>

              {/* Left Column: Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-[#050816] to-[#161F1A] border-r border-white/5 flex items-center justify-center overflow-hidden">
                {previewProduct.image ? (
                  <img src={previewProduct.image} alt={previewProduct.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-7xl">🧘</div>
                )}
              </div>

              {/* Right Column: Info */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D6A756]/10 border border-[#D6A756]/20 px-2.5 py-1 text-[8.5px] font-bold text-[#D6A756] uppercase tracking-wider">
                    {previewProduct.category}
                  </div>
                  
                  <h3 className="font-heading font-bold text-2xl text-[#F7F3EC] mt-3">
                    {previewProduct.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xl font-black text-[#F8FAFC]">
                      {formatPrice(previewProduct.price)}
                    </span>
                    <span className="text-xs text-[#00C875] font-semibold">
                      In Stock (Qty: {previewProduct.stock || 12})
                    </span>
                  </div>

                  <p className="text-xs text-[#B8C1CC] mt-4 leading-relaxed">
                    {previewProduct.description || "Crafted using premium organic fibers and eco-conscious dyes. Features anti-slip textured grip lines for perfect balance alignment during challenging asana configurations."}
                  </p>

                  <div className="mt-6 border-t border-white/5 pt-4 space-y-2">
                    <h5 className="text-[10px] font-bold text-[#D6A756] uppercase tracking-wider">Sanctuary Details</h5>
                    <ul className="text-[11px] text-[#B8C1CC]/75 space-y-1">
                      <li>• Eco-friendly, biodegradable materials</li>
                      <li>• Clean with warm water and damp cloth</li>
                      <li>• Includes 1-Year wellness guarantee</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => {
                      handleAddToCart(previewProduct);
                      setPreviewProduct(null);
                    }}
                    className="flex-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white py-3.5 text-xs font-bold transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      handleBuyNow(previewProduct);
                      setPreviewProduct(null);
                    }}
                    className="flex-1 rounded-full bg-[#00C875] hover:bg-[#00a862] text-[#050816] py-3.5 text-xs font-extrabold uppercase tracking-widest transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
