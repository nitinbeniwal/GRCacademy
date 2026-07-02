import { describe, expect, it } from 'vitest'
import {
  COURSES,
  COURSE_BY_ID,
  CERTIFICATIONS,
  CERT_BY_ID,
  DOMAIN_BY_ID,
  LESSON_INDEX,
  coursesInCert,
  allLessons,
} from '../data/curriculum'
import { SCENARIOS } from '../labs/scenarios'
import type { LabId } from '../types'

const BESPOKE_LABS: LabId[] = ['risk-matrix', 'risk-register', 'arch-review', 'shadow-ai', 'policy', 'mapping']

describe('certification integrity', () => {
  it('every available certification has at least one resolvable course', () => {
    for (const cert of CERTIFICATIONS.filter((c) => c.status === 'available')) {
      expect(cert.courseIds.length, `${cert.id} has courses`).toBeGreaterThan(0)
      for (const id of cert.courseIds) {
        expect(COURSE_BY_ID[id], `${cert.id} -> ${id}`).toBeDefined()
      }
    }
  })

  it('coursesInCert returns them in declared order', () => {
    const grc1 = coursesInCert('GRC1').map((c) => c.id)
    expect(grc1).toEqual(CERT_BY_ID['GRC1']!.courseIds)
  })

  it('every course points at a real cert and domain', () => {
    for (const c of COURSES) {
      expect(CERT_BY_ID[c.certId], `${c.id} cert`).toBeDefined()
      expect(DOMAIN_BY_ID[c.domainId], `${c.id} domain`).toBeDefined()
    }
  })
})

describe('lesson integrity', () => {
  it('every lab lesson references a lab the host can render', () => {
    for (const c of COURSES) {
      for (const l of allLessons(c)) {
        if (l.type === 'lab') {
          const known = Boolean(l.labId && (BESPOKE_LABS.includes(l.labId) || SCENARIOS[l.labId]))
          expect(known, `${l.id} -> ${l.labId}`).toBe(true)
        }
      }
    }
  })

  it('every quiz lesson has questions and every reading has a body', () => {
    for (const c of COURSES) {
      for (const l of allLessons(c)) {
        if (l.type === 'quiz') expect((l.quiz?.length ?? 0), `${l.id} quiz`).toBeGreaterThan(0)
        if (l.type === 'reading') expect(Boolean(l.body), `${l.id} body`).toBe(true)
      }
    }
  })

  it('LESSON_INDEX covers every lesson exactly with valid neighbours', () => {
    for (const c of COURSES) {
      const flat = allLessons(c)
      flat.forEach((l, i) => {
        const entry = LESSON_INDEX[l.id]
        expect(entry, `${l.id} indexed`).toBeDefined()
        expect(entry!.order).toBe(i)
        expect(entry!.courseId).toBe(c.id)
      })
    }
  })

  it('multiple-choice answers are valid option indices', () => {
    for (const c of COURSES) {
      for (const l of allLessons(c)) {
        for (const q of l.quiz ?? []) {
          if (q.type === 'mc') {
            expect(Array.isArray(q.options)).toBe(true)
            expect(typeof q.answer).toBe('number')
            expect(q.answer as number).toBeLessThan(q.options!.length)
          }
        }
      }
    }
  })
})
