import { useState } from 'react'
import { Check, X, Lightbulb } from 'lucide-react'
import { useStore } from '../store/useStore'
import type { QuizQuestion } from '../types'

function norm(s: string): string {
  return (s || '')
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ')
}

type Status = 'correct' | 'wrong' | null

function Question({
  lessonId,
  q,
  index,
  onResolved,
}: {
  lessonId: string
  q: QuizQuestion
  index: number
  onResolved: () => void
}) {
  const markQuiz = useStore((s) => s.markQuiz)
  const already = useStore((s) => Boolean(s.quizCorrect[`${lessonId}|${index}`]))
  const [picked, setPicked] = useState<number | null>(null)
  const [val, setVal] = useState('')
  const [status, setStatus] = useState<Status>(already ? 'correct' : null)
  const [showHint, setShowHint] = useState(false)

  const resolve = (correct: boolean) => {
    setStatus(correct ? 'correct' : 'wrong')
    if (correct) {
      markQuiz(lessonId, index, true)
      onResolved()
    }
  }

  const checkInput = () => {
    const answers = (Array.isArray(q.answer) ? q.answer : [q.answer]).map((a) => norm(String(a)))
    resolve(answers.includes(norm(val)))
  }

  const done = status === 'correct'
  const hintChar = String(Array.isArray(q.answer) ? q.answer[0] : q.answer)[0]

  return (
    <div className="rounded-xl border border-cline bg-white p-4">
      <div className="mb-3 flex items-start gap-2 font-semibold">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cblue-50 text-xs text-cblue">
          {index + 1}
        </span>
        <span>{q.q}</span>
      </div>

      {q.type === 'mc' ? (
        <div className="space-y-2">
          {(q.options ?? []).map((opt, oi) => {
            const isPicked = picked === oi
            const showCorrect = done && oi === q.answer
            const showWrong = status === 'wrong' && isPicked && oi !== q.answer
            return (
              <button
                key={oi}
                disabled={done}
                onClick={() => {
                  setPicked(oi)
                  resolve(oi === q.answer)
                }}
                className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                  showCorrect
                    ? 'border-emerald-500 bg-emerald-50'
                    : showWrong
                      ? 'border-rose-400 bg-rose-50'
                      : 'border-cline hover:border-cblue'
                }`}
              >
                <span className="flex-1">{opt}</span>
                {showCorrect && <Check size={16} className="text-emerald-600" />}
                {showWrong && <X size={16} className="text-rose-500" />}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            disabled={done}
            onKeyDown={(e) => e.key === 'Enter' && checkInput()}
            placeholder="Type your answer…"
            aria-label="Your answer"
            className={`flex-1 rounded-lg border px-3 py-2.5 font-mono text-sm outline-none ${
              done ? 'border-emerald-500 bg-emerald-50' : 'border-cline focus:border-cblue'
            }`}
          />
          {!done && (
            <button onClick={checkInput} className="btn-primary">
              Check
            </button>
          )}
        </div>
      )}

      {status && (
        <div
          className={`mt-3 flex items-start gap-2 rounded-lg px-3 py-2 text-sm ${
            done ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
          }`}
        >
          {done ? <Check size={16} className="mt-0.5" /> : <X size={16} className="mt-0.5" />}
          <span>
            <b>{done ? 'Correct!' : 'Not quite.'}</b> {q.explain}
          </span>
        </div>
      )}

      {!done && q.type === 'input' && (
        <button
          onClick={() => setShowHint(true)}
          className="mt-2 flex items-center gap-1 text-xs font-semibold text-amber-600"
        >
          <Lightbulb size={13} /> Hint
        </button>
      )}
      {showHint && !done && (
        <div className="mt-1 text-xs text-cslate">
          First letter: <b>{hintChar}</b>
        </div>
      )}
    </div>
  )
}

export default function Quiz({
  lessonId,
  questions,
  onAllCorrect,
}: {
  lessonId: string
  questions: QuizQuestion[]
  onAllCorrect?: () => void
}) {
  const quizCorrect = useStore((s) => s.quizCorrect)
  const solved = questions.filter((_, i) => quizCorrect[`${lessonId}|${i}`]).length
  const all = solved === questions.length

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Checkpoint</h3>
        <span className="text-sm text-cslate">
          {solved}/{questions.length} correct
        </span>
      </div>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <Question
            key={i}
            lessonId={lessonId}
            q={q}
            index={i}
            onResolved={() => {
              const now = questions.filter((_, j) => j === i || quizCorrect[`${lessonId}|${j}`]).length
              if (now === questions.length) onAllCorrect?.()
            }}
          />
        ))}
      </div>
      {all && (
        <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-center font-semibold text-emerald-800">
          🎉 Checkpoint cleared! +XP earned.
        </div>
      )}
    </div>
  )
}
