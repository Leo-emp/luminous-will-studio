// ---------------------------------------------------------------- s1–s6: the hook in the snowy valley.
// A) you, with a magnifier over three stock cards on a sled-table: "he picks stocks better than anyone" — one card glows.
// B) a growth curve on a snow board: flat for decades, then shooting up; a birthday cake marks AGE 64 at the knee;
//    a lightbulb ("smarter") gets a cross.
// C) a tiny snowball sits at the top of a long slope; you point at it — your money too; a $1 coin goes in;
//    three wooden flag posts rise down the slope, one per ten years.
// D) the snowball starts to roll.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { SnowWorld, Vig, Headline, Sign, Cross, Snowball, Flag, Cake, Curve, Magnifier, StockCard, win, CX, FLOOR, INK, CORAL, GOLD, GOLD2, GREEN, WOOD, WOOD2, SNOW, SNOW2, PAPER } from './kit'

// # the slope (C/D): from the top-left down to the bottom-right
const A0: [number, number] = [150, 640], A1: [number, number] = [880, 1150]
const at = (t: number): [number, number] => [lerp(A0[0], A1[0], t), lerp(A0[1], A1[1], t)]

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), warren = c('s1:warren'), picks = c('s1:picks'), better = c('s1:better')
  const s2 = c('s2'), strange = c('s2:strange')
  const s3 = c('s3'), growth3 = c('s3:growth'), after3 = c('s3:after'), d64 = c('s3:64')
  const s4 = c('s4'), smarter = c('s4:smarter'), d64b = c('s4:64')
  const s5 = c('s5'), growth5 = c('s5:growth'), same = c('s5:same'), money = c('s5:money')
  const s5a = c('s5a'), dollar5 = c('s5a:dollar'), checking = c('s5a:checking'), ten = c('s5a:ten')
  const s6 = c('s6'), follow = c('s6:follow'), dollar6 = c('s6:dollar')

  const A = win(f, s1, s3), B = win(f, s3, s5), Cc = on(f, s5, 8)
  const youA: Beat[] = [[0, 'think', 'thinking'], [picks, 'point', 'smiling'], [better, 'thumbsUp', 'smiling'], [strange, 'scratchHead', 'thinking']]
  const youC: Beat[] = [[0, 'idle', 'neutral'], [same, 'point', 'smiling'], [money, 'holdChest', 'shocked'], [checking, 'think', 'thinking'], [follow, 'point', 'smiling']]
  const roll = on(f, follow, 60) * 0.12
  const [bx, by] = at(roll)

  return (
    <g>
      <SnowWorld f={f} id="snb-hook" />
      {/* # A) the stock picker */}
      {A > 0.001 && <g opacity={A}>
        <Person f={f} who="hero" beats={youA} x={220} y={FLOOR} s={1.05} />
        {/* # a wooden sled-table with three stock cards */}
        <g transform="translate(680 1270)">
          <rect x={-230} y={-170} width={460} height={26} rx={10} fill={WOOD} /><rect x={-200} y={-144} width={18} height={144} fill={WOOD2} /><rect x={182} y={-144} width={18} height={144} fill={WOOD2} />
          <path d="M-240 0 Q-260 -20 -230 -20 L230 -20" fill="none" stroke={WOOD2} strokeWidth={8} />
        </g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, s1 + 4 + k * 4, 8)}><StockCard x={540 + k * 140} y={1030 - (k === 1 ? 20 : 0)} s={0.62} r={-6 + k * 6} t={['ACME', 'ZEN', 'ORBIT'][k]} up={k !== 2} /></g>)}
        {f >= better && <rect x={598} y={950} width={124} height={88} rx={10} fill={GREEN} opacity={0.25 * on(f, better, 8)} />}
        <Magnifier x={lerp(560, 690, on(f, picks, 16))} y={860} s={0.8} o={on(f, warren, 8)} />
      </g>}
      {/* # B) the curve: flat for decades, then up after 64 */}
      {B > 0.001 && <g opacity={B}>
        <rect x={110} y={460} width={830} height={740} rx={24} fill={PAPER} stroke={SNOW2} strokeWidth={6} />
        <Curve x0={170} y0={1130} w={720} h={600} p={on(f, growth3, 60)} />
        <Curve x0={170} y0={1130} w={720} h={600} p={0} kO={on(f, after3, 8)} k={0.5} o={1} col="none" />
        <Cake x={530} y={FLOOR} s={0.55} t="64" o={on(f, d64, 8)} />
        <Sign x={300} y={1180} t="1965" size={34} o={on(f, growth3, 8)} />
        <Sign x={800} y={1180} t="2024" size={34} o={on(f, growth3 + 30, 8)} />
        {/* # the lightbulb ("smarter") gets a cross */}
        <g opacity={on(f, smarter, 8)} transform={`translate(330 700) scale(${pop(f, smarter)})`}>
          <circle r={70} fill="#FFF3B8" stroke={GOLD2} strokeWidth={6} /><rect x={-32} y={62} width={64} height={46} rx={8} fill="#B9C3CC" />
          <path d="M-20 10 L0 -20 L20 10" fill="none" stroke={GOLD2} strokeWidth={6} />
        </g>
        <Cross x={330} y={720} s={0.8} o={on(f, d64b, 6)} />
      </g>}
      {/* # C/D) the snowball at the top of the slope, the ten-year flags, your money */}
      {Cc > 0.001 && <g opacity={Cc}>
        <path d={`M${A0[0] - 120} ${A0[1] + 40} L${A1[0] + 160} ${A1[1] + 40} L${A1[0] + 160} ${FLOOR} L${A0[0] - 120} ${FLOOR} Z`} fill={SNOW2} />
        <path d={`M${A0[0] - 120} ${A0[1] + 40} L${A1[0] + 160} ${A1[1] + 40}`} stroke={SNOW} strokeWidth={14} strokeLinecap="round" />
        {[1, 2, 3].map((k) => { const [fx, fy] = at(k / 3.2); return <Flag key={k} x={fx + 40} y={fy + 34} t={`${k * 10} YRS`} up={on(f, ten + k * 4, 14)} o={on(f, checking + k * 3, 8)} /> })}
        <Snowball id="snb-h" x={bx} y={by - 44 * pop(f, growth5)} r={44 * pop(f, growth5)} spin={roll * 2000} coin={f >= dollar5} />
        <Sign x={A0[0] + 200} y={A0[1] - 70} t="ONE DOLLAR" size={36} o={on(f, dollar5, 8) * (1 - on(f, dollar6 + 10, 8))} />
        <Person f={f} who="hero" beats={youC} x={250} y={FLOOR} s={0.95} o={on(f, same - 4, 8)} />
      </g>}
      <Vig id="snb-hook" />
      <Headline f={f} lines={[[s1, 'THE BEST STOCK PICKER?', INK, 92], [s2, 'HERE’S THE STRANGE PART', INK, 88], [s3, 'IT CAME AFTER 64', CORAL, 108], [s4, 'NOT EXTRA SMARTS', INK, 100], [s5, 'IT’S HOW GROWTH WORKS', INK, 92], [s6, 'FOLLOW ONE DOLLAR', GREEN, 100]]} />
    </g>
  )
}

