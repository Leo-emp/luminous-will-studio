// ============================================================
// COVERS — Short "Your Free Phone Isn't Free: The Real Price of 0 Down".
// Sourced: Verizon device payment = 0% APR, 36 monthly installments,
// remaining balance due on the next bill if you disconnect; AT&T: device
// discounts paid as equal monthly credits, often over 36 months, only if
// you keep service + the same phone. $600 = the video's labelled example.
// Drawn from the video's own art: the glossy phone, the coral $0 DOWN sign,
// the gold chain, the $600 DUE NOW bill.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Phone, Sign, BillDoc, Tether } from '../diorama/phone0/kit'

const JOB = '20261112-1705_your-free-phone-isn-t-free-the-real-price-of-0-down'
const CORAL = '#FF7A6B', TEAL = '#2FB3A3', SUN = '#FFC94A'

// # 1) a glowing "free" phone hangs on a fishing hook; the hero eyes it, suspicious
export const PH_C1 = makeCover({
  id: 'phone0-1', job: JOB, canvas: 'tall',
  concept: 'A glossy glowing phone with a teal FREE tag dangles from a fishing hook on a line; the hero looks at it, thinking and suspicious.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#F3EEFB" bottom="#CFC2EE" />
      <Burst canvas="tall" cx={660} cy={900} color="#FFFFFF" opacity={0.4} />
      <Glow id="ph1" x={660} y={900} r={420} color="#FFE6A0" opacity={0.6} />
      <Ground canvas="tall" y={1440} color="#8ED6C0" edge="#BFEBDD" />
      <Part name="phone" kind="object" x={480} y={520} w={360} h={700}>
        <line x1={660} y1={520} x2={660} y2={560} stroke="#2A2346" strokeWidth={6} />
        <path d="M660 540 L660 590 A30 30 0 1 1 630 590" fill="none" stroke="#8A80A8" strokeWidth={12} strokeLinecap="round" />
        <Phone x={660} y={900} s={1.05} r={6} glow={1} screen={<g><rect x={-100} y={-40} width={200} height={90} rx={16} fill={TEAL} /><text y={30} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"' }}>FREE</text></g>} />
      </Part>
      <Hero pose="think" expression="thinking" x={220} y={2060} scale={1.9} />
      <Words lines={[{ t: 'WHY YOUR', size: 130 }, { t: 'FREE PHONE', size: 150, color: TEAL }, { t: "ISN'T REALLY FREE", size: 112 }]} x={540} y={150} rotate={-3} ring="#4B3A78" />
    </CoverCanvas>
  ),
})

// # 2) the $600 DUE NOW bill slams down, the chain to the store snapped; hero shocked
export const PH_C2 = makeCover({
  id: 'phone0-2', job: JOB, canvas: 'tall',
  concept: 'A giant white phone bill reading $600 with a coral DUE NOW stamp swings down as a snapped gold chain falls away; the hero, phone in hand, is shocked.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#2C2552" bottom="#1B1636" />
      <Burst canvas="tall" cx={640} cy={880} color="#FF9A85" opacity={0.18} />
      <Glow id="ph2" x={640} y={880} r={440} color="#FF7A6B" opacity={0.25} />
      <Ground canvas="tall" y={1440} color="#15112B" edge="#3A3170" />
      <Part name="chain" kind="scenery" x={120} y={560} w={860} h={120}>
        <Tether a={[120, 600]} b={[980, 600]} snap={0.8} />
      </Part>
      <Part name="bill" kind="object" x={440} y={620} w={460} h={590}>
        <BillDoc x={670} y={910} s={1.05} r={5} amount="$600" amountCol="#D9503F" stamp="DUE NOW" stampO={1} />
      </Part>
      <Hero pose="shock" expression="shocked" x={220} y={2070} scale={1.85} />
      <Words lines={[{ t: 'HOW A FREE PHONE', size: 118 }, { t: 'CAN TURN INTO', size: 120 }, { t: 'A $600 BILL', size: 150, color: CORAL }]} x={540} y={150} rotate={-3} ring="#1B1636" />
    </CoverCanvas>
  ),
})

// # 3) the coral $0 DOWN sign with the phone chained to the store counter; hero points at the chain
export const PH_C3 = makeCover({
  id: 'phone0-3', job: JOB, canvas: 'tall',
  concept: 'A big coral $0 DOWN sale sign; under it a glossy phone is held by a heavy gold chain to the store; the worried hero points at the chain.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#FFE9D6" bottom="#FFC3A8" />
      <Burst canvas="tall" cx={680} cy={860} color="#FFFFFF" opacity={0.35} />
      <Ground canvas="tall" y={1440} color="#8ED6C0" edge="#BFEBDD" />
      <Part name="sign" kind="object" x={460} y={560} w={440} h={360}>
        <Sign x={680} y={1120} s={0.95} l1="$0" l2="DOWN" col={CORAL} />
      </Part>
      <Part name="phone" kind="object" x={500} y={1000} w={200} h={340} touches={['chain']}>
        <Phone x={600} y={1170} s={0.55} r={-8} />
      </Part>
      <Part name="chain" kind="object" x={640} y={1180} w={320} h={110} touches={['phone']}>
        <Tether a={[650, 1240]} b={[960, 1230]} col={SUN} />
      </Part>
      <Hero pose="point" expression="worried" x={200} y={2070} scale={1.8} />
      <Words lines={[{ t: 'THE REAL PRICE', size: 132 }, { t: 'OF A $0 DOWN', size: 140, color: '#D9503F' }, { t: 'PHONE', size: 150 }]} x={540} y={150} rotate={-3} ring="#8A4A2E" />
    </CoverCanvas>
  ),
})
