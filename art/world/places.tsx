// ============================================================
// WORLD PLACES — full-frame settings for LW scenes (1080 × 1920).
// Each place is drawn in 3 depth layers: far (hazy, low contrast),
// middle (where people stand, floor at FLOOR by default), and an
// optional near layer (darker, framing the shot) the scene adds last.
// Every place takes a `tone` so the same room can be night or morning.
// ============================================================
import React from 'react'
import { Beam, FLOOR, Glow, Grad, H, Motes, W, rnd } from './kit'
import { Frame, Lamp, Plant, StringLights, Tree } from './props'

// ------------------------------------------------------------ BEDROOM at night (phone light, city window)
export const BedroomNight: React.FC<{ f: number; floor?: number }> = ({ f, floor = FLOOR }) => (
  <g>
    <Grad top="#1E2340" bottom="#2B3157" />
    {/* # window: deep blue night, a moon, the far city lights */}
    <g transform="translate(640 360)">
      <rect x={-210} y={-20} width={420} height={500} rx={10} fill="#141A33" />
      <Grad x={-200} y={-10} w={400} h={480} top="#26305C" bottom="#3E4A82" />
      <circle cx={110} cy={90} r={44} fill="#F3EED8" />
      <Glow x={110} y={90} r={150} color="#DCE3FF" o={0.35} />
      {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-200 + k * 46} y={300 - (rnd(k) * 160)} width={40} height={180 + rnd(k) * 160} fill="#1A2042" />)}
      {Array.from({ length: 22 }, (_, k) => <rect key={k} x={-190 + rnd(k * 3) * 380} y={330 + rnd(k * 7) * 120} width={8} height={10} fill="#FFD98A" opacity={0.4 + 0.5 * Math.abs(Math.sin(f / 40 + k))} />)}
      <rect x={-6} y={-10} width={12} height={480} fill="#141A33" /><rect x={-200} y={230} width={400} height={12} fill="#141A33" />
      <path d="M-230 -30 Q-200 230 -240 500 L-180 500 Q-160 230 -190 -30 Z" fill="#3B2B4D" />
      <path d="M230 -30 Q200 230 240 500 L180 500 Q160 230 190 -30 Z" fill="#3B2B4D" />
    </g>
    <Beam pts={[[440, 380], [840, 380], [900, floor + 200], [300, floor + 200]]} color="#AFC0FF" o={0.1} />
    <rect x={0} y={floor - 10} width={W} height={H - floor + 10} fill="#1A1E38" />
    <rect x={0} y={floor - 10} width={W} height={14} fill="#0F1228" opacity={0.6} />
    {/* # the bed: headboard left, a rumpled blue duvet */}
    <g transform={`translate(330 ${floor})`}>
      <rect x={-330} y={-380} width={60} height={380} rx={14} fill="#3A2C48" />
      <rect x={-300} y={-200} width={620} height={150} rx={30} fill="#3E4C86" />
      <path d="M-300 -200 Q-60 -260 320 -190 L320 -60 L-300 -60 Z" fill="#5263A6" />
      <path d="M-60 -230 Q100 -250 320 -190 L320 -150 Q120 -200 -40 -190 Z" fill="#6B7DC2" opacity={0.6} />
      <rect x={-290} y={-260} width={170} height={80} rx={34} fill="#D9D3EA" />
      <rect x={-300} y={-60} width={620} height={60} rx={8} fill="#2A2240" />
    </g>
    {/* # a bedside table with a clock */}
    <g transform={`translate(860 ${floor})`}>
      <rect x={-80} y={-170} width={160} height={170} rx={8} fill="#3A2C48" />
      <rect x={-80} y={-170} width={160} height={16} rx={6} fill="#4C3B5E" />
      <rect x={-40} y={-226} width={80} height={56} rx={10} fill="#22283E" />
      <text x={0} y={-188} textAnchor="middle" fill="#FF6B6B" style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>1:47</text>
    </g>
  </g>
)

