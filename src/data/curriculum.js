// ============================================================================
//  GRC ACADEMY — Zero to Hero Curriculum
//  Roadmap synthesized from research across leading GRC learning platforms.
//  Structure: TRACKS (levels) -> COURSES -> MODULES (weeks) -> LESSONS.
//  Lesson bodies live in ./lessons/*. This file is the catalog + skeleton.
// ============================================================================

import { lessonContent } from './lessons/index.js'

// ---- helper to attach authored body/quiz/lab to a lesson stub ----
function L(id, type, title, minutes, extra = {}) {
  const c = lessonContent[id] || {}
  return { id, type, title, minutes, ...c, ...extra }
}

export const TRACKS = [
  { id: 't-found', level: 'Beginner', title: 'GRC Foundations', color: 'from-sky-500 to-cblue',
    blurb: 'Zero knowledge? Start here. What GRC is, why it exists, and the core machinery.' },
  { id: 't-sec', level: 'Beginner', title: 'Security & Technical Foundations',color: 'from-emerald-500 to-teal-600',
    blurb: 'The security knowledge every GRC pro needs to actually assess a control.' },
  { id: 't-frame', level: 'Intermediate', title: 'Frameworks & Standards', color: 'from-violet-500 to-indigo-600',
    blurb: 'ISO 27001, NIST, SOC 2, PCI, GDPR — what each is and when it applies.' },
  { id: 't-ops', level: 'Intermediate', title: 'Audit & Compliance Operations', color: 'from-amber-500 to-orange-600',
    blurb: 'How the work actually gets done: audits, evidence, policy, vendor risk.' },
  { id: 't-ent', level: 'Advanced', title: 'Enterprise GRC Domains', color: 'from-rose-500 to-pink-600',
    blurb: 'The 11 enterprise modules: BCM, TPRM, internal audit, financial & model risk.' },
  { id: 't-ai', level: 'Advanced', title: 'AI Governance', color: 'from-fuchsia-500 to-purple-600',
    blurb: 'Govern AI: EU AI Act, NIST AI RMF, ISO 42001, bias, AI risk registries.' },
  { id: 't-career', level: 'Capstone', title: 'Career, Interview & Mastery', color: 'from-slate-700 to-night-800',
    blurb: 'Board reporting, building a program, interview mastery, portfolio capstone.' },
]

