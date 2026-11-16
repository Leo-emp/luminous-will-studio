// ============================================================
// WORLD PLACES 3 — café, 1960 clinic, bookshop, a college portico,
// mountains (a climbing trail with a flag), a road to the horizon,
// a front door / hallway. Same depth rules as places.tsx.
// ============================================================
import React from 'react'
import { FLOOR, Glow, Grad, H, Motes, W, rnd } from './kit'
import { Room, type Sky } from './places2'
import { Plant, Lamp, Frame } from './props'
import { Shelf, Desk, Typewriter } from './props2'

const SKY: Record<Sky, [string, string]> = { day: ['#8FC4EA', '#D8EEF8'], sunset: ['#3D3A7A', '#F2A27A'], night: ['#1A2042', '#3E4A82'], dawn: ['#F7C9A8', '#FFE9C8'] }

// # a café: a counter with a coffee machine, hanging lamps, a big window onto the street
export const Cafe: React.FC<{ f: number; sky?: Sky }> = ({ f, sky = 'day' }) => (
  <g>
    <Room f={f} wall={['#E9D2B8', '#D6B898']} floor="#7A5236" win={{ x: 760, y: 260, w: 520, h: 560, sky, city: true, frame: '#3A2A22' }} beam={0.14} />
    <Shelf x={200} y={300} w={300} rows={2} c="#5A3A26" />
    {[300, 560, 820].map((x, k) => <g key={k}><line x1={x} y1={0} x2={x} y2={160} stroke="#3A2A22" strokeWidth={4} /><path d={`M${x - 50} 200 L${x + 50} 200 L${x + 30} 160 L${x - 30} 160 Z`} fill="#2F4A3E" /><Glow x={x} y={220} r={180} color="#FFD9A0" o={0.5} /></g>)}
    {/* # the counter in front */}
    <rect x={0} y={FLOOR - 330} width={W} height={26} fill="#C9A27A" />
    <rect x={0} y={FLOOR - 304} width={W} height={300} fill="#5A3A26" />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={k * 124} y={FLOOR - 304} width={8} height={300} fill="#000" opacity={0.15} />)}
    <g transform={`translate(160 ${FLOOR - 330})`}><rect x={-80} y={-170} width={160} height={170} rx={10} fill="#B5BCC6" /><rect x={-60} y={-150} width={120} height={50} rx={6} fill="#3A3D46" /><rect x={-20} y={-60} width={40} height={30} fill="#3A3D46" /></g>
    <Motes f={f} n={10} y0={200} y1={FLOOR - 330} o={0.4} r={4} seed={33} />
  </g>
)

// # a 1960 doctor's office: green walls, a certificate frame, a desk with a typewriter and a name plate
export const Clinic1960: React.FC<{ f: number; plate?: string; behind?: React.ReactNode }> = ({ f, plate, behind }) => (
  <g>
    <Room f={f} wall={['#B8C9B0', '#9CB094']} floor="#8A7A64" wainscot="#7E9476" win={{ x: 840, y: 300, w: 240, h: 360, sky: 'day', city: false, frame: '#F3EDE4' }} beam={0.16} />
    <Frame x={300} y={430} w={180} h={130} c="#F3EDE4" /><Frame x={520} y={460} w={120} h={90} c="#F3EDE4" />
    <Lamp x={120} y={FLOOR} />
    {behind}
    <Desk x={560} y={FLOOR - 230} w={620} c={['#7A5236', '#5A3A26']}>
      <Typewriter x={-140} y={0} s={1.0} />
      {plate && <g transform="translate(110 0)"><path d="M-130 0 L130 0 L116 -46 L-116 -46 Z" fill="#3A2A1E" /><rect x={-112} y={-42} width={224} height={34} rx={3} fill="#E3C680" /><text y={-18} textAnchor="middle" fill="#3A2A1E" style={{ font: '400 24px "Bebas Neue"', letterSpacing: 2 }}>{plate}</text></g>}
    </Desk>
  </g>
)

