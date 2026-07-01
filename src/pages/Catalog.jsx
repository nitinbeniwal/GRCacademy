import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { TRACKS, COURSES } from '../data/curriculum.js'
import CourseCard from '../components/CourseCard.jsx'

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Capstone']

export default function Catalog() {
  const [q, setQ] = useState('')
  const [level, setLevel] = useState('All')
  const [track, setTrack] = useState('all')

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return COURSES.filter((c) => {
      if (level !== 'All' && c.level !== level) return false
      if (track !== 'all' && c.track !== track) return false
      if (!t) return true
      return (
        c.title.toLowerCase().includes(t) ||
        c.subtitle.toLowerCase().includes(t) ||
        c.tags.some((x) => x.toLowerCase().includes(t)) ||
        c.skills.some((x) => x.toLowerCase().includes(t))
      )
    })
  }, [q, level, track])

  return (
    <div className="container-x py-8">
      <h1 className="text-3xl font-extrabold">Course catalog</h1>
      <p className="mt-1 text-cslate">{COURSES.length} courses across {TRACKS.length} tracks. Filter to find your next lesson.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-cline bg-white px-4 py-2.5">
          <Search size={16} className="text-cslate" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses, skills, frameworks…"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <select value={track} onChange={(e) => setTrack(e.target.value)}
          className="rounded-full border border-cline bg-white px-4 py-2.5 text-sm">
          <option value="all">All tracks</option>
          {TRACKS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {LEVELS.map((l) => (
          <button key={l} onClick={() => setLevel(l)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              level === l ? 'bg-cblue text-white' : 'border border-cline bg-white text-cslate hover:border-cblue'
            }`}>
            {l}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
      </div>
      {!filtered.length && (
        <div className="py-16 text-center text-cslate">No courses match. Try a different filter.</div>
      )}
    </div>
  )
}
