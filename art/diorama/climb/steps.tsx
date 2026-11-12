// ---------------------------------------------------------------- s7–s18: the three steps.
// STEP 1 (dawn): ten bricks crack across the middle; the top half lifts away and dissolves (−$500), $500 left.
// STEP 2 (night): "+50% … of what?" — a dashed $1,000 ghost (crossed out) next to the real $500 stack (it glows);
//   half of it, 2½ bricks, peels off and climbs on top (+$250) → $750; then BIG PILE vs SMALL PILE side by side:
//   the loss takes five bricks off the big pile, the gain adds only 2½ to the small one.
// STEP 3 (dawn): a $1,000 flag line; five new bricks climb to it one by one (+100%, ×2) and the flag turns green;
//   then three pits on the ledge: each red fall (10, 25, 50) and its taller green climb back (11, 33, 100), to scale.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Label } from '../charts'
import { Alps, Arrow, BH, Brick, Cross, CX, Dust, GAIN, GAIN_L, GOLD, GROUND, Headline, INK, INK2, Level, LOSS, LOSS_L, SNOW, Stack, Tag, top, Vig, win } from './kit'

// # a round stone badge with the step number
const Badge: React.FC<{ x: number; y: number; n: number; o: number; s?: number; night?: boolean }> = ({ x, y, n, o, s = 1, night }) => o > 0.001 ? (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={10} rx={78} ry={70} fill={night ? '#121C32' : '#6A5B49'} opacity={0.5} />
    <circle r={72} fill={night ? '#3B4C70' : '#A39C93'} /><circle r={58} fill={night ? '#53668F' : '#C8C1B6'} />
    <text y={8} textAnchor="middle" fill={night ? SNOW : INK} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 3 }}>STEP</text>
    <text y={50} textAnchor="middle" fill={night ? SNOW : INK} style={{ font: '400 48px "Bebas Neue"' }}>{n}</text>
  </g>) : null

// ------------------------------------------------------------ STEP 1 — s7–s8
const Step1: React.FC<PieceProps> = ({ f, c }) => {
  const s7 = c('s7'), one = c('s7:one'), start = c('s7:start'), d1000 = c('s7:1000'), falls = c('s7:falls'), d50 = c('s7:50')
  const half = c('s8:half'), d1000b = c('s8:1000'), d500 = c('s8:500'), disappears = c('s8:disappears'), left = c('s8:left'), d500b = c('s8:500#2')
  const X = 560, split = on(f, d50, 12), gone = on(f, disappears, 22)
  return (
    <g>
      <Alps id="cl-step1" f={f} />
      <Badge x={170} y={500} n={1} o={on(f, s7, 8)} s={pop(f, one)} />
      <Stack x={X} y={GROUND} n={5} at={start} f={f} glow={on(f, left, 8) * (1 - on(f, left + 30, 20))} />
      {/* # the top half: lifts on "50", glows on "half", dissolves on "disappears" */}
      {gone < 1 && <g opacity={1 - gone} transform={`translate(${gone * 60} ${-split * 46 - gone * 160})`}>
        {[5, 6, 7, 8, 9].map((i) => <g key={i} opacity={on(f, start + i * 2, 6)}><Brick x={X} y={GROUND - i * BH - (1 - on(f, start + i * 2, 6)) * 60} glow={on(f, half, 8)} /></g>)}
        <Tag x={X + 270} y={top(GROUND, 7.5)} text="−$500" color={LOSS} o={on(f, d500, 6)} s={pop(f, d500)} size={60} to={[X + 120, top(GROUND, 7.5)]} />
      </g>}
      <Dust x={X} y={top(GROUND, 8) - 100} f={f} at={disappears + 8} n={22} spread={260} />
      {/* # the crack across the middle */}
      <g opacity={on(f, falls, 5) * (1 - on(f, d50, 8))}><polyline points={`${X - 140},${top(GROUND, 5)} ${X - 80},${top(GROUND, 5) - 12} ${X - 20},${top(GROUND, 5) + 8} ${X + 40},${top(GROUND, 5) - 10} ${X + 100},${top(GROUND, 5) + 6} ${X + 150},${top(GROUND, 5) - 6}`} fill="none" stroke={LOSS} strokeWidth={8} strokeLinejoin="round" /></g>
      {/* # a bracket on the whole stack = $1,000 (s7 and s8 "1,000") */}
      <g opacity={(on(f, d1000 + 4, 6) * (1 - on(f, d50, 6))) + on(f, d1000b, 6) * (1 - on(f, d500, 6))}>
        <path d={`M${X - 150} ${GROUND} h-24 V${top(GROUND, 10) - (f >= d50 ? 46 : 0)} h24`} fill="none" stroke={INK} strokeWidth={6} />
        <Tag x={X - 300} y={(GROUND + top(GROUND, 10)) / 2} text="$1,000" size={58} />
      </g>
      <Tag x={X - 290} y={top(GROUND, 2.5)} text="$500 LEFT" o={on(f, left, 6)} s={pop(f, d500b)} size={58} color={GAIN} to={[X - 120, top(GROUND, 2.5)]} />
      <Vig id="cl-step1" />
      <Headline f={f} lines={[[one, 'STEP 1: FALL 50%', LOSS, 100], [half, 'HALF OF $1,000', INK, 100], [left, '$500 LEFT', INK, 104]]} />
    </g>
  )
}

