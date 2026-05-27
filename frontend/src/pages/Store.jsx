// src/pages/Store.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Heart, Eye, Trash2, Plus, Minus, Search, X, 
  Star, AlertCircle, ShoppingCart, SlidersHorizontal, Sparkles, 
  ChevronLeft, ChevronRight, Check, Lock, ArrowRight, ArrowUpDown
} from "lucide-react";
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
  
  // Filtering & Sorting State
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(10000); // Max budget
  const [selectedGoal, setSelectedGoal] = useState("All");
  const [proOnly, setProOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular"); // popular, low-to-high, high-to-low, rating
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Search Autocomplete State
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem("recent_searches");
      return saved ? JSON.parse(saved) : ["Mat", "Singing Bowl", "Amethyst", "Incense"];
    } catch {
      return ["Mat", "Singing Bowl", "Amethyst", "Incense"];
    }
  });

  // UI States
  const [cartOpen, setCartOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [particles, setParticles] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  
  // Hero slides data
  const heroSlides = [
    {
      badge: "Alchemical Healing Rituals",
      title: "Harmonize Your Inner Sanctuary",
      desc: "Immerse yourself in vibrational frequencies and pure aromatherapy designed to align your chakras and clear negative energy fields.",
      cta: "Explore Healing Kits",
      tag: "crystal-aura",
      image: "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?auto=format&fit=crop&q=80&w=800",
      accent: "from-[#2A1A30] via-[#1A1E2E] to-[#122A1E]",
      btnClass: "bg-gradient-to-r from-[#FF9A57] to-[#D6A756] text-[#0B1220]"
    },
    {
      badge: "Signature Yoga Essentials",
      title: "Prana-Enhancing Jute Mats",
      desc: "100% natural, biodegradable jute fiber mats etched with alignment markers. Engineered to support your daily flow with zero slip.",
      cta: "Shop Yoga Essentials",
      tag: "yoga-essentials",
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800",
      accent: "from-[#102418] via-[#1A1E2E] to-[#2B1F1A]",
      btnClass: "bg-[#00C875] text-[#0B1220]"
    },
    {
      badge: "Limited Edition Combos",
      title: "Ultimate Sanctuary Meditation Kit",
      desc: "Everything you need to manifest stillness. Combine organic zafu cushions, sandalwood incense, and amethyst clusters in one ritual.",
      cta: "View Collection",
      tag: "combo-wellness-bundles",
      image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800",
      accent: "from-[#251D18] via-[#1E2622] to-[#0B1220]",
      btnClass: "bg-gradient-to-r from-[#D6A756] to-[#00C875] text-[#0B1220]"
    }
  ];

  // Fetch products and categories
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);

        const transformedProducts = (productsResponse.products || []).map((product) => ({
          id: product.id,
          title: product.name,
          description: product.description,
          price: product.price,
          oldPrice: product.old_price || Math.round(product.price * 1.2),
          discount: product.discount || 15,
          image: product.image_url,
          category: product.categories?.name || "Wellness",
          accent: "from-[#1B2A1F] via-[#2E4735] to-[#E8651A]",
          rating: product.rating || 4.8,
          reviews: product.reviews || 120,
          premium: product.is_featured,
          slug: product.slug,
          stock: product.stock || 12,
          goals: product.slug.includes("mat") || product.slug.includes("block") 
            ? ["Physical Balance"] 
            : product.slug.includes("amethyst") || product.slug.includes("crystal")
            ? ["Aura Cleansing", "Chakra Alignment"]
            : product.slug.includes("singing") || product.slug.includes("cushion")
            ? ["Stress Relief", "Chakra Alignment"]
            : ["Stress Relief"]
        }));

        const transformedCategories = [
          "All",
          ...(categoriesResponse.categories || []).map((c) => c.name),
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

  // Slide rotation for Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Generate background particles
  useEffect(() => {
    const list = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 6,
      duration: Math.random() * 20 + 15,
    }));
    setParticles(list);
  }, []);

  // Post-login action resume
  useEffect(() => {
    if (location.state?.actionPending && auth.isAuthenticated) {
      try {
        const action = JSON.parse(location.state.actionPending);
        if (action.type === "buy-now") {
          // Clear location state
          window.history.replaceState({}, document.title);
          setTimeout(() => {
            const product = products.find(p => p.id === action.productId);
            if (product) {
              addToCart(product);
              navigate("/checkout");
            }
          }, 600);
        } else if (action.type === "checkout") {
          window.history.replaceState({}, document.title);
          setTimeout(() => {
            navigate("/checkout");
          }, 600);
        }
      } catch (e) {
        console.error("Failed to parse actionPending state", e);
      }
    }
  }, [location.state, auth.isAuthenticated, products, addToCart, navigate]);

  // Handle Search input enter
  const handleSearchSubmit = (term) => {
    const cleaned = term.trim();
    if (!cleaned) return;
    setSearch(cleaned);
    setRecentSearches(prev => {
      const filtered = prev.filter(x => x.toLowerCase() !== cleaned.toLowerCase());
      const updated = [cleaned, ...filtered].slice(0, 5);
      localStorage.setItem("recent_searches", JSON.stringify(updated));
      return updated;
    });
    setSearchFocused(false);
  };

  // Autocomplete Suggestions
  const searchSuggestions = useMemo(() => {
    if (!search.trim()) return [];
    const query = search.toLowerCase();
    return products
      .filter(p => p.title.toLowerCase().includes(query))
      .slice(0, 5);
  }, [search, products]);

  // AI Personalized Recommendations Picker (curates 3 products based on user settings/habits)
  const aiRecommendedProducts = useMemo(() => {
    if (!products.length) return [];
    // User goals if logged in, else mock priorities
    const focusGoals = dashboardState?.profile?.focus_areas || ["Stress Relief", "Physical Balance"];
    
    // Pick products matching these goals or marked premium/featured
    return products
      .filter(p => p.premium || p.goals.some(g => focusGoals.includes(g)))
      .slice(0, 3);
  }, [products, dashboardState]);

  // Main Products Filter logic
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];
    const query = search.trim().toLowerCase();

    return products.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch = !query || p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
      const matchPrice = p.price <= priceRange;
      const matchGoal = selectedGoal === "All" || p.goals.includes(selectedGoal);
      const matchPro = !proOnly || p.premium;

      return matchCategory && matchSearch && matchPrice && matchGoal && matchPro;
    }).sort((a, b) => {
      if (sortBy === "low-to-high") return a.price - b.price;
      if (sortBy === "high-to-low") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews; // popular default
    });
  }, [products, search, activeCategory, priceRange, selectedGoal, proOnly, sortBy]);

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
      toast.showToast({ 
        type: "info", 
        title: "Sign In Required", 
        message: "Please sign in to proceed with checkout." 
      });
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
    
    if (!auth.isAuthenticated) {
      toast.showToast({
        type: "info",
        title: "Authentication Required",
        message: "Please log in to add items to your cart.",
      });
      navigate("/login", {
        state: { returnTo: "/store" }
      });
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
      toast.showToast({ 
        type: "info", 
        title: "Sign In Required", 
        message: "Sign in to complete your checkout." 
      });
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
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] pb-24 relative overflow-hidden select-none font-body">
      
      {/* ─── Ambient Glow Blobs ─── */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#00C875]/5 via-[#1A2A22]/2 to-transparent pointer-events-none" />
      <div className="absolute top-80 right-0 w-[450px] h-[450px] bg-[#D6A756]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[800px] left-10 w-[350px] h-[350px] bg-[#FF9A57]/3 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#D6A756]/15"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              bottom: "-10px",
            }}
            animate={{
              y: ["0px", "-1100px"],
              opacity: [0, 0.6, 0],
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

      {/* ─── Premium Sticky Sub-Header ─── */}
      <nav className="sticky top-0 z-30 bg-[#0B1220]/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#00C875] to-[#D6A756] flex items-center justify-center shadow-lg">
              <ShoppingBag size={20} className="text-[#0B1220]" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[#D6A756] font-bold uppercase leading-none">YogaWomans</p>
              <h2 className="text-base font-bold text-[#F7F3EC] font-heading mt-0.5">Alchemical Marketplace</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Filters Trigger */}
            <button 
              onClick={() => setShowFiltersPanel(prev => !prev)}
              className={`hidden md:flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs font-bold transition-all ${showFiltersPanel ? "bg-[#D6A756] text-[#0B1220] border-transparent" : "bg-white/5 hover:bg-white/10"}`}
            >
              <SlidersHorizontal size={14} /> Filters
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative h-11 w-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#F8FAFC] hover:bg-white/10 transition"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-[#FF9A57] text-white text-[9px] font-bold flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero Cinematic Banner Carousel ─── */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mt-6">
        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent h-[440px] md:h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 bg-gradient-to-br ${heroSlides[activeSlide].accent} flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8`}
            >
              {/* Left Column Text */}
              <div className="flex-1 space-y-4 text-left max-w-xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#FF9A57] uppercase">
                  <Sparkles size={11} className="text-[#D6A756]" /> {heroSlides[activeSlide].badge}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-[#F7F3EC] leading-tight">
                  {heroSlides[activeSlide].title}
                </h1>
                <p className="text-xs md:text-sm text-[#B8C1CC] leading-relaxed">
                  {heroSlides[activeSlide].desc}
                </p>
                <div className="pt-4 flex gap-4">
                  <button 
                    onClick={() => {
                      setActiveCategory(heroSlides[activeSlide].tag === "crystal-aura" ? "Crystal & Aura" : heroSlides[activeSlide].tag === "yoga-essentials" ? "Yoga Essentials" : "Combo Wellness Bundles");
                      const target = document.getElementById("products-catalog");
                      if (target) target.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition hover:scale-105 ${heroSlides[activeSlide].btnClass}`}
                  >
                    {heroSlides[activeSlide].cta}
                  </button>
                </div>
              </div>

              {/* Right Column Image */}
              <div className="hidden md:block w-[380px] h-[320px] rounded-3xl overflow-hidden shadow-heroCard border border-white/10 relative group">
                <img 
                  src={heroSlides[activeSlide].image} 
                  alt="banner" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/40 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${activeSlide === i ? "w-6 bg-[#D6A756]" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Search & AI recommendations section ─── */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Search Experience */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 backdrop-blur-md focus-within:border-[#D6A756]/50 transition-colors">
              <Search size={18} className="text-white/45" />
              <input
                type="text"
                placeholder="Search products, crystals, mats, tea..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(search)}
                className="w-full bg-transparent text-sm text-[#F8FAFC] outline-none placeholder:text-white/35 font-medium"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-white/45 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Suggestions Panel */}
            <AnimatePresence>
              {searchFocused && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSearchFocused(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-[#0B1220] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 overflow-hidden backdrop-blur-xl p-4 space-y-4 text-left"
                  >
                    {searchSuggestions.length > 0 ? (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#D6A756] mb-2">Instant Matches</h4>
                        <div className="space-y-1.5">
                          {searchSuggestions.map(p => (
                            <button
                              key={p.id}
                              onClick={() => {
                                setPreviewProduct(p);
                                setSearchFocused(false);
                              }}
                              className="w-full flex items-center justify-between rounded-lg hover:bg-white/5 p-2 text-xs font-semibold text-[#F7F3EC] transition"
                            >
                              <span>{p.title}</span>
                              <span className="text-[#00C875]">{formatPrice(p.price)}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#FF9A57] mb-2">Trending Searches</h4>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map(term => (
                          <button
                            key={term}
                            onClick={() => {
                              setSearch(term);
                              handleSearchSubmit(term);
                            }}
                            className="text-xs bg-white/5 border border-white/5 hover:border-white/20 text-[#B8C1CC] hover:text-white rounded-full px-3.5 py-1.5 transition"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* AI Recommendations Banner */}
        <div className="rounded-3xl border border-[#D6A756]/20 bg-gradient-to-br from-[#0B1220] via-[#1E2620] to-[#0B1220] p-6 shadow-glass flex items-center gap-4 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C875]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="h-12 w-12 rounded-full bg-[#D6A756]/15 flex items-center justify-center text-[#D6A756] flex-shrink-0">
            <Sparkles size={22} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[8px] font-black uppercase tracking-widest bg-[#D6A756]/15 border border-[#D6A756]/20 px-2 py-0.5 rounded text-[#D6A756]">AI Recommended</span>
            <h4 className="text-sm font-bold text-[#F7F3EC] mt-1.5">Personalized Wellness Assistant</h4>
            <p className="text-[11px] text-[#B8C1CC]/80 mt-1">Discover healing tools tailored to your daily meditation goals and aura.</p>
          </div>
        </div>
      </section>

      {/* ─── AI Recommended Products Section ─── */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mt-12 text-left">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles size={20} className="text-[#D6A756]" />
          <h2 className="text-2xl font-bold font-heading text-[#F7F3EC]">AI Personalized Recommendations</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiRecommendedProducts.map((prod) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group rounded-3xl bg-gradient-to-br from-[#121E19] to-[#0B1220] border border-[#00C875]/20 p-5 shadow-[0_12px_40px_rgba(0,200,117,0.03)] flex flex-col justify-between hover:border-[#00C875]/50 transition-all duration-300"
            >
              <div className="absolute top-4 left-4 z-10 rounded-full bg-gradient-to-r from-[#00C875] to-[#D6A756] px-3 py-1 text-[8px] font-extrabold tracking-widest text-[#050816] uppercase shadow-md flex items-center gap-1">
                <Sparkles size={8} fill="currentColor" /> AI Best Pick
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(prod)}
                className={`absolute top-4 right-4 z-10 h-8 w-8 rounded-full flex items-center justify-center border transition backdrop-blur-md ${
                  isWishlisted(prod.id)
                    ? "bg-[#FF9A57]/20 border-[#FF9A57]/40 text-[#FF9A57]"
                    : "bg-black/40 border-white/10 text-white/70 hover:text-white"
                }`}
              >
                <Heart size={13} fill={isWishlisted(prod.id) ? "currentColor" : "none"} />
              </button>

              {/* Image */}
              <div className="relative h-48 rounded-2xl bg-black/40 overflow-hidden border border-white/5 flex items-center justify-center">
                {prod.image ? (
                  <img src={prod.image} alt={prod.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-4xl">🧘</span>
                )}
                {/* Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => setPreviewProduct(prod)} className="h-10 w-10 rounded-full bg-white text-[#0B1220] flex items-center justify-center shadow-lg hover:scale-110 transition">
                    <Eye size={16} />
                  </button>
                  <button onClick={() => handleAddToCart(prod)} className="h-10 w-10 rounded-full bg-[#00C875] text-[#0B1220] flex items-center justify-center shadow-lg hover:scale-110 transition">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-[#D6A756] uppercase tracking-wider">{prod.category}</span>
                  <h3 className="font-bold text-base mt-1 text-[#F7F3EC] truncate">{prod.title}</h3>
                  <p className="text-[11px] text-[#B8C1CC] mt-1.5 line-clamp-2 leading-relaxed">{prod.description}</p>
                </div>

                <div className="mt-4 border-t border-white/5 pt-3.5 flex items-center justify-between">
                  <span className="text-base font-black text-[#F8FAFC]">{formatPrice(prod.price)}</span>
                  <button
                    onClick={() => handleBuyNow(prod)}
                    className="rounded-full bg-[#00C875]/10 border border-[#00C875]/20 hover:bg-[#00C875] hover:text-[#0B1220] hover:border-transparent px-4 py-2 text-xs font-bold transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Filters Panel (Collapsible) ─── */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mt-12 text-left">
        <AnimatePresence>
          {showFiltersPanel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border border-white/5 bg-white/[0.01] rounded-3xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {/* Budget slider */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D6A756]">Max Budget</label>
                <div className="pt-2">
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D6A756]"
                  />
                  <div className="flex justify-between text-xs text-[#B8C1CC] mt-2 font-medium">
                    <span>Min: ₹500</span>
                    <span className="text-[#F7F3EC] font-bold">Max: {formatPrice(priceRange)}</span>
                  </div>
                </div>
              </div>

              {/* Goal filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D6A756]">Spiritual Focus</label>
                <select
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-2.5 text-xs text-[#F7F3EC] outline-none"
                >
                  <option value="All">All Ritual Goals</option>
                  <option value="Stress Relief">Stress Relief & Calm</option>
                  <option value="Aura Cleansing">Aura Cleansing</option>
                  <option value="Physical Balance">Physical Balance & Asanas</option>
                  <option value="Chakra Alignment">Chakra Alignment</option>
                </select>
              </div>

              {/* Sorting */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#D6A756]">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3.5 py-2.5 text-xs text-[#F7F3EC] outline-none"
                >
                  <option value="popular">Popularity (Most Reviews)</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                  <option value="rating">Rating (Top Rated)</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="flex flex-col justify-end space-y-3 pb-1.5">
                <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-[#F7F3EC]">
                  <input
                    type="checkbox"
                    checked={proOnly}
                    onChange={(e) => setProOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-white/10 bg-black/40 text-[#D6A756] accent-[#D6A756]"
                  />
                  <span>Pro Member Exclusives Only 🔒</span>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Scroller */}
        <div className="flex flex-wrap gap-2.5" id="products-catalog">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#D6A756] text-[#0B1220] shadow-[0_4px_15px_rgba(214,167,86,0.3)]"
                  : "border border-white/10 bg-white/5 text-[#B8C1CC] hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Main Products Grid ─── */}
      <main className="px-6 md:px-12 max-w-[1440px] mx-auto mt-8 text-left">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-96 rounded-3xl bg-white/[0.01] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24 rounded-[30px] border border-dashed border-white/10 bg-white/[0.01] max-w-xl mx-auto mt-12">
            <AlertCircle className="mx-auto text-white/35 mb-4 animate-bounce" size={48} />
            <h3 className="font-bold text-lg text-[#F7F3EC]">No items found</h3>
            <p className="text-xs text-[#B8C1CC] mt-2 max-w-xs mx-auto leading-relaxed">
              We couldn't find items matches your active filter settings. Try expanding the price range or changing category.
            </p>
            <button 
              onClick={() => {
                setActiveCategory("All");
                setPriceRange(10000);
                setSelectedGoal("All");
                setProOnly(false);
                setSearch("");
              }}
              className="mt-6 text-xs text-[#D6A756] underline font-bold uppercase tracking-wider"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((prod) => (
              <motion.article
                key={prod.id}
                layout
                className="group relative rounded-[2rem] bg-white/[0.02] border border-white/[0.06] p-5 shadow-glass flex flex-col justify-between hover:border-[#D6A756]/30 hover:shadow-[0_12px_35px_rgba(214,167,86,0.08)] hover:-translate-y-1.5 transition-all duration-300"
              >
                {prod.premium && (
                  <div className="absolute top-4 left-4 z-20 rounded-full bg-gradient-to-r from-[#D6A756] to-[#FF9A57] px-3 py-1 text-[8px] font-extrabold tracking-widest text-[#050816] uppercase shadow-md flex items-center gap-1">
                    <Lock size={8} className="fill-[#050816]" /> Pro Exclusive
                  </div>
                )}

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(prod)}
                  className={`absolute top-4 right-4 z-20 h-9 w-9 rounded-full flex items-center justify-center border transition backdrop-blur-md ${
                    isWishlisted(prod.id)
                      ? "bg-[#FF9A57]/20 border-[#FF9A57]/40 text-[#FF9A57]"
                      : "bg-black/40 border-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  <Heart size={14} fill={isWishlisted(prod.id) ? "currentColor" : "none"} />
                </button>

                {/* Image */}
                <div className="relative h-56 rounded-2xl bg-gradient-to-br from-[#0B1220] via-[#1A2A22] to-[#1A1E2E] overflow-hidden border border-white/5 flex items-center justify-center">
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-5xl">🧘</div>
                  )}

                  <div className="absolute inset-0 bg-[#0B1220]/10 group-hover:bg-transparent transition duration-300" />
                  
                  {/* Actions overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setPreviewProduct(prod)}
                      className="h-11 w-11 rounded-full bg-white text-[#050816] flex items-center justify-center shadow-lg hover:scale-110 transition"
                      title="Quick Preview"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleAddToCart(prod)}
                      className="h-11 w-11 rounded-full bg-[#00C875] text-[#050816] flex items-center justify-center shadow-lg hover:scale-110 transition"
                      title="Add to Basket"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-[#D6A756] uppercase tracking-wider">
                        {prod.category}
                      </span>
                      {prod.discount > 0 && (
                        <span className="text-[10px] text-[#00C875] font-black">{prod.discount}% OFF</span>
                      )}
                    </div>
                    
                    <h3 
                      onClick={() => navigate(`/shop/${prod.slug}`)}
                      className="font-bold text-base mt-1 text-[#F7F3EC] group-hover:text-white transition duration-200 cursor-pointer hover:underline"
                    >
                      {prod.title}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex text-[#D6A756]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} fill={i < Math.round(prod.rating) ? "currentColor" : "none"} className="mr-0.5" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-[#B8C1CC]/80">({prod.reviews} Reviews)</span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-white/5 pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-base font-black text-[#F8FAFC]">{formatPrice(prod.price)}</span>
                      {prod.oldPrice && (
                        <span className="text-[10px] text-[#B8C1CC] line-through font-medium mt-0.5">
                          {formatPrice(prod.oldPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleBuyNow(prod)}
                      className="rounded-full bg-white/5 border border-white/10 hover:bg-[#D6A756] hover:text-[#050816] hover:border-transparent px-5.5 py-2 text-xs font-bold transition-all duration-300"
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

      {/* ─── Social Proof & Testimonials ─── */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mt-24 border-t border-white/5 pt-16 text-left">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#D6A756] uppercase">Transformations</span>
          <h2 className="text-3xl font-heading font-extrabold text-[#F7F3EC]">Ritual Success Stories</h2>
          <p className="text-xs text-[#B8C1CC]">Read emotional and spiritual transformation reviews from yogis across the world.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote: "The Amethyst Clusters Sound Bath Kit transformed my evening routine. It brings an instant sense of grounding and chakra alignment that washes away stress.",
              user: "Priya Sharma",
              role: "Yoga Practitioner",
              rating: 5
            },
            {
              quote: "The Eco-Grip Mat has changed my asanas entirely. I no longer slip during hot vinyasa. The alignment markings are incredibly helpful for posturing.",
              user: "Samantha Vance",
              role: "Vinyasa Coach",
              rating: 5
            },
            {
              quote: "Mysore Sandalwood Incense fills my room with premium spirituality. It feels like an ancient temple. Truly a premium sanctuary essential.",
              user: "Ananya Iyer",
              role: "Meditation Teacher",
              rating: 5
            }
          ].map((item, i) => (
            <div key={i} className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 space-y-4 shadow-glass backdrop-blur-xl">
              <div className="flex text-[#D6A756]">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-[#B8C1CC] leading-relaxed italic">"{item.quote}"</p>
              <div className="border-t border-white/5 pt-4">
                <h5 className="text-xs font-bold text-[#F7F3EC]">{item.user}</h5>
                <span className="text-[10px] text-[#D6A756] font-semibold">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Cart Drawer Overlay ─── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-[#0B1220] border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col justify-between text-left"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-[#0B1220]/50 backdrop-blur-md">
                <div>
                  <h2 className="text-lg font-bold text-[#F7F3EC] font-heading">Your Wellness Basket</h2>
                  <p className="text-[10px] uppercase tracking-widest text-[#B8C1CC] mt-0.5">{cartCount} Items Selected</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 flex gap-4">
                      <div className="h-20 w-20 rounded-xl bg-[#0B1220] border border-white/5 overflow-hidden flex items-center justify-center flex-shrink-0">
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
                            <p className="text-[10px] text-[#D6A756] uppercase tracking-wider font-semibold mt-0.5">
                              {formatPrice(item.products?.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/40 hover:text-rose-400 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center rounded-full border border-white/10 bg-black/20">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1.5 text-white/60 hover:text-white"
                            >
                              <Minus size={9} />
                            </button>
                            <span className="px-2 text-xs font-bold text-[#F7F3EC]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1.5 text-white/60 hover:text-white"
                            >
                              <Plus size={9} />
                            </button>
                          </div>
                          <span className="text-sm font-extrabold text-[#D6A756]">
                            {formatPrice((item.products?.price || 0) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                    <span className="text-4xl mb-3">🧘</span>
                    <h4 className="font-bold text-sm text-[#F7F3EC]">Your cart is empty</h4>
                    <p className="text-xs text-[#B8C1CC] max-w-[200px] mt-1.5 mx-auto leading-relaxed">
                      Add wellness tools to start your daily rituals and sound baths.
                    </p>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-white/10 p-6 bg-[#0B1220]/80 backdrop-blur-md">
                <div className="flex justify-between items-center text-xs text-[#B8C1CC] mb-4">
                  <span>Subtotal</span>
                  <span className="text-base font-extrabold text-[#F8FAFC]">{formatPrice(cartTotal)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full rounded-full bg-gradient-to-r from-[#D6A756] to-[#00C875] text-[#050816] py-4 text-xs font-extrabold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="relative w-full max-w-2xl bg-[#0B1220] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden z-10 flex flex-col md:flex-row text-left"
            >
              {/* Close */}
              <button
                onClick={() => setPreviewProduct(null)}
                className="absolute right-4 top-4 z-20 h-9 w-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition"
              >
                <X size={16} />
              </button>

              {/* Left Column: Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-[#050816] to-[#1A2A22] border-r border-white/5 flex items-center justify-center overflow-hidden">
                {previewProduct.image ? (
                  <img src={previewProduct.image} alt={previewProduct.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-7xl">🧘</div>
                )}
              </div>

              {/* Right Column: Info */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D6A756]/10 border border-[#D6A756]/20 px-2.5 py-1 text-[8px] font-bold text-[#D6A756] uppercase tracking-wider">
                    {previewProduct.category}
                  </div>
                  
                  <h3 
                    onClick={() => {
                      navigate(`/shop/${previewProduct.slug}`);
                      setPreviewProduct(null);
                    }}
                    className="font-heading font-bold text-2xl text-[#F7F3EC] mt-3 hover:underline cursor-pointer"
                  >
                    {previewProduct.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xl font-black text-[#F8FAFC]">
                      {formatPrice(previewProduct.price)}
                    </span>
                    <span className="text-xs text-[#00C875] font-semibold">
                      In Stock ({previewProduct.stock} Left)
                    </span>
                  </div>

                  <p className="text-xs text-[#B8C1CC] mt-4 leading-relaxed line-clamp-4">
                    {previewProduct.description}
                  </p>

                  <div className="mt-6 border-t border-white/5 pt-4 space-y-2">
                    <h5 className="text-[9px] font-bold text-[#D6A756] uppercase tracking-wider">Spiritual Alignment</h5>
                    <ul className="text-[10px] text-[#B8C1CC]/75 space-y-1">
                      <li>• Eco-friendly, biodegradeable, carbon-neutral</li>
                      <li>• Clean with warm water and soft cloth</li>
                      <li>• Curated specifically for {previewProduct.goals?.join(", ")}</li>
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
                    className="flex-1 rounded-full bg-gradient-to-r from-[#D6A756] to-[#00C875] text-[#050816] py-3.5 text-xs font-extrabold uppercase tracking-widest transition hover:scale-105"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Floating Mobile Cart Button ─── */}
      <div className="fixed bottom-6 right-6 md:hidden z-30">
        <button
          onClick={() => setCartOpen(true)}
          className="relative h-14 w-14 rounded-full bg-gradient-to-tr from-[#D6A756] to-[#FF9A57] text-[#0B1220] flex items-center justify-center shadow-[0_10px_30px_rgba(214,167,86,0.3)] hover:scale-105 active:scale-95 transition"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-[#0B1220] border-2 border-[#D6A756] text-white text-[9px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

    </div>
  );
}
