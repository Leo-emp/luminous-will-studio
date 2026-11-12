// ============================================================
// COVERS — Short "Lose 50 Percent, Gain 50 Percent, and You're
// Still Down": $1,000 → −50% → +50% = $750 (−25%); a 50% loss needs
// +100%; the Nasdaq fell ≈78% (Mar 2000 → Oct 2002) and took until
// Apr 2015 (≈15 years) to close above its record.
// Drawn from the video's own art: gold $100 bricks + alpine world.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Brick, Stack } from '../diorama/climb/kit'

const JOB = '20261112-1411_lose-50-percent-gain-50-percent-and-you-re-still-down'
const GOLD = '#F2B632', RED = '#E5533F', GREEN = '#36C27E', INK = '#05070C'
const Ridge: React.FC<{ y: number; c1: string; c2: string }> = ({ y, c1, c2 }) => (
  <g><path d={`M-20 ${y} L160 ${y - 220} L300 ${y - 120} L470 ${y - 300} L640 ${y - 140} L820 ${y - 260} L1100 ${y - 90} L1100 ${y + 400} L-20 ${y + 400} Z`} fill={c1} />
    <path d={`M-20 ${y + 120} L200 ${y - 20} L420 ${y + 80} L650 ${y - 40} L900 ${y + 70} L1100 ${y + 10} L1100 ${y + 500} L-20 ${y + 500} Z`} fill={c2} /></g>
)
const Pill: React.FC<{ x: number; y: number; t: string; bg: string; size?: number }> = ({ x, y, t, bg, size = 96 }) => {
  const w = t.length * size * 0.44 + 60, h = size + 30
  return <g><rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2} fill={bg} stroke={INK} strokeWidth={8} /><text x={x} y={y + size * 0.36} textAnchor="middle" fill="#FFFFFF" style={{ font: `400 ${size}px "Bebas Neue"` }}>{t}</text></g>
}

// # 1) the stack that did not come back: 7½ gold bricks under a dashed START line, the missing quarter glowing red
export const CL_C1 = makeCover({
  id: 'climb-1', job: JOB, canvas: 'tall',
  concept: 'The hero stares in shock at his brick stack: it went down half and up half, yet the top quarter is a red, missing gap below the START line.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#F9E3C2" bottom="#F0B98E" />
      <Ridge y={1000} c1="#8E9CBB" c2="#5D6C93" />
      <Glow id="cl1" x={720} y={900} r={420} color="#FFE6A0" opacity={0.5} />
      <Ground canvas="tall" y={1420} color="#6A5B49" edge="#A8957C" />
      <Part name="stack" kind="object" x={440} y={570} w={450} h={860}>
        <g transform="translate(720 1420) scale(1.45) translate(-720 -1420)">
          <Stack x={720} y={1420} n={7.5} />
          <Stack x={720} y={1420 - 7.5 * 58} n={2.5} tone="red" o={0.75} />
          <line x1={580} y1={1420 - 580} x2={860} y2={1420 - 580} stroke={INK} strokeWidth={5} strokeDasharray="16 10" />
        </g>
        <Pill x={725} y={700} t="−25%" bg={RED} size={90} />
      </Part>
      <Hero pose="shock" expression="shocked" x={215} y={2060} scale={2.0} />
      <Words lines={[{ t: 'WHY DOWN 50%,', size: 130 }, { t: 'THEN UP 50%,', size: 130, color: GREEN }, { t: 'STILL LOSES MONEY', size: 112, color: RED }]} x={540} y={150} rotate={-3} ring="#7A4A22" />
    </CoverCanvas>
  ),
})