// ------------------------------------------------------------ PARK at sunset (string lights, a lake, far trees)
export const ParkSunset: React.FC<{ f: number; floor?: number }> = ({ f, floor = FLOOR }) => (
  <g>
    <Grad top="#3D3A7A" mid="#E0718A" bottom="#FFC58A" h={floor} />
    <circle cx={720} cy={floor - 360} r={130} fill="#FFE1A8" />
    <Glow x={720} y={floor - 360} r={480} color="#FFD7A0" o={0.55} />
    {/* # soft clouds lit from below */}
    {[[180, 420, 1.1], [820, 300, 0.8], [520, 560, 0.7]].map(([x, y, s], k) => (
      <g key={k} transform={`translate(${x + Math.sin(f / 200 + k) * 10} ${y}) scale(${s})`} opacity={0.75}>
        <ellipse cx={0} cy={0} rx={160} ry={34} fill="#F7A9A0" /><ellipse cx={-50} cy={-20} rx={80} ry={36} fill="#FBC0AE" /><ellipse cx={60} cy={-14} rx={70} ry={30} fill="#FBC0AE" />
      </g>
    ))}
    {/* # far hills + tree line, hazy */}
    <path d={`M0 ${floor - 260} Q200 ${floor - 330} 420 ${floor - 280} Q700 ${floor - 340} 1080 ${floor - 270} L1080 ${floor} L0 ${floor} Z`} fill="#B5677E" opacity={0.75} />
    {Array.from({ length: 12 }, (_, k) => <circle key={k} cx={k * 96 + 20} cy={floor - 230 - rnd(k) * 30} r={60 + rnd(k + 9) * 30} fill="#8E4F6E" opacity={0.8} />)}
    {/* # the lake reflecting the sun */}
    <Grad x={0} y={floor - 200} w={W} h={120} top="#F2A28E" bottom="#C77C8E" />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={600 + Math.sin(f / 20 + k) * 30 - k * 4} y={floor - 190 + k * 14} width={240 - k * 22} height={4} rx={2} fill="#FFE7C2" opacity={0.7 - k * 0.07} />)}
    {/* # grass where people stand */}
    <Grad x={0} y={floor - 90} w={W} h={H - floor + 90} top="#6E8F5A" bottom="#3F5A3A" />
    <path d={`M0 ${floor - 90} Q540 ${floor - 120} 1080 ${floor - 90} L1080 ${floor - 70} Q540 ${floor - 100} 0 ${floor - 70} Z`} fill="#8DAF6E" opacity={0.7} />
    {/* # a big tree framing the left, string lights to the right */}
    <Tree x={90} y={floor - 40} s={2.2} c={['#7C6A8E', '#5C4A70', '#3E3052']} f={f} />
    <StringLights x0={120} y0={560} x1={1100} y1={480} sag={140} n={14} f={f} />
    <Motes f={f} n={18} y0={500} y1={floor} color="#FFE7B8" o={0.55} r={5} seed={4} />
  </g>
)

// ------------------------------------------------------------ OFFICE LOBBY by day (glass wall, skyline, a plant)
export const OfficeLobby: React.FC<{ f: number; floor?: number }> = ({ f, floor = FLOOR }) => (
  <g>
    <Grad top="#CFE4F2" bottom="#EAF2F6" h={floor} />
    {/* # skyline through the glass */}
    {Array.from({ length: 11 }, (_, k) => { const h = 300 + rnd(k + 2) * 420, x = k * 100 - 20; return (
      <g key={k}><rect x={x} y={floor - 180 - h} width={92} height={h} fill={k % 2 ? '#A9C4DA' : '#BCD3E5'} />
        {Array.from({ length: Math.floor(h / 60) }, (_, j) => <rect key={j} x={x + 14} y={floor - 160 - h + j * 60} width={64} height={22} fill="#E4F0F8" opacity={0.6} />)}</g>
    ) })}
    {/* # the glass wall: mullions + reflections */}
    {[0, 270, 540, 810, 1080].map((x) => <rect key={x} x={x - 10} y={0} width={20} height={floor} fill="#59677A" />)}
    {[0, 1, 2].map((k) => <path key={k} d={`M${120 + k * 340} 0 L${260 + k * 340} 0 L${60 + k * 340} ${floor} L${-80 + k * 340} ${floor} Z`} fill="#FFFFFF" opacity={0.18} />)}
    <rect x={0} y={floor - 190} width={W} height={14} fill="#59677A" />
    {/* # polished floor with a soft reflection band */}
    <Grad x={0} y={floor - 176} w={W} h={H - floor + 176} top="#D8D2C8" bottom="#B6AEA2" />
    <rect x={0} y={floor - 176} width={W} height={70} fill="#FFFFFF" opacity={0.25} />
    <Plant x={960} y={floor - 20} s={1.6} c="#3F7F5A" pot="#2F3440" />
    {/* # reception desk far left */}
    <g transform={`translate(110 ${floor - 40})`}><rect x={-140} y={-170} width={280} height={170} rx={10} fill="#F3EFE8" /><rect x={-140} y={-170} width={280} height={20} rx={8} fill="#2F3440" /><rect x={40} y={-170} width={100} height={170} fill="#000" opacity={0.06} /></g>
    <Motes f={f} n={8} y0={300} y1={floor} color="#FFFFFF" o={0.5} r={4} seed={8} />
  </g>
)

