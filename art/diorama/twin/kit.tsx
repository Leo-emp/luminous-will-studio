// ============================================================
// TWIN KIT — drawn fresh for the Short "Good Debt vs Bad Debt" (r82/r83).
// Art direction: a city street at DUSK (lavender → apricot sky, a skyline
// of warm lit windows, terracotta brick, wet teal pavement) for the story,
// turning to a deep plum NIGHT for the cost part. Money = banded cash
// BUNDLES ($16,000 each); prices = paper HANG TAGS on a string; interest
// = liquid rising in glass TANKS. Zoe's colour is teal-green, Max's coral.
// Canvas 1080×1920. Safe area: x 60–940, y 380–1270 (captions
// y 1290–1490, top 220 px kept clear; headline at y 300).
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { clamp01, easeOut, lerp, on, rnd, span } from '../kit'

export const CX = 500, GROUND = 1210

// ------------------------------------------------------------ palette (this video only)
export const INK = '#2B2340', INK2 = '#6E6488', PAPER = '#FFF8EC', BRICK = '#C8664A', BRICK_D = '#9C4A35'
export const ZOE = '#2A9D8F', ZOE_L = '#7FD8C9', MAX = '#E76F51', MAX_L = '#F6A58E', CASH = '#5FA86B', CASH_D = '#3F7E4B', CASH_L = '#A8D9A0'
export const AMBER = '#FFC86B', GOLD = '#E9B949'

// # visible from a to b with clean fades (gone by b)
export const win = (f: number, a: number, b: number, d = 6) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))

