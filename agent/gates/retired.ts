// ============================================================
// RETIRED GATE — refuse any plan or package that names one of the
// finance-only parts copied from the source engine (art/retired.ts).
// Hiding them from the catalog is not enough: a model can still
// write a retired id from memory, so the gates refuse it too.
// ============================================================
import { RETIRED } from '../../art/retired'

// # Fields that name a library part (shot ids, words, labels are never checked)
const PART_KEYS = new Set(['scene', 'prop', 'props', 'id', 'vignette', 'icon', 'figure', 'giant'])

// # Every retired id named anywhere in a plan/package, as gate problems
export const retiredUses = (doc: unknown, retired: ReadonlySet<string> = RETIRED): string[] => {
  const found = new Set<string>()
  const walk = (v: unknown, key = '') => {
    if (typeof v === 'string') { if (PART_KEYS.has(key) && retired.has(v)) found.add(v); return }
    if (Array.isArray(v)) { for (const x of v) walk(x, key); return }
    if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, k)
  }
  walk(doc)
  return [...found].map((id) => `uses retired "${id}"`)
}
