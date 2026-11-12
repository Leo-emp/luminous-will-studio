// ============================================================
// RETIRED GATE — an LW plan or package that names a retired
// finance part (art/retired.ts) is refused by the gates, not just
// hidden from the catalog.
// ============================================================
import { describe, expect, it } from 'vitest'
import { gatePlan } from '../../agent/gates/plan'
import { retiredUses } from '../../agent/gates/retired'
import { PROPS } from '../../art/props/registry'
import { RETIRED } from '../../art/retired'
import { SCENES } from '../../art/scenes/registry'
import { VIGNETTES } from '../../art/vignettes/registry'
import { DECOR_FIGURES } from '../../agent/slides'

describe('retiredUses', () => {
  it('finds retired scenes, props, vignettes and icons anywhere in a plan', () => {
    const plan = { shots: [
      { id: 'a', kind: 'scene', scene: 'casino', props: [{ id: 'cash-stack' }, { id: 'trophy' }] },
      { id: 'b', kind: 'vignette', vignette: 'money-mountain' },
      { id: 'c', kind: 'slide', data: { icon: 'dollar-sign' } },
    ] }
    expect(retiredUses(plan).sort()).toEqual(['casino', 'cash-stack', 'dollar-sign', 'money-mountain'].map((x) => `uses retired "${x}"`).sort())
  })

  it('ignores ids that are not retired, and shot ids', () => {
    expect(retiredUses({ shots: [{ id: 'coin-shot', kind: 'scene', scene: 'mountain-summit', props: [{ id: 'trophy' }] }] })).toEqual([])
  })
})

describe('gatePlan', () => {
  it('refuses a plan that uses a retired scene', () => {
    const plan = { shots: [{ id: 'a', kind: 'scene', start: { sentence: 's1' }, scene: 'casino', actors: [] }] }
    const r = gatePlan(plan as never, [{ w: 'hi', s: 0, e: 0.3, sid: 's1' }], { duration: 1, history: [] } as never)
    expect(r.problems.join('\n')).toMatch(/uses retired "casino"/)
  })
})

it('every retired id really exists in a library (no typos left un-retired)', () => {
  const known = new Set([...SCENES.map((s) => s.id), ...PROPS.map((p) => p.id), ...VIGNETTES.map((v) => v.id), ...DECOR_FIGURES])
  expect([...RETIRED].filter((id) => !known.has(id))).toEqual([])
})

describe('checkMeta', () => {
  it('refuses a thumbnail or cover that uses a retired part', async () => {
    const { checkMeta } = await import('../../agent/package')
    const out = checkMeta({ titles: [], thumbnails: [{ layout: 'hero-left', words: 'START NOW', prop: 'cash-stack', scene: 'bank-interior' }] } as never).join('\n')
    expect(out).toMatch(/uses retired "cash-stack"/)
    expect(out).toMatch(/uses retired "bank-interior"/)
  })
})
