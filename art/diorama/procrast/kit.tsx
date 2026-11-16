// ============================================================
// PROCRASTINATION KIT — the drawn parts of the Short "Why You
// Procrastinate on Things You Care About" (LW, 2026-11-14).
// Own art direction for THIS video: a late-afternoon home study in
// sage green and warm coral; the avoided task is a glowing laptop;
// the uncomfortable feeling is a grey-lilac scribble FOG (an object,
// never a character: no face). Tall canvas 1080 × 1920, headline near
// y 300, captions around y 1290–1490, action between y 420 and 1240.
// Shared rig parts (Person, Tag, Headline, Vig) come from the LW kit.
// ============================================================
import React from 'react'
import { BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, on, lerp, span, easeOut, rnd } from '../day3/kit'

export { Person, Tag, Headline, Vig, win, pop, on, lerp, span, easeOut, rnd, BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, type Beat } from '../day3/kit'

// # this video's palette: sage room, coral accents, lilac fog
export const SAGE = { sky: ['#E4EFE6', '#C9DECF'], wall: '#CFE1D4', wall2: '#B7D0BF', floor: '#9DB8A6', trim: '#7E9E89' }
export const CORAL = '#EF8A6A', CORAL_D = '#C9654A', LILAC = '#9C93B5', LILAC_D = '#77708F', TEAL = '#2F6F6A'

