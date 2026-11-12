// ============================================================
// LONG VIDEO — "Tesla: The Full Story" — shared drawing kit (tz- prefix)
// Art direction: "THE BLUEPRINT" — the 2006 master plan is a sheet of
// drafting paper; every chapter starts as blue pencil lines on that paper
// and comes alive as a full-colour, lit place: a 2003 workshop, a winter
// night in 2008, the Fremont factory hall, a sunny California road, a
// solar valley at noon and at dusk, a robotaxi street, a market hall.
// Palette: warm drafting cream (main world, r57), blueprint blue lines,
// cherry red paint for the cars, brushed steel, battery green, sun gold;
// deep winter navy only for the crisis and the risk beats.
// Depth: soft floor shadows, two-tone faces on objects, glass highlights,
// paper grain + vignette. One picture group at a time (scenes dip), no
// zooms (r56), labels stuck to their part. Drawn fresh for this video
// (r82/r83) — only engine helpers (Person, Headline, timing) are shared.
// ============================================================
import React from 'react'
import { clamp01, easeOut, lerp, span } from '../kit'

export const T = {
  ink: '#1F2D45', inkSoft: '#56657F', inkL: '#9AA5B6',
  paper: '#F7F0E1', paperD: '#E9DDC5', paperDD: '#D2C2A2', paperL: '#FFFBF2',
  blue: '#2F6DB5', blueL: '#9DC0E6', blueLL: '#D6E5F5', blueD: '#1D4A80',
  red: '#D63A3A', redD: '#9C2424', redL: '#F28B82',
  steel: '#B9C3CF', steelD: '#7D8999', steelL: '#E6EBF1', tyre: '#232A35',
  green: '#3BA56B', greenD: '#257047', greenL: '#CDEBD8',
  sun: '#F2B840', sunD: '#C78A1E', sunL: '#FBE3A6',
  night: '#16233D', nightL: '#2A3D61', snow: '#EEF3FA',
  coral: '#E36A4F', teal: '#2A9C9C', tealD: '#1C6E6E',
  white: '#FFFFFF', wood: '#B98A5A', woodD: '#8A6238',
}
export const FONT = { big: '"Bebas Neue"', body: 'Inter' }
export const FLOOR = 900

export const cues = <K extends Record<string, string>>(c: (k: string) => number, K: K) => Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as { [P in keyof K]: number }
// # scenes dip (old gone by b, next starts at b) — never two pictures at once
export const fadeIn = (f: number, a: number, d = 8) => (a <= 0 ? 1 : clamp01((f - a) / d))
export const scene = (f: number, a: number, b: number, d = 8) => (f >= b ? 0 : fadeIn(f, a, d) * (1 - clamp01((f - (b - d)) / d)))
// # visible from a until b (fades out over d before b)
export const win = (f: number, a: number, b: number, d = 8) => clamp01((f - a) / d) * (1 - clamp01((f - (b - d)) / d))
export const grow = (f: number, a: number, d = 14) => easeOut(span(f, a, a + d))

export const TDefs: React.FC = () => (
  <>
    <rect width={1920} height={1080} fill={T.paper} />
    <defs>
      <linearGradient id="tz-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={T.paperL} /><stop offset="1" stopColor={T.paper} /></linearGradient>
      <linearGradient id="tz-desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C99B68" /><stop offset="1" stopColor="#9C7246" /></linearGradient>
      <linearGradient id="tz-red" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EE5B55" /><stop offset="0.55" stopColor={T.red} /><stop offset="1" stopColor={T.redD} /></linearGradient>
      <linearGradient id="tz-white" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#D9DFE7" /></linearGradient>
      <linearGradient id="tz-blue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5C93D6" /><stop offset="1" stopColor={T.blueD} /></linearGradient>
      <linearGradient id="tz-steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={T.steelD} /><stop offset="0.45" stopColor={T.steelL} /><stop offset="1" stopColor={T.steel} /></linearGradient>
      <linearGradient id="tz-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#CFE6FA" /><stop offset="0.5" stopColor="#7FA8CF" /><stop offset="1" stopColor="#3D5E86" /></linearGradient>
      <linearGradient id="tz-day" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9FD0EE" /><stop offset="1" stopColor="#F9EBCF" /></linearGradient>
      <linearGradient id="tz-dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3B4E86" /><stop offset="0.55" stopColor="#C9718A" /><stop offset="1" stopColor="#F3B77B" /></linearGradient>
      <linearGradient id="tz-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0F1A30" /><stop offset="1" stopColor="#2A3D61" /></linearGradient>
      <linearGradient id="tz-hall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E7EDF2" /><stop offset="1" stopColor="#C9D3DD" /></linearGradient>
      <linearGradient id="tz-road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5D6676" /><stop offset="1" stopColor="#3E4552" /></linearGradient>
      <linearGradient id="tz-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B9D48C" /><stop offset="1" stopColor="#8DB462" /></linearGradient>
      <linearGradient id="tz-cell" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2F8F5C" /><stop offset="0.5" stopColor="#59C489" /><stop offset="1" stopColor="#24734A" /></linearGradient>
      <linearGradient id="tz-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FBE3A6" /><stop offset="1" stopColor={T.sunD} /></linearGradient>
      <radialGradient id="tz-sunglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFF3C9" stopOpacity="0.9" /><stop offset="1" stopColor="#FFF3C9" stopOpacity="0" /></radialGradient>
      <radialGradient id="tz-vig" cx="0.5" cy="0.45" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#2A2010" stopOpacity="0.22" /></radialGradient>
      <filter id="tz-grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" /><feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.22  0 0 0 0 0.18  0 0 0 0.07 0" /></filter>
    </defs>
  </>
)
export const TGrain: React.FC = () => <><rect width={1920} height={1080} filter="url(#tz-grain)" pointerEvents="none" /><rect width={1920} height={1080} fill="url(#tz-vig)" pointerEvents="none" /></>

