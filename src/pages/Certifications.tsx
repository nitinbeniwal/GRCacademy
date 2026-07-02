import { DOMAINS, certsInDomain, CERTIFICATIONS } from '../data/curriculum'
import CertCard from '../components/CertCard'

export default function Certifications() {
  const liveCerts = CERTIFICATIONS.filter((c) => c.status === 'available').length

  return (
    <div className="container-x py-10">
      <div className="mx-auto max-w-2xl text-center">
        <span className="chip">Certification paths</span>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Level up, one certification at a time</h1>
        <p className="mt-3 text-cslate">
          Structured like the certs you already know — GRC1 → GRC2 → GRC Lead, then specialise into
          AI Governance and (soon) Cloud GRC. {liveCerts} live certifications, each a guided path of
          courses, labs and a final checkpoint.
        </p>
      </div>

      <div className="mt-12 space-y-14">
        {DOMAINS.map((domain) => {
          const certs = certsInDomain(domain.id)
          if (!certs.length) return null
          return (
            <section key={domain.id}>
              <div className="mb-5 flex items-center gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${domain.color} text-2xl text-white`}>
                  {domain.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold">{domain.title}</h2>
                    {domain.status === 'coming-soon' && <span className="chip">Coming soon</span>}
                  </div>
                  <p className="text-sm text-cslate">{domain.tagline}</p>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {certs.map((cert) => (
                  <CertCard key={cert.id} cert={cert} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
