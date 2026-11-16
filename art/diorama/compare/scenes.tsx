// ============================================================
// COMPARE · s4–s21 — redrawn 2026-11-17 in the LW "illustrated
// scenes" style. One drawn scene per line (often two or three),
// real places and people acting out what the voice says.
//   RULER (s4–s7b)  Festinger at his 1954 desk → his idea on a chalkboard → a man
//                   with a tape measure and no way to read it → glancing at others
//                   at a party → the test paper, the neighbour's car, the stroller
//                   → a wall height chart of friends → an old street of neighbours
//                   → a family table → the street's best cook → a TV star chef
//   FEED  (s8–s13b) a stadium of glowing phones → floating highlight photos → two
//                   researchers at screens → a girl scrolling in bed → a staircase
//                   of people above him → a profile of trophies → his messy kitchen
//                   vs a cinema screen of a yacht → a race nobody wins → ten more ahead
//   TIME  (s14–s21) the TV that won't switch off → last year's photo → a sinking
//                   cloud on the bus → hand on chest → one perfect photo, then the
//                   real life behind it → the mirror of last year → calmer, stronger,
//                   wiser → two of him on one start line → the photo album → a
//                   friend's trophy, him clapping → breaking the tape with his old self
// ============================================================
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Reel, Person, Glow, Vignette, Wash, Grad, Motes, FLOOR, W, H, on, pop, lerp, span, easeOut, rnd, type Cut } from '../../world/kit'
import { LivingEvening, ParkSunset, BedroomNight } from '../../world/places'
import { Study1950, ResearchLab, Classroom, Street, Track, Stage, Gym, Kitchen, CalmRoom, Library, Room } from '../../world/places2'
import { Phone, Confetti, Sofa, Tree, StringLights } from '../../world/props'
import { Desk, Monitor, Books, Trophy, Photo, TV, Mirror, Board, Barbell, Mug } from '../../world/props2'
import { heldPoint } from '../../rig/Actor'

const hand = (pose: string, x: number, y: number, s: number, flip = false) => heldPoint(pose, { x, y, scale: s }, flip)

