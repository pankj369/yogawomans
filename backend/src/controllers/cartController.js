import { db } from "../config/firebaseAdmin.js";
import asyncHandler from "express-async-handler";

// GET USER CART
export const getCartItems = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;

  const cartSnapshot = await db
    .collection("carts")
    .where("userId", "==", userId)
    .get();

  const cart = cartSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return res.status(200).json({
    success: true,
    cart,
  });
});

// ADD TO CART
export const addToCart = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const { product_id, quantity = 1 } = req.body;

  const cartRef = db.collection("carts");
  const existingSnapshot = await cartRef
    .where("userId", "==", userId)
    .where("product_id", "==", product_id)
    .limit(1)
    .get();

  if (!existingSnapshot.empty) {
    // Update existing item
    const existingDoc = existingSnapshot.docs[0];
    const newQuantity = existingDoc.data().quantity + quantity;

    await existingDoc.ref.update({
      quantity: newQuantity,
      updated_at: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cartItem: { id: existingDoc.id, ...existingDoc.data(), quantity: newQuantity },
    });
  }

  // Add new item
  const newItem = {
    userId,
    product_id,
    quantity,
    created_at: new Date().toISOString(),
  };

  const docRef = await cartRef.add(newItem);

  return res.status(201).json({
    success: true,
    message: "Added to cart",
    cartItem: { id: docRef.id, ...newItem },
  });
});

// UPDATE CART QUANTITY
export const updateCartItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    res.status(400);
    throw new Error("Quantity must be at least 1");
  }

  const docRef = db.collection("carts").doc(id);
  await docRef.update({
    quantity,
    updated_at: new Date().toISOString(),
  });

  const updatedDoc = await docRef.get();

  return res.status(200).json({
    success: true,
    message: "Cart updated",
    cartItem: { id: updatedDoc.id, ...updatedDoc.data() },
  });
});

// REMOVE CART ITEM
export const removeCartItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await db.collection("carts").doc(id).delete();

  return res.status(200).json({
    success: true,
    message: "Item removed from cart",
  });
});