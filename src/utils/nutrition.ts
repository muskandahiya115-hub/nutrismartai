export type Gender = 'male' | 'female';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

export type CalorieGoal = 'lose' | 'maintain' | 'gain';

export const activityLevels: { value: ActivityLevel; label: string; description: string; factor: number }[] = [
  { value: 'sedentary', label: 'Sedentary', description: 'Desk job, little or no exercise', factor: 1.2 },
  { value: 'light', label: 'Lightly active', description: 'Light exercise 1 to 3 days a week', factor: 1.375 },
  { value: 'moderate', label: 'Moderately active', description: 'Moderate exercise 3 to 5 days a week', factor: 1.55 },
  { value: 'active', label: 'Very active', description: 'Hard exercise 6 to 7 days a week', factor: 1.725 },
  { value: 'very-active', label: 'Extra active', description: 'Physical job or training twice a day', factor: 1.9 },
];

export const calorieGoals: { value: CalorieGoal; label: string; adjustment: number }[] = [
  { value: 'lose', label: 'Lose weight', adjustment: -500 },
  { value: 'maintain', label: 'Maintain weight', adjustment: 0 },
  { value: 'gain', label: 'Gain weight', adjustment: 500 },
];

export type BmiTone = 'blue' | 'green' | 'amber' | 'red';

export function calculateBmi(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBmiCategory(bmi: number): { label: string; tone: BmiTone } {
  if (bmi < 18.5) return { label: 'Underweight', tone: 'blue' };
  if (bmi < 25) return { label: 'Healthy weight', tone: 'green' };
  if (bmi < 30) return { label: 'Overweight', tone: 'amber' };
  return { label: 'Obese', tone: 'red' };
}

export function calculateBmr(gender: Gender, age: number, heightCm: number, weightKg: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

export function getActivityFactor(level: ActivityLevel): number {
  return activityLevels.find((item) => item.value === level)?.factor ?? 1.2;
}

export function calculateMacros(calories: number) {
  return {
    protein: Math.round((calories * 0.2) / 4),
    carbs: Math.round((calories * 0.5) / 4),
    fat: Math.round((calories * 0.3) / 9),
  };
}
