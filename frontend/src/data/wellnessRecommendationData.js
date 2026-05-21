/**
 * Comprehensive Wellness Recommendation System Data
 * Contains all questions, categories, and recommendation logic
 * Future-ready for OpenAI/Gemini API integration
 */

// Wellness Categories Configuration
export const wellnessCategories = [
  {
    id: "stress",
    label: "Stress",
    icon: "🧘",
    color: "from-blue-400 to-purple-500",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: "Managing daily stress and anxiety",
  },
  {
    id: "mental",
    label: "Mental Health",
    icon: "🧠",
    color: "from-green-400 to-emerald-500",
    lightColor: "bg-green-50",
    borderColor: "border-green-200",
    description: "Improving mental clarity and focus",
  },
  {
    id: "weight",
    label: "Weight Loss",
    icon: "⚖️",
    color: "from-orange-400 to-red-500",
    lightColor: "bg-orange-50",
    borderColor: "border-orange-200",
    description: "Healthy weight management",
  },
  {
    id: "mood",
    label: "Mood",
    icon: "🌤️",
    color: "from-yellow-400 to-amber-500",
    lightColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    description: "Enhancing mood and positivity",
  },
  {
    id: "anger",
    label: "Anger",
    icon: "😤",
    color: "from-red-400 to-pink-500",
    lightColor: "bg-red-50",
    borderColor: "border-red-200",
    description: "Managing anger and frustration",
  },
  {
    id: "sleep",
    label: "Sleep",
    icon: "😴",
    color: "from-indigo-400 to-purple-500",
    lightColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    description: "Better sleep and rest quality",
  },
  {
    id: "wellness",
    label: "Wellness",
    icon: "🌸",
    color: "from-pink-400 to-rose-500",
    lightColor: "bg-pink-50",
    borderColor: "border-pink-200",
    description: "Overall wellness and balance",
  },
  {
    id: "backpain",
    label: "Back Pain",
    icon: "🦴",
    color: "from-cyan-400 to-blue-500",
    lightColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    description: "Relief from back pain",
  },
  {
    id: "energy",
    label: "Energy",
    icon: "⚡",
    color: "from-yellow-300 to-orange-400",
    lightColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    description: "Boosting energy and vitality",
  },
];

