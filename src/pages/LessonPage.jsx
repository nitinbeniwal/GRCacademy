import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, HelpCircle, Gamepad2, List } from 'lucide-react'
import { LESSON_INDEX, COURSE_BY_ID, allLessons } from '../data/curriculum.js'
import { useStore, XP } from '../store/useStore.js'
import { useCourseProgress } from '../hooks/useCourseProgress.js'
import Quiz from '../components/Quiz.jsx'
import Confetti from '../components/Confetti.jsx'
import LabHost from '../labs/LabHost.jsx'
import NotFound from './NotFound.jsx'

export default function LessonPage() {
  const { lessonId } = useParams()
  const nav = useNavigate()
  const entry = LESSON_INDEX[lessonId]

  const completeLesson = useStore((s) => s.completeLesson)
  const lessonsDone = useStore((s) => s.lessonsDone)
  const enroll = useStore((s) => s.enroll)
  const [burst, setBurst] = useState(false)

  const course = entry ? COURSE_BY_ID[entry.courseId] : null
  const pct = useCourseProgress(course)

  // mark reading lessons complete on open
  useEffect(() => {
    if (!entry) return
    enroll(entry.courseId)
    if (entry.lesson.type === 'reading' || entry.lesson.type === 'video') {
      completeLesson(entry.lesson.id, XP.lesson)
    }
    window.scrollTo(0, 0)
  }, [lessonId]) // eslint-disable-line

  const nav2 = useMemo(() => {
    if (!entry) return { prev: null, next: null }
    const { flat, order } = entry
    return { prev: flat[order - 1] || null, next: flat[order + 1] || null }
  }, [entry])

  if (!entry) return <NotFound />
  const { lesson, flat, order } = entry
  const Icon = { reading: FileText, quiz: HelpCircle, lab: Gamepad2, video: FileText }[lesson.type] || FileText

  const celebrate = () => { setBurst(true); setTimeout(() => setBurst(false), 2500) }
  const goNext = () => nav2.next ? nav(`/learn/${nav2.next.id}`) : nav(`/course/${course.id}`)

  return (
    <div className="bg-cbg pb-16">
      <Confetti fire={burst} />
      {/* top bar */}
      <div className="border-b border-cline bg-white">
        <div className="container-x flex items-center gap-3 py-3">
          <Link to={`/course/${course.id}`} className="flex items-center gap-1 text-sm font-semibold text-cslate hover:text-cblue">
            <List size={16} /> {course.title}
          </Link>
          <div className="ml-auto flex items-center gap-2 text-xs text-cslate">
            Lesson {order + 1} / {flat.length}
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-cline">
              <div className="h-full bg-cblue transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
        {/* module rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[80vh] overflow-y-auto rounded-xl border border-cline bg-white p-2">
            {course.modules.map((m) => (
              <div key={m.id} className="mb-2">
                <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-cblue">{m.weekLabel}</div>
                {m.lessons.map((l) => {
                  const active = l.id === lesson.id
                  const done = l.type === 'lab' ? false : lessonsDone[l.id]
                  return (
                    <Link key={l.id} to={`/learn/${l.id}`}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] ${active ? 'bg-cblue-50 font-semibold text-cblue' : 'text-cslate hover:bg-cbg'}`}>
                      {l.type === 'lab' ? <Gamepad2 size={13} className="text-violet-600" /> : done ? <CheckCircle2 size={13} className="text-emerald-500" /> : <FileText size={13} />}
                      <span className="flex-1 truncate">{l.title}</span>
                    </Link>
                  )
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* content */}
        <article>
          <div className="mb-4 flex items-center gap-2">
            <Icon size={18} className="text-cblue" />
            <span className="chip">{lesson.type === 'lab' ? 'Scenario Lab' : lesson.type === 'quiz' ? 'Checkpoint' : 'Reading'}</span>
            <span className="text-xs text-cslate">{lesson.minutes} min</span>
          </div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">{lesson.title}</h1>

          <div className="mt-6">
            {lesson.type === 'lab' ? (
              <LabHost labId={lesson.labId} onComplete={celebrate} />
            ) : lesson.type === 'quiz' ? (
              <div className="card p-6">
                <Quiz lessonId={lesson.id} questions={lesson.quiz || []} onAllCorrect={celebrate} />
              </div>
            ) : (
              <div
                className="prose-grc card p-6 sm:p-8"
                dangerouslySetInnerHTML={{ __html: lesson.body || '<p>Notes coming soon.</p>' }}
              />
            )}
          </div>

          {/* nav */}
          <div className="mt-8 flex items-center justify-between">
            {nav2.prev
              ? <button onClick={() => nav(`/learn/${nav2.prev.id}`)} className="btn-ghost"><ArrowLeft size={16} /> Previous</button>
              : <span />}
            <button onClick={goNext} className="btn-primary">
              {nav2.next ? 'Next lesson' : 'Finish course'} <ArrowRight size={16} />
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
