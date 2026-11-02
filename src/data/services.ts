import { CalendarHeart, Calculator, HeartPulse, Salad, Users, Video, type LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: 'diet-plans',
    title: 'Personalised Diet Plans',
    description: 'Meal plans shaped around your goal, daily routine and food preferences, with clear portions and simple recipes.',
    icon: CalendarHeart,
  },
  {
    id: 'health-metrics',
    title: 'Health Metrics Tracking',
    description: 'Quick BMI and calorie calculators that show where you stand today and what to aim for next.',
    icon: Calculator,
  },
  {
    id: 'indian-vegetarian',
    title: 'Vegetarian Indian Cuisine',
    description: 'A library of everyday Indian vegetarian meals, from dal and sabzi to chaat and millet rotis, all balanced for nutrition.',
    icon: Salad,
  },
  {
    id: 'consultation',
    title: 'Nutrition Consultation',
    description: 'One-to-one guidance from certified nutrition experts for medical conditions, pregnancy and sports performance.',
    icon: Video,
  },
  {
    id: 'family',
    title: 'Family Nutrition',
    description: 'Balanced meals for children, adults and seniors under one roof, planned to suit different ages and appetites.',
    icon: Users,
  },
  {
    id: 'heart-health',
    title: 'Heart Health Programme',
    description: 'Low-salt, low-oil meal ideas and habit guides to support healthy cholesterol and blood pressure.',
    icon: HeartPulse,
  },
];