// ------------------------------------------------------------ the world: a brick street at dusk (or night)
export const City: React.FC<{ id: string; f: number; tone?: 'dusk' | 'night' }> = ({ id, f, tone = 'dusk' }) => {
  const N = tone === 'night'
  const sky = N ? ['#1E1636', '#3A2550', '#5B3462'] : ['#B9A6D8', '#F2B8A2', '#FFD9A0']
  const far = N ? '#2C2045' : '#8E7BB0', mid = N ? '#251B3B' : '#6B5A8E'
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={sky[0]} /><stop offset="60%" stopColor={sky[1]} /><stop offset="100%" stopColor={sky[2]} /></linearGradient>
        <linearGradient id={`${id}-pave`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={N ? '#2D3B4E' : '#5E8A8C'} /><stop offset="100%" stopColor={N ? '#141B27' : '#2F4F57'} /></linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={N ? '#F4ECFF' : '#FFF1D2'} /><stop offset="40%" stopColor={N ? '#C9B8F0' : '#FFC98A'} stopOpacity={0.6} /><stop offset="100%" stopColor="#FFC98A" stopOpacity={0} /></radialGradient>
        <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="68%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor={N ? '#05020C' : '#4A2A3A'} stopOpacity={N ? 0.45 : 0.18} /></radialGradient>
      </defs>
      <rect x={-20} y={-20} width={1120} height={1960} fill={`url(#${id}-sky)`} />
      {/* # low sun (dusk) or moon (night) behind the skyline */}
      <circle cx={760} cy={760} r={300} fill={`url(#${id}-sun)`} />
      <circle cx={760} cy={760} r={N ? 58 : 96} fill={N ? '#F4ECFF' : '#FFE7B8'} />
      {N && Array.from({ length: 36 }, (_, i) => <circle key={i} cx={rnd(i) * 1080} cy={rnd(i + 40) * 640} r={1.2 + rnd(i + 7) * 2} fill="#FFFFFF" opacity={0.25 + 0.3 * (0.5 + 0.5 * Math.sin(f / 16 + i))} />)}
      {/* # drifting clouds */}
      {[0, 1].map((k) => { const x = ((f * (0.3 + k * 0.15) + k * 560) % 1500) - 300; return <g key={k} opacity={N ? 0.12 : 0.5}><ellipse cx={x} cy={470 + k * 170} rx={180} ry={24} fill="#FFFFFF" /><ellipse cx={x + 80} cy={452 + k * 170} rx={96} ry={22} fill="#FFFFFF" /></g> })}
      {/* # far skyline with lit windows */}
      {Array.from({ length: 11 }, (_, i) => { const w = 80 + rnd(i) * 70, h = 160 + rnd(i + 3) * 260, x = i * 104 - 30
        return <g key={i}><rect x={x} y={1000 - h} width={w} height={h + 40} fill={far} />
          {Array.from({ length: Math.floor(h / 46) * 2 }, (_, k) => <rect key={k} x={x + 14 + (k % 2) * (w / 2 - 6)} y={1000 - h + 18 + Math.floor(k / 2) * 46} width={14} height={20} fill={AMBER} opacity={rnd(i * 31 + k) > 0.55 ? (N ? 0.85 : 0.55) : 0.08} />)}</g> })}
      {/* # nearer row of low brick buildings */}
      {Array.from({ length: 6 }, (_, i) => { const x = i * 190 - 40, h = 150 + rnd(i + 20) * 90
        return <g key={i}><rect x={x} y={1100 - h} width={180} height={h + 20} fill={mid} /><rect x={x - 6} y={1100 - h - 12} width={192} height={14} fill={N ? '#1A1229' : '#584877'} /></g> })}
      {/* # the street everyone stands on: kerb + wet pavement with reflections */}
      <rect x={-20} y={GROUND - 22} width={1120} height={30} fill={N ? '#3A3550' : '#C9B8A6'} />
      <rect x={-20} y={GROUND + 8} width={1120} height={760} fill={`url(#${id}-pave)`} />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={rnd(i + 5) * 1000} y={GROUND + 40 + rnd(i + 2) * 50} width={40 + rnd(i) * 80} height={5} rx={2} fill={N ? '#C9B8F0' : '#FFE7B8'} opacity={0.18} />)}
      {/* # two street lamps */}
      {[70, 1010].map((x, k) => <g key={k}>
        <rect x={x - 5} y={GROUND - 420} width={10} height={400} fill={N ? '#120C1E' : '#3B3050'} />
        <path d={`M${x - 26} ${GROUND - 420} L${x + 26} ${GROUND - 420} L${x + 16} ${GROUND - 450} L${x - 16} ${GROUND - 450} Z`} fill={N ? '#120C1E' : '#3B3050'} />
        <circle cx={x} cy={GROUND - 412} r={N ? 60 : 36} fill={AMBER} opacity={N ? 0.25 : 0.2} /><circle cx={x} cy={GROUND - 414} r={10} fill="#FFF2C9" />
      </g>)}
    </g>
  )
}
export const Vig: React.FC<{ id: string }> = ({ id }) => <rect width={1080} height={1920} fill={`url(#${id}-vg)`} pointerEvents="none" />

// ------------------------------------------------------------ a cut-away flat: brick frame, back wall, floor, window
export const Flat: React.FC<{ x: number; y: number; w: number; h: number; wall: string; o?: number; lit?: number; night?: boolean }> = ({ x, y, w, h, wall, o = 1, lit = 1, night }) => (
  <g opacity={o}>
    <rect x={x - 22} y={y - h - 40} width={w + 44} height={h + 62} rx={6} fill={BRICK} />
    {Array.from({ length: Math.floor((h + 50) / 26) }, (_, r) => <line key={r} x1={x - 22} y1={y - h - 40 + r * 26} x2={x + w + 22} y2={y - h - 40 + r * 26} stroke={BRICK_D} strokeWidth={2} opacity={0.5} />)}
    <rect x={x} y={y - h} width={w} height={h} fill={wall} />
    <rect x={x} y={y - h} width={w} height={h} fill="#000" opacity={0.08 * (1 - lit)} />
    {/* # window with the city behind */}
    <rect x={x + w * 0.62} y={y - h + 40} width={w * 0.28} height={h * 0.34} rx={6} fill={night ? '#3A2550' : '#F7C9A4'} stroke="#FFFFFF" strokeWidth={8} />
    <line x1={x + w * 0.76} y1={y - h + 40} x2={x + w * 0.76} y2={y - h + 40 + h * 0.34} stroke="#FFFFFF" strokeWidth={5} />
    {/* # floorboards */}
    <rect x={x} y={y - 26} width={w} height={26} fill="#A97B54" />
    {[0, 1, 2, 3].map((k) => <line key={k} x1={x + (k + 1) * w / 5} y1={y - 26} x2={x + (k + 1) * w / 5} y2={y} stroke="#8A6040" strokeWidth={3} />)}
    {/* # warm ceiling light pool */}
    <ellipse cx={x + w * 0.35} cy={y - h + 10} rx={w * 0.3} ry={30} fill={AMBER} opacity={0.35 * lit} />
  </g>
)

