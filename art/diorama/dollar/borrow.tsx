// ---------------------------------------------------------------- s21–s25: step three — borrow, don't sell (night hall).
// A) medallion 3; Ben with empty pockets, a SELL sign gets a cross.
// B) at the LENDER's deco counter: a cash bag slides to Ben; he puts certificates in a lock box — COLLATERAL — the padlock
//    shuts and the box slides to the lender's side (the lender can take them if the loan isn't repaid).
// C) the Meta filing: a big padlocked stack, 12 MILLION SHARES PLEDGED.
// D) the cash bag goes back to the lender (paid back) — INCOME? gets a cross; scissors with a cross: not taxed like pay.
// E) small interest coins roll to the lender; one certificate goes to SOLD and the scissors snip it: TAX ON THE GAIN.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { DecoWorld, Vig, Headline, Cheque, Counter, LockBox, CashBag, Cert, CertPile, Filing, Plaque, Cross, Medallion, Scissors, Coin, arcAt, win, CX, FLOOR, INK, EMER, GOLD, GOLD2, GOLDL, IVORY, RED, TXT } from './kit'

const TOP = FLOOR - 262 // # counter top

const Borrow: React.FC<PieceProps> = ({ f, c }) => {
  const s21 = c('s21'), pay = c('s21:pay'), anything = c('s21:anything'), selling = c('s21:selling')
  const borrow = c('s22:borrow'), put = c('s22:put'), shares22 = c('s22:shares'), collateral = c('s22:collateral'), lender = c('s22:lender'), take = c('s22:take'), repaid = c('s22:repaid')
  const s23 = c("s23:meta's"), pledged = c('s23:pledged'), d12 = c('s23:12'), loans = c('s23:loans')
  const s24 = c('s24'), back = c('s24:back'), income = c('s24:income'), taxed24 = c('s24:taxed'), paycheck = c('s24:paycheck')
  const interest = c('s25:interest'), sold = c('s25:sold'), gain = c('s25:gain'), taxed25 = c('s25:taxed')

  const A = win(f, s21, borrow - 4), B = win(f, borrow - 4, s23), Cc = win(f, s23, s24), D = win(f, s24, interest - 6), E = on(f, interest - 6, 8)
  const benA: Beat[] = [[0, 'idle', 'neutral'], [pay, 'emptyPockets', 'worried'], [selling, 'crossNoA', 'neutral', 'crossNoB', 12]]
  const benB: Beat[] = [[0, 'idle', 'neutral'], [borrow, 'receive', 'smiling'], [put, 'offer', 'neutral'], [lender, 'idle', 'neutral'], [repaid, 'nervous', 'worried']]
  const benD: Beat[] = [[0, 'idle', 'neutral'], [back, 'offer', 'neutral'], [income, 'crossNoA', 'smiling', 'crossNoB', 12], [interest, 'offer', 'neutral'], [taxed25, 'shrug', 'neutral']]
  const bankB: Beat[] = [[0, 'idle', 'smiling'], [borrow, 'offer', 'smiling'], [take, 'pull', 'smug'], [repaid, 'armsCrossed', 'neutral']]
  const bankD: Beat[] = [[0, 'idle', 'smiling'], [back, 'receive', 'smiling'], [interest, 'receive', 'smug']]

  // # B: the bag slides along the counter top to Ben's end; the lock box moves to the lender's end on "take"
  const bagT = on(f, borrow, 16), boxIn = on(f, put, 14), lockT = on(f, collateral, 10), boxAway = on(f, take, 16)
  // # D: the bag goes back
  const backT = on(f, back, 18)

  return (
    <g>
      <DecoWorld f={f} id="bz-borrow" tone="night" />
      {/* # A) how do you pay without selling? */}
      {A > 0.001 && <g opacity={A}>
        <Medallion x={CX} y={560} n={3} s={1.1 * pop(f, s21)} />
        <Person f={f} who="investor" beats={benA} x={300} y={FLOOR} s={1.05} />
        <CertPile x={720} y={FLOOR} n={14} s={0.95} o={on(f, anything - 6, 8)} />
        <g opacity={on(f, selling - 6, 8)} transform="translate(720 800)">
          <rect x={-8} y={0} width={16} height={150} fill={GOLD2} />
          <rect x={-100} y={-70} width={200} height={80} rx={10} fill={IVORY} stroke={GOLD2} strokeWidth={4} />
          <text y={-14} textAnchor="middle" fill={INK} style={TXT(54)}>SELL</text>
        </g>
        <Cross x={720} y={770} s={0.6} o={on(f, selling + 4, 6)} />
      </g>}
      {/* # B) the loan, with shares as collateral */}
      {B > 0.001 && <g opacity={B}>
        <Person f={f} who="worker" beats={bankB} x={860} y={FLOOR - 40} s={0.92} />
        <Counter x={700} y={FLOOR} w={480} />
        <Person f={f} who="investor" beats={benB} x={200} y={FLOOR} s={1.0} />
        <CashBag x={lerp(760, 380, bagT)} y={lerp(TOP, FLOOR, on(f, borrow + 10, 10))} s={0.8} o={on(f, borrow - 2, 6)} t="LOAN" />
        {/* # the lock box: certificates fly in from Ben, it locks, then slides to the lender */}
        <LockBox x={lerp(560, 700, boxAway)} y={TOP} s={0.62} o={on(f, put - 4, 8)} lock={lockT} />
        {f >= put && f < put + 20 && (() => { const [x, y] = arcAt([290, 860], [560, TOP - 120], on(f, put, 18), 140); return <Cert x={x} y={y} s={0.55} r={-8} /> })()}
        <Plaque x={lerp(560, 700, boxAway)} y={TOP - 190} t="COLLATERAL" size={34} col={GOLD} tc={INK} o={on(f, collateral, 8)} />
        <Plaque x={620} y={560} t="NOT REPAID? LENDER KEEPS THEM" size={34} col={RED} tc={IVORY} o={on(f, take + 6, 8)} />
      </g>}
      {/* # C) the filing: 12 million shares pledged */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Filing x={260} y={lerp(560, 760, on(f, s23, 14))} s={1.0} />
        <g transform={`translate(640 ${FLOOR}) scale(${pop(f, pledged)})`} opacity={on(f, pledged, 6)}>
          <CertPile x={0} y={0} n={16} s={1.0} />
          <g transform="translate(0 -170)">
            <path d="M-50 -40 L-50 -95 A50 50 0 0 1 50 -95 L50 -40" fill="none" stroke="#C9CED6" strokeWidth={18} />
            <rect x={-80} y={-50} width={160} height={120} rx={16} fill={GOLD} stroke={GOLD2} strokeWidth={6} /><circle cy={6} r={14} fill={INK} />
          </g>
        </g>
        <Plaque x={640} y={560} t="12 MILLION SHARES PLEDGED" size={40} col={GOLD} tc={INK} o={on(f, d12, 8)} />
        <Plaque x={260} y={1000} t="TO BACK LOANS" size={36} o={on(f, loans, 8)} />
      </g>}
      {/* # D) paid back; not income, not taxed like a paycheck */}
      {D > 0.001 && <g opacity={D}>
        <Person f={f} who="worker" beats={bankD} x={860} y={FLOOR - 40} s={0.92} />
        <Counter x={700} y={FLOOR} w={480} />
        <Person f={f} who="investor" beats={benD} x={200} y={FLOOR} s={1.0} />
        <CashBag x={lerp(380, 700, backT)} y={lerp(FLOOR, TOP, on(f, back, 10))} s={0.8} t="LOAN" />
        <Plaque x={CX} y={560} t="PAID BACK" size={44} col={EMER} o={on(f, back, 8) * (1 - on(f, income - 4, 8))} />
        <g opacity={on(f, income - 4, 8)}><Cheque x={CX} y={520} s={0.8} amount="INCOME?" to="BEN" /></g>
        <Scissors x={CX} y={720} s={0.8} r={90} open={0.6} o={on(f, taxed24, 8)} />
        <Cross x={CX + 20} y={770} s={0.6} o={on(f, paycheck, 6)} />
      </g>}
      {/* # E) interest costs; when shares are sold, the gain is taxed */}
      {E > 0.001 && <g opacity={E}>
        <Person f={f} who="worker" beats={bankD} x={860} y={FLOOR - 40} s={0.92} />
        <Counter x={700} y={FLOOR} w={480} />
        <Person f={f} who="investor" beats={benD} x={200} y={FLOOR} s={1.0} />
        {Array.from({ length: 5 }, (_, k) => { const t = on(f, interest + k * 5, 16); return t > 0 && t < 1 ? (() => { const [x, y] = arcAt([300, 860], [720, TOP - 20], t, 120); return <Coin key={k} x={x} y={y} s={0.6} /> })() : null })}
        <Plaque x={CX} y={560} t="INTEREST" size={44} col={GOLD} tc={INK} o={on(f, interest, 8) * (1 - on(f, sold - 6, 8))} />
        <g opacity={on(f, sold - 4, 8)}>
          <Cert x={CX} y={lerp(820, 700, on(f, sold, 12))} s={1.05} />
          <Plaque x={CX} y={560} t="SOLD" size={48} col={RED} tc={IVORY} />
          <Scissors x={CX + 150} y={720} s={0.9} r={90} open={0.8 - 0.8 * on(f, taxed25, 6)} o={on(f, gain, 8)} />
          <Plaque x={CX} y={900} t="TAX ON THE GAIN" size={40} col={EMER} o={on(f, taxed25, 8)} />
        </g>
      </g>}
      <Vig id="bz-borrow" />
      <Headline f={f} lines={[[s21, 'STEP 3', GOLDL, 120], [selling, 'NO SELLING?', '#F7EEDC', 104], [borrow, 'BORROW', GOLDL, 120], [s23, 'IN META’S FILING', '#F7EEDC', 96], [s24, 'A LOAN ISN’T INCOME', GOLDL, 92], [interest, 'IT STILL COSTS', '#F7EEDC', 100]]} />
    </g>
  )
}

