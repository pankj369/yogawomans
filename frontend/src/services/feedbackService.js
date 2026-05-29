import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { sendFeedbackToGoogleSheet } from "./googleSheetService";

/**
 * Validates feedback data before submission
 * @param {Object} data 
 * @returns {Object} { isValid, error }
 */
const validateFeedback = (data) => {
  if (!data.category) {
    return { isValid: false, error: "Category is required." };
  }
  if (!data.message || data.message.trim().length < 10) {
    return { isValid: false, error: "Message is required and must be at least 10 characters long." };
  }
  return { isValid: true, error: null };
};

/**
 * Uploads a screenshot to Firebase Storage
 * @param {File} file 
 * @returns {Promise<string>} Download URL
 */
export const uploadScreenshot = async (file) => {
  if (!file) throw new Error("No file provided.");
  
  // File size validation (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("File size must be less than 5MB.");
  }

  // File type validation
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WebP images are allowed.");
  }

  const fileName = `feedback-screenshots/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, fileName);
  
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Screenshot upload failed:", error);
        reject(new Error("Failed to upload screenshot. Please try again."));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(new Error("Failed to get screenshot URL."));
        }
      }
    );
  });
};

/**
 * Submits feedback to Firestore
 * @param {Object} feedbackData 
 * @returns {Promise<string>} Document ID
 */
export const submitFeedback = async (feedbackData) => {
  const { isValid, error } = validateFeedback(feedbackData);
  if (!isValid) {
    throw new Error(error);
  }

  try {
    const docRef = await addDoc(collection(db, "feedbacks"), {
      ...feedbackData,
      status: "open",
      createdAt: serverTimestamp(),
    });
    
    // Non-blocking call to Google Sheets Service
    sendFeedbackToGoogleSheet({
      ...feedbackData,
      feedbackId: docRef.id,
      status: "open",
    });

    return docRef.id;
  } catch (error) {
    console.error("Firestore save failed:", error);
    throw new Error("Failed to save feedback. Please try again later.");
  }
};

/**
 * Retrieves feedback for a specific user
 * @param {string} userId 
 * @returns {Promise<Array>} Array of feedback objects
 */
export const getUserFeedback = async (userId) => {
  if (!userId) throw new Error("User ID is required.");
  
  try {
    const q = query(
      collection(db, "feedbacks"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Failed to fetch user feedback:", error);
    throw new Error("Failed to fetch your feedback history.");
  }
};

/**
 * Retrieves all feedback (Admin only typically)
 * @returns {Promise<Array>} Array of feedback objects
 */
export const getAllFeedback = async () => {
  try {
    const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Failed to fetch all feedback:", error);
    throw new Error("Failed to fetch feedback list.");
  }
};
