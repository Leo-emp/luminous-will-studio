// ============================================================
// LW CATALOG — the agent's menu of scenes, props and vignettes
// must never offer the finance-only parts copied from the source
// engine (they stay in the library only as engine test fixtures
// until LW's own library replaces them in Plan 2).
// ============================================================
import { describe, expect, it } from 'vitest'
import { catalog, DECOR_FIGURES } from '../../agent/catalog'
import { RETIRED } from '../../art/retired'

describe('LW catalog hides finance-only art', () => {
  const c = catalog([])
  const offered = [...c.scenes.map((s) => s.id), ...c.props.map((p) => p.id), ...c.vignettes.map((v) => v.id), ...DECOR_FIGURES]

  it('offers none of the retired ids', () => {
    expect(offered.filter((id) => RETIRED.has(id))).toEqual([])
  })

  it('retires the obvious finance parts', () => {
    for (const id of ['cash-stack', 'coin', 'bank-interior', 'vault-room', 'casino', 'stock-exchange', 'bitcoin', 'money-mountain', 'shop-street'])
      expect(RETIRED.has(id)).toBe(true)
  })

  it('keeps motivation-friendly parts', () => {
    for (const id of ['trophy', 'ladder', 'clock', 'mountain-summit', 'rooftop-terrace', 'hospital-ward'])
      expect(offered).toContain(id)
  })
})
