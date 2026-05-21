import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getWishlistItems,
  addToWishlist,
  removeWishlistItem,
} from "../controllers/wishlistController.js";

const router = express.Router();



// GET USER WISHLIST
router.get(
  "/",
  authMiddleware,
  getWishlistItems
);



// ADD TO WISHLIST
router.post(
  "/add",
  authMiddleware,
  addToWishlist
);



// REMOVE WISHLIST ITEM
router.delete(
  "/remove/:id",
  authMiddleware,
  removeWishlistItem
);



export default router;