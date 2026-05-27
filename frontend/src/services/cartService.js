import apiClient from "./apiClient";
import { getAllProducts } from "./productService";

/**
 * Fetch all cart items from backend and populate product metadata.
 */
export const getCartItems = async () => {
  try {
    const response = await apiClient.get("/cart");
    const cart = response?.cart || [];
    
    // Fetch products list to populate details
    const productsRes = await getAllProducts();
    const productsList = productsRes?.products || [];
    
    const items = cart.map(item => {
      const product = productsList.find(p => p.id === item.product_id || p.slug === item.product_id);
      return {
        ...item,
        title: product?.title || product?.name || "Wellness Tool",
        products: product ? {
          ...product,
          price: product.price,
          image_url: product.image
        } : null
      };
    });
    
    return { items, cart: items };
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

/**
 * Add a product to the cart on backend.
 */
export const addToCartApi = async (product_id, quantity = 1) => {
  try {
    const response = await apiClient.post("/cart/add", { product_id, quantity });
    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

/**
 * Update the quantity of a cart item on backend.
 */
export const updateCartItemApi = async (cartId, quantity) => {
  try {
    const response = await apiClient.put(`/cart/update/${cartId}`, { quantity });
    return response;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

/**
 * Remove an item from the cart on backend.
 */
export const removeCartItemApi = async (cartId) => {
  try {
    const response = await apiClient.delete(`/cart/remove/${cartId}`);
    return response;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};