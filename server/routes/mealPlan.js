import { Router } from 'express';
import { ApiError, asyncHandler } from '../lib/http.js';
import { meals } from '../data/meals.js';

const router = Router();

const mealOrder = ['breakfast', 'lunch', 'dinner', 'snack'];
const validGoals = ['weight-loss', 'balanced', 'muscle-gain'];

function pickRandomMeal(type, goal, excludeId) {
  const pool = meals.filter((meal) => meal.type === type && meal.goals.includes(goal));
  const candidates = pool.length > 1 ? pool.filter((meal) => meal.id !== excludeId) : pool;
  return candidates[Math.floor(Math.random() * candidates.length)] ?? null;
}

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { goal = 'balanced' } = req.query;

    if (!validGoals.includes(goal)) {
      throw new ApiError(400, `goal must be one of: ${validGoals.join(', ')}.`);
    }

    const plan = mealOrder.map((type) => ({
      type,
      meal: pickRandomMeal(type, goal),
    }));

    const totals = plan.reduce(
      (sum, entry) => ({
        calories: sum.calories + (entry.meal?.calories ?? 0),
        protein: sum.protein + (entry.meal?.protein ?? 0),
      }),
      { calories: 0, protein: 0 }
    );

    res.json({ goal, plan, totals });
  })
);

router.get(
  '/meals',
  asyncHandler(async (req, res) => {
    const { type, goal } = req.query;

    let result = meals;
    if (type !== undefined) {
      if (!mealOrder.includes(type)) {
        throw new ApiError(400, `type must be one of: ${mealOrder.join(', ')}.`);
      }
      result = result.filter((meal) => meal.type === type);
    }
    if (goal !== undefined) {
      if (!validGoals.includes(goal)) {
        throw new ApiError(400, `goal must be one of: ${validGoals.join(', ')}.`);
      }
      result = result.filter((meal) => meal.goals.includes(goal));
    }

    res.json({ count: result.length, meals: result });
  })
);

export default router;
