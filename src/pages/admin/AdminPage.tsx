import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Users, Eye, Activity, MousePointerClick, TrendingUp, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

interface AdminPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface AnalyticsData {
  stats: {
    totalViews: string;
    uniqueVisitors: string;
    activeSessions: string;
    engagementRate: string;
  };
  topPages: { path: string; views: number }[];
}

export default function AdminPage({ title, description, icon: Icon }: AdminPageProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    if (title === "Dashboard") {
      api<AnalyticsData>("/analytics")
        .then((res) => setData(res))
        .catch(() => console.error("Failed to fetch analytics"));
    }
  }, [title]);

  // If this is the dashboard, show the beautiful analytics view
  if (title === "Dashboard") {
    const stats = [
      { name: "Total Page Views", value: data?.stats?.totalViews || "-", change: "+14.5%", icon: Eye, trend: "up" },
      { name: "Unique Visitors", value: data?.stats?.uniqueVisitors || "-", change: "+5.2%", icon: Users, trend: "up" },
      { name: "Active Sessions", value: data?.stats?.activeSessions || "-", change: "+21.1%", icon: Activity, trend: "up" },
      { name: "Engagement Rate", value: data?.stats?.engagementRate || "-", change: "+2.4%", icon: MousePointerClick, trend: "up" },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white">
            Overview
          </h1>
          <p className="mt-2 text-white/60">
            Insights and analytics for your website.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141414] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-white/70">
                  <stat.icon className="h-6 w-6" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#d4a017]/15 px-2.5 py-1 text-xs font-semibold text-[#e9c766]">
                  {stat.change}
                  <TrendingUp className="h-3 w-3" />
                </span>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-white/60">{stat.name}</h3>
                <p className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>
              </div>
              
              {/* Decorative glow */}
              <div className="absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full bg-[#d4a017]/5 blur-3xl" />
            </motion.div>
          ))}
        </div>

        {/* Chart placeholder / Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-2 rounded-3xl border border-white/10 bg-[#141414] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">Traffic Insights</h2>
              <button className="text-sm font-semibold text-[#d4a017] hover:text-[#e9c766]">View Full Report</button>
            </div>
            <div className="mt-8 flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5">
              <p className="text-sm text-white/40">Visual chart integration goes here (e.g., Recharts)</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-3xl border border-white/10 bg-[#141414] p-6 sm:p-8"
          >
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white border-b border-white/10 pb-6">Top Pages</h2>
            <div className="mt-6 space-y-5">
              {(data?.topPages || []).map((page) => (
                <div key={page.path} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-white/80 group-hover:text-white">{page.path}</span>
                  </div>
                  <span className="font-semibold text-white">{page.views}</span>
                </div>
              ))}
              {!data?.topPages?.length && (
                <p className="text-sm text-white/40">No views tracked yet.</p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Fallback for other unfinished pages
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white">
        {title}
      </h1>
      <p className="mt-2 text-white/60">{description}</p>

      <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#141414] px-8 py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#d4a017]/10 text-[#e9c766]">
          <Icon className="h-7 w-7" />
        </span>
        <p className="mt-6 font-display text-2xl font-bold uppercase tracking-wide text-white">
          Coming soon
        </p>
        <p className="mt-2 max-w-sm text-sm text-white/50">
          This section will let you manage {title.toLowerCase()} once it's wired
          to the backend.
        </p>
      </div>
    </motion.div>
  );
}
