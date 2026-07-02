import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Trophy, Flame } from 'lucide-react'
import { useStore, rankFor } from '../store/useStore'
import { AuthControls } from '../auth'

export default function Navbar() {
  const xp = useStore((s) => s.xp)
  const streak = useStore((s) => s.streak)
  const rank = rankFor(xp)
  const nav = useNavigate()

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-semibold rounded-md transition ${
      isActive ? 'text-cblue' : 'text-cslate hover:text-cink'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-cline bg-white/95 backdrop-blur">
      <div className="container-x flex h-14 items-center gap-3">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-cink">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-cblue text-white">G</span>
          <span className="hidden text-[17px] sm:block">
            GRC<span className="text-cblue">Academy</span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavLink to="/certifications" className={linkCls}>
            Certifications
          </NavLink>
          <NavLink to="/catalog" className={linkCls}>
            Catalog
          </NavLink>
          <NavLink to="/leaderboard" className={linkCls}>
            Leaderboard
          </NavLink>
          <NavLink to="/pricing" className={linkCls}>
            Pricing
          </NavLink>
          <NavLink to="/dashboard" className={linkCls}>
            My Learning
          </NavLink>
        </nav>

        <button
          onClick={() => nav('/catalog')}
          className="ml-auto hidden items-center gap-2 rounded-full border border-cline bg-cbg px-3 py-1.5 text-sm text-cslate hover:border-cblue sm:flex"
        >
          <Search size={15} /> What do you want to learn?
        </button>

        <div className="flex items-center gap-3 max-sm:ml-auto">
          <span
            className="hidden items-center gap-1 text-sm font-semibold text-orange-500 sm:flex"
            title={`${streak}-day streak`}
          >
            <Flame size={16} /> {streak}
          </span>
          <button
            onClick={() => nav('/profile')}
            className="flex items-center gap-2 rounded-full bg-cblue-50 px-3 py-1.5 text-sm font-bold text-cblue-700"
            title={`${xp} XP · view profile`}
          >
            <Trophy size={15} />
            <span className="hidden lg:inline">
              {rank.icon} {rank.name}
            </span>
            <span className="rounded-full bg-cblue px-2 py-0.5 text-xs text-white">{xp} XP</span>
          </button>
          <AuthControls />
        </div>
      </div>
    </header>
  )
}
