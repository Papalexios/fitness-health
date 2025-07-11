import React from 'react';
import Card from './ui/Card';
import { WorkoutPlan, Exercise } from '../types';
import { BrainCircuitIcon, InfoIcon, LightbulbIcon } from './Icons';

interface WorkoutPlanDisplayProps {
  plan: WorkoutPlan;
}

const ExerciseRow: React.FC<{ exercise: Exercise }> = ({ exercise }) => (
    <>
    <tr className="hover:bg-stone-800/40 transition-colors">
        <td className="py-4 pl-4 pr-3 text-sm font-medium text-stone-100 sm:pl-3">{exercise.name}</td>
        <td className="px-3 py-4 text-sm text-stone-300">{exercise.sets}</td>
        <td className="px-3 py-4 text-sm text-stone-300">{exercise.reps}</td>
        <td className="px-3 py-4 text-sm text-stone-300">{exercise.rest}</td>
    </tr>
    {(exercise.technique_tips || exercise.notes) && (
        <tr className="bg-stone-800/20 hover:bg-stone-800/40 transition-colors">
            <td colSpan={4} className="py-2 px-4 sm:px-6 text-sm">
                <details>
                    <summary className="cursor-pointer text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                        <InfoIcon className="h-4 w-4" />
                        Technique & Notes
                    </summary>
                    <div className="pt-3 pl-6 border-l-2 border-stone-600 ml-1.5 mt-2">
                        {exercise.technique_tips && <p className="text-stone-300 pb-2"><strong>Technique:</strong> {exercise.technique_tips}</p>}
                        {exercise.notes && <p className="text-stone-300"><strong>Notes:</strong> {exercise.notes}</p>}
                    </div>
                </details>
            </td>
        </tr>
    )}
    </>
);


const WorkoutPlanDisplay: React.FC<WorkoutPlanDisplayProps> = ({ plan }) => {
  return (
    <div className="space-y-6 animate-fade-in">
       <Card>
          <div className="flex items-center gap-3 mb-4">
              <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-lg">
                  <BrainCircuitIcon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-stone-100">AI Sports Scientist: Rationale</h2>
          </div>
          <p className="text-stone-300 leading-relaxed text-sm">{plan.rationale || "The AI has designed this plan based on established principles of exercise science to help you reach your goals efficiently and safely."}</p>
       </Card>
      
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <h3 className="font-semibold text-lg text-stone-200 mb-3">Warm-up Protocol</h3>
            <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">{plan.warmup}</p>
        </Card>
        <Card>
            <h3 className="font-semibold text-lg text-stone-200 mb-3">Cooldown Routine</h3>
            <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">{plan.cooldown}</p>
        </Card>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-500/10 text-purple-400 p-2 rounded-lg">
                    <LightbulbIcon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-stone-100">Progressive Overload Strategy</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">{plan.progressive_overload_strategy}</p>
            <p className="text-stone-400 text-xs mt-3">Periodization: {plan.periodizationNotes}</p>
         </Card>
         <Card>
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500/10 text-green-400 p-2 rounded-lg">
                    <LightbulbIcon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-stone-100">Mind-Muscle Connection Tips</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">{plan.mind_muscle_connection_tips}</p>
         </Card>
       </div>
      
      <Card>
        <h3 className="font-semibold text-xl text-stone-100 mb-4">Weekly Workout Schedule</h3>
        <div className="space-y-8">
          {plan.weeklySchedule.map((day, index) => (
            <div key={index} className="overflow-hidden">
              <h4 className="text-lg font-bold text-cyan-400 mb-3 border-b-2 border-cyan-500/20 pb-2">{day.day}: <span className="text-stone-200">{day.focus}</span></h4>
              <div className="flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-stone-700/50">
                            <thead className="bg-stone-800/30">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-stone-300 sm:pl-3">Exercise</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-300">Sets</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-300">Reps</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-300">Rest</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-800">
                                {day.exercises.map((exercise, exIndex) => (
                                    <ExerciseRow key={exIndex} exercise={exercise} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default WorkoutPlanDisplay;