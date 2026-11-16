// ============================================================
// WORLD PLACES 2 — a configurable ROOM (wall colours, floor, window
// with day / sunset / night sky) plus ready-made places built on it
// and a few outdoor places (street, track, stage, savanna).
// ============================================================
import React from 'react'
import { FLOOR, Glow, Grad, H, Motes, W, rnd, Beam } from './kit'
import { Tree, Plant, Lamp, Frame } from './props'
import { Desk, Monitor, Books, Shelf, Board, Typewriter, Barbell } from './props2'

export type Sky = 'day' | 'sunset' | 'night' | 'dawn'
const SKIES: Record<Sky, [string, string]> = { day: ['#8FC4EA', '#D8EEF8'], sunset: ['#3D3A7A', '#F2A27A'], night: ['#1A2042', '#3E4A82'], dawn: ['#F7C9A8', '#FFE9C8'] }

// # a window with a sky; `city` draws far buildings
export const Window: React.FC<{ x: number; y: number; w?: number; h?: number; sky?: Sky; city?: boolean; f?: number; frame?: string; curtain?: string }> = ({ x, y, w = 360, h = 440, sky = 'day', city = true, f = 0, frame = '#F3EDE4', curtain }) => {
  const [a, b] = SKIES[sky]
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2 - 14} y={-14} width={w + 28} height={h + 28} rx={6} fill={frame} />
      <Grad x={-w / 2} y={0} w={w} h={h} top={a} bottom={b} />
      {sky === 'night' && <circle cx={w * 0.25} cy={h * 0.2} r={26} fill="#F3EED8" />}
      {(sky === 'day' || sky === 'dawn') && <circle cx={w * 0.22} cy={h * 0.25} r={40} fill="#FFF4D6" opacity={0.9} />}
      {city && Array.from({ length: 7 }, (_, k) => { const bh = 120 + rnd(k + 3) * 160; return <g key={k}><rect x={-w / 2 + k * (w / 7)} y={h - bh} width={w / 7 - 6} height={bh} fill={sky === 'night' ? '#141A36' : sky === 'sunset' ? '#7A4A6A' : '#A9C4DA'} />
        {sky === 'night' && Array.from({ length: 4 }, (_, j) => <rect key={j} x={-w / 2 + k * (w / 7) + 10} y={h - bh + 16 + j * 30} width={8} height={10} fill="#FFD98A" opacity={0.5 + 0.4 * Math.sin(f / 30 + k + j)} />)}</g> })}
      <rect x={-6} y={0} width={12} height={h} fill={frame} /><rect x={-w / 2} y={h / 2 - 6} width={w} height={12} fill={frame} />
      {curtain && <g><path d={`M${-w / 2 - 40} -24 Q${-w / 2 - 10} ${h / 2} ${-w / 2 - 50} ${h + 30} L${-w / 2 + 20} ${h + 30} Q${-w / 2 + 30} ${h / 2} ${-w / 2 + 10} -24 Z`} fill={curtain} />
        <path d={`M${w / 2 + 40} -24 Q${w / 2 + 10} ${h / 2} ${w / 2 + 50} ${h + 30} L${w / 2 - 20} ${h + 30} Q${w / 2 - 30} ${h / 2} ${w / 2 - 10} -24 Z`} fill={curtain} /></g>}
    </g>
  )
}

