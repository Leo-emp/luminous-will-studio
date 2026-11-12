// ============================================================
// SECRET SCAN — this repo is PUBLIC, so every push is scanned.
// Fake keys are built at runtime so this file never contains a
// key-shaped literal itself.
// ============================================================
import { describe, expect, it } from 'vitest'
import { scanText } from '../../scripts/secret-scan.mjs'

const AWS = 'AKIA' + 'Q'.repeat(16)
const GH = 'ghp_' + 'a1'.repeat(18)
const STRIPE = ['sk_live_', 'pk_live_', 'whsec_'].map((p) => p + 'Z9'.repeat(12))
const HEX32 = 'ab12'.repeat(8)

describe('scanText', () => {
  it('finds an AWS access key', () => {
    expect(scanText('a.ts', `const k = "${AWS}"`).map((f) => f.kind)).toEqual(['aws'])
  })
  it('finds a GitHub token', () => {
    expect(scanText('a.ts', `token: ${GH}`).map((f) => f.kind)).toEqual(['github'])
  })
  it('finds Stripe keys', () => {
    for (const s of STRIPE) expect(scanText('a.ts', `x = '${s}'`).map((f) => f.kind)).toEqual(['stripe'])
  })
  it('finds an assigned Azure key and other assigned secrets', () => {
    expect(scanText('a.sh', `AZURE_SPEECH_KEY=${HEX32}`).map((f) => f.kind)).toEqual(['assigned-secret'])
    expect(scanText('a.yml', `MY_TOKEN: ${'q'.repeat(24)}`).map((f) => f.kind)).toEqual(['assigned-secret'])
  })
  it('flags a tracked .env file by its path', () => {
    expect(scanText('.env.local', '').map((f) => f.kind)).toEqual(['dotenv'])
    expect(scanText('sub/.env', '').map((f) => f.kind)).toEqual(['dotenv'])
  })
  it('passes empty .env.example placeholders and reads of env vars', () => {
    expect(scanText('.env.example', 'AZURE_SPEECH_KEY=\nAZURE_SPEECH_REGION=')).toEqual([])
    expect(scanText('a.ts', 'const key = process.env.AZURE_SPEECH_KEY')).toEqual([])
  })
  it('reports the line but never the secret itself', () => {
    const f = scanText('a.ts', `one\nconst k = "${AWS}"`)
    expect(f[0].line).toBe(2)
    expect(JSON.stringify(f)).not.toContain(AWS)
  })
})

describe('more real key shapes (review finding 5)', () => {
  const kinds = (path: string, text: string) => scanText(path, text).map((f) => f.kind)
  it('quoted JSON names and lowercase names', () => {
    expect(kinds('a.json', `"AZURE_SPEECH_KEY": "${HEX32}"`)).toEqual(['assigned-secret'])
    expect(kinds('creds', `aws_secret_access_key = ${'Ab1/'.repeat(10)}`)).toEqual(['assigned-secret'])
    expect(kinds('a.ts', `apiKey: '${'k9'.repeat(12)}'`)).toEqual(['assigned-secret'])
  })
  it('a bare Azure key passed to the SDK', () => {
    expect(kinds('a.ts', `SpeechConfig.fromSubscription('${HEX32}', 'eastus')`)).toEqual(['azure'])
  })
  it('GitHub fine-grained, AWS temporary, Stripe test, Google, private keys', () => {
    expect(kinds('a', 'github_pat_' + 'A1'.repeat(30))).toEqual(['github'])
    expect(kinds('a', 'ASIA' + 'Z'.repeat(16))).toEqual(['aws'])
    expect(kinds('a', 'sk_test_' + 'x8'.repeat(12))).toEqual(['stripe'])
    expect(kinds('a', 'AIza' + 'b'.repeat(35))).toEqual(['google'])
    expect(kinds('a', '-----BEGIN RSA ' + 'PRIVATE KEY-----')).toEqual(['private-key'])
  })
})

describe('scanPush (review finding 1): scans what is being PUSHED, not the disk', () => {
  it('finds a key in a commit even after the file is deleted from disk', async () => {
    const { execFileSync } = await import('node:child_process')
    const { mkdtempSync, writeFileSync, unlinkSync } = await import('node:fs')
    const { tmpdir } = await import('node:os')
    const { join } = await import('node:path')
    const { scanPush } = await import('../../scripts/secret-scan.mjs')
    const d = mkdtempSync(join(tmpdir(), 'lw-scan-'))
    const git = (...a: string[]) => execFileSync('git', a, { cwd: d, encoding: 'utf8' }).trim()
    git('init', '-q', '-b', 'main'); git('config', 'user.email', 't@t'); git('config', 'user.name', 't')
    writeFileSync(join(d, 'ok.txt'), 'hello'); git('add', '.'); git('commit', '-q', '-m', 'one')
    const base = git('rev-parse', 'HEAD')
    writeFileSync(join(d, 'notes.txt'), `token ${GH}`); git('add', '.'); git('commit', '-q', '-m', 'two')
    writeFileSync(join(d, 'notes.txt'), 'clean now'); git('commit', '-qam', 'three')   // # removed in a later commit
    unlinkSync(join(d, 'notes.txt'))                                                   // # and gone from disk
    const head = git('rev-parse', 'HEAD')
    const found = scanPush(d, `refs/heads/main ${head} refs/heads/main ${base}\n`)
    expect(found.map((f: { kind: string }) => f.kind)).toContain('github')
    // # a brand-new branch (remote sha all zeros) scans every commit not on any remote
    expect(scanPush(d, `refs/heads/main ${head} refs/heads/main ${'0'.repeat(40)}\n`).map((f: { kind: string }) => f.kind)).toContain('github')
    // # a delete push (local sha zeros) has nothing to scan
    expect(scanPush(d, `(delete) ${'0'.repeat(40)} refs/heads/x ${head}\n`)).toEqual([])
  })
})
