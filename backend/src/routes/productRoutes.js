import express from "express";

import {
  getAllProducts,
  getSingleProduct,
  getAllCategories,
} from "../controllers/productController.js";


const router = express.Router();



// GET ALL PRODUCTS
router.get("/products", getAllProducts);



// GET SINGLE PRODUCT
router.get("/products/:slug", getSingleProduct);



// GET ALL CATEGORIES
router.get("/categories", getAllCategories);



export default router;