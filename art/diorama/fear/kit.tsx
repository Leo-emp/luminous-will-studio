// ============================================================
// FEAR KIT — the drawn parts of the long video "Why You're So
// Afraid of Failing" (LW, 2026-11-14). Own art direction: a sunny
// OUTDOOR SWIMMING POOL in summer — aqua water, white tiles, coral
// towels, a sun-yellow sky and a tall diving board. The diving
// board is the through-line: fear of failing = standing at the end
// of the board and not jumping. Other chapters get their own sunny
// sets (a seaside fair stall, a Florida kitchen, a garage workshop,
// a doughnut shop) but keep this palette.
// WIDE canvas 1920 × 1080, no captions: the action can use the
// whole frame; headline slot at y 130; ground line GROUND = 900.
// ============================================================
import React from 'react'
import { Actor } from '../../rig/Actor'
import { getPose, mixPose, type ExpressionId } from '../../rig/pose'
import { COLORS } from '../../tokens'
import { between, easeOut, lerp, on, pop, rnd, span, settle } from '../kit'

export { between, easeOut, lerp, on, pop, rnd, span, settle }
export const W = 1920, H = 1080, CX = 960, GROUND = 900
export const INK = COLORS.LW.ink, BURG = COLORS.LW.burgundy, CREAM = COLORS.LW.cream
// # the pool palette (shared by every piece of THIS video)
export const AQUA = '#4CC6D9', AQUA_D = '#2A9DB5', AQUA_L = '#A8E8F0', TILE = '#F7F5EF', TILE_L = '#E3EEF0'
export const CORAL = '#F2755F', CORAL_D = '#C9533F', SUN = '#FFD45E', SUN_L = '#FFF0B8', SKY = '#BFE8F7', SKY_D = '#8ED3EE'
export const SAND = '#F3DDB4', LEAF = '#6DBE7A', GOLD = '#F4C35A', GOLD_L = '#FFE7A3', GREY = '#8C93A0'

export const win = between

// ------------------------------------------------------------ people (the shared rig acting on beats)
export type Beat = [at: number, pose: string, expression?: ExpressionId]
export const Person: React.FC<{ f: number; who: string; beats: Beat[]; x: number; y?: number; s?: number; flip?: boolean; seed?: number }> = ({ f, who, beats, x, y = GROUND, s = 0.72, flip = false, seed = 3 }) => {
  // # current beat + the one before it; poses blend over 8 frames, faces melt over 8
  let i = 0
  for (let k = 0; k < beats.length; k++) if (f >= beats[k][0]) i = k
  const cur = beats[i], prev = beats[Math.max(0, i - 1)]
  const t = i === 0 ? 1 : easeOut(span(f, cur[0], cur[0] + 8))
  const pose = mixPose(getPose(prev[1]), getPose(cur[1]), t)
  const ex = cur[2] ?? getPose(cur[1]).expression
  const from = prev[2] ?? getPose(prev[1]).expression
  return <Actor who={who} pose={pose} expression={ex} blend={t < 1 && from !== ex ? { from, mix: t } : undefined} x={x} y={y} scale={s} frame={f} flip={flip} life={seed} />
}

// # a looping walk/run cycle as beats between two frames (for people crossing the stage)
export const walkBeats = (a: number, b: number, ex: ExpressionId = 'neutral', step = 8, kind: 'walk' | 'run' = 'walk'): Beat[] => {
  const out: Beat[] = []
  for (let t = a, k = 0; t < b; t += step, k++) out.push([t, kind === 'walk' ? (k % 2 ? 'walkB' : 'walkA') : (k % 2 ? 'runB' : 'runA'), ex])
  return out
}

