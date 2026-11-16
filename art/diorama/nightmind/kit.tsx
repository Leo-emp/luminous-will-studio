// ============================================================
// NIGHT MIND KIT — the drawn parts of the Short "Why Your Brain
// Won't Switch Off at Night" (LW, 2026-11-14). Own art direction:
// an attic bedroom under a sloped roof, deep indigo night, one amber
// bedside lamp, mint paper notes. Thoughts are OPEN LOOPS: an open
// paper ring with a label (an object, never a face); writing a
// thought down closes its ring. Tall canvas 1080 × 1920; action
// between y 420 and GROUND 1240; captions below.
// ============================================================
import React from 'react'
import { BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, on, lerp, span, easeOut, rnd } from '../day3/kit'

export { Person, Tag, Headline, win, pop, on, lerp, span, easeOut, rnd, BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, type Beat } from '../day3/kit'

// # palette: indigo night, amber lamp light, mint notes
export const NIGHT = { sky: ['#1F2552', '#2E3670'], wall: '#3B4380', wall2: '#323A72', floor: '#2A2F5E', beam: '#5A4A7A' }
export const DAYC = { wall: '#F4E6CF', wall2: '#E8D4B4', floor: '#CDB08C' }
export const AMBER = '#FFB547', AMBER_L = '#FFE0A6', MINT = '#9FE3C8', MINT_D = '#5FB89A', PLUM = '#7A5C9A'

