// # Fresh drawings for the Short "How Much You're Worth to Instagram" (owner rules r82/r83).
// # The world: INSIDE THE FEED — a deep indigo night with a soft magenta→cyan aurora, a giant glowing phone whose feed
// # really scrolls (photo posts in candy gradients, gold AD posts slipping in), little businesses that pay coins into
// # the ad slots, a crowd of people as glowing dots, and coin stacks for what one person is worth.
// # Generic drawings only — no app logos. Tall canvas 1080×1920; content inside x 60–940, y 220–1270.
import React from 'react'
import { easeOut, lerp, on, span } from '../kit'

export const W = 1080, H = 1920, CX = 500, FLOOR = 1240
export const TXT = (size: number, ls = 2): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: ls })

export const NIGHT0 = '#120F2E', NIGHT1 = '#231B55', PINK = '#FF4FA3', PINK2 = '#C42F7C', CYAN = '#3FE0F0', CYAN2 = '#1FA6B8'
export const GOLD = '#FFC94A', GOLD2 = '#D99A14', WHITE = '#FFFFFF', INK = '#1A1538', SOFT = '#B9B2E8', SHADE = 'rgba(5,3,20,0.35)'
export const VIOLET = '#7B5CFF', MINT = '#4FE3A6', CORAL = '#FF6B5C'

export const win = (f: number, a: number, b: number, d = 7) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))

