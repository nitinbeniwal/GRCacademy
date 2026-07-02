import type { LessonContent } from '../../types'
export const frameworks: Record<string, LessonContent> = {
  'iso27001': {
    body: `
<h3>ISO/IEC 27001:2022 — the ISMS standard</h3>
<p>ISO 27001 is the international standard for an <b>Information Security Management System (ISMS)</b> — a systematic, risk-based way to manage information security that can be independently <em>certified</em>.</p>
<h4>Two halves</h4>
<ul>
<li><b>Clauses 4–10</b> — the mandatory management-system requirements (context, leadership, planning, support, operation, evaluation, improvement).</li>
<li><b>Annex A</b> — 93 reference controls across 4 themes you select from based on risk.</li>
</ul>
<div class="callout why"><b>Key idea:</b> ISO 27001 doesn't hand you a checklist of controls to implement blindly. It requires you to <em>assess your risks</em> and then justify which controls you apply (or don't) in a <b>Statement of Applicability</b>.</div>
`,
  },
  'iso-clauses': {
    body: `
<h3>Clauses 4–10: the mandatory core</h3>
<table>
<tr><th>Clause</th><th>Requirement</th></tr>
<tr><td>4 Context</td><td>Understand the organisation, interested parties, ISMS scope</td></tr>
<tr><td>5 Leadership</td><td>Top-management commitment, policy, roles</td></tr>
<tr><td>6 Planning</td><td>Risk assessment & treatment, objectives</td></tr>
<tr><td>7 Support</td><td>Resources, competence, awareness, documented info</td></tr>
<tr><td>8 Operation</td><td>Execute the risk treatment</td></tr>
<tr><td>9 Evaluation</td><td>Monitoring, internal audit, management review</td></tr>
<tr><td>10 Improvement</td><td>Nonconformity, corrective action, continual improvement</td></tr>
</table>
<p>These form a <b>Plan-Do-Check-Act</b> cycle. An auditor will trace each clause to evidence — clauses are where certifications are won or lost, not Annex A.</p>
`,
  },
  'iso-annexa': {
    body: `
<h3>The 93 Annex A controls</h3>
<p>The 2022 revision reorganised controls into <b>4 themes</b> (down from 14 domains):</p>
<table>
<tr><th>Theme</th><th>Count</th><th>Examples</th></tr>
<tr><td>Organizational</td><td>37</td><td>Policies, supplier security, threat intel, cloud</td></tr>
<tr><td>People</td><td>8</td><td>Screening, awareness, remote working</td></tr>
<tr><td>Physical</td><td>14</td><td>Secure areas, equipment, clear desk</td></tr>
<tr><td>Technological</td><td>34</td><td>Access, crypto, logging, secure development</td></tr>
</table>
<p>2022 added <b>11 new controls</b> including threat intelligence, information security for cloud, data masking, and web filtering — reflecting a modern threat landscape.</p>
`,
  },
  'iso-soa': {
    body: `
<h3>Building the Statement of Applicability (SoA)</h3>
<p>The <b>SoA</b> is the single most important ISO 27001 document. For every Annex A control it records:</p>
<ul>
<li>Whether it's <b>applicable</b> (and if not, <em>why</em>).</li>
<li>Whether it's <b>implemented</b>.</li>
<li>The <b>justification</b> — tied to your risk assessment or a legal/contractual requirement.</li>
</ul>
<div class="callout"><b>Auditor's first request:</b> "Show me your SoA." It's the map between your risks and your controls. A weak SoA signals a weak ISMS instantly.</div>
`,
  },
  'why-not-annexa': {
    body: `
<h3>Why NOT to start from Annex A</h3>
<p>A common trap: teams open Annex A and start implementing all 93 controls top-to-bottom. This inverts the standard.</p>
<p>ISO 27001 is <b>risk-driven</b>. The correct order is:</p>
<ol>
<li>Assess your risks.</li>
<li>Decide how to treat each risk.</li>
<li><em>Then</em> select the Annex A controls that support your treatment — and document any additional controls Annex A doesn't list.</li>
</ol>
<div class="callout why"><b>The NIST SP 800-53 companion:</b> Annex A is deliberately high-level (one line per control). Many practitioners use the far more detailed <b>NIST SP 800-53</b> catalogue as an implementation companion — it tells you <em>how</em> to build the control that Annex A only names. Starting from risk, then reaching for 800-53 detail, beats starting from a checklist.</div>
`,
  },
  'iso-rtp': {
    body: `
<h3>The risk treatment plan (RTP)</h3>
<p>The RTP is the bridge from risk assessment to action. For each risk above appetite it records the chosen treatment, the controls to implement, the owner, the deadline, and the resources. It's the project plan your ISMS runs on and the artifact management review tracks.</p>
<p>Together the <b>risk assessment → RTP → SoA</b> chain is the spine ISO 27001 auditors follow end to end.</p>
`,
  },
  'iso-cert': {
    body: `
<h3>Certification: Stage 1 & Stage 2</h3>
<ul>
<li><b>Stage 1 (readiness/documentation review)</b> — the auditor checks your ISMS is designed and documented: scope, policy, SoA, risk assessment. They flag gaps before the real test.</li>
<li><b>Stage 2 (certification audit)</b> — the auditor tests that the ISMS is <em>operating</em>: sampling evidence, interviewing staff, verifying controls run.</li>
</ul>
<p>Findings are graded <b>major</b> (a whole requirement not met — blocks certification) or <b>minor</b> (a lapse — needs a corrective action plan). Certification lasts 3 years with <b>annual surveillance audits</b>, then recertification.</p>
`,
  },
  'iso-quiz-1': { quiz: [
    { type: 'mc', q: 'Which clauses of ISO 27001 are mandatory (cannot be excluded)?', options: ['Annex A only', 'Clauses 4–10', 'Clauses 0–3', 'None are mandatory'], answer: 1, explain: 'Clauses 4–10 are the required management-system core; Annex A is selected by risk.' },
    { type: 'input', q: 'The document listing every Annex A control and whether it applies is the ____ (3 words, abbrev ok).', answer: ['statement of applicability', 'soa'], explain: 'The SoA maps risks to controls.' },
  ]},
  'iso-quiz-2': { quiz: [
    { type: 'mc', q: 'ISO 27001:2022 organises Annex A into how many themes?', options: ['14', '4', '93', '2'], answer: 1, explain: '2022 reorganised 114→93 controls under 4 themes.' },
    { type: 'mc', q: 'A "major nonconformity" at Stage 2 means:', options: ['A minor paperwork issue', 'A whole requirement is not met — certification is blocked until fixed', 'The auditor was satisfied', 'Surveillance is skipped'], answer: 1, explain: 'Majors block certification; minors need a corrective plan.' },
  ]},
  // ---- NIST CSF ----
  'nist-csf': {
    body: `
<h3>NIST Cybersecurity Framework 2.0</h3>
<p>The CSF is a <b>voluntary</b>, outcome-based framework organised into functions, categories and subcategories. Version 2.0 (2024) has <b>six functions</b>:</p>
<table>
<tr><th>Function</th><th>Outcome</th></tr>
<tr><td><b>Govern</b> (new)</td><td>Strategy, roles, policy, oversight, supply chain</td></tr>
<tr><td>Identify</td><td>Know your assets, risks, environment</td></tr>
<tr><td>Protect</td><td>Safeguards to limit impact</td></tr>
<tr><td>Detect</td><td>Find incidents quickly</td></tr>
<tr><td>Respond</td><td>Act on detected incidents</td></tr>
<tr><td>Recover</td><td>Restore capabilities & services</td></tr>
</table>
<p>Because it's outcome-based and framework-agnostic, CSF is widely used as the <b>umbrella</b> that other frameworks (ISO 27001, 800-53, CIS) map into.</p>
`,
  },
  'csf-govern': {
    body: `
<h3>The GOVERN function (new in 2.0)</h3>
<p>CSF 2.0's headline change: a sixth function, <b>Govern</b>, placed at the centre. It recognises that cybersecurity is an enterprise risk-management issue, not just a technical one.</p>
<p>Govern covers: organisational context, risk management strategy, roles & responsibilities, policy, oversight, and — importantly — <b>cybersecurity supply-chain risk management</b>. It's the function that makes the board accountable.</p>
`,
  },
  'csf-tiers': {
    body: `
<h3>Implementation tiers & profiles</h3>
<h4>Tiers (1–4)</h4>
<p>Describe how rigorous and adaptive your risk management is: <b>1 Partial → 2 Risk Informed → 3 Repeatable → 4 Adaptive</b>. Tiers are <em>not</em> maturity grades to max out — you pick a tier that fits your risk.</p>
<h4>Profiles</h4>
<p>A <b>profile</b> is your selection of CSF outcomes. Build a <b>Current profile</b> (where you are) and a <b>Target profile</b> (where you want to be); the gap becomes your roadmap. <b>Community profiles</b> tailor CSF to a sector.</p>
`,
  },
  'csf-quiz': { quiz: [
    { type: 'input', q: 'The new sixth function added in NIST CSF 2.0 is ____.', answer: ['govern'], explain: 'Govern centres cybersecurity as enterprise risk.' },
    { type: 'mc', q: 'CSF implementation Tiers describe:', options: ['Compliance pass/fail', 'How rigorous & adaptive your risk management is', 'Cost of the program', 'Number of controls'], answer: 1, explain: 'Tiers 1–4 describe rigour/adaptiveness, chosen to fit risk.' },
  ]},
  // ---- SOC 2 ----
  'soc2': {
    body: `
<h3>SOC 2 & the Trust Services Criteria</h3>
<p>SOC 2 is an <b>AICPA</b> attestation report on a service organisation's controls. It's the report SaaS buyers demand before trusting a vendor with their data. Built on five <b>Trust Services Criteria (TSC)</b>:</p>
<ul>
<li><b>Security</b> (required — the "common criteria")</li>
<li><b>Availability</b></li>
<li><b>Processing Integrity</b></li>
<li><b>Confidentiality</b></li>
<li><b>Privacy</b></li>
</ul>
<p>Only Security is mandatory; you add the others based on what you promise customers. A CPA firm issues the report — you can't "self-certify" SOC 2.</p>
`,
  },
  'soc2-types': {
    body: `
<h3>Type I vs Type II</h3>
<table>
<tr><th></th><th>Type I</th><th>Type II</th></tr>
<tr><td>Question</td><td>Are controls <em>designed</em> well?</td><td>Do controls <em>operate</em> effectively over time?</td></tr>
<tr><td>Timing</td><td>Point in time</td><td>Over a period (usually 3–12 months)</td></tr>
<tr><td>Value</td><td>Fast, weaker assurance</td><td>Slower, far stronger assurance</td></tr>
</table>
<p>Buyers almost always want <b>Type II</b> — it proves the controls actually worked across an observation window, not just on the day the auditor visited.</p>
`,
  },
  'soc2-evidence': {
    body: `
<h3>Evidence & the observation period</h3>
<p>A Type II audit samples evidence across the whole period. For a control like "access is reviewed quarterly," the auditor wants to see each quarter's review actually happened — dated, with the reviewer named, and exceptions followed up. Gaps in the middle of the period are findings even if the control works today.</p>
<div class="callout"><b>Tip:</b> Continuous evidence collection beats a scramble at audit time. If a control ran but left no artifact, to an auditor it didn't run.</div>
`,
  },
  'soc2-quiz': { quiz: [
    { type: 'mc', q: 'Which Trust Services Criterion is always required in SOC 2?', options: ['Privacy', 'Availability', 'Security', 'Processing Integrity'], answer: 2, explain: 'Security (the common criteria) is mandatory; others are optional.' },
    { type: 'mc', q: 'A buyer wants proof controls worked over the last 6 months. They need:', options: ['SOC 2 Type I', 'SOC 2 Type II', 'ISO 27001', 'A pentest'], answer: 1, explain: 'Type II covers operating effectiveness over a period.' },
  ]},
  // ---- GDPR ----
  'gdpr': {
    body: `
<h3>GDPR principles & lawful bases</h3>
<p>The EU General Data Protection Regulation governs processing of <b>personal data</b> of people in the EU. Seven principles anchor it: lawfulness/fairness/transparency, purpose limitation, data minimisation, accuracy, storage limitation, integrity & confidentiality, and <b>accountability</b>.</p>
<h4>Six lawful bases</h4>
<p>You must have <em>one</em> before processing: <b>consent, contract, legal obligation, vital interests, public task, legitimate interests.</b> Consent is only one of six — and often the weakest, because it can be withdrawn.</p>
<div class="callout warn"><b>Fines:</b> up to €20m or 4% of global annual turnover, whichever is higher.</div>
`,
  },
  'gdpr-rights': {
    body: `
<h3>Data subject rights</h3>
<ul>
<li><b>Access</b> — get a copy of their data (a "DSAR").</li>
<li><b>Rectification</b> — fix inaccurate data.</li>
<li><b>Erasure</b> — "right to be forgotten" (conditional).</li>
<li><b>Restriction</b> — pause processing.</li>
<li><b>Portability</b> — receive data in a machine-readable form.</li>
<li><b>Object</b> — to processing (esp. direct marketing).</li>
<li>Rights around <b>automated decision-making</b> & profiling.</li>
</ul>
<p>Most rights must be honoured within <b>one month</b>. A process that can't find all of a person's data across systems can't satisfy access or erasure — which is why data mapping matters.</p>
`,
  },
  'gdpr-ropa-dpia': {
    body: `
<h3>ROPA & DPIA</h3>
<ul>
<li><b>ROPA (Records of Processing Activities, Art. 30)</b> — the inventory of what personal data you process, why, where it flows, and how long you keep it. Foundation for everything else.</li>
<li><b>DPIA (Data Protection Impact Assessment, Art. 35)</b> — a structured risk assessment required when processing is <em>likely high risk</em> (large-scale profiling, special-category data, systematic monitoring). Identifies risks to individuals and how you'll mitigate them <em>before</em> you start.</li>
</ul>
`,
  },
  'gdpr-breach': {
    body: `
<h3>72-hour breach notification</h3>
<p>On becoming aware of a personal-data breach that risks individuals' rights, a controller must notify its supervisory authority <b>within 72 hours</b>. If the risk is high, affected individuals must be told "without undue delay" too.</p>
<div class="callout why"><b>The clock is brutal:</b> 72 hours includes weekends. You can't build an incident-response process on the day of a breach — the notification decision tree, contacts, and evidence template must exist beforehand.</div>
`,
  },
  'privacy-global': {
    body: `
<h3>CCPA, LGPD & DPDPA at a glance</h3>
<table>
<tr><th>Law</th><th>Region</th><th>Signature feature</th></tr>
<tr><td><b>CCPA/CPRA</b></td><td>California</td><td>Right to opt out of "sale/sharing"; consumer, not "data subject"</td></tr>
<tr><td><b>LGPD</b></td><td>Brazil</td><td>Closely mirrors GDPR; 10 legal bases; ANPD regulator</td></tr>
<tr><td><b>DPDPA</b></td><td>India</td><td>Consent-centric; "Data Fiduciary/Principal"; strong children's-data rules</td></tr>
</table>
<p>They share DNA with GDPR but differ on scope, terminology, and enforcement. A global program builds to the strictest common denominator, then handles local deltas.</p>
`,
  },
  'gdpr-quiz-1': { quiz: [
    { type: 'mc', q: 'How many lawful bases for processing does GDPR provide?', options: ['One (consent)', 'Three', 'Six', 'Unlimited'], answer: 2, explain: 'Consent is just one of six; contract, legal obligation, vital interests, public task, legitimate interests are the others.' },
    { type: 'input', q: 'A data subject access request must generally be fulfilled within one ____.', answer: ['month'], explain: 'Most GDPR rights: one month (extendable in complex cases).' },
  ]},
  'gdpr-quiz-2': { quiz: [
    { type: 'mc', q: 'A personal-data breach with risk to individuals must be reported to the supervisory authority within:', options: ['24 hours', '72 hours', '30 days', 'Immediately, no defined limit'], answer: 1, explain: 'GDPR sets a 72-hour deadline from awareness.' },
    { type: 'mc', q: 'CCPA gives consumers a signature right to:', options: ['Erasure only', 'Opt out of the sale/sharing of their data', 'Free credit monitoring', 'Sue for any processing'], answer: 1, explain: 'Opt-out of sale/sharing is the CCPA/CPRA hallmark.' },
  ]},
  // ---- mapping room reused via labs ----
}
