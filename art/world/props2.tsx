// ============================================================
// WORLD PROPS 2 — desks, screens, books, trophies, mirrors, TVs,
// photo frames and more for LW scenes. Same soft-shaded style.
// ============================================================
import React from 'react'
import { Glow } from './kit'

// # a desk seen from the front (top + front panel + legs); children sit on the desk top (0,0 = top centre)
export const Desk: React.FC<{ x: number; y: number; w?: number; c?: [string, string]; children?: React.ReactNode }> = ({ x, y, w = 520, c = ['#9A6A48', '#7A5236'], children }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 + 20} y={0} width={18} height={240} fill={c[1]} /><rect x={w / 2 - 38} y={0} width={18} height={240} fill={c[1]} />
    <rect x={-w / 2} y={-14} width={w} height={26} rx={6} fill={c[0]} />
    <rect x={-w / 2 + 10} y={12} width={w - 20} height={90} fill={c[1]} />
    <rect x={-w / 2 + 10} y={12} width={w - 20} height={10} fill="#000" opacity={0.15} />
    <g transform="translate(0 -14)">{children}</g>
  </g>
)

// # a computer monitor showing a little chart (`kind` line rising/falling, or a feed of posts)
export const Monitor: React.FC<{ x: number; y: number; s?: number; kind?: 'up' | 'down' | 'feed' | 'bars'; glow?: number; t?: number }> = ({ x, y, s = 1, kind = 'up', glow = 0.6, t = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Glow x={0} y={-110} r={200} color="#BFE6FF" o={0.35 * glow} />
    <rect x={-12} y={-40} width={24} height={40} fill="#3A3D46" /><rect x={-50} y={-6} width={100} height={10} rx={4} fill="#3A3D46" />
    <rect x={-130} y={-200} width={260} height={164} rx={10} fill="#22252D" />
    <rect x={-120} y={-190} width={240} height={144} rx={4} fill="#EAF4FA" />
    {kind === 'feed' && [0, 1, 2].map((k) => <g key={k}><rect x={-108} y={-180 + k * 46} width={216} height={38} rx={6} fill="#FFFFFF" stroke="#C9D6E2" strokeWidth={2} /><circle cx={-90} cy={-161 + k * 46} r={11} fill={['#F4C35A', '#9FD8F0', '#E2506A'][k]} /><rect x={-70} y={-168 + k * 46} width={120} height={6} rx={3} fill="#9AA8B8" /><rect x={-70} y={-156 + k * 46} width={80} height={6} rx={3} fill="#C9D6E2" /></g>)}
    {(kind === 'up' || kind === 'down') && <g>
      <path d="M-108 -60 L108 -60 M-108 -60 L-108 -180" stroke="#9AA8B8" strokeWidth={3} />
      <path d={kind === 'up' ? 'M-100 -70 L-50 -95 L0 -90 L50 -130 L100 -165' : 'M-100 -165 L-50 -140 L0 -130 L50 -100 L100 -72'} stroke={kind === 'up' ? '#2E8C86' : '#D2463C'} strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray={400} strokeDashoffset={400 * (1 - t)} />
    </g>}
    {kind === 'bars' && [0, 1, 2, 3].map((k) => { const h = [40, 70, 55, 100][k] * t; return <rect key={k} x={-90 + k * 50} y={-60 - h} width={34} height={h} rx={4} fill={['#9FD8F0', '#2E8C86', '#9FD8F0', '#2E8C86'][k]} /> })}
  </g>
)

// # a stack of books / one book lying flat
export const Books: React.FC<{ x: number; y: number; n?: number; s?: number }> = ({ x, y, n = 3, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, k) => <g key={k} transform={`translate(${(k % 2) * 6 - 3} ${-k * 22})`}><rect x={-60} y={-22} width={120} height={22} rx={3} fill={['#B3344F', '#2E5C9A', '#2E8C86', '#C9A24A', '#7E68AE'][k % 5]} /><rect x={-56} y={-18} width={6} height={14} fill="#FFFFFF" opacity={0.5} /><rect x={48} y={-20} width={10} height={18} fill="#F3E6D8" /></g>)}
  </g>
)