// Questions for each wellness category
export const questionsByCategory = {
  stress: [
    {
      id: "stressLevel",
      question: "What's your current stress level?",
      type: "single",
      options: [
        { id: "mild", label: "Mild", icon: "😊" },
        { id: "moderate", label: "Moderate", icon: "😐" },
        { id: "severe", label: "Severe", icon: "😟" },
      ],
    },
    {
      id: "symptoms",
      question: "Which symptoms are you experiencing?",
      type: "multiple",
      options: [
        { id: "anxiety", label: "Anxiety" },
        { id: "overthinking", label: "Overthinking" },
        { id: "fatigue", label: "Fatigue" },
        { id: "sleeplessness", label: "Sleeplessness" },
        { id: "headache", label: "Headache" },
        { id: "anger", label: "Irritability" },
      ],
    },
    {
      id: "timeAvailable",
      question: "How much time can you dedicate?",
      type: "single",
      options: [
        { id: "5min", label: "5 minutes" },
        { id: "10min", label: "10 minutes" },
        { id: "20min", label: "20 minutes" },
      ],
    },
    {
      id: "preferredSolution",
      question: "What type of solution appeals to you?",
      type: "single",
      options: [
        { id: "yoga", label: "Yoga Poses" },
        { id: "meditation", label: "Meditation" },
        { id: "breathing", label: "Breathing Exercises" },
        { id: "music", label: "Relaxing Music" },
        { id: "all", label: "Mix of Everything" },
      ],
    },
    {
      id: "experienceLevel",
      question: "What's your experience level?",
      type: "single",
      options: [
        { id: "beginner", label: "Beginner" },
        { id: "intermediate", label: "Intermediate" },
        { id: "advanced", label: "Advanced" },
      ],
    },
  ],

  mental: [
    {
      id: "focusLevel",
      question: "How's your focus and concentration?",
      type: "single",
      options: [
        { id: "poor", label: "Poor - Very Distracted" },
        { id: "average", label: "Average - Sometimes Distracted" },
        { id: "good", label: "Good - Can Focus" },
      ],
    },
    {
      id: "mentalSymptoms",
      question: "What challenges are you facing?",
      type: "multiple",
      options: [
        { id: "racing_thoughts", label: "Racing Thoughts" },
        { id: "brain_fog", label: "Brain Fog" },
        { id: "lack_focus", label: "Lack of Focus" },
        { id: "memory_issues", label: "Memory Issues" },
        { id: "restlessness", label: "Restlessness" },
      ],
    },
    {
      id: "timeAvailable",
      question: "Time available for practice?",
      type: "single",
      options: [
        { id: "5min", label: "5 minutes" },
        { id: "15min", label: "15 minutes" },
        { id: "30min", label: "30 minutes" },
      ],
    },
    {
      id: "preferredPractice",
      question: "Preferred practice type?",
      type: "single",
      options: [
        { id: "meditation", label: "Meditation" },
        { id: "yoga", label: "Mindful Yoga" },
        { id: "breathing", label: "Breathing Techniques" },
        { id: "combined", label: "All Combined" },
      ],
    },
    {
      id: "experienceLevel",
      question: "Your meditation experience?",
      type: "single",
      options: [
        { id: "beginner", label: "Beginner" },
        { id: "intermediate", label: "Intermediate" },
        { id: "advanced", label: "Advanced" },
      ],
    },
  ],

  weight: [
    {
      id: "activityLevel",
      question: "What's your current activity level?",
      type: "single",
      options: [
        { id: "sedentary", label: "Sedentary" },
        { id: "light", label: "Light Activity" },
        { id: "moderate", label: "Moderate Activity" },
      ],
    },
    {
      id: "goals",
      question: "What's your weight loss goal?",
      type: "single",
      options: [
        { id: "light", label: "Light Toning" },
        { id: "moderate", label: "Moderate Loss" },
        { id: "aggressive", label: "Significant Loss" },
      ],
    },
    {
      id: "timeAvailable",
      question: "Time you can commit daily?",
      type: "single",
      options: [
        { id: "20min", label: "20 minutes" },
        { id: "30min", label: "30 minutes" },
        { id: "45min", label: "45+ minutes" },
      ],
    },
    {
      id: "preferredStyle",
      question: "Preferred yoga style?",
      type: "single",
      options: [
        { id: "power", label: "Power Yoga" },
        { id: "vinyasa", label: "Vinyasa Flow" },
        { id: "hatha", label: "Hatha Yoga" },
        { id: "mixed", label: "Mixed Style" },
      ],
    },
    {
      id: "experienceLevel",
      question: "Yoga experience level?",
      type: "single",
      options: [
        { id: "beginner", label: "Beginner" },
        { id: "intermediate", label: "Intermediate" },
        { id: "advanced", label: "Advanced" },
      ],
    },
  ],

  mood: [
    {
      id: "currentMood",
      question: "How would you describe your current mood?",
      type: "single",
      options: [
        { id: "low", label: "Low/Sad" },
        { id: "neutral", label: "Neutral/Flat" },
        { id: "okay", label: "Okay/Mixed" },
      ],
    },
    {
      id: "triggers",
      question: "What affects your mood most?",
      type: "multiple",
      options: [
        { id: "work", label: "Work Stress" },
        { id: "relationships", label: "Relationships" },
        { id: "isolation", label: "Isolation" },
        { id: "physical", label: "Physical Health" },
        { id: "lifestyle", label: "Lifestyle Habits" },
      ],
    },
    {
      id: "timeAvailable",
      question: "How much time for daily practice?",
      type: "single",
      options: [
        { id: "10min", label: "10 minutes" },
        { id: "20min", label: "20 minutes" },
        { id: "30min", label: "30 minutes" },
      ],
    },
    {
      id: "preferredActivity",
      question: "What uplifts you most?",
      type: "single",
      options: [
        { id: "movement", label: "Movement/Yoga" },
        { id: "meditation", label: "Meditation" },
        { id: "music", label: "Music" },
        { id: "nature", label: "Connection with Nature" },
      ],
    },
    {
      id: "experienceLevel",
      question: "Wellness practice experience?",
      type: "single",
      options: [
        { id: "beginner", label: "Beginner" },
        { id: "intermediate", label: "Intermediate" },
        { id: "advanced", label: "Advanced" },
      ],
    },
  ],

  anger: [
    {
      id: "angerFrequency",
      question: "How often do you feel angry?",
      type: "single",
      options: [
        { id: "rarely", label: "Rarely" },
        { id: "sometimes", label: "Sometimes" },
        { id: "frequently", label: "Frequently" },
      ],
    },
    {
      id: "triggers",
      question: "What triggers your anger?",
      type: "multiple",
      options: [
        { id: "people", label: "People" },
        { id: "situations", label: "Situations" },
        { id: "failure", label: "Failure/Mistakes" },
        { id: "injustice", label: "Injustice" },
        { id: "pressure", label: "Pressure" },
      ],
    },
    {
      id: "timeAvailable",
      question: "Time for calming practice?",
      type: "single",
      options: [
        { id: "5min", label: "5 minutes" },
        { id: "10min", label: "10 minutes" },
        { id: "20min", label: "20 minutes" },
      ],
    },
    {
      id: "preferredMethod",
      question: "How do you prefer to calm down?",
      type: "single",
      options: [
        { id: "breathing", label: "Breathing Exercises" },
        { id: "yoga", label: "Gentle Yoga" },
        { id: "meditation", label: "Meditation" },
        { id: "mixed", label: "Mix of All" },
      ],
    },
    {
      id: "experienceLevel",
      question: "Wellness practice level?",
      type: "single",
      options: [
        { id: "beginner", label: "Beginner" },
        { id: "intermediate", label: "Intermediate" },
        { id: "advanced", label: "Advanced" },
      ],
    },
  ],

  sleep: [
    {
      id: "sleepQuality",
      question: "How's your current sleep quality?",
      type: "single",
      options: [
        { id: "poor", label: "Poor - Frequent Waking" },
        { id: "fair", label: "Fair - Some Issues" },
        { id: "okay", label: "Okay - Room for Improvement" },
      ],
    },
    {
      id: "sleepIssues",
      question: "What sleep issues do you have?",
      type: "multiple",
      options: [
        { id: "falling_asleep", label: "Difficulty Falling Asleep" },
        { id: "staying_asleep", label: "Difficulty Staying Asleep" },
        { id: "early_waking", label: "Waking Up Too Early" },
        { id: "nightmares", label: "Nightmares/Vivid Dreams" },
        { id: "racing_mind", label: "Racing Mind" },
      ],
    },
    {
      id: "timeAvailable",
      question: "Time before bed for practice?",
      type: "single",
      options: [
        { id: "10min", label: "10 minutes" },
        { id: "20min", label: "20 minutes" },
        { id: "30min", label: "30 minutes" },
      ],
    },
    {
      id: "preferredStyle",
      question: "Preferred relaxation method?",
      type: "single",
      options: [
        { id: "yoga", label: "Restorative Yoga" },
        { id: "meditation", label: "Guided Meditation" },
        { id: "music", label: "Relaxing Music" },
        { id: "combined", label: "Combined Approach" },
      ],
    },
    {
      id: "experienceLevel",
      question: "Sleep yoga experience?",
      type: "single",
      options: [
        { id: "beginner", label: "Beginner" },
        { id: "intermediate", label: "Intermediate" },
        { id: "advanced", label: "Advanced" },
      ],
    },
  ],

  wellness: [
    {
      id: "wellnessGoal",
      question: "What's your main wellness goal?",
      type: "single",
      options: [
        { id: "balance", label: "Overall Balance" },
        { id: "flexibility", label: "Flexibility" },
        { id: "strength", label: "Strength" },
        { id: "vitality", label: "Energy & Vitality" },
      ],
    },
    {
      id: "areas",
      question: "Which areas matter most to you?",
      type: "multiple",
      options: [
        { id: "physical", label: "Physical Health" },
        { id: "mental", label: "Mental Clarity" },
        { id: "emotional", label: "Emotional Balance" },
        { id: "spiritual", label: "Spiritual Connection" },
      ],
    },
    {
      id: "timeAvailable",
      question: "How much time can you dedicate?",
      type: "single",
      options: [
        { id: "15min", label: "15 minutes daily" },
        { id: "30min", label: "30 minutes daily" },
        { id: "60min", label: "60+ minutes daily" },
      ],
    },
    {
      id: "preferredPractices",
      question: "Preferred practices?",
      type: "single",
      options: [
        { id: "yoga", label: "Yoga" },
        { id: "meditation", label: "Meditation" },
        { id: "pranayama", label: "Breathing" },
        { id: "all", label: "All Combined" },
      ],
    },
    {
      id: "experienceLevel",
      question: "Overall experience level?",
      type: "single",
      options: [
        { id: "beginner", label: "Beginner" },
        { id: "intermediate", label: "Intermediate" },
        { id: "advanced", label: "Advanced" },
      ],
    },
  ],

  backpain: [
    {
      id: "painLevel",
      question: "What's your pain level?",
      type: "single",
      options: [
        { id: "mild", label: "Mild (1-3)" },
        { id: "moderate", label: "Moderate (4-6)" },
        { id: "severe", label: "Severe (7-10)" },
      ],
    },
    {
      id: "painType",
      question: "Where is the back pain?",
      type: "single",
      options: [
        { id: "upper", label: "Upper Back" },
        { id: "middle", label: "Middle Back" },
        { id: "lower", label: "Lower Back" },
        { id: "throughout", label: "Throughout" },
      ],
    },
    {
      id: "timeAvailable",
      question: "Time for therapeutic yoga?",
      type: "single",
      options: [
        { id: "10min", label: "10 minutes" },
        { id: "20min", label: "20 minutes" },
        { id: "30min", label: "30 minutes" },
      ],
    },
    {
      id: "preferredApproach",
      question: "Preferred approach?",
      type: "single",
      options: [
        { id: "stretching", label: "Stretching" },
        { id: "strengthening", label: "Strengthening" },
        { id: "gentle", label: "Gentle Flow" },
        { id: "mixed", label: "Mixed Approach" },
      ],
    },
    {
      id: "experienceLevel",
      question: "Yoga experience level?",
      type: "single",
      options: [
        { id: "beginner", label: "Beginner" },
        { id: "intermediate", label: "Intermediate" },
        { id: "advanced", label: "Advanced" },
      ],
    },
  ],

  energy: [
    {
      id: "energyLevel",
      question: "What's your current energy level?",
      type: "single",
      options: [
        { id: "low", label: "Very Low - Exhausted" },
        { id: "moderate", label: "Moderate - Sluggish" },
        { id: "inconsistent", label: "Inconsistent - Ups & Downs" },
      ],
    },
    {
      id: "timeOfDay",
      question: "When do you need energy most?",
      type: "single",
      options: [
        { id: "morning", label: "Morning" },
        { id: "afternoon", label: "Afternoon" },
        { id: "allday", label: "All Day Long" },
      ],
    },
    {
      id: "timeAvailable",
      question: "Time for energy practice?",
      type: "single",
      options: [
        { id: "5min", label: "5 minutes" },
        { id: "15min", label: "15 minutes" },
        { id: "30min", label: "30 minutes" },
      ],
    },
    {
      id: "preferredMethod",
      question: "What energizes you?",
      type: "single",
      options: [
        { id: "dynamic", label: "Dynamic Yoga" },
        { id: "breathing", label: "Breathing Techniques" },
        { id: "movement", label: "Moving Flow" },
        { id: "all", label: "Mix of All" },
      ],
    },
    {
      id: "experienceLevel",
      question: "Yoga experience?",
      type: "single",
      options: [
        { id: "beginner", label: "Beginner" },
        { id: "intermediate", label: "Intermediate" },
        { id: "advanced", label: "Advanced" },
      ],
    },
  ],
};

