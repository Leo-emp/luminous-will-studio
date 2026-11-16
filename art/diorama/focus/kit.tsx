// ============================================================
// FOCUS KIT — the drawn parts of the Short "Why You Can't Focus
// Anymore" (LW, 2026-11-14). Own art direction: a bright daytime
// home desk in cool slate-teal and paper white with electric
// lime-yellow accents; ATTENTION is a flashlight BEAM that lands on
// one thing at a time; distractions are notification chips and
// browser tabs drawn as physical cards. Tall canvas 1080 × 1920.
// ============================================================
import React from 'react'
import { BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, on, lerp, span, easeOut, rnd } from '../day3/kit'

export { Person, Tag, Headline, win, pop, on, lerp, span, easeOut, rnd, BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, type Beat } from '../day3/kit'

export const SLATE = '#BFD3D6', SLATE_D = '#8FAEB3', LIME = '#D8F05A', CORAL = '#F07A5A', DESK = '#C79A6B', NOTE = '#FF5A5A'

// # the room: slate wall, a big window with a sunny city, a floor
export const Room: React.FC<{ id: string; dim?: number }> = ({ id, dim = 0 }) => (
  <g>
    <defs><radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.22} /></radialGradient></defs>
    <rect width={W} height={GROUND} fill={SLATE} />
    <g transform="translate(250 560)">
      <rect x={-190} y={-170} width={380} height={340} rx={12} fill="#DDF0F7" stroke={SLATE_D} strokeWidth={16} />
      {[[-150, 40, 90], [-50, -10, 140], [40, 30, 100], [110, -40, 170]].map(([x, y, h], k) => <rect key={k} x={x} y={170 - h} width={70} height={h} fill={['#A9C3CF', '#93B0BF', '#B5CBD6', '#8EA9B8'][k]} />)}
      <circle cx={120} cy={-110} r={34} fill={GOLD} />
    </g>
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill="#7E9AA0" />
    <rect x={0} y={GROUND} width={W} height={14} fill="#000" opacity={0.12} />
    <rect width={W} height={H} fill="#1B2430" opacity={0.45 * dim} />
  </g>
)
export const FVig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

export const DESK_Y = GROUND - 290
export const Desk: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} ${GROUND})`}>
    <rect x={-280} y={-290} width={560} height={30} rx={8} fill={DESK} stroke={INK} strokeWidth={6} />
    <rect x={-260} y={-260} width={22} height={260} fill="#9C7650" /><rect x={238} y={-260} width={22} height={260} fill="#9C7650" />
  </g>
)
// # a laptop with a page on screen
export const Laptop: React.FC<{ x: number; y: number; s?: number; title?: string; glow?: number }> = ({ x, y, s = 1, title = 'THE TASK', glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {glow > 0 && <ellipse cx={0} cy={-120} rx={230} ry={150} fill={LIME} opacity={0.35 * glow} />}
    <rect x={-160} y={-220} width={320} height={210} rx={12} fill={INK} />
    <rect x={-146} y={-206} width={292} height={182} rx={6} fill="#FFFFFF" />
    <text y={-160} textAnchor="middle" fill={BURG} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>
    {[0, 1, 2].map((k) => <rect key={k} x={-110} y={-130 + k * 30} width={220 - k * 40} height={8} rx={4} fill={INK} opacity={0.2} />)}
    <path d="M-190 -10 L190 -10 L210 10 L-210 10 Z" fill="#B9B4AC" stroke={INK} strokeWidth={5} />
  </g>
)
// # a phone; `down` 1 = lying face down (just its back)
export const Phone: React.FC<{ x: number; y: number; s?: number; r?: number; down?: number; buzz?: number; f?: number }> = ({ x, y, s = 1, r = 0, down = 0, buzz = 0, f = 0 }) => (
  <g transform={`translate(${x + buzz * Math.sin(f * 2.4) * 5} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-44} y={-80} width={88} height={160} rx={16} fill={down > 0.5 ? '#3A4250' : INK} />
    {down <= 0.5 && <rect x={-36} y={-68} width={72} height={130} rx={8} fill="#5AA9F0" />}
    {down > 0.5 && <circle cx={-18} cy={-56} r={10} fill="#222" stroke="#666" strokeWidth={3} />}
  </g>
)
// # a notification chip: red dot + a short label
export const Chip: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; r?: number }> = ({ x, y, text, s = 1, o = 1, r = 0 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-text.length * 13 - 60} y={-36} width={text.length * 26 + 100} height={72} rx={36} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    <circle cx={-text.length * 13 - 26} cy={0} r={18} fill={NOTE} />
    <text x={12} y={14} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{text}</text>
  </g>
)
// # a browser tab as a physical card
export const TabCard: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; lit?: number; r?: number }> = ({ x, y, text, s = 1, o = 1, lit = 0, r = 0 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M-110 -60 L-80 -100 L80 -100 L110 -60 Z" fill={lit > 0.5 ? LIME : '#E7EEF0'} stroke={INK} strokeWidth={5} />
    <rect x={-140} y={-60} width={280} height={150} rx={10} fill={lit > 0.5 ? '#FBFFE6' : '#FFFFFF'} stroke={INK} strokeWidth={5} />
    <text y={30} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>{text}</text>
  </g>
)
// # the attention beam: a cone of lime light from (x0,y0) to a spot at (x1,y1)
export const Beam: React.FC<{ x0: number; y0: number; x1: number; y1: number; w?: number; o?: number }> = ({ x0, y0, x1, y1, w = 120, o = 1 }) => {
  if (o <= 0.001) return null
  const a = Math.atan2(y1 - y0, x1 - x0) + Math.PI / 2
  const dx = Math.cos(a) * w, dy = Math.sin(a) * w
  return (
    <g opacity={o} pointerEvents="none">
      <path d={`M${x0} ${y0} L${x1 + dx} ${y1 + dy} L${x1 - dx} ${y1 - dy} Z`} fill={LIME} opacity={0.35} />
      <ellipse cx={x1} cy={y1} rx={w} ry={w * 0.55} fill={LIME} opacity={0.45} />
    </g>
  )
}
// # a stopwatch with a seconds label
export const Stopwatch: React.FC<{ x: number; y: number; s?: number; t: number; label: string; tone?: string }> = ({ x, y, s = 1, t, label, tone = CORAL }) => {
  const a = -Math.PI / 2 + Math.PI * 2 * t
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-20} y={-140} width={40} height={30} rx={8} fill={INK} />
      <circle r={110} fill={CREAM} stroke={INK} strokeWidth={8} />
      {t > 0.001 && <path d={`M0 0 L0 -96 A96 96 0 ${t > 0.5 ? 1 : 0} 1 ${Math.cos(a) * 96} ${Math.sin(a) * 96} Z`} fill={tone} opacity={0.85} />}
      <circle r={12} fill={INK} />
      <text y={170} textAnchor="middle" fill={INK} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>{label}</text>
    </g>
  )
}
// # a little brain-power bar chart column
export const Col: React.FC<{ x: number; y: number; h: number; label: string; tone: string; o?: number }> = ({ x, y, h, label, tone, o = 1 }) => (
  <g opacity={o}>
    <rect x={x - 80} y={y - h} width={160} height={h} rx={10} fill={tone} stroke={INK} strokeWidth={5} />
    <text x={x} y={y + 50} textAnchor="middle" fill={INK} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
  </g>
)

export const ease = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export const r01 = rnd
export const lit = GOLD_L
export const mix = lerp