export const BZ_BORROW = makePiece('bz-borrow', 'Step 3 in the gilded hall at night (deco windows, lit city): medallion 3; Ben turns out his empty pockets, a SELL sign gets a cross; at the LENDER deco counter a LOAN cash bag slides to Ben, he tosses certificates into a lock box — COLLATERAL — the padlock shuts and the box slides to the lender (NOT REPAID? LENDER KEEPS THEM); the Meta filing and a padlocked certificate pile: 12 MILLION SHARES PLEDGED, TO BACK LOANS; the loan bag goes back (PAID BACK), INCOME? gets a cross, the tax scissors get a cross; interest coins roll to the lender; one certificate is SOLD and the scissors snip it: TAX ON THE GAIN.', {
  canvas: 'tall', mood: 'dark', Component: Borrow,
  beats: ["s21", "s21:pay", "s21:anything", "s21:selling", "s22:borrow", "s22:put", "s22:collateral", "s22:lender", "s22:take", "s22:repaid", "s23:meta's", "s23:pledged", "s23:12", "s23:loans", "s24", "s24:back", "s24:income", "s24:taxed", "s24:paycheck", "s25:interest", "s25:sold", "s25:gain", "s25:taxed"],
  sfx: [['s22:borrow', 'cash', 0.2], ['s22:collateral', 'click', 0.25], ['s23:pledged', 'thud', 0.25], ['s24:income', 'pop', 0.2], ['s25:interest', 'coin', 0.2], ['s25:taxed', 'swish', 0.2]] })