// Recommendation Engine Logic
export const generateRecommendations = (categoryId, answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  // Category-specific recommendation logic
  switch (categoryId) {
    case "stress":
      return generateStressRecommendations(answers);
    case "mental":
      return generateMentalHealthRecommendations(answers);
    case "weight":
      return generateWeightLossRecommendations(answers);
    case "mood":
      return generateMoodRecommendations(answers);
    case "anger":
      return generateAngerRecommendations(answers);
    case "sleep":
      return generateSleepRecommendations(answers);
    case "wellness":
      return generateWellnessRecommendations(answers);
    case "backpain":
      return generateBackPainRecommendations(answers);
    case "energy":
      return generateEnergyRecommendations(answers);
    default:
      return recommendations;
  }
};

// Stress Recommendations
const generateStressRecommendations = (answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  const symptoms = answers.symptoms || [];
  const preferredSolution = answers.preferredSolution || "all";
  const timeAvailable = answers.timeAvailable || "10min";
  const experienceLevel = answers.experienceLevel || "beginner";

  // Breathing Exercises
  if (symptoms.includes("anxiety") || preferredSolution === "breathing" || preferredSolution === "all") {
    recommendations.breathingExercises.push({
      id: "anulom-vilom",
      name: "Anulom Vilom (Alternate Nostril Breathing)",
      duration: "5-10 min",
      description: "Balances nervous system and reduces anxiety.",
      steps: [
        "Sit in a comfortable position",
        "Block right nostril with thumb",
        "Inhale through left nostril",
        "Block left nostril, exhale through right",
        "Repeat 10-15 times",
      ],
      benefits: ["Calms mind", "Reduces anxiety", "Balances energy"],
      icon: "🌬️",
    });

    recommendations.breathingExercises.push({
      id: "box-breathing",
      name: "Box Breathing (4-4-4-4)",
      duration: "5-10 min",
      description: "Immediate stress relief through rhythmic breathing.",
      steps: [
        "Inhale for 4 counts",
        "Hold for 4 counts",
        "Exhale for 4 counts",
        "Hold for 4 counts",
        "Repeat 5-8 times",
      ],
      benefits: ["Instant calm", "Reduces anxiety", "Improves focus"],
      icon: "📦",
    });
  }

  if (symptoms.includes("overthinking") || symptoms.includes("anxiety")) {
    recommendations.breathingExercises.push({
      id: "bhramari",
      name: "Bhramari (Bee Breath)",
      duration: "5 min",
      description: "Vibrates the nervous system, releases tension.",
      steps: [
        "Sit comfortably",
        "Close eyes and ears with fingers",
        "Inhale deeply",
        "Make a humming sound on exhale",
        "Repeat 10-15 times",
      ],
      benefits: ["Releases tension", "Calms mind", "Reduces overthinking"],
      icon: "🐝",
    });
  }

  // Yoga Poses
  if (preferredSolution === "yoga" || preferredSolution === "all") {
    if (experienceLevel === "beginner") {
      recommendations.yogaPoses.push({
        id: "child-pose",
        name: "Child's Pose (Balasana)",
        duration: "1-3 min",
        difficulty: "Beginner",
        description: "Calming pose that grounds energy and reduces stress.",
        benefits: ["Calms nervous system", "Reduces stress", "Relaxing"],
        icon: "🙏",
        imageUrl: "/yoga/childs-pose.jpg",
      });

      recommendations.yogaPoses.push({
        id: "legs-up-wall",
        name: "Legs Up Wall (Viparita Karani)",
        duration: "5-10 min",
        difficulty: "Beginner",
        description: "Restorative pose for nervous system reset.",
        benefits: ["Reduces stress", "Calms mind", "Improves circulation"],
        icon: "🧘",
        imageUrl: "/yoga/legs-up-wall.jpg",
      });
    } else {
      recommendations.yogaPoses.push({
        id: "downward-dog",
        name: "Downward-Facing Dog (Adho Mukha Svanasana)",
        duration: "1-2 min",
        difficulty: "Intermediate",
        description: "Energizing yet calming inversion.",
        benefits: ["Calms mind", "Stretches body", "Reduces stress"],
        icon: "🐕",
        imageUrl: "/yoga/downward-dog.jpg",
      });
    }
  }

  // Meditations
  if (preferredSolution === "meditation" || preferredSolution === "all") {
    recommendations.meditations.push({
      id: "body-scan",
      name: "Body Scan Meditation",
      duration: "10-15 min",
      description: "Release tension stored in your body.",
      benefits: ["Reduces physical tension", "Calms mind", "Increases awareness"],
      icon: "🧠",
    });

    if (symptoms.includes("anxiety")) {
      recommendations.meditations.push({
        id: "grounding",
        name: "5-4-3-2-1 Grounding Meditation",
        duration: "5-10 min",
        description: "Brings you back to the present moment.",
        benefits: ["Reduces anxiety", "Grounds energy", "Improves focus"],
        icon: "🌍",
      });
    }
  }

  // Music
  if (preferredSolution === "music" || preferredSolution === "all") {
    recommendations.music.push({
      id: "binaural",
      name: "Binaural Beats - Stress Relief",
      duration: "20-30 min",
      frequency: "Alpha waves (8-12 Hz)",
      description: "Calming binaural beats for deep relaxation.",
      benefits: ["Reduces stress", "Promotes calmness", "Improves focus"],
      icon: "🎵",
    });

    recommendations.music.push({
      id: "nature-sounds",
      name: "Nature Sounds - Forest Ambience",
      duration: "Flexible",
      description: "Natural sounds for stress relief.",
      benefits: ["Calms mind", "Reduces anxiety", "Improves sleep"],
      icon: "🌲",
    });
  }

  // Wellness Tips
  recommendations.tips.push({
    id: "hydration",
    title: "Stay Hydrated",
    description: "Drink water throughout the day to support nervous system function.",
    icon: "💧",
  });

  recommendations.tips.push({
    id: "routine",
    title: "Create a Daily Routine",
    description: "Consistency in practice helps your nervous system adapt and relax.",
    icon: "📅",
  });

  if (symptoms.includes("sleeplessness")) {
    recommendations.tips.push({
      id: "sleep-schedule",
      title: "Maintain Sleep Schedule",
      description: "Go to bed at the same time each night to regulate your nervous system.",
      icon: "🌙",
    });
  }

  return recommendations;
};