// ================================================================== WORLD
export const FeedWorld: React.FC<{ f: number; id: string; calm?: boolean }> = ({ f, id, calm }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={NIGHT1} /><stop offset="100%" stopColor={NIGHT0} /></linearGradient>
      <radialGradient id={`${id}-a1`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={PINK} stopOpacity={0.45} /><stop offset="100%" stopColor={PINK} stopOpacity={0} /></radialGradient>
      <radialGradient id={`${id}-a2`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={CYAN} stopOpacity={0.38} /><stop offset="100%" stopColor={CYAN} stopOpacity={0} /></radialGradient>
    </defs>
    <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-bg)`} />
    <ellipse cx={220 + 60 * Math.sin(f / 90)} cy={420} rx={520} ry={360} fill={`url(#${id}-a1)`} opacity={calm ? 0.6 : 1} />
    <ellipse cx={860 + 50 * Math.cos(f / 110)} cy={1050} rx={560} ry={420} fill={`url(#${id}-a2)`} opacity={calm ? 0.6 : 1} />
    {/* # tiny drifting light specks */}
    {Array.from({ length: 26 }, (_, i) => { const x = (i * 197) % W, y = ((i * 311) % 1500 + 100 - (f * (0.3 + (i % 3) * 0.2))) % 1500 + 120
      return <circle key={i} cx={x} cy={y < 120 ? y + 1500 : y} r={2 + (i % 3)} fill={i % 2 ? CYAN : PINK} opacity={0.35} /> })}
    {/* # a soft floor glow line for things that stand */}
    <rect x={-40} y={FLOOR} width={W + 80} height={4} fill={VIOLET} opacity={0.5} />
    <rect x={-40} y={FLOOR + 4} width={W + 80} height={H} fill="#0C0A22" opacity={0.55} />
  </g>
)
export const Vig: React.FC<{ id: string; k?: number }> = ({ id, k = 0.35 }) => (
  <g pointerEvents="none">
    <defs><radialGradient id={`${id}-vig`} cx="0.5" cy="0.45" r="0.8"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#05030F" stopOpacity={k} /></radialGradient></defs>
    <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-vig)`} />
  </g>
)

// ================================================================== TEXT
export type Head = [at: number, text: string, color?: string, size?: number]
export const Headline: React.FC<{ f: number; lines: Head[]; until?: number; y?: number }> = ({ f, lines: raw, until = 9e9, y = 300 }) => {
  const lines = [...raw].sort((p, q) => p[0] - q[0])
  return <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
    if (o < 0.001) return null
    const s = size ?? 92
    return <g key={k} transform={`translate(${CX} ${y}) scale(${0.95 + 0.05 * on(f, a, 8)})`} opacity={o}>
      <text y={s * 0.36} textAnchor="middle" fill={color ?? WHITE} style={TXT(s, 3)}>{text}</text>
    </g>
  })}</g>
}
export const Pill: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; col?: string; tc?: string; s?: number }> = ({ x, y, t, o = 1, size = 46, col = VIOLET, tc = WHITE, s = 1 }) => {
  const w = Math.max(110, t.length * size * 0.47 + 56), h = size + 26
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={col} opacity={0.25} transform="scale(1.08)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={col} />
    <text y={size * 0.36} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke={WHITE} strokeWidth={30} strokeLinecap="round" />
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke={CORAL} strokeWidth={18} strokeLinecap="round" />
  </g>
)
export const Glint: React.FC<{ f: number; at: number; x: number; y: number; col?: string }> = ({ f, at, x, y, col = WHITE }) => {
  const t = (f - at) / 18
  if (t < 0 || t > 1) return null
  const k = Math.sin(Math.PI * t)
  return <g transform={`translate(${x} ${y}) rotate(${30 * t}) scale(${k})`}><path d="M0 -30 L6 -6 L30 0 L6 6 L0 30 L-6 6 L-30 0 L-6 -6 Z" fill={col} /></g>
}

// ================================================================== THINGS
// # a feed post card (centre origin, 380×300 at s=1): photo block in a candy gradient + two text bars; `ad` = gold AD post
const PHOTOS: [string, string][] = [['#FF8FB1', '#FFC37A'], ['#7BD8FF', '#9F7BFF'], ['#6EF0B5', '#3FB8F0'], ['#FFB86B', '#FF6B8B'], ['#B48CFF', '#FF8FD0']]
export const Post: React.FC<{ x: number; y: number; k: number; s?: number; o?: number; ad?: boolean; glow?: number; f?: number }> = ({ x, y, k, s = 1, o = 1, ad, glow = 0, f = 0 }) => {
  const [a, b] = PHOTOS[k % PHOTOS.length], id = `pp${k}${ad ? 'a' : ''}`
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={ad ? GOLD : a} /><stop offset="100%" stopColor={ad ? '#FF9A3D' : b} /></linearGradient></defs>
    {glow > 0 && <rect x={-206} y={-166} width={412} height={332} rx={30} fill={GOLD} opacity={0.35 * glow * (0.8 + 0.2 * Math.sin(f / 6))} />}
    <rect x={-190} y={-150} width={380} height={300} rx={22} fill="#2C2466" />
    <circle cx={-150} cy={-118} r={16} fill={ad ? GOLD : SOFT} /><rect x={-124} y={-126} width={110} height={14} rx={7} fill={SOFT} opacity={0.7} />
    <rect x={-174} y={-92} width={348} height={180} rx={14} fill={`url(#${id})`} />
    {!ad && k % 3 === 0 && <g><circle cx={60} cy={-40} r={28} fill="#FFF3B0" opacity={0.9} /><path d="M-174 60 L-60 -20 L40 50 L110 0 L174 50 L174 88 L-174 88 Z" fill="#FFFFFF" opacity={0.28} /></g>}
    {!ad && k % 3 === 1 && <g><circle cx={0} cy={0} r={52} fill="#FFFFFF" opacity={0.3} /><circle cx={0} cy={0} r={30} fill="#FFFFFF" opacity={0.35} /></g>}
    {!ad && k % 3 === 2 && <g>{[-100, -20, 60].map((d) => <rect key={d} x={d} y={-30} width={60} height={100} rx={10} fill="#FFFFFF" opacity={0.25} />)}</g>}
    {ad && <g><rect x={-60} y={-40} width={120} height={80} rx={16} fill={WHITE} opacity={0.9} /><text y={22} textAnchor="middle" fill={GOLD2} style={TXT(64)}>AD</text></g>}
    <rect x={-174} y={104} width={220} height={14} rx={7} fill={SOFT} opacity={0.6} /><rect x={-174} y={126} width={140} height={12} rx={6} fill={SOFT} opacity={0.4} />
  </g>
}
// # a giant phone frame (centre origin, 520×1000 at s=1) whose screen shows a scrolling feed; `scroll` px; `adEvery` 0 = no ads
export const FeedPhone: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; scroll: number; adEvery?: number; adGlow?: number; children?: React.ReactNode }> = ({ x, y, s = 1, o = 1, f, scroll, adEvery = 0, adGlow = 0, children }) => {
  const rows = 7, step = 330
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-280} y={-520} width={560} height={1040} rx={80} fill={PINK} opacity={0.18} transform="scale(1.04)" />
    <rect x={-260} y={-500} width={520} height={1000} rx={70} fill="#0A081C" stroke="#4A3FA0" strokeWidth={8} />
    <clipPath id="feed-scr"><rect x={-236} y={-476} width={472} height={952} rx={52} /></clipPath>
    <g clipPath="url(#feed-scr)">
      <rect x={-236} y={-476} width={472} height={952} fill="#17123E" />
      {Array.from({ length: rows }, (_, r) => {
        const idx = Math.floor(scroll / step) + r - 1, yy = -476 + 30 + (r - 1) * step - (scroll % step) + 150
        const ad = adEvery > 0 && idx % adEvery === adEvery - 1
        return <Post key={idx} x={0} y={yy} k={((idx % 97) + 97) % 97} s={1.1} ad={ad} glow={ad ? adGlow : 0} f={f} />
      })}
      {children}
    </g>
    <rect x={-60} y={-492} width={120} height={22} rx={11} fill="#0A081C" />
  </g>
}
// # a coin (centre)
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={7} rx={40} ry={40} fill={GOLD2} /><circle r={40} fill={GOLD} /><circle r={29} fill="none" stroke={GOLD2} strokeWidth={4} />
    <text y={14} textAnchor="middle" fill={GOLD2} style={TXT(t.length > 2 ? 30 : 42)}>{t}</text>
  </g>
)
// # a glowing stack of coins (bottom centre) n coins high
export const Stack: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; glow?: number }> = ({ x, y, n, s = 1, o = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse cx={0} cy={-n * 8} rx={110} ry={Math.max(60, n * 10)} fill={GOLD} opacity={0.2 * glow} />}
    <ellipse cx={0} cy={4} rx={70} ry={12} fill={SHADE} />
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => <g key={i} transform={`translate(${(i % 2) * 4 - 2} ${-12 - i * 16})`}>
      <ellipse cx={0} cy={6} rx={60} ry={16} fill={GOLD2} /><ellipse cx={0} cy={0} rx={60} ry={16} fill={GOLD} />
    </g>)}
  </g>
)
// # a little business (bottom centre): a shop / a car dealer / a sneaker brand — generic glowing kiosks
export const Biz: React.FC<{ x: number; y: number; kind: 0 | 1 | 2; s?: number; o?: number }> = ({ x, y, kind, s = 1, o = 1 }) => {
  const col = [PINK, CYAN, MINT][kind]
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={120} ry={14} fill={SHADE} />
    <rect x={-100} y={-200} width={200} height={200} rx={16} fill="#2C2466" stroke={col} strokeWidth={5} />
    <path d="M-112 -200 L112 -200 L100 -250 L-100 -250 Z" fill={col} />
    {kind === 0 && <g><rect x={-60} y={-150} width={120} height={80} rx={10} fill={col} opacity={0.35} /><rect x={-22} y={-60} width={44} height={60} rx={6} fill={col} /></g>}
    {kind === 1 && <g transform="translate(0 -70)"><path d="M-70 20 L-50 -20 L40 -20 L70 20 Z" fill={col} /><rect x={-80} y={20} width={160} height={30} rx={10} fill={col} /><circle cx={-45} cy={54} r={16} fill={INK} /><circle cx={45} cy={54} r={16} fill={INK} /></g>}
    {kind === 2 && <g transform="translate(0 -80)"><path d="M-70 30 Q-70 -10 -30 -20 L10 -40 Q30 -10 70 0 L70 30 Z" fill={col} /><rect x={-74} y={30} width={148} height={16} rx={8} fill={WHITE} /></g>}
  </g>
}
// # a ring chart (centre) filled to `p` (0..1) with a value in the middle
export const Ring: React.FC<{ x: number; y: number; r: number; p: number; col: string; t?: string; sub?: string; o?: number; s?: number }> = ({ x, y, r, p, col, t, sub, o = 1, s = 1 }) => {
  const C = 2 * Math.PI * r
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={r} fill="none" stroke="#2C2466" strokeWidth={r * 0.3} />
    <circle r={r} fill="none" stroke={col} strokeWidth={r * 0.3} strokeDasharray={`${C * p} ${C}`} transform="rotate(-90)" strokeLinecap="round" />
    {t && <text y={sub ? 4 : r * 0.2} textAnchor="middle" fill={WHITE} style={TXT(r * 0.62)}>{t}</text>}
    {sub && <text y={r * 0.42} textAnchor="middle" fill={SOFT} style={TXT(r * 0.26)}>{sub}</text>}
  </g>
}
// # a person-dot (a tiny glowing head + shoulders) for crowds
export const Dot: React.FC<{ x: number; y: number; s?: number; o?: number; col?: string }> = ({ x, y, s = 1, o = 1, col = CYAN }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-26} r={12} fill={col} /><path d="M-18 6 Q-18 -12 0 -12 Q18 -12 18 6 Z" fill={col} />
  </g>
)
// # a round pedestal (bottom centre) with a label on its face
export const Pedestal: React.FC<{ x: number; y: number; w?: number; t?: string; col?: string; o?: number }> = ({ x, y, w = 220, t, col = VIOLET, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={w / 2} ry={w * 0.12} fill={SHADE} />
    <rect x={-w / 2} y={-70} width={w} height={70} fill={col} />
    <ellipse cx={0} cy={0} rx={w / 2} ry={w * 0.12} fill={col} opacity={0.8} />
    <ellipse cx={0} cy={-70} rx={w / 2} ry={w * 0.12} fill="#9C86FF" />
    {t && <text y={-20} textAnchor="middle" fill={WHITE} style={TXT(36)}>{t}</text>}
  </g>
)
// # a generic company tower (bottom centre) with a name on its crown (a plain label, no logo)
export const Tower: React.FC<{ x: number; y: number; s?: number; o?: number; t: string; lit?: number }> = ({ x, y, s = 1, o = 1, t, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={20} fill={SHADE} />
    <rect x={-150} y={-620} width={300} height={620} rx={20} fill="#2C2466" stroke={VIOLET} strokeWidth={5} />
    {Array.from({ length: 8 }, (_, r) => [0, 1, 2].map((k) => <rect key={`${r}${k}`} x={-110 + k * 80} y={-560 + r * 66} width={60} height={40} rx={6} fill={(r + k + Math.floor(lit * 6)) % 3 === 0 ? GOLD : '#3E3490'} />))}
    <rect x={-170} y={-690} width={340} height={80} rx={16} fill={PINK} />
    <text y={-632} textAnchor="middle" fill={WHITE} style={TXT(60, 6)}>{t}</text>
  </g>
)
export const flyTo = (f: number, t0: number, a: [number, number], b: [number, number], d = 20, h = 160): [number, number, number] => {
  const t = easeOut(span(f, t0, t0 + d))
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - Math.sin(Math.PI * t) * h, t]
}