// # a bookshelf on a wall
export const Shelf: React.FC<{ x: number; y: number; w?: number; rows?: number; c?: string }> = ({ x, y, w = 360, rows = 3, c = '#6E4A32' }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 - 14} y={-14} width={w + 28} height={rows * 130 + 14} fill={c} />
    {Array.from({ length: rows }, (_, r) => <g key={r}>
      <rect x={-w / 2} y={r * 130} width={w} height={116} fill="#000" opacity={0.25} />
      {Array.from({ length: 12 }, (_, k) => { const bw = 18 + ((k * 7 + r * 3) % 5) * 4, bh = 70 + ((k * 13 + r) % 4) * 10; const bx = -w / 2 + 8 + k * 29; return bx + bw > w / 2 ? null : <rect key={k} x={bx} y={r * 130 + 116 - bh} width={bw} height={bh} rx={2} fill={['#B3344F', '#2E5C9A', '#2E8C86', '#C9A24A', '#7E68AE', '#D9A46B'][(k + r) % 6]} /> })}
    </g>)}
  </g>
)

// # a gold trophy cup
export const Trophy: React.FC<{ x: number; y: number; s?: number; shine?: number }> = ({ x, y, s = 1, shine = 0.6 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Glow x={0} y={-90} r={120} color="#FFE7A3" o={shine} />
    <rect x={-44} y={-24} width={88} height={24} rx={4} fill="#6E4A32" />
    <rect x={-10} y={-70} width={20} height={48} fill="#E7B84A" />
    <path d="M-50 -160 L50 -160 L40 -100 Q0 -60 -40 -100 Z" fill="#F4C35A" />
    <path d="M10 -160 L50 -160 L40 -100 Q24 -84 10 -78 Z" fill="#D9A532" />
    <path d="M-50 -150 Q-86 -150 -76 -118 Q-68 -96 -42 -104" stroke="#F4C35A" strokeWidth={10} fill="none" />
    <path d="M50 -150 Q86 -150 76 -118 Q68 -96 42 -104" stroke="#D9A532" strokeWidth={10} fill="none" />
    <path d="M-34 -150 L-28 -110" stroke="#FFF4C8" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
  </g>
)

// # a photo frame standing / a polaroid; `kind` picks what's in the picture
export const Photo: React.FC<{ x: number; y: number; s?: number; r?: number; kind?: 'beach' | 'baby' | 'grad' | 'kid' | 'yacht' | 'party'; o?: number }> = ({ x, y, s = 1, r = 0, kind = 'beach', o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-90} y={-110} width={180} height={210} rx={6} fill="#FFFFFF" />
    <rect x={-78} y={-98} width={156} height={150} fill={kind === 'grad' ? '#CFE4F2' : kind === 'baby' ? '#F7E1D6' : kind === 'kid' ? '#DDEFD6' : kind === 'party' ? '#3A2A55' : '#9FD8F0'} />
    {(kind === 'beach' || kind === 'yacht') && <g><circle cx={40} cy={-60} r={18} fill="#F4C35A" /><rect x={-78} y={10} width={156} height={42} fill={kind === 'yacht' ? '#5FA8D8' : '#F3D9A4'} />
      {kind === 'yacht' && <g><path d="M-40 16 L50 16 L36 34 L-30 34 Z" fill="#FFFFFF" /><path d="M0 16 L0 -50 L36 10 Z" fill="#FFFFFF" /></g>}
      {kind === 'beach' && <g><rect x={-46} y={-30} width={6} height={50} fill="#8A5A34" /><path d="M-43 -30 Q-70 -40 -80 -20 M-43 -30 Q-20 -46 -6 -24 M-43 -30 Q-50 -56 -30 -60" stroke="#3E7A4C" strokeWidth={8} fill="none" /></g>}</g>}
    {kind !== 'beach' && kind !== 'yacht' && kind !== 'party' && <g><circle cx={0} cy={-30} r={kind === 'baby' ? 28 : 22} fill="#B9825C" /><path d={`M-36 52 Q0 ${kind === 'baby' ? -4 : 0} 36 52 Z`} fill={kind === 'grad' ? '#2E3440' : kind === 'baby' ? '#F2AFC0' : '#4F7FD0'} />
      {kind === 'grad' && <g><path d="M-30 -52 L0 -66 L30 -52 L0 -40 Z" fill="#22252D" /><line x1={22} y1={-52} x2={26} y2={-34} stroke="#F4C35A" strokeWidth={3} /></g>}</g>}
    {kind === 'party' && <g>{[-50, -10, 30, 60].map((px, k) => <circle key={k} cx={px} cy={-60 + (k % 2) * 30} r={6} fill={['#F4C35A', '#E2506A', '#9FD8F0', '#FFFFFF'][k]} />)}<circle cx={-20} cy={0} r={18} fill="#C98E66" /><circle cx={30} cy={4} r={18} fill="#EFC7A6" /></g>}
  </g>
)

// # an old-fashioned TV / a modern flat TV with something on screen
export const TV: React.FC<{ x: number; y: number; s?: number; on?: number; children?: React.ReactNode }> = ({ x, y, s = 1, on = 1, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Glow x={0} y={-150} r={300} color="#BFE6FF" o={0.4 * on} />
    <rect x={-20} y={-30} width={40} height={30} fill="#2A2D34" /><rect x={-90} y={-6} width={180} height={12} rx={4} fill="#2A2D34" />
    <rect x={-230} y={-300} width={460} height={270} rx={14} fill="#1A1C22" />
    <g><rect x={-216} y={-286} width={432} height={242} rx={6} fill={on > 0.5 ? '#2A3A5A' : '#111'} />{on > 0.5 && <g transform="translate(0 -165)">{children}</g>}</g>
  </g>
)

// # a standing mirror (oval) — children are drawn inside it (the reflection)
export const Mirror: React.FC<{ x: number; y: number; s?: number; children?: React.ReactNode }> = ({ x, y, s = 1, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-8} y={-60} width={16} height={60} fill="#6E4A32" />
    <ellipse cx={0} cy={-380} rx={200} ry={330} fill="#6E4A32" />
    <ellipse cx={0} cy={-380} rx={184} ry={314} fill="#D6E6EE" />
    <clipPath id="mirror-clip"><ellipse cx={0} cy={-380} rx={184} ry={314} /></clipPath>
    <g clipPath="url(#mirror-clip)">{children}<path d="M-120 -620 L-40 -620 L-160 -140 L-200 -200 Z" fill="#FFFFFF" opacity={0.22} /></g>
  </g>
)

// # a chalkboard / whiteboard on a wall (children drawn on it, 0,0 = centre)
export const Board: React.FC<{ x: number; y: number; w?: number; h?: number; chalk?: boolean; children?: React.ReactNode }> = ({ x, y, w = 600, h = 340, chalk = true, children }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 - 16} y={-h / 2 - 16} width={w + 32} height={h + 32} rx={8} fill={chalk ? '#8A5A34' : '#C9D2DC'} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={chalk ? '#2F4A3E' : '#FFFFFF'} />
    <rect x={-w / 2} y={h / 2 + 4} width={w} height={14} fill={chalk ? '#6E4A32' : '#9AA8B8'} />
    {children}
  </g>
)

// # a typewriter (1950s desks)
export const Typewriter: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-40} y={-120} width={80} height={60} fill="#F7F3EA" /><path d="M-30 -104 L30 -104 M-30 -92 L24 -92 M-30 -80 L28 -80" stroke="#9AA8B8" strokeWidth={3} />
    <rect x={-80} y={-66} width={160} height={16} rx={8} fill="#2A2D34" />
    <path d="M-90 -50 L90 -50 L100 0 L-100 0 Z" fill="#3A3D46" />
    {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={-70 + k * 20} cy={-24} r={6} fill="#E9E4D8" />)}
  </g>
)

