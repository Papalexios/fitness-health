import React, { useState } from 'react';
import { AssessmentData, FitnessEcosystem } from '../types';
import { DumbbellIcon, UtensilsCrossedIcon, LineChartIcon, PersonStandingIcon, TargetIcon } from './Icons';
import Roadmap from './Roadmap';
import BodyVisualizer from './BodyVisualizer';
import WorkoutPlanDisplay from './WorkoutPlanDisplay';
import MealPlanDisplay from './MealPlanDisplay';
import ProgressDashboard from './ProgressDashboard';

interface DashboardProps {
  ecosystem: FitnessEcosystem;
  assessment: AssessmentData;
}

type Tab = 'roadmap' | 'workout' | 'nutrition' | 'visualizer' | 'analytics';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'roadmap', label: 'Roadmap', icon: TargetIcon },
  { id: 'workout', label: 'Workout', icon: DumbbellIcon },
  { id: 'nutrition', label: 'Nutrition', icon: UtensilsCrossedIcon },
  { id: 'visualizer', label: 'Visualizer', icon: PersonStandingIcon },
  { id: 'analytics', label: 'Analytics', icon: LineChartIcon },
];

const Dashboard: React.FC<DashboardProps> = ({ ecosystem, assessment }) => {
  const [activeTab, setActiveTab] = useState<Tab>('roadmap');

  const renderContent = () => {
    switch (activeTab) {
      case 'roadmap':
        return <Roadmap summary={ecosystem.summary} expert_panel_summary={ecosystem.expert_panel_summary} predictions={ecosystem.timelinePredictions} />;
      case 'workout':
        return <WorkoutPlanDisplay plan={ecosystem.workoutPlan} />;
      case 'nutrition':
        return <MealPlanDisplay plan={ecosystem.nutritionPlan} />;
      case 'visualizer':
        return <BodyVisualizer assessment={assessment} predictions={ecosystem.timelinePredictions} />;
      case 'analytics':
        return <ProgressDashboard predictions={ecosystem.timelinePredictions} nutrition={ecosystem.nutritionPlan} />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 sticky top-4 z-20">
        <div className="relative flex space-x-1 sm:space-x-2 bg-stone-900/80 border border-stone-700/60 p-1.5 rounded-xl backdrop-blur-lg max-w-full overflow-x-auto custom-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-shrink-0 flex items-center justify-center gap-2 w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900
                ${activeTab === tab.id
                  ? 'text-white'
                  : 'text-stone-400 hover:text-white'
                }`}
            >
              <tab.icon className={`h-5 w-5 transition-colors ${activeTab === tab.id ? 'text-cyan-400' : ''}`} />
              <span className="hidden sm:inline">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-stone-700/50 rounded-lg -z-10"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;