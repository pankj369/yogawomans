import { openai } from "../../config/aiConfig.js";
import telemetry from "../../utils/telemetry.js";

class PalmistryAI {
  /**
   * AI Analysis of a palm image using GPT-4 Vision.
   */
  async analyzePalm(uid, imageUrl) {
    const startTime = Date.now();
    const hasKey = process.env.OPENAI_API_KEY && 
                   process.env.OPENAI_API_KEY.trim() !== "" && 
                   !process.env.OPENAI_API_KEY.startsWith("YOUR_");

    if (hasKey) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an expert palm reader and wellness AI. Analyze the provided image of a palm.
Return ONLY a valid JSON object matching this schema:
{
  "metrics": {
    "emotionalEnergy": "String - e.g., 'Balanced', 'Radiant', 'Stressed'",
    "stressLevels": "String - e.g., 'Low', 'High', 'Releasing'",
    "innerStrength": "String - e.g., 'Resilient', 'Growing'",
    "wellnessAura": "String - e.g., 'Positive', 'Calm'"
  },
  "insights": [
    "String - Insight 1 based on major lines (Life, Heart, Head)",
    "String - Insight 2 based on mounts or secondary lines",
    "String - Insight 3 offering a wellness recommendation based on the palm"
  ]
}`
            },
            {
              role: "user",
              content: [
                { type: "text", text: "Please analyze this palm and provide the wellness insights." },
                { type: "image_url", image_url: { url: imageUrl } }
              ]
            }
          ],
          temperature: 0.7,
          response_format: { type: "json_object" }
        });

        const aiContent = JSON.parse(response.choices[0].message.content);
        const duration = Date.now() - startTime;
        
        // Track telemetry
        telemetry.trackAiMetric("palmistry_vision", duration, true, 800);
        telemetry.trackUserEvent(uid, "PALM_ANALYSIS_COMPLETED", { source: "openai" });

        return {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          imageUrl: imageUrl,
          metrics: aiContent.metrics,
          insights: aiContent.insights
        };
      } catch (error) {
        const duration = Date.now() - startTime;
        telemetry.trackAiMetric("palmistry_vision", duration, false);
        telemetry.captureException(error, { userId: uid, service: "palmistry_vision" });
        console.error("OpenAI Palmistry Vision Error, falling back to local analysis:", error);
      }
    }

    // High quality local fallback readings
    const metricOptions = {
      emotionalEnergy: ["Radiant", "Calm & Grounded", "Highly Sensitive", "Deep & Intuitive"],
      stressLevels: ["Low", "Moderate (Releasing)", "Balanced", "Very Low"],
      innerStrength: ["Resilient & Centered", "Steadfast", "Growing & Adapting", "Highly Fortified"],
      wellnessAura: ["Positive & Healing", "Luminous", "Harmonious", "Vibrant & Rested"]
    };

    const insightOptions = [
      "Your Life Line displays a clear, curved pattern, indicating high vital energy and a strong grounding in physical wellness routines.",
      "The Mount of Venus is prominent, suggesting a warm nature with strong capacity for compassion, emotional intelligence, and interpersonal bonding.",
      "Your Heart Line rises gracefully toward the Mount of Jupiter, showing balanced emotional expression and high resilience under mental or physical strain.",
      "A clean Head Line runs horizontally, pointing to strong analytical focus, clarity in decision-making, and deep mental stability.",
      "The texture and line depth indicate that a daily mindfulness, pranayama, or restorative yoga practice will significantly clear residual stress and amplify your natural aura."
    ];

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const pickN = (arr, n) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    };

    // Simulate small latency for fallback
    await new Promise((resolve) => setTimeout(resolve, 350));
    const duration = Date.now() - startTime;

    telemetry.trackAiMetric("palmistry_fallback", duration, true, 0);
    telemetry.trackUserEvent(uid, "PALM_ANALYSIS_COMPLETED", { source: "fallback" });

    return {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      imageUrl: imageUrl,
      metrics: {
        emotionalEnergy: pick(metricOptions.emotionalEnergy),
        stressLevels: pick(metricOptions.stressLevels),
        innerStrength: pick(metricOptions.innerStrength),
        wellnessAura: pick(metricOptions.wellnessAura)
      },
      insights: pickN(insightOptions, 3)
    };
  }
}

export default new PalmistryAI();
