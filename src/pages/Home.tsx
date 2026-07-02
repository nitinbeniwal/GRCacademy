import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Gamepad2, Route as RouteIcon, ShieldCheck, Trophy } from 'lucide-react'
import { DOMAINS, CERTIFICATIONS, COURSES, certsInDomain } from '../data/curriculum'
import CertCard from '../components/CertCard'
import { useStore, rankFor, nextRank } from '../store/useStore'

function Stat({ n, l }: { n: string | number; l: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-extrabold text-white sm:text-3xl">{n}</div>
      <div className="text-xs text-white/70">{l}</div>
    </div>
  )
}

export default function Home() {
  const xp = useStore((s) => s.xp)
  const rank = rankFor(xp)
  const next = nextRank(xp)
  const totalLessons = COURSES.reduce(
    (n, c) => n + c.modules.reduce((m, mm) => m + mm.lessons.length, 0),
    0
  )
  const liveCerts = CERTIFICATIONS.filter((c) => c.status === 'available')

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cblue-800 via-cblue to-violet-700 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="container-x relative grid items-center gap-8 py-16 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="chip bg-white/15 text-white"
            >
              🎯 The specialist GRC academy
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl"
            >
              Get certified in Governance, Risk & Compliance — the hands-on way.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 max-w-xl text-lg text-white/85"
            >
              Leveled certification paths — GRC1, GRC2, GRC Lead, then AI Governance — with{' '}
              {totalLessons}+ lessons and real-world scenario labs. Learn ISO 27001, NIST, SOC 2,
              GDPR, PCI, ISO 42001 and more by <em>doing</em>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link to="/certifications" className="btn bg-white text-cblue-700 hover:bg-white/90">
                Browse certifications <ArrowRight size={16} />
              </Link>
              <Link to="/catalog" className="btn border border-white/40 text-white hover:bg-white/10">
                Explore all courses
              </Link>
            </motion.div>
            <div className="mt-9 flex gap-8">
              <Stat n={liveCerts.length} l="Certifications" />
              <Stat n={COURSES.length} l="Courses" />
              <Stat n={`${totalLessons}+`} l="Lessons" />
              <Stat n="14" l="Scenario labs" />
            </div>
          </div>

          {/* rank card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mx-auto w-full max-w-sm rounded-2xl bg-white/10 p-6 backdrop-blur ring-1 ring-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-white/15 text-3xl">{rank.icon}</div>
              <div>
                <div className="text-xs uppercase tracking-wide text-white/60">Your rank</div>
                <div className="text-xl font-bold">{rank.name}</div>
              </div>
              <Trophy className="ml-auto text-amber-300" />
            </div>
            <div className="mt-5 text-sm text-white/80">
              {xp} XP {next && `· ${next.xp - xp} to ${next.name}`}
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-cyan transition-all"
                style={{ width: `${next ? Math.min(100, (xp / next.xp) * 100) : 100}%` }}
              />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
              {[
                ['🧭', 'Learn'],
                ['🎮', 'Play labs'],
                ['🏆', 'Rank up'],
              ].map(([e, t]) => (
                <div key={t} className="rounded-lg bg-white/10 py-3">
                  <div className="text-xl">{e}</div>
                  <div className="mt-1 text-white/70">{t}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY */}
      <section className="container-x grid gap-4 py-12 sm:grid-cols-3">
        {[
          {
            i: <RouteIcon className="text-cblue" />,
            t: 'Certification-led',
            d: 'Clear levels like GRC1 → GRC Lead. Always know exactly what to learn next.',
          },
          {
            i: <Gamepad2 className="text-violet-600" />,
            t: 'Play the scenarios',
            d: 'Beat an incident timer, hunt cloud flaws, score a risk register — learn by doing.',
          },
          {
            i: <ShieldCheck className="text-emerald-600" />,
            t: 'Specialist depth',
            d: 'Built only for GRC. Core, AI Governance, and Cloud GRC coming next.',
          },
        ].map((f) => (
          <div key={f.t} className="card p-5">
            <div className="mb-2">{f.i}</div>
            <h3 className="font-bold">{f.t}</h3>
            <p className="mt-1 text-sm text-cslate">{f.d}</p>
          </div>
        ))}
      </section>

      {/* CERTS BY DOMAIN */}
      <section className="container-x pb-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">Choose your certification</h2>
            <p className="text-cslate">Start at GRC1, or jump to the level that fits you.</p>
          </div>
          <Link to="/certifications" className="hidden text-sm font-semibold text-cblue hover:underline sm:block">
            See all →
          </Link>
        </div>

        {DOMAINS.map((domain) => {
          const certs = certsInDomain(domain.id)
          if (!certs.length) return null
          return (
            <div key={domain.id} className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xl">{domain.icon}</span>
                <h3 className="text-lg font-bold">{domain.title}</h3>
                {domain.status === 'coming-soon' && <span className="chip">Coming soon</span>}
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {certs.map((c) => (
                  <CertCard key={c.id} cert={c} />
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
