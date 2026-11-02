import { useState, type FormEvent } from 'react';
import { RotateCcw, Scale } from 'lucide-react';
import NumberField from '@/components/calculators/NumberField';
import { calculateBmi, getBmiCategory, type BmiTone } from '@/utils/nutrition';

interface BmiResult {
  bmi: number;
  label: string;
  tone: BmiTone;
  idealMin: number;
  idealMax: number;
  weight: number;
}

const toneClasses: Record<BmiTone, string> = {
  blue: 'bg-sky-100 text-sky-800',
  green: 'bg-primary-100 text-primary-800',
  amber: 'bg-accent-100 text-accent-600',
  red: 'bg-red-100 text-red-700',
};

const gaugeMin = 15;
const gaugeMax = 40;

function gaugePosition(bmi: number) {
  const clamped = Math.min(Math.max(bmi, gaugeMin), gaugeMax);
  return ((clamped - gaugeMin) / (gaugeMax - gaugeMin)) * 100;
}

function validate(height: number, weight: number) {
  const errors: { height?: string; weight?: string } = {};
  if (!Number.isFinite(height) || height < 100 || height > 250) {
    errors.height = 'Enter a height between 100 and 250 cm.';
  }
  if (!Number.isFinite(weight) || weight < 20 || weight > 300) {
    errors.weight = 'Enter a weight between 20 and 300 kg.';
  }
  return errors;
}

export default function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [errors, setErrors] = useState<{ height?: string; weight?: string }>({});
  const [result, setResult] = useState<BmiResult | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const heightCm = Number(height);
    const weightKg = Number(weight);
    const validation = validate(heightCm, weightKg);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setResult(null);
      return;
    }

    const bmi = calculateBmi(heightCm, weightKg);
    const category = getBmiCategory(bmi);
    const heightM = heightCm / 100;
    setResult({
      bmi,
      label: category.label,
      tone: category.tone,
      idealMin: 18.5 * heightM * heightM,
      idealMax: 24.9 * heightM * heightM,
      weight: weightKg,
    });
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setErrors({});
    setResult(null);
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold">Body Mass Index</h3>
          <p className="mt-2 text-stone-600">
            Enter your height and weight to see your BMI and the healthy weight range for your height.
          </p>
        </div>

        <NumberField
          id="bmi-height"
          label="Height"
          value={height}
          unit="cm"
          placeholder="e.g. 170"
          error={errors.height}
          onChange={setHeight}
        />
        <NumberField
          id="bmi-weight"
          label="Weight"
          value={weight}
          unit="kg"
          placeholder="e.g. 65"
          error={errors.weight}
          onChange={setWeight}
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="btn-primary flex-1">
            <Scale className="h-4 w-4" />
            Calculate BMI
          </button>
          <button type="button" onClick={handleReset} className="btn-outline">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </form>

      <div className="flex flex-col justify-center rounded-3xl bg-gradient-to-br from-primary-50 to-cream-200 p-6 sm:p-8">
        {result ? (
          <div className="animate-fade-up space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-stone-600">Your BMI</p>
                <p className="font-display text-6xl font-bold text-primary-900">{result.bmi.toFixed(1)}</p>
              </div>
              <span className={`rounded-full px-4 py-2 text-sm font-semibold ${toneClasses[result.tone]}`}>
                {result.label}
              </span>
            </div>

            <div>
              <div className="relative h-3 rounded-full bg-gradient-to-r from-sky-300 via-primary-400 to-red-400">
                <span
                  className="absolute -top-1.5 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-white bg-primary-900 shadow-lift transition-all duration-700"
                  style={{ left: `${gaugePosition(result.bmi)}%` }}
                />
              </div>
              <div className="mt-3 flex justify-between text-xs font-medium text-stone-500">
                <span>Underweight</span>
                <span>Healthy</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-soft">
              <p className="text-sm text-stone-600">Healthy weight for your height</p>
              <p className="mt-1 font-display text-2xl font-bold text-primary-800">
                {result.idealMin.toFixed(1)} to {result.idealMax.toFixed(1)} kg
              </p>
              <p className="mt-2 text-sm text-stone-600">
                {result.bmi < 18.5 || result.bmi >= 25
                  ? `Moving toward this range is a good goal. Your current weight is ${result.weight} kg.`
                  : 'You are within the healthy range. Keep up your current habits.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-soft">
              <Scale className="h-8 w-8" />
            </span>
            <p className="mt-5 font-display text-2xl font-bold text-primary-900">Your result appears here</p>
            <p className="mt-2 text-stone-600">Fill in both fields and press Calculate BMI.</p>
          </div>
        )}
      </div>
    </div>
  );
}