// # a ROOM: wall gradient, optional wainscot, floor with boards, skirting, optional window + light beam
export const Room: React.FC<{ f: number; wall: [string, string]; floor?: string; floorY?: number; wainscot?: string; win?: { x: number; y?: number; w?: number; h?: number; sky?: Sky; city?: boolean; curtain?: string; frame?: string }; beam?: number; boards?: boolean }> = ({ f, wall, floor = '#8A6A54', floorY = FLOOR, wainscot, win, beam = 0.12, boards = true }) => (
  <g>
    <Grad top={wall[0]} bottom={wall[1]} h={floorY} />
    {wainscot && <g><rect x={0} y={floorY - 300} width={W} height={300} fill={wainscot} /><rect x={0} y={floorY - 306} width={W} height={12} fill="#FFFFFF" opacity={0.35} />
      {Array.from({ length: 6 }, (_, k) => <rect key={k} x={30 + k * 180} y={floorY - 270} width={140} height={230} rx={6} fill="none" stroke="#000" strokeOpacity={0.08} strokeWidth={4} />)}</g>}
    {win && <Window x={win.x} y={win.y ?? 300} w={win.w} h={win.h} sky={win.sky} city={win.city} f={f} curtain={win.curtain} frame={win.frame} />}
    <rect x={0} y={floorY - 10} width={W} height={H - floorY + 10} fill={floor} />
    {boards && Array.from({ length: 8 }, (_, k) => <path key={k} d={`M${-200 + k * 200} ${H} L${300 + k * 70} ${floorY}`} stroke="#000" strokeOpacity={0.07} strokeWidth={4} />)}
    <rect x={0} y={floorY - 14} width={W} height={18} fill="#000" opacity={0.15} />
    {win && beam > 0 && <Beam pts={[[win.x - (win.w ?? 360) / 2, (win.y ?? 300) + 40], [win.x + (win.w ?? 360) / 2, (win.y ?? 300) + 40], [win.x + 380, floorY + 260], [win.x - 160, floorY + 260]]} color={win.sky === 'night' ? '#AFC0FF' : '#FFF1D6'} o={beam} />}
    <Motes f={f} n={10} y0={250} y1={floorY} o={0.35} r={4} seed={wall[0].length + floorY} />
  </g>
)

// ------------------------------------------------------------ ready-made rooms
// # 1950s study: wood panels, a sepia light, a desk with a typewriter and a name plate
export const Study1950: React.FC<{ f: number; plate?: string; behind?: React.ReactNode }> = ({ f, plate, behind }) => (
  <g>
    <Room f={f} wall={['#C9A27A', '#A8805C']} floor="#6E4A32" wainscot="#7A5236" win={{ x: 820, y: 280, w: 260, h: 380, sky: 'dawn', city: false, frame: '#5A3A26' }} beam={0.18} />
    <Shelf x={250} y={330} w={330} rows={3} />
    <Lamp x={110} y={FLOOR} />
    {behind}
    <Desk x={560} y={FLOOR - 230} w={620} c={['#7A5236', '#5A3A26']}>
      <Typewriter x={-120} y={0} s={1.1} />
      <Books x={190} y={0} n={3} s={0.9} />
      {plate && <g transform="translate(60 0)"><path d="M-110 0 L110 0 L96 -46 L-96 -46 Z" fill="#3A2A1E" /><rect x={-92} y={-42} width={184} height={34} rx={3} fill="#E3C680" /><text y={-18} textAnchor="middle" fill="#3A2A1E" style={{ font: '400 26px "Bebas Neue"', letterSpacing: 2 }}>{plate}</text></g>}
    </Desk>
  </g>
)

// # a modern research lab / office: big screens with charts, a whiteboard
export const ResearchLab: React.FC<{ f: number; screens?: ('up' | 'down' | 'feed' | 'bars')[]; t?: number; board?: React.ReactNode; behind?: React.ReactNode }> = ({ f, screens = ['feed', 'down'], t = 1, board, behind }) => (
  <g>
    <Room f={f} wall={['#DDE8EE', '#C6D6DE']} floor="#9AA8B4" win={{ x: 860, y: 260, w: 280, h: 420, sky: 'day', city: true, frame: '#FFFFFF' }} beam={0.12} />
    <Board x={330} y={430} w={460} h={300} chalk={false}>{board}</Board>
    <Plant x={1000} y={FLOOR} s={1.2} c="#3F7F5A" pot="#F3EFE8" />
    {behind}
    <Desk x={540} y={FLOOR - 200} w={760} c={['#F3EFE8', '#D6D0C6']}>
      {screens.map((k, i) => <Monitor key={i} x={(i - (screens.length - 1) / 2) * 300} y={0} s={1} kind={k} t={t} />)}
    </Desk>
  </g>
)

// # a classroom: chalkboard, rows of desks seen from the side
export const Classroom: React.FC<{ f: number; board?: React.ReactNode }> = ({ f, board }) => (
  <g>
    <Room f={f} wall={['#F2E2C8', '#E2CCAA']} floor="#B08A64" win={{ x: 900, y: 280, w: 220, h: 440, sky: 'day', city: false }} beam={0.14} />
    <Board x={420} y={420} w={600} h={320}>{board}</Board>
    <g opacity={0.9}>{[260, 780].map((x) => <Desk key={x} x={x} y={FLOOR - 170} w={300} c={['#C9A27A', '#8A6A4E']} />)}</g>
  </g>
)

