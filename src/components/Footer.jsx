import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-cline bg-white">
      <div className="container-x grid gap-8 py-10 sm:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-cink">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-cblue text-white">G</span>
            GRC<span className="text-cblue">Academy</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-cslate">
            Zero-to-hero learning for Governance, Risk & Compliance — hands-on labs, real-world
            scenarios, and a game-like path from novice to Chief Risk Officer.
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-bold text-cink">Learn</h4>
          <ul className="space-y-1.5 text-sm text-cslate">
            <li><Link className="hover:text-cblue" to="/catalog">Course catalog</Link></li>
            <li><Link className="hover:text-cblue" to="/roadmap">Zero-to-hero roadmap</Link></li>
            <li><Link className="hover:text-cblue" to="/dashboard">My learning</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-bold text-cink">Domains</h4>
          <ul className="space-y-1.5 text-sm text-cslate">
            <li>Frameworks & Standards</li>
            <li>Audit & Compliance</li>
            <li>AI Governance</li>
            <li>Enterprise GRC</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-bold text-cink">About</h4>
          <p className="text-sm text-cslate">
            An educational platform. Content is original and for learning/portfolio practice —
            not production compliance advice.
          </p>
        </div>
      </div>
      <div className="border-t border-cline py-4 text-center text-xs text-cslate">
        © {new Date().getFullYear()} GRC Academy · Built for learners.
      </div>
    </footer>
  )
}
