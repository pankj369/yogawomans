/**
 * IMPLEMENTATION & INTEGRATION GUIDE
 * 
 * This guide provides step-by-step instructions for:
 * 1. Setting up the system in your project
 * 2. Customizing recommendations
 * 3. Integrating with backend APIs
 * 4. Connecting with AI services (OpenAI, Gemini)
 * 5. Adding analytics and tracking
 * 6. Scaling the system
 */

// ============================================================================
// 1. SETUP IN YOUR PROJECT
// ============================================================================

/**
 * Step 1: Install Dependencies
 * 
 * npm install framer-motion react-router-dom
 * 
 * Ensure Tailwind CSS is configured in your project.
 */

/**
 * Step 2: Import Components in Your App
 */

import FindSolution from '@/components/FindSolution';

export default function App() {
  return (
    <div>
      <FindSolution />
    </div>
  );
}

/**
 * Step 3: Ensure Routes are Set Up
 * 
 * The FindSolution component uses react-router Link for:
 * - "/auth" - for "Explore All Classes" button
 * 
 * Make sure these routes exist in your app.
 */

// ============================================================================
// 2. CUSTOMIZING RECOMMENDATIONS
// ============================================================================

/**
 * EXAMPLE: Add a new wellness category
 * 
 * File: wellnessRecommendationData.js
 */

// Step 1: Add to wellnessCategories array
export const wellnessCategories = [
  // ... existing categories
  {
    id: "flexibility",
    label: "Flexibility",
    icon: "🤸",
    color: "from-cyan-400 to-blue-500",
    lightColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    description: "Improving flexibility and mobility",
  },
];

// Step 2: Add questions for the new category
export const questionsByCategory = {
  // ... existing categories
  flexibility: [
    {
      id: "currentFlexibility",
      question: "What's your current flexibility level?",
      type: "single",
      options: [
        { id: "tight", label: "Very Tight" },
        { id: "moderate", label: "Moderate" },
        { id: "good", label: "Already Flexible" },
      ],
    },
    // ... 4 more questions
  ],
};

// Step 3: Create recommendation function
const generateFlexibilityRecommendations = (answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  const tightness = answers.currentFlexibility;

  if (tightness === "tight") {
    recommendations.yogaPoses.push({
      id: "child-pose-stretch",
      name: "Child's Pose Holds",
      duration: "5 min",
      difficulty: "Beginner",
      description: "Gentle pose to start opening hips and hamstrings.",
      benefits: ["Stretches hips", "Calms mind", "Improves flexibility"],
      icon: "🙏",
    });
  }

  // Add more recommendations based on conditions...

  return recommendations;
};

// Step 4: Add to generateRecommendations() switch
export const generateRecommendations = (categoryId, answers) => {
  switch (categoryId) {
    // ... existing cases
    case "flexibility":
      return generateFlexibilityRecommendations(answers);
    default:
      return {
        yogaPoses: [],
        meditations: [],
        breathingExercises: [],
        music: [],
        tips: [],
      };
  }
};

// ============================================================================
// 3. BACKEND API INTEGRATION
// ============================================================================

/**
 * EXAMPLE: Integrate with backend for recommendations
 */

// Create an API service file: services/wellnessService.js