// # a gym: mirrors, a rack, rubber floor
export const Gym: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <Room f={f} wall={['#3A4250', '#2E3440']} floor="#22262E" boards={false} win={{ x: 820, y: 240, w: 360, h: 380, sky: 'dawn', city: true, frame: '#1E2228' }} beam={0.18} />
    <rect x={60} y={300} width={420} height={640} fill="#8EA6B8" opacity={0.25} /><path d="M120 300 L220 300 L100 940 L60 940 Z" fill="#FFFFFF" opacity={0.12} />
    <g transform={`translate(260 ${FLOOR - 40})`}><rect x={-200} y={-200} width={14} height={200} fill="#5A616E" /><rect x={186} y={-200} width={14} height={200} fill="#5A616E" /><rect x={-200} y={-120} width={400} height={10} fill="#5A616E" /><Barbell x={0} y={-130} s={1.2} /></g>
  </g>
)

// # a kitchen: counter, cupboards, a window; `mess` adds dishes and a takeaway box
export const Kitchen: React.FC<{ f: number; mess?: number; sky?: Sky }> = ({ f, mess = 0, sky = 'day' }) => (
  <g>
    <Room f={f} wall={['#E9D9C4', '#D8C2A6']} floor="#A8846A" win={{ x: 560, y: 280, w: 340, h: 300, sky, city: false }} beam={0.12} />
    {[140, 940].map((x) => <g key={x}><rect x={x - 110} y={240} width={220} height={280} rx={8} fill="#7FA89A" /><rect x={x - 6} y={240} width={12} height={280} fill="#5E8A7C" /></g>)}
    <rect x={0} y={FLOOR - 330} width={W} height={30} fill="#F3EDE4" />
    <rect x={0} y={FLOOR - 300} width={W} height={290} fill="#7FA89A" />
    {[100, 360, 620, 880].map((x) => <rect key={x} x={x - 110} y={FLOOR - 280} width={220} height={250} rx={8} fill="none" stroke="#5E8A7C" strokeWidth={6} />)}
    {mess > 0 && <g opacity={mess}>
      {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={760 + (k % 2) * 20} cy={FLOOR - 340 - k * 14} rx={70} ry={14} fill="#FFFFFF" stroke="#C9C2B8" strokeWidth={3} />)}
      <g transform={`translate(300 ${FLOOR - 330})`}><path d="M-60 0 L60 0 L50 -80 L-50 -80 Z" fill="#F3EDE4" stroke="#C9C2B8" strokeWidth={3} /><path d="M-50 -80 L-70 -110 L70 -110 L50 -80" fill="none" stroke="#C9C2B8" strokeWidth={3} /></g>
      <g transform={`translate(500 ${FLOOR - 330})`}><rect x={-22} y={-60} width={44} height={60} rx={6} fill="#B3344F" /></g>
    </g>}
  </g>
)

// ------------------------------------------------------------ outdoors
// # a street of row houses with fences (neighbours, a block party)
export const Street: React.FC<{ f: number; sky?: Sky }> = ({ f, sky = 'day' }) => {
  const [a, b] = SKIES[sky]
  const cols = ['#E9C9A8', '#C9DDE0', '#F2D7D9', '#D8E6C8', '#EBDCC0']
  return (
    <g>
      <Grad top={a} bottom={b} h={FLOOR} />
      {sky === 'day' && <circle cx={860} cy={260} r={70} fill="#FFF4D6" />}
      {[0, 1, 2, 3, 4].map((k) => { const x = k * 230 - 40, h = 520 + (k % 2) * 60; return (
        <g key={k} transform={`translate(${x} ${FLOOR - 120})`}>
          <path d={`M-10 ${-h} L110 ${-h - 110} L230 ${-h} Z`} fill={['#8E3B4A', '#5C6E8A', '#8A5A3C', '#6E5A8A', '#3E6A5A'][k]} />
          <rect x={0} y={-h} width={220} height={h} fill={cols[k]} />
          {[0, 1].map((r) => [0, 1].map((cI) => <rect key={`${r}${cI}`} x={30 + cI * 100} y={-h + 50 + r * 170} width={70} height={100} fill={sky === 'night' ? '#FFD98A' : '#9FCBE6'} stroke="#FFFFFF" strokeWidth={6} />))}
          <rect x={80} y={-150} width={60} height={150} fill="#3A3D46" />
        </g>
      ) })}
      <Grad x={0} y={FLOOR - 120} w={W} h={H - FLOOR + 120} top="#9DB0A0" bottom="#6E8272" />
      <rect x={0} y={FLOOR - 120} width={W} height={20} fill="#C9C2B8" />
      {Array.from({ length: 18 }, (_, k) => <rect key={k} x={k * 62} y={FLOOR - 190} width={12} height={80} fill="#FFFFFF" />)}
      <rect x={0} y={FLOOR - 176} width={W} height={10} fill="#FFFFFF" /><rect x={0} y={FLOOR - 140} width={W} height={10} fill="#FFFFFF" />
      <Tree x={1000} y={FLOOR - 100} s={1.3} f={f} />
    </g>
  )
}

