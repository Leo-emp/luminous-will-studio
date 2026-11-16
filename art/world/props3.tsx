// ============================================================
// WORLD PROPS 3 — calendar, dominoes, bricks, fruit, water,
// sneakers, a seedling, a clipboard, a hand mirror, a chart board.
// ============================================================
import React from 'react'
import { Glow } from './kit'

// # a wall calendar month: `crossed` days get a red cross, `blank` days stay empty (missed), `ring` circles one day
export const Calendar: React.FC<{ x: number; y: number; s?: number; crossed?: number; blank?: number[]; ring?: number; title?: string; days?: number; dust?: number }> = ({ x, y, s = 1, crossed = 0, blank = [], ring, title = '', days = 30, dust = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-6} y={-196} width={12} height={20} rx={4} fill="#5A616E" />
    <rect x={-220} y={-180} width={440} height={400} rx={10} fill="#FFFFFF" stroke="#C9C2B8" strokeWidth={3} />
    <rect x={-220} y={-180} width={440} height={70} rx={10} fill="#B3344F" />
    {title && <text y={-132} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>}
    {Array.from({ length: days }, (_, k) => {
      const cx = -186 + (k % 7) * 62, cy = -80 + Math.floor(k / 7) * 58
      const isBlank = blank.includes(k + 1), isX = k < crossed && !isBlank
      return <g key={k}>
        <text x={cx} y={cy + 8} textAnchor="middle" fill={isBlank ? '#D2463C' : '#8A94A4'} style={{ font: '400 24px "Bebas Neue"' }}>{k + 1}</text>
        {isX && <path d={`M${cx - 16} ${cy - 14} L${cx + 16} ${cy + 18} M${cx + 16} ${cy - 14} L${cx - 16} ${cy + 18}`} stroke="#D2463C" strokeWidth={5} strokeLinecap="round" opacity={0.85} />}
        {ring === k + 1 && <circle cx={cx} cy={cy} r={24} fill="none" stroke="#2E8C86" strokeWidth={5} />}
      </g>
    })}
    {dust > 0 && <rect x={-220} y={-110} width={440} height={330} fill="#C9B8A0" opacity={0.35 * dust} />}
  </g>
)

// # a row of dominoes on a table that topple one after another (`fall` 0..n)
export const Dominoes: React.FC<{ x: number; y: number; n?: number; fall: number; gap?: number; s?: number }> = ({ x, y, n = 12, fall, gap = 64, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, k) => {
      const t = Math.max(0, Math.min(1, fall - k))
      return <g key={k} transform={`translate(${k * gap} 0) rotate(${t * 72} 18 0)`}>
        <rect x={-12} y={-110} width={30} height={110} rx={5} fill="#FBF6EC" stroke="#2A2D34" strokeWidth={3} />
        <line x1={-8} y1={-55} x2={14} y2={-55} stroke="#2A2D34" strokeWidth={3} />
        <circle cx={3} cy={-80} r={4} fill="#2A2D34" /><circle cx={3} cy={-30} r={4} fill="#2A2D34" />
      </g>
    })}
  </g>
)

// # a brick wall that builds up course by course; `missing` leaves one gap; `fill` 0..1 puts the last brick in it
export const BrickWall: React.FC<{ x: number; y: number; rows: number; cols?: number; built: number; missing?: [number, number]; fill?: number }> = ({ x, y, rows, cols = 8, built, missing, fill = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, cI) => {
      const idx = r * cols + cI
      if (idx >= built) return null
      const gap = missing && missing[0] === r && missing[1] === cI
      if (gap && fill <= 0) return <rect key={idx} x={cI * 104 + (r % 2) * 52} y={-(r + 1) * 52} width={96} height={46} rx={4} fill="#000" opacity={0.15} />
      const drop = gap ? (1 - fill) * -120 : 0
      return <g key={idx} transform={`translate(0 ${drop})`}><rect x={cI * 104 + (r % 2) * 52} y={-(r + 1) * 52} width={96} height={46} rx={4} fill={['#C4664B', '#B85A40', '#D17556'][(idx * 7) % 3]} /><rect x={cI * 104 + (r % 2) * 52} y={-(r + 1) * 52} width={96} height={8} rx={3} fill="#FFFFFF" opacity={0.15} /></g>
    }))}
  </g>
)

// # an apple / a glass of water / a running shoe
export const Apple: React.FC<{ x: number; y: number; s?: number; bite?: boolean }> = ({ x, y, s = 1, bite }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 -26 C-30 -40 -44 -10 -38 10 C-32 34 -12 40 0 32 C12 40 32 34 38 10 C44 -10 30 -40 0 -26 Z" fill="#D2463C" />
    <path d="M10 -26 C30 -36 42 -10 38 10 C34 30 20 38 10 34 C24 20 26 -10 10 -26 Z" fill="#A8322A" />
    <path d="M0 -26 L4 -44" stroke="#5A3A26" strokeWidth={4} /><path d="M4 -40 Q20 -52 26 -36 Q12 -32 4 -40 Z" fill="#5FA466" />
    {bite && <circle cx={36} cy={0} r={14} fill="#FFFFFF" />}
  </g>
)
export const Glass: React.FC<{ x: number; y: number; s?: number; level?: number }> = ({ x, y, s = 1, level = 0.8 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-26 -80 L26 -80 L20 0 L-20 0 Z" fill="#DCEFF8" opacity={0.6} stroke="#9FC9DE" strokeWidth={3} />
    <path d={`M${-26 + 6 * (1 - level)} ${-80 * level} L${26 - 6 * (1 - level)} ${-80 * level} L20 0 L-20 0 Z`} fill="#8FC4EA" opacity={0.75} />
    <path d="M-18 -70 L-14 -10" stroke="#FFFFFF" strokeWidth={4} opacity={0.7} strokeLinecap="round" />
  </g>
)
export const Sneakers: React.FC<{ x: number; y: number; s?: number; c?: string }> = ({ x, y, s = 1, c = '#B3344F' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 70].map((dx) => <g key={dx} transform={`translate(${dx} 0)`}><path d="M-40 0 L-40 -30 Q-30 -46 -6 -44 L10 -30 Q40 -24 50 -8 L50 0 Z" fill={c} /><rect x={-42} y={-6} width={94} height={10} rx={4} fill="#F3EDE4" /><path d="M-24 -38 L0 -32 M-20 -30 L4 -24" stroke="#FFFFFF" strokeWidth={3} /></g>)}
  </g>
)

