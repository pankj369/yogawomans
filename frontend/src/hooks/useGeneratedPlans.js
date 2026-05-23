import { useEffect } from 'react';
import { useWellnessStore } from '../stores/useWellnessStore';
import { getUserPlans } from '../services/planService';
import { useAuth } from '../context/AuthContext';

/**
 * useGeneratedPlans Hook
 * 
 * Exposes only the plans state and actions to components, preventing re-renders
 * on other unrelated store updates.
 */
export const useGeneratedPlans = () => {
  const { user } = useAuth();
  const generatedPlans = useWellnessStore((state) => state.generatedPlans);
  const currentPlan = useWellnessStore((state) => state.currentPlan);
  const setCurrentPlan = useWellnessStore((state) => state.setCurrentPlan);
  const isLoaded = useWellnessStore((state) => state.plansLoaded);

  useEffect(() => {
    if (user?.id && !isLoaded) {
      getUserPlans(user.id).then(() => {
        useWellnessStore.setState({ plansLoaded: true });
      });
    }
  }, [user?.id, isLoaded]);

  return {
    generatedPlans,
    currentPlan,
    setCurrentPlan
  };
};
