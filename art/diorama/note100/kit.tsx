// # Fresh drawings for the Short "A 100 Dollar Bill Costs 11 Cents. Why Is It Worth 100?" (owner rules r82/r83).
// # The world: an ENGRAVED BANKNOTE. Every scene sits on banknote paper — warm cream with fine green guilloche
// # rosettes and a thin engraved border — and every object is drawn like engraving: solid ink-green outlines, two-tone
// # fills, hatch shading, a gold seal. Settings change part by part: the shop counter (hook), the tax office (step 1),
// # a bakery street (step 2), the bakery shelf + the Fed (step 3), a dark vault-green night with a runaway press
// # (Zimbabwe), and the note on three pillars (payoff). Tall canvas 1080×1920; content stays inside x 60–940,
// # y 220–1270 (captions sit at y 1290–1490).
import React from 'react'
import { easeOut, lerp, on, span } from '../kit'

export const W = 1080, H = 1920, CX = 500
export const TXT = (size: number, ls = 2): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: ls })

// # palette: banknote paper + engraving inks
export const PAPER = '#F4ECD8', PAPER2 = '#E9DDC0', INKG = '#22463A', GREEN = '#3E7A5E', GREEN2 = '#6FA487', MINTL = '#CFE3D2'
export const GOLD = '#D9A83E', GOLD2 = '#A87A22', RED = '#C2453A', NAVY = '#1F2E45', SKY = '#BFDCEB', WOOD = '#9A6A45', WOOD2 = '#70482D'
export const NIGHT0 = '#0F2620', NIGHT1 = '#1B3D33', SHADE = 'rgba(30,40,30,0.20)', CREAM = '#FFF8E8', SILVER = '#C7CCD3'

// # visible from a to b with clean fades (gone by b)
export const win = (f: number, a: number, b: number, d = 7) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))

