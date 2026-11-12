// ============================================================
// BRAND — LW Studio must stand on its own: no source-project
// names or prefixes in the code, no imports reaching outside this
// repo, and cloud renders pointed at LW's own GitHub repo.
// ============================================================
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { GH_REPO } from '../../agent/cloud'

const ROOT = resolve(__dirname, '../..')
const FOLDERS = ['agent', 'art', 'scripts', '.github']
const CODE = /\.(ts|tsx|mjs|js|yml|sh|py|json)$/

// # Every text file under the checked folders
const files = (at: string): string[] =>
  readdirSync(at).flatMap((n) => {
    const p = join(at, n)
    if (n === 'node_modules') return []
    return statSync(p).isDirectory() ? files(p) : CODE.test(n) ? [p] : []
  })
const ALL = FOLDERS.flatMap((f) => files(join(ROOT, f)))

describe('LW stands alone', () => {
  it('no CapitalCode names in code', () => {
    const bad = ALL.filter((p) => /capitalcode|CapitalCode|CAPITALCODE|\bCC_[A-Z]/.test(readFileSync(p, 'utf8')))
    expect(bad.map((p) => relative(ROOT, p))).toEqual([])
  })

  it('no source-project prefixes (cloud site names, sfx folder)', () => {
    // # a shared prefix like cc- would let LW delete the other project's cloud bundles
    const bad = ALL.filter((p) => /['"`]cc-|sfx\/cc\b/.test(readFileSync(p, 'utf8')))
    expect(bad.map((p) => relative(ROOT, p))).toEqual([])
  })

  it('no imports outside the repo', () => {
    const bad: string[] = []
    for (const p of ALL.filter((f) => /\.(ts|tsx|mjs)$/.test(f))) {
      for (const m of readFileSync(p, 'utf8').matchAll(/from '(\.[^']+)'/g)) {
        const target = resolve(dirname(p), m[1])
        if (!target.startsWith(ROOT)) bad.push(`${relative(ROOT, p)} → ${m[1]}`)
      }
    }
    expect(bad).toEqual([])
  })

  it("GH_REPO is LW's", () => {
    expect(GH_REPO).toBe('Leo-emp/luminous-will-studio')
  })
})
