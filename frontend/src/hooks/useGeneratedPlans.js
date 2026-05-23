import { useWellnessStore } from '../stores/useWellnessStore';

/**
 * useGeneratedPlans Hook
 * 
 * Exposes only the plans state and actions to components, preventing re-renders
 * on other unrelated store updates.
 */
export const useGeneratedPlans = () => {
  const generatedPlans = useWellnessStore((state) => state.generatedPlans);
  const currentPlan = useWellnessStore((state) => state.currentPlan);
  const setCurrentPlan = useWellnessStore((state) => state.setCurrentPlan);
  
  // Notice we don't return the store directly, we return specific slices
  return {
    generatedPlans,
    currentPlan,
    setCurrentPlan
  };
};
