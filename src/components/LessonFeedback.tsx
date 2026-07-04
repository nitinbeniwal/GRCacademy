import { useState } from 'react'
import { Star, Check } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { useSupabase } from '../lib/SupabaseProvider'
import { clerkEnabled } from '../auth/config'

const DONE_KEY = 'grc-feedback-v1'

function alreadySent(lessonId: string): boolean {
  try {
    return JSON.parse(localStorage.getItem(DONE_KEY) || '[]').includes(lessonId)
  } catch {
    return false
  }
}
function markSent(lessonId: string) {
  try {
    const arr: string[] = JSON.parse(localStorage.getItem(DONE_KEY) || '[]')
    if (!arr.includes(lessonId)) localStorage.setItem(DONE_KEY, JSON.stringify([...arr, lessonId]))
  } catch {
    /* ignore */
  }
}

function Inner({ lessonId }: { lessonId: string }) {
  const client = useSupabase()
  const { user, isSignedIn } = useUser()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(() => alreadySent(lessonId))

  if (!client || !isSignedIn || !user) return null

  if (sent) {
    return (
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
        <Check size={16} /> Thanks — your feedback helps us decide what to build next.
      </div>
    )
  }

  const send = async (r: number, c: string) => {
    setSent(true)
    markSent(lessonId)
    await client.from('feedback').insert({
      user_id: user.id,
      lesson_id: lessonId,
      rating: r || null,
      comment: c.trim() || null,
    })
  }

  return (
    <div className="mt-6 rounded-xl border border-cline bg-white p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold">Was this lesson useful?</span>
        <div className="flex gap-0.5" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onMouseEnter={() => setHover(n)}
              onClick={() => setRating(n)}
              className="p-0.5"
            >
              <Star
                size={18}
                className={
                  n <= (hover || rating) ? 'fill-amber-400 text-amber-400' : 'text-cline'
                }
              />
            </button>
          ))}
        </div>
      </div>
      {rating > 0 && (
        <div className="mt-3 flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(rating, comment)}
            placeholder={
              rating >= 4
                ? 'What should we cover next? (optional)'
                : 'What was missing or unclear? (optional)'
            }
            maxLength={500}
            className="flex-1 rounded-lg border border-cline px-3 py-1.5 text-sm outline-none focus:border-cblue"
          />
          <button onClick={() => send(rating, comment)} className="btn-primary !px-4 !py-1.5 text-sm">
            Send
          </button>
        </div>
      )}
    </div>
  )
}

/** Star rating + comment box under each lesson. Silent no-op when auth/data is off. */
export default function LessonFeedback({ lessonId }: { lessonId: string }) {
  if (!clerkEnabled) return null
  return <Inner lessonId={lessonId} />
}
