// ---------------------------------------------------------------- s7–s15: one dollar, sixty years.
// A) a wooden lodge at the top of the slope: BERKSHIRE HATHAWAY · 1965; the yearly report lands in the snow; the snowball
//    waits at the 1964 flag.
// B) it rolls down past the flags, growing a little: 10 YRS ≈ $3, 20 YRS ≈ $100, 30 YRS (1994) ≈ $1,650; a cake: AGE 64.
// C) "the next 30 years": the whole first-30-years slope folds away to the top-left corner; a giant snowball rolls in
//    along the valley floor: 2024 ≈ $55,000. Then a ring around it fills 97%: AFTER AGE 64.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { SnowWorld, Vig, Headline, Sign, Snowball, Flag, Cake, Report, win, CX, FLOOR, INK, CORAL, GOLD, GREEN, WOOD, WOOD2, SNOW, SNOW2, SNOW3, PAPER, PINE } from './kit'

const A0: [number, number] = [170, 660], A1: [number, number] = [860, 1150]
const at = (t: number): [number, number] => [lerp(A0[0], A1[0], t), lerp(A0[1], A1[1], t)]
const STOPS = [0, 1 / 3, 2 / 3, 1]
const R = [32, 40, 54, 76]

const Roll: React.FC<PieceProps> = ({ f, c }) => {
  const s7 = c('s7'), berkshire = c('s7:berkshire'), in7 = c('s7:in'), s8 = c('s8'), shares8 = c('s8:shares')
  const report = c('s8:report'), track = c('s8:track'), d1964 = c('s8:1964')
  const s9 = c('s9'), d3 = c('s9:3'), s10 = c('s10'), d100 = c('s10:100'), s11 = c('s11'), d1994 = c('s11:1994'), d1650 = c('s11:1650')
  const s12 = c('s12'), d64 = c('s12:64')
  const s13 = c('s13'), watch = c('s13:watch'), next = c('s13:next')
  const s14 = c('s14'), d2024 = c('s14:2024'), same = c('s14:same'), d55 = c('s14:55000')
  const s15 = c('s15'), d97 = c('s15:97'), after = c('s15:after'), d64b = c('s15:64')

  // # where the snowball is on the first slope: rolls to each flag on its sentence
  const legs = [s9, s10, s11]
  let t = 0, r = R[0]
  for (let k = 0; k < 3; k++) { const p = on(f, legs[k], 26); t = lerp(t, STOPS[k + 1], p); r = lerp(r, R[k + 1], p) }
  const [bx, by] = at(t)
  // # C: the first slope folds into the top-left corner
  const fold = on(f, watch, 22)
  const giantX = lerp(-300, 600, on(f, next, 40)), giantR = lerp(80, 250, on(f, next, 40))
  const ring = on(f, d97, 20) * 0.97

  return (
    <g>
      <SnowWorld f={f} id="snb-roll" />
      {/* # A/B) the first 30 years on the slope (folds away on "watch") */}
      <g transform={`translate(${lerp(0, 40, fold)} ${lerp(0, 380, fold)}) scale(${lerp(1, 0.4, fold)}) translate(0 ${lerp(0, -600, fold)})`} opacity={1 - 0.2 * fold}>
        <path d={`M${A0[0] - 140} ${A0[1] + 40} L${A1[0] + 180} ${A1[1] + 40} L${A1[0] + 180} ${FLOOR} L${A0[0] - 140} ${FLOOR} Z`} fill={SNOW2} />
        <path d={`M${A0[0] - 140} ${A0[1] + 40} L${A1[0] + 180} ${A1[1] + 40}`} stroke={SNOW} strokeWidth={14} strokeLinecap="round" />
        {/* # the lodge */}
        <g opacity={on(f, s7, 8)} transform={`translate(${A0[0] + 10} ${A0[1] + 10}) scale(${pop(f, s7)})`}>
          <rect x={-110} y={-150} width={220} height={150} fill={WOOD} stroke={WOOD2} strokeWidth={5} />
          <path d="M-140 -140 L0 -250 L140 -140 Z" fill={SNOW} stroke={SNOW3} strokeWidth={4} />
          <rect x={-30} y={-80} width={60} height={80} fill={WOOD2} /><rect x={-90} y={-120} width={44} height={40} fill={on(f, in7, 8) > 0.5 ? "#FFD25A" : "#C9D6E2"} /><rect x={46} y={-120} width={44} height={40} fill={on(f, in7, 8) > 0.5 ? "#FFD25A" : "#C9D6E2"} />
          <g opacity={on(f, in7, 8)}>{[0, 1, 2].map((k) => <circle key={k} cx={70 + k * 8} cy={-260 - k * 30 - ((f / 3) % 30)} r={14 + k * 5} fill="#FFFFFF" opacity={0.7} />)}</g>
          <rect x={60} y={-250} width={26} height={60} fill={WOOD2} />
        </g>
        <Sign x={A0[0] + 360} y={A0[1] - 150} t="BERKSHIRE HATHAWAY · 1965" size={34} o={on(f, berkshire, 8) * (1 - on(f, report, 8))} />
        {/* # flags + values */}
        {[0, 1, 2, 3].map((k) => { const [fx, fy] = at(STOPS[k]); const lab = ['END OF 1964', '10 YRS', '20 YRS', '30 YRS · 1994'][k], val = ['$1', '≈ $3', '≈ $100', '≈ $1,650'][k]
          const show = k === 0 ? on(f, d1964, 8) : k === 3 ? on(f, d1994, 8) : on(f, legs[k - 1], 8), vo = k === 0 ? on(f, shares8, 8) : on(f, [d3, d100, d1650][k - 1], 8)
          const sx = k === 0 ? fx + 260 : k === 3 ? fx - 60 : fx + 70, sy = k === 0 ? fy - 60 : fy - 220
          const nextAt = k < 3 ? [d3, d100, d1650][k] : 9e9
          return <g key={k}>
            {k > 0 && <Flag x={fx + 60} y={fy + 44} t={k === 3 ? '1994' : `${k * 10} YRS`} o={show} up={show} col={k === 3 ? GREEN : CORAL} />}
            <Sign x={sx} y={sy} t={val} size={k === 3 ? 48 : 40} col={k === 3 ? GOLD : PAPER} o={vo * (1 - fold) * (1 - on(f, nextAt, 8))} />
          </g> })}
        <Snowball id="snb-r1" x={bx} y={by - r} r={r} spin={t * 900} coin o={on(f, track, 8)} />
        <Cake x={A1[0] - 120} y={A1[1] + 60} s={0.55} t="64" o={on(f, d64, 8)} />
      </g>
      <Report x={850} y={lerp(560, 760, on(f, s8, 14))} s={0.9 + 0.1 * on(f, report, 8)} r={lerp(-10, 6, on(f, s8, 14))} o={on(f, s8, 8) * (1 - on(f, s9, 8))} />
      {/* # C) the next 30 years: the giant snowball */}
      {f >= next - 2 && <g>
        <Snowball id="snb-r2" x={giantX} y={FLOOR - giantR} r={giantR} spin={giantX * 0.6} glow={Math.max(on(f, d55, 10) * (1 - on(f, d97, 8)), on(f, after, 10))} />
        {/* # the 97% ring */}
        <circle cx={giantX} cy={FLOOR - giantR} r={giantR + 26} fill="none" stroke={SNOW2} strokeWidth={30} opacity={on(f, d97 - 4, 6)} />
        <circle cx={giantX} cy={FLOOR - giantR} r={giantR + 26} fill="none" stroke={GOLD} strokeWidth={30} strokeDasharray={`${2 * Math.PI * (giantR + 26) * ring} 9999`} transform={`rotate(-90 ${giantX} ${FLOOR - giantR})`} />
        <Sign x={giantX} y={FLOOR - giantR - 10} t={f >= d55 ? '≈ $55,000' : '2024'} size={64} col={GOLD} o={on(f, d2024, 8)} />
        <Sign x={giantX} y={FLOOR - giantR + 80} t="97% AFTER AGE 64" size={40} col={INK} tc={SNOW} o={on(f, d64b, 8)} />
        <Flag x={150} y={FLOOR} t="2024" o={on(f, d2024, 8)} col={GREEN} h={260} />
      </g>}
      <Vig id="snb-roll" />
      <Headline f={f} lines={[[s7, 'BERKSHIRE, 1965', INK, 104], [s9, '10 YEARS: ≈ $3', INK, 100], [s10, '20 YEARS: ≈ $100', INK, 96], [s11, '30 YEARS: ≈ $1,650', INK, 92], [s12, 'BUFFETT WAS 64', CORAL, 104], [s13, 'THE NEXT 30 YEARS', INK, 100], [d55, '2024: ≈ $55,000', GREEN, 104], [s15, '≈ 97% CAME AFTER 64', CORAL, 96]]} />
    </g>
  )
}

