import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hammer, CalendarCheck, Mic2, Send, ChevronDown } from 'lucide-react';
import PillButton from '@/components/PillButton';
import SectionHeader from '@/components/SectionHeader';
import { addMessage } from '@/data/messagesStore';
import { api } from '@/utils/api';
import { toast } from 'sonner';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const inquiryTypes = [
  {
    id: 'project',
    icon: Hammer,
    title: 'Start a Project',
    text: 'A product, website or system to build',
  },
  {
    id: 'consultation',
    icon: CalendarCheck,
    title: 'Book a Session',
    text: 'Consulting on tech, systems or strategy',
  },
  {
    id: 'speaking',
    icon: Mic2,
    title: 'Invite Me to Speak',
    text: 'Conferences, panels, podcasts, workshops',
  },
] as const;

type InquiryType = (typeof inquiryTypes)[number]['id'];

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#d4a017] focus:ring-2 focus:ring-[#d4a017]/20 dark:border-white/10 dark:bg-[#0d0d0f] dark:text-white dark:placeholder-gray-500';

const errorInputClass =
  'border-red-400 dark:border-red-500/60 focus:border-red-400 focus:ring-red-400/20';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const BrandSupportSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get('inquiry');
  const [inquiry, setInquiry] = useState<InquiryType>(
    param === 'consultation' || param === 'speaking' ? param : 'project'
  );

  // Deep links like /?inquiry=speaking#contact pre-select the inquiry type.
  // Adjust state during render (not in an effect) when the param changes.
  const [prevParam, setPrevParam] = useState(param);
  if (param !== prevParam) {
    setPrevParam(param);
    if (param === 'project' || param === 'consultation' || param === 'speaking') {
      setInquiry(param);
    }
  }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (fields?: Partial<Record<keyof FormErrors, string>>): FormErrors => {
    const values = { name, email, message, ...fields };
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = 'Please enter your name';
    else if (values.name.trim().length < 2) next.name = 'Name looks too short';
    if (!values.email.trim()) next.email = 'Please enter your email';
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'That email doesn’t look right';
    if (!values.message.trim()) next.message = 'Please write a short message';
    else if (values.message.trim().length < 10) next.message = 'Give me a little more detail (10+ characters)';
    return next;
  };

  const fieldError = (field: keyof FormErrors) =>
    touched[field] ? errors[field] : undefined;

  const handleBlur = (field: keyof FormErrors) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const handleChange = (field: keyof FormErrors, value: string) => {
    if (field === 'name') setName(value);
    else if (field === 'email') setEmail(value);
    else setMessage(value);
    if (touched[field]) setErrors(validate({ [field]: value }));
  };

  const [saving, setSaving] = useState(false);

  // Calls the Laravel backend to save the message and trigger emails
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(next).length > 0) return;
    
    setSaving(true);
    try {
      await api('/messages', {
        method: 'POST',
        body: { inquiry, name: name.trim(), email: email.trim(), message: message.trim() }
      });
      toast.success("Message sent successfully! We will get back to you soon.");
      setName('');
      setEmail('');
      setMessage('');
      setTouched({});
    } catch (error) {
      const err = error as { message?: string; errors?: Record<string, string[]> };
      if (err?.errors) {
        const fieldErrors: Partial<Record<keyof FormErrors, string>> = {};
        for (const key in err.errors) {
          fieldErrors[key as keyof FormErrors] = err.errors[key][0];
        }
        setErrors(fieldErrors);
        toast.error("Validation failed. Please check the form.");
      } else {
        // Fallback for offline mode
        void addMessage({ inquiry, name: name.trim(), email: email.trim(), message: message.trim() });
        toast.success("Message saved offline. It will be synced later.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gray-50 dark:bg-[#141414] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Let's Connect"
          title="Have Something You're Trying to Build?"
          description="Tell me what you need — a project, a consultation or a speaker — and I'll get back to you."
        />

        <motion.form
          {...fadeUp(0.2)}
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0d0d0f] sm:p-10"
        >
          {/* Inquiry type selector */}
          <div>
            <label htmlFor="contact-type" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              What do you need?
            </label>
            <div className="relative">
              <select
                id="contact-type"
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value as InquiryType)}
                className={`${inputClass} appearance-none pr-10 cursor-pointer`}
              >
                {inquiryTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.title} — {type.text}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Fields */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="Jane Doe"
                aria-invalid={!!fieldError('name')}
                className={`${inputClass} ${fieldError('name') ? errorInputClass : ''}`}
              />
              {fieldError('name') && (
                <p className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="jane@company.com"
                aria-invalid={!!fieldError('email')}
                className={`${inputClass} ${fieldError('email') ? errorInputClass : ''}`}
              />
              {fieldError('email') && (
                <p className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tell me about it
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              aria-invalid={!!fieldError('message')}
              placeholder={
                inquiry === 'project'
                  ? 'What are you building? Timeline, goals, anything you already have…'
                  : inquiry === 'consultation'
                    ? 'What would you like to work through? Your business, the challenge, the goal…'
                    : 'What event is it? Date, audience, format and what you want them to walk away with…'
              }
              className={`${inputClass} resize-y ${fieldError('message') ? errorInputClass : ''}`}
            />
            {fieldError('message') && (
              <p className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">{errors.message}</p>
            )}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <PillButton type="submit" variant="gold" size="lg" className="w-full sm:w-auto" loading={saving} disabled={saving}>
              <span className="inline-flex items-center gap-2">
                {saving ? "Sending..." : "Send Message"}
                {!saving && <Send className="h-4 w-4" />}
              </span>
            </PillButton>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Your message will be securely sent to our team.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default BrandSupportSection;
