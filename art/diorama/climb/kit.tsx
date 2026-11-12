// ============================================================
// CLIMB KIT — drawn fresh for the Short "Lose 50 Percent, Gain 50
// Percent, and You're Still Down" (r82/r83). Art direction: an alpine
// world — warm dawn (cream/peach sky, slate ridges, a rocky ledge)
// for the explaining parts, moonlit night for the risk parts — and
// money as solid gold BRICKS: one brick = $100, so a stack's height
// IS the money. Losses tumble off as bricks, gains drop in as bricks.
// Canvas 1080×1920. Safe area: x 60–940, y 380–1270 (captions
// y 1290–1490, top 220 px kept clear; headline at y 300).
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { clamp01, easeOut, lerp, on, rnd, span } from '../kit'

export const CX = 500, GROUND = 1210
export const BW = 230, BH = 58                    // # one brick on screen (front face)
const DX = 26, DY = -16                           // # the brick's 3D depth offset (top + side faces)

// ------------------------------------------------------------ palette (this video only)
export const INK = '#1F2A44', INK2 = '#5E6B86', CREAM = '#FBF3E4', SNOW = '#F7F4EE'
export const GOLD = '#E4B23E', GOLD_T = '#F7D97C', GOLD_S = '#A8781B', GOLD_E = '#8E6413'
export const LOSS = '#D2493A', LOSS_L = '#F08A7A', GAIN = '#2F9E6A', GAIN_L = '#66D19B', SKY_N = '#9CC4F2'

// # visible from a to b with clean fades (gone by b)
export const win = (f: number, a: number, b: number, d = 6) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))

