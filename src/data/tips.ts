import { Apple, Droplets, Footprints, Moon, Salad, Timer, type LucideIcon } from 'lucide-react';

export interface NutritionTip {
  id: string;
  title: string;
  body: string;
  category: string;
  icon: LucideIcon;
}

export const nutritionTips: NutritionTip[] = [
  {
    id: 'hydration',
    title: 'Start your day with water',
    body: 'Drink a glass of warm water after waking up. Good hydration supports digestion, focus and steady energy through the morning.',
    category: 'Hydration',
    icon: Droplets,
  },
  {
    id: 'half-plate',
    title: 'Fill half your plate with vegetables',
    body: 'Build meals around colourful sabzi, salads and leafy greens. They add fibre and vitamins while keeping calories in check.',
    category: 'Portions',
    icon: Salad,
  },
  {
    id: 'protein',
    title: 'Include protein at every meal',
    body: 'Dal, paneer, sprouts, soya and curd help you feel full longer and protect muscle while you lose weight.',
    category: 'Protein',
    icon: Apple,
  },
  {
    id: 'slow-eating',
    title: 'Eat slowly and mindfully',
    body: 'It takes about 20 minutes for fullness signals to reach your brain. Chew well, put the phone away and pause halfway through.',
    category: 'Mindful eating',
    icon: Timer,
  },
  {
    id: 'sleep',
    title: 'Protect your sleep',
    body: 'Short sleep increases hunger hormones. Aim for 7 to 8 hours and avoid heavy meals within two hours of bedtime.',
    category: 'Sleep',
    icon: Moon,
  },
  {
    id: 'walk',
    title: 'Walk after your meals',
    body: 'A gentle 10 minute walk after lunch and dinner helps regulate blood sugar and aids digestion.',
    category: 'Movement',
    icon: Footprints,
  },
];