// ------------------------------------------------------------ the room
export const Study: React.FC<{ id: string; dim?: number }> = ({ id, dim = 0 }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={SAGE.sky[0]} /><stop offset="100%" stopColor={SAGE.wall} /></linearGradient>
      <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.24} /></radialGradient>
    </defs>
    <rect width={W} height={GROUND} fill={`url(#${id}-wall)`} />
    {/* # a picture rail and a shelf with two plants: the room feels lived in */}
    <rect x={0} y={GROUND - 300} width={W} height={10} fill={SAGE.wall2} />
    <rect x={70} y={520} width={300} height={16} rx={6} fill={SAGE.trim} />
    <g transform="translate(130 520)"><rect x={-26} y={-60} width={52} height={60} rx={8} fill={CORAL} /><path d="M0 -60 Q-30 -120 -10 -150 M0 -60 Q20 -120 40 -140 M0 -60 Q0 -110 6 -160" stroke={TEAL} strokeWidth={10} fill="none" strokeLinecap="round" /></g>
    {[0, 1, 2].map((k) => <rect key={k} x={210 + k * 44} y={444 + (k % 2) * 12} width={36} height={76 - (k % 2) * 12} rx={4} fill={[BURG, TEAL, GOLD][k]} />)}
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={SAGE.floor} />
    <rect x={0} y={GROUND} width={W} height={14} fill="#000" opacity={0.1} />
    <rect width={W} height={H} fill="#2A2A40" opacity={0.35 * dim} />
  </g>
)
export const SVig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # a wooden desk; things sit on its top at y = GROUND - 300
export const DESK_TOP = GROUND - 300
export const Desk: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} ${GROUND})`}>
    <rect x={-260} y={-300} width={520} height={30} rx={8} fill="#A9744F" stroke={INK} strokeWidth={6} />
    <rect x={-240} y={-270} width={24} height={270} fill="#8A5D3E" /><rect x={216} y={-270} width={24} height={270} fill="#8A5D3E" />
    <rect x={60} y={-270} width={156} height={110} rx={6} fill="#8A5D3E" stroke={INK} strokeWidth={5} /><rect x={120} y={-222} width={36} height={10} rx={5} fill={GOLD} />
  </g>
)

// # the task: a laptop whose screen shows a document; `glow` lights the screen, `weight` sags the desk under it
export const Laptop: React.FC<{ x: number; y: number; s?: number; glow?: number; title?: string; lines?: number }> = ({ x, y, s = 1, glow = 1, title = 'THE TASK', lines = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-120} rx={260 * glow} ry={170 * glow} fill={GOLD_L} opacity={0.25 * glow} />
    <rect x={-170} y={-230} width={340} height={220} rx={14} fill={INK} />
    <rect x={-154} y={-216} width={308} height={192} rx={6} fill={lerp(0, 1, glow) > 0.5 ? '#FFFDF8' : '#D8D4CC'} />
    <text x={0} y={-172} textAnchor="middle" fill={BURG} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>
    {/* # empty page lines; `lines` 0..1 writes a first (scribbly) sentence */}
    {[0, 1, 2].map((k) => <rect key={k} x={-120} y={-140 + k * 30} width={240} height={6} rx={3} fill={INK} opacity={0.12} />)}
    {lines > 0 && <path d={`M-120 -146 ${Array.from({ length: 12 }, (_, k) => `q10 ${k % 2 ? -12 : 12} 20 0`).join(' ')}`} stroke={CORAL_D} strokeWidth={5} fill="none" strokeDasharray="400" strokeDashoffset={400 * (1 - lines)} strokeLinecap="round" />}
    <path d="M-200 -10 L200 -10 L220 10 L-220 10 Z" fill="#B9B4AC" stroke={INK} strokeWidth={5} />
  </g>
)

// # the uncomfortable feeling: a lilac scribble fog (never a face). `s` grows it, `f` keeps it boiling
export const Fog: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; seed?: number }> = ({ x, y, s = 1, o = 1, f, seed = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({ length: 7 }, (_, k) => {
      const a = (k / 7) * Math.PI * 2, r = 70 + 12 * Math.sin(f / 9 + k + seed)
      return <circle key={k} cx={Math.cos(a) * r} cy={Math.sin(a) * r * 0.6} r={66 + 10 * rnd(k + seed)} fill={k % 2 ? LILAC : LILAC_D} opacity={0.85} />
    })}
    <circle r={80} fill={LILAC} />
    {/* # restless scribbles inside */}
    <path d={`M-70 ${-10 + Math.sin(f / 4) * 6} q20 -30 40 0 t40 0 t40 0 M-50 ${30 + Math.cos(f / 5) * 6} q20 -24 40 0 t40 0`} stroke="#5E5876" strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>
)

// ------------------------------------------------------------ the easy escapes
export const Phone: React.FC<{ x: number; y: number; s?: number; r?: number; glow?: number }> = ({ x, y, s = 1, r = 0, glow = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <circle r={110} fill={GOLD_L} opacity={0.3 * glow} />
    <rect x={-50} y={-90} width={100} height={180} rx={16} fill={INK} />
    <rect x={-40} y={-76} width={80} height={146} rx={8} fill={TEAL} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-30 + (k % 2) * 34} y={-64 + Math.floor(k / 2) * 34} width={26} height={26} rx={7} fill={[CORAL, GOLD, CREAM, '#7FB7E8'][k]} />)}
  </g>
)
export const Snack: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-60 -90 L60 -90 L50 70 L-50 70 Z" fill={CORAL} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M-66 -96 L66 -96 L60 -80 L-60 -80 Z" fill={CORAL_D} stroke={INK} strokeWidth={5} />
    <circle cx={0} cy={-10} r={30} fill={GOLD} /><text x={0} y={2} textAnchor="middle" fill={INK} style={{ font: '400 30px "Bebas Neue"' }}>YUM</text>
  </g>
)
export const PlayVideo: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-60} width={180} height={120} rx={22} fill="#E24B3B" stroke={INK} strokeWidth={6} />
    <path d="M-22 -32 L36 0 L-22 32 Z" fill={CREAM} />
  </g>
)
// # a spray bottle and sparkle stars: cleaning instead of working
export const Spray: React.FC<{ x: number; y: number; s?: number; r?: number; puff?: number }> = ({ x, y, s = 1, r = 0, puff = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-34} y={-40} width={68} height={130} rx={16} fill="#7FB7E8" stroke={INK} strokeWidth={6} />
    <path d="M-20 -40 L-20 -80 L30 -80 L50 -66 L30 -60 L20 -40 Z" fill={CREAM} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {puff > 0 && [0, 1, 2].map((k) => <circle key={k} cx={70 + k * 30} cy={-70 - k * 8} r={10 + k * 6} fill="#FFFFFF" opacity={puff * (0.7 - k * 0.18)} />)}
  </g>
)
export const Twinkle: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s * (0.8 + 0.2 * Math.sin(f / 4 + x))})`} opacity={o}>
    <path d="M0 -26 Q4 -4 26 0 Q4 4 0 26 Q-4 4 -26 0 Q-4 -4 0 -26 Z" fill="#FFFFFF" />
  </g>
)