// ------------------------------------------------------------ small props for this video
// # a tape measure with no numbers on it (the voice: "no clear way to measure")
const Tape: React.FC<{ x: number; y: number; s?: number; out?: number }> = ({ x, y, s = 1, out = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={0} y={-8} width={260 * out} height={16} fill="#F4C35A" stroke="#B08422" strokeWidth={2} />
    {Array.from({ length: Math.floor(13 * out) }, (_, k) => <line key={k} x1={10 + k * 20} y1={-8} x2={10 + k * 20} y2={k % 2 ? -2 : 2} stroke="#5A4A2A" strokeWidth={2} />)}
    <rect x={-34} y={-30} width={46} height={60} rx={12} fill="#D2463C" /><circle cx={-11} cy={0} r={12} fill="#8E2E2A" />
  </g>
)
// # an exam paper with a grade circled
const Paper: React.FC<{ x: number; y: number; s?: number; r?: number; grade?: string; color?: string }> = ({ x, y, s = 1, r = 0, grade, color = '#D2463C' }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-50} y={-66} width={100} height={132} rx={4} fill="#FFFFFF" stroke="#C9C2B8" strokeWidth={2} />
    {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-38} y={-40 + k * 18} width={k % 2 ? 60 : 76} height={6} rx={3} fill="#C9D2DC" />)}
    {grade && <g><circle cx={24} cy={-44} r={18} fill="none" stroke={color} strokeWidth={4} /><text x={24} y={-36} textAnchor="middle" fill={color} style={{ font: '400 26px "Bebas Neue"' }}>{grade}</text></g>}
  </g>
)
// # a shiny car seen from the side
const Car: React.FC<{ x: number; y: number; s?: number; c?: string; shine?: number }> = ({ x, y, s = 1, c = '#D2463C', shine = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Glow x={0} y={-90} r={260} color="#FFFFFF" o={0.4 * shine} />
    <path d="M-230 -40 L-220 -100 Q-200 -120 -150 -124 L-100 -180 Q-80 -196 -40 -196 L80 -196 Q120 -196 150 -150 L190 -124 Q236 -116 240 -80 L240 -40 Z" fill={c} />
    <path d="M-86 -176 L-40 -186 L40 -186 L40 -130 L-120 -130 Z" fill="#BFE6FF" /><path d="M56 -186 L80 -186 Q110 -186 136 -138 L56 -130 Z" fill="#BFE6FF" />
    <path d="M-200 -96 L200 -96" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} />
    {[-140, 150].map((wx) => <g key={wx}><circle cx={wx} cy={-36} r={44} fill="#22252D" /><circle cx={wx} cy={-36} r={20} fill="#B5BCC6" /></g>)}
    {shine > 0 && [0, 1, 2].map((k) => <path key={k} d="M0 -10 L3 0 L0 10 L-3 0 Z M-10 0 L0 3 L10 0 L0 -3 Z" fill="#FFFFFF" transform={`translate(${-120 + k * 120} ${-150 + (k % 2) * 40}) scale(${1.5 * shine})`} />)}
  </g>
)
// # a baby stroller
const Stroller: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-80 -150 A90 90 0 0 1 80 -150 L80 -100 L-80 -100 Z" fill="#7FA89A" /><path d="M-80 -150 A90 90 0 0 1 0 -238 L0 -150 Z" fill="#5E8A7C" />
    <rect x={-90} y={-110} width={180} height={50} rx={20} fill="#9FC9BA" />
    <path d="M90 -110 L140 -220 L170 -220" stroke="#3A3D46" strokeWidth={8} fill="none" strokeLinecap="round" />
    {[-60, 60].map((wx) => <circle key={wx} cx={wx} cy={-24} r={24} fill="#22252D" />)}
  </g>
)
// # a cooking pot with steam
const Pot: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((k) => <path key={k} d={`M${-30 + k * 30} -100 Q${-44 + k * 30 + Math.sin(f / 9 + k) * 10} -150 ${-28 + k * 30} -200`} stroke="#FFFFFF" strokeWidth={8} fill="none" opacity={0.55} strokeLinecap="round" />)}
    <ellipse cx={0} cy={-96} rx={96} ry={18} fill="#8A3A2A" />
    <path d="M-90 -96 L-80 0 L80 0 L90 -96 Z" fill="#5A616E" /><path d="M20 -96 L90 -96 L80 0 L30 0 Z" fill="#3A3D46" />
    <rect x={-120} y={-80} width={30} height={12} rx={6} fill="#3A3D46" /><rect x={90} y={-80} width={30} height={12} rx={6} fill="#3A3D46" />
  </g>
)
// # a long table with a cloth and plates (family dinner)
const Table: React.FC<{ x: number; y: number; w?: number; cloth?: string; f: number }> = ({ x, y, w = 700, cloth = '#F3EDE4', f }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-20} width={w} height={40} rx={8} fill={cloth} /><path d={`M${-w / 2} 20 L${-w / 2 + 20} 120 L${w / 2 - 20} 120 L${w / 2} 20 Z`} fill={cloth} opacity={0.85} />
    {Array.from({ length: 5 }, (_, k) => <ellipse key={k} cx={-w / 2 + 80 + k * ((w - 160) / 4)} cy={-24} rx={46} ry={10} fill="#FFFFFF" stroke="#D6CFC4" strokeWidth={3} />)}
    <Pot x={0} y={-30} s={0.6} f={f} />
  </g>
)
// # a staircase going up and to the right; people stand on the steps
const Stairs: React.FC<{ x: number; y: number; n?: number; step?: [number, number]; c?: string }> = ({ x, y, n = 6, step = [150, 130], c = '#E9DDF3' }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: n }, (_, k) => <g key={k}><rect x={k * step[0]} y={-(k + 1) * step[1]} width={W} height={step[1]} fill={c} /><rect x={k * step[0]} y={-(k + 1) * step[1]} width={W} height={10} fill="#FFFFFF" opacity={0.6} /><rect x={k * step[0]} y={-(k + 1) * step[1]} width={14} height={step[1]} fill="#000" opacity={0.08} /></g>)}
  </g>
)
// # a small rain cloud (the sinking feeling) — `rain` 0..1
const RainCloud: React.FC<{ x: number; y: number; s?: number; rain?: number; f: number }> = ({ x, y, s = 1, rain = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {rain > 0 && Array.from({ length: 7 }, (_, k) => <line key={k} x1={-60 + k * 20} y1={30 + ((f * 6 + k * 23) % 70)} x2={-64 + k * 20} y2={48 + ((f * 6 + k * 23) % 70)} stroke="#8FB4E0" strokeWidth={4} strokeLinecap="round" opacity={rain} />)}
    <ellipse cx={0} cy={0} rx={100} ry={36} fill="#7A8494" /><circle cx={-40} cy={-20} r={40} fill="#8A94A4" /><circle cx={20} cy={-30} r={50} fill="#8A94A4" /><circle cx={60} cy={-6} r={30} fill="#7A8494" />
  </g>
)
// # an open photo album (two pages, three photos that change as pages turn)
const Album: React.FC<{ x: number; y: number; s?: number; page: number }> = ({ x, y, s = 1, page }) => {
  const sets: ('baby' | 'kid' | 'grad' | 'party' | 'beach')[][] = [['baby', 'kid'], ['kid', 'grad'], ['grad', 'party']]
  const p = sets[Math.min(sets.length - 1, Math.floor(page))]
  const turn = page % 1
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-380 -260 L0 -240 L380 -260 L380 240 L0 260 L-380 240 Z" fill="#7A3A4A" />
      <path d="M-360 -240 L-6 -222 L-6 236 L-360 222 Z" fill="#FBF6EC" /><path d="M360 -240 L6 -222 L6 236 L360 222 Z" fill="#F4EEE2" />
      <Photo x={-190} y={0} s={1.2} r={-4} kind={p[0]} /><Photo x={190} y={0} s={1.2} r={3} kind={p[1]} o={1 - turn} />
      {turn > 0.05 && <path d={`M6 -222 L${360 - 720 * turn} ${-240 + 30 * Math.sin(turn * 3.14)} L${360 - 720 * turn} ${222 + 30 * Math.sin(turn * 3.14)} L6 236 Z`} fill="#FBF6EC" stroke="#E2D8C6" strokeWidth={3} />}
    </g>
  )
}
// # a wall height chart (a growth chart with bands)
const HeightChart: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-500} y={-900} width={1000} height={900} fill="#FFFFFF" opacity={0.7} />
    {Array.from({ length: 10 }, (_, k) => <g key={k}><rect x={-500} y={-90 * (k + 1)} width={1000} height={90} fill={['#FCE4E4', '#FDF0DC', '#E4F4EA', '#E4EEFA', '#EEE6F8'][k % 5]} opacity={0.9} /><line x1={-500} y1={-90 * (k + 1)} x2={500} y2={-90 * (k + 1)} stroke="#B5A8C4" strokeWidth={3} strokeDasharray="20 12" /></g>)}
  </g>
)
// # a TV remote in a hand-sized prop
const Remote: React.FC<{ x: number; y: number; s?: number; r?: number; press?: number }> = ({ x, y, s = 1, r = 0, press = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-14} y={-50} width={28} height={100} rx={10} fill="#2A2D34" />
    <circle cx={0} cy={-32} r={7} fill={press > 0.5 ? '#FF6B6B' : '#D2463C'} />
    {[0, 1, 2].map((k) => <rect key={k} x={-8} y={-14 + k * 16} width={16} height={8} rx={3} fill="#5A616E" />)}
  </g>
)

