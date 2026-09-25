import { motion } from 'framer-motion';
import { Package, Users } from 'lucide-react';
import PillButton from '@/components/PillButton';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const KagayakiSection = () => {
  return (
    <section id="kagayaki" className="py-20 lg:py-28 bg-gray-50 dark:bg-[#141414] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          {...fadeUp(0.1)}
          className="relative overflow-hidden rounded-3xl bg-[#0d0d0f] border border-white/5 px-8 py-14 sm:px-12 lg:px-16 lg:py-20"
        >
          {/* Glows */}
          <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#d4a017]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-[#3d5a8c]/25 blur-3xl" />

          <div className="relative grid items-center gap-14 lg:grid-cols-2">
            {/* Photo with About-style treatment */}
            <motion.div {...fadeUp(0.2)} className="relative mx-auto w-full max-w-md">
              {/* Gold offset frame */}
              <div className="absolute -inset-3 translate-x-4 translate-y-4 rounded-3xl border-2 border-[#d4a017]/40" />

              <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
                <img
                     src="https://res.cloudinary.com/dllrkis3c/image/upload/v1783156615/IMG-20260603-WA0048.jpg_ofcj2g.jpg"
                  alt="Godfrey Joseph — Founder of Kagayaki Global"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/60 via-transparent to-transparent" />
              </div>

              {/* Floating founder card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-white dark:bg-[#1a1a1a] px-5 py-4 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 sm:-left-8"
              >
                <img
                  src="/logo-mono.png"
                  alt="GJ logo"
                  className="h-11 w-11 rounded-xl object-contain"
                />
                <div>
                  <p className="font-display text-lg font-bold uppercase leading-tight tracking-wide text-gray-900 dark:text-white">
                    Founder
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766]">
                    Kagayaki Global
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Copy */}
            <div>
              <span className="inline-block rounded-full bg-[#d4a017]/15 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#e9c766]">
                The Company
              </span>
              <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] tracking-wide text-white">
                Building technology through{" "}
                <span className="text-[#e9c766]">Kagayaki</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                Kagayaki Global is a technology company I founded — building
                digital products and solutions for individuals, businesses and
                organizations. It's the company layer behind products like{" "}
                <strong className="text-white">Meiyo AI</strong> and the work I
                do for clients.
              </p>

              {/* Fact chips */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <motion.div
                  {...fadeUp(0.35)}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#d4a017]/15 text-[#e9c766]">
                    <Package className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold uppercase tracking-wide text-white">Products</p>
                    <p className="text-xs text-white/60">Meiyo AI and more</p>
                  </div>
                </motion.div>
                <motion.div
                  {...fadeUp(0.45)}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#d4a017]/15 text-[#e9c766]">
                    <Users className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold uppercase tracking-wide text-white">Solutions</p>
                    <p className="text-xs text-white/60">Systems for businesses</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <PillButton href="https://kagaykiglobal.cloud" variant="gold" arrow>
                  Explore Kagayaki
                </PillButton>
                <PillButton href="/products" variant="outline">
                  See the Products
                </PillButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KagayakiSection;
