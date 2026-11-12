// ============================================================
// KIT — Short "Nike Started in the Trunk of a Car" (1080×1920), drawn fresh for this video (r82/r83).
// The world: 1964 OREGON, a warm retro mid-century poster. Cream sky with a big orange sun, layered pine ridges, a red-clay
// running track with white lanes; a turquoise 1960s sedan whose trunk opens onto shoe boxes; running shoes, cash bags,
// a calendar, a factory across the sea, a conveyor of boxes, a pie of the company, a drafting table, an invoice.
// Safe area: x 60–940, y 220–1270 (captions y 1290–1490).
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeOut, lerp, on, span } from '../kit'

export const W = 1080, H = 1920, CX = 500, FLOOR = 1270
export const TXT = (size: number): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 2 })

export const CREAM = '#FFF3E0', CREAM2 = '#F6DFBD', SUN = '#F29B4B', ORANGE = '#E87A3E', MUSTARD = '#E3B23C', TEAL = '#2F8C8C', TEAL2 = '#1E6466'
export const PINE = '#4E7A5A', PINE2 = '#36594A', CLAY = '#C9553D', CLAY2 = '#A8432F', BROWN = '#7A4E2D', BROWN2 = '#5A381F', INK = '#2A2320'
export const PAPER = '#FFFBF3', RED = '#D8432F', GREEN = '#3E9A62', NAVY = '#24395A', SHADE = 'rgba(70,40,20,0.18)', SKYD = '#2B4A5A'

export const win = (f: number, a: number, b: number, d = 7) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))

// ================================================================== WORLD
export type Tone = 'day' | 'dusk'
export const OregonWorld: React.FC<{ f: number; id: string; tone?: Tone; track?: boolean }> = ({ f, id, tone = 'day', track = true }) => {
  const dusk = tone === 'dusk'
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={dusk ? '#3E5F6E' : CREAM} /><stop offset="100%" stopColor={dusk ? '#E9A36B' : CREAM2} /></linearGradient>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.45" r="0.8"><stop offset="65%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#5A3A1E" stopOpacity={dusk ? 0.3 : 0.16} /></radialGradient>
      </defs>
      <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-sky)`} />
      {/* # the big retro sun with stripes */}
      <g transform="translate(780 640)">
        <circle r={230} fill={dusk ? '#F2B36B' : SUN} opacity={0.9} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={-240} y={60 + k * 40} width={480} height={12 + k * 4} fill={dusk ? '#E9A36B' : CREAM2} />)}
      </g>
      {/* # pine ridges */}
      <path d="M-40 980 L60 900 L120 940 L220 860 L300 920 L400 840 L520 930 L640 860 L760 940 L880 870 L1000 930 L1120 890 L1120 1110 L-40 1110 Z" fill={dusk ? '#4D6A62' : '#8DAA8A'} />
      {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${-20 + i * 82} 1100 L${20 + i * 82} ${990 - (i % 3) * 24} L${60 + i * 82} 1100 Z`} fill={dusk ? '#2E4A40' : PINE} />)}
      <rect x={-40} y={1095} width={W + 80} height={60} fill={dusk ? '#2E4A40' : PINE2} />
      {/* # the red-clay track with white lanes */}
      {track && <g>
        <rect x={-40} y={1150} width={W + 80} height={H - 1150 + 40} fill={dusk ? CLAY2 : CLAY} />
        {[1160, 1205, 1250].map((y, k) => <rect key={k} x={-40} y={y} width={W + 80} height={5} fill="#FFFFFF" opacity={0.8} />)}
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={((i * 120 - f * 0.6) % 1200) - 60} y={1290} width={60} height={5} fill="#FFFFFF" opacity={0.35} />)}
      </g>}
      {!track && <rect x={-40} y={1150} width={W + 80} height={H - 1150 + 40} fill={dusk ? '#6E5A44' : '#D9B98A'} />}
    </g>
  )
}
export const Vig: React.FC<{ id: string }> = ({ id }) => <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-vig)`} pointerEvents="none" />

// ================================================================== HEADLINE
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
// # a retro tag label (centre origin): cream card with a bold border and a notch
export const Tag: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; col?: string; tc?: string }> = ({ x, y, t, o = 1, size = 44, col = PAPER, tc = INK }) => {
  if (o <= 0.001) return null
  const w = Math.max(110, t.length * size * 0.47 + 56), h = size + 30
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2 + 6} y={-h / 2 + 7} width={w} height={h} rx={6} fill={SHADE} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill={col} stroke={INK} strokeWidth={4} />
    <text y={size * 0.36} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s * (0.85 + 0.15 * o)})`} opacity={o}>
    <path d="M-66 -66 L66 66 M66 -66 L-66 66" stroke={PAPER} strokeWidth={30} strokeLinecap="round" />
    <path d="M-66 -66 L66 66 M66 -66 L-66 66" stroke={RED} strokeWidth={18} strokeLinecap="round" />
  </g>) : null
