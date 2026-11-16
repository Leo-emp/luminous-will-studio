// ============================================================
// SPOTLIGHT KIT — the drawn parts of the Short "Why You Think
// Everyone Is Watching You" (LW, 2026-11-14). Own art direction:
// a warm college common room in mustard and deep teal; the feeling
// of being watched is a THEATRE SPOTLIGHT cone that follows you —
// and, once you look closer, everyone has their own. Tall canvas
// 1080 × 1920; action between y 420 and GROUND 1240.
// ============================================================
import React from 'react'
import { BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, on, lerp, span, easeOut } from '../day3/kit'

export { Person, Tag, Headline, win, pop, on, lerp, span, easeOut, rnd, BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, type Beat } from '../day3/kit'

export const MUSTARD = '#E9B949', MUSTARD_D = '#C9962C', TEALD = '#1F5F63', TEAL = '#2F8A8A', TEAL_L = '#8FCBC4', BRICK = '#C65A3A', ROSE = '#F2A7A0'

// ------------------------------------------------------------ rooms
// # the common room: mustard wall, teal wainscot, a noticeboard and a doorway; `dim` darkens it for the spotlight
export const Common: React.FC<{ id: string; dim?: number }> = ({ id, dim = 0 }) => (
  <g>
    <defs><radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="58%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.26} /></radialGradient></defs>
    <rect width={W} height={GROUND} fill={MUSTARD} />
    <rect x={0} y={GROUND - 340} width={W} height={340} fill={TEALD} />
    <rect x={0} y={GROUND - 352} width={W} height={14} fill={MUSTARD_D} />
    {/* # noticeboard with pinned papers */}
    <g transform="translate(150 470)">
      <rect x={-110} y={-80} width={220} height={160} rx={8} fill="#B07A4A" stroke={INK} strokeWidth={5} />
      {[[-60, -30, CREAM], [20, -40, TEAL_L], [-30, 30, ROSE], [60, 30, CREAM]].map(([x, y, c], k) => <g key={k}><rect x={(x as number) - 32} y={(y as number) - 24} width={64} height={48} fill={c as string} /><circle cx={x as number} cy={(y as number) - 22} r={5} fill={BRICK} /></g>)}
    </g>
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill="#8C5E3C" />
    <rect x={0} y={GROUND} width={W} height={12} fill="#000" opacity={0.15} />
    <rect width={W} height={H} fill="#10131F" opacity={0.55 * dim} />
  </g>
)
export const SVg: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # a stage: deep teal curtains, a wooden floor edge
export const Stage: React.FC<{ id: string; dim?: number }> = ({ id, dim = 0 }) => (
  <g>
    <defs><radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="58%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.3} /></radialGradient></defs>
    <rect width={W} height={H} fill="#2A2238" />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={k * 120} y={0} width={120} height={GROUND} fill={k % 2 ? '#7A2236' : '#8E2A40'} />)}
    <path d="M0 0 L1080 0 L1080 160 Q540 260 0 160 Z" fill="#6A1C2E" />
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill="#B5824F" />
    <rect x={0} y={GROUND} width={W} height={20} fill="#8A5E36" />
    <rect width={W} height={H} fill="#0C0A14" opacity={0.5 * dim} />
  </g>
)

// # the spotlight: a cone from a lamp at the top down to an ellipse on the floor at x; `o` its strength
export const Spot: React.FC<{ x: number; o?: number; w?: number; top?: number; tone?: string }> = ({ x, o = 1, w = 260, top = 120, tone = GOLD_L }) => o <= 0.001 ? null : (
  <g opacity={o} pointerEvents="none">
    <path d={`M${x - 40} ${top} L${x + 40} ${top} L${x + w} ${GROUND + 40} L${x - w} ${GROUND + 40} Z`} fill={tone} opacity={0.32} />
    <ellipse cx={x} cy={GROUND + 40} rx={w} ry={60} fill={tone} opacity={0.5} />
    <rect x={x - 50} y={top - 60} width={100} height={70} rx={14} fill="#3A3A44" stroke={INK} strokeWidth={5} />
  </g>
)

// # the infamous T-shirt: a cheesy singer portrait (Barry Manilow, labelled), feathered hair, big smile
export const Shirt: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-150 -170 L-60 -200 Q0 -170 60 -200 L150 -170 L220 -80 L150 -30 L130 -60 L130 200 L-130 200 L-130 -60 L-150 -30 L-220 -80 Z" fill="#F7F3EA" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    {/* # the portrait */}
    <g transform="translate(0 20)">
      <rect x={-90} y={-110} width={180} height={200} rx={12} fill={TEAL_L} />
      <path d="M-62 -40 Q-70 -110 0 -112 Q70 -110 62 -40 Q50 -80 0 -78 Q-50 -80 -62 -40 Z" fill="#C9A36A" />
      <ellipse cx={0} cy={-20} rx={48} ry={58} fill="#F2C9A0" />
      <path d="M-30 6 Q0 34 30 6" stroke={INK} strokeWidth={5} fill="#FFFFFF" />
      <circle cx={-18} cy={-30} r={5} fill={INK} /><circle cx={18} cy={-30} r={5} fill={INK} />
      <path d="M-62 60 Q0 30 62 60 L70 90 L-70 90 Z" fill={BRICK} />
    </g>
    <rect x={-110} y={130} width={220} height={44} rx={8} fill={INK} />
    <text y={162} textAnchor="middle" fill={GOLD} style={{ font: '400 32px "Bebas Neue"', letterSpacing: 2 }}>BARRY MANILOW</text>
  </g>
)

// # a "noticed" meter: a ring filled to `v` (0..1) with a big label under it
export const Meter: React.FC<{ x: number; y: number; v: number; label: string; tone: string; s?: number; big?: string }> = ({ x, y, v, label, tone, s = 1, big }) => {
  const a = -Math.PI / 2 + Math.PI * 2 * Math.min(0.999, v)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={120} fill={CREAM} stroke={INK} strokeWidth={7} />
      {v > 0.001 && <path d={`M0 0 L0 -112 A112 112 0 ${v > 0.5 ? 1 : 0} 1 ${Math.cos(a) * 112} ${Math.sin(a) * 112} Z`} fill={tone} />}
      <circle r={56} fill={CREAM} stroke={INK} strokeWidth={5} />
      {big && <text y={18} textAnchor="middle" fill={INK} style={{ font: '400 50px "Bebas Neue"' }}>{big}</text>}
      <text y={180} textAnchor="middle" fill={INK} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 3 }}>{label}</text>
    </g>
  )
}

// # heat lines over a hot face
export const Heat: React.FC<{ x: number; y: number; f: number; o?: number }> = ({ x, y, f, o = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {[-40, 0, 40].map((dx, k) => <path key={k} d={`M${dx} 0 q12 -20 0 -40 q-12 -20 0 -40`} stroke={BRICK} strokeWidth={7} fill="none" strokeLinecap="round" transform={`translate(0 ${-((f * 2 + k * 10) % 20)})`} />)}
  </g>
)

// # a big sticky label floating over someone ("HAIR", "MISTAKE"...)
export const Big: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; tone?: string }> = ({ x, y, text, s = 1, o = 1, tone = ROSE }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse rx={text.length * 22 + 50} ry={66} fill={tone} stroke={INK} strokeWidth={6} />
    <text y={22} textAnchor="middle" fill={INK} style={{ font: '400 66px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>
  </g>
)

export const ease = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export const mix = lerp
export const fade = on
