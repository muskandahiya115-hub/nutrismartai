import { Router } from 'express';
import { ApiError, asyncHandler, isFiniteNumber } from '../lib/http.js';

const router = Router();

const activityFactors = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
};

const goalAdjustments = { lose: -500, maintain: 0, gain: 500 };

function calculateMacros(calories) {
  return {
    protein: Math.round((calories * 0.2) / 4),
    carbs: Math.round((calories * 0.5) / 4),
    fat: Math.round((calories * 0.3) / 9),
  };
}

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { age, gender, heightCm, weightKg, activityLevel = 'moderate', goal = 'maintain' } = req.body ?? {};

    if (!isFiniteNumber(age) || age < 10 || age > 100) {
      throw new ApiError(400, 'age must be a number between 10 and 100.');
    }
    if (gender !== 'male' && gender !== 'female') {
      throw new ApiError(400, "gender must be 'male' or 'female'.");
    }
    if (!isFiniteNumber(heightCm) || heightCm < 100 || heightCm > 250) {
      throw new ApiError(400, 'heightCm must be a number between 100 and 250.');
    }
    if (!isFiniteNumber(weightKg) || weightKg < 20 || weightKg > 300) {
      throw new ApiError(400, 'weightKg must be a number between 20 and 300.');
    }
    if (!(activityLevel in activityFactors)) {
      throw new ApiError(400, 'activityLevel must be one of: sedentary, light, moderate, active, very-active.');
    }
    if (!(goal in goalAdjustments)) {
      throw new ApiError(400, "goal must be one of: lose, maintain, gain.");
    }

    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    const bmr = gender === 'male' ? base + 5 : base - 161;
    const maintenance = bmr * activityFactors[activityLevel];
    const target = Math.round(maintenance + goalAdjustments[goal]);

    res.json({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      target,
      goal,
      macros: calculateMacros(target),
    });
  })
);

export default router;
