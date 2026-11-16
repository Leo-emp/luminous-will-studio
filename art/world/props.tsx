// ============================================================
// WORLD PROPS — objects people use in LW scenes. Soft shading:
// every object has a light side, a shade side and a soft outline
// in a darker shade of its own colour (never flat black lines).
// ============================================================
import React from 'react'
import { useUid } from '../uid'
import { Glow } from './kit'

const OUT = '#2A1A22'   // # soft dark outline

// # a phone held or lying down; `glow` lights the screen (and the face above it)
export const Phone: React.FC<{ x: number; y: number; s?: number; r?: number; glow?: number; screen?: string }> = ({ x, y, s = 1, r = 0, glow = 1, screen = '#BFE6FF' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <Glow x={0} y={0} r={130} color={screen} o={0.55 * glow} />
    <rect x={-22} y={-40} width={44} height={80} rx={8} fill="#1C1820" />
    <rect x={-18} y={-35} width={36} height={70} rx={5} fill={screen} opacity={0.35 + 0.65 * glow} />
    <rect x={-13} y={-26} width={26} height={14} rx={3} fill="#FFFFFF" opacity={0.7 * glow} />
    <rect x={-13} y={-8} width={18} height={4} rx={2} fill="#FFFFFF" opacity={0.6 * glow} />
    <rect x={-13} y={0} width={24} height={4} rx={2} fill="#FFFFFF" opacity={0.45 * glow} />
  </g>
)

// # an open ring box with a sparkling ring
export const RingBox: React.FC<{ x: number; y: number; s?: number; open?: number; f?: number }> = ({ x, y, s = 1, open = 1, f = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Glow x={0} y={-26} r={70} color="#FFF4C8" o={0.7 * open} />
    {/* # lid swings up */}
    <g transform={`translate(0 -14) scale(1 ${-0.2 - open * 0.8}) translate(0 14)`}>
      <rect x={-26} y={-30} width={52} height={18} rx={6} fill="#9C2B44" stroke={OUT} strokeWidth={2} />
    </g>
    <rect x={-26} y={-14} width={52} height={30} rx={6} fill="#B3344F" stroke={OUT} strokeWidth={2} />
    <rect x={-20} y={-12} width={40} height={10} rx={3} fill="#F3E6D8" />
    <g opacity={open}>
      <ellipse cx={0} cy={-18} rx={11} ry={12} fill="none" stroke="#F4C35A" strokeWidth={4} />
      <path d="M-7 -32 L0 -42 L7 -32 L0 -27 Z" fill="#DDF4FF" stroke="#9FD8F0" strokeWidth={1.5} />
      {[0, 1, 2].map((k) => { const a = f / 6 + k * 2.1; return <path key={k} d="M0 -6 L2 0 L0 6 L-2 0 Z M-6 0 L0 2 L6 0 L0 -2 Z" fill="#FFFFFF" transform={`translate(${Math.cos(a) * 26} ${-40 + Math.sin(a) * 10}) scale(${0.6 + 0.5 * Math.abs(Math.sin(f / 5 + k))})`} /> })}
    </g>
  </g>
)

// # a key ring with two keys
export const Keys: React.FC<{ x: number; y: number; s?: number; r?: number; shine?: number }> = ({ x, y, s = 1, r = 0, shine = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <Glow x={0} y={10} r={60} color="#FFE7A3" o={0.6 * shine} />
    <circle cx={0} cy={0} r={12} fill="none" stroke="#C9A24A" strokeWidth={4} />
    <g transform="translate(-4 10) rotate(12)"><rect x={-5} y={0} width={10} height={36} rx={3} fill="#E7C766" stroke="#9C7A2E" strokeWidth={2} /><rect x={-5} y={26} width={14} height={5} fill="#E7C766" /><circle cx={0} cy={4} r={7} fill="#E7C766" stroke="#9C7A2E" strokeWidth={2} /></g>
    <g transform="translate(6 8) rotate(-22)"><rect x={-4} y={0} width={8} height={30} rx={3} fill="#C9CED6" stroke="#7E8692" strokeWidth={2} /><circle cx={0} cy={3} r={6} fill="#C9CED6" stroke="#7E8692" strokeWidth={2} /></g>
  </g>
)

// # a moving box (open flaps optional)
export const Box: React.FC<{ x: number; y: number; w?: number; h?: number; open?: boolean }> = ({ x, y, w = 120, h = 90, open }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={4} fill="#D9A46B" stroke="#8C6038" strokeWidth={3} />
    <rect x={-w / 2} y={-h} width={w * 0.35} height={h} fill="#C68E57" opacity={0.6} />
    <rect x={-10} y={-h} width={20} height={h * 0.5} fill="#E9C9A0" opacity={0.8} />
    {open && <g><path d={`M${-w / 2} ${-h} L${-w / 2 - 20} ${-h - 30} L${-6} ${-h - 24} L0 ${-h} Z`} fill="#E2B37C" stroke="#8C6038" strokeWidth={3} /><path d={`M${w / 2} ${-h} L${w / 2 + 18} ${-h - 32} L6 ${-h - 26} L0 ${-h} Z`} fill="#C68E57" stroke="#8C6038" strokeWidth={3} /></g>}
  </g>
)

// # a "SOLD" estate sign on a post (a sign is a prop, not a caption)
export const SoldSign: React.FC<{ x: number; y: number; s?: number; sold?: number }> = ({ x, y, s = 1, sold = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-8} y={-300} width={16} height={300} fill="#F3EDE4" stroke="#8E8478" strokeWidth={3} />
    <rect x={-8} y={-300} width={150} height={14} fill="#F3EDE4" stroke="#8E8478" strokeWidth={3} />
    <g transform="translate(70 -286)">
      <line x1={-40} y1={0} x2={-40} y2={20} stroke="#8E8478" strokeWidth={3} /><line x1={40} y1={0} x2={40} y2={20} stroke="#8E8478" strokeWidth={3} />
      <rect x={-70} y={20} width={140} height={96} rx={8} fill="#1F3A5F" stroke="#13243C" strokeWidth={3} />
      <rect x={-62} y={28} width={124} height={22} rx={4} fill="#F3EDE4" opacity={0.9} />
      <g transform={`translate(0 84) rotate(-8) scale(${sold})`}>
        <rect x={-62} y={-24} width={124} height={44} rx={6} fill="#D2463C" />
        <text y={12} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>SOLD</text>
      </g>
    </g>
  </g>
)

// # a round leafy tree (layered blobs, light from upper left)
export const Tree: React.FC<{ x: number; y: number; s?: number; c?: [string, string, string]; f?: number }> = ({ x, y, s = 1, c = ['#8FC98A', '#5FA466', '#3E7A4C'], f = 0 }) => {
  const sway = Math.sin(f / 50 + x) * 1.5
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 0 L-10 -170 Q0 -190 10 -170 L14 0 Z" fill="#7A5638" />
      <path d="M2 0 L4 -170 Q8 -180 10 -170 L14 0 Z" fill="#5E3F28" />
      <g transform={`rotate(${sway} 0 -150)`}>
        <circle cx={-70} cy={-210} r={90} fill={c[2]} />
        <circle cx={70} cy={-220} r={95} fill={c[2]} />
        <circle cx={0} cy={-290} r={110} fill={c[1]} />
        <circle cx={-60} cy={-250} r={80} fill={c[1]} />
        <circle cx={60} cy={-270} r={80} fill={c[1]} />
        <circle cx={-30} cy={-320} r={70} fill={c[0]} />
        <circle cx={-80} cy={-260} r={42} fill={c[0]} />
        <circle cx={20} cy={-350} r={36} fill={c[0]} opacity={0.8} />
      </g>
    </g>
  )
}

// # a potted plant (big leaves)
export const Plant: React.FC<{ x: number; y: number; s?: number; c?: string; pot?: string }> = ({ x, y, s = 1, c = '#4E8F62', pot = '#C9775A' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-50, -20, 10, 35, 60].map((a, k) => (
      <path key={k} d="M0 -60 Q-30 -170 0 -230 Q30 -170 0 -60 Z" fill={k % 2 ? c : '#6BAF7C'} transform={`rotate(${a} 0 -60)`} />
    ))}
    <path d="M-50 -70 L50 -70 L40 0 L-40 0 Z" fill={pot} />
    <path d="M-50 -70 L50 -70 L48 -56 L-48 -56 Z" fill="#000" opacity={0.12} />
    <path d="M10 -70 L50 -70 L40 0 L14 0 Z" fill="#000" opacity={0.1} />
  </g>
)

// # string lights between two points (warm bulbs that twinkle)
export const StringLights: React.FC<{ x0: number; y0: number; x1: number; y1: number; sag?: number; n?: number; f?: number; o?: number }> = ({ x0, y0, x1, y1, sag = 80, n = 12, f = 0, o = 1 }) => {
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + sag
  const pt = (t: number) => ({ x: (1 - t) ** 2 * x0 + 2 * (1 - t) * t * mx + t * t * x1, y: (1 - t) ** 2 * y0 + 2 * (1 - t) * t * my + t * t * y1 })
  return (
    <g opacity={o}>
      <path d={`M${x0} ${y0} Q${mx} ${my + sag * 0} ${x1} ${y1}`} stroke="#3A2A2A" strokeWidth={2} fill="none" />
      {Array.from({ length: n }, (_, k) => { const p = pt((k + 0.5) / n), tw = 0.7 + 0.3 * Math.sin(f / 8 + k * 1.7); return (
        <g key={k}><Glow x={p.x} y={p.y + 8} r={34} color="#FFD98A" o={0.55 * tw} /><circle cx={p.x} cy={p.y + 8} r={6} fill="#FFF0C2" /></g>
      ) })}
    </g>
  )
}

// # confetti / petals falling
export const Confetti: React.FC<{ f: number; lf: number; n?: number; colors?: string[]; x0?: number; x1?: number; o?: number }> = ({ f, lf, n = 26, colors = ['#F4C35A', '#E2506A', '#FFFFFF', '#9FD8F0', '#B3344F'], x0 = 120, x1 = 960, o = 1 }) => (
  <g opacity={o}>
    {Array.from({ length: n }, (_, k) => {
      const a = Math.sin(k * 91.7) * 0.5 + 0.5, sp = 3 + (k % 5)
      const x = x0 + (x1 - x0) * a + Math.sin(f / 12 + k) * 20
      const y = 300 + ((lf * sp + k * 53) % 900)
      return <rect key={k} x={x} y={y} width={12} height={7} rx={2} fill={colors[k % colors.length]} transform={`rotate(${f * 4 + k * 40} ${x + 6} ${y + 3})`} />
    })}
  </g>
)

// # an ID badge on a lanyard (the new job)
export const Badge: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-16 -70 L0 -10 L16 -70" stroke="#2E5C9A" strokeWidth={6} fill="none" />
    <rect x={-30} y={-14} width={60} height={80} rx={8} fill="#FFFFFF" stroke="#8C96A8" strokeWidth={3} />
    <rect x={-30} y={-14} width={60} height={18} rx={6} fill="#2E5C9A" />
    <circle cx={0} cy={22} r={12} fill="#C9B8A8" />
    <rect x={-18} y={42} width={36} height={6} rx={3} fill="#8C96A8" />
  </g>
)