// ================================================================== WORLD
// # a guilloche rosette: overlapping wavy rings (the banknote engraving pattern), slowly turning
const Rosette: React.FC<{ x: number; y: number; r: number; f: number; col: string; o: number; k?: number }> = ({ x, y, r, f, col, o, k = 0 }) => {
  const rings = [1, 0.82, 0.64]
  return <g transform={`translate(${x} ${y}) rotate(${f * 0.04 + k * 20})`} opacity={o}>
    {rings.map((s, i) => {
      const n = 18 + i * 6, pts: string[] = []
      for (let a = 0; a <= 360; a += 3) { const t = a * Math.PI / 180, rr = r * s * (1 + 0.06 * Math.sin(n * t)); pts.push(`${(rr * Math.cos(t)).toFixed(1)},${(rr * Math.sin(t)).toFixed(1)}`) }
      return <polyline key={i} points={pts.join(' ')} fill="none" stroke={col} strokeWidth={2} />
    })}
  </g>
}
export const NoteWorld: React.FC<{ f: number; id: string; dark?: boolean; floor?: number; tint?: string }> = ({ f, id, dark, floor, tint }) => {
  const bg0 = dark ? NIGHT1 : PAPER, bg1 = dark ? NIGHT0 : PAPER2, line = dark ? '#2E5A4B' : '#C9D8C2'
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={bg0} /><stop offset="100%" stopColor={bg1} /></linearGradient>
        <radialGradient id={`${id}-light`} cx="0.5" cy="0.38" r="0.6"><stop offset="0%" stopColor={dark ? '#3C7A62' : '#FFFDF4'} stopOpacity={dark ? 0.35 : 0.8} /><stop offset="100%" stopColor={bg1} stopOpacity={0} /></radialGradient>
        <pattern id={`${id}-hatch`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="14" stroke={line} strokeWidth={2} /></pattern>
      </defs>
      <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-bg)`} />
      {tint && <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={tint} opacity={0.18} />}
      <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-light)`} />
      {/* # guilloche rosettes in the corners of the "note" + fine hatch bands top and bottom */}
      <Rosette x={120} y={250} r={150} f={f} col={line} o={0.9} />
      <Rosette x={980} y={1700} r={200} f={-f} col={line} o={0.9} k={1} />
      <Rosette x={960} y={420} r={90} f={f} col={line} o={0.6} k={2} />
      <rect x={0} y={0} width={W} height={150} fill={`url(#${id}-hatch)`} opacity={0.5} />
      <rect x={0} y={1560} width={W} height={360} fill={`url(#${id}-hatch)`} opacity={0.35} />
      {/* # the engraved double border */}
      <rect x={30} y={170} width={W - 60} height={1380} rx={26} fill="none" stroke={dark ? '#3F7362' : GREEN2} strokeWidth={4} opacity={0.7} />
      <rect x={44} y={184} width={W - 88} height={1352} rx={20} fill="none" stroke={dark ? '#3F7362' : GREEN2} strokeWidth={1.5} opacity={0.7} />
      {floor !== undefined && <g>
        <rect x={44} y={floor} width={W - 88} height={1536 - floor} fill={dark ? '#14302A' : '#E2D2AF'} />
        <rect x={44} y={floor} width={W - 88} height={6} fill={dark ? '#2E5A4B' : '#C8B48A'} />
      </g>}
    </g>
  )
}
export const Vig: React.FC<{ id: string; k?: number }> = ({ id, k = 0.22 }) => (
  <g pointerEvents="none">
    <defs><radialGradient id={`${id}-vig`} cx="0.5" cy="0.45" r="0.8"><stop offset="62%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#10201A" stopOpacity={k} /></radialGradient></defs>
    <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-vig)`} />
  </g>
)

// ================================================================== TEXT
// # one headline slot (y 300): each line from its cue until the next line's cue — they hand over, never overlap
export type Head = [at: number, text: string, color?: string, size?: number]
export const Headline: React.FC<{ f: number; lines: Head[]; until?: number; y?: number }> = ({ f, lines: raw, until = 9e9, y = 300 }) => {
  const lines = [...raw].sort((p, q) => p[0] - q[0])
  return <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 6) * (1 - easeOut(span(f, b - 6, b)))
    if (o < 0.001) return null
    const s = size ?? 92
    return <g key={k} transform={`translate(${CX} ${y}) scale(${0.95 + 0.05 * on(f, a, 8)})`} opacity={o}>
      <text y={s * 0.36} textAnchor="middle" fill={color ?? INKG} style={TXT(s, 3)}>{text}</text>
    </g>
  })}</g>
}
// # an engraved ribbon label (attached to the thing it names by the caller's position)
export const Ribbon: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; col?: string; tc?: string; s?: number }> = ({ x, y, t, o = 1, size = 46, col = GREEN, tc = CREAM, s = 1 }) => {
  const w = Math.max(110, t.length * size * 0.47 + 60), h = size + 26
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M${-w / 2 - 34} ${-h / 2 + 10} L${-w / 2} ${-h / 2 + 10} L${-w / 2} ${h / 2 + 10} L${-w / 2 - 34} ${h / 2 + 10} L${-w / 2 - 18} ${10} Z`} fill={col} opacity={0.75} />
    <path d={`M${w / 2 + 34} ${-h / 2 + 10} L${w / 2} ${-h / 2 + 10} L${w / 2} ${h / 2 + 10} L${w / 2 + 34} ${h / 2 + 10} L${w / 2 + 18} ${10} Z`} fill={col} opacity={0.75} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill={col} />
    <rect x={-w / 2 + 6} y={-h / 2 + 6} width={w - 12} height={h - 12} rx={4} fill="none" stroke={tc} strokeWidth={1.5} opacity={0.5} />
    <text y={size * 0.36} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke={CREAM} strokeWidth={30} strokeLinecap="round" />
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke={RED} strokeWidth={18} strokeLinecap="round" />
  </g>
)