// ------------------------------------------------------------ RULER (s4–s7b)
const RulerPiece: React.FC<PieceProps> = ({ f, c, to }) => {
  const k = (s: string) => c(s)
  const cuts: Cut[] = [
    // # 1954: Leon Festinger at his desk, typing up the idea (a desk name plate says who he is)
    { at: k('s4'), cam: { fx: 520, fy: 860, s0: 1.02, s1: 1.14 }, draw: (lf, f) => (
      <g>
        <Study1950 f={f} plate="LEON FESTINGER · 1954" behind={<Person lf={lf} f={f} who="p-1950s" beats={[[0, 'type', 'thinking'], [k('s4:name') - k('s4'), 'pointUp', 'smiling']]} x={500} y={FLOOR - 30} s={1.1} seed={2} />} />
        <Wash color="#C9A27A" o={0.18} blend="multiply" /><Vignette o={0.45} />
      </g>
    ) },
    // # "his idea was simple" — he chalks two little people side by side and an arrow between them
    { at: k('s5'), cam: { fx: 420, fy: 620, s0: 1.0, s1: 1.1 }, draw: (lf, f) => {
      const d = on(lf, 4, 20), d2 = on(lf, 16, 20)
      return <g>
        <Classroom f={f} board={<g stroke="#F3EDE4" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.95}>
          <g opacity={d}><circle cx={-150} cy={-60} r={30} /><path d="M-150 -30 L-150 60 M-190 0 L-110 0 M-150 60 L-180 120 M-150 60 L-120 120" /></g>
          <g opacity={d2}><circle cx={150} cy={-80} r={30} /><path d="M150 -50 L150 60 M110 -10 L190 -10 M150 60 L120 120 M150 60 L180 120" /></g>
          <path d="M-90 20 L90 20 M70 0 L90 20 L70 40" opacity={on(lf, 26, 14)} />
        </g>} />
        <Person lf={lf} f={f} who="p-1950s" beats={[[0, 'reachUp', 'thinking'], [30, 'present', 'smiling']]} x={760} s={1.1} flip seed={3} />
        <Wash color="#C9A27A" o={0.12} /><Vignette o={0.4} />
      </g>
    } },
    // # "no clear way to measure how you're doing" — he pulls out a tape measure with no numbers
    { at: k('s5:when'), cam: { fx: 540, fy: 900, s0: 1.1, s1: 1.2 }, draw: (lf, f) => {
      const hp = hand('hold', 420, FLOOR, 1.15)
      return <g>
        <CalmRoom f={f} sky="day" />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'hold', 'thinking'], [20, 'hold', 'worried']]} x={420} s={1.15} seed={4} />
        <Tape x={hp.x + 20} y={hp.y} s={1.1} out={on(lf, 2, 20)} />
        <Vignette o={0.3} />
      </g>
    } },
    // # "you measure yourself against other people" — at a party he glances across at the others
    { at: k('s5:measure#2'), cam: { fx: 540, fy: 960, s0: 1.0, s1: 1.08, dx: 30 }, draw: (lf, f) => (
      <g>
        <ParkSunset f={f} />
        <Person lf={lf} f={f} who="p-friend-m" beats={[[0, 'talk', 'smiling']]} x={620} s={1.08} flip seed={5} />
        <Person lf={lf} f={f} who="p-friend-f" beats={[[0, 'idle', 'smiling'], [12, 'talk', 'smiling']]} x={830} s={1.08} flip seed={6} />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'pockets', 'neutral'], [10, 'pockets', 'thinking']]} x={260} s={1.12} seed={7} />
        <Vignette o={0.35} />
      </g>
    ) },
    // # "am I smart?" — the test comes back; he peeks at the next desk's A+
    { at: k('s6'), cam: { fx: 540, fy: 900, s0: 1.08, s1: 1.16 }, draw: (lf, f) => {
      const hp = hand('hold', 330, FLOOR - 40, 1.05), np = hand('hold', 780, FLOOR - 40, 1.05, true)
      return <g>
        <Classroom f={f} board={<g stroke="#F3EDE4" strokeWidth={5} fill="none" opacity={0.6}><path d="M-200 -80 L200 -80 M-200 -20 L120 -20 M-200 40 L160 40" /></g>} />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'hold', 'neutral'], [10, 'hold', 'worried']]} x={330} y={FLOOR - 40} s={1.05} seed={8} />
        <Person lf={lf} f={f} who="p-classmate" beats={[[0, 'hold', 'smiling']]} x={780} y={FLOOR - 40} s={1.05} flip seed={9} />
        <Paper x={hp.x + 10} y={hp.y - 20} s={1.1} r={-6} grade="C" color="#C9772E" />
        <Paper x={np.x - 10} y={np.y - 20} s={1.1} r={6} grade="A+" />
        <Vignette o={0.3} />
      </g>
    } },
    // # "am I doing well?" — he walks past the neighbour polishing a brand-new car
    { at: k('s6:am#2'), cam: { fx: 540, fy: 1000, s0: 1.0, s1: 1.08, dx: -40 }, draw: (lf, f) => (
      <g>
        <Street f={f} />
        <Car x={680} y={FLOOR + 70} s={1.15} c="#2E5C9A" shine={0.6 + 0.4 * Math.sin(f / 8)} />
        <Person lf={lf} f={f} who="p-colleague-m" beats={[[0, 'waveA', 'smug']]} loop={['waveA', 'waveB', 20]} x={940} y={FLOOR + 60} s={1.05} flip seed={10} />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'walkA', 'thinking']]} loop={['walkA', 'walkB', 18]} x={lerp(140, 300, lf / 40)} y={FLOOR + 60} s={1.08} seed={11} />
        <Vignette o={0.3} />
      </g>
    ) },
    // # "am I behind?" — alone on a bench while friends stroll past with a baby
    { at: k('s6:am#3'), cam: { fx: 540, fy: 980, s0: 1.04, s1: 1.1 }, draw: (lf, f) => (
      <g>
        <ParkSunset f={f} />
        <g transform={`translate(260 ${FLOOR + 10})`}><rect x={-160} y={-120} width={320} height={22} rx={6} fill="#8A5A34" /><rect x={-160} y={-190} width={320} height={18} rx={6} fill="#8A5A34" /><rect x={-140} y={-100} width={14} height={100} fill="#5A3A26" /><rect x={126} y={-100} width={14} height={100} fill="#5A3A26" /></g>
        <Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'sit', 'neutral'], [16, 'sitSlump', 'worried']]} x={260} y={FLOOR - 30} s={1.0} seed={12} />
        <Stroller x={lerp(1000, 760, lf / 60)} y={FLOOR + 80} s={1.0} />
        <Person lf={lf} f={f} who="p-fiance" beats={[[0, 'walkA', 'smiling']]} loop={['walkA', 'walkB', 18]} x={lerp(1150, 920, lf / 60)} y={FLOOR + 80} s={1.05} flip seed={13} />
        <Person lf={lf} f={f} who="p-fiancee" beats={[[0, 'walkA', 'smiling']]} loop={['walkA', 'walkB', 18]} x={lerp(1260, 1030, lf / 60)} y={FLOOR + 80} s={1.05} flip seed={14} />
        <Vignette o={0.4} />
      </g>
    ) },
    // # "other people become the ruler" — friends line up against a giant height chart; he's the shortest
    { at: k('s6:so'), cam: { fx: 540, fy: 900, s0: 1.0, s1: 1.06 }, draw: (lf, f) => (
      <g>
        <Room f={f} wall={['#F4E2CF', '#E9CDB4']} floor="#C9A27A" />
        <HeightChart x={540} y={FLOOR - 10} />
        {[['p-friend-m', 640, 1.22], ['p-fiancee', 820, 1.18], ['p-classmate', 980, 1.26]].map(([who, x, s], i) => (
          <Person key={i} lf={lf} f={f} who={who as string} beats={[[0, 'pockets', 'smiling']]} x={x as number} s={(s as number) * on(lf, 2 + i * 6, 10)} flip seed={20 + i} />
        ))}
        <Person lf={lf} f={f} who="hero" beats={[[0, 'idle', 'neutral'], [20, 'idle', 'worried']]} x={300} s={lerp(1.15, 0.9, easeOut(span(lf, 18, 40)))} seed={24} />
        <Vignette o={0.3} />
      </g>
    ) },
    // # "for most of history, the ruler was the people around you" — an old street, neighbours chat over the fence
    { at: k('s7'), cam: { fx: 540, fy: 980, s0: 1.02, s1: 1.1 }, draw: (lf, f) => (
      <g>
        <Street f={f} />
        <Person lf={lf} f={f} who="p-elder-m" beats={[[0, 'talk', 'smiling']]} x={360} y={FLOOR + 30} s={1.05} seed={30} />
        <Person lf={lf} f={f} who="p-elder-f" beats={[[0, 'idle', 'smiling'], [14, 'talk', 'smiling']]} x={620} y={FLOOR + 30} s={1.0} flip seed={31} />
        <Person lf={lf} f={f} who="p-friend-m" beats={[[0, 'waveA', 'smiling']]} loop={['waveA', 'waveB', 22]} x={880} y={FLOOR + 30} s={1.05} flip seed={32} />
        <Wash color="#E9C9A8" o={0.15} /><Vignette o={0.35} />
      </g>
    ) },
    // # "friends, family you actually knew" — a long family table under string lights
    { at: k('s7:friends'), cam: { fx: 540, fy: 1000, s0: 1.06, s1: 1.12 }, draw: (lf, f) => (
      <g>
        <Street f={f} sky="sunset" />
        <StringLights x0={-20} y0={500} x1={1100} y1={560} sag={120} n={14} f={f} />
        {[['p-elder-f', 200], ['p-friend-f', 420], ['hero', 640], ['p-elder-m', 860]].map(([who, x], i) => (
          <Person key={i} lf={lf} f={f} who={who as string} beats={[[0, i % 2 ? 'clapA' : 'talk', 'smiling'], [16 + i * 4, 'nodA', 'smiling']]} x={x as number} y={FLOOR + 10} s={1.0} flip={i % 2 === 1} seed={40 + i} />
        ))}
        <Table x={540} y={FLOOR - 160} w={900} f={f} />
        <Wash color="#FF9A7A" o={0.08} blend="soft-light" /><Vignette o={0.4} />
      </g>
    ) },
    // # "the best cook on your street" — the auntie's famous pot at the block party
    { at: k('s7b'), cam: { fx: 520, fy: 960, s0: 1.08, s1: 1.18 }, draw: (lf, f) => (
      <g>
        <Street f={f} />
        <Desk x={420} y={FLOOR - 180} w={460} c={['#F3EDE4', '#D6CFC4']}><Pot x={0} y={0} s={1.0} f={f} /></Desk>
        <Person lf={lf} f={f} who="p-elder-f" beats={[[0, 'offer', 'smiling']]} x={240} y={FLOOR - 30} s={1.08} seed={50} />
        <Person lf={lf} f={f} who="p-friend-m" beats={[[0, 'receive', 'smiling'], [20, 'thumbsUp', 'smiling']]} x={720} y={FLOOR + 40} s={1.08} flip seed={51} />
        <Person lf={lf} f={f} who="p-buyer" beats={[[0, 'clapA', 'smiling']]} loop={['clapA', 'clapB', 14]} x={920} y={FLOOR + 40} s={1.05} flip seed={52} />
        <Vignette o={0.3} />
      </g>
    ) },
    // # "not the best cook on the planet" — the same auntie on her sofa, a TV star chef under fireworks
    { at: k('s7b:not'), cam: { fx: 540, fy: 800, s0: 1.0, s1: 1.1 }, draw: (lf, f) => (
      <g>
        <LivingEvening f={f} />
        <TV x={600} y={FLOOR - 360} s={1.3}>
          <rect x={-216} y={-121} width={432} height={242} fill="#3A2A55" />
          {Array.from({ length: 6 }, (_, i) => { const a = i * 1.05 + lf / 20; return <circle key={i} cx={Math.cos(a) * 140} cy={-40 + Math.sin(a) * 50} r={8 + (lf % 20) / 4} fill={['#F4C35A', '#E2506A', '#9FD8F0'][i % 3]} opacity={0.8} /> })}
          <circle cx={0} cy={-10} r={30} fill="#EFC7A6" /><path d="M-26 -40 L26 -40 L22 -80 L-22 -80 Z" fill="#FFFFFF" /><path d="M-60 121 Q0 0 60 121 Z" fill="#FFFFFF" />
          <Trophy x={110} y={110} s={0.5} shine={0.8} />
        </TV>
        <Sofa x={540} y={FLOOR + 60} w={520} c={['#8C4458', '#6E3446', '#521F33']} />
        <Person lf={lf} f={f} who="p-elder-f" beats={[[0, 'sit', 'shocked']]} x={420} y={FLOOR} s={0.95} seed={53} />
        <Vignette o={0.45} />
      </g>
    ) },
  ]
  return <Reel f={f} cuts={cuts} end={to} />
}

