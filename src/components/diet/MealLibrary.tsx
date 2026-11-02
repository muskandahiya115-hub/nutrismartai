import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { mealTypes, type Meal, type MealType, type DietGoal, dietGoals } from '@/data/meals';

interface MealLibraryProps {
  goal: DietGoal;
  planMealIds: string[];
  meals: Meal[];
  onAdd: (meal: Meal) => void;
}

type Filter = MealType | 'all';

const goalLabel = (goal: DietGoal) => dietGoals.find((item) => item.value === goal)?.label ?? goal;

export default function MealLibrary({ goal, planMealIds, meals, onAdd }: MealLibraryProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const filters: { value: Filter; label: string }[] = [{ value: 'all', label: 'All meals' }, ...mealTypes];
  const visibleMeals = filter === 'all' ? meals : meals.filter((meal) => meal.type === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter meals by type">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={filter === item.value}
            onClick={() => setFilter(item.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
              filter === item.value
                ? 'bg-primary-600 text-white shadow-soft'
                : 'bg-white text-stone-600 shadow-soft hover:-translate-y-0.5 hover:text-primary-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visibleMeals.map((meal) => {
          const isInPlan = planMealIds.includes(meal.id);
          const matchesGoal = meal.goals.includes(goal);
          return (
            <article
              key={meal.id}
              className="group flex flex-col rounded-2xl border border-cream-300 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-600">
                  {mealTypes.find((item) => item.value === meal.type)?.label}
                </span>
                {matchesGoal && (
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                    Fits {goalLabel(goal).toLowerCase()}
                  </span>
                )}
              </div>
              <h4 className="mt-4 text-lg font-semibold text-stone-800">{meal.name}</h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{meal.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-stone-500">
                  {meal.calories} kcal · {meal.protein}g protein
                </p>
                <button
                  type="button"
                  onClick={() => onAdd(meal)}
                  disabled={isInPlan}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition duration-300 ${
                    isInPlan
                      ? 'bg-primary-100 text-primary-800'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  } disabled:cursor-default`}
                >
                  {isInPlan ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  {isInPlan ? 'In your plan' : 'Add to plan'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