// ------------------------------------------------------------ a banded cash bundle (the $16,000 each friend borrows)
export const Bundle: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; tint?: number; label?: string; band?: string }> = ({ x, y, s = 1, o = 1, r = 0, tint = 0, label = '$16,000', band = GOLD }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {[3, 2, 1, 0].map((k) => <rect key={k} x={-130 + k * 4} y={-70 - k * 9} width={260} height={110} rx={8} fill={k === 0 ? CASH : CASH_D} />)}
    <rect x={-118} y={-60} width={236} height={90} rx={6} fill="none" stroke={CASH_L} strokeWidth={4} />
    <circle cx={-70} cy={-15} r={26} fill={CASH_L} opacity={0.7} />
    <rect x={-26} y={-74} width={52} height={118} rx={4} fill={band} />
    <text x={0} y={-6} textAnchor="middle" fill={INK} style={{ font: '400 30px "Bebas Neue"' }} transform="rotate(-90 0 -15)">{label}</text>
    {tint > 0 && <rect x={-134} y={-100} width={270} height={146} rx={10} fill="#7A6E86" opacity={0.6 * tint} />}
  </g>
)

// ------------------------------------------------------------ a paper hang tag on a string (prices, rates, amounts)
export const HangTag: React.FC<{ x: number; y: number; text: string; o?: number; color?: string; tc?: string; size?: number; r?: number; s?: number; string?: [number, number] }> = ({ x, y, text, o = 1, color = PAPER, tc = INK, size = 60, r = -6, s = 1, string }) => {
  if (o <= 0.001) return null
  const w = text.length * size * 0.44 + 70, h = size + 30
  return (
    <g opacity={o}>
      {string && <path d={`M${string[0]} ${string[1]} Q ${(string[0] + x) / 2} ${Math.max(string[1], y) + 30} ${x - w / 2 + 22} ${y}`} fill="none" stroke={INK2} strokeWidth={3} />}
      <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
        <path d={`M${-w / 2} ${-h / 2 + 14} L${-w / 2 + 22} ${-h / 2} L${w / 2} ${-h / 2} L${w / 2} ${h / 2} L${-w / 2 + 22} ${h / 2} L${-w / 2} ${h / 2 - 14} Z`} fill={color} stroke={INK} strokeWidth={4} />
        <circle cx={-w / 2 + 22} cy={0} r={7} fill="none" stroke={INK} strokeWidth={3} />
        <text x={14} y={size * 0.36} textAnchor="middle" fill={tc} style={{ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 1.5 }}>{text}</text>
      </g>
    </g>
  )
}

