import apiClient from "./apiClient";
import { useWellnessStore } from '../stores/useWellnessStore';

/**
 * planService.js
 * 
 * Handles backend API calls for saving and fetching generated plans.
 */

export const generatePlanApi = async (preferences, duration, focus) => {
  try {
    const response = await apiClient.post("/plans/generate", { preferences, duration, focus });
    return response.data.data;
  } catch (error) {
    console.error("Error generating AI plan:", error);
    throw error;
  }
};

export const saveGeneratedPlan = async (userId, planData) => {
  try {
    const planToSave = {
      ...planData,
      id: planData.id || `plan_${Date.now()}`
    };

    const response = await apiClient.post("/plans", planToSave);
    
    // Also update the local store for immediate UI feedback
    if (response?.data) {
      useWellnessStore.getState().saveGeneratedPlan(response.data);
    } else {
      useWellnessStore.getState().saveGeneratedPlan(planToSave);
    }

    useWellnessStore.getState().addRecentActivity({
      id: `act_${Date.now()}`,
      type: 'PLAN_CREATED',
      title: `Generated new ${planToSave.title || "Plan"}`,
      timestamp: new Date().toISOString()
    });

    return response?.data?.id || planToSave.id;
  } catch (error) {
    console.error("Error saving plan:", error);
    throw error;
  }
};

export const getUserPlans = async (userId) => {
  try {
    const response = await apiClient.get("/plans");
    const plans = response?.data || [];
    
    // Sync to local store
    useWellnessStore.setState({ generatedPlans: plans });
    
    return plans;
  } catch (error) {
    console.error("Error fetching user plans:", error);
    return [];
  }
};

export const updatePlanProgress = async (userId, planId, completionPercentage) => {
  try {
    await apiClient.patch(`/plans/${planId}/progress`, { completionPercentage });
    useWellnessStore.getState().updatePlanProgress(planId, completionPercentage);
  } catch (error) {
    console.error("Error updating plan progress:", error);
  }
};