// ------------------------------------------------------------ type: tags, headline, name labels
export const Tag: React.FC<{ x: number; y: number; text: string; s?: number; r?: number; fill?: string; ink?: string; size?: number; o?: number }> = ({ x, y, text, s = 1, r = 0, fill = CREAM, ink = INK, size = 56, o = 1 }) => {
  if (o <= 0.001) return null
  const w = Math.max(180, text.length * size * 0.5 + 80)
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <rect x={-w / 2 + 6} y={-size * 0.62 + 8} width={w} height={size * 1.24} rx={14} fill="#000" opacity={0.12} />
      <rect x={-w / 2} y={-size * 0.62} width={w} height={size * 1.24} rx={14} fill={fill} stroke={INK} strokeWidth={5} />
      <text y={size * 0.36} textAnchor="middle" fill={ink} style={{ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 3 }}>{text}</text>
    </g>
  )
}
export const Headline: React.FC<{ text: string; o: number; color?: string; y?: number }> = ({ text, o, color = INK, y = 130 }) => o <= 0.001 || !text ? null : (
  <text x={CX} y={y} textAnchor="middle" opacity={o} fill={color} style={{ font: '400 96px "Bebas Neue"', letterSpacing: 4 }}
    transform={`translate(0 ${(1 - o) * 18})`}>{text}</text>
)
// # a name label for a real person (owner rule: famous people are always labelled)
export const NameTag: React.FC<{ x: number; y: number; name: string; o?: number; s?: number }> = ({ x, y, name, o = 1, s = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-(name.length * 15 + 40)} y={-30} width={name.length * 30 + 80} height={60} rx={30} fill={INK} />
    <text y={14} textAnchor="middle" fill={CREAM} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>{name}</text>
  </g>
)
// # a speech card (a short line someone says)
export const Say: React.FC<{ x: number; y: number; lines: string[]; o?: number; s?: number; tail?: 'left' | 'right'; fill?: string; size?: number }> = ({ x, y, lines, o = 1, s = 1, tail = 'left', fill = '#FFFFFF', size = 48 }) => {
  if (o <= 0.001) return null
  const w = Math.max(...lines.map((l) => l.length)) * size * 0.5 + 80, h = lines.length * size * 1.1 + 40
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill={fill} stroke={INK} strokeWidth={5} />
      <path d={tail === 'left' ? `M${-w / 2 + 50} ${h / 2 - 3} L${-w / 2 + 30} ${h / 2 + 40} L${-w / 2 + 100} ${h / 2 - 3}` : `M${w / 2 - 50} ${h / 2 - 3} L${w / 2 - 30} ${h / 2 + 40} L${w / 2 - 100} ${h / 2 - 3}`} fill={fill} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <rect x={tail === 'left' ? -w / 2 + 48 : w / 2 - 102} y={h / 2 - 10} width={56} height={10} fill={fill} />
      {lines.map((l, k) => <text key={k} y={-h / 2 + 20 + size * 0.95 + k * size * 1.1} textAnchor="middle" fill={INK} style={{ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 2 }}>{l}</text>)}
    </g>
  )
}

