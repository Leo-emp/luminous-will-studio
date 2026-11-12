// ============================================================
// KIT — long video "How AI Uses Our Drinking Water" (1920×1080), drawn fresh for this video (r82/r83).
// Art direction: THE WATERWORKS. A clean mid-century infographic world in sky blue, deep teal water and warm sand:
// layered hills with drifting clouds, a white data center with roof fans, a cut-away cooling tower whose spray falls
// and whose vapour rises, glowing server racks, a town water tower and pipes to little houses, a river city between
// basalt cliffs (The Dalles), Lena's kitchen with her phone, teaspoons and drops, a power plant with a curved cooling
// tower, a closed-loop chip. Depth: far hills, mid buildings with soft shadows, near ground; light from top-right.
// Only the engine (timing, Person rig, Headline, Mini) is shared with other videos.
// ============================================================
import React from 'react'
import { clamp01, easeOut, lerp, on, rnd, span } from '../kit'

export const G = 900 // ground line
export const BB = (size: number): React.CSSProperties => ({ font: `400 ${size}px "Bebas Neue"`, letterSpacing: 1.5 })
export const A = {
  ink: '#173042', ink2: '#4C6678', paper: '#FFFDF7', sky: '#BFE4F2', skyL: '#EEF8FB', water: '#3E9BC7', waterD: '#1F6E96', aqua: '#8FD6EA', foam: '#FFFFFF',
  sand: '#EBDDBE', sandD: '#D3BF95', clay: '#C98A5A', clayD: '#9A6340', grass: '#9CC98A', grassD: '#6FA35F', pine: '#3F7A5E', steel: '#9DB0BE', steelD: '#62798A',
  concrete: '#E4DFD6', concreteD: '#BDB6AA', heat: '#EE5F3A', heatL: '#FFB36B', gold: '#F2C14E', goldD: '#C8932A', red: '#D9453B', green: '#3E9B63', night: '#22354A', basalt: '#6E6259', basaltD: '#4F463F',
}
export const win = (f: number, a: number, b: number, d = 8) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))

// ------------------------------------------------------------ the world: sky, far hills, clouds, ground
export type Mood = 'day' | 'warm' | 'dry' | 'dusk' | 'cool'
const SKIES: Record<Mood, [string, string, string, string]> = {
  day: ['#AEDCEF', '#EEF8FB', '#A9CFA0', '#9CC98A'],
  warm: ['#F6D8B0', '#FFF4E2', '#D8C49A', '#E3D2A6'],
  dry: ['#F4C795', '#FCEBD2', '#D9A877', '#E7CDA0'],
  dusk: ['#6E7BA8', '#F3B48C', '#7B7E8C', '#A6A08E'],
  cool: ['#CFE3EC', '#F4F8F8', '#B8CBC4', '#C6D6CC'],
}
export const World: React.FC<{ id: string; f: number; mood?: Mood; ground?: string; hills?: boolean }> = ({ id, f, mood = 'day', ground, hills = true }) => {
  const [s0, s1, h0, g0] = SKIES[mood]
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={s0} /><stop offset="1" stopColor={s1} /></linearGradient>
        <linearGradient id={`${id}-gr`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={ground ?? g0} /><stop offset="1" stopColor={A.sandD} /></linearGradient>
        <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="0.7" stopColor="#000" stopOpacity={0} /><stop offset="1" stopColor="#0B2233" stopOpacity={0.18} /></radialGradient>
      </defs>
      <rect x={-60} y={-60} width={2040} height={1200} fill={`url(#${id}-sky)`} />
      <circle cx={1640} cy={190} r={86} fill="#FFF6D8" opacity={mood === 'dusk' ? 0.5 : 0.75} />
      {[0, 1, 2].map((k) => { const x = ((f * (0.25 + k * 0.1) + k * 700) % 2400) - 240; return (
        <g key={k} opacity={0.85} transform={`translate(${x} ${170 + k * 70})`}><ellipse rx={110} ry={26} fill="#FFFFFF" /><ellipse cx={-50} cy={-14} rx={60} ry={30} fill="#FFFFFF" /><ellipse cx={40} cy={-20} rx={70} ry={34} fill="#FFFFFF" /></g>) })}
      {hills && <g>
        <path d={`M-60 ${G - 150} Q240 ${G - 270} 520 ${G - 170} T1100 ${G - 190} T1600 ${G - 230} T2000 ${G - 170} L2000 ${G} L-60 ${G} Z`} fill={h0} opacity={0.55} />
        <path d={`M-60 ${G - 70} Q300 ${G - 170} 700 ${G - 90} T1400 ${G - 110} T2000 ${G - 80} L2000 ${G} L-60 ${G} Z`} fill={h0} opacity={0.85} />
      </g>}
      <rect x={-60} y={G} width={2040} height={240} fill={`url(#${id}-gr)`} />
      <rect x={-60} y={G} width={2040} height={8} fill="#000" opacity={0.06} />
    </g>
  )
}
export const Vig: React.FC<{ id: string }> = ({ id }) => <rect x={-60} y={-60} width={2040} height={1200} fill={`url(#${id}-vg)`} pointerEvents="none" />

