import type { LessonContent } from '../../types'
export const aigov: Record<string, LessonContent> = {
  'ai-intro': {
    body: `
<h3>Why AI needs its own governance</h3>
<p>AI systems break assumptions traditional GRC relies on. They are:</p>
<ul>
<li><b>Probabilistic</b> — outputs vary; "the control passed once" proves little.</li>
<li><b>Opaque</b> — a deep model can't always explain a decision.</li>
<li><b>Adaptive</b> — behaviour drifts as data changes.</li>
<li><b>Autonomous</b> — they act at scale, fast, with limited human review.</li>
</ul>
<p>The result is <b>new risk types</b>: bias/discrimination, hallucination, model drift, prompt injection, opaque automated decisions affecting people's lives. AI governance adapts risk, control and audit thinking to these properties.</p>
`,
  },
  'ai-euact': {
    body: `
<h3>EU AI Act risk tiers</h3>
<p>The EU AI Act — the first comprehensive AI law — regulates by <b>risk tier</b>:</p>
<table>
<tr><th>Tier</th><th>Meaning</th><th>Obligation</th></tr>
<tr><td><b>Unacceptable</b></td><td>Social scoring, manipulative AI</td><td>Banned</td></tr>
<tr><td><b>High-risk</b></td><td>Employment, credit, biometrics, critical infra</td><td>Heavy: risk mgmt, data governance, human oversight, logging, conformity assessment</td></tr>
<tr><td><b>Limited</b></td><td>Chatbots, deepfakes</td><td>Transparency (tell users it's AI)</td></tr>
<tr><td><b>Minimal</b></td><td>Spam filters, games</td><td>None</td></tr>
</table>
<div class="callout warn"><b>Employment AI = high-risk:</b> A tool that screens or ranks job candidates falls in Annex III (high-risk) and inherits the full obligation set.</div>
`,
  },
  'ai-nistrmf': {
    body: `
<h3>NIST AI RMF: Govern, Map, Measure, Manage</h3>
<p>The <b>NIST AI Risk Management Framework</b> is voluntary and organised into four functions:</p>
<ul>
<li><b>Govern</b> — culture, policies, roles, accountability for AI risk (cuts across the others).</li>
<li><b>Map</b> — establish context; identify where and how the AI could cause harm.</li>
<li><b>Measure</b> — analyse, benchmark and monitor AI risks (bias, robustness, explainability).</li>
<li><b>Manage</b> — prioritise and act on risks; allocate resources; respond to incidents.</li>
</ul>
<p>It targets seven characteristics of <b>trustworthy AI</b>: valid & reliable, safe, secure & resilient, accountable & transparent, explainable, privacy-enhanced, and fair with harmful bias managed.</p>
`,
  },
  'ai-iso42001': {
    body: `
<h3>ISO 42001 — the AI management system</h3>
<p><b>ISO/IEC 42001</b> is the first certifiable <b>AI Management System (AIMS)</b> standard — think "ISO 27001 for AI." Same clause 4–10 structure, plus AI-specific controls (Annex A) covering AI policy, impact assessment, data for AI, lifecycle management, transparency, and human oversight.</p>
<div class="callout why"><b>Why it matters:</b> ISO 42001 lets an organisation <em>certify</em> that it governs AI responsibly — a growing procurement and regulatory expectation. It operationalises the principles the EU AI Act and NIST AI RMF describe.</div>
`,
  },
  'ai-registry': {
    body: `
<h3>Building an AI system registry</h3>
<p>You can't govern what you can't see. An <b>AI registry</b> inventories every AI/ML system: purpose, owner, data used, risk tier, human-oversight mechanism, and status. It's the AI-governance equivalent of the risk register — and the first thing an EU AI Act or ISO 42001 assessor asks for.</p>
<p>The hard part is <b>shadow AI</b>: models and GenAI tools staff adopt without telling anyone. Discovery — finding shadow AI and pulling it into the registry — is an ongoing control, not a one-off.</p>
`,
  },
  'ai-bias': {
    body: `
<h3>Bias, fairness & disparate impact</h3>
<p><b>Bias</b> in AI produces systematically worse outcomes for some groups. It creeps in through skewed training data, proxy variables, or flawed labels. Key ideas:</p>
<ul>
<li><b>Disparate impact</b> — a neutral-looking model produces unequal outcomes across protected groups.</li>
<li><b>Fairness metrics</b> — demographic parity, equal opportunity, equalised odds (they can conflict — you must choose).</li>
<li><b>Mitigation</b> — rebalance data, remove proxies, constrain the model, and keep humans in the loop for consequential decisions.</li>
</ul>
<div class="callout"><b>Measure before you claim fairness:</b> "We don't use race as a feature" doesn't prevent disparate impact — proxies (zip code, name) leak it. You must test outcomes, not just inputs.</div>
`,
  },
  'ai-quiz-1': { quiz: [
    { type: 'mc', q: 'Under the EU AI Act, an AI tool that screens and ranks job candidates is:', options: ['Minimal risk', 'Limited risk', 'High-risk', 'Banned'], answer: 2, explain: 'Employment AI is high-risk (Annex III), inheriting the full obligation set.' },
    { type: 'mc', q: 'Which EU AI Act tier is outright banned?', options: ['Limited', 'Minimal', 'Unacceptable', 'High-risk'], answer: 2, explain: 'Unacceptable-risk practices (e.g. social scoring) are prohibited.' },
  ]},
  'ai-quiz-2': { quiz: [
    { type: 'input', q: 'The four NIST AI RMF functions are Govern, Map, Measure and ____.', answer: ['manage'], explain: 'Govern, Map, Measure, Manage.' },
    { type: 'mc', q: 'A model that uses zip code as a proxy and produces unequal outcomes by race exhibits:', options: ['Model drift', 'Disparate impact', 'Prompt injection', 'Hallucination'], answer: 1, explain: 'Neutral inputs, unequal outcomes across protected groups = disparate impact.' },
    { type: 'mc', q: 'ISO 42001 is best described as:', options: ['A privacy law', 'A certifiable AI management system standard', 'A pentest method', 'A US federal statute'], answer: 1, explain: 'ISO 42001 = AIMS, "ISO 27001 for AI".' },
  ]},
}
