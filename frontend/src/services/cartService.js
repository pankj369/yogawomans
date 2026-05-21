import apiClient from "./apiClient";



// GET USER CART
export const getCartItems = async () => {

  const response = await apiClient.get(
    "/cart"
  );

  return response.data;
};



// ADD TO CART
export const addToCartApi = async (
  product_id,
  quantity = 1
) => {

  const response = await apiClient.post(
    "/cart/add",
    {
      product_id,
      quantity,
    }
  );

  return response.data;
};



// UPDATE CART ITEM
export const updateCartItemApi = async (
  cartId,
  quantity
) => {

  const response = await apiClient.put(
    `/cart/update/${cartId}`,
    {
      quantity,
    }
  );

  return response.data;
};



// REMOVE CART ITEM
export const removeCartItemApi = async (
  cartId
) => {

  const response = await apiClient.delete(
    `/cart/remove/${cartId}`
  );

  return response.data;
};