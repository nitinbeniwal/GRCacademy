// ============================================================================
//  GRC ACADEMY — Curriculum
//  DOMAINS -> CERTIFICATIONS (levels, TryHackMe-style) -> COURSES -> MODULES -> LESSONS
//  Lesson bodies live in ./lessons/*. This file is the catalog + skeleton.
// ============================================================================
import type {
  Course,
  Lesson,
  LessonType,
  LabId,
  Certification,
  Domain,
  DomainId,
} from '../types'
import { lessonContent } from './lessons/index'

/** Attach authored body/quiz to a lesson stub. */
function L(id: string, type: LessonType, title: string, minutes: number, extra: Partial<Lesson> = {}): Lesson {
  return { id, type, title, minutes, ...lessonContent[id], ...extra }
}
function lab(id: string, title: string, minutes: number, labId: LabId): Lesson {
  return { id, type: 'lab', title, minutes, labId }
}

// ============================================================================
//  DOMAINS — top-level GRC categories (expandable)
// ============================================================================
export const DOMAINS: Domain[] = [
  { id: 'core', title: 'Core GRC', tagline: 'The foundation every GRC career is built on.', icon: '🧭', color: 'from-cblue to-violet-600', status: 'available' },
  { id: 'ai', title: 'AI Governance', tagline: 'Govern AI systems — the fastest-growing GRC discipline.', icon: '🤖', color: 'from-fuchsia-500 to-purple-600', status: 'available' },
  { id: 'cloud', title: 'Cloud GRC', tagline: 'Compliance for cloud-native and multi-cloud estates.', icon: '☁️', color: 'from-sky-500 to-cyan-600', status: 'available' },
]

// ============================================================================
//  CERTIFICATIONS — leveled learning paths (like SAL1 / PT1)
// ============================================================================
export const CERTIFICATIONS: Certification[] = [
  {
    id: 'GRC1', code: 'GRC1', domainId: 'core', title: 'GRC Analyst', level: 1, tier: 'Foundation',
    icon: '🧭', color: 'from-sky-500 to-cblue',
    blurb: 'Start from zero. The language, mental models and core machinery of governance, risk and compliance.',
    outcomes: ['Explain what GRC is and why it exists', 'Build and score a risk register', 'Read a control and its purpose', 'Write an enforceable policy'],
    courseIds: ['c-grc101', 'c-riskreg', 'c-secfound', 'c-policy'], status: 'available',
    price: 2999, listPrice: 4999, priceNote: 'Foundation tier · lifetime access',
  },
  {
    id: 'GRC2', code: 'GRC2', domainId: 'core', title: 'GRC Practitioner', level: 2, tier: 'Practitioner',
    icon: '🛡️', color: 'from-violet-500 to-indigo-600',
    blurb: 'The frameworks and day-to-day operations. Run audits, evidence controls, and manage vendor risk to real standards.',
    outcomes: ['Apply ISO 27001, NIST CSF, SOC 2, GDPR and PCI DSS', 'Run an audit and evidence controls', 'Manage third-party risk', 'Map controls across frameworks'],
    courseIds: ['c-iso27001', 'c-nistcsf', 'c-soc2', 'c-gdpr', 'c-dpdpa', 'c-hipaa', 'c-pcidss', 'c-audit', 'c-tprm'], status: 'available',
    price: 5999, listPrice: 9999, priceNote: 'Practitioner tier · 9 frameworks · lifetime access',
  },
  {
    id: 'GRCL', code: 'GRCL', domainId: 'core', title: 'GRC Lead', level: 3, tier: 'Lead',
    icon: '👑', color: 'from-slate-700 to-night-800',
    blurb: 'Lead a program. Enterprise risk domains, continuity, internal audit, financial controls, board reporting and interview mastery.',
    outcomes: ['Run BCM, internal audit and financial-controls programs', 'Set risk appetite and report to a board', 'Build a GRC program from zero', 'Ace a senior GRC interview'],
    courseIds: ['c-bcm', 'c-intaudit', 'c-fincontrols', 'c-oprisk', 'c-career'], status: 'available',
    price: 9999, listPrice: 15999, priceNote: 'Lead tier · capstone + interview prep · lifetime access',
  },
  {
    id: 'AIG1', code: 'AIG1', domainId: 'ai', title: 'AI Governance Associate', level: 1, tier: 'Associate',
    icon: '🤖', color: 'from-fuchsia-500 to-purple-600',
    blurb: 'Govern AI systems: classify risk under the EU AI Act, apply the NIST AI RMF, detect bias and run an AI registry.',
    outcomes: ['Classify AI risk under the EU AI Act', 'Apply the four NIST AI RMF functions', 'Detect bias and disparate impact', 'Build an AI system registry'],
    courseIds: ['c-aigov'], status: 'available',
    price: 4999, listPrice: 7999, priceNote: 'Associate tier · EU AI Act + NIST AI RMF · lifetime access',
  },
  {
    id: 'AIG2', code: 'AIG2', domainId: 'ai', title: 'AI Governance Professional', level: 2, tier: 'Professional',
    icon: '🧠', color: 'from-purple-600 to-indigo-700',
    blurb: 'Go deep: stand up a certifiable ISO 42001 AI Management System and operationalise the NIST AI RMF end to end.',
    outcomes: ['Implement an ISO 42001 AIMS', 'Run an AI impact assessment', 'Operationalise Govern/Map/Measure/Manage', 'Map AI controls to the EU AI Act'],
    courseIds: ['c-iso42001', 'c-airmf'], status: 'available',
    price: 8999, listPrice: 13999, priceNote: 'Professional tier · ISO 42001 AIMS · lifetime access',
  },
  {
    id: 'CLD1', code: 'CLD1', domainId: 'cloud', title: 'Cloud GRC Associate', level: 1, tier: 'Associate',
    icon: '☁️', color: 'from-sky-500 to-cyan-600',
    blurb: 'Compliance for cloud estates: shared responsibility, the CSA CCM, CSPM, CIS Benchmarks and FedRAMP cloud authorisation.',
    outcomes: ['Cloud shared responsibility at depth', 'Govern multi-cloud with the CSA CCM', 'CSPM & misconfiguration risk', 'FedRAMP & cloud authorisation'],
    courseIds: ['c-cloudfound', 'c-cspm', 'c-fedramp'], status: 'available',
    price: 4999, listPrice: 7999, priceNote: 'Associate tier · cloud frameworks · lifetime access',
  },
]