// # a bookshop: tall shelves, a front table with a stack of one bestseller (cover text is a prop)
export const Bookshop: React.FC<{ f: number; cover?: string; glow?: number }> = ({ f, cover = '21 DAYS', glow = 0 }) => (
  <g>
    <Room f={f} wall={['#6E3A4A', '#5A2E3C']} floor="#5A3A26" />
    {[160, 540, 920].map((x) => <Shelf key={x} x={x} y={220} w={300} rows={5} c="#3A2420" />)}
    <Glow x={540} y={FLOOR - 300} r={520} color="#FFD98A" o={0.35 + 0.4 * glow} />
    <g transform={`translate(540 ${FLOOR - 120})`}>
      <rect x={-300} y={-20} width={600} height={30} rx={6} fill="#C9A27A" /><rect x={-280} y={10} width={20} height={110} fill="#8A5A3C" /><rect x={260} y={10} width={20} height={110} fill="#8A5A3C" />
      {[-180, 0, 180].map((x, k) => <g key={k} transform={`translate(${x} -20)`}>{[0, 1, 2, 3].map((j) => <rect key={j} x={-70} y={-34 - j * 34} width={140} height={34} fill={j % 2 ? '#F4C35A' : '#E7B84A'} stroke="#B08422" strokeWidth={2} />)}
        <g transform="translate(0 -210)"><rect x={-72} y={-100} width={144} height={200} rx={4} fill="#F4C35A" stroke="#B08422" strokeWidth={3} /><text y={-10} textAnchor="middle" fill="#7E1F35" style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>{cover.split(' ')[0]}</text><text y={34} textAnchor="middle" fill="#7E1F35" style={{ font: '400 30px "Bebas Neue"', letterSpacing: 2 }}>{cover.split(' ').slice(1).join(' ')}</text></g></g>)}
    </g>
  </g>
)

// # a college portico: steps, columns and a dome under a London sky
export const Portico: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <Grad top="#B8C8D8" bottom="#E4ECF2" h={FLOOR} />
    {[[200, 260], [780, 340]].map(([x, y], k) => <g key={k} transform={`translate(${x + f * 0.12} ${y})`} opacity={0.85}><ellipse rx={150} ry={40} fill="#FFFFFF" /><ellipse cx={-60} cy={-26} rx={80} ry={44} fill="#FFFFFF" /></g>)}
    <g transform={`translate(540 ${FLOOR - 160})`}>
      <ellipse cx={0} cy={-760} rx={150} ry={130} fill="#D6D0C6" /><rect x={-150} y={-760} width={300} height={120} fill="#D6D0C6" /><rect x={-170} y={-650} width={340} height={20} fill="#C9C2B8" />
      <path d="M-420 -560 L0 -680 L420 -560 Z" fill="#E9E4DA" /><path d="M-420 -560 L420 -560 L420 -530 L-420 -530 Z" fill="#C9C2B8" />
      {Array.from({ length: 8 }, (_, k) => <g key={k}><rect x={-380 + k * 104} y={-530} width={44} height={440} fill="#F3EFE8" /><rect x={-366 + k * 104} y={-530} width={10} height={440} fill="#000" opacity={0.06} /><rect x={-388 + k * 104} y={-110} width={60} height={20} fill="#D6D0C6" /></g>)}
      <rect x={-440} y={-90} width={880} height={30} fill="#D6D0C6" /><rect x={-470} y={-60} width={940} height={30} fill="#C9C2B8" /><rect x={-500} y={-30} width={1000} height={30} fill="#BDB6AC" />
    </g>
    <Grad x={0} y={FLOOR - 130} w={W} h={H - FLOOR + 130} top="#C9C2B8" bottom="#9A938A" />
  </g>
)

// # mountains: far ranges + one big slope with a winding trail; `flag` puts a flag on the peak
// # trail(t) gives a point on the trail (0 = bottom left, 1 = the peak) so a hiker can walk it
export const trail = (t: number) => {
  const pts = [[80, 1500], [380, 1330], [260, 1120], [560, 960], [420, 760], [700, 560], [640, 420]]
  const n = pts.length - 1, i = Math.min(n - 1, Math.floor(t * n)), u = t * n - i
  return { x: pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, y: pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u }
}
export const Mountains: React.FC<{ f: number; sky?: Sky; flag?: number; dip?: number; path?: number }> = ({ f, sky = 'dawn', flag = 1, dip = 0, path = 1 }) => {
  const [a, b] = SKY[sky]
  const d = Array.from({ length: 41 }, (_, k) => { const p = trail(k / 40); return `${k ? 'L' : 'M'}${p.x} ${p.y + (k > 14 && k < 20 ? dip * 60 * Math.sin(((k - 14) / 6) * Math.PI) : 0)}` }).join(' ')
  return (
    <g>
      <Grad top={a} bottom={b} />
      <circle cx={860} cy={300} r={90} fill="#FFF4D6" /><Glow x={860} y={300} r={420} color="#FFE7B8" o={0.5} />
      <path d="M-100 1100 L200 640 L420 900 L640 600 L900 880 L1180 620 L1180 1300 L-100 1300 Z" fill="#B7A8C8" opacity={0.6} />
      <path d="M-100 1300 L120 900 L320 1100 L560 820 L760 1060 L1000 860 L1180 1000 L1180 1500 L-100 1500 Z" fill="#9C8AB0" opacity={0.7} />
      {/* # the big mountain: lit side + shade side + a snow cap */}
      <path d={`M-200 ${H} L640 380 L1300 ${H} Z`} fill="#7E9A6E" />
      <path d={`M640 380 L1300 ${H} L760 ${H} Z`} fill="#5E7A52" />
      <path d="M640 380 L560 480 L600 470 L640 520 L690 470 L730 490 Z" fill="#FFFFFF" />
      <path d={d} stroke="#E9D8B8" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={3000} strokeDashoffset={3000 * (1 - path)} />
      {Array.from({ length: 14 }, (_, k) => { const x = rnd(k) * 1000 + 40, y = 900 + rnd(k + 20) * 900; return <g key={k} transform={`translate(${x} ${y})`}><path d="M0 -70 L30 0 L-30 0 Z" fill="#3E6A4A" /><path d="M0 -70 L30 0 L4 0 Z" fill="#2E5238" /></g> })}
      {flag > 0 && <g transform={`translate(640 384) scale(${flag})`}><rect x={-3} y={-110} width={6} height={110} fill="#5A3A26" /><path d={`M3 -110 L${80 + Math.sin(f / 6) * 6} -90 L3 -66 Z`} fill="#B3344F" /></g>}
    </g>
  )
}

