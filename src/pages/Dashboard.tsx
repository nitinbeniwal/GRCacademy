import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Flame, Gamepad2, BookOpen, RotateCcw, Award, ArrowRight } from 'lucide-react'
import { COURSES, CERTIFICATIONS, courseLessonCount } from '../data/curriculum'
import type { Course, Certification } from '../types'
import { useStore, rankFor, nextRank, RANKS } from '../store/useStore'
import { useCourseProgress, useCertProgress } from '../hooks/useProgress'
import ProgressRing from '../components/ProgressRing'
import CourseCard from '../components/CourseCard'
import ConfirmDialog from '../components/ConfirmDialog'
import EarlyBird from '../components/EarlyBird'

function EnrolledRow({ course }: { course: Course }) {
  const pct = useCourseProgress(course)
  return (
    <Link
      to={`/course/${course.id}`}
      className="flex items-center gap-4 rounded-xl border border-cline bg-white p-4 hover:border-cblue hover:shadow-card"
    >
      <span className="grid h-12 w-12 place-items-center rounded-lg bg-cblue-50 text-2xl">{course.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate font-bold">{course.title}</div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-cline">
          <div className="h-full bg-cblue transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-1 text-xs text-cslate">
          {pct}% · {courseLessonCount(course)} lessons
        </div>
      </div>
      <ProgressRing value={pct} size={44} stroke={5} />
    </Link>
  )
}

function CertProgress({ cert }: { cert: Certification }) {
  const { percent, earned } = useCertProgress(cert.id)
  return (
    <Link
      to={`/cert/${cert.id}`}
      className="flex items-center gap-3 rounded-xl border border-cline bg-white p-4 hover:border-cblue hover:shadow-card"
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-cblue-50 text-xl">{cert.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-cblue">{cert.code}</span>
          <span className="truncate text-sm font-semibold">{cert.title}</span>
          {earned && <Award size={15} className="ml-auto text-amber-500" />}
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cline">
          <div className="h-full bg-cblue transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <span className="text-sm font-bold text-cblue">{percent}%</span>
    </Link>
  )
}

export default function Dashboard() {
  const { xp, streak, enrolled, labsDone, lessonsDone, resetAll } = useStore()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const rank = rankFor(xp)
  const next = nextRank(xp)
  const enrolledCourses = COURSES.filter((c) => enrolled[c.id])
  const labCount = Object.values(labsDone).filter((v) => v > 0).length
  const lessonCount = Object.keys(lessonsDone).length
  const rankIdx = RANKS.indexOf(rank)
  const liveCerts = CERTIFICATIONS.filter((c) => c.status === 'available')
  const notEnrolled = COURSES.filter((c) => !enrolled[c.id]).slice(0, 3)

  const stats: [React.ReactNode, number, string][] = [
    [<Flame key="f" />, streak, 'day streak'],
    [<BookOpen key="b" />, lessonCount, 'lessons'],
    [<Gamepad2 key="g" />, labCount, 'labs beaten'],
  ]

  return (
    <div className="container-x py-8">
      <div className="mb-6">
        <EarlyBird />
      </div>

      {/* rank hero */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-cblue-800 to-violet-700 p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/15 text-5xl">{rank.icon}</div>
          <div>
            <div className="text-xs uppercase tracking-wide text-white/60">Current rank</div>
            <div className="text-2xl font-extrabold">{rank.name}</div>
            <div className="mt-1 text-sm text-white/80">
              {xp} XP {next && `· ${next.xp - xp} XP to ${next.name} ${next.icon}`}
            </div>
            <div className="mt-2 h-2 w-64 max-w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-cyan"
                style={{ width: `${next ? Math.min(100, (xp / next.xp) * 100) : 100}%` }}
              />
            </div>
          </div>
          <div className="ml-auto flex gap-3">
            {stats.map(([ic, n, l], i) => (
              <div key={i} className="rounded-xl bg-white/10 px-4 py-3 text-center">
                <div className="flex justify-center text-white/80">{ic}</div>
                <div className="mt-1 text-xl font-bold">{n}</div>
                <div className="text-[11px] text-white/60">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* certification progress */}
      <h2 className="mt-8 text-xl font-extrabold">Certification progress</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {liveCerts.map((c) => (
          <CertProgress key={c.id} cert={c} />
        ))}
      </div>

      {/* rank ladder */}
      <div className="mt-8 card p-5">
        <h2 className="mb-3 flex items-center gap-2 font-bold">
          <Award size={18} className="text-amber-500" /> Rank ladder
        </h2>
        <div className="flex flex-wrap gap-2">
          {RANKS.map((r, i) => (
            <div
              key={r.name}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${
                i <= rankIdx ? 'bg-cblue text-white' : 'bg-cbg text-cslate'
              }`}
            >
              <span>{r.icon}</span>
              <span className="font-semibold">{r.name}</span>
              <span className="text-[11px] opacity-70">{r.xp}xp</span>
            </div>
          ))}
        </div>
      </div>

      {/* continue learning */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Continue learning</h2>
        <button
          onClick={() => setConfirmOpen(true)}
          className="flex items-center gap-1 text-sm font-semibold text-rose-500 hover:underline"
        >
          <RotateCcw size={14} /> Reset progress
        </button>
      </div>

      {enrolledCourses.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {enrolledCourses.map((c) => (
            <EnrolledRow key={c.id} course={c} />
          ))}
        </div>
      ) : (
        <div className="mt-4 card p-8 text-center">
          <div className="text-4xl">🧭</div>
          <p className="mt-2 font-semibold">Not enrolled yet.</p>
          <p className="text-sm text-cslate">Pick a certification and start earning XP.</p>
          <Link to="/certifications" className="btn-primary mt-4">
            Browse certifications <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {/* recommended */}
      {notEnrolled.length > 0 && (
        <>
          <h2 className="mt-10 text-xl font-extrabold">Recommended next</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notEnrolled.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Reset all progress?"
        message="This clears your XP, streak, enrolments and lab scores. This cannot be undone."
        confirmLabel="Reset everything"
        danger
        onConfirm={() => {
          resetAll()
          setConfirmOpen(false)
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  )
}
