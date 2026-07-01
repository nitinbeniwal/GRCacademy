// Scenario configs for the generic ScenarioLab engine.
export const SCENARIOS = {
  incident: {
    title: 'LAB: Incident Response — Beat the Clock',
    brief: '🚨 A customer database is leaking. You have 60 seconds. Pick the RIGHT action at each step — wrong moves cost you.',
    timed: 60,
    steps: [
      { context: 'Alert: unusual outbound traffic from the customer DB at 02:14.',
        prompt: 'First move?',
        options: [
          { t: 'Contain: isolate the affected host from the network', ok: true, fb: 'Correct — contain first to stop the bleeding.' },
          { t: 'Email the whole company about the breach', ok: false, fb: 'No — premature comms cause panic and tip off the attacker.' },
          { t: 'Wipe the server immediately', ok: false, fb: 'No — you just destroyed the forensic evidence.' },
          { t: 'Wait to see if it stops on its own', ok: false, fb: 'No — every second is more data gone.' },
        ]},
      { prompt: 'Host is isolated. Next?',
        options: [
          { t: 'Preserve evidence: snapshot memory & disk before changes', ok: true, fb: 'Yes — preserve volatile evidence for forensics.' },
          { t: 'Reboot the server to clear the malware', ok: false, fb: 'No — reboot wipes memory-resident evidence.' },
          { t: 'Start rebuilding from backup right now', ok: false, fb: 'Too early — you lose the ability to investigate.' },
        ]},
      { prompt: 'Evidence preserved. Who do you notify first internally?',
        options: [
          { t: 'The incident commander / IR lead', ok: true, fb: 'Correct — escalate through the defined chain.' },
          { t: 'Post it on social media', ok: false, fb: 'Absolutely not.' },
          { t: 'Nobody — handle it solo', ok: false, fb: 'No — incidents need coordinated response.' },
        ]},
      { prompt: 'Personal data of EU customers was exposed. The GDPR clock is:',
        options: [
          { t: '72 hours to notify the supervisory authority', ok: true, fb: 'Correct — 72h from awareness under GDPR Art. 33.' },
          { t: '30 days', ok: false, fb: 'No — GDPR is 72 hours.' },
          { t: 'No obligation', ok: false, fb: 'Wrong — a reportable breach must be notified.' },
        ]},
      { prompt: 'Post-incident, the most valuable deliverable is:',
        options: [
          { t: 'A lessons-learned report driving control improvements', ok: true, fb: 'Yes — turn the incident into prevention.' },
          { t: 'Blame the on-call engineer', ok: false, fb: 'No — blameless post-mortems find root cause.' },
          { t: 'Delete all the logs', ok: false, fb: 'Never destroy evidence.' },
        ]},
    ],
  },

  evidence: {
    title: 'LAB: Audit Evidence — Satisfy the Auditor',
    brief: '🔎 The auditor asks for proof of each control. Hand over the RIGHT objective evidence.',
    steps: [
      { prompt: 'Auditor: "Prove access is reviewed quarterly."',
        options: [
          { t: 'Signed & dated Q1–Q4 access-review records with reviewer names', ok: true, fb: 'Objective, dated, attributable — perfect.' },
          { t: 'A verbal "yes we do it"', ok: false, fb: 'Inquiry alone is the weakest evidence.' },
          { t: 'The access-control policy document', ok: false, fb: 'That is the requirement, not proof it happened.' },
        ]},
      { prompt: 'Auditor: "Show backups are tested."',
        options: [
          { t: 'Restore-test logs showing a successful recovery + timestamp', ok: true, fb: 'Re-performance evidence — strongest form.' },
          { t: 'A screenshot that backups are "enabled"', ok: false, fb: 'Enabled ≠ tested. Restores can still fail.' },
          { t: 'The DR plan', ok: false, fb: 'The plan is not evidence the test ran.' },
        ]},
      { prompt: 'Auditor: "Evidence that staff completed security training."',
        options: [
          { t: 'Completion records/certificates per employee for the period', ok: true, fb: 'Attributable completion records — correct.' },
          { t: 'The training slides', ok: false, fb: 'Content ≠ proof of completion.' },
          { t: '"Everyone did it, trust me"', ok: false, fb: 'Not objective evidence.' },
        ]},
      { prompt: 'Auditor: "Prove changes are approved before production."',
        options: [
          { t: 'Change tickets showing approver + timestamp before deploy', ok: true, fb: 'Ties approval to the change — exactly right.' },
          { t: 'The change-management policy', ok: false, fb: 'Requirement, not evidence.' },
          { t: 'A list of deployments only', ok: false, fb: 'Shows changes, not that they were approved.' },
        ]},
    ],
  },

  crosswalk: {
    title: 'LAB: Cross-Framework Crosswalk',
    brief: '🔗 One control, many frameworks. Match each control to the framework family it belongs to.',
    steps: [
      { prompt: '"Statement of Applicability" is a required artifact of:',
        options: [
          { t: 'ISO 27001', ok: true, fb: 'The SoA is unique to ISO 27001.' },
          { t: 'PCI DSS', ok: false, fb: 'PCI uses SAQ/ROC, not an SoA.' },
          { t: 'GDPR', ok: false, fb: 'GDPR uses ROPA/DPIA.' },
        ]},
      { prompt: 'The "Trust Services Criteria" belong to:',
        options: [
          { t: 'SOC 2', ok: true, fb: 'TSC = the five SOC 2 criteria.' },
          { t: 'NIST CSF', ok: false, fb: 'CSF uses functions, not TSC.' },
          { t: 'ISO 42001', ok: false, fb: 'That is the AI management standard.' },
        ]},
      { prompt: '"Govern, Identify, Protect, Detect, Respond, Recover" are the functions of:',
        options: [
          { t: 'NIST CSF 2.0', ok: true, fb: 'The six CSF functions.' },
          { t: 'ISO 27001 Annex A', ok: false, fb: 'Annex A uses 4 themes.' },
          { t: 'COSO', ok: false, fb: 'COSO has 5 components for internal control.' },
        ]},
      { prompt: 'A "DPIA" is required under:',
        options: [
          { t: 'GDPR', ok: true, fb: 'Art. 35 — for high-risk processing.' },
          { t: 'SOC 2', ok: false, fb: 'No DPIA concept in SOC 2.' },
          { t: 'Basel III', ok: false, fb: 'Basel is banking capital/risk.' },
        ]},
    ],
  },

  vendor: {
    title: 'LAB: Vendor Risk Assessment',
    brief: '🤝 Assess "CloudCRM Inc." — a SaaS that will hold your customer PII. Make the right calls.',
    steps: [
      { context: 'CloudCRM will store names, emails and payment card data for all your customers.',
        prompt: 'What tier is this vendor?',
        options: [
          { t: 'Critical — sensitive data + business-essential', ok: true, fb: 'Card + PII + essential = Critical tier, deepest diligence.' },
          { t: 'Low — it is just a CRM', ok: false, fb: 'It holds card data. That is never low.' },
          { t: 'No tier needed', ok: false, fb: 'Every vendor with data access needs tiering.' },
        ]},
      { prompt: 'They claim ISO 27001 certification. You should:',
        options: [
          { t: 'Request the certificate AND check the scope covers this service', ok: true, fb: 'Scope trap — certificate may exclude the product you buy.' },
          { t: 'Take their word for it', ok: false, fb: 'Claims must be evidenced.' },
          { t: 'Ignore it and move on', ok: false, fb: 'You need the evidence on file.' },
        ]},
      { prompt: 'They hold card data. Which extra assurance is essential?',
        options: [
          { t: 'PCI DSS Attestation of Compliance (AOC)', ok: true, fb: 'Card data ⇒ PCI DSS AOC is essential.' },
          { t: 'A WCAG accessibility report', ok: false, fb: 'Not relevant to card-data security.' },
          { t: 'Their marketing deck', ok: false, fb: 'Not assurance.' },
        ]},
      { prompt: 'After onboarding, how do you manage ongoing risk?',
        options: [
          { t: 'Continuous monitoring + annual reassessment + cert-expiry tracking', ok: true, fb: 'Vendors change — monitor continuously.' },
          { t: 'One assessment, then never again', ok: false, fb: 'Point-in-time assurance decays fast.' },
          { t: 'Only reassess if they get breached', ok: false, fb: 'Too late — be proactive.' },
        ]},
    ],
  },

  'audit-sim': {
    title: 'LAB: Audit Simulator',
    brief: '📋 Run an ISO 27001 internal audit. Make sound auditor judgments at each stage.',
    steps: [
      { prompt: 'You begin the audit. First step?',
        options: [
          { t: 'Define scope & criteria and plan the audit', ok: true, fb: 'Plan first — scope, criteria, schedule.' },
          { t: 'Start writing findings', ok: false, fb: 'Nothing to base findings on yet.' },
          { t: 'Skip to the report', ok: false, fb: 'No evidence gathered.' },
        ]},
      { context: 'A manager says "we review access quarterly" but can only show one review, from 8 months ago.',
        prompt: 'Your conclusion?',
        options: [
          { t: 'Raise a nonconformity — control not operating as designed', ok: true, fb: 'Design says quarterly; evidence shows it lapsed = NC.' },
          { t: 'Accept the verbal assurance', ok: false, fb: 'Inquiry unsupported by evidence is not enough.' },
          { t: 'Ignore it', ok: false, fb: 'A real gap must be raised.' },
        ]},
      { prompt: 'The finding is one lapsed control, not a total failure. Grade it:',
        options: [
          { t: 'Minor nonconformity', ok: true, fb: 'A single lapse = minor; a whole requirement missing = major.' },
          { t: 'Major nonconformity', ok: false, fb: 'Major = a whole requirement not implemented.' },
          { t: 'Not a finding', ok: false, fb: 'It is a genuine gap.' },
        ]},
      { prompt: 'Best corrective action to accept?',
        options: [
          { t: 'Automated reminder + calendar control so reviews cannot be missed, plus root-cause fix', ok: true, fb: 'Fixes the cause, not just the instance.' },
          { t: '"We promise to remember next time"', ok: false, fb: 'Not a durable corrective action.' },
          { t: 'Do the one missed review and close it', ok: false, fb: 'Treats the symptom only.' },
        ]},
    ],
  },

  interview: {
    title: 'LAB: GRC Interview Simulator',
    brief: '🎤 Senior GRC interview. Pick the strongest professional answer.',
    steps: [
      { prompt: '"A business owner refuses to remediate a high risk. What do you do?"',
        options: [
          { t: 'Quantify the risk, escalate, and require documented risk acceptance by an authorised owner', ok: true, fb: 'You inform and escalate — you don’t just override or ignore.' },
          { t: 'Override them and fix it yourself', ok: false, fb: 'GRC advises and escalates; it rarely has unilateral authority.' },
          { t: 'Drop it — not your problem', ok: false, fb: 'Unmanaged high risk is exactly your problem.' },
        ]},
      { prompt: '"Difference between a requirement and a control?"',
        options: [
          { t: 'A requirement is WHAT a standard demands; a control is HOW you meet it — auditors test controls against requirements', ok: true, fb: 'The audit-killer distinction, nailed.' },
          { t: 'They are the same thing', ok: false, fb: 'Conflating them fails audits.' },
          { t: 'A control is a law', ok: false, fb: 'No — a control is your implementation.' },
        ]},
      { prompt: '"How would you govern the company’s new AI chatbot?"',
        options: [
          { t: 'Add it to an AI registry, classify its risk tier, add human oversight & transparency, monitor for drift/bias', ok: true, fb: 'Registry → tier → oversight → monitoring. Excellent.' },
          { t: 'Nothing — it is just software', ok: false, fb: 'AI carries new, specific risks.' },
          { t: 'Ban all AI', ok: false, fb: 'Govern, don’t reflexively prohibit.' },
        ]},
      { prompt: '"How do you know a control actually works?"',
        options: [
          { t: 'Test both design and operating effectiveness with objective evidence over time', ok: true, fb: 'Design + operating effectiveness = the real test.' },
          { t: 'Because the policy says so', ok: false, fb: 'Policy is intent, not proof.' },
          { t: 'Someone told me', ok: false, fb: 'Not evidence.' },
        ]},
    ],
  },

  bias: {
    title: 'LAB: AI Bias Detection',
    brief: '⚖️ You review a hiring model’s fairness metrics. Decide correctly — real people’s jobs depend on it.',
    steps: [
      { context: 'The model selects 42% of male applicants but only 19% of equally-qualified female applicants.',
        prompt: 'What does this indicate?',
        options: [
          { t: 'Disparate impact across a protected group', ok: true, fb: 'Large outcome gap on a protected attribute = disparate impact.' },
          { t: 'The model is perfectly fair', ok: false, fb: 'A 23-point gap is a red flag.' },
          { t: 'Nothing — outcomes always differ', ok: false, fb: 'Unequal outcomes for equally-qualified groups is the problem.' },
        ]},
      { context: 'The team says "we removed gender from the features, so it can’t be biased."',
        prompt: 'Your response?',
        options: [
          { t: 'Proxies (name, college, gaps) can leak gender — test outcomes, not just inputs', ok: true, fb: 'Removing the label doesn’t remove the signal.' },
          { t: 'Agree — problem solved', ok: false, fb: 'Proxy variables still encode the attribute.' },
          { t: 'Delete the model', ok: false, fb: 'Investigate and mitigate first.' },
        ]},
      { prompt: 'Under the EU AI Act, this hiring model is:',
        options: [
          { t: 'High-risk — full obligations apply', ok: true, fb: 'Employment AI is Annex III high-risk.' },
          { t: 'Minimal risk', ok: false, fb: 'Employment decisions are high-risk.' },
          { t: 'Unregulated', ok: false, fb: 'Very much regulated.' },
        ]},
      { prompt: 'Best immediate mitigation?',
        options: [
          { t: 'Add human oversight for consequential decisions while you rebalance data & remove proxies', ok: true, fb: 'Human-in-the-loop + fix the root cause.' },
          { t: 'Ship it and monitor later', ok: false, fb: 'Not with a known disparate impact.' },
          { t: 'Hide the metrics', ok: false, fb: 'That’s negligence, not mitigation.' },
        ]},
    ],
  },

  capstone: {
    title: 'LAB: Capstone — Full GRC Lifecycle',
    brief: '🎓 You are the first GRC hire at NovaPay (fintech, card payments + AI fraud model). Run the whole lifecycle. 80%+ earns GRC Architect.',
    steps: [
      { prompt: 'Day one. Where do you start?',
        options: [
          { t: 'Inventory assets & systems — including any shadow AI', ok: true, fb: 'You can’t govern what you can’t see.' },
          { t: 'Buy every framework certification at once', ok: false, fb: 'Scope by risk first.' },
          { t: 'Write policies before understanding the business', ok: false, fb: 'Context precedes control.' },
        ]},
      { prompt: 'NovaPay processes cards and runs an AI fraud-scoring model. Frameworks?',
        options: [
          { t: 'PCI DSS (cards) + ISO 27001 (ISMS) + ISO 42001 / AI RMF (the model)', ok: true, fb: 'Right coverage for the real risks.' },
          { t: 'Only GDPR', ok: false, fb: 'Misses card + AI obligations.' },
          { t: 'No frameworks needed', ok: false, fb: 'A regulated fintech needs them.' },
        ]},
      { prompt: 'You assess a high risk: unencrypted card data at rest. Treatment?',
        options: [
          { t: 'Mitigate — encrypt at rest and tokenise PANs', ok: true, fb: 'Reduce likelihood/impact with controls.' },
          { t: 'Accept it silently', ok: false, fb: 'Never silently accept a critical risk.' },
          { t: 'Ignore — buy insurance only', ok: false, fb: 'Transfer alone doesn’t fix the exposure.' },
        ]},
      { prompt: 'The AI fraud model shows disparate false-positive rates by region. You:',
        options: [
          { t: 'Log it in the AI registry, add oversight, and require bias remediation', ok: true, fb: 'Govern the model like any high risk.' },
          { t: 'Ship it — fraud is fraud', ok: false, fb: 'Disparate impact is a real harm & legal risk.' },
          { t: 'Turn off all fraud detection', ok: false, fb: 'Over-correction; govern, don’t abandon.' },
        ]},
      { prompt: 'Board meeting. How do you report?',
        options: [
          { t: 'Top risks vs appetite, trend, and the decisions you need — tied to money', ok: true, fb: 'Boards act on decisions, not control lists.' },
          { t: 'Read out all 200 open findings', ok: false, fb: 'Boards tune out detail dumps.' },
          { t: 'Say "everything is fine"', ok: false, fb: 'Not credible or useful.' },
        ]},
      { prompt: 'Six months on, how do you keep the program alive?',
        options: [
          { t: 'Continuous monitoring, scheduled reviews, and metrics that drive improvement', ok: true, fb: 'GRC is a cycle, not a project.' },
          { t: 'Declare victory and stop', ok: false, fb: 'Programs decay without upkeep.' },
          { t: 'Only act after the next incident', ok: false, fb: 'Reactive-only = failure.' },
        ]},
    ],
  },
}