// ------------------------------------------------------------ STEP 2 — s9–s12
const Step2: React.FC<PieceProps> = ({ f, c }) => {
  const s9 = c('s9'), two = c('s9:two'), rises = c('s9:rises'), d50 = c('s9:50'), of9 = c('s9:of'), what = c('s9:what')
  const not = c('s10:not'), d1000 = c('s10:1000'), started = c('s10:started'), d500 = c('s10:500')
  const s11 = c('s11'), d250 = c('s11:250'), back = c('s11:back'), d750 = c('s11:750')
  const s12 = c('s12'), loss = c('s12:loss'), taken = c('s12:taken'), big = c('s12:big'), gain = c('s12:gain'), added = c('s12:added'), small = c('s12:small')
  const AB = 1 - on(f, s12 - 4, 8), C = on(f, s12, 8)
  const X = 640, GX = 270
  const peel = on(f, d250, 20)                                    // # half of the $500 peels off and climbs on top
  return (
    <g>
      <Alps id="cl-step2" f={f} tone="night" />
      {AB > 0.001 && <g opacity={AB}>
        <Badge x={170} y={500} n={2} o={on(f, s9, 8) * (1 - on(f, of9, 8))} s={pop(f, two)} night />
        <Stack x={X} y={GROUND} n={5} glow={on(f, d500, 8) * (1 - on(f, s11, 10))} />
        <Arrow x={X} y={top(GROUND, 5) - 20} len={200} up p={on(f, rises, 14)} o={1 - on(f, of9, 8)} w={44} />
        <Tag x={X} y={top(GROUND, 5) - 270} text="+50%" color={GAIN} o={on(f, d50, 6) * (1 - on(f, of9, 8))} s={pop(f, d50)} size={66} />
        {/* # "of what?" — the old $1,000 as a dashed ghost on the left, both marked with a question */}
        <g opacity={on(f, of9, 8) * (1 - on(f, s11, 10))}>
          <Stack x={GX} y={GROUND} n={10} tone="ghost" />
          <Tag x={GX} y={top(GROUND, 10) - 60} text="$1,000" o={on(f, d1000, 6)} color={SNOW} tc={INK} size={56} />
          <Cross x={GX} y={top(GROUND, 5)} r={100} f={f} at={started} />
          {[GX, X].map((x, k) => <g key={k} opacity={on(f, what, 6) * (1 - on(f, not, 8))}><Label x={x} y={top(GROUND, k ? 5 : 10) - 40} text="?" size={110} font="Bebas Neue" color={GOLD} /></g>)}
        </g>
        <Tag x={X} y={top(GROUND, 5) - 70} text="$500 NOW" color={SNOW} tc={INK} o={on(f, d500, 6) * (1 - on(f, s11, 8))} s={pop(f, d500)} size={56} />
        {/* # half of 500: a green copy of the lower 2½ bricks, then it climbs on top */}
        {f >= s11 && <g opacity={on(f, s11, 6)} transform={`translate(${Math.sin(peel * Math.PI) * 170} ${-peel * 2.5 * BH * 2})`}>
          <Stack x={X} y={GROUND} n={2.5} tone={peel < 1 ? 'green' : 'gold'} o={peel < 1 ? 0.85 : 1} glow={on(f, back, 8) * (1 - on(f, back + 24, 12))} />
        </g>}
        <Tag x={X - 290} y={top(GROUND, 6.25)} text="+$250" color={GAIN} o={on(f, d250, 6)} s={pop(f, d250)} size={60} to={[X - 120, top(GROUND, 6.25)]} />
        <Tag x={X} y={top(GROUND, 7.5) - 70} text="$750" color={SNOW} tc={INK} o={on(f, d750, 6)} s={pop(f, d750)} size={64} />
      </g>}
      {/* # BIG PILE vs SMALL PILE: the same 50%, very different amounts */}
      {C > 0.001 && <g opacity={C}>
        <Stack x={290} y={GROUND} n={5} at={s12} f={f} />
        <g transform={`translate(${-on(f, taken, 18) * 40} ${-on(f, taken, 18) * 120})`} opacity={1 - 0.25 * on(f, taken + 10, 10)}>
          <Stack x={290} y={top(GROUND, 5)} n={5} at={s12 + 4} f={f} tone={f >= loss ? 'red' : 'gold'} />
          <Tag x={290} y={top(GROUND, 10) - 50} text="LOSS" color={LOSS} o={on(f, loss, 6)} size={52} />
        </g>
        <Tag x={290} y={GROUND + 42} text="BIG PILE" color={SNOW} tc={INK} o={on(f, big, 6)} s={pop(f, big)} size={48} />
        <Stack x={740} y={GROUND} n={5} at={s12 + 8} f={f} />
        <g transform={`translate(0 ${-(1 - on(f, added, 12)) * 200})`} opacity={on(f, gain, 6)}>
          <Stack x={740} y={top(GROUND, 5)} n={2.5} tone="green" />
          <Tag x={740} y={top(GROUND, 7.5) - 50} text="GAIN" color={GAIN} size={52} />
        </g>
        <Tag x={740} y={GROUND + 42} text="SMALL PILE" color={SNOW} tc={INK} o={on(f, small, 6)} s={pop(f, small)} size={48} />
        <line x1={CX + 15} y1={560} x2={CX + 15} y2={GROUND} stroke={INK2} strokeWidth={3} strokeDasharray="10 10" opacity={0.6} />
      </g>}
      <Vig id="cl-step2" />
      <Headline f={f} lines={[[two, 'STEP 2: RISE 50%', GAIN_L, 100], [of9, '50% OF WHAT?', SNOW, 104], [d500, 'OF WHAT YOU HAVE NOW', SNOW, 92], [d750, 'YOU END AT $750', SNOW, 100], [s12, 'SAME 50%, DIFFERENT PILES', SNOW, 84]]} />
    </g>
  )
}

