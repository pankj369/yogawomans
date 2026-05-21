import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth, isConfigured } from "../config/firebase";

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getWishlistItems = async () => {
  if (!isConfigured) {
    await mockDelay(500);
    return { items: [] };
  }

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const wishlistRef = collection(db, "users", user.uid, "wishlist");
  const snapshot = await getDocs(wishlistRef);
  
  const items = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return { items };
};

export const addToWishlistApi = async (product_id) => {
  if (!isConfigured) {
    await mockDelay(500);
    return { success: true };
  }

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "users", user.uid, "wishlist", product_id);
  await setDoc(docRef, { product_id, addedAt: new Date().toISOString() });

  return { success: true };
};

export const removeWishlistItemApi = async (wishlistId) => {
  if (!isConfigured) {
    await mockDelay(500);
    return { success: true };
  }

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "users", user.uid, "wishlist", wishlistId);
  await deleteDoc(docRef);

  return { success: true };
};