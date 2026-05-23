import { useWellnessStore } from '../stores/useWellnessStore';

/**
 * sessionService.js (Mock Layer)
 * 
 * Simulates backend session tracking.
 */

export const startSession = async (planData) => {
  try {
    const sessionDetails = {
      id: `session_${Date.now()}`,
      planId: planData.id,
      planTitle: planData.title,
      startedAt: new Date().toISOString(),
      currentPhaseIndex: 0,
      status: 'active'
    };

    useWellnessStore.getState().setActiveSession(sessionDetails);

    useWellnessStore.getState().addRecentActivity({
      id: `act_${Date.now()}`,
      type: 'SESSION_STARTED',
      title: `Started ${planData.title}`,
      timestamp: new Date().toISOString()
    });

    return sessionDetails;
  } catch (error) {
    console.error("Error starting session:", error);
    throw error;
  }
};

export const completeSession = async (sessionId) => {
  try {
    const store = useWellnessStore.getState();
    const session = store.activeSession;

    if (session && session.id === sessionId) {
      store.addHistoryLog({
        id: `hist_${Date.now()}`,
        sessionId,
        planId: session.planId,
        planTitle: session.planTitle,
        completedAt: new Date().toISOString(),
        durationPlayed: '20 min', // Mock duration
      });

      store.addRecentActivity({
        id: `act_${Date.now()}`,
        type: 'SESSION_COMPLETED',
        title: `Completed ${session.planTitle}`,
        timestamp: new Date().toISOString()
      });

      // Update plan progress to 100%
      store.updatePlanProgress(session.planId, 100);

      store.clearActiveSession();
    }
  } catch (error) {
    console.error("Error completing session:", error);
  }
};
