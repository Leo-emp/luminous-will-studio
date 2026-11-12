// ============================================================
// KIT — "Why Billionaires Take a $1 Salary" (Short, 1080×1920), drawn fresh for this video (r82/r83).
// The world: a GILDED ART-DECO HALL. Ivory walls with gold sunburst fans and emerald wainscot by day; a deep
// emerald night with gold deco lines and lit city windows for the risk/borrowing scenes. The money story's cast
// of objects: a long green cheque on a brass conveyor, red TAX scissors that snip it, a tiny payslip that reads $1,
// gold-edged share certificates that pile up, a brick-built company tower, a lender's deco counter with a lock box,
// a tax meter, a gated house under a shield. Every prop is drawn around its own origin (bottom centre for things that
// stand on the floor). Safe area: x 60–940, y 220–1270 (captions y 1290–1490 are drawn by the engine).
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeOut, lerp, on, span } from '../kit'

export const W = 1080, H = 1920, CX = 500, FLOOR = 1270
export const TXT = (size: number, weight = 400): React.CSSProperties => ({ font: `${weight} ${size}px "Bebas Neue"`, letterSpacing: 2 })

export const IVORY = '#F7EEDC', IVORY2 = '#EADBC0', EMER = '#1F5C4A', EMER2 = '#143F33', EMER3 = '#2E7A62'
export const GOLD = '#D9A93E', GOLD2 = '#A87A22', GOLDL = '#F3D27A', INK = '#1C2230', RED = '#C8473B', RED2 = '#9A3128'
export const GREEN = '#3E9A62', BILL = '#A9D9A0', BILL2 = '#4D8A4A', NIGHT = '#0F2A2A', NIGHT2 = '#0A1C1E', SHADE = 'rgba(30,24,10,0.20)'

// # visible from a to b with clean fades (fully gone by b)
export const win = (f: number, a: number, b: number, d = 7) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))

