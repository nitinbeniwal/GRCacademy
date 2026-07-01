import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import Roadmap from './pages/Roadmap.jsx'
import CoursePage from './pages/CoursePage.jsx'
import LessonPage from './pages/LessonPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import { useStore } from './store/useStore.js'

export default function App() {
  const touch = useStore((s) => s.touch)
  useEffect(() => { touch() }, [touch])
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/learn/:lessonId" element={<LessonPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
