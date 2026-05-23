import { useWellnessStore } from '../stores/useWellnessStore';

/**
 * planService.js (Mock Layer)
 * 
 * Simulates backend API calls for saving and fetching plans.
 * Currently writes directly to the Zustand global store.
 * 
 * Future Backend Integration:
 * Replace the Zustand calls in these functions with fetch() or Firebase calls.
 */

export const saveGeneratedPlan = async (userId, planData) => {
  try {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 600));

    // Ensure the plan has an ID
    const planToSave = {
      ...planData,
      id: planData.id || `plan_${Date.now()}`
    };

    useWellnessStore.getState().saveGeneratedPlan(planToSave);
    
    // Log activity
    useWellnessStore.getState().addRecentActivity({
      id: `act_${Date.now()}`,
      type: 'PLAN_CREATED',
      title: `Generated new ${planToSave.title}`,
      timestamp: new Date().toISOString()
    });

    return planToSave.id;
  } catch (error) {
    console.error("Error in mock saveGeneratedPlan:", error);
    throw error;
  }
};

export const getUserPlans = async (userId) => {
  try {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const { generatedPlans } = useWellnessStore.getState();
    return generatedPlans;
  } catch (error) {
    console.error("Error in mock getUserPlans:", error);
    return [];
  }
};

export const updatePlanProgress = async (userId, planId, completionPercentage) => {
  try {
    useWellnessStore.getState().updatePlanProgress(planId, completionPercentage);
  } catch (error) {
    console.error("Error in mock updatePlanProgress:", error);
  }
};
