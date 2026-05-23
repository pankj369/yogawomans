import React, { createContext, useContext, useState } from 'react';

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plans, setPlans] = useState([]);

  const loadUserPlans = (userId) => {
    if (!userId) return [];
    try {
      const stored = localStorage.getItem(`yogawomans_plans_${userId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Re-hydrate dates
        const withDates = parsed.map(p => ({
          ...p,
          createdAt: new Date(p.createdAt),
          lastOpenedAt: new Date(p.lastOpenedAt)
        }));
        setPlans(withDates);
        return withDates;
      }
    } catch (e) {
      console.error("Failed to load user plans from localStorage", e);
    }
    setPlans([]);
    return [];
  };

  const savePlan = async (userId, planData) => {
    if (!userId) throw new Error("User ID is required to save a plan");

    const currentPlans = loadUserPlans(userId);
    const newPlanId = `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newPlan = {
      ...planData,
      id: newPlanId,
      completionPercentage: 0,
      createdAt: new Date(),
      lastOpenedAt: new Date(),
    };

    const updatedPlans = [newPlan, ...currentPlans];
    
    try {
      localStorage.setItem(`yogawomans_plans_${userId}`, JSON.stringify(updatedPlans));
      setPlans(updatedPlans);
      return newPlanId;
    } catch (e) {
      console.error("Failed to save plan to localStorage", e);
      throw e;
    }
  };

  const updatePlanProgress = async (userId, planId, completionPercentage) => {
    if (!userId || !planId) return;

    const currentPlans = loadUserPlans(userId);
    const updatedPlans = currentPlans.map(plan => 
      plan.id === planId 
        ? { ...plan, completionPercentage, lastOpenedAt: new Date() }
        : plan
    );

    try {
      localStorage.setItem(`yogawomans_plans_${userId}`, JSON.stringify(updatedPlans));
      setPlans(updatedPlans);
    } catch (e) {
      console.error("Failed to update plan progress in localStorage", e);
    }
  };

  return (
    <PlanContext.Provider value={{ plans, loadUserPlans, savePlan, updatePlanProgress }}>
      {children}
    </PlanContext.Provider>
  );
}

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlanContext must be used within a PlanProvider");
  }
  return context;
};