// ------------------------------------------------------------ the attic room
// # `lamp` 0..1 = the bedside lamp's warm pool; `night` 0..1 blends a day-cream room into the indigo night
export const Attic: React.FC<{ id: string; lamp?: number; night?: number; f: number }> = ({ id, lamp = 0, night = 1, f }) => (
  <g>
    <defs>
      <radialGradient id={`${id}-lamp`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={AMBER_L} stopOpacity={0.7} /><stop offset="100%" stopColor={AMBER} stopOpacity={0} /></radialGradient>
      <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="55%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.35} /></radialGradient>
    </defs>
    <rect width={W} height={H} fill={DAYC.wall} />
    <g opacity={night}><rect width={W} height={H} fill={NIGHT.wall} /></g>
    {/* # the sloped roof: two beams meeting high on the left, a round window with stars */}
    <path d={`M0 380 L700 0 L1080 0 L1080 120 L0 640 Z`} fill={night > 0.5 ? NIGHT.wall2 : DAYC.wall2} />
    <path d="M0 640 L1080 120" stroke={NIGHT.beam} strokeWidth={26} />
    <g transform="translate(190 480) scale(0.8)">
      <circle r={150} fill={night > 0.5 ? NIGHT.sky[0] : '#BFE3F5'} stroke={NIGHT.beam} strokeWidth={18} />
      <path d="M-150 0 L150 0 M0 -150 L0 150" stroke={NIGHT.beam} strokeWidth={10} />
      {night > 0.3 && [[-80, -70], [60, -90], [-40, 60], [90, 50], [20, -30]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={4 + (k % 2) * 2} fill="#FFF6D8" opacity={night * (0.5 + 0.5 * Math.sin(f / 7 + k))} />)}
      {night > 0.3 && <g opacity={night}><circle cx={-60} cy={-40} r={34} fill="#F6EFD2" /><circle cx={-46} cy={-50} r={30} fill={NIGHT.sky[0]} /></g>}
    </g>
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={night > 0.5 ? NIGHT.floor : DAYC.floor} />
    <rect x={0} y={GROUND} width={W} height={14} fill="#000" opacity={0.18} />
    <ellipse cx={250} cy={GROUND - 380} rx={420} ry={420} fill={`url(#${id}-lamp)`} opacity={lamp} />
  </g>
)
export const NVig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # the bed seen side-on, headboard on the left; a person can sit up in it (draw them, then <BedFront/> over the legs)
export const BedBack: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} ${GROUND})`}>
    <rect x={-330} y={-420} width={40} height={420} rx={12} fill="#6B4E7E" stroke={INK} strokeWidth={6} />
    <rect x={-310} y={-250} width={180} height={80} rx={34} fill="#F4F0FF" stroke={INK} strokeWidth={5} />
  </g>
)
// # `up` 0..1 pulls the duvet up to the waist of someone sitting up at the head end (so they sit IN the bed)
export const BedFront: React.FC<{ x: number; bump?: number; up?: number }> = ({ x, bump = 0, up = 0 }) => (
  <g transform={`translate(${x} ${GROUND})`}>
    <path d={`M-300 ${-190 - 110 * up} Q${-150} ${-250 - 110 * up - 50 * bump} 40 ${-230 - 10 * up} Q200 -200 340 -190 L340 -60 L-300 -60 Z`} fill={PLUM} stroke={INK} strokeWidth={6} />
    {[0, 1, 2].map((k) => <path key={k} d={`M${-200 + k * 170} -180 l40 40 M${-160 + k * 170} -180 l-40 40`} stroke="#9478B5" strokeWidth={6} />)}
    <rect x={-310} y={-64} width={660} height={34} rx={8} fill="#4A3560" />
    <rect x={-300} y={-30} width={24} height={30} fill="#4A3560" /><rect x={316} y={-30} width={24} height={30} fill="#4A3560" />
  </g>
)

// # a bedside lamp on a little table; `lit` 0..1
export const Lamp: React.FC<{ x: number; lit: number }> = ({ x, lit }) => (
  <g transform={`translate(${x} ${GROUND})`}>
    <rect x={-80} y={-200} width={160} height={200} rx={10} fill="#6B4E7E" stroke={INK} strokeWidth={6} />
    <rect x={-8} y={-320} width={16} height={120} fill={INK} />
    <path d="M-70 -320 L70 -320 L46 -410 L-46 -410 Z" fill={lit > 0.5 ? AMBER_L : '#8C86A8'} stroke={INK} strokeWidth={6} />
    <circle cy={-330} r={110} fill={AMBER} opacity={0.28 * lit} />
  </g>
)

// # an open loop: a paper ring with a gap, its label on a little flag. `close` 0..1 closes the gap (thought parked)
export const Loop: React.FC<{ x: number; y: number; s?: number; o?: number; label?: string; close?: number; f: number; seed?: number; loud?: number }> = ({ x, y, s = 1, o = 1, label, close = 0, f, seed = 1, loud = 0 }) => {
  if (o <= 0.001) return null
  const gap = lerp(70, 0, close) // # degrees of the gap
  const r = 70, a0 = (-90 + gap / 2) * Math.PI / 180, a1 = (270 - gap / 2) * Math.PI / 180
  const bob = Math.sin(f / 12 + seed) * 8
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${s})`} opacity={o}>
      {loud > 0 && [0, 1].map((k) => <circle key={k} r={r + 30 + k * 24 + ((f + k * 6) % 12) * 2} fill="none" stroke={AMBER} strokeWidth={5} opacity={loud * (0.6 - k * 0.25)} />)}
      <path d={`M${Math.cos(a0) * r} ${Math.sin(a0) * r} A${r} ${r} 0 1 1 ${Math.cos(a1) * r} ${Math.sin(a1) * r}`} fill="none" stroke={close > 0.95 ? MINT_D : CREAM} strokeWidth={22} strokeLinecap="round" />
      <path d={`M${Math.cos(a0) * r} ${Math.sin(a0) * r} A${r} ${r} 0 1 1 ${Math.cos(a1) * r} ${Math.sin(a1) * r}`} fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" opacity={0.35} />
      {label && <g transform={`translate(0 ${r + 50})`}>
        <rect x={-label.length * 13 - 20} y={-30} width={label.length * 26 + 40} height={60} rx={10} fill={close > 0.95 ? MINT : CREAM} stroke={INK} strokeWidth={4} />
        <text y={14} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
      </g>}
    </g>
  )
}

// # a notebook seen from above-front; `open` 0..1, `lines` written 0..n
export const NoteBook: React.FC<{ x: number; y: number; s?: number; open?: number; items?: string[]; written?: number; strike?: number }> = ({ x, y, s = 1, open = 1, items = [], written = 0, strike = -1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-220} y={-160} width={440} height={320} rx={14} fill={MINT_D} stroke={INK} strokeWidth={6} />
    <g opacity={open}>
      <rect x={-210} y={-150} width={205} height={300} rx={8} fill="#FFFDF6" stroke={INK} strokeWidth={4} />
      <rect x={5} y={-150} width={205} height={300} rx={8} fill="#FFFDF6" stroke={INK} strokeWidth={4} />
      <text x={-108} y={-104} textAnchor="middle" fill={BURG} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 2 }}>TOMORROW</text>
      {items.map((t, k) => k < written && <g key={k}>
        <text x={-190} y={-56 + k * 52} fill={INK} style={{ font: '400 26px "Bebas Neue"', letterSpacing: 1 }}>{'• ' + t}</text>
        {k === strike && <path d={`M-196 ${-64 + k * 52} L-20 ${-64 + k * 52}`} stroke="#D2463C" strokeWidth={5} />}
      </g>)}
    </g>
  </g>
)