// # a small pot with a seedling that grows (`grow` 0..1)
export const Seedling: React.FC<{ x: number; y: number; s?: number; grow?: number; water?: number; f?: number }> = ({ x, y, s = 1, grow = 0.3, water = 0, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {water > 0 && Array.from({ length: 6 }, (_, k) => <circle key={k} cx={-30 + k * 12} cy={-160 + ((f * 5 + k * 17) % 80)} r={4} fill="#8FC4EA" opacity={water} />)}
    <path d={`M0 -60 Q-4 ${-60 - 80 * grow} 2 ${-70 - 120 * grow}`} stroke="#4E8F62" strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d={`M2 ${-70 - 110 * grow} Q-50 ${-90 - 120 * grow} -60 ${-50 - 110 * grow} Q-20 ${-50 - 90 * grow} 2 ${-70 - 110 * grow} Z`} fill="#6BAF7C" />
    <path d={`M2 ${-60 - 80 * grow} Q50 ${-80 - 90 * grow} 60 ${-40 - 80 * grow} Q20 ${-40 - 70 * grow} 2 ${-60 - 80 * grow} Z`} fill="#4E8F62" />
    <path d="M-50 -60 L50 -60 L40 0 L-40 0 Z" fill="#C9775A" /><path d="M-54 -66 L54 -66 L54 -52 L-54 -52 Z" fill="#B3664A" />
  </g>
)

// # a clipboard with lines + ticks; a hand mirror; a file folder (empty)
export const Clipboard: React.FC<{ x: number; y: number; s?: number; r?: number; ticks?: number }> = ({ x, y, s = 1, r = 0, ticks = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-50} y={-66} width={100} height={132} rx={6} fill="#B08A5A" /><rect x={-42} y={-56} width={84} height={114} fill="#FFFFFF" /><rect x={-20} y={-74} width={40} height={18} rx={4} fill="#5A616E" />
    {[0, 1, 2, 3].map((k) => <g key={k}><rect x={-14} y={-38 + k * 24} width={46} height={5} rx={2} fill="#C9D2DC" />{k < ticks && <path d={`M-34 ${-36 + k * 24} l6 6 l10 -12`} stroke="#2E8C86" strokeWidth={4} fill="none" strokeLinecap="round" />}</g>)}
  </g>
)
export const HandMirror: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-6} y={0} width={12} height={60} rx={5} fill="#C9A24A" /><ellipse cx={0} cy={-34} rx={36} ry={42} fill="#C9A24A" /><ellipse cx={0} cy={-34} rx={28} ry={34} fill="#DCEFF8" /><path d="M-16 -56 L0 -60 L-20 -20 Z" fill="#FFFFFF" opacity={0.6} />
  </g>
)
export const Folder: React.FC<{ x: number; y: number; s?: number; r?: number; open?: number }> = ({ x, y, s = 1, r = 0, open = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-70 -50 L-20 -50 L-10 -38 L70 -38 L70 50 L-70 50 Z" fill="#E7B84A" />
    <g transform={`translate(-70 -30) skewX(${-open * 30}) translate(70 30)`}><rect x={-70} y={-30} width={140} height={80} fill="#F4C35A" /></g>
  </g>
)

// # a chart board on an easel: a line that climbs with wobbles; `dip` adds a dip at the middle; `t` draws it
export const ChartEasel: React.FC<{ x: number; y: number; s?: number; t?: number; dip?: number; mark?: number }> = ({ x, y, s = 1, t = 1, dip = 0, mark }) => {
  const pts = Array.from({ length: 21 }, (_, k) => { const u = k / 20; const base = 1 - Math.exp(-u * 3.2); const d = dip * 0.12 * Math.exp(-Math.pow((u - 0.45) / 0.05, 2)); return [-220 + u * 440, 140 - (base - d) * 260] as [number, number] })
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-200 200 L-260 520 M200 200 L260 520 M0 200 L0 520" stroke="#6E4A32" strokeWidth={14} strokeLinecap="round" />
      <rect x={-270} y={-170} width={540} height={380} rx={10} fill="#FFFFFF" stroke="#C9C2B8" strokeWidth={6} />
      <path d="M-230 150 L230 150 M-230 150 L-230 -150" stroke="#9AA8B8" strokeWidth={4} />
      <path d={`M${pts.map((p) => p.join(' ')).join(' L')}`} stroke="#2E8C86" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={800} strokeDashoffset={800 * (1 - t)} />
      {mark !== undefined && <circle cx={pts[Math.round(mark * 20)][0]} cy={pts[Math.round(mark * 20)][1]} r={22} fill="none" stroke="#D2463C" strokeWidth={6} />}
      <Glow x={0} y={0} r={10} color="#FFF" o={0} />
    </g>
  )
}
