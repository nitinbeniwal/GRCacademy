import type { LessonContent } from '../../types'

// ============================================================================
//  COBIT 2019, CMMC 2.0, ISO 27701 — added framework lesson bodies.
// ============================================================================
export const governance: Record<string, LessonContent> = {
  // ------------------------------------------------------- COBIT 2019
  'cobit-intro': {
    body: `
      <h3>COBIT 2019 — governing enterprise IT</h3>
      <p><strong>COBIT</strong> (from ISACA) is the leading framework for the <em>governance and management of enterprise IT</em>. Where NIST/ISO focus on security controls, COBIT answers a broader question: is IT delivering value while risk stays within appetite?</p>
      <h4>The core distinction</h4>
      <ul>
        <li><strong>Governance</strong> — the board <em>Evaluates, Directs and Monitors</em> (EDM). Sets direction and holds management accountable.</li>
        <li><strong>Management</strong> — plans, builds, runs and monitors (PBRM) within that direction.</li>
      </ul>
      <p>COBIT 2019 has <strong>40 governance & management objectives</strong> across 5 domains, each with process activities, metrics and a capability level (0–5).</p>
      <div class="callout why"><strong>Why it matters:</strong> COBIT is what auditors and boards use to judge whether IT is <em>governed</em>, not merely secured. It's the bridge between security controls and business value.</div>`,
  },
  'cobit-design': {
    body: `
      <h3>Design factors & the tailored governance system</h3>
      <p>COBIT 2019's headline idea: there is no one-size-fits-all. You tailor the governance system using <strong>design factors</strong> — enterprise strategy, risk profile, threat landscape, compliance requirements, IT sourcing and role of IT.</p>
      <p>These factors prioritise which of the 40 objectives matter most and to what capability level — producing a defensible, right-sized program instead of "implement everything".</p>
      <table>
        <tr><th>Domain</th><th>Scope</th></tr>
        <tr><td>EDM</td><td>Governance — evaluate, direct, monitor</td></tr>
        <tr><td>APO</td><td>Align, Plan, Organise</td></tr>
        <tr><td>BAI</td><td>Build, Acquire, Implement</td></tr>
        <tr><td>DSS</td><td>Deliver, Service, Support</td></tr>
        <tr><td>MEA</td><td>Monitor, Evaluate, Assess</td></tr>
      </table>`,
  },
  'cobit-quiz': {
    quiz: [
      { type: 'mc', q: 'In COBIT 2019, the EDM domain belongs to:', options: ['Management', 'Governance (the board)', 'The auditor', 'Vendors'], answer: 1, explain: 'Evaluate-Direct-Monitor is the governance layer, owned by the board — distinct from management.' },
      { type: 'mc', q: 'What do COBIT design factors produce?', options: ['A fixed control list', 'A tailored, prioritised governance system', 'A budget', 'A network diagram'], answer: 1, explain: 'Design factors tailor which objectives and capability levels an enterprise needs.' },
    ],
  },

  // ------------------------------------------------------- CMMC 2.0
  'cmmc-intro': {
    body: `
      <h3>CMMC 2.0 — securing the US defense supply chain</h3>
      <p>The <strong>Cybersecurity Maturity Model Certification</strong> applies to the US Defense Industrial Base — contractors handling <strong>FCI</strong> (Federal Contract Information) and <strong>CUI</strong> (Controlled Unclassified Information).</p>
      <p>CMMC 2.0 streamlined the model to <strong>three levels</strong>:</p>
      <table>
        <tr><th>Level</th><th>Protects</th><th>Basis</th><th>Assessment</th></tr>
        <tr><td>1 Foundational</td><td>FCI</td><td>FAR 52.204-21 (17 practices)</td><td>Annual self-assessment</td></tr>
        <tr><td>2 Advanced</td><td>CUI</td><td>NIST SP 800-171 (110 controls)</td><td>Third-party (C3PAO) every 3 yrs</td></tr>
        <tr><td>3 Expert</td><td>High-value CUI</td><td>800-171 + 800-172</td><td>Government-led</td></tr>
      </table>
      <div class="callout warn"><strong>Key:</strong> Level 2 maps directly to <strong>NIST SP 800-171</strong>. If you already meet 800-171, you're most of the way to CMMC L2.</div>`,
  },
  'cmmc-ssp': {
    body: `
      <h3>The SSP and POA&M</h3>
      <p>Two artifacts sit at the heart of a CMMC assessment:</p>
      <ul>
        <li><strong>System Security Plan (SSP)</strong> — describes the scope (the CUI boundary) and how each control is implemented. No SSP = automatic fail.</li>
        <li><strong>Plan of Action &amp; Milestones (POA&amp;M)</strong> — tracks controls not yet met, with owners and dates. CMMC 2.0 permits a <em>limited</em> POA&amp;M for a conditional certification, closed within 180 days.</li>
      </ul>
      <p>Contractors also submit a <strong>SPRS score</strong> (a weighted self-score against the 110 controls) to the DoD.</p>
      <div class="callout why"><strong>Why it matters:</strong> the SSP is the single most scrutinised document. A vague or stale SSP is the most common cause of a failed assessment.</div>`,
  },
  'cmmc-quiz': {
    quiz: [
      { type: 'mc', q: 'CMMC Level 2 is based on which NIST publication?', options: ['SP 800-53', 'SP 800-171', 'CSF 2.0', 'SP 800-30'], answer: 1, explain: 'Level 2 (protecting CUI) is built on the 110 controls of NIST SP 800-171.' },
      { type: 'input', q: 'Which document describes the CUI boundary and how each control is met? (acronym)', answer: ['SSP'], explain: 'The System Security Plan (SSP) is mandatory; without it the assessment fails outright.' },
    ],
  },

  // ------------------------------------------------------- ISO 27701
  'iso27701-intro': {
    body: `
      <h3>ISO/IEC 27701 — a Privacy Information Management System</h3>
      <p><strong>ISO 27701</strong> extends an ISO 27001 ISMS into a <strong>PIMS</strong> — a privacy management system. It is not standalone: you must have (or build) a 27001 ISMS, then bolt on 27701's privacy requirements and controls.</p>
      <h4>The two control sets</h4>
      <ul>
        <li><strong>PII Controllers</strong> — Annex A extensions: consent, purpose limitation, data-subject rights, privacy-by-design.</li>
        <li><strong>PII Processors</strong> — Annex B extensions: process only on instruction, sub-processor management, breach support.</li>
      </ul>
      <div class="callout why"><strong>Why it matters:</strong> 27701 turns abstract privacy law (GDPR, DPDPA) into <em>certifiable</em>, auditable controls — and lets you reuse your entire 27001 machinery. It is the operational backbone that proves privacy compliance.</div>`,
  },
  'iso27701-map': {
    body: `
      <h3>Mapping 27701 to the law</h3>
      <p>ISO 27701 was designed to be a bridge. Its annexes map to <strong>GDPR</strong> articles, ISO 29100 privacy principles and other regimes — so one certified PIMS demonstrates compliance across multiple laws.</p>
      <ul>
        <li>Controller/processor split mirrors GDPR (and DPDPA's Fiduciary model).</li>
        <li>Data-subject-rights controls satisfy access/erasure/portability obligations.</li>
        <li>Records of processing (ROPA) become a maintained PIMS artifact, not a one-off spreadsheet.</li>
      </ul>
      <div class="callout warn"><strong>Note:</strong> certification proves your <em>system</em> is sound. It does not, by itself, make you legally compliant — but it is the strongest evidence you can bring to a regulator.</div>`,
  },
  'iso27701-quiz': {
    quiz: [
      { type: 'mc', q: 'ISO 27701 requires which prerequisite?', options: ['A SOC 2 report', 'An ISO 27001 ISMS', 'PCI DSS', 'A FedRAMP ATO'], answer: 1, explain: 'ISO 27701 extends an existing ISO 27001 ISMS — it cannot be certified alone.' },
      { type: 'input', q: 'ISO 27701 turns an ISMS into a privacy management system, abbreviated as? (acronym)', answer: ['PIMS'], explain: 'A Privacy Information Management System (PIMS) is the 27701 extension of the ISMS.' },
    ],
  },
}
