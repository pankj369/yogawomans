import apiClient from "./apiClient";



// GET WISHLIST
export const getWishlistItems =
  async () => {

    const response =
      await apiClient.get(
        "/wishlist"
      );

    return response.data;
  };



// ADD TO WISHLIST
export const addToWishlistApi =
  async (product_id) => {

    const response =
      await apiClient.post(
        "/wishlist/add",
        {
          product_id,
        }
      );

    return response.data;
  };



// REMOVE WISHLIST ITEM
export const removeWishlistItemApi =
  async (wishlistId) => {

    const response =
      await apiClient.delete(
        `/wishlist/remove/${wishlistId}`
      );

    return response.data;
  };