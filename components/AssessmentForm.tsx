import React, { useState } from 'react';
import { AssessmentData } from '../types';
import Card from './ui/Card';

interface AssessmentFormProps {
  onComplete: (data: AssessmentData) => void;
}

type FormData = Partial<AssessmentData>;

const goalMap = {
  lose_fat: 'Lose Fat',
  build_muscle: 'Build Muscle',
  maintain: 'Maintain',
  improve_performance: 'Improve Performance',
};

const activityMap = {
  sedentary: 'Sedentary (office job)',
  lightly_active: 'Lightly Active (walks 1-3x/wk)',
  moderately_active: 'Moderately Active (exercises 3-5x/wk)',
  very_active: 'Very Active (intense exercise daily)',
};

const challengeMap = {
    motivation: 'Staying Motivated',
    time: 'Finding Time',
    knowledge: 'Knowing What to Do',
    diet_consistency: 'Diet Consistency'
}


const AssessmentForm: React.FC<AssessmentFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age: 30,
    gender: 'male',
    height: 180,
    weight: 80,
    primaryGoal: 'build_muscle',
    activityLevel: 'moderately_active',
    biggestChallenge: 'motivation',
    sleepHours: 7,
    stressLevel: 'medium',
    workoutDaysPerWeek: 4,
    workoutPreference: 'gym',
    dietaryRestrictions: 'None'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | number = value;
    if (type === 'number' || name === 'workoutDaysPerWeek' || name === 'sleepHours' ) {
      processedValue = Number(value);
    }
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData as AssessmentData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 data={formData} onChange={handleChange} onSelectChange={handleSelectChange} />;
      case 2:
        return <Step2 data={formData} onChange={handleChange} onSelectChange={handleSelectChange} />;
      case 3:
        return <Step3 data={formData} onChange={handleChange} onSelectChange={handleSelectChange} />;
      default:
        return null;
    }
  };

  const totalSteps = 3;

  return (
    <Card className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-stone-300">Create Your Digital Twin</h2>
        <p className="text-stone-400 mt-2">Answer a few questions to generate your hyper-personalized ecosystem.</p>
      </div>

       <div className="w-full bg-stone-800 rounded-full h-2 mb-8 overflow-hidden">
         <div className="bg-gradient-to-r from-cyan-500 to-teal-400 h-2 rounded-full" style={{ width: `${(step / totalSteps) * 100}%`, transition: 'width 0.4s ease-in-out' }}></div>
       </div>

      <form onSubmit={handleSubmit}>
        <div className="min-h-[350px]">
          {renderStep()}
        </div>
        <div className="flex justify-between items-center mt-10">
          {step > 1 ? (
            <button type="button" onClick={prevStep} className="px-6 py-2 text-sm font-medium text-stone-300 bg-stone-800/50 rounded-lg border border-stone-700 hover:bg-stone-700/50 transition-colors">
              Back
            </button>
          ) : <div></div>}
          {step < totalSteps ? (
            <button type="button" onClick={nextStep} className="px-8 py-3 font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-[0_4px_20px_rgba(56,189,248,0.25)] focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-stone-900">
              Next
            </button>
          ) : (
            <button type="submit" className="px-8 py-3 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-[0_4px_20px_rgba(34,197,94,0.25)] focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-stone-900">
              Generate My Plan
            </button>
          )}
        </div>
      </form>
    </Card>
  );
};

