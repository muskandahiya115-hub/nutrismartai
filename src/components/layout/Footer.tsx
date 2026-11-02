import { Leaf, Mail, Phone } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Diet Plans', href: '#diet-plans' },
  { label: 'Nutrition Tips', href: '#tips' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <a href="#home" className="flex items-center gap-2.5 font-display text-xl font-bold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500">
              <Leaf className="h-5 w-5" />
            </span>
            NutriSmart <span className="text-accent-400">AI</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-200">
            Smart nutrition and wellness tools for healthier everyday eating, rooted in Indian vegetarian food.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-white">Quick links</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-accent-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent-400" />
              hello@nutrismart.ai
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent-400" />
              +91 98765 43210
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-800">
        <p className="mx-auto max-w-7xl px-5 py-6 text-center text-xs text-primary-300 sm:px-8">
          © {new Date().getFullYear()} NutriSmart AI. The tools on this site are for general wellness guidance and do not replace advice from a doctor.
        </p>
      </div>
    </footer>
  );
}
