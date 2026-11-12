// ============================================================
// KIT — Short "Why Most of Buffett's Money Came Late" (1080×1920), drawn fresh for this video (r82/r83).
// The world: THE SNOWBALL. A bright winter valley — pale icy-blue sky, distant blue mountains, soft snow hills with
// pines, drifting flakes. Compounding is a snowball rolling down a long slope: small for decades, then huge. Ten-year
// checkpoints are wooden flag posts; labels are wooden signs; a birthday cake marks age 64; a stack of gold coins grows
// year by year; an S&P 500 crate holds tiny share tickets. Safe area: x 60–940, y 220–1270 (captions y 1290–1490).
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeOut, lerp, on, span } from '../kit'

export const W = 1080, H = 1920, CX = 500, FLOOR = 1270
export const TXT = (size: number): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 2 })

export const SKY0 = '#EAF4FB', SKY1 = '#CFE4F2', SNOW = '#FFFFFF', SNOW2 = '#DCE9F3', SNOW3 = '#B9CFE0', MOUNT = '#9DB9D3', MOUNT2 = '#7F9FC0'
export const PINE = '#3F7D5C', PINE2 = '#2C5E45', WOOD = '#9A6B43', WOOD2 = '#70482A', INK = '#1D2B44', GOLD = '#E9B53A', GOLD2 = '#B8841E'
export const CORAL = '#E8735A', CORAL2 = '#B9503B', GREEN = '#3E9A62', ICE = '#8FC6E8', SHADE = 'rgba(40,70,100,0.18)', PAPER = '#FFFDF7'

// # visible from a to b with clean fades (gone by b)
export const win = (f: number, a: number, b: number, d = 7) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))