// # a running track in a stadium (start line, lanes running into the distance)
export const Track: React.FC<{ f: number; sky?: Sky; startLine?: boolean; finish?: boolean }> = ({ f, sky = 'dawn', startLine = false, finish = false }) => {
  const [a, b] = SKIES[sky]
  return (
    <g>
      <Grad top={a} bottom={b} h={FLOOR - 200} />
      <circle cx={760} cy={FLOOR - 420} r={110} fill="#FFF1D6" opacity={0.95} /><Glow x={760} y={FLOOR - 420} r={420} color="#FFE2B0" o={0.5} />
      {/* # the stands: rows of tiny spectators */}
      <rect x={0} y={FLOOR - 520} width={W} height={260} fill="#5C4A70" />
      {Array.from({ length: 5 }, (_, r) => Array.from({ length: 28 }, (_, k) => <circle key={`${r}-${k}`} cx={k * 40 + (r % 2) * 20} cy={FLOOR - 490 + r * 48} r={11} fill={['#F2C14E', '#E58A9E', '#9FD0C0', '#FFFFFF', '#B3344F'][(k + r) % 5]} opacity={0.7} />))}
      <rect x={0} y={FLOOR - 270} width={W} height={70} fill="#86C7AE" />
      <Grad x={0} y={FLOOR - 200} w={W} h={H - FLOOR + 200} top="#D9785B" bottom="#B85A40" />
      {Array.from({ length: 7 }, (_, k) => { const t = k / 6; return <path key={k} d={`M${380 + t * 320} ${FLOOR - 200} L${-700 + t * 2480} ${H}`} stroke="#FFFFFF" strokeWidth={5} opacity={0.75} /> })}
      {startLine && <path d={`M0 ${FLOOR + 30} L${W} ${FLOOR + 30}`} stroke="#FFFFFF" strokeWidth={16} />}
      {finish && <g><rect x={0} y={FLOOR - 220} width={W} height={20} fill="#FFFFFF" />{Array.from({ length: 27 }, (_, k) => <rect key={k} x={k * 40} y={FLOOR - 220 + (k % 2) * 10} width={20} height={10} fill="#22252D" />)}</g>}
    </g>
  )
}

// # a theatre stage with a spotlight and an audience of silhouettes in front
export const Stage: React.FC<{ f: number; spot?: number; audience?: boolean; curtain?: string }> = ({ f, spot = 1, audience = true, curtain = '#8E2440' }) => (
  <g>
    <rect width={W} height={H} fill="#1C1420" />
    {Array.from({ length: 9 }, (_, k) => <path key={k} d={`M${k * 130 - 40} 0 Q${k * 130 + 25} ${FLOOR / 2} ${k * 130 - 40} ${FLOOR} L${k * 130 + 90} ${FLOOR} Q${k * 130 + 25} ${FLOOR / 2} ${k * 130 + 90} 0 Z`} fill={curtain} opacity={0.75 + (k % 2) * 0.2} />)}
    <rect x={0} y={0} width={W} height={150} fill={curtain} /><path d={`M0 150 Q${W / 4} 210 ${W / 2} 150 Q${W * 0.75} 210 ${W} 150`} fill={curtain} />
    <rect x={0} y={FLOOR - 10} width={W} height={140} fill="#5A3A2A" /><rect x={0} y={FLOOR - 10} width={W} height={12} fill="#8A5A3A" />
    <path d={`M${W / 2 - 120} 0 L${W / 2 + 120} 0 L${W / 2 + 380} ${FLOOR + 40} L${W / 2 - 380} ${FLOOR + 40} Z`} fill="#FFF4D6" opacity={0.16 * spot} />
    <ellipse cx={W / 2} cy={FLOOR + 20} rx={360} ry={50} fill="#FFF4D6" opacity={0.3 * spot} />
    <rect x={0} y={FLOOR + 130} width={W} height={H} fill="#140E16" />
    {audience && Array.from({ length: 3 }, (_, r) => Array.from({ length: 9 }, (_, k) => { const x = k * 130 + (r % 2) * 65 - 20, y = FLOOR + 260 + r * 140; return <g key={`${r}-${k}`}><circle cx={x} cy={y - 60} r={36} fill="#2A2030" /><path d={`M${x - 60} ${y + 40} Q${x} ${y - 50} ${x + 60} ${y + 40} Z`} fill="#2A2030" /></g> }))}
    <Motes f={f} n={16} y0={100} y1={FLOOR} x0={300} x1={780} o={0.5 * spot} r={4} seed={21} />
  </g>
)

