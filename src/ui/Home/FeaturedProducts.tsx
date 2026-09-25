import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import PillButton from '@/components/PillButton';
import SectionHeader from '@/components/SectionHeader';
import { statusStyles, getProductIcon } from '@/data/products';
import { useProducts } from '@/data/productsStore';

const MotionLink = motion.create(Link);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const FeaturedProducts = () => {
  const products = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const resourceCount = products.filter((p) => (p.type ?? 'software') !== 'software').length;

  return (
    <section id="products" className="py-20 lg:py-28 bg-white dark:bg-[#0d0d0f] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Products"
          title="Things I'm Building"
          description="Beyond client work — products of my own, built through Kagayaki and on my own journey."
        />

        {/* Top 3 products */}
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product, i) => {
            const Icon = getProductIcon(product);
            const status = statusStyles[product.status];
            return (
              <MotionLink
                key={product.id}
                to={product.link ?? '/products'}
                {...fadeUp(0.1 + i * 0.1)}
                className="group flex flex-col rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#141414] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a017]/50 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-[#d4a017]/10 text-[#9a6f00] dark:text-[#e9c766] transition-transform duration-300 group-hover:scale-110">
                    {product.logo ? (
                      <img src={product.logo} alt={`${product.name} logo`} className="h-full w-full object-cover" />
                    ) : (
                      <Icon className="h-7 w-7" />
                    )}
                  </span>
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${status.className}`}>
                    {product.status === 'in-development' && (
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4a017]" />
                    )}
                    {status.label}
                  </span>
                </div>

                <h3 className="font-display text-3xl font-bold uppercase tracking-wide text-gray-900 dark:text-white group-hover:text-[#3d5a8c] dark:group-hover:text-[#8fb4e8] transition-colors">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766]">
                  {product.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#3d5a8c] dark:text-[#8fb4e8]">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </MotionLink>
            );
          })}
        </div>

        {/* E-books + see all */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#141414] px-6 py-5 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#d4a017]/10 text-[#9a6f00] dark:text-[#e9c766]">
              <BookOpen className="h-5 w-5" />
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Plus <strong className="text-gray-900 dark:text-white">
                {resourceCount > 0 ? `${resourceCount} digital resource${resourceCount === 1 ? '' : 's'}` : 'e-books, guides and templates'}
              </strong> — practical resources from real projects.
            </p>
          </div>
          <PillButton href="/products" variant="outlineInk" className="shrink-0">
            See all products
          </PillButton>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
