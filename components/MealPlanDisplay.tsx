import React from 'react';
import Card from './ui/Card';
import { NutritionPlan, DailyMealPlan } from '../types';
import { BrainCircuitIcon, UtensilsCrossedIcon, LightbulbIcon } from './Icons';

interface MealPlanDisplayProps {
  plan: NutritionPlan;
}

const MealCard: React.FC<{ meal: DailyMealPlan['meals'][0] }> = ({ meal }) => (
    <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700/70">
        <h5 className="font-bold text-stone-100">{meal.name}</h5>
        <p className="text-sm text-stone-400 mt-1 mb-3">{meal.description}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-sky-500/10 text-sky-300 p-2 rounded-md text-center">
                <span className="font-bold">{meal.calories}</span> Kcal
            </div>
            <div className="bg-red-500/10 text-red-300 p-2 rounded-md text-center">
                <span className="font-bold">{meal.protein}g</span> Prot
            </div>
            <div className="bg-yellow-500/10 text-yellow-300 p-2 rounded-md text-center">
                <span className="font-bold">{meal.carbs}g</span> Carb
            </div>
            <div className="bg-purple-500/10 text-purple-300 p-2 rounded-md text-center">
                <span className="font-bold">{meal.fat}g</span> Fat
            </div>
        </div>
    </div>
);

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ plan }) => {
  return (
    <div className="space-y-6 animate-fade-in">
       <Card>
          <div className="flex items-center gap-3 mb-4">
              <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-lg">
                  <BrainCircuitIcon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-stone-100">AI Registered Dietitian: Rationale</h2>
          </div>
          <p className="text-stone-300 leading-relaxed text-sm mb-4">{plan.rationale || "The AI has designed this nutrition plan to provide the optimal caloric intake and macronutrient split to fuel your workouts and achieve your body composition goals."}</p>
          <div className="mt-4 pt-4 border-t border-stone-700/50">
             <h4 className="font-semibold text-stone-200 mb-2">Meal Timing Suggestions</h4>
             <p className="text-stone-300 text-sm">{plan.meal_timing_suggestions}</p>
          </div>
       </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
           <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500/10 text-blue-400 p-2 rounded-lg">
                    <LightbulbIcon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-stone-100">Hydration & Supplementation</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">{plan.hydration_and_supplementation_guidelines}</p>
        </Card>
        <Card>
           <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500/10 text-orange-400 p-2 rounded-lg">
                    <LightbulbIcon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-stone-100">Flexible Dieting Tips</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">{plan.flexible_dieting_tips}</p>
        </Card>
      </div>


      {plan.dailyPlans.map((dayPlan, index) => (
        <Card key={index}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="font-bold text-xl text-cyan-400">Sample Day of Eating</h3>
                    <p className="text-stone-300">{plan.summary}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center border border-stone-700/50 rounded-lg p-2 flex-shrink-0">
                    <div>
                        <div className="font-bold text-lg text-sky-300">{dayPlan.dailyTotals.calories}</div>
                        <div className="text-sky-400/70">Calories</div>
                    </div>
                     <div>
                        <div className="font-bold text-lg text-red-300">{dayPlan.dailyTotals.protein}g</div>
                        <div className="text-red-400/70">Protein</div>
                    </div>
                     <div>
                        <div className="font-bold text-lg text-yellow-300">{dayPlan.dailyTotals.carbs}g</div>
                        <div className="text-yellow-400/70">Carbs</div>
                    </div>
                     <div>
                        <div className="font-bold text-lg text-purple-300">{dayPlan.dailyTotals.fat}g</div>
                        <div className="text-purple-400/70">Fat</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {dayPlan.meals.map((meal, mealIndex) => (
                    <MealCard key={mealIndex} meal={meal} />
                ))}
            </div>
        </Card>
      ))}

    </div>
  );
};

export default MealPlanDisplay;