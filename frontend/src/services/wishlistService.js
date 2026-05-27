import apiClient from "./apiClient";
import { getAllProducts } from "./productService";

/**
 * Fetch all wishlist items from backend and populate product metadata.
 */
export const getWishlistItems = async () => {
  try {
    const response = await apiClient.get("/wishlist");
    const wishlist = response?.wishlist || [];
    
    // Fetch products list to populate details
    const productsRes = await getAllProducts();
    const productsList = productsRes?.products || [];
    
    const items = wishlist.map(item => {
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
    
    return { items, wishlist: items };
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    throw error;
  }
};

/**
 * Add a product to the wishlist on backend.
 */
export const addToWishlistApi = async (product_id) => {
  try {
    const response = await apiClient.post("/wishlist/add", { product_id });
    return response;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

/**
 * Remove an item from the wishlist on backend.
 */
export const removeWishlistItemApi = async (wishlistId) => {
  try {
    const response = await apiClient.delete(`/wishlist/remove/${wishlistId}`);
    return response;
  } catch (error) {
    console.error("Error removing wishlist item:", error);
    throw error;
  }
};