// ------------------------------------------------------------ backdrops
// # a drafting table: cream sheet with a faint blue grid, a ruler and a pencil at the edge
export const Drafting: React.FC<{ f?: number }> = () => (
  <g>
    <rect width={1920} height={1080} fill="url(#tz-desk)" />
    <rect x={70} y={60} width={1780} height={960} rx={8} fill="#000" opacity={0.12} transform="translate(8 10)" />
    <rect x={70} y={60} width={1780} height={960} rx={8} fill="url(#tz-paper)" />
    {Array.from({ length: 36 }, (_, k) => <line key={'v' + k} x1={70 + k * 50} y1={60} x2={70 + k * 50} y2={1020} stroke={T.blueL} strokeWidth={k % 5 ? 1 : 2} opacity={0.35} />)}
    {Array.from({ length: 20 }, (_, k) => <line key={'h' + k} x1={70} y1={60 + k * 50} x2={1850} y2={60 + k * 50} stroke={T.blueL} strokeWidth={k % 5 ? 1 : 2} opacity={0.35} />)}
    <rect x={1640} y={930} width={190} height={60} fill="none" stroke={T.blue} strokeWidth={2} opacity={0.5} />
    <rect x={120} y={1032} width={760} height={30} rx={4} fill="#EAD9A8" /><g opacity={0.7}>{Array.from({ length: 38 }, (_, k) => <line key={k} x1={130 + k * 20} y1={1032} x2={130 + k * 20} y2={1032 + (k % 5 ? 10 : 18)} stroke={T.woodD} strokeWidth={2} />)}</g>
    <g transform="translate(1180 1046) rotate(-4)"><rect x={0} y={-10} width={420} height={20} rx={4} fill={T.sun} /><path d="M420 -10 L460 0 L420 10 Z" fill="#E8C9A0" /><path d="M448 -3 L460 0 L448 3 Z" fill={T.ink} /><rect x={-26} y={-10} width={26} height={20} rx={4} fill={T.redL} /></g>
  </g>
)
// # a small California workshop, 2003: brick back wall, a roll-up door, a work bench, a lamp
export const Workshop: React.FC = () => (
  <g>
    <rect width={1920} height={FLOOR} fill="#E9D8C0" />
    {Array.from({ length: 18 }, (_, r) => Array.from({ length: 16 }, (_, k) => <rect key={r + '-' + k} x={k * 124 + (r % 2) * 62 - 40} y={r * 50} width={118} height={44} rx={3} fill="#DCC3A3" opacity={0.6} />))}
    <rect x={1180} y={210} width={600} height={FLOOR - 210} fill="#C9B59A" /><rect x={1200} y={230} width={560} height={FLOOR - 230} fill="#A9C7DA" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={1200} y={230 + k * 56} width={560} height={6} fill="#8FA9BC" />)}
    <path d="M1200 780 Q1330 690 1480 760 T1760 720 L1760 900 L1200 900 Z" fill="#B9D48C" opacity={0.9} />
    <rect y={FLOOR} width={1920} height={180} fill="#8C7A64" /><rect y={FLOOR} width={1920} height={10} fill="#6F604E" />
    <g transform="translate(470 0)"><line x1={0} y1={0} x2={0} y2={170} stroke={T.ink} strokeWidth={4} /><path d="M-70 230 Q0 150 70 230 Z" fill={T.ink} /><ellipse cx={0} cy={232} rx={60} ry={10} fill="#FFE9A8" /><path d="M-60 232 L-200 700 L200 700 L60 232 Z" fill="#FFF1C2" opacity={0.18} /></g>
  </g>
)
// # a winter night (December 2008): navy sky, falling snow, a dark office block with one lit window
export const WinterNight: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect width={1920} height={1080} fill="url(#tz-night)" />
    <circle cx={1620} cy={180} r={70} fill="#F3EED9" opacity={0.85} /><circle cx={1650} cy={165} r={64} fill="#16233D" opacity={0.9} />
    <path d="M0 760 L240 700 L480 740 L760 680 L1060 730 L1360 690 L1660 735 L1920 700 L1920 1080 L0 1080 Z" fill="#22355A" />
    <rect y={FLOOR} width={1920} height={180} fill="#DCE6F2" /><rect y={FLOOR} width={1920} height={14} fill="#B9C8DB" />
    {Array.from({ length: 70 }, (_, k) => { const x = ((k * 263) % 1920 + Math.sin(f / 40 + k) * 30 + 1920) % 1920, y = ((k * 137 + f * (1.4 + (k % 4) * 0.4)) % 1120) - 40
      return <circle key={k} cx={x} cy={y} r={2 + (k % 3)} fill={T.snow} opacity={0.75} /> })}
  </g>
)
// # the Fremont factory hall: steel trusses, skylights, a long assembly line on the floor
export const FactoryHall: React.FC<{ f: number; run?: number }> = ({ f, run = 0 }) => (
  <g>
    <rect width={1920} height={FLOOR} fill="url(#tz-hall)" />
    {Array.from({ length: 6 }, (_, k) => <g key={k}><rect x={80 + k * 320} y={90} width={200} height={70} rx={6} fill="#F7FBFF" /><rect x={80 + k * 320} y={90} width={200} height={70} rx={6} fill="none" stroke={T.steelD} strokeWidth={4} /></g>)}
    <path d={Array.from({ length: 13 }, (_, k) => `M${k * 160} 200 L${k * 160 + 80} 260 L${k * 160 + 160} 200`).join(' ')} stroke={T.steelD} strokeWidth={6} fill="none" />
    <rect y={196} width={1920} height={10} fill={T.steelD} /><rect y={258} width={1920} height={8} fill={T.steelD} />
    {[240, 960, 1680].map((x) => <rect key={x} x={x - 16} y={206} width={32} height={FLOOR - 206} fill={T.steel} />)}
    <rect y={FLOOR} width={1920} height={180} fill="#9AA6B3" /><rect y={FLOOR - 70} width={1920} height={70} fill="#5A6573" />
    {Array.from({ length: 26 }, (_, k) => <rect key={k} x={((k * 80 - f * 2 * run) % 2080 + 2080) % 2080 - 80} y={FLOOR - 62} width={40} height={8} rx={4} fill="#F2B840" opacity={0.8} />)}
  </g>
)
// # a sunny California road: sky, hills, palm trees, asphalt with a dashed centre line (moving with `move`)
export const Road: React.FC<{ f: number; move?: number; dusk?: boolean }> = ({ f, move = 0, dusk }) => (
  <g>
    <rect width={1920} height={FLOOR} fill={dusk ? 'url(#tz-dusk)' : 'url(#tz-day)'} />
    {!dusk && <><circle cx={1580} cy={200} r={160} fill="url(#tz-sunglow)" /><circle cx={1580} cy={200} r={64} fill={T.sunL} /></>}
    <path d="M0 640 Q300 520 620 610 T1260 590 T1920 600 L1920 820 L0 820 Z" fill={dusk ? '#7C5A7E' : '#C9DDA0'} />
    <path d="M0 720 Q420 640 900 700 T1920 690 L1920 830 L0 830 Z" fill={dusk ? '#5E4566' : '#A9C97E'} />
    {[180, 700, 1320].map((x, k) => <g key={x} transform={`translate(${x} 0)`}><path d={`M0 800 Q10 650 ${-6 + k * 4} 500`} stroke={dusk ? '#3E2F48' : '#8A6A48'} strokeWidth={14} fill="none" />
      {[-60, -20, 20, 60].map((a) => <path key={a} d={`M${-6 + k * 4} 500 q${a * 1.6} ${-30 + Math.abs(a) * 0.4} ${a * 2.6} ${40 + Math.abs(a) * 0.3}`} stroke={dusk ? '#3E2F48' : '#5E9A4E'} strokeWidth={16} fill="none" strokeLinecap="round" />)}</g>)}
    <rect y={820} width={1920} height={260} fill="url(#tz-road)" /><rect y={820} width={1920} height={10} fill="#C9CDD4" />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={((k * 200 - f * move * 14) % 2400 + 2400) % 2400 - 240} y={950} width={110} height={12} rx={6} fill="#F2E3B3" />)}
  </g>
)
// # a market hall (the price chapter): tall cream columns, a big board on the back wall
export const MarketHall: React.FC = () => (
  <g>
    <rect width={1920} height={FLOOR} fill="#F1E7D4" />
    {[160, 560, 1360, 1760].map((x) => <g key={x}><rect x={x - 50} y={120} width={100} height={FLOOR - 120} fill="#E3D5BA" /><rect x={x - 70} y={100} width={140} height={30} rx={4} fill="#D2C2A2" /><rect x={x - 70} y={FLOOR - 30} width={140} height={30} rx={4} fill="#D2C2A2" /><rect x={x - 20} y={130} width={14} height={FLOOR - 160} fill="#fff" opacity={0.35} /></g>)}
    <rect y={FLOOR} width={1920} height={180} fill="#BFA982" />{Array.from({ length: 10 }, (_, k) => <rect key={k} x={k * 200} y={FLOOR} width={98} height={180} fill="#fff" opacity={0.08} />)}
  </g>
)

