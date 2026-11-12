// # Fresh drawings for the Short "Your Free Phone Isn't Free: The Real Price of 0 Down" (owner rules r82/r83).
// # The world: a BRIGHT PASTEL PHONE STORE — a lilac back wall with glowing display shelves, a soft neon sign,
// # a mint tiled floor, glossy phones with shine strips. The video's running object is a 36-box calendar wall
// # (one box per monthly payment) that splits, fills with credits and turns red when you leave.
// # Tall canvas 1080×1920; content stays inside x 60–940, y 220–1270 (captions sit at y 1290–1490).
import React from 'react'
import { easeOut, lerp, on, span } from '../kit'

export const W = 1080, H = 1920, CX = 500, FLOOR = 1240
export const TXT = (size: number, ls = 2): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: ls })

export const LILAC = '#E9E1F7', LILAC2 = '#CFC2EE', PLUM = '#4B3A78', INK = '#2A2346', MINT = '#BFEBDD', MINT2 = '#8ED6C0'
export const CORAL = '#FF7A6B', CORAL2 = '#D9503F', TEAL = '#2FB3A3', TEAL2 = '#1E8578', SUN = '#FFC94A', SUN2 = '#D99A14'
export const SKY = '#9CD7FF', WHITE = '#FFFFFF', SHADE = 'rgba(42,35,70,0.18)', NIGHT0 = '#1B1636', NIGHT1 = '#2C2552'

export const win = (f: number, a: number, b: number, d = 7) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))

// ================================================================== WORLD
export const StoreWorld: React.FC<{ f: number; id: string; dark?: boolean; shelves?: boolean }> = ({ f, id, dark, shelves = true }) => {
  const wall0 = dark ? NIGHT1 : '#F3EEFB', wall1 = dark ? NIGHT0 : LILAC2, floor0 = dark ? '#211C40' : MINT, floor1 = dark ? '#15112B' : MINT2
  const flick = 0.85 + 0.15 * Math.sin(f / 23)
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={wall0} /><stop offset="100%" stopColor={wall1} /></linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={floor0} /><stop offset="100%" stopColor={floor1} /></linearGradient>
        <radialGradient id={`${id}-neon`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={dark ? CORAL : '#FFB3C7'} stopOpacity={0.55} /><stop offset="100%" stopColor={dark ? CORAL : '#FFB3C7'} stopOpacity={0} /></radialGradient>
        <linearGradient id={`${id}-shelf`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={dark ? '#3A3170' : WHITE} /><stop offset="100%" stopColor={dark ? '#2A2352' : '#E2DAF3'} /></linearGradient>
      </defs>
      <rect x={-40} y={-40} width={W + 80} height={FLOOR + 40} fill={`url(#${id}-wall)`} />
      {/* # soft vertical wall panels */}
      {Array.from({ length: 7 }, (_, i) => <rect key={i} x={i * 160 - 20} y={0} width={4} height={FLOOR} fill={dark ? '#3A3170' : '#DDD3F2'} />)}
      {/* # a neon sign glow top-right (no words — a phone outline) */}
      <circle cx={900} cy={90} r={150} fill={`url(#${id}-neon)`} opacity={flick} />
      <rect x={860} y={22} width={80} height={130} rx={18} fill="none" stroke={dark ? CORAL : '#FF8FAE'} strokeWidth={9} opacity={flick} />
      <circle cx={900} cy={136} r={6} fill={dark ? CORAL : '#FF8FAE'} opacity={flick} />
      {/* # display shelves with little glowing phones */}
      {shelves && [520, 760].map((y, r) => <g key={r} opacity={0.55}>
        <rect x={60} y={y} width={960} height={16} rx={6} fill={`url(#${id}-shelf)`} />
        {Array.from({ length: 8 }, (_, i) => <g key={i} transform={`translate(${110 + i * 120} ${y - 74})`}><rect x={-24} y={0} width={48} height={74} rx={9} fill={dark ? '#4A4090' : PLUM} /><rect x={-19} y={6} width={38} height={60} rx={6} fill={[SKY, MINT2, '#FFB3C7', SUN][(i + r) % 4]} opacity={0.8} /></g>)}
      </g>)}
      {/* # floor */}
      <rect x={-40} y={FLOOR} width={W + 80} height={H - FLOOR + 40} fill={`url(#${id}-floor)`} />
      {Array.from({ length: 9 }, (_, i) => <line key={i} x1={i * 140 - 60} y1={FLOOR} x2={i * 180 - 300} y2={H} stroke={dark ? '#2C2552' : '#A9E2D2'} strokeWidth={3} />)}
      <rect x={-40} y={FLOOR} width={W + 80} height={8} fill={dark ? '#3A3170' : '#7FCDB6'} />
    </g>
  )
}
export const Vig: React.FC<{ id: string; k?: number }> = ({ id, k = 0.2 }) => (
  <g pointerEvents="none">
    <defs><radialGradient id={`${id}-vig`} cx="0.5" cy="0.45" r="0.8"><stop offset="62%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#120E26" stopOpacity={k} /></radialGradient></defs>
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
      <text y={s * 0.36} textAnchor="middle" fill={color ?? INK} style={TXT(s, 3)}>{text}</text>
    </g>
  })}</g>
}
// # a rounded pill label (attached by the caller's position)
export const Pill: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; col?: string; tc?: string; s?: number }> = ({ x, y, t, o = 1, size = 46, col = PLUM, tc = WHITE, s = 1 }) => {
  const w = Math.max(110, t.length * size * 0.47 + 56), h = size + 26
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2 + 5} y={-h / 2 + 7} width={w} height={h} rx={h / 2} fill={SHADE} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={col} />
    <text y={size * 0.36} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke={WHITE} strokeWidth={30} strokeLinecap="round" />
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke={CORAL2} strokeWidth={18} strokeLinecap="round" />
  </g>
)
export const Glint: React.FC<{ f: number; at: number; x: number; y: number; col?: string }> = ({ f, at, x, y, col = WHITE }) => {
  const t = (f - at) / 18
  if (t < 0 || t > 1) return null
  const k = Math.sin(Math.PI * t)
  return <g transform={`translate(${x} ${y}) rotate(${30 * t}) scale(${k})`}><path d="M0 -30 L6 -6 L30 0 L6 6 L0 30 L-6 6 L-30 0 L-6 -6 Z" fill={col} /></g>
}