// ------------------------------------------------------------ the world: an alpine valley at dawn or by moonlight
export const Alps: React.FC<{ id: string; f: number; tone?: 'dawn' | 'night' }> = ({ id, f, tone = 'dawn' }) => {
  const N = tone === 'night'
  const sky = N ? ['#1B2C52', '#2E4677', '#41608F'] : ['#F9EBD3', '#F6D9B8', '#F1C6A2']
  const far = N ? ['#3B5584', '#2C426B'] : ['#B9C3D6', '#9AA7C0']
  const mid = N ? ['#2A3E66', '#1D2D4E'] : ['#7F8FAE', '#62729A']
  const near = N ? ['#1A2742', '#121C32'] : ['#4E5C7E', '#3C4866']
  const rock = N ? ['#2A3550', '#1A2237'] : ['#8C7B66', '#6A5B49']
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={sky[0]} /><stop offset="55%" stopColor={sky[1]} /><stop offset="100%" stopColor={sky[2]} /></linearGradient>
        <linearGradient id={`${id}-far`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={far[0]} /><stop offset="100%" stopColor={far[1]} /></linearGradient>
        <linearGradient id={`${id}-mid`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={mid[0]} /><stop offset="100%" stopColor={mid[1]} /></linearGradient>
        <linearGradient id={`${id}-near`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={near[0]} /><stop offset="100%" stopColor={near[1]} /></linearGradient>
        <linearGradient id={`${id}-rock`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={rock[0]} /><stop offset="100%" stopColor={rock[1]} /></linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={N ? '#FFFFFF' : '#FFF6DF'} stopOpacity={N ? 0.95 : 1} /><stop offset="45%" stopColor={N ? '#DDE8FF' : '#FFE1A6'} stopOpacity={N ? 0.5 : 0.8} /><stop offset="100%" stopColor={N ? '#DDE8FF' : '#FFD08A'} stopOpacity={0} /></radialGradient>
        <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="70%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor={N ? '#000' : '#5A3E22'} stopOpacity={N ? 0.4 : 0.14} /></radialGradient>
      </defs>
      <rect x={-20} y={-20} width={1120} height={1960} fill={`url(#${id}-sky)`} />
      {/* # sun (dawn) or moon (night), with a soft halo */}
      <circle cx={790} cy={560} r={260} fill={`url(#${id}-sun)`} />
      <circle cx={790} cy={560} r={N ? 62 : 84} fill={N ? '#F4F7FF' : '#FFF1CF'} />
      {N && <circle cx={812} cy={548} r={56} fill={sky[1]} opacity={0.0} />}
      {/* # stars at night */}
      {N && Array.from({ length: 40 }, (_, i) => <circle key={i} cx={rnd(i) * 1080} cy={rnd(i + 50) * 700} r={1.2 + rnd(i + 9) * 2} fill="#FFFFFF" opacity={0.25 + 0.35 * (0.5 + 0.5 * Math.sin(f / 18 + i))} />)}
      {/* # slow clouds / mist bands (they drift, the camera never moves) */}
      {[0, 1, 2].map((k) => { const x = ((f * (0.25 + k * 0.1) + k * 420) % 1500) - 300; return <g key={k} opacity={N ? 0.16 : 0.55}><ellipse cx={x} cy={420 + k * 150} rx={170} ry={26} fill={N ? '#C9D8F2' : '#FFFFFF'} /><ellipse cx={x + 90} cy={404 + k * 150} rx={100} ry={22} fill={N ? '#C9D8F2' : '#FFFFFF'} /></g> })}
      {/* # far ridge with snow caps */}
      <path d="M-20 880 L120 700 L210 760 L330 600 L450 720 L560 640 L690 760 L800 620 L930 730 L1100 650 L1100 1100 L-20 1100 Z" fill={`url(#${id}-far)`} />
      <path d="M300 636 L330 600 L362 640 L345 632 L330 646 L315 630 Z M770 656 L800 620 L834 662 L816 652 L800 668 L786 650 Z M530 666 L560 640 L588 670 L572 664 L560 676 Z" fill={SNOW} opacity={N ? 0.7 : 0.95} />
      {/* # middle ridge */}
      <path d="M-20 980 L90 860 L220 940 L360 820 L520 960 L650 880 L790 980 L930 870 L1100 960 L1100 1200 L-20 1200 Z" fill={`url(#${id}-mid)`} />
      <path d="M335 846 L360 820 L388 850 L372 844 L360 856 Z M905 896 L930 870 L958 900 L942 894 L930 906 Z" fill={SNOW} opacity={N ? 0.55 : 0.85} />
      {/* # mist in the valley */}
      <rect x={-20} y={1000} width={1120} height={120} fill={N ? '#9CB4DC' : '#FFFFFF'} opacity={N ? 0.08 : 0.28} />
      {/* # near ridge + pines */}
      <path d="M-20 1100 L140 1020 L300 1080 L470 1010 L640 1090 L820 1030 L1100 1100 L1100 1300 L-20 1300 Z" fill={`url(#${id}-near)`} />
      {[60, 110, 940, 1000, 1040].map((x, k) => <g key={k} transform={`translate(${x} ${1100 - (k % 2) * 16})`}><path d="M0 -90 L34 0 L-34 0 Z" fill={N ? '#14223A' : '#2F4A45'} /><path d="M0 -130 L26 -50 L-26 -50 Z" fill={N ? '#182A46' : '#3A5A52'} /><rect x={-5} y={0} width={10} height={16} fill="#3B2C22" /></g>)}
      {/* # the rocky ledge everything stands on */}
      <path d={`M-20 ${GROUND - 10} Q 260 ${GROUND - 30} 540 ${GROUND - 14} T 1100 ${GROUND - 18} L1100 1960 L-20 1960 Z`} fill={`url(#${id}-rock)`} />
      <path d={`M-20 ${GROUND - 10} Q 260 ${GROUND - 30} 540 ${GROUND - 14} T 1100 ${GROUND - 18}`} fill="none" stroke={N ? '#3C4A6C' : '#A8957C'} strokeWidth={8} />
      {Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx={rnd(i + 3) * 1080} cy={GROUND + 30 + rnd(i + 7) * 60} rx={14 + rnd(i) * 26} ry={6 + rnd(i + 1) * 6} fill={N ? '#161D30' : '#5C4E3E'} opacity={0.45} />)}
    </g>
  )
}
export const Vig: React.FC<{ id: string }> = ({ id }) => <rect width={1080} height={1920} fill={`url(#${id}-vg)`} pointerEvents="none" />

// ------------------------------------------------------------ one gold brick ($100); `part` < 1 draws a thinner slab (half a brick = $50 of height)
export const Brick: React.FC<{ x: number; y: number; part?: number; o?: number; glow?: number; tone?: 'gold' | 'ghost' | 'red' | 'green' }> = ({ x, y, part = 1, o = 1, glow = 0, tone = 'gold' }) => {
  const h = BH * part
  const C = tone === 'red' ? ['#E8796B', '#F6A99D', '#B5392C'] : tone === 'green' ? ['#4CBB85', '#8EE0B6', '#257E54'] : [GOLD, GOLD_T, GOLD_S]
  if (tone === 'ghost') return <g opacity={o}><rect x={x - BW / 2} y={y - h} width={BW} height={h} rx={6} fill="none" stroke={INK2} strokeWidth={4} strokeDasharray="12 9" /></g>
  return (
    <g opacity={o}>
      {glow > 0 && <rect x={x - BW / 2 - 10} y={y - h - 10} width={BW + 20} height={h + 20} rx={14} fill="#FFE9A6" opacity={0.6 * glow} />}
      <path d={`M${x - BW / 2} ${y - h} l${DX} ${DY} h${BW} l${-DX} ${-DY} Z`} fill={C[1]} />
      <path d={`M${x + BW / 2} ${y - h} l${DX} ${DY} v${h} l${-DX} ${-DY} Z`} fill={C[2]} />
      <rect x={x - BW / 2} y={y - h} width={BW} height={h} rx={4} fill={C[0]} />
      <rect x={x - BW / 2 + 10} y={y - h + 7} width={BW - 20} height={Math.max(2, h - 14)} rx={3} fill="none" stroke={C[2]} strokeWidth={2.5} opacity={0.6} />
      {part >= 0.8 && <text x={x} y={y - h / 2 + 12} textAnchor="middle" fill={tone === 'gold' ? GOLD_E : '#FFFFFF'} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>$100</text>}
      <rect x={x - BW / 2 + 6} y={y - h + 3} width={BW * 0.4} height={4} rx={2} fill="#FFFFFF" opacity={0.45} />
    </g>
  )
}
// # a stack of `n` bricks (fractional n ends in a slab) standing on `y`; bricks appear one by one from `at` (if given)
export const Stack: React.FC<{ x: number; y: number; n: number; o?: number; at?: number; f?: number; tone?: 'gold' | 'ghost' | 'red' | 'green'; glow?: number }> = ({ x, y, n, o = 1, at, f = 0, tone = 'gold', glow = 0 }) => {
  const out: React.ReactNode[] = []
  const full = Math.floor(n + 1e-6), part = n - full
  for (let i = 0; i < full + (part > 0.01 ? 1 : 0); i++) {
    const p = i < full ? 1 : part
    const a = at === undefined ? 1 : on(f, at + i * 2, 6)
    if (a <= 0.001) continue
    const yy = y - i * BH - (1 - a) * 60
    out.push(<Brick key={i} x={x} y={yy} part={p} o={a} tone={tone} glow={glow} />)
  }
  return <g opacity={o}>{out}</g>
}
// # top of a stack of n bricks
export const top = (y: number, n: number) => y - n * BH

// ------------------------------------------------------------ a value tag pinned to a point by a short line
export const Tag: React.FC<{ x: number; y: number; text: string; o?: number; color?: string; tc?: string; size?: number; to?: [number, number]; s?: number }> = ({ x, y, text, o = 1, color = INK, tc = '#FFFFFF', size = 54, to, s = 1 }) => {
  if (o <= 0.001) return null
  const w = text.length * size * 0.42 + 44, h = size + 20
  return (
    <g opacity={o}>
      {to && <line x1={x} y1={y} x2={to[0]} y2={to[1]} stroke={color} strokeWidth={4} />}
      {to && <circle cx={to[0]} cy={to[1]} r={7} fill={color} />}
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={color} />
        <text x={0} y={size * 0.36} textAnchor="middle" fill={tc} style={{ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 1.5 }}>{text}</text>
      </g>
    </g>
  )
}
// # a chunky arrow (up = gain, down = loss), drawn from 0 to full length by `p`
export const Arrow: React.FC<{ x: number; y: number; len: number; up?: boolean; p?: number; o?: number; w?: number; color?: string }> = ({ x, y, len, up = true, p = 1, o = 1, w = 34, color }) => {
  const L = len * clamp01(p), d = up ? -1 : 1, col = color ?? (up ? GAIN : LOSS)
  if (L < 4) return null
  return (
    <g opacity={o}>
      <rect x={x - w / 2} y={up ? y - L + w : y} width={w} height={Math.max(0, L - w)} rx={6} fill={col} />
      <path d={`M${x - w * 1.1} ${y + d * (L - w * 1.2)} L${x} ${y + d * L} L${x + w * 1.1} ${y + d * (L - w * 1.2)} Z`} fill={col} />
    </g>
  )
}
// # a hand-drawn red cross over a thing (r68): strokes draw in over 10 frames
export const Cross: React.FC<{ x: number; y: number; r?: number; f: number; at: number }> = ({ x, y, r = 110, f, at }) => {
  const a = easeOut(span(f, at, at + 6)), b = easeOut(span(f, at + 4, at + 10))
  if (a <= 0) return null
  return (
    <g>
      <line x1={x - r} y1={y - r} x2={lerp(x - r, x + r, a)} y2={lerp(y - r, y + r, a)} stroke={LOSS} strokeWidth={22} strokeLinecap="round" />
      {b > 0 && <line x1={x + r} y1={y - r} x2={lerp(x + r, x - r, b)} y2={lerp(y - r, y + r, b)} stroke={LOSS} strokeWidth={22} strokeLinecap="round" />}
    </g>
  )
}
// # a dashed level line across the stage with a little flag on a pole (a mark you must climb back to)
export const Level: React.FC<{ y: number; x0?: number; x1?: number; o?: number; f: number; flag?: string; color?: string; fx?: number }> = ({ y, x0 = 90, x1 = 920, o = 1, f, flag, color = INK, fx }) => {
  if (o <= 0.001) return null
  const px = fx ?? x1 - 40, wave = Math.sin(f / 6) * 6
  return (
    <g opacity={o}>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={color} strokeWidth={5} strokeDasharray="18 12" />
      {flag && <g><line x1={px} y1={y} x2={px} y2={y - 120} stroke={INK} strokeWidth={6} />
        <path d={`M${px} ${y - 120} Q ${px + 50} ${y - 112 + wave} ${px + 96} ${y - 104} L${px + 96} ${y - 64} Q ${px + 50} ${y - 72 + wave} ${px} ${y - 80} Z`} fill={LOSS} />
        <Label x={px - 14} y={y - 132} text={flag} size={40} font="Bebas Neue" color={color} anchor="end" /></g>}
    </g>
  )
}
// # a crumbling brick's dust (small gold flakes flying up and out) from frame `at`
export const Dust: React.FC<{ x: number; y: number; f: number; at: number; n?: number; spread?: number }> = ({ x, y, f, at, n = 16, spread = 220 }) => {
  const t = span(f, at, at + 24)
  if (t <= 0 || t >= 1) return null
  return <g opacity={1 - t}>{Array.from({ length: n }, (_, i) => {
    const a = rnd(i + 3) * Math.PI * 2, r = spread * easeOut(t) * (0.4 + rnd(i) * 0.6)
    return <rect key={i} x={x + Math.cos(a) * r} y={y + Math.sin(a) * r * 0.6 - t * 120} width={14} height={9} rx={2} fill={i % 2 ? GOLD_T : GOLD} transform={`rotate(${i * 37 + t * 200} ${x + Math.cos(a) * r} ${y + Math.sin(a) * r * 0.6 - t * 120})`} />
  })}</g>
}
// # the headline slot at y 300 (a short title for the idea now on screen; never two at once)
type Head = [at: number, text: string, color?: string, size?: number]
export const Headline: React.FC<{ f: number; lines: Head[]; until?: number; y?: number }> = ({ f, lines: raw, until = 9e9, y = 300 }) => {
  const lines = [...raw].sort((p, q) => p[0] - q[0])
  return <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
    return o > 0.001 ? <g key={k} transform={`translate(${CX} ${y}) scale(${0.95 + 0.05 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 100} font="Bebas Neue" color={color ?? INK} o={o} /></g> : null
  })}</g>
}
// # a small trading screen on a stand (the "trader" in s5)
export const Screen: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-200} width={300} height={200} rx={16} fill="#1B2438" />
    <rect x={-136} y={-186} width={272} height={172} rx={8} fill="#0F1626" />
    <polyline points={Array.from({ length: 12 }, (_, i) => `${-120 + i * 22},${-80 - Math.sin(i * 1.3 + f / 12) * 34 - (i % 3) * 8}`).join(' ')} fill="none" stroke={GAIN_L} strokeWidth={5} />
    <rect x={-16} y={0} width={32} height={60} fill="#2B344A" /><rect x={-80} y={56} width={160} height={14} rx={7} fill="#2B344A" />
  </g>
)
// # an index-fund crate: a wooden box packed with many little bricks
export const Crate: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: 15 }, (_, i) => <g key={i} transform={`translate(${-120 + (i % 5) * 60} ${-150 + Math.floor(i / 5) * 30 + (i % 2) * 4})`}><rect x={0} y={0} width={52} height={24} rx={3} fill={i % 3 ? GOLD : GOLD_T} stroke={GOLD_S} strokeWidth={2} /></g>)}
    <path d="M-170 -80 L170 -80 L150 40 L-150 40 Z" fill="#B07A45" />
    <path d="M-170 -80 L170 -80 L165 -56 L-165 -56 Z" fill="#C99360" />
    {[-90, 0, 90].map((dx) => <line key={dx} x1={dx} y1={-56} x2={dx * 0.9} y2={40} stroke="#8A5C31" strokeWidth={4} />)}
  </g>
)
// # a sheet of paper with a sum written on it (s19: "maths on paper")
export const Paper: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; lines: string[] }> = ({ x, y, s = 1, o = 1, r = 0, lines }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-210} y={-150} width={420} height={300} rx={10} fill="#FFFDF6" />
    {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={-180} y1={-90 + k * 52} x2={180} y2={-90 + k * 52} stroke="#C9D7EA" strokeWidth={2} />)}
    <line x1={-150} y1={-140} x2={-150} y2={140} stroke="#F1A9A0" strokeWidth={2} />
    {lines.map((t, k) => <text key={k} x={-120} y={-40 + k * 78} fill={INK} style={{ font: '400 64px "Bebas Neue"', letterSpacing: 2 }}>{t}</text>)}
  </g>
)