// # 2) a 50% fall vs the 100% climb back: a short red drop beside a towering green climb, hero worried at the bottom
export const CL_C2 = makeCover({
  id: 'climb-2', job: JOB, canvas: 'tall',
  concept: 'A short red arrow marks the 50% fall; next to it a towering green arrow marks the 100% climb back; the worried hero looks up at it.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#1D2F57" bottom="#3E5C8E" />
      <Burst canvas="tall" cx={740} cy={860} color="#9CF0C4" opacity={0.12} />
      <Ridge y={1080} c1="#2C426B" c2="#1A2742" />
      <Ground canvas="tall" y={1420} color="#141C30" edge="#3C4A6C" />
      <Part name="fall" kind="object" x={480} y={640} w={200} h={420}>
        <rect x={545} y={700} width={70} height={200} rx={10} fill={RED} /><path d="M495 890 L580 990 L665 890 Z" fill={RED} />
        <Pill x={580} y={680} t="−50%" bg={RED} size={72} />
      </Part>
      <Part name="climb" kind="object" x={700} y={560} w={230} h={830}>
        <rect x={775} y={680} width={80} height={700} rx={10} fill={GREEN} /><path d="M715 700 L815 580 L915 700 Z" fill={GREEN} />
        <Pill x={815} y={1000} t="+100%" bg={GREEN} size={72} />
      </Part>
      <Hero pose="lookFar" expression="worried" x={200} y={2040} scale={1.9} />
      <Words lines={[{ t: 'WHY A 50% LOSS', size: 130 }, { t: 'NEEDS A 100% GAIN', size: 116, color: GREEN }, { t: 'JUST TO GET BACK', size: 116 }]} x={540} y={150} rotate={-3} ring="#0E1B33" />
    </CoverCanvas>
  ),
})

// # 3) the Nasdaq mountain: the 2000 peak, the 2002 pit, the long climb to the 2015 flag
export const CL_C3 = makeCover({
  id: 'climb-3', job: JOB, canvas: 'tall',
  concept: 'A moonlit mountain: the MAR 2000 peak, a red cliff down to the 2002 low and a long green trail to the APR 2015 flag; the hero gapes at how long the climb took.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#0E1B33" bottom="#2B4A78" />
      <Glow id="cl3" x={820} y={640} r={300} color="#DDE8FF" opacity={0.35} />
      <Ground canvas="tall" y={1420} color="#0F1626" edge="#3C4A6C" />
      <Part name="mountain" kind="scenery" x={60} y={600} w={960} h={820}>
        <path d="M60 1420 L230 640 L380 1250 L980 630 L1040 1420 Z" fill="#24365C" />
        <path d="M230 640 L380 1250 L300 1420 L60 1420 Z" fill="#2D4373" />
        <line x1={230} y1={640} x2={380} y2={1250} stroke="#F08A7A" strokeWidth={14} strokeLinecap="round" />
        <line x1={380} y1={1250} x2={980} y2={630} stroke="#66D19B" strokeWidth={14} strokeDasharray="6 24" strokeLinecap="round" />
        <line x1={230} y1={640} x2={980} y2={640} stroke={GOLD} strokeWidth={6} strokeDasharray="18 12" />
        <line x1={230} y1={640} x2={230} y2={520} stroke="#F7F4EE" strokeWidth={8} /><path d="M230 520 L320 540 L230 560 Z" fill={GOLD} />
        <line x1={980} y1={630} x2={980} y2={510} stroke="#F7F4EE" strokeWidth={8} /><path d="M980 510 L890 530 L980 550 Z" fill={GREEN} />
      </Part>
      <Part name="y2000" kind="object" x={110} y={720} w={240} h={90}><Pill x={230} y={765} t="2000" bg="#3B4C70" size={64} /></Part>
      <Part name="y2015" kind="object" x={760} y={700} w={240} h={90}><Pill x={880} y={745} t="2015" bg={GREEN} size={64} /></Part>
      <Part name="drop" kind="object" x={60} y={960} w={240} h={110}><Pill x={180} y={1015} t="−78%" bg={RED} size={80} /></Part>
      <Hero pose="shock" expression="shocked" x={830} y={2090} scale={2.1} flip />
      <Words lines={[{ t: 'HOW THE NASDAQ', size: 130 }, { t: 'TOOK 15 YEARS', size: 140, color: GOLD }, { t: 'TO GET BACK', size: 130 }]} x={540} y={150} rotate={-3} ring="#0E1B33" />
    </CoverCanvas>
  ),
})