// # a dumbbell / barbell for the gym
export const Barbell: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-170} y={-5} width={340} height={10} rx={4} fill="#B5BCC6" />
    {[-1, 1].map((d) => <g key={d}><rect x={d * 120 - 14} y={-46} width={28} height={92} rx={6} fill="#2A2D34" /><rect x={d * 150 - 10} y={-34} width={20} height={68} rx={5} fill="#3A3D46" /></g>)}
  </g>
)

// # a mug of tea with steam
export const Mug: React.FC<{ x: number; y: number; s?: number; f?: number; c?: string }> = ({ x, y, s = 1, f = 0, c = '#B3344F' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1].map((k) => <path key={k} d={`M${-8 + k * 16} -60 Q${-16 + k * 16 + Math.sin(f / 10 + k) * 6} -80 ${-6 + k * 16} -100`} stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.5} strokeLinecap="round" />)}
    <rect x={-26} y={-54} width={52} height={54} rx={8} fill={c} /><path d="M26 -42 Q46 -40 44 -24 Q42 -10 26 -12" stroke={c} strokeWidth={7} fill="none" />
    <rect x={-20} y={-54} width={10} height={54} fill="#FFFFFF" opacity={0.18} />
  </g>
)

// # a notebook (open) with a pen — written lines appear with `lines` 0..n
export const Journal: React.FC<{ x: number; y: number; s?: number; r?: number; lines?: number }> = ({ x, y, s = 1, r = 0, lines = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-150 -10 L0 0 L150 -10 L150 170 L0 180 L-150 170 Z" fill="#FFFDF7" stroke="#C9BCA8" strokeWidth={3} />
    <path d="M0 0 L0 180" stroke="#C9BCA8" strokeWidth={4} />
    {Array.from({ length: 6 }, (_, k) => <g key={k}><path d={`M-130 ${24 + k * 24} L-20 ${28 + k * 24}`} stroke="#DCE6F0" strokeWidth={2} /><path d={`M20 ${28 + k * 24} L130 ${24 + k * 24}`} stroke="#DCE6F0" strokeWidth={2} /></g>)}
    {Array.from({ length: 5 }, (_, k) => { const p = Math.max(0, Math.min(1, lines - k)); return p <= 0 ? null : <path key={k} d={`M${30} ${30 + k * 24} q 20 -8 40 0 t 40 0`} stroke="#2E3A5A" strokeWidth={3} fill="none" strokeLinecap="round" strokeDasharray={90} strokeDashoffset={90 * (1 - p)} /> })}
    <g transform="translate(140 120) rotate(30)"><rect x={-6} y={-70} width={12} height={80} rx={4} fill="#B3344F" /><path d="M-6 10 L0 24 L6 10 Z" fill="#E9D8B8" /></g>
  </g>
)

// # a bed seen from the side (for scenes that aren't the dark BedroomNight)
export const Bed: React.FC<{ x: number; y: number; c?: string; sheet?: string }> = ({ x, y, c = '#6E4A32', sheet = '#E9E4F2' }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-340} y={-330} width={50} height={330} rx={12} fill={c} />
    <rect x={-300} y={-170} width={640} height={120} rx={26} fill={sheet} />
    <path d="M-120 -190 Q100 -210 340 -170 L340 -60 L-120 -60 Z" fill="#7E68AE" />
    <rect x={-290} y={-226} width={160} height={70} rx={30} fill="#FFFFFF" />
    <rect x={-300} y={-60} width={640} height={60} rx={8} fill={c} />
  </g>
)
