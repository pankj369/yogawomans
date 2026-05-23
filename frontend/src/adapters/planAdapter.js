/**
 * planAdapter.js
 * 
 * Normalizes raw plan data from generators or legacy structures into a strictly defined,
 * backend-ready schema. This guarantees that whether data comes from local mock generators,
 * legacy contexts, or a future Firebase/API backend, the UI only ever consumes one consistent shape.
 */

export const normalizePlan = (rawPlan) => {
  if (!rawPlan) return null;

  return {
    id: rawPlan.id || `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: rawPlan.title || `${capitalize(rawPlan.goalId || 'Wellness')} Journey`,
    goal: rawPlan.goal || rawPlan.goalId || 'general',
    duration: rawPlan.duration || rawPlan.durationId || '20min',
    level: rawPlan.level || rawPlan.levelId || 'beginner',
    phases: normalizePhases(rawPlan.timeline || rawPlan.phases),
    progress: typeof rawPlan.completionPercentage === 'number' 
      ? rawPlan.completionPercentage 
      : (typeof rawPlan.progress === 'number' ? rawPlan.progress : 0),
    tags: rawPlan.tags || generateTags(rawPlan),
    createdAt: normalizeDate(rawPlan.createdAt),
    lastOpenedAt: normalizeDate(rawPlan.lastOpenedAt)
  };
};

const normalizePhases = (phases = []) => {
  return phases.map((phase, index) => ({
    id: phase.id || `phase-${index + 1}`,
    name: phase.title || phase.name || `Phase ${index + 1}`,
    duration: phase.time || phase.duration || '5 min',
    description: phase.description || phase.desc || '',
    focus: phase.focus || 'general'
  }));
};

const generateTags = (plan) => {
  const tags = [];
  if (plan.goalId) tags.push(plan.goalId);
  if (plan.levelId) tags.push(plan.levelId);
  return tags;
};

const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const normalizeDate = (dateVal) => {
  if (!dateVal) return new Date().toISOString();
  if (dateVal instanceof Date) return dateVal.toISOString();
  if (dateVal.toDate && typeof dateVal.toDate === 'function') return dateVal.toDate().toISOString(); // Firebase timestamp
  return new Date(dateVal).toISOString(); // ISO string or timestamp number
};
