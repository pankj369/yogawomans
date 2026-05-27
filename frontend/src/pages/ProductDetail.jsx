// src/pages/ProductDetail.jsx
import { useEffect, useState, useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Heart, ShoppingCart, ArrowLeft, ShieldCheck, Sparkles, 
  Award, Lock, Info, Plus, Minus, Check 
} from "lucide-react";
import { getSingleProduct, getAllProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const toast = useToast();
  
  const { state: dashboardState } = useDashboard();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Gallery state
  const [activeImage, setActiveImage] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [singleResponse, allResponse] = await Promise.all([
          getSingleProduct(slug),
          getAllProducts()
        ]);

        if (singleResponse.product) {
          const backendProduct = singleResponse.product;
          const transformedProduct = {
            id: backendProduct.id,
            title: backendProduct.name,
            description: backendProduct.description,
            price: backendProduct.price,
            oldPrice: backendProduct.old_price || Math.round(backendProduct.price * 1.25),
            image: backendProduct.image_url,
            category: backendProduct.categories?.name || "Wellness",
            premium: backendProduct.is_featured,
            slug: backendProduct.slug,
            stock: backendProduct.stock || 12,
            rating: backendProduct.rating || 4.8,
            reviews: backendProduct.reviews || 120,
            goals: backendProduct.slug.includes("mat") || backendProduct.slug.includes("block") 
              ? ["Physical Balance"] 
              : backendProduct.slug.includes("amethyst") || backendProduct.slug.includes("crystal")
              ? ["Aura Cleansing", "Chakra Alignment"]
              : backendProduct.slug.includes("singing") || backendProduct.slug.includes("cushion")
              ? ["Stress Relief", "Chakra Alignment"]
              : ["Stress Relief"],
            benefits: backendProduct.slug.includes("mat") 
              ? [
                  "Improves alignment during challenging asana configurations.",
                  "100% biodegradable and zero-slip natural rubber core.",
                  "Tear-resistant organic jute fibers for stability."
                ]
              : backendProduct.slug.includes("amethyst")
              ? [
                  "Cleanses negative energy grids around the meditation space.",
                  "Opens and clears the Crown and Third Eye chakras.",
                  "Aids in deep alpha-wave sound bath transitions."
                ]
              : backendProduct.slug.includes("singing")
              ? [
                  "Resonates at 432Hz harmonic frequency for instant calm.",
                  "Hand-beaten Nepalese alloy balances environmental orgone.",
                  "Excellent sound therapy for stress and anxiety relief."
                ]
              : [
                  "Handcrafted using chemical-free eco-sustainable dyes.",
                  "Reduces stress, encouraging mindfulness and grounding.",
                  "Includes 1-Year YogaWoman wellness sanctuary guarantee."
                ]
          };

          setProduct(transformedProduct);
          setActiveImage(transformedProduct.image);
        } else {
          setError("Product not found");
        }

        if (allResponse.products) {
          setAllProducts(allResponse.products);
        }
      } catch (err) {
        console.error("Failed to load product details:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Gallery images mockup
  const galleryImages = useMemo(() => {
    if (!product) return [];
    return [
      product.image,
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?auto=format&fit=crop&q=80&w=600"
    ];
  }, [product]);

  // Related products
  const relatedProducts = useMemo(() => {
    if (!product || !allProducts.length) return [];
    return allProducts
      .filter(p => p.id !== product.id && (p.categories?.name === product.category || p.is_featured))
      .slice(0, 3);
  }, [product, allProducts]);

  // Frequently Bought Together Bundle Item
  const bundleItem = useMemo(() => {
    if (!product || !allProducts.length) return null;
    // Suggest a block if mat, suggest singing bowl if crystal, etc.
    return allProducts.find(p => p.id !== product.id) || null;
  }, [product, allProducts]);

  const goCheckout = () => {
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

    // Add selected quantity to cart
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    navigate("/checkout");
  };

  const handleAddToCart = () => {
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
        state: { returnTo: `/shop/${product.slug}` }
      });
      return;
    }

    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    
    toast.showToast({
      type: "success",
      title: "Basket Updated 🛍️",
      message: `${qty}x ${product.title} added to your basket.`,
    });
  };

  const handleAddBundle = () => {
    if (!bundleItem) return;
    
    if (!auth.isAuthenticated) {
      toast.showToast({
        type: "info",
        title: "Authentication Required",
        message: "Please log in to add items to your cart.",
      });
      navigate("/login", {
        state: { returnTo: `/shop/${product.slug}` }
      });
      return;
    }

    addToCart(product);
    
    const transformedBundleItem = {
      id: bundleItem.id,
      title: bundleItem.name,
      price: bundleItem.price,
      image: bundleItem.image_url,
      premium: bundleItem.is_featured
    };
    addToCart(transformedBundleItem);

    toast.showToast({
      type: "success",
      title: "Bundle Added! 🧘✨",
      message: "Both products added to your cart with combo savings.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex items-center justify-center text-xl font-bold text-[#D6A756] animate-pulse">
        <Sparkles size={24} className="mr-3 animate-spin" /> Harmonizing Details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-center text-center p-6">
        <AlertCircle className="text-rose-500 mb-4 animate-bounce" size={48} />
        <h3 className="text-2xl font-bold text-[#F7F3EC]">{error || "Product Not Found"}</h3>
        <Link to="/store" className="mt-6 rounded-full bg-white/5 border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#D6A756] hover:bg-white/10 transition">
          Back to Sanctuary Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] pb-24 relative overflow-hidden select-none font-body text-left">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#00C875]/4 to-transparent pointer-events-none" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-[#D6A756]/3 rounded-full blur-[110px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-28">
        
        {/* Back Link */}
        <Link to="/store" className="inline-flex items-center gap-2 text-xs font-bold text-[#D6A756] uppercase tracking-wider hover:text-white transition">
          <ArrowLeft size={14} /> Back to Sanctuary Store
        </Link>

        {/* Product Profile Split Grid */}
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          
          {/* Left Column: Gallery (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-[#0B1220] to-[#1A2A22] h-[380px] md:h-[480px] flex items-center justify-center shadow-heroCard group">
              <img 
                src={activeImage} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-[#0B1220]/15 pointer-events-none" />
              
              {product.premium && (
                <div className="absolute top-6 left-6 z-10 rounded-full bg-gradient-to-r from-[#D6A756] to-[#FF9A57] px-4 py-1.5 text-[9px] font-extrabold tracking-widest text-[#050816] uppercase shadow-lg flex items-center gap-1">
                  <Lock size={10} className="fill-[#050816]" /> Pro Exclusive
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-20 rounded-2xl overflow-hidden border transition-all duration-300 bg-white/5 flex items-center justify-center ${activeImage === img ? "border-[#D6A756] scale-105 shadow-md" : "border-white/10 opacity-70 hover:opacity-100"}`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: details (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 shadow-glass backdrop-blur-xl space-y-6">
              
              {/* Badge & Category */}
              <div className="flex justify-between items-center">
                <span className="inline-flex rounded-full bg-[#D6A756]/15 border border-[#D6A756]/20 px-3 py-1.5 text-[10px] font-bold text-[#D6A756] uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-xs text-[#00C875] font-black uppercase tracking-wider">
                  In Stock ({product.stock} Left)
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h1 className="text-3xl font-heading font-extrabold text-[#F7F3EC] leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex text-[#D6A756]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} fill={i < Math.round(product.rating) ? "currentColor" : "none"} className="mr-0.5" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#B8C1CC]/80">({product.reviews} Customer Reviews)</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[#B8C1CC] leading-relaxed">
                {product.description}
              </p>

              {/* Price Row */}
              <div className="flex items-end gap-3 pt-2">
                <span className="text-3xl font-black text-[#F8FAFC]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-[#B8C1CC] line-through font-medium mb-1">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="text-xs text-[#00C875] font-extrabold mb-1">
                  Save {product.discount}%
                </span>
              </div>

              {/* Qty and Actions */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#B8C1CC] uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center rounded-full border border-white/10 bg-black/20">
                    <button onClick={() => setQty(prev => Math.max(1, prev - 1))} className="px-3 py-2 text-white/60 hover:text-white">
                      <Minus size={11} />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#F7F3EC]">{qty}</span>
                    <button onClick={() => setQty(prev => Math.min(product.stock, prev + 1))} className="px-3 py-2 text-white/60 hover:text-white">
                      <Plus size={11} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 pt-2">
                  <button
                    onClick={goCheckout}
                    className="w-full rounded-full bg-gradient-to-r from-[#D6A756] to-[#00C875] text-[#050816] py-4 text-xs font-extrabold uppercase tracking-widest transition hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                  >
                    Buy Now
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white py-3.5 text-xs font-bold transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                    
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all ${
                        isWishlisted(product.id)
                          ? "bg-[#FF9A57]/20 border-[#FF9A57]/40 text-[#FF9A57] scale-105"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <Heart size={16} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Secure Checkout badge */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-[#B8C1CC]/75 font-semibold pt-2">
                <ShieldCheck size={14} className="text-[#00C875]" /> SSL Encrypted Secure Checkout
              </div>

            </div>
          </div>

        </div>

        {/* ─── Spiritual Alignments & Chakra Benefits ─── */}
        <section className="mt-16 border-t border-white/5 pt-12 text-left">
          <div className="mb-6 flex items-center gap-2">
            <Award size={20} className="text-[#D6A756]" />
            <h3 className="text-xl font-bold font-heading text-[#F7F3EC]">Spiritual Alignment & Benefits</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {product.benefits?.map((benefit, i) => (
              <div key={i} className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 space-y-3">
                <div className="h-9 w-9 rounded-full bg-[#D6A756]/15 text-[#D6A756] flex items-center justify-center font-bold text-xs">
                  0{i + 1}
                </div>
                <p className="text-xs text-[#B8C1CC] leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Frequently Bought Together ─── */}
        {bundleItem && (
          <section className="mt-16 border-t border-white/5 pt-12 text-left">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-[#D6A756]" />
              <h3 className="text-xl font-bold font-heading text-[#F7F3EC]">Frequently Bought Together</h3>
            </div>
            
            <div className="rounded-[2.5rem] border border-[#D6A756]/10 bg-[#D6A756]/2 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
              <div className="flex flex-col md:flex-row items-center gap-6">
                
                {/* Product 1 */}
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-xl overflow-hidden bg-black/40 border border-white/5">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#F7F3EC]">{product.title}</h5>
                    <span className="text-xs font-black text-[#D6A756]">{formatPrice(product.price)}</span>
                  </div>
                </div>

                <div className="text-[#B8C1CC]/50 text-xl font-light">+</div>

                {/* Product 2 */}
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-xl overflow-hidden bg-black/40 border border-white/5">
                    <img src={bundleItem.image_url} alt={bundleItem.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#F7F3EC]">{bundleItem.name}</h5>
                    <span className="text-xs font-black text-[#D6A756]">{formatPrice(bundleItem.price)}</span>
                  </div>
                </div>

              </div>

              {/* Combo add button */}
              <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                <div className="text-xs text-[#B8C1CC]">
                  Combo Price: <span className="text-lg font-black text-[#F8FAFC]">{formatPrice(product.price + bundleItem.price)}</span>
                </div>
                <button
                  onClick={handleAddBundle}
                  className="rounded-full bg-[#00C875] text-[#050816] hover:bg-[#00b064] px-6 py-3 text-xs font-extrabold uppercase tracking-widest transition"
                >
                  Add Combo to Basket
                </button>
              </div>

            </div>
          </section>
        )}

        {/* ─── AI Personalized Related Products ─── */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-white/5 pt-12 text-left">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-[#D6A756]" />
              <h3 className="text-xl font-bold font-heading text-[#F7F3EC]">AI Related Recommendations</h3>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="group relative rounded-3xl border border-white/5 bg-white/[0.01] p-5 shadow-glass flex flex-col justify-between hover:border-[#D6A756]/30 transition-all duration-300"
                >
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                    {prod.image_url ? (
                      <img src={prod.image_url} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="text-3xl">🧘</span>
                    )}
                    <button 
                      onClick={() => navigate(`/shop/${prod.slug}`)} 
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <span className="rounded-full bg-white text-[#0B1220] px-4 py-2 text-xs font-bold">View Details</span>
                    </button>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-bold text-sm text-[#F7F3EC] truncate">{prod.name}</h5>
                    <div className="flex justify-between items-center mt-2.5">
                      <span className="text-xs font-black text-[#D6A756]">{formatPrice(prod.price)}</span>
                      <span className="text-[10px] text-[#B8C1CC] font-bold">★ {prod.rating || "4.8"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
