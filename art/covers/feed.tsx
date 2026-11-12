// ============================================================
// COVERS — Short "How Much You're Worth to Instagram".
// Sourced: Meta Q3 2026 Family ARPP $17.72; last four quarters ≈ $67 per person a year; Facebook ARPU Q4 2023
// US & Canada $68.44 vs worldwide $13.12 (Meta FY2023 10-K). Drawn from the video's own "inside the feed" art:
// the glowing phone with gold AD posts, the price tag, the coin stacks on pedestals. No app logos.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { FeedPhone, Stack, Pedestal, Biz, Coin } from '../diorama/feed/kit'

const JOB = '20261112-1851_how-much-you-re-worth-to-instagram'
const PINK = '#FF4FA3', CYAN = '#3FE0F0', GOLD = '#FFC94A'

// # 1) MAIN — the glowing phone; a gold $67 price tag hangs from it toward the hero, who is shocked
export const IG_C1 = makeCover({
  id: 'feed-1', job: JOB, canvas: 'tall',
  concept: 'A giant glowing phone full of colourful posts and a gold AD post; a big gold ≈ $67 A YEAR price tag dangles from it; the hero stares at it in shock.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#231B55" bottom="#120F2E" />
      <Burst canvas="tall" cx={680} cy={900} color={PINK} opacity={0.18} />
      <Glow id="ig1" x={680} y={900} r={460} color={CYAN} opacity={0.22} />
      <Ground canvas="tall" y={1440} color="#0C0A22" edge="#7B5CFF" />
      <Part name="phone" kind="object" x={480} y={520} w={420} h={800}>
        <FeedPhone x={690} y={920} s={0.78} f={0} scroll={340} adEvery={2} adGlow={1} />
      </Part>
      <Part name="tag" kind="object" x={560} y={1330} w={330} h={150} touches={['phone']}>
        <line x1={700} y1={1300} x2={720} y2={1340} stroke="#FFFFFF" strokeWidth={5} />
        <g transform="translate(725 1400) rotate(-6)"><rect x={-160} y={-62} width={320} height={124} rx={22} fill={GOLD} /><text y={32} textAnchor="middle" fill="#4A2E00" style={{ font: '400 92px "Bebas Neue"' }}>≈ $67</text></g>
      </Part>
      <Hero pose="shock" expression="shocked" x={200} y={2070} scale={1.85} />
      <Words lines={[{ t: 'HOW MUCH', size: 140 }, { t: "YOU'RE WORTH", size: 140, color: GOLD }, { t: 'TO INSTAGRAM', size: 130 }]} x={540} y={150} rotate={-3} ring="#120F2E" />
    </CoverCanvas>
  ),
})

// # 2) businesses pour coins into the phone's ad slots; hero scrolling, unaware → thinking
export const IG_C2 = makeCover({
  id: 'feed-2', job: JOB, canvas: 'tall',
  concept: 'Three little glowing businesses toss gold coins into the gold AD posts of a giant glowing phone; the hero holds his own phone and thinks.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#2A1E66" bottom="#140F33" />
      <Burst canvas="tall" cx={640} cy={880} color={GOLD} opacity={0.14} />
      <Ground canvas="tall" y={1440} color="#0C0A22" edge="#7B5CFF" />
      <Part name="phone" kind="object" x={440} y={560} w={420} h={760}>
        <FeedPhone x={650} y={940} s={0.74} f={0} scroll={120} adEvery={2} adGlow={1} />
      </Part>
      <Part name="biz" kind="object" x={830} y={560} w={180} h={480} touches={['phone']}>
        {[0, 1, 2].map((k) => <Biz key={k} x={920} y={700 + k * 170} kind={k as 0 | 1 | 2} s={0.45} />)}
      </Part>
      {[0, 1, 2].map((k) => <Coin key={k} x={840 - k * 20} y={640 + k * 170} s={0.55} />)}
      <Hero pose="think" expression="thinking" x={200} y={2070} scale={1.85} />
      <Words lines={[{ t: 'WHO REALLY', size: 140 }, { t: 'PAYS FOR YOUR', size: 126 }, { t: 'FREE APPS', size: 150, color: PINK }]} x={540} y={150} rotate={-3} ring="#120F2E" />
    </CoverCanvas>
  ),
})

// # 3) two pedestals: a small worldwide stack vs a tall US & Canada stack; hero points at the tall one
export const IG_C3 = makeCover({
  id: 'feed-3', job: JOB, canvas: 'tall',
  concept: 'Two glowing pedestals: a small coin stack on WORLDWIDE and a tall glowing stack on US & CANADA; the hero points at the tall one, amazed.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#231B55" bottom="#120F2E" />
      <Glow id="ig3" x={760} y={900} r={420} color={GOLD} opacity={0.25} />
      <Ground canvas="tall" y={1440} color="#0C0A22" edge="#7B5CFF" />
      <Part name="small" kind="object" x={420} y={1150} w={200} h={290}>
        <Pedestal x={520} y={1440} w={200} t="WORLDWIDE" col="#3E3490" />
        <Stack x={520} y={1370} n={6} s={0.9} />
      </Part>
      <Part name="tall" kind="object" x={640} y={640} w={290} h={800}>
        <Pedestal x={785} y={1440} w={270} t="US & CANADA" col={PINK} />
        <Stack x={785} y={1370} n={34} s={1.1} glow={1} />
      </Part>
      <Hero pose="pointUp" expression="shocked" x={190} y={2070} scale={1.8} />
      <Words lines={[{ t: 'WHERE YOU LIVE', size: 130 }, { t: 'CHANGES WHAT', size: 126 }, { t: "YOU'RE WORTH", size: 146, color: GOLD }]} x={540} y={150} rotate={-3} ring="#120F2E" />
    </CoverCanvas>
  ),
})