// # a step badge painted like a lane number
export const LaneBadge: React.FC<{ x: number; y: number; n: number; s?: number; o?: number }> = ({ x, y, n, s = 1, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-80} width={160} height={160} rx={18} fill={CLAY} stroke={PAPER} strokeWidth={8} />
    <text y={44} textAnchor="middle" fill={PAPER} style={TXT(130)}>{n}</text>
  </g>) : null

// ================================================================== THINGS
// # the little tick (drawn stroke); p 0..1 how much of it is drawn
export const Tick: React.FC<{ x: number; y: number; s?: number; p?: number; col?: string; o?: number }> = ({ x, y, s = 1, p = 1, col = INK, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-60 6 Q-58 30 -30 26 Q20 16 70 -24 Q10 10 -24 12 Q-46 12 -60 6 Z" fill={col} opacity={p > 0.98 ? 1 : 0} />
    <path d="M-60 6 Q-58 30 -30 26 Q20 16 70 -24" fill="none" stroke={col} strokeWidth={12} strokeLinecap="round" strokeDasharray="200" strokeDashoffset={200 * (1 - p)} />
  </g>) : null
// # a 1960s running shoe (side view, toe right); tick 0..1 draws the little tick on its side
export const Shoe: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; tick?: number; col?: string }> = ({ x, y, s = 1, o = 1, r = 0, tick = 0, col = '#FFFFFF' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={58} rx={190} ry={16} fill={SHADE} />
    <path d="M-170 40 L-170 -20 Q-160 -70 -110 -76 L-40 -80 Q0 -40 60 -30 Q150 -16 180 20 L184 40 Z" fill={col} stroke={INK} strokeWidth={5} />
    <path d="M-176 40 L190 40 Q192 58 170 58 L-160 58 Q-178 58 -176 40 Z" fill={ORANGE} stroke={INK} strokeWidth={5} />
    <path d="M-110 -76 L-60 -40 M-80 -78 L-40 -50 M-56 -80 L-20 -56" stroke={INK} strokeWidth={4} />
    {tick > 0 && <Tick x={10} y={0} s={1.1} p={tick} col={ORANGE} />}
  </g>) : null
// # a shoe box (bottom centre)
export const ShoeBox: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; col?: string; r?: number; tick?: boolean }> = ({ x, y, s = 1, o = 1, t, col = ORANGE, r = 0, tick }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-70} width={160} height={70} rx={4} fill={col} stroke={INK} strokeWidth={4} />
    <rect x={-86} y={-84} width={172} height={20} rx={4} fill={col} stroke={INK} strokeWidth={4} />
    <rect x={-86} y={-84} width={172} height={8} fill="#FFFFFF" opacity={0.25} />
    {t && <text y={-22} textAnchor="middle" fill={PAPER} style={TXT(28)}>{t}</text>}
    {tick && <Tick x={0} y={-36} s={0.5} col={PAPER} />}
  </g>) : null
