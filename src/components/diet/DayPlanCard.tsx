import { Flame, Leaf, RefreshCw } from 'lucide-react';
import { mealOrder, sumDayPlan, type DayPlan } from '@/utils/mealPlanner';
import { mealTypes, type MealType } from '@/data/meals';

interface DayPlanCardProps {
  plan: DayPlan;
  onShuffle: (type: MealType) => void;
  onRegenerate: () => void;
}

export default function DayPlanCard({ plan, onShuffle, onRegenerate }: DayPlanCardProps) {
  const totals = sumDayPlan(plan);
  const labelFor = (type: MealType) => mealTypes.find((item) => item.value === type)?.label ?? type;

  return (
    <div className="card flex flex-col !p-6 sm:!p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold">Your vegetarian day</h3>
          <p className="mt-1 text-sm text-stone-500">Swap any meal, or build a fresh day.</p>
        </div>
        <button type="button" onClick={onRegenerate} className="btn-outline !px-4 !py-2.5">
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">New day</span>
        </button>
      </div>

      <ol className="mt-6 space-y-3">
        {mealOrder.map((type) => {
          const meal = plan[type];
          return (
            <li
              key={type}
              className="group flex items-start gap-4 rounded-2xl border border-cream-300 bg-cream-50 p-4 transition duration-300 hover:border-primary-200 hover:bg-white"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <Leaf className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">{labelFor(type)}</p>
                {meal ? (
                  <>
                    <p key={meal.id} className="animate-fade-up font-semibold text-stone-800">
                      {meal.name}
                    </p>
                    <p className="mt-0.5 text-sm text-stone-500">
                      {meal.calories} kcal · {meal.protein}g protein
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-stone-500">No meal available for this goal.</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => onShuffle(type)}
                aria-label={`Swap ${labelFor(type).toLowerCase()}`}
                title="Swap meal"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-700 transition duration-300 hover:rotate-180 hover:bg-primary-100"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-primary-900 px-5 py-4 text-white">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-accent-400" />
          <span className="text-sm text-primary-100">Total for the day</span>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-bold">{totals.calories} kcal</p>
          <p className="text-xs text-primary-200">{totals.protein}g protein</p>
        </div>
      </div>
    </div>
  );
}
