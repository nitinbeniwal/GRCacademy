import type { LessonContent } from '../../types'
export const enterprise: Record<string, LessonContent> = {
  // ---- BCM ----
  'bcm-intro': {
    body: `
<h3>BCM & ISO 22301</h3>
<p><b>Business Continuity Management</b> keeps critical operations running through disruption. <b>ISO 22301</b> is its management-system standard — same clause structure as ISO 27001, applied to continuity.</p>
<p>The BCM lifecycle: understand the organisation (BIA + risk assessment) → determine strategy → develop & implement plans → exercise & test → maintain & improve.</p>
`,
  },
  'bcm-bia': {
    body: `
<h3>Business impact analysis & RTO/RPO</h3>
<p>The <b>BIA</b> identifies critical activities and the impact of losing them over time. It produces the two numbers that drive every recovery decision:</p>
<ul>
<li><b>RTO</b> — maximum tolerable downtime before unacceptable harm.</li>
<li><b>RPO</b> — maximum tolerable data loss (drives backup frequency).</li>
</ul>
<p>Related: <b>MTPD</b> (maximum tolerable period of disruption) sits above RTO, and <b>MBCO</b> (minimum business continuity objective) sets the reduced level you must sustain during disruption.</p>
<div class="callout"><b>RTO drives design, RPO drives backups.</b> A 15-minute RPO means you cannot rely on nightly backups — you need continuous replication.</div>
`,
  },
  'bcm-plans': {
    body: `
<h3>BCP, DRP & recovery strategies</h3>
<ul>
<li><b>BCP (Business Continuity Plan)</b> — how the <em>business</em> keeps functioning (people, workspace, processes, manual workarounds).</li>
<li><b>DRP (Disaster Recovery Plan)</b> — how <em>IT</em> is restored (failover, backups, alternate sites).</li>
</ul>
<p>Recovery strategies trade cost against speed: <b>hot site</b> (instant, expensive) → <b>warm site</b> → <b>cold site</b> (cheap, slow) → cloud failover.</p>
`,
  },
  'bcm-exercise': {
    body: `
<h3>Exercising & maintaining plans</h3>
<p>An untested plan is a hypothesis. Exercise types climb in realism: <b>walkthrough</b> → <b>tabletop</b> (talk through a scenario) → <b>simulation</b> → <b>full failover</b>. Each exercise produces lessons that feed back into the plan. Regulators increasingly expect evidence of regular, documented tests — not just a plan on a shelf.</p>
`,
  },
  'bcm-quiz-1': { quiz: [
    { type: 'input', q: 'The maximum tolerable data loss, measured in time, is the ____.', answer: ['rpo', 'recovery point objective'], explain: 'RPO drives backup/replication frequency.' },
    { type: 'mc', q: 'A 15-minute RPO means:', options: ['Recover within 15 min', 'Lose at most 15 min of data', 'Test every 15 min', 'Backups run yearly'], answer: 1, explain: 'RPO = tolerable data loss; RTO = tolerable downtime.' },
  ]},
  'bcm-quiz-2': { quiz: [
    { type: 'mc', q: 'A "tabletop" exercise is:', options: ['A full live failover', 'A discussion-based walkthrough of a scenario', 'A backup restore test', 'A penetration test'], answer: 1, explain: 'Tabletops talk through a scenario without live disruption.' },
  ]},
  // ---- Internal audit ----
  'ia-intro': {
    body: `
<h3>Internal audit: mandate & independence</h3>
<p>Internal audit is the organisation's <b>third line</b> — independent, objective assurance to the board's audit committee. Its authority comes from a board-approved <b>internal audit charter</b>, and it reports functionally to the audit committee (not to management) to protect independence.</p>
<p>It operates under the IIA's <b>Global Internal Audit Standards</b>, which mandate objectivity, competence, due professional care, and a quality-assurance program.</p>
`,
  },
  'ia-plan': {
    body: `
<h3>The risk-based audit plan</h3>
<p>Internal audit can't audit everything, so it prioritises by risk. The <b>annual audit plan</b> allocates limited audit days to the highest-risk areas, informed by the risk register, prior findings, regulatory change, and management input — then is approved by the audit committee.</p>
`,
  },
  'ia-fieldwork': {
    body: `
<h3>Fieldwork, sampling & working papers</h3>
<p>During fieldwork auditors gather evidence and document it in <b>working papers</b> — the record supporting every conclusion. Where populations are large, they <b>sample</b> (statistical or judgmental) and extrapolate, always noting the limitation. Working papers must let an independent reviewer re-trace the auditor's reasoning.</p>
`,
  },
  'ia-report': {
    body: `
<h3>Reporting to the audit committee</h3>
<p>Findings are rated by risk, given an agreed management action with an owner and date, and reported to the audit committee. Good internal-audit reporting is <b>balanced</b> (acknowledges what works), <b>actionable</b>, and tracks open findings to closure. The committee cares most about themes and overdue high-risk actions.</p>
`,
  },
  'ia-quiz-1': { quiz: [
    { type: 'mc', q: 'Internal audit protects its independence by reporting functionally to:', options: ['The CEO', 'The audit committee of the board', 'The CFO', 'The team it audits'], answer: 1, explain: 'Reporting to the audit committee keeps it independent of management.' },
    { type: 'input', q: 'Internal audit prioritises its limited time using a ____-based audit plan.', answer: ['risk'], explain: 'Risk-based planning targets the highest-risk areas.' },
  ]},
  'ia-quiz-2': { quiz: [
    { type: 'mc', q: 'The documentation supporting every audit conclusion is called:', options: ['The charter', 'Working papers', 'The SoA', 'The risk register'], answer: 1, explain: 'Working papers let a reviewer re-trace the reasoning.' },
  ]},
  // ---- Financial controls ----
  'fc-sox': {
    body: `
<h3>SOX & the COSO framework</h3>
<p>The US <b>Sarbanes-Oxley Act (2002)</b> makes executives personally accountable for the accuracy of financial statements. <b>Section 404</b> requires management (and the external auditor) to assess <b>internal control over financial reporting (ICFR)</b>.</p>
<p>The gold-standard control framework SOX programs use is <b>COSO Internal Control – Integrated Framework</b>, with five components: control environment, risk assessment, control activities, information & communication, monitoring.</p>
`,
  },
  'fc-icfr': {
    body: `
<h3>ICFR & key controls</h3>
<p><b>ICFR</b> is the set of controls ensuring financial reports are reliable. SOX programs identify <b>key controls</b> — the ones that, if they fail, could cause a material misstatement — and test those rigorously rather than everything. Examples: journal-entry review, account reconciliations, revenue-recognition checks, and access to the financial system.</p>
`,
  },
  'fc-sod': {
    body: `
<h3>Segregation of duties & control testing</h3>
<p><b>Segregation of duties (SoD)</b> ensures no single person controls a whole transaction (e.g. the person who creates a vendor can't also approve its payments). SoD conflicts are a top SOX finding.</p>
<p>Financial-controls testing samples transactions and re-performs the control, checking both <b>design</b> (would it catch the error?) and <b>operating effectiveness</b> (did it, every time, over the period?).</p>
`,
  },
  'fc-basel': {
    body: `
<h3>A word on Basel III & operational risk</h3>
<p>For banks, <b>Basel III</b> adds capital and risk requirements including a charge for <b>operational risk</b> — the risk of loss from failed processes, people, systems or external events. It formalises what GRC already does: identify, measure and hold capital against non-financial risks. You don't need to be a banker to borrow its rigour.</p>
`,
  },
  'fc-quiz-1': { quiz: [
    { type: 'mc', q: 'SOX Section 404 requires assessment of:', options: ['Physical security', 'Internal control over financial reporting (ICFR)', 'Marketing claims', 'Employee benefits'], answer: 1, explain: 'S404 is about ICFR.' },
    { type: 'input', q: 'The five-component internal-control framework SOX programs rely on is ____.', answer: ['coso'], explain: 'COSO Internal Control – Integrated Framework.' },
  ]},
  'fc-quiz-2': { quiz: [
    { type: 'mc', q: 'One person who can both create a vendor and approve its payment is a failure of:', options: ['Least privilege', 'Segregation of duties', 'Encryption', 'RPO'], answer: 1, explain: 'SoD prevents one person controlling a whole transaction.' },
  ]},
  // ---- Operational / model risk ----
  'or-intro': {
    body: `
<h3>Operational risk & COSO ERM</h3>
<p><b>Operational risk</b> is loss from failed internal processes, people, systems, or external events — everything that isn't market or credit risk. <b>COSO ERM</b> (Enterprise Risk Management) provides the framework to align risk appetite with strategy across the whole enterprise, not just finance.</p>
`,
  },
  'or-heatmap': {
    body: `
<h3>5×5 heat maps & risk appetite</h3>
<p>Operational risk teams plot risks on a <b>5×5 likelihood × impact</b> grid. The board sets <b>risk appetite</b> — the amount of risk it's willing to accept in pursuit of objectives — as a line on that grid. Risks above the line demand treatment; below, they're monitored. Appetite turns risk management from opinion into policy.</p>
`,
  },
  'or-model': {
    body: `
<h3>Model risk governance (SR 11-7)</h3>
<p>As organisations run on models — credit scoring, pricing, and now AI/ML — <b>model risk</b> (loss from models that are wrong or misused) becomes material. The Fed's <b>SR 11-7</b> guidance is the benchmark: it demands <b>independent validation</b>, a model inventory, ongoing monitoring, and clear ownership across the model lifecycle. The ECB's guide and emerging AI rules extend the same logic to machine-learning models.</p>
<div class="callout why"><b>Bridge to AI governance:</b> SR 11-7's "validate independently, inventory everything, monitor continuously" is precisely the discipline the AI-governance track applies to modern AI systems.</div>
`,
  },
  'or-quiz-1': { quiz: [
    { type: 'mc', q: 'Operational risk covers loss from:', options: ['Only cyber attacks', 'Failed processes, people, systems or external events', 'Only market moves', 'Only credit defaults'], answer: 1, explain: 'Op risk = everything that is not market or credit risk.' },
    { type: 'input', q: 'The amount of risk a board is willing to accept for its objectives is its risk ____.', answer: ['appetite'], explain: 'Risk appetite is set by the board.' },
  ]},
  'or-quiz-2': { quiz: [
    { type: 'mc', q: 'SR 11-7 is the benchmark guidance for:', options: ['Fire safety', 'Model risk governance', 'GDPR', 'SOC 2'], answer: 1, explain: 'SR 11-7 governs model risk — validation, inventory, monitoring.' },
  ]},
}
