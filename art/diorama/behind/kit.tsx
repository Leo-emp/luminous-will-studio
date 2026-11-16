// ============================================================
// BEHIND KIT — the drawn parts of the Short "Why You Feel Behind in
// Life" (LW, 2026-11-14). Own art direction: an athletics stadium at
// golden hour — terracotta running track with cream lane lines, a
// soft plum-pink sky; other people's lives are FILM STRIPS of
// highlights; a horizontal AGE RULER shows the real timeline.
// Tall canvas 1080 × 1920.
// ============================================================
import React from 'react'
import { BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, on, lerp, span, easeOut, rnd } from '../day3/kit'

export { Person, Tag, Headline, win, pop, on, lerp, span, easeOut, rnd, BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, type Beat } from '../day3/kit'

export const PLUM = ['#E9B8C8', '#F7DCC8'] as const, TRACK = '#C9643F', TRACK_D = '#A84F30', GRASS = '#7DB06B', PINK = '#F29BB0'

// # the stadium: plum-to-peach sky, stands, the track with lanes
export const Stadium: React.FC<{ id: string; lanes?: boolean }> = ({ id, lanes = true }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={PLUM[0]} /><stop offset="100%" stopColor={PLUM[1]} /></linearGradient>
      <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.22} /></radialGradient>
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-sky)`} />
    <circle cx={820} cy={520} r={90} fill={GOLD_L} opacity={0.9} />
    {/* # the stands */}
    {[0, 1, 2].map((k) => <rect key={k} x={0} y={760 + k * 60} width={W} height={60} fill={['#8A6A8E', '#7A5C80', '#6C5072'][k]} />)}
    {Array.from({ length: 40 }, (_, k) => <circle key={k} cx={(k * 97) % 1080 + 20} cy={780 + (k % 3) * 60} r={12} fill={['#F2C14E', '#F29BB0', '#9FD3F2', CREAM][k % 4]} opacity={0.8} />)}
    <rect x={0} y={940} width={W} height={GROUND - 940} fill={GRASS} />
    <rect x={0} y={GROUND - 120} width={W} height={H - GROUND + 120} fill={TRACK} />
    {lanes && [0, 1, 2, 3].map((k) => <rect key={k} x={0} y={GROUND - 120 + k * 90} width={W} height={5} fill={CREAM} opacity={0.85} />)}
  </g>
)
export const BVig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # a big phone frame with a feed card inside
export const FeedPhone: React.FC<{ x: number; y: number; s?: number; children?: React.ReactNode }> = ({ x, y, s = 1, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-230} y={-400} width={460} height={800} rx={50} fill={INK} />
    <rect x={-206} y={-370} width={412} height={740} rx={30} fill="#FFFFFF" />
    <clipPath id="feedclip"><rect x={-206} y={-370} width={412} height={740} rx={30} /></clipPath>
    <g clipPath="url(#feedclip)">{children}</g>
  </g>
)
// # one feed post: a picture square + a caption
export const Post: React.FC<{ y: number; kind: 'house' | 'shop' | 'ring' | 'trophy' | 'beach'; label: string }> = ({ y, kind, label }) => (
  <g transform={`translate(0 ${y})`}>
    <rect x={-180} y={-150} width={360} height={240} rx={16} fill={['#FCE7D6', '#E6F2EA', '#F7E6F0', '#FFF3C9', '#DDF0F7'][['house', 'shop', 'ring', 'trophy', 'beach'].indexOf(kind)]} />
    {kind === 'house' && <g><path d="M-80 20 L0 -70 L80 20 Z" fill={BURG} /><rect x={-60} y={20} width={120} height={60} fill={CREAM} stroke={INK} strokeWidth={4} /><rect x={-14} y={40} width={28} height={40} fill={INK} /></g>}
    {kind === 'shop' && <g><rect x={-90} y={-40} width={180} height={110} fill={CREAM} stroke={INK} strokeWidth={4} /><path d="M-100 -40 L100 -40 L80 -80 L-80 -80 Z" fill={PINK} stroke={INK} strokeWidth={4} /><text y={30} textAnchor="middle" fill={INK} style={{ font: '400 36px "Bebas Neue"' }}>OPEN</text></g>}
    {kind === 'ring' && <g><circle cy={10} r={50} fill="none" stroke={GOLD} strokeWidth={14} /><path d="M-20 -50 L0 -80 L20 -50 Z" fill="#BFE8F7" stroke={INK} strokeWidth={3} /></g>}
    {kind === 'trophy' && <g><path d="M-50 -60 L50 -60 L40 0 Q0 30 -40 0 Z" fill={GOLD} stroke={INK} strokeWidth={4} /><rect x={-30} y={30} width={60} height={20} fill={BURG} /></g>}
    {kind === 'beach' && <g><circle cx={60} cy={-50} r={34} fill={GOLD} /><path d="M-180 60 Q0 20 180 60 L180 90 L-180 90 Z" fill="#F2D49B" /><path d="M-180 30 Q0 0 180 30 L180 60 Q0 20 -180 60 Z" fill="#7FC3E0" /></g>}
    <text x={-170} y={130} fill={INK} style={{ font: '400 38px "Bebas Neue"', letterSpacing: 1 }}>{label}</text>
    <text x={170} y={130} textAnchor="end" fill={PINK} style={{ font: '400 34px "Bebas Neue"' }}>♥ 2K</text>
  </g>
)

// # a film strip of frames (a highlight reel)
export const Strip: React.FC<{ x: number; y: number; n: number; s?: number; tone?: string; children?: (k: number) => React.ReactNode; label?: string }> = ({ x, y, n, s = 1, tone = INK, children, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-n * 70} width={160} height={n * 140} fill={tone} />
    {Array.from({ length: n * 2 }, (_, k) => <g key={k}><rect x={-72} y={-n * 70 + 8 + k * 70} width={14} height={18} rx={3} fill={CREAM} /><rect x={58} y={-n * 70 + 8 + k * 70} width={14} height={18} rx={3} fill={CREAM} /></g>)}
    {Array.from({ length: n }, (_, k) => <g key={k} transform={`translate(0 ${-n * 70 + 70 + k * 140})`}><rect x={-50} y={-56} width={100} height={112} rx={6} fill="#FFFDF6" />{children?.(k)}</g>)}
    {label && <text y={n * 70 + 50} textAnchor="middle" fill={INK} style={{ font: '400 42px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>}
  </g>
)

// # the age ruler: 15 → 65 across the frame at height y; `pin` draws a marker at an age
export const AGE0 = 15, AGE1 = 65
export const ageX = (age: number) => lerp(80, 1000, (age - AGE0) / (AGE1 - AGE0))
export const Ruler: React.FC<{ y: number; o?: number }> = ({ y, o = 1 }) => (
  <g opacity={o}>
    <rect x={80} y={y - 8} width={920} height={16} rx={8} fill={INK} />
    {[20, 30, 40, 50, 60].map((a) => <g key={a}><rect x={ageX(a) - 3} y={y - 26} width={6} height={52} fill={INK} /><text x={ageX(a)} y={y + 70} textAnchor="middle" fill={INK} style={{ font: '400 44px "Bebas Neue"' }}>{a}</text></g>)}
  </g>
)
export const Pin: React.FC<{ age: number; y: number; label: string; tone?: string; s?: number; o?: number; up?: number }> = ({ age, y, label, tone = GOLD, s = 1, o = 1, up = 120 }) => o <= 0.001 ? null : (
  <g transform={`translate(${ageX(age)} ${y})`} opacity={o}>
    <path d={`M0 0 L0 ${-up}`} stroke={INK} strokeWidth={5} />
    <g transform={`translate(0 ${-up}) scale(${s})`}>
      <rect x={-label.length * 13 - 26} y={-50} width={label.length * 26 + 52} height={64} rx={14} fill={tone} stroke={INK} strokeWidth={5} />
      <text y={-6} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
    </g>
    <circle r={14} fill={tone} stroke={INK} strokeWidth={4} />
  </g>
)

export const ease = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export const r01 = rnd
