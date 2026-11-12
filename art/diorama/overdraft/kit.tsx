// ============================================================
// SHORT — "Your Bank's Overdraft Fee Is a 13,600% Loan" — this video's
// own drawings (owner r82/r83: fresh art per video, depth + shading).
// The world: a WARM CORNER GROCERY at night (cream-honey wall, wooden
// shelves, checkout counter, a neon window), a NAVY MARBLE BANK HALL with
// a brass teller window, a NIGHT CITY for the big totals, and a WOODEN
// DESK for paperwork. The running motif: the fee is a red PRICE TAG on a
// string that swings onto whatever it is charged on.
// Tall canvas 1080×1920: content inside x 60–940, y 380–1270; the
// headline sits at y 330; captions own y 1290–1490.
// Every object is drawn around its own origin (centre unless noted).
// ============================================================
import React from 'react'
import { clamp01, easeOut, lerp, on, span } from '../kit'

export const W = 1080, H = 1920, CX = 500
export const TXT = (size: number, weight = 400): React.CSSProperties => ({ font: `${weight} ${size}px "Bebas Neue"`, letterSpacing: 2 })

export const HONEY = '#F4DDAE', HONEY2 = '#E8C485', CREAM = '#FBF3E2', PAPER = '#FFFDF6', INK = '#1F2430', INK2 = '#4A5160'
export const WOOD = '#A36B42', WOOD2 = '#6F4527', WOOD3 = '#C58A5A', RED = '#D8432F', RED2 = '#9E2C1E', PINK = '#FF8FA3'
export const MINT = '#3E9E72', GREEN = '#9FD39B', GREEND = '#3F7A3D', NAVY = '#1C2B4C', NAVY2 = '#111C36', NAVY3 = '#2C3F68'
export const GOLD = '#E8B54A', GOLD2 = '#A97B22', SKY = '#CFE3EE', TEAL = '#2F7F86', MARBLE = '#E9E4DA', SHADE = 'rgba(30,20,10,0.22)'
export const ORANGE = '#F08A3C', BLUE = '#4C8FD6'

// # visible from a to b with clean fades (gone by b)
export const win = (f: number, a: number, b: number, d = 7) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
// # a gentle swing (degrees) that starts on `at` and settles
export const swing = (f: number, at: number, amp = 14) => { const t = Math.max(0, f - at); return amp * Math.exp(-t / 22) * Math.sin(t / 4.2) }
// # an object falling in from above onto its spot, with a small bounce (returns the y offset)
export const drop = (f: number, at: number, h = 260) => { const t = clamp01((f - at) / 12); const b = f - at > 12 ? Math.exp(-(f - at - 12) / 5) * Math.sin((f - at - 12) / 2) * 10 : 0; return -h * (1 - t * t) - b }
// # a point flying from a to b along an arc between frames at..at+d
export const flyTo = (f: number, at: number, a: [number, number], b: [number, number], d = 18, lift = 120) => {
  const t = easeOut(span(f, at, at + d))
  return { x: lerp(a[0], b[0], t), y: lerp(a[1], b[1], t) - Math.sin(Math.PI * t) * lift, t }
}

// ================================================================== WORLDS
// # 1) the corner grocery: honey wall, soft shelves of drawn groceries, a neon window, the checkout counter
export const StoreWorld: React.FC<{ f: number; id: string; dim?: number; counter?: boolean }> = ({ f, id, dim = 0, counter = true }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F8E6BE" /><stop offset="100%" stopColor={HONEY2} /></linearGradient>
      <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={WOOD3} /><stop offset="100%" stopColor={WOOD2} /></linearGradient>
      <linearGradient id={`${id}-night`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={NAVY2} /><stop offset="100%" stopColor={NAVY3} /></linearGradient>
      <radialGradient id={`${id}-lamp`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFF4D2" stopOpacity="0.7" /><stop offset="100%" stopColor="#FFF4D2" stopOpacity="0" /></radialGradient>
      <pattern id={`${id}-floor`} width="120" height="120" patternUnits="userSpaceOnUse"><rect width="120" height="120" fill="#E9DCC4" /><rect width="60" height="60" fill="#3E7F7A" /><rect x="60" y="60" width="60" height="60" fill="#3E7F7A" /></pattern>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-wall)`} />
    {/* # the night window at the very top (decor only, above the headline) */}
    <rect x={120} y={40} width={840} height={200} rx={14} fill={WOOD2} />
    <rect x={136} y={56} width={808} height={168} rx={8} fill={`url(#${id}-night)`} />
    <clipPath id={`${id}-winclip`}><rect x={136} y={56} width={808} height={168} rx={8} /></clipPath>
    <g clipPath={`url(#${id}-winclip)`}>{[[180, 210, 60, 120], [260, 170, 80, 160], [380, 190, 50, 140], [460, 150, 90, 180], [600, 185, 70, 145], [700, 160, 60, 170], [800, 200, 90, 130]].map(([x, top, w, h], k) => <rect key={k} x={x} y={top} width={w} height={h} fill="#22345C" opacity={0.9} />)}</g>
    {[[200, 225], [290, 190], [310, 230], [480, 175], [500, 210], [630, 205], [720, 185], [830, 215]].map(([x, y], k) => <rect key={k} x={x} y={y} width={10} height={12} fill={GOLD} opacity={0.5 + 0.4 * Math.sin(f / 40 + k)} />)}
    <line x1={540} y1={56} x2={540} y2={224} stroke={WOOD2} strokeWidth={10} />
    {/* # neon OPEN sign in the window */}
    <g transform="translate(760 110)" opacity={0.85 + 0.15 * Math.sin(f / 9)}><rect x={-80} y={-28} width={160} height={56} rx={28} fill="none" stroke={PINK} strokeWidth={6} /><text y={14} textAnchor="middle" fill={PINK} style={TXT(40)}>OPEN</text></g>
    {/* # shelves of groceries: a soft back layer (low contrast so the story reads in front) */}
    <g opacity={0.5}>
      {[520, 760, 1000].map((y, r) => <g key={r}>
        <rect x={0} y={y} width={W} height={22} fill={WOOD} /><rect x={0} y={y + 22} width={W} height={10} fill={WOOD2} opacity={0.6} />
        {Array.from({ length: 12 }, (_, k) => { const x = 30 + k * 88 + (r % 2) * 30, kind = (k + r) % 4
          const col = ['#E66B4F', '#5AA0C8', '#F1C24B', '#7DBE7A'][(k * 3 + r) % 4]
          if (kind === 0) return <g key={k}><rect x={x} y={y - 120} width={64} height={120} rx={6} fill={col} /><rect x={x + 8} y={y - 90} width={48} height={40} fill={PAPER} opacity={0.8} /></g>
          if (kind === 1) return <g key={k}><rect x={x + 8} y={y - 90} width={48} height={90} rx={10} fill={col} /><ellipse cx={x + 32} cy={y - 90} rx={24} ry={8} fill="#FFFFFF" opacity={0.5} /></g>
          if (kind === 2) return <g key={k}><path d={`M${x + 20} ${y} L${x + 20} ${y - 80} L${x + 26} ${y - 110} L${x + 38} ${y - 110} L${x + 44} ${y - 80} L${x + 44} ${y} Z`} fill={col} /></g>
          return <g key={k}><rect x={x} y={y - 70} width={70} height={70} rx={8} fill={col} /><rect x={x} y={y - 70} width={70} height={18} rx={8} fill="#FFFFFF" opacity={0.35} /></g>
        })}
      </g>)}
    </g>
    {/* # a warm ceiling lamp glow */}
    <circle cx={540} cy={420} r={420} fill={`url(#${id}-lamp)`} />
    {/* # floor below the stage */}
    <rect x={0} y={1290} width={W} height={H - 1290} fill={`url(#${id}-floor)`} />
    <rect x={0} y={1290} width={W} height={H - 1290} fill="#1A1410" opacity={0.55} />
    {counter && <Counter id={id} />}
    {dim > 0 && <rect x={0} y={0} width={W} height={H} fill="#141A2E" opacity={dim} />}
  </g>
)
// # the checkout counter front (drawn last so people stand behind it)
export const Counter: React.FC<{ id: string; y?: number }> = ({ id, y = 1130 }) => (
  <g>
    <rect x={-10} y={y} width={W + 20} height={26} fill="#3A3F4A" />
    <rect x={-10} y={y} width={W + 20} height={8} fill="#FFFFFF" opacity={0.25} />
    <rect x={-10} y={y + 26} width={W + 20} height={1290 - y - 26} fill={`url(#${id}-wood)`} />
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={i * 160 + 20} y={y + 46} width={120} height={1290 - y - 70} rx={8} fill="none" stroke={WOOD2} strokeWidth={4} opacity={0.5} />)}
  </g>
)

