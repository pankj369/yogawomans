import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth, isConfigured } from "../config/firebase";

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMyProfile = async () => {
  if (!isConfigured) {
    await mockDelay(500);
    return { profile: { full_name: "Mock User" } };
  }

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { profile: docSnap.data() };
  } else {
    return { profile: null };
  }
};

export const updateProfile = async (profileData) => {
  if (!isConfigured) {
    await mockDelay(500);
    return { success: true, profile: profileData };
  }

  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "users", user.uid);
  // Use merge: true to avoid overwriting existing data fields not included in profileData
  await setDoc(docRef, profileData, { merge: true });

  return { success: true, profile: profileData };
};