export const SB_ROLL = makePiece('snb-roll', 'One dollar, sixty years, on a long snowy slope: a wooden lodge at the top (BERKSHIRE HATHAWAY · 1965), the yearly report lands in the snow, a tiny snowball with a gold coin waits at the 1964 flag; it rolls down past wooden flag posts, growing a little: 10 YRS ≈ $3, 20 YRS ≈ $100, 30 YRS · 1994 ≈ $1,650, a birthday cake marked 64; then the whole slope folds into the top-left corner and a giant glowing snowball rolls in along the valley floor (2024 flag): ≈ $55,000, and a gold ring around it fills 97% — 97% AFTER AGE 64.', {
  canvas: 'tall', mood: 'light', Component: Roll,
  beats: ["s7", "s7:berkshire", "s7:in", "s8", "s8:shares", "s8:report", "s8:track", "s8:1964", "s9", "s9:3", "s10", "s10:100", "s11", "s11:1994", "s11:1650", "s12", "s12:64", "s13", "s13:watch", "s13:next", "s14", "s14:2024", "s14:same", "s14:55000", "s15", "s15:97", "s15:after", "s15:64"],
  sfx: [['s7:berkshire', 'pop', 0.15], ['s9:3', 'softpop', 0.15], ['s10:100', 'softpop', 0.15], ['s11:1650', 'pop', 0.2], ['s13:next', 'whoosh', 0.2], ['s14:55000', 'impact', 0.25], ['s15:97', 'riser', 0.2]] })