// ------------------------------------------------------------ small parts
export const Shadow: React.FC<{ x: number; y: number; rx: number; o?: number }> = ({ x, y, rx, o = 0.16 }) => <ellipse cx={x} cy={y} rx={rx} ry={rx * 0.12} fill="#0B2233" opacity={o} />
export const Tag: React.FC<{ x: number; y: number; t: string; o?: number; size?: number; bg?: string; fg?: string }> = ({ x, y, t, o = 1, size = 40, bg = A.paper, fg = A.ink }) => {
  if (o <= 0.001) return null
  const w = Math.max(100, t.length * size * 0.46 + 44)
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2} y={-size * 0.72 + 5} width={w} height={size * 1.24} rx={size * 0.3} fill="#0B2233" opacity={0.12} />
    <rect x={-w / 2} y={-size * 0.72} width={w} height={size * 1.24} rx={size * 0.3} fill={bg} stroke={A.ink} strokeOpacity={0.14} strokeWidth={2} />
    <text y={size * 0.32} textAnchor="middle" fill={fg} style={BB(size)}>{t}</text></g>
}
export const No: React.FC<{ x: number; y: number; r?: number; o: number }> = ({ x, y, r = 100, o }) => o > 0.01 ? (
  <g transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * o})`} opacity={o}><circle r={r} fill="none" stroke={A.red} strokeWidth={r * 0.13} /><line x1={-r * 0.7} y1={-r * 0.7} x2={r * 0.7} y2={r * 0.7} stroke={A.red} strokeWidth={r * 0.13} strokeLinecap="round" /></g>) : null

// # a water drop (tip up), with a highlight
export const Drop: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: string; face?: boolean }> = ({ x, y, s = 1, o = 1, fill = A.water, face }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M0 -46 C14 -24 30 -6 30 12 A30 30 0 0 1 -30 12 C-30 -6 -14 -24 0 -46 Z" fill={fill} stroke={A.waterD} strokeWidth={3} />
    <path d="M-14 6 Q-16 -6 -6 -18" fill="none" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" opacity={0.8} />
    {face && <g><circle cx={-9} cy={14} r={3.5} fill={A.ink} /><circle cx={9} cy={14} r={3.5} fill={A.ink} /><path d="M-7 24 Q0 29 7 24" fill="none" stroke={A.ink} strokeWidth={3} strokeLinecap="round" /></g>}
  </g>) : null

// # rising vapour puffs (loop): t = strength 0..1
export const Vapor: React.FC<{ x: number; y: number; f: number; t: number; s?: number; spread?: number }> = ({ x, y, f, t, s = 1, spread = 60 }) => t > 0.01 ? (
  <g opacity={t}>{Array.from({ length: 6 }, (_, k) => { const ph = ((f * 0.9 + k * 23) % 140) / 140; return (
    <circle key={k} cx={x + Math.sin(k * 2.1 + f / 30) * spread * ph + (k - 2.5) * 10} cy={y - ph * 260 * s} r={(22 + ph * 50) * s} fill="#FFFFFF" opacity={0.85 * (1 - ph)} />) })}</g>) : null

// # a flowing pipe: dashes move along the path while flow > 0
export const Pipe: React.FC<{ d: string; f: number; flow?: number; w?: number; o?: number; col?: string }> = ({ d, f, flow = 1, w = 26, o = 1, col = A.steel }) => o > 0.001 ? (
  <g opacity={o}>
    <path d={d} fill="none" stroke={A.steelD} strokeWidth={w + 8} strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} fill="none" stroke={A.aqua} strokeWidth={w * 0.4} strokeLinecap="round" strokeDasharray="22 30" strokeDashoffset={-f * 3} opacity={clamp01(flow)} />
  </g>) : null

// # a server rack with blinking lights; heat 0..1 tints it red and adds shimmer
export const Rack: React.FC<{ x: number; y: number; s?: number; f: number; heat?: number; seed?: number }> = ({ x, y, s = 1, f, heat = 0, seed = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Shadow x={0} y={0} rx={80} />
    <rect x={-70} y={-340} width={140} height={340} rx={10} fill="#2C3E4E" />
    <rect x={-60} y={-330} width={120} height={320} rx={6} fill="#3A5064" />
    {Array.from({ length: 9 }, (_, k) => <g key={k}><rect x={-52} y={-320 + k * 34} width={104} height={26} rx={4} fill="#22323F" />
      {[0, 1, 2].map((j) => <circle key={j} cx={-38 + j * 14} cy={-307 + k * 34} r={4} fill={rnd(seed * 31 + k * 7 + j + Math.floor(f / 9)) > 0.45 ? '#6FE3A3' : '#2F5A46'} />)}
      <rect x={10} y={-311 + k * 34} width={34} height={6} rx={3} fill="#5B7489" /></g>)}
    {heat > 0.01 && <g opacity={heat}>
      <rect x={-70} y={-340} width={140} height={340} rx={10} fill={A.heat} opacity={0.28} />
      {[0, 1, 2].map((k) => <path key={k} d={`M${-40 + k * 40} -350 q12 -24 0 -48 q-12 -24 0 -48`} fill="none" stroke={A.heatL} strokeWidth={7} strokeLinecap="round" opacity={0.5 + 0.5 * Math.sin(f / 6 + k)} transform={`translate(0 ${-((f * 1.2 + k * 14) % 30)})`} />)}
    </g>}
  </g>
)

// # the data center from outside: long white hall, roof fans, a small cooling tower block
export const DataCenter: React.FC<{ x: number; y: number; s?: number; f: number; vapor?: number; o?: number; label?: string }> = ({ x, y, s = 1, f, vapor = 0, o = 1, label }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shadow x={0} y={4} rx={420} />
    <rect x={-400} y={-230} width={800} height={230} rx={8} fill={A.concrete} />
    <rect x={-400} y={-230} width={800} height={26} fill={A.concreteD} />
    {Array.from({ length: 7 }, (_, k) => <rect key={k} x={-370 + k * 108} y={-170} width={70} height={110} rx={4} fill="#C9D7DF" stroke={A.steelD} strokeWidth={2} />)}
    {Array.from({ length: 7 }, (_, k) => <rect key={k} x={-366 + k * 108} y={-110} width={62} height={6} fill="#6FE3A3" opacity={0.4 + 0.4 * Math.sin(f / 7 + k)} />)}
    {[-260, -60, 140].map((cx, k) => <g key={k} transform={`translate(${cx} -262)`}><rect x={-70} y={-10} width={140} height={42} rx={6} fill={A.steel} /><ellipse cy={-10} rx={56} ry={12} fill={A.steelD} />
      <g transform={`rotate(${(f * 12 + k * 40) % 360})`} opacity={0.8}><rect x={-46} y={-14} width={92} height={8} rx={4} fill="#2C3E4E" transform="scale(1 0.25)" /></g></g>)}
    <g transform="translate(330 -230)"><rect x={-60} y={-110} width={120} height={110} fill={A.steel} /><rect x={-60} y={-110} width={120} height={14} fill={A.steelD} />
      {[0, 1, 2, 3].map((k) => <rect key={k} x={-50} y={-90 + k * 22} width={100} height={8} fill={A.steelD} opacity={0.6} />)}</g>
    <Vapor x={330} y={-350} f={f} t={vapor} s={0.9} spread={40} />
    {label && <text x={-380} y={-36} fill={A.ink2} style={BB(34)}>{label}</text>}
  </g>) : null

// # cut-away cooling tower: spray falls on the word, fan spins, vapour rises; shows the loop pipes
export const CoolingTower: React.FC<{ x: number; y: number; s?: number; f: number; spray?: number; vapor?: number; fan?: number; warm?: number; cool?: number; makeup?: number }> = ({ x, y, s = 1, f, spray = 0, vapor = 0, fan = 1, warm = 0, cool = 0, makeup = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Shadow x={0} y={6} rx={260} />
    <path d="M-230 0 L-190 -460 L190 -460 L230 0 Z" fill={A.concrete} stroke={A.concreteD} strokeWidth={6} />
    <path d="M-200 -20 L-168 -430 L168 -430 L200 -20 Z" fill="#D7EEF5" />
    {/* fill packing */}
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-170 + k * 4} y={-250 + k * 22} width={340 - k * 8} height={10} rx={4} fill={A.steel} opacity={0.55} />)}
    {/* basin of water at the bottom */}
    <path d="M-196 -90 L196 -90 L200 -20 L-200 -20 Z" fill={A.water} />
    <path d={`M-196 -90 Q-100 ${-98 + 4 * Math.sin(f / 8)} 0 -90 T196 -90`} fill="none" stroke={A.aqua} strokeWidth={6} />
    {/* spray from nozzles */}
    <rect x={-170} y={-372} width={340} height={14} rx={7} fill={A.steelD} />
    {spray > 0.01 && <g opacity={spray}>{Array.from({ length: 22 }, (_, k) => { const ph = ((f * 2.2 + k * 17) % 60) / 60; return <circle key={k} cx={-150 + (k % 11) * 30 + (k > 10 ? 15 : 0)} cy={-350 + ph * 250} r={5} fill={A.water} opacity={1 - ph * 0.6} /> })}</g>}
    {/* fan on top */}
    <rect x={-150} y={-500} width={300} height={44} rx={10} fill={A.steelD} />
    <g transform="translate(0 -478)"><ellipse rx={120} ry={16} fill="#2C3E4E" />
      {[0, 1, 2, 3].map((k) => { const a = (f * 14 * fan + k * 90) * Math.PI / 180; return <line key={k} x1={0} y1={0} x2={Math.cos(a) * 110} y2={Math.sin(a) * 12} stroke={A.steel} strokeWidth={10} strokeLinecap="round" /> })}</g>
    {/* air arrows in at the bottom sides */}
    {fan > 0.5 && [-1, 1].map((d) => <path key={d} d={`M${d * 330} -150 L${d * 240} -150`} stroke={A.aqua} strokeWidth={10} strokeLinecap="round" markerEnd="" opacity={0.6 + 0.3 * Math.sin(f / 8)} />)}
    <Vapor x={0} y={-520} f={f} t={vapor} s={1} spread={70} />
    {/* warm pipe in (top), cool pipe out (bottom) */}
    {warm > 0.01 && <g opacity={warm}><path d="M-520 -365 L-170 -365" stroke={A.heat} strokeWidth={30} strokeLinecap="round" /><path d="M-520 -365 L-170 -365" stroke={A.heatL} strokeWidth={10} strokeDasharray="20 24" strokeDashoffset={-f * 3} strokeLinecap="round" /></g>}
    {cool > 0.01 && <g opacity={cool}><path d="M-200 -55 L-520 -55" stroke={A.waterD} strokeWidth={30} strokeLinecap="round" /><path d="M-200 -55 L-520 -55" stroke={A.aqua} strokeWidth={10} strokeDasharray="20 24" strokeDashoffset={-f * 3} strokeLinecap="round" /></g>}
    {makeup > 0.01 && <g opacity={makeup}><path d="M420 -60 L200 -60" stroke={A.steel} strokeWidth={26} strokeLinecap="round" /><path d="M420 -60 L200 -60" stroke={A.aqua} strokeWidth={9} strokeDasharray="18 22" strokeDashoffset={f * 3} strokeLinecap="round" />
      <Drop x={430} y={-120} s={0.9} /></g>}
  </g>
)

// # a town water tower with a fill level; share = coloured slice of the tank (0..1)
export const WaterTower: React.FC<{ x: number; y: number; s?: number; fill?: number; share?: number; shareCol?: string; label?: string; o?: number }> = ({ x, y, s = 1, fill = 0.8, share = 0, shareCol = A.heat, label, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shadow x={0} y={4} rx={150} />
    {[-90, -30, 30, 90].map((lx, k) => <line key={k} x1={lx * 1.2} y1={0} x2={lx * 0.75} y2={-260} stroke={A.steelD} strokeWidth={12} />)}
    <line x1={-110} y1={-130} x2={110} y2={-130} stroke={A.steelD} strokeWidth={8} />
    <defs><clipPath id={`wt-${x}-${y}`}><rect x={-150} y={-520} width={300} height={260} rx={40} /></clipPath></defs>
    <rect x={-150} y={-520} width={300} height={260} rx={40} fill="#DCEFF6" stroke={A.steelD} strokeWidth={8} />
    <g clipPath={`url(#wt-${x}-${y})`}>
      <rect x={-150} y={-260 - 260 * fill} width={300} height={260 * fill} fill={A.water} />
      {share > 0.001 && <rect x={-150} y={-260 - 260 * fill} width={300 * share} height={260 * fill} fill={shareCol} opacity={0.9} />}
    </g>
    <path d="M-150 -500 Q0 -600 150 -500" fill={A.steel} stroke={A.steelD} strokeWidth={6} />
    {label && <text y={-360} textAnchor="middle" fill={A.paper} style={BB(52)}>{label}</text>}
  </g>) : null