// # the 1960s sedan (bottom centre at the wheels); trunk 0..1 lifts the trunk lid, boxes 0..n shoe boxes inside
export const Car: React.FC<{ x: number; y: number; s?: number; o?: number; trunk?: number; boxes?: number; flip?: boolean }> = ({ x, y, s = 1, o = 1, trunk = 0, boxes = 0, flip }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={300} ry={20} fill={SHADE} />
    <path d="M-290 -40 L-290 -110 Q-280 -130 -240 -134 L-150 -140 L-90 -220 L120 -220 L180 -140 L280 -128 Q300 -120 300 -90 L300 -40 Z" fill={TEAL} stroke={INK} strokeWidth={5} />
    <path d="M-70 -206 L110 -206 L160 -144 L-118 -144 Z" fill="#CFEDEA" stroke={INK} strokeWidth={4} />
    <line x1={20} y1={-206} x2={20} y2={-144} stroke={INK} strokeWidth={4} />
    <rect x={-290} y={-80} width={590} height={14} fill={PAPER} opacity={0.85} />
    {/* # the trunk (rear = left): boxes inside, lid lifts */}
    {boxes > 0 && Array.from({ length: Math.min(6, Math.round(boxes)) }, (_, k) => <ShoeBox key={k} x={-230 + (k % 3) * 56} y={-130 - Math.floor(k / 3) * 34} s={0.38} col={[ORANGE, MUSTARD, '#5C8FB0'][k % 3]} />)}
    <g transform={`rotate(${-lerp(0, 58, trunk)} -150 -140)`}>
      <path d="M-290 -110 Q-280 -134 -240 -136 L-150 -140 L-150 -124 L-286 -104 Z" fill={TEAL2} stroke={INK} strokeWidth={4} />
    </g>
    {[-180, 190].map((cx) => <g key={cx}><circle cx={cx} cy={-30} r={46} fill={INK} /><circle cx={cx} cy={-30} r={20} fill="#C9CED6" /></g>)}
    <rect x={290} y={-100} width={16} height={22} rx={4} fill={MUSTARD} />
  </g>) : null
// # a cash bag (bottom centre)
export const CashBag: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = '$' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={2} rx={90} ry={14} fill={SHADE} />
    <path d="M-80 0 Q-100 -120 -30 -150 L30 -150 Q100 -120 80 0 Z" fill="#D9B47A" stroke={BROWN} strokeWidth={5} />
    <path d="M-34 -150 L-50 -190 L50 -190 L34 -150 Z" fill="#C9A06A" stroke={BROWN} strokeWidth={5} />
    <text y={-50} textAnchor="middle" fill={BROWN2} style={TXT(t.length > 3 ? 50 : 76)}>{t}</text>
  </g>) : null
// # a banknote (centre origin)
export const Note: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string }> = ({ x, y, s = 1, o = 1, r = 0, t = '$500' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-50} width={220} height={100} rx={8} fill="#B9DDB0" stroke="#4D8A4A" strokeWidth={4} />
    <rect x={-96} y={-38} width={192} height={76} rx={5} fill="none" stroke="#4D8A4A" strokeWidth={2} />
    <text y={14} textAnchor="middle" fill="#2F5F2D" style={TXT(46)}>{t}</text>
  </g>) : null
// # a tear-off calendar (bottom centre); shows the year t
export const Calendar: React.FC<{ x: number; y: number; s?: number; o?: number; t: string; flip?: number }> = ({ x, y, s = 1, o = 1, t, flip = 0 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-230} width={220} height={230} rx={12} fill={PAPER} stroke={INK} strokeWidth={5} />
    <rect x={-110} y={-230} width={220} height={60} rx={12} fill={RED} />
    {[-60, 60].map((cx) => <rect key={cx} x={cx - 8} y={-246} width={16} height={36} rx={6} fill={INK} />)}
    <text y={-70} textAnchor="middle" fill={INK} style={TXT(96)}>{t}</text>
    {flip > 0 && flip < 1 && <rect x={-110} y={-170} width={220} height={170 * (1 - flip)} fill={PAPER} stroke={INK} strokeWidth={3} opacity={0.9} />}
  </g>) : null
