import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db, auth, isConfigured } from "../config/firebase";

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sessionService = {
  async listSessions(params) {
    if (!isConfigured) {
      await mockDelay(500);
      return { data: [] };
    }
    const snapshot = await getDocs(collection(db, "sessions"));
    return { data: snapshot.docs.map(d => ({ id: d.id, ...d.data() })) };
  },

  async getSession(id) {
    if (!isConfigured) return { data: null };
    const docSnap = await getDoc(doc(db, "sessions", id));
    return { data: docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null };
  },

  async createSession(payload) {
    if (!isConfigured) return { data: { id: "mock-id", ...payload } };
    const newDocRef = doc(collection(db, "sessions"));
    await setDoc(newDocRef, payload);
    return { data: { id: newDocRef.id, ...payload } };
  },

  async markComplete(id) {
    if (!isConfigured) return { success: true };
    const user = auth.currentUser;
    if (user) {
      const progressRef = doc(db, "users", user.uid, "progress", id);
      await setDoc(progressRef, { completed: true, completedAt: new Date().toISOString() }, { merge: true });
    }
    return { success: true };
  },
};