export const House: React.FC<{ x: number; y: number; s?: number; c?: string; o?: number; lit?: number }> = ({ x, y, s = 1, c = '#F4C9A0', o = 1, lit = 0 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shadow x={0} y={2} rx={80} />
    <rect x={-70} y={-110} width={140} height={110} fill={c} />
    <path d="M-86 -106 L0 -180 L86 -106 Z" fill={A.clayD} />
    <rect x={-20} y={-60} width={40} height={60} fill={A.clayD} />
    <rect x={-56} y={-90} width={28} height={26} fill={lit > 0.5 ? '#FFE9A6' : '#CFE7F0'} /><rect x={28} y={-90} width={28} height={26} fill={lit > 0.5 ? '#FFE9A6' : '#CFE7F0'} />
  </g>) : null

// # a phone with a chat answer appearing (p = how much of the answer is typed)
export const Phone: React.FC<{ x: number; y: number; s?: number; r?: number; p?: number; o?: number; q?: string }> = ({ x, y, s = 1, r = 0, p = 0, o = 1, q = '?' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-150} width={160} height={300} rx={24} fill="#1F2B36" />
    <rect x={-68} y={-130} width={136} height={256} rx={12} fill="#F5FAFC" />
    <rect x={-10} y={-120} width={70} height={30} rx={12} fill={A.water} /><text x={25} y={-98} textAnchor="middle" fill="#FFF" style={BB(24)}>{q}</text>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-58} y={-76 + k * 26} width={Math.max(0, (k === 3 ? 60 : 108) * clamp01(p * 4 - k))} height={14} rx={7} fill="#C3D4DE" />)}
  </g>) : null

