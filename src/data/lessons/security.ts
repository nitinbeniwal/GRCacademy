import type { LessonContent } from '../../types'
export const security: Record<string, LessonContent> = {
  'cia-triad': {
    body: `
<h3>The CIA triad</h3>
<p>Every security control ultimately protects one of three properties:</p>
<ul>
<li><b>Confidentiality</b> — only authorised parties can read the data (encryption, access control).</li>
<li><b>Integrity</b> — data isn't altered without authorisation (hashing, change control, checksums).</li>
<li><b>Availability</b> — the data/service is there when needed (redundancy, backups, DDoS protection).</li>
</ul>
<p>A newer addition many frameworks track is <b>non-repudiation</b> (you can't deny you did it) via audit logs and signatures.</p>
<div class="callout why"><b>Why GRC pros need this:</b> Every control you assess exists to defend one or more CIA properties. When a control seems pointless, ask "which CIA property does this protect?" — if the answer is none, question the control.</div>
`,
  },
  'iam-basics': {
    body: `
<h3>Identity & Access Management (IAM)</h3>
<p>IAM answers: <em>who is this, and what may they do?</em> Its pillars:</p>
<ul>
<li><b>Identification</b> — claiming an identity (username).</li>
<li><b>Authentication</b> — proving it (password + MFA).</li>
<li><b>Authorization</b> — what that identity may access (RBAC, least privilege).</li>
<li><b>Accounting</b> — logging what they did.</li>
</ul>
<h4>Principles auditors look for</h4>
<ul>
<li><b>Least privilege</b> — minimum access to do the job.</li>
<li><b>Separation of duties</b> — no single person can complete a sensitive transaction alone.</li>
<li><b>Joiner-Mover-Leaver</b> — access is provisioned, changed and (critically) revoked as people move.</li>
<li><b>Periodic recertification</b> — owners re-confirm who has access, usually quarterly.</li>
</ul>
`,
  },
  'sec-quiz-1': {
    quiz: [
      { type: 'input', q: 'Encryption at rest primarily protects which CIA property?', answer: ['confidentiality'], explain: 'It stops unauthorised reading of stored data.' },
      { type: 'mc', q: 'Giving a user only the access they need for their job is the principle of:',
        options: ['Separation of duties', 'Least privilege', 'Defence in depth', 'Non-repudiation'], answer: 1, explain: 'Least privilege = minimum necessary access.' },
      { type: 'mc', q: 'Which CIA property does a ransomware attack that encrypts your files most directly harm?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'None'], answer: 2, explain: 'You lose access to your own data = availability (and often integrity too).' },
    ],
  },
  'secops': {
    body: `
<h3>Security operations & monitoring</h3>
<p><b>SecOps</b> is the detective and responsive muscle of security. Key building blocks:</p>
<ul>
<li><b>Logging</b> — systems emit events (auth, network, application).</li>
<li><b>SIEM</b> — aggregates and correlates logs to raise alerts.</li>
<li><b>SOC</b> — the team (or service) that triages alerts 24/7.</li>
<li><b>Vulnerability management</b> — scan, prioritise, patch on a cycle.</li>
<li><b>Threat intelligence</b> — knowing what's being exploited in the wild.</li>
</ul>
<div class="callout"><b>GRC angle:</b> You'll assess whether logs are complete, retained long enough (often 12 months+), tamper-protected, and actually reviewed. "We have logs" means nothing if nobody looks at them.</div>
`,
  },
  'cloud-shared': {
    body: `
<h3>The cloud shared responsibility model</h3>
<p>In the cloud, security is <b>split</b> between provider and customer — and the split moves depending on the service model.</p>
<table>
<tr><th>Model</th><th>Provider secures</th><th>You secure</th></tr>
<tr><td>IaaS</td><td>Physical, host, network</td><td>OS, apps, data, IAM, config</td></tr>
<tr><td>PaaS</td><td>+ OS & runtime</td><td>Apps, data, IAM, config</td></tr>
<tr><td>SaaS</td><td>+ application</td><td>Data, access, configuration</td></tr>
</table>
<div class="callout warn"><b>The #1 cloud failure:</b> misconfiguration. The provider gives you secure building blocks; leaving an S3 bucket public is <em>your</em> side of the line. "The cloud is secure" ≠ "your cloud is secure."</div>
`,
  },
  'continuity-basics': {
    body: `
<h3>Business continuity & disaster recovery — the basics</h3>
<p>Two related disciplines:</p>
<ul>
<li><b>Business Continuity (BC)</b> — keeping critical <em>business functions</em> running during disruption.</li>
<li><b>Disaster Recovery (DR)</b> — restoring <em>IT systems and data</em> after an outage.</li>
</ul>
<h4>Two numbers that drive everything</h4>
<ul>
<li><b>RTO (Recovery Time Objective)</b> — how fast you must be back. "Payments must recover within 2 hours."</li>
<li><b>RPO (Recovery Point Objective)</b> — how much data you can afford to lose. "No more than 15 minutes of transactions."</li>
</ul>
<p>These come from a <b>Business Impact Analysis (BIA)</b> and dictate your backup frequency and failover design.</p>
`,
  },
}
