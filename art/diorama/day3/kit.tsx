// ============================================================
// DAY 3 KIT — the drawn parts of the Short "Why You Always Quit on
// Day 3" (LW sample, 2026-11-13). Own art direction for THIS video:
// a bedroom and a city morning; dusky blue for the struggle, warm
// dawn peach + burgundy for the way out. Tall canvas 1080 × 1920:
// headline slot near y 300, captions live around y 1290–1490, so the
// action sits between y 420 and y 1240 (ground line GROUND = 1240).
// ============================================================
import React from 'react'
import { Actor } from '../../rig/Actor'
import { getPose, mixPose, type ExpressionId } from '../../rig/pose'
import { COLORS } from '../../tokens'
import { between, easeOut, lerp, on, pop, rnd, span } from '../kit'

export const W = 1080, H = 1920, CX = 540, GROUND = 1240
export const INK = COLORS.LW.ink, BURG = COLORS.LW.burgundy, CREAM = COLORS.LW.cream
export const GOLD = '#F4C35A', GOLD_L = '#FFE7A3'
// # two moods: dusk (struggle) and dawn (the way out)
export const DUSK = { sky: ['#3A4670', '#232C4D'], wall: '#46557E', wall2: '#3A4870', floor: '#2C355A', glow: '#8FA2D8' }
export const DAWN = { sky: ['#FFD9B0', '#F2A27A'], wall: '#F3D9C2', wall2: '#E9C7AC', floor: '#D7AE92', glow: '#FFF1D6' }
export type Look = typeof DUSK

// # a window into [a, b) that fades in and out (re-export with a shorter name)
export const win = between

