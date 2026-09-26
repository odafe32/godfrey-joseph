import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Topbar } from './ui'
import Footer from './ui/Home/Footer'
import Preloader from './components/Preloader'
import FloatingButtons from './components/FloatingButtons'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import LearnPage from './pages/LearnPage'
import SpeakingPage from './pages/SpeakingPage'
import AdminLayout from './layouts/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminPage from './pages/admin/AdminPage'
import AdminProducts from './pages/admin/AdminProducts'
import AdminWorks from './pages/admin/AdminWorks'
import AdminMessages from './pages/admin/AdminMessages'
import AdminProfile from './pages/admin/AdminProfile'
import AdminSettings from './pages/admin/AdminSettings'
import { LayoutDashboard } from 'lucide-react'
import { startSessionWatch } from './utils/auth'
import { api } from './utils/api'

function RouteChangeTracker() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Generate or get session ID
    let sessionId = sessionStorage.getItem('visitor_session');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('visitor_session', sessionId);
    }

    // Manage robots meta tag: prevent crawlers from indexing admin pages
    let robotsMeta = document.querySelector('meta[name="robots"]')
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta')
      robotsMeta.setAttribute('name', 'robots')
      document.head.appendChild(robotsMeta)
    }
    if (pathname.startsWith('/admin')) {
      robotsMeta.setAttribute('content', 'noindex, nofollow, noarchive')
    } else {
      robotsMeta.setAttribute('content', 'index, follow')
    }

    // Ignore admin routes for analytics to keep data clean
    if (!pathname.startsWith('/admin')) {
      api('/track', {
        method: 'POST',
        body: {
          url: pathname,
          session_id: sessionId
        }
      }).catch(() => {}); // silently fail if API is down
    }
  }, [pathname])
  return null
}

/** Public site chrome — topbar, footer, floating buttons. */
function SiteLayout() {
  return (
    <>
      <Topbar />
      <Outlet />
      <Footer />
      <FloatingButtons />
    </>
  )
}

import { Toaster } from 'sonner'

function App() {
  const [revealed, setRevealed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Validates the admin token against the API once on load and every hour —
  // clears the session if it's expired or revoked.
  useEffect(() => {
    startSessionWatch()
  }, [])

  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Toaster position="top-right" theme="dark" toastOptions={{ style: { background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' } }} />
      {!loaded && (
        <Preloader
          onReveal={() => setRevealed(true)}
          onComplete={() => setLoaded(true)}
          imagesToPreload={[
            "/logo-mono.png",
            "/hero-2.jpeg",
            "/logos/altior.png",
            "/logos/workbrook.png",
            "/logos/gefyra.png"
          ]}
        />
      )}
      {revealed && (
        <Routes>
          {/* Public site */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/speaking" element={<SpeakingPage />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={<AdminPage title="Dashboard" description="Site overview and quick stats." icon={LayoutDashboard} />}
            />
            <Route path="products" element={<AdminProducts />} />
            <Route path="works" element={<AdminWorks />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
