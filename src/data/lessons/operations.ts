import type { LessonContent } from '../../types'
export const operations: Record<string, LessonContent> = {
  'audit-evidence': {
    body: `
<h3>Audits, evidence & findings</h3>
<p>An <b>audit</b> is an independent check that controls exist and work, measured against a standard. The lifecycle:</p>
<ol>
<li><b>Plan</b> — scope, criteria, schedule.</li>
<li><b>Fieldwork</b> — gather evidence: interviews, observation, document review, re-performance.</li>
<li><b>Evaluate</b> — compare evidence to criteria; raise findings.</li>
<li><b>Report</b> — findings, risk ratings, recommendations.</li>
<li><b>Follow-up</b> — verify corrective actions closed the gap.</li>
</ol>
<div class="callout"><b>Objective evidence</b> is the heart of it: something an independent person could inspect and reach the same conclusion — a log, a signed record, a config export. "Someone told me it's fine" is not evidence.</div>
`,
  },
  'audit-types': {
    body: `
<h3>Internal, external & certification audits</h3>
<table>
<tr><th>Type</th><th>Who</th><th>Purpose</th></tr>
<tr><td><b>Internal (1st party)</b></td><td>Your own internal audit</td><td>Self-assurance, find gaps early</td></tr>
<tr><td><b>Supplier (2nd party)</b></td><td>You audit a vendor (or a customer audits you)</td><td>Contractual assurance</td></tr>
<tr><td><b>Certification (3rd party)</b></td><td>Independent certification body</td><td>Formal certificate (e.g. ISO 27001)</td></tr>
</table>
<p>Internal audits feed the management review and pre-empt surprises in the external audit.</p>
`,
  },
  'audit-evidence-types': {
    body: `
<h3>Types of objective evidence</h3>
<ul>
<li><b>Inquiry</b> — interviews (weakest alone).</li>
<li><b>Observation</b> — watching a control run.</li>
<li><b>Inspection</b> — reviewing documents/records/configs.</li>
<li><b>Re-performance</b> — the auditor re-runs the control themselves (strongest).</li>
</ul>
<p>Auditors climb this ladder: they may start with inquiry but corroborate with inspection or re-performance, because people describe controls as they <em>should</em> run, not as they do.</p>
`,
  },
  'audit-capa': {
    body: `
<h3>Findings, nonconformities & CAPA</h3>
<p>A <b>finding</b> is a gap between evidence and criteria. Graded by severity (major/minor, or high/med/low). Each material finding drives <b>CAPA</b>:</p>
<ul>
<li><b>Corrective action</b> — fix this instance <em>and</em> its root cause so it doesn't recur.</li>
<li><b>Preventive action</b> — stop similar issues elsewhere before they occur.</li>
</ul>
<div class="callout why"><b>Root cause, not symptom:</b> "We re-trained the analyst" fixes a symptom. "We added a system control that blocks the action" fixes the cause. Auditors reject corrective actions that only treat symptoms.</div>
`,
  },
  'audit-quiz-1': { quiz: [
    { type: 'mc', q: 'The strongest form of audit evidence is:', options: ['Inquiry (interview)', 'Observation', 'Re-performance', 'A verbal assurance'], answer: 2, explain: 'Re-performance — the auditor runs the control themselves — is strongest.' },
    { type: 'input', q: 'A certification audit is performed by which "party" (1st/2nd/3rd)?', answer: ['3rd', 'third', '3'], explain: 'Independent certification bodies are third-party.' },
  ]},
  'audit-quiz-2': { quiz: [
    { type: 'mc', q: 'A good corrective action addresses:', options: ['The symptom only', 'The root cause so it does not recur', 'Nothing — findings just get noted', 'Only the auditor concern'], answer: 1, explain: 'CAPA must fix the root cause, not just the instance.' },
  ]},
  'policies': {
    body: `
<h3>Policies, standards & procedures</h3>
<p>Governance documents form a <b>pyramid</b>, from principle to detail:</p>
<table>
<tr><th>Level</th><th>Answers</th><th>Example</th></tr>
<tr><td><b>Policy</b></td><td>Why + what (mandatory intent)</td><td>"Access shall be granted on least privilege."</td></tr>
<tr><td><b>Standard</b></td><td>Specific mandatory rules</td><td>"Passwords ≥ 14 chars, MFA on all admin accounts."</td></tr>
<tr><td><b>Procedure</b></td><td>Step-by-step how</td><td>"To grant access: 1) raise ticket, 2) manager approves..."</td></tr>
<tr><td><b>Guideline</b></td><td>Recommended (non-mandatory)</td><td>"Consider a password manager."</td></tr>
</table>
<p>Policies change rarely and are board-approved; procedures change often and are owned operationally.</p>
`,
  },
  'policy-lifecycle': {
    body: `
<h3>The policy lifecycle</h3>
<ol>
<li><b>Draft</b> — owner writes/updates.</li>
<li><b>Review</b> — stakeholders (legal, security, HR) comment.</li>
<li><b>Approve</b> — appropriate authority signs off.</li>
<li><b>Publish</b> — make discoverable in one authoritative place.</li>
<li><b>Acknowledge</b> — staff attest they've read it.</li>
<li><b>Review cycle</b> — re-approve at least annually or on change.</li>
</ol>
<div class="callout warn"><b>Zombie policies:</b> An out-of-date policy is worse than none — it misleads and it fails audits. Every policy needs an owner and a review date.</div>
`,
  },
  'policy-enforce': {
    body: `
<h3>Enforceable language & acknowledgements</h3>
<p>Enforceability lives in the verbs. Use <b>"shall/must"</b> for mandatory requirements; reserve "should/may" for guidance. Vague filler ("employees should try to be secure") is unenforceable and auditors ignore it.</p>
<p><b>Acknowledgement</b> closes the loop: a record that each person read and accepted the policy. Without it you can't hold anyone to it. Track acknowledgement rates as a compliance metric.</p>
`,
  },
  'policy-quiz': { quiz: [
    { type: 'mc', q: 'Which document gives step-by-step "how to" instructions?', options: ['Policy', 'Standard', 'Procedure', 'Guideline'], answer: 2, explain: 'Procedures are the detailed how-to; policy is intent.' },
    { type: 'mc', q: 'Which word signals a mandatory requirement in a policy?', options: ['Should', 'May', 'Shall', 'Could'], answer: 2, explain: '"Shall/must" = mandatory; should/may = optional.' },
  ]},
  // ---- TPRM ----
  'tprm-intro': {
    body: `
<h3>Why third-party risk dominates modern breaches</h3>
<p>Modern organisations run on suppliers — cloud, SaaS, payroll, support. Each one is a door into your data. A striking share of major breaches now originate through a <b>third party</b>, not the target directly.</p>
<p><b>TPRM</b> manages the risk your vendors carry on your behalf. You can outsource the <em>activity</em> but never the <em>accountability</em> — regulators hold <em>you</em> responsible for your suppliers' failures.</p>
`,
  },
  'tprm-tiering': {
    body: `
<h3>Tiering vendors by criticality</h3>
<p>You can't assess every vendor equally. <b>Tier</b> them by the risk they carry:</p>
<table>
<tr><th>Tier</th><th>Criteria</th><th>Diligence</th></tr>
<tr><td><b>Critical</b></td><td>Handles sensitive data, or outage stops the business</td><td>Deep review, onsite/audit, continuous monitoring</td></tr>
<tr><td><b>Important</b></td><td>Some data access or operational role</td><td>Questionnaire + evidence review</td></tr>
<tr><td><b>Low</b></td><td>No sensitive data, easily replaced</td><td>Lightweight self-attestation</td></tr>
</table>
<p>Tiering focuses limited assurance effort where it actually reduces risk.</p>
`,
  },
  'tprm-ddq': {
    body: `
<h3>Due-diligence questionnaires & evidence</h3>
<p>A <b>DDQ</b> gathers a vendor's security posture — often mapped to a standard (SIG, CAIQ, or an ISO 27001-based set). But answers are claims; <b>evidence</b> validates them:</p>
<ul>
<li>Ask for their <b>SOC 2 Type II</b> or <b>ISO 27001 certificate + SoA</b>.</li>
<li>Review pentest summaries, not just "yes we pentest."</li>
<li>Check the certificate <em>scope</em> covers the service you're buying.</li>
</ul>
<div class="callout"><b>Scope trap:</b> A vendor's ISO 27001 certificate might cover only their HQ, not the product you use. Always read the scope statement.</div>
`,
  },
  'tprm-monitor': {
    body: `
<h3>Continuous monitoring & concentration risk</h3>
<p>Point-in-time assessment isn't enough — vendors change. Ongoing monitoring watches for: security-rating drops, breach news, expiring certificates, and financial distress.</p>
<h4>Concentration & fourth-party risk</h4>
<ul>
<li><b>Concentration risk</b> — too many critical services on one provider (e.g. one cloud region). One outage cascades everywhere.</li>
<li><b>Fourth-party risk</b> — your vendor's vendors. Your data may sit two hops away with a company you never assessed.</li>
</ul>
`,
  },
  'tprm-quiz-1': { quiz: [
    { type: 'mc', q: 'When you outsource an activity to a vendor, accountability for the risk:', options: ['Transfers fully to the vendor', 'Stays with you', 'Disappears', 'Splits 50/50 legally'], answer: 1, explain: 'You can outsource activity, never accountability.' },
    { type: 'input', q: 'Grouping vendors by the risk they carry so you focus effort is called ____.', answer: ['tiering', 'tier'], explain: 'Tiering matches diligence depth to criticality.' },
  ]},
  'tprm-quiz-2': { quiz: [
    { type: 'mc', q: 'Relying heavily on a single cloud provider for all critical services is an example of:', options: ['Fourth-party risk', 'Concentration risk', 'Residual risk', 'Inherent risk'], answer: 1, explain: 'Concentration risk = over-reliance on one provider.' },
    { type: 'mc', q: 'A subcontractor of your vendor that also touches your data represents:', options: ['Second-party risk', 'Fourth-party risk', 'No risk', 'Concentration risk'], answer: 1, explain: 'Fourth-party = the vendors used by your vendors.' },
  ]},
}
