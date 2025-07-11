import React from 'react';
import { SparklesCore } from './components/ui/Sparkles';
import { LogoIcon, CalculatorIcon, ArrowUpRightIcon, ActivityIcon, PersonStandingIcon, UtensilsCrossedIcon, DumbbellIcon, LineChartIcon } from './components/Icons';
import Card from './components/ui/Card';
import FitnessCalculator from './components/FitnessCalculator';

const featuredContent = [
  {
    icon: CalculatorIcon,
    title: "Health & Fitness Calculators",
    description: "Calculate your BMI, BMR, TDEE, and Macros to tailor your fitness journey with precision.",
    href: "https://gearuptofit.com/fitness-and-health-calculators/health-and-fitness-calculators/",
    color: "text-green-400"
  },
  {
    icon: PersonStandingIcon,
    title: "From Couch to Your First 5K",
    description: "Your step-by-step guide to start running, build stamina, and conquer your first 5-kilometer race.",
    href: "https://gearuptofit.com/running/from-couch-to-your-first-5k/",
    color: "text-blue-400"
  },
  {
    icon: ActivityIcon,
    title: "The Ultimate HIIT Guide",
    description: "Maximize fat burn and improve cardiovascular health with our effective high-intensity interval training guides.",
    href: "https://gearuptofit.com/fitness/the-ultimate-guide-to-hiit-workout/",
    color: "text-red-400"
  },
  {
    icon: UtensilsCrossedIcon,
    title: "Nutrition for Belly Fat Loss",
    description: "Learn about the best foods, meal plans, and strategies to achieve your weight loss goals sustainably.",
    href: "https://gearuptofit.com/weight-loss/best-diet-for-belly-fat-loss/",
    color: "text-yellow-400"
  },
  {
    icon: DumbbellIcon,
    title: "Top 10 Strength Exercises",
    description: "Build muscle and increase strength with our guide to the most effective strength training exercises.",
    href: "https://gearuptofit.com/fitness/top-10-strength-training-exercises/",
    color: "text-orange-400"
  },
  {
    icon: LineChartIcon,
    title: "Best Fitness Trackers of 2024",
    description: "In-depth reviews to help you choose the perfect fitness tracker to monitor your progress and stay motivated.",
    href: "https://gearuptofit.com/review/best-fitness-trackers-2024/",
    color: "text-purple-400"
  },
];

const exploreTopics = [
    { name: "Weight Loss Tips", href: "https://gearuptofit.com/weight-loss/10-reasons-why-you-cant-lose-weight/" },
    { name: "Running Guides", href: "https://gearuptofit.com/running/how-to-get-better-at-running/" },
    { name: "Gear Reviews", href: "https://gearuptofit.com/review/the-best-running-shoes-of-2024/" },
    { name: "Healthy Recipes", href: "https://gearuptofit.com/nutrition/15-healthy-ground-beef-recipes-for-quick-and-easy-dinners/" },
    { name: "Longevity & Health", href: "https://gearuptofit.com/health/biohack-your-way-to-longevity/" },
    { name: "Nutritional Planning", href: "https://gearuptofit.com/nutrition/nutritional-planning/" },
    { name: "Workout Plans", href: "https://gearuptofit.com/fitness/exercises-to-get-rid-of-back-fat/" },
    { name: "Supplement Guides", href: "https://gearuptofit.com/health/supplements/ranking-the-best-protein-shakes-of-2024/" },
];


export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans antialiased relative">
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={30}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="relative z-10">
        <header className="container mx-auto p-4 md:p-6 lg:p-8 flex justify-between items-center">
           <div className="flex items-center gap-3">
            <LogoIcon className="h-9 w-9 text-emerald-400" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-stone-100 to-stone-400">
              GearUpToFit
            </h1>
          </div>
          <a
              href="https://gearuptofit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              Visit Website <ArrowUpRightIcon className="h-4 w-4" />
            </a>
        </header>

        <main className="container mx-auto p-4 md:p-6 lg:p-8">
            {/* Hero Section */}
            <section className="text-center my-16 md:my-24 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-stone-400 leading-tight">
                    Your Ultimate Fitness & Health Resource
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-stone-300">
                    Unlock your potential with expert-written articles, in-depth gear reviews, and powerful health calculators. Your journey to a better you starts here.
                </p>
                <a
                    href="https://gearuptofit.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-block px-8 py-4 font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg shadow-[0_4px_20px_rgba(34,197,94,0.3)] hover:from-emerald-600 hover:to-green-600 transition-all transform hover:scale-105"
                >
                    Start Exploring
                </a>
            </section>

            {/* Featured Content Section */}
            <section className="my-16 md:my-24">
                <h2 className="text-3xl font-bold text-center mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400">
                    Featured Guides
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredContent.map((item, index) => (
                       <a href={item.href} target="_blank" rel="noopener noreferrer" key={index} className="block group animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                           <Card className="h-full border-2 border-transparent hover:border-emerald-500/50 transition-colors duration-300">
                                <div className="flex flex-col items-start gap-4">
                                    <div className={`bg-stone-800 p-3 rounded-lg ${item.color}`}>
                                        <item.icon className="h-7 w-7"/>
                                    </div>
                                    <h3 className="font-bold text-lg text-stone-100">{item.title}</h3>
                                    <p className="text-stone-400 text-sm flex-grow">{item.description}</p>
                                    <div className="mt-2 text-emerald-400 flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                                        Read More <ArrowUpRightIcon className="h-4 w-4" />
                                    </div>
                                </div>
                           </Card>
                       </a>
                    ))}
                </div>
            </section>
            
            {/* Fitness Calculator Section */}
            <section className="my-16 md:my-24 animate-fade-in" style={{animationDelay: '300ms'}}>
                <h2 className="text-3xl font-bold text-center mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400">
                    Holistic Fitness Calculator
                </h2>
                <FitnessCalculator />
            </section>

            {/* Explore More Topics */}
            <section className="my-16 md:my-24">
                 <h2 className="text-3xl font-bold text-center mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400">
                    Explore More Topics
                </h2>
                <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
                    {exploreTopics.map((topic, index) => (
                        <a 
                            key={index} 
                            href={topic.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 font-medium bg-stone-800 text-stone-300 rounded-lg hover:bg-stone-700 hover:text-white transition-colors border border-stone-700 hover:border-stone-600"
                        >
                            {topic.name}
                        </a>
                    ))}
                </div>
            </section>
        </main>
      </div>
      <footer className="relative z-10 text-center p-6 mt-12 text-sm text-stone-600">
        <p>&copy; {new Date().getFullYear()} GearUpToFit.com. All Rights Reserved. Forge your future.</p>
      </footer>
    </div>
  );
}
