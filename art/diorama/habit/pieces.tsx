// ============================================================
// HABIT — the Short "How Long It Really Takes to Build a Habit"
// (LW batch 2, 2026-11-16). Own art direction: an open MEADOW in
// spring greens under a pale sky, a white picket fence, and a
// footpath that gets worn into the grass a little more every day
// (a habit = a path you walk until it walks itself).
// Tall canvas 1080 × 1920; action between y 420 and GROUND 1240.
// ============================================================
// HOOK  s1–s6)  a wall-calendar sheet on the fence: 21 circled → DAY 22 and he is still pushing a heavy
//    boulder; "?"; the 21 gets a big NOT A FINDING stamp; the book PSYCHO-CYBERNETICS · 1960 by MAXWELL MALTZ,
//    PLASTIC SURGEON; a hand mirror (a new face); AT LEAST 3 WEEKS → the words "AT LEAST" fall off → 21 DAYS = PROMISE.
// STUDY s7–s12b) UCL card; 96 little figures pop in; FRUIT WITH LUNCH + RUN BEFORE DINNER; an automaticity
//    chart draws itself; 66 DAYS flag at the peak; the range bar 18 … 254; HARDER = LONGER (exercise vs water);
//    WEEK 3 STILL HARD = NORMAL.
// MISS  s13–s17) the path: a curve that dips on one missed day and keeps climbing; the story bubble
//    "I FAILED. WHY BOTHER?"; one X turns into a whole month of X's.
// BUILD s18–s24) three signposts on the path: ≈ 2 MONTHS · SAME CUE, SAME TIME · NEVER MISS TWICE; the days
//    chain where he comes back; DAY 22 is a small post near the start, the finish flag far up the hill.
import React from 'react'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, Tag, win, on, pop, lerp, span, easeOut, BURG, CREAM, INK, GOLD, CX, GROUND, W, H, type Beat } from '../day3/kit'

const SKY = '#DCEFF7', SKY2 = '#F4FAF2', GRASS = '#8CCB6E', GRASS_D = '#6DAF55', GRASS_L = '#B5E09A', DIRT = '#D9B98A', FENCE = '#FFFFFF', LEAF = '#3E8A46'

// # the meadow: pale sky, rolling hill, picket fence, and a worn footpath whose wear is `wear` 0..1
const Meadow: React.FC<{ id: string; wear?: number; fence?: boolean }> = ({ id, wear = 0.2, fence = true }) => (
  <g>
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={SKY} /><stop offset="100%" stopColor={SKY2} /></linearGradient>
      <radialGradient id={`${id}-vg`} cx="0.5" cy="0.45" r="0.75"><stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#000" stopOpacity={0.16} /></radialGradient>
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-sky)`} />
    {/* # soft clouds */}
    {[[180, 170, 1], [820, 230, 0.8]].map(([x, y, s], k) => <g key={k} transform={`translate(${x} ${y}) scale(${s})`} opacity={0.9}><ellipse rx={110} ry={40} fill="#FFFFFF" /><ellipse cx={60} cy={-24} rx={70} ry={40} fill="#FFFFFF" /><ellipse cx={-50} cy={-14} rx={60} ry={32} fill="#FFFFFF" /></g>)}
    {/* # far hill, near meadow */}
    <path d={`M0 ${GROUND - 330} Q300 ${GROUND - 470} 640 ${GROUND - 380} T1080 ${GROUND - 420} L1080 ${H} L0 ${H} Z`} fill={GRASS_L} />
    <path d={`M0 ${GROUND - 120} Q420 ${GROUND - 220} 1080 ${GROUND - 150} L1080 ${H} L0 ${H} Z`} fill={GRASS} />
    <rect x={0} y={GROUND} width={W} height={H - GROUND} fill={GRASS_D} />
    {/* # the worn path: from the bottom left up the hill; it browns as it wears in */}
    <path d={`M120 ${H} Q300 ${GROUND + 80} 520 ${GROUND - 60} T980 ${GROUND - 380}`} stroke={DIRT} strokeWidth={lerp(30, 120, wear)} fill="none" opacity={lerp(0.25, 0.95, wear)} strokeLinecap="round" />
    {/* # grass tufts */}
    {Array.from({ length: 16 }, (_, k) => { const x = (k * 151) % 1080, y = GROUND + 40 + ((k * 97) % 520)
      return <path key={k} d={`M${x - 14} ${y} L${x - 6} ${y - 26} L${x} ${y} L${x + 8} ${y - 30} L${x + 14} ${y}`} fill={LEAF} opacity={0.5} /> })}
    {fence && <g>
      <rect x={0} y={GROUND - 250} width={W} height={16} fill={FENCE} stroke={INK} strokeWidth={3} />
      <rect x={0} y={GROUND - 170} width={W} height={16} fill={FENCE} stroke={INK} strokeWidth={3} />
      {Array.from({ length: 9 }, (_, k) => <path key={k} d={`M${30 + k * 128} ${GROUND - 110} L${30 + k * 128} ${GROUND - 290} L${50 + k * 128} ${GROUND - 320} L${70 + k * 128} ${GROUND - 290} L${70 + k * 128} ${GROUND - 110} Z`} fill={FENCE} stroke={INK} strokeWidth={3} />)}
    </g>}
  </g>
)
const Vig: React.FC<{ id: string }> = ({ id }) => <rect width={W} height={H} fill={`url(#${id}-vg)`} pointerEvents="none" />

// # a calendar sheet: big number, optional circle and cross
const Cal: React.FC<{ x: number; y: number; n: string; s?: number; ring?: number; r?: number }> = ({ x, y, n, s = 1, ring = 0, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-130} y={-150} width={260} height={300} rx={16} fill={CREAM} stroke={INK} strokeWidth={6} />
    <rect x={-130} y={-150} width={260} height={70} rx={16} fill={LEAF} /><rect x={-130} y={-100} width={260} height={20} fill={LEAF} />
    <text y={-98} textAnchor="middle" fill={CREAM} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 6 }}>DAY</text>
    <text y={100} textAnchor="middle" fill={INK} style={{ font: '400 170px "Bebas Neue"' }}>{n}</text>
    {ring > 0 && <ellipse cy={40} rx={100} ry={86} fill="none" stroke="#D2463C" strokeWidth={9} strokeDasharray={600} strokeDashoffset={600 * (1 - ring)} />}
  </g>
)