// ============================================================================
//  COURSES
// ============================================================================
export const COURSES: Course[] = [
  // ---------------------------------------------------------------- GRC1
  {
    id: 'c-grc101', certId: 'GRC1', domainId: 'core', icon: '🧭', level: 'Beginner',
    title: 'GRC Fundamentals: Governance, Risk & Compliance',
    subtitle: 'The mental model that everything else hangs on.',
    rating: 4.9, learners: 48210, weeks: 3, hours: 9,
    tags: ['Governance', 'Risk', 'Compliance', 'Three Lines'],
    skills: ['Risk thinking', 'Control basics', 'GRC vocabulary', 'Three Lines Model'],
    description:
      'Start from absolute zero. Learn what governance, risk, and compliance really mean, how they fit together, why organisations spend fortunes on them, and the core machinery — the Three Lines Model, risk registers, and controls — that every later course builds on.',
    modules: [
      { id: 'm-grc101-1', title: 'Why GRC Exists', weekLabel: 'Module 1', lessons: [
        L('grc-intro', 'reading', 'What is GRC & why it exists', 12),
        L('grc-gov-vs-risk-vs-comp', 'reading', 'Governance vs Risk vs Compliance', 10),
        L('grc-quiz-1', 'quiz', 'Checkpoint: the GRC mindset', 6),
      ]},
      { id: 'm-grc101-2', title: 'The Core Machinery', weekLabel: 'Module 2', lessons: [
        L('three-lines', 'reading', 'The Three Lines Model', 11),
        L('risk-fundamentals', 'reading', 'Risk management fundamentals', 14),
        lab('lab-risk-matrix', 'LAB: Risk Assessment Matrix', 20, 'risk-matrix'),
      ]},
      { id: 'm-grc101-3', title: 'Controls', weekLabel: 'Module 3', lessons: [
        L('controls-101', 'reading', 'Controls 101: preventive, detective, corrective', 13),
        L('req-vs-controls', 'reading', 'Requirements vs Controls (the audit-killer mistake)', 10),
        L('grc-quiz-2', 'quiz', 'Checkpoint: controls & requirements', 6),
      ]},
    ],
  },
  {
    id: 'c-riskreg', certId: 'GRC1', domainId: 'core', icon: '📋', level: 'Beginner',
    title: 'Risk Registers & Risk Assessment in Practice',
    subtitle: 'Build and run a real risk register end to end.',
    rating: 4.8, learners: 21540, weeks: 2, hours: 6,
    tags: ['Risk Register', 'Heat Map', 'Treatment'],
    skills: ['Inherent vs residual risk', 'Likelihood × impact', 'Risk treatment', 'Heat maps'],
    description:
      'Hands-on with the single most important artifact in GRC: the risk register. Score inherent risk, apply controls, compute residual risk, choose a treatment (accept/mitigate/transfer/avoid) and defend it to a heat map.',
    modules: [
      { id: 'm-riskreg-1', title: 'Scoring Risk', weekLabel: 'Module 1', lessons: [
        L('rr-anatomy', 'reading', 'Anatomy of a risk register', 10),
        L('rr-inherent-residual', 'reading', 'Inherent vs residual risk', 9),
        lab('lab-risk-register', 'LAB: Score & treat a live register', 22, 'risk-register'),
      ]},
      { id: 'm-riskreg-2', title: 'Treatment & Reporting', weekLabel: 'Module 2', lessons: [
        L('rr-treatment', 'reading', 'The four treatment options', 8),
        L('rr-heatmap', 'reading', 'Reading & building heat maps', 9),
        L('rr-quiz', 'quiz', 'Checkpoint: register mastery', 6),
      ]},
    ],
  },
  {
    id: 'c-secfound', certId: 'GRC1', domainId: 'core', icon: '🔐', level: 'Beginner',
    title: 'Security Foundations for GRC Professionals',
    subtitle: "You can't assess a control you don't understand.",
    rating: 4.8, learners: 33110, weeks: 3, hours: 10,
    tags: ['CIA Triad', 'IAM', 'SecOps', 'Cloud'],
    skills: ['CIA triad', 'Identity & access', 'Security operations', 'Cloud shared responsibility'],
    description:
      'The technical literacy a senior GRC pro needs. CIA triad, identity and access management, security operations, encryption basics, and the cloud shared-responsibility model — taught for auditors, not engineers.',
    modules: [
      { id: 'm-secfound-1', title: 'Core Security Concepts', weekLabel: 'Module 1', lessons: [
        L('cia-triad', 'reading', 'The CIA triad & security objectives', 11),
        L('iam-basics', 'reading', 'Identity & access management', 12),
        L('sec-quiz-1', 'quiz', 'Checkpoint: CIA & IAM', 6),
      ]},
      { id: 'm-secfound-2', title: 'Operations & Cloud', weekLabel: 'Module 2', lessons: [
        L('secops', 'reading', 'Security operations & monitoring', 11),
        L('cloud-shared', 'reading', 'Cloud shared responsibility model', 10),
        lab('lab-arch-review', 'LAB: Cloud Architecture Review (find the flaws)', 24, 'arch-review'),
      ]},
      { id: 'm-secfound-3', title: 'Resilience', weekLabel: 'Module 3', lessons: [
        L('continuity-basics', 'reading', 'Business continuity & disaster recovery basics', 11),
        lab('lab-incident', 'LAB: Incident Response (beat the clock)', 20, 'incident'),
      ]},
    ],
  },
  {
    id: 'c-policy', certId: 'GRC1', domainId: 'core', icon: '📜', level: 'Beginner',
    title: 'Policies, Standards & Procedures',
    subtitle: 'Write governance documents people actually follow.',
    rating: 4.6, learners: 14200, weeks: 2, hours: 5,
    tags: ['Policy', 'Standards', 'Procedures', 'Lifecycle'],
    skills: ['Policy hierarchy', 'Policy lifecycle', 'Enforceable language', 'Acknowledgements'],
    description:
      'The document pyramid — policy, standard, procedure, guideline — and the lifecycle that keeps them alive: draft, approve, publish, acknowledge, review. Learn to spot filler clauses that make a policy unenforceable.',
    modules: [
      { id: 'm-policy-1', title: 'The Document Pyramid', weekLabel: 'Module 1', lessons: [
        L('policies', 'reading', 'Policies, standards & procedures', 11),
        L('policy-lifecycle', 'reading', 'The policy lifecycle', 9),
        lab('lab-policy', 'LAB: Policy Builder (reject the filler)', 18, 'policy'),
      ]},
      { id: 'm-policy-2', title: 'Making Them Stick', weekLabel: 'Module 2', lessons: [
        L('policy-enforce', 'reading', 'Enforceable language & acknowledgements', 9),
        L('policy-quiz', 'quiz', 'Checkpoint: policy', 6),
      ]},
    ],
  },

  // ---------------------------------------------------------------- GRC2
  {
    id: 'c-iso27001', certId: 'GRC2', domainId: 'core', icon: '📘', level: 'Intermediate',
    title: 'ISO/IEC 27001:2022 — The ISMS Standard',
    subtitle: 'Design and run an ISMS that passes audit with confidence.',
    rating: 4.9, learners: 39880, weeks: 4, hours: 14,
    tags: ['ISMS', 'Annex A', 'Statement of Applicability', 'Certification'],
    skills: ['ISMS design', 'Annex A controls', 'SoA', 'Risk treatment plan', 'Certification path'],
    description:
      'The world’s leading information-security management standard. Understand clauses 4–10, the 93 Annex A controls, build a Statement of Applicability, run a risk treatment plan, and walk the road to certification.',
    modules: [
      { id: 'm-iso-1', title: 'The Management System', weekLabel: 'Module 1', lessons: [
        L('iso27001', 'reading', 'ISO 27001 overview & the ISMS', 13),
        L('iso-clauses', 'reading', 'Clauses 4–10: the mandatory core', 12),
        L('iso-quiz-1', 'quiz', 'Checkpoint: clauses', 6),
      ]},
      { id: 'm-iso-2', title: 'Annex A Controls', weekLabel: 'Module 2', lessons: [
        L('iso-annexa', 'reading', 'The 93 Annex A controls (4 themes)', 14),
        L('iso-soa', 'reading', 'Building the Statement of Applicability', 12),
        L('why-not-annexa', 'reading', 'Why NOT to start from Annex A (+ NIST 800-53 companion)', 10),
      ]},
      { id: 'm-iso-3', title: 'Risk Treatment', weekLabel: 'Module 3', lessons: [
        L('iso-rtp', 'reading', 'Risk treatment plan', 11),
        lab('lab-evidence', 'LAB: Audit Evidence (satisfy the auditor)', 20, 'evidence'),
      ]},
      { id: 'm-iso-4', title: 'Certification', weekLabel: 'Module 4', lessons: [
        L('iso-cert', 'reading', 'Stage 1 & Stage 2 certification audits', 12),
        L('iso-quiz-2', 'quiz', 'Final checkpoint: ISMS mastery', 8),
      ]},
    ],
  },
  {
    id: 'c-nistcsf', certId: 'GRC2', domainId: 'core', icon: '🏛️', level: 'Intermediate',
    title: 'NIST Cybersecurity Framework (CSF) 2.0',
    subtitle: 'Govern, Identify, Protect, Detect, Respond, Recover.',
    rating: 4.8, learners: 27600, weeks: 2, hours: 7,
    tags: ['NIST CSF', 'Functions', 'Tiers', 'Profiles'],
    skills: ['Six CSF functions', 'Implementation tiers', 'Profiles', 'Framework mapping'],
    description:
      'The most widely adopted voluntary cybersecurity framework. Master all six functions (including the new GOVERN function added in 2.0), implementation tiers, and how to build current/target profiles.',
    modules: [
      { id: 'm-csf-1', title: 'The Six Functions', weekLabel: 'Module 1', lessons: [
        L('nist-csf', 'reading', 'NIST CSF 2.0 overview & functions', 12),
        L('csf-govern', 'reading', 'The GOVERN function (new in 2.0)', 9),
        L('csf-quiz', 'quiz', 'Checkpoint: functions', 6),
      ]},
      { id: 'm-csf-2', title: 'Tiers & Profiles', weekLabel: 'Module 2', lessons: [
        L('csf-tiers', 'reading', 'Implementation tiers & profiles', 10),
        lab('lab-mapping', 'LAB: Control Mapping across frameworks', 20, 'mapping'),
      ]},
    ],
  },
  {
    id: 'c-soc2', certId: 'GRC2', domainId: 'core', icon: '🧾', level: 'Intermediate',
    title: 'SOC 2: Trust Services Criteria',
    subtitle: 'The report every SaaS buyer asks for.',
    rating: 4.7, learners: 19430, weeks: 2, hours: 6,
    tags: ['SOC 2', 'Trust Services', 'Type I vs II'],
    skills: ['Trust Services Criteria', 'Type I vs Type II', 'Evidence', 'Auditor relationship'],
    description:
      'Understand the five Trust Services Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy), the difference between Type I and Type II, and what an auditor actually tests.',
    modules: [
      { id: 'm-soc2-1', title: 'Foundations', weekLabel: 'Module 1', lessons: [
        L('soc2', 'reading', 'SOC 2 & the Trust Services Criteria', 12),
        L('soc2-types', 'reading', 'Type I vs Type II', 8),
        L('soc2-quiz', 'quiz', 'Checkpoint: SOC 2', 6),
      ]},
      { id: 'm-soc2-2', title: 'Getting Audit-Ready', weekLabel: 'Module 2', lessons: [
        L('soc2-evidence', 'reading', 'Evidence & the observation period', 10),
        lab('lab-crosswalk', 'LAB: Cross-Framework Crosswalk', 18, 'crosswalk'),
      ]},
    ],
  },
  {
    id: 'c-gdpr', certId: 'GRC2', domainId: 'core', icon: '🛡️', level: 'Intermediate',
    title: 'GDPR & Global Data Privacy',
    subtitle: 'Lawful basis, data subject rights, breach response.',
    rating: 4.8, learners: 30120, weeks: 3, hours: 9,
    tags: ['GDPR', 'Privacy', 'DPIA', 'Data Subject Rights'],
    skills: ['Lawful basis', 'Data subject rights', 'DPIA', 'Breach notification', 'ROPA'],
    description:
      'The benchmark privacy law. Lawful bases, the rights of data subjects, records of processing (ROPA), data protection impact assessments (DPIA), controller vs processor, and 72-hour breach notification — plus how CCPA, LGPD and DPDPA compare.',
    modules: [
      { id: 'm-gdpr-1', title: 'Principles & Bases', weekLabel: 'Module 1', lessons: [
        L('gdpr', 'reading', 'GDPR principles & lawful bases', 13),
        L('gdpr-rights', 'reading', 'Data subject rights', 10),
        L('gdpr-quiz-1', 'quiz', 'Checkpoint: bases & rights', 6),
      ]},
      { id: 'm-gdpr-2', title: 'Accountability', weekLabel: 'Module 2', lessons: [
        L('gdpr-ropa-dpia', 'reading', 'ROPA & DPIA', 11),
        L('gdpr-breach', 'reading', '72-hour breach notification', 9),
      ]},
      { id: 'm-gdpr-3', title: 'The Global Picture', weekLabel: 'Module 3', lessons: [
        L('privacy-global', 'reading', 'CCPA, LGPD, DPDPA at a glance', 10),
        L('gdpr-quiz-2', 'quiz', 'Checkpoint: global privacy', 6),
      ]},
    ],
  },
  {
    id: 'c-pcidss', certId: 'GRC2', domainId: 'core', icon: '💳', level: 'Intermediate',
    title: 'PCI DSS v4.0.1 — Payment Card Security',
    subtitle: 'Protect cardholder data and pass your assessment.',
    rating: 4.7, learners: 16120, weeks: 2, hours: 7,
    tags: ['PCI DSS', 'CDE', 'SAQ', 'Tokenisation'],
    skills: ['CDE scoping', 'The 12 requirements', 'SAQ selection', 'Segmentation & tokenisation'],
    description:
      'The standard that governs every business touching card payments. Scope your Cardholder Data Environment, apply the 12 requirements, pick the right SAQ, and use segmentation and tokenisation to slash your assessment burden.',
    modules: [
      { id: 'm-pci-1', title: 'Data & Scope', weekLabel: 'Module 1', lessons: [
        L('pci-intro', 'reading', 'PCI DSS & cardholder data', 12),
        L('pci-scope', 'reading', 'Scoping the CDE & segmentation', 11),
        L('pci-quiz-1', 'quiz', 'Checkpoint: data & scope', 6),
      ]},
      { id: 'm-pci-2', title: 'Requirements & Validation', weekLabel: 'Module 2', lessons: [
        L('pci-12reqs', 'reading', 'The 12 requirements', 12),
        L('pci-saq', 'reading', 'SAQ, ROC & how you validate', 11),
        L('pci-quiz-2', 'quiz', 'Checkpoint: validation', 6),
      ]},
    ],
  },
  {
    id: 'c-audit', certId: 'GRC2', domainId: 'core', icon: '🔎', level: 'Intermediate',
    title: 'Audit, Evidence & Findings',
    subtitle: 'How audits actually run — and how to survive one.',
    rating: 4.8, learners: 22890, weeks: 3, hours: 9,
    tags: ['Audit', 'Evidence', 'Findings', 'CAPA'],
    skills: ['Audit lifecycle', 'Objective evidence', 'Writing findings', 'Corrective action'],
    description:
      'Walk an audit from planning to report. Learn what counts as objective evidence, how findings and nonconformities are graded, and how corrective and preventive action (CAPA) closes the loop.',
    modules: [
      { id: 'm-audit-1', title: 'The Audit Lifecycle', weekLabel: 'Module 1', lessons: [
        L('audit-evidence', 'reading', 'Audits, evidence & findings', 13),
        L('audit-types', 'reading', 'Internal, external & certification audits', 10),
        L('audit-quiz-1', 'quiz', 'Checkpoint: audit basics', 6),
      ]},
      { id: 'm-audit-2', title: 'Evidence in Practice', weekLabel: 'Module 2', lessons: [
        L('audit-evidence-types', 'reading', 'Types of objective evidence', 10),
        lab('lab-audit-sim', 'LAB: Audit Simulator', 25, 'audit-sim'),
      ]},
      { id: 'm-audit-3', title: 'Closing Findings', weekLabel: 'Module 3', lessons: [
        L('audit-capa', 'reading', 'Findings, nonconformities & CAPA', 11),
        L('audit-quiz-2', 'quiz', 'Checkpoint: findings', 6),
      ]},
    ],
  },
  {
    id: 'c-tprm', certId: 'GRC2', domainId: 'core', icon: '🤝', level: 'Intermediate',
    title: 'Third-Party & Vendor Risk Management (TPRM)',
    subtitle: 'Your risk is only as strong as your weakest supplier.',
    rating: 4.7, learners: 17650, weeks: 3, hours: 8,
    tags: ['TPRM', 'Vendor Risk', 'Due Diligence', 'Concentration Risk'],
    skills: ['Vendor tiering', 'Due-diligence questionnaires', 'Ongoing monitoring', 'Concentration risk'],
    description:
      'Assess, tier and monitor the vendors your organisation depends on. Build a due-diligence questionnaire, grade responses, track issues, and manage concentration and fourth-party risk.',
    modules: [
      { id: 'm-tprm-1', title: 'The Vendor Lifecycle', weekLabel: 'Module 1', lessons: [
        L('tprm-intro', 'reading', 'Why third-party risk dominates modern breaches', 11),
        L('tprm-tiering', 'reading', 'Tiering vendors by criticality', 10),
        L('tprm-quiz-1', 'quiz', 'Checkpoint: TPRM basics', 6),
      ]},
      { id: 'm-tprm-2', title: 'Due Diligence', weekLabel: 'Module 2', lessons: [
        L('tprm-ddq', 'reading', 'Due-diligence questionnaires & evidence', 11),
        lab('lab-vendor', 'LAB: Vendor Risk Assessment', 22, 'vendor'),
      ]},
      { id: 'm-tprm-3', title: 'Ongoing Monitoring', weekLabel: 'Module 3', lessons: [
        L('tprm-monitor', 'reading', 'Continuous monitoring & concentration risk', 10),
        L('tprm-quiz-2', 'quiz', 'Checkpoint: monitoring', 6),
      ]},
    ],
  },

  // ---------------------------------------------------------------- GRCL
  {
    id: 'c-bcm', certId: 'GRCL', domainId: 'core', icon: '♻️', level: 'Advanced',
    title: 'Business Continuity Management (ISO 22301)',
    subtitle: 'Keep the business running when everything breaks.',
    rating: 4.7, learners: 12400, weeks: 3, hours: 8,
    tags: ['ISO 22301', 'BIA', 'RTO/RPO', 'DRP'],
    skills: ['Business impact analysis', 'RTO/RPO targets', 'BCP & DRP', 'Exercising plans'],
    description:
      'Design a business continuity management system to ISO 22301. Run a business impact analysis, set RTO/RPO targets, write BCP and DRP plans, and exercise them so they work under real pressure.',
    modules: [
      { id: 'm-bcm-1', title: 'Impact & Objectives', weekLabel: 'Module 1', lessons: [
        L('bcm-intro', 'reading', 'BCM & ISO 22301 overview', 12),
        L('bcm-bia', 'reading', 'Business impact analysis & RTO/RPO', 12),
        L('bcm-quiz-1', 'quiz', 'Checkpoint: BIA', 6),
      ]},
      { id: 'm-bcm-2', title: 'Plans & Recovery', weekLabel: 'Module 2', lessons: [
        L('bcm-plans', 'reading', 'BCP, DRP & recovery strategies', 11),
        L('bcm-exercise', 'reading', 'Exercising & maintaining plans', 9),
        L('bcm-quiz-2', 'quiz', 'Checkpoint: continuity', 6),
      ]},
      { id: 'm-bcm-3', title: 'Scenario', weekLabel: 'Module 3', lessons: [
        lab('lab-incident-2', 'LAB: Crisis Simulation', 22, 'incident'),
      ]},
    ],
  },
  {
    id: 'c-intaudit', certId: 'GRCL', domainId: 'core', icon: '📊', level: 'Advanced',
    title: 'Internal Audit Management (IIA Standards)',
    subtitle: 'Run the third line that assures the board.',
    rating: 4.6, learners: 9800, weeks: 3, hours: 8,
    tags: ['Internal Audit', 'IIA', 'Audit Plan', 'Assurance'],
    skills: ['Risk-based audit plan', 'Working papers', 'IIA standards', 'Board reporting'],
    description:
      'The internal audit function explained: independence, the risk-based annual audit plan, fieldwork and working papers, and reporting assurance to the audit committee under the IIA Global Internal Audit Standards.',
    modules: [
      { id: 'm-ia-1', title: 'Mandate & Independence', weekLabel: 'Module 1', lessons: [
        L('ia-intro', 'reading', 'Internal audit mandate & independence', 12),
        L('ia-plan', 'reading', 'The risk-based audit plan', 10),
        L('ia-quiz-1', 'quiz', 'Checkpoint: mandate', 6),
      ]},
      { id: 'm-ia-2', title: 'Fieldwork', weekLabel: 'Module 2', lessons: [
        L('ia-fieldwork', 'reading', 'Fieldwork, sampling & working papers', 11),
        lab('lab-audit-sim-2', 'LAB: Audit Simulator (advanced)', 25, 'audit-sim'),
      ]},
      { id: 'm-ia-3', title: 'Reporting', weekLabel: 'Module 3', lessons: [
        L('ia-report', 'reading', 'Reporting to the audit committee', 10),
        L('ia-quiz-2', 'quiz', 'Checkpoint: reporting', 6),
      ]},
    ],
  },
  {
    id: 'c-fincontrols', certId: 'GRCL', domainId: 'core', icon: '💰', level: 'Advanced',
    title: 'Financial Controls: SOX, COSO & ICFR',
    subtitle: 'The controls that keep financial statements honest.',
    rating: 4.6, learners: 8300, weeks: 3, hours: 8,
    tags: ['SOX', 'COSO', 'ICFR', 'Basel III'],
    skills: ['SOX 404', 'COSO framework', 'ICFR', 'Control testing', 'Segregation of duties'],
    description:
      'Sarbanes-Oxley, the COSO internal-control framework, and internal control over financial reporting (ICFR). Learn key controls, segregation of duties, and how financial-controls testing differs from IT-controls testing.',
    modules: [
      { id: 'm-fc-1', title: 'SOX & COSO', weekLabel: 'Module 1', lessons: [
        L('fc-sox', 'reading', 'SOX & the COSO framework', 12),
        L('fc-icfr', 'reading', 'ICFR & key controls', 11),
        L('fc-quiz-1', 'quiz', 'Checkpoint: SOX/COSO', 6),
      ]},
      { id: 'm-fc-2', title: 'Testing', weekLabel: 'Module 2', lessons: [
        L('fc-sod', 'reading', 'Segregation of duties & control testing', 11),
        lab('lab-control-test', 'LAB: Control Testing', 20, 'evidence'),
      ]},
      { id: 'm-fc-3', title: 'Beyond SOX', weekLabel: 'Module 3', lessons: [
        L('fc-basel', 'reading', 'A word on Basel III & operational risk', 9),
        L('fc-quiz-2', 'quiz', 'Checkpoint: financial controls', 6),
      ]},
    ],
  },
  {
    id: 'c-oprisk', certId: 'GRCL', domainId: 'core', icon: '⚙️', level: 'Advanced',
    title: 'Operational & Model Risk Governance',
    subtitle: 'Basel III op-risk, ERM, and governing AI/ML models.',
    rating: 4.5, learners: 6100, weeks: 2, hours: 6,
    tags: ['Operational Risk', 'COSO ERM', 'Model Risk', 'SR 11-7'],
    skills: ['Operational risk', '5×5 heat maps', 'ERM', 'Model risk (SR 11-7)'],
    description:
      'Operational risk management under Basel III and COSO ERM, plus model risk governance (SR 11-7, ECB guidance) — the discipline of validating and overseeing the AI/ML and quantitative models a business runs on.',
    modules: [
      { id: 'm-or-1', title: 'Operational Risk', weekLabel: 'Module 1', lessons: [
        L('or-intro', 'reading', 'Operational risk & COSO ERM', 12),
        L('or-heatmap', 'reading', '5×5 heat maps & risk appetite', 9),
        L('or-quiz-1', 'quiz', 'Checkpoint: op risk', 6),
      ]},
      { id: 'm-or-2', title: 'Model Risk', weekLabel: 'Module 2', lessons: [
        L('or-model', 'reading', 'Model risk governance (SR 11-7)', 11),
        L('or-quiz-2', 'quiz', 'Checkpoint: model risk', 6),
      ]},
    ],
  },
  {
    id: 'c-career', certId: 'GRCL', domainId: 'core', icon: '🎓', level: 'Lead',
    title: 'GRC Career Mastery & Interview Prep',
    subtitle: 'Board reporting, program building, and landing the role.',
    rating: 4.8, learners: 20450, weeks: 3, hours: 8,
    tags: ['Interview', 'Board Reporting', 'Risk Appetite', 'Portfolio'],
    skills: ['Risk appetite statements', 'Board reporting', 'Program building', 'Interview mastery'],
    description:
      'Turn knowledge into a career. Write a risk appetite statement, report to a board, design a GRC program from scratch, and prepare for senior-manager interviews with a curated question bank and a portfolio capstone.',
    modules: [
      { id: 'm-car-1', title: 'Leading a Program', weekLabel: 'Module 1', lessons: [
        L('car-appetite', 'reading', 'Risk appetite & tolerance statements', 11),
        L('car-board', 'reading', 'Reporting to the board', 10),
        L('car-quiz-1', 'quiz', 'Checkpoint: leadership', 6),
      ]},
      { id: 'm-car-2', title: 'Interview Mastery', weekLabel: 'Module 2', lessons: [
        L('car-interview', 'reading', 'The GRC interview question bank', 12),
        lab('lab-interview', 'LAB: Interview Simulator', 25, 'interview'),
      ]},
      { id: 'm-car-3', title: 'Capstone', weekLabel: 'Module 3', lessons: [
        L('car-capstone-brief', 'reading', 'Capstone brief: build a fintech GRC program', 10),
        lab('lab-capstone', 'LAB: Capstone — Full GRC Lifecycle', 40, 'capstone'),
      ]},
    ],
  },

  // ---------------------------------------------------------------- AIG1
  {
    id: 'c-aigov', certId: 'AIG1', domainId: 'ai', icon: '🤖', level: 'Advanced',
    title: 'AI Governance: EU AI Act, NIST AI RMF & ISO 42001',
    subtitle: 'Govern AI systems with the newest management standard.',
    rating: 4.9, learners: 15900, weeks: 4, hours: 12,
    tags: ['EU AI Act', 'NIST AI RMF', 'ISO 42001', 'AI Risk'],
    skills: ['AI risk classification', 'AI RMF functions', 'AIMS (ISO 42001)', 'Bias detection', 'AI registries'],
    description:
      'The fastest-growing GRC domain. Classify AI systems under the EU AI Act, apply the four NIST AI RMF functions, stand up an AI management system to ISO 42001, detect bias, and run an AI risk registry — hands-on.',
    modules: [
      { id: 'm-ai-1', title: 'The AI Risk Landscape', weekLabel: 'Module 1', lessons: [
        L('ai-intro', 'reading', 'Why AI needs its own governance', 12),
        L('ai-euact', 'reading', 'EU AI Act risk tiers', 13),
        L('ai-quiz-1', 'quiz', 'Checkpoint: AI Act', 6),
      ]},
      { id: 'm-ai-2', title: 'Frameworks', weekLabel: 'Module 2', lessons: [
        L('ai-nistrmf', 'reading', 'NIST AI RMF: Govern, Map, Measure, Manage', 12),
        L('ai-iso42001', 'reading', 'ISO 42001 AI management system', 11),
        lab('lab-mapping-ai', 'LAB: Map controls to AI RMF functions', 20, 'mapping'),
      ]},
      { id: 'm-ai-3', title: 'AI Risk in Practice', weekLabel: 'Module 3', lessons: [
        L('ai-registry', 'reading', 'Building an AI system registry', 10),
        lab('lab-shadow-ai', 'LAB: Shadow AI Discovery (scan the office)', 22, 'shadow-ai'),
      ]},
      { id: 'm-ai-4', title: 'Fairness & Incidents', weekLabel: 'Module 4', lessons: [
        L('ai-bias', 'reading', 'Bias, fairness & disparate impact', 11),
        lab('lab-bias', 'LAB: Bias Detection', 20, 'bias'),
        L('ai-quiz-2', 'quiz', 'Final checkpoint: AI governance', 8),
      ]},
    ],
  },

  // ---------------------------------------------------------------- AIG2
  {
    id: 'c-iso42001', certId: 'AIG2', domainId: 'ai', icon: '🧠', level: 'Advanced',
    title: 'ISO/IEC 42001 — Building an AI Management System',
    subtitle: 'Stand up a certifiable AIMS for responsible AI.',
    rating: 4.8, learners: 7300, weeks: 3, hours: 9,
    tags: ['ISO 42001', 'AIMS', 'AI Impact Assessment', 'AI Lifecycle'],
    skills: ['AIMS clauses', 'Annex A AI controls', 'AI impact assessment', 'Lifecycle governance'],
    description:
      'Go beyond awareness. Implement ISO 42001 clause by clause, apply Annex A AI controls, run an AI system impact assessment, govern the full AI lifecycle, and map the AIMS to the EU AI Act and NIST AI RMF.',
    modules: [
      { id: 'm-iso42-1', title: 'The AIMS', weekLabel: 'Module 1', lessons: [
        L('iso42-intro', 'reading', 'ISO 42001 & the AI management system', 12),
        L('iso42-annexa', 'reading', 'Annex A controls & AI impact assessment', 12),
        L('iso42-quiz', 'quiz', 'Checkpoint: the AIMS', 6),
      ]},
      { id: 'm-iso42-2', title: 'Lifecycle & Mapping', weekLabel: 'Module 2', lessons: [
        L('iso42-lifecycle', 'reading', 'Governing the AI lifecycle', 11),
        L('iso42-cert', 'reading', 'Mapping 42001 to EU AI Act & NIST', 10),
        lab('lab-mapping-42', 'LAB: Map controls to AI functions', 20, 'mapping'),
      ]},
    ],
  },
  {
    id: 'c-airmf', certId: 'AIG2', domainId: 'ai', icon: '📐', level: 'Advanced',
    title: 'NIST AI RMF in Practice',
    subtitle: 'Operationalise Govern, Map, Measure, Manage.',
    rating: 4.7, learners: 6400, weeks: 2, hours: 7,
    tags: ['NIST AI RMF', 'Trustworthy AI', 'Bias', 'AI Profiles'],
    skills: ['Govern/Map/Measure/Manage', 'Trustworthy AI characteristics', 'Fairness metrics', 'AI incident response'],
    description:
      'Take the NIST AI Risk Management Framework from theory to operation. Work each function in depth, measure trustworthiness characteristics, navigate conflicting fairness metrics, and manage AI risk end to end.',
    modules: [
      { id: 'm-airmf-1', title: 'Govern & Map', weekLabel: 'Module 1', lessons: [
        L('airmf-govern', 'reading', 'GOVERN — the culture function', 11),
        L('airmf-map', 'reading', 'MAP — establish context', 10),
      ]},
      { id: 'm-airmf-2', title: 'Measure & Manage', weekLabel: 'Module 2', lessons: [
        L('airmf-measure', 'reading', 'MEASURE — analyse & benchmark', 11),
        L('airmf-manage', 'reading', 'MANAGE — act on the risks', 10),
        lab('lab-bias-2', 'LAB: Bias Detection', 20, 'bias'),
        L('airmf-quiz', 'quiz', 'Final checkpoint: AI RMF', 8),
      ]},
    ],
  },

  // ---------------------------------------------------------------- GRC2 (added frameworks)
  {
    id: 'c-dpdpa', certId: 'GRC2', domainId: 'core', icon: '🇮🇳', level: 'Intermediate',
    title: 'India DPDP Act 2023 — Digital Personal Data Protection',
    subtitle: "India's first comprehensive data-protection law.",
    rating: 4.8, learners: 9120, weeks: 2, hours: 5,
    tags: ['DPDPA', 'Privacy', 'India', 'Consent'],
    skills: ['Data Fiduciary duties', 'Consent & Consent Managers', 'DPDPA vs GDPR', 'Significant Data Fiduciary'],
    description:
      "Master the Digital Personal Data Protection Act, 2023 — roles (Data Principal, Fiduciary, Consent Manager), consent, children's data, breach duties, and exactly where it diverges from GDPR. Essential for anyone operating in India.",
    modules: [
      { id: 'm-dpdpa-1', title: 'The DPDP Act', weekLabel: 'Module 1', lessons: [
        L('dpdpa-intro', 'reading', 'The DPDP Act 2023 & its roles', 12),
        L('dpdpa-vs-gdpr', 'reading', 'DPDPA vs GDPR — the deltas', 11),
        L('dpdpa-quiz', 'quiz', 'Checkpoint: DPDPA', 6),
      ]},
      { id: 'm-dpdpa-2', title: 'Operationalise', weekLabel: 'Module 2', lessons: [
        lab('lab-dpdpa-map', 'LAB: Map DPDPA duties to controls', 20, 'crosswalk'),
      ]},
    ],
  },
  {
    id: 'c-hipaa', certId: 'GRC2', domainId: 'core', icon: '🏥', level: 'Intermediate',
    title: 'HIPAA — US Healthcare Information Security',
    subtitle: 'Protect PHI under the Privacy & Security Rules.',
    rating: 4.7, learners: 13300, weeks: 2, hours: 6,
    tags: ['HIPAA', 'PHI', 'Security Rule', 'BAA'],
    skills: ['Privacy vs Security Rule', 'Administrative/physical/technical safeguards', 'BAAs', 'Breach notification'],
    description:
      'Understand HIPAA end to end: PHI and covered entities, the Privacy and Security Rules, required vs addressable safeguards, business associate agreements, and the breach notification rule.',
    modules: [
      { id: 'm-hipaa-1', title: 'The Rules', weekLabel: 'Module 1', lessons: [
        L('hipaa-intro', 'reading', 'HIPAA, PHI & the two rules', 12),
        L('hipaa-safeguards', 'reading', 'The Security Rule safeguards', 11),
        L('hipaa-quiz', 'quiz', 'Checkpoint: HIPAA', 6),
      ]},
      { id: 'm-hipaa-2', title: 'Evidence', weekLabel: 'Module 2', lessons: [
        lab('lab-hipaa-ev', 'LAB: HIPAA risk-analysis evidence', 20, 'evidence'),
      ]},
    ],
  },

  // ---------------------------------------------------------------- CLD1
  {
    id: 'c-cloudfound', certId: 'CLD1', domainId: 'cloud', icon: '☁️', level: 'Intermediate',
    title: 'Cloud Shared Responsibility & Governance',
    subtitle: 'Who secures what — and how to govern multi-cloud.',
    rating: 4.8, learners: 11200, weeks: 2, hours: 6,
    tags: ['Shared Responsibility', 'CSA CCM', 'CAIQ', 'Multi-cloud'],
    skills: ['Shared responsibility by service model', 'CSA Cloud Controls Matrix', 'CAIQ & STAR', 'Control ownership'],
    description:
      'The foundation of cloud GRC. Nail the shared responsibility model across IaaS/PaaS/SaaS, then govern multi-cloud estates with the CSA Cloud Controls Matrix, CAIQ and the STAR registry.',
    modules: [
      { id: 'm-cld-1', title: 'Responsibility', weekLabel: 'Module 1', lessons: [
        L('cld-shared', 'reading', 'The shared responsibility model, for real', 12),
        L('cld-ccm', 'reading', 'Governing multi-cloud with the CSA CCM', 11),
        L('cld-quiz-1', 'quiz', 'Checkpoint: responsibility & CCM', 6),
      ]},
      { id: 'm-cld-2', title: 'Review', weekLabel: 'Module 2', lessons: [
        lab('lab-cloud-arch', 'LAB: Cloud Architecture Review', 24, 'arch-review'),
      ]},
    ],
  },
  {
    id: 'c-cspm', certId: 'CLD1', domainId: 'cloud', icon: '🛰️', level: 'Intermediate',
    title: 'Cloud Posture & Misconfiguration Risk',
    subtitle: 'CSPM, CIS Benchmarks and compliance-as-code.',
    rating: 4.7, learners: 8600, weeks: 2, hours: 6,
    tags: ['CSPM', 'CIS Benchmarks', 'IaC', 'Policy-as-code'],
    skills: ['CSPM as continuous evidence', 'CIS Benchmarks', 'Policy-as-code guardrails', 'Shift-left compliance'],
    description:
      'Misconfiguration is the number-one cloud risk. Learn how CSPM turns configuration into continuous control evidence, how CIS Benchmarks define "good", and how to enforce them as policy-as-code in the pipeline.',
    modules: [
      { id: 'm-cspm-1', title: 'Posture', weekLabel: 'Module 1', lessons: [
        L('cld-cspm', 'reading', 'Cloud Security Posture Management', 12),
        L('cld-cis', 'reading', 'CIS Benchmarks & infrastructure as code', 11),
        L('cld-quiz-2', 'quiz', 'Checkpoint: posture', 6),
      ]},
      { id: 'm-cspm-2', title: 'Mapping', weekLabel: 'Module 2', lessons: [
        lab('lab-cloud-map', 'LAB: Map CSPM rules to controls', 20, 'mapping'),
      ]},
    ],
  },
  {
    id: 'c-fedramp', certId: 'CLD1', domainId: 'cloud', icon: '🏛️', level: 'Advanced',
    title: 'FedRAMP & Cloud Authorization',
    subtitle: 'The gold-standard cloud authorization lifecycle.',
    rating: 4.6, learners: 5400, weeks: 2, hours: 5,
    tags: ['FedRAMP', 'NIST 800-53', 'ATO', 'ConMon'],
    skills: ['Authorization boundary', 'Impact levels', 'ATO vs P-ATO', 'Continuous monitoring'],
    description:
      'FedRAMP authorises cloud services for US government use on NIST 800-53. Learn impact levels, the authorization boundary, ATO vs JAB P-ATO, and continuous monitoring — a model that maps onto any commercial cloud program.',
    modules: [
      { id: 'm-fedramp-1', title: 'Authorization', weekLabel: 'Module 1', lessons: [
        L('cld-fedramp', 'reading', 'FedRAMP & cloud authorization', 12),
        L('cld-quiz-3', 'quiz', 'Checkpoint: FedRAMP', 6),
      ]},
      { id: 'm-fedramp-2', title: 'Evidence', weekLabel: 'Module 2', lessons: [
        lab('lab-fedramp-ev', 'LAB: Build an authorization evidence pack', 20, 'evidence'),
      ]},
    ],
  },
]

