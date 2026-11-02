import { useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import Reveal from '@/components/common/Reveal';
import SectionHeading from '@/components/common/SectionHeading';

interface ContactForm {
  name: string;
  email: string;
  topic: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

const topics = ['General question', 'BMI and calorie help', 'Diet plan request', 'Partnership', 'Feedback'];

const emptyForm: ContactForm = { name: '', email: '', topic: topics[0], message: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {};
  if (form.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!emailPattern.test(form.email.trim())) errors.email = 'Please enter a valid email address.';
  if (form.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@nutrismart.ai' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: MapPin, label: 'Studio', value: 'Bengaluru, Karnataka, India' },
];

const inputClass = 'input-base';

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof ContactForm) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length === 0) setIsSubmitted(true);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="bg-cream-100 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="We would love to hear from you"
            description="Questions about our tools, a diet plan request or feedback? Send us a message and we will get back to you."
          />
        </Reveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <aside className="flex flex-col gap-4 rounded-3xl bg-primary-900 p-8 text-white shadow-lift">
              <h3 className="text-2xl font-bold">Contact details</h3>
              <p className="text-sm leading-relaxed text-primary-100">
                Reach our nutrition team on weekdays, 9 AM to 6 PM IST.
              </p>
              <ul className="mt-4 space-y-5">
                {contactDetails.map((item) => (
                  <li key={item.label} className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <item.icon className="h-5 w-5 text-accent-400" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-primary-200">{item.label}</p>
                      <p className="font-medium text-white">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>

          <Reveal delay={120}>
            <div className="card !p-6 sm:!p-10">
              {isSubmitted ? (
                <div className="animate-fade-up flex flex-col items-center py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <CheckCircle2 className="h-9 w-9" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold">Thank you, {form.name.trim()}!</h3>
                  <p className="mt-3 max-w-md text-stone-600">
                    Your message has been received. We will reply to {form.email.trim()} within two working days.
                  </p>
                  <button type="button" onClick={resetForm} className="btn-outline mt-8">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="contact-name" label="Full name" error={errors.name}>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        placeholder="Your name"
                        onChange={(event) => updateField('name')(event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field id="contact-email" label="Email" error={errors.email}>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        placeholder="you@example.com"
                        onChange={(event) => updateField('email')(event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field id="contact-topic" label="Topic">
                    <select
                      id="contact-topic"
                      value={form.topic}
                      onChange={(event) => updateField('topic')(event.target.value)}
                      className={`${inputClass} cursor-pointer`}
                    >
                      {topics.map((topic) => (
                        <option key={topic}>{topic}</option>
                      ))}
                    </select>
                  </Field>

                  <Field id="contact-message" label="Message" error={errors.message}>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      placeholder="Tell us how we can help"
                      onChange={(event) => updateField('message')(event.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    Send message
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-stone-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