// # a rubber stamp
const Stamp: React.FC<{ x: number; y: number; text: string; s: number; r?: number; color?: string }> = ({ x, y, text, s, r = -10, color = '#D2463C' }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-text.length * 19 - 30} y={-50} width={text.length * 38 + 60} height={100} rx={12} fill="none" stroke={color} strokeWidth={9} />
    <text y={22} textAnchor="middle" fill={color} style={{ font: '400 66px "Bebas Neue"', letterSpacing: 4 }}>{text}</text>
  </g>
)

// # a boulder he pushes uphill (the habit that still feels like a fight)
const Boulder: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-150 0 Q-170 -150 -40 -200 Q110 -230 160 -110 Q190 0 120 0 Z" fill="#A9A39A" stroke={INK} strokeWidth={6} />
    <path d="M-80 -150 Q-20 -175 40 -160" stroke="#C9C3BA" strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M20 -60 L60 -90 M-60 -60 L-30 -40" stroke="#7E786F" strokeWidth={6} />
  </g>
)

// # a book cover
const BookCover: React.FC<{ x: number; y: number; s: number; r?: number }> = ({ x, y, s, r = -6 }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-150} y={-200} width={300} height={400} rx={10} fill="#2F5FB3" stroke={INK} strokeWidth={6} />
    <rect x={-150} y={-200} width={30} height={400} fill="#244A8C" />
    <text x={15} y={-100} textAnchor="middle" fill={CREAM} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>PSYCHO-</text>
    <text x={15} y={-50} textAnchor="middle" fill={CREAM} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>CYBERNETICS</text>
    <circle cx={15} cy={50} r={50} fill={GOLD} />
    <text x={15} y={160} textAnchor="middle" fill={GOLD} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 4 }}>1960</text>
  </g>
)

// # a hand mirror (a new face)
const Mirror: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) rotate(14) scale(${s})`}>
    <rect x={-16} y={60} width={32} height={150} rx={12} fill={BURG} stroke={INK} strokeWidth={5} />
    <ellipse rx={90} ry={110} fill={GOLD} stroke={INK} strokeWidth={6} />
    <ellipse rx={70} ry={90} fill="#E8F4FA" />
    <path d="M-40 -40 L-10 -70 M-30 -10 L10 -50" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" />
  </g>
)

// # a little person dot (study participant)
const Dot: React.FC<{ x: number; y: number; s: number; c?: string }> = ({ x, y, s, c = LEAF }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}><circle cy={-26} r={12} fill={c} /><path d="M-14 0 Q-14 -16 0 -16 Q14 -16 14 0 Z" fill={c} /></g>
)

// # the automaticity chart: a curve that rises and levels; `draw` 0..1 reveals it; optional dip at `dipAt`
const curveY = (t: number, dip: number, dipAt: number) => {
  const base = 1 - Math.exp(-t * 3.2)
  const d = dip * Math.exp(-Math.pow((t - dipAt) / 0.03, 2)) * 0.18
  return base - d
}
const Chart: React.FC<{ x: number; y: number; w: number; h: number; draw: number; dip?: number; dipAt?: number; color?: string; label?: string }> = ({ x, y, w, h, draw, dip = 0, dipAt = 0.35, color = BURG, label = 'HOW AUTOMATIC' }) => {
  const pts = Array.from({ length: 61 }, (_, k) => { const t = k / 60; return [t * w, h - curveY(t, dip, dipAt) * h * 0.9] })
  const n = Math.max(2, Math.round(draw * 60) + 1)
  const d = pts.slice(0, n).map(([px, py], k) => `${k ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join(' ')
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-30} y={-40} width={w + 60} height={h + 100} rx={20} fill="#FFFFFF" stroke={INK} strokeWidth={5} opacity={0.95} />
      <path d={`M0 0 L0 ${h} L${w} ${h}`} stroke={INK} strokeWidth={5} fill="none" />
      <path d={d} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x={10} y={-6} fill={INK} style={{ font: '400 32px "Bebas Neue"', letterSpacing: 2 }}>{label}</text>
      <text x={w} y={h + 44} textAnchor="end" fill={INK} style={{ font: '400 32px "Bebas Neue"', letterSpacing: 2 }}>DAYS →</text>
    </g>
  )
}

