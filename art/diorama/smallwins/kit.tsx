// ============================================================
// SMALL WINS KIT — the drawn parts of the Short "Why Small Wins Keep
// You Going" (LW, 2026-11-14). Own art direction: a bright outdoor
// world — sky blue, fresh mint hills, sunny orange flags; the goal
// is a far-off mountain peak; each small win is a GOLD MARBLE that
// drops into a glass jar. Tall canvas 1080 × 1920.
// ============================================================
import React from 'react'
import { BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, on, lerp, span, easeOut, rnd } from '../day3/kit'

export { Person, Tag, Headline, win, pop, on, lerp, span, easeOut, rnd, BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, type Beat } from '../day3/kit'

export const SKY = ['#9FD3F2', '#DDF1FA'] as const
export const HILL = '#8FD1A8', HILL_D = '#5FB383', ORANGE = '#F28A30', OFFICE = '#DCD6E8', OFFICE_D = '#B9B1CC'

// # the outdoors: sky, the far mountain with a GOAL flag, two mint hills
export const Outdoors: React.FC<{ id: string; peak?: number }> = ({ id, peak = 1 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={SKY[0]} /><stop offset="100%" stopColor={SKY[1]} /></linearGradient>
      <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.2} /></radialGradient>
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-sky)`} />
    <g opacity={peak}><Mountain x={780} y={900} s={1} /></g>
    <path d={`M0 ${GROUND - 160} Q300 ${GROUND - 300} 620 ${GROUND - 170} T1080 ${GROUND - 200} L1080 1920 L0 1920 Z`} fill={HILL} />
    <path d={`M0 ${GROUND - 30} Q360 ${GROUND - 120} 720 ${GROUND - 40} T1080 ${GROUND - 60} L1080 1920 L0 1920 Z`} fill={HILL_D} />
  </g>
)
export const WVig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # the far mountain with a snow cap and an orange GOAL flag at the top
export const Mountain: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-360 220 L0 -300 L360 220 Z" fill="#8C9DB5" />
    <path d="M-90 -170 L0 -300 L90 -170 L50 -150 L20 -175 L-20 -145 L-50 -170 Z" fill="#FFFFFF" />
    <path d="M0 -300 L0 -400" stroke={INK} strokeWidth={6} /><path d="M0 -400 L70 -380 L0 -360 Z" fill={ORANGE} />
    <text x={0} y={-420} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 4 }}>GOAL</text>
  </g>
)

// # an office at night (the hook)
export const Office: React.FC<{ id: string }> = ({ id }) => (
  <g>
    <defs><radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.24} /></radialGradient></defs>
    <rect width={W} height={GROUND} fill={OFFICE} />
    <rect x={0} y={GROUND - 300} width={W} height={300} fill={OFFICE_D} />
    <g transform="translate(780 520)"><rect x={-200} y={-150} width={400} height={300} rx={8} fill="#2E3560" stroke="#8A82A6" strokeWidth={14} />{[[-120, -80], [60, -40], [130, 60], [-40, 80]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={4} fill="#FFF6D8" />)}</g>
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill="#8E86A6" />
  </g>
)

// # the jar of wins: glass jar, `n` gold marbles stacked inside, `glow` 0..1
export const Jar: React.FC<{ x: number; y: number; n: number; s?: number; glow?: number; f: number }> = ({ x, y, n, s = 1, glow = 0, f }) => {
  const per = 6
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {glow > 0 && <circle cy={-160} r={260} fill={GOLD_L} opacity={0.4 * glow * (0.85 + 0.15 * Math.sin(f / 6))} />}
      <rect x={-150} y={-340} width={300} height={340} rx={40} fill="#E6F4F8" opacity={0.55} stroke={INK} strokeWidth={6} />
      {Array.from({ length: Math.min(n, 48) }, (_, k) => {
        const row = Math.floor(k / per), col = k % per
        return <circle key={k} cx={-110 + col * 44 + (row % 2) * 20} cy={-30 - row * 40} r={20} fill={GOLD} stroke={INK} strokeWidth={3} />
      })}
      <rect x={-120} y={-372} width={240} height={36} rx={10} fill="#B98258" stroke={INK} strokeWidth={5} />
      <rect x={-150} y={-340} width={30} height={300} rx={14} fill="#FFFFFF" opacity={0.35} />
    </g>
  )
}
// # a falling marble from (x, y0) into the jar mouth at (x1, y1); `t` 0..1
export const Marble: React.FC<{ x0: number; y0: number; x1: number; y1: number; t: number }> = ({ x0, y0, x1, y1, t }) => t <= 0 || t >= 1 ? null : (
  <circle cx={lerp(x0, x1, t)} cy={lerp(y0, y1, t * t)} r={20} fill={GOLD} stroke={INK} strokeWidth={3} />
)

// # a little diary page
export const Diary: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-80} y={-100} width={160} height={200} rx={8} fill="#FFFDF6" stroke={INK} strokeWidth={4} />
    <text y={-62} textAnchor="middle" fill={BURG} style={{ font: '400 30px "Bebas Neue"', letterSpacing: 2 }}>TODAY</text>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-56} y={-36 + k * 30} width={k === 3 ? 60 : 112} height={7} rx={3} fill={INK} opacity={0.25} />)}
  </g>
)

// # footprints along the path behind someone (progress you can look back at)
export const Steps: React.FC<{ x0: number; x1: number; y: number; n: number; o?: number }> = ({ x0, x1, y, n, o = 1 }) => (
  <g opacity={o}>{Array.from({ length: n }, (_, k) => <ellipse key={k} cx={lerp(x0, x1, k / Math.max(1, n - 1))} cy={y + (k % 2) * 18} rx={18} ry={9} fill={HILL_D} opacity={0.9} />)}</g>
)

export const ease = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export const r01 = rnd