// ------------------------------------------------------------ FEED (s8–s13b)
const FeedPiece: React.FC<PieceProps> = ({ f, c, to }) => {
  const k = (s: string) => c(s)
  const cuts: Cut[] = [
    // # "now the ruler is everyone" — he sits in a stadium where every seat holds a glowing phone
    { at: k('s8'), cam: { fx: 540, fy: 1000, s0: 1.4, s1: 1.0 }, draw: (lf, f) => {
      const hp = hand('sitPhone', 540, FLOOR + 40, 1.0)
      return <g>
        <rect width={W} height={H} fill="#141026" />
        {Array.from({ length: 9 }, (_, r) => Array.from({ length: 16 }, (_, i) => { const x = i * 72 + (r % 2) * 36, y = 160 + r * 110; const lit = on(lf, (k('s8:everyone') - k('s8')) + rnd(r * 16 + i) * 20, 8); return (
          <g key={`${r}-${i}`}><circle cx={x} cy={y} r={20} fill="#2A2440" /><path d={`M${x - 30} ${y + 60} Q${x} ${y + 10} ${x + 30} ${y + 60} Z`} fill="#2A2440" />
            <rect x={x - 8} y={y + 18} width={16} height={26} rx={3} fill="#BFE6FF" opacity={0.15 + 0.85 * lit} /><Glow x={x} y={y + 30} r={36} color="#BFE6FF" o={0.4 * lit} /></g>
        ) }))}
        <Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'sitPhone', 'neutral'], [40, 'sitPhone', 'worried']]} x={540} y={FLOOR + 40} s={1.0} seed={60} />
        <Phone x={hp.x} y={hp.y - 4} s={1.0} r={-8} />
        <Vignette o={0.5} />
      </g>
    } },
    // # "you mostly see their best moments" — highlight photos float up around him
    { at: k('s8:you'), cam: { fx: 540, fy: 900, s0: 1.0, s1: 1.08 }, draw: (lf, f) => (
      <g>
        <BedroomNight f={f} />
        <Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'phone', 'worried']]} x={540} s={1.1} seed={61} />
        {(['yacht', 'beach', 'party', 'grad', 'beach', 'party'] as const).map((kd, i) => <Photo key={i} x={[220, 860, 180, 880, 360, 720][i]} y={[420, 380, 760, 760, 260, 230][i] - lf * 0.8} s={0.95 * pop(lf, 4 + i * 5, 12)} r={[-8, 6, 5, -6, -3, 8][i]} kind={kd} />)}
        <Wash color="#1A1E44" o={0.2} /><Vignette o={0.5} />
      </g>
    ) },
    // # "in 2014, researchers looked at what this does to us" — two researchers at screens of feeds
    { at: k('s9'), cam: { fx: 540, fy: 860, s0: 1.02, s1: 1.12 }, draw: (lf, f) => (
      <g>
        <ResearchLab f={f} screens={['feed', 'down']} t={on(lf, 20, 40)} board={<g>{[0, 1, 2, 3].map((i) => <rect key={i} x={-150 + i * 80} y={80 - (60 + i * 25)} width={50} height={60 + i * 25} fill={i % 2 ? '#2E8C86' : '#9FD8F0'} />)}<path d="M-180 80 L180 80" stroke="#59677A" strokeWidth={4} /></g>}
          behind={<g><Person lf={lf} f={f} who="p-researcher-f" beats={[[0, 'type', 'thinking'], [30, 'point', 'thinking']]} x={380} y={FLOOR - 20} s={1.05} seed={62} /><Person lf={lf} f={f} who="p-researcher-m" beats={[[0, 'think', 'thinking']]} x={720} y={FLOOR - 20} s={1.05} flip seed={63} /></g>} />
        <Vignette o={0.3} />
      </g>
    ) },
    // # "people who used it the most had lower self esteem" — a girl scrolling in bed at night, sinking
    { at: k('s10'), cam: { fx: 520, fy: 950, s0: 1.1, s1: 1.25 }, draw: (lf, f) => {
      const hp = hand('sitPhone', 440, FLOOR, 1.12)
      return <g>
        <BedroomNight f={f} />
        <Person lf={lf} f={f} who="p-friend-f" beats={[[0, 'sitPhone', 'neutral'], [k('s10:lower') - k('s10'), 'sitPhone', 'worried']]} x={440} s={1.12} seed={64} />
        <Phone x={hp.x} y={hp.y - 6} s={1.12} r={-8} />
        <Wash color="#1A1E44" o={0.25 + 0.2 * on(lf, k('s10:lower') - k('s10'), 20)} /><Vignette o={0.6} />
      </g>
    } },
    // # "comparing upward" — he stands at the bottom of a staircase; people with trophies stand above him
    { at: k('s10:comparing'), cam: { fx: 600, fy: 800, s0: 1.0, s1: 1.08, dy: -40 }, draw: (lf, f) => (
      <g>
        <Grad top="#F7C9A8" bottom="#FFE9C8" />
        <Glow x={980} y={120} r={600} color="#FFF4D6" o={0.7} />
        <Stairs x={260} y={FLOOR + 40} n={7} step={[110, 130]} />
        {[['p-classmate', 480, 3], ['p-fiancee', 700, 5], ['p-runner', 920, 7]].map(([who, x, n], i) => (
          <g key={i}><Person lf={lf} f={f} who={who as string} beats={[[0, 'celebrate', 'smiling']]} x={x as number} y={FLOOR + 40 - (n as number) * 130 + 130} s={0.8 * on(lf, 4 + i * 6, 10)} flip seed={70 + i} />
            {i === 0 && <Trophy x={(x as number) + 60} y={FLOOR + 40 - (n as number) * 130 + 130} s={0.6 * on(lf, 10, 10)} />}</g>
        ))}
        <Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'idle', 'neutral'], [14, 'reachUp', 'worried']]} x={170} y={FLOOR + 40} s={1.0} seed={73} />
        <Vignette o={0.25} />
      </g>
    ) },
    // # "a profile full of wins made people feel worse" — a man at a lab desk, a screen of trophies
    { at: k('s11'), cam: { fx: 540, fy: 820, s0: 1.08, s1: 1.2 }, draw: (lf, f) => (
      <g>
        <ResearchLab f={f} screens={['bars']} t={1} behind={<Person lf={lf} f={f} who="p-colleague-m" beats={[[0, 'type', 'neutral'], [k('s11:worse') - k('s11'), 'facepalm', 'worried']]} x={760} y={FLOOR - 20} s={1.05} flip seed={74} />} />
        <g transform="translate(540 860)">
          <rect x={-150} y={-260} width={300} height={190} rx={10} fill="#FFFFFF" stroke="#C9D6E2" strokeWidth={3} />
          {[0, 1, 2, 3, 4, 5].map((i) => <g key={i} transform={`translate(${-100 + (i % 3) * 100} ${-215 + Math.floor(i / 3) * 90}) scale(${pop(lf, 6 + i * 4, 10)})`}><rect x={-40} y={-36} width={80} height={72} rx={6} fill={['#FCE4B8', '#CFE4F2', '#F7D2DC', '#DDEFD6', '#FCE4B8', '#E9DDF3'][i]} /><Trophy x={0} y={30} s={0.32} shine={0} /></g>)}
        </g>
        <Vignette o={0.3} />
      </g>
    ) },
    // # "your behind the scenes" — his real morning: pyjamas, cold cereal, dishes piled up
    { at: k('s12'), cam: { fx: 540, fy: 940, s0: 1.08, s1: 1.16 }, draw: (lf, f) => (
      <g>
        <Kitchen f={f} mess={1} sky="day" />
        <Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'hold', 'neutral'], [16, 'scratchHead', 'worried']]} x={560} y={FLOOR + 40} s={1.12} seed={75} />
        <Mug x={hand('hold', 560, FLOOR + 40, 1.12).x} y={hand('hold', 560, FLOOR + 40, 1.12).y + 20} s={1.0} f={f} c="#7FA89A" />
        <Vignette o={0.35} />
      </g>
    ) },
    // # "everyone else's highlight reel" — a cinema: on the big screen, a friend on a yacht at sunset
    { at: k('s12:everyone'), cam: { fx: 540, fy: 720, s0: 1.0, s1: 1.1 }, draw: (lf, f) => (
      <g>
        <rect width={W} height={H} fill="#120C16" />
        <Glow x={540} y={560} r={700} color="#BFE6FF" o={0.35} />
        <g transform="translate(540 560)"><rect x={-480} y={-300} width={960} height={560} fill="#F7C98A" />
          <Grad x={-480} y={-300} w={960} h={360} top="#E0718A" bottom="#FFC58A" /><circle cx={200} cy={-40} r={90} fill="#FFE1A8" />
          <rect x={-480} y={60} width={960} height={200} fill="#5FA8D8" />
          <g transform={`translate(${-60 + lf * 0.6} 80)`}><path d="M-200 0 L220 0 L160 70 L-150 70 Z" fill="#FFFFFF" /><path d="M0 0 L0 -260 L170 -10 Z" fill="#FFFFFF" /><path d="M-10 0 L-10 -220 L-160 -10 Z" fill="#F3EDE4" />
            <circle cx={-90} cy={-40} r={20} fill="#C98E66" /><path d="M-120 0 L-60 0 L-70 -30 L-110 -30 Z" fill="#F2C14E" /></g>
        </g>
        {Array.from({ length: 3 }, (_, r) => Array.from({ length: 8 }, (_, i) => { const x = i * 150 + (r % 2) * 75, y = 1180 + r * 170; return <g key={`${r}${i}`}><rect x={x - 66} y={y - 40} width={132} height={170} rx={20} fill="#5A1A2A" /></g> }))}
        <g transform="translate(540 1180)"><circle cx={0} cy={-90} r={54} fill="#2A1A20" /><path d="M-90 40 Q0 -70 90 40 Z" fill="#2A1A20" /></g>
        <Vignette o={0.55} />
      </g>
    ) },
    // # "that's not a fair race" — he runs his hardest; everyone else is already far ahead
    { at: k('s13'), cam: { fx: 540, fy: 1000, s0: 1.0, s1: 1.06 }, draw: (lf, f) => (
      <g>
        <Track f={f} sky="day" finish />
        {[['p-runner', 520, 0.55], ['p-classmate', 700, 0.5], ['p-friend-f', 880, 0.5]].map(([who, x, s], i) => (
          <Person key={i} lf={lf} f={f} who={who as string} beats={[[0, 'runA', 'smiling']]} loop={['runA', 'runB', 12]} x={(x as number) + Math.sin(f / 30 + i) * 8} y={FLOOR - 80} s={s as number} seed={80 + i} />
        ))}
        <Person lf={lf} f={f} who="hero" beats={[[0, 'runA', 'angry'], [k('s13:nobody') - k('s13'), 'runA', 'worried']]} loop={['runA', 'runB', 12]} x={300} y={FLOOR + 220} s={1.2} seed={83} />
        <Vignette o={0.3} />
      </g>
    ) },
    // # "for every person you catch up with… ten more ahead" — he passes one runner, then ten appear
    { at: k('s13b'), cam: { fx: 540, fy: 1000, s0: 1.06, s1: 1.0 }, draw: (lf, f) => {
      const ten = k('s13b:ten') - k('s13b')
      return <g>
        <Track f={f} sky="day" />
        {Array.from({ length: 10 }, (_, i) => <Person key={i} lf={lf} f={f} who={['p-runner', 'p-friend-f', 'p-classmate', 'p-buyer', 'p-colleague-m'][i % 5]} beats={[[0, 'runA', 'smiling']]} loop={['runA', 'runB', 12]} x={160 + (i % 5) * 190 + (i > 4 ? 90 : 0)} y={FLOOR - 120 - (i > 4 ? 60 : 0)} s={0.42 * on(lf, ten + i * 2, 8)} seed={90 + i} />)}
        <Person lf={lf} f={f} who="p-colleague-m" beats={[[0, 'runA', 'neutral']]} loop={['runA', 'runB', 14]} x={lerp(560, 200, easeOut(span(lf, 0, 40)))} y={FLOOR + 140} s={0.95} seed={99} />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'runA', 'angry'], [44, 'runA', 'smiling'], [ten, 'stop', 'shocked']]} loop={lf < ten ? ['runA', 'runB', 12] : undefined} x={lerp(260, 600, easeOut(span(lf, 0, 40)))} y={FLOOR + 220} s={1.2} seed={98} />
        <Vignette o={0.3} />
      </g>
    } },
  ]
  return <Reel f={f} cuts={cuts} end={to} />
}

