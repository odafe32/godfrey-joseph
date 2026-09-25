import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Star,
  X,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import PillButton from "@/components/PillButton";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  getProductIcon,
  productIcons,
  productTypeLabels,
  statusStyles,
  type Product,
  type ProductStatus,
  type ProductType,
} from "@/data/products";
import { createProduct, loadProducts, removeProduct, resetProducts, saveProducts, updateProduct, useProducts } from "@/data/productsStore";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#d4a017] focus:ring-2 focus:ring-[#d4a017]/20";

const labelClass = "mb-2 block text-sm font-semibold text-white/80";

const emptyForm = {
  name: "",
  tagline: "",
  description: "",
  type: "software" as ProductType,
  status: "in-development" as ProductStatus,
  iconName: "package",
  logo: "",
  link: "",
  price: "",
  featured: false,
};

type FormState = typeof emptyForm;

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function AdminProducts() {
  const products = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<Product | null>(null);
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

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      type: p.type ?? "software",
      status: p.status,
      iconName: p.iconName,
      logo: p.logo ?? "",
      link: p.link ?? "",
      price: p.price ?? "",
      featured: !!p.featured,
    });
    setErrors({});
    setFormOpen(true);
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.tagline.trim()) next.tagline = "Tagline is required";
    if (!form.description.trim()) next.description = "Description is required";
    if (form.logo && !/^(https?:\/\/|data:image\/|\/).+/.test(form.logo.trim()))
      next.logo = "Logo must be a valid URL or uploaded image";
    if (form.link && !/^(https?:\/\/|\/).+/.test(form.link.trim()))
      next.link = "Link must be a URL or /path";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    setSaveError("");
    setSaving(true);
    const base: Product = {
      id: editing?.id ?? (slugify(form.name) || `product-${Date.now()}`),
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      type: form.type,
      status: form.status,
      iconName: form.iconName,
      logo: form.logo.trim() || undefined,
      link: form.link.trim() || undefined,
      price: form.price.trim() || undefined,
      featured: form.featured || undefined,
    };
    try {
      if (editing) {
        await updateProduct(editing.id, base);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(base);
        toast.success("Product created successfully!");
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
        if (!saveProducts(editing ? loadProducts().map((p) => (p.id === editing.id ? base : p)) : [...loadProducts(), base])) {
          setSaveError("Storage is full — try a smaller image or remove some products.");
          toast.error("Storage is full.");
        } else {
          toast.success(editing ? "Product updated offline." : "Product created offline.");
          setFormOpen(false);
        }
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (!deleting) return;
    void removeProduct(deleting.id).then(() => {
      toast.success("Product deleted successfully!");
    }).catch(() => {
      saveProducts(loadProducts().filter((p) => p.id !== deleting.id));
      toast.success("Product deleted offline.");
    });
    setDeleting(null);
  };

  const toggleFeatured = (p: Product) => {
    const updated = { ...p, featured: p.featured ? undefined : true };
    void updateProduct(p.id, updated).catch(() => {
      saveProducts(loadProducts().map((x) => (x.id === p.id ? updated : x)));
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white">
            Products
          </h1>
          <p className="mt-2 text-white/60">
            {products.length} product{products.length === 1 ? "" : "s"} — starred ones show on the homepage.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetProducts}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <PillButton variant="gold" arrow onClick={openCreate}>
            Add Product
          </PillButton>
        </div>
      </div>

      {/* List */}
      <div className="mt-8 space-y-3">
        <AnimatePresence>
          {products.map((p) => {
            const Icon = getProductIcon(p);
            const status = statusStyles[p.status];
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24 }}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-[#141414] p-4 sm:p-5"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#d4a017]/10 text-[#e9c766]">
                  {p.logo ? (
                    <img src={p.logo} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                      {p.name}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-[#3d5a8c]/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8fb4e8]">
                      {productTypeLabels[p.type ?? "software"]}
                    </span>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${status.className}`}>
                      {status.label}
                    </span>
                    {p.price && (
                      <span className="inline-flex items-center rounded-full bg-[#d4a017]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#e9c766]">
                        {p.price}
                      </span>
                    )}
                    {p.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#d4a017]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#e9c766]">
                        <Star className="h-3 w-3" /> Homepage
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-white/50">
                    {p.tagline} · {p.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFeatured(p)}
                    className={`grid h-10 w-10 place-items-center rounded-xl border transition-colors ${
                      p.featured
                        ? "border-[#d4a017]/40 bg-[#d4a017]/15 text-[#e9c766]"
                        : "border-white/10 text-white/40 hover:bg-white/5 hover:text-white"
                    }`}
                    aria-label={p.featured ? "Remove from homepage" : "Show on homepage"}
                    title={p.featured ? "Remove from homepage" : "Show on homepage"}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openEdit(p)}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                    aria-label={`Edit ${p.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleting(p)}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    aria-label={`Delete ${p.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {products.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#141414] py-16 text-center text-white/50">
            No products yet — add your first one.
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
                  {editing ? "Edit Product" : "New Product"}
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
                      <label htmlFor="p-name" className={labelClass}>Name</label>
                      <input
                        id="p-name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Meiyo AI"
                        className={inputClass}
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="p-tagline" className={labelClass}>Tagline</label>
                      <input
                        id="p-tagline"
                        value={form.tagline}
                        onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                        placeholder="AI assistant"
                        className={inputClass}
                      />
                      {errors.tagline && <p className="mt-1.5 text-xs text-red-400">{errors.tagline}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="p-desc" className={labelClass}>Description</label>
                    <textarea
                      id="p-desc"
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="What it does and who it's for…"
                      className={`${inputClass} resize-y`}
                    />
                    {errors.description && <p className="mt-1.5 text-xs text-red-400">{errors.description}</p>}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <label htmlFor="p-type" className={labelClass}>Type</label>
                      <div className="relative">
                        <select
                          id="p-type"
                          value={form.type}
                          onChange={(e) => setForm({ ...form, type: e.target.value as ProductType })}
                          className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                        >
                          <option value="software">Software</option>
                          <option value="ebook">E-book</option>
                          <option value="course">Course</option>
                          <option value="template">Template</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="p-status" className={labelClass}>Status</label>
                      <div className="relative">
                        <select
                          id="p-status"
                          value={form.status}
                          onChange={(e) => setForm({ ...form, status: e.target.value as ProductStatus })}
                          className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                        >
                          <option value="live">Live</option>
                          <option value="in-development">In development</option>
                          <option value="coming-soon">Coming soon</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="p-price" className={labelClass}>Price <span className="font-normal text-white/40">(optional)</span></label>
                      <input
                        id="p-price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        placeholder="₦5,000 or Free"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="p-link" className={labelClass}>Link <span className="font-normal text-white/40">(optional — where to buy/get it)</span></label>
                    <input
                      id="p-link"
                      value={form.link}
                      onChange={(e) => setForm({ ...form, link: e.target.value })}
                      placeholder="https://… or /products"
                      className={inputClass}
                    />
                    {errors.link && <p className="mt-1.5 text-xs text-red-400">{errors.link}</p>}
                  </div>

                  <ImageUploadField
                    label="Logo / cover image"
                    value={form.logo}
                    onChange={(logo) => setForm({ ...form, logo })}
                    error={errors.logo}
                    maxWidth={800}
                    previewClass="h-28 w-28"
                  />

                  {/* Icon picker — only used when no logo */}
                  {!form.logo && (
                    <div>
                      <p className={labelClass}>Icon</p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(productIcons).map(([key, IconC]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setForm({ ...form, iconName: key })}
                            className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors ${
                              form.iconName === key
                                ? "border-[#d4a017] bg-[#d4a017]/15 text-[#e9c766]"
                                : "border-white/10 text-white/50 hover:bg-white/5 hover:text-white"
                            }`}
                            aria-label={key}
                          >
                            <IconC className="h-5 w-5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="h-4 w-4 accent-[#d4a017]"
                    />
                    <span className="text-sm font-semibold text-white/80">
                      Show on homepage (top 3)
                    </span>
                  </label>
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
                  {editing ? "Save Changes" : "Add Product"}
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
                Delete {deleting.name}?
              </h2>
              <p className="mt-2 text-sm text-white/60">
                This removes it from the site. You can re-add it later.
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
