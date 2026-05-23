import { generateRecommendations } from '../data/wellnessRecommendationData';
import { normalizePlan } from '../adapters/planAdapter';

/**
 * planEngine.js
 * 
 * Centralized generation engine for all wellness plans.
 * Currently uses local rule-based generation (generateRecommendations),
 * but serves as the clean boundary where future AI logic will be injected.
 */

export const generatePlan = async (goalId, parameters) => {
  try {
    // 1. Simulate network/AI delay for realistic UX (if desired, though UI usually handles this)
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // 2. Map frontend parameters to the format expected by the legacy generator
    const generatorAnswers = {
      stressLevel: parameters.levelId || 'beginner',
      timeAvailable: parameters.durationId || '20min',
      // We can map other dynamic answers if needed, or just pass generic ones for now
    };

    // 3. Call the core generator
    const rawData = generateRecommendations(goalId, generatorAnswers);

    // 4. Map into standard phases timeline
    const phases = [];
    if (rawData.breathingExercises?.length > 0) {
      phases.push({
        id: "phase-1",
        type: "Breathing",
        name: rawData.breathingExercises[0].name,
        duration: "5 mins",
        description: rawData.breathingExercises[0].description,
      });
    }
    if (rawData.yogaPoses?.length > 0) {
      phases.push({
        id: "phase-2",
        type: "Movement",
        name: "Healing Flow",
        duration: "10 mins",
        description: "A tailored physical sequence designed to release tension.",
        items: rawData.yogaPoses.map(p => p.name)
      });
    }
    if (rawData.meditations?.length > 0) {
      phases.push({
        id: "phase-3",
        type: "Recovery",
        name: rawData.meditations[0].name,
        duration: "5 mins",
        description: rawData.meditations[0].description,
      });
    }

    // 5. Merge parameters into the rawData so the adapter knows the true source intent
    const enrichedData = {
      ...rawData,
      goalId,
      durationId: parameters.durationId,
      levelId: parameters.levelId,
      phases
    };

    // 6. Normalize
    const normalizedPlan = normalizePlan(enrichedData);

    return normalizedPlan;
  } catch (error) {
    console.error("Error generating plan:", error);
    throw new Error("Failed to generate wellness plan. Please try again.");
  }
};
