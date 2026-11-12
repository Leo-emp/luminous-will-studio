// ============================================================
// SHORT — "Why Costco's Hot Dog Still Costs $1.50" — this video's own
// drawings (owner r82/r83: fresh art per video, depth + shading).
// The worlds: a STEEL-BLUE WAREHOUSE FOOD COURT (tall racks of pallets
// behind, a red-and-white awning, a concrete floor), a 1985 SUNSET (retro
// stripes + a grid floor), a MINT-TILED HOT DOG PLANT, a dark WALNUT
// BOARDROOM, a NIGHT WAREHOUSE AISLE, and a TEAL MEMBERSHIP GATE.
// The running motif: the yellow price board that never changes.
// No store logos: the warehouse club is drawn generic.
// Tall canvas 1080×1920: content inside x 60–940, y 380–1270; the
// headline sits at y 330; captions own y 1290–1490.
// Every object is drawn around its own origin (centre unless noted).
// ============================================================
import React from 'react'
import { clamp01, easeOut, lerp, on, span } from '../kit'

export const W = 1080, H = 1920, CX = 500
export const TXT = (size: number, weight = 400): React.CSSProperties => ({ font: `${weight} ${size}px "Bebas Neue"`, letterSpacing: 2 })

export const STEEL = '#DCE5EE', STEEL2 = '#B7C6D6', STEEL3 = '#7E93AA', INK = '#1E2633', INK2 = '#4A5568'
export const KETCHUP = '#E0402F', KETCHUP2 = '#A82A1E', MUSTARD = '#F2B632', MUSTARD2 = '#C98A12', BUN = '#E9A95B', BUN2 = '#B8742F'
export const SAUSAGE = '#C4553A', SAUSAGE2 = '#8E3424', PAPER = '#FFFDF7', KRAFT = '#C79A62', KRAFT2 = '#8E6A3E'
export const MINT = '#2FA37A', MINT2 = '#BFE8D6', TEAL = '#1F8A8F', TEAL2 = '#0F5C63', NAVY = '#16223D', NAVY2 = '#0C1428', NAVY3 = '#2A3D63'
export const PLUM = '#5B2A5E', SUN = '#FF9F45', MAGENTA = '#E0457B', WALNUT = '#5A3622', WALNUT2 = '#3A2214', GOLD = '#E8B54A', GOLD2 = '#A97B22'
export const BLUE = '#3E7CC9', GREEN = '#46B37A', SHADE = 'rgba(20,24,36,0.22)'

// # visible from a to b with clean fades (gone by b)
export const win = (f: number, a: number, b: number, d = 7) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
// # an object falling in from above onto its spot, with a small bounce (returns the y offset)
export const drop = (f: number, at: number, h = 240) => { const t = clamp01((f - at) / 12); const b = f - at > 12 ? Math.exp(-(f - at - 12) / 5) * Math.sin((f - at - 12) / 2) * 10 : 0; return -h * (1 - t * t) - b }
// # a gentle wobble (degrees) that starts on `at` and settles
export const wobble = (f: number, at: number, amp = 10) => { const t = Math.max(0, f - at); return amp * Math.exp(-t / 18) * Math.sin(t / 3.6) }
// # a short shake (px) on `at` (a fist on the table, a board that almost breaks)
export const shake = (f: number, at: number, amp = 12) => { const t = f - at; return t < 0 || t > 16 ? 0 : amp * (1 - t / 16) * Math.sin(t * 2.2) }
// # a point flying from a to b along an arc between frames at..at+d
export const flyTo = (f: number, at: number, a: [number, number], b: [number, number], d = 18, lift = 120) => {
  const t = easeOut(span(f, at, at + d))
  return { x: lerp(a[0], b[0], t), y: lerp(a[1], b[1], t) - Math.sin(Math.PI * t) * lift, t }
}
// # a number that counts up from 0 between at and at+d
export const count = (f: number, at: number, to: number, d = 30) => to * easeOut(span(f, at, at + d))

