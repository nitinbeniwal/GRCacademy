import type { LessonContent } from '../../types'

// PCI DSS v4.0.1 — payments security course content.
export const payments: Record<string, LessonContent> = {
  'pci-intro': {
    body: `
<h3>PCI DSS — securing cardholder data</h3>
<p>The <b>Payment Card Industry Data Security Standard</b> is a contractual (not legal) standard mandated by the card brands (Visa, Mastercard, Amex, Discover, JCB) for every entity that stores, processes or transmits <b>cardholder data</b>. Current version: <b>v4.0.1</b>.</p>
<h4>What it protects</h4>
<ul>
<li><b>Cardholder Data (CHD)</b> — the PAN (Primary Account Number), cardholder name, expiry, service code.</li>
<li><b>Sensitive Authentication Data (SAD)</b> — full track data, CVV, PIN. <em>Never</em> stored after authorisation.</li>
</ul>
<div class="callout warn"><b>The golden rule:</b> if you don't need to store it, don't. The cheapest cardholder data to protect is the data you never hold — which is why tokenisation and outsourcing to a compliant processor slash your scope.</div>
`,
  },
  'pci-scope': {
    body: `
<h3>Scoping the Cardholder Data Environment (CDE)</h3>
<p>The <b>CDE</b> is every system that stores, processes or transmits CHD/SAD — <em>plus</em> any system connected to those. Scoping is the single most important (and most gamed) PCI activity: everything in scope must meet all applicable requirements.</p>
<h4>Segmentation</h4>
<p>Network <b>segmentation</b> isolates the CDE from the rest of the network. It's not mandatory, but without it your <em>entire</em> network is in scope. Good segmentation can shrink a 10,000-host assessment to a few dozen.</p>
<div class="callout"><b>Connected-to counts:</b> A jump box that can reach the CDE is in scope even if it never touches a card number. Auditors trace connectivity, not intent.</div>
`,
  },
  'pci-12reqs': {
    body: `
<h3>The 12 requirements (6 goals)</h3>
<table>
<tr><th>Goal</th><th>Requirements</th></tr>
<tr><td>Build & maintain a secure network</td><td>1 Firewalls · 2 No vendor defaults</td></tr>
<tr><td>Protect account data</td><td>3 Protect stored data · 4 Encrypt in transit</td></tr>
<tr><td>Vulnerability management</td><td>5 Anti-malware · 6 Secure systems & software</td></tr>
<tr><td>Strong access control</td><td>7 Need-to-know · 8 Authenticate access · 9 Physical access</td></tr>
<tr><td>Monitor & test networks</td><td>10 Log & monitor · 11 Test security</td></tr>
<tr><td>Information security policy</td><td>12 Maintain a policy</td></tr>
</table>
<p>v4.0 added a <b>customised approach</b> (meet the objective your own way, with a targeted risk analysis) alongside the traditional <b>defined approach</b>, plus stronger MFA and password requirements.</p>
`,
  },
  'pci-saq': {
    body: `
<h3>SAQ, ROC & how you validate</h3>
<p>How you prove compliance depends on your <b>merchant level</b> (driven by annual transaction volume) and how you take payments:</p>
<ul>
<li><b>SAQ (Self-Assessment Questionnaire)</b> — smaller merchants self-attest. Types include <b>A</b> (fully outsourced e-commerce), <b>A-EP</b> (e-commerce that touches the payment page), <b>B</b> (imprint/standalone terminals), <b>C</b> (payment app), <b>P2PE</b>, and <b>D</b> (everything else — the big one).</li>
<li><b>ROC (Report on Compliance)</b> — Level 1 merchants get a full onsite assessment by a <b>QSA</b>.</li>
<li><b>ASV scans</b> — quarterly external vulnerability scans by an Approved Scanning Vendor.</li>
</ul>
<div class="callout why"><b>Pick the right SAQ:</b> Choosing SAQ A when your page actually loads the payment form (should be A-EP) is a common, serious mis-scope that voids your attestation.</div>
`,
  },
  'pci-quiz-1': {
    quiz: [
      { type: 'mc', q: 'Which data must NEVER be stored after authorisation?', options: ['The PAN', 'The cardholder name', 'Sensitive Authentication Data (CVV, full track, PIN)', 'The expiry date'], answer: 2, explain: 'SAD (CVV/track/PIN) must never be retained post-authorisation.' },
      { type: 'input', q: 'The network technique that isolates the CDE and shrinks PCI scope is ____.', answer: ['segmentation'], explain: 'Segmentation isolates the CDE; without it the whole network is in scope.' },
    ],
  },
  'pci-quiz-2': {
    quiz: [
      { type: 'mc', q: 'A Level 1 merchant validates compliance via:', options: ['SAQ A self-attestation', 'A full Report on Compliance (ROC) by a QSA', 'No validation needed', 'A ROPA'], answer: 1, explain: 'Level 1 = onsite QSA assessment producing a ROC.' },
      { type: 'mc', q: 'The best way to reduce PCI scope is to:', options: ['Store more data securely', 'Avoid storing CHD — tokenise and outsource', 'Add more firewalls only', 'Increase transaction volume'], answer: 1, explain: 'Data you never hold needs no protection — minimise and tokenise.' },
    ],
  },
}
