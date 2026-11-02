import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';
import { nutritionTips } from '@/data/tips';

export default function NutritionTips() {
  return (
    <section id="tips" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Nutrition tips"
            title="Small habits that add up to big results"
            description="Simple, science-backed ideas you can start using with your very next meal."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nutritionTips.map((tip, index) => (
            <Reveal key={tip.id} delay={(index % 3) * 100}>
              <article className="group flex h-full flex-col rounded-3xl bg-gradient-to-b from-cream-50 to-white p-7 shadow-soft ring-1 ring-cream-300 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-primary-200">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white transition duration-300 group-hover:-rotate-6 group-hover:bg-primary-500">
                    <tip.icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-600">
                    {tip.category}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{tip.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-stone-600">{tip.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