// ================================================================== WORLD
export type Tone = 'day' | 'dusk'
export const SnowWorld: React.FC<{ f: number; id: string; tone?: Tone; hills?: boolean }> = ({ f, id, tone = 'day', hills = true }) => {
  const dusk = tone === 'dusk'
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={dusk ? '#F7E3D2' : SKY0} /><stop offset="100%" stopColor={dusk ? '#F4C9B0' : SKY1} /></linearGradient>
        <linearGradient id={`${id}-snow`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={SNOW} /><stop offset="100%" stopColor={SNOW2} /></linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFF6DA" stopOpacity="0.95" /><stop offset="100%" stopColor="#FFF6DA" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.45" r="0.8"><stop offset="65%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#3A5A7A" stopOpacity={0.18} /></radialGradient>
      </defs>
      <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-sky)`} />
      <circle cx={860} cy={260} r={190} fill={`url(#${id}-sun)`} />
      {/* # distant mountains with snow caps */}
      <path d="M-40 760 L120 560 L240 660 L400 470 L560 640 L700 520 L860 680 L1000 560 L1120 700 L1120 900 L-40 900 Z" fill={MOUNT} opacity={0.55} />
      <path d="M120 560 L170 620 L140 615 L100 640 Z M400 470 L460 545 L420 540 L370 560 Z M700 520 L760 590 L720 585 L670 600 Z" fill={SNOW} opacity={0.9} />
      <path d="M-40 900 L90 780 L260 860 L430 740 L640 870 L820 770 L1120 880 L1120 1000 L-40 1000 Z" fill={MOUNT2} opacity={0.35} />
      {/* # soft snow hills */}
      {hills && <path d="M-40 1060 Q200 960 460 1040 T1120 1010 L1120 1300 L-40 1300 Z" fill={SNOW2} />}
      <rect x={-40} y={FLOOR - 40} width={W + 80} height={H - FLOOR + 80} fill={`url(#${id}-snow)`} />
      <path d={`M-40 ${FLOOR - 40} Q300 ${FLOOR - 70} 600 ${FLOOR - 40} T1120 ${FLOOR - 50}`} fill="none" stroke={SNOW3} strokeWidth={3} opacity={0.6} />
      {/* # pines at the edges */}
      {[[40, FLOOR - 30, 1.1], [130, FLOOR - 60, 0.8], [1010, FLOOR - 40, 1.0], [930, FLOOR - 70, 0.7]].map(([x, y, s], k) => <Pine key={k} x={x} y={y} s={s} />)}
      {/* # drifting flakes */}
      {Array.from({ length: 28 }, (_, i) => { const x = ((i * 137 + f * (0.5 + (i % 5) * 0.12)) % 1160) - 40, y = ((i * 211 + f * (1.2 + (i % 4) * 0.3)) % 1960) - 20
        return <circle key={i} cx={x + Math.sin(f / 30 + i) * 10} cy={y} r={2 + (i % 3)} fill="#FFFFFF" opacity={0.75} /> })}
    </g>
  )
}
export const Vig: React.FC<{ id: string }> = ({ id }) => <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-vig)`} pointerEvents="none" />
export const Pine: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-8} y={-30} width={16} height={34} fill={WOOD2} />
    {[0, 1, 2].map((k) => <path key={k} d={`M${-70 + k * 14} ${-30 - k * 60} L0 ${-130 - k * 60} L${70 - k * 14} ${-30 - k * 60} Z`} fill={k % 2 ? PINE2 : PINE} />)}
    {[0, 1, 2].map((k) => <path key={k} d={`M${-40 + k * 8} ${-80 - k * 60} L0 ${-130 - k * 60} L${40 - k * 8} ${-80 - k * 60} Q0 ${-95 - k * 60} ${-40 + k * 8} ${-80 - k * 60} Z`} fill={SNOW} opacity={0.85} />)}
  </g>
)

// ================================================================== HEADLINE (top band, y ≈ 330)
export type Head = [at: number, text: string, color?: string, size?: number]
export const Headline: React.FC<{ f: number; lines: Head[]; until?: number; y?: number }> = ({ f, lines: raw, until = 9e9, y = 330 }) => {
  const lines = [...raw].sort((p, q) => p[0] - q[0])
  return <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
    return o > 0.001 ? <g key={k} transform={`translate(${CX} ${y}) scale(${0.95 + 0.05 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 92} font="Bebas Neue" color={color ?? INK} o={o} /></g> : null
  })}</g>
}

