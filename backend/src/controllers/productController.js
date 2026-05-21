import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";
import asyncHandler from "express-async-handler";

// GET ALL PRODUCTS
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const productsSnapshot = await db.collection("products").get();
  
  const products = productsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  res.status(200).json({
    success: true,
    products,
  });
});

// GET SINGLE PRODUCT
export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;

  const productsRef = db.collection("products");
  const snapshot = await productsRef.where("slug", "==", slug).limit(1).get();

  if (snapshot.empty) {
    res.status(404);
    throw new Error("Product not found");
  }

  const productDoc = snapshot.docs[0];
  const product = { id: productDoc.id, ...productDoc.data() };

  res.status(200).json({
    success: true,
    product,
  });
});

// GET ALL CATEGORIES
export const getAllCategories = asyncHandler(async (req, res, next) => {
  const categoriesSnapshot = await db.collection("categories").get();
  
  const categories = categoriesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  res.status(200).json({
    success: true,
    categories,
  });
});