// # a speech bubble
const Bubble: React.FC<{ x: number; y: number; lines: string[]; s: number; tail?: number; fill?: string; ink?: string }> = ({ x, y, lines, s, tail = -1, fill = '#FFFFFF', ink = INK }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-220} y={-60 - lines.length * 30} width={440} height={80 + lines.length * 60} rx={36} fill={fill} stroke={INK} strokeWidth={6} />
    <path d={`M${tail * 80} ${20 + lines.length * 30 - 2} L${tail * 140} ${100 + lines.length * 30} L${tail * 20} ${20 + lines.length * 30 - 2} Z`} fill={fill} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    {lines.map((t, k) => <text key={k} y={-lines.length * 30 + 40 + k * 60} textAnchor="middle" fill={ink} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 2 }}>{t}</text>)}
  </g>
)

// # a wooden signpost on the path
const Sign: React.FC<{ x: number; y: number; n: string; text: string; s: number; glow?: number }> = ({ x, y, n, text, s, glow = 0 }) => s <= 0.001 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-12} y={-20} width={24} height={200} fill="#8A6A52" stroke={INK} strokeWidth={4} />
    <circle cx={0} cy={-80} r={190} fill={GOLD} opacity={0.18 * glow} />
    <path d={`M-${text.length * 15 + 70} -140 L${text.length * 15 + 50} -140 L${text.length * 15 + 90} -90 L${text.length * 15 + 50} -40 L-${text.length * 15 + 70} -40 Z`} fill={CREAM} stroke={INK} strokeWidth={6} />
    <circle cx={-text.length * 15 - 30} cy={-90} r={30} fill={LEAF} /><text x={-text.length * 15 - 30} y={-76} textAnchor="middle" fill={CREAM} style={{ font: '400 42px "Bebas Neue"' }}>{n}</text>
    <text x={20} y={-74} textAnchor="middle" fill={INK} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 2 }}>{text}</text>
  </g>
)

// ---------------------------------------------------------------- HOOK
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const heard = c('s1:heard'), n21 = c('s1:21'), habit = c('s1:habit')
  const s2 = c('s2'), n22 = c('s2:22'), wake = c('s2:wake'), fight = c('s2:fight'), wrong = c('s2:wrong')
  const s3 = c('s3'), wrong3 = c('s3:wrong'), s3n = c('s3:21'), never = c('s3:never'), finding = c('s3:finding')
  const s4 = c('s4'), book = c('s4:book'), by4 = c('s4:by'), surgeon = c('s4:surgeon'), maltz = c('s4:maltz')
  const s5 = c('s5'), patients = c('s5:patients'), three = c('s5:three'), weeks = c('s5:weeks'), change = c('s5:change'), face = c('s5:face')
  const s6 = c('s6'), least = c('s6:least'), somewhere = c('s6:somewhere'), least2 = c('s6:least#2'), promise = c('s6:promise')

  const A = win(f, 0, s4 + 2), B = on(f, s4, 8)
  // # the page flips 21 → 22 on "22"
  const flip = on(f, n22, 8)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [heard, 'point', 'smiling'], [n21, 'pointUp', 'smiling'], [s2, 'idle', 'neutral'], [wake, 'push', 'worried'], [fight, 'push', 'angry'], [wrong, 'shrug', 'worried'], [s3, 'explain', 'thinking'], [s4, 'idle', 'neutral'], [book, 'present', 'neutral'], [patients, 'explain', 'thinking'], [face, 'pointUp', 'smiling'], [least, 'countOne', 'thinking'], [promise, 'shrug', 'smug']]
  const fall = easeOut(span(f, least2, promise))
  const wob = on(f, somewhere, 6) * (1 - fall) * Math.sin(f / 3) * 6

  return (
    <g>
      <Meadow id="hbh" wear={0.15} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, n21, 6)}>
          <Cal x={760} y={620} n="21" s={pop(f, n21) * (1 - flip)} ring={on(f, habit, 14)} r={4} />
          <Cal x={760} y={620} n="22" s={flip} r={4} />
        </g>
        <g opacity={on(f, wake, 8)}><Boulder x={620} y={GROUND - 20} s={0.95} /></g>
        <g opacity={on(f, wrong, 6) * (1 - on(f, s3, 6))}><text x={860} y={460} textAnchor="middle" fill={BURG} style={{ font: '400 200px "Bebas Neue"' }} transform={`rotate(${Math.sin(f / 6) * 4} 860 400)`}>?</text></g>
        <g opacity={on(f, wrong3, 6) * (1 - on(f, never, 6))}><Tag x={CX} y={500} text="NOTHING WENT WRONG" s={pop(f, wrong3)} size={56} fill={CREAM} ink={BURG} /></g>
        <g opacity={on(f, s3n, 4)}><circle cx={760} cy={660} r={150} fill="none" stroke="#D2463C" strokeWidth={10} opacity={0.7 * (1 - on(f, never, 6))} /></g>
        <Stamp x={760} y={640} text="NOT A FINDING" s={pop(f, never) * 0.8} />
        <g opacity={on(f, finding, 6)}><Tag x={CX} y={500} text="21 DAYS = A MYTH" s={pop(f, finding)} size={56} fill={GOLD} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <BookCover x={760} y={680} s={pop(f, book) * 0.9 * (1 - on(f, patients, 8))} />
        <g opacity={on(f, by4, 6) * (1 - on(f, patients, 8))}><circle cx={775} cy={835} r={70} fill="none" stroke={GOLD} strokeWidth={8} /></g>
        <g opacity={on(f, surgeon, 6) * (1 - on(f, patients, 8))}><Tag x={CX} y={460} text="MAXWELL MALTZ" s={pop(f, maltz)} size={56} fill={CREAM} ink={BURG} /><Tag x={CX} y={1010} text="PLASTIC SURGEON" s={pop(f, surgeon)} size={40} fill={GOLD} /></g>
        <Mirror x={780} y={720} s={pop(f, face) * 0.9 * (1 - on(f, s6, 8))} />
        <g opacity={on(f, patients, 6) * (1 - on(f, s6, 8))}>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, [three, weeks, change][k], 6)}><Cal x={640 + k * 90} y={1000} n={String(k + 1)} s={0.42} r={-6 + k * 6} /></g>)}
          <Tag x={CX} y={470} text="AT LEAST 3 WEEKS" s={pop(f, three)} size={54} fill={GOLD} />
        </g>
        <g opacity={on(f, s6, 6)}>
          {/* # "AT LEAST" falls off the sign, leaving a promise */}
          <g transform={`translate(${CX} ${600 + fall * 600}) rotate(${fall * 40 + wob})`} opacity={1 - fall}><Tag x={0} y={0} text="AT LEAST" s={pop(f, least)} size={60} fill={CREAM} ink={BURG} /></g>
          <Tag x={CX} y={760} text="21 DAYS" s={pop(f, s6)} size={80} fill={GOLD} />
          <Stamp x={CX} y={900} text="PROMISE?" s={pop(f, promise) * 0.85} color={BURG} r={6} />
        </g>
      </g>}
      <Person f={f} who="hero-struggling" beats={hero} x={f >= wake && f < s3 ? 400 : 260} s={0.86} />
      <Headline text={f < s3 ? '21 DAYS?' : f < s4 ? '' : f < s6 ? 'WHERE IT CAME FROM' : 'MINIMUM OR PROMISE?'} o={f < s3 ? on(f, n21, 8) * (1 - on(f, s3 - 4, 4)) : f < s4 ? 0 : f < s6 ? on(f, s4, 8) * (1 - on(f, s6 - 4, 4)) : on(f, s6, 8)} color={INK} />
      <Vig id="hbh" />
    </g>
  )
}

