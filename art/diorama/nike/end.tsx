// ---------------------------------------------------------------- s25–s29: the payoff.
// A) a small cash bag $8,000 (year one) beside a tower of boxes ≈ $46.4 BILLION A YEAR; × 5.8 MILLION; a calendar page
//    "1 DAY" and a cash bag ≈ $127 MILLION.
// B) the little turquoise car with its open trunk — where it started; then a big shoe with a glowing tick (their own name).
// C) you hold up your own shoe; the tick on it; the $35 invoice beside you (loops to the hook).
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, hand, type Beat } from '../aimoney/common'
import { OregonWorld, Vig, Headline, ShoeBox, Shoe, Car, CashBag, Calendar, Invoice, Tag, win, CX, FLOOR, INK, ORANGE, MUSTARD, RED, GREEN, TEAL, PAPER } from './kit'

const End: React.FC<PieceProps> = ({ f, c }) => {
  const s25 = c('s25'), d8000 = c('s25:8000'), d464 = c('s25:464'), year = c('s25:year')
  const sales26 = c('s26:sales'), s26 = c('s26'), d58 = c('s26:58'), times = c('s26:times'), d127 = c('s26:127'), day = c('s26:day')
  const s27 = c('s27'), car = c('s27:car'), started = c('s27:started')
  const s28 = c('s28'), money = c('s28:money'), carried = c('s28:carried'), own = c('s28:own')
  const s29 = c('s29'), tick = c('s29:tick'), cost = c('s29:cost'), d35 = c('s29:35')

  const A = win(f, s25, s27), B = win(f, s27, s29), Cc = on(f, s29, 8)
  const youC: Beat[] = [[0, 'idle', 'smiling'], [tick, 'holdUp', 'smiling'], [d35, 'shock', 'shocked']]
  const h = hand(f, youC, 260, FLOOR, 1.0)

  return (
    <g>
      <OregonWorld f={f} id="nk-end" />
      {A > 0.001 && <g opacity={A}>
        <CashBag x={220} y={FLOOR} s={0.9 * pop(f, d8000)} t="$8,000" o={on(f, d8000, 6) * (1 - on(f, d127 - 4, 8))} />
        <Tag x={220} y={960} t="YEAR ONE" size={40} o={on(f, d8000 + 6, 8) * (1 - on(f, d127 - 4, 8))} />
        {Array.from({ length: 14 }, (_, k) => <ShoeBox key={k} x={640 + ((k % 2) - 0.5) * 180} y={FLOOR - Math.floor(k / 2) * 92} s={1.05} tick col={[ORANGE, MUSTARD, '#5C8FB0', TEAL][k % 4]} o={on(f, d464 + k * 1.2, 5)} />)}
        <Tag x={640} y={480} t="≈ $46.4 BILLION A YEAR" size={46} col={MUSTARD} o={on(f, year, 8) * (1 - on(f, s26, 8))} />
        <Tag x={640} y={480} t="× 5.8 MILLION" size={64} col={RED} tc={PAPER} o={on(f, d58, 8) * (1 - on(f, sales26 - 4, 8))} />
        <Calendar x={230} y={1040} s={0.8} t="1 DAY" o={on(f, d127, 8)} />
        <Tag x={640} y={480} t="≈ $127 MILLION A DAY" size={50} col={GREEN} tc={PAPER} o={on(f, sales26, 8)} />
        <Tag x={230} y={760} t="EVERY DAY" size={40} o={on(f, day, 8)} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Car x={lerp(1200, 480, on(f, s27 - 4, 20))} y={FLOOR} s={1.15} trunk={on(f, car, 12)} boxes={4} o={1 - on(f, money - 4, 8)} />
        <Tag x={480} y={820} t="WHERE IT STARTED" size={46} o={on(f, started, 8) * (1 - on(f, money - 4, 8))} />
        <g opacity={on(f, money - 4, 8)}>
          <Shoe x={CX} y={1080} s={1.8 * pop(f, money - 4)} tick={on(f, carried, 18)} />
          <circle cx={CX + 20} cy={1080} r={260} fill={MUSTARD} opacity={0.18 * on(f, own, 10)} />
          <Tag x={CX} y={760} t="THEIR OWN NAME" size={52} col={GREEN} tc={PAPER} o={on(f, own, 8)} />
        </g>
      </g>}
      {Cc > 0.001 && <g opacity={Cc}>
        <Person f={f} who="hero" beats={youC} x={260} y={FLOOR} s={1.0} />
        <Shoe x={h.x + 40} y={h.y - 40} s={0.55} tick={1} o={on(f, tick, 8)} r={-8} />
        <Invoice x={720} y={lerp(-300, 860, on(f, cost - 6, 16))} s={0.9} r={6} amtO={on(f, d35, 8)} />
      </g>}
      <Vig id="nk-end" />
      <Headline f={f} lines={[[s25, '$8,000 → $46.4 BILLION', INK, 96], [d127, '≈ $127 MILLION A DAY', INK, 92], [s27, 'THE CAR TRUNK', INK, 104], [s28, 'THE NAME MADE IT BIG', TEAL, 96], [s29, 'THAT TICK? $35', RED, 108]]} />
    </g>
  )
}

export const NK_END = makePiece('nk-end', 'Payoff on the Oregon track: a small cash bag $8,000 (YEAR ONE) beside a tall tower of tick-marked shoe boxes (≈ $46.4 BILLION A YEAR, × 5.8 MILLION), a calendar page 1 DAY (≈ $127 MILLION A DAY); the turquoise car rolls back in with its trunk open (WHERE IT STARTED); a big white shoe on which the tick draws itself, glowing (THEIR OWN NAME); then you hold up your own shoe with the tick while the $35 invoice drops in beside you.', {
  canvas: 'tall', mood: 'light', Component: End,
  beats: ["s25", "s25:8000", "s25:464", "s25:year", "s26:sales", "s26", "s26:58", "s26:times", "s26:127", "s26:day", "s27", "s27:car", "s27:started", "s28", "s28:money", "s28:carried", "s28:own", "s29", "s29:tick", "s29:cost", "s29:35"],
  sfx: [['s25:464', 'riser', 0.2], ['s26:58', 'pop', 0.2], ['s26:127', 'cash', 0.2], ['s28:own', 'chime', 0.15], ['s29:35', 'thud', 0.25]] })
