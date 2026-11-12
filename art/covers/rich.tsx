// ============================================================
// COVERS — "10 Fastest Ways to Get Rich (Legally)"
// Drawn with the video's own kit (art/diorama/rich/kit.tsx): coin towers, the 22% card, the rocket.
// Background: pale peach (owner 2026-11-12 — light colours for a positive topic).
// Facts (script): 4 levels — keep more (22% card debt, 50% match), earn more, own more, bet big;
// the faster ways can also go backwards harder.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { PlainBg } from './bg'
import { Card, Cross, Rocket, Ticket, Tower, WayBadge } from '../diorama/rich/kit'

const JOB = '20261111-1825_10-fastest-ways-to-get-rich-legally'
const ACC = '#E0663A', RING = '#7A3B1E'
const Back: React.FC<{ id: string }> = ({ id }) => <PlainBg id={id} top="#FFF1E2" bot="#FAD9BE" floor="#E9B994" />

// # 1 — the climb: four coin towers, each level taller, numbered 1–4
export const RICH_1 = makeCover({
  id: 'rich-1', job: JOB, canvas: 'wide',
  concept: 'The four levels: four coin towers rising left to right, badged 1 to 4 (keep, earn, own, bet); the smiling hero points at the climb.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="rh1" />
      <Burst canvas="wide" cx={1300} cy={760} color="#FFFFFF" opacity={0.35} rays={18} />
      <Part name="towers" kind="object" x={900} y={560} w={780} h={400}>
        <Tower x={990} y={950} n={4} s={1.5} />
        <Tower x={1210} y={950} n={8} s={1.5} />
        <Tower x={1430} y={950} n={12} s={1.5} />
        <Tower x={1620} y={950} n={16} s={1.5} />
      </Part>
      <Hero who="worker" pose="point" expression="smiling" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW PEOPLE', size: 130 }, { t: 'REALLY GET RICH,', size: 118 }, { t: 'LEVEL BY LEVEL', size: 120, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})

// # 2 — the risky shortcut: a rocket turning back down, crossed out
export const RICH_2 = makeCover({
  id: 'rich-2', job: JOB, canvas: 'wide',
  concept: 'Fast can go backwards: the "bet big" rocket tipping nose-down toward the ground; the shocked hero watches.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="rh2" />
      <Burst canvas="wide" cx={1300} cy={720} color="#FFFFFF" opacity={0.35} rays={18} />
      <Part name="rocket" kind="object" x={1000} y={520} w={560} h={440}><Rocket x={1300} y={660} s={1.5} r={150} flame={0.8} f={30} /></Part>
      <Hero who="worker" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY THE FASTEST', size: 122 }, { t: 'WAY TO GET RICH', size: 118 }, { t: 'CAN GO BACKWARDS', size: 112, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})

// # 3 — keep more first: the 22% card crossed out, a growing coin tower beside it
export const RICH_3 = makeCover({
  id: 'rich-3', job: JOB, canvas: 'wide',
  concept: 'Start at the bottom: a credit card tagged 22% with a big red cross, next to a coin tower badged 1; the thinking hero.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="rh3" />
      <Burst canvas="wide" cx={1300} cy={740} color="#FFFFFF" opacity={0.35} rays={18} />
      <Part name="card" kind="object" x={1000} y={660} w={380} h={280}><Card x={1180} y={790} s={1.3} r={-8} /><Cross x={1180} y={790} s={1.4} /></Part>
      <Part name="tag" kind="object" x={1020} y={540} w={320} h={100} touches={['card']}><Ticket x={1180} y={590} t="22% INTEREST" size={44} /></Part>
      <Part name="tower" kind="object" x={1420} y={560} w={240} h={400}><Tower x={1560} y={950} n={14} s={1.5} /></Part>
      <Part name="badge" kind="extra" x={1480} y={470} w={120} h={110} touches={['tower']}><WayBadge x={1540} y={525} n={1} s={1.1} /></Part>
      <Hero who="worker" pose="point" expression="thinking" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY GETTING RICH', size: 118 }, { t: 'STARTS WITH', size: 130 }, { t: 'KEEPING MORE', size: 135, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})
