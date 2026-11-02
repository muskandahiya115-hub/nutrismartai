import { useState } from 'react';
import { Calculator, Flame, Scale } from 'lucide-react';
import BmiCalculator from '@/components/calculators/BmiCalculator';
import CalorieCalculator from '@/components/calculators/CalorieCalculator';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';

const tools = [
  { id: 'bmi', label: 'BMI Calculator', icon: Scale },
  { id: 'calories', label: 'Calorie Calculator', icon: Flame },
] as const;

type ToolId = (typeof tools)[number]['id'];

export default function Calculators() {
  const [activeTool, setActiveTool] = useState<ToolId>('bmi');

  return (
    <section id="calculators" className="bg-cream-100 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Health calculators"
            title="Know your numbers, then plan your plate"
            description="Two quick, private tools to understand your body and your daily energy needs."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="mx-auto mb-8 flex w-full max-w-md rounded-full bg-white p-1.5 shadow-soft" role="tablist">
              {tools.map((tool) => {
                const isActive = activeTool === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTool(tool.id)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition duration-300 ${
                      isActive ? 'bg-primary-600 text-white shadow-soft' : 'text-stone-600 hover:text-primary-700'
                    }`}
                  >
                    <tool.icon className="h-4 w-4" />
                    {tool.label}
                  </button>
                );
              })}
            </div>

            <div key={activeTool} role="tabpanel" className="animate-fade-up card !p-6 sm:!p-10">
              {activeTool === 'bmi' ? <BmiCalculator /> : <CalorieCalculator />}
            </div>

            <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-stone-500">
              <Calculator className="h-4 w-4" />
              Results are estimates for general guidance and are not medical advice.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