// ---------------------------------------------------------------- STUDY
const Study: React.FC<PieceProps> = ({ f, c }) => {
  const researchers = c('s7:researchers'), london = c('s7:london'), measured = c('s7:measured')
  const s8 = c('s8'), n96 = c('s8:96'), habit = c('s8:habit'), fruit = c('s8:fruit'), run = c('s8:run'), dinner = c('s8:dinner')
  const s9 = c('s9'), rated = c('s9:rated'), automatic = c('s9:automatic'), happened = c('s9:happened'), thinking = c('s9:thinking')
  const s10 = c('s10'), typical = c('s10:typical'), n66 = c('s10:66'), peak = c('s10:peak')
  const s11 = c('s11'), range = c('s11:range'), person11 = c('s11:person'), huge = c('s11:huge'), estimated = c('s11:estimated'), n18 = c('s11:18'), others = c('s11:others'), n254 = c('s11:254')
  const s12 = c('s12'), harder = c('s12:harder'), exercise = c('s12:exercise'), longer = c('s12:longer'), easy12 = c('s12:easy'), water = c('s12:water')
  const s12b = c('s12b'), three = c('s12b:three'), hard12 = c('s12b:hard'), failure = c('s12b:failure'), data = c('s12b:data')

  const A = win(f, 0, s9 + 2), B = win(f, s9, s11 + 2), C = win(f, s11, s12b + 2), D = on(f, s12b, 8)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [researchers, 'present', 'thinking'], [measured, 'measure', 'thinking'], [n96, 'pointUp', 'smiling'], [fruit, 'hold', 'smiling'], [run, 'runA', 'smiling'], [rated, 'think', 'thinking'], [automatic, 'explain', 'neutral'], [n66, 'pointUp', 'smiling'], [range, 'present', 'shocked'], [n254, 'shock', 'shocked'], [harder, 'explain', 'thinking'], [exercise, 'carryHeavy', 'worried'], [water, 'hold', 'smiling'], [s12b, 'idle', 'neutral'], [three, 'countA', 'thinking'], [failure, 'stop', 'neutral'], [data, 'thumbsUp', 'smiling']]
  const draw = easeOut(span(f, automatic, peak + 20))

  return (
    <g>
      <Meadow id="hbs" wear={0.35} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, researchers, 6)} transform={`translate(${CX} 560) scale(${pop(f, researchers)})`}>
          <rect x={-320} y={-110} width={640} height={220} rx={18} fill="#FFFFFF" stroke={INK} strokeWidth={6} />
          <text y={-30} textAnchor="middle" fill={LEAF} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 3 }}>UNIVERSITY COLLEGE</text>
          <text y={36} textAnchor="middle" fill={LEAF} style={{ font: '400 54px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, london, 6)}>LONDON</text>
          <text y={86} textAnchor="middle" fill={BURG} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, measured, 6)}>MEASURED FOR REAL</text>
        </g>
        <g opacity={on(f, n96, 6)}>
          {Array.from({ length: 96 }, (_, k) => <Dot key={k} x={540 + (k % 12) * 42} y={760 + Math.floor(k / 12) * 46} s={0.9 * on(f, n96 + (k % 24), 6)} c={k % 3 ? LEAF : BURG} />)}
          <Tag x={760} y={720} text="96 PEOPLE" s={pop(f, n96)} size={44} fill={GOLD} />
        </g>
        <g opacity={on(f, fruit, 6)}><g transform="translate(820 1150)"><circle r={44} fill="#D2463C" stroke={INK} strokeWidth={5} /><path d="M0 -44 Q10 -70 30 -74" stroke={LEAF} strokeWidth={8} fill="none" /></g></g>
        <g opacity={on(f, run, 6)}><g transform="translate(960 1150)"><path d="M-50 20 L-40 -30 Q-10 -40 10 -10 L50 0 Q60 20 40 26 Z" fill={BURG} stroke={INK} strokeWidth={5} /></g><Tag x={880} y={1050} text={f >= dinner ? 'ONE SIMPLE DAILY HABIT' : 'FRUIT · A RUN'} s={pop(f, habit)} size={34} fill={CREAM} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Chart x={460} y={560} w={540} h={420} draw={draw} />
        <g opacity={on(f, rated, 6) * (1 - on(f, typical, 6))}><Tag x={730} y={470} text="EVERY DAY: HOW AUTOMATIC?" s={pop(f, rated)} size={38} fill={CREAM} /></g>
        <g opacity={on(f, happened, 6) * (1 - on(f, typical, 6))}><Tag x={730} y={1080} text={f >= thinking ? "WITHOUT THINKING" : "IT JUST HAPPENS"} s={pop(f, f >= thinking ? thinking : happened)} size={40} fill={GOLD} /></g>
        <g opacity={on(f, n66, 6)}>
          <path d={`M${460 + 540 * 0.62} 980 L${460 + 540 * 0.62} 640`} stroke={GOLD} strokeWidth={6} strokeDasharray="14 10" />
          <Tag x={460 + 540 * 0.62} y={1090} text="66 DAYS" s={pop(f, n66)} size={60} fill={GOLD} />
        </g>
        <g opacity={on(f, typical, 6)}><Tag x={730} y={470} text={f >= peak ? "ITS PEAK" : "THE TYPICAL PERSON"} s={pop(f, f >= peak ? peak : typical)} size={40} fill={CREAM} /></g>
      </g>}
      {C > 0.001 && <g opacity={C}>
        {/* # the range bar: 18 … 254 */}
        <g transform="translate(140 760)">
          <rect x={0} y={-30} width={860 * on(f, range, 20)} height={60} rx={30} fill={GRASS_L} stroke={INK} strokeWidth={5} />
          <Dot x={60} y={-70} s={pop(f, person11) * 1.4} c={BURG} />
          <g opacity={on(f, n18, 6)}><circle cx={60} r={44} fill={LEAF} stroke={INK} strokeWidth={5} /><text x={60} y={18} textAnchor="middle" fill={CREAM} style={{ font: '400 50px "Bebas Neue"' }}>18</text></g>
          <g opacity={on(f, others, 6)}><circle cx={250} r={34} fill={GOLD} stroke={INK} strokeWidth={5} /><text x={250} y={14} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"' }}>66</text></g>
          <path d="M420 0 L760 0" stroke={BURG} strokeWidth={8} strokeDasharray="20 14" opacity={on(f, estimated, 8)} />
          <g opacity={on(f, n254, 6)}><circle cx={800} r={54} fill={BURG} stroke={INK} strokeWidth={5} /><text x={800} y={20} textAnchor="middle" fill={CREAM} style={{ font: '400 56px "Bebas Neue"' }}>254</text></g>
          <text x={430} y={110} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }} opacity={on(f, n254, 6)}>DAYS (ESTIMATED)</text>
        </g>
        <g opacity={on(f, huge, 6) * (1 - on(f, s12, 6))}><Tag x={CX} y={520} text="THE RANGE WAS HUGE" s={pop(f, huge)} size={56} fill={GOLD} /></g>
        <g opacity={on(f, harder, 6)}>
          {/* # harder habits take longer: a long bar (exercise) and a short bar (water) */}
          <g opacity={on(f, exercise, 6)}><rect x={560} y={950} width={lerp(140, 420, on(f, longer, 16)) * on(f, exercise, 10)} height={56} rx={14} fill={BURG} /><text x={570} y={935} fill={INK} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>EXERCISE</text></g>
          <g opacity={on(f, easy12, 6)}><rect x={560} y={1080} width={200 * on(f, water, 12) + 20} height={56} rx={14} fill="#5AA9F0" /><text x={570} y={1065} fill={INK} style={{ font: '400 36px "Bebas Neue"', letterSpacing: 2 }}>GLASS OF WATER</text></g>
          <Tag x={CX} y={520} text="HARDER = LONGER" s={pop(f, harder)} size={56} fill={CREAM} ink={BURG} />
        </g>
      </g>}
      {D > 0.001 && <g opacity={D}>
        <Chart x={460} y={560} w={540} h={420} draw={1} />
        {/* # week 3 marker low on the curve */}
        <g opacity={on(f, three, 6)}><circle cx={460 + 540 * 0.24} cy={560 + 420 - curveY(0.24, 0, 0) * 420 * 0.9} r={24 + 10 * on(f, hard12, 6) * Math.abs(Math.sin(f / 5))} fill={f >= hard12 ? '#D2463C' : GOLD} stroke={INK} strokeWidth={5} /><Tag x={460 + 540 * 0.24 + 40} y={1090} text="WEEK 3: STILL HARD" s={pop(f, three)} size={40} fill={CREAM} /></g>
        <g opacity={on(f, failure, 6)}><Tag x={CX} y={470} text={f >= data ? 'THAT IS NORMAL' : 'NOT FAILURE'} s={pop(f, f >= data ? data : failure)} size={60} fill={GOLD} /></g>
      </g>}
      <Person f={f} who="hero" beats={hero} x={240} s={0.84} />
      <Headline text={f < s9 ? 'THE REAL STUDY' : f < s11 ? 'THE REAL NUMBER' : f < s12b ? 'IT DEPENDS' : 'STILL HARD?'} o={f < s9 ? on(f, researchers, 8) * (1 - on(f, s9 - 4, 4)) : f < s11 ? on(f, s9, 8) * (1 - on(f, s11 - 4, 4)) : f < s12b ? on(f, s11, 8) * (1 - on(f, s12b - 4, 4)) : on(f, s12b, 8)} color={INK} />
      <Vig id="hbs" />
    </g>
  )
}

