import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Lock } from 'lucide-react'
import { TRACKS, coursesInTrack, courseLessonCount } from '../data/curriculum.js'
import { useCourseProgress } from '../hooks/useCourseProgress.js'
import { useStore } from '../store/useStore.js'

function CourseNode({ course, side }) {
  const pct = useCourseProgress(course)
  const done = pct === 100
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'l' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
    >
      <Link
        to={`/course/${course.id}`}
        className="flex items-center gap-3 rounded-xl border border-cline bg-white p-3 shadow-card transition hover:-translate-y-0.5 hover:border-cblue hover:shadow-cardhover"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-cblue-50 text-2xl">{course.icon}</span>
        <div className="min-w-0">
          <div className="truncate font-bold text-cink">{course.title}</div>
          <div className="text-xs text-cslate">{courseLessonCount(course)} lessons · {course.hours}h · ⭐ {course.rating}</div>
        </div>
        <span className="ml-auto shrink-0">
          {done ? <CheckCircle2 className="text-emerald-500" /> : pct > 0
            ? <span className="text-xs font-bold text-cblue">{pct}%</span>
            : <Circle className="text-cline" />}
        </span>
      </Link>
    </motion.div>
  )
}

export default function Roadmap() {
  const xp = useStore((s) => s.xp)
  return (
    <div className="container-x py-10">
      <div className="mx-auto max-w-2xl text-center">
        <span className="chip">Zero → Hero</span>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">The GRC Mastery Roadmap</h1>
        <p className="mt-3 text-cslate">
          Seven levels, {TRACKS.length} tracks. Follow it top-to-bottom and you go from never
          having heard the word "compliance" to running an enterprise GRC program. Your progress
          is saved automatically. Current XP: <b className="text-cblue">{xp}</b>.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-3xl">
        {/* vertical spine */}
        <div className="absolute left-4 top-0 h-full w-1 rounded bg-gradient-to-b from-cblue via-violet-500 to-rose-500 sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-14">
          {TRACKS.map((track, ti) => {
            const list = coursesInTrack(track.id)
            return (
              <div key={track.id} className="relative">
                {/* level badge */}
                <div className="relative z-10 mb-6 flex sm:justify-center">
                  <div className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${track.color} px-4 py-2 text-white shadow-lg`}>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/25 text-xs font-bold">{ti + 1}</span>
                    <span className="text-sm font-bold">{track.title}</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase">{track.level}</span>
                  </div>
                </div>
                <p className="mx-auto mb-5 max-w-lg text-center text-sm text-cslate">{track.blurb}</p>

                <div className="ml-10 grid gap-3 sm:ml-0 sm:grid-cols-2">
                  {list.map((c, i) => (
                    <CourseNode key={c.id} course={c} side={i % 2 ? 'r' : 'l'} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* finish */}
        <div className="relative z-10 mt-14 flex sm:justify-center">
          <div className="flex items-center gap-2 rounded-full bg-night-800 px-5 py-3 text-white shadow-lg">
            👑 <span className="font-bold">Chief Risk Officer</span> — you made it.
          </div>
        </div>
      </div>
    </div>
  )
}
