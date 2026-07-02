import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { RequireAuth } from './auth'
import { useStore } from './store/useStore'

const Home = lazy(() => import('./pages/Home'))
const Catalog = lazy(() => import('./pages/Catalog'))
const Certifications = lazy(() => import('./pages/Certifications'))
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
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/roadmap" element={<Navigate to="/certifications" replace />} />
            <Route path="/cert/:certId" element={<CertificationPage />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/learn/:lessonId" element={<LessonPage />} />
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