export const SB_HOOK = makePiece('snb-hook', 'Hook in a bright snowy valley (pale icy sky, blue mountains, pines, drifting flakes): you hold a magnifier over three stock cards on a wooden sled-table and one glows green; then a snow-white board with a growth curve that stays flat for decades and shoots up, a dashed line and a birthday cake marked 64 at the knee, 1965 and 2024 signs; a lightbulb (smarter) gets a red cross; then a long snowy slope with a tiny snowball at the top — a gold $ coin goes inside (ONE DOLLAR), three wooden flag posts rise down the slope (10, 20, 30 YRS) and the snowball starts to roll while you point at it.', {
  canvas: 'tall', mood: 'light', Component: Hook,
  beats: ["s1", "s1:warren", "s1:picks", "s1:better", "s2", "s2:strange", "s3", "s3:growth", "s3:after", "s3:64", "s4", "s4:smarter", "s4:64", "s5", "s5:growth", "s5:same", "s5:money", "s5a", "s5a:dollar", "s5a:checking", "s5a:ten", "s6", "s6:follow", "s6:dollar"],
  sfx: [['s1:better', 'ding', 0.15], ['s3:64', 'pop', 0.2], ['s4:64', 'thud', 0.2], ['s5a:dollar', 'coin', 0.2], ['s6:follow', 'swish', 0.2]] })
