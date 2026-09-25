import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Presentation, Wrench } from "lucide-react";
import PillButton from "@/components/PillButton";
import PageHeader from "@/components/PageHeader";
import { statusStyles, getProductIcon } from "@/data/products";
import { useProducts } from "@/data/productsStore";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const resources = [
  {
    icon: BookOpen,
    type: "ebook",
    title: "E-books & Guides",
    text: "Practical e-books and guides drawn from real projects — technology, business and growth.",
  },
  {
    icon: Presentation,
    type: "course",
    title: "Courses & Workshops",
    text: "Structured learning experiences on software development and business.",
  },
  {
    icon: Wrench,
    type: "template",
    title: "Tools & Templates",
    text: "Frameworks, templates and resources you can use in your own work.",
  },
] as const;

export default function ProductsPage() {
  const products = useProducts();
  const software = products.filter((p) => (p.type ?? "software") === "software");
  const digitalResources = products.filter((p) => (p.type ?? "software") !== "software");
  return (
    <section className="bg-white dark:bg-[#0d0d0f] pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Products"
          title={
            <>
              Things I'm{" "}
              <span className="text-[#3d5a8c] dark:text-[#8fb4e8]">Building</span>
            </>
          }
          description="Beyond client work, I'm building products of my own — software, resources and learning experiences designed to help people and businesses get more from technology."
        />

        {/* Software products */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {software.map((product, i) => {
            const Icon = getProductIcon(product);
            const status = statusStyles[product.status];
            return (
              <motion.div
                key={product.id}
                {...fadeUp(0.3 + i * 0.1)}
                className="flex flex-col rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#141414] p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-[#d4a017]/10 text-[#9a6f00] dark:text-[#e9c766]">
                    {product.logo ? (
                      <img src={product.logo} alt={`${product.name} logo`} className="h-full w-full object-cover" />
                    ) : (
                      <Icon className="h-7 w-7" />
                    )}
                  </span>
                  <div className="flex flex-col items-end gap-1.5">
                    {product.price && (
                      <span className="inline-flex items-center rounded-full bg-[#d4a017]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766]">
                        {product.price}
                      </span>
                    )}
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${status.className}`}>
                      {product.status === "in-development" && (
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4a017]" />
                      )}
                      {status.label}
                    </span>
                  </div>
                </div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-gray-900 dark:text-white">
                  {product.name}
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766]">
                  {product.tagline}
                </p>
                <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Digital resources */}
        <motion.h2
          {...fadeUp(0.4)}
          className="mt-20 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
        >
          Digital Resources
        </motion.h2>

        {/* One subsection per resource type — real products or a coming-soon card */}
        {resources.map(({ icon: CatIcon, type, title, text }, c) => {
          const items = digitalResources.filter((p) => (p.type ?? "software") === type);
          return (
            <div key={type} className="mt-12">
              <motion.div {...fadeUp(0.45 + c * 0.1)} className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#d4a017]/10 text-[#9a6f00] dark:text-[#e9c766]">
                  <CatIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
                </div>
              </motion.div>

              {items.length > 0 ? (
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((product, i) => {
                    const Icon = getProductIcon(product);
                    const status = statusStyles[product.status];
                    return (
                      <motion.div
                        key={product.id}
                        {...fadeUp(0.5 + i * 0.08)}
                        className="flex flex-col rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#141414] p-7"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-[#d4a017]/10 text-[#9a6f00] dark:text-[#e9c766]">
                            {product.logo ? (
                              <img src={product.logo} alt={`${product.name} cover`} className="h-full w-full object-cover" />
                            ) : (
                              <Icon className="h-6 w-6" />
                            )}
                          </span>
                          <div className="flex flex-col items-end gap-1.5">
                            {product.price && (
                              <span className="inline-flex items-center rounded-full bg-[#d4a017]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766]">
                                {product.price}
                              </span>
                            )}
                            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${status.className}`}>
                              {status.label}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-display text-2xl font-bold uppercase tracking-wide text-gray-900 dark:text-white">
                          {product.name}
                        </h4>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766]">
                          {product.tagline}
                        </p>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {product.description}
                        </p>
                        {product.link && (
                          <PillButton href={product.link} variant="outlineInk" size="sm" arrow className="mt-6 self-start">
                            {product.price ? "Get It" : "View"}
                          </PillButton>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  {...fadeUp(0.55)}
                  className="mt-6 flex items-center gap-4 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#141414]/60 px-6 py-5"
                >
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-gray-600" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nothing here yet — {title.toLowerCase()} are on the way.
                  </p>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* CTA */}
        <motion.div
          {...fadeUp(0.7)}
          className="mt-16 flex flex-col items-start gap-6 rounded-3xl bg-[#1e2f4d] p-8 sm:p-12 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Want product updates?
            </h2>
            <p className="mt-2 max-w-lg text-white/75">
              Get notified when Meiyo and new resources launch.
            </p>
          </div>
          <PillButton href="mailto:godfreyj.sule1@gmail.com" variant="gold" arrow>
            Get Notified
          </PillButton>
        </motion.div>
      </div>
    </section>
  );
}
