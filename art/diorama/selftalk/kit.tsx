// ============================================================
// SELF-TALK KIT — the drawn parts of the Short "Why You Talk to
// Yourself So Harshly" (LW, 2026-11-14). Own art direction: an
// indoor basketball gym — honey-wood court, navy walls, chalk-white
// lines, a warm scoreboard. The harsh inner voice is a MEGAPHONE that
// throws spiky red speech bubbles (objects, never a character); the
// kind voice is a soft round mint bubble. Tall canvas 1080 × 1920.
// ============================================================
import React from 'react'
import { BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, on, lerp, span, easeOut, rnd } from '../day3/kit'

export { Person, Tag, Headline, win, pop, on, lerp, span, easeOut, rnd, BURG, CREAM, INK, GOLD, GOLD_L, CX, GROUND, W, H, type Beat } from '../day3/kit'

export const NAVY = '#2B3A67', NAVY_D = '#1F2A4D', WOOD = '#D9A066', WOOD_D = '#B97E48', HARSH = '#E0473C', MINTY = '#9FE0C4', BALL = '#E8782E'

// # the gym: navy wall with a banner stripe, a hoop on the right, a wood court
export const Gym: React.FC<{ id: string; hoop?: boolean; dim?: number }> = ({ id, hoop = true, dim = 0 }) => (
  <g>
    <defs><radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="58%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.28} /></radialGradient></defs>
    <rect width={W} height={GROUND} fill={NAVY} />
    <rect x={0} y={380} width={W} height={26} fill={GOLD} opacity={0.8} /><rect x={0} y={414} width={W} height={10} fill={CREAM} opacity={0.5} />
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={k * 190 + 40} y={470} width={120} height={160} rx={6} fill={NAVY_D} />)}
    {hoop && <g transform="translate(900 640)">
      <rect x={-130} y={-120} width={260} height={170} rx={8} fill={CREAM} stroke={INK} strokeWidth={6} /><rect x={-50} y={-40} width={100} height={70} fill="none" stroke={HARSH} strokeWidth={6} />
      <ellipse cx={0} cy={60} rx={70} ry={14} fill="none" stroke={HARSH} strokeWidth={8} />
      {[-50, -20, 10, 40].map((x, k) => <path key={k} d={`M${x} 64 L${x + 10} 130`} stroke={CREAM} strokeWidth={3} />)}
    </g>}
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={WOOD} />
    {Array.from({ length: 10 }, (_, k) => <rect key={k} x={k * 120} y={GROUND} width={4} height={H - GROUND} fill={WOOD_D} opacity={0.5} />)}
    <path d={`M80 ${GROUND + 160} Q540 ${GROUND + 40} 1000 ${GROUND + 160}`} stroke={CREAM} strokeWidth={8} fill="none" opacity={0.8} />
    <rect width={W} height={H} fill="#0A0E1C" opacity={0.5 * dim} />
  </g>
)
export const GVig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # the harsh voice: a spiky red bubble with a word
export const Spiky: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; r?: number }> = ({ x, y, text, s = 1, o = 1, r = 0 }) => {
  if (o <= 0.001) return null
  const w = text.length * 26 + 90, n = 16
  const pts = Array.from({ length: n }, (_, k) => { const a = (k / n) * Math.PI * 2, rr = k % 2 ? 1 : 1.22; return `${Math.cos(a) * (w / 2) * rr} ${Math.sin(a) * 70 * rr}` })
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
      <path d={`M${pts.join(' L')} Z`} fill={HARSH} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <text y={20} textAnchor="middle" fill={CREAM} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>
    </g>
  )
}
// # the kind voice: a soft round mint bubble
export const Soft: React.FC<{ x: number; y: number; lines: string[]; s?: number; o?: number }> = ({ x, y, lines, s = 1, o = 1 }) => o <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-Math.max(...lines.map((l) => l.length)) * 13 - 40} y={-30 - lines.length * 30} width={Math.max(...lines.map((l) => l.length)) * 26 + 80} height={lines.length * 60 + 60} rx={50} fill={MINTY} stroke={INK} strokeWidth={5} />
    <path d={`M-30 ${30 + lines.length * 30 - 4} L-60 ${80 + lines.length * 30} L10 ${30 + lines.length * 30 - 4} Z`} fill={MINTY} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    {lines.map((l, k) => <text key={k} y={-lines.length * 30 + 30 + k * 60 + 14} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>{l}</text>)}
  </g>
)

// # the megaphone the harsh voice comes from; `s` grows it
export const Megaphone: React.FC<{ x: number; y: number; s?: number; r?: number; f: number; shout?: number }> = ({ x, y, s = 1, r = 0, f, shout = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r + shout * Math.sin(f * 1.4) * 3}) scale(${s})`}>
    <path d="M-80 -30 L60 -90 L60 90 L-80 30 Z" fill={HARSH} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-120} y={-34} width={44} height={68} rx={10} fill={CREAM} stroke={INK} strokeWidth={6} />
    <rect x={-80} y={30} width={26} height={60} rx={8} fill={INK} />
    {shout > 0.05 && [0, 1, 2].map((k) => <path key={k} d={`M${90 + k * 26} -60 Q${110 + k * 26} 0 ${90 + k * 26} 60`} stroke={HARSH} strokeWidth={8} fill="none" opacity={shout * (0.9 - k * 0.25)} />)}
  </g>
)

export const Ball: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <circle r={46} fill={BALL} stroke={INK} strokeWidth={5} />
    <path d="M-46 0 L46 0 M0 -46 L0 46 M-32 -32 Q0 0 -32 32 M32 -32 Q0 0 32 32" stroke={INK} strokeWidth={4} fill="none" />
  </g>
)

// # a test paper with red marks; `fail` 0..1 adds the big red mark
export const TestPaper: React.FC<{ x: number; y: number; s?: number; r?: number; fail?: number }> = ({ x, y, s = 1, r = 0, fail = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-150} y={-190} width={300} height={380} rx={10} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
    <text y={-130} textAnchor="middle" fill={NAVY} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>VOCAB TEST</text>
    {[0, 1, 2, 3, 4].map((k) => <g key={k}><rect x={-110} y={-90 + k * 50} width={170} height={8} rx={4} fill={INK} opacity={0.25} />{k < Math.round(fail * 5) && <path d={`M80 ${-100 + k * 50} l20 20 m0 -20 l-20 20`} stroke={HARSH} strokeWidth={6} />}</g>)}
    <g opacity={fail}><text x={40} y={150} textAnchor="middle" fill={HARSH} style={{ font: "400 64px 'Bebas Neue'" }} transform="rotate(-10 40 150)">OUCH.</text></g>
  </g>
)

// # a lane of study time: a bar with a label
export const TimeBar: React.FC<{ x: number; y: number; w: number; label: string; tone: string; o?: number }> = ({ x, y, w, label, tone, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <text x={0} y={-20} fill={CREAM} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
    <rect x={0} y={0} width={Math.max(10, w)} height={60} rx={14} fill={tone} stroke={INK} strokeWidth={5} />
  </g>
)

export const ease = (f: number, a: number, b: number) => easeOut(span(f, a, b))
export const r01 = rnd
export const soft = GOLD_L