// ---------------------------------------------------------------- MISS
const Miss: React.FC<PieceProps> = ({ f, c }) => {
  const matters = c('s13:matters')
  const s14 = c('s14'), missing = c('s14:missing'), ruin = c('s14:ruin'), dipped = c('s14:dipped'), climbing = c('s14:climbing')
  const s15 = c('s15'), danger = c('s15:danger'), story = c('s15:story')
  const s16 = c('s16'), failed = c('s16:failed'), bother = c('s16:bother')
  const s17 = c('s17'), day = c('s17:day'), month = c('s17:month')

  const A = win(f, 0, s15 + 2), B = on(f, s15, 8)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [matters, 'pointUp', 'thinking'], [missing, 'oops', 'worried'], [ruin, 'crossNoA', 'neutral'], [dipped, 'pointDown', 'neutral'], [climbing, 'celebrate', 'smiling'], [s15, 'idle', 'thinking'], [danger, 'stop', 'worried'], [story, 'talk', 'worried'], [failed, 'slump', 'worried'], [bother, 'despair', 'worried'], [day, 'idle', 'worried'], [month, 'facepalm', 'worried']]
  const draw = easeOut(span(f, missing, climbing + 20))
  const xs = Math.round(lerp(0, 30, easeOut(span(f, month, month + 30))))

  return (
    <g>
      <Meadow id="hbm" wear={0.5} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, matters, 6)}><Tag x={CX} y={480} text="WHAT MATTERS MOST" s={pop(f, matters)} size={56} fill={GOLD} /></g>
        <Chart x={460} y={620} w={540} h={400} draw={draw} dip={on(f, dipped, 10)} dipAt={0.4} label="THE HABIT" />
        <g opacity={on(f, missing, 6)}><g transform={`translate(${460 + 540 * 0.4} 600)`}><Tag x={0} y={0} text="MISSED ONE DAY" s={pop(f, missing)} size={34} fill={CREAM} ink={BURG} /></g></g>
        <g opacity={on(f, ruin, 6)}><Tag x={760} y={1140} text={f >= climbing ? 'KEPT CLIMBING' : 'NOT RUINED'} s={pop(f, f >= climbing ? climbing : ruin)} size={48} fill={GOLD} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, danger, 6) * (1 - on(f, s16, 6))}><Tag x={CX} y={500} text="THE REAL DANGER" s={pop(f, danger)} size={56} fill={CREAM} ink={BURG} /></g>
        <Bubble x={690} y={700} lines={f >= failed ? ['I FAILED.', 'WHY BOTHER?'] : ['THE STORY', 'YOU TELL']} s={pop(f, story) * (1 - on(f, s17, 8))} tail={-1} fill={f >= failed ? '#F6D7D2' : '#FFFFFF'} ink={BURG} />
        <g opacity={on(f, bother, 6) * (1 - on(f, s17, 8))}><Stamp x={720} y={1000} text="QUIT" s={pop(f, bother) * 0.8} /></g>
        {/* # one missed day becomes a missed month: a calendar grid filling with X's */}
        <g opacity={on(f, s17, 6)} transform="translate(560 560)">
          <rect x={-20} y={-60} width={480} height={500} rx={18} fill={CREAM} stroke={INK} strokeWidth={6} />
          <text x={220} y={-10} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>{f >= month ? 'A MISSED MONTH' : 'ONE MISSED DAY'}</text>
          {Array.from({ length: 30 }, (_, k) => { const gx = (k % 6) * 74 + 20, gy = Math.floor(k / 6) * 78 + 30, x = k === 0 ? on(f, day, 6) : k < xs ? 1 : 0
            return <g key={k}><rect x={gx} y={gy} width={60} height={60} rx={8} fill="#FFFFFF" stroke={INK} strokeWidth={3} />{x > 0 && <path d={`M${gx + 12} ${gy + 12} L${gx + 48} ${gy + 48} M${gx + 48} ${gy + 12} L${gx + 12} ${gy + 48}`} stroke="#D2463C" strokeWidth={7} opacity={x} />}</g> })}
        </g>
      </g>}
      <Person f={f} who="hero-struggling" beats={hero} x={240} s={0.84} />
      <Headline text={f < s15 ? 'MISSING A DAY' : 'THE STORY'} o={f < s15 ? on(f, s14, 8) * (1 - on(f, s15 - 4, 4)) : on(f, s15, 8)} color={INK} />
      <Vig id="hbm" />
    </g>
  )
}

