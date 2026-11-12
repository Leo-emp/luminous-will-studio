// ============================================================
// IMPORT ENGINE — tests for the one-off copy from CapitalCode.
// They use throwaway temp folders, never the real CapitalCode.
// ============================================================
import { mkdirSync, mkdtempSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'
import { importEngine } from '../../scripts/import-engine.mjs'

// # Make a file (and its folders) inside a temp tree
const put = (root: string, rel: string, text = 'x') => {
  const p = join(root, rel)
  mkdirSync(dirname(p), { recursive: true })
  writeFileSync(p, text)
}

// # Every file under a folder, as relative paths with forward slashes
const walk = (root: string, at = root): string[] =>
  readdirSync(at).flatMap((n) => {
    const p = join(at, n)
    return statSync(p).isDirectory() ? walk(root, p) : [relative(root, p).split('\\').join('/')]
  })

const fixture = () => {
  const src = mkdtempSync(join(tmpdir(), 'lw-src-'))
  for (const f of ['agent/a.ts', 'src/app/page.tsx', '.env.local', 'output/v.mp4', 'art/rig/pose.ts', 'art/x/.env']) put(src, f)
  const dest = mkdtempSync(join(tmpdir(), 'lw-dest-'))
  return { src, dest }
}

describe('importEngine', () => {
  it('refuses when dest is inside src', () => {
    const { src } = fixture()
    expect(() => importEngine({ src, dest: join(src, 'x') })).toThrow(/inside the source/)
  })

  it('refuses when src === dest', () => {
    const { src } = fixture()
    expect(() => importEngine({ src, dest: src })).toThrow(/same folder/)
  })

  it('refuses a missing src', () => {
    const { dest } = fixture()
    expect(() => importEngine({ src: join(dest, 'nope'), dest })).toThrow(/source not found/)
  })

  it('copies only allowlisted paths', () => {
    const { src, dest } = fixture()
    const r = importEngine({ src, dest })
    expect(walk(dest).sort()).toEqual(['agent/a.ts', 'art/rig/pose.ts'])
    expect([...r.copied].sort()).toEqual(['agent/a.ts', 'art/rig/pose.ts'])
  })

  it('never writes into src', () => {
    const { src, dest } = fixture()
    const before = walk(src).map((f) => `${f}:${statSync(join(src, f)).mtimeMs}`).sort()
    importEngine({ src, dest })
    const after = walk(src).map((f) => `${f}:${statSync(join(src, f)).mtimeMs}`).sort()
    expect(after).toEqual(before)
  })

  it('DENY wins over ALLOW', () => {
    const { src, dest } = fixture()
    importEngine({ src, dest })
    expect(existsSync(join(dest, 'art/x/.env'))).toBe(false)
  })
})
