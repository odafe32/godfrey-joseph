import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Save, CheckCircle2, Github, Youtube, Facebook, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import PillButton from "@/components/PillButton";
import { socialLabels, type SiteSettings } from "@/data/settings";
import { loadSettings, resetSettings, saveSettings, useSettings } from "@/data/settingsStore";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pl-11 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#d4a017] focus:ring-2 focus:ring-[#d4a017]/20";

const labelClass = "mb-2 block text-sm font-semibold text-white/80";

const socialIcons: Record<keyof SiteSettings["socials"], typeof Github> = {
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminSettings() {
  const settings = useSettings();
  const [form, setForm] = useState(settings);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);

  const [prevSettings, setPrevSettings] = useState(settings);
  if (settings !== prevSettings) {
    setPrevSettings(settings);
    setForm(settings);
  }

  const setSocial = (key: keyof SiteSettings["socials"], value: string) =>
    setForm({ ...form, socials: { ...form.socials, [key]: value } });

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.contactEmail.trim()) next.contactEmail = "Contact email is required";
    else if (!EMAIL_RE.test(form.contactEmail.trim())) next.contactEmail = "That email doesn't look right";
    if (form.whatsappNumber && !/^\d{7,15}$/.test(form.whatsappNumber.trim()))
      next.whatsappNumber = "Digits only, with country code (e.g. 2347019259834)";
    for (const [key, value] of Object.entries(form.socials)) {
      if (value && !/^https?:\/\/.+/.test(value.trim()))
        next[`socials.${key}`] = "Must be a full URL starting with https://";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaveError("");
    const cleaned: SiteSettings = {
      contactEmail: form.contactEmail.trim(),
      whatsappNumber: form.whatsappNumber.trim(),
      socials: Object.fromEntries(
        Object.entries(form.socials).map(([k, v]) => [k, v.trim()])
      ) as SiteSettings["socials"],
    };
    if (await saveSettings(cleaned)) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else {
      setSaveError("Could not save settings.");
    }
  };

  const handleReset = () => {
    resetSettings();
    setForm(loadSettings());
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white">
            Settings
          </h1>
          <p className="mt-2 text-white/60">
            Contact details and social links used across the site.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      <form onSubmit={handleSave} className="mt-8 space-y-6">
        {/* Contact */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
            Contact
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Where contact form messages and WhatsApp chats go.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="st-email" className={labelClass}>Contact email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  id="st-email"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              {errors.contactEmail && <p className="mt-1.5 text-xs text-red-400">{errors.contactEmail}</p>}
            </div>
            <div>
              <label htmlFor="st-wa" className={labelClass}>
                WhatsApp number <span className="font-normal text-white/40">(country code, digits only)</span>
              </label>
              <div className="relative">
                <MessageCircle className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  id="st-wa"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  placeholder="2347019259834"
                  className={inputClass}
                />
              </div>
              {errors.whatsappNumber && <p className="mt-1.5 text-xs text-red-400">{errors.whatsappNumber}</p>}
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
            Social Links
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Shown in the footer and floating social buttons. Leave blank to hide one.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {(Object.keys(socialLabels) as (keyof SiteSettings["socials"])[]).map((key) => {
              const Icon = socialIcons[key];
              return (
                <div key={key}>
                  <label htmlFor={`st-${key}`} className={labelClass}>{socialLabels[key]}</label>
                  <div className="relative">
                    <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input
                      id={`st-${key}`}
                      value={form.socials[key]}
                      onChange={(e) => setSocial(key, e.target.value)}
                      placeholder={`https://…`}
                      className={inputClass}
                    />
                  </div>
                  {errors[`socials.${key}`] && (
                    <p className="mt-1.5 text-xs text-red-400">{errors[`socials.${key}`]}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {saveError && <p className="mr-auto text-xs text-red-400">{saveError}</p>}
          {saved && (
            <span className="mr-auto inline-flex items-center gap-1.5 text-sm font-semibold text-green-400">
              <CheckCircle2 className="h-4 w-4" /> Saved
            </span>
          )}
          <PillButton type="submit" variant="gold">
            <span className="inline-flex items-center gap-2">
              <Save className="h-4 w-4" /> Save Settings
            </span>
          </PillButton>
        </div>
      </form>
    </motion.div>
  );
}