// ---------------------------------------------------------------- BUILD
const Build: React.FC<PieceProps> = ({ f, c }) => {
  const s18 = c('s18')
  const counting = c('s19:counting'), n21 = c('s19:21'), expect = c('s19:expect'), months = c('s19:months'), effort = c('s19:effort')
  const s20 = c('s20'), small = c('s20:small'), moment = c('s20:moment'), day20 = c('s20:day'), same2 = c('s20:same#2'), cue = c('s20:cue'), action = c('s20:action')
  const s21 = c('s21'), restart = c('s21:restart'), show = c('s21:show'), twice = c('s21:twice')
  const s22 = c('s22'), streak = c('s22:streak'), built2 = c('s22:built#2'), back = c('s22:back')
  const s23 = c('s23'), finish = c('s23:finish'), people = c('s23:people'), middle = c('s23:middle')
  const s24 = c('s24'), going = c('s24:going'), easy = c('s24:easy')

  const A = win(f, 0, s22 + 2), B = on(f, s22, 8)
  const hero: Beat[] = [[0, 'idle', 'smiling'], [counting, 'crossNoA', 'neutral'], [months, 'countB', 'thinking'], [effort, 'carry', 'neutral'], [small, 'measure', 'smiling'], [moment, 'pointUp', 'thinking'], [action, 'thumbsUp', 'smiling'], [restart, 'stop', 'neutral'], [show, 'waveA', 'smiling'], [twice, 'countB', 'smug'], [streak, 'explain', 'neutral'], [back, 'relief', 'smiling'], [s23, 'walkA', 'smiling'], [finish, 'pointUp', 'thinking'], [middle, 'walkB', 'smiling'], [going, 'walkA', 'smiling'], [easy, 'confident', 'smiling']]
  // # the three signposts arrive one by one; he walks up the path in the second half
  const walk = easeOut(span(f, s23, easy + 30))

  return (
    <g>
      <Meadow id="hbb" wear={lerp(0.55, 1, easeOut(span(f, s22, back + 20)))} fence={false} />
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, s18, 6) * (1 - on(f, counting, 8))}><Tag x={CX} y={500} text="HOW TO USE THIS" s={pop(f, s18)} size={58} fill={GOLD} /></g>
        <Sign x={760} y={620} n="1" text={f >= months ? '≈ 2 MONTHS' : f >= expect ? 'EXPECT…' : f >= n21 ? 'NOT 21' : 'STOP COUNTING'} s={pop(f, counting) * 0.9} glow={on(f, effort, 8)} />
        <g opacity={on(f, effort, 6)}><Tag x={760} y={720} text="IT WILL FEEL LIKE EFFORT" s={pop(f, effort)} size={34} fill={CREAM} /></g>
        <g opacity={on(f, day20, 6) * (1 - on(f, s21, 6))}><g transform="translate(960 760)"><circle r={46} fill="#FFFFFF" stroke={INK} strokeWidth={5} /><path d={`M0 0 L0 -30 M0 0 L${20 * Math.cos(f / 10)} ${20 * Math.sin(f / 10)}`} stroke={INK} strokeWidth={6} strokeLinecap="round" /></g></g>
        <Sign x={760} y={890} n="2" text={f >= cue ? 'SAME CUE · SAME TIME' : f >= same2 ? 'SAME PLACE' : f >= moment ? 'SAME MOMENT' : 'KEEP IT SMALL'} s={pop(f, small) * 0.85} glow={on(f, action, 8)} />
        <Sign x={760} y={1150} n="3" text="NEVER MISS TWICE" s={pop(f, twice) * 0.85} glow={on(f, twice + 10, 8)} />
        <g opacity={on(f, restart, 6) * (1 - on(f, twice, 8))}><Tag x={760} y={1150} text={f >= show ? 'JUST SHOW UP' : "DON'T RESTART"} s={pop(f, f >= show ? show : restart)} size={44} fill={GOLD} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        {/* # a chain of days with a gap: the link after the gap is the one that counts */}
        <g opacity={on(f, streak, 6) * (1 - on(f, s23, 8))} transform="translate(120 760)">
          {Array.from({ length: 9 }, (_, k) => k === 4 ? null : <g key={k} opacity={k > 4 ? on(f, built2 + (k - 5) * 3, 4) : on(f, streak + k * 2, 4)}><rect x={k * 96} y={-40} width={80} height={80} rx={40} fill={k === 5 ? GOLD : GRASS_L} stroke={INK} strokeWidth={6} /></g>)}
          <g opacity={on(f, back, 6)}><Tag x={5 * 96 + 40} y={-120} text="YOU CAME BACK" s={pop(f, back)} size={44} fill={GOLD} /></g>
        </g>
        <g opacity={on(f, streak, 6) * (1 - on(f, s23, 8))}><Tag x={CX} y={500} text="NOT A PERFECT STREAK" s={pop(f, streak)} size={50} fill={CREAM} ink={BURG} /></g>
        {/* # the hill: day 22 is a small post near the bottom; the finish flag is far up */}
        <g opacity={on(f, s23, 6)}>
          <g transform={`translate(560 ${GROUND - 70})`}><rect x={-8} y={-110} width={16} height={110} fill="#8A6A52" /><rect x={-60} y={-150} width={120} height={56} rx={10} fill={CREAM} stroke={INK} strokeWidth={5} /><text y={-110} textAnchor="middle" fill={INK} style={{ font: '400 40px "Bebas Neue"' }}>DAY 22</text></g>
          <g transform={`translate(960 ${GROUND - 400})`} opacity={on(f, finish, 6)}><rect x={-6} y={-200} width={12} height={200} fill={INK} /><path d="M6 -200 L120 -170 L6 -140 Z" fill={BURG} /><circle cy={-100} r={160} fill={GOLD} opacity={0.2} /></g>
          {[0, 1, 2].map((k) => <Dot key={k} x={700 + k * 70} y={GROUND - 200 - k * 50} s={on(f, people + k * 3, 6) * 1.3} c={k === 1 ? BURG : LEAF} />)}
          <g opacity={on(f, middle, 6)}><Tag x={CX} y={500} text="BARELY THE MIDDLE" s={pop(f, middle)} size={58} fill={GOLD} /></g>
          <g opacity={on(f, easy, 6)}><Tag x={800} y={660} text="THE EASY PART IS COMING" s={pop(f, easy)} size={40} fill={CREAM} ink={BURG} /></g>
        </g>
      </g>}
      <Person f={f} who="hero" beats={hero} x={f >= s23 ? lerp(260, 640, walk) : 260} y={f >= s23 ? lerp(GROUND, GROUND - 120, walk) : GROUND} s={f >= s23 ? lerp(0.84, 0.62, walk) : 0.84} />
      <Headline text={f < s22 ? 'BUILD IT' : f < s23 ? 'COME BACK' : 'KEEP GOING'} o={f < s22 ? on(f, s18, 8) * (1 - on(f, s22 - 4, 4)) : f < s23 ? on(f, s22, 8) * (1 - on(f, s23 - 4, 4)) : on(f, s23, 8)} color={INK} />
      <Vig id="hbb" />
    </g>
  )
}

