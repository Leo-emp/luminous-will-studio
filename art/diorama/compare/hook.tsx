// ============================================================
// COMPARE · HOOK (s1–s3) — redrawn 2026-11-16 in the LW
// "illustrated scenes" style: every line is acted out in its own place.
//   s1  1:47 a.m., a dark bedroom: he sits on the bed, the phone lights his face
//   s2  a friend proposes in a park at sunset  →  a classmate shakes hands on the
//       dream job in a glass lobby  →  someone his age gets the keys to a house
//       →  back home, the camera pulls away and he looks small on his sofa
//   s3  the lamp comes back on, he puts the phone down  →  a cutaway inside his
//       head: the brain's little scale weighing him against someone else
// ============================================================
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Reel, Person, Glow, Vignette, Wash, Grad, Motes, FLOOR, on, pop, lerp, span, easeOut, type Beat } from '../../world/kit'
import { BedroomNight, ParkSunset, OfficeLobby, Suburb, LivingEvening } from '../../world/places'
import { Phone, RingBox, Keys, Box, SoldSign, Confetti, Badge, Sofa } from '../../world/props'
import { heldPoint } from '../../rig/Actor'

// # where a person's right hand is (so props sit in their hand)
const hand = (pose: string, x: number, y: number, s: number, flip = false) => heldPoint(pose, { x, y, scale: s }, flip)

// ------------------------------------------------------------ the brain cutaway: a head in profile, a glowing brain, a tiny scale
const BrainCutaway: React.FC<{ lf: number; f: number }> = ({ lf, f }) => {
  const tilt = Math.sin(lf / 14) * 9 * on(lf, 10, 20)
  return (
    <g>
      <Grad top="#2A1730" bottom="#4A2440" />
      <Motes f={f} n={30} y0={0} y1={1920} color="#F7C6D9" o={0.35} r={4} seed={12} />
      {/* # the head in profile, facing right */}
      <g transform="translate(470 860)">
        <path d="M-300 520 Q-330 300 -300 120 Q-300 -280 40 -330 Q330 -340 360 -60 Q370 40 420 120 Q440 160 390 170 L370 240 Q380 300 330 320 Q300 420 160 410 L150 520 Z" fill="#6E1E36" />
        <path d="M-300 520 Q-330 300 -300 120 Q-300 -280 40 -330 Q-200 -200 -220 120 Q-240 330 -200 520 Z" fill="#000" opacity={0.18} />
        <Glow x={40} y={-90} r={420} color="#FF9AB8" o={0.45} />
        {/* # the brain, gently pulsing */}
        <g transform={`translate(40 -90) scale(${1 + Math.sin(lf / 10) * 0.015})`}>
          <path d="M-230 40 Q-260 -130 -110 -180 Q-20 -250 90 -190 Q240 -170 230 -10 Q250 110 120 140 Q0 190 -120 140 Q-250 130 -230 40 Z" fill="#F6B3C6" />
          <path d="M-230 40 Q-260 -130 -110 -180 Q-170 -60 -150 60 Q-130 130 -120 140 Q-250 130 -230 40 Z" fill="#E28AA4" opacity={0.7} />
          <path d="M0 -215 Q-30 -60 0 160 M-150 -90 Q-90 -60 -120 20 Q-80 60 -140 100 M140 -120 Q90 -60 130 0 Q90 60 150 90 M-60 -170 Q-20 -130 -60 -90 M70 -170 Q40 -120 80 -80" stroke="#D07792" strokeWidth={10} fill="none" strokeLinecap="round" />
          {/* # the tiny scale: him on one side, someone else on the other */}
          <g transform={`translate(0 -20) scale(${pop(lf, 6, 14)})`}>
            <rect x={-6} y={-10} width={12} height={140} fill="#7A4A2E" />
            <path d="M-60 130 L60 130 L40 110 L-40 110 Z" fill="#7A4A2E" />
            <g transform={`rotate(${tilt})`}>
              <rect x={-150} y={-16} width={300} height={10} rx={5} fill="#C9A24A" />
              {[-1, 1].map((side) => (
                <g key={side} transform={`translate(${side * 140} 0) rotate(${-tilt})`}>
                  <line x1={-34} y1={0} x2={0} y2={-6} stroke="#C9A24A" strokeWidth={3} /><line x1={34} y1={0} x2={0} y2={-6} stroke="#C9A24A" strokeWidth={3} />
                  <path d="M-44 0 Q0 30 44 0 Z" fill="#E7C766" />
                  {/* # a little person on each pan: burgundy = him, teal = the other */}
                  <circle cx={0} cy={-46} r={12} fill={side < 0 ? '#7E1F35' : '#2E8C86'} /><path d="M-14 -2 L-12 -30 Q0 -38 12 -30 L14 -2 Z" fill={side < 0 ? '#7E1F35' : '#2E8C86'} />
                </g>
              ))}
            </g>
          </g>
        </g>
      </g>
      <Vignette o={0.5} />
    </g>
  )
}

