import type { LessonContent } from '../../types'
// Foundations track lesson content. body = HTML string, quiz = [{type,q,options?,answer,explain}]
export const foundations: Record<string, LessonContent> = {
  'grc-intro': {
    body: `
<h3>What is GRC?</h3>
<p><b>Governance, Risk and Compliance (GRC)</b> is the discipline of steering an organisation so it reaches its objectives, handles uncertainty responsibly, and stays inside the rules. Three words, three jobs:</p>
<ul>
<li><b>Governance</b> — how decisions get made, who is accountable, and how direction is set from the top.</li>
<li><b>Risk</b> — identifying what could go wrong (or right), how likely it is, and what to do about it.</li>
<li><b>Compliance</b> — proving you meet the laws, regulations, standards and internal policies that apply to you.</li>
</ul>
<div class="callout why"><b>Why it exists:</b> Left alone, organisations optimise for speed and revenue and quietly accumulate risk until something blows up — a breach, a fine, a failed audit, a collapsed vendor. GRC is the deliberate counterweight that makes risk <em>visible</em> and <em>owned</em> before it becomes a headline.</div>
<h4>GRC is a system, not a department</h4>
<p>The best programs treat GRC as connective tissue: the same risk that governance worries about is the risk that compliance must evidence and that a control is built to reduce. When these three run in separate silos you get duplicated work, blind spots, and "check-box compliance" that satisfies an auditor but protects nothing.</p>
<h4>The value in one sentence</h4>
<p>GRC converts <em>"we think we're fine"</em> into <em>"here is the evidence that we are fine, and here is exactly what we're doing about the parts that aren't."</em></p>
`,
  },
  'grc-gov-vs-risk-vs-comp': {
    body: `
<h3>Telling the three apart</h3>
<table>
<tr><th>Discipline</th><th>Core question</th><th>Typical artifact</th></tr>
<tr><td><b>Governance</b></td><td>"Are we doing the right things, and who is accountable?"</td><td>Board charter, risk appetite statement, policies</td></tr>
<tr><td><b>Risk</b></td><td>"What could stop us, how bad, how likely?"</td><td>Risk register, heat map, treatment plan</td></tr>
<tr><td><b>Compliance</b></td><td>"Can we prove we meet the rules?"</td><td>Control evidence, audit report, attestations</td></tr>
</table>
<p>They overlap on purpose. A privacy <b>risk</b> (personal data leaks) maps to a <b>compliance</b> obligation (GDPR Art. 32) which <b>governance</b> funds and prioritises through risk appetite.</p>
<div class="callout"><b>Rule of thumb:</b> Compliance is a <em>subset</em> of risk management. You can be fully compliant and still be dangerously exposed — compliance only covers the risks someone wrote a rule about.</div>
`,
  },
  'grc-quiz-1': {
    quiz: [
      { type: 'mc', q: 'Which statement best captures the relationship between the three?',
        options: ['They are independent departments that rarely interact', 'Compliance is a subset of risk management; governance sets direction over both', 'Risk is a subset of compliance', 'Governance only matters for public companies'],
        answer: 1, explain: 'Compliance covers only the risks someone wrote a rule about; governance sets appetite and accountability over the whole picture.' },
      { type: 'input', q: 'The GRC discipline that answers "who is accountable and are we doing the right things" is ____.',
        answer: ['governance'], explain: 'Governance = direction + accountability from the top.' },
      { type: 'mc', q: 'A company passes every audit but suffers a breach from a risk no regulation covered. This shows:',
        options: ['Audits are useless', 'Compliance ≠ security; you can be compliant and still exposed', 'The breach was impossible', 'Governance was excellent'],
        answer: 1, explain: 'Compliance only addresses codified rules; uncovered risks remain.' },
    ],
  },
  'three-lines': {
    body: `
<h3>The Three Lines Model</h3>
<p>Published by the IIA, the <b>Three Lines Model</b> explains who does what in managing risk. It replaced the older "three lines of defence" language to stress collaboration, not just defence.</p>
<table>
<tr><th>Line</th><th>Who</th><th>Role</th></tr>
<tr><td><b>First line</b></td><td>Operational management</td><td><em>Owns</em> and manages risk day-to-day — they run the process and the controls.</td></tr>
<tr><td><b>Second line</b></td><td>Risk & compliance functions</td><td><em>Oversees</em> — sets policy, advises, monitors, challenges the first line.</td></tr>
<tr><td><b>Third line</b></td><td>Internal audit</td><td><em>Assures</em> — independent, objective assurance to the governing body.</td></tr>
</table>
<div class="callout why"><b>Why independence matters:</b> The third line reports to the board/audit committee, not to management. If internal audit reported to the people it audits, its assurance would be worthless.</div>
<p>Above all three sits the <b>governing body</b> (board); outside sits the <b>external auditor</b> and regulators. Keeping the lines distinct prevents the classic failure of "the same team builds the control, checks the control, and reports that the control works."</p>
`,
  },
  'risk-fundamentals': {
    body: `
<h3>Risk management fundamentals</h3>
<p><b>Risk</b> = the effect of uncertainty on objectives. In practice we express a risk as: <em>a threat exploits a vulnerability against an asset, causing an impact, with some likelihood.</em></p>
<h4>The core loop (ISO 31000)</h4>
<ol>
<li><b>Identify</b> — what could go wrong? (assets, threats, vulnerabilities)</li>
<li><b>Analyse</b> — how likely, how bad? (likelihood × impact)</li>
<li><b>Evaluate</b> — is it above our appetite?</li>
<li><b>Treat</b> — accept, mitigate, transfer, or avoid.</li>
<li><b>Monitor & review</b> — risk is not static.</li>
</ol>
<h4>Inherent vs residual</h4>
<p><b>Inherent risk</b> is the risk before controls. <b>Residual risk</b> is what's left after controls. The gap between them is the value your controls deliver. You treat risk until residual sits at or below your <b>risk appetite</b>.</p>
<div class="callout warn"><b>Common mistake:</b> Scoring risk on gut feel and never revisiting it. A register that never changes is a register nobody uses.</div>
`,
  },
  'controls-101': {
    body: `
<h3>Controls 101</h3>
<p>A <b>control</b> is a measure that modifies risk. Controls are classified two ways:</p>
<h4>By function (what they do)</h4>
<table>
<tr><th>Type</th><th>Purpose</th><th>Example</th></tr>
<tr><td><b>Preventive</b></td><td>Stop it happening</td><td>MFA, access approval, encryption</td></tr>
<tr><td><b>Detective</b></td><td>Notice it happened</td><td>Logging, alerts, reconciliations</td></tr>
<tr><td><b>Corrective</b></td><td>Fix / recover after</td><td>Backups, incident response, patching</td></tr>
</table>
<h4>By nature (how they're built)</h4>
<ul>
<li><b>Administrative</b> — policies, training, procedures.</li>
<li><b>Technical</b> — firewalls, IAM, encryption.</li>
<li><b>Physical</b> — locks, badges, CCTV.</li>
</ul>
<div class="callout"><b>Defence in depth:</b> No single control is trusted. You layer preventive + detective + corrective so a failure in one is caught by another.</div>
`,
  },
  'req-vs-controls': {
    body: `
<h3>Requirements vs Controls — the mistake that fails audits</h3>
<p>This distinction trips up even experienced practitioners, and getting it wrong can cost you an audit.</p>
<ul>
<li>A <b>requirement</b> is <em>what</em> a standard or law demands. Example: ISO 27001 requires you to "control access to information."</li>
<li>A <b>control</b> is <em>how</em> you meet it. Example: role-based access control with quarterly recertification.</li>
</ul>
<p>Auditors test <b>controls</b> against <b>requirements</b>. Confusing the two leads to two failure modes:</p>
<ol>
<li><b>Citing a requirement as if it were evidence</b> — "we comply with A.5.15" is not evidence; the access-review log is.</li>
<li><b>Building controls with no requirement behind them</b> — effort spent, nothing satisfied, and gaps elsewhere.</li>
</ol>
<div class="callout why"><b>Map it explicitly:</b> Every control should trace to at least one requirement, and every requirement should be covered by at least one control. That traceability matrix <em>is</em> your audit readiness.</div>
`,
  },
  'grc-quiz-2': {
    quiz: [
      { type: 'mc', q: 'MFA is which type of control by function?',
        options: ['Detective', 'Preventive', 'Corrective', 'Compensating'],
        answer: 1, explain: 'MFA stops unauthorised access before it happens = preventive.' },
      { type: 'mc', q: 'An auditor asks for proof that access reviews happen. The correct answer is:',
        options: ['Cite the ISO clause number', 'Show the signed quarterly access-review records', 'Explain the policy verbally', 'Point to the requirement'],
        answer: 1, explain: 'Evidence is the artifact (the review records), not the requirement.' },
      { type: 'input', q: 'Risk before controls is called ____ risk.',
        answer: ['inherent'], explain: 'Inherent = before controls; residual = after.' },
    ],
  },
  // ---- Risk register course ----
  'rr-anatomy': {
    body: `
<h3>Anatomy of a risk register</h3>
<p>The <b>risk register</b> is the beating heart of a GRC program — the single list of what could hurt the organisation and what's being done about it. A usable row contains:</p>
<table>
<tr><th>Field</th><th>Meaning</th></tr>
<tr><td>Risk ID & title</td><td>Unique reference + one-line description</td></tr>
<tr><td>Risk owner</td><td>The single accountable person (never "IT")</td></tr>
<tr><td>Inherent likelihood × impact</td><td>Score before controls</td></tr>
<tr><td>Existing controls</td><td>What already reduces it</td></tr>
<tr><td>Residual likelihood × impact</td><td>Score after controls</td></tr>
<tr><td>Treatment & target date</td><td>Accept / mitigate / transfer / avoid</td></tr>
<tr><td>Status</td><td>Open, treated, accepted, closed</td></tr>
</table>
<div class="callout"><b>Named owner rule:</b> A risk with no named human owner is a risk nobody manages. "The team" is not an owner.</div>
`,
  },
  'rr-inherent-residual': {
    body: `
<h3>Inherent vs residual risk</h3>
<p>Score twice. First the <b>inherent</b> risk (imagine no controls exist), then the <b>residual</b> risk (with current controls working). The drop tells you whether your controls are worth their cost.</p>
<p>Formula most teams use: <code>score = likelihood × impact</code> on a 1–5 scale, giving 1–25. Bands are typically:</p>
<ul>
<li><b>1–4</b> Low</li>
<li><b>5–9</b> Medium</li>
<li><b>10–15</b> High</li>
<li><b>16–25</b> Critical</li>
</ul>
<div class="callout why"><b>Watch for over-crediting controls:</b> Teams love to drop residual scores to "Low" to look good. Residual should reflect controls that are <em>designed and operating effectively</em> — not controls that exist on paper.</div>
`,
  },
  'rr-treatment': {
    body: `
<h3>The four treatment options</h3>
<table>
<tr><th>Option</th><th>Meaning</th><th>When</th></tr>
<tr><td><b>Mitigate</b></td><td>Add/strengthen controls to lower likelihood or impact</td><td>Most common; risk above appetite</td></tr>
<tr><td><b>Transfer</b></td><td>Shift impact to a third party (insurance, contract)</td><td>Impact is financial & insurable</td></tr>
<tr><td><b>Avoid</b></td><td>Stop the activity causing the risk</td><td>Risk far exceeds any reward</td></tr>
<tr><td><b>Accept</b></td><td>Consciously live with it, documented & signed off</td><td>At/below appetite, or treatment costs more than the risk</td></tr>
</table>
<div class="callout warn"><b>Acceptance is a decision, not a default:</b> Accepting risk requires a documented sign-off by someone with the authority to accept it. Silent acceptance is negligence.</div>
`,
  },
  'rr-heatmap': {
    body: `
<h3>Reading & building heat maps</h3>
<p>A <b>heat map</b> plots likelihood (x) against impact (y) on a grid, colouring cells green→amber→red. It turns a spreadsheet of numbers into a picture a board can read in five seconds.</p>
<ul>
<li><b>Top-right (high×high)</b> — critical, treat now.</li>
<li><b>Bottom-left (low×low)</b> — accept and monitor.</li>
<li><b>Off-diagonal</b> — low-likelihood/high-impact risks (the "black swans") are the ones boards under-fund and later regret.</li>
</ul>
<p>Plot both inherent and residual positions to visually show the journey your controls create.</p>
`,
  },
  'rr-quiz': {
    quiz: [
      { type: 'mc', q: 'A risk scores likelihood 5, impact 4. On a 1–25 scale that is:',
        options: ['Low', 'Medium', 'High', 'Critical'],
        answer: 3, explain: '5×4=20, which sits in the 16–25 Critical band.' },
      { type: 'mc', q: 'Buying cyber-insurance to cover breach costs is which treatment?',
        options: ['Mitigate', 'Transfer', 'Avoid', 'Accept'],
        answer: 1, explain: 'Insurance shifts financial impact to a third party = transfer.' },
      { type: 'input', q: 'A documented, signed decision to live with a risk is called risk ____.',
        answer: ['acceptance', 'accept'], explain: 'Acceptance must be signed off by someone with authority.' },
    ],
  },
}
