// ============================================================
// EDISON KIT — the drawn parts of the Short "He Lost Everything at
// 67, Then Did This" (LW, 2026-11-14). Own art direction: 1914 in
// warm sepia — brick-red factory blocks, a soot-blue night lit by an
// orange fire, then a pale grey-blue morning and fresh new brick.
// Thomas Edison is the library character 'lib-edison', ALWAYS shown
// with a name label.
// ============================================================
import React from 'react'
import { BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, on, lerp, span, easeOut, rnd } from '../day3/kit'

export { Person, Tag, Headline, win, pop, on, lerp, span, easeOut, rnd, BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, type Beat } from '../day3/kit'

export const SEPIA = { paper: '#F1E4CC', brick: '#A8553A', brick2: '#8C4430', soot: '#2B2E3F', night: '#1F2233', ember: '#F2803A', flame: '#FFB347', morning: ['#C9D6DF', '#E9E2D3'] as [string, string] }
export const ASH = '#5A5650'

// # the sky: night (with fire glow) blends to morning by `day` 0..1
export const Sky: React.FC<{ id: string; day: number; glow?: number }> = ({ id, day, glow = 0 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-m`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={SEPIA.morning[0]} /><stop offset="100%" stopColor={SEPIA.morning[1]} /></linearGradient>
      <radialGradient id={`${id}-g`} cx="0.5" cy="0.6" r="0.6"><stop offset="0%" stopColor={SEPIA.ember} stopOpacity={0.8} /><stop offset="100%" stopColor={SEPIA.ember} stopOpacity={0} /></radialGradient>
      <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="58%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.3} /></radialGradient>
    </defs>
    <rect width={W} height={H} fill={SEPIA.night} />
    <rect width={W} height={H} fill={`url(#${id}-g)`} opacity={glow} />
    <rect width={W} height={H} fill={`url(#${id}-m)`} opacity={day} />
  </g>
)
export const EVig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # one factory block: brick body, windows, a chimney; `burn` 0..1 chars it black and lights the windows orange;
// # `gone` 0..1 collapses it to a ruin
export const Block: React.FC<{ x: number; w: number; h: number; burn?: number; gone?: number; chimney?: boolean; label?: string }> = ({ x, w, h, burn = 0, gone = 0, chimney, label }) => {
  const hh = lerp(h, h * 0.35, gone)
  const body = burn > 0.5 ? '#3A2E2A' : SEPIA.brick
  return (
    <g transform={`translate(${x} ${GROUND})`}>
      {chimney && gone < 0.5 && <rect x={w * 0.7} y={-hh - 120} width={44} height={130} fill={SEPIA.brick2} stroke={INK} strokeWidth={4} />}
      <path d={gone > 0.05 ? `M0 0 L0 ${-hh} L${w * 0.3} ${-hh + 40} L${w * 0.55} ${-hh - 10} L${w * 0.8} ${-hh + 50} L${w} ${-hh + 10} L${w} 0 Z` : `M0 0 L0 ${-hh} L${w} ${-hh} L${w} 0 Z`} fill={body} stroke={INK} strokeWidth={5} />
      {gone < 0.5 && Array.from({ length: Math.floor(w / 90) }, (_, k) => [0, 1].map((r) => <rect key={`${k}${r}`} x={24 + k * 90} y={-hh + 40 + r * 110} width={50} height={70} rx={4} fill={burn > 0.2 ? SEPIA.flame : '#E8D9B8'} opacity={burn > 0.2 ? 0.6 + 0.4 * Math.sin(k * 3 + r) : 1} />))}
      {label && <text x={w / 2} y={-hh - 20} textAnchor="middle" fill={CREAM} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>}
    </g>
  )
}

// # flames: a cluster of flickering tongues at (x, base) of width w; `o` strength
export const Flames: React.FC<{ x: number; y: number; w: number; f: number; o?: number; h?: number }> = ({ x, y, w, f, o = 1, h = 260 }) => o <= 0.001 ? null : (
  <g opacity={o}>
    {Array.from({ length: Math.max(3, Math.floor(w / 60)) }, (_, k) => {
      const fx = x + (k + 0.5) * (w / Math.max(3, Math.floor(w / 60))), fh = h * (0.6 + 0.4 * Math.abs(Math.sin(f / 4 + k * 1.7)))
      return <g key={k}>
        <path d={`M${fx - 40} ${y} Q${fx - 30} ${y - fh * 0.5} ${fx} ${y - fh} Q${fx + 30} ${y - fh * 0.5} ${fx + 40} ${y} Z`} fill={SEPIA.ember} />
        <path d={`M${fx - 20} ${y} Q${fx - 14} ${y - fh * 0.3} ${fx} ${y - fh * 0.6} Q${fx + 14} ${y - fh * 0.3} ${fx + 20} ${y} Z`} fill={SEPIA.flame} />
      </g>
    })}
  </g>
)
// # smoke puffs rising
export const Smoke: React.FC<{ x: number; y: number; f: number; o?: number; n?: number }> = ({ x, y, f, o = 1, n = 6 }) => o <= 0.001 ? null : (
  <g opacity={o}>{Array.from({ length: n }, (_, k) => { const t = ((f / 60) + k / n) % 1
    return <circle key={k} cx={x + Math.sin(k * 2 + f / 30) * 60 + t * 80} cy={y - t * 600} r={40 + t * 90} fill="#4A4A55" opacity={(1 - t) * 0.6} /> })}</g>
)

// # a brick (new), and a little wall of bricks laid up to `n`
export const Brick: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}><rect x={-60} y={-26} width={120} height={52} rx={6} fill="#C8743F" stroke={INK} strokeWidth={4} /><rect x={-50} y={-18} width={30} height={8} rx={4} fill="#E39A62" /></g>
)

