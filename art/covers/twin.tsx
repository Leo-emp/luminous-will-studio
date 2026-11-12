// ============================================================
// COVERS — Short "Good Debt vs Bad Debt": two friends each borrow the
// same $16,000; Zoe's buys a degree (6.52% federal loan, about $5,800
// interest over 10 years), Max's buys stuff on cards (~22%, about $24,200).
// Drawn from the video's own art: cash bundles, paper hang tags, tanks.
// Light backgrounds, a different tint per cover (r91/r92).
// ============================================================
import React from 'react'
import { CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Bundle, Cap, HangTag, Tank, TV } from '../diorama/twin/kit'

const JOB = '20261112-1743_good-debt-vs-bad-debt'
const ZOE = '#2A9D8F', MAX = '#E76F51', INK = '#2B2340'
const Up: React.FC<{ x: number; y: number; c: string; down?: boolean }> = ({ x, y, c, down }) => (
  <g transform={`translate(${x} ${y}) ${down ? 'rotate(180)' : ''}`}><rect x={-26} y={-40} width={52} height={150} rx={8} fill={c} /><path d="M-62 -30 L0 -110 L62 -30 Z" fill={c} /></g>
)

// # 1) the same bundle, two endings: a cap on one (green up), a TV on the other (red down); Zoe points, pleased
export const TW_C1 = makeCover({
  id: 'twin-1', job: JOB, canvas: 'tall',
  concept: 'Two identical $16,000 cash bundles side by side: one wears a graduation cap and a green arrow up, the other carries a TV and a red arrow down; Zoe points at them, smiling.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#E4F1FB" bottom="#C6E1F4" />
      <Glow id="tw1" x={540} y={900} r={460} color="#FFFFFF" opacity={0.6} />
      <Ground canvas="tall" y={1420} color="#9FC3DC" edge="#7FA9C6" />
      <Part name="good" kind="object" x={90} y={640} w={420} h={560}>
        <Bundle x={300} y={1120} s={1.15} />
        <Cap x={300} y={960} s={1.1} />
        <Up x={150} y={820} c={ZOE} />
      </Part>
      <Part name="bad" kind="object" x={560} y={640} w={350} h={560}>
        <Bundle x={730} y={1120} s={1.1} />
        <TV x={730} y={1010} s={0.75} age={0.6} />
        <Up x={860} y={740} c={MAX} down />
      </Part>
      <Hero who="zoe" pose="point" expression="smiling" x={560} y={2140} scale={1.6} />
      <Words lines={[{ t: 'SAME $16,000 LOAN', size: 116 }, { t: 'ONE PAID OFF', size: 130, color: ZOE }, { t: 'ONE JUST COST', size: 130, color: MAX }]} x={540} y={150} rotate={-3} ring="#2B4A6A" />
    </CoverCanvas>
  ),
})

// # 2) the two interest tanks: a low teal one and a coral one overflowing past the borrowed line; Max shocked
export const TW_C2 = makeCover({
  id: 'twin-2', job: JOB, canvas: 'tall',
  concept: 'Two glass tanks of interest: Zoe’s teal tank low at $5,800, Max’s coral tank risen past the dashed $16,000 line to $24,200; Max stares at it, shocked.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#FFF4CC" bottom="#FBE29A" />
      <Glow id="tw2" x={700} y={900} r={420} color="#FFFFFF" opacity={0.5} />
      <Ground canvas="tall" y={1420} color="#D9B866" edge="#C29E48" />
      <Part name="tanks" kind="object" x={110} y={545} w={780} h={635}>
        <Tank id="tc2a" x={330} y={1160} h={620} fill={0.19} color={ZOE} f={0} mark={325} markO={1} />
        <Tank id="tc2b" x={720} y={1160} h={620} fill={0.79} color={MAX} f={0} mark={325} markO={1} />
        <HangTag x={330} y={960} text="$5,800" size={74} r={-4} />
        <HangTag x={700} y={640} text="$24,200" size={70} r={4} />
      </Part>
      <Hero who="max" pose="shock" expression="shocked" x={230} y={2200} scale={1.6} />
      <Words lines={[{ t: 'SAME $16,000', size: 130 }, { t: 'WHY DID HIS DEBT', size: 112, color: MAX }, { t: 'COST 4X MORE?', size: 130, color: MAX }]} x={540} y={150} rotate={-3} ring="#6A4A12" />
    </CoverCanvas>
  ),
})

// # 3) the loan paper with the BAD stamp and a big question mark; Zoe thinking
export const TW_C3 = makeCover({
  id: 'twin-3', job: JOB, canvas: 'tall',
  concept: 'The hook’s loan paper, stamped BAD in red, with a big gold question mark on it; Zoe scratches her head, thinking.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#EFE7FB" bottom="#D8CBF2" />
      <Glow id="tw3" x={600} y={900} r={440} color="#FFFFFF" opacity={0.55} />
      <Ground canvas="tall" y={1420} color="#B7A6DA" edge="#9C89C8" />
      <Part name="paper" kind="object" x={360} y={560} w={550} h={760}>
        <g transform="translate(630 940) rotate(5) scale(1.12)">
          <rect x={-230} y={-290} width={460} height={580} rx={14} fill="#FFF8EC" stroke={INK} strokeWidth={6} />
          <rect x={-170} y={-230} width={220} height={36} rx={6} fill={INK} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-170} y={-150 + k * 52} width={k % 2 ? 260 : 340} height={14} rx={7} fill="#6E6488" opacity={0.4} />)}
          <g transform="translate(20 120) rotate(-14)"><rect x={-170} y={-80} width={340} height={160} rx={18} fill="none" stroke={MAX} strokeWidth={14} />
            <text x={0} y={46} textAnchor="middle" fill={MAX} style={{ font: '400 140px "Bebas Neue"', letterSpacing: 8 }}>BAD</text></g>
          <g transform="translate(150 -60)"><circle r={90} fill="#E9B949" /><text x={0} y={56} textAnchor="middle" fill={INK} style={{ font: '400 170px "Bebas Neue"' }}>?</text></g>
        </g>
      </Part>
      <Hero who="zoe" pose="scratchHead" expression="thinking" x={210} y={2140} scale={1.65} />
      <Words lines={[{ t: 'IS ALL DEBT', size: 140 }, { t: 'REALLY BAD?', size: 160, color: MAX }]} x={540} y={170} rotate={-3} ring="#4A3A7A" />
    </CoverCanvas>
  ),
})