// ------------------------------------------------------------ SUBURB by day (a house with a porch, lawn, a tree)
export const Suburb: React.FC<{ f: number; floor?: number; house?: string }> = ({ f, floor = FLOOR, house = '#F2E3CF' }) => (
  <g>
    <Grad top="#7FB7E6" bottom="#D6ECF7" h={floor} />
    {[[200, 260], [760, 380]].map(([x, y], k) => <g key={k} transform={`translate(${x + f * 0.15} ${y})`} opacity={0.9}><ellipse rx={130} ry={36} fill="#FFFFFF" /><ellipse cx={-50} cy={-24} rx={70} ry={40} fill="#FFFFFF" /><ellipse cx={50} cy={-16} rx={60} ry={30} fill="#FFFFFF" /></g>)}
    {/* # neighbour houses far away */}
    <g opacity={0.7}>{[60, 960].map((x, k) => <g key={k} transform={`translate(${x} ${floor - 170})`}><path d="M-110 -180 L0 -280 L110 -180 Z" fill="#B88A84" /><rect x={-100} y={-180} width={200} height={180} fill="#E9DDCF" /></g>)}</g>
    {/* # THE house */}
    <g transform={`translate(560 ${floor - 120})`}>
      <path d="M-330 -420 L0 -700 L330 -420 Z" fill="#8E3B4A" />
      <path d="M0 -700 L330 -420 L250 -420 L0 -640 Z" fill="#000" opacity={0.12} />
      <rect x={-290} y={-420} width={580} height={420} fill={house} />
      <rect x={140} y={-420} width={150} height={420} fill="#000" opacity={0.07} />
      <rect x={140} y={-640} width={60} height={140} fill="#8A6A5C" />
      {[-190, 190].map((x) => <g key={x} transform={`translate(${x} -270)`}><rect x={-70} y={-70} width={140} height={130} fill="#9FCBE6" stroke="#FFFFFF" strokeWidth={10} /><rect x={-4} y={-70} width={8} height={130} fill="#FFFFFF" /><path d="M-60 -60 L20 -60 L-60 40 Z" fill="#FFFFFF" opacity={0.3} /></g>)}
      <rect x={-60} y={-210} width={120} height={210} rx={6} fill="#2E4F7A" /><circle cx={36} cy={-100} r={7} fill="#F4C35A" />
      <rect x={-130} y={-230} width={260} height={18} fill="#FFFFFF" /><rect x={-120} y={-230} width={14} height={230} fill="#FFFFFF" /><rect x={106} y={-230} width={14} height={230} fill="#FFFFFF" />
      <rect x={-150} y={0} width={300} height={28} fill="#CFC2B0" />
    </g>
    {/* # lawn + a path to the door */}
    <Grad x={0} y={floor - 120} w={W} h={H - floor + 120} top="#8CC56E" bottom="#5E9A4E" />
    <path d={`M470 ${floor - 92} L650 ${floor - 92} L760 ${H} L360 ${H} Z`} fill="#E3D6C2" />
    <Tree x={930} y={floor - 60} s={1.5} f={f} />
    {[150, 260, 820].map((x, k) => <g key={k}><circle cx={x} cy={floor - 120} r={46} fill="#5FA466" /><circle cx={x - 20} cy={floor - 134} r={26} fill="#8FC98A" /></g>)}
  </g>
)

// ------------------------------------------------------------ LIVING ROOM in the evening (sofa, lamp, a window going dark)
export const LivingEvening: React.FC<{ f: number; floor?: number; dim?: number }> = ({ f, floor = FLOOR, dim = 0 }) => (
  <g>
    <Grad top="#4A3B55" bottom="#6A5468" h={floor} />
    {/* # wallpaper stripes + skirting */}
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={k * 92} y={0} width={46} height={floor} fill="#FFFFFF" opacity={0.03} />)}
    <g transform="translate(300 420)">
      <rect x={-170} y={-20} width={340} height={420} rx={8} fill="#2E2438" />
      <Grad x={-160} y={-10} w={320} h={400} top="#2D3566" bottom="#B66E7C" />
      <rect x={-5} y={-10} width={10} height={400} fill="#2E2438" />
      <path d="M-190 -30 Q-150 200 -200 410 L-130 410 Q-110 200 -150 -30 Z" fill="#8C4458" />
    </g>
    <Frame x={760} y={420} w={200} h={150} c="#D9A47C" />
    <Frame x={860} y={640} w={110} h={130} c="#9FB8C9" />
    <rect x={0} y={floor - 10} width={W} height={H - floor + 10} fill="#3A2C38" />
    <rect x={0} y={floor - 10} width={W} height={18} fill="#2A1F2A" />
    {/* # a rug */}
    <ellipse cx={560} cy={floor + 90} rx={460} ry={70} fill="#8C4458" opacity={0.7} />
    <Lamp x={940} y={floor} on={1 - dim} />
    <Plant x={110} y={floor} s={1.4} c="#3F6E54" pot="#7A4A3E" />
    <Motes f={f} n={10} x0={700} x1={1080} y0={500} y1={floor} color="#FFD9A0" o={0.4 * (1 - dim)} r={4} seed={3} />
  </g>
)