// ------------------------------------------------------------ STEP 3 — s13–s18
const Step3: React.FC<PieceProps> = ({ f, c }) => {
  const s13 = c('s13'), three = c('s13:three'), take = c('s13:take'), back = c('s13:back'), d1000 = c('s13:1000')
  const d500 = c('s14:500'), another = c('s14:another'), d500b = c('s14:500#2'), d100 = c('s14:100'), double = c('s14:double'), brk = c('s14:break'), even = c('s14:even')
  const s15 = c('s15'), deeper = c('s15:deeper'), fall = c('s15:fall'), bigger = c('s15:bigger'), climb = c('s15:climb')
  const d10 = c('s16:10'), d11 = c('s16:11'), back16 = c('s16:back'), d25 = c('s17:25'), need17 = c('s17:need'), d33 = c('s17:33'), d50 = c('s18:50'), d100b = c('s18:100')
  const A = 1 - on(f, s15 - 2, 8), B = on(f, s15, 8)
  const X = 520, LINE = top(GROUND, 10)
  // # the pits: ledge at y 800; 4 px per percentage point, red down = the fall, green up = the climb back
  const LY = 900, K = 5
  const pits: { x: number; l: number; g: number; la: number; ga: number; lt: string; gt: string }[] = [
    { x: 230, l: 10, g: 11.1, la: d10, ga: d11, lt: '−10%', gt: '+11%' },
    { x: 510, l: 25, g: 33.3, la: d25, ga: d33, lt: '−25%', gt: '+33%' },
    { x: 790, l: 50, g: 100, la: d50, ga: d100b, lt: '−50%', gt: '+100%' },
  ]
  return (
    <g>
      <Alps id="cl-step3" f={f} />
      {A > 0.001 && <g opacity={A}>
        <Badge x={170} y={500} n={3} o={on(f, s13, 8)} s={pop(f, three)} />
        <Level y={LINE} x0={300} x1={760} f={f} flag={f >= d1000 ? '$1,000' : undefined} fx={730} o={on(f, back, 8)} color={f >= even ? GAIN : INK} />
        <Stack x={X} y={GROUND} n={5} glow={on(f, take, 8) * (1 - on(f, take + 24, 10))} />
        <Tag x={X - 290} y={top(GROUND, 2.5)} text="$500" o={on(f, d500, 6) * (1 - on(f, d100, 6))} s={pop(f, d500)} size={58} to={[X - 120, top(GROUND, 2.5)]} />
        {[0, 1, 2, 3, 4].map((k) => { const at = another + 6 + k * 5; const a = on(f, at, 10)
          return f >= at ? <g key={k} transform={`translate(0 ${-(1 - a) * 240})`} opacity={on(f, at, 4)}><Brick x={X} y={top(GROUND, 5 + k)} tone="green" glow={1 - on(f, d100, 14)} /></g> : null })}
        <Tag x={X - 290} y={top(GROUND, 7.5)} text="+$500" color={GAIN} o={on(f, d500b, 6) * (1 - on(f, d100, 6))} size={58} to={[X - 120, top(GROUND, 7.5)]} />
        <g opacity={on(f, d100, 6)}>
          <path d={`M${X + 150} ${top(GROUND, 5)} h24 V${LINE} h-24`} fill="none" stroke={GAIN} strokeWidth={6} />
          <Tag x={X + 300} y={(top(GROUND, 5) + LINE) / 2} text="+100%" color={GAIN} s={pop(f, d100)} size={60} />
        </g>
        <Tag x={X + 300} y={(top(GROUND, 5) + LINE) / 2 + 110} text="×2" color={INK} o={on(f, double, 6)} s={pop(f, double)} size={70} />
        <g opacity={on(f, brk, 6)}><Tag x={X - 300} y={LINE + 70} text="BREAK EVEN" color={GAIN} s={pop(f, even)} size={52} /></g>
      </g>}
      {B > 0.001 && <g opacity={B}>
        {/* # the ledge with three pits */}
        <g opacity={on(f, deeper, 8)}>
          <rect x={90} y={LY - 6} width={830} height={12} rx={6} fill="#6A5B49" />
        </g>
        <Arrow x={140} y={LY - 170} len={110} up={false} p={on(f, fall, 10)} o={on(f, fall, 5) * (1 - on(f, d10, 6))} w={30} />
        <Arrow x={880} y={LY - 30} len={150} up p={on(f, climb, 10)} o={on(f, bigger, 5) * (1 - on(f, d10, 6))} w={30} />
        {pits.map((p, k) => { const lh = p.l * K * on(f, p.la, 14), gh = p.g * K * on(f, p.ga, 18)
          return <g key={k}>
            <g opacity={on(f, p.la, 5)}>
              <rect x={p.x - 96} y={LY + 6} width={90} height={lh} rx={8} fill={LOSS} />
              <Label x={p.x - 51} y={LY + 6 + p.l * K + 56} text={p.lt} size={50} font="Bebas Neue" color={LOSS} />
            </g>
            <g opacity={on(f, p.ga, 5)}>
              <rect x={p.x + 6} y={LY - 6 - gh} width={90} height={gh} rx={8} fill={GAIN} />
              <rect x={p.x + 6} y={LY - 6 - gh} width={90} height={Math.min(gh, 10)} rx={5} fill={GAIN_L} />
              <Label x={p.x + 51} y={LY - 6 - p.g * K - 18} text={p.gt} size={50} font="Bebas Neue" color={GAIN} />
            </g>
          </g> })}
        <g opacity={on(f, back16, 6) * (1 - on(f, d25, 6))}><circle cx={pits[0].x + 51} cy={LY - 6 - 11.1 * K - 34} r={56} fill="none" stroke={GAIN} strokeWidth={4} /></g>
        <g opacity={on(f, need17, 6) * (1 - on(f, d33, 6))}><Arrow x={pits[1].x + 51} y={LY - 30} len={110} up p={on(f, need17, 10)} w={20} color={GAIN_L} /></g>
        <Label x={CX} y={1180} text="FALL      vs      CLIMB BACK" size={44} font="Bebas Neue" color={INK2} o={on(f, d10, 8)} />
      </g>}
      <Vig id="cl-step3" />
      <Headline f={f} lines={[[three, 'STEP 3: BACK TO $1,000?', INK, 92], [d100, '+100% TO BREAK EVEN', GAIN, 96], [deeper, 'DEEPER FALL, BIGGER CLIMB', INK, 84]]} />
    </g>
  )
}

