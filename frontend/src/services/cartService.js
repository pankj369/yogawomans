import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth, isConfigured } from "../config/firebase";

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCartItems = async () => {
  if (!isConfigured) {
    await mockDelay(500);
    return { items: [] };
  }

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const cartRef = collection(db, "users", user.uid, "cart");
  const snapshot = await getDocs(cartRef);
  
  const items = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return { items };
};

export const addToCartApi = async (product_id, quantity = 1) => {
  if (!isConfigured) {
    await mockDelay(500);
    return { success: true };
  }

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "users", user.uid, "cart", product_id);
  await setDoc(docRef, { product_id, quantity, addedAt: new Date().toISOString() });

  return { success: true };
};

export const updateCartItemApi = async (cartId, quantity) => {
  if (!isConfigured) {
    await mockDelay(500);
    return { success: true };
  }

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "users", user.uid, "cart", cartId);
  await updateDoc(docRef, { quantity });

  return { success: true };
};

export const removeCartItemApi = async (cartId) => {
  if (!isConfigured) {
    await mockDelay(500);
    return { success: true };
  }

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "users", user.uid, "cart", cartId);
  await deleteDoc(docRef);

  return { success: true };
};