// ================================================================== THINGS
// # the $100 note (centre origin, 600×256 at s=1). Generic design — no real portrait: a laurel oval with a big 100,
// # corner numerals, a gold seal and guilloche bands. `fade` 0..1 drains its colour (worthless paper).
export const Note: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; fade?: number; label?: string; f?: number; glow?: number }> = ({ x, y, s = 1, r = 0, o = 1, fade = 0, label = '100', f = 0, glow = 0 }) => {
  const body = fade > 0 ? mix(MINTL, '#E8E2D4', fade) : MINTL, ink = fade > 0 ? mix(INKG, '#9C968A', fade) : INKG, seal = fade > 0 ? mix(GOLD, '#B9B2A2', fade) : GOLD
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      {glow > 0 && <rect x={-330} y={-158} width={660} height={316} rx={30} fill={GOLD} opacity={0.25 * glow * (0.8 + 0.2 * Math.sin(f / 8))} />}
      <rect x={-300} y={-128} width={600} height={256} rx={14} fill={SHADE} transform="translate(10 12)" />
      <rect x={-300} y={-128} width={600} height={256} rx={14} fill={body} stroke={ink} strokeWidth={5} />
      <rect x={-284} y={-112} width={568} height={224} rx={8} fill="none" stroke={ink} strokeWidth={2} />
      {/* # fine wavy engraving lines */}
      {[-80, -60, 60, 80].map((yy) => <path key={yy} d={Array.from({ length: 29 }, (_, i) => `${i ? 'L' : 'M'}${-270 + i * 20} ${yy + Math.sin(i * 1.3) * 5}`).join(' ')} fill="none" stroke={ink} strokeWidth={1.5} opacity={0.45} />)}
      {/* # the central laurel oval */}
      <ellipse cx={0} cy={0} rx={92} ry={98} fill={CREAM} stroke={ink} strokeWidth={4} />
      {Array.from({ length: 9 }, (_, i) => { const a = (200 + i * 16) * Math.PI / 180; return <ellipse key={`l${i}`} cx={Math.cos(a) * 80} cy={Math.sin(a) * 86} rx={9} ry={18} fill={GREEN} transform={`rotate(${200 + i * 16 + 90} ${Math.cos(a) * 80} ${Math.sin(a) * 86})`} opacity={0.85} /> })}
      {Array.from({ length: 9 }, (_, i) => { const a = (-20 - i * 16) * Math.PI / 180; return <ellipse key={`r${i}`} cx={Math.cos(a) * 80} cy={Math.sin(a) * 86} rx={9} ry={18} fill={GREEN} transform={`rotate(${-20 - i * 16 + 90} ${Math.cos(a) * 80} ${Math.sin(a) * 86})`} opacity={0.85} /> })}
      <text y={34} textAnchor="middle" fill={ink} style={TXT(label.length > 3 ? 70 : 96)}>{label}</text>
      {/* # corner numerals + seal */}
      <text x={-240} y={-62} textAnchor="middle" fill={ink} style={TXT(48)}>{label}</text>
      <text x={240} y={92} textAnchor="middle" fill={ink} style={TXT(48)}>{label}</text>
      <circle cx={190} cy={-40} r={36} fill={seal} stroke={ink} strokeWidth={3} />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={190} y1={-62} x2={190} y2={-70} stroke={ink} strokeWidth={3} transform={`rotate(${i * 30} 190 -40)`} />)}
      <rect x={-250} y={20} width={110} height={14} rx={7} fill={ink} opacity={0.35} />
      <rect x={-250} y={46} width={80} height={14} rx={7} fill={ink} opacity={0.35} />
    </g>
  )
}
// # hex colour mix
export const mix = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const A = p(a), B = p(b)
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], Math.max(0, Math.min(1, t)))).toString(16).padStart(2, '0')).join('')
}
// # a small copper cent coin with a label
export const Cent: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = '¢' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={46} ry={46} fill="#8A4B2A" /><circle r={46} fill="#C9784A" stroke="#7A3F22" strokeWidth={4} />
    <circle r={34} fill="none" stroke="#7A3F22" strokeWidth={3} opacity={0.6} />
    <path d="M-30 -18 A36 36 0 0 1 10 -36" fill="none" stroke="#F1B58E" strokeWidth={6} strokeLinecap="round" opacity={0.7} />
    <text y={16} textAnchor="middle" fill="#5E2E16" style={TXT(44)}>{t}</text>
  </g>
)
// # a gold bar / silver bar (bottom centre)
export const Bar: React.FC<{ x: number; y: number; s?: number; o?: number; silver?: boolean; t?: string }> = ({ x, y, s = 1, o = 1, silver, t }) => {
  const a = silver ? '#E3E7EC' : '#F2CD6A', b = silver ? SILVER : GOLD, c = silver ? '#8C939C' : GOLD2
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={120} ry={12} fill={SHADE} />
    <path d="M-110 0 L-80 -70 L80 -70 L110 0 Z" fill={b} stroke={c} strokeWidth={4} />
    <path d="M-80 -70 L80 -70 L64 -86 L-64 -86 Z" fill={a} stroke={c} strokeWidth={4} />
    <path d="M-70 -60 L-50 -12" stroke="#FFFFFF" strokeWidth={6} opacity={0.6} strokeLinecap="round" />
    {t && <text y={-24} textAnchor="middle" fill={c} style={TXT(36)}>{t}</text>}
  </g>
}
// # a paper grocery bag full of food (bottom centre)
export const Groceries: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={120} ry={12} fill={SHADE} />
    {/* # baguette, greens, apples, milk peeking out */}
    <rect x={-70} y={-300} width={34} height={170} rx={17} fill="#D8A15A" stroke={WOOD2} strokeWidth={3} transform="rotate(-14 -53 -215)" />
    <path d="M10 -200 Q-10 -290 30 -300 Q40 -250 30 -200 Z" fill="#5FA05C" /><path d="M40 -200 Q60 -280 90 -270 Q80 -230 60 -200 Z" fill="#4C8F4A" />
    <rect x={-20} y={-260} width={50} height={90} rx={6} fill="#FFFFFF" stroke="#9BB4C8" strokeWidth={3} /><rect x={-20} y={-230} width={50} height={22} fill={SKY} />
    <circle cx={70} cy={-190} r={26} fill={RED} /><circle cx={-60} cy={-185} r={24} fill="#E2553F" />
    <path d="M-100 -190 L100 -190 L86 0 L-86 0 Z" fill="#C79A64" stroke={WOOD2} strokeWidth={4} />
    <path d="M-100 -190 L100 -190 L98 -170 L-98 -170 Z" fill="#B3874F" />
    <path d="M-60 -150 L-50 -20" stroke={WOOD2} strokeWidth={2} opacity={0.4} />
  </g>
)
// # a balance scale (base centre at y). tilt -1..1: positive = right pan down
export const Scale: React.FC<{ x: number; y: number; s?: number; o?: number; tilt: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, s = 1, o = 1, tilt, left, right }) => {
  const a = tilt * 14, rad = a * Math.PI / 180, L = 300
  const lx = -Math.cos(rad) * L, ly = -Math.sin(rad) * L, rx = Math.cos(rad) * L, ry = Math.sin(rad) * L
  const top = -520
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={160} ry={16} fill={SHADE} />
    <path d="M-120 0 L120 0 L80 -40 L-80 -40 Z" fill={WOOD} stroke={WOOD2} strokeWidth={4} />
    <rect x={-14} y={top} width={28} height={480} fill={GOLD} stroke={GOLD2} strokeWidth={4} />
    <g transform={`translate(0 ${top})`}>
      <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={GOLD2} strokeWidth={16} strokeLinecap="round" />
      <circle r={22} fill={GOLD} stroke={GOLD2} strokeWidth={4} />
      {[[lx, ly, left], [rx, ry, right]].map(([px, py, kid], i) => <g key={i} transform={`translate(${px as number} ${py as number})`}>
        <line x1={0} y1={0} x2={-90} y2={200} stroke={GOLD2} strokeWidth={4} /><line x1={0} y1={0} x2={90} y2={200} stroke={GOLD2} strokeWidth={4} />
        <path d="M-120 200 L120 200 Q100 236 0 240 Q-100 236 -120 200 Z" fill={GOLD} stroke={GOLD2} strokeWidth={4} />
        <g transform="translate(0 200)">{kid as React.ReactNode}</g>
      </g>)}
    </g>
  </g>
}
// # a law book with a gavel (bottom centre); `hit` 0..1 swings the gavel down
export const LawBook: React.FC<{ x: number; y: number; s?: number; o?: number; hit?: number }> = ({ x, y, s = 1, o = 1, hit = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={170} ry={14} fill={SHADE} />
    <rect x={-150} y={-110} width={300} height={110} rx={10} fill={NAVY} stroke={INKG} strokeWidth={4} />
    <rect x={-150} y={-30} width={300} height={30} fill="#F1E7CF" stroke={INKG} strokeWidth={3} />
    <text y={-58} textAnchor="middle" fill={GOLD} style={TXT(44, 4)}>THE LAW</text>
    <g transform={`translate(110 -120) rotate(${lerp(-40, 8, hit)})`}>
      <rect x={-12} y={-12} width={170} height={24} rx={10} fill={WOOD} stroke={WOOD2} strokeWidth={3} transform="rotate(-90) translate(0 0)" />
      <rect x={-50} y={-210} width={100} height={60} rx={14} fill={WOOD} stroke={WOOD2} strokeWidth={4} />
    </g>
  </g>
)
// # an envelope with a stamped word (centre)
export const Letter: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; t?: string; col?: string; tc?: string }> = ({ x, y, s = 1, r = 0, o = 1, t, col = CREAM, tc = RED }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-80} width={260} height={160} rx={8} fill={SHADE} transform="translate(8 10)" />
    <rect x={-130} y={-80} width={260} height={160} rx={8} fill={col} stroke={INKG} strokeWidth={4} />
    <path d="M-130 -80 L0 10 L130 -80" fill="none" stroke={INKG} strokeWidth={4} />
    {t && <g transform="translate(0 46) rotate(-6)"><rect x={-100} y={-28} width={200} height={50} rx={6} fill="none" stroke={tc} strokeWidth={4} /><text y={12} textAnchor="middle" fill={tc} style={TXT(38)}>{t}</text></g>}
  </g>
)
// # a chicken (bottom centre) and a pair of seashells (bottom centre) — the "not this" money
export const Chicken: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => {
  const peck = Math.max(0, Math.sin(f / 9)) * 10
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={80} ry={10} fill={SHADE} />
    <line x1={-14} y1={0} x2={-14} y2={-40} stroke="#E0A13A" strokeWidth={6} /><line x1={14} y1={0} x2={14} y2={-40} stroke="#E0A13A" strokeWidth={6} />
    <ellipse cx={0} cy={-90} rx={80} ry={60} fill="#FFFDF6" stroke={INKG} strokeWidth={4} />
    <path d="M-80 -110 Q-120 -150 -90 -170 Q-80 -130 -60 -130 Z" fill="#FFFDF6" stroke={INKG} strokeWidth={4} />
    <g transform={`rotate(${peck} 40 -130)`}><circle cx={56} cy={-150} r={34} fill="#FFFDF6" stroke={INKG} strokeWidth={4} />
      <path d="M46 -186 Q56 -206 66 -186 Q76 -200 80 -180 Z" fill={RED} /><path d="M86 -150 L108 -142 L86 -136 Z" fill="#E0A13A" /><circle cx={66} cy={-156} r={5} fill={INKG} /><path d="M80 -132 Q86 -118 76 -116" fill={RED} /></g>
    <path d="M-30 -80 Q0 -60 30 -80" fill="none" stroke={INKG} strokeWidth={3} opacity={0.5} />
  </g>
}
export const Shells: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={110} ry={10} fill={SHADE} />
    {[[-50, 0, -8], [50, 0, 10]].map(([sx, sy, r], i) => <g key={i} transform={`translate(${sx} ${sy}) rotate(${r})`}>
      <path d="M-56 -8 Q-60 -110 0 -116 Q60 -110 56 -8 Q0 6 -56 -8 Z" fill={i ? '#F4C7B0' : '#F7DCC6'} stroke={INKG} strokeWidth={4} />
      {[-36, -18, 0, 18, 36].map((d) => <line key={d} x1={d * 0.3} y1={-4} x2={d} y2={-100 + Math.abs(d) * 0.6} stroke={INKG} strokeWidth={2.5} opacity={0.55} />)}
      <rect x={-20} y={-10} width={40} height={18} rx={4} fill={i ? '#F4C7B0' : '#F7DCC6'} stroke={INKG} strokeWidth={3} />
    </g>)}
  </g>
)
// # a little shop / bakery front (bottom centre): striped awning, window, door; `sign` text on the board
export const Shopfront: React.FC<{ x: number; y: number; s?: number; o?: number; sign: string; col?: string }> = ({ x, y, s = 1, o = 1, sign, col = RED }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-220} y={-460} width={440} height={460} fill="#F1E2C2" stroke={INKG} strokeWidth={5} />
    <rect x={-240} y={-520} width={480} height={70} rx={8} fill={GREEN} stroke={INKG} strokeWidth={5} />
    <text y={-470} textAnchor="middle" fill={CREAM} style={TXT(48, 4)}>{sign}</text>
    {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${-240 + i * 60} -450 L${-180 + i * 60} -450 L${-180 + i * 60} -390 Q${-210 + i * 60} -370 ${-240 + i * 60} -390 Z`} fill={i % 2 ? CREAM : col} stroke={INKG} strokeWidth={3} />)}
    <rect x={-190} y={-350} width={220} height={190} rx={6} fill={SKY} stroke={INKG} strokeWidth={5} />
    <path d="M-170 -330 L-120 -330 L-170 -260 Z" fill="#FFFFFF" opacity={0.5} />
    <rect x={70} y={-330} width={120} height={330} rx={6} fill={WOOD} stroke={INKG} strokeWidth={5} /><circle cx={92} cy={-160} r={8} fill={GOLD} />
    <rect x={-200} y={-150} width={240} height={20} fill={WOOD2} />
  </g>
)
// # a cake on a stand (bottom centre); `candles` lit
export const Cake: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; candles?: boolean; col?: string }> = ({ x, y, s = 1, o = 1, f, candles, col = '#F3A7B8' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={2} rx={100} ry={10} fill={SHADE} />
    <rect x={-12} y={-30} width={24} height={30} fill={SILVER} /><ellipse cx={0} cy={-30} rx={100} ry={14} fill="#E3E7EC" stroke="#8C939C" strokeWidth={3} />
    <rect x={-80} y={-130} width={160} height={100} rx={12} fill="#FFF3E6" stroke={INKG} strokeWidth={4} />
    <path d="M-80 -110 Q-60 -90 -40 -110 Q-20 -90 0 -110 Q20 -90 40 -110 Q60 -90 80 -110 L80 -130 L-80 -130 Z" fill={col} stroke={INKG} strokeWidth={3} />
    <rect x={-80} y={-70} width={160} height={14} fill={col} opacity={0.7} />
    {candles && [-40, 0, 40].map((d, i) => <g key={d}><rect x={d - 6} y={-180} width={12} height={50} fill={[SKY, GOLD, '#B8E0C0'][i]} stroke={INKG} strokeWidth={2} />
      <path d={`M${d} ${-200 - 4 * Math.sin(f / 4 + i)} Q${d + 8} -186 ${d} -180 Q${d - 8} -186 ${d} ${-200 - 4 * Math.sin(f / 4 + i)} Z`} fill="#FFB23F" /></g>)}
  </g>
)
// # a sack of flour (bottom centre)
export const Sack: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={90} ry={10} fill={SHADE} />
    <path d="M-70 0 Q-90 -100 -60 -170 L-40 -190 L40 -190 L60 -170 Q90 -100 70 0 Z" fill="#F3EEE2" stroke={INKG} strokeWidth={4} />
    <path d="M-40 -190 Q0 -170 40 -190" fill="none" stroke={WOOD2} strokeWidth={6} />
    <text y={-80} textAnchor="middle" fill={GREEN} style={TXT(44)}>FLOUR</text>
  </g>
)
// # an apartment building (bottom centre)
export const Building: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-520} width={300} height={520} fill="#D9B48C" stroke={INKG} strokeWidth={5} />
    <rect x={-160} y={-540} width={320} height={30} fill={WOOD2} />
    {Array.from({ length: 4 }, (_, r) => [0, 1, 2].map((k) => <rect key={`${r}${k}`} x={-120 + k * 90} y={-490 + r * 100} width={60} height={70} rx={4} fill={(r + k) % 3 === 0 && lit > 0.5 ? '#FFE7A0' : SKY} stroke={INKG} strokeWidth={3} />))}
    <rect x={-40} y={-100} width={80} height={100} rx={4} fill={WOOD} stroke={INKG} strokeWidth={4} />
  </g>
)
// # a link of chain between two points; `glow` 0..1 turns it gold; `snap` 0..1 breaks the middle
export const Chain: React.FC<{ a: [number, number]; b: [number, number]; grow: number; glow?: number; snap?: number; o?: number }> = ({ a, b, grow, glow = 0, snap = 0, o = 1 }) => {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI
  const n = Math.max(2, Math.floor(L / 44)), shown = Math.floor(n * grow)
  const col = mix(SILVER, GOLD, glow), edge = mix('#6E757E', GOLD2, glow)
  return <g transform={`translate(${a[0]} ${a[1]}) rotate(${ang})`} opacity={o}>
    {Array.from({ length: shown }, (_, i) => {
      const mid = i >= n / 2 ? 1 : -1, drop = snap * (Math.abs(i - n / 2) < 1.5 ? 60 : 0) * 0 + snap * 26 * mid
      const x = i * 44 + 22 + (snap > 0 ? mid * snap * 30 : 0)
      return <g key={i} transform={`translate(${x} ${snap * 40 * (1 - Math.abs(i - n / 2) / (n / 2))}) rotate(${snap * drop * 0.6})`}>
        {i % 2 === 0 ? <rect x={-26} y={-15} width={52} height={30} rx={15} fill="none" stroke={edge} strokeWidth={12} /> : <rect x={-26} y={-5} width={52} height={10} rx={5} fill={edge} />}
        {i % 2 === 0 ? <rect x={-26} y={-15} width={52} height={30} rx={15} fill="none" stroke={col} strokeWidth={7} /> : <rect x={-24} y={-3} width={48} height={6} rx={3} fill={col} />}
      </g>
    })}
  </g>
}
// # a price tag (string end at x,y) with text
export const Tag: React.FC<{ x: number; y: number; t: string; s?: number; o?: number; r?: number; col?: string; tc?: string }> = ({ x, y, t, s = 1, o = 1, r = -8, col = CREAM, tc = INKG }) => {
  const w = Math.max(120, t.length * 30 + 50)
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d={`M0 0 L${w} 0 L${w} 76 L0 76 L-36 38 Z`} fill={SHADE} transform="translate(6 8)" />
    <path d={`M0 0 L${w} 0 L${w} 76 L0 76 L-36 38 Z`} fill={col} stroke={INKG} strokeWidth={4} />
    <circle cx={-12} cy={38} r={8} fill={PAPER2} stroke={INKG} strokeWidth={3} />
    <text x={w / 2 - 6} y={54} textAnchor="middle" fill={tc} style={TXT(52)}>{t}</text>
  </g>
}
// # the Federal Reserve: a columned building (bottom centre) with a word on the frieze
export const Temple: React.FC<{ x: number; y: number; s?: number; o?: number; t: string; dark?: boolean }> = ({ x, y, s = 1, o = 1, t, dark }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={280} ry={16} fill={SHADE} />
    <rect x={-260} y={-40} width={520} height={40} fill={dark ? '#B9B2A2' : '#EDE3CB'} stroke={INKG} strokeWidth={4} />
    {[-200, -120, -40, 40, 120, 200].map((cx) => <g key={cx}><rect x={cx - 22} y={-300} width={44} height={260} fill={CREAM} stroke={INKG} strokeWidth={4} />{[-10, 0, 10].map((d) => <line key={d} x1={cx + d} y1={-290} x2={cx + d} y2={-50} stroke={INKG} strokeWidth={1.5} opacity={0.35} />)}</g>)}
    <rect x={-270} y={-350} width={540} height={50} fill="#EDE3CB" stroke={INKG} strokeWidth={4} />
    <path d="M-280 -350 L0 -470 L280 -350 Z" fill="#EDE3CB" stroke={INKG} strokeWidth={4} />
    <circle cx={0} cy={-395} r={28} fill={GOLD} stroke={GOLD2} strokeWidth={3} />
    <text y={-313} textAnchor="middle" fill={INKG} style={TXT(34, 4)}>{t}</text>
  </g>
)
// # a round dial (centre): needle at `v` (0..max), tick marks, a value window
export const Dial: React.FC<{ x: number; y: number; v: number; max: number; s?: number; o?: number; t?: string; mark?: number }> = ({ x, y, v, max, s = 1, o = 1, t, mark }) => {
  const ang = (val: number) => -210 + (val / max) * 240
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={150} fill={SHADE} transform="translate(8 10)" />
    <circle r={150} fill={CREAM} stroke={INKG} strokeWidth={6} />
    {Array.from({ length: max + 1 }, (_, i) => <line key={i} x1={0} y1={-118} x2={0} y2={-136} stroke={INKG} strokeWidth={5} transform={`rotate(${ang(i) + 90})`} />)}
    {mark !== undefined && <path d={describeArc(0, 0, 127, ang(mark - 0.4) + 90, ang(mark + 0.4) + 90)} fill="none" stroke={GREEN} strokeWidth={18} />}
    <g transform={`rotate(${ang(v) + 90})`}><path d="M-8 0 L0 -112 L8 0 Z" fill={RED} /></g>
    <circle r={16} fill={INKG} />
    {t && <text y={80} textAnchor="middle" fill={INKG} style={TXT(48)}>{t}</text>}
  </g>
}
const describeArc = (x: number, y: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => [x + r * Math.cos((a - 90) * Math.PI / 180), y + r * Math.sin((a - 90) * Math.PI / 180)]
  const [sx, sy] = p(a0), [ex, ey] = p(a1)
  return `M${sx} ${sy} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${ex} ${ey}`
}
// # a loaf of bread (bottom centre)
export const Loaf: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={130} ry={12} fill={SHADE} />
    <path d="M-120 0 Q-130 -120 -40 -130 Q0 -150 40 -130 Q130 -120 120 0 Z" fill="#D9A15A" stroke={WOOD2} strokeWidth={5} />
    {[-60, -10, 40].map((d) => <path key={d} d={`M${d} -110 Q${d + 20} -80 ${d + 10} -50`} fill="none" stroke="#F2CB8C" strokeWidth={8} strokeLinecap="round" />)}
  </g>
)
// # a printing press (bottom centre): two rollers turning at `speed`, a sheet feeding out
export const Press: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; speed?: number; dark?: boolean }> = ({ x, y, s = 1, o = 1, f, speed = 1, dark }) => {
  const rot = f * 6 * speed
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={260} ry={18} fill={SHADE} />
    <rect x={-230} y={-80} width={460} height={80} rx={8} fill={dark ? '#3A4A44' : '#5C6B66'} stroke={INKG} strokeWidth={5} />
    <rect x={-200} y={-360} width={50} height={290} fill={dark ? '#4A5A54' : '#6E7D78'} stroke={INKG} strokeWidth={4} />
    <rect x={150} y={-360} width={50} height={290} fill={dark ? '#4A5A54' : '#6E7D78'} stroke={INKG} strokeWidth={4} />
    <rect x={-220} y={-400} width={440} height={50} rx={8} fill={dark ? '#3A4A44' : '#5C6B66'} stroke={INKG} strokeWidth={5} />
    {[-250, -160].map((cy, i) => <g key={i} transform={`translate(0 ${cy})`}>
      <rect x={-150} y={-38} width={300} height={76} rx={38} fill={i ? GOLD : '#9AA6A1'} stroke={INKG} strokeWidth={4} />
      {Array.from({ length: 6 }, (_, k) => { const ph = ((rot / 60 + k / 6) % 1); return <line key={k} x1={-140 + ph * 280} y1={-34} x2={-140 + ph * 280} y2={34} stroke={INKG} strokeWidth={2} opacity={0.4} /> })}
    </g>)}
    <circle cx={260} cy={-200} r={60} fill="none" stroke={INKG} strokeWidth={8} />
    <g transform={`translate(260 -200) rotate(${rot})`}>{[0, 60, 120].map((a) => <line key={a} x1={-60} y1={0} x2={60} y2={0} stroke={INKG} strokeWidth={6} transform={`rotate(${a})`} />)}</g>
  </g>
}
// # a calendar page (centre) with a big word/number
export const CalPage: React.FC<{ x: number; y: number; t: string; sub?: string; s?: number; o?: number; r?: number }> = ({ x, y, t, sub, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-130} width={240} height={260} rx={14} fill={SHADE} transform="translate(8 10)" />
    <rect x={-120} y={-130} width={240} height={260} rx={14} fill={CREAM} stroke={INKG} strokeWidth={5} />
    <rect x={-120} y={-130} width={240} height={64} rx={14} fill={RED} /><rect x={-120} y={-80} width={240} height={14} fill={RED} />
    {[-60, 60].map((d) => <rect key={d} x={d - 8} y={-150} width={16} height={44} rx={8} fill={INKG} />)}
    {sub && <text y={-86} textAnchor="middle" fill={CREAM} style={TXT(36)}>{sub}</text>}
    <text y={60} textAnchor="middle" fill={INKG} style={TXT(t.length > 4 ? 72 : 100)}>{t}</text>
  </g>
)
// # a clock face (centre) whose hands spin at `speed`
export const Clock: React.FC<{ x: number; y: number; f: number; speed?: number; s?: number; o?: number }> = ({ x, y, f, speed = 1, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={110} fill={SHADE} transform="translate(8 10)" />
    <circle r={110} fill={CREAM} stroke={INKG} strokeWidth={6} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-88} x2={0} y2={-100} stroke={INKG} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-58} stroke={INKG} strokeWidth={9} strokeLinecap="round" transform={`rotate(${f * 1.5 * speed})`} />
    <line x1={0} y1={0} x2={0} y2={-84} stroke={RED} strokeWidth={5} strokeLinecap="round" transform={`rotate(${f * 18 * speed})`} />
    <circle r={10} fill={INKG} />
  </g>
)
// # a stone pillar (bottom centre) of height h with a word down its face
export const Pillar: React.FC<{ x: number; y: number; h: number; t: string; o?: number; crack?: number; col?: string; size?: number }> = ({ x, y, h, t, o = 1, crack = 0, col = CREAM, size = 40 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={110} ry={12} fill={SHADE} />
    <rect x={-100} y={-36} width={200} height={36} fill="#E2D6BC" stroke={INKG} strokeWidth={4} />
    <rect x={-76} y={-h + 36} width={152} height={h - 72} fill={col} stroke={INKG} strokeWidth={4} />
    {[-40, 0, 40].map((d) => <line key={d} x1={d} y1={-h + 46} x2={d} y2={-46} stroke={INKG} strokeWidth={2} opacity={0.25} />)}
    <rect x={-100} y={-h} width={200} height={36} fill="#E2D6BC" stroke={INKG} strokeWidth={4} />
    <g transform={`translate(0 ${-h / 2}) rotate(-90)`}><text y={size * 0.36} textAnchor="middle" fill={GREEN} style={TXT(size, 3)}>{t}</text></g>
    {crack > 0 && <path d={`M-70 ${-h * 0.62} L-20 ${-h * 0.55} L-40 ${-h * 0.48} L20 ${-h * 0.42} L0 ${-h * 0.36} L70 ${-h * 0.3}`} fill="none" stroke={INKG} strokeWidth={6} strokeDasharray="400" strokeDashoffset={400 * (1 - crack)} strokeLinejoin="round" />}
  </g>
)
// # a gentle sparkle (fills quiet moments on the thing being talked about)
export const Glint: React.FC<{ f: number; at: number; x: number; y: number; col?: string }> = ({ f, at, x, y, col = '#FFFFFF' }) => {
  const t = (f - at) / 18
  if (t < 0 || t > 1) return null
  const k = Math.sin(Math.PI * t)
  return <g transform={`translate(${x} ${y}) rotate(${30 * t}) scale(${k})`} opacity={0.95}><path d="M0 -30 L6 -6 L30 0 L6 6 L0 30 L-6 6 L-30 0 L-6 -6 Z" fill={col} /></g>
}
// # a point moving along an arc from a to b over [t0, t0+d]
export const flyTo = (f: number, t0: number, a: [number, number], b: [number, number], d = 20, h = 160): [number, number, number] => {
  const t = easeOut(span(f, t0, t0 + d))
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - Math.sin(Math.PI * t) * h, t]
}