// # the bill to your future self: a long receipt that unrolls (`unroll` 0..1)
export const Bill: React.FC<{ x: number; y: number; unroll: number; s?: number; r?: number }> = ({ x, y, unroll, s = 1, r = 0 }) => {
  const h = lerp(60, 380, unroll)
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d={`M-100 0 L100 0 L100 ${h} ${Array.from({ length: 10 }, (_, k) => `L${100 - (k + 0.5) * 20} ${h + (k % 2 ? 0 : 14)}`).join(' ')} L-100 ${h} Z`} fill="#FFFFFF" stroke={INK} strokeWidth={5} />
      <text x={0} y={44} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>THE BILL</text>
      {[0, 1, 2, 3, 4].map((k) => 70 + k * 50 < h - 20 && <rect key={k} x={-70} y={70 + k * 50} width={k === 4 ? 140 : 90 + (k % 2) * 30} height={10} rx={5} fill={k === 4 ? CORAL_D : INK} opacity={k === 4 ? 0.9 : 0.3} />)}
    </g>
  )
}

// # a kitchen timer: `left` 1 = full ten minutes, 0 = rings
export const Timer: React.FC<{ x: number; y: number; s?: number; left: number; ring?: number; f: number; label?: string }> = ({ x, y, s = 1, left, ring = 0, f, label }) => {
  const shake = ring * Math.sin(f * 2) * 6
  const a = -Math.PI / 2 + Math.PI * 2 * left
  return (
    <g transform={`translate(${x + shake} ${y}) scale(${s})`}>
      <rect x={-20} y={-136} width={40} height={30} rx={8} fill={INK} />
      <circle r={110} fill={CREAM} stroke={INK} strokeWidth={8} />
      {left > 0.001 && <path d={`M0 0 L0 -96 A96 96 0 ${left > 0.5 ? 1 : 0} 1 ${Math.cos(a) * 96} ${Math.sin(a) * 96} Z`} fill={CORAL} opacity={0.9} />}
      <circle r={14} fill={INK} />
      {label && <text y={168} textAnchor="middle" fill={INK} style={{ font: '400 52px "Bebas Neue"', letterSpacing: 3 }}>{label}</text>}
      {ring > 0.05 && [-1, 1].map((d) => <path key={d} d={`M${d * 130} -50 q${d * 16} 50 0 100`} stroke={GOLD} strokeWidth={9} fill="none" strokeLinecap="round" opacity={ring} />)}
    </g>
  )
}

// # a staircase of `n` steps going up to the right, each step `w` × `h`
export const Stairs: React.FC<{ x: number; y: number; n: number; w?: number; h?: number; o?: number; fill?: string }> = ({ x, y, n, w = 130, h = 70, o = 1, fill = CORAL }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: n }, (_, k) => <rect key={k} x={k * w} y={-(k + 1) * h} width={(n - k) * w} height={h} fill={k % 2 ? CORAL_D : fill} stroke={INK} strokeWidth={5} />)}
  </g>
)

// # a sheet of paper with a heading
export const Sheet: React.FC<{ x: number; y: number; s?: number; r?: number; head: string; scrib?: number; tone?: string }> = ({ x, y, s = 1, r = 0, head, scrib = 0, tone = BURG }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-130} y={-170} width={260} height={340} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <text y={-110} textAnchor="middle" fill={tone} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>{head}</text>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-96} y={-70 + k * 46} width={192} height={6} rx={3} fill={INK} opacity={0.12} />)}
    {scrib > 0 && <path d={`M-96 -80 ${Array.from({ length: 9 }, (_, k) => `q11 ${k % 2 ? -14 : 14} 21 0`).join(' ')}`} stroke={INK} strokeWidth={6} fill="none" strokeDasharray="420" strokeDashoffset={420 * (1 - scrib)} strokeLinecap="round" />}
  </g>
)

export const lit = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export const fade = (f: number, a: number, len = 8) => on(f, a, len)
