import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { RequireAuth } from './auth'
import ContentGuard from './components/ContentGuard'
import { ServerSync } from './lib/sync'
import { useStore } from './store/useStore'

const Home = lazy(() => import('./pages/Home'))
const Catalog = lazy(() => import('./pages/Catalog'))
const Certifications = lazy(() => import('./pages/Certifications'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const Profile = lazy(() => import('./pages/Profile'))
const CertificationPage = lazy(() => import('./pages/CertificationPage'))
const CoursePage = lazy(() => import('./pages/CoursePage'))
const LessonPage = lazy(() => import('./pages/LessonPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="grid place-items-center py-32">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-cline border-t-cblue" />
    </div>
  )
}

export default function App() {
  const touch = useStore((s) => s.touch)
  useEffect(() => {
    touch()
  }, [touch])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <ServerSync />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Public marketing */}
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/u/:username" element={<Profile />} />
            <Route path="/roadmap" element={<Navigate to="/certifications" replace />} />

            {/* Login required — catalog & paths are members-only */}
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/catalog" element={<RequireAuth><Catalog /></RequireAuth>} />
            <Route path="/certifications" element={<RequireAuth><Certifications /></RequireAuth>} />

            {/* Login + Pro entitlement checked per item */}
            <Route path="/cert/:certId" element={<ContentGuard kind="cert"><CertificationPage /></ContentGuard>} />
            <Route path="/course/:courseId" element={<ContentGuard kind="course"><CoursePage /></ContentGuard>} />
            <Route path="/learn/:lessonId" element={<ContentGuard kind="lesson"><LessonPage /></ContentGuard>} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
