// ============================================================
// COVERS — Short "Your Bank's Overdraft Fee Is a 13,600% Loan":
// a $24 debit purchase at a $0 balance, an average $26.77 (≈ $27)
// overdraft fee (Bankrate 2025), repaid 3 days later = ≈ 13,600% a
// year; the same $24 on an average card (22.36%) ≈ 4¢ of interest.
// Drawn from the video's own art: the red price tag, the corner-store
// checkout, the brass scale and the cracked rate dial.
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Tag, Bag, Terminal, Card, Scale, Penny, Gauge } from '../diorama/overdraft/kit'

const JOB = '20261112-1410_your-bank-s-overdraft-fee-is-a-13-600-loan'
const RED = '#E5533F', GOLD = '#F2B632', GREEN = '#36C27E'

// # 1) the checkout: the card goes through at $0 and a giant red $27 tag swings onto the $24 bag; hero shocked
export const OD_C1 = makeCover({
  id: 'overdraft-1', job: JOB, canvas: 'tall',
  concept: 'At the corner-store checkout the terminal shows a green tick, and a giant red $27 price tag swings onto a $24 grocery bag; the hero stares at it in shock.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#FBE7BE" bottom="#E9B978" />
      <Burst canvas="tall" cx={700} cy={980} color="#FFFFFF" opacity={0.22} />
      <Glow id="od1" x={700} y={1000} r={430} color="#FFE6A0" opacity={0.55} />
      <Ground canvas="tall" y={1430} color="#7A4A2A" edge="#C58A5A" />
      <Part name="checkout" kind="object" x={420} y={1000} w={520} h={440}>
        <Terminal x={560} y={1430} s={1.3} ok={1} />
        <Bag x={810} y={1430} s={1.0} sticker="$24" />
      </Part>
      <Part name="tag" kind="object" x={430} y={600} w={460} h={390}>
        <Tag x={670} y={610} s={1.7} rot={14} t="$27" />
      </Part>
      <Hero pose="shock" expression="shocked" x={220} y={2060} scale={2.0} />
      <Words lines={[{ t: 'WHY YOUR CARD', size: 130 }, { t: 'STILL WORKS WITH', size: 118, color: GOLD }, { t: '$0 IN THE BANK', size: 130, color: RED }]} x={540} y={150} rotate={-3} ring="#7A4A22" />
    </CoverCanvas>
  ),
})

// # 2) the scale: the red $27 fee crashes down, the tiny 4¢ card interest flies up; hero worried
export const OD_C2 = makeCover({
  id: 'overdraft-2', job: JOB, canvas: 'tall',
  concept: 'A brass balance scale: the red $27 overdraft fee slams its pan down while a credit card with a tiny 4¢ coin flies up on the other side; the worried hero looks at the fee.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#1D2F57" bottom="#3E5C8E" />
      <Burst canvas="tall" cx={560} cy={900} color="#FFD27A" opacity={0.14} />
      <Ground canvas="tall" y={1430} color="#141C30" edge="#3C4A6C" />
      <Part name="scale" kind="object" x={330} y={580} w={620} h={650}>
        <g transform="translate(640 790) scale(0.8) translate(-600 -900)">
          <Scale x={600} y={720} tilt={-20} />
          <Tag x={600 - 244} y={720 + 89 + 200 - 165} s={1.0} rot={0} str={18} t="$27" />
          <Card x={600 + 244} y={720 - 89 + 200 - 62} s={0.55} col="#6B4FC9" t="CREDIT" />
          <Penny x={600 + 300} y={720 - 89 + 200 - 160} s={1.1} />
        </g>
      </Part>
      <Hero pose="despair" expression="worried" x={200} y={2080} scale={1.8} />
      <Words lines={[{ t: 'WHAT IT COSTS', size: 130 }, { t: 'WHEN YOUR CARD', size: 122, color: GOLD }, { t: 'WORKS AT $0', size: 134, color: RED }]} x={540} y={150} rotate={-3} ring="#0E1B33" />
    </CoverCanvas>
  ),
})

// # 3) the cracked dial: the overdraft needle smashes past 100% while the card needle sits at 22%
export const OD_C3 = makeCover({
  id: 'overdraft-3', job: JOB, canvas: 'tall',
  concept: 'A big cream yearly-rate dial: the blue credit-card needle rests at 22% while the red overdraft needle smashes past 100% and cracks the dial; the hero points at the crack.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#0E1730" bottom="#2B4A78" />
      <Glow id="od3" x={570} y={1000} r={460} color="#FF9A85" opacity={0.25} />
      <Ground canvas="tall" y={1430} color="#0A1124" edge="#2C3F68" />
      <Part name="dial" kind="object" x={190} y={640} w={760} h={520}>
        <Gauge x={570} y={1110} r={330} max={100} ticks={[0, 25, 50, 75, 100]} fmt={(v) => `${v}%`} crack={1}
          needles={[{ v: 22.36, col: '#4C8FD6' }, { v: 108, col: RED }]} />
      </Part>
      <Hero pose="point" expression="shocked" x={190} y={2080} scale={1.8} />
      <Words lines={[{ t: 'WHAT YOUR BANK', size: 128 }, { t: 'CHARGES WHEN YOU', size: 116 }, { t: 'SPEND AT $0', size: 140, color: RED }]} x={540} y={150} rotate={-3} ring="#0E1B33" />
    </CoverCanvas>
  ),
})