// Mental Health Recommendations
const generateMentalHealthRecommendations = (answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  const symptoms = answers.mentalSymptoms || [];
  const preferredPractice = answers.preferredPractice || "combined";
  const experienceLevel = answers.experienceLevel || "beginner";

  // Breathing Exercises
  if (symptoms.includes("brain_fog") || symptoms.includes("racing_thoughts")) {
    recommendations.breathingExercises.push({
      id: "nadi-shodhana",
      name: "Nadi Shodhana (Channel Cleansing)",
      duration: "10-15 min",
      description: "Clears mental fog and improves clarity.",
      steps: [
        "Sit comfortably",
        "Close right nostril",
        "Inhale left, exhale right",
        "Inhale right, exhale left",
        "Continue 10-15 rounds",
      ],
      benefits: ["Clears brain fog", "Improves mental clarity", "Balances mind"],
      icon: "🌬️",
    });
  }

  if (symptoms.includes("racing_thoughts")) {
    recommendations.breathingExercises.push({
      id: "ujjayi",
      name: "Ujjayi Breathing (Ocean Breath)",
      duration: "5-10 min",
      description: "Focuses mind and reduces mental chatter.",
      steps: [
        "Constrict throat slightly",
        "Breathe slowly and audibly",
        "Maintain steady rhythm",
        "Continue for 5-10 minutes",
      ],
      benefits: ["Focuses mind", "Reduces racing thoughts", "Calms nervous system"],
      icon: "🌊",
    });
  }

  // Yoga Poses
  if (preferredPractice === "yoga" || preferredPractice === "combined") {
    recommendations.yogaPoses.push({
      id: "lotus-pose",
      name: "Lotus Pose (Padmasana)",
      duration: "3-5 min",
      difficulty: experienceLevel,
      description: "Traditional meditation pose for mental clarity.",
      benefits: ["Improves focus", "Calms mind", "Enhances meditation"],
      icon: "🪷",
      imageUrl: "/yoga/lotus.jpg",
    });
  }

  // Meditations
  recommendations.meditations.push({
    id: "mindfulness",
    name: "Mindfulness Meditation",
    duration: "10-20 min",
    description: "Build focus and awareness through mindfulness.",
    benefits: ["Improves focus", "Reduces brain fog", "Enhances clarity"],
    icon: "🧠",
  });

  recommendations.meditations.push({
    id: "mantra",
    name: "OM Chanting Meditation",
    duration: "10-15 min",
    description: "Calms the mind through sacred sound vibration.",
    benefits: ["Reduces mental chatter", "Improves focus", "Soothes mind"],
    icon: "🕉️",
  });

  // Tips
  recommendations.tips.push({
    id: "digital-detox",
    title: "Digital Detox Periods",
    description: "Take regular breaks from screens to reduce mental stimulation.",
    icon: "📵",
  });

  recommendations.tips.push({
    id: "sleep",
    title: "Prioritize Sleep",
    description: "Good sleep is crucial for mental clarity and focus.",
    icon: "😴",
  });

  return recommendations;
};

