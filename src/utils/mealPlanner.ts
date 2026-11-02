import { meals, type DietGoal, type Meal, type MealType } from '@/data/meals';

export type DayPlan = Partial<Record<MealType, Meal>>;

export const mealOrder: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export function getMealsFor(type: MealType, goal: DietGoal): Meal[] {
  return meals.filter((meal) => meal.type === type && meal.goals.includes(goal));
}

export function pickRandomMeal(type: MealType, goal: DietGoal, excludeId?: string): Meal | undefined {
  const pool = getMealsFor(type, goal);
  const candidates = pool.length > 1 ? pool.filter((meal) => meal.id !== excludeId) : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function buildDayPlan(goal: DietGoal): DayPlan {
  return mealOrder.reduce<DayPlan>((plan, type) => {
    const meal = pickRandomMeal(type, goal);
    return meal ? { ...plan, [type]: meal } : plan;
  }, {});
}

export function sumDayPlan(plan: DayPlan) {
  return Object.values(plan).reduce(
    (totals, meal) => ({
      calories: totals.calories + (meal?.calories ?? 0),
      protein: totals.protein + (meal?.protein ?? 0),
    }),
    { calories: 0, protein: 0 }
  );
}
