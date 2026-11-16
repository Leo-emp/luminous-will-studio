// # normalize must actually REACH its loudness target on speech-like audio (quiet body, sharp peaks).
// # Owner 2026-11-13: the LW Short asked for −11.5 LUFS but came out at −12.4 — the old loop gave up after
// # 4 rounds because the limiter kept eating the added gain on the voice's peaks.
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'
import { ff, loudness, normalize } from '../../agent/audio'

test('normalize reaches −11.5 LUFS (±0.5) on peaky speech-like audio, true peak ≤ −0.9 dB', () => {
  const dir = mkdtempSync(join(tmpdir(), 'lwnorm-'))
  const src = join(dir, 'peaky.wav'), out = join(dir, 'out.wav')
  // # a quiet −30 dB body with a loud 12 ms burst every 0.25 s (like plosives in a voice): crest ≈ 26 dB
  ff(['-f', 'lavfi', '-i', "aevalsrc='0.03*sin(2*PI*220*t)+if(lt(mod(t,0.25),0.012),0.9*sin(2*PI*900*t),0)':s=48000:d=8", '-ac', '1', src], 'peaky')
  const level = normalize(src, out, -11.5, 'acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120')
  const l = loudness(out)
  expect(Math.abs(l.lufs - -11.5)).toBeLessThanOrEqual(0.5)
  expect(Math.abs(level - l.lufs)).toBeLessThan(0.2)
  expect(l.peak).toBeLessThanOrEqual(-0.9)
}, 120_000)
