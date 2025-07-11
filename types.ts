export interface AssessmentData {
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  primaryGoal: 'lose_fat' | 'build_muscle' | 'maintain' | 'improve_performance';
  targetWeight?: number; // kg
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  sleepHours: number;
  stressLevel: 'low' | 'medium' | 'high';
  workoutDaysPerWeek: number;
  workoutPreference: 'gym' | 'home' | 'hybrid';
  dietaryRestrictions: string; // e.g., 'vegetarian, gluten-free'
  biggestChallenge: 'motivation' | 'time' | 'knowledge' | 'diet_consistency';
}

export interface Exercise {
  name: string;
  sets: string;
  reps:string;
  rest: string;
  notes?: string;
  technique_tips?: string;
}

export interface DailyWorkout {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  weeklySchedule: DailyWorkout[];
  periodizationNotes: string;
  warmup: string;
  cooldown: string;
  rationale?: string;
  progressive_overload_strategy: string;
  mind_muscle_connection_tips: string;
}

export interface Meal {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyMealPlan {
  day: string;
  meals: Meal[];
  dailyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface NutritionPlan {
  summary: string;
  dailyPlans: DailyMealPlan[];
  rationale?: string;
  meal_timing_suggestions?: string;
  hydration_and_supplementation_guidelines: string;
  flexible_dieting_tips: string;
}

export interface MilestonePrediction {
  month: number;
  weight_kg: number;
  body_fat_percentage: number;
  lean_mass_kg: number;
  strength_gain_percentage: number;
  subSteps: {
    focusAreas: string[];
    habitGoals: string[];
    potentialChallenges: string[];
  };
}

export interface FitnessEcosystem {
  workoutPlan: WorkoutPlan;
  nutritionPlan: NutritionPlan;
  timelinePredictions: MilestonePrediction[];
  summary: string;
  expert_panel_summary: string;
  disclaimer: string;
}