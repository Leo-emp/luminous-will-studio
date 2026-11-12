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