// # 2) the bank hall: deep navy marble, two columns, a brass-barred teller window, a green banker lamp
export const BankWorld: React.FC<{ f: number; id: string; windowOn?: number }> = ({ f, id, windowOn = 1 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-hall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22355C" /><stop offset="100%" stopColor={NAVY2} /></linearGradient>
      <linearGradient id={`${id}-col`} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#B9C2D3" /><stop offset="50%" stopColor="#EEF1F6" /><stop offset="100%" stopColor="#9AA4B8" /></linearGradient>
      <radialGradient id={`${id}-lamp`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#B6F2C8" stopOpacity="0.35" /><stop offset="100%" stopColor="#B6F2C8" stopOpacity="0" /></radialGradient>
      <linearGradient id={`${id}-desk`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7A4B2C" /><stop offset="100%" stopColor="#4A2C18" /></linearGradient>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-hall)`} />
    {/* # marble veins */}
    {[[80, 300, 300, 520], [700, 380, 1000, 620], [120, 900, 420, 1080]].map(([a, b, c, d], k) => <path key={k} d={`M${a} ${b} Q${(a + c) / 2 + 60} ${(b + d) / 2 - 40} ${c} ${d}`} stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={0.06} />)}
    {/* # columns at the edges */}
    {[40, 1040].map((x, k) => <g key={k}><rect x={x - 50} y={60} width={100} height={1240} fill={`url(#${id}-col)`} opacity={0.85} />{[-30, -10, 10, 30].map((d) => <line key={d} x1={x + d} y1={90} x2={x + d} y2={1280} stroke="#7F889C" strokeWidth={3} opacity={0.5} />)}<rect x={x - 66} y={40} width={132} height={40} fill="#D6DCE6" /></g>)}
    {/* # the teller window: brass frame + bars at the top of the stage */}
    <g opacity={windowOn}>
      <rect x={200} y={410} width={680} height={560} rx={20} fill="#0B1428" />
      <rect x={200} y={410} width={680} height={560} rx={20} fill="none" stroke={GOLD} strokeWidth={14} />
      <path d="M200 520 A340 120 0 0 1 880 520" fill="none" stroke={GOLD2} strokeWidth={6} />
    </g>
    <circle cx={540} cy={700} r={420} fill={`url(#${id}-lamp)`} />
    {/* # a slow ceiling fan of light */}
    <path d={`M540 0 L${400 + 30 * Math.sin(f / 80)} 1300 L${680 + 30 * Math.sin(f / 80)} 1300 Z`} fill="#FFFFFF" opacity={0.025} />
    {/* # floor */}
    <rect x={0} y={1290} width={W} height={H - 1290} fill="#0B1226" />
  </g>
)
// # the teller desk front (drawn after the banker)
export const TellerDesk: React.FC<{ id: string; y?: number }> = ({ id, y = 1110 }) => (
  <g>
    <rect x={150} y={y} width={780} height={26} fill={MARBLE} />
    <rect x={150} y={y + 26} width={780} height={1290 - y - 26} fill={`url(#${id}-desk)`} />
    {[0, 1, 2].map((i) => <rect key={i} x={190 + i * 250} y={y + 50} width={200} height={1290 - y - 80} rx={8} fill="none" stroke="#2E1A0D" strokeWidth={4} opacity={0.6} />)}
    {/* # the green banker lamp */}
    <g transform={`translate(860 ${y})`}><rect x={-6} y={-90} width={12} height={90} fill={GOLD2} /><path d="M-70 -90 L70 -90 L50 -130 L-50 -130 Z" fill="#2F8A5A" /><ellipse cx={0} cy={-88} rx={60} ry={8} fill="#D9FFE6" opacity={0.6} /><rect x={-40} y={-6} width={80} height={10} rx={4} fill={GOLD2} /></g>
  </g>
)
// # the teller window bars (drawn over the banker, so he stands behind them)
export const Bars: React.FC<{ o?: number }> = ({ o = 1 }) => (
  <g opacity={o}>{[300, 400, 680, 780].map((x) => <g key={x}><rect x={x - 5} y={530} width={10} height={440} fill={GOLD} /><rect x={x - 5} y={530} width={4} height={440} fill="#FFF0C0" opacity={0.6} /></g>)}</g>
)

// # 3) the night city: navy sky, stars, a moon, bank towers on the skyline
export const NightWorld: React.FC<{ f: number; id: string; glow?: number }> = ({ f, id, glow = 0 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0E1730" /><stop offset="70%" stopColor="#24375F" /><stop offset="100%" stopColor="#3C4F7A" /></linearGradient>
      <radialGradient id={`${id}-moon`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFF6DA" stopOpacity="0.5" /><stop offset="100%" stopColor="#FFF6DA" stopOpacity="0" /></radialGradient>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-sky)`} />
    {Array.from({ length: 40 }, (_, k) => <circle key={k} cx={(k * 137) % W} cy={30 + ((k * 89) % 1000)} r={k % 3 === 0 ? 3 : 2} fill="#FFFFFF" opacity={0.25 + 0.25 * Math.sin(f / 30 + k)} />)}
    <circle cx={880} cy={180} r={160} fill={`url(#${id}-moon)`} /><circle cx={880} cy={180} r={56} fill="#FFF3CF" />
    {/* # skyline of bank towers (back row darker) */}
    {[[40, 980, 130], [170, 900, 110], [290, 1010, 140], [450, 860, 120], [580, 960, 150], [740, 890, 120], [870, 1000, 160]].map(([x, top, w], k) => <g key={k}>
      <rect x={x} y={top} width={w} height={1290 - top} fill="#17223E" />
      <path d={`M${x - 8} ${top} L${x + w / 2} ${top - 40} L${x + w + 8} ${top} Z`} fill="#17223E" />
      {Array.from({ length: Math.floor((1290 - top) / 60) }, (_, r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={x + 18 + c * (w - 36) / 2.6} y={top + 30 + r * 60} width={16} height={22} fill={GOLD} opacity={(0.25 + glow * 0.55) * (((r + c + k) % 3) ? 1 : 0.3)} />))}
    </g>)}
    <rect x={0} y={1290} width={W} height={H - 1290} fill="#0A1124" />
  </g>
)

// # 4) the desk: warm wood seen from above, a lamp pool of light
export const DeskWorld: React.FC<{ f: number; id: string; dim?: number }> = ({ f, id, dim = 0 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-desk`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#E9C79A" /><stop offset="100%" stopColor="#C99665" /></linearGradient>
      <radialGradient id={`${id}-pool`} cx="0.5" cy="0.4" r="0.6"><stop offset="0%" stopColor="#FFF8E6" stopOpacity="0.75" /><stop offset="100%" stopColor="#FFF8E6" stopOpacity="0" /></radialGradient>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-desk)`} />
    {Array.from({ length: 16 }, (_, k) => <path key={k} d={`M0 ${k * 130 + 40} Q${300 + (k % 3) * 80} ${k * 130 + 10 + (k % 2) * 30} 1080 ${k * 130 + 60}`} stroke="#9C6C42" strokeWidth={3} fill="none" opacity={0.25} />)}
    <ellipse cx={540} cy={780} rx={620} ry={560} fill={`url(#${id}-pool)`} opacity={0.9 + 0.05 * Math.sin(f / 60)} />
    {/* # a coffee mug and a plant in the top corners (decor, above the headline) */}
    <g transform="translate(130 150)"><circle r={70} fill="#F4F1EA" /><circle r={52} fill="#5A3A22" /><path d="M64 -20 Q110 0 64 30" stroke="#F4F1EA" strokeWidth={16} fill="none" /></g>
    <g transform="translate(960 160)">{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-50} rx={26} ry={60} fill="#4F9D6A" transform={`rotate(${a + 10 * Math.sin(f / 70)})`} />)}<circle r={34} fill="#B5652E" /></g>
    <rect x={0} y={1290} width={W} height={H - 1290} fill="#5A3A22" opacity={0.55} />
    {dim > 0 && <rect x={0} y={0} width={W} height={H} fill="#141A2E" opacity={dim} />}
  </g>
)
export const Vig: React.FC<{ id: string; k?: number }> = ({ id, k = 0.28 }) => (
  <g pointerEvents="none">
    <defs><radialGradient id={`${id}-vig`} cx="0.5" cy="0.42" r="0.75"><stop offset="62%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#120C08" stopOpacity={k} /></radialGradient></defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-vig)`} />
  </g>
)

// ================================================================== THINGS
// # the debit card
export const Card: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; col?: string; t?: string }> = ({ x, y, s = 1, r = 0, o = 1, col = BLUE, t = 'DEBIT' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-92} width={300} height={184} rx={18} fill={SHADE} transform="translate(8 10)" />
    <rect x={-150} y={-92} width={300} height={184} rx={18} fill={col} />
    <path d="M-150 30 Q0 -40 150 10 L150 74 A18 18 0 0 1 132 92 L-132 92 A18 18 0 0 1 -150 74 Z" fill="#FFFFFF" opacity={0.14} />
    <rect x={-112} y={-46} width={58} height={44} rx={8} fill={GOLD} /><path d="M-112 -24 L-54 -24 M-83 -46 L-83 -2" stroke={GOLD2} strokeWidth={3} />
    <text x={120} y={-50} textAnchor="end" fill="#FFFFFF" style={TXT(34)}>{t}</text>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-112 + k * 62} y={34} width={48} height={12} rx={6} fill="#FFFFFF" opacity={0.7} />)}
  </g>
)
// # the card terminal on the counter (bottom-centre origin); screen: idle / ok (green tick) / no (red cross)
export const Terminal: React.FC<{ x: number; y: number; s?: number; o?: number; ok?: number; no?: number; amount?: string }> = ({ x, y, s = 1, o = 1, ok = 0, no = 0, amount }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={8} cy={4} rx={120} ry={14} fill={SHADE} />
    <path d="M-100 0 L-90 -300 Q-88 -330 -58 -330 L58 -330 Q88 -330 90 -300 L100 0 Z" fill="#2E3440" />
    <path d="M-90 -300 Q-88 -330 -58 -330 L0 -330 L-10 0 L-100 0 Z" fill="#FFFFFF" opacity={0.07} />
    <rect x={-70} y={-305} width={140} height={110} rx={10} fill={lerp(0, 1, ok) > 0.5 ? '#D7F5DF' : no > 0.5 ? '#FFDCD6' : '#BFD6E6'} />
    {amount && ok < 0.5 && no < 0.5 && <text y={-238} textAnchor="middle" fill={INK} style={TXT(46)}>{amount}</text>}
    {ok > 0 && <path d="M-34 -252 L-8 -226 L38 -276" stroke={MINT} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="120" strokeDashoffset={120 * (1 - ok)} />}
    {no > 0 && <g opacity={no}><path d="M-30 -280 L30 -220 M30 -280 L-30 -220" stroke={RED} strokeWidth={14} strokeLinecap="round" /></g>}
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-54 + (k % 3) * 40} y={-170 + Math.floor(k / 3) * 44} width={28} height={30} rx={6} fill="#4A5262" />)}
    <rect x={-30} y={-36} width={60} height={14} rx={7} fill={MINT} opacity={0.6 + 0.4 * ok} />
  </g>
)
// # a phone showing the bank balance
export const Phone: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; bal: string; col?: string; flash?: number }> = ({ x, y, s = 1, r = 0, o = 1, bal, col = INK, flash = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-240} width={260} height={480} rx={36} fill={SHADE} transform="translate(10 12)" />
    <rect x={-130} y={-240} width={260} height={480} rx={36} fill="#1E2330" />
    <rect x={-112} y={-214} width={224} height={428} rx={22} fill={PAPER} />
    <rect x={-112} y={-214} width={224} height={70} rx={22} fill={TEAL} /><rect x={-112} y={-170} width={224} height={26} fill={TEAL} />
    <circle cx={-76} cy={-180} r={16} fill="#FFFFFF" opacity={0.85} /><rect x={-48} y={-188} width={90} height={16} rx={8} fill="#FFFFFF" opacity={0.7} />
    <text y={-90} textAnchor="middle" fill={INK2} style={TXT(32)}>BALANCE</text>
    {flash > 0 && <rect x={-100} y={-70} width={200} height={110} rx={14} fill={col} opacity={0.12 * flash} />}
    <text y={20} textAnchor="middle" fill={col} style={TXT(96)}>{bal}</text>
    {[0, 1, 2].map((k) => <g key={k}><rect x={-90} y={80 + k * 44} width={120} height={14} rx={7} fill="#D7DCE4" /><rect x={50} y={80 + k * 44} width={40} height={14} rx={7} fill="#D7DCE4" /></g>)}
    <rect x={-30} y={216} width={60} height={6} rx={3} fill="#6A7080" />
  </g>
)
// # a paper grocery bag with groceries poking out (bottom-centre origin), optional white price sticker
export const Bag: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; sticker?: string }> = ({ x, y, s = 1, o = 1, r = 0, sticker }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse cx={6} cy={2} rx={130} ry={14} fill={SHADE} />
    {/* # baguette, leaves, milk carton, apple */}
    <rect x={-60} y={-360} width={36} height={180} rx={18} fill="#E2A65A" transform="rotate(-14 -42 -270)" />
    {[0, 1, 2].map((k) => <ellipse key={k} cx={30 + k * 18} cy={-300 + k * 8} rx={20} ry={56} fill="#5FAE5A" transform={`rotate(${-20 + k * 22} ${30 + k * 18} -260)`} />)}
    <path d="M60 -300 L110 -300 L110 -200 L60 -200 Z" fill="#F4F6FA" /><path d="M60 -300 L85 -330 L110 -300 Z" fill={BLUE} />
    <circle cx={-10} cy={-240} r={34} fill="#E2483A" /><path d="M-10 -274 L-4 -292" stroke="#5A3A22" strokeWidth={5} />
    {/* # the bag */}
    <path d="M-120 0 L-108 -240 L108 -240 L120 0 Z" fill="#C99B68" />
    <path d="M-108 -240 L108 -240 L104 -216 L-104 -216 Z" fill="#B3854F" />
    <path d="M-120 0 L-108 -240 L-40 -240 L-60 0 Z" fill="#FFFFFF" opacity={0.08} />
    {sticker && <g transform="translate(0 -110) rotate(-4)"><rect x={-84} y={-40} width={168} height={80} rx={10} fill={PAPER} stroke={INK} strokeWidth={3} /><text y={18} textAnchor="middle" fill={INK} style={TXT(54)}>{sticker}</text></g>}
  </g>
)
// # THE FEE: a red price tag on a string; origin = where the string is tied (top); tag hangs below and swings
export const Tag: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string; rot?: number; str?: number; col?: string; tc?: string }> = ({ x, y, s = 1, o = 1, t = '', rot = 0, str = 70, col = RED, tc = '#FFFFFF' }) => {
  const w = Math.max(170, t.length * 30 + 90), h = 120
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
      <path d={`M0 0 Q10 ${str / 2} 0 ${str}`} stroke="#F3E6C8" strokeWidth={5} fill="none" />
      <g transform={`translate(0 ${str})`}>
        <path d={`M-${w / 2 - 40} 0 L${w / 2 - 40} 0 L${w / 2} 30 L${w / 2} ${h} L-${w / 2} ${h} L-${w / 2} 30 Z`} transform="translate(8 10)" fill={SHADE} />
        <path d={`M-${w / 2 - 40} 0 L${w / 2 - 40} 0 L${w / 2} 30 L${w / 2} ${h} L-${w / 2} ${h} L-${w / 2} 30 Z`} fill={col} />
        <path d={`M-${w / 2 - 40} 0 L${w / 2 - 40} 0 L${w / 2} 30 L${w / 2} 44 L-${w / 2} 44 L-${w / 2} 30 Z`} fill="#FFFFFF" opacity={0.14} />
        <circle cx={0} cy={22} r={10} fill="#F3E6C8" stroke={RED2} strokeWidth={3} />
        <text y={h - 22} textAnchor="middle" fill={tc} style={TXT(70)}>{t}</text>
      </g>
    </g>
  )
}
// # a stack of green dollar bills (bottom-centre origin)
export const Bills: React.FC<{ x: number; y: number; s?: number; o?: number; n?: number; t?: string; r?: number }> = ({ x, y, s = 1, o = 1, n = 5, t, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <ellipse cx={6} cy={4} rx={130} ry={14} fill={SHADE} />
    {Array.from({ length: n }, (_, k) => <g key={k} transform={`translate(${(k % 2) * 6 - 3} ${-k * 16 - 30})`}>
      <rect x={-120} y={-30} width={240} height={60} rx={6} fill={k === n - 1 ? GREEN : '#8CC489'} stroke={GREEND} strokeWidth={3} />
      {k === n - 1 && <><circle r={20} fill="#7DBE7A" stroke={GREEND} strokeWidth={3} /><rect x={-104} y={-18} width={208} height={36} rx={4} fill="none" stroke={GREEND} strokeWidth={2} /></>}
    </g>)}
    {t && <text y={-n * 16 - 80} textAnchor="middle" fill={INK} style={TXT(64)}>{t}</text>}
  </g>
)
// # a tear-off wall calendar page (centre origin)
export const CalPage: React.FC<{ x: number; y: number; day: string; s?: number; o?: number; hot?: number; col?: string }> = ({ x, y, day, s = 1, o = 1, hot = 0, col = RED }) => (
  <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.06 * hot)})`} opacity={o}>
    <rect x={-90} y={-100} width={180} height={210} rx={12} fill={SHADE} transform="translate(6 8)" />
    <rect x={-90} y={-100} width={180} height={210} rx={12} fill={PAPER} />
    <rect x={-90} y={-100} width={180} height={64} rx={12} fill={col} /><rect x={-90} y={-60} width={180} height={24} fill={col} />
    {[-40, 40].map((cx) => <circle key={cx} cx={cx} cy={-100} r={10} fill="#6A7080" />)}
    <text y={-52} textAnchor="middle" fill="#FFFFFF" style={TXT(40)}>{day}</text>
    {hot > 0 && <rect x={-80} y={-26} width={160} height={124} rx={10} fill={GOLD} opacity={0.25 * hot} />}
  </g>
)
// # a pay envelope (centre origin); `open` 0..1 slides the green pay out of the top
export const PayEnvelope: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number; r?: number }> = ({ x, y, s = 1, o = 1, open = 0, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <g transform={`translate(0 ${-110 * open})`}><rect x={-120} y={-70} width={240} height={110} rx={6} fill={GREEN} stroke={GREEND} strokeWidth={3} /><circle cx={0} cy={-16} r={22} fill="#7DBE7A" stroke={GREEND} strokeWidth={3} /></g>
    <rect x={-150} y={-90} width={300} height={190} rx={10} fill={SHADE} transform="translate(8 10)" />
    <rect x={-150} y={-60} width={300} height={160} rx={10} fill="#F2E3C2" stroke="#B8955A" strokeWidth={3} />
    <path d={`M-150 -60 L0 ${lerp(30, -150, open)} L150 -60`} fill="#E6D2A6" stroke="#B8955A" strokeWidth={3} />
    <text y={70} textAnchor="middle" fill={INK} style={TXT(40)}>PAY</text>
  </g>
)
// # a little columned bank (bottom-centre origin)
export const BankFront: React.FC<{ x: number; y: number; s?: number; o?: number; glow?: number }> = ({ x, y, s = 1, o = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={6} cy={4} rx={150} ry={14} fill={SHADE} />
    {glow > 0 && <circle cx={0} cy={-130} r={190} fill={GOLD} opacity={0.18 * glow} />}
    <rect x={-150} y={-24} width={300} height={24} fill="#D9DEE7" /><rect x={-136} y={-44} width={272} height={20} fill="#E8ECF2" />
    {[-104, -52, 0, 52, 104].map((cx) => <g key={cx}><rect x={cx - 15} y={-190} width={30} height={146} fill="#F3F5F9" /><rect x={cx - 15} y={-190} width={9} height={146} fill="#FFFFFF" opacity={0.7} /><rect x={cx + 6} y={-190} width={9} height={146} fill="#C9D0DC" /></g>)}
    <rect x={-150} y={-214} width={300} height={24} fill="#E8ECF2" />
    <path d="M-164 -214 L0 -290 L164 -214 Z" fill="#DCE1EA" /><path d="M-130 -222 L0 -278 L130 -222 Z" fill="#C9D0DC" />
    <circle cx={0} cy={-246} r={16} fill={GOLD} /><text y={-238} textAnchor="middle" fill={NAVY} style={TXT(24)}>$</text>
  </g>
)
// # an IOU note (centre origin)
export const IOU: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; t?: string }> = ({ x, y, s = 1, o = 1, r = 0, t = '$24' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-100} width={300} height={200} rx={8} fill={SHADE} transform="translate(8 10)" />
    <path d="M-150 -100 L150 -100 L150 100 L-130 100 L-150 80 Z" fill={PAPER} />
    <path d="M-150 80 L-130 80 L-130 100 Z" fill="#E4DCC8" />
    <text y={-28} textAnchor="middle" fill={INK2} style={TXT(48)}>I OWE YOU</text>
    <text y={58} textAnchor="middle" fill={RED} style={TXT(88)}>{t}</text>
  </g>
)
// # a stopwatch (centre origin), hand sweeps with `t`
export const Watch: React.FC<{ x: number; y: number; s?: number; o?: number; t?: number; label?: string }> = ({ x, y, s = 1, o = 1, t = 0, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-16} y={-110} width={32} height={26} rx={6} fill="#6A7080" />
    <circle r={86} fill={SHADE} transform="translate(6 8)" /><circle r={86} fill="#F4F6FA" stroke="#6A7080" strokeWidth={10} />
    <path d={`M0 0 L0 -64 A64 64 0 ${t > 0.5 ? 1 : 0} 1 ${64 * Math.sin(2 * Math.PI * t)} ${-64 * Math.cos(2 * Math.PI * t)} Z`} fill={RED} opacity={0.25} />
    <line x1={0} y1={0} x2={60 * Math.sin(2 * Math.PI * t)} y2={-60 * Math.cos(2 * Math.PI * t)} stroke={RED} strokeWidth={7} strokeLinecap="round" />
    <circle r={9} fill={INK} />
    {label && <text y={140} textAnchor="middle" fill={INK} style={TXT(48)}>{label}</text>}
  </g>
)
// # a balance scale (beam centre at x,y); returns where the two pans hang so callers can put things on them
export const panAt = (x: number, y: number, tilt: number, arm = 260) => {
  const a = tilt * Math.PI / 180
  return { L: { x: x - arm * Math.cos(a), y: y - arm * Math.sin(a) + 200 }, R: { x: x + arm * Math.cos(a), y: y + arm * Math.sin(a) + 200 } }
}
export const Scale: React.FC<{ x: number; y: number; tilt: number; o?: number; arm?: number }> = ({ x, y, tilt, o = 1, arm = 260 }) => {
  const p = panAt(x, y, tilt, arm), a = tilt * Math.PI / 180
  const ends = { L: { x: x - arm * Math.cos(a), y: y - arm * Math.sin(a) }, R: { x: x + arm * Math.cos(a), y: y + arm * Math.sin(a) } }
  return (
    <g opacity={o}>
      {/* # post + foot */}
      <rect x={x - 14} y={y} width={28} height={520} fill={GOLD2} /><rect x={x - 6} y={y} width={8} height={520} fill="#F5D88A" opacity={0.6} />
      <ellipse cx={x} cy={y + 530} rx={170} ry={26} fill={SHADE} /><path d={`M${x - 150} ${y + 530} Q${x} ${y + 470} ${x + 150} ${y + 530} Z`} fill={GOLD} />
      {/* # beam */}
      <g transform={`rotate(${tilt} ${x} ${y})`}><rect x={x - arm - 10} y={y - 10} width={2 * arm + 20} height={20} rx={10} fill={GOLD} /><rect x={x - arm - 10} y={y - 10} width={2 * arm + 20} height={6} rx={3} fill="#FFF0C0" opacity={0.6} /></g>
      <circle cx={x} cy={y} r={26} fill={GOLD2} /><circle cx={x} cy={y} r={12} fill="#F5D88A" />
      {/* # chains + pans */}
      {(['L', 'R'] as const).map((k) => <g key={k}>
        <path d={`M${ends[k].x} ${ends[k].y} L${p[k].x - 110} ${p[k].y} M${ends[k].x} ${ends[k].y} L${p[k].x + 110} ${p[k].y}`} stroke="#8C7A55" strokeWidth={4} />
        <path d={`M${p[k].x - 130} ${p[k].y} Q${p[k].x} ${p[k].y + 70} ${p[k].x + 130} ${p[k].y} Z`} fill={GOLD} /><path d={`M${p[k].x - 130} ${p[k].y} L${p[k].x + 130} ${p[k].y}`} stroke={GOLD2} strokeWidth={6} />
      </g>)}
    </g>
  )
}
// # a speedometer-style rate dial (centre of the arc at x,y), 0..max over 180°; needles in `needles`
export const Gauge: React.FC<{ x: number; y: number; r?: number; o?: number; max: number; ticks: number[]; fmt: (v: number) => string; needles: { v: number; col: string; o?: number }[]; crack?: number }> = ({ x, y, r = 320, o = 1, max, ticks, fmt, needles, crack = 0 }) => {
  const ang = (v: number) => Math.PI * (1 - Math.min(v, max * 1.08) / max)
  return (
    <g opacity={o}>
      <path d={`M${x - r - 30} ${y} A${r + 30} ${r + 30} 0 0 1 ${x + r + 30} ${y} Z`} fill={SHADE} transform="translate(8 12)" />
      <path d={`M${x - r - 30} ${y} A${r + 30} ${r + 30} 0 0 1 ${x + r + 30} ${y} Z`} fill="#F4F1EA" />
      <path d={`M${x - r} ${y} A${r} ${r} 0 0 1 ${x + r * Math.cos(Math.PI * 0.25)} ${y - r * Math.sin(Math.PI * 0.25)}`} stroke={MINT} strokeWidth={34} fill="none" />
      <path d={`M${x + r * Math.cos(Math.PI * 0.25)} ${y - r * Math.sin(Math.PI * 0.25)} A${r} ${r} 0 0 1 ${x + r} ${y}`} stroke={RED} strokeWidth={34} fill="none" />
      {ticks.map((v) => { const a = ang(v); return <g key={v}><line x1={x + (r - 40) * Math.cos(a)} y1={y - (r - 40) * Math.sin(a)} x2={x + (r - 10) * Math.cos(a)} y2={y - (r - 10) * Math.sin(a)} stroke={INK} strokeWidth={5} /><text x={x + (r - 86) * Math.cos(a)} y={y - (r - 86) * Math.sin(a) + 14} textAnchor="middle" fill={INK} style={TXT(40)}>{fmt(v)}</text></g> })}
      {needles.map((n, k) => { const a = ang(n.v); return <g key={k} opacity={n.o ?? 1}><line x1={x} y1={y} x2={x + (r - 30) * Math.cos(a)} y2={y - (r - 30) * Math.sin(a)} stroke={n.col} strokeWidth={14} strokeLinecap="round" /></g> })}
      <circle cx={x} cy={y} r={30} fill={INK} /><circle cx={x} cy={y} r={12} fill={GOLD} />
      {crack > 0 && <path d={`M${x + r + 20} ${y - 40} L${x + r - 30} ${y - 70} L${x + r - 10} ${y - 110} L${x + r - 60} ${y - 150}`} stroke={INK} strokeWidth={6} fill="none" strokeDasharray="300" strokeDashoffset={300 * (1 - crack)} />}
    </g>
  )
}
// # a big glass jar (bottom-centre origin) filling with fee tags; fill 0..1
export const Jar: React.FC<{ x: number; y: number; s?: number; o?: number; fill: number; f: number }> = ({ x, y, s = 1, o = 1, fill, f }) => {
  const n = Math.round(60 * fill)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={8} cy={6} rx={240} ry={22} fill="rgba(0,0,0,0.3)" />
      <clipPath id="od-jar"><path d="M-210 -10 L-210 -520 Q-210 -560 -170 -570 L170 -570 Q210 -560 210 -520 L210 -10 Q210 0 200 0 L-200 0 Q-210 0 -210 -10 Z" /></clipPath>
      <path d="M-210 -10 L-210 -520 Q-210 -560 -170 -570 L170 -570 Q210 -560 210 -520 L210 -10 Q210 0 200 0 L-200 0 Q-210 0 -210 -10 Z" fill="#CFE3EE" opacity={0.18} />
      <g clipPath="url(#od-jar)">
        {Array.from({ length: n }, (_, k) => { const col = k % 4 === 3 ? ORANGE : RED; const cx = -170 + ((k * 73) % 340), cy = -30 - Math.floor(k / 6) * 52 - ((k * 31) % 20)
          return <g key={k} transform={`translate(${cx} ${cy}) rotate(${((k * 47) % 60) - 30})`}><path d="M-34 -16 L20 -16 L34 0 L34 16 L-34 16 Z" fill={col} /><circle cx={-22} cy={0} r={5} fill="#F3E6C8" /></g> })}
      </g>
      <path d="M-210 -10 L-210 -520 Q-210 -560 -170 -570 L170 -570 Q210 -560 210 -520 L210 -10 Q210 0 200 0 L-200 0 Q-210 0 -210 -10 Z" fill="none" stroke="#EAF4FA" strokeWidth={8} opacity={0.8} />
      <path d="M-170 -500 L-170 -80" stroke="#FFFFFF" strokeWidth={14} opacity={0.25} strokeLinecap="round" />
      <rect x={-190} y={-600} width={380} height={40} rx={10} fill="#8C96A3" /><rect x={-190} y={-600} width={380} height={12} rx={6} fill="#FFFFFF" opacity={0.3} />
      {fill > 0.98 && <circle cx={150} cy={-560} r={12 + 6 * Math.sin(f / 5)} fill="#FFFFFF" opacity={0.5} />}
    </g>
  )
}
// # the Capitol dome (bottom-centre origin)
export const Capitol: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={8} cy={6} rx={330} ry={20} fill="rgba(0,0,0,0.3)" />
    <rect x={-320} y={-110} width={640} height={110} fill="#E8ECF2" />
    {Array.from({ length: 11 }, (_, k) => <rect key={k} x={-300 + k * 56} y={-96} width={22} height={90} fill="#C9D0DC" />)}
    <rect x={-200} y={-150} width={400} height={40} fill="#F3F5F9" />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-170 + k * 40} y={-290} width={16} height={140} fill="#F3F5F9" />)}
    <rect x={-190} y={-300} width={380} height={20} fill="#E8ECF2" />
    <path d="M-170 -300 Q-170 -470 0 -480 Q170 -470 170 -300 Z" fill="#F3F5F9" /><path d="M-170 -300 Q-170 -470 0 -480 L0 -300 Z" fill="#FFFFFF" opacity={0.5} />
    {[-110, -40, 40, 110].map((cx) => <path key={cx} d={`M${cx} -300 Q${cx * 0.8} -420 0 -478`} stroke="#C9D0DC" strokeWidth={4} fill="none" />)}
    <rect x={-20} y={-540} width={40} height={60} fill="#E8ECF2" /><circle cx={0} cy={-552} r={14} fill="#E8ECF2" />
  </g>
)
// # a sheet of paper: the bank's rule (centre origin); `tear` 0..1 rips it in two
export const RulePaper: React.FC<{ x: number; y: number; s?: number; o?: number; tear?: number }> = ({ x, y, s = 1, o = 1, tear = 0 }) => {
  const half = (side: -1 | 1) => (
    <g transform={`translate(${side * 70 * tear} ${20 * tear}) rotate(${side * 18 * tear})`}>
      <clipPath id={`od-rule${side}`}><path d={side < 0 ? 'M-200 -260 L10 -260 L-20 -100 L20 40 L-10 260 L-200 260 Z' : 'M10 -260 L200 -260 L200 260 L-10 260 L20 40 L-20 -100 Z'} /></clipPath>
      <g clipPath={`url(#od-rule${side})`}>
        <rect x={-180} y={-240} width={360} height={480} rx={10} fill={PAPER} />
        <rect x={-180} y={-240} width={360} height={80} rx={10} fill={NAVY3} />
        <text y={-186} textAnchor="middle" fill="#FFFFFF" style={TXT(46)}>FEE RULE</text>
        {[0, 1, 2, 3].map((k) => <rect key={k} x={-130} y={-120 + k * 40} width={260 - (k % 2) * 60} height={14} rx={7} fill="#D7DCE4" />)}
      </g>
    </g>
  )
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-180} y={-240} width={360} height={480} rx={10} fill={SHADE} transform="translate(10 12)" opacity={1 - tear} />{half(-1)}{half(1)}</g>
}
// # the account form: a paper with a big checkbox (centre origin); tick 0..1 draws the tick, glow highlights the box
export const Form: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; tick?: number; glow?: number; old?: number }> = ({ x, y, s = 1, o = 1, r = 0, tick = 0, glow = 0, old = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-230} y={-300} width={460} height={600} rx={10} fill={SHADE} transform="translate(10 14)" />
    <rect x={-230} y={-300} width={460} height={600} rx={10} fill={old > 0 ? `rgb(${255 - 18 * old},${253 - 30 * old},${246 - 60 * old})` : PAPER} />
    <rect x={-230} y={-300} width={460} height={90} rx={10} fill={TEAL} /><rect x={-230} y={-240} width={460} height={30} fill={TEAL} />
    <text y={-238} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>NEW ACCOUNT</text>
    {[0, 1, 2].map((k) => <g key={k}><rect x={-180} y={-170 + k * 60} width={120} height={14} rx={7} fill="#C9CED6" /><rect x={-40} y={-176 + k * 60} width={220} height={26} rx={4} fill="none" stroke="#C9CED6" strokeWidth={3} /></g>)}
    {/* # the box that matters */}
    {glow > 0 && <rect x={-200} y={30} width={400} height={150} rx={16} fill={GOLD} opacity={0.3 * glow} />}
    <rect x={-170} y={60} width={90} height={90} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    {tick > 0 && <path d="M-156 104 L-130 134 L-86 70" stroke={MINT} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="140" strokeDashoffset={140 * (1 - tick)} />}
    <text x={-50} y={98} fill={INK} style={TXT(44)}>OVERDRAFT</text>
    <text x={-50} y={146} fill={INK} style={TXT(44)}>COVERAGE: YES</text>
    {[0, 1].map((k) => <rect key={k} x={-180} y={210 + k * 36} width={360 - k * 120} height={12} rx={6} fill="#D7DCE4" />)}
    {old > 0 && <rect x={-230} y={-300} width={460} height={600} rx={10} fill="#8A6A3A" opacity={0.12 * old} />}
  </g>
)
// # a pen (tip at origin)
export const Pen: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r - 35}) scale(${s})`} opacity={o}>
    <path d="M0 0 L-10 -30 L10 -30 Z" fill={INK} />
    <rect x={-14} y={-260} width={28} height={230} rx={8} fill={NAVY3} /><rect x={-14} y={-260} width={10} height={230} rx={5} fill="#FFFFFF" opacity={0.25} />
    <rect x={10} y={-250} width={8} height={90} rx={4} fill={GOLD} />
  </g>
)
// # a paper check (centre origin)
export const Cheque: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-190} y={-90} width={380} height={180} rx={8} fill={SHADE} transform="translate(8 10)" />
    <rect x={-190} y={-90} width={380} height={180} rx={8} fill="#E3F0E6" stroke="#8AB79A" strokeWidth={3} />
    <text x={-160} y={-40} fill={INK} style={TXT(40)}>CHECK</text>
    <rect x={40} y={-62} width={120} height={34} rx={4} fill="#FFFFFF" stroke="#8AB79A" strokeWidth={2} />
    <rect x={-160} y={0} width={240} height={10} rx={5} fill="#B5CDBD" /><rect x={-160} y={40} width={180} height={10} rx={5} fill="#B5CDBD" />
    <path d="M60 50 Q90 10 110 40 T160 30" stroke={INK} strokeWidth={4} fill="none" />
  </g>
)
// # an automatic bill: an envelope with a looping arrow (centre origin)
export const AutoBill: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; f: number }> = ({ x, y, s = 1, o = 1, r = 0, f }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-160} y={-100} width={320} height={200} rx={10} fill={SHADE} transform="translate(8 10)" />
    <rect x={-160} y={-100} width={320} height={200} rx={10} fill="#F4F6FA" stroke="#9AA4B8" strokeWidth={3} />
    <path d="M-160 -100 L0 10 L160 -100" fill="none" stroke="#9AA4B8" strokeWidth={3} />
    <g transform={`translate(0 40) rotate(${(f * 3) % 360})`}><path d="M-44 0 A44 44 0 1 1 0 44" stroke={BLUE} strokeWidth={10} fill="none" /><path d="M-60 -6 L-44 14 L-26 -6 Z" fill={BLUE} /></g>
  </g>
)
// # a big drawn cross (r68): placed over a drawing, never over words
export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke="#FFFFFF" strokeWidth={34} strokeLinecap="round" />
    <path d="M-70 -70 L70 70 M70 -70 L-70 70" stroke={RED} strokeWidth={20} strokeLinecap="round" />
  </g>
)
// # a small coin with a value
export const Penny: React.FC<{ x: number; y: number; s?: number; o?: number; t?: string }> = ({ x, y, s = 1, o = 1, t = '4¢' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={8} rx={44} ry={44} fill="#9C5B2E" /><circle r={44} fill="#D08A4E" /><circle r={32} fill="none" stroke="#9C5B2E" strokeWidth={4} />
    <text y={14} textAnchor="middle" fill="#FFF4E0" style={TXT(40)}>{t}</text>
  </g>
)
// # a gift bow (the "favour")
export const Bow: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={-46} cy={0} rx={50} ry={30} fill={PINK} transform="rotate(-20 -46 0)" /><ellipse cx={46} cy={0} rx={50} ry={30} fill={PINK} transform="rotate(20 46 0)" />
    <path d="M-10 10 L-40 70 L-20 66 L-6 84 Z" fill="#E8607A" /><path d="M10 10 L40 70 L20 66 L6 84 Z" fill="#E8607A" />
    <circle r={20} fill="#E8607A" />
  </g>
)
// # a tiny sparkle on a beat (natural life on the thing being talked about)
export const Spark: React.FC<{ f: number; at: number; x: number; y: number; col?: string }> = ({ f, at, x, y, col = '#FFFFFF' }) => {
  const t = (f - at) / 16
  if (t < 0 || t > 1) return null
  const k = Math.sin(Math.PI * t)
  return <g transform={`translate(${x} ${y}) rotate(${40 * t}) scale(${k})`} opacity={0.95}><path d="M0 -30 L6 -6 L30 0 L6 6 L0 30 L-6 6 L-30 0 L-6 -6 Z" fill={col} /></g>
}
