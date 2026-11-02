import { useState } from 'react';
import { Check } from 'lucide-react';
import DayPlanCard from '@/components/diet/DayPlanCard';
import MealLibrary from '@/components/diet/MealLibrary';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';
import { dietGoals, meals, type DietGoal, type Meal, type MealType } from '@/data/meals';
import { buildDayPlan, pickRandomMeal, type DayPlan } from '@/utils/mealPlanner';

export default function DietPlanner() {
  const [goal, setGoal] = useState<DietGoal>('balanced');
  const [plan, setPlan] = useState<DayPlan>(() => buildDayPlan('balanced'));

  const selectGoal = (nextGoal: DietGoal) => {
    setGoal(nextGoal);
    setPlan(buildDayPlan(nextGoal));
  };

  const shuffleMeal = (type: MealType) => {
    const meal = pickRandomMeal(type, goal, plan[type]?.id);
    if (meal) setPlan((current) => ({ ...current, [type]: meal }));
  };

  const addToPlan = (meal: Meal) => {
    setPlan((current) => ({ ...current, [meal.type]: meal }));
  };

  const planMealIds = Object.values(plan).map((meal) => meal?.id ?? '');

  return (
    <section id="diet-plans" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Diet plans"
            title="A vegetarian Indian day, planned around your goal"
            description="Pick your goal and we will build a balanced day of home-style meals. Swap any dish you do not fancy."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-3 md:grid-cols-3" role="radiogroup" aria-label="Diet goal">
            {dietGoals.map((option) => {
              const isActive = goal === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => selectGoal(option.value)}
                  className={`relative flex items-start gap-4 rounded-2xl border p-5 text-left transition duration-300 hover:-translate-y-0.5 ${
                    isActive
                      ? 'border-primary-500 bg-primary-600 text-white shadow-lift'
                      : 'border-cream-300 bg-cream-50 text-stone-700 hover:border-primary-200 hover:bg-white hover:shadow-soft'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                      isActive ? 'border-white bg-white text-primary-700' : 'border-stone-300'
                    }`}
                  >
                    {isActive && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span>
                    <span className={`block font-semibold ${isActive ? 'text-white' : 'text-stone-800'}`}>{option.label}</span>
                    <span className={`mt-1 block text-sm ${isActive ? 'text-primary-100' : 'text-stone-500'}`}>
                      {option.summary}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <DayPlanCard plan={plan} onShuffle={shuffleMeal} onRegenerate={() => selectGoal(goal)} />
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl bg-cream-100 p-6 sm:p-8">
              <h3 className="text-2xl font-bold">Meal library</h3>
              <p className="mt-2 mb-6 text-sm text-stone-600">Browse every dish and add your favourites to today's plan.</p>
              <MealLibrary goal={goal} planMealIds={planMealIds} meals={meals} onAdd={addToPlan} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