// ================================================================== LABELS
// # a wooden sign board (centre origin); callers attach it to the thing it names
export const Sign: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; col?: string; tc?: string; post?: number }> = ({ x, y, t, o = 1, size = 44, col = PAPER, tc = INK, post = 0 }) => {
  if (o <= 0.001) return null
  const w = Math.max(110, t.length * size * 0.47 + 56), h = size + 30
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {post > 0 && <rect x={-7} y={h / 2} width={14} height={post} fill={WOOD2} />}
    <rect x={-w / 2 + 5} y={-h / 2 + 7} width={w} height={h} rx={8} fill={SHADE} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={8} fill={col} stroke={WOOD} strokeWidth={5} />
    <path d={`M${-w / 2 + 8} ${-h / 2 + 4} Q0 ${-h / 2 - 10} ${w / 2 - 8} ${-h / 2 + 4}`} fill="none" stroke={SNOW} strokeWidth={9} strokeLinecap="round" />
    <text y={size * 0.36} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s * (0.85 + 0.15 * o)})`} opacity={o}>
    <path d="M-66 -66 L66 66 M66 -66 L-66 66" stroke={SNOW} strokeWidth={30} strokeLinecap="round" />
    <path d="M-66 -66 L66 66 M66 -66 L-66 66" stroke={CORAL} strokeWidth={18} strokeLinecap="round" />
  </g>) : null
export const ArrowUp: React.FC<{ x: number; y: number; s?: number; o?: number; col?: string }> = ({ x, y, s = 1, o = 1, col = GREEN }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-24 56 L-24 -8 L-56 -8 L0 -74 L56 -8 L24 -8 L24 56 Z" fill={col} stroke={SNOW} strokeWidth={5} strokeLinejoin="round" /></g>) : null
export const StepBadge: React.FC<{ x: number; y: number; n: number; s?: number; o?: number }> = ({ x, y, n, s = 1, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={0} y1={-60} x2={0} y2={-92} stroke={ICE} strokeWidth={10} strokeLinecap="round" transform={`rotate(${i * 60})`} />)}
    <circle r={66} fill={INK} stroke={SNOW} strokeWidth={8} />
    <text y={32} textAnchor="middle" fill={SNOW} style={TXT(92)}>{n}</text>
  </g>) : null

// ================================================================== THINGS
// # the snowball (centre origin): radius r, rolling texture turns with `spin` (deg); a $ coin can peek out
export const Snowball: React.FC<{ id: string; x: number; y: number; r: number; spin?: number; o?: number; coin?: boolean; glow?: number }> = ({ id, x, y, r, spin = 0, o = 1, coin = false, glow = 0 }) => o > 0.001 && r > 0.5 ? (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <defs><radialGradient id={`${id}-ball`} cx="0.35" cy="0.3" r="0.8"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="70%" stopColor={SNOW2} /><stop offset="100%" stopColor={SNOW3} /></radialGradient></defs>
    {glow > 0 && <circle r={r * 1.25} fill={GOLD} opacity={0.18 * glow} />}
    <ellipse cx={r * 0.1} cy={r * 0.96} rx={r * 0.95} ry={r * 0.16} fill={SHADE} />
    <circle r={r} fill={`url(#${id}-ball)`} />
    <g transform={`rotate(${spin})`}>
      {Array.from({ length: 9 }, (_, i) => { const a = i * 2.4, d = r * (0.25 + 0.5 * ((i * 37) % 10) / 10); return <ellipse key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} rx={r * 0.09} ry={r * 0.06} fill={SNOW3} opacity={0.35} transform={`rotate(${i * 40} ${Math.cos(a) * d} ${Math.sin(a) * d})`} /> })}
      {coin && <g transform={`translate(${r * 0.25} ${-r * 0.1})`}><circle r={r * 0.22} fill={GOLD} stroke={GOLD2} strokeWidth={Math.max(2, r * 0.03)} /><text y={r * 0.08} textAnchor="middle" fill={GOLD2} style={TXT(r * 0.26)}>$</text></g>}
    </g>
    <ellipse cx={-r * 0.35} cy={-r * 0.4} rx={r * 0.22} ry={r * 0.12} fill="#FFFFFF" opacity={0.8} transform={`rotate(-30 ${-r * 0.35} ${-r * 0.4})`} />
  </g>) : null
