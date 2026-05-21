import apiClient from "./apiClient";



// GET ALL PRODUCTS
export const getAllProducts = async () => {

  try {

    const response = await apiClient.get("/products");

    return response.data;

  } catch (error) {

    console.error("Get Products Error:", error);

    throw error;
  }
};




// GET SINGLE PRODUCT
export const getSingleProduct = async (slug) => {

  try {

    const response = await apiClient.get(`/products/${slug}`);

    return response.data;

  } catch (error) {

    console.error("Get Single Product Error:", error);

    throw error;
  }
};




// GET CATEGORIES
export const getAllCategories = async () => {

  try {

    const response = await apiClient.get("/categories");

    return response.data;

  } catch (error) {

    console.error("Get Categories Error:", error);

    throw error;
  }
};