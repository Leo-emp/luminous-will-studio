// ============================================================
// ROWLING KIT — the drawn parts of the Short "Rejected 12 Times:
// The J.K. Rowling Comeback" (LW, 2026-11-14). Own art direction:
// rainy Edinburgh in slate blue and stone grey, warm paper cream
// for the manuscript, one thread of gold "idea" light. J.K. Rowling
// is the library character 'lib-rowling', ALWAYS with a name label.
// No book characters or film imagery are drawn — only the idea as a
// glow, the pages, the letters and the copies.
// ============================================================
import React from 'react'
import { BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, on, lerp, span, easeOut, rnd } from '../day3/kit'

export { Person, Tag, Headline, win, pop, on, lerp, span, easeOut, rnd, BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, type Beat } from '../day3/kit'

export const SLATE = { sky: ['#8FA3B8', '#6D8196'], wall: '#7E92A6', stone: '#9AA2A8', stone2: '#7D868D', floor: '#5B6670' }
export const PAPER = '#F6EEDC', RED = '#C8423A', NAVY = '#2E3E55', MOSS = '#4F7A5E'

// ------------------------------------------------------------ places
// # Edinburgh street: slate sky, a castle on the hill, stone tenements, wet cobbles; `rain` 0..1
export const Edinburgh: React.FC<{ id: string; f: number; rain?: number; warm?: number }> = ({ id, f, rain = 0.6, warm = 0 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={SLATE.sky[0]} /><stop offset="100%" stopColor={SLATE.sky[1]} /></linearGradient>
      <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="58%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.26} /></radialGradient>
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-sky)`} />
    <rect width={W} height={H} fill="#FFD9A0" opacity={0.35 * warm} />
    {/* # the castle on its rock */}
    <path d="M520 700 L560 600 L620 590 L640 520 L700 520 L700 470 L730 470 L730 520 L780 520 L800 590 L880 600 L940 700 Z" fill="#5E6B78" />
    <path d="M380 760 Q520 640 700 680 Q880 640 1080 720 L1080 900 L380 900 Z" fill="#56616C" />
    {/* # tenements */}
    {[0, 1, 2].map((k) => <g key={k} transform={`translate(${k * 360} 0)`}>
      <rect x={0} y={760 - (k % 2) * 60} width={340} height={GROUND - 760 + (k % 2) * 60} fill={k % 2 ? SLATE.stone : SLATE.stone2} />
      <path d={`M0 ${760 - (k % 2) * 60} L170 ${680 - (k % 2) * 60} L340 ${760 - (k % 2) * 60} Z`} fill="#4D555C" />
      {[0, 1, 2].map((j) => [0, 1].map((i) => <rect key={`${j}${i}`} x={50 + j * 100} y={820 + i * 160 - (k % 2) * 40} width={56} height={90} rx={6} fill={warm > 0.3 && (j + i + k) % 2 ? '#FFD98A' : '#3C4651'} />))}
    </g>)}
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={SLATE.floor} />
    {Array.from({ length: 14 }, (_, k) => <ellipse key={k} cx={40 + k * 80} cy={GROUND + 40 + (k % 2) * 30} rx={32} ry={10} fill="#4C565F" />)}
    {rain > 0 && Array.from({ length: 36 }, (_, k) => { const x = rnd(k + 3) * 1080, y = ((f * 30 + rnd(k + 7) * 1920) % 1920)
      return <path key={k} d={`M${x} ${y} l-10 40`} stroke="#DDE6EF" strokeWidth={3} opacity={0.5 * rain} /> })}
  </g>
)
export const RVig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # a warm café interior (where she wrote): wood panels, a window to the rain, a small table
export const Cafe: React.FC<{ id: string }> = ({ id }) => (
  <g>
    <defs><radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="58%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.26} /></radialGradient></defs>
    <rect width={W} height={GROUND} fill="#7A4E36" />
    <rect x={0} y={GROUND - 360} width={W} height={360} fill="#5E3A28" />
    <g transform="translate(560 590)"><rect x={-220} y={-160} width={440} height={320} rx={10} fill={SLATE.sky[1]} stroke="#3C2418" strokeWidth={16} /><path d="M0 -160 L0 160 M-220 0 L220 0" stroke="#3C2418" strokeWidth={10} /></g>
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill="#4A2F22" />
    <ellipse cx={940} cy={560} rx={90} ry={30} fill="#FFE2A8" opacity={0.6} /><rect x={936} y={0} width={8} height={540} fill="#2A1A12" />
  </g>
)
export const Table: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} ${GROUND})`}>
    <ellipse cx={0} cy={-260} rx={230} ry={36} fill="#B98258" stroke={INK} strokeWidth={6} />
    <rect x={-14} y={-250} width={28} height={250} fill="#3C2418" /><ellipse cx={0} cy={-4} rx={110} ry={16} fill="#3C2418" />
    <g transform="translate(140 -290)"><rect x={-26} y={-30} width={52} height={50} rx={8} fill={CREAM} stroke={INK} strokeWidth={4} /><path d="M26 -18 q22 0 0 22" stroke={INK} strokeWidth={5} fill="none" /></g>
  </g>
)