// # a checkpoint flag on a post (bottom of post at x,y); `up` 0..1 raises the flag
export const Flag: React.FC<{ x: number; y: number; t: string; o?: number; up?: number; col?: string; h?: number }> = ({ x, y, t, o = 1, up = 1, col = CORAL, h = 210 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={30} ry={7} fill={SHADE} />
    <rect x={-5} y={-h} width={10} height={h} fill={WOOD2} />
    <g transform={`translate(5 ${-h + 8 + (1 - up) * (h - 70)})`}>
      <path d="M0 0 L170 30 L0 64 Z" fill={col} stroke={SNOW} strokeWidth={3} />
      <text x={14} y={42} fill={SNOW} style={TXT(34)}>{t}</text>
    </g>
  </g>) : null
// # a birthday cake with a number on it (bottom centre)
export const Cake: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; lit?: number }> = ({ x, y, s = 1, o = 1, t = '64', lit = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={130} ry={16} fill={SHADE} />
    <rect x={-120} y={-90} width={240} height={90} rx={14} fill="#F6C9C0" stroke={CORAL2} strokeWidth={4} />
    <path d="M-120 -70 Q-90 -40 -60 -70 Q-30 -40 0 -70 Q30 -40 60 -70 Q90 -40 120 -70 L120 -90 L-120 -90 Z" fill={SNOW} />
    <rect x={-90} y={-160} width={180} height={72} rx={12} fill="#FBE3DD" stroke={CORAL2} strokeWidth={4} />
    <text y={-104} textAnchor="middle" fill={CORAL2} style={TXT(56)}>{t}</text>
    {[-50, 0, 50].map((cx) => <g key={cx}><rect x={cx - 5} y={-200} width={10} height={40} fill={ICE} /><ellipse cx={cx} cy={-210} rx={7 * lit} ry={12 * lit} fill={GOLD} /></g>)}
  </g>) : null
// # the yearly report booklet (centre origin)
export const Report: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string }> = ({ x, y, s = 1, o = 1, r = 0, t = 'YEARLY REPORT' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-140} width={220} height={280} rx={8} fill={SHADE} transform="translate(8 10)" />
    <rect x={-110} y={-140} width={220} height={280} rx={8} fill={INK} />
    <rect x={-96} y={-126} width={192} height={252} rx={4} fill="none" stroke={GOLD} strokeWidth={3} />
    <text y={-70} textAnchor="middle" fill={GOLD} style={TXT(30)}>BERKSHIRE</text>
    <text y={-38} textAnchor="middle" fill={SNOW} style={TXT(24)}>{t}</text>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-60 + k * 32} y={90 - (16 + k * 22)} width={22} height={16 + k * 22} rx={3} fill={k === 3 ? GREEN : ICE} />)}
  </g>) : null
// # a stack of gold coins (bottom centre); n coins, the last `hi` coins highlighted (just added)
export const Coins: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; hi?: number; hiCol?: string }> = ({ x, y, n, s = 1, o = 1, hi = 0, hiCol = GREEN }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={110} ry={18} fill={SHADE} />
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => { const top = i >= Math.round(n) - hi
      return <g key={i} transform={`translate(${Math.sin(i * 1.3) * 5} ${-i * 16})`}>
        <ellipse cx={0} cy={0} rx={90} ry={20} fill={top ? hiCol : GOLD2} />
        <ellipse cx={0} cy={-8} rx={90} ry={20} fill={top ? '#7FCB9B' : GOLD} stroke={top ? '#2E7A4E' : GOLD2} strokeWidth={2} />
      </g> })}
  </g>) : null