// ------------------------------------------------------------ TIME (s14–s21)
const TimePiece: React.FC<PieceProps> = ({ f, c, to }) => {
  const k = (s: string) => c(s)
  const cuts: Cut[] = [
    // # "you can't switch comparison off" — he jabs the remote; the TV of other people's lives stays on
    { at: k('s14'), cam: { fx: 540, fy: 900, s0: 1.04, s1: 1.12 }, draw: (lf, f) => {
      const hp = hand('point', 300, FLOOR + 20, 1.1)
      return <g>
        <LivingEvening f={f} dim={0.6} />
        <TV x={700} y={FLOOR - 330} s={1.15}><Photo x={0} y={0} s={1.0} kind={(['yacht', 'party', 'beach', 'grad'] as const)[Math.floor(lf / 14) % 4]} /></TV>
        <Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'point', 'angry'], [20, 'point', 'worried']]} x={300} y={FLOOR + 20} s={1.1} seed={100} />
        <Remote x={hp.x + 10} y={hp.y} s={1.1} r={80} press={(lf % 10) / 10} />
        <Vignette o={0.5} />
      </g>
    } },
    // # "but you can choose what you compare" — morning; he picks up a photo of himself from last year
    { at: k('s14:but'), cam: { fx: 520, fy: 860, s0: 1.1, s1: 1.22 }, draw: (lf, f) => {
      const hp = hand('holdChest', 440, FLOOR, 1.15)
      return <g>
        <CalmRoom f={f} sky="dawn" />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'holdChest', 'thinking'], [20, 'holdChest', 'smiling']]} x={440} s={1.15} seed={101} />
        <Photo x={hp.x + 30} y={hp.y - 60} s={0.7} r={-6} kind="kid" />
        <Vignette o={0.3} />
      </g>
    } },
    // # "notice the moment… that sinking feeling" — on the bus, a post lands and a rain cloud gathers over him
    { at: k('s15'), cam: { fx: 540, fy: 880, s0: 1.08, s1: 1.2 }, draw: (lf, f) => {
      const sink = k('s15:sinking') - k('s15'), name = k('s15:name') - k('s15')
      const hp = hand('sitPhone', 520, FLOOR, 1.15)
      return <g>
        <Grad top="#CFE4F2" bottom="#EAF2F6" />
        {/* # bus interior: windows with the city sliding past, seats */}
        <rect x={0} y={260} width={W} height={520} fill="#59677A" />
        {[0, 1, 2].map((i) => <g key={i} transform={`translate(${60 + i * 340} 300)`}><rect width={300} height={420} rx={16} fill="#8FC4EA" />{Array.from({ length: 4 }, (_, j) => <rect key={j} x={((j * 90 - lf * 6) % 400 + 400) % 400 - 50} y={200 - j * 30} width={70} height={220 + j * 30} fill="#A9C4DA" />)}</g>)}
        <rect x={0} y={780} width={W} height={H} fill="#3A4250" />
        <rect x={360} y={FLOOR - 340} width={320} height={300} rx={30} fill="#2E5C9A" /><rect x={340} y={FLOOR - 60} width={360} height={60} rx={20} fill="#244886" />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'sitPhone', 'neutral'], [sink, 'sitSlump', 'worried'], [name, 'holdChest', 'thinking']]} x={520} s={1.15} seed={102} />
        {lf < name && <Phone x={hp.x} y={hp.y - 6} s={1.15} r={-8} />}
        <RainCloud x={520} y={FLOOR - 860} s={1.1 * on(lf, sink - 4, 12) * (1 - 0.6 * on(lf, name + 10, 20))} rain={1 - on(lf, name + 10, 16)} f={f} />
        <Vignette o={0.35} />
      </g>
    } },
    // # "that's a comparison, not a fact" — he breathes out; the cloud breaks up into sunlight
    { at: k('s15:that\'s'), cam: { fx: 540, fy: 900, s0: 1.16, s1: 1.24 }, draw: (lf, f) => (
      <g>
        <CalmRoom f={f} sky="day" />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'holdChest', 'thinking'], [20, 'relief', 'smiling']]} x={540} s={1.15} seed={103} />
        <g opacity={1 - on(lf, 10, 30)}><RainCloud x={540} y={FLOOR - 860 - lf * 2} s={0.8} rain={0} f={f} /></g>
        <Glow x={640} y={500} r={500} color="#FFF4D6" o={0.4 * on(lf, 14, 30)} />
        <Vignette o={0.25} />
      </g>
    ) },
    // # "one photo, one announcement" — a gallery wall: one perfect framed moment
    { at: k('s16'), cam: { fx: 540, fy: 700, s0: 1.0, s1: 1.12 }, draw: (lf, f) => (
      <g>
        <Room f={f} wall={['#F7F3EE', '#E9E2D8']} floor="#C9C2B8" boards={false} />
        <Glow x={540} y={640} r={520} color="#FFF4D6" o={0.6} />
        <g transform="translate(540 650)"><rect x={-330} y={-280} width={660} height={500} fill="#C9A24A" /><rect x={-300} y={-250} width={600} height={440} fill="#FFFFFF" />
          <Photo x={0} y={-10} s={2.6} kind="beach" /></g>
        <Person lf={lf} f={f} who="hero" beats={[[0, 'pockets', 'neutral'], [20, 'pockets', 'worried']]} x={240} y={FLOOR + 60} s={1.1} seed={104} />
        <Vignette o={0.3} />
      </g>
    ) },
    // # "not their doubts, their debts, or their bad days" — behind the picture: the same friend at night with the bills
    { at: k('s16:not'), cam: { fx: 540, fy: 900, s0: 1.1, s1: 1.2 }, draw: (lf, f) => (
      <g>
        <LivingEvening f={f} dim={0.7} />
        <Desk x={540} y={FLOOR - 200} w={560} c={['#5A3E46', '#3E2A32']}>
          {Array.from({ length: 5 }, (_, i) => <g key={i} transform={`translate(${-180 + i * 80} ${-4}) rotate(${(i - 2) * 9}) scale(${pop(lf, 4 + i * 5, 10)})`}><rect x={-40} y={-50} width={80} height={56} rx={3} fill="#FFFFFF" /><rect x={-30} y={-40} width={50} height={6} fill="#C9D2DC" /><rect x={-30} y={-26} width={36} height={6} fill="#C9D2DC" /><text x={18} y={-6} textAnchor="middle" fill="#D2463C" style={{ font: '400 22px "Bebas Neue"' }}>DUE</text></g>)}
        </Desk>
        <Person lf={lf} f={f} who="p-friend-f" beats={[[0, 'headHands', 'worried']]} x={540} y={FLOOR - 40} s={1.05} seed={105} />
        <Wash color="#1E1630" o={0.3} /><Vignette o={0.6} />
      </g>
    ) },
    // # "compare across time… who you were a year ago" — in the mirror: last year's tired, messy-haired him
    { at: k('s17'), cam: { fx: 600, fy: 820, s0: 1.04, s1: 1.16 }, draw: (lf, f) => (
      <g>
        <CalmRoom f={f} sky="day" />
        <Mirror x={720} y={FLOOR} s={1.1}><rect x={-200} y={-720} width={400} height={720} fill="#D6E6EE" /><g opacity={on(lf, k('s17:put') - k('s17'), 20)}><Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'idle', 'worried']]} x={0} y={0} s={0.9} flip seed={106} /></g></Mirror>
        <Person lf={lf} f={f} who="hero" beats={[[0, 'idle', 'neutral'], [k('s17:put') - k('s17'), 'think', 'thinking']]} x={300} s={1.15} seed={107} />
        <Vignette o={0.3} />
      </g>
    ) },
    // # "are you calmer?" — a quiet morning, eyes closed, a cup of tea
    { at: k('s18'), cam: { fx: 540, fy: 900, s0: 1.1, s1: 1.18 }, draw: (lf, f) => (
      <g>
        <CalmRoom f={f} sky="dawn" />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'relax', 'smiling']]} x={540} y={FLOOR + 20} s={1.1} seed={108} />
        <Mug x={820} y={FLOOR + 30} s={1.2} f={f} />
        <Vignette o={0.25} />
      </g>
    ) },
    // # "stronger?" — the gym at sunrise, the bar goes up
    { at: k('s18:stronger'), cam: { fx: 540, fy: 900, s0: 1.08, s1: 1.16 }, draw: (lf, f) => {
      const up = on(lf, 4, 14)
      return <g>
        <Gym f={f} />
        <Person lf={lf} f={f} who="hero-fit" beats={[[0, 'carryHeavy', 'angry'], [8, 'celebrate', 'smiling']]} x={600} y={FLOOR + 40} s={1.15} seed={109} />
        <Barbell x={600} y={lerp(FLOOR - 300, FLOOR - 760, up)} s={1.3} />
        <Vignette o={0.4} />
      </g>
    } },
    // # "do you know things now that you didn't know then?" — the library, a tall stack of books read
    { at: k('s18:do'), cam: { fx: 540, fy: 900, s0: 1.06, s1: 1.14 }, draw: (lf, f) => (
      <g>
        <Library f={f} />
        <Desk x={540} y={FLOOR - 180} w={600} c={['#7A5236', '#5A3A26']}><Books x={-180} y={0} n={Math.min(6, 1 + Math.floor(lf / 8))} s={1.0} /></Desk>
        <Person lf={lf} f={f} who="hero" beats={[[0, 'read', 'thinking'], [30, 'pointUp', 'smiling']]} x={620} y={FLOOR - 10} s={1.1} seed={110} />
        <Vignette o={0.45} />
      </g>
    ) },
    // # "the only race where the other runner started exactly where you did" — two of him on one start line
    { at: k('s19'), cam: { fx: 540, fy: 1000, s0: 1.0, s1: 1.08 }, draw: (lf, f) => {
      const go = k('s19:exactly') - k('s19')
      return <g>
        <Track f={f} sky="dawn" startLine />
        <Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'idle', 'neutral'], [go, 'runA', 'smiling']]} loop={lf > go ? ['runA', 'runB', 14] : undefined} x={360} y={FLOOR + 30} s={1.05} o={0.85} seed={111} />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'idle', 'smiling'], [go, 'runA', 'smiling']]} loop={lf > go ? ['runA', 'runB', 14] : undefined} x={700} y={FLOOR + 30} s={1.1} seed={112} />
        <Vignette o={0.3} />
      </g>
    } },
    // # "the only person whose whole story you actually know" — his own photo album, page by page
    { at: k('s19b'), cam: { fx: 540, fy: 820, s0: 1.0, s1: 1.1 }, draw: (lf, f) => (
      <g>
        <Room f={f} wall={['#F4E2CF', '#E9CDB4']} floor="#8A5A3C" />
        <Desk x={540} y={1050} w={1200} c={['#8A5A3C', '#6E4A32']} />
        <Album x={540} y={820} s={1.15} page={Math.min(2.99, lf / 30)} />
        <Mug x={960} y={1036} s={1.1} f={f} />
        <Vignette o={0.35} />
      </g>
    ) },
    // # "when someone else wins, let it be proof of what's possible" — her trophy under the spotlight; he claps
    { at: k('s20'), cam: { fx: 540, fy: 900, s0: 1.0, s1: 1.1 }, draw: (lf, f) => {
      const hp = hand('holdUp', 560, FLOOR, 1.1)
      const poss = k('s20:possible') - k('s20')
      return <g>
        <Stage f={f} spot={1} />
        <Person lf={lf} f={f} who="p-friend-f" beats={[[0, 'idle', 'smiling'], [16, 'holdUp', 'smiling']]} x={560} s={1.1} seed={113} />
        {lf >= 16 && <Trophy x={hp.x} y={hp.y + 40} s={0.8} shine={0.9} />}
        <Person lf={lf} f={f} who="hero" beats={[[0, 'clapA', 'smiling']]} loop={['clapA', 'clapB', 12]} x={280} y={FLOOR + 420} s={1.1} seed={114} />
        <Confetti f={f} lf={lf - poss} n={34} o={on(lf, poss, 10)} />
        <Vignette o={0.45} />
      </g>
    } },
    // # "your old self is" — sunrise finish line: he breaks the tape and turns to high-five last year's him
    { at: k('s21'), cam: { fx: 540, fy: 1000, s0: 1.08, s1: 1.0 }, draw: (lf, f) => {
      const old = k('s21:old') - k('s21')
      return <g>
        <Track f={f} sky="dawn" />
        <g transform={`translate(0 ${FLOOR - 120})`}><rect x={-20} y={-20} width={W + 40} height={10} fill="#FFFFFF" opacity={1 - on(lf, 20, 6)} /><rect x={80} y={-300} width={14} height={300} fill="#FFFFFF" /><rect x={986} y={-300} width={14} height={300} fill="#FFFFFF" /></g>
        <Person lf={lf} f={f} who="hero-struggling" beats={[[0, 'runA', 'smiling'], [old, 'celebrate', 'smiling']]} loop={lf < old ? ['runA', 'runB', 14] : undefined} x={lerp(140, 380, easeOut(span(lf, 0, old)))} y={FLOOR + 80} s={1.0} o={0.85} seed={115} />
        <Person lf={lf} f={f} who="hero" beats={[[0, 'runA', 'smiling'], [20, 'celebrate', 'smiling'], [old + 4, 'handshake', 'smiling']]} loop={lf < 20 ? ['runA', 'runB', 12] : undefined} x={lerp(420, 640, easeOut(span(lf, 0, 20)))} y={FLOOR + 80} s={1.1} flip={lf > old} seed={116} />
        <Confetti f={f} lf={lf - 20} n={30} o={on(lf, 20, 8)} />
        <Vignette o={0.3} />
      </g>
    } },
  ]
  return <Reel f={f} cuts={cuts} end={to} />
}

