import React, { useState, useMemo } from 'react';
import Card from './ui/Card';
import { FlameIcon, ZapIcon, TargetIcon, PieChartIcon, InfoIcon } from './Icons';

// --- Configuration ---
const activityLevels = {
  sedentary: { label: 'Sedentary', value: 1.2, description: 'Little or no exercise, desk job' },
  light: { label: 'Lightly Active', value: 1.375, description: 'Light exercise 1-3 days/wk' },
  moderate: { label: 'Moderately Active', value: 1.55, description: 'Moderate exercise 3-5 days/wk' },
  very: { label: 'Very Active', value: 1.725, description: 'Hard exercise 6-7 days/wk' },
  super: { label: 'Super Active', value: 1.9, description: 'Very hard exercise & physical job' },
};

const goals = {
  lose: { label: 'Weight Loss', modifier: -0.20, macros: { p: 0.4, c: 0.3, f: 0.3 } },
  maintain: { label: 'Maintenance', modifier: 0, macros: { p: 0.3, c: 0.4, f: 0.3 } },
  gain: { label: 'Muscle Gain', modifier: 0.15, macros: { p: 0.3, c: 0.5, f: 0.2 } },
};

// --- Helper Components ---
const SegmentedControl = ({ options, value, onChange }) => (
  <div className="flex w-full p-1 bg-stone-800/80 border border-stone-700 rounded-lg">
    {Object.entries(options).map(([key, option]: [string, { label: string }]) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className={`w-full text-sm font-semibold p-2.5 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 ${
          value === key ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-stone-300 hover:bg-stone-700/50'
        }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);

const RangeSlider = ({ label, value, onChange, min, max, step = 1, unit }) => (
    <div>
        <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm font-medium text-stone-300">{label}</label>
            <span className="text-lg font-bold text-emerald-400">{value} <span className="text-sm text-stone-400 font-normal">{unit}</span></span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
    </div>
);


const FitnessCalculator = () => {
    // --- State ---
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState(30);
    const [weight, setWeight] = useState(75);
    const [height, setHeight] = useState(180);
    const [activity, setActivity] = useState('moderate');
    const [goal, setGoal] = useState('maintain');

    // --- Calculations ---
    const results = useMemo(() => {
        // BMR (Mifflin-St Jeor)
        const bmr = gender === 'male'
            ? (10 * weight) + (6.25 * height) - (5 * age) + 5
            : (10 * weight) + (6.25 * height) - (5 * age) - 161;

        // TDEE
        const tdee = bmr * activityLevels[activity].value;

        // Ideal Weight (Healthy BMI range 18.5 - 24.9)
        const heightM = height / 100;
        const idealWeightLower = 18.5 * heightM * heightM;
        const idealWeightUpper = 24.9 * heightM * heightM;

        // Goal-specific Calories
        const goalCalories = tdee * (1 + goals[goal].modifier);
        
        // Macronutrients
        const macroConfig = goals[goal].macros;
        const proteinGrams = (goalCalories * macroConfig.p) / 4;
        const carbsGrams = (goalCalories * macroConfig.c) / 4;
        const fatGrams = (goalCalories * macroConfig.f) / 9;

        return {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            idealWeight: `${idealWeightLower.toFixed(1)} - ${idealWeightUpper.toFixed(1)} kg`,
            goal: {
                calories: Math.round(goalCalories),
                macros: {
                    protein: Math.round(proteinGrams),
                    carbs: Math.round(carbsGrams),
                    fat: Math.round(fatGrams)
                }
            }
        };
    }, [gender, age, weight, height, activity, goal]);

    return (
        <Card>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* --- INPUTS --- */}
                <div className="lg:col-span-2 space-y-6">
                    <SegmentedControl options={{ male: { label: 'Male' }, female: { label: 'Female' } }} value={gender} onChange={setGender} />
                    <RangeSlider label="Age" value={age} onChange={setAge} min={16} max={99} unit="years" />
                    <RangeSlider label="Weight" value={weight} onChange={setWeight} min={40} max={180} unit="kg" />
                    <RangeSlider label="Height" value={height} onChange={setHeight} min={140} max={220} unit="cm" />
                    <div>
                        <label className="text-sm font-medium text-stone-300 mb-2 block">Activity Level</label>
                        <select
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-stone-100 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
                        >
                            {Object.entries(activityLevels).map(([key, { label, description }]) => (
                                <option key={key} value={key}>{label} ({description})</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* --- RESULTS --- */}
                <div className="lg:col-span-3">
                    <div className="bg-stone-800/50 p-4 rounded-lg border border-stone-700">
                        <label className="text-sm font-medium text-stone-300 mb-2 block">Your Goal</label>
                        <SegmentedControl options={goals} value={goal} onChange={setGoal} />
                    </div>

                    <div className="mt-6 text-center bg-gradient-to-br from-emerald-500/10 via-stone-900/10 to-stone-900/10 p-6 rounded-xl border border-emerald-500/30">
                        <p className="text-lg font-semibold text-emerald-400">{goals[goal].label} Target</p>
                        <p className="text-6xl font-bold tracking-tighter my-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-stone-300">{results.goal.calories}</p>
                        <p className="text-lg text-stone-400">calories/day</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ResultCard icon={FlameIcon} title="Basal Rate (BMR)" value={results.bmr} unit="calories" color="text-orange-400" />
                        <ResultCard icon={ZapIcon} title="Maintenance (TDEE)" value={results.tdee} unit="calories" color="text-yellow-400" />
                        <ResultCard icon={TargetIcon} title="Healthy Weight" value={results.idealWeight} unit="" color="text-green-400" />
                    </div>

                    <div className="mt-6">
                        <MacroDisplay macros={results.goal.macros} />
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-4 border-t border-stone-700/50 flex items-start gap-3 text-xs text-stone-500">
                <InfoIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>Disclaimer: This calculator provides an estimate for informational purposes. BMR is based on the Mifflin-St Jeor formula. Consult a qualified healthcare professional for personalized advice.</p>
            </div>
        </Card>
    );
}

const ResultCard = ({ icon: Icon, title, value, unit, color }) => (
    <div className="bg-stone-800/50 p-4 rounded-lg text-center border border-stone-700/50">
        <Icon className={`h-7 w-7 mx-auto ${color}`} />
        <p className="text-sm text-stone-300 mt-2">{title}</p>
        <p className="text-xl font-bold text-white mt-1">{value} <span className="text-sm font-normal text-stone-400">{unit}</span></p>
    </div>
);

const MacroDisplay = ({ macros }) => (
    <div className="bg-stone-800/50 p-5 rounded-lg border border-stone-700/50">
        <div className="flex items-center gap-3 mb-4">
            <PieChartIcon className="h-6 w-6 text-emerald-400" />
            <h4 className="font-semibold text-stone-200">Daily Macronutrient Targets</h4>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <p className="text-sm text-red-400/80">Protein</p>
                <p className="text-2xl font-bold text-white">{macros.protein}g</p>
            </div>
            <div>
                <p className="text-sm text-yellow-400/80">Carbs</p>
                <p className="text-2xl font-bold text-white">{macros.carbs}g</p>
            </div>
            <div>
                <p className="text-sm text-purple-400/80">Fat</p>
                <p className="text-2xl font-bold text-white">{macros.fat}g</p>
            </div>
        </div>
    </div>
);


export default FitnessCalculator;