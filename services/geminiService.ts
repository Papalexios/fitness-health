
import { GoogleGenAI, Type } from "@google/genai";
import { AssessmentData, FitnessEcosystem } from '../types';
import { MOCK_FITNESS_ECOSYSTEM } from "./mockData";

// --- DEVELOPMENT TOGGLE ---
// Set to `true` to use local mock data and skip API calls, avoiding rate limits.
// Set to `false` to use the live Gemini API.
const USE_MOCK_DATA = true;


if (!process.env.API_KEY && !USE_MOCK_DATA) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "mock_key_if_unused" });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A short, motivational summary of the generated plan, written in an empowering tone as a mission statement for the user." },
        expert_panel_summary: { type: Type.STRING, description: "A brief introduction to the AI Expert Panel and the holistic, science-backed approach taken to build this plan." },
        disclaimer: { type: Type.STRING, description: "A clear and responsible disclaimer advising the user to consult with a healthcare professional before starting any new fitness or nutrition program." },
        workoutPlan: {
            type: Type.OBJECT,
            properties: {
                rationale: { type: Type.STRING, description: "From the AI Sports Scientist: A detailed scientific explanation for why the workout plan is structured the way it is, referencing principles like progressive overload, recovery, and specificity to the user's goal." },
                warmup: { type: Type.STRING, description: "From the AI Physiotherapist: A detailed dynamic warm-up routine with specific movements and durations." },
                cooldown: { type: Type.STRING, description: "From the AI Physiotherapist: A detailed static stretching and cooldown routine with specific stretches and hold times." },
                periodizationNotes: { type: Type.STRING, description: "From the AI Sports Scientist: Notes on the overall periodization model used (e.g., linear, undulating) and how the user should approach their training cycles." },
                progressive_overload_strategy: { type: Type.STRING, description: "From the AI Sports Scientist: A very specific, actionable guide on how to apply progressive overload week-to-week (e.g., 'Add 2.5kg to your main lifts when you can complete all sets and reps with good form,' or 'Increase reps by 1-2 each week')." },
                mind_muscle_connection_tips: { type: Type.STRING, description: "From the AI Physiotherapist: Actionable tips for improving the mind-muscle connection, such as using lighter weights, focusing on the target muscle's contraction, and using specific tempos." },
                weeklySchedule: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            day: { type: Type.STRING },
                            focus: { type: Type.STRING },
                            exercises: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING },
                                        sets: { type: Type.STRING },
                                        reps: { type: Type.STRING },
                                        rest: { type: Type.STRING },
                                        notes: { type: Type.STRING, description: "Optional notes about the exercise, like target RPE or tempo." },
                                        technique_tips: { type: Type.STRING, description: "Crucial technique advice and common pitfalls to avoid for this exercise." }
                                    },
                                    required: ["name", "sets", "reps", "rest", "technique_tips"]
                                }
                            }
                        },
                        required: ["day", "focus", "exercises"]
                    }
                }
            },
            required: ["rationale", "warmup", "cooldown", "periodizationNotes", "progressive_overload_strategy", "mind_muscle_connection_tips", "weeklySchedule"]
        },
        nutritionPlan: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "From the AI Registered Dietitian: A summary of the nutrition strategy." },
                rationale: { type: Type.STRING, description: "From the AI Registered Dietitian: A detailed scientific explanation for the nutrition plan, referencing BMR/TDEE calculations, macronutrient ratios for the user's goal, and micronutrient considerations." },
                meal_timing_suggestions: { type: Type.STRING, description: "Actionable advice on nutrient timing around workouts and throughout the day." },
                hydration_and_supplementation_guidelines: { type: Type.STRING, description: "Evidence-based recommendations for daily water intake and potentially beneficial supplements (e.g., creatine, protein powder, vitamin D) based on the user's goals and data. Include dosages and timing." },
                flexible_dieting_tips: { type: Type.STRING, description: "Tips on how to incorporate preferred foods, handle social events, and stay on track without being overly restrictive, promoting long-term adherence." },
                dailyPlans: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            day: { type: Type.STRING },
                            dailyTotals: {
                                type: Type.OBJECT,
                                properties: {
                                    calories: { type: Type.NUMBER },
                                    protein: { type: Type.NUMBER },
                                    carbs: { type: Type.NUMBER },
                                    fat: { type: Type.NUMBER }
                                },
                                required: ["calories", "protein", "carbs", "fat"]
                            },
                            meals: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING },
                                        description: { type: Type.STRING },
                                        calories: { type: Type.NUMBER },
                                        protein: { type: Type.NUMBER },
                                        carbs: { type: Type.NUMBER },
                                        fat: { type: Type.NUMBER }
                                    },
                                    required: ["name", "description", "calories", "protein", "carbs", "fat"]
                                }
                            }
                        },
                        required: ["day", "dailyTotals", "meals"]
                    }
                }
            },
            required: ["summary", "rationale", "meal_timing_suggestions", "hydration_and_supplementation_guidelines", "flexible_dieting_tips", "dailyPlans"]
        },
        timelinePredictions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    month: { type: Type.NUMBER },
                    weight_kg: { type: Type.NUMBER },
                    body_fat_percentage: { type: Type.NUMBER },
                    lean_mass_kg: { type: Type.NUMBER },
                    strength_gain_percentage: { type: Type.NUMBER },
                    subSteps: {
                        type: Type.OBJECT,
                        properties: {
                            focusAreas: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 key areas of focus for this period." },
                            habitGoals: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 specific, actionable habits to build." },
                            potentialChallenges: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 common challenges for this stage and proactive advice to overcome them." }
                        },
                        required: ["focusAreas", "habitGoals", "potentialChallenges"]
                    }
                },
                required: ["month", "weight_kg", "body_fat_percentage", "lean_mass_kg", "strength_gain_percentage", "subSteps"]
            }
        }
    },
    required: ["summary", "expert_panel_summary", "disclaimer", "workoutPlan", "nutritionPlan", "timelinePredictions"]
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateFitnessEcosystem = async (userData: AssessmentData): Promise<FitnessEcosystem> => {
  if (USE_MOCK_DATA) {
      console.warn("--- USING MOCK DATA (API SKIPPED) ---");
      console.warn("--- To use the live Gemini API, set USE_MOCK_DATA to false in services/geminiService.ts ---");
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(MOCK_FITNESS_ECOSYSTEM);
        }, 2000); // Simulate network delay for a realistic loading experience
      });
  }
  
  const prompt = `
    You are Aether, a board-certified AI Expert Panel. Your panel consists of:
    1.  **AI Sports Scientist (PhD):** Specializing in exercise physiology, biomechanics, and periodization.
    2.  **AI Registered Dietitian (RD):** Specializing in clinical nutrition, macronutrient programming, and behavioral change.
    3.  **AI Chartered Physiotherapist (DPT):** Specializing in injury prevention, mobility, and proper movement mechanics.

    Your collective mission is to generate a hyper-personalized, deeply scientific, and highly actionable fitness and nutrition ecosystem. Every piece of advice must be evidence-based, safe, and of the highest professional quality.

    **Core Task:**
    Generate a comprehensive, personalized fitness and nutrition ecosystem based on the user's data.

    **User Data:**
    ${JSON.stringify(userData, null, 2)}

    **Output Format:**
    Your response MUST be a single, valid JSON object that strictly adheres to the provided schema. Do not include any markdown formatting (e.g., \`\`\`json) or explanatory text outside of the JSON structure.

    **Critical Directives & Quality Standards:**
    1.  **Scientific Rationale (MANDATORY):** For every major component (workout, nutrition), provide a detailed "rationale" from the relevant AI expert. Explain the scientific principles behind your choices (e.g., "The caloric target is calculated using the Mifflin-St Jeor equation, an activity multiplier of 1.55, and a 350kcal deficit for sustainable fat loss of ~0.4kg/week." or "The workout split is an Upper/Lower routine to maximize frequency for muscle hypertrophy, which is optimal for a 4-day/week schedule."). This is crucial for user trust, education, and adherence.
    2.  **Actionability is Key:**
        *   **Workout Plan:** Provide an exact, actionable \`progressive_overload_strategy\`. Give the user a clear rule to follow. For \`technique_tips\`, be precise and focus on safety. The \`warmup\` and \`cooldown\` must be specific routines, not just suggestions.
        *   **Nutrition Plan:** Provide specific, evidence-based \`hydration_and_supplementation_guidelines\`. Give concrete \`flexible_dieting_tips\` that empower the user.
        *   **Timeline Predictions:** For each milestone, provide granular, actionable \`subSteps\`. The \`focusAreas\` should set priorities, \`habitGoals\` must be small and achievable, and \`potentialChallenges\` should offer proactive solutions.
    3.  **Holistic & Integrated Approach:** The plan must be cohesive. The nutrition plan must support the workout plan. The timeline must reflect the combined effect of both. The advice from all three AI experts must be integrated seamlessly.
    4.  **Safety First:** Generate a clear, professional \`disclaimer\`. The exercise selection and nutrition advice must be safe and appropriate for the provided user data.
    5.  **Tone:** Your tone is that of a team of world-class experts: knowledgeable, precise, credible, empowering, and supportive.
    `;
    
  const MAX_RETRIES = 3;
  const INITIAL_BACKOFF_MS = 2000;
  let lastError: any = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.25,
            },
        });

        const jsonText = response.text;
        const ecosystemData = JSON.parse(jsonText) as FitnessEcosystem;
        
        if (!ecosystemData.summary || !ecosystemData.expert_panel_summary || !ecosystemData.disclaimer || !ecosystemData.workoutPlan || !ecosystemData.nutritionPlan || !ecosystemData.timelinePredictions) {
            throw new Error("AI response is missing key data structures. The response from the AI did not match the expected format.");
        }

        return ecosystemData;
    } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempt + 1}/${MAX_RETRIES} failed:`, error);
        
        const errorMessage = String(error).toLowerCase();
        const isRateLimitError = errorMessage.includes('resource_exhausted') || errorMessage.includes('429');

        if (isRateLimitError && attempt < MAX_RETRIES - 1) {
            const backoffTime = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
            console.log(`Rate limit error detected. Retrying in ${backoffTime}ms...`);
            await delay(backoffTime);
            continue;
        }

        if (isRateLimitError) {
            throw new Error("The AI service is currently experiencing high demand and rate limits were exceeded. Please try again in a few moments.");
        }

        if (errorMessage.includes("safety")) {
            throw new Error("The generated content was blocked due to safety policies. Please adjust your inputs and try again.");
        }
        
        if (error instanceof SyntaxError) {
            throw new Error("The AI returned an invalid JSON response. This can happen during high demand. Please try again.");
        }

        // For other non-retriable errors, break the loop and throw below
        break;
    }
  }
  
  // This is reached if the loop completes without success
  throw new Error(`Failed to generate a valid fitness plan. Details: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
};