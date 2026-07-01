export const career = {
  'car-appetite': {
    body: `
<h3>Risk appetite & tolerance statements</h3>
<p>A <b>risk appetite statement</b> is the board's declaration of how much risk it will accept pursuing objectives. <b>Tolerance</b> is the acceptable variation around a specific measure.</p>
<p>Good appetite statements are specific and measurable:</p>
<ul>
<li>❌ "We have a low appetite for cyber risk." (unusable)</li>
<li>✅ "We accept no more than 4 hours annual downtime on payment services, and zero tolerance for unencrypted customer PII."</li>
</ul>
<p>Appetite turns thousands of individual risk decisions into a consistent, board-owned policy — and gives you cover to say "no" to work that breaches it.</p>
`,
  },
  'car-board': {
    body: `
<h3>Reporting to the board</h3>
<p>Boards don't want control lists — they want <b>decisions</b>. Effective GRC reporting:</p>
<ul>
<li>Leads with the <b>top risks</b> and whether they're inside appetite.</li>
<li>Shows <b>trend</b> (better/worse than last quarter), not just a snapshot.</li>
<li>Ties risk to <b>business objectives</b> and money.</li>
<li>Ends with <b>decisions requested</b> — what you need from them.</li>
</ul>
<div class="callout"><b>Translate up:</b> "37 open findings" means nothing to a board. "Two high risks are outside appetite; here's the €400k decision to bring them back" gets action.</div>
`,
  },
  'car-interview': {
    body: `
<h3>The GRC interview question bank</h3>
<p>Senior GRC interviews test <em>judgment</em>, not memorised definitions. Prepare crisp answers to:</p>
<ul>
<li>"Walk me through how you'd stand up a GRC program from zero." (context → risk assessment → framework → controls → monitoring)</li>
<li>"A business owner refuses to fix a high risk. What do you do?" (quantify, escalate, document acceptance, don't just override)</li>
<li>"Difference between a requirement and a control?" (the audit-killer distinction)</li>
<li>"How do you measure whether a control works?" (design + operating effectiveness, evidence)</li>
<li>"How would you govern the company's new AI chatbot?" (registry, risk tier, oversight, transparency)</li>
</ul>
<p>Structure answers with <b>situation → action → outcome</b> and always tie back to business risk.</p>
`,
  },
  'car-capstone-brief': {
    body: `
<h3>Capstone brief: build a fintech GRC program</h3>
<p>You're the first GRC hire at <b>NovaPay</b>, a Series-B fintech processing card payments and piloting an AI fraud-scoring model. In the capstone lab you'll run the full lifecycle end to end:</p>
<ol>
<li><b>Inventory</b> assets & AI systems (find the shadow AI).</li>
<li><b>Assess</b> risks; score inherent, apply controls, compute residual.</li>
<li><b>Select</b> frameworks (PCI DSS for cards, ISO 27001 for the ISMS, ISO 42001 for the model).</li>
<li><b>Write</b> a policy and reject the filler.</li>
<li><b>Evidence</b> controls for the auditor.</li>
<li><b>Report</b> the top risks to the board with a decision request.</li>
</ol>
<p>This ties together every track. Score 80%+ to earn the <b>GRC Architect</b> rank.</p>
`,
  },
  'car-quiz-1': { quiz: [
    { type: 'mc', q: 'Which is a usable risk appetite statement?', options: ['"We have low appetite for risk."', '"We accept ≤4h annual downtime on payments and zero unencrypted PII."', '"Risk is bad."', '"We follow best practice."'], answer: 1, explain: 'Appetite must be specific and measurable to be usable.' },
    { type: 'mc', q: 'The best thing to end a board risk report with is:', options: ['A list of all controls', 'The decisions you need from the board', 'Technical log excerpts', 'An apology'], answer: 1, explain: 'Boards act on decision requests, not control inventories.' },
  ]},
}
