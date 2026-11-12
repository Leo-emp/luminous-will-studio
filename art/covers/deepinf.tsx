// ============================================================
// COVERS — "How Inflation Actually Works: The Deep Dive"
// Drawn with the video's own Paper Market kit (art/diorama/deepinf/kit.tsx): the grocery basket,
// the shrinking paper dollar, the price tags, the thermometer.
// Background: warm sand beige (owner 2026-11-12 — light colours, varied per video).
// Facts (script): the same $120 weekly shop costs $123.60 a year later (3%); your dollars got weaker.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { PlainBg } from './bg'
import { Basket, Dollar, Strike, Tag, Thermo } from '../diorama/deepinf/kit'

const JOB = '20261112-0255_how-inflation-actually-works-the-deep-dive'
const ACC = '#D94F3D', RING = '#4A3420'
const Back: React.FC<{ id: string }> = ({ id }) => <PlainBg id={id} top="#FBF3E4" bot="#EEDDBF" floor="#D8BF95" />

// # 1 — same basket, new price: $120 struck out, $123.60 on top
export const INFD_1 = makeCover({
  id: 'infd-1', job: JOB, canvas: 'wide',
  concept: 'Same groceries, new price: one grocery basket with a $120 tag struck through and a red $123.60 tag above it; the shocked hero.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="di1" />
      <Burst canvas="wide" cx={1280} cy={760} color="#FFFFFF" opacity={0.4} rays={18} />
      <Part name="basket" kind="object" x={960} y={660} w={460} h={300}><Basket x={1190} y={900} s={1.5} /></Part>
      <Part name="old" kind="object" x={1430} y={760} w={240} h={90} touches={['basket']}><Tag x={1550} y={805} text="$120" size={56} /><Strike x={1550} y={805} w={200} t={1} /></Part>
      <Part name="new" kind="object" x={1400} y={600} w={280} h={100} touches={['old']}><Tag x={1540} y={650} text="$123.60" size={60} color={ACC} ink="#FFF4E2" rot={-5} /></Part>
      <Hero who="buyer" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY THE SAME', size: 130 }, { t: 'GROCERIES COST', size: 122 }, { t: 'MORE EVERY YEAR', size: 115, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})

// # 2 — the shrinking dollar: a big paper dollar next to a small faded one
export const INFD_2 = makeCover({
  id: 'infd-2', job: JOB, canvas: 'wide',
  concept: 'Your dollars got weaker: a big crisp paper dollar beside the same dollar shrunk and faded; the worried hero points.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="di2" />
      <Burst canvas="wide" cx={1280} cy={760} color="#FFFFFF" opacity={0.4} rays={18} />
      <Part name="big" kind="object" x={900} y={580} w={420} h={300}><Dollar x={1110} y={730} s={1.6} power={1} rot={-6} /></Part>
      <Part name="small" kind="object" x={1400} y={680} w={260} h={190}><Dollar x={1540} y={800} s={1.25} power={0.55} rot={4} /></Part>
      <Hero who="buyer" pose="point" expression="worried" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY YOUR DOLLARS', size: 116 }, { t: 'KEEP GETTING', size: 132 }, { t: 'WEAKER', size: 165, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})

// # 3 — the ratchet: a thermometer that only climbs, price tag pinned high
export const INFD_3 = makeCover({
  id: 'infd-3', job: JOB, canvas: 'wide',
  concept: 'Prices only go one way: a tall price thermometer near the top beside a basket; the thinking hero.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="di3" />
      <Burst canvas="wide" cx={1280} cy={740} color="#FFFFFF" opacity={0.4} rays={18} />
      <Part name="thermo" kind="object" x={1420} y={560} w={240} h={400}><Thermo x={1540} y={880} v={12} s={0.85} label="PRICES" /></Part>
      <Part name="basket" kind="object" x={940} y={680} w={420} h={280}><Basket x={1150} y={910} s={1.35} /></Part>
      <Hero who="buyer" pose="think" expression="thinking" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY PRICES RISE', size: 120 }, { t: 'AND NEVER COME', size: 120 }, { t: 'BACK DOWN', size: 145, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})
