import type { LessonContent } from '../../types'

// AI Governance Level 2 — ISO 42001 deep + NIST AI RMF in practice.
export const aigov2: Record<string, LessonContent> = {
  // ---------- ISO 42001 deep ----------
  'iso42-intro': {
    body: `
<h3>ISO/IEC 42001 — the AI Management System</h3>
<p><b>ISO 42001:2023</b> is the first certifiable management-system standard for artificial intelligence. Like ISO 27001, it uses the Annex SL <b>clause 4–10</b> structure and a Plan-Do-Check-Act cycle — but applied to the responsible development and use of AI.</p>
<p>An organisation implements an <b>AIMS</b> (AI Management System) to systematically manage AI risks and opportunities: context, leadership, planning, support, operation, performance evaluation, and improvement.</p>
<div class="callout why"><b>Why certify?</b> ISO 42001 lets you <em>prove</em>, to regulators and customers, that AI is governed responsibly — increasingly a procurement requirement and a way to demonstrate EU AI Act due diligence.</div>
`,
  },
  'iso42-annexa': {
    body: `
<h3>Annex A controls & the AI impact assessment</h3>
<p>ISO 42001's <b>Annex A</b> lists AI-specific controls grouped into areas such as: policies for AI, internal organisation, resources for AI systems, impact assessment, AI system lifecycle, data for AI, information for interested parties, and use of AI systems.</p>
<h4>AI system impact assessment (AIA)</h4>
<p>A cornerstone control: assess the potential consequences of an AI system to <b>individuals, groups and society</b> — not just to the organisation. This is broader than a traditional risk assessment because it explicitly weighs external harms (fairness, safety, human rights).</p>
<p>ISO 42001 pairs with <b>ISO/IEC 23894</b> (AI risk management guidance) and <b>ISO/IEC 22989</b> (AI concepts & terminology).</p>
`,
  },
  'iso42-lifecycle': {
    body: `
<h3>Governing the AI lifecycle</h3>
<p>ISO 42001 requires controls across the whole lifecycle: <b>plan → design → collect & process data → build & use → verify & validate → deploy → operate & monitor → retire.</b> Each stage has governance touchpoints:</p>
<ul>
<li><b>Data</b> — provenance, quality, bias, and preparation are documented and controlled.</li>
<li><b>Development</b> — responsible design, testing, and documentation (model cards).</li>
<li><b>Operation</b> — monitoring for drift, performance and incidents, with human oversight.</li>
<li><b>Retirement</b> — decommissioning models safely.</li>
</ul>
<div class="callout"><b>Continuous, not one-shot:</b> Models drift as the world changes. The AIMS treats monitoring as an ongoing control, mirroring model-risk discipline (SR 11-7).</div>
`,
  },
  'iso42-cert': {
    body: `
<h3>Mapping ISO 42001 to the regulatory landscape</h3>
<p>ISO 42001 is the operational spine that lets you satisfy multiple regimes at once:</p>
<table>
<tr><th>Regime</th><th>How 42001 helps</th></tr>
<tr><td>EU AI Act</td><td>Provides the management system, risk process & documentation high-risk providers need</td></tr>
<tr><td>NIST AI RMF</td><td>Operationalises Govern/Map/Measure/Manage as certifiable controls</td></tr>
<tr><td>ISO 27001</td><td>Reuses the same clause structure — integrate the two management systems</td></tr>
</table>
<p>Certification follows the familiar <b>Stage 1</b> (documentation/readiness) then <b>Stage 2</b> (operating effectiveness) audit, with annual surveillance.</p>
`,
  },
  'iso42-quiz': {
    quiz: [
      { type: 'input', q: 'ISO 42001 establishes an AI Management System, abbreviated ____.', answer: ['aims'], explain: 'AIMS — the AI equivalent of an ISMS.' },
      { type: 'mc', q: 'What makes an AI impact assessment broader than a normal risk assessment?', options: ['It is shorter', 'It weighs harms to individuals, groups and society — not just the organisation', 'It ignores bias', 'It only covers financial loss'], answer: 1, explain: 'AIA explicitly considers external/societal harms.' },
    ],
  },

  // ---------- NIST AI RMF in practice ----------
  'airmf-govern': {
    body: `
<h3>GOVERN — the culture function</h3>
<p><b>Govern</b> cuts across the other three functions. It establishes the policies, accountability, roles, and risk culture that make AI risk management real rather than performative.</p>
<ul>
<li>Legal & regulatory requirements are understood and integrated.</li>
<li>Roles, responsibilities and lines of communication are clear.</li>
<li>A diverse team and stakeholder input inform decisions.</li>
<li>Risk-management processes cover the full AI lifecycle and third-party (supply-chain) AI.</li>
</ul>
<div class="callout why"><b>Govern first:</b> Without accountability and policy, Map/Measure/Manage produce findings nobody owns or acts on.</div>
`,
  },
  'airmf-map': {
    body: `
<h3>MAP — establish context</h3>
<p><b>Map</b> builds the context needed to frame AI risks. You can't measure or manage what you haven't first understood.</p>
<ul>
<li>Intended purpose, setting, and users of the AI system.</li>
<li>Categorise the system and its capabilities.</li>
<li>Map benefits <em>and</em> potential negative impacts, including to non-users and society.</li>
<li>Identify where humans stay in, on, or out of the loop.</li>
</ul>
<p>Output: a shared, documented understanding that later functions act on.</p>
`,
  },
  'airmf-measure': {
    body: `
<h3>MEASURE — analyse & benchmark</h3>
<p><b>Measure</b> uses quantitative and qualitative methods to assess trustworthiness characteristics: validity & reliability, safety, security & resilience, accountability & transparency, explainability, privacy, and <b>fairness with bias managed</b>.</p>
<ul>
<li>Define metrics and test methods appropriate to the risk.</li>
<li>Evaluate for bias, robustness, and drift over time.</li>
<li>Gather feedback from operators and affected communities.</li>
</ul>
<div class="callout warn"><b>Metrics can conflict:</b> Fairness definitions (demographic parity vs equalised odds) are mathematically incompatible in general — you must choose and justify which the context demands.</div>
`,
  },
  'airmf-manage': {
    body: `
<h3>MANAGE — act on the risks</h3>
<p><b>Manage</b> prioritises and treats the risks that Map and Measure surfaced, allocating resources and responding to incidents.</p>
<ul>
<li>Prioritise risks by impact and treat them (mitigate/accept/avoid/transfer — same discipline as any risk).</li>
<li>Plan for and respond to AI incidents; document and learn.</li>
<li>Manage third-party AI risk and post-deployment monitoring.</li>
<li>Communicate residual risk to decision-makers.</li>
</ul>
<p>Together with Govern, this closes the loop into continuous improvement.</p>
`,
  },
  'airmf-quiz': {
    quiz: [
      { type: 'input', q: 'The NIST AI RMF function that cuts across all others (culture, policy, accountability) is ____.', answer: ['govern'], explain: 'Govern is the cross-cutting culture function.' },
      { type: 'mc', q: 'Why can you not maximise every fairness metric at once?', options: ['They are all the same', 'Definitions like demographic parity and equalised odds are mathematically incompatible in general', 'Fairness cannot be measured', 'Regulators forbid it'], answer: 1, explain: 'Different fairness criteria conflict; you must choose per context.' },
      { type: 'mc', q: 'Which RMF function is where you prioritise and treat identified AI risks?', options: ['Map', 'Measure', 'Manage', 'Govern'], answer: 2, explain: 'Manage acts on the risks Map/Measure surfaced.' },
    ],
  },
}
