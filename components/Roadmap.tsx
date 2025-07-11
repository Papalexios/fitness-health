import React, { useState } from 'react';
import Card from './ui/Card';
import { MilestonePrediction } from '../types';
import { TargetIcon, FileTextIcon, BrainCircuitIcon, ChevronDownIcon, LightbulbIcon, RepeatIcon, ShieldAlertIcon } from './Icons';

interface RoadmapProps {
  summary: string;
  expert_panel_summary: string;
  predictions: MilestonePrediction[];
}

const MilestoneSubStep: React.FC<{ title: string; items: string[]; icon: React.ElementType }> = ({ title, items, icon: Icon }) => (
    <div>
        <div className="flex items-center gap-2 mb-2">
            <Icon className="h-5 w-5 text-cyan-400" />
            <h4 className="font-semibold text-stone-200">{title}</h4>
        </div>
        <ul className="space-y-1.5 list-disc list-inside text-stone-400 text-sm">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>
);


const Roadmap: React.FC<RoadmapProps> = ({ summary, expert_panel_summary, predictions }) => {
  const [activeMilestone, setActiveMilestone] = useState<number>(predictions.length > 0 ? predictions[0].month : 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300">Your Transformation Roadmap</h2>
                <p className="text-stone-400 mt-1 max-w-2xl">{summary}</p>
            </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-lg">
                        <BrainCircuitIcon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg text-stone-100">AI Expert Panel</h3>
                </div>
                <p className="text-stone-300 leading-relaxed text-sm">{expert_panel_summary}</p>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <Card>
                <h3 className="font-semibold text-lg text-stone-100 mb-6">Predicted 12-Month Milestones</h3>
                <div className="space-y-4">
                    {predictions.map((milestone) => (
                        <div key={milestone.month} className="bg-stone-800/50 rounded-xl border border-stone-700/70 overflow-hidden">
                            <button
                                onClick={() => setActiveMilestone(activeMilestone === milestone.month ? -1 : milestone.month)}
                                className="w-full flex justify-between items-center p-4 text-left"
                                aria-expanded={activeMilestone === milestone.month}
                            >
                                <div className="flex items-center gap-4">
                                     <div className="flex-shrink-0 flex items-center justify-center bg-stone-900 border-2 border-cyan-400 rounded-full h-10 w-10 z-10">
                                        <span className="text-cyan-400 font-bold">M{milestone.month}</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-stone-100">Month {milestone.month} Projection</p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400 mt-1">
                                            <span>{milestone.weight_kg.toFixed(1)} kg</span>
                                            <span>{milestone.body_fat_percentage.toFixed(1)}% BF</span>
                                            <span>~{milestone.strength_gain_percentage.toFixed(0)}% Str.</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronDownIcon className={`h-6 w-6 text-stone-400 transition-transform duration-300 ${activeMilestone === milestone.month ? 'rotate-180' : ''}`} />
                            </button>

                            {activeMilestone === milestone.month && (
                                <div className="p-4 pt-2 animate-fade-in">
                                    <div className="border-t border-stone-700 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                                       <MilestoneSubStep title="Focus Areas" items={milestone.subSteps.focusAreas} icon={LightbulbIcon} />
                                       <MilestoneSubStep title="Habit Goals" items={milestone.subSteps.habitGoals} icon={RepeatIcon} />
                                       <MilestoneSubStep title="Challenges" items={milestone.subSteps.potentialChallenges} icon={ShieldAlertIcon} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;