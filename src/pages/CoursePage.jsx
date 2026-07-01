import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Star, Clock, Users, BookOpen, ChevronDown, PlayCircle, FileText, HelpCircle, Gamepad2, CheckCircle2 } from 'lucide-react'
import { COURSE_BY_ID, courseLessonCount, allLessons } from '../data/curriculum.js'
import { useStore } from '../store/useStore.js'
import { useCourseProgress } from '../hooks/useCourseProgress.js'
import ProgressRing from '../components/ProgressRing.jsx'
import NotFound from './NotFound.jsx'

const typeIcon = { reading: FileText, quiz: HelpCircle, lab: Gamepad2, video: PlayCircle }

function LessonRow({ courseId, lesson }) {
  const nav = useNavigate()
  const lessonsDone = useStore((s) => s.lessonsDone)
  const labsDone = useStore((s) => s.labsDone)
  const Icon = typeIcon[lesson.type] || FileText
  const done = lesson.type === 'lab' ? (labsDone[lesson.labId] || 0) > 0 : lessonsDone[lesson.id]
  return (
    <button
      onClick={() => nav(`/learn/${lesson.id}`)}
      className="flex w-full items-center gap-3 border-t border-cline px-4 py-3 text-left hover:bg-cbg"
    >
      <Icon size={17} className={lesson.type === 'lab' ? 'text-violet-600' : 'text-cslate'} />
      <span className="flex-1 text-sm">{lesson.title}</span>
      {lesson.type === 'lab' && <span className="chip bg-violet-100 text-violet-700">LAB</span>}
      <span className="text-xs text-cslate">{lesson.minutes} min</span>
      {done && <CheckCircle2 size={16} className="text-emerald-500" />}
    </button>
  )
}

export default function CoursePage() {
  const { courseId } = useParams()
  const course = COURSE_BY_ID[courseId]
  const [open, setOpen] = useState(0)
  const nav = useNavigate()
  const enrolled = useStore((s) => s.enrolled[courseId])
  const enroll = useStore((s) => s.enroll)
  const pct = useCourseProgress(course)

  if (!course) return <NotFound />
  const flat = allLessons(course)
  const firstUnfinished = flat.find((l) => l.type === 'lab' ? true : true) // start at first
  const start = () => { enroll(course.id); nav(`/learn/${flat[0].id}`) }

  return (
    <div>
      {/* header band */}
      <div className="bg-gradient-to-br from-cblue-800 to-violet-700 text-white">
        <div className="container-x py-10">
          <div className="mb-3 text-sm text-white/70">
            <Link to="/catalog" className="hover:underline">Catalog</Link> / {course.level}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{course.icon}</span>
                <h1 className="text-3xl font-extrabold">{course.title}</h1>
              </div>
              <p className="mt-3 max-w-2xl text-lg text-white/85">{course.subtitle}</p>
              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                <span className="flex items-center gap-1 font-semibold text-amber-300"><Star size={15} fill="currentColor" /> {course.rating}</span>
                <span className="flex items-center gap-1"><Users size={15} /> {course.learners.toLocaleString()} learners</span>
                <span className="flex items-center gap-1"><Clock size={15} /> {course.weeks} weeks · {course.hours}h</span>
                <span className="flex items-center gap-1"><BookOpen size={15} /> {courseLessonCount(course)} lessons</span>
              </div>
            </div>

            {/* enroll card */}
            <div className="rounded-2xl bg-white p-5 text-cink shadow-cardhover">
              {enrolled ? (
                <>
                  <div className="flex items-center gap-3">
                    <ProgressRing value={pct} size={54} />
                    <div>
                      <div className="text-sm text-cslate">Your progress</div>
                      <div className="font-bold">{pct}% complete</div>
                    </div>
                  </div>
                  <button onClick={() => nav(`/learn/${flat[0].id}`)} className="btn-primary mt-4 w-full">
                    {pct > 0 ? 'Continue learning' : 'Start course'}
                  </button>
                </>
              ) : (
                <>
                  <div className="text-sm text-cslate">Free · self-paced</div>
                  <div className="mt-1 text-2xl font-extrabold">Enroll for €0</div>
                  <button onClick={start} className="btn-primary mt-4 w-full">Enroll & start</button>
                  <p className="mt-3 text-xs text-cslate">Includes {courseLessonCount(course)} lessons, hands-on labs, and XP toward your rank.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-8 py-10 lg:grid-cols-3">
        {/* main */}
        <div className="lg:col-span-2">
          <section className="card p-6">
            <h2 className="text-xl font-bold">About this course</h2>
            <p className="mt-2 leading-relaxed text-cink/90">{course.description}</p>
          </section>

          <h2 className="mt-8 text-xl font-bold">Syllabus</h2>
          <p className="text-sm text-cslate">{course.modules.length} modules · {courseLessonCount(course)} lessons</p>
          <div className="mt-4 space-y-3">
            {course.modules.map((m, i) => (
              <div key={m.id} className="overflow-hidden rounded-xl border border-cline bg-white">
                <button onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-cbg">
                  <span className="text-xs font-bold uppercase tracking-wide text-cblue">{m.weekLabel}</span>
                  <span className="font-bold">{m.title}</span>
                  <span className="ml-auto text-xs text-cslate">{m.lessons.length} lessons</span>
                  <ChevronDown size={18} className={`text-cslate transition ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <div>
                    {m.lessons.map((l) => <LessonRow key={l.id} courseId={course.id} lesson={l} />)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* sidebar */}
        <aside className="space-y-6">
          <div className="card p-5">
            <h3 className="font-bold">Skills you'll gain</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {course.skills.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-bold">Includes</h3>
            <ul className="mt-3 space-y-2 text-sm text-cslate">
              <li className="flex gap-2"><Gamepad2 size={16} className="text-violet-600" /> Hands-on scenario labs</li>
              <li className="flex gap-2"><HelpCircle size={16} className="text-cblue" /> Knowledge checkpoints</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> XP & rank progression</li>
              <li className="flex gap-2"><FileText size={16} className="text-cslate" /> Original, exam-aligned notes</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
