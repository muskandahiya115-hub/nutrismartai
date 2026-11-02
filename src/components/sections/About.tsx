import { CheckCircle2, HeartHandshake, ShieldCheck, Target } from 'lucide-react';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';

const aboutImage =
  'https://images.pexels.com/photos/35008222/pexels-photo-35008222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const values = [
  {
    icon: Target,
    title: 'Purpose driven',
    text: 'Every tool and plan is built around a clear goal, whether that is losing weight, staying balanced or building strength.',
  },
  {
    icon: HeartHandshake,
    title: 'Culturally rooted',
    text: 'We celebrate the nutritious traditions of Indian home cooking, from dal and millets to seasonal sabzi.',
  },
  {
    icon: ShieldCheck,
    title: 'Simple and private',
    text: 'Your calculations run right in your browser. No sign-up is needed to use any of our tools.',
  },
];

const points = [
  'Accurate BMI and calorie estimates using widely used formulas',
  'Vegetarian Indian meal ideas for breakfast, lunch, dinner and snacks',
  'Practical habits that fit busy schedules',
];

export default function About() {
  return (
    <section id="about" className="bg-cream-100 py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <img
              src={aboutImage}
              alt="A traditional Indian thali with dal, rice, roti and vegetables"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-5 shadow-lift sm:block">
              <p className="font-display text-3xl font-bold text-primary-700">Balanced</p>
              <p className="text-sm text-stone-600">Every plate, every day</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="About us"
              title="Nutrition made simple, personal and delicious"
              description="NutriSmart AI was created to make healthy eating easy for busy people. We combine proven nutrition science with the flavours of everyday Indian vegetarian food."
            />
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-8 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-stone-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-3">
        {values.map((value, index) => (
          <Reveal key={value.title} delay={index * 120}>
            <div className="card h-full hover:-translate-y-1 hover:shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                <value.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{value.title}</h3>
              <p className="mt-2 leading-relaxed text-stone-600">{value.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
