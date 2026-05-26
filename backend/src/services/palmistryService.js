import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";
import { openai } from "../config/aiConfig.js";

class PalmistryService {
  /**
   * AI Analysis of a palm image using GPT-4 Vision.
   */
  async analyzePalm(uid, imageUrl) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert palm reader and wellness AI. Analyze the provided image of a palm.
Return ONLY a valid JSON object matching this schema:
{
  "metrics": {
    "emotionalEnergy": "String - e.g., 'Balanced', 'Radiant', 'Stressed'",
    "stressLevels": "String - e.g., 'Low', 'High', 'Releasing'",
    "innerStrength": "String - e.g., 'Resilient', 'Growing'",
    "wellnessAura": "String - e.g., 'Positive', 'Calm'"
  },
  "insights": [
    "String - Insight 1 based on major lines (Life, Heart, Head)",
    "String - Insight 2 based on mounts or secondary lines",
    "String - Insight 3 offering a wellness recommendation based on the palm"
  ]
}`
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Please analyze this palm and provide the wellness insights." },
              { type: "image_url", image_url: { url: imageUrl } }
            ]
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const aiContent = JSON.parse(response.choices[0].message.content);

      const report = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        imageUrl: imageUrl,
        metrics: aiContent.metrics,
        insights: aiContent.insights
      };
      
      return report;
    } catch (error) {
      console.error("OpenAI Palmistry Vision Error:", error);
      throw new AppError("Failed to analyze palm image", 500);
    }
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