export const CL_STEP1 = makePiece('cl-step1', 'Step 1 at dawn: a STEP 1 stone badge; ten gold $100 bricks bracketed $1,000 crack across the middle; the top half lifts, glows on "half", is tagged −$500 and dissolves into gold dust; the lower five glow — $500 LEFT', {
  canvas: 'tall', mood: 'light', Component: Step1,
  beats: ["s7", "s7:one", "s7:start", "s7:1000", "s7:falls", "s7:50", "s8:half", "s8:1000", "s8:500", "s8:disappears", "s8:left", "s8:500#2"],
  sfx: [['s7:falls', 'thud', 0.2], ['s8:disappears', 'swish', 0.2]] })
export const CL_STEP2 = makePiece('cl-step2', 'Step 2 by moonlight: a STEP 2 badge; a green arrow +50% over the five-brick stack; "of what?" — a dashed $1,000 ghost (crossed out) next to the real stack ($500 NOW, glowing); half of it peels off in green and climbs on top (+$250) → $750; then BIG PILE vs SMALL PILE: five red LOSS bricks lift off the big pile, only 2½ green GAIN bricks drop onto the small one', {
  canvas: 'tall', mood: 'dark', Component: Step2,
  beats: ["s9", "s9:two", "s9:rises", "s9:50", "s9:of", "s9:what", "s10:not", "s10:1000", "s10:started", "s10:500", "s11", "s11:250", "s11:back", "s11:750", "s12", "s12:loss", "s12:taken", "s12:big", "s12:gain", "s12:added", "s12:small"],
  sfx: [['s10:started', 'swish', 0.2], ['s11:250', 'pop', 0.2], ['s12:added', 'pop', 0.15]] })
export const CL_STEP3 = makePiece('cl-step3', 'Step 3 at dawn: a STEP 3 badge; a dashed $1,000 flag line above the $500 stack; five green bricks climb to it one by one (+$500, +100%, ×2), the flag line turns green — BREAK EVEN; then a ledge with three pits: red falls of 10, 25 and 50% and taller green climbs back of 11, 33 and 100%, drawn to scale', {
  canvas: 'tall', mood: 'light', Component: Step3,
  beats: ["s13", "s13:three", "s13:take", "s13:back", "s13:1000", "s14:500", "s14:another", "s14:500#2", "s14:100", "s14:double", "s14:break", "s14:even", "s15", "s15:deeper", "s15:fall", "s15:bigger", "s15:climb", "s16:10", "s16:11", "s16:back", "s17:25", "s17:need", "s17:33", "s18:50", "s18:100"],
  sfx: [['s14:100', 'ding', 0.2], ['s18:100', 'thud', 0.2]] })
