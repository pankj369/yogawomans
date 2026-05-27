import { openai } from "../../config/aiConfig.js";
import { getWellnessPlanPrompt } from "../../utils/aiPrompts.js";
import telemetry from "../../utils/telemetry.js";

class PlanGeneratorAI {
  /**
   * Generates a fully personalized wellness plan in structured JSON format.
   * @param {Object} preferences User preferences, goals, etc.
   * @param {String} duration E.g., '14 days'
   * @param {String} focus E.g., 'Stress Relief'
   * @param {String} uid Optional user id
   */
  async generateWellnessPlan(preferences, duration, focus, uid = null) {
    const startTime = Date.now();
    const prompt = getWellnessPlanPrompt(preferences, duration, focus);
    const hasKey = process.env.OPENAI_API_KEY && 
                   process.env.OPENAI_API_KEY.trim() !== "" && 
                   !process.env.OPENAI_API_KEY.startsWith("YOUR_");

    if (hasKey) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini", // Using mini for fast, structured generation
          messages: [{ role: "system", content: prompt }],
          temperature: 0.7,
          response_format: { type: "json_object" }
        });

        const jsonContent = response.choices[0].message.content;
        const result = JSON.parse(jsonContent);
        const durationMs = Date.now() - startTime;

        telemetry.trackAiMetric("plan_generation", durationMs, true, 600);
        if (uid) telemetry.trackUserEvent(uid, "WELLNESS_PLAN_GENERATED", { source: "openai", focus });

        return result;
      } catch (error) {
        const durationMs = Date.now() - startTime;
        telemetry.trackAiMetric("plan_generation", durationMs, false);
        telemetry.captureException(error, { userId: uid, service: "plan_generation" });
        console.error("OpenAI Plan Generation Error, falling back:", error);
      }
    }

    // High quality local fallback plan
    const totalDays = duration ? parseInt(duration) || 7 : 7;
    const schedule = [];
    
    const focusActivities = {
      "Stress Relief": {
        asanas: ["Balasana (Child's Pose)", "Uttanasana (Forward Fold)", "Viparita Karani (Legs Up Wall)", "Adho Mukha Svanasana", "Sukhasana (Easy Seat)"],
        meditations: ["Pranayama Deep Exhalations", "Anapana Breath Awareness", "Body Scan for Stress Release", "Mindful Self-Compassion Guided"],
        tips: ["Take three deep breaths before checking notifications.", "Release tension in your jaw and tongue.", "Drop your shoulders and scan for physical holdings.", "Notice the pause between your breath cycles."]
      },
      "Physical Energy": {
        asanas: ["Virabhadrasana I & II (Warrior)", "Trikonasana (Triangle Pose)", "Surya Namaskar (Sun Salutations)", "Bhujangasana (Cobra)", "Adho Mukha Svanasana"],
        meditations: ["Ujjayi Breath Awakening", "Kapalabhati Pranic Charging", "Vibrant Energy Visualisation", "Solar Plexus Activation"],
        tips: ["Start your morning with a tall glass of warm water.", "Stand tall in Tadasana to realign your posture.", "Incorporate dynamic stretching whenever sitting for long hours.", "Focus your gaze forward with intent."]
      },
      "Mental Focus": {
        asanas: ["Vrikshasana (Tree Pose)", "Garudasana (Eagle Pose)", "Nadi Shodhana (Alternate Nostril)", "Balasana (Child's Pose)", "Savasana"],
        meditations: ["Single-Point Trataka Candle Meditation", "Mindfulness of Thoughts Observing Flow", "Zen Silent Zazen", "Om Mantra Chanting for Alignment"],
        tips: ["Establish a single-tasking focus window today.", "Remove digital clutter from your immediate workspace.", "Listen to low-frequency focus ambient sound tracks.", "Pause for 2 minutes of silent box breathing."]
      }
    };

    const activeSet = focusActivities[focus] || focusActivities["Stress Relief"];
    const pickN = (arr, n) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    };

    for (let day = 1; day <= totalDays; day++) {
      schedule.push({
        day,
        theme: `Day ${day}: Deepen ${focus || "Wellness"}`,
        sessions: [
          {
            title: pickN(activeSet.asanas, 1)[0],
            type: "Yoga",
            durationMin: 15,
            reason: "To release physical bindings and warm up."
          },
          {
            title: pickN(activeSet.meditations, 1)[0],
            type: "Meditation",
            durationMin: 10,
            reason: "To calm the nervous system and steady thoughts."
          }
        ],
        mindfulnessTip: pickN(activeSet.tips, 1)[0]
      });
    }

    const durationMs = Date.now() - startTime;
    telemetry.trackAiMetric("plan_generation_fallback", durationMs, true, 0);
    if (uid) telemetry.trackUserEvent(uid, "WELLNESS_PLAN_GENERATED", { source: "fallback", focus });

    return {
      title: `${focus || "Wellness Journey"} Plan`,
      summary: `A personalized ${duration || "7-day"} plan tailored for your wellness goals and focused on ${focus || "general wellbeing"}.`,
      schedule
    };
  }
}

export default new PlanGeneratorAI();
