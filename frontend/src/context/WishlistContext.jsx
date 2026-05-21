import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getWishlistItems,
  addToWishlistApi,
  removeWishlistItemApi,
} from "../services/wishlistService";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

export function WishlistProvider({
  children,
}) {
  const { isAuthenticated } = useAuth() || {};
  const [
    wishlistItems,
    setWishlistItems,
  ] = useState([]);



  // FETCH WISHLIST
  const fetchWishlist =
    async () => {

      try {

        const response =
          await getWishlistItems();

        if (response?.wishlist) {

          setWishlistItems(
            response.wishlist
          );
        }

      } catch (error) {

        console.error(
          "Fetch wishlist error:",
          error
        );
      }
    };



  // LOAD ON START
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [isAuthenticated]);




  // TOGGLE WISHLIST
  const toggleWishlist =
    async (product) => {
      if (!isAuthenticated) return;
      try {

        const existingItem =
          wishlistItems.find(
            (item) =>
              item.product_id ===
              product.id
          );



        if (existingItem) {

          await removeWishlistItemApi(
            existingItem.id
          );

        } else {

          await addToWishlistApi(
            product.id
          );
        }



        await fetchWishlist();

      } catch (error) {

        console.error(
          "Wishlist toggle error:",
          error
        );
      }
    };




  // CHECK WISHLIST
  const isWishlisted = (
    productId
  ) => {

    return wishlistItems.some(
      (item) =>
        item.product_id ===
        productId
    );
  };




  // CLEAR FRONTEND STATE
  const clearWishlist = () => {

    setWishlistItems([]);
  };




  const value = useMemo(
    () => ({
      wishlistItems,
      wishlistCount:
        wishlistItems.length,

      toggleWishlist,

      isWishlisted,

      clearWishlist,
    }),
    [wishlistItems]
  );



  return (
    <WishlistContext.Provider
      value={value}
    >
      {children}
    </WishlistContext.Provider>
  );
}



export function useWishlist() {

  const context =
    useContext(WishlistContext);

  if (!context) {

    throw new Error(
      "useWishlist must be used within WishlistProvider"
    );
  }

  return context;
}