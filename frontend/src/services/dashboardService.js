import { useWellnessStore } from '../stores/useWellnessStore';

/**
 * dashboardService.js (Mock Layer)
 * 
 * Aggregates frontend state to provide unified insights for the dashboard.
 */

export const getDashboardInsights = async () => {
  // Simulate network
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const state = useWellnessStore.getState();
  
  // Calculate stats based on history and plans
  const totalPlans = state.generatedPlans.length;
  const completedSessions = state.generatedHistory.length;
  const activeStreak = totalPlans > 0 ? 1 : 0; // Mock streak logic
  
  return {
    totalPlans,
    completedSessions,
    activeStreak,
    recentActivity: state.recentActivity,
    recommendedFocus: state.wellnessPreferences?.goals?.[0] || 'Stress Relief'
  };
};
