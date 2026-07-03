import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, FileText } from 'lucide-react'
import { COURSES, CERTIFICATIONS, LESSON_INDEX, COURSE_BY_ID } from '../data/curriculum'
import CourseCard from '../components/CourseCard'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const t = q.trim().toLowerCase()

  const setQ = (value: string) => setParams(value ? { q: value } : {}, { replace: true })

  const results = useMemo(() => {
    if (!t) return { certs: [], courses: COURSES, lessons: [] as { id: string; title: string; course: string }[] }

    const certs = CERTIFICATIONS.filter(
      (c) =>
        c.title.toLowerCase().includes(t) ||
        c.code.toLowerCase().includes(t) ||
        c.tier.toLowerCase().includes(t) ||
        c.blurb.toLowerCase().includes(t) ||
        c.outcomes.some((o) => o.toLowerCase().includes(t))
    )

    const courses = COURSES.filter(
      (c) =>
        c.title.toLowerCase().includes(t) ||
        c.subtitle.toLowerCase().includes(t) ||
        c.description.toLowerCase().includes(t) ||
        c.tags.some((x) => x.toLowerCase().includes(t)) ||
        c.skills.some((x) => x.toLowerCase().includes(t))
    )

    const lessons = Object.values(LESSON_INDEX)
      .filter((e) => e.lesson.title.toLowerCase().includes(t))
      .slice(0, 24)
      .map((e) => ({
        id: e.lesson.id,
        title: e.lesson.title,
        course: COURSE_BY_ID[e.courseId]?.title ?? '',
      }))

    return { certs, courses, lessons }
  }, [t])

  const nothing = t && !results.certs.length && !results.courses.length && !results.lessons.length

  return (
    <div className="container-x py-8">
      <h1 className="text-3xl font-extrabold">Search</h1>
      <p className="mt-1 text-cslate">Find any certification, course or topic across GRC Academy.</p>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-cline bg-white px-4 py-3 focus-within:border-cblue">
        <SearchIcon size={18} className="shrink-0 text-cslate" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search courses, skills, frameworks, topics…"
          aria-label="Search"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {nothing && (
        <div className="py-20 text-center text-cslate">
          No matches for “{q}”. Try a framework (ISO 27001), a skill (risk register) or a topic.
        </div>
      )}

      {/* Certifications */}
      {results.certs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-cslate">Certifications</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.certs.map((c) => (
              <Link
                key={c.id}
                to={`/cert/${c.id}`}
                className="flex items-center gap-3 rounded-xl border border-cline bg-white p-4 hover:border-cblue hover:shadow-card"
              >
                <span className="grid h-10 w-14 shrink-0 place-items-center rounded-lg bg-cblue-50 font-mono text-xs font-bold text-cblue-700">
                  {c.code}
                </span>
                <div className="min-w-0">
                  <div className="truncate font-semibold text-cink">{c.title}</div>
                  <div className="text-xs text-cslate">
                    {c.tier} · {c.access === 'free' ? 'Free' : 'Pro'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Courses */}
      {results.courses.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-cslate">
            {t ? 'Courses' : 'All courses'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>
      )}

      {/* Topics / lessons */}
      {results.lessons.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-cslate">Topics</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {results.lessons.map((l) => (
              <Link
                key={l.id}
                to={`/learn/${l.id}`}
                className="flex items-center gap-3 rounded-lg border border-cline bg-white px-4 py-3 hover:border-cblue"
              >
                <FileText size={16} className="shrink-0 text-cslate" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-cink">{l.title}</div>
                  <div className="truncate text-xs text-cslate">{l.course}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
