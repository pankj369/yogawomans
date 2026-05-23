import { db } from "../config/firebase";
import { collection, doc, setDoc, getDocs, query, orderBy, serverTimestamp, updateDoc } from "firebase/firestore";

/**
 * Saves a generated plan to the user's generatedPlans subcollection.
 * @param {string} userId - The authenticated user's ID
 * @param {Object} planData - The plan object (goalId, durationId, levelId, timeline, etc.)
 * @returns {Promise<string>} - Returns the generated plan ID
 */
export const saveGeneratedPlan = async (userId, planData) => {
  if (!userId) throw new Error("User ID is required to save a plan");

  try {
    const plansRef = collection(db, "users", userId, "generatedPlans");
    const newPlanRef = doc(plansRef); // Auto-generate ID

    const payload = {
      ...planData,
      id: newPlanRef.id,
      completionPercentage: 0,
      createdAt: serverTimestamp(),
      lastOpenedAt: serverTimestamp(),
    };

    await setDoc(newPlanRef, payload);
    return newPlanRef.id;
  } catch (error) {
    console.error("Error saving generated plan:", error);
    throw error;
  }
};

/**
 * Fetches all generated plans for a user, ordered by most recent first.
 * @param {string} userId - The authenticated user's ID
 * @returns {Promise<Array>} - Array of plan objects
 */
export const getUserPlans = async (userId) => {
  if (!userId) return [];

  try {
    const plansRef = collection(db, "users", userId, "generatedPlans");
    const q = query(plansRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      // Safely convert timestamps to JS Dates if they exist
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      lastOpenedAt: doc.data().lastOpenedAt?.toDate() || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching user plans:", error);
    return [];
  }
};

/**
 * Updates the completion percentage and last opened timestamp for a plan.
 */
export const updatePlanProgress = async (userId, planId, completionPercentage) => {
  if (!userId || !planId) return;

  try {
    const planRef = doc(db, "users", userId, "generatedPlans", planId);
    await updateDoc(planRef, {
      completionPercentage,
      lastOpenedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating plan progress:", error);
  }
};
