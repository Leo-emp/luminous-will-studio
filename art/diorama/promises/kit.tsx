// ============================================================
// PROMISES KIT — the drawn parts of the Short "Why You Keep Breaking
// Promises to Yourself" (LW, 2026-11-14). Own art direction: a
// sunny front hallway in butter yellow and cobalt blue, white doors,
// a wall calendar; a promise is a STICKY NOTE that drifts away;
// an if-then plan is a little RAILWAY SWITCH: the IF moment throws
// the lever and the train rolls onto the THEN track.
// Tall canvas 1080 × 1920.
// ============================================================
import React from 'react'
import { BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, on, lerp, span, easeOut, rnd } from '../day3/kit'

export { Person, Tag, Headline, win, pop, on, lerp, span, easeOut, rnd, BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, type Beat } from '../day3/kit'

export const BUTTER = '#F8E6A8', BUTTER_D = '#EBCF7C', COBALT = '#2F5FB3', COBALT_L = '#8FB2EA', STICKY = '#FFE45C'

// # the hallway: butter wall, cobalt skirting, a white front door with a window, a coat hook
export const Hallway: React.FC<{ id: string; door?: boolean }> = ({ id, door = true }) => (
  <g>
    <defs><radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.2} /></radialGradient></defs>
    <rect width={W} height={GROUND} fill={BUTTER} />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={k * 130} y={0} width={4} height={GROUND} fill={BUTTER_D} opacity={0.6} />)}
    <rect x={0} y={GROUND - 70} width={W} height={70} fill={COBALT} />
    {door && <g transform="translate(900 0)">
      <rect x={-130} y={GROUND - 640} width={260} height={570} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
      <rect x={-80} y={GROUND - 590} width={160} height={120} rx={8} fill={COBALT_L} stroke={INK} strokeWidth={4} />
      <circle cx={90} cy={GROUND - 340} r={14} fill={GOLD} />
    </g>}
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill="#B98A5E" />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={k * 140} y={GROUND} width={4} height={H - GROUND} fill="#9C7048" />)}
  </g>
)
export const PVig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # a sticky note with handwriting
export const Sticky: React.FC<{ x: number; y: number; text: string[]; s?: number; r?: number; o?: number }> = ({ x, y, text, s = 1, r = 0, o = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-110} width={240} height={220} fill={STICKY} stroke={INK} strokeWidth={4} />
    <rect x={-120} y={-110} width={240} height={30} fill="#F2D040" />
    {text.map((t, k) => <text key={k} y={-30 + k * 52} textAnchor="middle" fill={COBALT} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 1 }}>{t}</text>)}
  </g>
)

// # the week calendar strip on the wall; `day` highlights a day index
export const Week: React.FC<{ x: number; y: number; day: number; o?: number }> = ({ x, y, day, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((d, k) => <g key={d} transform={`translate(${k * 150} 0)`}>
      <rect x={-64} y={-70} width={128} height={140} rx={10} fill={k === day ? GOLD : '#FFFFFF'} stroke={INK} strokeWidth={4} />
      <rect x={-64} y={-70} width={128} height={40} rx={10} fill={COBALT} />
      <text y={-40} textAnchor="middle" fill={CREAM} style={{ font: '400 30px "Bebas Neue"', letterSpacing: 2 }}>{d}</text>
    </g>)}
  </g>
)

// # the railway switch: an IF track that forks; `thrown` 0..1 moves the points to THEN; `train` 0..1 runs the little train
export const Switch: React.FC<{ x: number; y: number; s?: number; thrown: number; train: number; ifText: string; thenText: string }> = ({ x, y, s = 1, thrown, train, ifText, thenText }) => {
  // # the train path: straight to the fork, then up the THEN branch (if thrown) or straight on (OLD HABIT)
  const fx = 0, up = thrown > 0.5
  const tx = train < 0.5 ? lerp(-420, fx, train * 2) : lerp(fx, 380, (train - 0.5) * 2)
  const ty = train < 0.5 ? 0 : up ? lerp(0, -200, (train - 0.5) * 2) : 0
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-460 0 L0 0 L420 0" stroke="#8A6A52" strokeWidth={28} fill="none" />
      <path d="M0 0 Q200 -40 420 -200" stroke="#8A6A52" strokeWidth={28} fill="none" />
      {Array.from({ length: 14 }, (_, k) => <rect key={k} x={-450 + k * 64} y={-20} width={14} height={40} fill="#5E4634" />)}
      <path d="M-460 0 L0 0" stroke="#C9C2B8" strokeWidth={6} fill="none" />
      <path d={up ? 'M0 0 Q200 -40 420 -200' : 'M0 0 L420 0'} stroke={GOLD} strokeWidth={8} fill="none" />
      {/* # the lever */}
      <g transform={`translate(-40 60) rotate(${lerp(-30, 30, thrown)})`}><rect x={-6} y={-90} width={12} height={90} fill={INK} /><circle cy={-90} r={16} fill="#D2463C" /></g>
      <g transform="translate(-260 -90)"><rect x={-130} y={-36} width={260} height={72} rx={12} fill={COBALT} stroke={INK} strokeWidth={4} /><text y={14} textAnchor="middle" fill={CREAM} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{`IF ${ifText}`}</text></g>
      <g transform="translate(330 -270)"><rect x={-150} y={-36} width={300} height={72} rx={12} fill={GOLD} stroke={INK} strokeWidth={4} /><text y={14} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{`THEN ${thenText}`}</text></g>
      <g transform="translate(330 70)" opacity={0.6}><text textAnchor="middle" fill={INK} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>OLD HABIT</text></g>
      {/* # the little train */}
      {train > 0 && <g transform={`translate(${tx} ${ty - 40}) rotate(${up && train > 0.5 ? -24 : 0})`}><rect x={-60} y={-40} width={120} height={70} rx={14} fill={BURG} stroke={INK} strokeWidth={5} /><rect x={-40} y={-30} width={36} height={30} rx={4} fill={COBALT_L} /><circle cx={-34} cy={34} r={16} fill={INK} /><circle cx={34} cy={34} r={16} fill={INK} /></g>}
    </g>
  )
}

// # a trust meter (a jar-thermometer of self-trust)
export const Trust: React.FC<{ x: number; y: number; v: number; s?: number; crack?: number }> = ({ x, y, v, s = 1, crack = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={-340} width={100} height={340} rx={50} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <rect x={-36} y={-326 + 312 * (1 - v)} width={72} height={312 * v} rx={36} fill={COBALT} />
    {crack > 0 && <path d={`M-30 -260 L0 -220 L-20 -180 L${lerp(-20, 20, crack)} ${lerp(-180, -130, crack)}`} stroke={INK} strokeWidth={5} fill="none" />}
    <text y={60} textAnchor="middle" fill={INK} style={{ font: '400 42px "Bebas Neue"', letterSpacing: 3 }}>SELF-TRUST</text>
  </g>
)

// # a blurry, vague goal tag (soft edges)
export const Vague: React.FC<{ x: number; y: number; text: string; o?: number; s?: number }> = ({ x, y, text, o = 1, s = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <defs><filter id={`blur-${text.replace(/\W/g, '')}`}><feGaussianBlur stdDeviation="3" /></filter></defs>
    <g filter={`url(#blur-${text.replace(/\W/g, '')})`}>
      <ellipse rx={text.length * 22 + 60} ry={60} fill="#FFFFFF" opacity={0.8} />
      <text y={18} textAnchor="middle" fill={COBALT} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>
    </g>
  </g>
)

export const ease = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export const r01 = rnd
export const light = GOLD_L