// ================================================================== THINGS
// # a glossy smartphone (centre origin, 300×600 at s=1); `screen` paints the display; `crack` 0..1
export const Phone: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; body?: string; screen?: React.ReactNode; glow?: number; f?: number }> = ({ x, y, s = 1, r = 0, o = 1, body = PLUM, screen, glow = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-180} y={-330} width={360} height={660} rx={70} fill={SUN} opacity={0.3 * glow * (0.85 + 0.15 * Math.sin(f / 7))} />}
    <rect x={-150} y={-300} width={300} height={600} rx={50} fill={SHADE} transform="translate(12 14)" />
    <rect x={-150} y={-300} width={300} height={600} rx={50} fill={body} />
    <rect x={-136} y={-286} width={272} height={572} rx={40} fill={INK} />
    <clipPath id={`ph-scr-${Math.round(x)}-${Math.round(y)}`}><rect x={-128} y={-278} width={256} height={556} rx={34} /></clipPath>
    <g clipPath={`url(#ph-scr-${Math.round(x)}-${Math.round(y)})`}>
      <rect x={-128} y={-278} width={256} height={556} fill="url(#ph-scrgrad)" />
      <defs><linearGradient id="ph-scrgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8EC9FF" /><stop offset="100%" stopColor="#C9A8FF" /></linearGradient></defs>
      {screen}
      <path d="M-128 -278 L-20 -278 L-128 -60 Z" fill={WHITE} opacity={0.18} />
    </g>
    <rect x={-40} y={-272} width={80} height={20} rx={10} fill={INK} />
  </g>
)
// # the 36-box payment grid (6 × 6). state(i) → 'plain' | 'credit' | 'owed' | 'hidden'; each box shows `label(i)`
export type Box = 'plain' | 'credit' | 'owed' | 'hidden' | 'paid'
export const Grid36: React.FC<{ x: number; y: number; cell?: number; gap?: number; state: (i: number) => Box; pop?: (i: number) => number; label?: (i: number) => string; o?: number; dark?: boolean }> = ({ x, y, cell = 112, gap = 14, state, pop, label, o = 1, dark }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: 36 }, (_, i) => {
      const st = state(i)
      if (st === 'hidden') return null
      const cx = (i % 6) * (cell + gap) + cell / 2, cy = Math.floor(i / 6) * (cell + gap) + cell / 2, k = pop ? pop(i) : 1
      const fill = st === 'credit' ? TEAL : st === 'owed' ? CORAL : st === 'paid' ? SUN : dark ? '#3A3170' : WHITE
      const tc = st === 'plain' ? (dark ? LILAC : INK) : WHITE
      return <g key={i} transform={`translate(${cx} ${cy}) scale(${k})`}>
        <rect x={-cell / 2 + 4} y={-cell / 2 + 6} width={cell} height={cell} rx={16} fill={SHADE} />
        <rect x={-cell / 2} y={-cell / 2} width={cell} height={cell} rx={16} fill={fill} stroke={dark ? '#4A4090' : '#D6CCEE'} strokeWidth={3} />
        <rect x={-cell / 2} y={-cell / 2} width={cell} height={24} rx={12} fill={st === 'plain' ? (dark ? '#4A4090' : LILAC2) : 'rgba(255,255,255,0.25)'} />
        {label && <text y={cell * 0.2} textAnchor="middle" fill={tc} style={TXT(cell * 0.36)}>{label(i)}</text>}
      </g>
    })}
  </g>
)
// # a phone bill (centre origin): header, one big line amount, optional credit line and a stamp
export const BillDoc: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; amount: string; amountCol?: string; stamp?: string; stampO?: number; credit?: string; creditO?: number }> = ({ x, y, s = 1, r = 0, o = 1, amount, amountCol = INK, stamp, stampO = 0, credit, creditO = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-210} y={-270} width={420} height={540} rx={18} fill={SHADE} transform="translate(10 12)" />
    <rect x={-210} y={-270} width={420} height={540} rx={18} fill={WHITE} />
    <rect x={-210} y={-270} width={420} height={80} rx={18} fill={PLUM} /><rect x={-210} y={-210} width={420} height={20} fill={PLUM} />
    <rect x={-170} y={-236} width={60} height={24} rx={8} fill={MINT2} />
    {[0, 1].map((k) => <rect key={k} x={-170} y={-140 + k * 40} width={k ? 180 : 260} height={18} rx={9} fill="#E3DCF2" />)}
    <text x={0} y={30} textAnchor="middle" fill={amountCol} style={TXT(110)}>{amount}</text>
    {credit && <g opacity={creditO}><rect x={-170} y={70} width={340} height={70} rx={14} fill={MINT} /><text x={0} y={120} textAnchor="middle" fill={TEAL2} style={TXT(56)}>{credit}</text></g>}
    {stamp && <g opacity={stampO} transform={`translate(0 210) rotate(-8) scale(${0.8 + 0.2 * stampO})`}><rect x={-160} y={-44} width={320} height={84} rx={10} fill="none" stroke={CORAL2} strokeWidth={8} /><text y={24} textAnchor="middle" fill={CORAL2} style={TXT(64)}>{stamp}</text></g>}
  </g>
)
// # a coin (centre)
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; col?: string; t?: string }> = ({ x, y, s = 1, o = 1, col = SUN, t = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={7} rx={40} ry={40} fill={col === SUN ? SUN2 : TEAL2} /><circle r={40} fill={col} /><circle r={29} fill="none" stroke={col === SUN ? SUN2 : TEAL2} strokeWidth={4} />
    <text y={14} textAnchor="middle" fill={col === SUN ? SUN2 : WHITE} style={TXT(42)}>{t}</text>
  </g>
)
// # a stack of coins (bottom centre) of n coins
export const Stack: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; col?: string }> = ({ x, y, n, s = 1, o = 1, col = SUN }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={70} ry={12} fill={SHADE} />
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => <g key={i} transform={`translate(${(i % 2) * 4 - 2} ${-12 - i * 16})`}>
      <ellipse cx={0} cy={6} rx={60} ry={16} fill={col === SUN ? SUN2 : TEAL2} /><ellipse cx={0} cy={0} rx={60} ry={16} fill={col} />
    </g>)}
  </g>
)
// # a store counter (bottom edge at FLOOR) spanning x0..x1
export const Counter: React.FC<{ x0: number; x1: number; o?: number }> = ({ x0, x1, o = 1 }) => (
  <g opacity={o}>
    <rect x={x0} y={FLOOR - 250} width={x1 - x0} height={28} rx={8} fill={WHITE} stroke={LILAC2} strokeWidth={3} />
    <rect x={x0 + 14} y={FLOOR - 222} width={x1 - x0 - 28} height={222} fill={PLUM} />
    <rect x={x0 + 14} y={FLOOR - 222} width={x1 - x0 - 28} height={14} fill="#3A2C66" />
    <rect x={x0 + 40} y={FLOOR - 170} width={x1 - x0 - 80} height={10} rx={5} fill={TEAL} opacity={0.7} />
  </g>
)
// # a big sale sign on a stand (bottom centre) with up to two lines
export const Sign: React.FC<{ x: number; y: number; s?: number; o?: number; l1: string; l2?: string; col?: string; f?: number }> = ({ x, y, s = 1, o = 1, l1, l2, col = CORAL, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(f / 30) * 1.2})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={120} ry={12} fill={SHADE} />
    <rect x={-10} y={-240} width={20} height={240} fill="#A99BD0" />
    <rect x={-80} y={-20} width={160} height={20} rx={8} fill="#A99BD0" />
    <rect x={-210} y={-560} width={420} height={340} rx={26} fill={SHADE} transform="translate(10 12)" />
    <rect x={-210} y={-560} width={420} height={340} rx={26} fill={col} />
    <rect x={-190} y={-540} width={380} height={300} rx={18} fill="none" stroke={WHITE} strokeWidth={4} opacity={0.7} />
    <text y={l2 ? -420 : -360} textAnchor="middle" fill={WHITE} style={TXT(l2 ? 88 : 110)}>{l1}</text>
    {l2 && <text y={-300} textAnchor="middle" fill={WHITE} style={TXT(96)}>{l2}</text>}
  </g>
)
// # a chain of links from a to b; `grow` 0..1; `snap` 0..1 splits it in the middle
export const Tether: React.FC<{ a: [number, number]; b: [number, number]; grow?: number; snap?: number; o?: number; col?: string }> = ({ a, b, grow = 1, snap = 0, o = 1, col = SUN }) => {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI
  const n = Math.max(2, Math.floor(L / 40)), shown = Math.floor(n * grow)
  return <g transform={`translate(${a[0]} ${a[1]}) rotate(${ang})`} opacity={o}>
    {Array.from({ length: shown }, (_, i) => { const side = i < n / 2 ? -1 : 1, dx = snap * side * 40, dy = snap * 60 * (1 - Math.abs(i - n / 2) / (n / 2))
      return <g key={i} transform={`translate(${i * 40 + 20 + dx} ${dy})`}>
        {i % 2 === 0 ? <rect x={-24} y={-14} width={48} height={28} rx={14} fill="none" stroke={SUN2} strokeWidth={11} /> : <rect x={-22} y={-5} width={44} height={10} rx={5} fill={SUN2} />}
        {i % 2 === 0 ? <rect x={-24} y={-14} width={48} height={28} rx={14} fill="none" stroke={col} strokeWidth={6} /> : <rect x={-20} y={-3} width={40} height={6} rx={3} fill={col} />}
      </g> })}
  </g>
}
// # a plan card (centre): name, big monthly price
export const PlanCard: React.FC<{ x: number; y: number; s?: number; o?: number; name: string; price: string; col?: string; lit?: number }> = ({ x, y, s = 1, o = 1, name, price, col = TEAL, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {lit > 0 && <rect x={-200} y={-250} width={400} height={500} rx={40} fill={SUN} opacity={0.35 * lit} />}
    <rect x={-170} y={-220} width={340} height={440} rx={30} fill={SHADE} transform="translate(10 12)" />
    <rect x={-170} y={-220} width={340} height={440} rx={30} fill={WHITE} />
    <rect x={-170} y={-220} width={340} height={110} rx={30} fill={col} /><rect x={-170} y={-140} width={340} height={30} fill={col} />
    <text y={-150} textAnchor="middle" fill={WHITE} style={TXT(54)}>{name}</text>
    <text y={40} textAnchor="middle" fill={INK} style={TXT(120)}>{price}</text>
    <text y={110} textAnchor="middle" fill="#8A80A8" style={TXT(44)}>A MONTH</text>
  </g>
)
// # a shop door (bottom centre) that opens with `open` 0..1, warm light inside
export const Door: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; sign?: string }> = ({ x, y, s = 1, o = 1, open = 0, sign }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-520} width={300} height={520} rx={12} fill="#3A2C66" />
    <rect x={-130} y={-500} width={260} height={500} fill="#FFE7A6" />
    <path d={`M-130 -500 L${lerp(130, -90, open)} ${-500 + 30 * open} L${lerp(130, -90, open)} ${-30 * open} L-130 0 Z`} fill={TEAL} stroke={TEAL2} strokeWidth={5} />
    <circle cx={lerp(100, -70, open)} cy={-250} r={10} fill={SUN} />
    {sign && <g transform="translate(0 -580)"><rect x={-160} y={-44} width={320} height={80} rx={14} fill={SUN} /><text y={18} textAnchor="middle" fill={INK} style={TXT(50)}>{sign}</text></g>}
  </g>
)
export const flyTo = (f: number, t0: number, a: [number, number], b: [number, number], d = 20, h = 160): [number, number, number] => {
  const t = easeOut(span(f, t0, t0 + d))
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - Math.sin(Math.PI * t) * h, t]
}
