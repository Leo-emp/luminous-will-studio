// ============================================================
// COVERS — "How Mortgages Actually Work"
// Drawn with this video's own art (art/diorama/mortgage/kit.tsx, golden-hour suburb):
// the terracotta home, the lender's hall, the interest seesaw, brick-red interest coins.
// Words = one full, true sentence (owner rule 2026-11-10). Hero = the video's investorF.
// Facts (job facts.json / script): month 1 of $2,263 → $1,998 interest, $264 home;
// total interest over 30 years ≈ $480,000 on $334,000 borrowed.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { BRICK, Brick, ClaimRibbon, Coins, Ground, Hills, Home, INK, Key, LenderHall, Seesaw, Sky, Tag } from '../diorama/mortgage/kit'

const JOB = '20261111-1151_how-mortgages-actually-work'
const GOLD = '#F2B544', PLUM = '#2A2448'
const G = 960 // # ground line
const Back: React.FC<{ id: string }> = ({ id }) => (
  <g><Sky id={id} sun={[1700, 640]} sunR={120} /><Hills id={`${id}-h`} y={G - 60} /><Ground id={`${id}-g`} y={G} /></g>
)

// # 1 — the interest seesaw: a tall red interest stack crushes one end, a single sage brick of home on the other
export const MG_C1 = makeCover({
  id: 'mg-1', job: JOB, canvas: 'wide',
  concept: 'Your first payment, weighed: the park seesaw slammed down under a tall stack of brick-red INTEREST coins ($1,998) while one small sage brick of HOME ($264) floats up on the other end; the hero is shocked.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="mgc1" />
      <Burst canvas="wide" cx={1250} cy={720} color="#FFFFFF" opacity={0.16} rays={18} />
      <Part name="seesaw" kind="object" x={860} y={560} w={800} h={430}>
        <g transform="translate(1250 820) scale(0.7)">
          <Seesaw x={0} y={0} tilt={-1} L={<Coins x={0} y={0} n={14} col={BRICK} s={1.3} />} R={<Brick x={0} y={-30} s={1.2} />} />
        </g>
      </Part>
      <Part name="t-int" kind="object" x={880} y={500} w={320} h={100} touches={['seesaw']}><Tag x={1050} y={550} t="$1,998" col={BRICK} ink="#FFF4E2" /></Part>
      <Part name="t-home" kind="object" x={1420} y={590} w={260} h={100} touches={['seesaw']}><Tag x={1560} y={640} t="$264" /></Part>
      <Hero who="investorF" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY YOUR FIRST', size: 125 }, { t: 'MORTGAGE PAYMENT', size: 118 }, { t: 'IS MOSTLY INTEREST', size: 120, color: GOLD }]} x={1380} y={56} rotate={-2} ring={PLUM} />
    </CoverCanvas>
  ),
})

// # 2 — the real price: the home beside a giant red interest tower bigger than the house
export const MG_C2 = makeCover({
  id: 'mg-2', job: JOB, canvas: 'wide',
  concept: 'The price nobody shows you: the terracotta home next to a brick-red coin tower taller than its roof, tagged $480K INTEREST; the worried hero points at the tower.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="mgc2" />
      <Burst canvas="wide" cx={1500} cy={700} color="#FFFFFF" opacity={0.16} rays={18} />
      <Part name="home" kind="object" x={900} y={560} w={400} h={420}><Home id="mgc2-home" x={1100} y={G - 160} s={0.82} lit={0.8} /></Part>
      <Part name="tower" kind="object" x={1430} y={490} w={220} h={470}><Coins x={1540} y={G - 20} n={24} col={BRICK} s={1.15} /></Part>
      <Part name="tag" kind="object" x={1340} y={390} w={400} h={100} touches={['tower']}><Tag x={1555} y={440} t="$480K INTEREST" s={0.8} col={BRICK} ink="#FFF4E2" /></Part>
      <Hero who="investorF" pose="point" expression="worried" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHAT A MORTGAGE', size: 125 }, { t: 'REALLY COSTS YOU', size: 135, color: GOLD }]} x={1380} y={56} rotate={-2} ring={PLUM} />
    </CoverCanvas>
  ),
})

// # 3 — the deal: the lender's hall holds the key, a gold claim ribbon ties it to your home
export const MG_C3 = makeCover({
  id: 'mg-3', job: JOB, canvas: 'wide',
  concept: 'A deal and a promise: the lender\'s columned hall holding a big brass key, a gold claim ribbon running from it to the lit home; the smiling hero explains.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="mgc3" />
      <Burst canvas="wide" cx={1300} cy={720} color="#FFFFFF" opacity={0.16} rays={18} />
      <Part name="lender" kind="object" x={880} y={600} w={400} h={360}><LenderHall id="mgc3-l" x={1080} y={G} s={0.78} /></Part>
      <Part name="home" kind="object" x={1360} y={650} w={320} h={310}><Home id="mgc3-home" x={1520} y={G - 120} s={0.62} lit={0.9} /></Part>
      <Part name="ribbon" kind="extra" x={1100} y={560} w={360} h={160} touches={['lender', 'home', 'key']}><ClaimRibbon a={[1140, 640]} b={[1450, 700]} p={1} /></Part>
      <Part name="key" kind="extra" x={930} y={500} w={240} h={100} touches={['lender']}><Key x={1060} y={550} s={1.1} r={-12} /></Part>
      <Hero who="investorF" pose="point" expression="smiling" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW A MORTGAGE', size: 125 }, { t: 'ACTUALLY', size: 140 }, { t: 'WORKS', size: 170, color: GOLD }]} x={1380} y={56} rotate={-2} ring={PLUM} />
    </CoverCanvas>
  ),
})

export const MORTGAGE_COVERS = [MG_C1, MG_C2, MG_C3]
void INK
