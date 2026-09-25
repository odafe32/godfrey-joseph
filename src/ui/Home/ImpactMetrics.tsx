import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Package, Building2, Clock } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'

const metrics = [
  {
    value: "15+",
    label: "Projects Shipped",
    description: "Web, mobile and full-stack systems delivered end-to-end",
    icon: Briefcase,
  },
  {
    value: "10+",
    label: "Clients & Businesses",
    description: "Companies and organizations served across industries",
    icon: Building2,
  },
  {
    value: "3+",
    label: "Products Built",
    description: "My own products — built, launched and still growing",
    icon: Package,
  },
  {
    value: "6+",
    label: "Years Building",
    description: "Hands-on experience across the full development lifecycle",
    icon: Clock,
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const ImpactMetrics: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-gray-50 dark:bg-[#141414] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Impact"
          title="The Numbers So Far"
          description="A snapshot of the work — real projects, real products, real businesses."
        />

        {/* Stat band */}
        <motion.div
          {...fadeUp(0.2)}
          className="relative overflow-hidden rounded-3xl bg-[#1e2f4d] px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
        >
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#d4a017]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#3d5a8c]/30 blur-3xl" />

          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon
              return (
                <motion.div
                  key={metric.label}
                  {...fadeUp(0.3 + index * 0.1)}
                  className="group text-center lg:text-left"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4a017]/15 text-[#e9c766] transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="font-display text-5xl lg:text-6xl font-bold tracking-tight text-white">
                    {metric.value}
                  </div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#e9c766]">
                    {metric.label}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {metric.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ImpactMetrics