// Weight Loss Recommendations
const generateWeightLossRecommendations = (answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  const timeAvailable = answers.timeAvailable || "30min";
  const preferredStyle = answers.preferredStyle || "mixed";
  const experienceLevel = answers.experienceLevel || "beginner";

  // Power Yoga Poses
  if (preferredStyle === "power" || preferredStyle === "vinyasa" || preferredStyle === "mixed") {
    recommendations.yogaPoses.push({
      id: "sun-salutation",
      name: "Sun Salutation Series (Surya Namaskar)",
      duration: "10-15 min",
      difficulty: "Intermediate",
      description: "Dynamic flow that burns calories and builds strength.",
      benefits: ["Burns calories", "Builds strength", "Increases metabolism"],
      icon: "☀️",
      imageUrl: "/yoga/sun-salutation.jpg",
    });

    recommendations.yogaPoses.push({
      id: "warrior-flow",
      name: "Warrior Flow Sequence",
      duration: "15-20 min",
      difficulty: "Intermediate",
      description: "Power-building sequence for weight loss.",
      benefits: ["Builds muscle", "Burns calories", "Improves metabolism"],
      icon: "⚔️",
      imageUrl: "/yoga/warrior-flow.jpg",
    });
  }

  // Breathing for Metabolism
  recommendations.breathingExercises.push({
    id: "kapalabhati",
    name: "Kapalabhati (Skull Shining Breath)",
    duration: "5-10 min",
    description: "Detoxifies and boosts metabolism.",
    steps: [
      "Sit upright",
      "Take forceful exhales through nose",
      "Let inhale happen naturally",
      "Do 20-30 exhales per round",
      "Repeat 3 rounds",
    ],
    benefits: ["Boosts metabolism", "Detoxifies body", "Energizes"],
    icon: "💨",
  });

  // Meditation
  recommendations.meditations.push({
    id: "healthy-habits",
    name: "Healthy Habits Meditation",
    duration: "10-15 min",
    description: "Reinforce positive eating and exercise habits.",
    benefits: ["Supports weight loss", "Reduces cravings", "Builds motivation"],
    icon: "🎯",
  });

  // Tips
  recommendations.tips.push({
    id: "consistency",
    title: "Consistency is Key",
    description: "Practice regularly for sustainable, healthy weight loss.",
    icon: "📈",
  });

  recommendations.tips.push({
    id: "nutrition",
    title: "Support with Healthy Eating",
    description: "Combine yoga with balanced nutrition for best results.",
    icon: "🥗",
  });

  recommendations.tips.push({
    id: "hydration",
    title: "Drink Water",
    description: "Hydration supports metabolism and energy during practice.",
    icon: "💧",
  });

  return recommendations;
};