// ------------------------------------------------------------ the pool (the through-line set)
export const Sky: React.FC<{ id: string; warm?: number }> = ({ id, warm = 0 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={warm ? '#FFD7A8' : SKY_D} /><stop offset="100%" stopColor={warm ? '#FFF0D6' : SKY} /></linearGradient>
      <radialGradient id={`${id}-vg`} cx="0.5" cy="0.5" r="0.75"><stop offset="62%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.18} /></radialGradient>
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-sky)`} />
  </g>
)
export const Vig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

export const SunDisc: React.FC<{ x: number; y: number; r?: number; f: number }> = ({ x, y, r = 80, f }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-6} y={-r - 44} width={12} height={28} rx={6} fill={SUN} transform={`rotate(${k * 30 + f * 0.2})`} />)}
    <circle r={r} fill={SUN} /><circle r={r * 0.7} fill={SUN_L} opacity={0.6} />
  </g>
)
export const Cloud: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 0.95 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} fill="#FFFFFF">
    <ellipse cx={0} cy={0} rx={90} ry={40} /><ellipse cx={-60} cy={10} rx={60} ry={30} /><ellipse cx={60} cy={8} rx={70} ry={34} /><ellipse cx={10} cy={-26} rx={56} ry={38} />
  </g>
)

// # the pool: tiled deck at GROUND, water below with drifting ripples; `splash` 0..1 at splashX
export const Pool: React.FC<{ f: number; top?: number; splash?: number; splashX?: number }> = ({ f, top = GROUND, splash = 0, splashX = 1300 }) => (
  <g>
    {/* # deck tiles */}
    <rect x={0} y={top - 40} width={W} height={60} fill={TILE} />
    {Array.from({ length: 25 }, (_, k) => <rect key={k} x={k * 80} y={top - 40} width={3} height={60} fill={TILE_L} />)}
    <rect x={0} y={top + 20} width={W} height={H - top - 20} fill={AQUA} />
    <rect x={0} y={top + 20} width={W} height={14} fill={AQUA_D} opacity={0.6} />
    {/* # lane rope */}
    {Array.from({ length: 40 }, (_, k) => <circle key={k} cx={k * 50 + 20} cy={top + 110} r={10} fill={k % 4 < 2 ? CORAL : '#FFFFFF'} />)}
    {/* # ripples drift sideways */}
    {Array.from({ length: 9 }, (_, k) => {
      const x = ((k * 260 + f * 1.2) % 2200) - 140, y = top + 60 + (k % 3) * 48
      return <path key={k} d={`M${x} ${y} q30 -10 60 0 t60 0`} stroke={AQUA_L} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.8} />
    })}
    {/* # the splash: a crown of drops + rings */}
    {splash > 0.001 && <g transform={`translate(${splashX} ${top + 60})`} opacity={1 - span(splash, 0.7, 1)}>
      {Array.from({ length: 9 }, (_, k) => { const a = -Math.PI * (0.15 + 0.7 * k / 8), d = 40 + 200 * splash; return <ellipse key={k} cx={Math.cos(a) * d} cy={Math.sin(a) * d * 1.2 + 120 * splash * splash} rx={14} ry={20} fill={AQUA_L} /> })}
      <ellipse rx={60 + 220 * splash} ry={16 + 40 * splash} fill="none" stroke="#FFFFFF" strokeWidth={6} />
    </g>}
  </g>
)

// # the diving board: a tower with a ladder and a plank that sticks out to the right; `h` = board height above the deck
export const Board: React.FC<{ x: number; h: number; len?: number; bend?: number; label?: string }> = ({ x, h, len = 420, bend = 0, label }) => (
  <g transform={`translate(${x} ${GROUND - 40})`}>
    {/* # the tower legs and ladder */}
    <rect x={-70} y={-h} width={16} height={h} fill="#D9DEE5" stroke={INK} strokeWidth={4} />
    <rect x={10} y={-h} width={16} height={h} fill="#D9DEE5" stroke={INK} strokeWidth={4} />
    {Array.from({ length: Math.floor(h / 60) }, (_, k) => <rect key={k} x={-56} y={-h + 40 + k * 60} width={68} height={8} fill="#B8C0CA" />)}
    <path d={`M-90 ${-h - 70} L-90 ${-h} M30 ${-h - 70} L30 ${-h}`} stroke="#B8C0CA" strokeWidth={8} strokeLinecap="round" />
    {/* # the plank (bends at the tip when someone stands on the end) */}
    <path d={`M-80 ${-h} L${len} ${-h + bend} L${len} ${-h + bend + 22} L-80 ${-h + 22} Z`} fill={CORAL} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    {label && <text x={len / 2} y={-h + 18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 20px "Bebas Neue"', letterSpacing: 4 }}>{label}</text>}
  </g>
)

// # deck props: a towel, a parasol, a ring float
export const Parasol: React.FC<{ x: number; y?: number; s?: number }> = ({ x, y = GROUND - 40, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-5} y={-300} width={10} height={300} fill="#FFFFFF" stroke={INK} strokeWidth={3} />
    <path d="M-200 -280 Q0 -420 200 -280 Z" fill={CORAL} stroke={INK} strokeWidth={5} />
    <path d="M-100 -300 Q0 -420 0 -360 Q0 -420 100 -300" fill="#FFFFFF" opacity={0.9} />
  </g>
)
export const Ring: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <circle r={60} fill="none" stroke={CORAL} strokeWidth={34} />
    {[0, 90, 180, 270].map((a) => <path key={a} d="M-60 -17 L-60 17" stroke="#FFFFFF" strokeWidth={36} transform={`rotate(${a})`} />)}
    <circle r={60} fill="none" stroke={INK} strokeWidth={3} opacity={0.4} />
  </g>
)

// # a big balance scale; `tilt` in degrees (+ = right pan down); pans carry children by render-props
export const Scale: React.FC<{ x: number; y: number; tilt: number; s?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, tilt, s = 1, left, right }) => {
  const a = (tilt * Math.PI) / 180, arm = 330
  const lx = -arm * Math.cos(a), ly = -arm * Math.sin(a), rx = arm * Math.cos(a), ry = arm * Math.sin(a)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-120 420 L120 420 L40 380 L-40 380 Z" fill="#B98A5E" stroke={INK} strokeWidth={5} />
      <rect x={-14} y={0} width={28} height={385} fill="#D2A26E" stroke={INK} strokeWidth={5} />
      <g transform={`rotate(${tilt})`}><rect x={-arm - 10} y={-12} width={2 * arm + 20} height={24} rx={12} fill="#D2A26E" stroke={INK} strokeWidth={5} /></g>
      <circle r={26} fill={GOLD} stroke={INK} strokeWidth={5} />
      {[[lx, ly, left], [rx, ry, right]].map(([px, py, kid], k) => (
        <g key={k} transform={`translate(${px as number} ${py as number})`}>
          <path d="M0 0 L-110 160 M0 0 L110 160" stroke={INK} strokeWidth={4} />
          <path d="M-140 160 L140 160 Q120 210 0 210 Q-120 210 -140 160 Z" fill={TILE} stroke={INK} strokeWidth={5} />
          <g transform="translate(0 160)">{kid as React.ReactNode}</g>
        </g>
      ))}
    </g>
  )
}

// # a coin (heads/tails) that can spin: `spin` 0..1 squashes it like a flip
export const Coin: React.FC<{ x: number; y: number; s?: number; spin?: number; face?: 'H' | 'T' }> = ({ x, y, s = 1, spin = 0, face = 'H' }) => {
  const sx = Math.abs(Math.cos(spin * Math.PI * 6)) * 0.9 + 0.1
  return (
    <g transform={`translate(${x} ${y}) scale(${s * sx} ${s})`}>
      <circle r={70} fill={GOLD} stroke={INK} strokeWidth={6} /><circle r={52} fill="none" stroke="#C9952E" strokeWidth={5} />
      {sx > 0.5 && <text y={22} textAnchor="middle" fill={INK} style={{ font: '400 64px "Bebas Neue"' }}>{face}</text>}
    </g>
  )
}

// # a dollar stack with an amount label
export const Cash: React.FC<{ x: number; y: number; amount: string; s?: number; tone?: string; o?: number }> = ({ x, y, amount, s = 1, tone = LEAF, o = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[0, 1, 2].map((k) => <rect key={k} x={-90} y={-30 - k * 22} width={180} height={30} rx={6} fill={tone} stroke={INK} strokeWidth={4} />)}
    <text y={-80} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"' }}>{amount}</text>
  </g>
)

// # a weight block with a label (for the loss side of the scale)
export const Weight: React.FC<{ x: number; y: number; label: string; s?: number; tone?: string; o?: number }> = ({ x, y, label, s = 1, tone = '#5D6676', o = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-70 0 L70 0 L52 -110 L-52 -110 Z" fill={tone} stroke={INK} strokeWidth={5} />
    <rect x={-22} y={-140} width={44} height={34} rx={10} fill="none" stroke={INK} strokeWidth={8} />
    <text y={-38} textAnchor="middle" fill={CREAM} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
  </g>
)

// # a big tick or cross stamp
export const Mark: React.FC<{ x: number; y: number; ok: boolean; s?: number; o?: number }> = ({ x, y, ok, s = 1, o = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={50} fill={ok ? LEAF : CORAL} stroke={INK} strokeWidth={5} />
    <path d={ok ? 'M-22 2 L-6 20 L24 -16' : 'M-18 -18 L18 18 M18 -18 L-18 18'} stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
)

export const ease = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export const r01 = rnd