// # a quote card, typewriter style
export const Quote: React.FC<{ x: number; y: number; s?: number; lines: string[]; by?: string; o?: number }> = ({ x, y, s = 1, lines, by, o = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-330} y={-60 - lines.length * 40} width={660} height={120 + lines.length * 80 + (by ? 40 : 0)} rx={12} fill={SEPIA.paper} stroke={INK} strokeWidth={6} />
    {lines.map((t, k) => <text key={k} y={-lines.length * 40 + 30 + k * 80} textAnchor="middle" fill={INK} style={{ font: '400 62px "Bebas Neue"', letterSpacing: 3 }}>{t}</text>)}
    {by && <text y={lines.length * 40 + 40} textAnchor="middle" fill={BURG} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>{by}</text>}
  </g>
)

// # the name label for a real person
export const NameTag: React.FC<{ x: number; y: number; name: string; o?: number }> = ({ x, y, name, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-name.length * 14 - 24} y={-30} width={name.length * 28 + 48} height={60} rx={30} fill={INK} />
    <text y={14} textAnchor="middle" fill={GOLD} style={{ font: '400 42px "Bebas Neue"', letterSpacing: 3 }}>{name}</text>
  </g>
)

// # a burnt card (a thing that "burned down" in your life)
export const Burnt: React.FC<{ x: number; y: number; text: string; burn: number; s?: number; r?: number }> = ({ x, y, text, burn, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-150} y={-70} width={300} height={140} rx={10} fill={burn > 0.5 ? '#6A5A4E' : SEPIA.paper} stroke={INK} strokeWidth={5} />
    <path d={`M-150 ${70 - 140 * burn} Q-80 ${50 - 140 * burn} 0 ${74 - 140 * burn} Q80 ${50 - 140 * burn} 150 ${70 - 140 * burn} L150 70 L-150 70 Z`} fill="#2B2420" opacity={0.85} />
    <text y={18} textAnchor="middle" fill={burn > 0.5 ? CREAM : INK} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>
  </g>
)

export const ease = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export const r01 = rnd
export const glowFill = GOLD_L