// # a phone-style message bubble, a briefcase, a speech bubble: the daytime noise
export const Bubble: React.FC<{ x: number; y: number; s?: number; kind: 'msg' | 'work' | 'talk'; o?: number }> = ({ x, y, s = 1, kind, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {kind === 'msg' && <g><rect x={-80} y={-56} width={160} height={100} rx={26} fill="#5AA9F0" stroke={INK} strokeWidth={5} /><path d="M-40 40 L-60 70 L-10 44 Z" fill="#5AA9F0" stroke={INK} strokeWidth={5} />{[0, 1, 2].map((k) => <circle key={k} cx={-34 + k * 34} cy={-6} r={10} fill={CREAM} />)}</g>}
    {kind === 'work' && <g><rect x={-80} y={-50} width={160} height={110} rx={14} fill="#A0673C" stroke={INK} strokeWidth={5} /><rect x={-30} y={-76} width={60} height={30} rx={8} fill="none" stroke={INK} strokeWidth={8} /><rect x={-80} y={-6} width={160} height={10} fill={INK} opacity={0.4} /></g>}
    {kind === 'talk' && <g><ellipse rx={90} ry={60} fill={GOLD} stroke={INK} strokeWidth={5} /><path d="M30 50 L60 86 L0 56 Z" fill={GOLD} stroke={INK} strokeWidth={5} /><text y={16} textAnchor="middle" fill={INK} style={{ font: '400 50px "Bebas Neue"' }}>BLAH</text></g>}
  </g>
)

// # the white bear (the thought you're told NOT to think): a friendly polar bear head
export const Bear: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <circle cx={-56} cy={-60} r={30} fill="#FFFFFF" stroke={INK} strokeWidth={5} /><circle cx={56} cy={-60} r={30} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    <circle r={90} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <ellipse cy={30} rx={44} ry={34} fill="#F1EEE6" stroke={INK} strokeWidth={4} />
    <ellipse cy={14} rx={16} ry={11} fill={INK} /><circle cx={-32} cy={-18} r={8} fill={INK} /><circle cx={32} cy={-18} r={8} fill={INK} />
  </g>
)

// # a sleep-lab monitor with a brainwave line that slows (`calm` 0..1)
export const Monitor: React.FC<{ x: number; y: number; s?: number; calm?: number; f: number }> = ({ x, y, s = 1, calm = 0, f }) => {
  const pts = Array.from({ length: 30 }, (_, k) => {
    const fr = lerp(0.9, 0.25, calm), amp = lerp(26, 44, calm)
    return `${-150 + k * 10.5} ${Math.sin(k * fr + f / 4) * amp * (0.6 + 0.4 * rnd(k + Math.floor(f / 6)))}`
  })
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-180} y={-120} width={360} height={240} rx={16} fill={INK} stroke="#555B8A" strokeWidth={8} />
      <path d={`M${pts.join(' L')}`} stroke={MINT} strokeWidth={6} fill="none" />
      <rect x={-20} y={120} width={40} height={60} fill="#555B8A" /><rect x={-80} y={176} width={160} height={16} rx={6} fill="#555B8A" />
    </g>
  )
}

// # a horizontal "time to fall asleep" bar
export const SleepBar: React.FC<{ x: number; y: number; w: number; label: string; tone: string; o?: number; value?: string }> = ({ x, y, w, label, tone, o = 1, value }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <text x={0} y={-24} fill={CREAM} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
    <rect x={0} y={0} width={w} height={64} rx={14} fill={tone} stroke={INK} strokeWidth={5} />
    {value && <text x={w + 20} y={48} fill={CREAM} style={{ font: '400 50px "Bebas Neue"' }}>{value}</text>}
  </g>
)

export const ease = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export { on as fadeIn }
