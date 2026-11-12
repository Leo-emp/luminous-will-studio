// ============================================================
// COVERS — "How Recessions Actually Work"
// Drawn with the video's own toy-theatre kit (art/diorama/recess/kit.tsx): the little shop row,
// the storm cloud on a stick, the sun on a stick, fact cards.
// Background: deep navy (owner 2026-11-12 — dark only for negative topics; a recession is one).
// Facts (script): one person's spending is another's income; 8.7 million jobs lost 2008–10;
// it ends when spending returns.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { PlainBg } from './bg'
import { FactCard, Shop, StickCloud, StickSun } from '../diorama/recess/kit'

const JOB = '20261112-0131_how-recessions-actually-work'
const ACC = '#FF8A5B', RING = '#0B1226'
const Back: React.FC<{ id: string }> = ({ id }) => <PlainBg id={id} top="#1B2748" bot="#2D3B63" floor="#3A3550" />

// # 1 — the spread: a row of shops going dark one after another under a storm cloud
export const REC_1 = makeCover({
  id: 'rec-1', job: JOB, canvas: 'wide',
  concept: 'How it spreads: three little shops in a row, the first lit, the next dimmer, the last dark and shut, a storm cloud on a stick above; the worried hero.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="rc1" />
      <Burst canvas="wide" cx={1280} cy={760} color="#FFFFFF" opacity={0.08} rays={18} />
      <Part name="shops" kind="object" x={880} y={640} w={800} h={320}>
        <Shop x={980} y={950} s={0.9} name="CAFE" kind="cafe" lit={1} />
        <Shop x={1220} y={950} s={0.9} name="BARBER" kind="barber" lit={0.4} dark={0.4} />
        <Shop x={1460} y={950} s={0.9} name="GROCER" kind="grocer" lit={0} dark={1} />
      </Part>
      <Part name="cloud" kind="extra" x={1520} y={540} w={220} h={160} touches={['shops']}><StickCloud x={1640} y={620} s={1.0} storm={1} f={30} /></Part>
      <Hero who="buyer" pose="nervous" expression="worried" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW A RECESSION', size: 120 }, { t: 'SPREADS FROM', size: 128 }, { t: 'SHOP TO SHOP', size: 135, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})

// # 2 — the damage: one big fact card, 8.7 million jobs lost
export const REC_2 = makeCover({
  id: 'rec-2', job: JOB, canvas: 'wide',
  concept: 'What really happens: a big fact card reading 8.7 MILLION JOBS LOST (2008–10) in front of a dark shut shop; the shocked hero.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="rc2" />
      <Burst canvas="wide" cx={1280} cy={740} color="#FFFFFF" opacity={0.08} rays={18} />
      <Part name="shop" kind="object" x={1300} y={640} w={380} h={320}><Shop x={1490} y={950} s={1.0} name="WORKS" kind="works" lit={0} dark={1} /></Part>
      <Part name="card" kind="object" x={880} y={640} w={420} h={330}><FactCard x={1090} y={800} head="JOBS LOST, 2008–10" big="8.7M" small="in the US" s={1.2} r={-4} /></Part>
      <Hero who="buyer" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHAT REALLY', size: 135 }, { t: 'HAPPENS IN', size: 135 }, { t: 'A RECESSION', size: 140, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})

// # 3 — the way out: the sun on a stick rising over the shop row, lights coming back on
export const REC_3 = makeCover({
  id: 'rec-3', job: JOB, canvas: 'wide',
  concept: 'How it ends: the sun on a stick rising behind the little shop row as the lights come back on; the hopeful hero points.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="rc3" />
      <Burst canvas="wide" cx={1300} cy={640} color="#FFD27A" opacity={0.14} rays={18} />
      <Part name="sun" kind="extra" x={1190} y={620} w={220} h={190}><StickSun x={1300} y={720} s={0.9} f={30} /></Part>
      <Part name="shops" kind="object" x={900} y={680} w={760} h={280} touches={['sun']}>
        <Shop x={1060} y={950} s={0.85} name="CAFE" kind="cafe" lit={1} />
        <Shop x={1300} y={950} s={0.85} name="BARBER" kind="barber" lit={1} />
        <Shop x={1540} y={950} s={0.85} name="GROCER" kind="grocer" lit={0.6} />
      </Part>
      <Hero who="buyer" pose="point" expression="smiling" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW A', size: 140 }, { t: 'RECESSION', size: 140 }, { t: 'ACTUALLY ENDS', size: 125, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})
