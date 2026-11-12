// ============================================================
// COVER — Short "Why Most of Buffett's Money Came Late"
// Sourced: Berkshire 2024 letter — $1 (end-1964) ≈ $1,650 by 1994 (Buffett 64) → ≈ $55,000 by 2024 (≈97% after 64).
// Drawn from the video's own snowball art; light pale-sky background (rule r92: light, varied — last covers cream, mint).
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Snowball, Sign, Pine } from '../diorama/snowball/kit'

const JOB = '20261112-1703_why-most-of-buffett-s-money-came-late'

// # a tiny snowball at age 64 vs a giant glowing one in 2024; the shocked hero points at the giant
export const SNB_C1 = makeCover({
  id: 'snowball-1', job: JOB, canvas: 'tall',
  concept: 'On a bright snowy valley floor a tiny snowball by a birthday cake marked 64 (≈ $1,650) sits beside a giant glowing snowball (≈ $55,000); the shocked hero points up at the giant one.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#EEF7FD" bottom="#CFE6F5" />
      <Burst canvas="tall" cx={690} cy={960} color="#FFFFFF" opacity={0.6} />
      <Glow id="snb1" x={690} y={980} r={460} color="#FFF3C8" opacity={0.7} />
      <Ground canvas="tall" y={1440} color="#F4F9FD" edge="#B9CFE0" />
      <path d="M-20 816 L470 816 Q560 822 600 900 L760 1440 L-20 1440 Z" fill="#E2EEF7" />
      <path d="M-20 816 L470 816 Q560 822 600 900" fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" />
      <Pine x={70} y={1440} s={1.1} /><Pine x={1010} y={1440} s={0.9} />
      <Part name="giant" kind="object" x={440} y={920} w={500} h={520}>
        <Snowball id="cv-g" x={690} y={1190} r={250} glow={1} />
        <Sign x={690} y={1190} t="≈ $55,000" size={84} col="#E9B53A" />
      </Part>
      <Part name="tiny" kind="object" x={200} y={600} w={270} h={220}>
        <Snowball id="cv-t" x={330} y={770} r={46} coin />
        <Sign x={335} y={650} t="AGE 64: ≈ $1,650" size={40} />
      </Part>
      <Hero pose="pointUp" expression="shocked" x={200} y={2070} scale={1.85} />
      <Words lines={[{ t: 'WHY MOST OF', size: 130 }, { t: 'BUFFETT’S MONEY', size: 130, color: '#2E86C1' }, { t: 'CAME AFTER 64', size: 140 }]} x={540} y={150} rotate={-3} ring="#1D2B44" />
    </CoverCanvas>
  ),
})