// ------------------------------------------------------------ the things Max buys; `age` 0→1 makes them old and worn
export const TV: React.FC<{ x: number; y: number; s?: number; o?: number; age?: number; f?: number }> = ({ x, y, s = 1, o = 1, age = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-12} y={-30} width={24} height={30} fill="#3A3346" /><rect x={-70} y={-8} width={140} height={10} rx={4} fill="#3A3346" />
    <rect x={-160} y={-210} width={320} height={185} rx={10} fill="#2A2436" />
    <rect x={-148} y={-198} width={296} height={161} rx={5} fill={age > 0.5 ? '#4A4458' : '#3FA7C9'} />
    {age <= 0.5 && <g opacity={1 - age * 2}><circle cx={-60} cy={-130} r={36} fill="#FFE29A" /><path d="M-148 -60 Q -60 -110 20 -70 T 148 -90 L148 -37 L-148 -37 Z" fill="#59C08B" /></g>}
    {age > 0.3 && <path d="M40 -198 L10 -140 L48 -118 L12 -37 M10 -140 L-40 -150" fill="none" stroke="#DDE3EE" strokeWidth={4} opacity={clamp01((age - 0.3) * 3)} />}
    {age > 0.5 && Array.from({ length: 6 }, (_, i) => <rect key={i} x={-148} y={-198 + ((i * 29 + f * 3) % 160)} width={296} height={3} fill="#FFFFFF" opacity={0.12} />)}
  </g>
)
export const Sofa: React.FC<{ x: number; y: number; s?: number; o?: number; age?: number }> = ({ x, y, s = 1, o = 1, age = 0 }) => {
  const c = age > 0.5 ? '#B79A8C' : MAX, c2 = age > 0.5 ? '#9C8072' : '#C9573C', sag = age * 16
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-170} y={-150} width={340} height={90} rx={26} fill={c2} />
      <path d={`M-150 -70 Q -75 ${-70 + sag} 0 -70 Q 75 ${-70 + sag} 150 -70 L150 -20 L-150 -20 Z`} fill={c} />
      <rect x={-200} y={-110} width={56} height={96} rx={22} fill={c2} /><rect x={144} y={-110} width={56} height={96} rx={22} fill={c2} />
      <rect x={-180} y={-18} width={14} height={18} fill="#5A4030" /><rect x={166} y={-18} width={14} height={18} fill="#5A4030" />
      {age > 0.4 && <g opacity={clamp01((age - 0.4) * 3)}><rect x={-60} y={-130} width={44} height={36} rx={4} fill="#D8C8A8" transform="rotate(-8 -38 -112)" /><path d="M60 -60 l14 10 l12 -12 l14 12" fill="none" stroke="#5A4030" strokeWidth={4} /></g>}
    </g>
  )
}
export const Suitcase: React.FC<{ x: number; y: number; s?: number; o?: number; age?: number }> = ({ x, y, s = 1, o = 1, age = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-34 -150 L-34 -176 Q -34 -186 -24 -186 L24 -186 Q 34 -186 34 -176 L34 -150" fill="none" stroke="#3A3346" strokeWidth={10} />
    <rect x={-80} y={-150} width={160} height={150} rx={18} fill={age > 0.5 ? '#9E9AA8' : '#F2B33D'} />
    <rect x={-80} y={-100} width={160} height={14} fill="#00000022" />
    {age <= 0.5 && <g opacity={1 - age * 2}><circle cx={-30} cy={-50} r={22} fill="#FFFFFF" /><path d="M-30 -66 L-26 -54 L-14 -54 L-24 -46 L-20 -34 L-30 -42 L-40 -34 L-36 -46 L-46 -54 L-34 -54 Z" fill={MAX} /><rect x={10} y={-70} width={48} height={30} rx={4} fill="#59C0D8" transform="rotate(12 34 -55)" /></g>}
    {age > 0.5 && Array.from({ length: 10 }, (_, i) => <circle key={i} cx={-70 + rnd(i) * 140} cy={-150 + rnd(i + 4) * 8} r={3 + rnd(i + 2) * 3} fill="#D8D2C8" opacity={0.8} />)}
  </g>
)
// # a credit card (Max's)
export const Card: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-95} y={-60} width={190} height={120} rx={14} fill={MAX} />
    <rect x={-95} y={-30} width={190} height={22} fill="#3A2340" opacity={0.8} />
    <rect x={-74} y={8} width={40} height={30} rx={5} fill={GOLD} />
    <circle cx={50} cy={30} r={16} fill="#FFFFFF" opacity={0.7} /><circle cx={70} cy={30} r={16} fill="#FFFFFF" opacity={0.45} />
  </g>
)

