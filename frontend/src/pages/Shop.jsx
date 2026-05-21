import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaMinus, FaPlus, FaSearch, FaShoppingBag, FaTimes, FaTrash, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import navlogo from "../assets/images/navlogo.png";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useDashboard } from "../context/DashboardContext";
import { useWishlist } from "../context/WishlistContext";
import {
  getAllProducts,
  getAllCategories,
} from "../services/productService";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function ShopNavbar({ onToggleCart, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Classes", href: "/#classes" },
    { label: "Shop", href: "/shop" },
    { label: "Auth", href: "/auth" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1812]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[92rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={navlogo}
            alt="logo"
            className="h-10 w-auto object-contain"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-white/55">Luxury Wellness</p>
            <h1 className="text-lg font-semibold text-white">YOGAWOMANS Shop</h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/wishlist"
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
            aria-label="Go to wishlist"
          >
            <FaHeart />
          </Link>

          <button
            type="button"
            onClick={onToggleCart}
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
            aria-label="Open cart"
          >
            <FaShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E8651A] px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="mx-auto max-w-[92rem] space-y-2 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-white/80"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/20 bg-white/10 backdrop-blur-2xl">
      <div className="h-60 animate-pulse bg-gradient-to-br from-white/10 via-white/15 to-white/10" />
      <div className="space-y-4 p-5">
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-white/10" />
        <div className="h-7 w-4/5 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
        <div className="flex gap-3 pt-2">
          <div className="h-12 flex-1 animate-pulse rounded-full bg-white/10" />
          <div className="h-12 flex-1 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose }) {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const auth = useAuth();
  const navigate = useNavigate();

  const goCheckout = () => {
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart overlay"
            className="fixed inset-0 z-40 cursor-default bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            initial={{ x: 460, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 460, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-white/10 bg-[#101912]/95 text-white shadow-[0_36px_120px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Your Cart</p>
                <h2 className="mt-1 text-xl font-semibold">Wellness Basket</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {cartItems.length ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-[22px] border border-white/10 bg-white/5 p-4"
                    >
                      <img
                        src={item.products?.image_url}
                        alt={item.products?.name}
                        className="h-24 w-24 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="truncate font-semibold">{item.title}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">
                              {item.products?.category || "Wellness"}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/55 transition hover:text-rose-300"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-white/10 bg-black/15">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-2 text-white/75"
                            >
                              <FaMinus className="text-[11px]" />
                            </button>
                            <span className="min-w-9 px-2 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 text-white/75"
                            >
                              <FaPlus className="text-[11px]" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-amber-200">
                            {formatPrice((item.products?.price || 0) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full min-h-[240px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/15 bg-white/5 text-center">
                  <div className="text-4xl">🧘</div>
                  <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
                  <p className="mt-1 max-w-xs text-sm text-white/55">
                    Add your favorite wellness essentials to continue.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-5">
              <div className="flex items-center justify-between text-sm text-white/65">
                <span>Cart Total</span>
                <span className="text-lg font-semibold text-white">{formatPrice(cartTotal)}</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={goCheckout}
                className="mt-4 w-full rounded-full bg-gradient-to-r from-[#2F6B3B] to-[#E27229] px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:shadow-[0_12px_30px_rgba(226,114,41,0.2)] hover:-translate-y-0.5"
              >
                Proceed to Checkout
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={clearCart}
                className="mt-3 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/75"
              >
                Clear Cart
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Shop() {
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();
  const auth = useAuth();
  const toast = useToast();
  const { state: dashboardState } = useDashboard();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

const [categories, setCategories] = useState([]);

const [error, setError] = useState("");

useEffect(() => {

  const fetchShopData = async () => {

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
        ...categoriesResponse.categories.map((category) => category.name),
      ];



      setProducts(transformedProducts);

      setCategories(transformedCategories);

    } catch (error) {

      console.error(error);

      setError("Failed to load shop data");

    } finally {

      setLoading(false);
    }
  };



  fetchShopData();

}, []);

const filteredProducts = useMemo(() => {

  if (!products.length) return [];

  const query = search.trim().toLowerCase();

  return products.filter((product) => {

    const categoryMatch =
      category === "All" ||
      product.category?.toLowerCase() === category.toLowerCase();

    const searchMatch =
      !query ||
      product.title?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query);

    return categoryMatch && searchMatch;
  });

}, [products, search, category]);
  const handleBuyNow = (product) => {
    if (product.premium && dashboardState.activePlan !== "Pro") {
      navigate("/pricing");
      return;
    }
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(226,114,41,0.15),_transparent_40%),linear-gradient(180deg,#121a14_0%,#1a2a1d_40%,#f7f3ee_100%)] font-body text-white">
      <ShopNavbar onToggleCart={() => setCartOpen(true)} cartCount={cartCount} />

      <main className="mx-auto max-w-[92rem] px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.15)] backdrop-blur-[32px] lg:grid-cols-[1.15fr_0.85fr] lg:p-8 transition-all duration-500 hover:shadow-[0_40px_120px_rgba(0,0,0,0.2)]">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
              Curated wellness marketplace
            </div>
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Luxury yoga essentials for calm rituals and daily flow.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Discover premium mats, cushions, oils, decor, tea, and apparel designed to feel as serene as they look.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Premium Picks", value: "40+" },
                { label: "Warm Aesthetic", value: "Luxury" },
                { label: "Fast Checkout", value: "Secure" },
              ].map((item) => (
                <div key={item.label} className="rounded-[22px] border border-white/10 bg-white/8 p-4">
                  <div className="text-2xl font-semibold text-amber-200">{item.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/12 bg-[#18261b]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3">
              <FaSearch className="text-white/50" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products, rituals, accessories..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                    category === item
                      ? "bg-[#E27229] text-white shadow-[0_12px_30px_rgba(226,114,41,0.2)]"
                      : "border border-white/10 bg-white/5 text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Selected category</p>
              <p className="mt-2 text-xl font-semibold">{category}</p>
              <p className="mt-2 text-sm text-white/60">
                {filteredProducts.length} curated product{filteredProducts.length === 1 ? "" : "s"} available
              </p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-white/45">Shop the ritual</p>
              <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">Handpicked wellness essentials</h3>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/75 sm:inline-flex"
            >
              Open Cart
            </button>
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={(item) => {
                      addToCart(item);
                      setCartOpen(true);
                    }}
                    onBuyNow={handleBuyNow}
                    onOpenDetails={() => {
                      if (product.premium && dashboardState.activePlan !== "Pro") {
                        navigate("/pricing");
                        return;
                      }
                      navigate(`/shop/${product.slug}`);
                    }}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={isWishlisted(product.id)}
                    onPreview={(item) =>
                      toast.showToast({ title: item.title, message: item.description })
                    }
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <AnimatePresence>
        {cartOpen && <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