export const wellnessService = {
  /**
   * Generate recommendations via API
   */
  async generateRecommendations(categoryId, answers) {
    try {
      const response = await fetch("/api/wellness/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId,
          answers,
          userId: getCurrentUserId(), // Add user ID if available
        }),
      });

      if (!response.ok) throw new Error("Failed to generate recommendations");
      return await response.json();
    } catch (error) {
      console.error("Error generating recommendations:", error);
      // Fallback to local logic
      return generateRecommendationsLocally(categoryId, answers);
    }
  },

  /**
   * Save user response for future use
   */
  async saveUserResponse(userId, categoryId, answers) {
    try {
      await fetch("/api/wellness/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, categoryId, answers }),
      });
    } catch (error) {
      console.error("Error saving response:", error);
    }
  },

  /**
   * Fetch saved recommendations for user
   */
  async getSavedRecommendations(userId) {
    try {
      const response = await fetch(`/api/wellness/saved-plans/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch saved plans");
      return await response.json();
    } catch (error) {
      console.error("Error fetching saved plans:", error);
      return [];
    }
  },

  /**
   * Track recommendation clicks/engagement
   */
  async trackRecommendationEngagement(userId, recommendationId, action) {
    try {
      await fetch("/api/wellness/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, recommendationId, action }),
      });
    } catch (error) {
      console.error("Error tracking engagement:", error);
    }
  },
};

/**
 * Usage in WellnessModal component:
 * 
 * Replace generateRecommendations call with:
 */

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    const recs = await wellnessService.generateRecommendations(
      category.id,
      selectedAnswers
    );
    setRecommendations(recs);

    // Save response for user profile
    if (userId) {
      await wellnessService.saveUserResponse(userId, category.id, selectedAnswers);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setIsLoading(false);
  }
};

// ============================================================================
// 4. OPENAI / GEMINI API INTEGRATION
// ============================================================================

/**
 * EXAMPLE: Use OpenAI to generate dynamic recommendations
 */

export const aiRecommendationService = {
  async generateWithOpenAI(categoryId, answers) {
    const prompt = this.buildPrompt(categoryId, answers);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a wellness expert. Generate personalized yoga and meditation recommendations in JSON format.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      const data = await response.json();
      const recommendations = JSON.parse(
        data.choices[0].message.content
      );
      return recommendations;
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  },

  buildPrompt(categoryId, answers) {
    return `
      Generate personalized ${categoryId} wellness recommendations based on these responses:
      ${JSON.stringify(answers, null, 2)}
      
      Format the response as JSON with these fields:
      {
        "yogaPoses": [...],
        "meditations": [...],
        "breathingExercises": [...],
        "music": [...],
        "tips": [...]
      }
      
      Each item should have: id, name, duration, difficulty, description, benefits, icon
    `;
  },
};

// Usage:
const recs = await aiRecommendationService.generateWithOpenAI(
  categoryId,
  selectedAnswers
);

// ============================================================================
// 5. USER DASHBOARD INTEGRATION
// ============================================================================

/**
 * Display user's saved recommendations in dashboard
 */

import { wellnessService } from "@/services/wellnessService";

function UserWellnessDashboard({ userId }) {
  const [savedPlans, setSavedPlans] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPlans = async () => {
      const plans = await wellnessService.getSavedRecommendations(userId);
      setSavedPlans(plans);
      setLoading(false);
    };

    fetchPlans();
  }, [userId]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Wellness Plans</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedPlans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-lg border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-gray-800">
                {plan.categoryLabel}
              </h2>
              <p className="text-gray-600 mt-2">
                Created: {new Date(plan.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-gray-700">
                  {plan.recommendations.yogaPoses.length} yoga poses
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {plan.recommendations.meditations.length} meditations
                </p>
              </div>

              <button
                onClick={() => {
                  // Load and display full plan
                }}
                className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                View Plan
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 6. ANALYTICS & TRACKING
// ============================================================================

/**
 * Track user interactions and recommendations
 */

const analyticsService = {
  /**
   * Track when a recommendation is viewed
   */
  trackRecommendationView(recommendationId, categoryId) {
    if (window.gtag) {
      window.gtag("event", "view_recommendation", {
        recommendation_id: recommendationId,
        category: categoryId,
      });
    }
  },

  /**
   * Track when a recommendation is started/clicked
   */
  trackRecommendationStart(recommendationId, categoryId) {
    if (window.gtag) {
      window.gtag("event", "start_recommendation", {
        recommendation_id: recommendationId,
        category: categoryId,
      });
    }
  },

  /**
   * Track form completion
   */
  trackFormCompletion(categoryId, completionTime) {
    if (window.gtag) {
      window.gtag("event", "complete_wellness_form", {
        category: categoryId,
        time_taken: completionTime,
      });
    }
  },

  /**
   * Track saved plans
   */
  trackPlanSaved(categoryId, recommendationCount) {
    if (window.gtag) {
      window.gtag("event", "save_wellness_plan", {
        category: categoryId,
        recommendation_count: recommendationCount,
      });
    }
  },
};

// Usage in RecommendationCard:
const handleStartPractice = () => {
  analyticsService.trackRecommendationStart(recommendation.id, type);
  // Navigate or start practice
};

// ============================================================================
// 7. ADVANCED CUSTOMIZATION
// ============================================================================

/**
 * Create custom recommendation filters
 */

export const recommendationFilters = {
  /**
   * Filter recommendations by experience level
   */
  filterByExperience(recommendations, experienceLevel) {
    return recommendations.map((rec) => {
      if (rec.difficulty) {
        if (
          experienceLevel === "beginner" &&
          rec.difficulty !== "Beginner"
        ) {
          return null; // Filter out
        }
      }
      return rec;
    }).filter(Boolean);
  },

  /**
   * Sort recommendations by duration
   */
  sortByDuration(recommendations, ascending = true) {
    return [...recommendations].sort((a, b) => {
      const aMin = parseInt(a.duration?.split("-")[0] || 0);
      const bMin = parseInt(b.duration?.split("-")[0] || 0);
      return ascending ? aMin - bMin : bMin - aMin;
    });
  },

  /**
   * Prioritize recommendations with most benefits
   */
  prioritizeByBenefits(recommendations) {
    return [...recommendations].sort(
      (a, b) => (b.benefits?.length || 0) - (a.benefits?.length || 0)
    );
  },

  /**
   * Combine multiple filters
   */
  applyFilters(recommendations, filters) {
    let result = recommendations;

    if (filters.experienceLevel) {
      result = this.filterByExperience(result, filters.experienceLevel);
    }

    if (filters.sortBy === "duration") {
      result = this.sortByDuration(result);
    }

    if (filters.sortBy === "benefits") {
      result = this.prioritizeByBenefits(result);
    }

    return result;
  },
};

// ============================================================================
// 8. RESPONSIVE & MOBILE OPTIMIZATION
// ============================================================================

/**
 * The system is mobile-first and responsive by default.
 * 
 * However, you can customize for specific devices:
 */

// For better mobile modal experience:
const mobileOptimizedStyles = {
  modal: "max-h-[95vh] rounded-t-3xl", // Full height on mobile
  cardGrid: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
};

// For landscape mode:
const landscapeStyles = {
  modal: "max-h-[90vh]", // Slightly reduced for landscape
  headerHeight: "h-12", // Shorter header
};

// ============================================================================
// 9. TESTING SETUP
// ============================================================================

/**
 * Example test file: FindSolution.test.js
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FindSolution from "./FindSolution";

describe("FindSolution Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <FindSolution />
      </BrowserRouter>
    );
  });

  test("renders all wellness cards", () => {
    const cards = screen.getAllByRole("button");
    expect(cards.length).toBeGreaterThanOrEqual(9);
  });

  test("opens modal when card is clicked", () => {
    const firstCard = screen.getAllByRole("button")[0];
    fireEvent.click(firstCard);

    // Modal should be visible
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("shows next question when answer is selected", () => {
    // Select a card
    fireEvent.click(screen.getAllByRole("button")[0]);

    // Select an option
    const options = screen.getAllByRole("button").slice(10); // Skip card buttons
    fireEvent.click(options[0]);

    // Click next
    fireEvent.click(screen.getByText(/Next/i));

    // Should show second question
    expect(screen.getByText(/Question 2/i)).toBeInTheDocument();
  });
});

// ============================================================================
// 10. DEPLOYMENT CHECKLIST
// ============================================================================

/**
 * Before deploying to production:
 * 
 * - [ ] All dependencies installed (npm install)
 * - [ ] Tailwind CSS configured
 * - [ ] Environment variables set (.env.production)
 * - [ ] API endpoints configured for backend
 * - [ ] API keys stored securely (not in code)
 * - [ ] Analytics configured (Google Analytics, Mixpanel, etc.)
 * - [ ] Error logging set up (Sentry, LogRocket)
 * - [ ] Mobile responsiveness tested on real devices
 * - [ ] Modal accessibility tested (keyboard navigation, screen readers)
 * - [ ] Load testing performed
 * - [ ] Animations disabled in reduced motion preference
 * - [ ] Build size optimized
 * - [ ] Production builds tested locally
 * - [ ] Error boundaries implemented
 * - [ ] Loading states work correctly
 * - [ ] Offline handling (if applicable)
 * - [ ] SEO metadata (if on landing page)
 * - [ ] Performance audit passed
 */

export const DEPLOYMENT_GUIDE = {
  version: "1.0.0",
  lastUpdated: "2024",
  status: "Ready for Production",
};
