import { db } from "../config/firebaseAdmin.js";
import palmistryAI from "./ai/palmistryAI.js";

class PalmistryService {
  /**
   * AI Analysis of a palm image using GPT-4 Vision.
   */
  async analyzePalm(uid, imageUrl) {
    return palmistryAI.analyzePalm(uid, imageUrl);
  }

  /**
   * Save the analysis report to history.
   */
  async saveAnalysis(uid, report) {
    const reportsRef = db.collection("users").doc(uid).collection("palmistry_reports");
    const docRef = reportsRef.doc(report.id);
    await docRef.set(report);
    return report;
  }

  /**
   * Get past analyses for a user.
   */
  async getAnalysisHistory(uid) {
    const reportsRef = db.collection("users").doc(uid).collection("palmistry_reports");
    const snapshot = await reportsRef.orderBy("date", "desc").get();
    
    const reports = [];
    snapshot.forEach((doc) => {
      reports.push(doc.data());
    });
    
    return reports;
  }
}

export default new PalmistryService();