// ================================================================== WORLDS
// # 1) the warehouse food court: steel-blue wall, tall soft racks of pallets behind, hanging lamps, a red-white awning, concrete floor
export const CourtWorld: React.FC<{ f: number; id: string; dim?: number; warm?: number }> = ({ f, id, dim = 0, warm = 0 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EEF3F8" /><stop offset="100%" stopColor={STEEL2} /></linearGradient>
      <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9AA6B2" /><stop offset="100%" stopColor="#5E6976" /></linearGradient>
      <radialGradient id={`${id}-lamp`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFF3D0" stopOpacity="0.75" /><stop offset="100%" stopColor="#FFF3D0" stopOpacity="0" /></radialGradient>
      <linearGradient id={`${id}-warm`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFB36B" stopOpacity="0.0" /><stop offset="100%" stopColor="#FF9F45" stopOpacity="0.35" /></linearGradient>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-wall)`} />
    {/* # the far racks: orange uprights, blue beams, kraft boxes on pallets (soft, low contrast) */}
    <g opacity={0.42}>
      {[60, 380, 700, 1020].map((x) => <rect key={x} x={x - 12} y={0} width={24} height={1290} fill="#E07B2E" />)}
      {[250, 560, 870, 1180].map((y) => <rect key={y} x={0} y={y} width={W} height={20} fill={BLUE} />)}
      {[250, 560, 870].map((y, r) => Array.from({ length: 6 }, (_, k) => { const x = 90 + k * 160 + (r % 2) * 40, hh = 120 + ((k + r) % 3) * 40
        return <g key={`${r}-${k}`}><rect x={x} y={y + 300 - hh - 20} width={120} height={hh} fill={k % 2 ? KRAFT : '#D9B27E'} /><rect x={x} y={y + 300 - hh - 20} width={120} height={14} fill={KRAFT2} opacity={0.5} /><rect x={x - 6} y={y + 280} width={132} height={20} fill="#B88B55" /></g> }))}
    </g>
    {/* # hanging lamps (decor above the headline) */}
    {[200, 540, 880].map((x, k) => <g key={x}><line x1={x} y1={0} x2={x} y2={30} stroke={INK2} strokeWidth={4} /><path d={`M${x - 50} 74 L${x + 50} 74 L${x + 28} 30 L${x - 28} 30 Z`} fill={INK} /><ellipse cx={x} cy={76} rx={48} ry={8} fill="#FFF3D0" opacity={0.85 + 0.1 * Math.sin(f / 13 + k)} /></g>)}
    <circle cx={540} cy={640} r={520} fill={`url(#${id}-lamp)`} />
    {/* # the food-court awning: red and white stripes with a scalloped edge */}
    <g>
      {Array.from({ length: 10 }, (_, k) => <rect key={k} x={k * 108} y={100} width={108} height={64} fill={k % 2 ? PAPER : KETCHUP} />)}
      {Array.from({ length: 10 }, (_, k) => <path key={k} d={`M${k * 108} 164 Q${k * 108 + 54} 206 ${k * 108 + 108} 164 Z`} fill={k % 2 ? PAPER : KETCHUP} />)}
      <rect x={0} y={96} width={W} height={10} fill={KETCHUP2} />
    </g>
    {/* # floor */}
    <rect x={0} y={1290} width={W} height={H - 1290} fill={`url(#${id}-floor)`} />
    {[1340, 1450, 1600, 1780].map((y) => <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#FFFFFF" strokeWidth={2} opacity={0.08} />)}
    {warm > 0 && <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-warm)`} opacity={warm} />}
    {dim > 0 && <rect x={0} y={0} width={W} height={H} fill="#141A2E" opacity={dim} />}
  </g>
)
// # the food-court counter front (drawn last so people stand behind it)
export const CourtCounter: React.FC<{ y?: number }> = ({ y = 1130 }) => (
  <g>
    <rect x={-10} y={y} width={W + 20} height={24} fill="#C9D2DC" />
    <rect x={-10} y={y} width={W + 20} height={7} fill="#FFFFFF" opacity={0.6} />
    <rect x={-10} y={y + 24} width={W + 20} height={1290 - y - 24} fill={KETCHUP} />
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={i * 190 + 10} y={y + 40} width={150} height={1290 - y - 60} rx={10} fill={KETCHUP2} opacity={0.35} />)}
    <rect x={-10} y={1280} width={W + 20} height={10} fill={KETCHUP2} />
  </g>
)

// # 2) 1985: a sunset sky in stripes, a purple grid floor, palm silhouettes
export const RetroWorld: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2B1A4A" /><stop offset="55%" stopColor={MAGENTA} /><stop offset="100%" stopColor={SUN} /></linearGradient>
      <linearGradient id={`${id}-sun`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFE07A" /><stop offset="100%" stopColor="#FF7A45" /></linearGradient>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-sky)`} />
    {Array.from({ length: 30 }, (_, k) => <circle key={k} cx={(k * 151) % W} cy={30 + ((k * 71) % 380)} r={2} fill="#FFFFFF" opacity={0.3 + 0.3 * Math.sin(f / 25 + k)} />)}
    {/* # the striped sun behind everything */}
    <g transform={`translate(540 ${1010 + 6 * Math.sin(f / 60)})`}>
      <circle r={330} fill={`url(#${id}-sun)`} opacity={0.85} />
      {[60, 120, 170, 215, 255].map((y, k) => <rect key={k} x={-340} y={y} width={680} height={10 + k * 4} fill={MAGENTA} opacity={0.9} />)}
    </g>
    {/* # palms */}
    {[[90, 1290, 1], [990, 1290, -1]].map(([x, y, d], k) => <g key={k} transform={`translate(${x} ${y}) scale(${d} 1)`} opacity={0.75}>
      <path d="M0 0 Q-20 -260 30 -520" stroke="#2B1A4A" strokeWidth={22} fill="none" />
      {[-60, -20, 20, 60, 100].map((a) => <path key={a} d={`M30 -520 Q${30 + 130 * Math.cos((a * Math.PI) / 180)} ${-560 - 40 * Math.sin((a * Math.PI) / 180)} ${30 + 220 * Math.cos((a * Math.PI) / 180)} ${-470 + 60 * Math.abs(Math.sin((a * Math.PI) / 180))}`} stroke="#2B1A4A" strokeWidth={16} fill="none" />)}
    </g>)}
    {/* # the grid floor */}
    <rect x={0} y={1290} width={W} height={H - 1290} fill="#1E1036" />
    {Array.from({ length: 13 }, (_, k) => <line key={k} x1={540 + (k - 6) * 60} y1={1290} x2={540 + (k - 6) * 260} y2={H} stroke={MAGENTA} strokeWidth={3} opacity={0.6} />)}
    {[1300, 1330, 1380, 1460, 1580, 1760].map((y) => <line key={y} x1={0} y1={y} x2={W} y2={y} stroke={MAGENTA} strokeWidth={3} opacity={0.5} />)}
  </g>
)

// # 3) the hot dog plant: mint tiles, a steel hood, a long window band
export const PlantWorld: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <g>
    <defs>
      <pattern id={`${id}-tile`} width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#D9F1E6" /><rect x="1" y="1" width="58" height="58" fill="#E9F8F1" /></pattern>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9ED3F0" /><stop offset="100%" stopColor="#E8F6FF" /></linearGradient>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-tile)`} />
    {/* # window band at the top with clouds drifting (decor above the headline) */}
    <rect x={60} y={40} width={960} height={210} rx={16} fill={STEEL3} />
    <rect x={76} y={56} width={928} height={178} rx={10} fill={`url(#${id}-sky)`} />
    {[0, 1, 2].map((k) => { const x = ((k * 360 + f * 0.6) % 1100) - 60; return <g key={k} opacity={0.9}><ellipse cx={x} cy={130 + k * 20} rx={70} ry={22} fill="#FFFFFF" /><ellipse cx={x + 40} cy={118 + k * 20} rx={46} ry={20} fill="#FFFFFF" /></g> })}
    {[316, 556, 796].map((x) => <rect key={x} x={x - 6} y={56} width={12} height={178} fill={STEEL3} />)}
    {/* # a steel extraction hood and pipes */}
    <path d="M140 300 L940 300 L900 380 L180 380 Z" fill={STEEL2} opacity={0.6} />
    {[200, 880].map((x) => <rect key={x} x={x - 14} y={380} width={28} height={910} fill={STEEL2} opacity={0.5} />)}
    <rect x={0} y={1290} width={W} height={H - 1290} fill="#6C8C80" />
    {[1340, 1460, 1640].map((y) => <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#FFFFFF" strokeWidth={2} opacity={0.1} />)}
  </g>
)

// # 4) the boardroom at night: walnut panels, a tall dark window with a city, a long table edge
export const BoardWorld: React.FC<{ f: number; id: string; red?: number }> = ({ f, id, red = 0 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3D2618" /><stop offset="100%" stopColor={WALNUT2} /></linearGradient>
      <linearGradient id={`${id}-win`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={NAVY2} /><stop offset="100%" stopColor={NAVY3} /></linearGradient>
      <radialGradient id={`${id}-lamp`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.4" /><stop offset="100%" stopColor="#FFD9A0" stopOpacity="0" /></radialGradient>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-wall)`} />
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={k * 190 - 20} y={380} width={170} height={900} rx={6} fill="none" stroke="#2A170C" strokeWidth={5} opacity={0.6} />)}
    {/* # the night window (decor above the headline) */}
    <rect x={150} y={30} width={780} height={230} rx={10} fill="#22140B" />
    <rect x={166} y={46} width={748} height={198} fill={`url(#${id}-win)`} />
    {[[200, 140, 70], [290, 100, 90], [400, 130, 60], [480, 90, 100], [600, 120, 80], [700, 80, 90], [810, 130, 80]].map(([x, top, w], k) => <rect key={k} x={x} y={top} width={w} height={244 - top} fill="#1B2A4A" />)}
    {Array.from({ length: 14 }, (_, k) => <rect key={k} x={210 + ((k * 53) % 680)} y={110 + ((k * 37) % 110)} width={10} height={12} fill={GOLD} opacity={0.4 + 0.4 * Math.sin(f / 35 + k)} />)}
    <circle cx={540} cy={700} r={520} fill={`url(#${id}-lamp)`} />
    {red > 0 && <rect x={0} y={0} width={W} height={H} fill={KETCHUP} opacity={0.18 * red} />}
    <rect x={0} y={1290} width={W} height={H - 1290} fill="#1E120A" />
  </g>
)
// # the boardroom table edge (drawn after the people)
export const BoardTable: React.FC<{ y?: number }> = ({ y = 1150 }) => (
  <g>
    <path d={`M-10 ${y} L1090 ${y} L1090 ${y + 30} L-10 ${y + 30} Z`} fill="#8A5634" />
    <rect x={-10} y={y} width={W + 20} height={6} fill="#C48A5C" opacity={0.7} />
    <rect x={-10} y={y + 30} width={W + 20} height={1290 - y - 30} fill={WALNUT} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={40 + i * 260} y={y + 50} width={220} height={1290 - y - 70} rx={6} fill="none" stroke={WALNUT2} strokeWidth={4} opacity={0.6} />)}
  </g>
)

// # 5) the night warehouse aisle: deep blue, tall racks in perspective, light shafts from skylights
export const AisleWorld: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={NAVY2} /><stop offset="100%" stopColor={NAVY3} /></linearGradient>
      <linearGradient id={`${id}-shaft`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#CFE6FF" stopOpacity="0.22" /><stop offset="100%" stopColor="#CFE6FF" stopOpacity="0" /></linearGradient>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-bg)`} />
    {/* # racks on both sides, receding to a vanishing point */}
    {[-1, 1].map((d) => <g key={d} opacity={0.75}>
      {[0, 1, 2, 3].map((k) => { const x0 = 540 + d * (520 - k * 110), x1 = 540 + d * (410 - k * 110), top = 120 + k * 60, bot = 1290 - k * 40
        return <g key={k}><path d={`M${x0} ${top} L${x1} ${top + 40} L${x1} ${bot - 30} L${x0} ${bot} Z`} fill="#1F2E50" stroke="#E07B2E" strokeWidth={6} />
          {[0.3, 0.55, 0.8].map((t) => <line key={t} x1={x0} y1={lerp(top, bot, t)} x2={x1} y2={lerp(top + 40, bot - 30, t)} stroke={BLUE} strokeWidth={6} />)}
          {[0.3, 0.55, 0.8].map((t) => <rect key={`b${t}`} x={Math.min(x0, x1) + 6} y={lerp(top, bot, t) - 60} width={Math.abs(x1 - x0) - 12} height={56} fill={KRAFT} opacity={0.55} />)}</g> })}
    </g>)}
    {/* # skylight shafts */}
    {[300, 560, 800].map((x, k) => <path key={x} d={`M${x - 40} 0 L${x + 40} 0 L${x + 120 + 20 * Math.sin(f / 70 + k)} 1290 L${x - 120 + 20 * Math.sin(f / 70 + k)} 1290 Z`} fill={`url(#${id}-shaft)`} />)}
    <rect x={0} y={1290} width={W} height={H - 1290} fill="#0A1122" />
  </g>
)

// # 6) the membership gate: teal wall, a turnstile rail, glossy floor
export const GateWorld: React.FC<{ f: number; id: string }> = ({ f, id }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D6F2EE" /><stop offset="100%" stopColor="#8FD1C9" /></linearGradient>
      <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" /><stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" /></radialGradient>
    </defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-wall)`} />
    {/* # big soft diamond pattern */}
    {Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, k) => <path key={`${r}-${k}`} d={`M${k * 240 + (r % 2) * 120} ${380 + r * 200} l60 -60 l60 60 l-60 60 Z`} fill="#FFFFFF" opacity={0.12} />))}
    {/* # the entrance sign band (decor above the headline) */}
    <rect x={120} y={60} width={840} height={150} rx={20} fill={TEAL2} />
    <rect x={136} y={76} width={808} height={118} rx={12} fill={TEAL} />
    <text x={540} y={160} textAnchor="middle" fill={PAPER} style={TXT(76)}>MEMBERS ENTRANCE</text>
    <circle cx={540} cy={760} r={520} fill={`url(#${id}-glow)`} opacity={0.7 + 0.1 * Math.sin(f / 40)} />
    <rect x={0} y={1290} width={W} height={H - 1290} fill="#3E8A84" />
    <rect x={0} y={1290} width={W} height={10} fill="#FFFFFF" opacity={0.25} />
  </g>
)

// # the soft vignette over everything (keeps the eye in the middle)
export const Vig: React.FC<{ id: string; k?: number }> = ({ id, k = 0.26 }) => (
  <g pointerEvents="none">
    <defs><radialGradient id={`${id}-vig`} cx="0.5" cy="0.42" r="0.75"><stop offset="62%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#0A0E18" stopOpacity={k} /></radialGradient></defs>
    <rect x={0} y={0} width={W} height={H} fill={`url(#${id}-vig)`} />
  </g>
)

// ================================================================== THINGS
// # the yellow menu board on two chains: a title line and a big price (the video's running motif)
export const PriceBoard: React.FC<{ x: number; y: number; s?: number; price?: string; title?: string; crack?: number; glow?: number; stamp?: number; stampText?: string; dx?: number }> = ({ x, y, s = 1, price = '$1.50', title = 'HOT DOG + SODA', crack = 0, glow = 0, stamp = 0, stampText = 'SINCE 1985', dx = 0 }) => (
  <g transform={`translate(${x + dx} ${y}) scale(${s})`}>
    <line x1={-150} y1={-230} x2={-150} y2={-130} stroke={INK2} strokeWidth={6} /><line x1={150} y1={-230} x2={150} y2={-130} stroke={INK2} strokeWidth={6} />
    {glow > 0 && <rect x={-260} y={-150} width={520} height={300} rx={36} fill={MUSTARD} opacity={0.35 * glow} />}
    <rect x={-236} y={-126} width={472} height={262} rx={24} fill={SHADE} />
    <rect x={-240} y={-136} width={480} height={262} rx={24} fill={MUSTARD} stroke={INK} strokeWidth={6} />
    <rect x={-222} y={-118} width={444} height={44} rx={10} fill={KETCHUP} />
    <text y={-84} textAnchor="middle" fill={PAPER} style={TXT(44)}>{title}</text>
    <text y={74} textAnchor="middle" fill={INK} style={TXT(156)}>{price}</text>
    <rect x={-222} y={-118} width={444} height={10} rx={5} fill="#FFFFFF" opacity={0.35} />
    {crack > 0 && <path d="M-40 -136 L-10 -60 L-50 0 L10 60 L-20 126" stroke={INK} strokeWidth={7} fill="none" strokeDasharray="420" strokeDashoffset={420 * (1 - crack)} strokeLinejoin="round" />}
    {stamp > 0 && <g transform={`translate(150 104) rotate(-10) scale(${lerp(1.6, 1, stamp)})`} opacity={stamp}>
      <rect x={-118} y={-34} width={236} height={68} rx={10} fill={PAPER} stroke={KETCHUP} strokeWidth={6} />
      <text y={16} textAnchor="middle" fill={KETCHUP} style={TXT(46)}>{stampText}</text></g>}
  </g>
)
// # the hot dog: a long bun, a glossy sausage, a mustard zigzag
export const HotDog: React.FC<{ x: number; y: number; s?: number; r?: number; ghost?: boolean }> = ({ x, y, s = 1, r = 0, ghost }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={ghost ? 0.45 : 1}>
    <ellipse cx={0} cy={46} rx={150} ry={16} fill={SHADE} />
    <path d="M-150 0 Q-150 44 -110 44 L110 44 Q150 44 150 0 Z" fill={BUN2} />
    <rect x={-160} y={-24} width={320} height={44} rx={22} fill={ghost ? '#B9B2AC' : SAUSAGE} />
    <rect x={-150} y={-20} width={300} height={10} rx={5} fill="#FFFFFF" opacity={0.3} />
    <path d="M-150 0 Q-150 -30 -116 -30 L-116 10 Q-140 14 -150 0 Z M150 0 Q150 -30 116 -30 L116 10 Q140 14 150 0 Z" fill={BUN} />
    <path d="M-140 2 Q-140 38 -110 38 L110 38 Q140 38 140 2 L120 12 L-120 12 Z" fill={BUN} />
    {!ghost && <path d="M-120 -6 L-90 -16 L-60 -2 L-30 -16 L0 -2 L30 -16 L60 -2 L90 -16 L120 -6" stroke={MUSTARD} strokeWidth={8} fill="none" strokeLinejoin="round" strokeLinecap="round" />}
  </g>
)
// # the soda cup with a lid and straw (colour = the drink brand, drawn generic)
export const Soda: React.FC<{ x: number; y: number; s?: number; col?: string; r?: number }> = ({ x, y, s = 1, col = KETCHUP, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={70} ry={12} fill={SHADE} />
    <path d="M-66 -220 L66 -220 L52 0 L-52 0 Z" fill={PAPER} stroke={INK} strokeWidth={5} />
    <path d="M-60 -160 L60 -160 L54 -70 L-54 -70 Z" fill={col} />
    <path d="M-46 -150 L-40 -80" stroke="#FFFFFF" strokeWidth={6} opacity={0.4} />
    <rect x={-76} y={-238} width={152} height={22} rx={8} fill={STEEL2} stroke={INK} strokeWidth={5} />
    <path d="M10 -236 L34 -330" stroke={col} strokeWidth={12} strokeLinecap="round" />
  </g>
)
// # a coin
export const Coin: React.FC<{ x: number; y: number; s?: number; t?: string }> = ({ x, y, s = 1, t = '$' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={8} rx={44} ry={44} fill={GOLD2} /><circle r={44} fill={GOLD} /><circle r={32} fill="none" stroke={GOLD2} strokeWidth={5} />
    <text y={16} textAnchor="middle" fill={GOLD2} style={TXT(46)}>{t}</text>
    <path d="M-26 -22 Q-10 -34 8 -32" stroke="#FFF3C4" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
)
// # a stack of n coins (bottom at origin)
export const CoinStack: React.FC<{ x: number; y: number; n: number; s?: number }> = ({ x, y, n, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k} transform={`translate(${k % 2 ? 3 : -3} ${-k * 18})`}><ellipse cx={0} cy={0} rx={56} ry={16} fill={GOLD2} /><rect x={-56} y={-14} width={112} height={14} fill={GOLD2} /><ellipse cx={0} cy={-14} rx={56} ry={16} fill={GOLD} /></g>)}
  </g>
)
// # a big yellow sale sticker (starburst) with a word
export const Burst: React.FC<{ x: number; y: number; s?: number; t: string; col?: string; ink?: string; r?: number; size?: number }> = ({ x, y, s = 1, t, col = MUSTARD, ink = INK, r = -8, size = 60 }) => {
  const pts = Array.from({ length: 28 }, (_, k) => { const a = (k / 28) * Math.PI * 2, rr = k % 2 ? 116 : 136; return `${Math.cos(a) * rr},${Math.sin(a) * rr * 0.72}` }).join(' ')
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}><polygon points={pts} fill={SHADE} transform="translate(6 8)" /><polygon points={pts} fill={col} stroke={INK} strokeWidth={5} /><text y={size * 0.36} textAnchor="middle" fill={ink} style={TXT(size)}>{t}</text></g>
}
// # an apartment block with a rising price flag (rent)
export const Apartment: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={130} ry={14} fill={SHADE} />
    <rect x={-110} y={-300} width={220} height={300} fill="#E39B6B" stroke={INK} strokeWidth={5} />
    <rect x={-120} y={-316} width={240} height={22} fill="#A65D36" stroke={INK} strokeWidth={5} />
    {[0, 1, 2].map((r) => [0, 1, 2].map((k) => <rect key={`${r}${k}`} x={-86 + k * 64} y={-270 + r * 76} width={44} height={50} fill="#FFE7A8" stroke={INK} strokeWidth={4} />))}
    <rect x={-26} y={-60} width={52} height={60} fill="#7B4A2C" stroke={INK} strokeWidth={4} />
  </g>
)
// # a paper grocery bag with leafy greens and a baguette
export const GroceryBag: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={110} ry={12} fill={SHADE} />
    <path d="M30 -200 L70 -330" stroke="#E8C28A" strokeWidth={34} strokeLinecap="round" />
    <circle cx={-40} cy={-220} r={44} fill="#5FB35A" /><circle cx={-6} cy={-240} r={40} fill="#7CCB6E" /><circle cx={-70} cy={-196} r={30} fill="#4A9B47" />
    <path d="M-100 -200 L100 -200 L90 0 L-90 0 Z" fill={KRAFT} stroke={INK} strokeWidth={5} />
    <path d="M-100 -200 L100 -200 L96 -176 L-96 -176 Z" fill={KRAFT2} opacity={0.6} />
  </g>
)
// # a price flag on a stick with an up arrow (a price that keeps climbing)
export const UpTag: React.FC<{ x: number; y: number; s?: number; t: string; col?: string }> = ({ x, y, s = 1, t, col = KETCHUP }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-44} width={160} height={88} rx={16} fill={col} stroke={INK} strokeWidth={5} />
    <text y={18} textAnchor="middle" fill={PAPER} style={TXT(52)}>{t}</text>
    <path d="M110 30 L110 -40 M88 -18 L110 -44 L132 -18" stroke={col} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
)
// # a big tick / a big cross
export const Tick: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={70} fill={MINT} stroke={INK} strokeWidth={5} /><path d="M-34 0 L-8 26 L36 -24" stroke="#FFFFFF" strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
)
export const Cross: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M-60 -60 L60 60 M60 -60 L-60 60" stroke={KETCHUP} strokeWidth={26} strokeLinecap="round" /><path d="M-60 -60 L60 60 M60 -60 L-60 60" stroke="#FF8A7A" strokeWidth={8} strokeLinecap="round" opacity={0.5} /></g>
)
// # a wall calendar page showing one year (flips by changing the year)
export const YearPage: React.FC<{ x: number; y: number; s?: number; year: string; col?: string; r?: number }> = ({ x, y, s = 1, year, col = KETCHUP, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-136} y={-150} width={280} height={310} rx={14} fill={SHADE} />
    <rect x={-140} y={-160} width={280} height={310} rx={14} fill={PAPER} stroke={INK} strokeWidth={5} />
    <rect x={-140} y={-160} width={280} height={80} rx={14} fill={col} />
    {[-90, -30, 30, 90].map((rx) => <circle key={rx} cx={rx} cy={-160} r={10} fill={INK2} />)}
    <text y={70} textAnchor="middle" fill={INK} style={TXT(120)}>{year}</text>
    <text y={-104} textAnchor="middle" fill={PAPER} style={TXT(40)}>YEAR</text>
  </g>
)
// # a box truck, drawn generic ("BRAND X" sausages); faces right
export const Truck: React.FC<{ x: number; y: number; s?: number; t?: string }> = ({ x, y, s = 1, t = 'HOT DOG BRAND' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={260} ry={18} fill={SHADE} />
    <rect x={-250} y={-250} width={340} height={210} rx={10} fill={PAPER} stroke={INK} strokeWidth={5} />
    <rect x={-230} y={-200} width={300} height={70} rx={8} fill={BLUE} />
    <text x={-80} y={-150} textAnchor="middle" fill={PAPER} style={TXT(44)}>{t}</text>
    <path d="M90 -170 L180 -170 L240 -100 L240 -40 L90 -40 Z" fill={KETCHUP} stroke={INK} strokeWidth={5} />
    <path d="M110 -156 L172 -156 L214 -106 L110 -106 Z" fill="#BFE3FF" stroke={INK} strokeWidth={4} />
    {[-170, -40, 170].map((wx) => <g key={wx}><circle cx={wx} cy={-30} r={34} fill={INK} /><circle cx={wx} cy={-30} r={14} fill={STEEL2} /></g>)}
  </g>
)
// # our own hot dog plant: a brick-and-steel shed, a chimney with steam, a sign and a state pennant (origin = ground centre)
export const Plant: React.FC<{ x: number; y: number; s?: number; f: number; state: string; col?: string }> = ({ x, y, s = 1, f, state, col = MINT }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={230} ry={18} fill={SHADE} />
    {[0, 1, 2].map((k) => { const t = ((f / 40 + k / 3) % 1); return <circle key={k} cx={130 + 20 * t} cy={-330 - 140 * t} r={26 + 30 * t} fill="#FFFFFF" opacity={0.7 * (1 - t)} /> })}
    <rect x={110} y={-330} width={44} height={140} fill="#9A4B33" stroke={INK} strokeWidth={5} />
    <path d="M-220 -180 L-220 0 L220 0 L220 -180 L150 -240 L80 -180 L10 -240 L-60 -180 L-130 -240 L-220 -180 Z" fill="#C8674A" stroke={INK} strokeWidth={5} />
    {[-160, -60, 40, 140].map((wx) => <rect key={wx} x={wx} y={-150} width={60} height={60} fill="#FFE7A8" stroke={INK} strokeWidth={4} />)}
    <rect x={-60} y={-70} width={120} height={70} fill={STEEL3} stroke={INK} strokeWidth={4} />
    {[-50, -30, -10, 10, 30, 50].map((lx) => <line key={lx} x1={lx} y1={-70} x2={lx} y2={0} stroke={INK2} strokeWidth={3} />)}
    {/* # the pennant with the state */}
    <line x1={-200} y1={-180} x2={-200} y2={-330} stroke={INK} strokeWidth={6} />
    <path d={`M-200 -330 L${-90 + 6 * Math.sin(f / 8)} -300 L-200 -270 Z`} fill={col} stroke={INK} strokeWidth={4} />
    <text x={-168} y={-286} textAnchor="middle" fill={PAPER} style={TXT(36)}>{state}</text>
  </g>
)
// # a conveyor belt (origin = centre of the belt top); items ride on it
export const Conveyor: React.FC<{ x: number; y: number; w?: number; f: number }> = ({ x, y, w = 760, f }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={0} width={w} height={36} rx={18} fill={INK} />
    {Array.from({ length: Math.floor(w / 60) }, (_, k) => <circle key={k} cx={-w / 2 + 30 + k * 60} cy={18} r={12} fill={STEEL3} transform={`rotate(${f * 8} ${-w / 2 + 30 + k * 60} 18)`} />)}
    {[-w / 2 + 40, w / 2 - 40].map((lx) => <rect key={lx} x={lx - 10} y={36} width={20} height={140} fill={STEEL3} />)}
  </g>
)
// # a padlock (locks the price)
export const Lock: React.FC<{ x: number; y: number; s?: number; open?: number }> = ({ x, y, s = 1, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M-40 -10 L-40 -60 A40 40 0 0 1 40 -60 L40 ${-10 - 30 * open}`} stroke={STEEL3} strokeWidth={18} fill="none" />
    <rect x={-64} y={-14} width={128} height={110} rx={16} fill={GOLD} stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={30} r={14} fill={INK} /><rect x={-5} y={30} width={10} height={36} fill={INK} />
  </g>
)
// # a sauce bottle (mustard or ketchup)
export const Bottle: React.FC<{ x: number; y: number; s?: number; col?: string; r?: number }> = ({ x, y, s = 1, col = MUSTARD, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-40 0 L-44 -150 Q-44 -176 -20 -184 L20 -184 Q44 -176 44 -150 L40 0 Z" fill={col} stroke={INK} strokeWidth={5} />
    <path d="M-12 -184 L-6 -230 L6 -230 L12 -184 Z" fill={col} stroke={INK} strokeWidth={4} />
    <rect x={-30} y={-120} width={60} height={50} rx={8} fill={PAPER} opacity={0.85} />
    <path d="M-30 -160 L-26 -20" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} />
  </g>
)
// # a wall chart: a line that dives down (losing money), drawn on a little easel board
export const LossChart: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => {
  const pts: [number, number][] = [[-170, -90], [-90, -60], [-20, -70], [50, 10], [110, 40], [170, 110]]
  const n = Math.max(1, Math.round(lerp(1, pts.length - 1, t)))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-210} y={-170} width={420} height={330} rx={16} fill={PAPER} stroke={INK} strokeWidth={5} />
      {[-110, -50, 10, 70, 130].map((gy) => <line key={gy} x1={-190} y1={gy} x2={190} y2={gy} stroke={STEEL2} strokeWidth={2} />)}
      <polyline points={pts.slice(0, n + 1).map((p) => p.join(',')).join(' ')} fill="none" stroke={KETCHUP} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
      {n >= pts.length - 1 && <path d="M150 80 L176 116 L134 116" fill={KETCHUP} />}
    </g>
  )
}
// # a light bulb (they figured it out)
export const Bulb: React.FC<{ x: number; y: number; s?: number; lit?: number }> = ({ x, y, s = 1, lit = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {lit > 0 && Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * Math.PI * 2; return <line key={k} x1={Math.cos(a) * 100} y1={-30 + Math.sin(a) * 100} x2={Math.cos(a) * (100 + 40 * lit)} y2={-30 + Math.sin(a) * (100 + 40 * lit)} stroke={MUSTARD} strokeWidth={10} strokeLinecap="round" opacity={lit} /> })}
    <circle cx={0} cy={-30} r={76} fill={lit > 0.5 ? '#FFE680' : '#E8E4D6'} stroke={INK} strokeWidth={5} />
    <rect x={-34} y={40} width={68} height={50} rx={8} fill={STEEL3} stroke={INK} strokeWidth={5} />
    <path d="M-22 -30 Q0 -70 22 -30" stroke={GOLD2} strokeWidth={6} fill="none" />
  </g>
)
// # a rolling number counter (odometer) in a steel box
export const Odometer: React.FC<{ x: number; y: number; s?: number; text: string; w?: number }> = ({ x, y, s = 1, text, w = 760 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-w / 2 - 10} y={-86} width={w + 20} height={172} rx={22} fill={SHADE} />
    <rect x={-w / 2} y={-96} width={w} height={172} rx={22} fill={STEEL3} stroke={INK} strokeWidth={6} />
    <rect x={-w / 2 + 18} y={-78} width={w - 36} height={136} rx={12} fill={INK} />
    <text y={30} textAnchor="middle" fill={MUSTARD} style={TXT(120)}>{text}</text>
    <rect x={-w / 2 + 18} y={-78} width={w - 36} height={30} rx={12} fill="#FFFFFF" opacity={0.08} />
  </g>
)
// # a round wall clock (hands spin with f)
export const Clock: React.FC<{ x: number; y: number; s?: number; f: number; spin?: number }> = ({ x, y, s = 1, f, spin = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={120} fill={PAPER} stroke={INK} strokeWidth={10} />
    {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return <line key={k} x1={Math.cos(a) * 96} y1={Math.sin(a) * 96} x2={Math.cos(a) * 108} y2={Math.sin(a) * 108} stroke={INK} strokeWidth={6} /> })}
    <line x1={0} y1={0} x2={0} y2={-70} stroke={INK} strokeWidth={10} strokeLinecap="round" transform={`rotate(${f * 3 * spin})`} />
    <line x1={0} y1={0} x2={0} y2={-96} stroke={KETCHUP} strokeWidth={6} strokeLinecap="round" transform={`rotate(${f * 36 * spin})`} />
    <circle r={10} fill={INK} />
  </g>
)
// # a wooden pallet loaded with bundled cash (origin = ground centre)
export const CashPallet: React.FC<{ x: number; y: number; s?: number; rows?: number }> = ({ x, y, s = 1, rows = 4 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={200} ry={16} fill={SHADE} />
    <rect x={-190} y={-30} width={380} height={30} fill="#B88B55" stroke={INK} strokeWidth={4} />
    {[-150, 0, 150].map((bx) => <rect key={bx} x={bx - 24} y={-30} width={48} height={30} fill="#8E6A3E" />)}
    {Array.from({ length: rows }, (_, r) => [0, 1, 2, 3].map((k) => <g key={`${r}${k}`} transform={`translate(${-135 + k * 90} ${-62 - r * 34})`}>
      <rect x={-42} y={-16} width={84} height={32} rx={4} fill="#9FD39B" stroke="#3F7A3D" strokeWidth={3} />
      <rect x={-8} y={-16} width={16} height={32} fill={PAPER} opacity={0.85} /></g>))}
  </g>
)
// # the membership card: teal, a photo square, MEMBER, a stripe (drawn generic, no logo)
export const MemberCard: React.FC<{ x: number; y: number; s?: number; r?: number; shine?: number }> = ({ x, y, s = 1, r = 0, shine = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-230} y={-136} width={460} height={290} rx={26} fill={SHADE} />
    <rect x={-236} y={-148} width={472} height={290} rx={26} fill={TEAL} stroke={INK} strokeWidth={6} />
    <rect x={-236} y={-100} width={472} height={46} fill={TEAL2} />
    <rect x={-200} y={-30} width={120} height={140} rx={12} fill={PAPER} />
    <circle cx={-140} cy={20} r={28} fill={STEEL3} /><path d="M-186 106 Q-140 46 -94 106 Z" fill={STEEL3} />
    <text x={70} y={30} textAnchor="middle" fill={PAPER} style={TXT(72)}>MEMBER</text>
    <rect x={-50} y={60} width={240} height={14} rx={7} fill={PAPER} opacity={0.5} />
    <rect x={-50} y={88} width={160} height={14} rx={7} fill={PAPER} opacity={0.35} />
    {shine > 0 && <path d={`M${lerp(-300, 300, shine)} -148 l80 0 l-120 290 l-80 0 Z`} fill="#FFFFFF" opacity={0.25 * Math.sin(Math.PI * shine)} />}
  </g>
)
// # a pie split in two: the shaded share grows to `share` (0–1) with `t`
export const SharePie: React.FC<{ x: number; y: number; r?: number; share: number; t: number; col?: string; rest?: string }> = ({ x, y, r = 170, share, t, col = TEAL, rest = STEEL2 }) => {
  const a = Math.PI * 2 * share * t - Math.PI / 2
  const large = share * t > 0.5 ? 1 : 0
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r + 8} fill={SHADE} cx={6} cy={10} />
      <circle r={r} fill={rest} stroke={INK} strokeWidth={6} />
      {t > 0.001 && <path d={`M0 0 L0 ${-r} A${r} ${r} 0 ${large} 1 ${Math.cos(a) * r} ${Math.sin(a) * r} Z`} fill={col} stroke={INK} strokeWidth={6} />}
    </g>
  )
}
// # a balance scale (tilt: + = right pan down); pans at ±220, the beam pivots at the origin
export const Balance: React.FC<{ x: number; y: number; s?: number; tilt: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ x, y, s = 1, tilt, left, right }) => {
  const a = (tilt * Math.PI) / 180, dy = Math.sin(a) * 220
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 0 L-30 360 L30 360 L14 0 Z" fill={GOLD2} />
      <rect x={-110} y={352} width={220} height={26} rx={10} fill={GOLD2} stroke={INK} strokeWidth={4} />
      <g transform={`rotate(${tilt})`}><rect x={-240} y={-10} width={480} height={20} rx={10} fill={GOLD} stroke={INK} strokeWidth={4} /></g>
      <circle r={20} fill={GOLD} stroke={INK} strokeWidth={4} />
      {[[-1, -dy, left], [1, dy, right]].map(([d, oy, node], k) => { const px = (d as number) * Math.cos(a) * 220
        return <g key={k} transform={`translate(${px} ${oy as number})`}>
          <line x1={0} y1={0} x2={-80} y2={130} stroke={INK2} strokeWidth={4} /><line x1={0} y1={0} x2={80} y2={130} stroke={INK2} strokeWidth={4} />
          <path d="M-110 130 Q0 190 110 130 Z" fill={GOLD} stroke={INK} strokeWidth={4} />
          <g transform="translate(0 126)">{node as React.ReactNode}</g></g> })}
    </g>
  )
}
// # a heart (trust)
export const Heart: React.FC<{ x: number; y: number; s?: number; col?: string }> = ({ x, y, s = 1, col = KETCHUP }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0 40 C-90 -20 -70 -100 0 -60 C70 -100 90 -20 0 40 Z" fill={col} stroke={INK} strokeWidth={5} /><path d="M-40 -50 Q-30 -70 -10 -62" stroke="#FFFFFF" strokeWidth={6} fill="none" opacity={0.5} strokeLinecap="round" /></g>
)
// # an eye (at a glance)
export const Eye: React.FC<{ x: number; y: number; s?: number; open?: number }> = ({ x, y, s = 1, open = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s} ${s * Math.max(0.08, open)})`}>
    <path d="M-110 0 Q0 -90 110 0 Q0 90 -110 0 Z" fill={PAPER} stroke={INK} strokeWidth={6} />
    <circle r={40} fill={BLUE} /><circle r={18} fill={INK} /><circle cx={-12} cy={-14} r={8} fill="#FFFFFF" />
  </g>
)
// # a little sparkle that pops on a cue
export const Spark: React.FC<{ f: number; at: number; x: number; y: number; col?: string }> = ({ f, at, x, y, col = '#FFFFFF' }) => {
  const t = (f - at) / 16
  if (t < 0 || t > 1) return null
  const k = Math.sin(Math.PI * t)
  return <g transform={`translate(${x} ${y}) rotate(${40 * t}) scale(${k})`} opacity={0.95}><path d="M0 -30 L6 -6 L30 0 L6 6 L0 30 L-6 6 L-30 0 L-6 -6 Z" fill={col} /></g>
}
// # a plain big label (short numbers / tags next to a drawing)
export const Tagline: React.FC<{ x: number; y: number; t: string; size?: number; col?: string; o?: number; anchor?: 'middle' | 'start' | 'end' }> = ({ x, y, t, size = 60, col = INK, o = 1, anchor = 'middle' }) => (
  <text x={x} y={y} textAnchor={anchor} fill={col} style={TXT(size)} opacity={o}>{t}</text>
)