// # a sofa seen from the front (cushions, soft shading)
export const Sofa: React.FC<{ x: number; y: number; w?: number; c?: [string, string, string] }> = ({ x, y, w = 560, c = ['#6C7FA8', '#52648C', '#3C4C70'] }) => {
  const id = useUid('sofa')
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c[0]} /><stop offset="100%" stopColor={c[1]} /></linearGradient></defs>
      <rect x={-w / 2} y={-300} width={w} height={200} rx={40} fill={`url(#${id})`} />
      <rect x={-w / 2 + 30} y={-150} width={w - 60} height={90} rx={24} fill={c[0]} />
      <rect x={-w / 2 - 30} y={-220} width={90} height={200} rx={36} fill={c[1]} />
      <rect x={w / 2 - 60} y={-220} width={90} height={200} rx={36} fill={c[1]} />
      <rect x={-w / 2 - 30} y={-60} width={w + 60} height={50} rx={14} fill={c[2]} />
      <rect x={-w / 2} y={-10} width={20} height={10} fill={c[2]} /><rect x={w / 2 - 20} y={-10} width={20} height={10} fill={c[2]} />
    </g>
  )
}

// # a floor lamp with a warm glow
export const Lamp: React.FC<{ x: number; y: number; on?: number }> = ({ x, y, on = 1 }) => (
  <g transform={`translate(${x} ${y})`}>
    <Glow x={0} y={-430} r={320} color="#FFC982" o={0.55 * on} />
    <rect x={-4} y={-420} width={8} height={420} fill="#3A2E2E" />
    <ellipse cx={0} cy={0} rx={50} ry={10} fill="#3A2E2E" />
    <path d="M-70 -400 L70 -400 L44 -500 L-44 -500 Z" fill={on > 0.5 ? '#FFE2B0' : '#C9B79A'} />
    <path d="M10 -400 L70 -400 L44 -500 L24 -500 Z" fill="#000" opacity={0.08} />
  </g>
)

// # a framed picture on a wall (simple landscape)
export const Frame: React.FC<{ x: number; y: number; w?: number; h?: number; c?: string }> = ({ x, y, w = 160, h = 120, c = '#E8B68A' }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 - 10} y={-h / 2 - 10} width={w + 20} height={h + 20} fill="#5A3E32" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={c} />
    <path d={`M${-w / 2} ${h / 2} L${-w / 6} ${0} L${w / 8} ${h / 4} L${w / 3} ${-h / 8} L${w / 2} ${h / 2} Z`} fill="#000" opacity={0.18} />
  </g>
)