// ============================================================================
//  COURSES
// ============================================================================
export const COURSES = [
  // ---------------------------------------------------------------- FOUNDATIONS
  {
    id: 'c-grc101', track: 't-found', icon: '🧭', level: 'Beginner',
    title: 'GRC Fundamentals: Governance, Risk & Compliance',
    subtitle: 'The mental model that everything else hangs on.',
    rating: 4.9, learners: 48210, weeks: 3, hours: 9,
    tags: ['Governance', 'Risk', 'Compliance', 'Three Lines'],
    skills: ['Risk thinking', 'Control basics', 'GRC vocabulary', 'Three Lines Model'],
    description:
      'Start from absolute zero. Learn what governance, risk, and compliance really mean, how they fit together, why organisations spend fortunes on them, and the core machinery — the Three Lines Model, risk registers, and controls — that every later course builds on.',
    modules: [
      { id: 'm-grc101-1', title: 'Why GRC Exists', weekLabel: 'Week 1',
        lessons: [
          L('grc-intro', 'reading', 'What is GRC & why it exists', 12),
          L('grc-gov-vs-risk-vs-comp', 'reading', 'Governance vs Risk vs Compliance', 10),
          L('grc-quiz-1', 'quiz', 'Checkpoint: the GRC mindset', 6),
        ]},
      { id: 'm-grc101-2', title: 'The Core Machinery', weekLabel: 'Week 2',
        lessons: [
          L('three-lines', 'reading', 'The Three Lines Model', 11),
          L('risk-fundamentals', 'reading', 'Risk management fundamentals', 14),
          L('lab-risk-matrix', 'lab', 'LAB: Risk Assessment Matrix', 20, { labId: 'risk-matrix' }),
        ]},
      { id: 'm-grc101-3', title: 'Controls', weekLabel: 'Week 3',
        lessons: [
          L('controls-101', 'reading', 'Controls 101: preventive, detective, corrective', 13),
          L('req-vs-controls', 'reading', 'Requirements vs Controls (the audit-killer mistake)', 10),
          L('grc-quiz-2', 'quiz', 'Checkpoint: controls & requirements', 6),
        ]},
    ],
  },
  {
    id: 'c-riskreg', track: 't-found', icon: '📋', level: 'Beginner',
    title: 'Risk Registers & Risk Assessment in Practice',
    subtitle: 'Build and run a real risk register end to end.',
    rating: 4.8, learners: 21540, weeks: 2, hours: 6,
    tags: ['Risk Register', 'Heat Map', 'Treatment'],
    skills: ['Inherent vs residual risk', 'Likelihood × impact', 'Risk treatment', 'Heat maps'],
    description:
      'Hands-on with the single most important artifact in GRC: the risk register. Score inherent risk, apply controls, compute residual risk, choose a treatment (accept/mitigate/transfer/avoid) and defend it to a heat map.',
    modules: [
      { id: 'm-riskreg-1', title: 'Scoring Risk', weekLabel: 'Week 1',
        lessons: [
          L('rr-anatomy', 'reading', 'Anatomy of a risk register', 10),
          L('rr-inherent-residual', 'reading', 'Inherent vs residual risk', 9),
          L('lab-risk-register', 'lab', 'LAB: Score & treat a live register', 22, { labId: 'risk-register' }),
        ]},
      { id: 'm-riskreg-2', title: 'Treatment & Reporting', weekLabel: 'Week 2',
        lessons: [
          L('rr-treatment', 'reading', 'The four treatment options', 8),
          L('rr-heatmap', 'reading', 'Reading & building heat maps', 9),
          L('rr-quiz', 'quiz', 'Checkpoint: register mastery', 6),
        ]},
    ],
  },

  // ---------------------------------------------------------------- SECURITY
  {
    id: 'c-secfound', track: 't-sec', icon: '🔐', level: 'Beginner',
    title: 'Security Foundations for GRC Professionals',
    subtitle: "You can't assess a control you don't understand.",
    rating: 4.8, learners: 33110, weeks: 3, hours: 10,
    tags: ['CIA Triad', 'IAM', 'SecOps', 'Cloud'],
    skills: ['CIA triad', 'Identity & access', 'Security operations', 'Cloud shared responsibility'],
    description:
      'The technical literacy a senior GRC pro needs. CIA triad, identity and access management, security operations, encryption basics, and the cloud shared-responsibility model — taught for auditors, not engineers.',
    modules: [
      { id: 'm-secfound-1', title: 'Core Security Concepts', weekLabel: 'Week 1',
        lessons: [
          L('cia-triad', 'reading', 'The CIA triad & security objectives', 11),
          L('iam-basics', 'reading', 'Identity & access management', 12),
          L('sec-quiz-1', 'quiz', 'Checkpoint: CIA & IAM', 6),
        ]},
      { id: 'm-secfound-2', title: 'Operations & Cloud', weekLabel: 'Week 2',
        lessons: [
          L('secops', 'reading', 'Security operations & monitoring', 11),
          L('cloud-shared', 'reading', 'Cloud shared responsibility model', 10),
          L('lab-arch-review', 'lab', 'LAB: Cloud Architecture Review (find the flaws)', 24, { labId: 'arch-review' }),
        ]},
      { id: 'm-secfound-3', title: 'Resilience', weekLabel: 'Week 3',
        lessons: [
          L('continuity-basics', 'reading', 'Business continuity & disaster recovery basics', 11),
          L('lab-incident', 'lab', 'LAB: Incident Response (beat the clock)', 20, { labId: 'incident' }),
        ]},
    ],
  },

  // ---------------------------------------------------------------- FRAMEWORKS
  {
    id: 'c-iso27001', track: 't-frame', icon: '📘', level: 'Intermediate',
    title: 'ISO/IEC 27001:2022 — The ISMS Standard',
    subtitle: 'Design and run an ISMS that passes audit with confidence.',
    rating: 4.9, learners: 39880, weeks: 4, hours: 14,
    tags: ['ISMS', 'Annex A', 'Statement of Applicability', 'Certification'],
    skills: ['ISMS design', 'Annex A controls', 'SoA', 'Risk treatment plan', 'Certification path'],
    description:
      'The world’s leading information-security management standard. Understand clauses 4–10, the 93 Annex A controls, build a Statement of Applicability, run a risk treatment plan, and walk the road to certification. Modelled on a Lead Implementer bootcamp.',
    modules: [
      { id: 'm-iso-1', title: 'The Management System', weekLabel: 'Week 1',
        lessons: [
          L('iso27001', 'reading', 'ISO 27001 overview & the ISMS', 13),
          L('iso-clauses', 'reading', 'Clauses 4–10: the mandatory core', 12),
          L('iso-quiz-1', 'quiz', 'Checkpoint: clauses', 6),
        ]},
      { id: 'm-iso-2', title: 'Annex A Controls', weekLabel: 'Week 2',
        lessons: [
          L('iso-annexa', 'reading', 'The 93 Annex A controls (4 themes)', 14),
          L('iso-soa', 'reading', 'Building the Statement of Applicability', 12),
          L('why-not-annexa', 'reading', 'Why NOT to start from Annex A (+ NIST 800-53 companion)', 10),
        ]},
      { id: 'm-iso-3', title: 'Risk Treatment', weekLabel: 'Week 3',
        lessons: [
          L('iso-rtp', 'reading', 'Risk treatment plan', 11),
          L('lab-evidence', 'lab', 'LAB: Audit Evidence (satisfy the auditor)', 20, { labId: 'evidence' }),
        ]},
      { id: 'm-iso-4', title: 'Certification', weekLabel: 'Week 4',
        lessons: [
          L('iso-cert', 'reading', 'Stage 1 & Stage 2 certification audits', 12),
          L('iso-quiz-2', 'quiz', 'Final checkpoint: ISMS mastery', 8),
        ]},
    ],
  },
  {
    id: 'c-nistcsf', track: 't-frame', icon: '🏛️', level: 'Intermediate',
    title: 'NIST Cybersecurity Framework (CSF) 2.0',
    subtitle: 'Govern, Identify, Protect, Detect, Respond, Recover.',
    rating: 4.8, learners: 27600, weeks: 2, hours: 7,
    tags: ['NIST CSF', 'Functions', 'Tiers', 'Profiles'],
    skills: ['Six CSF functions', 'Implementation tiers', 'Profiles', 'Framework mapping'],
    description:
      'The most widely adopted voluntary cybersecurity framework. Master all six functions (including the new GOVERN function added in 2.0), implementation tiers, and how to build current/target profiles.',
    modules: [
      { id: 'm-csf-1', title: 'The Six Functions', weekLabel: 'Week 1',
        lessons: [
          L('nist-csf', 'reading', 'NIST CSF 2.0 overview & functions', 12),
          L('csf-govern', 'reading', 'The GOVERN function (new in 2.0)', 9),
          L('csf-quiz', 'quiz', 'Checkpoint: functions', 6),
        ]},
      { id: 'm-csf-2', title: 'Tiers & Profiles', weekLabel: 'Week 2',
        lessons: [
          L('csf-tiers', 'reading', 'Implementation tiers & profiles', 10),
          L('lab-mapping', 'lab', 'LAB: Control Mapping across frameworks', 20, { labId: 'mapping' }),
        ]},
    ],
  },
  {
    id: 'c-soc2', track: 't-frame', icon: '🧾', level: 'Intermediate',
    title: 'SOC 2: Trust Services Criteria',
    subtitle: 'The report every SaaS buyer asks for.',
    rating: 4.7, learners: 19430, weeks: 2, hours: 6,
    tags: ['SOC 2', 'Trust Services', 'Type I vs II'],
    skills: ['Trust Services Criteria', 'Type I vs Type II', 'Evidence', 'Auditor relationship'],
    description:
      'Understand the five Trust Services Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy), the difference between Type I and Type II, and what an auditor actually tests.',
    modules: [
      { id: 'm-soc2-1', title: 'Foundations', weekLabel: 'Week 1',
        lessons: [
          L('soc2', 'reading', 'SOC 2 & the Trust Services Criteria', 12),
          L('soc2-types', 'reading', 'Type I vs Type II', 8),
          L('soc2-quiz', 'quiz', 'Checkpoint: SOC 2', 6),
        ]},
      { id: 'm-soc2-2', title: 'Getting Audit-Ready', weekLabel: 'Week 2',
        lessons: [
          L('soc2-evidence', 'reading', 'Evidence & the observation period', 10),
          L('lab-crosswalk', 'lab', 'LAB: Cross-Framework Crosswalk', 18, { labId: 'crosswalk' }),
        ]},
    ],
  },
  {
    id: 'c-gdpr', track: 't-frame', icon: '🛡️', level: 'Intermediate',
    title: 'GDPR & Global Data Privacy',
    subtitle: 'Lawful basis, data subject rights, breach response.',
    rating: 4.8, learners: 30120, weeks: 3, hours: 9,
    tags: ['GDPR', 'Privacy', 'DPIA', 'Data Subject Rights'],
    skills: ['Lawful basis', 'Data subject rights', 'DPIA', 'Breach notification', 'ROPA'],
    description:
      'The benchmark privacy law. Lawful bases, the rights of data subjects, records of processing (ROPA), data protection impact assessments (DPIA), controller vs processor, and 72-hour breach notification — plus how CCPA, LGPD and DPDPA compare.',
    modules: [
      { id: 'm-gdpr-1', title: 'Principles & Bases', weekLabel: 'Week 1',
        lessons: [
          L('gdpr', 'reading', 'GDPR principles & lawful bases', 13),
          L('gdpr-rights', 'reading', 'Data subject rights', 10),
          L('gdpr-quiz-1', 'quiz', 'Checkpoint: bases & rights', 6),
        ]},
      { id: 'm-gdpr-2', title: 'Accountability', weekLabel: 'Week 2',
        lessons: [
          L('gdpr-ropa-dpia', 'reading', 'ROPA & DPIA', 11),
          L('gdpr-breach', 'reading', '72-hour breach notification', 9),
        ]},
      { id: 'm-gdpr-3', title: 'The Global Picture', weekLabel: 'Week 3',
        lessons: [
          L('privacy-global', 'reading', 'CCPA, LGPD, DPDPA at a glance', 10),
          L('gdpr-quiz-2', 'quiz', 'Checkpoint: global privacy', 6),
        ]},
    ],
  },

  // ---------------------------------------------------------------- OPERATIONS
  {
    id: 'c-audit', track: 't-ops', icon: '🔎', level: 'Intermediate',
    title: 'Audit, Evidence & Findings',
    subtitle: 'How audits actually run — and how to survive one.',
    rating: 4.8, learners: 22890, weeks: 3, hours: 9,
    tags: ['Audit', 'Evidence', 'Findings', 'CAPA'],
    skills: ['Audit lifecycle', 'Objective evidence', 'Writing findings', 'Corrective action'],
    description:
      'Walk an audit from planning to report. Learn what counts as objective evidence, how findings and nonconformities are graded, and how corrective and preventive action (CAPA) closes the loop.',
    modules: [
      { id: 'm-audit-1', title: 'The Audit Lifecycle', weekLabel: 'Week 1',
        lessons: [
          L('audit-evidence', 'reading', 'Audits, evidence & findings', 13),
          L('audit-types', 'reading', 'Internal, external & certification audits', 10),
          L('audit-quiz-1', 'quiz', 'Checkpoint: audit basics', 6),
        ]},
      { id: 'm-audit-2', title: 'Evidence in Practice', weekLabel: 'Week 2',
        lessons: [
          L('audit-evidence-types', 'reading', 'Types of objective evidence', 10),
          L('lab-audit-sim', 'lab', 'LAB: Audit Simulator', 25, { labId: 'audit-sim' }),
        ]},
      { id: 'm-audit-3', title: 'Closing Findings', weekLabel: 'Week 3',
        lessons: [
          L('audit-capa', 'reading', 'Findings, nonconformities & CAPA', 11),
          L('audit-quiz-2', 'quiz', 'Checkpoint: findings', 6),
        ]},
    ],
  },
  {
    id: 'c-policy', track: 't-ops', icon: '📜', level: 'Beginner',
    title: 'Policies, Standards & Procedures',
    subtitle: 'Write governance documents people actually follow.',
    rating: 4.6, learners: 14200, weeks: 2, hours: 5,
    tags: ['Policy', 'Standards', 'Procedures', 'Lifecycle'],
    skills: ['Policy hierarchy', 'Policy lifecycle', 'Enforceable language', 'Acknowledgements'],
    description:
      'The document pyramid — policy, standard, procedure, guideline — and the lifecycle that keeps them alive: draft, approve, publish, acknowledge, review. Learn to spot filler clauses that make a policy unenforceable.',
    modules: [
      { id: 'm-policy-1', title: 'The Document Pyramid', weekLabel: 'Week 1',
        lessons: [
          L('policies', 'reading', 'Policies, standards & procedures', 11),
          L('policy-lifecycle', 'reading', 'The policy lifecycle', 9),
          L('lab-policy', 'lab', 'LAB: Policy Builder (reject the filler)', 18, { labId: 'policy' }),
        ]},
      { id: 'm-policy-2', title: 'Making Them Stick', weekLabel: 'Week 2',
        lessons: [
          L('policy-enforce', 'reading', 'Enforceable language & acknowledgements', 9),
          L('policy-quiz', 'quiz', 'Checkpoint: policy', 6),
        ]},
    ],
  },
  {
    id: 'c-tprm', track: 't-ops', icon: '🤝', level: 'Intermediate',
    title: 'Third-Party & Vendor Risk Management (TPRM)',
    subtitle: 'Your risk is only as strong as your weakest supplier.',
    rating: 4.7, learners: 17650, weeks: 3, hours: 8,
    tags: ['TPRM', 'Vendor Risk', 'Due Diligence', 'Concentration Risk'],
    skills: ['Vendor tiering', 'Due-diligence questionnaires', 'Ongoing monitoring', 'Concentration risk'],
    description:
      'Assess, tier and monitor the vendors your organisation depends on. Build a due-diligence questionnaire, grade responses, track issues, and manage concentration and fourth-party risk.',
    modules: [
      { id: 'm-tprm-1', title: 'The Vendor Lifecycle', weekLabel: 'Week 1',
        lessons: [
          L('tprm-intro', 'reading', 'Why third-party risk dominates modern breaches', 11),
          L('tprm-tiering', 'reading', 'Tiering vendors by criticality', 10),
          L('tprm-quiz-1', 'quiz', 'Checkpoint: TPRM basics', 6),
        ]},
      { id: 'm-tprm-2', title: 'Due Diligence', weekLabel: 'Week 2',
        lessons: [
          L('tprm-ddq', 'reading', 'Due-diligence questionnaires & evidence', 11),
          L('lab-vendor', 'lab', 'LAB: Vendor Risk Assessment', 22, { labId: 'vendor' }),
        ]},
      { id: 'm-tprm-3', title: 'Ongoing Monitoring', weekLabel: 'Week 3',
        lessons: [
          L('tprm-monitor', 'reading', 'Continuous monitoring & concentration risk', 10),
          L('tprm-quiz-2', 'quiz', 'Checkpoint: monitoring', 6),
        ]},
    ],
  },

  // ---------------------------------------------------------------- ENTERPRISE
  {
    id: 'c-bcm', track: 't-ent', icon: '♻️', level: 'Advanced',
    title: 'Business Continuity Management (ISO 22301)',
    subtitle: 'Keep the business running when everything breaks.',
    rating: 4.7, learners: 12400, weeks: 3, hours: 8,
    tags: ['ISO 22301', 'BIA', 'RTO/RPO', 'DRP'],
    skills: ['Business impact analysis', 'RTO/RPO targets', 'BCP & DRP', 'Exercising plans'],
    description:
      'Design a business continuity management system to ISO 22301. Run a business impact analysis, set RTO/RPO targets, write BCP and DRP plans, and exercise them so they work under real pressure.',
    modules: [
      { id: 'm-bcm-1', title: 'Impact & Objectives', weekLabel: 'Week 1',
        lessons: [
          L('bcm-intro', 'reading', 'BCM & ISO 22301 overview', 12),
          L('bcm-bia', 'reading', 'Business impact analysis & RTO/RPO', 12),
          L('bcm-quiz-1', 'quiz', 'Checkpoint: BIA', 6),
        ]},
      { id: 'm-bcm-2', title: 'Plans & Recovery', weekLabel: 'Week 2',
        lessons: [
          L('bcm-plans', 'reading', 'BCP, DRP & recovery strategies', 11),
          L('bcm-exercise', 'reading', 'Exercising & maintaining plans', 9),
          L('bcm-quiz-2', 'quiz', 'Checkpoint: continuity', 6),
        ]},
      { id: 'm-bcm-3', title: 'Scenario', weekLabel: 'Week 3',
        lessons: [
          L('lab-incident-2', 'lab', 'LAB: Crisis Simulation', 22, { labId: 'incident' }),
        ]},
    ],
  },
  {
    id: 'c-intaudit', track: 't-ent', icon: '📊', level: 'Advanced',
    title: 'Internal Audit Management (IIA Standards)',
    subtitle: 'Run the third line that assures the board.',
    rating: 4.6, learners: 9800, weeks: 3, hours: 8,
    tags: ['Internal Audit', 'IIA', 'Audit Plan', 'Assurance'],
    skills: ['Risk-based audit plan', 'Working papers', 'IIA standards', 'Board reporting'],
    description:
      'The internal audit function explained: independence, the risk-based annual audit plan, fieldwork and working papers, and reporting assurance to the audit committee under the IIA Global Internal Audit Standards.',
    modules: [
      { id: 'm-ia-1', title: 'Mandate & Independence', weekLabel: 'Week 1',
        lessons: [
          L('ia-intro', 'reading', 'Internal audit mandate & independence', 12),
          L('ia-plan', 'reading', 'The risk-based audit plan', 10),
          L('ia-quiz-1', 'quiz', 'Checkpoint: mandate', 6),
        ]},
      { id: 'm-ia-2', title: 'Fieldwork', weekLabel: 'Week 2',
        lessons: [
          L('ia-fieldwork', 'reading', 'Fieldwork, sampling & working papers', 11),
          L('lab-audit-sim-2', 'lab', 'LAB: Audit Simulator (advanced)', 25, { labId: 'audit-sim' }),
        ]},
      { id: 'm-ia-3', title: 'Reporting', weekLabel: 'Week 3',
        lessons: [
          L('ia-report', 'reading', 'Reporting to the audit committee', 10),
          L('ia-quiz-2', 'quiz', 'Checkpoint: reporting', 6),
        ]},
    ],
  },
  {
    id: 'c-fincontrols', track: 't-ent', icon: '💰', level: 'Advanced',
    title: 'Financial Controls: SOX, COSO & ICFR',
    subtitle: 'The controls that keep financial statements honest.',
    rating: 4.6, learners: 8300, weeks: 3, hours: 8,
    tags: ['SOX', 'COSO', 'ICFR', 'Basel III'],
    skills: ['SOX 404', 'COSO framework', 'ICFR', 'Control testing', 'Segregation of duties'],
    description:
      'Sarbanes-Oxley, the COSO internal-control framework, and internal control over financial reporting (ICFR). Learn key controls, segregation of duties, and how financial-controls testing differs from IT-controls testing.',
    modules: [
      { id: 'm-fc-1', title: 'SOX & COSO', weekLabel: 'Week 1',
        lessons: [
          L('fc-sox', 'reading', 'SOX & the COSO framework', 12),
          L('fc-icfr', 'reading', 'ICFR & key controls', 11),
          L('fc-quiz-1', 'quiz', 'Checkpoint: SOX/COSO', 6),
        ]},
      { id: 'm-fc-2', title: 'Testing', weekLabel: 'Week 2',
        lessons: [
          L('fc-sod', 'reading', 'Segregation of duties & control testing', 11),
          L('lab-control-test', 'lab', 'LAB: Control Testing', 20, { labId: 'evidence' }),
        ]},
      { id: 'm-fc-3', title: 'Beyond SOX', weekLabel: 'Week 3',
        lessons: [
          L('fc-basel', 'reading', 'A word on Basel III & operational risk', 9),
          L('fc-quiz-2', 'quiz', 'Checkpoint: financial controls', 6),
        ]},
    ],
  },
  {
    id: 'c-oprisk', track: 't-ent', icon: '⚙️', level: 'Advanced',
    title: 'Operational & Model Risk Governance',
    subtitle: 'Basel III op-risk, ERM, and governing AI/ML models.',
    rating: 4.5, learners: 6100, weeks: 2, hours: 6,
    tags: ['Operational Risk', 'COSO ERM', 'Model Risk', 'SR 11-7'],
    skills: ['Operational risk', '5×5 heat maps', 'ERM', 'Model risk (SR 11-7)'],
    description:
      'Operational risk management under Basel III and COSO ERM, plus model risk governance (SR 11-7, ECB guidance) — the discipline of validating and overseeing the AI/ML and quantitative models a business runs on.',
    modules: [
      { id: 'm-or-1', title: 'Operational Risk', weekLabel: 'Week 1',
        lessons: [
          L('or-intro', 'reading', 'Operational risk & COSO ERM', 12),
          L('or-heatmap', 'reading', '5×5 heat maps & risk appetite', 9),
          L('or-quiz-1', 'quiz', 'Checkpoint: op risk', 6),
        ]},
      { id: 'm-or-2', title: 'Model Risk', weekLabel: 'Week 2',
        lessons: [
          L('or-model', 'reading', 'Model risk governance (SR 11-7)', 11),
          L('or-quiz-2', 'quiz', 'Checkpoint: model risk', 6),
        ]},
    ],
  },

  // ---------------------------------------------------------------- AI GOV
  {
    id: 'c-aigov', track: 't-ai', icon: '🤖', level: 'Advanced',
    title: 'AI Governance: EU AI Act, NIST AI RMF & ISO 42001',
    subtitle: 'Govern AI systems with the newest management standard.',
    rating: 4.9, learners: 15900, weeks: 4, hours: 12,
    tags: ['EU AI Act', 'NIST AI RMF', 'ISO 42001', 'AI Risk'],
    skills: ['AI risk classification', 'AI RMF functions', 'AIMS (ISO 42001)', 'Bias detection', 'AI registries'],
    description:
      'The fastest-growing GRC domain. Classify AI systems under the EU AI Act, apply the four NIST AI RMF functions, stand up an AI management system to ISO 42001, detect bias, and run an AI risk registry — hands-on.',
    modules: [
      { id: 'm-ai-1', title: 'The AI Risk Landscape', weekLabel: 'Week 1',
        lessons: [
          L('ai-intro', 'reading', 'Why AI needs its own governance', 12),
          L('ai-euact', 'reading', 'EU AI Act risk tiers', 13),
          L('ai-quiz-1', 'quiz', 'Checkpoint: AI Act', 6),
        ]},
      { id: 'm-ai-2', title: 'Frameworks', weekLabel: 'Week 2',
        lessons: [
          L('ai-nistrmf', 'reading', 'NIST AI RMF: Govern, Map, Measure, Manage', 12),
          L('ai-iso42001', 'reading', 'ISO 42001 AI management system', 11),
          L('lab-mapping-ai', 'lab', 'LAB: Map controls to AI RMF functions', 20, { labId: 'mapping' }),
        ]},
      { id: 'm-ai-3', title: 'AI Risk in Practice', weekLabel: 'Week 3',
        lessons: [
          L('ai-registry', 'reading', 'Building an AI system registry', 10),
          L('lab-shadow-ai', 'lab', 'LAB: Shadow AI Discovery (scan the office)', 22, { labId: 'shadow-ai' }),
        ]},
      { id: 'm-ai-4', title: 'Fairness & Incidents', weekLabel: 'Week 4',
        lessons: [
          L('ai-bias', 'reading', 'Bias, fairness & disparate impact', 11),
          L('lab-bias', 'lab', 'LAB: Bias Detection', 20, { labId: 'bias' }),
          L('ai-quiz-2', 'quiz', 'Final checkpoint: AI governance', 8),
        ]},
    ],
  },

  // ---------------------------------------------------------------- CAREER
  {
    id: 'c-career', track: 't-career', icon: '🎓', level: 'Capstone',
    title: 'GRC Career Mastery & Interview Prep',
    subtitle: 'Board reporting, program building, and landing the role.',
    rating: 4.8, learners: 20450, weeks: 3, hours: 8,
    tags: ['Interview', 'Board Reporting', 'Risk Appetite', 'Portfolio'],
    skills: ['Risk appetite statements', 'Board reporting', 'Program building', 'Interview mastery'],
    description:
      'Turn knowledge into a career. Write a risk appetite statement, report to a board, design a GRC program from scratch, and prepare for senior-manager interviews with a curated question bank and a portfolio capstone.',
    modules: [
      { id: 'm-car-1', title: 'Leading a Program', weekLabel: 'Week 1',
        lessons: [
          L('car-appetite', 'reading', 'Risk appetite & tolerance statements', 11),
          L('car-board', 'reading', 'Reporting to the board', 10),
          L('car-quiz-1', 'quiz', 'Checkpoint: leadership', 6),
        ]},
      { id: 'm-car-2', title: 'Interview Mastery', weekLabel: 'Week 2',
        lessons: [
          L('car-interview', 'reading', 'The GRC interview question bank', 12),
          L('lab-interview', 'lab', 'LAB: Interview Simulator', 25, { labId: 'interview' }),
        ]},
      { id: 'm-car-3', title: 'Capstone', weekLabel: 'Week 3',
        lessons: [
          L('car-capstone-brief', 'reading', 'Capstone brief: build a fintech GRC program', 10),
          L('lab-capstone', 'lab', 'LAB: Capstone — Full GRC Lifecycle', 40, { labId: 'capstone' }),
        ]},
    ],
  },
]

// ---- derived indexes -------------------------------------------------------
export const COURSE_BY_ID = Object.fromEntries(COURSES.map((c) => [c.id, c]))

export function coursesInTrack(trackId) {
  return COURSES.filter((c) => c.track === trackId)
}

export function allLessons(course) {
  return course.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id })))
}

export function courseLessonCount(course) {
  return course.modules.reduce((n, m) => n + m.lessons.length, 0)
}

// flat lesson lookup across all courses (for the lesson route)
export const LESSON_INDEX = (() => {
  const idx = {}
  for (const c of COURSES) {
    const flat = allLessons(c)
    flat.forEach((l, i) => {
      idx[l.id] = { courseId: c.id, lesson: l, order: i, flat }
    })
  }
  return idx
})()
