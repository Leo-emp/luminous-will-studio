// ============================================================
// COVERS — Short "A 100 Dollar Bill Costs 11 Cents. Why Is It Worth 100?"
// Sourced: a $100 note costs 11.3¢ to print (Federal Reserve, 2025).
// Drawn from the video's own engraved-banknote art: the green $100
// note, the three pillars (YOU NEED IT · EVERYONE TAKES IT · NOT TOO
// MANY), the peach 11¢ tag and the gold balance scale.
// Owner pick 2026-11-12: main text "WHERE YOUR MONEY'S VALUE REALLY COMES FROM".
// ============================================================
import React from 'react'
import { Burst, CoverCanvas, Glow, Ground, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'
import { Note, Pillar, Tag, Scale } from '../diorama/note100/kit'

const JOB = '20261112-1413_a-100-dollar-bill-costs-11-cents-why-is-it-worth-100'
const GOLD = '#F2B632', RED = '#E5533F', GREEN = '#2F8F5E', INK = '#1E3A2F'

// # 1) MAIN — the glowing $100 note held up by three pillars; the hero looks up at it, thinking
export const NB_C1 = makeCover({
  id: 'note100-1', job: JOB, canvas: 'tall',
  concept: 'A glowing green $100 note rests on three engraved pillars marked YOU NEED IT, EVERYONE TAKES IT and NOT TOO MANY; the hero looks up and points at it, thinking.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#F7EED9" bottom="#DCC79A" />
      <Burst canvas="tall" cx={640} cy={820} color="#FFFFFF" opacity={0.35} />
      <Glow id="nb1" x={640} y={820} r={420} color="#FFE6A0" opacity={0.65} />
      <Ground canvas="tall" y={1440} color="#B9925C" edge="#E2C48E" />
      <Part name="pillars" kind="object" x={440} y={930} w={520} h={510}>
        {[0, 1, 2].map((i) => <Pillar key={i} x={480 + i * 170} y={1440} h={500} t={['YOU NEED IT', 'EVERYONE TAKES IT', 'NOT TOO MANY'][i]} size={i === 1 ? 30 : 36} />)}
      </Part>
      <Part name="note" kind="object" x={360} y={700} w={600} h={250} touches={['pillars']}>
        <Note x={650} y={820} s={0.95} glow={1} />
      </Part>
      <Hero pose="pointUp" expression="thinking" x={210} y={2060} scale={1.9} />
      <Words lines={[{ t: "WHERE YOUR MONEY'S", size: 112 }, { t: 'VALUE REALLY', size: 140, color: GREEN }, { t: 'COMES FROM', size: 130 }]} x={540} y={150} rotate={-3} ring="#8A6A2E" />
    </CoverCanvas>
  ),
})

// # 2) the hero holds up a giant $100 note with a tiny 11¢ tag swinging off it — shocked
export const NB_C2 = makeCover({
  id: 'note100-2', job: JOB, canvas: 'tall',
  concept: 'The shocked hero holds up a giant green $100 note; a tiny peach 11¢ price tag swings from its corner.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#1F4A3C" bottom="#0F2620" />
      <Burst canvas="tall" cx={600} cy={860} color="#FFD27A" opacity={0.18} />
      <Glow id="nb2" x={600} y={860} r={460} color="#7FD3A6" opacity={0.3} />
      <Ground canvas="tall" y={1440} color="#0B1C17" edge="#2E5A4B" />
      <Part name="note" kind="object" x={230} y={690} w={760} h={330}>
        <Note x={610} y={850} s={1.25} r={-6} glow={0.8} />
      </Part>
      <Part name="tag" kind="object" x={660} y={1010} w={280} h={140} touches={['note']}>
        <line x1={860} y1={980} x2={830} y2={1040} stroke="#F4ECD8" strokeWidth={5} />
        <Tag x={720} y={1040} t="11¢" s={1.3} r={-8} col="#F7D9C4" tc={RED} />
      </Part>
      <Hero pose="shock" expression="shocked" x={230} y={2070} scale={1.9} />
      <Words lines={[{ t: 'WHY IS A BILL THAT', size: 112 }, { t: 'COSTS 11¢', size: 150, color: GOLD }, { t: 'WORTH $100?', size: 140 }]} x={540} y={150} rotate={-3} ring="#0B1C17" />
    </CoverCanvas>
  ),
})

// # 3) the gold scale: the $100 note outweighs a plain sheet of paper that costs the same to make — worried hero
export const NB_C3 = makeCover({
  id: 'note100-3', job: JOB, canvas: 'tall',
  concept: 'A gold balance scale: the green $100 note sinks its pan while a plain grey sheet of paper — the same paper — rises on the other side; the worried hero points at the paper.',
  Component: () => (
    <CoverCanvas canvas="tall">
      <Sky canvas="tall" top="#F3E6C6" bottom="#D8B983" />
      <Burst canvas="tall" cx={600} cy={900} color="#FFFFFF" opacity={0.3} />
      <Ground canvas="tall" y={1440} color="#A07A45" edge="#D8B37A" />
      <Part name="scale" kind="object" x={300} y={640} w={660} h={800}>
        <Scale x={630} y={1440} s={1.0} tilt={0.8}
          left={<g><rect x={-110} y={-70} width={220} height={66} rx={6} fill="#E8E2D4" stroke="#9C968A" strokeWidth={4} /></g>}
          right={<g><Note x={0} y={-84} s={0.36} glow={0.8} /></g>} />
      </Part>
      <Hero pose="point" expression="worried" x={200} y={2070} scale={1.8} />
      <Words lines={[{ t: 'WHAT MAKES', size: 130 }, { t: 'PAPER MONEY', size: 146, color: GREEN }, { t: 'WORTH ANYTHING?', size: 120 }]} x={540} y={150} rotate={-3} ring="#8A6A2E" />
    </CoverCanvas>
  ),
})