// Input Components
const FormInput: React.FC<{ label: string; name: string; type: string; value: any; onChange: any; unit?: string; min?: number; max?: number; step?: number; }> = 
({ label, name, type, value, onChange, unit, min, max, step }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-stone-300">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full bg-stone-800/70 border border-stone-700 rounded-lg px-4 py-2.5 text-stone-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition"
        required
      />
      {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none">{unit}</span>}
    </div>
  </div>
);

const CustomSelect: React.FC<{ label: string; name: string; value: string; options: { [key: string]: string }; onSelect: (name: string, value: string) => void; columns?: number }> =
({ label, name, value, options, onSelect, columns = 2 }) => (
  <div>
    <label className="mb-3 text-sm font-medium text-stone-300 block">{label}</label>
    <div className={`grid grid-cols-${columns} gap-3`}>
        {Object.entries(options).map(([key, displayValue]) => (
            <button type="button" key={key} onClick={() => onSelect(name, key)} className={`p-4 rounded-lg border-2 text-left transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900 focus:ring-cyan-400 ${value === key ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg shadow-cyan-500/10' : 'bg-stone-800/70 border-stone-700 hover:border-stone-500 text-stone-300'}`}>
                <span className="font-semibold text-sm">{displayValue}</span>
            </button>
        ))}
    </div>
  </div>
);

// Step Components
const Step1: React.FC<{ data: FormData, onChange: any, onSelectChange: any }> = ({ data, onChange, onSelectChange }) => (
  <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
    <h3 className="md:col-span-2 text-xl font-semibold text-stone-200 mb-2 border-b border-stone-700 pb-2">Personal Details</h3>
    <FormInput label="Age" name="age" type="number" value={data.age} onChange={onChange} min={16} max={99} />
    <CustomSelect label="Gender" name="gender" value={data.gender || 'male'} options={{ male: 'Male', female: 'Female', other: 'Other' }} onSelect={onSelectChange} />
    <FormInput label="Height" name="height" type="number" value={data.height} onChange={onChange} unit="cm" />
    <FormInput label="Weight" name="weight" type="number" value={data.weight} onChange={onChange} unit="kg" />
  </div>
);

const Step2: React.FC<{ data: FormData, onChange: any, onSelectChange: any }> = ({ data, onChange, onSelectChange }) => (
    <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
        <h3 className="md:col-span-2 text-xl font-semibold text-stone-200 border-b border-stone-700 pb-2">Goals & Lifestyle</h3>
        <div className="md:col-span-2"><CustomSelect label="Primary Goal" name="primaryGoal" value={data.primaryGoal || 'build_muscle'} options={goalMap} onSelect={onSelectChange} /></div>
        <CustomSelect label="Activity Level" name="activityLevel" value={data.activityLevel || 'moderately_active'} options={activityMap} onSelect={onSelectChange} />
        <CustomSelect label="Biggest Challenge" name="biggestChallenge" value={data.biggestChallenge || 'motivation'} options={challengeMap} onSelect={onSelectChange} />
    </div>
);

const Step3: React.FC<{ data: FormData, onChange: any, onSelectChange: any }> = ({ data, onChange, onSelectChange }) => (
  <div className="space-y-8 animate-fade-in">
    <h3 className="text-xl font-semibold text-stone-200 border-b border-stone-700 pb-2">Preferences & Habits</h3>
    
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <label htmlFor="workoutDaysPerWeek" className="mb-3 text-sm font-medium text-stone-300 block">Workouts per Week</label>
        <FormInput label="" name="workoutDaysPerWeek" type="range" min={2} max={7} value={data.workoutDaysPerWeek} onChange={onChange} unit={`${data.workoutDaysPerWeek} days`} />
      </div>
      <div>
        <label htmlFor="sleepHours" className="mb-3 text-sm font-medium text-stone-300 block">Average Sleep per Night</label>
        <FormInput label="" name="sleepHours" type="range" min={4} max={12} step={0.5} value={data.sleepHours} onChange={onChange} unit={`${data.sleepHours} hrs`} />
      </div>
    </div>

    <CustomSelect label="Workout Environment" name="workoutPreference" value={data.workoutPreference || 'gym'} options={{ gym: 'Gym', home: 'Home', hybrid: 'Hybrid' }} onSelect={onSelectChange} columns={3}/>
    
    <div>
        <label htmlFor="dietaryRestrictions" className="mb-2 text-sm font-medium text-stone-300">Dietary Restrictions or Preferences</label>
        <textarea
            name="dietaryRestrictions"
            id="dietaryRestrictions"
            value={data.dietaryRestrictions}
            onChange={onChange}
            placeholder="e.g., Vegetarian, Gluten-Free, Vegan, Lactose-Intolerant, etc."
            className="w-full bg-stone-800/70 border border-stone-700 rounded-lg px-4 py-2.5 text-stone-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition h-24"
        />
    </div>
  </div>
);

export default AssessmentForm;