import { FitnessEcosystem } from "../types";

export const MOCK_FITNESS_ECOSYSTEM: FitnessEcosystem = {
  summary: "Your mission is to forge a stronger, leaner physique through disciplined training and precise nutrition. This plan is your blueprint for success. Execute with consistency, and the results will follow.",
  expert_panel_summary: "This ecosystem was crafted by our AI Expert Panel, integrating insights from Sports Science, Nutrition, and Physiotherapy to ensure a holistic, safe, and effective plan. We've analyzed your data to create a truly personalized and science-backed protocol.",
  disclaimer: "This AI-generated plan is for informational purposes only. Consult with a qualified healthcare professional and a certified personal trainer before starting any new fitness or nutrition program. Your health and safety are paramount.",
  workoutPlan: {
    rationale: "The selected Upper/Lower split maximizes muscle protein synthesis by hitting each muscle group twice weekly, which is optimal for hypertrophy on a 4-day schedule. Exercise selection balances compound lifts for strength with isolation movements for targeted muscle growth, tailored to your gym preference.",
    warmup: `5-10 minutes of light cardio (jogging, cycling)
- Arm Circles: 30s forward, 30s backward
- Leg Swings: 30s forward/backward, 30s side-to-side (each leg)
- Cat-Cow Stretch: 10 reps
- Bodyweight Squats: 15 reps`,
    cooldown: `5-10 minutes of slow walking or cycling
- Quad Stretch: 30s hold per leg
- Hamstring Stretch: 30s hold per leg
- Chest Stretch in Doorway: 30s hold
- Child's Pose: 60s hold`,
    periodizationNotes: "Linear Periodization: Focus on mastering form for the first 4 weeks, then aim to increase weight on your main lifts weekly.",
    progressive_overload_strategy: "When you can comfortably complete all sets and reps for a given exercise with excellent form for two consecutive workouts, increase the weight by the smallest increment possible (e.g., 2.5kg/5lbs) for the next session.",
    mind_muscle_connection_tips: "Focus on the target muscle contracting and stretching during each rep. Control the eccentric (lowering) phase of the lift, taking 2-3 seconds. Use a weight that allows you to feel the muscle working, not just move the load.",
    weeklySchedule: [
      {
        day: "Monday",
        focus: "Upper Body Strength",
        exercises: [
          { name: "Bench Press", sets: "4", reps: "6-8", rest: "90s", technique_tips: "Keep shoulder blades retracted and down. Lower the bar to your mid-chest." },
          { name: "Pull-ups / Lat Pulldowns", sets: "4", reps: "6-8", rest: "90s", technique_tips: "Drive your elbows down and back. Avoid using momentum." },
          { name: "Overhead Press", sets: "3", reps: "8-10", rest: "60s", technique_tips: "Keep your core braced and glutes squeezed to protect your lower back." },
          { name: "Dumbbell Rows", sets: "3", reps: "10-12", rest: "60s", technique_tips: "Maintain a flat back and pull the dumbbell towards your hip." },
          { name: "Tricep Pushdowns", sets: "3", reps: "12-15", rest: "45s", notes: "Focus on the squeeze at the bottom of the movement.", technique_tips: "Keep elbows tucked at your sides." }
        ]
      },
      {
        day: "Tuesday",
        focus: "Lower Body Strength",
        exercises: [
          { name: "Barbell Squats", sets: "4", reps: "6-8", rest: "120s", technique_tips: "Keep your chest up and back straight. Break parallel for full depth." },
          { name: "Romanian Deadlifts", sets: "4", reps: "8-10", rest: "90s", technique_tips: "Hinge at the hips, maintaining a slight bend in the knees. Keep the bar close to your shins." },
          { name: "Leg Press", sets: "3", reps: "10-12", rest: "90s", technique_tips: "Do not lock out your knees at the top of the movement." },
          { name: "Leg Curls", sets: "3", reps: "12-15", rest: "60s", technique_tips: "Control the movement and focus on squeezing the hamstrings." },
          { name: "Calf Raises", sets: "4", reps: "15-20", rest: "45s", notes: "Pause at the top and get a full stretch at the bottom.", technique_tips: "Perform slowly to maximize muscle engagement." }
        ]
      },
      {
        day: "Thursday",
        focus: "Upper Body Hypertrophy",
        exercises: [
            { name: "Incline Dumbbell Press", sets: "4", reps: "10-12", rest: "60s", technique_tips: "Focus on a deep stretch at the bottom and a strong squeeze at the top." },
            { name: "T-Bar Rows", sets: "4", reps: "10-12", rest: "60s", technique_tips: "Keep your back straight and pull with your lats, not your arms." },
            { name: "Lateral Raises", sets: "4", reps: "15-20", rest: "45s", notes: "Use light weight and focus on form.", technique_tips: "Lead with your elbows, not your wrists." },
            { name: "Face Pulls", sets: "3", reps: "15-20", rest: "45s", technique_tips: "Pull the rope towards your face, aiming for external rotation of the shoulders." },
            { name: "Bicep Curls", sets: "3", reps: "12-15", rest: "45s", technique_tips: "Avoid swinging; control the weight on the way up and down." }
        ]
      },
      {
        day: "Friday",
        focus: "Lower Body Hypertrophy",
        exercises: [
            { name: "Dumbbell Lunges", sets: "3", reps: "10-12 per leg", rest: "75s", technique_tips: "Keep your front knee aligned with your ankle, and gently touch your back knee to the ground." },
            { name: "Leg Extensions", sets: "4", reps: "15-20", rest: "60s", technique_tips: "Squeeze your quads hard at the peak of the contraction for 1-2 seconds." },
            { name: "Glute-Ham Raises / Hyperextensions", sets: "3", reps: "12-15", rest: "60s", technique_tips: "Focus on using your glutes and hamstrings to lift your torso." },
            { name: "Seated Calf Raises", sets: "4", reps: "15-20", rest: "45s", technique_tips: "Pause at the top and get a full stretch at the bottom." },
            { name: "Abdominal Crunches", sets: "3", reps: "15-20", rest: "45s", notes: "Focus on contracting your abs to lift your shoulders off the floor.", technique_tips: "Don't pull on your neck." }
        ]
      }
    ]
  },
  nutritionPlan: {
    summary: "A high-protein diet designed to fuel muscle growth and repair, with sufficient carbs for energy and healthy fats for hormonal function. Meal examples are balanced and easy to prepare.",
    rationale: "Based on your TDEE of ~2500 kcal, we've set a target of 2800 kcal for a lean bulk. The macronutrient split of 40% protein, 40% carbs, and 20% fat is optimized for muscle gain while minimizing fat accumulation.",
    meal_timing_suggestions: "Consume a protein and carbohydrate-rich meal 1-2 hours before your workout and another within 90 minutes after your workout to maximize recovery and growth. Distribute remaining meals evenly throughout the day.",
    hydration_and_supplementation_guidelines: "Aim for at least 3-4 liters of water per day. Recommended supplements: Creatine Monohydrate (5g daily), Whey Protein (1-2 scoops as needed to meet protein goals), and Vitamin D (2000 IU daily if you have limited sun exposure).",
    flexible_dieting_tips: "Follow the 80/20 rule: 80% of your calories should come from whole, nutrient-dense foods, while 20% can be from foods you enjoy. This promotes long-term adherence. If you eat out, prioritize a protein source and vegetables.",
    dailyPlans: [
      {
        day: "Sample Day",
        dailyTotals: { calories: 2805, protein: 185, carbs: 320, fat: 85 },
        meals: [
          { name: "Meal 1: Breakfast", description: "Oatmeal with protein powder, berries, and a handful of almonds.", calories: 550, protein: 40, carbs: 65, fat: 15 },
          { name: "Meal 2: Lunch", description: "Grilled chicken breast, a large sweet potato, and a side of broccoli.", calories: 650, protein: 50, carbs: 75, fat: 15 },
          { name: "Meal 3: Pre-Workout", description: "Greek yogurt with a banana and a drizzle of honey.", calories: 400, protein: 25, carbs: 60, fat: 8 },
          { name: "Meal 4: Post-Workout", description: "Whey protein shake with milk and a scoop of dextrose or a piece of fruit.", calories: 350, protein: 35, carbs: 50, fat: 5 },
          { name: "Meal 5: Dinner", description: "Lean ground beef with brown rice, bell peppers, and onions.", calories: 700, protein: 55, carbs: 70, fat: 22 },
          { name: "Meal 6: Before Bed", description: "Casein protein pudding or a bowl of cottage cheese.", calories: 155, protein: 20, carbs: 10, fat: 5 }
        ]
      }
    ]
  },
  timelinePredictions: [
    { month: 3, weight_kg: 82, body_fat_percentage: 16.5, lean_mass_kg: 68.5, strength_gain_percentage: 15, subSteps: { focusAreas: ["Mastering squat/bench/deadlift form", "Consistent meal prepping"], habitGoals: ["Hit protein target daily", "Get 7-8 hours of sleep"], potentialChallenges: ["Initial muscle soreness", "Finding time to cook"] } },
    { month: 6, weight_kg: 84, body_fat_percentage: 16.0, lean_mass_kg: 70.6, strength_gain_percentage: 30, subSteps: { focusAreas: ["Applying progressive overload weekly", "Introducing new accessory lifts"], habitGoals: ["Track workouts consistently", "Drink 3L of water daily"], potentialChallenges: ["Training plateaus", "Diet boredom"] } },
    { month: 9, weight_kg: 86, body_fat_percentage: 15.5, lean_mass_kg: 72.7, strength_gain_percentage: 45, subSteps: { focusAreas: ["Pushing intensity on hypertrophy days", "Optimizing nutrient timing"], habitGoals: ["Incorporate active recovery days", "Experiment with healthy recipes"], potentialChallenges: ["Minor aches and pains", "Staying motivated as progress slows"] } },
    { month: 12, weight_kg: 88, body_fat_percentage: 15.0, lean_mass_kg: 74.8, strength_gain_percentage: 60, subSteps: { focusAreas: ["Starting a new training block (e.g., strength focus)", "Assessing new goals"], habitGoals: ["Maintain consistency", "Help a friend get started"], potentialChallenges: ["Complacency", "Defining the next long-term goal"] } }
  ]
};
