import { openai } from "../../config/aiConfig.js";
import { getWellnessProfilePrompt, getInsightPrompt } from "../../utils/aiPrompts.js";
import telemetry from "../../utils/telemetry.js";

class WellnessAI {
  /**
   * Generates an AI Wellness Profile based on user onboarding data.
   */
  async generateWellnessProfile(profileData, uid = null) {
    const startTime = Date.now();
    const prompt = getWellnessProfilePrompt(profileData);
    const hasKey = process.env.OPENAI_API_KEY && 
                   process.env.OPENAI_API_KEY.trim() !== "" && 
                   !process.env.OPENAI_API_KEY.startsWith("YOUR_");

    if (hasKey) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: prompt }],
          temperature: 0.7,
          response_format: { type: "json_object" }
        });

        const jsonContent = response.choices[0].message.content;
        const result = JSON.parse(jsonContent);
        const duration = Date.now() - startTime;

        telemetry.trackAiMetric("wellness_profile", duration, true, 400);
        if (uid) telemetry.trackUserEvent(uid, "WELLNESS_PROFILE_GENERATED", { source: "openai" });

        return result;
      } catch (error) {
        const duration = Date.now() - startTime;
        telemetry.trackAiMetric("wellness_profile", duration, false);
        telemetry.captureException(error, { userId: uid, service: "wellness_profile" });
        console.error("OpenAI Wellness Profile Generation Error, falling back:", error);
      }
    }

    // High quality local fallback profile
    const goals = profileData.goals || [];
    let path = "Hatha Yoga & Breath Awareness";
    let aura = "Centered & Luminous";
    let resilience = "Moderate";
    let calmFactor = 65;

    if (goals.includes("Stress Relief") || goals.includes("Anxiety Relief")) {
      path = "Restorative Yoga & Yin Stretch";
      aura = "Restoring & Calming";
      calmFactor = 55;
    } else if (goals.includes("Weight Loss") || goals.includes("Strength")) {
      path = "Power Vinyasa & Core Strengthening";
      aura = "Vibrant & High Energy";
      resilience = "Strong";
      calmFactor = 75;
    }

    const duration = Date.now() - startTime;
    telemetry.trackAiMetric("wellness_profile_fallback", duration, true, 0);
    if (uid) telemetry.trackUserEvent(uid, "WELLNESS_PROFILE_GENERATED", { source: "fallback" });

    return {
      calmFactor,
      resilienceLevel: resilience,
      primaryAura: aura,
      focusPath: path,
      wellnessPersonality: goals.includes("Stress Relief") ? "The Grounded Seeker" : "The Balanced Alchemist",
      healingRecommendations: [
        "Incorporate 10 minutes of gentle pranayama daily to ground your nervous system.",
        "Perform a mindful body scan exercise prior to sleep.",
        "Focus on alignment and slow transitions during physical asana movements."
      ],
      practiceIntensity: goals.includes("Strength") ? "Moderate Flow" : "Restorative & Calming",
      breathingRoutines: [
        { name: "Sama Vritti (Box Breathing)", purpose: "Balances energy levels and centers the mind." }
      ],
      meditationStyle: "Mindfulness of Breath",
      energyBalanceInsights: "Establish daily rest cycles to complement physical output. Focus on stabilizing your breath patterns."
    };
  }

  /**
   * Generates dynamic, emotionally intelligent dashboard insights.
   */
  async generateInsights(profile, stats, history, mood) {
    const startTime = Date.now();
    const prompt = getInsightPrompt(profile, stats, history, mood);
    const hasKey = process.env.OPENAI_API_KEY && 
                   process.env.OPENAI_API_KEY.trim() !== "" && 
                   !process.env.OPENAI_API_KEY.startsWith("YOUR_");

    if (hasKey) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: prompt }],
          temperature: 0.6,
        });

        const content = response.choices[0].message.content.trim();
        const duration = Date.now() - startTime;

        telemetry.trackAiMetric("wellness_insights", duration, true, 200);
        return {
          message: content,
          calmScore: stats.calmScore || 50,
          momentum: (stats.currentStreak || 0) > 2 ? "Active" : "Resting"
        };
      } catch (error) {
        const duration = Date.now() - startTime;
        telemetry.trackAiMetric("wellness_insights", duration, false);
        telemetry.captureException(error, { userId: profile.id, service: "wellness_insights" });
        console.error("OpenAI Insights Generation Error:", error);
      }
    }

    const duration = Date.now() - startTime;
    telemetry.trackAiMetric("wellness_insights_fallback", duration, true, 0);

    return {
      message: "Take a deep breath and reconnect with your inner stillness. You are on the right path.",
      calmScore: stats.calmScore || 50,
      momentum: (stats.currentStreak || 0) > 2 ? "Active" : "Resting"
    };
  }
}

export default new WellnessAI();