// # an exponential growth curve in a box (x0,y0 = bottom-left); draws up to `p` (0..1 of the width); knee marker at k
export const Curve: React.FC<{ x0: number; y0: number; w: number; h: number; p: number; o?: number; k?: number; kO?: number; col?: string }> = ({ x0, y0, w, h, p, o = 1, k = 0.5, kO = 0, col = CORAL }) => {
  if (o <= 0.001) return null
  const N = 60, pts: string[] = []
  for (let i = 0; i <= N * p; i++) { const t = i / N; const v = (Math.pow(55024, t) - 1) / 55023; pts.push(`${i ? 'L' : 'M'}${x0 + t * w} ${y0 - v * h}`) }
  return <g opacity={o}>
    <line x1={x0} y1={y0} x2={x0 + w} y2={y0} stroke={INK} strokeWidth={5} strokeLinecap="round" />
    <line x1={x0} y1={y0} x2={x0} y2={y0 - h} stroke={INK} strokeWidth={5} strokeLinecap="round" />
    <path d={pts.join(' ')} fill="none" stroke={col} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
    {kO > 0 && <g opacity={kO}><line x1={x0 + k * w} y1={y0} x2={x0 + k * w} y2={y0 - h} stroke={INK} strokeWidth={4} strokeDasharray="12 10" /></g>}
  </g>
}
// # an hourglass (bottom centre); `t` 0..1 sand moved to the bottom
export const Hourglass: React.FC<{ x: number; y: number; s?: number; o?: number; t?: number }> = ({ x, y, s = 1, o = 1, t = 0.5 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={120} ry={16} fill={SHADE} />
    <rect x={-120} y={-24} width={240} height={24} rx={6} fill={WOOD} /><rect x={-120} y={-420} width={240} height={24} rx={6} fill={WOOD} />
    {[-100, 100].map((px) => <rect key={px} x={px - 8} y={-400} width={16} height={380} fill={WOOD2} />)}
    <path d="M-80 -396 L80 -396 L10 -220 L80 -24 L-80 -24 L-10 -220 Z" fill="#E7F3FB" stroke={ICE} strokeWidth={5} />
    <path d={`M${-70 * (1 - t)} ${-386 + 150 * t} L${70 * (1 - t)} ${-386 + 150 * t} L0 -226 Z`} fill={GOLD} />
    <path d={`M-70 -30 L70 -30 L${70 - 60 * t} ${-30 - 150 * t} L${-70 + 60 * t} ${-30 - 150 * t} Z`} fill={GOLD} opacity={t > 0.02 ? 1 : 0} />
  </g>) : null
// # the S&P 500 crate full of tiny share tickets (bottom centre)
export const Crate: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = 'S&P 500' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={190} ry={20} fill={SHADE} />
    {Array.from({ length: 18 }, (_, i) => <rect key={i} x={-150 + (i % 6) * 50} y={-230 + Math.floor(i / 6) * 16 - (i % 2) * 10} width={44} height={30} rx={4} fill={[PAPER, '#FFF1C9', '#E3F1FB'][i % 3]} stroke={GOLD2} strokeWidth={2} transform={`rotate(${(i % 5) * 6 - 12} ${-128 + (i % 6) * 50} ${-215})`} />)}
    <rect x={-170} y={-190} width={340} height={190} rx={10} fill={WOOD} stroke={WOOD2} strokeWidth={6} />
    {[-110, 0, 110].map((px) => <rect key={px} x={px - 6} y={-190} width={12} height={190} fill={WOOD2} opacity={0.5} />)}
    <rect x={-120} y={-130} width={240} height={70} rx={8} fill={PAPER} />
    <text y={-80} textAnchor="middle" fill={INK} style={TXT(52)}>{t}</text>
  </g>) : null
// # a magnifier (centre origin)
export const Magnifier: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = -30 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-12} y={60} width={24} height={110} rx={10} fill={WOOD2} />
    <circle r={70} fill="#E7F3FB" fillOpacity={0.6} stroke={INK} strokeWidth={14} />
    <path d="M-36 -28 A44 44 0 0 1 10 -50" fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" />
  </g>) : null
// # a stock card with a little up chart (centre origin)
export const StockCard: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string; up?: boolean }> = ({ x, y, s = 1, o = 1, r = 0, t = 'STOCK', up = true }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-100} y={-70} width={200} height={140} rx={12} fill={SHADE} transform="translate(6 8)" />
    <rect x={-100} y={-70} width={200} height={140} rx={12} fill={PAPER} stroke={INK} strokeWidth={4} />
    <text x={-80} y={-30} fill={INK} style={TXT(32)}>{t}</text>
    <path d={up ? 'M-80 40 L-40 20 L0 30 L40 -5 L80 -20' : 'M-80 -10 L-40 10 L0 0 L40 30 L80 40'} fill="none" stroke={up ? GREEN : CORAL} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
  </g>) : null
// # a point along an arc from a to b
export const arcAt = (a: [number, number], b: [number, number], t: number, lift = 120): [number, number] => [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - Math.sin(Math.PI * t) * lift]
// # a single gold coin (centre origin)
export const Coin0: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={5} r={34} fill={GOLD2} /><circle r={34} fill={GOLD} /><circle r={25} fill="none" stroke={GOLD2} strokeWidth={4} />
    <text y={12} textAnchor="middle" fill={GOLD2} style={TXT(36)}>$</text>
  </g>) : null
