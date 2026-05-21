import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getCartItems,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
} from "../services/cartService";
import { useAuth } from "./AuthContext";
const CART_STORAGE_KEY = "yogawomans_cart";

const CartContext = createContext(null);

function readStoredCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth() || {};
  const [cartItems, setCartItems] = useState(() => readStoredCart());

  const fetchCart = async () => {
    try {
      const response = await getCartItems();
      if (response?.cart) {
        setCartItems(response.cart);
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (product) => {
    if (!isAuthenticated) return;
    try {
      await addToCartApi(product.id, 1);
      await fetchCart();
    } catch (error) {
      console.error("Add cart error:", error);
    }
  };

  const removeFromCart = async (id) => {
    if (!isAuthenticated) return;
    try {
      await removeCartItemApi(id);
      setCartItems((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Remove cart error:", error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (!isAuthenticated) return;
    try {
      await updateCartItemApi(id, quantity);
      await fetchCart();
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

const cartTotal = useMemo(
  () =>
    cartItems.reduce(
      (sum, item) =>
        sum +
        (item.products?.price || 0) *
          item.quantity,
      0
    ),
  [cartItems]
);
  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