void Tree; void Monitor; void Board
// # beats: every cue the cuts and actions use (the plan gate's "show every line" check reads these)
export const CP_RULER = makePiece('cp-ruler', 'Compare: Festinger, other people become the ruler', {
  beats: ["s4", "s4:name", "s5", "s5:when", "s5:measure#2", "s6", "s6:am#2", "s6:am#3", "s6:so", "s7", "s7:friends", "s7b", "s7b:not", "s4:leon", "s4:social", "s5:there's", "s5:you're", "s5:against", "s6:for", "s6:the", "s7:was", "s7:neighbours", "s7:you#2", "s7b:your", "s7b:on#2", "s4:the", "s4:festinger", "s4:comparison", "s5:to", "s5:you", "s6:there's", "s7:that", "s7:around", "s7b:best"],
  sfx: [['s4', 'click'], ['s5:when', 'swish'], ['s6', 'softpop'], ['s6:am#2', 'ding'], ['s6:so', 'pop'], ['s7b:not', 'whoosh']],
  Component: RulerPiece, mood: 'light', canvas: 'tall',
})
export const CP_FEED = makePiece('cp-feed', 'Compare: the feed, Facebook study, the endless race', {
  beats: ["s8", "s8:everyone", "s8:you", "s9", "s10", "s10:lower", "s10:comparing", "s11", "s11:worse", "s12", "s12:everyone", "s13", "s13:nobody", "s13b", "s13b:ten", "s8:and", "s8:moments", "s9:looked", "s9:facebook", "s10:big", "s10:people#2", "s11:a#2", "s11:people", "s13b:the", "s13b:people", "s8:best", "s9:researchers", "s9:does", "s10:the", "s10:esteem", "s10:better", "s11:just", "s11:full", "s11:themselves", "s12:the", "s12:else's", "s13b:catch", "s13b:you#2"],
  sfx: [['s8:everyone', 'whoosh'], ['s10:lower', 'swish'], ['s11:worse', 'thud'], ['s12:everyone', 'flutter'], ['s13b:ten', 'impact']],
  Component: FeedPiece, mood: 'light', canvas: 'tall',
})
export const CP_TIME = makePiece('cp-time', 'Compare: name it, see clearly, race your past self', {
  beats: ["s14", "s14:but", "s15", "s15:sinking", "s15:name", "s15:that's", "s16", "s16:not", "s17", "s17:put", "s18", "s18:stronger", "s18:do", "s19", "s19:exactly", "s19b", "s20", "s20:possible", "s21", "s21:old", "s15:notice", "s15:you", "s15:not", "s16:seeing", "s16:one#2", "s16:doubts", "s16:their#3", "s17:not", "s17:year", "s18:you#2", "s18:then", "s19:started", "s19:did", "s19b:story", "s20:proof", "s20:not", "s21:your#2", "s14:off", "s14:you#2", "s15:when", "s15:comparison", "s16:you're", "s16:one", "s16:their#2", "s17:time", "s17:who", "s18:you#3", "s19:the#2", "s19b:whose", "s19b:you", "s20:let", "s20:proof#2", "s21:not"],
  sfx: [['s14', 'click'], ['s15:sinking', 'swish'], ["s15:that's", 'chime'], ['s16:not', 'whoosh'], ['s18:stronger', 'impact'], ['s20:possible', 'chime'], ['s21:old', 'riser']],
  Component: TimePiece, mood: 'light', canvas: 'tall',
})
