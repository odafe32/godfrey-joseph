import { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Briefcase,
  Mail,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { auth, checkSession, useIsAuthed } from "@/utils/auth";
import { useUnreadCount } from "@/data/messagesStore";
import { useSettings } from "@/data/settingsStore";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/works", label: "Works", icon: Briefcase },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/profile", label: "Profile", icon: User },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
    isActive
      ? "bg-[#d4a017]/15 text-[#e9c766]"
      : "text-white/60 hover:bg-white/5 hover:text-white"
  }`;

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const authed = useIsAuthed();
  const unread = useUnreadCount();
  const settings = useSettings();

  // Verify the token is actually valid on mount — a stale flag isn't enough.
  useEffect(() => {
    if (!authed) return;
    void checkSession().then((ok) => {
      if (!ok) navigate("/admin/login", { replace: true });
    });
  }, [authed, navigate]);

  if (!authed) return <Navigate to="/admin/login" replace />;

  const handleLogout = async () => {
    await auth.logout();
    navigate("/admin/login", { replace: true });
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <img src="/logo-mono.png" alt="GJ" className="h-10 w-10 rounded-xl" />
        <div>
          <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
            Godfrey Joseph
          </p>
          <p className="text-xs font-medium uppercase tracking-wider text-[#e9c766]">
            Admin
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1">{item.label}</span>
            {item.to === "/admin/messages" && unread > 0 && (
              <span className="rounded-full bg-[#d4a017] px-2 py-0.5 text-[10px] font-bold text-black">
                {unread}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          View Site
        </NavLink>
        <button
          onClick={() => setLogoutOpen(true)}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-400/90 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0d0f]">
      {/* Fixed topbar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#141414]/95 px-4 backdrop-blur sm:px-6 lg:left-64">
        <button
          onClick={() => setSidebarOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-xl text-white/70 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden lg:block" />
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-white/50 sm:block">{settings.contactEmail}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d4a017]/15 font-display text-sm font-bold text-[#e9c766]">
            GJ
          </span>
        </div>
      </header>

      {/* Fixed sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-[#141414] lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 w-72 border-r border-white/10 bg-[#141414]"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute right-3 top-4 z-10 grid h-9 w-9 place-items-center rounded-xl text-white/70 hover:bg-white/5 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
              {sidebar}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Logout confirmation modal */}
      <AnimatePresence>
        {logoutOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setLogoutOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#141414] p-8 text-center"
              role="dialog"
              aria-modal="true"
              aria-label="Confirm logout"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-500/10 text-red-400">
                <LogOut className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-white">
                Log out?
              </h2>
              <p className="mt-2 text-sm text-white/60">
                You'll need to sign in again to manage the site.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLogoutOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                >
                  Log out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Content — offset for fixed chrome */}
      <main className="px-4 pb-12 pt-24 sm:px-6 lg:ml-64 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
}
