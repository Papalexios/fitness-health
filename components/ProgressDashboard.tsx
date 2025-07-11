import React from 'react';
import Card from './ui/Card';
import { MilestonePrediction, NutritionPlan } from '../types';
import { LineChartIcon, TargetIcon, ActivityIcon } from './Icons';

interface ProgressDashboardProps {
  predictions: MilestonePrediction[];
  nutrition: NutritionPlan;
}

interface ChartProps {
    title: string;
    data: { label: string; value: number }[];
    colorClass: string;
    unit: string;
}

const BarChart: React.FC<ChartProps> = ({ title, data, colorClass, unit }) => {
    const maxValue = Math.max(...data.map(d => d.value), 0);
    return (
        <Card className="h-full">
            <h4 className="font-semibold text-stone-200 text-base mb-4">{title}</h4>
            <div className="flex justify-between h-48 items-end gap-2">
                {data.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 text-center group">
                        <div 
                            className={`w-full rounded-t-md transition-all duration-300 group-hover:opacity-100 ${colorClass}`} 
                            style={{ height: `${(d.value / (maxValue * 1.1)) * 100}%` }}
                            title={`${d.value}${unit}`}
                        >
                        </div>
                        <span className="text-xs text-stone-400 font-medium">{d.label}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};


const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ predictions, nutrition }) => {
    const dailyTotals = nutrition.dailyPlans[0]?.dailyTotals;

    const chartData = {
        weight: predictions.map(p => ({ label: `M${p.month}`, value: p.weight_kg })),
        bodyFat: predictions.map(p => ({ label: `M${p.month}`, value: p.body_fat_percentage })),
        leanMass: predictions.map(p => ({ label: `M${p.month}`, value: p.lean_mass_kg })),
        strength: predictions.map(p => ({ label: `M${p.month}`, value: p.strength_gain_percentage })),
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <Card>
                <div className="flex items-center gap-3">
                    <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-lg">
                        <LineChartIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300">Progress Analytics</h2>
                        <p className="text-stone-400 mt-1">Visualize your projected 12-month transformation.</p>
                    </div>
                </div>
            </Card>

            {dailyTotals && (
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-500/10 text-green-400 p-2 rounded-lg">
                            <TargetIcon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-lg text-stone-100">Daily Nutrition Targets</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-stone-800/50 p-3 rounded-lg border border-stone-700/50">
                            <p className="text-sm text-sky-400/80">Calories</p>
                            <p className="text-2xl font-bold text-stone-100">{dailyTotals.calories}</p>
                        </div>
                        <div className="bg-stone-800/50 p-3 rounded-lg border border-stone-700/50">
                            <p className="text-sm text-red-400/80">Protein</p>
                            <p className="text-2xl font-bold text-stone-100">{dailyTotals.protein}g</p>
                        </div>
                        <div className="bg-stone-800/50 p-3 rounded-lg border border-stone-700/50">
                            <p className="text-sm text-yellow-400/80">Carbs</p>
                            <p className="text-2xl font-bold text-stone-100">{dailyTotals.carbs}g</p>
                        </div>
                         <div className="bg-stone-800/50 p-3 rounded-lg border border-stone-700/50">
                            <p className="text-sm text-purple-400/80">Fat</p>
                            <p className="text-2xl font-bold text-stone-100">{dailyTotals.fat}g</p>
                        </div>
                    </div>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BarChart title="Projected Weight (kg)" data={chartData.weight} colorClass="bg-gradient-to-t from-cyan-600 to-cyan-400" unit="kg" />
                <BarChart title="Projected Body Fat (%)" data={chartData.bodyFat} colorClass="bg-gradient-to-t from-purple-600 to-purple-400" unit="%" />
                <BarChart title="Projected Lean Mass (kg)" data={chartData.leanMass} colorClass="bg-gradient-to-t from-green-600 to-green-400" unit="kg" />
                <BarChart title="Projected Strength Gain (%)" data={chartData.strength} colorClass="bg-gradient-to-t from-red-600 to-red-400" unit="%" />
            </div>
        </div>
    );
};

export default ProgressDashboard;