// ------------------------------------------------------------ Zoe's things: a study desk with books + lamp, a graduation cap
export const Desk: React.FC<{ x: number; y: number; s?: number; o?: number; lamp?: number }> = ({ x, y, s = 1, o = 1, lamp = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-130} width={340} height={22} rx={4} fill="#8A5C3A" />
    <rect x={-160} y={-108} width={16} height={108} fill="#6E4628" /><rect x={144} y={-108} width={16} height={108} fill="#6E4628" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-140 + k * 30} y={-130 - (80 + (k % 2) * 16)} width={26} height={80 + (k % 2) * 16} rx={3} fill={[ZOE, '#E9C46A', '#8E7BB0', MAX_L][k]} />)}
    <rect x={20} y={-146} width={110} height={16} rx={3} fill="#F4EDE0" /><rect x={30} y={-160} width={90} height={14} rx={3} fill={ZOE_L} />
    <path d="M110 -130 L110 -230 L150 -250" fill="none" stroke="#3A3346" strokeWidth={8} />
    <path d="M130 -262 L182 -240 L160 -214 Z" fill="#3A3346" />
    <ellipse cx={150} cy={-150} rx={70} ry={26} fill={AMBER} opacity={0.4 * lamp} />
  </g>
)
export const Cap: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; f?: number }> = ({ x, y, s = 1, o = 1, r = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M-60 0 L60 0 L56 40 Q 0 58 -56 40 Z" fill="#2B2340" />
    <path d="M0 -50 L130 -6 L0 38 L-130 -6 Z" fill="#3A2F55" />
    <circle cx={0} cy={-6} r={8} fill={GOLD} />
    <path d={`M0 -6 Q 70 ${4 + Math.sin(f / 8) * 4} 96 30 L96 72`} fill="none" stroke={GOLD} strokeWidth={6} />
    <rect x={88} y={66} width={16} height={34} rx={4} fill={GOLD} />
  </g>
)

// ------------------------------------------------------------ a weekly pay pile: a column of bills whose height IS the pay ($100 of pay = `k` px)
export const PayPile: React.FC<{ x: number; y: number; h: number; grow?: number; o?: number; color?: string; gap?: [number, number]; gapO?: number }> = ({ x, y, h, grow = 1, o = 1, color = CASH, gap, gapO = 0 }) => {
  const H = h * easeOut(grow), n = Math.max(1, Math.floor(H / 22))
  return (
    <g opacity={o}>
      {Array.from({ length: n }, (_, i) => <g key={i}>
        <rect x={x - 100 + (rnd(i) - 0.5) * 8} y={y - (i + 1) * 22} width={200} height={20} rx={4} fill={i % 2 ? color : CASH_D} />
        <rect x={x - 88 + (rnd(i) - 0.5) * 8} y={y - (i + 1) * 22 + 5} width={176} height={10} rx={3} fill="none" stroke={CASH_L} strokeWidth={2} opacity={0.6} />
      </g>)}
      {gap && gapO > 0 && <g opacity={gapO}>
        <rect x={x - 116} y={y - gap[1]} width={232} height={gap[1] - gap[0]} rx={10} fill="none" stroke={GOLD} strokeWidth={8} />
        <rect x={x - 116} y={y - gap[1]} width={232} height={gap[1] - gap[0]} rx={10} fill={GOLD} opacity={0.22} />
      </g>}
    </g>
  )
}

// ------------------------------------------------------------ an interest tank: glass cylinder; liquid height IS dollars of interest
export const Tank: React.FC<{ id: string; x: number; y: number; h: number; fill: number; color: string; o?: number; mark?: number; markO?: number; f: number; tap?: number; glow?: number }> = ({ id, x, y, h, fill, color, o = 1, mark, markO = 0, f, tap = 0, glow = 0 }) => {
  const W = 230, L = h * clamp01(fill), wav = Math.sin(f / 7) * 5
  return (
    <g opacity={o}>
      <defs><linearGradient id={`${id}-liq`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={color} stopOpacity={0.75} /><stop offset="50%" stopColor={color} /><stop offset="100%" stopColor={color} stopOpacity={0.7} /></linearGradient></defs>
      {/* # the tap pouring in from above */}
      {tap > 0 && <g><rect x={x - 60} y={y - h - 110} width={90} height={26} rx={8} fill="#8C8698" /><rect x={x + 10} y={y - h - 96} width={24} height={36} rx={4} fill="#8C8698" />
        <rect x={x + 14} y={y - h - 60} width={16 * tap} height={h + 60 - L} fill={color} opacity={0.85} /></g>}
      {glow > 0 && <rect x={x - W / 2 - 22} y={y - h - 22} width={W + 44} height={h + 44} rx={34} fill={color} opacity={0.35 * glow} />}
      <rect x={x - W / 2} y={y - h} width={W} height={h} rx={22} fill="#FFFFFF" opacity={0.16} stroke="#FFFFFF" strokeWidth={5} />
      {L > 2 && <path d={`M${x - W / 2 + 4} ${y - L} Q ${x} ${y - L + wav} ${x + W / 2 - 4} ${y - L} L${x + W / 2 - 4} ${y - 18} Q ${x + W / 2 - 4} ${y - 4} ${x + W / 2 - 18} ${y - 4} L${x - W / 2 + 18} ${y - 4} Q ${x - W / 2 + 4} ${y - 4} ${x - W / 2 + 4} ${y - 18} Z`} fill={`url(#${id}-liq)`} />}
      <rect x={x - W / 2 + 18} y={y - h + 16} width={16} height={h - 40} rx={8} fill="#FFFFFF" opacity={0.3} />
      {/* # the dashed line at the amount that was borrowed */}
      {mark !== undefined && markO > 0 && <g opacity={markO}><line x1={x - W / 2 - 30} y1={y - mark} x2={x + W / 2 + 30} y2={y - mark} stroke="#FFFFFF" strokeWidth={5} strokeDasharray="16 10" /></g>}
      <rect x={x - W / 2 - 16} y={y - 6} width={W + 32} height={18} rx={6} fill="#5A5068" />
    </g>
  )
}

// ------------------------------------------------------------ a coin (for streams of pay / interest)
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = GOLD }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={30} ry={30} fill="#B8892E" /><circle cx={0} cy={0} r={30} fill={color} /><circle cx={0} cy={0} r={21} fill="none" stroke="#FFF1C2" strokeWidth={3} />
    <text x={0} y={11} textAnchor="middle" fill="#8A5E12" style={{ font: '400 32px "Bebas Neue"' }}>$</text>
  </g>
)

