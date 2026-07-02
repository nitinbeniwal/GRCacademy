import { type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { RequireAuth } from '../auth'
import { useEntitlement, certUnlocked, courseUnlocked, lessonUnlocked } from '../lib/entitlement'

/** Full-page upgrade wall shown when a member hits Pro-only content. */
function UpgradeWall() {
  return (
    <div className="container-x py-24 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cblue-50 text-cblue">
        <Lock size={24} />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-cink">This is Pro content</h1>
      <p className="mx-auto mt-2 max-w-md text-cslate">
        Your free membership covers the GRC1 foundation. Upgrade to Pro to unlock every
        certification path, the AI Governance track and all advanced labs.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/pricing" className="btn-primary">See Pro plans</Link>
        <Link to="/certifications" className="btn-ghost">Back to certifications</Link>
      </div>
    </div>
  )
}

type Kind = 'cert' | 'course' | 'lesson'

/**
 * Wraps a learning route. Requires login (RequireAuth), then checks the Pro
 * entitlement for the specific cert/course/lesson in the URL.
 */
export default function ContentGuard({ kind, children }: { kind: Kind; children: ReactNode }) {
  return (
    <RequireAuth>
      <Inner kind={kind}>{children}</Inner>
    </RequireAuth>
  )
}

function Inner({ kind, children }: { kind: Kind; children: ReactNode }) {
  const params = useParams()
  const { isPro } = useEntitlement()

  const unlocked =
    kind === 'cert'
      ? certUnlocked(params.certId, isPro)
      : kind === 'course'
        ? courseUnlocked(params.courseId, isPro)
        : lessonUnlocked(params.lessonId, isPro)

  return unlocked ? <>{children}</> : <UpgradeWall />
}
