import { Link } from 'react-router-dom'
import { Flame, Trophy, Gamepad2, BookOpen, RotateCcw, Award } from 'lucide-react'
import { COURSES, allLessons } from '../data/curriculum.js'
import { useStore, rankFor, nextRank, RANKS } from '../store/useStore.js'
import { useCourseProgress } from '../hooks/useCourseProgress.js'
import ProgressRing from '../components/ProgressRing.jsx'
import CourseCard from '../components/CourseCard.jsx'

function EnrolledRow({ course }) {
  const pct = useCourseProgress(course)
  const flat = allLessons(course)
  return (
    <Link to={`/course/${course.id}`} className="flex items-center gap-4 rounded-xl border border-cline bg-white p-4 hover:border-cblue hover:shadow-card">
      <span className="grid h-12 w-12 place-items-center rounded-lg bg-cblue-50 text-2xl">{course.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate font-bold">{course.title}</div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-cline">
          <div className="h-full bg-cblue transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-1 text-xs text-cslate">{pct}% · {flat.length} lessons</div>
      </div>
      <ProgressRing value={pct} size={44} stroke={5} />
    </Link>
  )
}

export default function Dashboard() {
  const store = useStore()
  const { xp, streak, enrolled, labsDone, lessonsDone } = store
  const rank = rankFor(xp)
  const next = nextRank(xp)
  const enrolledCourses = COURSES.filter((c) => enrolled[c.id])
  const labCount = Object.values(labsDone).filter((v) => v > 0).length
  const lessonCount = Object.keys(lessonsDone).length
  const rankIdx = RANKS.indexOf(rank)

  return (
    <div className="container-x py-8">
      {/* hero */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-cblue-800 to-violet-700 p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/15 text-5xl">{rank.icon}</div>
          <div>
            <div className="text-xs uppercase tracking-wide text-white/60">Current rank</div>
            <div className="text-2xl font-extrabold">{rank.name}</div>
            <div className="mt-1 text-sm text-white/80">{xp} XP {next && `· ${next.xp - xp} XP to ${next.name} ${next.icon}`}</div>
            <div className="mt-2 h-2 w-64 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-cyan" style={{ width: `${next ? Math.min(100, (xp / next.xp) * 100) : 100}%` }} />
            </div>
          </div>
          <div className="ml-auto flex gap-3">
            {[[<Flame key="f" />, streak, 'day streak'], [<BookOpen key="b" />, lessonCount, 'lessons'], [<Gamepad2 key="g" />, labCount, 'labs beaten']].map(([ic, n, l], i) => (
              <div key={i} className="rounded-xl bg-white/10 px-4 py-3 text-center">
                <div className="flex justify-center text-white/80">{ic}</div>
                <div className="mt-1 text-xl font-bold">{n}</div>
                <div className="text-[11px] text-white/60">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* rank ladder */}
      <div className="mt-6 card p-5">
        <h2 className="mb-3 flex items-center gap-2 font-bold"><Award size={18} className="text-amber-500" /> Rank ladder</h2>
        <div className="flex flex-wrap gap-2">
          {RANKS.map((r, i) => (
            <div key={r.name} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${i <= rankIdx ? 'bg-cblue text-white' : 'bg-cbg text-cslate'}`}>
              <span>{r.icon}</span><span className="font-semibold">{r.name}</span>
              <span className="text-[11px] opacity-70">{r.xp}xp</span>
            </div>
          ))}
        </div>
      </div>

      {/* continue learning */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Continue learning</h2>
        <button onClick={() => { if (confirm('Reset all progress, XP and enrolments?')) store.resetAll() }}
          className="flex items-center gap-1 text-sm font-semibold text-rose-500 hover:underline">
          <RotateCcw size={14} /> Reset progress
        </button>
      </div>

      {enrolledCourses.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {enrolledCourses.map((c) => <EnrolledRow key={c.id} course={c} />)}
        </div>
      ) : (
        <div className="mt-4 card p-8 text-center">
          <div className="text-4xl">🧭</div>
          <p className="mt-2 font-semibold">Not enrolled yet.</p>
          <p className="text-sm text-cslate">Pick a course and start earning XP.</p>
          <Link to="/roadmap" className="btn-primary mt-4">Open the roadmap</Link>
        </div>
      )}

      {/* recommended */}
      <h2 className="mt-10 text-xl font-extrabold">Recommended next</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.filter((c) => !enrolled[c.id]).slice(0, 3).map((c) => <CourseCard key={c.id} course={c} />)}
      </div>
    </div>
  )
}