// ------------------------------------------------------------ a chunky curved arrow from a to b, drawn by p (green = pays back, red = costs)
export const Curve: React.FC<{ a: [number, number]; b: [number, number]; lift?: number; p?: number; o?: number; color?: string; w?: number; dash?: boolean }> = ({ a, b, lift = 160, p = 1, o = 1, color = ZOE, w = 16, dash }) => {
  const t = clamp01(p); if (t < 0.02 || o <= 0.001) return null
  const mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - lift
  const pt = (u: number) => [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * mx + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * my + u * u * b[1]]
  const pts = Array.from({ length: 24 }, (_, i) => pt((i / 23) * t)); const [ex, ey] = pts[23], [px, py] = pts[21]
  const ang = Math.atan2(ey - py, ex - px)
  return (
    <g opacity={o}>
      <polyline points={pts.map((q) => q.join(',')).join(' ')} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash ? '4 26' : undefined} />
      <path d={`M${ex + Math.cos(ang) * 26} ${ey + Math.sin(ang) * 26} L${ex + Math.cos(ang + 2.4) * 30} ${ey + Math.sin(ang + 2.4) * 30} L${ex + Math.cos(ang - 2.4) * 30} ${ey + Math.sin(ang - 2.4) * 30} Z`} fill={color} />
    </g>
  )
}
// # a hand-drawn red cross over a thing (strokes draw in over 10 frames)
export const Cross: React.FC<{ x: number; y: number; r?: number; f: number; at: number }> = ({ x, y, r = 100, f, at }) => {
  const a = easeOut(span(f, at, at + 6)), b = easeOut(span(f, at + 4, at + 10))
  if (a <= 0) return null
  return (
    <g>
      <line x1={x - r} y1={y - r} x2={lerp(x - r, x + r, a)} y2={lerp(y - r, y + r, a)} stroke={MAX} strokeWidth={20} strokeLinecap="round" />
      {b > 0 && <line x1={x + r} y1={y - r} x2={lerp(x + r, x - r, b)} y2={lerp(y - r, y + r, b)} stroke={MAX} strokeWidth={20} strokeLinecap="round" />}
    </g>
  )
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
