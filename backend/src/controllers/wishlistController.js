import { db } from "../config/firebaseAdmin.js";
import asyncHandler from "express-async-handler";

// GET WISHLIST
export const getWishlistItems = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;

  const snapshot = await db
    .collection("wishlists")
    .where("userId", "==", userId)
    .get();

  const wishlist = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return res.status(200).json({
    success: true,
    wishlist,
  });
});

// ADD TO WISHLIST
export const addToWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const { product_id } = req.body;

  const wishlistRef = db.collection("wishlists");
  const existingSnapshot = await wishlistRef
    .where("userId", "==", userId)
    .where("product_id", "==", product_id)
    .limit(1)
    .get();

  if (!existingSnapshot.empty) {
    return res.status(200).json({
      success: true,
      message: "Already in wishlist",
    });
  }

  const newItem = {
    userId,
    product_id,
    created_at: new Date().toISOString(),
  };

  const docRef = await wishlistRef.add(newItem);

  return res.status(201).json({
    success: true,
    message: "Added to wishlist",
    wishlistItem: { id: docRef.id, ...newItem },
  });
});

// REMOVE WISHLIST ITEM
export const removeWishlistItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await db.collection("wishlists").doc(id).delete();

  return res.status(200).json({
    success: true,
    message: "Wishlist item removed",
  });
});