import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';
import { services } from '@/data/services';

export default function Services() {
  return (
    <section id="services" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our services"
            title="Everything you need for a healthier routine"
            description="From quick health checks to full meal plans, our services guide you one practical step at a time."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 100}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-cream-300 bg-cream-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:bg-white hover:shadow-lift">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft transition duration-300 group-hover:scale-110 group-hover:bg-primary-500">
                  <service.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-stone-600">{service.description}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary-500 to-accent-400 transition duration-500 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
