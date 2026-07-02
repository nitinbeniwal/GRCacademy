import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react'
import type { Certification } from '../types'
import { coursesInCert, courseLessonCount } from '../data/curriculum'
import { useCertProgress } from '../hooks/useProgress'

export default function CertCard({ cert }: { cert: Certification }) {
  const courses = coursesInCert(cert.id)
  const lessons = courses.reduce((n, c) => n + courseLessonCount(c), 0)
  const hours = courses.reduce((n, c) => n + c.hours, 0)
  const { percent, earned } = useCertProgress(cert.id)
  const soon = cert.status === 'coming-soon'

  const inner = (
    <motion.div
      whileHover={soon ? undefined : { y: -4 }}
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-card ${
        soon ? 'border-dashed border-cline opacity-80' : 'border-cline hover:shadow-cardhover'
      }`}
    >
      <div className={`flex items-center gap-3 bg-gradient-to-r ${cert.color} px-5 py-4 text-white`}>
        <span className="grid h-11 w-14 place-items-center rounded-lg bg-white/15 font-mono text-base font-extrabold tracking-wide ring-1 ring-white/25">
          {cert.code}
        </span>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-white/80">Level {cert.level} · {cert.tier}</div>
          <h3 className="mt-0.5 text-lg font-extrabold leading-tight">{cert.title}</h3>
        </div>
        {earned && <CheckCircle2 className="ml-auto text-white" />}
        {soon && <Lock className="ml-auto text-white/80" size={18} />}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-cslate">{cert.blurb}</p>

        {!soon && (
          <>
            <div className="mt-4 flex items-center gap-3 text-xs text-cslate">
              <span>{courses.length} courses</span>
              <span>·</span>
              <span>{lessons} lessons</span>
              <span>·</span>
              <span>{hours}h</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-cline">
              <div className="h-full rounded-full bg-cblue transition-all" style={{ width: `${percent}%` }} />
            </div>
            <div className="mt-1 text-xs text-cslate">{percent}% complete</div>
          </>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          {soon ? (
            <span className="chip">Coming soon</span>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-cblue">
              {percent > 0 ? 'Continue' : 'Start certification'} <ArrowRight size={15} />
            </span>
          )}
          {!soon &&
            (cert.access === 'free' ? (
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">Free</span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-cblue-50 px-2.5 py-1 text-xs font-bold text-cblue-700">
                <Lock size={11} /> Pro
              </span>
            ))}
        </div>
      </div>
    </motion.div>
  )

  if (soon) return <div className="h-full cursor-not-allowed">{inner}</div>
  return (
    <Link to={`/cert/${cert.id}`} className="h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-cblue">
      {inner}
    </Link>
  )
}