// ------------------------------------------------------------ HOOK
const Hook: React.FC<PieceProps> = ({ f, c, to }) => {
  const s1 = c('s1'), worse = c('s1:worse')
  const friend = c('s2:friend'), engaged = c('s2:engaged'), classmate = c('s2:classmate'), job = c('s2:job'), age = c('s2:age'), house = c('s2:house'), suddenly = c('s2:suddenly'), smaller = c('s2:smaller')
  const s3 = c('s3'), brain = c('s3:brain'), built = c('s3:built')

  const cuts = [
    // # 1 · 1:47 a.m. — he can't stop scrolling; push in on his lit face
    { at: s1, cam: { fx: 420, fy: 900, s0: 1.08, s1: 1.28 }, draw: (lf: number, f: number) => {
      const hb: Beat[] = [[0, 'sitPhone', 'neutral'], [worse - s1, 'sitPhone', 'worried']]
      const hp = hand('sitPhone', 420, FLOOR, 1.15)
      return <g>
        <BedroomNight f={f} />
        <Person lf={lf} f={f} who="hero-struggling" beats={hb} x={420} s={1.15} seed={4} />
        <Phone x={hp.x} y={hp.y - 6} s={1.15} r={-8} glow={1} />
        <Glow x={hp.x - 20} y={hp.y - 160} r={260} color="#BFE6FF" o={0.28} />
        <Wash color="#1A1E44" o={0.25} /><Vignette o={0.55} />
      </g>
    } },
    // # 2 · a friend gets engaged — sunset proposal, she covers her mouth, petals fall
    { at: friend, cam: { fx: 560, fy: 1000, s0: 1.0, s1: 1.1 }, draw: (lf: number, f: number) => {
      const e = engaged - friend
      const hp = hand('kneel', 380, FLOOR, 1.15)
      return <g>
        <ParkSunset f={f} />
        <Person lf={lf} f={f} who="p-fiance" beats={[[0, 'kneel', 'smiling']]} x={380} s={1.15} seed={5} />
        <Person lf={lf} f={f} who="p-fiancee" beats={[[0, 'idle', 'shocked'], [Math.max(6, e - 4), 'joyHands', 'smiling']]} x={740} s={1.15} flip seed={6} />
        <RingBox x={hp.x + 8} y={hp.y - 10} s={1.6} open={on(lf, 4, 10)} f={f} />
        <Confetti f={f} lf={lf - e} n={30} colors={['#FFD3DE', '#FFFFFF', '#F7A9C0', '#FFE7A3']} o={on(lf, e, 10)} />
        <Wash color="#FF9A7A" o={0.08} blend="soft-light" /><Vignette o={0.4} />
      </g>
    } },
    // # 3 · a classmate gets the dream job — the handshake, the new badge
    { at: classmate, cam: { fx: 560, fy: 960, s0: 1.04, s1: 1.12, dx: -20 }, draw: (lf: number, f: number) => {
      const j = job - classmate
      return <g>
        <OfficeLobby f={f} />
        <Person lf={lf} f={f} who="p-classmate" beats={[[0, 'handshake', 'smiling'], [j + 6, 'fistPump', 'smiling']]} x={420} s={1.15} seed={7} />
        <Person lf={lf} f={f} who="p-boss" beats={[[0, 'handshake', 'smiling'], [j + 6, 'clapA', 'smiling'], [j + 14, 'clapB', 'smiling'], [j + 20, 'clapA', 'smiling']]} x={690} s={1.15} flip seed={8} />
        <Badge x={438} y={FLOOR - 470} s={1.1 * pop(lf, j, 12)} r={-4} />
        <Confetti f={f} lf={lf - j} n={18} o={on(lf, j, 8) * 0.8} />
        <Vignette o={0.3} />
      </g>
    } },
    // # 4 · someone your age buys a house — the agent hands over the keys, a jump for joy
    { at: age, cam: { fx: 540, fy: 1000, s0: 1.0, s1: 1.08 }, draw: (lf: number, f: number) => {
      const h = house - age
      const give = span(lf, h - 10, h)
      const ap = hand('offer', 700, FLOOR + 40, 1.15, true), bp = hand('receive', 410, FLOOR + 40, 1.15)
      return <g>
        <Suburb f={f} />
        <SoldSign x={150} y={FLOOR + 30} s={1.05} sold={pop(lf, h, 10)} />
        <Box x={850} y={FLOOR + 80} w={140} h={100} open /><Box x={960} y={FLOOR + 90} w={110} h={80} />
        <Person lf={lf} f={f} who="p-agent" beats={[[0, 'offer', 'smiling'], [h + 4, 'clapA', 'smiling'], [h + 12, 'clapB', 'smiling']]} x={700} y={FLOOR + 40} s={1.15} flip seed={9} />
        <Person lf={lf} f={f} who="p-buyer" beats={[[0, 'receive', 'shocked'], [h, 'jump', 'smiling']]} x={410} y={FLOOR + 40} s={1.15} seed={10} />
        {lf < h + 2 && <Keys x={lerp(ap.x, bp.x, easeOut(give))} y={lerp(ap.y, bp.y, easeOut(give)) - 10} s={1.3} r={-10} shine={give} />}
        <Confetti f={f} lf={lf - h} n={22} colors={['#F4C35A', '#FFFFFF', '#8FC98A', '#E2506A']} o={on(lf, h, 8)} />
        <Vignette o={0.28} />
      </g>
    } },
    // # 5 · "suddenly your day feels smaller" — back home, the camera pulls away; he shrinks into the sofa
    { at: suddenly, cam: { fx: 540, fy: 1050, s0: 1.55, s1: 0.98 }, draw: (lf: number, f: number) => {
      const sm = smaller - suddenly
      const hp = hand('sitPhone', 540, FLOOR - 30, 1.0)
      return <g>
        <LivingEvening f={f} dim={on(lf, sm - 6, 24)} />
        <Sofa x={540} y={FLOOR + 30} w={560} c={['#6C7FA8', '#52648C', '#3C4C70']} />
        <Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'sitPhone', 'worried'], [sm, 'sitSlump', 'worried']]} x={540} y={FLOOR - 30} s={1.0} seed={11} />
        {lf < sm + 4 && <Phone x={hp.x} y={hp.y - 4} s={1.0} r={-8} glow={1} />}
        <Wash color="#1E1630" o={0.15 + 0.3 * on(lf, sm - 6, 24)} /><Vignette o={0.6} />
      </g>
    } },
    // # 6 · "not because you're a bad person" — the lamp warms back up, phone face down, a breath
    { at: s3, cam: { fx: 540, fy: 950, s0: 1.12, s1: 1.2 }, draw: (lf: number, f: number) => (
      <g>
        <LivingEvening f={f} dim={0} />
        <Sofa x={540} y={FLOOR + 30} w={560} c={['#6C7FA8', '#52648C', '#3C4C70']} />
        <Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'sitSlump', 'worried'], [10, 'sit', 'neutral'], [24, 'sit', 'smiling']]} x={540} y={FLOOR - 30} s={1.0} seed={12} />
        <g transform={`translate(760 ${FLOOR - 10})`}><rect x={-60} y={-90} width={120} height={90} rx={8} fill="#5A3E46" /><rect x={-40} y={-104} width={60} height={14} rx={4} fill="#1C1820" /></g>
        <Glow x={940} y={FLOOR - 440} r={500} color="#FFC982" o={0.35 * on(lf, 0, 20)} />
        <Vignette o={0.45} />
      </g>
    ) },
    // # 7 · "your brain is doing something it was built to do" — inside his head, the little scale
    { at: brain, cam: { fx: 540, fy: 820, s0: 1.0, s1: 1.1 }, draw: (lf: number, f: number) => <BrainCutaway lf={lf} f={f} /> },
  ]
  void built
  return <Reel f={f} cuts={cuts} end={to} />
}

export const CP_HOOK = makePiece('cp-hook', 'Compare: their good news makes you smaller', {
  beats: ["s1", "s1:worse", "s2", "s2:friend", "s2:engaged", "s2:classmate", "s2:job", "s2:age", "s2:house", "s2:suddenly", "s2:smaller", "s3", "s3:brain", "s3:built", "s1:you", "s2:a#2", "s2:someone", "s2:and", "s3:your", "s1:good", "s2:your", "s2:your#2", "s3:person", "s3:it"],
  sfx: [['s2:engaged', 'chime'], ['s2:job', 'softpop'], ['s2:house', 'ding'], ['s2:smaller', 'swish'], ['s3:brain', 'whoosh']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
