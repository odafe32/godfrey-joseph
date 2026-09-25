import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Save, CheckCircle2 } from "lucide-react";
import PillButton from "@/components/PillButton";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { loadProfile, resetProfile, saveProfile, useProfile } from "@/data/profileStore";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#d4a017] focus:ring-2 focus:ring-[#d4a017]/20";

const labelClass = "mb-2 block text-sm font-semibold text-white/80";

export default function AdminProfile() {
  const profile = useProfile();
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);

  // Re-sync the form if profile changes elsewhere while page is open.
  const [prevProfile, setPrevProfile] = useState(profile);
  if (profile !== prevProfile) {
    setPrevProfile(profile);
    setForm(profile);
  }

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.photo.trim()) next.photo = "A photo is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaveError("");
    if (await saveProfile({ ...form, name: form.name.trim(), title: form.title.trim() })) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else {
      setSaveError("Could not save — the photo may be too large for local storage.");
    }
  };

  const handleReset = () => {
    resetProfile();
    setForm(loadProfile());
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white">
            Profile
          </h1>
          <p className="mt-2 text-white/60">
            Your public identity — name, title, bio and photo.
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

      <form onSubmit={handleSave} className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Photo card */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-5">
          <ImageUploadField
            label="Profile photo"
            value={form.photo}
            onChange={(photo) => setForm({ ...form, photo })}
            error={errors.photo}
            maxWidth={800}
            previewClass="aspect-square w-full"
          />
          <p className="mt-3 text-xs leading-relaxed text-white/40">
            Square photos work best — used in the admin and can power the site's About section.
          </p>
        </div>

        {/* Details card */}
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="pf-name" className={labelClass}>Full name</label>
              <input
                id="pf-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="pf-title" className={labelClass}>Title</label>
              <input
                id="pf-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Full-Stack Software Engineer"
                className={inputClass}
              />
              {errors.title && <p className="mt-1.5 text-xs text-red-400">{errors.title}</p>}
            </div>
            <div>
              <label htmlFor="pf-tagline" className={labelClass}>Tagline</label>
              <input
                id="pf-tagline"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="I Build. I Teach. I Guide."
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="pf-location" className={labelClass}>Location</label>
              <input
                id="pf-location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Abuja, Nigeria"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="pf-bio" className={labelClass}>Bio</label>
            <textarea
              id="pf-bio"
              rows={5}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="A short paragraph about who you are and what you do…"
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-5">
            {saveError && <p className="mr-auto text-xs text-red-400">{saveError}</p>}
            {saved && (
              <span className="mr-auto inline-flex items-center gap-1.5 text-sm font-semibold text-green-400">
                <CheckCircle2 className="h-4 w-4" /> Saved
              </span>
            )}
            <PillButton type="submit" variant="gold">
              <span className="inline-flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Profile
              </span>
            </PillButton>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
