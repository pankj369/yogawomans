import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, isConfigured } from "../config/firebase";

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllProducts = async () => {
  if (!isConfigured) {
    await mockDelay(500);
    return { data: [] };
  }

  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data };
  } catch (error) {
    console.error("Get Products Error:", error);
    throw error;
  }
};

export const getSingleProduct = async (slug) => {
  if (!isConfigured) {
    await mockDelay(500);
    return { data: null };
  }

  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { data: { id: doc.id, ...doc.data() } };
    }
    return { data: null };
  } catch (error) {
    console.error("Get Single Product Error:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  if (!isConfigured) {
    await mockDelay(500);
    return { data: [] };
  }

  try {
    const categoriesRef = collection(db, "categories");
    const snapshot = await getDocs(categoriesRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data };
  } catch (error) {
    console.error("Get Categories Error:", error);
    throw error;
  }
};