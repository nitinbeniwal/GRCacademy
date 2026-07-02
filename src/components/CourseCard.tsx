import { Link } from 'react-router-dom'
import { Star, Clock, Users } from 'lucide-react'
import type { Course } from '../types'
import { courseLessonCount, CERT_BY_ID } from '../data/curriculum'
import { useStore } from '../store/useStore'
import { useCourseProgress } from '../hooks/useProgress'
import ProgressRing from './ProgressRing'

export default function CourseCard({ course }: { course: Course }) {
  const enrolled = useStore((s) => Boolean(s.enrolled[course.id]))
  const pct = useCourseProgress(course)
  const cert = CERT_BY_ID[course.certId]

  return (
    <Link
      to={`/course/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-cline bg-white shadow-card transition hover:-translate-y-1 hover:shadow-cardhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-cblue"
    >
      <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-cblue-50 to-violet-100 text-4xl">
        <span className="drop-shadow-sm">{course.icon}</span>
        {cert && <span className="absolute left-3 top-3 chip bg-white/80">{cert.code}</span>}
        {enrolled && (
          <span className="absolute right-3 top-3">
            <ProgressRing value={pct} size={40} stroke={5} />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold leading-snug text-cink group-hover:text-cblue">{course.title}</h3>
        <p className="mt-1 line-clamp-2 text-[13px] text-cslate">{course.subtitle}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {course.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded bg-cbg px-2 py-0.5 text-[11px] font-medium text-cslate">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 pt-3 text-[12px] text-cslate">
          <span className="flex items-center gap-1 font-semibold text-amber-500">
            <Star size={13} fill="currentColor" /> {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {(course.learners / 1000).toFixed(0)}k
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {course.hours}h
          </span>
          <span className="ml-auto">{courseLessonCount(course)} lessons</span>
        </div>
      </div>
    </Link>
  )
}