// ---- derived indexes -------------------------------------------------------
export const COURSE_BY_ID: Record<string, Course> = Object.fromEntries(COURSES.map((c) => [c.id, c]))
export const CERT_BY_ID: Record<string, Certification> = Object.fromEntries(CERTIFICATIONS.map((c) => [c.id, c]))
export const DOMAIN_BY_ID: Record<string, Domain> = Object.fromEntries(DOMAINS.map((d) => [d.id, d]))

export function coursesInCert(certId: string): Course[] {
  const cert = CERT_BY_ID[certId]
  if (!cert) return []
  return cert.courseIds.map((id) => COURSE_BY_ID[id]).filter((c): c is Course => Boolean(c))
}
export function certsInDomain(domainId: DomainId): Certification[] {
  return CERTIFICATIONS.filter((c) => c.domainId === domainId)
}
export function allLessons(course: Course): Lesson[] {
  return course.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id })))
}
export function courseLessonCount(course: Course): number {
  return course.modules.reduce((n, m) => n + m.lessons.length, 0)
}

export interface LessonIndexEntry {
  courseId: string
  lesson: Lesson
  order: number
  flat: Lesson[]
}
export const LESSON_INDEX: Record<string, LessonIndexEntry> = (() => {
  const idx: Record<string, LessonIndexEntry> = {}
  for (const c of COURSES) {
    const flat = allLessons(c)
    flat.forEach((l, i) => {
      idx[l.id] = { courseId: c.id, lesson: l, order: i, flat }
    })
  }
  return idx
})()