// # a spoon holding water (kind: teaspoon or tablespoon), fill 0..1
export const Spoon: React.FC<{ x: number; y: number; s?: number; fill?: number; o?: number; big?: boolean }> = ({ x, y, s = 1, fill = 0, o = 1, big }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s * (big ? 1.35 : 1)})`} opacity={o}>
    <rect x={60} y={-10} width={220} height={20} rx={10} fill="#B9C6CF" stroke="#7D8C96" strokeWidth={3} />
    <ellipse rx={78} ry={46} fill="#D7E0E6" stroke="#7D8C96" strokeWidth={4} />
    <ellipse cy={6} rx={66 * Math.sqrt(clamp01(fill))} ry={34 * Math.sqrt(clamp01(fill))} fill={A.water} opacity={0.9} />
    <ellipse cx={-24} cy={-14} rx={20} ry={8} fill="#FFFFFF" opacity={0.7} />
  </g>) : null

// # a plastic water bottle (fill 0..1)
export const Bottle: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number }> = ({ x, y, s = 1, o = 1, fill = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shadow x={0} y={2} rx={60} />
    <rect x={-22} y={-330} width={44} height={30} rx={6} fill={A.waterD} />
    <path d="M-30 -300 L30 -300 L60 -240 L60 -10 Q60 0 50 0 L-50 0 Q-60 0 -60 -10 L-60 -240 Z" fill="#E6F4FA" stroke={A.steelD} strokeWidth={4} />
    <path d={`M-58 ${-240 * fill} L58 ${-240 * fill} L58 -10 Q58 -2 50 -2 L-50 -2 Q-58 -2 -58 -10 Z`} fill={A.water} opacity={0.75} />
    <rect x={-60} y={-180} width={120} height={60} fill={A.paper} opacity={0.9} />
  </g>) : null

// # a power plant with a curved cooling tower and steam
export const PowerPlant: React.FC<{ x: number; y: number; s?: number; f: number; steam?: number; o?: number }> = ({ x, y, s = 1, f, steam = 0, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shadow x={0} y={4} rx={320} />
    <rect x={-300} y={-160} width={260} height={160} fill={A.concrete} /><rect x={-300} y={-160} width={260} height={20} fill={A.concreteD} />
    <rect x={-260} y={-330} width={40} height={180} fill={A.steel} /><rect x={-260} y={-330} width={40} height={16} fill={A.red} />
    <path d="M20 0 Q60 -170 30 -330 L250 -330 Q220 -170 260 0 Z" fill="#E9E5DD" stroke={A.concreteD} strokeWidth={6} />
    <path d="M60 -60 Q90 -170 70 -300" fill="none" stroke="#FFFFFF" strokeWidth={10} opacity={0.5} />
    <Vapor x={140} y={-340} f={f} t={steam} s={1.1} spread={70} />
    {[0, 1, 2].map((k) => <line key={k} x1={-280 + k * 80} y1={-120} x2={-280 + k * 80} y2={-60} stroke={A.steelD} strokeWidth={14} opacity={0.4} />)}
  </g>) : null

// # electricity pylon with a cable to the right
export const Pylon: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-50 0 L-12 -300 L12 -300 L50 0 M-34 -130 L34 -130 M-60 -250 L60 -250 M-24 -200 L24 -200" fill="none" stroke={A.steelD} strokeWidth={8} />
  </g>) : null

// # a chip with a cold plate; heat 0..1 glows red; loop 0..1 shows the closed liquid loop to a chiller at dx
export const Chip: React.FC<{ x: number; y: number; s?: number; f: number; heat?: number; loop?: number; o?: number }> = ({ x, y, s = 1, f, heat = 0, loop = 0, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-170} width={340} height={340} rx={20} fill="#2C5E46" />
    {Array.from({ length: 10 }, (_, k) => <g key={k}><rect x={-160 + k * 34} y={-196} width={10} height={26} fill={A.goldD} /><rect x={-160 + k * 34} y={170} width={10} height={26} fill={A.goldD} /></g>)}
    <rect x={-100} y={-100} width={200} height={200} rx={12} fill="#1E2A33" />
    <rect x={-100} y={-100} width={200} height={200} rx={12} fill={A.heat} opacity={0.75 * heat * (0.8 + 0.2 * Math.sin(f / 5))} />
    {loop > 0.01 && <g opacity={loop}>
      <rect x={-120} y={-120} width={240} height={240} rx={18} fill="#B8D7E4" opacity={0.6} stroke={A.waterD} strokeWidth={6} />
      <path d="M-80 -60 H80 V-20 H-80 V20 H80 V60 H-80" fill="none" stroke={A.water} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-80 -60 H80 V-20 H-80 V20 H80 V60 H-80" fill="none" stroke={A.aqua} strokeWidth={5} strokeDasharray="14 16" strokeDashoffset={-f * 3} />
    </g>}
  </g>) : null

// # a newspaper (headline is a shape row, not text)
export const Paper: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; title?: string }> = ({ x, y, s = 1, r = 0, o = 1, title = 'THE NEWS' }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-190} width={300} height={380} rx={6} fill="#F7F3E8" stroke={A.ink2} strokeWidth={3} />
    <text y={-130} textAnchor="middle" fill={A.ink} style={BB(56)}>{title}</text>
    <rect x={-120} y={-110} width={240} height={6} fill={A.ink} />
    <rect x={-120} y={-90} width={110} height={90} fill="#C9D7DF" />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={k < 4 ? 0 : -120} y={-88 + k * 26 + (k >= 4 ? 10 : 0)} width={k < 4 ? 120 : 240} height={10} rx={5} fill="#B5B0A4" />)}
  </g>) : null

// # a courthouse with columns
export const Court: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Shadow x={0} y={2} rx={220} />
    <rect x={-220} y={-40} width={440} height={40} fill={A.concreteD} />
    {[-160, -80, 0, 80, 160].map((cx) => <rect key={cx} x={cx - 18} y={-250} width={36} height={210} fill={A.concrete} stroke={A.concreteD} strokeWidth={3} />)}
    <rect x={-210} y={-280} width={420} height={34} fill={A.concreteD} />
    <path d="M-230 -280 L0 -380 L230 -280 Z" fill={A.concrete} stroke={A.concreteD} strokeWidth={4} />
  </g>) : null

// # river city between basalt cliffs (The Dalles): cliffs, the Columbia River, a few roofs
export const RiverCity: React.FC<{ f: number; o?: number }> = ({ f, o = 1 }) => o > 0.001 ? (
  <g opacity={o}>
    <path d={`M-60 ${G - 330} L180 ${G - 380} L360 ${G - 300} L520 ${G - 340} L640 ${G - 250} L-60 ${G - 200} Z`} fill={A.basalt} />
    <path d={`M1300 ${G - 260} L1460 ${G - 360} L1640 ${G - 320} L1820 ${G - 390} L1980 ${G - 330} L1980 ${G - 200} L1300 ${G - 200} Z`} fill={A.basalt} />
    {[0, 1, 2, 3, 4, 5].map((k) => <line key={k} x1={-40 + k * 110} y1={G - 330 + (k % 2) * 20} x2={-30 + k * 110} y2={G - 210} stroke={A.basaltD} strokeWidth={6} opacity={0.6} />)}
    <path d={`M-60 ${G - 200} L1980 ${G - 200} L1980 ${G - 120} L-60 ${G - 120} Z`} fill={A.water} />
    {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${((k * 420 + f * 1.5) % 2200) - 120} ${G - 165 + (k % 2) * 18} q30 -10 60 0`} fill="none" stroke="#FFFFFF" strokeWidth={5} opacity={0.7} />)}
  </g>) : null

