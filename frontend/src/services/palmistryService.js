import apiClient from "./apiClient";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const palmistryService = {
  /**
   * Upload palm image to Firebase Storage.
   */
  async uploadPalmImage(file) {
    if (!file) return null;
    try {
      const fileExtension = file.name.split('.').pop() || 'jpg';
      const fileName = `palm_scans/${uuidv4()}.${fileExtension}`;
      const storageRef = ref(storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Failed to upload palm image to storage", error);
      throw error;
    }
  },

  /**
   * Request AI Analysis of a palm image via backend.
   */
  async analyzePalm(imageUrl) {
    try {
      const response = await apiClient.post("/palmistry/analyze", { imageUrl });
      return response.data;
    } catch (error) {
      console.error("Failed to analyze palm", error);
      throw error;
    }
  },

  /**
   * Save the analysis report to history via backend.
   */
  async saveAnalysis(userId, report) {
    try {
      const response = await apiClient.post("/palmistry/save", { report });
      return response.data;
    } catch (error) {
      console.error("Failed to save analysis", error);
      throw error;
    }
  },

  /**
   * Get past analyses for a user.
   */
  async getAnalysisHistory(userId) {
    try {
      const response = await apiClient.get("/palmistry/history");
      return response.data || [];
    } catch (error) {
      console.error("Failed to fetch palmistry history", error);
      return [];
    }
  }
};