// ------------------------------------------------------------ props
// # the manuscript: a stack of pages tied with string; `h` 0..1 how many pages
export const Manuscript: React.FC<{ x: number; y: number; s?: number; h?: number; title?: string }> = ({ x, y, s = 1, h = 1, title = 'BOOK ONE' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: Math.max(1, Math.round(h * 8)) }, (_, k) => <rect key={k} x={-120 + (k % 2) * 3} y={-14 - k * 10} width={240} height={14} rx={2} fill={PAPER} stroke={INK} strokeWidth={2} />)}
    <rect x={-120} y={-30 - Math.round(h * 8) * 10} width={240} height={150} rx={6} fill={PAPER} stroke={INK} strokeWidth={5} transform="translate(0 0)" />
    <text y={40 - Math.round(h * 8) * 10} textAnchor="middle" fill={NAVY} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>{title}</text>
  </g>
)

// # a rejection letter with a red NO stamp and a number
export const NoLetter: React.FC<{ x: number; y: number; s?: number; r?: number; n?: number; o?: number }> = ({ x, y, s = 1, r = 0, n, o = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-140} width={220} height={280} rx={6} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-80} y={-100 + k * 30} width={k === 3 ? 90 : 160} height={8} rx={4} fill={INK} opacity={0.25} />)}
    <g transform="translate(0 60) rotate(-14)"><rect x={-86} y={-40} width={172} height={80} rx={10} fill="none" stroke={RED} strokeWidth={8} /><text y={26} textAnchor="middle" fill={RED} style={{ font: '400 72px "Bebas Neue"', letterSpacing: 8 }}>NO</text></g>
    {n !== undefined && <g transform="translate(90 -120)"><circle r={34} fill={RED} /><text y={13} textAnchor="middle" fill={CREAM} style={{ font: '400 40px "Bebas Neue"' }}>{n}</text></g>}
  </g>
)

// # a sealed envelope
export const Envelope: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-120} y={-76} width={240} height={152} rx={8} fill={PAPER} stroke={INK} strokeWidth={5} />
    <path d="M-120 -76 L0 16 L120 -76" stroke={INK} strokeWidth={5} fill="none" /><circle cx={0} cy={10} r={18} fill={RED} />
  </g>
)

// # the idea: a swirl of gold light (deliberately abstract)
export const Idea: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${f * 2})`} opacity={o}>
    <circle r={90} fill={GOLD} opacity={0.2} /><circle r={56} fill={GOLD_L} opacity={0.5} />
    {[0, 1, 2, 3, 4].map((k) => <path key={k} d="M0 0 Q30 -40 0 -80" stroke={GOLD} strokeWidth={8} fill="none" strokeLinecap="round" transform={`rotate(${k * 72})`} />)}
    <circle r={18} fill="#FFFFFF" />
  </g>
)

// # a book (closed, standing) for the copies tower
export const Copy: React.FC<{ x: number; y: number; s?: number; tone?: string }> = ({ x, y, s = 1, tone = NAVY }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-24} width={120} height={24} rx={3} fill={tone} stroke={INK} strokeWidth={3} />
    <rect x={-56} y={-18} width={8} height={12} fill={GOLD} />
  </g>
)

// # a name label for a real person (owner rule: famous people are always labelled)
export const NameTag: React.FC<{ x: number; y: number; name: string; o?: number }> = ({ x, y, name, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-name.length * 14 - 24} y={-30} width={name.length * 28 + 48} height={60} rx={30} fill={INK} />
    <text y={14} textAnchor="middle" fill={GOLD} style={{ font: '400 42px "Bebas Neue"', letterSpacing: 3 }}>{name}</text>
  </g>
)

export const ease = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export const mix = lerp
export const fade = on