// Mood Recommendations
const generateMoodRecommendations = (answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  const triggers = answers.triggers || [];
  const preferredActivity = answers.preferredActivity || "all";

  // Yoga for Mood
  if (preferredActivity === "movement" || preferredActivity === "all") {
    recommendations.yogaPoses.push({
      id: "heart-opener",
      name: "Heart Opening Poses",
      duration: "10-15 min",
      difficulty: "Intermediate",
      description: "Opens heart space for positive emotions.",
      benefits: ["Improves mood", "Opens heart", "Increases positivity"],
      icon: "💕",
      imageUrl: "/yoga/heart-opener.jpg",
    });
  }

  // Breathing
  if (preferredActivity === "all") {
    recommendations.breathingExercises.push({
      id: "victorious-breath",
      name: "Ujjayi Breath with Positive Visualization",
      duration: "10 min",
      description: "Combine breathing with positive thoughts.",
      steps: [
        "Sit comfortably",
        "Practice ujjayi breathing",
        "Visualize happy moments",
        "Continue for 10 minutes",
      ],
      benefits: ["Lifts mood", "Increases positivity", "Reduces sadness"],
      icon: "✨",
    });
  }

  // Meditation
  recommendations.meditations.push({
    id: "loving-kindness",
    name: "Loving-Kindness Meditation (Metta)",
    duration: "15-20 min",
    description: "Cultivate joy and compassion.",
    benefits: ["Improves mood", "Increases happiness", "Builds compassion"],
    icon: "💜",
  });

  // Music
  recommendations.music.push({
    id: "uplifting",
    name: "Uplifting Meditation Music",
    duration: "20-30 min",
    frequency: "Positive frequency",
    description: "Uplifting sounds to elevate mood.",
    benefits: ["Lifts mood", "Increases positivity", "Energizes"],
    icon: "🎶",
  });

  // Tips
  recommendations.tips.push({
    id: "gratitude",
    title: "Daily Gratitude Practice",
    description: "Write down 3 things you're grateful for each day.",
    icon: "🙏",
  });

  recommendations.tips.push({
    id: "social",
    title: "Connect with Others",
    description: "Share practices with friends or join group classes.",
    icon: "👥",
  });

  if (triggers.includes("work")) {
    recommendations.tips.push({
      id: "breaks",
      title: "Take Regular Breaks",
      description: "Short breathing breaks throughout the day help manage work stress.",
      icon: "☕",
    });
  }

  return recommendations;
};

// Anger Recommendations
const generateAngerRecommendations = (answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  const preferredMethod = answers.preferredMethod || "breathing";

  // Breathing - Most effective for anger
  recommendations.breathingExercises.push({
    id: "sitali",
    name: "Sitali Breath (Cooling Breath)",
    duration: "5-10 min",
    description: "Cools emotions and reduces anger.",
    steps: [
      "Curl tongue (if possible, or mouth slightly open)",
      "Inhale through mouth",
      "Exhale through nose",
      "Repeat 10-15 times",
    ],
    benefits: ["Cools anger", "Calms mind", "Reduces frustration"],
    icon: "❄️",
  });

  recommendations.breathingExercises.push({
    id: "extended-exhale",
    name: "Extended Exhale Breathing",
    duration: "5-10 min",
    description: "Calms nervous system through longer exhalation.",
    steps: [
      "Inhale for 4 counts",
      "Exhale for 6-8 counts",
      "Exhale should be longer than inhale",
      "Repeat 10-15 times",
    ],
    benefits: ["Calms anger", "Activates parasympathetic nervous system", "Relaxes body"],
    icon: "🌬️",
  });

  // Yoga
  recommendations.yogaPoses.push({
    id: "cat-cow",
    name: "Cat-Cow Pose (Marjaryasana-Bitilasana)",
    duration: "5-10 min",
    difficulty: "Beginner",
    description: "Release tension and anger through gentle movement.",
    benefits: ["Releases tension", "Calms anger", "Soothes nervous system"],
    icon: "🐱",
    imageUrl: "/yoga/cat-cow.jpg",
  });

  // Meditation
  recommendations.meditations.push({
    id: "acceptance",
    name: "Acceptance Meditation",
    duration: "10-15 min",
    description: "Learn to accept and release anger.",
    benefits: ["Releases anger", "Builds acceptance", "Improves peace"],
    icon: "☮️",
  });

  // Tips
  recommendations.tips.push({
    id: "pause",
    title: "Practice the Pause",
    description: "When angry, take 3 deep breaths before reacting.",
    icon: "⏸️",
  });

  recommendations.tips.push({
    id: "journal",
    title: "Journal Your Feelings",
    description: "Writing helps process and release anger.",
    icon: "📝",
  });

  return recommendations;
};

