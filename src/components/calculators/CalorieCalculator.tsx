import { useState, type FormEvent } from 'react';
import { Flame, RotateCcw } from 'lucide-react';
import NumberField from '@/components/calculators/NumberField';
import {
  activityLevels,
  calorieGoals,
  calculateBmr,
  calculateMacros,
  getActivityFactor,
  type ActivityLevel,
  type CalorieGoal,
  type Gender,
} from '@/utils/nutrition';

interface CalorieInputs {
  age: string;
  height: string;
  weight: string;
}

interface CalorieErrors {
  age?: string;
  height?: string;
  weight?: string;
}

interface CalorieResult {
  bmr: number;
  maintenance: number;
  gender: Gender;
}

const initialInputs: CalorieInputs = { age: '', height: '', weight: '' };

function validate(inputs: CalorieInputs): CalorieErrors {
  const errors: CalorieErrors = {};
  const age = Number(inputs.age);
  const height = Number(inputs.height);
  const weight = Number(inputs.weight);

  if (!Number.isFinite(age) || age < 10 || age > 100) errors.age = 'Enter an age between 10 and 100.';
  if (!Number.isFinite(height) || height < 100 || height > 250) errors.height = 'Enter a height between 100 and 250 cm.';
  if (!Number.isFinite(weight) || weight < 20 || weight > 300) errors.weight = 'Enter a weight between 20 and 300 kg.';
  return errors;
}

export default function CalorieCalculator() {
  const [inputs, setInputs] = useState<CalorieInputs>(initialInputs);
  const [gender, setGender] = useState<Gender>('female');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<CalorieGoal>('maintain');
  const [errors, setErrors] = useState<CalorieErrors>({});
  const [result, setResult] = useState<CalorieResult | null>(null);

  const updateInput = (field: keyof CalorieInputs) => (value: string) => {
    setInputs((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate(inputs);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setResult(null);
      return;
    }

    const bmr = calculateBmr(gender, Number(inputs.age), Number(inputs.height), Number(inputs.weight));
    setResult({ bmr, maintenance: bmr * getActivityFactor(activity), gender });
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setGender('female');
    setActivity('moderate');
    setGoal('maintain');
    setErrors({});
    setResult(null);
  };

  const selectedGoal = calorieGoals.find((item) => item.value === goal) ?? calorieGoals[1];
  const targetCalories = result ? Math.round(result.maintenance + selectedGoal.adjustment) : 0;
  const macros = result ? calculateMacros(targetCalories) : null;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold">Daily Calorie Needs</h3>
          <p className="mt-2 text-stone-600">Tell us a little about you and we will estimate how much energy you need each day.</p>
        </div>

        <div>
          <span className="mb-2 block text-sm font-semibold text-stone-700">Gender</span>
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Gender">
            {(['female', 'male'] as const).map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={gender === option}
                onClick={() => setGender(option)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition duration-200 ${
                  gender === option
                    ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                    : 'border-cream-300 bg-cream-50 text-stone-700 hover:border-primary-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <NumberField
            id="cal-age"
            label="Age"
            value={inputs.age}
            unit="yrs"
            placeholder="e.g. 28"
            error={errors.age}
            onChange={updateInput('age')}
          />
          <NumberField
            id="cal-height"
            label="Height"
            value={inputs.height}
            unit="cm"
            placeholder="e.g. 165"
            error={errors.height}
            onChange={updateInput('height')}
          />
          <NumberField
            id="cal-weight"
            label="Weight"
            value={inputs.weight}
            unit="kg"
            placeholder="e.g. 60"
            error={errors.weight}
            onChange={updateInput('weight')}
          />
        </div>

        <div>
          <label htmlFor="cal-activity" className="mb-2 block text-sm font-semibold text-stone-700">
            Activity level
          </label>
          <select
            id="cal-activity"
            value={activity}
            onChange={(event) => setActivity(event.target.value as ActivityLevel)}
            className="input-base cursor-pointer"
          >
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}: {level.description}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="btn-primary flex-1">
            <Flame className="h-4 w-4" />
            Calculate calories
          </button>
          <button type="button" onClick={handleReset} className="btn-outline">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </form>

      <div className="flex flex-col justify-center rounded-3xl bg-gradient-to-br from-primary-50 to-cream-200 p-6 sm:p-8">
        {result && macros ? (
          <div className="animate-fade-up space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-soft">
                <p className="text-sm text-stone-600">Resting energy (BMR)</p>
                <p className="mt-1 font-display text-3xl font-bold text-primary-900">{Math.round(result.bmr)}</p>
                <p className="text-xs text-stone-500">kcal per day at rest</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-soft">
                <p className="text-sm text-stone-600">Maintenance</p>
                <p className="mt-1 font-display text-3xl font-bold text-primary-900">{Math.round(result.maintenance)}</p>
                <p className="text-xs text-stone-500">kcal per day with activity</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-stone-700">Choose your goal</p>
              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Calorie goal">
                {calorieGoals.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={goal === option.value}
                    onClick={() => setGoal(option.value)}
                    className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition duration-200 sm:text-sm ${
                      goal === option.value
                        ? 'bg-primary-700 text-white shadow-soft'
                        : 'bg-white text-stone-700 hover:bg-primary-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-primary-900 p-6 text-white shadow-lift">
              <p className="text-sm text-primary-200">Your daily target</p>
              <p className="font-display text-5xl font-bold">
                {targetCalories} <span className="text-lg font-medium text-primary-200">kcal</span>
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Protein', value: macros.protein },
                  { label: 'Carbs', value: macros.carbs },
                  { label: 'Fat', value: macros.fat },
                ].map((macro) => (
                  <div key={macro.label} className="rounded-xl bg-white/10 px-2 py-3">
                    <p className="text-lg font-bold">{macro.value}g</p>
                    <p className="text-xs text-primary-200">{macro.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-accent-600 shadow-soft">
              <Flame className="h-8 w-8" />
            </span>
            <p className="mt-5 font-display text-2xl font-bold text-primary-900">Your calorie plan appears here</p>
            <p className="mt-2 text-stone-600">Complete the form and press Calculate calories.</p>
          </div>
        )}
      </div>
    </div>
  );
}