// ================================================================== WORLD
export type Tone = 'day' | 'night'
export const DecoWorld: React.FC<{ f: number; id: string; tone?: Tone }> = ({ f, id, tone = 'day' }) => {
  const day = tone === 'day'
  const wall0 = day ? IVORY : '#173C3A', wall1 = day ? IVORY2 : NIGHT2
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={wall0} /><stop offset="100%" stopColor={wall1} /></linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={day ? EMER3 : '#1E4A44'} /><stop offset="100%" stopColor={day ? EMER2 : '#071415'} /></linearGradient>
        <radialGradient id={`${id}-lamp`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFF1C4" stopOpacity={day ? 0.55 : 0.4} /><stop offset="100%" stopColor="#FFF1C4" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.42" r="0.8"><stop offset="62%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor={day ? '#5A4426' : '#000'} stopOpacity={day ? 0.22 : 0.5} /></radialGradient>
      </defs>
      <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-wall)`} />
      {/* # night: tall deco windows with a lit city behind */}
      {!day && [180, 540, 900].map((x, k) => <g key={k}>
        <path d={`M${x - 130} 1120 L${x - 130} 420 L${x} 300 L${x + 130} 420 L${x + 130} 1120 Z`} fill="#0B1A2E" stroke={GOLD2} strokeWidth={6} />
        {Array.from({ length: 14 }, (_, i) => <rect key={i} x={x - 110 + (i % 4) * 56} y={1080 - Math.floor(i / 4) * 150 - (i % 3) * 40} width={22} height={30} fill="#F3D27A" opacity={0.25 + 0.35 * ((i * 7 + k) % 3) / 2 + 0.1 * Math.sin(f / 40 + i)} />)}
        {[-65, 0, 65].map((d) => <line key={d} x1={x + d} y1={380} x2={x + d} y2={1120} stroke={GOLD2} strokeWidth={3} opacity={0.6} />)}
      </g>)}
      {/* # day: gold sunburst fans along the top, deco pilasters */}
      {day && [140, 500, 860].map((x, k) => <g key={k} opacity={0.55}>
        {Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (i / 8); return <line key={i} x1={x} y1={250} x2={x + Math.cos(a) * 150} y2={250 - Math.sin(a) * 150} stroke={GOLD} strokeWidth={5} /> })}
        <path d={`M${x - 160} 250 A160 160 0 0 1 ${x + 160} 250`} fill="none" stroke={GOLD2} strokeWidth={6} />
      </g>)}
      {[60, 1020].map((x) => <g key={x}><rect x={x - 22} y={250} width={44} height={FLOOR - 250} fill={day ? '#E3CFA8' : '#123332'} /><rect x={x - 22} y={250} width={10} height={FLOOR - 250} fill="#FFFFFF" opacity={day ? 0.25 : 0.05} /></g>)}
      {/* # pendant lamps */}
      {[150, 900].map((x) => <g key={x}><line x1={x} y1={-20} x2={x} y2={160} stroke={GOLD2} strokeWidth={3} /><circle cx={x} cy={190} r={90} fill={`url(#${id}-lamp)`} /><path d={`M${x - 30} 160 L${x + 30} 160 L${x + 18} 202 L${x - 18} 202 Z`} fill={GOLD} /></g>)}
      {/* # emerald wainscot + floor */}
      <rect x={-40} y={1090} width={W + 80} height={14} fill={GOLD} opacity={day ? 0.8 : 0.5} />
      <rect x={-40} y={1104} width={W + 80} height={FLOOR - 1104} fill={day ? '#D9C49C' : '#0D2423'} opacity={0.6} />
      <rect x={-40} y={FLOOR} width={W + 80} height={H - FLOOR + 40} fill={`url(#${id}-floor)`} />
      <rect x={-40} y={FLOOR} width={W + 80} height={8} fill={GOLDL} opacity={0.7} />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${i * 140 - 60} ${FLOOR + 8} L${i * 140 - 160} ${H}`} stroke={GOLD2} strokeWidth={3} opacity={0.35} />)}
    </g>
  )
}
export const Vig: React.FC<{ id: string }> = ({ id }) => <rect x={-40} y={-40} width={W + 80} height={H + 80} fill={`url(#${id}-vig)`} pointerEvents="none" />

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
// # a deco plaque: ivory/emerald plate with a gold frame (attached by the caller to the thing it names)
export const Plaque: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; col?: string; tc?: string }> = ({ x, y, t, o = 1, size = 44, col = EMER, tc = IVORY }) => {
  if (o <= 0.001) return null
  const w = Math.max(110, t.length * size * 0.47 + 56), h = size + 30
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2 + 6} y={-h / 2 + 8} width={w} height={h} rx={10} fill={SHADE} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill={col} stroke={GOLD} strokeWidth={4} />
    <rect x={-w / 2 + 7} y={-h / 2 + 7} width={w - 14} height={h - 14} rx={6} fill="none" stroke={GOLDL} strokeWidth={1.5} opacity={0.7} />
    <text y={size * 0.36} textAnchor="middle" fill={tc} style={TXT(size)}>{t}</text>
  </g>
}
// # a red cross drawn over a thing (r68), comfortable size
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s * (0.85 + 0.15 * o)})`} opacity={o}>
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke={IVORY} strokeWidth={30} strokeLinecap="round" />
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke={RED} strokeWidth={18} strokeLinecap="round" />
  </g>) : null
// # a green tick
export const Tick: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={52} fill={GREEN} stroke={IVORY} strokeWidth={6} /><path d="M-24 2 L-6 22 L28 -18" fill="none" stroke={IVORY} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
  </g>) : null
// # a deco step medallion: a gold sunburst disc with the step number
export const Medallion: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; lit?: number }> = ({ x, y, n, s = 1, o = 1, lit = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: 16 }, (_, i) => <path key={i} d="M0 -96 L10 -70 L-10 -70 Z" fill={GOLD} transform={`rotate(${i * 22.5})`} opacity={0.5 + 0.5 * lit} />)}
    <circle r={72} fill={lit > 0.5 ? EMER : '#7A8C84'} stroke={GOLD} strokeWidth={7} />
    <text y={34} textAnchor="middle" fill={GOLDL} style={TXT(96)}>{n}</text>
  </g>) : null
export const ArrowUp: React.FC<{ x: number; y: number; s?: number; o?: number; col?: string }> = ({ x, y, s = 1, o = 1, col = GREEN }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-26 60 L-26 -10 L-60 -10 L0 -80 L60 -10 L26 -10 L26 60 Z" fill={col} stroke={IVORY} strokeWidth={5} strokeLinejoin="round" /></g>) : null

// ================================================================== MONEY THINGS
// # a long green cheque (centre origin); cut 0..1 snips a slice off its right end (the slice falls away)
export const Cheque: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; amount?: string; to?: string; cut?: number; w?: number }> = ({ x, y, s = 1, r = 0, o = 1, amount = '$', to = 'YOU', cut = 0, w = 440 }) => {
  const keep = w * (1 - 0.3 * Math.min(1, cut * 1.5))
  const fall = easeOut(Math.max(0, cut - 0.3) / 0.7)
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-w / 2 + 8} y={-80} width={keep} height={170} rx={10} fill={SHADE} />
    <rect x={-w / 2} y={-90} width={keep} height={170} rx={10} fill="#DDF0D5" stroke={BILL2} strokeWidth={4} />
    <rect x={-w / 2} y={-90} width={keep} height={34} rx={10} fill={BILL2} />
    <text x={-w / 2 + 20} y={-63} fill={IVORY} style={TXT(26)}>PAYCHECK</text>
    <text x={-w / 2 + 20} y={-10} fill={INK} style={TXT(30)}>PAY TO: {to}</text>
    <line x1={-w / 2 + 20} y1={40} x2={-w / 2 + keep - 30} y2={40} stroke={BILL2} strokeWidth={3} />
    <text x={-w / 2 + 20} y={30} fill={INK} style={TXT(48)}>{amount}</text>
    {cut > 0 && <g transform={`translate(${-w / 2 + keep + 6 + fall * 30} ${fall * 260}) rotate(${fall * 28})`} opacity={1 - fall * 0.6}>
      <rect x={0} y={-90} width={w - keep} height={170} rx={8} fill="#F2C9C2" stroke={RED} strokeWidth={4} />
      <text x={(w - keep) / 2} y={10} textAnchor="middle" fill={RED2} style={TXT(40)}>TAX</text>
    </g>}
  </g>
}
// # the red TAX scissors (centre origin); open 0..1, snip closes them
export const Scissors: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; open?: number }> = ({ x, y, s = 1, r = 0, o = 1, open = 0.5 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {[1, -1].map((k) => <g key={k} transform={`rotate(${k * 16 * open})`}>
      <path d={`M0 0 L150 ${-k * 10} L150 ${k * 6} Z`} fill="#D9DEE6" stroke="#8C95A3" strokeWidth={3} />
      <path d={`M0 0 L-40 ${k * 20}`} stroke={RED2} strokeWidth={14} strokeLinecap="round" />
      <circle cx={-70} cy={k * 34} r={30} fill="none" stroke={RED} strokeWidth={16} />
    </g>)}
    <circle r={9} fill={INK} />
    <g transform="translate(-70 -92)"><rect x={-44} y={-22} width={88} height={40} rx={8} fill={RED} stroke={IVORY} strokeWidth={3} /><text y={10} textAnchor="middle" fill={IVORY} style={TXT(30)}>TAX</text></g>
  </g>) : null
// # a dollar bill (centre origin)
export const Dollar: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-52} width={240} height={110} rx={10} fill={SHADE} transform="translate(6 8)" />
    <rect x={-120} y={-55} width={240} height={110} rx={10} fill={BILL} stroke={BILL2} strokeWidth={4} />
    <rect x={-104} y={-40} width={208} height={80} rx={6} fill="none" stroke={BILL2} strokeWidth={2.5} />
    <ellipse cx={0} cy={0} rx={32} ry={34} fill="#8FC788" stroke={BILL2} strokeWidth={3} />
    <text y={14} textAnchor="middle" fill="#2F5F2D" style={TXT(42)}>$1</text>
    <text x={-86} y={-14} fill="#2F5F2D" style={TXT(26)}>1</text><text x={86} y={34} textAnchor="end" fill="#2F5F2D" style={TXT(26)}>1</text>
  </g>) : null
// # a payslip card (centre origin): name, company, the salary line lights and the amount stamps in
export const Payslip: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; name: string; co: string; lit?: number; amt?: string; amtO?: number; sub?: string }> = ({ x, y, s = 1, r = 0, o = 1, name, co, lit = 0, amt = '$1', amtO = 0, sub }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-210} y={-150} width={420} height={300} rx={12} fill={SHADE} transform="translate(8 10)" />
    <rect x={-210} y={-150} width={420} height={300} rx={12} fill="#FFFDF6" stroke={GOLD2} strokeWidth={4} />
    <rect x={-210} y={-150} width={420} height={70} rx={12} fill={EMER} /><rect x={-210} y={-96} width={420} height={16} fill={EMER} />
    <text x={0} y={-104} textAnchor="middle" fill={GOLDL} style={TXT(40)}>{name}</text>
    <text x={0} y={-44} textAnchor="middle" fill={INK} style={TXT(32)}>{co}</text>
    <rect x={-186} y={-14} width={372} height={70} rx={8} fill={GOLDL} opacity={0.25 + 0.75 * lit} />
    <text x={-170} y={36} fill={INK} style={TXT(44)}>SALARY</text>
    <g opacity={amtO} transform={`translate(120 22) scale(${0.7 + 0.3 * amtO})`}><text y={22} textAnchor="middle" fill={RED2} style={TXT(76)}>{amt}</text></g>
    <text x={0} y={110} textAnchor="middle" fill="#6B6A60" style={TXT(28)}>{sub ?? 'NO BONUS · NO STOCK AWARDS'}</text>
  </g>) : null
// # a share certificate (centre origin): ivory, gold deco border, red seal
export const Cert: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; glow?: number; t?: string }> = ({ x, y, s = 1, r = 0, o = 1, glow = 0, t = 'SHARE' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {glow > 0 && <rect x={-130} y={-88} width={260} height={176} rx={16} fill={GOLDL} opacity={0.5 * glow} />}
    <rect x={-112} y={-72} width={224} height={144} rx={8} fill="#FFF8E6" stroke={GOLD} strokeWidth={6} />
    <rect x={-98} y={-58} width={196} height={116} rx={4} fill="none" stroke={GOLD2} strokeWidth={2} strokeDasharray="6 4" />
    <text x={-10} y={-14} textAnchor="middle" fill={EMER} style={TXT(40)}>{t}</text>
    <rect x={-74} y={8} width={110} height={8} rx={4} fill="#C9B88E" /><rect x={-74} y={26} width={80} height={8} rx={4} fill="#C9B88E" />
    <circle cx={66} cy={26} r={22} fill={RED} stroke={GOLDL} strokeWidth={3} />
  </g>) : null
// # a pile of share certificates standing on (x, y) — n layers, the top ones glow when `glow`
export const CertPile: React.FC<{ x: number; y: number; n: number; s?: number; o?: number; glow?: number; tint?: number }> = ({ x, y, n, s = 1, o = 1, glow = 0, tint = 0 }) => {
  if (o <= 0.001) return null
  const layers = Math.max(1, Math.round(n))
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={150} ry={22} fill={SHADE} />
    {Array.from({ length: layers }, (_, i) => { const dx = Math.sin(i * 1.7) * 10
      return <g key={i} transform={`translate(${dx} ${-12 - i * 17})`}>
        <rect x={-120} y={-10} width={240} height={20} rx={4} fill={i % 2 ? '#FFF3D6' : '#FBE9C2'} stroke={GOLD2} strokeWidth={2} />
        <rect x={-120} y={-10} width={240} height={20} rx={4} fill={GREEN} opacity={tint * (i > layers * 0.45 ? 0.55 : 0)} />
      </g> })}
    <g transform={`translate(0 ${-24 - layers * 17})`}><Cert x={0} y={-60} s={0.9} glow={glow} /></g>
  </g>
}
// # a tall column of cash bundles (Ana's salary), bottom centre; top share in red = taxed slice
export const CashColumn: React.FC<{ x: number; y: number; h: number; o?: number; red?: number; redTop?: number }> = ({ x, y, h, o = 1, red = 0, redTop = 0.36 }) => {
  if (o <= 0.001) return null
  const n = Math.max(1, Math.round(h / 34))
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={120} ry={18} fill={SHADE} />
    {Array.from({ length: n }, (_, i) => { const top = i >= n * (1 - redTop)
      return <g key={i} transform={`translate(0 ${-20 - i * 34})`}>
        <rect x={-100} y={-16} width={200} height={32} rx={5} fill={top && red > 0 ? (red > 0.5 ? '#F0B8AE' : BILL) : BILL} stroke={top && red > 0.5 ? RED : BILL2} strokeWidth={3} />
        <rect x={-18} y={-16} width={36} height={32} fill={top && red > 0.5 ? RED : '#E8D9A8'} opacity={0.9} />
      </g> })}
  </g>
}
// # the company as a tower of bricks (bottom centre); one brick slides out (`out` 0..1) and glows
export const BrickTower: React.FC<{ x: number; y: number; o?: number; out?: number; name?: string; build?: number }> = ({ x, y, o = 1, out = 0, name = 'COMPANY', build = 1 }) => {
  if (o <= 0.001) return null
  const cols = 5, rows = 9, bw = 92, bh = 54
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={300} ry={30} fill={SHADE} />
    {Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, k) => {
      const i = r * cols + k, show = on(build * 60, i * 1.2, 4)
      const isOut = r === 5 && k === 4
      const dx = isOut ? out * 230 : 0, dy = isOut ? -out * 40 : 0
      return show > 0.01 ? <g key={i} opacity={show} transform={`translate(${dx} ${dy})`}>
        <rect x={-cols * bw / 2 + k * bw + (r % 2 ? 10 : 0) - 5} y={-20 - (r + 1) * bh} width={bw - 6} height={bh - 6} rx={6} fill={isOut && out > 0.1 ? GOLDL : (r + k) % 3 ? '#3E8C72' : EMER3} stroke={isOut && out > 0.1 ? GOLD2 : EMER2} strokeWidth={3} />
        <rect x={-cols * bw / 2 + k * bw + (r % 2 ? 10 : 0) - 5} y={-20 - (r + 1) * bh} width={bw - 6} height={10} rx={5} fill="#FFFFFF" opacity={0.18} />
      </g> : null
    }))}
    <path d={`M${-cols * bw / 2 - 10} ${-20 - rows * bh - 6} L0 ${-20 - rows * bh - 90} L${cols * bw / 2 + 20} ${-20 - rows * bh - 6} Z`} fill={GOLD} stroke={GOLD2} strokeWidth={4} />
    <text x={4} y={-20 - rows * bh - 30} textAnchor="middle" fill={EMER2} style={TXT(36)}>{name}</text>
  </g>
}
// # a filing folder on a table (centre origin)
export const Filing: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = 'META FILING' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-90} width={260} height={180} rx={10} fill={SHADE} transform="translate(6 8)" />
    <path d="M-130 -90 L-40 -90 L-20 -110 L130 -110 L130 90 L-130 90 Z" fill={GOLD} stroke={GOLD2} strokeWidth={4} />
    <rect x={-110} y={-70} width={220} height={150} rx={4} fill="#FFFDF6" />
    <text y={-28} textAnchor="middle" fill={EMER} style={TXT(34)}>{t}</text>
    <text y={8} textAnchor="middle" fill="#7A7466" style={TXT(24)}>SEC · 2026</text>
    {[0, 1].map((k) => <rect key={k} x={-80} y={28 + k * 20} width={k ? 110 : 160} height={8} rx={4} fill="#CFC4A8" />)}
  </g>) : null
// # a tax meter (centre origin): needle from 0 (left) to 1 (right); reads `t`
export const Meter: React.FC<{ x: number; y: number; v: number; s?: number; o?: number; t?: string }> = ({ x, y, v, s = 1, o = 1, t }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-130 0 A130 130 0 0 1 130 0 Z" fill="#FFFDF6" stroke={GOLD2} strokeWidth={6} />
    <path d="M-110 0 A110 110 0 0 1 -40 -103" fill="none" stroke={GREEN} strokeWidth={16} />
    <path d="M40 -103 A110 110 0 0 1 110 0" fill="none" stroke={RED} strokeWidth={16} />
    <line x1={0} y1={0} x2={Math.cos(Math.PI * (1 - v)) * 100} y2={-Math.sin(Math.PI * (1 - v)) * 100} stroke={INK} strokeWidth={8} strokeLinecap="round" />
    <circle r={12} fill={INK} />
    <text y={-40} textAnchor="middle" fill={INK} style={TXT(30)}>TAX</text>
    {t && <text y={62} textAnchor="middle" fill={v < 0.05 ? GREEN : RED2} style={TXT(60)}>{t}</text>}
  </g>) : null
// # a lender's deco counter (bottom centre at floor), width w
export const Counter: React.FC<{ x: number; y: number; w?: number; o?: number }> = ({ x, y, w = 560, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2} y={-250} width={w} height={250} fill="#5B3B26" />
    <rect x={-w / 2} y={-262} width={w} height={22} rx={4} fill={GOLD} />
    {Array.from({ length: Math.floor(w / 110) }, (_, i) => <path key={i} d={`M${-w / 2 + 30 + i * 110} -40 L${-w / 2 + 30 + i * 110} -200 L${-w / 2 + 85 + i * 110} -230 L${-w / 2 + 140 + i * 110 - 30} -200 L${-w / 2 + 140 + i * 110 - 30} -40 Z`} fill="none" stroke={GOLD2} strokeWidth={4} opacity={0.8} />)}
    <text x={0} y={-130} textAnchor="middle" fill={GOLDL} style={TXT(48)}>LENDER</text>
  </g>) : null
// # a lock box (bottom centre) holding certificates; `lock` 0..1 swings the padlock shut
export const LockBox: React.FC<{ x: number; y: number; s?: number; o?: number; lock?: number; t?: string }> = ({ x, y, s = 1, o = 1, lock = 0, t }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={150} ry={16} fill={SHADE} />
    <rect x={-130} y={-170} width={260} height={170} rx={14} fill="#5E6B78" stroke="#3B4550" strokeWidth={6} />
    <Cert x={0} y={-178} s={0.8} r={-3} /><Cert x={10} y={-196} s={0.8} r={4} />
    <rect x={-140} y={-120} width={280} height={30} rx={6} fill="#8794A2" />
    <g transform={`translate(0 ${-60})`}>
      <path d={`M-30 -20 L-30 -${44 + (1 - lock) * 30} A30 30 0 0 1 30 -${44 + (1 - lock) * 30} L30 -20`} fill="none" stroke="#C9CED6" strokeWidth={12} />
      <rect x={-46} y={-26} width={92} height={70} rx={10} fill={GOLD} stroke={GOLD2} strokeWidth={4} /><circle cy={6} r={9} fill={INK} />
    </g>
    {t && <text y={-138} textAnchor="middle" fill={IVORY} style={TXT(30)}>{t}</text>}
  </g>) : null
// # a cash bag (bottom centre)
export const CashBag: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string }> = ({ x, y, s = 1, o = 1, r = 0, t = '$' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={2} rx={90} ry={14} fill={SHADE} />
    <path d="M-80 0 Q-100 -120 -30 -150 L30 -150 Q100 -120 80 0 Z" fill="#C9A86A" stroke="#8C6A35" strokeWidth={5} />
    <path d="M-34 -150 L-50 -190 L50 -190 L34 -150 Z" fill="#B38F52" stroke="#8C6A35" strokeWidth={5} />
    <rect x={-40} y={-160} width={80} height={14} rx={6} fill={GOLD2} />
    <text y={-50} textAnchor="middle" fill={EMER2} style={TXT(76)}>{t}</text>
  </g>) : null
// # a coin
export const Coin: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = '$' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={5} r={34} fill={GOLD2} /><circle r={34} fill={GOLD} /><circle r={25} fill="none" stroke={GOLD2} strokeWidth={4} />
    <text y={12} textAnchor="middle" fill={GOLD2} style={TXT(36)}>{t}</text>
  </g>) : null
// # a gated house under a shield dome (bottom centre); shield 0..1 grows the dome, guards 0..1 bring two guards' posts
export const SafeHouse: React.FC<{ x: number; y: number; s?: number; o?: number; shield?: number; f: number }> = ({ x, y, s = 1, o = 1, shield = 0, f }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={330} ry={30} fill={SHADE} />
    <rect x={-200} y={-260} width={400} height={260} fill="#F3E7CF" stroke={GOLD2} strokeWidth={5} />
    <path d="M-240 -255 L0 -400 L240 -255 Z" fill={EMER} stroke={GOLD} strokeWidth={6} />
    {[-130, 130].map((wx) => <rect key={wx} x={wx - 40} y={-200} width={80} height={80} fill="#F3D27A" stroke={GOLD2} strokeWidth={4} />)}
    <rect x={-40} y={-140} width={80} height={140} fill="#5B3B26" />
    {/* # gate */}
    {Array.from({ length: 13 }, (_, i) => <rect key={i} x={-320 + i * 53} y={-90} width={8} height={90} fill={INK} />)}
    <rect x={-320} y={-90} width={640} height={8} fill={INK} />
    {shield > 0 && <g opacity={shield}>
      <path d={`M-330 0 A330 ${430 * shield} 0 0 1 330 0`} fill="#8FD3E8" fillOpacity={0.18} stroke="#8FD3E8" strokeWidth={6} />
      <path d={`M-250 ${-180 * shield} A260 ${300 * shield} 0 0 1 -60 ${-400 * shield}`} fill="none" stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={10} strokeLinecap="round" />
      <circle cx={Math.sin(f / 30) * 200} cy={-380 * shield} r={6} fill="#FFFFFF" opacity={0.6} />
    </g>}
  </g>) : null
// # tiny conveyor belt (brass rollers) between x0 and x1 at y
export const Conveyor: React.FC<{ x0: number; x1: number; y: number; f: number; o?: number }> = ({ x0, x1, y, f, o = 1 }) => o > 0.001 ? (
  <g opacity={o}>
    <rect x={x0} y={y} width={x1 - x0} height={26} rx={13} fill="#3B3A36" />
    {Array.from({ length: Math.floor((x1 - x0) / 44) }, (_, i) => <circle key={i} cx={x0 + 22 + i * 44} cy={y + 13} r={10} fill={GOLD} stroke={GOLD2} strokeWidth={2} transform={`rotate(${f * 6} ${x0 + 22 + i * 44} ${y + 13})`} />)}
    <rect x={x0 + 10} y={y + 26} width={14} height={FLOOR - y - 26} fill={GOLD2} /><rect x={x1 - 24} y={y + 26} width={14} height={FLOOR - y - 26} fill={GOLD2} />
  </g>) : null
// # a point along a soft arc from a to b (t 0→1)
export const arcAt = (a: [number, number], b: [number, number], t: number, lift = 120): [number, number] => [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - Math.sin(Math.PI * t) * lift]