// ------------------------------------------------------------ people: the shared rig acting on beats
export type Beat = [at: number, pose: string, expression?: ExpressionId]
export const Person: React.FC<{ f: number; who: string; beats: Beat[]; x: number; y?: number; s?: number; flip?: boolean; seed?: number }> = ({ f, who, beats, x, y = GROUND, s = 0.92, flip = false, seed = 3 }) => {
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

// ------------------------------------------------------------ stage pieces
export const Backdrop: React.FC<{ id: string; m: Look }> = ({ id, m }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={m.sky[0]} /><stop offset="100%" stopColor={m.sky[1]} /></linearGradient>
      <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.28} /></radialGradient>
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-sky)`} />
  </g>
)
export const Vig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # the bedroom: back wall with a panel line, a window, a floor that runs down under the captions
export const Room: React.FC<{ m: Look; light?: number }> = ({ m, light = 1 }) => (
  <g>
    <rect x={0} y={0} width={W} height={GROUND} fill={m.wall} />
    <rect x={0} y={GROUND - 260} width={W} height={10} fill={m.wall2} />
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={m.floor} />
    <rect x={0} y={GROUND} width={W} height={14} fill="#000" opacity={0.12} />
    {/* # window: sky inside, a soft light patch on the floor that dims with `light` */}
    <g transform="translate(640 380)">
      <rect x={-6} y={-6} width={332} height={392} rx={10} fill={m.wall2} />
      <rect x={0} y={0} width={320} height={380} rx={6} fill={m.sky[0]} opacity={0.95} />
      <rect x={156} y={0} width={8} height={380} fill={m.wall2} /><rect x={0} y={186} width={320} height={8} fill={m.wall2} />
    </g>
    <path d={`M560 ${GROUND + 10} L980 ${GROUND + 10} L1080 ${GROUND + 320} L480 ${GROUND + 320} Z`} fill={m.glow} opacity={0.18 * light} />
  </g>
)

export const Bed: React.FC<{ x: number; y?: number; sleeper?: number }> = ({ x, y = GROUND, sleeper = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-300} y={-170} width={34} height={170} rx={8} fill="#5A3A2E" />
    <rect x={-290} y={-120} width={600} height={90} rx={22} fill="#EDE3D6" />
    <rect x={-280} y={-150} width={150} height={60} rx={26} fill="#FFFFFF" />
    {/* # the duvet: a soft burgundy hump, a person-shaped bump when someone is asleep under it */}
    <path d={`M-140 -110 Q${40} ${-150 - 40 * sleeper} 300 -110 L300 -40 L-140 -40 Z`} fill={BURG} />
    <path d={`M-140 -110 Q${40} ${-150 - 40 * sleeper} 300 -110`} stroke="#A63A50" strokeWidth={8} fill="none" />
    <rect x={-290} y={-34} width={600} height={34} rx={6} fill="#4A2F25" />
  </g>
)

// # an alarm clock that shakes and throws ring lines while `ring` > 0
export const Alarm: React.FC<{ x: number; y: number; f: number; ring: number; s?: number; time?: string }> = ({ x, y, f, ring, s = 1, time = '5:00' }) => {
  const shake = ring * Math.sin(f * 1.9) * 7
  return (
    <g transform={`translate(${x + shake} ${y}) scale(${s}) rotate(${ring * Math.sin(f * 2.3) * 4})`}>
      <circle cx={-42} cy={-70} r={22} fill={GOLD} /><circle cx={42} cy={-70} r={22} fill={GOLD} />
      <circle r={72} fill={CREAM} stroke={INK} strokeWidth={8} />
      <text y={14} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>{time}</text>
      <rect x={-50} y={58} width={14} height={30} rx={6} fill={INK} /><rect x={36} y={58} width={14} height={30} rx={6} fill={INK} />
      {ring > 0.05 && [-1, 1].map((d) => [0, 1].map((k) => (
        <path key={`${d}${k}`} d={`M${d * (96 + k * 26)} -40 q${d * 14} 40 0 80`} stroke={GOLD} strokeWidth={8} fill="none" strokeLinecap="round" opacity={ring * (0.6 + 0.4 * Math.sin(f * 0.8 + k))} />
      )))}
    </g>
  )
}

// # a tear-off wall calendar page with a big day word
export const CalPage: React.FC<{ x: number; y: number; label: string; s?: number; r?: number; tone?: string }> = ({ x, y, label, s = 1, r = 0, tone = BURG }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-150} y={-170} width={300} height={340} rx={18} fill={CREAM} stroke={INK} strokeWidth={7} />
    <rect x={-150} y={-170} width={300} height={84} rx={18} fill={tone} />
    <rect x={-150} y={-110} width={300} height={24} fill={tone} />
    <circle cx={-80} cy={-170} r={12} fill={INK} /><circle cx={80} cy={-170} r={12} fill={INK} />
    <text y={-114} textAnchor="middle" fill={CREAM} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 6 }}>DAY</text>
    <text y={110} textAnchor="middle" fill={INK} style={{ font: '400 200px "Bebas Neue"' }}>{label}</text>
  </g>
)

// # a wall light switch: `up` 1 = on (glows), 0 = off
export const Switch: React.FC<{ x: number; y: number; up: number; s?: number; glow?: number }> = ({ x, y, up, s = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={150} fill={GOLD} opacity={0.22 * glow} />
    <rect x={-70} y={-110} width={140} height={220} rx={22} fill={CREAM} stroke={INK} strokeWidth={7} />
    <rect x={-26} y={-60} width={52} height={120} rx={14} fill="#D9CBB8" />
    <rect x={-24} y={lerp(28, -58, up)} width={48} height={60} rx={12} fill={up > 0.5 ? GOLD : '#8A7F72'} stroke={INK} strokeWidth={5} />
  </g>
)

// # a paper tag hanging on a string, with a word on it
export const Tag: React.FC<{ x: number; y: number; text: string; s?: number; r?: number; fill?: string; ink?: string; size?: number }> = ({ x, y, text, s = 1, r = 0, fill = CREAM, ink = INK, size = 64 }) => {
  const w = Math.max(200, text.length * size * 0.5 + 90)
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d={`M0 ${-size * 1.3} L0 ${-size * 0.62}`} stroke={INK} strokeWidth={4} />
      <rect x={-w / 2} y={-size * 0.62} width={w} height={size * 1.24} rx={14} fill={fill} stroke={INK} strokeWidth={6} />
      <circle cx={-w / 2 + 26} cy={0} r={9} fill="none" stroke={INK} strokeWidth={4} />
      <text y={size * 0.36} textAnchor="middle" fill={ink} style={{ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 3 }}>{text}</text>
    </g>
  )
}

// # the headline slot (top of the frame): one short title for the idea on screen, never two at once
export const Headline: React.FC<{ text: string; o: number; color?: string }> = ({ text, o, color = INK }) => o <= 0.001 ? null : (
  <text x={CX} y={300} textAnchor="middle" opacity={o} fill={color} style={{ font: '400 104px "Bebas Neue"', letterSpacing: 4 }}
    transform={`translate(0 ${(1 - o) * 20})`}>{text}</text>
)

// # a golden spark (the novelty reward): a four-point star that twinkles
export const Spark: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; seed?: number; grey?: number }> = ({ x, y, s = 1, o = 1, f, seed = 1, grey = 0 }) => {
  const tw = 0.8 + 0.2 * Math.sin(f / 5 + seed * 3)
  const c = grey > 0.5 ? '#9AA0AE' : GOLD
  return (
    <g transform={`translate(${x} ${y}) scale(${s * tw}) rotate(${(f + seed * 40) % 360 * 0.2})`} opacity={o}>
      <circle r={34} fill={c} opacity={0.25} />
      <path d="M0 -30 Q4 -4 30 0 Q4 4 0 30 Q-4 4 -30 0 Q-4 -4 0 -30 Z" fill={grey > 0.5 ? '#B8BDC8' : GOLD_L} />
    </g>
  )
}

// # a burst of sparks flying from (x0,y0) to (x1,y1) starting at `at`
export const SparkFlow: React.FC<{ f: number; at: number; x0: number; y0: number; x1: number; y1: number; n?: number; grey?: number }> = ({ f, at, x0, y0, x1, y1, n = 6, grey = 0 }) => (
  <g>
    {Array.from({ length: n }, (_, k) => {
      const t = span(f, at + k * 5, at + k * 5 + 26)
      if (t <= 0 || t >= 1) return null
      const lift = Math.sin(t * Math.PI) * (120 + rnd(k + at) * 80)
      return <Spark key={k} f={f} seed={k} x={lerp(x0, x1, easeOut(t))} y={lerp(y0, y1, easeOut(t)) - lift} s={0.7} o={1 - t * 0.4} grey={grey} />
    })}
  </g>
)

// ------------------------------------------------------------ objects
export const Shoes: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((d) => (
      <g key={d} transform={`translate(${d * 62} 0)`}>
        <path d="M-70 0 Q-60 -60 -10 -62 Q20 -40 60 -30 Q80 -20 78 0 Z" fill="#F4F1EC" stroke={INK} strokeWidth={6} />
        <path d="M-40 -40 L10 -30 M-30 -50 L14 -42" stroke={BURG} strokeWidth={7} strokeLinecap="round" />
        <rect x={-72} y={-6} width={152} height={14} rx={6} fill={BURG} />
      </g>
    ))}
  </g>
)
export const Notebook: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-90} y={-120} width={180} height={240} rx={12} fill={BURG} stroke={INK} strokeWidth={6} />
    <rect x={-90} y={-120} width={30} height={240} rx={8} fill="#5C1426" />
    <rect x={-30} y={-60} width={96} height={40} rx={6} fill={CREAM} />
    <path d="M90 -80 L110 -80 L110 -40 L100 -48 L90 -40 Z" fill={GOLD} />
  </g>
)
export const PlanSheet: React.FC<{ x: number; y: number; s?: number; r?: number; ticks?: number }> = ({ x, y, s = 1, r = 0, ticks = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-110} y={-140} width={220} height={280} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <text y={-92} textAnchor="middle" fill={BURG} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>THE PLAN</text>
    {[0, 1, 2, 3].map((k) => (
      <g key={k} transform={`translate(-78 ${-46 + k * 50})`}>
        <rect width={30} height={30} rx={6} fill="none" stroke={INK} strokeWidth={4} />
        {k < ticks && <path d="M5 15 L13 24 L27 4" stroke="#2E8B57" strokeWidth={6} fill="none" strokeLinecap="round" />}
        <rect x={44} y={10} width={k % 2 ? 90 : 120} height={10} rx={5} fill={INK} opacity={0.35} />
      </g>
    ))}
  </g>
)
export const Book: React.FC<{ x: number; y: number; s?: number; open?: number }> = ({ x, y, s = 1, open = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M0 0 Q-70 ${-30 * open} -150 -10 L-150 -120 Q-70 ${-140 * open} 0 -110 Z`} fill={CREAM} stroke={INK} strokeWidth={6} />
    <path d={`M0 0 Q70 ${-30 * open} 150 -10 L150 -120 Q70 ${-140 * open} 0 -110 Z`} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    {[0, 1, 2].map((k) => <path key={k} d={`M${24} ${-90 + k * 24} L${120} ${-96 + k * 24}`} stroke={INK} strokeWidth={4} opacity={0.35} />)}
    <text x={-75} y={-50} textAnchor="middle" fill={BURG} style={{ font: '400 46px "Bebas Neue"' }}>1</text>
  </g>
)
// # a door with a burgundy frame; `open` 0..1 swings it, morning light spills out
export const Door: React.FC<{ x: number; y?: number; open: number }> = ({ x, y = GROUND, open }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-560} width={300} height={560} fill={DAWN.glow} />
    <path d={`M-150 ${-560} L${-150 + 300 * (1 - open * 0.7)} ${-560 + open * 40} L${-150 + 300 * (1 - open * 0.7)} ${-open * 40} L-150 0 Z`} fill="#8A4A3A" stroke={INK} strokeWidth={6} />
    <rect x={-170} y={-580} width={340} height={20} rx={6} fill={BURG} /><rect x={-170} y={-580} width={20} height={580} fill={BURG} /><rect x={150} y={-580} width={20} height={580} fill={BURG} />
    <path d={`M150 0 L${150 + 260 * open} 120 L-150 120 Z`} fill={GOLD_L} opacity={0.35 * open} />
  </g>
)
// # a chair with tomorrow's clothes laid out (hoodie folded on the seat, shoes under it)
export const ChairClothes: React.FC<{ x: number; y?: number; o?: number }> = ({ x, y = GROUND, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-110} y={-330} width={24} height={330} rx={8} fill="#6B4A3A" />
    <rect x={-110} y={-190} width={230} height={24} rx={8} fill="#6B4A3A" />
    <rect x={96} y={-190} width={24} height={190} rx={8} fill="#6B4A3A" /><rect x={-110} y={-190} width={24} height={190} rx={8} fill="#6B4A3A" />
    <rect x={-96} y={-246} width={200} height={58} rx={16} fill={BURG} /><rect x={-80} y={-236} width={170} height={12} rx={6} fill="#A63A50" />
    <g transform="translate(6 -6) scale(0.55)"><Shoes x={0} y={0} /></g>
  </g>
)
export const Moon: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}><circle r={70} fill="#F3EBD2" /><circle cx={30} cy={-18} r={62} fill={DUSK.sky[0]} /></g>
)
export const Sun: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 120, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r * 2} fill={GOLD} opacity={0.16} /><circle r={r * 1.4} fill={GOLD} opacity={0.22} /><circle r={r} fill="#FFE1A0" />
  </g>
)
// # a little "X" (a missed day) and a tick (a done day)
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-22 -22 L22 22 M22 -22 L-22 22" stroke="#D2463C" strokeWidth={10} strokeLinecap="round" /></g>
)
export const Tick: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-20 0 L-6 16 L22 -18" stroke="#2E8B57" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
)

export { between, easeOut, lerp, on, pop, rnd, span }
