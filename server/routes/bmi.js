import { Router } from 'express';
import { ApiError, asyncHandler, isFiniteNumber } from '../lib/http.js';

const router = Router();

function getBmiCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', tone: 'blue' };
  if (bmi < 25) return { label: 'Healthy weight', tone: 'green' };
  if (bmi < 30) return { label: 'Overweight', tone: 'amber' };
  return { label: 'Obese', tone: 'red' };
}

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { heightCm, weightKg } = req.body ?? {};

    if (!isFiniteNumber(heightCm) || heightCm < 100 || heightCm > 250) {
      throw new ApiError(400, 'heightCm must be a number between 100 and 250.');
    }
    if (!isFiniteNumber(weightKg) || weightKg < 20 || weightKg > 300) {
      throw new ApiError(400, 'weightKg must be a number between 20 and 300.');
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const category = getBmiCategory(bmi);

    res.json({
      bmi: Number(bmi.toFixed(1)),
      category: category.label,
      tone: category.tone,
      healthyWeightRangeKg: {
        min: Number((18.5 * heightM * heightM).toFixed(1)),
        max: Number((24.9 * heightM * heightM).toFixed(1)),
      },
    });
  })
);

export default router;
