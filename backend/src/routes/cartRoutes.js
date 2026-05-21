import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";

const router = express.Router();



// GET USER CART
router.get(
  "/",
  authMiddleware,
  getCartItems
);



// ADD TO CART
router.post(
  "/add",
  authMiddleware,
  addToCart
);



// UPDATE CART ITEM
router.put(
  "/update/:id",
  authMiddleware,
  updateCartItem
);



// REMOVE CART ITEM
router.delete(
  "/remove/:id",
  authMiddleware,
  removeCartItem
);



export default router;