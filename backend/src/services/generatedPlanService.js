import { db } from "../config/firebaseAdmin.js";
import { AppError } from "../middleware/errorMiddleware.js";
import aiService from "./aiService.js";
import crypto from "crypto";

class GeneratedPlanService {
  /**
   * Generates a plan via AI and saves it to Firestore.
   */
  async generateAndSavePlan(uid, preferences, duration, focus) {
    // 1. Generate plan using AI Service
    const aiPlan = await aiService.generateWellnessPlan(preferences, duration, focus);
    
    // 2. Attach ID and standard metadata
    const planToSave = {
      id: crypto.randomBytes(16).toString("hex"),
      userId: uid,
      title: aiPlan.title || focus || "Wellness Journey",
      goal: focus || "",
      duration: duration || "",
      level: preferences?.recommendedLevel || "beginner",
      emotionalSummary: aiPlan.emotionalSummary || aiPlan.summary || "A personalized journey generated for your wellbeing.",
      generatedPhases: aiPlan.schedule || aiPlan.phases || [],
      progress: 0,
      completed: false,
      saved: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastOpenedAt: new Date().toISOString(),
    };

    // 3. Save to Firestore
    await db.collection("generatedPlans").doc(planToSave.id).set(planToSave);
    return planToSave;
  }

  /**
   * Save a newly generated plan for a user (Frontend mapping)
   */
  async savePlan(uid, planData) {
    const planRef = db.collection("generatedPlans").doc(planData.id);
    
    const planToSave = {
      id: planData.id,
      userId: uid,
      title: planData.title || planData.goal || "Wellness Journey",
      goal: planData.goal || "",
      duration: planData.duration || "",
      level: planData.level || "beginner",
      emotionalSummary: planData.emotionalSummary || planData.summary || "",
      generatedPhases: planData.generatedPhases || planData.phases || [],
      progress: planData.progress || 0,
      completed: planData.completed || false,
      saved: true,
      createdAt: planData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastOpenedAt: new Date().toISOString(),
    };

    await planRef.set(planToSave);
    return planToSave;
  }

  /**
   * Fetch all saved plans for a user
   */
  async getUserPlans(uid) {
    const snapshot = await db.collection("generatedPlans")
      .where("userId", "==", uid)
      .orderBy("createdAt", "desc")
      .get();

    const plans = [];
    snapshot.forEach(doc => {
      plans.push({ id: doc.id, ...doc.data() });
    });

    return plans;
  }

  /**
   * Fetch a specific plan
   */
  async getPlanById(planId, uid) {
    const planRef = db.collection("generatedPlans").doc(planId);
    const doc = await planRef.get();

    if (!doc.exists) {
      throw new AppError("Plan not found", 404);
    }

    const data = doc.data();
    if (data.userId !== uid) {
      throw new AppError("Unauthorized access to plan", 403);
    }

    return { id: doc.id, ...data };
  }

  /**
   * Update plan progress
   */
  async updateProgress(planId, uid, completionPercentage) {
    const planRef = db.collection("generatedPlans").doc(planId);
    const doc = await planRef.get();

    if (!doc.exists) {
      throw new AppError("Plan not found", 404);
    }

    if (doc.data().userId !== uid) {
      throw new AppError("Unauthorized access to plan", 403);
    }

    const updates = {
      progress: completionPercentage,
      updatedAt: new Date().toISOString(),
      lastOpenedAt: new Date().toISOString(),
      completed: completionPercentage >= 100,
    };

    await planRef.update(updates);
    
    const updatedDoc = await planRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }
}

export default new GeneratedPlanService();