// # a wide grassland at dusk with far acacia trees (ancestors, predators)
export const Savanna: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <Grad top="#F2A27A" mid="#F7C98A" bottom="#F3D9A4" h={FLOOR} />
    <circle cx={300} cy={FLOOR - 380} r={120} fill="#FFE7B8" />
    {[[760, FLOOR - 240, 1], [180, FLOOR - 200, 0.7]].map(([x, y, s], k) => <g key={k} transform={`translate(${x} ${y}) scale(${s})`}><rect x={-8} y={-160} width={16} height={160} fill="#6E4A32" /><ellipse cx={0} cy={-170} rx={160} ry={34} fill="#6E7A3A" /><ellipse cx={-40} cy={-190} rx={90} ry={24} fill="#7E8A44" /></g>)}
    <Grad x={0} y={FLOOR - 160} w={W} h={H - FLOOR + 160} top="#D9B26A" bottom="#A8844A" />
    {Array.from({ length: 70 }, (_, k) => { const x = rnd(k) * W, y = FLOOR - 140 + rnd(k + 50) * 700; return <path key={k} d={`M${x} ${y} l -10 -40 M${x} ${y} l 4 -48 M${x} ${y} l 14 -36`} stroke={k % 3 ? '#B8903E' : '#E3C680'} strokeWidth={4} transform={`rotate(${Math.sin(f / 20 + k) * 3} ${x} ${y})`} /> })}
  </g>
)

// # empty generic "quiet morning" room (calm, warm) for reflection beats
export const CalmRoom: React.FC<{ f: number; sky?: Sky }> = ({ f, sky = 'dawn' }) => (
  <g>
    <Room f={f} wall={['#F4E2CF', '#E9CDB4']} floor="#C9A27A" win={{ x: 620, y: 260, w: 420, h: 560, sky, city: true, curtain: '#E58A9E' }} beam={0.22} />
    <Plant x={140} y={FLOOR} s={1.5} />
    <Frame x={180} y={520} w={170} h={130} c="#9FCBE6" />
  </g>
)

// # an office meeting room: a long table, a screen, glass wall
export const MeetingRoom: React.FC<{ f: number; screen?: 'up' | 'down' | 'bars' | 'feed' }> = ({ f, screen = 'bars' }) => (
  <g>
    <Room f={f} wall={['#E4ECF2', '#CCD8E2']} floor="#8A96A4" win={{ x: 880, y: 240, w: 300, h: 480, sky: 'day', city: true, frame: '#59677A' }} beam={0.1} />
    <g transform="translate(380 640)"><rect x={-260} y={-170} width={520} height={300} rx={10} fill="#22252D" /><Monitor x={0} y={160} s={1.8} kind={screen} glow={0.3} /></g>
  </g>
)

// # a library with tall shelves and a reading lamp
export const Library: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <Room f={f} wall={['#5A4038', '#4A322C']} floor="#6E4A32" />
    {[180, 540, 900].map((x) => <Shelf key={x} x={x} y={200} w={300} rows={6} c="#3A2A22" />)}
    <Glow x={540} y={700} r={600} color="#FFC982" o={0.3} />
  </g>
)

export { Books, Desk, Monitor }