// # a road running to the horizon over green hills (the long journey); `marker` adds a small signpost text
export const Road: React.FC<{ f: number; sky?: Sky; marker?: string; scroll?: number }> = ({ f, sky = 'dawn', marker, scroll = 0 }) => {
  const [a, b] = SKY[sky]
  return (
    <g>
      <Grad top={a} bottom={b} h={1000} />
      <circle cx={540} cy={820} r={130} fill="#FFF1D6" /><Glow x={540} y={820} r={520} color="#FFE2B0" o={0.6} />
      <path d="M-100 960 Q300 820 540 900 Q800 820 1180 960 L1180 1100 L-100 1100 Z" fill="#9CB88A" />
      <Grad x={0} y={940} w={W} h={H - 940} top="#8CB878" bottom="#5E9A4E" />
      <path d={`M520 940 L560 940 L900 ${H} L180 ${H} Z`} fill="#6E6A72" />
      {Array.from({ length: 8 }, (_, k) => { const t = ((k / 8 + scroll) % 1), y = 940 + t * t * 980, w = 4 + t * 30, h = 10 + t * 80; return <rect key={k} x={540 - w / 2} y={y} width={w} height={h} fill="#F3EDE4" opacity={0.9} /> })}
      {[[140, 1300, 1.4], [960, 1250, 1.2], [300, 1040, 0.6], [800, 1030, 0.5]].map(([x, y, s], k) => <g key={k} transform={`translate(${x} ${y}) scale(${s})`}><rect x={-10} y={-120} width={20} height={120} fill="#6E4A32" /><circle cx={0} cy={-170} r={80} fill="#5FA466" /><circle cx={-30} cy={-200} r={40} fill="#8FC98A" /></g>)}
      {marker && <g transform={`translate(800 ${1500})`}><rect x={-8} y={-220} width={16} height={220} fill="#F3EDE4" /><rect x={-80} y={-260} width={160} height={70} rx={8} fill="#2E8C86" /><text y={-212} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>{marker}</text></g>}
      <Motes f={f} n={10} y0={400} y1={1200} o={0.4} r={4} seed={51} />
    </g>
  )
}

// # a front door seen from the hallway (morning light through the glass), a shoe rack, coat hooks
export const Hallway: React.FC<{ f: number; sky?: Sky; open?: number; rain?: number }> = ({ f, sky = 'dawn', open = 0, rain = 0 }) => {
  const [a, b] = SKY[sky]
  return (
    <g>
      <Room f={f} wall={['#E2D6C8', '#CFC0AE']} floor="#8A6A54" />
      <g transform={`translate(600 ${FLOOR})`}>
        <rect x={-190} y={-760} width={380} height={760} fill="#5A3A26" />
        <Grad x={-170} y={-740} w={340} h={740} top={a} bottom={b} />
        {rain > 0 && Array.from({ length: 30 }, (_, k) => <line key={k} x1={-160 + rnd(k) * 320} y1={-740 + ((f * 10 + k * 40) % 740)} x2={-166 + rnd(k) * 320} y2={-710 + ((f * 10 + k * 40) % 740)} stroke="#B8C8E0" strokeWidth={3} opacity={rain} />)}
        <g transform={`scale(${1 - open * 0.85} 1) translate(${-170} 0)`}><rect x={0} y={-740} width={340} height={740} fill="#2E5C9A" /><rect x={40} y={-700} width={260} height={300} rx={8} fill="#9FCBE6" opacity={0.7} /><circle cx={300} cy={-360} r={14} fill="#F4C35A" /></g>
      </g>
      {[200, 300].map((x) => <g key={x}><circle cx={x} cy={520} r={10} fill="#5A3A26" /><path d={`M${x - 40} 530 L${x + 40} 530 L${x + 30} 820 L${x - 30} 820 Z`} fill={x === 200 ? '#B3344F' : '#2E8C86'} /></g>)}
      <Plant x={960} y={FLOOR} s={1.2} />
    </g>
  )
}

export { Room }
