import apiClient from "./apiClient";

/**
 * Fetch all products from Express REST API.
 */
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    const products = response?.products || [];
    return { data: products, products };
  } catch (error) {
    console.error("Get Products Error:", error);
    throw error;
  }
};

/**
 * Fetch a single product by its slug from Express REST API.
 */
export const getSingleProduct = async (slug) => {
  try {
    const response = await apiClient.get(`/products/${slug}`);
    const product = response?.product || null;
    return { data: product, product };
  } catch (error) {
    console.error("Get Single Product Error:", error);
    throw error;
  }
};

/**
 * Fetch all categories from Express REST API.
 */
export const getAllCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    const categories = response?.categories || [];
    return { data: categories, categories };
  } catch (error) {
    console.error("Get Categories Error:", error);
    throw error;
  }
};