// # a factory across the sea (bottom centre)
export const Factory: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; big?: number }> = ({ x, y, s = 1, o = 1, t, big = 0 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.25 * big)})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={190} ry={16} fill={SHADE} />
    <path d="M-170 0 L-170 -120 L-110 -170 L-110 -120 L-50 -170 L-50 -120 L10 -170 L10 -120 L170 -120 L170 0 Z" fill="#E7D3B5" stroke={INK} strokeWidth={5} />
    <rect x={110} y={-250} width={36} height={130} fill={BROWN} stroke={INK} strokeWidth={4} />
    {[0, 1, 2].map((k) => <rect key={k} x={-140 + k * 60} y={-80} width={36} height={40} fill={MUSTARD} stroke={INK} strokeWidth={3} />)}
    {t && <text x={0} y={-130 - 140} textAnchor="middle" fill={INK} style={TXT(36)}>{t}</text>}
  </g>) : null
// # a pie of the company (centre origin): share 0..1 in the supplier colour
export const Pie: React.FC<{ x: number; y: number; r?: number; share: number; o?: number; col?: string; rest?: string; split?: number }> = ({ x, y, r = 180, share, o = 1, col = RED, rest = '#5C8FB0', split = 0 }) => {
  if (o <= 0.001) return null
  const a = share * Math.PI * 2, ex = Math.sin(a) * r, ey = -Math.cos(a) * r, big = share > 0.5 ? 1 : 0
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r} fill={rest} stroke={INK} strokeWidth={5} transform={`translate(${split * 40} 0)`} />
    {share > 0.001 && <path d={`M0 0 L0 ${-r} A${r} ${r} 0 ${big} 1 ${ex} ${ey} Z`} fill={col} stroke={INK} strokeWidth={5} transform={`translate(${-split * 40} 0)`} />}
  </g>
}
// # an invoice sheet (centre origin)
export const Invoice: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string; amt?: string; amtO?: number }> = ({ x, y, s = 1, o = 1, r = 0, t = 'INVOICE', amt = '$35', amtO = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-190} width={300} height={380} rx={8} fill={SHADE} transform="translate(8 10)" />
    <rect x={-150} y={-190} width={300} height={380} rx={8} fill={PAPER} stroke={INK} strokeWidth={4} />
    <text y={-130} textAnchor="middle" fill={INK} style={TXT(48)}>{t}</text>
    {[0, 1, 2].map((k) => <rect key={k} x={-110} y={-80 + k * 36} width={k === 1 ? 160 : 220} height={10} rx={5} fill="#D9C9AE" />)}
    <line x1={-110} y1={60} x2={110} y2={60} stroke={INK} strokeWidth={3} />
    <g opacity={amtO}><text y={140} textAnchor="middle" fill={RED} style={TXT(110)}>{amt}</text></g>
  </g>) : null
// # a drafting table with a sheet (bottom centre); draws the tick on the sheet with p
export const Drafting: React.FC<{ x: number; y: number; s?: number; o?: number; p?: number }> = ({ x, y, s = 1, o = 1, p = 0 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={190} ry={16} fill={SHADE} />
    <rect x={-12} y={-220} width={24} height={220} fill={BROWN} /><rect x={-120} y={-20} width={240} height={20} rx={6} fill={BROWN2} />
    <g transform="translate(0 -240) rotate(-12)">
      <rect x={-200} y={-120} width={400} height={240} rx={8} fill={BROWN2} />
      <rect x={-180} y={-104} width={360} height={208} fill={PAPER} />
      <Tick x={0} y={6} s={2} p={p} col={INK} />
    </g>
  </g>) : null
// # a speech bubble with a small tick in it
export const Bubble: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-70 -50 Q-70 -80 -40 -80 L40 -80 Q70 -80 70 -50 L70 -10 Q70 20 40 20 L0 20 L-20 46 L-20 20 L-40 20 Q-70 20 -70 -10 Z" fill={PAPER} stroke={INK} strokeWidth={4} />
    <Tick x={0} y={-30} s={0.55} col={ORANGE} />
  </g>) : null
export const arcAt = (a: [number, number], b: [number, number], t: number, lift = 120): [number, number] => [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - Math.sin(Math.PI * t) * lift]
