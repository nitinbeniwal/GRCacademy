import { useParams, Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Clock, BookOpen, Trophy, ArrowRight, Award } from 'lucide-react'
import { CERT_BY_ID, coursesInCert, courseLessonCount, allLessons } from '../data/curriculum'
import { useCourseProgress, useCertProgress } from '../hooks/useProgress'
import type { Course } from '../types'
import ProgressRing from '../components/ProgressRing'
import NotFound from './NotFound'

function CourseRow({ course, index }: { course: Course; index: number }) {
  const pct = useCourseProgress(course)
  return (
    <Link
      to={`/course/${course.id}`}
      className="flex items-center gap-4 rounded-xl border border-cline bg-white p-4 transition hover:border-cblue hover:shadow-card"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cblue-50 text-sm font-bold text-cblue">
        {index + 1}
      </span>
      <span className="text-2xl">{course.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate font-bold text-cink">{course.title}</div>
        <div className="text-xs text-cslate">
          {courseLessonCount(course)} lessons · {course.hours}h
        </div>
      </div>
      {pct === 100 ? (
        <CheckCircle2 className="text-emerald-500" />
      ) : pct > 0 ? (
        <span className="text-sm font-bold text-cblue">{pct}%</span>
      ) : (
        <ArrowRight className="text-cline" />
      )}
    </Link>
  )
}

export default function CertificationPage() {
  const { certId } = useParams()
  const nav = useNavigate()
  const cert = certId ? CERT_BY_ID[certId] : undefined
  const { percent, earned } = useCertProgress(certId ?? '')

  if (!cert || cert.status === 'coming-soon') return <NotFound />

  const courses = coursesInCert(cert.id)
  const lessons = courses.reduce((n, c) => n + courseLessonCount(c), 0)
  const hours = courses.reduce((n, c) => n + c.hours, 0)
  const firstLesson = courses[0] && allLessons(courses[0])[0]

  return (
    <div>
      <div className={`bg-gradient-to-br ${cert.color} text-white`}>
        <div className="container-x py-10">
          <div className="mb-3 text-sm text-white/70">
            <Link to="/certifications" className="hover:underline">
              Certifications
            </Link>{' '}
            / {cert.code}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 text-3xl">{cert.icon}</span>
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="rounded-md bg-white/25 px-2 py-0.5 font-extrabold">{cert.code}</span>
                    <span className="uppercase tracking-wide text-white/80">
                      Level {cert.level} · {cert.tier}
                    </span>
                  </div>
                  <h1 className="mt-1 text-3xl font-extrabold">{cert.title}</h1>
                </div>
              </div>
              <p className="mt-3 max-w-2xl text-lg text-white/85">{cert.blurb}</p>
              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                <span className="flex items-center gap-1">
                  <BookOpen size={15} /> {courses.length} courses · {lessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={15} /> {hours}h
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 text-cink shadow-cardhover">
              {earned ? (
                <div className="text-center">
                  <Award className="mx-auto text-amber-500" size={40} />
                  <div className="mt-2 font-extrabold">Certification earned! 🎉</div>
                  <p className="mt-1 text-sm text-cslate">You completed every course in {cert.code}.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <ProgressRing value={percent} size={54} />
                    <div>
                      <div className="text-sm text-cslate">Your progress</div>
                      <div className="font-bold">{percent}% complete</div>
                    </div>
                  </div>
                  {firstLesson && (
                    <button onClick={() => nav(`/learn/${firstLesson.id}`)} className="btn-primary mt-4 w-full">
                      {percent > 0 ? 'Continue certification' : 'Start certification'}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-8 py-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold">Path courses</h2>
          <p className="text-sm text-cslate">Work through them in order for the smoothest ramp.</p>
          <div className="mt-4 space-y-3">
            {courses.map((c, i) => (
              <CourseRow key={c.id} course={c} index={i} />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card p-5">
            <h3 className="flex items-center gap-2 font-bold">
              <Trophy size={16} className="text-amber-500" /> What you&apos;ll be able to do
            </h3>
            <ul className="mt-3 space-y-2">
              {cert.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-cink/90">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" /> {o}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
