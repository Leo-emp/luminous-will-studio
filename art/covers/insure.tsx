// ============================================================
// COVERS — "How Insurance Companies Actually Make Money"
// Drawn with the video's own Harbour Town kit (art/diorama/insure/kit.tsx): the float reservoir,
// the umbrella over the house, gold coin stacks, the dented car.
// Background: soft sea-mist blue (owner 2026-11-12 — light colours, varied per video).
// Facts (script): ~$1,500 car premium; two engines — underwriting and the float; some years insurers
// lose billions on the insurance itself and still profit.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { PlainBg } from './bg'
import { Car, Flag, House, Reservoir, Stack, Umbrella } from '../diorama/insure/kit'

const JOB = '20261112-0119_how-insurance-companies-actually-make-money'
const ACC = '#F2B544', RING = '#1F4E63'
const Back: React.FC<{ id: string }> = ({ id }) => <PlainBg id={id} top="#F2F7F7" bot="#D5E7EA" floor="#B9D1C2" />

// # 1 — the float: a reservoir of premiums the insurer invests before claims come in
export const INS_1 = makeCover({
  id: 'ins-1', job: JOB, canvas: 'wide',
  concept: 'The float: a big reservoir filling with premiums labelled FLOAT, a gold coin stack growing beside it; the smug owner points.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="in1" />
      <Burst canvas="wide" cx={1250} cy={740} color="#FFFFFF" opacity={0.4} rays={18} />
      <Part name="tank" kind="object" x={900} y={620} w={440} h={340}><Reservoir x={1120} y={950} w={400} h={320} level={0.72} f={40} label="FLOAT" /></Part>
      <Part name="coins" kind="object" x={1420} y={640} w={240} h={320}><Stack x={1540} y={950} n={14} r={95} col="gold" /></Part>
      <Hero who="owner" pose="point" expression="smug" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'HOW INSURERS', size: 130 }, { t: 'MAKE MONEY', size: 135 }, { t: 'BEFORE YOU CLAIM', size: 112, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})

// # 2 — the twist: the umbrella over the house, coins pile up anyway
export const INS_2 = makeCover({
  id: 'ins-2', job: JOB, canvas: 'wide',
  concept: 'Lose on insurance, still win: a striped umbrella over a little house, a red coin stack (claims) beside a taller gold stack (profit); the shocked hero.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="in2" />
      <Burst canvas="wide" cx={1250} cy={740} color="#FFFFFF" opacity={0.4} rays={18} />
      <Part name="house" kind="object" x={900} y={540} w={420} h={420}><Umbrella x={1110} y={640} s={1.6} /><House x={1110} y={950} s={2.3} /></Part>
      <Part name="red" kind="object" x={1380} y={760} w={140} h={200}><Stack x={1450} y={950} n={6} r={85} col="red" /></Part>
      <Part name="gold" kind="object" x={1540} y={600} w={140} h={360}><Stack x={1610} y={950} n={13} r={85} col="gold" /></Part>
      <Hero who="owner" pose="shock" expression="shocked" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHY INSURERS WIN', size: 118 }, { t: 'EVEN WHEN THEY', size: 120 }, { t: 'LOSE ON CLAIMS', size: 122, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})

// # 3 — your bill: the car you never crash, with its $1,500 premium flag
export const INS_3 = makeCover({
  id: 'ins-3', job: JOB, canvas: 'wide',
  concept: 'Where the premium goes: a shiny car with a $1,500 flag on a pole above it; the thinking hero wonders.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Back id="in3" />
      <Burst canvas="wide" cx={1280} cy={760} color="#FFFFFF" opacity={0.4} rays={18} />
      <Part name="car" kind="object" x={920} y={700} w={640} h={260}><Car x={1260} y={940} s={2.7} hue="#D9533F" /></Part>
      <Part name="flag" kind="object" x={1120} y={520} w={300} h={100} touches={['car']}><Flag x={1270} y={600} text="$1,500 A YEAR" size={56} /></Part>
      <Hero who="owner" pose="think" expression="thinking" x={400} y={1330} scale={1.85} />
      <Words lines={[{ t: 'WHERE YOUR', size: 135 }, { t: 'INSURANCE MONEY', size: 116 }, { t: 'REALLY GOES', size: 135, color: ACC }]} x={1380} y={56} rotate={-2} ring={RING} />
    </CoverCanvas>
  ),
})