// # rising vapour drops for counting (e.g. 8 of 10 buckets rise) — a bucket
export const Bucket: React.FC<{ x: number; y: number; s?: number; o?: number; fill?: number; col?: string }> = ({ x, y, s = 1, o = 1, fill = 1, col = A.water }) => o > 0.001 ? (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-46 -90 L46 -90 L36 0 L-36 0 Z" fill="#D7E0E6" stroke={A.steelD} strokeWidth={4} />
    <path d={`M${-46 + 10 * (1 - fill)} ${-90 * fill} L${46 - 10 * (1 - fill)} ${-90 * fill} L36 0 L-36 0 Z`} fill={col} opacity={0.85} />
    <path d="M-46 -90 Q0 -150 46 -90" fill="none" stroke={A.steelD} strokeWidth={4} />
  </g>) : null

export const arcAt = (a: [number, number], b: [number, number], t: number, lift = 140): [number, number] => [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - lift * Math.sin(Math.PI * clamp01(t))]

// # a named object reacts on its spoken word: a short swell (1 → 1.08 → 1) per cue; around() scales about a point
export const bump = (f: number, ...ks: number[]) => 1 + ks.reduce((a, k) => a + 0.08 * Math.sin(Math.PI * clamp01((f - k) / 12)), 0)
export const around = (x: number, y: number, s: number) => `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`
