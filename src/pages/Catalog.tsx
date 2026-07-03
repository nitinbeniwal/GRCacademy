import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { DOMAINS, CERTIFICATIONS, COURSES } from '../data/curriculum'
import type { CourseLevel } from '../types'
import CourseCard from '../components/CourseCard'

const LEVELS: (CourseLevel | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Lead']

export default function Catalog() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [level, setLevel] = useState<CourseLevel | 'All'>('All')
  const [domain, setDomain] = useState('all')
  const [cert, setCert] = useState('all')

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return COURSES.filter((c) => {
      if (level !== 'All' && c.level !== level) return false
      if (domain !== 'all' && c.domainId !== domain) return false
      if (cert !== 'all' && c.certId !== cert) return false
      if (!t) return true
      return (
        c.title.toLowerCase().includes(t) ||
        c.subtitle.toLowerCase().includes(t) ||
        c.tags.some((x) => x.toLowerCase().includes(t)) ||
        c.skills.some((x) => x.toLowerCase().includes(t))
      )
    })
  }, [q, level, domain, cert])

  const certOptions = CERTIFICATIONS.filter((c) => c.status === 'available' && (domain === 'all' || c.domainId === domain))

  return (
    <div className="container-x py-8">
      <h1 className="text-3xl font-extrabold">Course catalog</h1>
      <p className="mt-1 text-cslate">
        {COURSES.length} courses across {DOMAINS.length} domains. Filter to find your next lesson.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-cline bg-white px-4 py-2.5">
          <Search size={16} className="text-cslate" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses, skills, frameworks…"
            aria-label="Search courses"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <select
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value)
            setCert('all')
          }}
          aria-label="Filter by domain"
          className="rounded-full border border-cline bg-white px-4 py-2.5 text-sm"
        >
          <option value="all">All domains</option>
          {DOMAINS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>
        <select
          value={cert}
          onChange={(e) => setCert(e.target.value)}
          aria-label="Filter by certification"
          className="rounded-full border border-cline bg-white px-4 py-2.5 text-sm"
        >
          <option value="all">All certifications</option>
          {certOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} · {c.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              level === l ? 'bg-cblue text-white' : 'border border-cline bg-white text-cslate hover:border-cblue'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
      {!filtered.length && <div className="py-16 text-center text-cslate">No courses match. Try a different filter.</div>}
    </div>
  )
}