// Sleep Recommendations
const generateSleepRecommendations = (answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  const sleepIssues = answers.sleepIssues || [];
  const preferredStyle = answers.preferredStyle || "combined";

  // Restorative Yoga
  if (preferredStyle === "yoga" || preferredStyle === "combined") {
    recommendations.yogaPoses.push({
      id: "yoga-nidra",
      name: "Yoga Nidra (Sleep Yoga)",
      duration: "20-30 min",
      difficulty: "Beginner",
      description: "Guided relaxation that induces deep sleep.",
      benefits: ["Improves sleep quality", "Deep relaxation", "Reduces insomnia"],
      icon: "😴",
      imageUrl: "/yoga/yoga-nidra.jpg",
    });

    recommendations.yogaPoses.push({
      id: "corpse-pose",
      name: "Savasana (Corpse Pose)",
      duration: "10-15 min",
      difficulty: "Beginner",
      description: "Ultimate relaxation pose for sleep preparation.",
      benefits: ["Induces deep relaxation", "Prepares for sleep", "Reduces stress"],
      icon: "🛌",
      imageUrl: "/yoga/savasana.jpg",
    });
  }

  // Breathing for Sleep
  if (sleepIssues.includes("falling_asleep") || sleepIssues.includes("racing_mind")) {
    recommendations.breathingExercises.push({
      id: "4-7-8-breath",
      name: "4-7-8 Sleep Breathing",
      duration: "10 min",
      description: "Scientifically proven to help fall asleep.",
      steps: [
        "Inhale for 4 counts",
        "Hold for 7 counts",
        "Exhale for 8 counts",
        "Repeat 4 times",
      ],
      benefits: ["Helps fall asleep", "Reduces racing mind", "Promotes relaxation"],
      icon: "😴",
    });
  }

  // Sleep Meditation
  recommendations.meditations.push({
    id: "sleep-meditation",
    name: "Guided Sleep Meditation",
    duration: "20-30 min",
    description: "Guided journey to deep sleep.",
    benefits: ["Helps fall asleep", "Improves sleep quality", "Induces deep rest"],
    icon: "🌙",
  });

  // Sleep Music
  recommendations.music.push({
    id: "delta-waves",
    name: "Delta Wave Sleep Music",
    duration: "30-60 min",
    frequency: "Delta waves (0.5-4 Hz)",
    description: "Deep sleep music for better rest.",
    benefits: ["Induces deep sleep", "Improves sleep quality", "Restful"],
    icon: "🎵",
  });

  recommendations.music.push({
    id: "sleep-sounds",
    name: "Nature Sleep Sounds",
    duration: "Flexible",
    description: "Rain, ocean, or forest sounds for sleep.",
    benefits: ["Helps fall asleep", "Masks noise", "Promotes deep rest"],
    icon: "🌧️",
  });

  // Tips
  recommendations.tips.push({
    id: "bedtime-routine",
    title: "Establish Bedtime Routine",
    description: "Practice yoga 30 minutes before bed for better sleep.",
    icon: "📅",
  });

  recommendations.tips.push({
    id: "dark-room",
    title: "Optimize Sleep Environment",
    description: "Keep room dark, cool, and quiet for best sleep.",
    icon: "🌙",
  });

  recommendations.tips.push({
    id: "no-screens",
    title: "Avoid Screens Before Bed",
    description: "Blue light disrupts sleep. Stop screens 30 min before sleep.",
    icon: "📵",
  });

  return recommendations;
};

// Wellness Recommendations
const generateWellnessRecommendations = (answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  const preferredPractices = answers.preferredPractices || "all";
  const experienceLevel = answers.experienceLevel || "intermediate";

  // Yoga for overall wellness
  if (preferredPractices === "yoga" || preferredPractices === "all") {
    recommendations.yogaPoses.push({
      id: "hatha-flow",
      name: "Hatha Yoga Flow",
      duration: "30-45 min",
      difficulty: experienceLevel,
      description: "Classic yoga practice for complete wellness.",
      benefits: ["Overall wellness", "Balance", "Strength & flexibility"],
      icon: "🧘",
      imageUrl: "/yoga/hatha-flow.jpg",
    });
  }

  // Pranayama for wellness
  if (preferredPractices === "pranayama" || preferredPractices === "all") {
    recommendations.breathingExercises.push({
      id: "complete-breath",
      name: "Complete Breath (Dirga Pranayama)",
      duration: "10-15 min",
      description: "Revitalize body with complete breathing.",
      steps: [
        "Sit comfortably",
        "Breathe into belly first",
        "Then chest",
        "Then upper lungs",
        "Reverse on exhale",
      ],
      benefits: ["Energizes body", "Improves vitality", "Balances all systems"],
      icon: "🌬️",
    });
  }

  // Meditation
  recommendations.meditations.push({
    id: "holistic-wellness",
    name: "Holistic Wellness Meditation",
    duration: "15-20 min",
    description: "Balance body, mind, and spirit.",
    benefits: ["Overall wellness", "Inner balance", "Peace"],
    icon: "☮️",
  });

  // Tips
  recommendations.tips.push({
    id: "consistency",
    title: "Daily Practice",
    description: "Consistency builds wellness. Aim for regular practice.",
    icon: "📈",
  });

  recommendations.tips.push({
    id: "nutrition",
    title: "Mindful Eating",
    description: "Combine practice with wholesome food choices.",
    icon: "🥗",
  });

  recommendations.tips.push({
    id: "nature",
    title: "Connect with Nature",
    description: "Spend time in nature for holistic wellness.",
    icon: "🌿",
  });

  return recommendations;
};