// ------------------------------------------------------------ the cars (side view, facing right; wheels turn with `spin`)
const Wheel: React.FC<{ x: number; y: number; r: number; spin: number }> = ({ x, y, r, spin }) => (
  <g transform={`translate(${x} ${y})`}><circle r={r} fill={T.tyre} /><circle r={r * 0.62} fill="url(#tz-steel)" />
    <g transform={`rotate(${spin * 360})`}>{[0, 72, 144, 216, 288].map((a) => <rect key={a} x={-r * 0.08} y={-r * 0.58} width={r * 0.16} height={r * 0.5} rx={r * 0.06} fill={T.steelD} transform={`rotate(${a})`} />)}</g>
    <circle r={r * 0.14} fill={T.steelD} /></g>
)
export type CarKind = 'roadster' | 'sedan' | 'small' | 'suv' | 'cab'
// # one car; x,y = centre of the ground line under it. `color` paints the body, `ghost` = blue pencil outline only (the plan)
export const Car: React.FC<{ kind: CarKind; x: number; y: number; s?: number; o?: number; spin?: number; color?: string; ghost?: number; empty?: boolean; flip?: boolean }> = ({ kind, x, y, s = 1, o = 1, spin = 0, color, ghost = 0, empty, flip }) => {
  if (o <= 0.01) return null
  const L = { roadster: 380, sedan: 470, small: 420, suv: 440, cab: 330 }[kind], H = { roadster: 92, sedan: 118, small: 112, suv: 146, cab: 150 }[kind], r = kind === 'cab' ? 40 : 42
  const fill = color ?? (kind === 'roadster' ? 'url(#tz-red)' : kind === 'sedan' ? 'url(#tz-blue)' : kind === 'small' ? 'url(#tz-white)' : kind === 'suv' ? 'url(#tz-red)' : 'url(#tz-gold)')
  const hl = L / 2, base = -r * 0.55
  // # body outline: low nose, roof line by kind
  const body = kind === 'cab'
    ? `M${-hl} ${base} L${-hl} ${base - 50} Q${-hl + 10} ${-H} ${-hl + 120} ${-H - 6} L${hl - 120} ${-H - 6} Q${hl - 10} ${-H} ${hl} ${base - 50} L${hl} ${base} Z`
    : `M${-hl} ${base} L${-hl + 6} ${base - 44} Q${-hl + 30} ${base - 60} ${-hl + L * 0.24} ${base - 62} L${-hl + L * (kind === 'roadster' ? 0.42 : 0.33)} ${-H} L${hl - L * (kind === 'suv' ? 0.2 : kind === 'roadster' ? 0.4 : 0.3)} ${-H} L${hl - L * 0.14} ${base - 58} Q${hl - 8} ${base - 52} ${hl} ${base - 34} L${hl} ${base} Z`
  const win = kind === 'cab'
    ? `M${-hl + 60} ${base - 56} Q${-hl + 70} ${-H + 18} ${-hl + 130} ${-H + 16} L${hl - 130} ${-H + 16} Q${hl - 70} ${-H + 18} ${hl - 60} ${base - 56} Z`
    : `M${-hl + L * 0.28} ${base - 62} L${-hl + L * (kind === 'roadster' ? 0.44 : 0.36)} ${-H + 12} L${hl - L * (kind === 'suv' ? 0.22 : kind === 'roadster' ? 0.42 : 0.32)} ${-H + 12} L${hl - L * 0.2} ${base - 62} Z`
  return (
    <g opacity={o} transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * s} ${s})`}>
      <ellipse cx={0} cy={4} rx={hl * 1.05} ry={14} fill="#000" opacity={0.18 * (1 - ghost)} />
      <g opacity={1 - ghost}>
        <path d={body} fill={fill} />
        <path d={win} fill="url(#tz-glass)" />
        {!empty && kind !== 'cab' && kind !== 'roadster' && <circle cx={-hl + L * 0.5} cy={-H + 44} r={16} fill="#3A2A22" opacity={0.85} />}
        {kind === 'roadster' && !empty && <circle cx={-hl + L * 0.55} cy={-H + 30} r={15} fill="#3A2A22" opacity={0.85} />}
        <path d={`M${-hl + 10} ${base - 30} L${hl - 10} ${base - 30}`} stroke="#fff" strokeOpacity={0.35} strokeWidth={5} />
        <rect x={hl - 26} y={base - 44} width={22} height={10} rx={4} fill="#FFF3C2" /><rect x={-hl + 2} y={base - 42} width={16} height={10} rx={4} fill={T.redL} />
        {kind !== 'cab' && <line x1={-hl + L * 0.55} y1={base - 60} x2={-hl + L * 0.55} y2={base - 4} stroke="#000" strokeOpacity={0.18} strokeWidth={3} />}
        <Wheel x={-hl + L * 0.2} y={0 - r + 2} r={r} spin={spin} /><Wheel x={hl - L * 0.2} y={0 - r + 2} r={r} spin={spin} />
      </g>
      {ghost > 0.01 && <g opacity={ghost} fill="none" stroke={T.blue} strokeWidth={4} strokeLinejoin="round"><path d={body} /><path d={win} /><circle cx={-hl + L * 0.2} cy={-r + 2} r={r} /><circle cx={hl - L * 0.2} cy={-r + 2} r={r} /></g>}
    </g>
  )
}

// ------------------------------------------------------------ everyday objects
export const Tag: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; bg?: string; ink?: string }> = ({ x, y, text, o = 1, size = 44, bg = T.ink, ink = '#fff' }) => {
  if (o <= 0.01) return null
  const w = text.length * size * 0.5 + size * 1.1
  return <g opacity={o}><rect x={x - w / 2} y={y - size * 0.82} width={w} height={size * 1.28} rx={size * 0.64} fill={bg} /><text x={x} y={y + size * 0.22} textAnchor="middle" fill={ink} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text></g>
}
export const Big: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; o?: number; anchor?: 'middle' | 'start' | 'end' }> = ({ x, y, text, size = 90, color = T.ink, o = 1, anchor = 'middle' }) => o <= 0.01 ? null : (
  <text x={x} y={y} textAnchor={anchor} fill={color} opacity={o} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>
)
export const Cross: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 100, p }) => {
  if (p <= 0.01) return null
  const a = clamp01(p * 2), b = clamp01(p * 2 - 1)
  return <g strokeLinecap="round" stroke={T.red} strokeWidth={r * 0.2}><line x1={x - r} y1={y - r} x2={lerp(x - r, x + r, a)} y2={lerp(y - r, y + r, a)} />{b > 0 && <line x1={x + r} y1={y - r} x2={lerp(x + r, x - r, b)} y2={lerp(y - r, y + r, b)} />}</g>
}
export const Tick: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 50, p }) => p <= 0.01 ? null : (
  <g opacity={clamp01(p * 2)}><circle cx={x} cy={y} r={r} fill={T.green} /><path d={`M${x - r * 0.45} ${y} L${x - r * 0.1} ${y + r * 0.35} L${x + r * 0.5} ${y - r * 0.35}`} stroke="#fff" strokeWidth={r * 0.2} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={200} strokeDashoffset={200 * (1 - clamp01(p))} /></g>
)
export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; p?: number; color?: string; w?: number; dash?: boolean }> = ({ x1, y1, x2, y2, p = 1, color = T.ink, w = 12, dash }) => {
  if (p <= 0.01) return null
  const x = lerp(x1, x2, p), y = lerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1), h = w * 2.4
  return <g><line x1={x1} y1={y1} x2={x - Math.cos(a) * h * 0.6} y2={y - Math.sin(a) * h * 0.6} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash ? `${w * 1.6} ${w * 1.4}` : undefined} />
    <path d={`M${x} ${y} L${x - Math.cos(a - 0.5) * h} ${y - Math.sin(a - 0.5) * h} L${x - Math.cos(a + 0.5) * h} ${y - Math.sin(a + 0.5) * h} Z`} fill={color} /></g>
}
export const Coin: React.FC<{ x: number; y: number; r?: number; o?: number; label?: string }> = ({ x, y, r = 40, o = 1, label = '$' }) => o <= 0.01 ? null : (
  <g opacity={o}><circle cx={x} cy={y + r * 0.12} r={r} fill={T.sunD} /><circle cx={x} cy={y} r={r} fill={T.sun} /><circle cx={x} cy={y} r={r * 0.74} fill="none" stroke={T.sunD} strokeWidth={r * 0.1} />
    <text x={x} y={y + r * 0.36} textAnchor="middle" fill={T.sunD} style={{ font: `400 ${r * (label.length > 2 ? 0.7 : 1.0)}px ${FONT.big}` }}>{label}</text></g>
)
// # a banknote (green); `label` printed in the middle
export const Note: React.FC<{ x: number; y: number; w?: number; h?: number; r?: number; o?: number; label?: string }> = ({ x, y, w = 300, h = 140, r = 0, o = 1, label = '$100' }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x={-w / 2 + 6} y={-h / 2 + 8} width={w} height={h} rx={10} fill="#000" opacity={0.15} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="#BFE3C4" /><rect x={-w / 2 + 12} y={-h / 2 + 12} width={w - 24} height={h - 24} rx={8} fill="none" stroke={T.greenD} strokeWidth={4} />
    <ellipse cx={0} cy={0} rx={h * 0.34} ry={h * 0.34} fill="#9FD3A8" />
    <text x={0} y={h * 0.16} textAnchor="middle" fill={T.greenD} style={{ font: `400 ${h * 0.44}px ${FONT.big}` }}>{label}</text>
  </g>
)
// # a price tag on a string
export const PriceTag: React.FC<{ x: number; y: number; text: string; o?: number; s?: number; r?: number; color?: string }> = ({ x, y, text, o = 1, s = 1, r = -6, color = T.sun }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d={`M-30 0 L0 -50 L${text.length * 26 + 60} -50 L${text.length * 26 + 60} 50 L0 50 Z`} fill={color} />
    <circle cx={4} cy={0} r={10} fill={T.paperL} /><text x={26} y={22} fill={T.ink} style={{ font: `400 64px ${FONT.big}` }}>{text}</text>
  </g>
)
// # a counter of rolling digits (an odometer); `value` shown as text with thousands separators
export const Odometer: React.FC<{ x: number; y: number; value: string; o?: number; s?: number; label?: string }> = ({ x, y, value, o = 1, s = 1, label }) => {
  if (o <= 0.01) return null
  const w = value.length * 58 + 40
  return <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-w / 2 - 14} y={-70} width={w + 28} height={140} rx={24} fill={T.ink} /><rect x={-w / 2} y={-56} width={w} height={112} rx={14} fill="#0E1626" />
    {value.split('').map((ch, k) => <g key={k}>{ch !== ',' && <rect x={-w / 2 + 20 + k * 58} y={-44} width={50} height={88} rx={8} fill="#F7F0E1" />}<text x={-w / 2 + 45 + k * 58} y={26} textAnchor="middle" fill={ch === ',' ? '#F7F0E1' : T.ink} style={{ font: `400 76px ${FONT.big}` }}>{ch}</text></g>)}
    {label && <text x={0} y={112} textAnchor="middle" fill={T.ink} style={{ font: `400 46px ${FONT.big}`, letterSpacing: 3 }}>{label}</text>}
  </g>
}
// # a tear-off calendar page
export const CalPage: React.FC<{ x: number; y: number; top: string; big: string; o?: number; s?: number; color?: string }> = ({ x, y, top, big, o = 1, s = 1, color = T.red }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-170} width={300} height={340} rx={18} fill="#000" opacity={0.14} transform="translate(8 10)" />
    <rect x={-150} y={-170} width={300} height={340} rx={18} fill={T.paperL} /><rect x={-150} y={-170} width={300} height={90} rx={18} fill={color} /><rect x={-150} y={-100} width={300} height={20} fill={color} />
    <text x={0} y={-108} textAnchor="middle" fill="#fff" style={{ font: `400 52px ${FONT.big}`, letterSpacing: 3 }}>{top}</text>
    <text x={0} y={70} textAnchor="middle" fill={T.ink} style={{ font: `400 ${big.length > 3 ? 110 : 150}px ${FONT.big}` }}>{big}</text>
    {[-90, -30, 30, 90].map((cx) => <circle key={cx} cx={cx} cy={-170} r={10} fill={T.steelD} />)}
  </g>
)
// # a wall clock; `h`,`m` in hours/minutes
export const Clock: React.FC<{ x: number; y: number; h: number; m: number; r?: number; o?: number }> = ({ x, y, h, m, r = 110, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <circle r={r + 12} fill={T.ink} /><circle r={r} fill={T.paperL} />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-4} y={-r + 8} width={8} height={k % 3 ? 14 : 24} fill={T.ink} transform={`rotate(${k * 30})`} />)}
    <rect x={-6} y={-r * 0.5} width={12} height={r * 0.55} rx={6} fill={T.ink} transform={`rotate(${(h % 12) * 30 + m * 0.5})`} />
    <rect x={-4} y={-r * 0.78} width={8} height={r * 0.83} rx={4} fill={T.red} transform={`rotate(${m * 6})`} />
    <circle r={10} fill={T.ink} />
  </g>
)
// # a notepad sheet with up to 4 handwritten lines (the plan); each line has its own reveal 0..1
export const Notepad: React.FC<{ x: number; y: number; s?: number; o?: number; lines: [string, number][]; foot?: [string, number]; lit?: number[] }> = ({ x, y, s = 1, o = 1, lines, foot, lit = [] }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-380} y={-300} width={760} height={600} rx={12} fill="#000" opacity={0.14} transform="translate(10 12)" />
    <rect x={-380} y={-300} width={760} height={600} rx={12} fill={T.paperL} />
    {Array.from({ length: 9 }, (_, k) => <line key={k} x1={-380} y1={-200 + k * 60} x2={380} y2={-200 + k * 60} stroke={T.blueL} strokeWidth={2} />)}
    <line x1={-300} y1={-300} x2={-300} y2={300} stroke={T.redL} strokeWidth={3} />
    {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={-340} cy={-250 + k * 70} r={12} fill={T.paperD} />)}
    {lines.map(([t, p], k) => p > 0.01 && <g key={k}>
      {lit[k] ? <rect x={-290} y={-176 + k * 100} width={640 * lit[k]} height={70} rx={10} fill={T.sunL} /> : null}
      <text x={-280} y={-122 + k * 100} fill={T.blueD} opacity={clamp01(p * 3)} style={{ font: `600 46px ${FONT.body}` }}>{t.slice(0, Math.ceil(t.length * clamp01(p)))}</text>
    </g>)}
    {foot && foot[1] > 0.01 && <text x={-280} y={250} fill={T.red} opacity={clamp01(foot[1] * 2)} style={{ font: `800 50px ${FONT.body}` }}>{foot[0]}</text>}
  </g>
)
// # a factory building from outside (sawtooth roof, chimney-free, big doors)
export const Factory: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string; lit?: number }> = ({ x, y, s = 1, o = 1, sign, lit = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={560} ry={26} fill="#000" opacity={0.15} />
    <rect x={-520} y={-300} width={1040} height={300} fill="#E8EDF2" /><rect x={-520} y={-300} width={1040} height={300} fill="none" stroke={T.steelD} strokeWidth={6} />
    <path d={Array.from({ length: 8 }, (_, k) => `M${-520 + k * 130} -300 L${-520 + k * 130} -380 L${-390 + k * 130} -300`).join(' ') + ' Z'} fill={T.steel} stroke={T.steelD} strokeWidth={5} strokeLinejoin="round" />
    {Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${-516 + k * 130} -304 L${-516 + k * 130} -372 L${-430 + k * 130} -318 Z`} fill="#BFE0F5" opacity={0.6 + 0.4 * lit} />)}
    {[-330, -110, 110, 330].map((dx) => <g key={dx}><rect x={dx - 80} y={-200} width={160} height={200} fill="#5A6573" />{Array.from({ length: 8 }, (_, k) => <rect key={k} x={dx - 80} y={-200 + k * 25} width={160} height={4} fill="#3F4854" />)}</g>)}
    {sign && <><rect x={-260} y={-280} width={520} height={64} rx={10} fill={T.ink} /><text x={0} y={-232} textAnchor="middle" fill="#fff" style={{ font: `400 50px ${FONT.big}`, letterSpacing: 4 }}>{sign}</text></>}
  </g>
)
// # a sun with soft rays
export const Sun: React.FC<{ x: number; y: number; r?: number; o?: number; f?: number }> = ({ x, y, r = 80, o = 1, f = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r * 2.4} fill="url(#tz-sunglow)" />
    <g transform={`rotate(${f * 0.4})`}>{Array.from({ length: 12 }, (_, k) => <rect key={k} x={-6} y={-r * 1.6} width={12} height={r * 0.4} rx={6} fill={T.sun} transform={`rotate(${k * 30})`} />)}</g>
    <circle r={r} fill={T.sun} /><circle r={r * 0.8} fill={T.sunL} opacity={0.6} /></g>
)
// # a solar panel on a stand
export const Solar: React.FC<{ x: number; y: number; s?: number; o?: number; glint?: number }> = ({ x, y, s = 1, o = 1, glint = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-8} y={-110} width={16} height={110} fill={T.steelD} />
    <g transform="translate(0 -120) skewX(-18)"><rect x={-130} y={-70} width={260} height={110} rx={6} fill="#24467A" />
      {Array.from({ length: 4 }, (_, i) => Array.from({ length: 2 }, (_, j) => <rect key={i + '-' + j} x={-124 + i * 64} y={-64 + j * 52} width={58} height={46} fill="#2F5E9E" />))}
      <rect x={-130 + 260 * glint - 40} y={-70} width={40} height={110} fill="#fff" opacity={0.35 * Math.sin(Math.PI * glint)} /></g>
  </g>
)
// # a grid battery cabinet (Megapack-like, our own drawing): steel box with doors and a charge bar
export const BigBattery: React.FC<{ x: number; y: number; s?: number; o?: number; charge?: number; label?: string }> = ({ x, y, s = 1, o = 1, charge = 0.5, label }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={300} ry={20} fill="#000" opacity={0.16} />
    <rect x={-280} y={-260} width={560} height={260} rx={10} fill="url(#tz-white)" /><rect x={-280} y={-260} width={560} height={260} rx={10} fill="none" stroke={T.steelD} strokeWidth={5} />
    {[-210, -70, 70, 210].map((dx) => <rect key={dx} x={dx - 60} y={-240} width={120} height={150} rx={6} fill="#EEF2F6" stroke={T.steel} strokeWidth={3} />)}
    <rect x={-240} y={-70} width={480} height={44} rx={22} fill={T.ink} /><rect x={-232} y={-62} width={464 * clamp01(charge)} height={28} rx={14} fill="url(#tz-cell)" />
    {label && <text x={0} y={-150} textAnchor="middle" fill={T.ink} style={{ font: `400 52px ${FONT.big}`, letterSpacing: 3 }}>{label}</text>}
  </g>
)
// # a power line tower
export const Pylon: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = '#6C7787' }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth={6} fill="none">
    <path d="M-60 0 L-14 -360 L14 -360 L60 0 M-40 -120 L40 -120 M-28 -240 L28 -240 M-60 0 L28 -240 M60 0 L-28 -240" /><path d="M-90 -330 L90 -330 M-70 -280 L70 -280" strokeWidth={8} />
  </g>
)
// # a house with windows that light up (`lit` 0..1)
export const Home: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number; color?: string }> = ({ x, y, s = 1, o = 1, lit = 0, color = '#E8C9A0' }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-120} width={180} height={120} fill={color} /><path d="M-110 -116 L0 -200 L110 -116 Z" fill={T.redD} />
    {[-50, 50].map((dx) => <rect key={dx} x={dx - 26} y={-96} width={52} height={44} rx={4} fill={lit > 0.5 ? '#FFE08A' : '#5E6E86'} />)}
    <rect x={-22} y={-50} width={44} height={50} rx={4} fill={T.woodD} />
    {lit > 0.01 && <circle cx={0} cy={-80} r={120} fill="#FFE08A" opacity={0.18 * lit} />}
  </g>
)
// # a small shop front (the made-up shop in the price chapter)
export const Shop: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string }> = ({ x, y, s = 1, o = 1, sign = 'SHOP' }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={260} ry={18} fill="#000" opacity={0.15} />
    <rect x={-240} y={-320} width={480} height={320} fill="#F4E3C6" /><rect x={-240} y={-320} width={480} height={70} fill={T.teal} />
    <text x={0} y={-268} textAnchor="middle" fill="#fff" style={{ font: `400 52px ${FONT.big}`, letterSpacing: 4 }}>{sign}</text>
    <path d={Array.from({ length: 8 }, (_, k) => `M${-240 + k * 60} -250 q30 40 60 0`).join(' ')} fill={T.red} stroke={T.redD} strokeWidth={3} />
    <rect x={-200} y={-190} width={220} height={150} rx={6} fill="#BFE0F5" /><rect x={60} y={-190} width={120} height={190} rx={6} fill={T.woodD} /><circle cx={160} cy={-90} r={8} fill={T.sun} />
  </g>
)
// # a humanoid robot (our own simple design: white shell, dark face plate) — `wave` lifts the right arm
export const Robot: React.FC<{ x: number; y: number; s?: number; o?: number; wave?: number; f?: number }> = ({ x, y, s = 1, o = 1, wave = 0, f = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={90} ry={14} fill="#000" opacity={0.18} />
    {[-34, 34].map((dx) => <g key={dx}><rect x={dx - 20} y={-250} width={40} height={250} rx={18} fill="url(#tz-white)" /><rect x={dx - 26} y={-24} width={52} height={24} rx={10} fill={T.ink} /></g>)}
    <rect x={-80} y={-470} width={160} height={240} rx={50} fill="url(#tz-white)" /><rect x={-50} y={-430} width={100} height={60} rx={18} fill={T.ink} opacity={0.12} />
    <g transform={`rotate(${-8} -96 -440)`}><rect x={-118} y={-450} width={36} height={210} rx={18} fill="url(#tz-white)" /></g>
    <g transform={`rotate(${lerp(8, -150, wave) + Math.sin(f / 6) * 10 * wave} 96 -440)`}><rect x={82} y={-450} width={36} height={210} rx={18} fill="url(#tz-white)" /><circle cx={100} cy={-236} r={20} fill={T.ink} /></g>
    <rect x={-14} y={-500} width={28} height={36} fill={T.steelD} />
    <rect x={-62} y={-600} width={124} height={110} rx={50} fill="url(#tz-white)" /><rect x={-50} y={-580} width={100} height={60} rx={26} fill={T.ink} />
    <rect x={-34} y={-560} width={68} height={8} rx={4} fill={T.blueL} opacity={0.6 + 0.4 * Math.sin(f / 10)} />
  </g>
)
// # a money bag with a label
export const MoneyBag: React.FC<{ x: number; y: number; s?: number; o?: number; label?: string }> = ({ x, y, s = 1, o = 1, label }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={110} ry={16} fill="#000" opacity={0.16} />
    <path d="M-40 -230 Q0 -260 40 -230 L26 -196 Q120 -150 116 -70 Q112 0 0 0 Q-112 0 -116 -70 Q-120 -150 -26 -196 Z" fill="#C9A26A" /><path d="M-30 -200 L30 -200" stroke="#8A6238" strokeWidth={12} strokeLinecap="round" />
    <text x={0} y={-60} textAnchor="middle" fill="#6B4A28" style={{ font: `400 ${label && label.length > 4 ? 52 : 80}px ${FONT.big}` }}>{label ?? '$'}</text>
  </g>
)
// # a giant cheque
export const Cheque: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; to: string; amount: string; from: string }> = ({ x, y, s = 1, r = 0, o = 1, to, amount, from }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-300} y={-140} width={600} height={280} rx={14} fill="#000" opacity={0.14} transform="translate(8 10)" />
    <rect x={-300} y={-140} width={600} height={280} rx={14} fill="#E4F1EA" /><rect x={-300} y={-140} width={600} height={56} rx={14} fill={T.greenD} /><rect x={-300} y={-100} width={600} height={16} fill={T.greenD} />
    <text x={-276} y={-100} fill="#fff" style={{ font: `400 38px ${FONT.big}`, letterSpacing: 3 }}>{from}</text>
    <text x={-270} y={-20} fill={T.inkSoft} style={{ font: `600 32px ${FONT.body}` }}>PAY TO: {to}</text>
    <text x={0} y={90} textAnchor="middle" fill={T.ink} style={{ font: `400 110px ${FONT.big}` }}>{amount}</text>
  </g>
)
// # a pie of share slices; `n` slices, `sold` how many are pulled out (0..n) with `t` 0..1
export const SharePie: React.FC<{ x: number; y: number; r?: number; n: number; sold: number; t: number; o?: number }> = ({ x, y, r = 200, n, sold, t, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={r + 30} rx={r * 1.1} ry={24} fill="#000" opacity={0.15} />
    {Array.from({ length: n }, (_, k) => { const a0 = (k / n) * Math.PI * 2 - Math.PI / 2, a1 = ((k + 1) / n) * Math.PI * 2 - Math.PI / 2, am = (a0 + a1) / 2
      const out = k < sold ? easeOut(t) * r * 0.32 : 0, dx = Math.cos(am) * out, dy = Math.sin(am) * out
      return <path key={k} transform={`translate(${dx} ${dy})`} d={`M0 0 L${Math.cos(a0) * r} ${Math.sin(a0) * r} A${r} ${r} 0 0 1 ${Math.cos(a1) * r} ${Math.sin(a1) * r} Z`} fill={k < sold ? T.sun : k % 2 ? T.red : '#E25A52'} stroke={T.paperL} strokeWidth={6} /> })}
  </g>
)
// # a balance scale; tilt in degrees (+ = right pan down)
export const Scale: React.FC<{ x: number; y: number; s?: number; o?: number; tilt?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, s = 1, o = 1, tilt = 0, left, right }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-16} y={-420} width={32} height={420} fill={T.woodD} /><rect x={-140} y={-26} width={280} height={26} rx={10} fill={T.woodD} />
    <g transform={`translate(0 -420) rotate(${tilt})`}><rect x={-380} y={-12} width={760} height={24} rx={12} fill="url(#tz-gold)" />
      {[-360, 360].map((d, k) => <g key={d} transform={`translate(${d} 0) rotate(${-tilt})`}><line x1={0} y1={0} x2={-110} y2={160} stroke={T.sunD} strokeWidth={4} /><line x1={0} y1={0} x2={110} y2={160} stroke={T.sunD} strokeWidth={4} /><path d="M-140 160 L140 160 L104 206 L-104 206 Z" fill={T.sun} /><g transform="translate(0 160)">{k ? right : left}</g></g>)}
    </g>
  </g>
)
// # a small figure on a round pedestal (crowds), coloured shirt
export const Mini: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = T.blue }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={40} ry={12} fill={T.paperDD} /><rect x={-22} y={-80} width={44} height={70} rx={20} fill={color} /><circle cx={0} cy={-100} r={22} fill="#E6B990" />
  </g>
)
// # a blueprint "pencil line" draw-on helper: returns a dash offset for a path of length `len`
export const draw = (p: number, len = 2000) => ({ strokeDasharray: len, strokeDashoffset: len * (1 - clamp01(p)) })
// # a short blue-pencil stroke under the headline on a spoken key word (gap filler; fades after ~1 s)
export const Mark: React.FC<{ f: number; at: number[]; y?: number; w?: number }> = ({ f, at, y = 214, w = 420 }) => {
  const a = at.filter((t) => f >= t && f < t + 26).pop()
  if (a === undefined) return null
  const p = clamp01((f - a) / 10), o = 1 - clamp01((f - a - 14) / 12), x0 = 960 - w / 2
  return <g opacity={o}><path d={`M${x0} ${y} q${w * 0.25} -8 ${w * 0.5} 0 t${w * 0.5} 0`} stroke={T.blue} strokeWidth={8} fill="none" strokeLinecap="round" style={draw(p, w * 1.1)} /></g>
}
