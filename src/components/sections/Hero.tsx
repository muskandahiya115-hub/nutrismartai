import { ArrowRight, Flame, Sparkles, Sprout } from 'lucide-react';

const heroImage =
  'https://images.pexels.com/photos/4887993/pexels-photo-4887993.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const highlights = [
  { label: 'Vegetarian Indian meals', value: '20+' },
  { label: 'Goal-based plans', value: '3' },
  { label: 'Free health tools', value: '100%' },
];

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-primary-900">
      <img
        src={heroImage}
        alt="A bowl of fresh vegetables and salad greens"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-900 via-primary-900/85 to-primary-800/40" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-24 sm:px-8 md:pt-28 lg:grid-cols-2 lg:pb-20">
        <div>
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-100 backdrop-blur">
            <Sparkles className="h-4 w-4 text-accent-400" />
            Smart nutrition for everyday Indian kitchens
          </span>

          <h1
            className="animate-fade-up mt-6 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '120ms' }}
          >
            Eat smarter. <span className="text-accent-400">Feel lighter.</span> Live well.
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-primary-100 sm:text-lg"
            style={{ animationDelay: '240ms' }}
          >
            Check your BMI, find your daily calorie needs and follow vegetarian Indian meal plans designed for your goals, all in one simple place.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: '360ms' }}>
            <a href="#calculators" className="btn-primary !bg-accent-500 !text-primary-900 hover:!bg-accent-400">
              Start with calculators
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#diet-plans" className="btn-outline !border-white/30 !bg-white/10 !text-white backdrop-blur hover:!bg-white/20">
              <Sprout className="h-4 w-4" />
              Explore diet plans
            </a>
          </div>

          <dl className="animate-fade-up mt-14 grid max-w-md grid-cols-3 gap-4" style={{ animationDelay: '480ms' }}>
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <dt className="text-xs font-medium text-primary-100">{item.label}</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up hidden lg:block" style={{ animationDelay: '300ms' }}>
          <div className="animate-float relative mx-auto max-w-sm rounded-3xl border border-white/20 bg-white/15 p-6 text-white shadow-lift backdrop-blur-md">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-primary-100">Today's balance</p>
              <Flame className="h-5 w-5 text-accent-400" />
            </div>
            <p className="mt-3 font-display text-4xl font-bold">1,840 <span className="text-base font-medium text-primary-100">kcal</span></p>
            <div className="mt-5 space-y-4">
              {[
                { label: 'Protein', value: 72, color: 'bg-primary-300' },
                { label: 'Fibre', value: 58, color: 'bg-accent-400' },
                { label: 'Vegetables', value: 84, color: 'bg-primary-400' },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1.5 flex justify-between text-xs text-primary-100">
                    <span>{bar.label}</span>
                    <span>{bar.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/20">
                    <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