export const HB_HOOK = makePiece('hb-hook', 'Habit: 21 days is a myth (Maltz 1960)', {
  beats: ['s1:heard', 's1:21', 's1:habit', 's2', 's2:22', 's2:wake', 's2:fight', 's2:wrong', 's3', 's3:wrong', 's3:21', 's3:never', 's3:finding', 's4', 's4:book', 's4:by', 's4:surgeon', 's4:maltz', 's5', 's5:patients', 's5:three', 's5:weeks', 's5:change', 's5:face', 's6', 's6:least', 's6:somewhere', 's6:least#2', 's6:promise'],
  sfx: [['s1:21', 'softpop'], ['s2:22', 'swish'], ['s2:fight', 'thud'], ['s3:never', 'impact'], ['s4:book', 'swish'], ['s6:promise', 'pop']],
  Component: Hook, mood: 'light', canvas: 'tall',
})
export const HB_STUDY = makePiece('hb-study', 'Habit: UCL study, 66 days, 18–254 range', {
  beats: ['s7', 's7:researchers', 's7:london', 's7:measured', 's8', 's8:96', 's8:habit', 's8:fruit', 's8:run', 's8:dinner', 's9', 's9:rated', 's9:automatic', 's9:happened', 's9:thinking', 's10', 's10:typical', 's10:66', 's10:peak', 's11', 's11:range', 's11:huge', 's11:estimated', 's11:person', 's11:18', 's11:others', 's11:254', 's12', 's12:harder', 's12:exercise', 's12:longer', 's12:easy', 's12:water', 's12b', 's12b:three', 's12b:hard', 's12b:failure', 's12b:data'],
  sfx: [['s8:96', 'pop'], ['s10:66', 'ding'], ['s11:254', 'impact'], ['s12b:data', 'chime']],
  Component: Study, mood: 'light', canvas: 'tall',
})
export const HB_MISS = makePiece('hb-miss', 'Habit: missing one day did not ruin it', {
  beats: ['s13', 's13:matters', 's14', 's14:missing', 's14:ruin', 's14:dipped', 's14:climbing', 's15', 's15:danger', 's15:story', 's16', 's16:failed', 's16:bother', 's17', 's17:day', 's17:month'],
  sfx: [['s14:dipped', 'swish'], ['s14:climbing', 'riser'], ['s16:bother', 'thud'], ['s17:month', 'tick']],
  Component: Miss, mood: 'light', canvas: 'tall',
})
export const HB_BUILD = makePiece('hb-build', 'Habit: two months, same cue, never miss twice', {
  beats: ['s18', 's19', 's19:counting', 's19:21', 's19:expect', 's19:months', 's19:effort', 's20', 's20:small', 's20:moment', 's20:day', 's20:same#2', 's20:cue', 's20:action', 's21', 's21:restart', 's21:show', 's21:twice', 's22', 's22:streak', 's22:built#2', 's22:back', 's23', 's23:finish', 's23:people', 's23:middle', 's24', 's24:going', 's24:easy'],
  sfx: [['s19:counting', 'softpop'], ['s20:small', 'softpop'], ['s21:twice', 'softpop'], ['s22:back', 'chime'], ['s23:finish', 'whoosh'], ['s24:easy', 'riser']],
  Component: Build, mood: 'light', canvas: 'tall',
})
