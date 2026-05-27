// src/pages/Checkout.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowLeft, CreditCard, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Checkout() {
  const navigate = useNavigate();
  const auth = useAuth();
  const toast = useToast();
  const { cartItems, cartTotal, clearCart } = useCart();
  const isLoggedIn = auth.isAuthenticated;

  // Checkout Form State
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "upi"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { returnTo: "/checkout" } });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.showToast({
        type: "warning",
        title: "Cart is empty",
        message: "Add some products to your basket before checking out."
      });
      return;
    }

    if (!formData.fullName || !formData.address || !formData.phone) {
      toast.showToast({
        type: "warning",
        title: "Incomplete details",
        message: "Please fill in all mandatory fields (Name, Address, and Phone)."
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderCompleted(true);
      clearCart();
      
      toast.showToast({
        type: "success",
        title: "Order Placed Successfully! 🧘✨",
        message: "Your spiritual wellness package will be delivered soon."
      });
    }, 2500);
  };

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] flex items-center justify-center p-6 text-left font-body relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#00C875]/4 to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 shadow-glass backdrop-blur-xl text-center space-y-6"
        >
          <div className="h-16 w-16 bg-[#00C875]/15 border border-[#00C875]/30 rounded-full flex items-center justify-center text-[#00C875] mx-auto">
            <CheckCircle2 size={32} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-extrabold text-[#F7F3EC]">Aura Connected!</h2>
            <p className="text-xs text-[#B8C1CC] leading-relaxed">
              Your order has been registered in our sanctuary system. A confirmation email and tracking details are winging their way to you.
            </p>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col gap-3">
            <button 
              onClick={() => navigate("/dashboard")}
              className="w-full rounded-full bg-gradient-to-r from-[#D6A756] to-[#00C875] text-[#050816] py-3.5 text-xs font-extrabold uppercase tracking-widest transition hover:scale-[1.02]"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={() => navigate("/store")}
              className="w-full rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white py-3.5 text-xs font-bold transition"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] pb-24 relative overflow-hidden select-none font-body text-left">
      
      {/* Glow blobs */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#FF9A57]/3 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-80 right-0 w-[350px] h-[350px] bg-[#00C875]/3 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-28">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D6A756] uppercase">Secure Order</span>
            <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-[#F7F3EC]">Sanctuary Checkout</h1>
          </div>
          <Link to="/store" className="inline-flex items-center gap-2 text-xs font-bold text-[#D6A756] uppercase tracking-wider hover:text-white transition">
            <ArrowLeft size={14} /> Back to Store
          </Link>
        </div>

        {/* Main Grid */}
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          
          {/* Left Column: Shipping Form (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePlaceOrder} className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 shadow-glass backdrop-blur-xl space-y-6">
              <h3 className="text-lg font-bold text-[#F7F3EC] font-heading flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#00C875]" /> Shipping & Contact Details
              </h3>
              
              <div className="grid gap-5">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#B8C1CC]">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-[#F7F3EC] outline-none focus:border-[#D6A756]/50 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#B8C1CC]">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-[#F7F3EC] outline-none focus:border-[#D6A756]/50 transition-colors"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#B8C1CC]">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter street name and house number"
                    className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-[#F7F3EC] outline-none focus:border-[#D6A756]/50 transition-colors"
                  />
                </div>

                {/* City and Postal split */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#B8C1CC]">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-[#F7F3EC] outline-none focus:border-[#D6A756]/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#B8C1CC]">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Postal Code"
                      className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-[#F7F3EC] outline-none focus:border-[#D6A756]/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Payment selection */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <h3 className="text-sm font-bold text-[#F7F3EC] font-heading flex items-center gap-2">
                  <CreditCard size={16} className="text-[#D6A756]" /> Payment Method
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "upi", label: "UPI (Paytm/GPay)" },
                    { id: "card", label: "Credit/Debit Card" },
                    { id: "cod", label: "Cash on Delivery" }
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                      className={`rounded-xl border p-4 text-center transition-all ${formData.paymentMethod === method.id ? "bg-[#D6A756]/10 border-[#D6A756] text-[#D6A756]" : "bg-black/20 border-white/10 text-[#B8C1CC] hover:bg-white/5"}`}
                    >
                      <span className="text-[10px] font-bold block uppercase tracking-wider">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Place Order Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full rounded-full bg-gradient-to-r from-[#D6A756] to-[#00C875] text-[#050816] py-4 text-xs font-extrabold uppercase tracking-widest transition hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-[#050816]" /> Verifying Transaction...
                    </>
                  ) : (
                    <>
                      Complete Purchase & Align Aura
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Order summary (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Basket Items Summary */}
            <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-6 shadow-glass backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-bold text-[#F7F3EC] font-heading">Order Items</h3>
              
              <div className="divide-y divide-white/5 max-h-[220px] overflow-y-auto pr-2 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 gap-4 first:pt-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-12 w-12 rounded-lg bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {item.products?.image_url ? (
                          <img src={item.products.image_url} alt={item.title} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-xl">🧘</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#F7F3EC] truncate">{item.title}</h4>
                        <span className="text-[10px] text-[#B8C1CC] font-medium">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#D6A756] flex-shrink-0">
                      {formatPrice((item.products?.price || item.price || 0) * item.quantity)}
                    </span>
                  </div>
                ))}
                {cartItems.length === 0 && (
                  <div className="py-6 text-center text-xs text-[#B8C1CC]">Your basket is empty.</div>
                )}
              </div>
            </div>

            {/* Price Calculations */}
            <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-6 shadow-glass backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-bold text-[#F7F3EC] font-heading">Sanctuary Summary</h3>
              
              <div className="space-y-3 text-xs text-[#B8C1CC] font-medium">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="text-[#F7F3EC] font-bold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ritual Delivery</span>
                  <span className="text-[#00C875] font-black uppercase">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Wellness Taxes</span>
                  <span className="text-[#F7F3EC] font-bold">Included</span>
                </div>
                
                <div className="border-t border-white/5 pt-3.5 flex justify-between text-sm text-[#F7F3EC] font-black">
                  <span>Grand Total</span>
                  <span className="text-[#D6A756] text-base">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[9px] text-[#B8C1CC]/70 font-semibold uppercase tracking-wider">
                <ShieldCheck size={12} className="text-[#00C875]" /> Encrypted Connection
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
