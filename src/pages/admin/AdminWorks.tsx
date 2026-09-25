import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  X,
  RotateCcw,
  ChevronDown,
  ExternalLink,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import PillButton from "@/components/PillButton";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { workCategories, type Work } from "@/data/works";
import { createWork, loadWorks, removeWork, resetWorks, saveWorks, updateWork, useWorks } from "@/data/worksStore";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#d4a017] focus:ring-2 focus:ring-[#d4a017]/20";

const labelClass = "mb-2 block text-sm font-semibold text-white/80";

const emptyForm = {
  title: "",
  category: "Web Development",
  image: "",
  description: "",
  stack: "",
  link: "",
};

type FormState = typeof emptyForm;

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function AdminWorks() {
  const works = useWorks();
  const [editing, setEditing] = useState<Work | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<Work | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [saveError, setSaveError] = useState("");

  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setErrors({});
    setFormOpen(true);
  };

  const openEdit = (w: Work) => {
    setEditing(w);
    setForm({
      title: w.title,
      category: w.category,
      image: w.image,
      description: w.description,
      stack: w.stack.join(", "),
      link: w.link === "#" ? "" : w.link,
    });
    setErrors({});
    setFormOpen(true);
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.image.trim()) next.image = "A screenshot is required";
    else if (!/^(https?:\/\/|data:image\/|\/).+/.test(form.image.trim()))
      next.image = "Image must be a valid URL or uploaded image";
    if (!form.description.trim()) next.description = "Description is required";
    if (form.link && !/^https?:\/\/.+/.test(form.link.trim()))
      next.link = "Link must be a valid URL (or leave empty for private)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    setSaveError("");
    setSaving(true);
    const base: Work = {
      id: editing?.id ?? (slugify(form.title) || `work-${Date.now()}`),
      title: form.title.trim(),
      category: form.category,
      image: form.image.trim(),
      description: form.description.trim(),
      stack: form.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      link: form.link.trim() || "#",
    };
    try {
      if (editing) {
        await updateWork(editing.id, base);
        toast.success("Work updated successfully!");
      } else {
        await createWork(base);
        toast.success("Work added successfully!");
      }
      setFormOpen(false);
    } catch (error) {
      const err = error as { message?: string; errors?: Record<string, string[]> };
      if (err?.errors) {
        const fieldErrors: Partial<Record<keyof FormState, string>> = {};
        for (const key in err.errors) {
          fieldErrors[key as keyof FormState] = err.errors[key][0];
        }
        setErrors(fieldErrors);
        setSaveError(err.message || "Validation failed");
        toast.error("Validation failed. Check the form.");
      } else {
        // API unreachable — fall back to local-only storage.
        if (!saveWorks(editing ? loadWorks().map((w) => (w.id === editing.id ? base : w)) : [...loadWorks(), base])) {
          setSaveError("Storage is full — try a smaller image or remove some works.");
          toast.error("Storage is full.");
        } else {
          toast.success(editing ? "Work updated offline." : "Work added offline.");
          setFormOpen(false);
        }
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (!deleting) return;
    void removeWork(deleting.id).then(() => {
      toast.success("Work deleted successfully!");
    }).catch(() => {
      saveWorks(loadWorks().filter((w) => w.id !== deleting.id));
      toast.success("Work deleted offline.");
    });
    setDeleting(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white">
            Works
          </h1>
          <p className="mt-2 text-white/60">
            {works.length} project{works.length === 1 ? "" : "s"} in the portfolio grid.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetWorks}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <PillButton variant="gold" arrow onClick={openCreate}>
            Add Work
          </PillButton>
        </div>
      </div>

      {/* List */}
      <div className="mt-8 space-y-3">
        <AnimatePresence>
          {works.map((w) => (
            <motion.div
              key={w.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -24 }}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-[#141414] p-4 sm:p-5"
            >
              <span className="h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5">
                <img src={w.image} alt="" className="h-full w-full object-cover" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                    {w.title}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-[#3d5a8c]/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8fb4e8]">
                    {w.category}
                  </span>
                  {w.link === "#" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                      <EyeOff className="h-3 w-3" /> Private
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-400">
                      <ExternalLink className="h-3 w-3" /> Live
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-sm text-white/50">
                  {w.stack.join(" · ")} — {w.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(w)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label={`Edit ${w.title}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleting(w)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  aria-label={`Delete ${w.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {works.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#141414] py-16 text-center text-white/50">
            No works yet — add your first project.
          </div>
        )}
      </div>

      {/* Create/Edit modal */}
      <AnimatePresence>
        {formOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setFormOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#141414]"
              role="dialog"
              aria-modal="true"
            >
              {/* Sticky header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                  {editing ? "Edit Work" : "New Work"}
                </h2>
                <button
                  onClick={() => setFormOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-xl text-white/60 hover:bg-white/5 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable body */}
              <form onSubmit={handleSave} noValidate className="overflow-y-auto px-6 py-6 sm:px-8">
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="w-title" className={labelClass}>Title</label>
                      <input
                        id="w-title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Altior CRM"
                        className={inputClass}
                      />
                      {errors.title && <p className="mt-1.5 text-xs text-red-400">{errors.title}</p>}
                    </div>
                    <div>
                      <label htmlFor="w-category" className={labelClass}>Category</label>
                      <div className="relative">
                        <select
                          id="w-category"
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                        >
                          {workCategories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <ImageUploadField
                    label="Screenshot"
                    value={form.image}
                    onChange={(image) => setForm({ ...form, image })}
                    error={errors.image}
                    maxWidth={1400}
                    previewClass="aspect-video w-full"
                  />

                  <div>
                    <label htmlFor="w-desc" className={labelClass}>Description</label>
                    <textarea
                      id="w-desc"
                      rows={4}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="What you built, for whom, and the outcome…"
                      className={`${inputClass} resize-y`}
                    />
                    {errors.description && <p className="mt-1.5 text-xs text-red-400">{errors.description}</p>}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="w-stack" className={labelClass}>Stack <span className="font-normal text-white/40">(comma-separated)</span></label>
                      <input
                        id="w-stack"
                        value={form.stack}
                        onChange={(e) => setForm({ ...form, stack: e.target.value })}
                        placeholder="Laravel, React, TypeScript"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="w-link" className={labelClass}>Link <span className="font-normal text-white/40">(empty = private)</span></label>
                      <input
                        id="w-link"
                        value={form.link}
                        onChange={(e) => setForm({ ...form, link: e.target.value })}
                        placeholder="https://…"
                        className={inputClass}
                      />
                      {errors.link && <p className="mt-1.5 text-xs text-red-400">{errors.link}</p>}
                    </div>
                  </div>
                </div>
              </form>

              {/* Sticky footer */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4 sm:px-8">
                {saveError && (
                  <p className="mr-auto text-xs text-red-400">{saveError}</p>
                )}
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <PillButton variant="gold" onClick={() => handleSave()} loading={saving} disabled={saving}>
                  {editing ? "Save Changes" : "Add Work"}
                </PillButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleting && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleting(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#141414] p-8 text-center"
              role="dialog"
              aria-modal="true"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-500/10 text-red-400">
                <Trash2 className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-white">
                Delete {deleting.title}?
              </h2>
              <p className="mt-2 text-sm text-white/60">
                This removes it from the portfolio grid.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeleting(null)}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
