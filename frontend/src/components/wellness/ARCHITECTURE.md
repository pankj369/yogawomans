/**
 * WELLNESS RECOMMENDATION SYSTEM ARCHITECTURE
 * 
 * This document outlines the complete system architecture, data flow,
 * and integration points for the Personalized Wellness Recommendation System.
 * 
 * ============================================================================
 * FILE STRUCTURE
 * ============================================================================
 * 
 * frontend/src/
 * ├── components/
 * │   ├── FindSolution.jsx                    ← Main container component
 * │   └── wellness/
 * │       ├── index.js                        ← Component exports
 * │       ├── WellnessCard.jsx                ← Category display card
 * │       ├── WellnessModal.jsx               ← Main modal container
 * │       ├── QuestionStep.jsx                ← Form question component
 * │       ├── RecommendationCard.jsx          ← Recommendation display
 * │       ├── ResultSection.jsx               ← Results container
 * │       ├── README.md                       ← Full documentation
 * │       └── ARCHITECTURE.md                 ← This file
 * └── data/
 *     └── wellnessRecommendationData.js       ← All data & logic
 * 
 * ============================================================================
 * DATA FLOW DIAGRAM
 * ============================================================================
 * 
 * 1. INITIALIZATION
 *    ┌──────────────────┐
 *    │ FindSolution     │
 *    │ Component Mounts │
 *    └────────┬─────────┘
 *             │
 *             ├─→ Load wellnessCategories
 *             └─→ Render WellnessCards (9 cards)
 * 
 * 2. USER SELECTS CARD
 *    ┌─────────────────────┐
 *    │ User clicks card    │
 *    └────────┬────────────┘
 *             │
 *             ├─→ setActiveCard(categoryId)
 *             ├─→ setSelectedCategory(category)
 *             └─→ setIsModalOpen(true)
 * 
 * 3. MODAL OPENS WITH FIRST QUESTION
 *    ┌──────────────────────────────────┐
 *    │ WellnessModal renders            │
 *    │ - Load questions from category   │
 *    │ - Show first question (step 0)   │
 *    └────────┬─────────────────────────┘
 *             │
 *             └─→ QuestionStep Component
 *                 - Display progress bar
 *                 - Show question text
 *                 - Render options (single/multiple)
 * 
 * 4. USER ANSWERS QUESTIONS (LOOP)
 *    ┌─────────────────────────────────┐
 *    │ User selects answer             │
 *    └────────┬────────────────────────┘
 *             │
 *             ├─→ onAnswerChange(questionId, answer)
 *             └─→ setSelectedAnswers({...})
 *                 │
 *                 ├─→ Validate answer
 *                 ├─→ Show confirmation
 *                 └─→ Enable Next button
 * 
 * 5. USER SUBMITS FORM
 *    ┌───────────────────────────┐
 *    │ User clicks Submit Button │
 *    └────────┬──────────────────┘
 *             │
 *             ├─→ Validate all answers
 *             ├─→ setIsLoading(true)
 *             ├─→ Simulate delay (2 seconds)
 *             └─→ generateRecommendations(categoryId, answers)
 * 
 * 6. RECOMMENDATION ENGINE
 *    ┌──────────────────────────────────────────────────┐
 *    │ generateRecommendations()                        │
 *    └────────┬─────────────────────────────────────────┘
 *             │
 *             ├─→ Switch on categoryId
 *             ├─→ Call category-specific function
 *             ├─→ Pass selectedAnswers to function
 *             │
 *             └─→ Example: generateStressRecommendations(answers)
 *                 │
 *                 ├─→ Extract symptoms from answers
 *                 ├─→ Extract time available
 *                 ├─→ Extract experience level
 *                 ├─→ Extract preferred solution
 *                 │
 *                 └─→ Build recommendations object
 *                     {
 *                       yogaPoses: [
 *                         { id, name, duration, benefits, ... }
 *                       ],
 *                       meditations: [...],
 *                       breathingExercises: [...],
 *                       music: [...],
 *                       tips: [...]
 *                     }
 * 
 * 7. DISPLAY RESULTS
 *    ┌───────────────────────────────────┐
 *    │ setIsLoading(false)               │
 *    │ setRecommendations(generated)     │
 *    └────────┬────────────────────────┘
 *             │
 *             └─→ ResultSection Component
 *                 │
 *                 ├─→ Show personalization header
 *                 ├─→ Map through recommendation categories
 *                 │   ├─→ Yoga Poses section
 *                 │   ├─→ Meditations section
 *                 │   ├─→ Breathing Exercises section
 *                 │   ├─→ Relaxing Music section
 *                 │   └─→ Wellness Tips section
 *                 │
 *                 ├─→ For each recommendation:
 *                 │   └─→ RecommendationCard
 *                 │       - Expandable for details
 *                 │       - Shows steps if available
 *                 │       - Shows benefits
 *                 │
 *                 ├─→ Show Personalization Summary
 *                 │   (all answered questions)
 *                 │
 *                 └─→ Action buttons
 *                     ├─→ Start Your Journey
 *                     ├─→ Save My Plan
 *                     └─→ Get New Plan
 * 
 * ============================================================================
 * STATE MANAGEMENT
 * ============================================================================
 * 
 * FINDSOUTION COMPONENT (Parent)
 * ├── activeCard (string | null)          // Currently selected card ID
 * ├── selectedCategory (object | null)    // Full category data
 * └── isModalOpen (boolean)                // Modal visibility
 * 
 * WELLNESSMODAL COMPONENT (Child)
 * ├── currentStep (number)                 // 0 to questions.length - 1
 * ├── selectedAnswers (object)             // { questionId: answer }
 * ├── recommendations (object | null)     // Generated recommendations
 * └── isLoading (boolean)                 // Loading state
 * 
 * ============================================================================
 * RECOMMENDATION LOGIC FLOW
 * ============================================================================
 * 
 * Each category has its own generateXRecommendations function that:
 * 
 * 1. EXTRACT ANSWERS
 *    const symptoms = answers.symptoms || [];
 *    const preferredSolution = answers.preferredSolution || "all";
 *    const timeAvailable = answers.timeAvailable || "10min";
 * 
 * 2. INITIALIZE RECOMMENDATIONS OBJECT
 *    {
 *      yogaPoses: [],
 *      meditations: [],
 *      breathingExercises: [],
 *      music: [],
 *      tips: []
 *    }
 * 
 * 3. CONDITIONAL LOGIC BASED ON ANSWERS
 *    if (symptoms.includes("anxiety")) {
 *      recommendations.breathingExercises.push(ANULOM_VILOM);
 *      recommendations.meditations.push(GROUNDING);
 *    }
 * 
 *    if (preferredSolution === "yoga" || preferredSolution === "all") {
 *      recommendations.yogaPoses.push(CHILD_POSE);
 *    }
 * 
 * 4. RETURN COMPLETE RECOMMENDATIONS
 *    return recommendations;
 * 
 * ============================================================================
 * COMPONENT HIERARCHY
 * ============================================================================
 * 
 *  FindSolution (Main Container)
 *  │
 *  ├─ Animated Background (motion.div)
 *  ├─ Header Section
 *  │  ├─ Badge
 *  │  ├─ Title
 *  │  ├─ Subtitle
 *  │  └─ Divider
 *  │
 *  ├─ Cards Grid (motion.div)
 *  │  └─ WellnessCard (×9)
 *  │     └─ onClick handler
 *  │
 *  ├─ Active Card Description (conditional)
 *  │  └─ Animated container
 *  │
 *  ├─ WellnessModal (conditional)
 *  │  │
 *  │  ├─ Modal Header
 *  │  │  ├─ Category icon & info
 *  │  │  └─ Close button
 *  │  │
 *  │  ├─ Modal Content (AnimatePresence)
 *  │  │  ├─ QuestionStep (current step only)
 *  │  │  │  ├─ Progress bar
 *  │  │  │  ├─ Question text
 *  │  │  │  └─ Options (buttons)
 *  │  │  │
 *  │  │  ├─ Loading State (when generating)
 *  │  │  │  ├─ Spinner animation
 *  │  │  │  ├─ Title
 *  │  │  │  └─ Progress stages
 *  │  │  │
 *  │  │  └─ ResultSection (when recommendations ready)
 *  │  │     ├─ Header
 *  │  │     ├─ Recommendation Categories
 *  │  │     │  ├─ Yoga Poses
 *  │  │     │  │  └─ RecommendationCard (×N)
 *  │  │     │  │     ├─ Header
 *  │  │     │  │     ├─ Expandable content
 *  │  │     │  │     └─ Benefits
 *  │  │     │  ├─ Meditations
 *  │  │     │  ├─ Breathing Exercises
 *  │  │     │  ├─ Music
 *  │  │     │  └─ Tips
 *  │  │     ├─ Personalization Summary
 *  │  │     └─ Action buttons
 *  │  │
 *  │  └─ Modal Footer
 *  │     ├─ Previous button
 *  │     ├─ Question counter
 *  │     └─ Next/Submit button
 *  │
 *  ├─ CTA Section
 *  │  ├─ Info text
 *  │  └─ "Explore Classes" button
 *  │
 *  └─ Features Section
 *     └─ Feature cards (×3)
 * 
 * ============================================================================
 * ANIMATION TRIGGERS
 * ============================================================================
 * 
 * COMPONENT ENTRANCE
 * - Badge: fade in + slide down (delay 0s)
 * - Title: fade in + slide down (delay 0.1s)
 * - Cards: staggered entry with Y offset (delay 0.2s + staggerChildren 0.1s)
 * 
 * INTERACTION ANIMATIONS
 * - Card hover: scale 1.05, Y -8px
 * - Card click: scale 0.98
 * - Icon hover: rotate 10deg, scale 1.2
 * - Button hover: scale 1.05, shadow increase
 * - Button click: scale 0.95
 * 
 * MODAL ANIMATIONS
 * - Backdrop fade: 0 → 1 opacity (200ms)
 * - Modal entrance: scale 0.95 → 1, Y 20 → 0
 * - Content transitions: fade + Y offset (300ms between steps)
 * - Loading spinner: rotate 360deg (infinite, 2s duration)
 * 
 * FORM INTERACTIONS
 * - Option select: scale animation on checkbox
 * - Confirmation message: slide in + fade
 * - Progress bar: animated width increase
 * 
 * RESULTS DISPLAY
 * - Header: scale in from center
 * - Cards: staggered fade in with Y offset
 * - Section titles: slide in from left
 * - Benefits: list items stagger in
 * 
 * ============================================================================
 * DATA STRUCTURE DETAILS
 * ============================================================================
 * 
 * WELLNESS CATEGORY
 * {
 *   id: string,                    // Unique identifier
 *   label: string,                 // Display name
 *   icon: string,                  // Emoji
 *   color: string,                 // Tailwind gradient class
 *   lightColor: string,            // Light background
 *   borderColor: string,           // Border color
 *   description: string            // Short description
 * }
 * 
 * QUESTION
 * {
 *   id: string,                    // Unique question ID
 *   question: string,              // Question text
 *   type: "single" | "multiple",  // Question type
 *   options: [
 *     {
 *       id: string,               // Option ID
 *       label: string,            // Display text
 *       icon?: string             // Optional emoji
 *     }
 *   ]
 * }
 * 
 * RECOMMENDATION
 * {
 *   id: string,                    // Unique ID
 *   name: string,                  // Title
 *   duration: string,              // e.g., "5-10 min"
 *   difficulty?: string,           // e.g., "Beginner"
 *   description: string,           // Full description
 *   benefits: string[],            // Array of benefits
 *   steps?: string[],              // Optional step-by-step
 *   icon: string,                  // Emoji
 *   imageUrl?: string              // Optional image
 * }
 * 
 * ============================================================================
 * INTEGRATION POINTS FOR API/BACKEND
 * ============================================================================
 * 
 * 1. RECOMMENDATION GENERATION
 *    Current: Local algorithm in generateRecommendations()
 *    Future: Replace with API call
 *    
 *    const generateRecommendations = async (categoryId, answers) => {
 *      const response = await fetch('/api/wellness/recommendations', {
 *        method: 'POST',
 *        headers: { 'Content-Type': 'application/json' },
 *        body: JSON.stringify({ categoryId, answers })
 *      });
 *      return response.json();
 *    }
 * 
 * 2. SAVE USER RESPONSES
 *    const saveResponses = async (userId, categoryId, answers) => {
 *      await fetch('/api/wellness/responses', {
 *        method: 'POST',
 *        body: JSON.stringify({ userId, categoryId, answers })
 *      });
 *    }
 * 
 * 3. FETCH SAVED PLANS
 *    const getSavedPlans = async (userId) => {
 *      const response = await fetch(`/api/wellness/plans/${userId}`);
 *      return response.json();
 *    }
 * 
 * 4. TRACK RECOMMENDATION PERFORMANCE
 *    const trackRecommendationClick = async (recommendationId, userId) => {
 *      await fetch('/api/wellness/analytics', {
 *        method: 'POST',
 *        body: JSON.stringify({ recommendationId, userId })
 *      });
 *    }
 * 
 * ============================================================================
 * PERFORMANCE CONSIDERATIONS
 * ============================================================================
 * 
 * ANIMATION PERFORMANCE
 * - All animations use transform and opacity (GPU accelerated)
 * - No layout shifts during animations
 * - Framer Motion optimizes re-renders automatically
 * - AnimatePresence prevents unmount animations from blocking
 * 
 * RENDERING PERFORMANCE
 * - Components only re-render when their props change
 * - Modal content uses AnimatePresence mode="wait" for smooth transitions
 * - Question steps are conditionally rendered (not all at once)
 * - Recommendation cards use index for keys (acceptable as list is static)
 * 
 * BUNDLE SIZE
 * - Only Framer Motion dependency (relatively small)
 * - No heavy charting or data visualization libraries
 * - Tailwind CSS is assumed to be in project (not added here)
 * 
 * ============================================================================
 * TESTING CONSIDERATIONS
 * ============================================================================
 * 
 * COMPONENT TESTING
 * - WellnessCard: Props render, click handlers
 * - WellnessModal: Step progression, form validation
 * - QuestionStep: Option selection, answer capture
 * - ResultSection: Recommendation display, category filtering
 * 
 * LOGIC TESTING
 * - generateRecommendations: All 9 category functions
 * - Answer filtering: Conditional recommendation selection
 * - State transitions: Modal open/close, step progression
 * 
 * E2E TESTING
 * - Complete user flow: Card selection → Form → Results
 * - Form validation: Require answers before proceeding
 * - Modal interactions: Open, navigate, close
 * - Animation triggers: Entrance, hover, interaction animations
 * 
 * ============================================================================
 * ACCESSIBILITY
 * ============================================================================
 * 
 * KEYBOARD NAVIGATION
 * - Tab through cards and buttons
 * - Enter to select options
 * - Escape to close modal
 * 
 * SCREEN READERS
 * - Semantic HTML with proper heading hierarchy
 * - ARIA labels for buttons and interactive elements
 * - Progress indicators clearly announced
 * 
 * COLOR CONTRAST
 * - Text meets WCAG AA standards (4.5:1 for normal text)
 * - Icons used with text labels (not icon-only)
 * 
 * ============================================================================
 * EXTENSION GUIDE
 * ============================================================================
 * 
 * TO ADD A NEW WELLNESS CATEGORY:
 * 
 * 1. Add to wellnessCategories array in wellnessRecommendationData.js
 * 2. Create questionsByCategory["newcategory"] with 5 questions
 * 3. Create generateNewCategoryRecommendations(answers) function
 * 4. Add case in generateRecommendations() switch statement
 * 5. Component automatically renders new category
 * 
 * TO CUSTOMIZE RECOMMENDATIONS:
 * 
 * 1. Edit category-specific function in wellnessRecommendationData.js
 * 2. Modify conditional logic based on answers
 * 3. Update recommendation data objects
 * 4. Component automatically displays changes
 * 
 * TO ADD NEW RECOMMENDATION TYPES:
 * 
 * 1. Update recommendation object structure
 * 2. Add new section in generateXRecommendations functions
 * 3. Create new RecommendationCard variant if needed
 * 4. Update ResultSection to display new type
 * 
 * ============================================================================
 */

export const ARCHITECTURE = {
  version: "1.0.0",
  lastUpdated: "2024",
  description: "Personalized Wellness Recommendation System",
  components: 9,
  categories: 9,
  questions: 45,
  recommendationTypes: 5,
};