// Back Pain Recommendations
const generateBackPainRecommendations = (answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  const painLevel = answers.painLevel || "moderate";
  const preferredApproach = answers.preferredApproach || "mixed";

  // Therapeutic Yoga
  if (preferredApproach === "stretching" || preferredApproach === "mixed") {
    recommendations.yogaPoses.push({
      id: "forward-bend",
      name: "Seated Forward Bend (Paschimottanasana)",
      duration: "3-5 min",
      difficulty: "Beginner",
      description: "Gentle stretch for lower back relief.",
      benefits: ["Relieves back pain", "Stretches hamstrings", "Calms mind"],
      icon: "🙏",
      imageUrl: "/yoga/forward-bend.jpg",
    });

    recommendations.yogaPoses.push({
      id: "spinal-twist",
      name: "Seated Spinal Twist (Ardha Matsyendrasana)",
      duration: "2-3 min per side",
      difficulty: "Intermediate",
      description: "Releases spinal tension and back pain.",
      benefits: ["Relieves back pain", "Improves spinal mobility", "Detoxifies"],
      icon: "🔄",
      imageUrl: "/yoga/spinal-twist.jpg",
    });
  }

  if (preferredApproach === "strengthening" || preferredApproach === "mixed") {
    recommendations.yogaPoses.push({
      id: "plank-pose",
      name: "Plank Pose (Phalakasana)",
      duration: "30-60 seconds",
      difficulty: "Intermediate",
      description: "Build core strength to support back.",
      benefits: ["Strengthens core", "Supports back", "Prevents pain"],
      icon: "💪",
      imageUrl: "/yoga/plank.jpg",
    });
  }

  // Breathing for pain relief
  recommendations.breathingExercises.push({
    id: "pain-relief-breathing",
    name: "Pain-Relief Breathing",
    duration: "5-10 min",
    description: "Breathing to reduce pain perception.",
    steps: [
      "Sit comfortably",
      "Breathe in healing energy",
      "Exhale pain and tension",
      "Focus on affected area",
      "Continue 10-15 minutes",
    ],
    benefits: ["Reduces pain", "Relaxes muscles", "Supports healing"],
    icon: "💨",
  });

  // Meditation
  recommendations.meditations.push({
    id: "pain-management",
    name: "Pain Management Meditation",
    duration: "15-20 min",
    description: "Learn to manage and reduce pain perception.",
    benefits: ["Reduces pain", "Relaxes muscles", "Improves coping"],
    icon: "🧠",
  });

  // Tips
  recommendations.tips.push({
    id: "posture",
    title: "Improve Posture",
    description: "Proper posture throughout the day prevents back pain.",
    icon: "📍",
  });

  recommendations.tips.push({
    id: "ergonomics",
    title: "Check Workspace Ergonomics",
    description: "Ensure your chair, desk, and screen are properly positioned.",
    icon: "💻",
  });

  recommendations.tips.push({
    id: "gradual",
    title: "Practice Gradually",
    description: "Start slowly and gradually increase intensity to avoid re-injury.",
    icon: "🐢",
  });

  return recommendations;
};

// Energy Recommendations
const generateEnergyRecommendations = (answers) => {
  const recommendations = {
    yogaPoses: [],
    meditations: [],
    breathingExercises: [],
    music: [],
    tips: [],
  };

  const timeOfDay = answers.timeOfDay || "morning";
  const preferredMethod = answers.preferredMethod || "all";

  // Energizing Yoga
  if (preferredMethod === "dynamic" || preferredMethod === "all") {
    recommendations.yogaPoses.push({
      id: "sun-salutation-energy",
      name: "Sun Salutation (Surya Namaskar)",
      duration: "10-15 min",
      difficulty: "Intermediate",
      description: "Dynamic flow to boost energy naturally.",
      benefits: ["Boosts energy", "Increases circulation", "Energizes body"],
      icon: "☀️",
      imageUrl: "/yoga/sun-salutation.jpg",
    });

    recommendations.yogaPoses.push({
      id: "warrior-poses",
      name: "Warrior Pose Series",
      duration: "10-15 min",
      difficulty: "Intermediate",
      description: "Build strength and energy.",
      benefits: ["Increases energy", "Builds strength", "Improves stamina"],
      icon: "⚔️",
      imageUrl: "/yoga/warrior-series.jpg",
    });
  }

  // Energizing Breathing
  if (preferredMethod === "breathing" || preferredMethod === "all") {
    recommendations.breathingExercises.push({
      id: "bhastrika",
      name: "Bhastrika (Bellows Breath)",
      duration: "5-10 min",
      description: "Powerful breathing to instantly boost energy.",
      steps: [
        "Sit upright",
        "Rapid, forceful breathing",
        "Equal inhale and exhale",
        "20-30 breaths per round",
        "3-4 rounds",
      ],
      benefits: ["Instant energy boost", "Increases circulation", "Energizes"],
      icon: "💨",
    });

    recommendations.breathingExercises.push({
      id: "kapalabhati-energy",
      name: "Kapalabhati (Skull Shining Breath)",
      duration: "5-10 min",
      description: "Detoxify and energize.",
      steps: [
        "Sit upright",
        "Forceful exhales through nose",
        "Passive inhales",
        "20-30 exhales per round",
        "3 rounds",
      ],
      benefits: ["Boosts energy", "Detoxifies", "Energizes mind"],
      icon: "✨",
    });
  }

  // Energizing Meditation
  recommendations.meditations.push({
    id: "energy-meditation",
    name: "Energy Boost Meditation",
    duration: "10-15 min",
    description: "Visualize and build energy.",
    benefits: ["Boosts energy", "Increases vitality", "Mental clarity"],
    icon: "⚡",
  });

  // Uplifting Music
  recommendations.music.push({
    id: "uplifting-music",
    name: "Uplifting Energy Music",
    duration: "20-30 min",
    frequency: "Beta waves (12-30 Hz)",
    description: "Energizing music for active practice.",
    benefits: ["Boosts mood", "Increases energy", "Motivates"],
    icon: "🎵",
  });

  // Tips
  recommendations.tips.push({
    id: "morning",
    title: "Practice in the Morning",
    description:
      timeOfDay === "morning"
        ? "Perfect! Morning practice gives energy for the whole day."
        : "Try shifting your main practice to morning for maximum energy.",
    icon: "🌅",
  });

  recommendations.tips.push({
    id: "movement",
    title: "Stay Active Throughout Day",
    description: "Short movement breaks maintain energy levels.",
    icon: "🚶",
  });

  recommendations.tips.push({
    id: "sleep",
    title: "Get Quality Sleep",
    description: "Good sleep is the foundation of sustained energy.",
    icon: "😴",
  });

  return recommendations;
};
