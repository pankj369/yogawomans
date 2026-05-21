import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import navlogo from "../assets/images/navlogo.png";

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
  const { cartItems, cartTotal } = useCart();
  const isLoggedIn = auth.isAuthenticated;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(232,101,26,0.18),_transparent_35%),linear-gradient(180deg,#0d1710_0%,#17261a_45%,#f7f1e8_100%)] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={navlogo} alt="logo" className="h-10 w-auto object-contain" />
            <div>
              <h1 className="text-3xl font-semibold sm:text-4xl leading-none">Checkout</h1>
            </div>
          </div>
          <Link to="/shop" className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold">
            Back to Shop
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
          >
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-5 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="font-medium">{item.products?.name}</p>
                    <p className="text-sm text-white/65">Qty {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{formatPrice((item.products?.price || item.price || 0) * item.quantity)}</p>
                </div>
              ))}
              {!cartItems.length && <p className="text-white/65">Your cart is empty.</p>}
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-white/15 bg-[#1b2a1f]/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
          >
            <p className="text-xs uppercase tracking-[0.26em] text-white/50">Payment preview</p>
            <h2 className="mt-2 text-2xl font-semibold">Secure wellness checkout</h2>

            <div className="mt-6 space-y-3 text-sm text-white/70">
              <div className="flex justify-between"><span>Items</span><span>{cartItems.length}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
              <div className="flex justify-between"><span>Tax</span><span>Included</span></div>
              <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-base text-white">
                <span>Total</span><span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-full bg-gradient-to-r from-[#2E7D32] to-[#E8651A] px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_16px_34px_rgba(232,101,26,0.25)]"
            >
              Complete Purchase
            </button>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
