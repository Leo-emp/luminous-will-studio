// ---------------------------------------------------------------- s9–s12: STEP TWO — the "free" part is a bill credit.
// A) a big phone bill slides in: PHONE PAYMENT $25; on "takes" a teal −$25 CREDIT line slides onto it and a coin
//    flies back; the two cancel — the total rolls to $0 and the bill gets a FEELS FREE? stamp. B) the 36-box wall
//    returns and the boxes flip teal one by one — the discount paid in equal monthly pieces, over 36 months.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { StoreWorld, Vig, Headline, Pill, BillDoc, Coin, Grid36, Glint, flyTo, win, CX, INK, TEAL, TEAL2, SUN, PLUM, CORAL2 } from './kit'

const Credit: React.FC<PieceProps> = ({ f, c }) => {
  const two = c('s9:two'), free = c('s9:free'), credit = c('s9:credit'), bill = c('s9:bill')
  const every = c('s10:every'), carrier = c('s10:carrier'), takes = c('s10:takes'), d25 = c('s10:25'), same = c('s10:same'), payment10 = c('s10:payment')
  const payment = c('s11:payment'), credit11 = c('s11:credit'), cancel = c('s11:cancel'), feels = c('s11:feels'), free11 = c('s11:free')
  const att = c('s12:att'), deals = c('s12:deals'), equal = c('s12:equal'), monthly = c('s12:monthly'), pieces = c('s12:pieces'), d36 = c('s12:36'), months = c('s12:months')

  const A = win(f, c('s9') - 2, att - 2), B = on(f, att - 2, 8)
  const total = f >= cancel + 10 ? '$0' : f >= payment ? '$25' : '$25'
  const coin = flyTo(f, takes, [780, 520], [CX, 820], 18, 120)
  const flip = (i: number) => f >= equal + i * 2.2
  return (
    <g>
      <StoreWorld f={f} id="ph-credit" shelves={false} />
      {A > 0.001 && <g opacity={A}>
        <BillDoc x={CX} y={820} s={1.25 * pop(f, bill - 4)} o={on(f, bill - 4, 6)} amount={total} amountCol={f >= cancel + 10 ? TEAL2 : INK}
          credit="−$25 CREDIT" creditO={on(f, takes, 8)} stamp="FEELS FREE?" stampO={on(f, feels, 8)} />
        <g opacity={on(f, payment10, 6) * (1 - on(f, cancel, 8))}><Pill x={CX} y={500} t="PHONE PAYMENT $25" size={44} col={PLUM} /></g>
        {f >= takes && coin[2] < 1 && <Coin x={coin[0]} y={coin[1]} s={0.9} col={TEAL} t="$" />}
        <g opacity={on(f, carrier, 6) * (1 - on(f, takes + 18, 6))}><Coin x={780} y={520} s={0.9 * pop(f, carrier)} col={TEAL} /></g>
        <Glint f={f} at={every} x={CX + 230} y={560} />
        <Glint f={f} at={same} x={CX - 200} y={820} />
        <Glint f={f} at={credit11} x={CX + 190} y={1000} />
        <Glint f={f} at={free11} x={CX + 210} y={1180} />
        <Glint f={f} at={d25} x={CX - 160} y={760} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        <Grid36 x={120} y={460} cell={112} gap={14} state={(i) => (flip(i) ? 'credit' : 'paid')} o={1} pop={(i) => (flip(i) ? pop(f, equal + i * 2.2, 8) : 1)} label={(i) => (flip(i) ? '−$25' : '$25')} />
        <g opacity={on(f, d36, 6)}><Pill x={CX} y={460 + 6 * 126 + 50} t="36 MONTHLY CREDITS" size={46} col={TEAL2} s={pop(f, d36)} /></g>
        <Glint f={f} at={deals} x={880} y={470} />
        <Glint f={f} at={c('s12:way')} x={300} y={600} />
        <Glint f={f} at={c('s12:discount')} x={700} y={700} />
        <Glint f={f} at={c('s12:paid')} x={420} y={1000} />
        <Glint f={f} at={monthly} x={160} y={900} />
        <Glint f={f} at={pieces} x={600} y={1000} />
        <Glint f={f} at={months} x={880} y={1150} />
      </g>}
      <Vig id="ph-credit" />
      <Headline f={f} lines={[[two, 'STEP 2', TEAL2, 120], [credit, 'THE "FREE" PART = A CREDIT', INK, 84], [cancel, 'THEY CANCEL OUT', TEAL2, 104], [att, 'AT&T: EQUAL MONTHLY PIECES', INK, 82], [d36, 'OFTEN OVER 36 MONTHS', INK, 92]]} />
    </g>
  )
}

export const PH_CREDIT = makePiece('ph-credit', 'Step two: a big white phone bill with a plum header slides in showing $25 (PHONE PAYMENT $25); a teal coin flies onto it and a teal −$25 CREDIT line appears, the total rolls to a teal $0 and a coral FEELS FREE? stamp lands; then the 36-box wall returns all gold with $25 and the boxes flip teal one by one to −$25 (36 MONTHLY CREDITS).', {
  canvas: 'tall', mood: 'light', Component: Credit,
  beats: ["s9:two", "s9:free", "s9:credit", "s9:bill", "s10:every", "s10:carrier", "s10:takes", "s10:25", "s10:same", "s10:payment", "s11:payment", "s11:credit", "s11:cancel", "s11:feels", "s11:free", "s12:att", "s12:deals", "s12:equal", "s12:monthly", "s12:pieces", "s12:36", "s12:months", "s9", "s12:way", "s12:discount", "s12:paid"],
  sfx: [['s10:takes', 'coin', 0.25], ['s11:cancel', 'ding', 0.25], ['s11:feels', 'thud', 0.25], ['s12:equal', 'tick', 0.15]] })
