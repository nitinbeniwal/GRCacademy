import type { LessonContent } from '../../types'

// ============================================================================
//  Cloud GRC (CLD1) lesson bodies + India/US privacy add-ons (DPDPA, HIPAA).
// ============================================================================
export const cloud: Record<string, LessonContent> = {
  // ------------------------------------------------------- Cloud foundations
  'cld-shared': {
    body: `
      <h3>The shared responsibility model, for real</h3>
      <p>The single biggest source of cloud breaches is a misunderstanding of <em>who secures what</em>. The cloud provider secures the cloud; you secure what you put <strong>in</strong> it. The line moves depending on the service model.</p>
      <table>
        <tr><th>Layer</th><th>IaaS</th><th>PaaS</th><th>SaaS</th></tr>
        <tr><td>Data & access</td><td>You</td><td>You</td><td>You</td></tr>
        <tr><td>Application</td><td>You</td><td>You</td><td>Provider</td></tr>
        <tr><td>OS / runtime</td><td>You</td><td>Provider</td><td>Provider</td></tr>
        <tr><td>Hardware / network</td><td>Provider</td><td>Provider</td><td>Provider</td></tr>
      </table>
      <div class="callout warn"><strong>Note:</strong> identity and data classification are <em>always</em> your responsibility. No service model outsources that.</div>
      <h4>Why GRC cares</h4>
      <p>Every cloud control you assess must be tagged to a responsible party. An auditor's first question on any cloud finding is "provider control or customer control?" — get it wrong and your evidence is meaningless.</p>`,
  },
  'cld-ccm': {
    body: `
      <h3>Governing multi-cloud with the CSA CCM</h3>
      <p>The <strong>Cloud Controls Matrix (CCM)</strong> from the Cloud Security Alliance is the de-facto control framework for cloud. 197 control objectives across 17 domains, each pre-mapped to ISO 27001, SOC 2, NIST and PCI — so you assess once and report many.</p>
      <ul>
        <li><strong>CAIQ</strong> — the questionnaire vendors self-attest against; the CCM's evidence companion.</li>
        <li><strong>STAR Registry</strong> — public repository of provider CAIQ/CCM submissions. Free vendor due-diligence.</li>
      </ul>
      <div class="callout why"><strong>Why it matters:</strong> in multi-cloud you cannot maintain a separate control set per provider. The CCM is your normalisation layer.</div>`,
  },
  'cld-quiz-1': {
    quiz: [
      { type: 'mc', q: 'In SaaS, who is responsible for data classification and access?', options: ['The provider', 'The customer', 'Nobody', 'The auditor'], answer: 1, explain: 'Identity, access and data classification are always the customer’s responsibility, regardless of service model.' },
      { type: 'mc', q: 'What is the CSA STAR Registry used for?', options: ['Billing', 'Public provider security attestations for due diligence', 'Incident reporting', 'Patch management'], answer: 1, explain: 'STAR publishes provider CCM/CAIQ submissions you can use for vendor due diligence.' },
    ],
  },

  // ------------------------------------------------------- CSPM / misconfig
  'cld-cspm': {
    body: `
      <h3>Cloud Security Posture Management (CSPM)</h3>
      <p>Misconfiguration — not exotic exploits — causes most cloud incidents: a public S3 bucket, an over-permissive IAM role, an unencrypted database. CSPM tools continuously scan cloud config against a baseline and flag drift.</p>
      <h4>The GRC angle</h4>
      <ul>
        <li>CSPM findings are <strong>continuous control evidence</strong> — a live SOC 2 / ISO control test, not a point-in-time sample.</li>
        <li>Map each CSPM rule to a control objective so a failing rule automatically raises a control exception.</li>
      </ul>
      <div class="callout warn"><strong>Trap:</strong> a green CSPM dashboard is not "compliant". It proves configuration hygiene, not that the control design meets the requirement.</div>`,
  },
  'cld-cis': {
    body: `
      <h3>CIS Benchmarks & Infrastructure as Code</h3>
      <p>The <strong>CIS Benchmarks</strong> are consensus hardening baselines for AWS, Azure, GCP, Kubernetes and more. They are the concrete "what good looks like" behind abstract control statements.</p>
      <p>Modern estates enforce them as <strong>policy as code</strong> — the benchmark becomes an automated guardrail (e.g. OPA/Conftest, AWS Config rules) that blocks non-compliant infrastructure at deploy time. This shifts compliance <em>left</em>, into the pipeline.</p>
      <div class="callout why"><strong>Why it matters:</strong> preventive controls in the pipeline are cheaper and stronger than detective controls in production. Auditors increasingly expect to see this.</div>`,
  },
  'cld-quiz-2': {
    quiz: [
      { type: 'mc', q: 'CSPM primarily protects against:', options: ['Zero-day exploits', 'Cloud misconfiguration and config drift', 'DDoS', 'Phishing'], answer: 1, explain: 'CSPM continuously checks cloud configuration against a baseline to catch misconfiguration and drift.' },
      { type: 'input', q: 'Name the consensus hardening baselines commonly enforced as policy-as-code (acronym).', answer: ['CIS', 'CIS Benchmarks'], explain: 'The CIS Benchmarks are the industry-standard hardening baselines.' },
    ],
  },

  // ------------------------------------------------------- FedRAMP
  'cld-fedramp': {
    body: `
      <h3>FedRAMP & cloud authorization</h3>
      <p><strong>FedRAMP</strong> is the US government's standardised program for authorising cloud services, built on <strong>NIST SP 800-53</strong> controls. A service is authorised at a Low / Moderate / High impact level via either an agency <strong>ATO</strong> or the <strong>JAB</strong> P-ATO.</p>
      <ul>
        <li><strong>Authorization boundary</strong> — the diagram defining exactly what is in scope. Get this wrong and the whole package is rejected.</li>
        <li><strong>Continuous monitoring (ConMon)</strong> — monthly evidence after authorization. FedRAMP is not "pass once".</li>
        <li><strong>StateRAMP</strong> — the state/local equivalent, reusing the same model.</li>
      </ul>
      <div class="callout why"><strong>Why it matters:</strong> FedRAMP is the clearest example of a cloud authorization lifecycle — scope, assess, authorize, monitor — that maps directly onto commercial ISO/SOC programs.</div>`,
  },
  'cld-quiz-3': {
    quiz: [
      { type: 'mc', q: 'FedRAMP is built on which control catalogue?', options: ['ISO 27002', 'NIST SP 800-53', 'PCI DSS', 'COBIT'], answer: 1, explain: 'FedRAMP baselines are drawn from NIST SP 800-53.' },
      { type: 'mc', q: 'What does the FedRAMP authorization boundary define?', options: ['The billing scope', 'Exactly what systems/data are in scope for authorization', 'The SLA', 'The support tier'], answer: 1, explain: 'The authorization boundary defines the precise scope being authorized and monitored.' },
    ],
  },

  // ------------------------------------------------------- DPDPA (India)
  'dpdpa-intro': {
    body: `
      <h3>India's DPDP Act, 2023</h3>
      <p>The <strong>Digital Personal Data Protection Act (DPDPA)</strong> is India's first comprehensive data-protection law. It governs any processing of digital personal data of individuals in India — including foreign companies offering goods/services to Indian users.</p>
      <h4>Key roles</h4>
      <ul>
        <li><strong>Data Principal</strong> — the individual (equivalent to GDPR's data subject).</li>
        <li><strong>Data Fiduciary</strong> — decides why/how data is processed (≈ controller).</li>
        <li><strong>Significant Data Fiduciary (SDF)</strong> — a high-volume/high-risk fiduciary with extra duties (DPO, audits, DPIA).</li>
        <li><strong>Consent Manager</strong> — a registered intermediary through which consent can be given/withdrawn.</li>
      </ul>
      <div class="callout why"><strong>Why it matters:</strong> if you operate in India, DPDPA — not GDPR — is your primary privacy obligation. Penalties reach ₹250 crore per instance.</div>`,
  },
  'dpdpa-vs-gdpr': {
    body: `
      <h3>DPDPA vs GDPR — the deltas that matter</h3>
      <table>
        <tr><th>Topic</th><th>GDPR</th><th>DPDPA</th></tr>
        <tr><td>Lawful bases</td><td>Six</td><td>Consent + "legitimate uses" (narrower)</td></tr>
        <tr><td>Data types</td><td>Special categories defined</td><td>No special-category tiering (yet)</td></tr>
        <tr><td>Breach notice</td><td>72 hours to DPA</td><td>Notify Board & affected principals (timing via Rules)</td></tr>
        <tr><td>Children</td><td>Age 16 (varies)</td><td>Under 18; verifiable parental consent</td></tr>
        <tr><td>Transfers</td><td>Adequacy / SCCs</td><td>Allowed except to blacklisted countries</td></tr>
      </table>
      <div class="callout warn"><strong>Watch:</strong> DPDPA's operational detail lives in the <em>DPDP Rules</em>. Track them — that is where breach timelines and SDF thresholds are set.</div>`,
  },
  'dpdpa-quiz': {
    quiz: [
      { type: 'mc', q: 'In DPDPA, the entity that decides the purpose and means of processing is the:', options: ['Data Principal', 'Data Fiduciary', 'Consent Manager', 'Adjudicating Officer'], answer: 1, explain: 'The Data Fiduciary is India’s equivalent of the GDPR controller.' },
      { type: 'mc', q: 'Under DPDPA, a child is anyone under:', options: ['13', '16', '18', '21'], answer: 2, explain: 'DPDPA sets the age of majority for data purposes at 18, requiring verifiable parental consent.' },
    ],
  },

  // ------------------------------------------------------- HIPAA (US health)
  'hipaa-intro': {
    body: `
      <h3>HIPAA — protecting US health information</h3>
      <p><strong>HIPAA</strong> governs <strong>Protected Health Information (PHI)</strong> held by covered entities (providers, plans, clearinghouses) and their business associates. Its two operative rules for GRC:</p>
      <ul>
        <li><strong>Privacy Rule</strong> — permitted uses/disclosures of PHI, minimum-necessary principle, patient rights.</li>
        <li><strong>Security Rule</strong> — administrative, physical and technical safeguards for <em>electronic</em> PHI (ePHI).</li>
      </ul>
      <p>A <strong>Business Associate Agreement (BAA)</strong> is the contractual mechanism that pushes HIPAA obligations down the supply chain — the healthcare analogue of a data-processing agreement.</p>
      <div class="callout warn"><strong>Breach rule:</strong> a breach of unsecured PHI triggers notification to individuals, HHS, and — for 500+ records — the media.</div>`,
  },
  'hipaa-safeguards': {
    body: `
      <h3>The Security Rule safeguards</h3>
      <p>HIPAA safeguards are split into three families, and each control is flagged <strong>Required</strong> or <strong>Addressable</strong>. "Addressable" does <em>not</em> mean optional — it means implement it, or document why an equivalent alternative is reasonable.</p>
      <ul>
        <li><strong>Administrative</strong> — risk analysis (the cornerstone), workforce training, access management.</li>
        <li><strong>Physical</strong> — facility access, workstation and device controls.</li>
        <li><strong>Technical</strong> — access control, audit controls, integrity, transmission security (encryption).</li>
      </ul>
      <div class="callout why"><strong>Why it matters:</strong> HIPAA enforcement almost always finds the same root cause first — a missing or stale <em>risk analysis</em>. It is the control auditors test hardest.</div>`,
  },
  'hipaa-quiz': {
    quiz: [
      { type: 'mc', q: 'An "Addressable" HIPAA implementation specification means:', options: ['Optional, ignore it', 'Implement it or document a reasonable equivalent', 'Only for large entities', 'Handled by the provider'], answer: 1, explain: 'Addressable ≠ optional. You implement it or justify and document an equivalent alternative.' },
      { type: 'input', q: 'What agreement pushes HIPAA duties onto a vendor handling PHI? (acronym)', answer: ['BAA'], explain: 'A Business Associate Agreement (BAA) extends HIPAA obligations to business associates.' },
    ],
  },
}
