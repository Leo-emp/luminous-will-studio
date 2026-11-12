// ---------------------------------------------------------------- s14–s20: step two — taxed very differently.
// A) medallion 2; a paycheck (left) and a certificate pile (right); the TAX scissors arrive and go to the paycheck only.
// B) two lanes split by a gold pillar: ANA (left) and BEN (right), each one million richer (EXAMPLE).
//    Ana's million is a tall column of cash bundles; the scissors snip her paychecks all year; the top part of the column
//    turns red: TOP PART TAXED 37%. Ben's certificate pile rises by $1M and he hugs it; the gain glows green; a SELL sign
//    hangs by it — the rule: taxed only when you sell. He didn't sell: a cross on SELL, his tax meter reads $0.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { DecoWorld, Vig, Headline, Cheque, Scissors, CertPile, CashColumn, Plaque, Cross, Medallion, ArrowUp, Meter, win, CX, FLOOR, INK, EMER, GOLD, GOLD2, GREEN, RED, RED2, IVORY, TXT } from './kit'

const Tax: React.FC<PieceProps> = ({ f, c }) => {
  const s14 = c('s14'), growth = c('s14:growth'), taxed14 = c('s14:taxed'), differently = c('s14:differently'), paycheck14 = c('s14:paycheck')
  const s15 = c('s15'), people = c('s15:people'), million15 = c('s15:million')
  const ana = c('s16:ana'), salary = c('s16:salary')
  const income = c('s17:income'), paychecks = c('s17:paychecks'), year17 = c('s17:year'), top = c('s17:top'), d37 = c('s17:37')
  const ben = c("s18:ben's"), rise = c('s18:rise'), million18 = c('s18:million'), keeps = c('s18:keeps')
  const us = c('s19:us'), gain = c('s19:gain'), sell19 = c('s19:sell')
  const didnt = c("s20:didn't"), tax20 = c('s20:tax'), zero = c('s20:zero')

  const A = win(f, s14, s15), B = on(f, s15, 8)
  const anaB: Beat[] = [[0, 'idle', 'neutral'], [people, 'waveA', 'smiling', 'waveB', 10], [salary, 'present', 'smiling'], [income, 'nervous', 'worried'], [d37, 'facepalm', 'worried']]
  const benB: Beat[] = [[0, 'idle', 'neutral'], [people, 'waveA', 'smiling', 'waveB', 10], [rise, 'pointUp', 'smiling'], [keeps, 'hug', 'smiling'], [didnt, 'confident', 'smug'], [zero, 'celebrate', 'smiling']]
  // # Ana's column and the snips through the year
  const colH = lerp(0, 560, on(f, salary, 22))
  const snipping = f >= income && f < top
  const snipOpen = snipping ? 0.5 + 0.5 * Math.sin((f - income) / 3) : 0.6
  const redT = on(f, top, 10)
  // # Ben's pile rises; the gain part glows
  const pileN = lerp(6, 22, on(f, rise, 24))

  return (
    <g>
      <DecoWorld f={f} id="bz-tax" tone="day" />
      {/* # A) the rule in one picture: the scissors go for the paycheck, not the pile */}
      {A > 0.001 && <g opacity={A}>
        <Medallion x={CX} y={540} n={2} s={1.1 * pop(f, s14)} />
        <CertPile x={760} y={FLOOR} n={lerp(4, 14, on(f, growth, 16))} s={1} o={on(f, growth - 4, 8)} />
        <ArrowUp x={900} y={880} s={0.7} o={on(f, growth, 8)} />
        <Cheque x={260} y={1000} s={0.8} amount="$ PAY" o={on(f, s14 + 8, 8)} />
        <Plaque x={260} y={870} t="PAYCHECK" size={34} o={on(f, paycheck14, 8)} />
        <Scissors x={lerp(520, 300, on(f, differently, 14))} y={lerp(760, 820, on(f, differently, 14))} s={1} r={90} o={on(f, taxed14, 8)} open={0.7} />
      </g>}
      {/* # B) the two lanes */}
      {B > 0.001 && <g opacity={B}>
        <rect x={494} y={420} width={12} height={FLOOR - 420} fill={GOLD} opacity={0.9} />
        <Plaque x={CX} y={480} t="EACH +$1 MILLION · EXAMPLE" size={38} col={IVORY} tc={INK} o={on(f, million15, 8) * (1 - on(f, ana, 8))} />
        {/* # Ana */}
        <Person f={f} who="investorF" beats={anaB} x={150} y={FLOOR} s={0.88} o={on(f, people, 8)} />
        <Plaque x={150} y={560} t="ANA" size={50} o={on(f, ana, 8)} />
        <CashColumn x={360} y={FLOOR} h={colH} o={on(f, salary, 6)} red={redT} redTop={0.36} />
        <Plaque x={360} y={FLOOR - colH - 60} t="SALARY $1M" size={36} o={on(f, salary + 10, 8) * (1 - redT)} />
        <Scissors x={360} y={FLOOR - colH - 90} s={0.8} r={90} open={snipOpen} o={on(f, income, 8) * (1 - on(f, d37 - 6, 8))} />
        {/* # little red slices falling from each paycheck snip */}
        {snipping && Array.from({ length: 4 }, (_, k) => { const t = ((f - paychecks + k * 9) % 36) / 36; return f >= paychecks ? <rect key={k} x={300 + k * 30} y={FLOOR - colH + t * 300} width={26} height={16} rx={3} fill="#F0B8AE" stroke={RED} strokeWidth={2} opacity={1 - t} transform={`rotate(${t * 120} ${313 + k * 30} ${FLOOR - colH + t * 300})`} /> : null })}
        <Plaque x={330} y={FLOOR - colH - 60} t="TOP PART: 37% TAX" size={36} col={RED} tc={IVORY} o={on(f, d37, 8)} />
        {/* # Ben */}
        <Person f={f} who="investor" beats={benB} x={850} y={FLOOR} s={0.88} o={on(f, people, 8)} />
        <Plaque x={850} y={560} t="BEN" size={50} o={on(f, ben, 8) * (1 - on(f, tax20 - 8, 8))} />
        <CertPile x={640} y={FLOOR} n={pileN} s={0.9} o={on(f, ben, 8)} tint={on(f, gain, 10)} glow={on(f, rise, 8) * (1 - on(f, us, 8))} />
        <ArrowUp x={640} y={FLOOR - (24 + pileN * 17 + 160) * 0.9 - 50} s={0.6} o={on(f, rise, 8) * (1 - on(f, million18 - 4, 8))} />
        <Plaque x={640} y={FLOOR - (24 + pileN * 17 + 160) * 0.9 - 50} t={f >= gain ? "+$1M GAIN" : "+$1 MILLION"} size={36} col={GREEN} tc={IVORY} o={on(f, million18, 8)} />
        {/* # the SELL sign on a stand, taxed only when you sell */}
        <g opacity={on(f, us, 8) * (1 - on(f, didnt, 8))} transform="translate(640 470)">
          <rect x={-8} y={0} width={16} height={130} fill={GOLD2} />
          <rect x={-90} y={-60} width={180} height={70} rx={10} fill={IVORY} stroke={GOLD2} strokeWidth={4} />
          <text y={-12} textAnchor="middle" fill={INK} style={TXT(48)}>SELL?</text>
        </g>
        <Scissors x={lerp(380, 520, on(f, sell19, 12))} y={560} s={0.6} r={90} open={0.6} o={on(f, sell19, 8) * (1 - on(f, tax20, 8))} />
        <Cross x={520} y={560} s={0.55} o={on(f, didnt + 6, 6) * (1 - on(f, tax20, 8))} />
        <Meter x={800} y={520} v={lerp(0.6, 0, on(f, zero, 12))} s={0.75} t={f >= zero ? '$0' : undefined} o={on(f, tax20, 8)} />
      </g>}
      <Vig id="bz-tax" />
      <Headline f={f} lines={[[s14, 'STEP 2', EMER, 120], [taxed14, 'TAXED DIFFERENTLY', INK, 96], [s15, 'TWO PEOPLE', INK, 104], [income, 'ANA: TAXED ALL YEAR', RED2, 92], [ben, 'BEN: SHARES RISE', EMER, 96], [us, 'TAXED ONLY WHEN SOLD', INK, 90], [zero, 'BEN’S TAX: $0', EMER, 104]]} />
    </g>
  )
}

export const BZ_TAX = makePiece('bz-tax', 'Step 2 in the gilded hall: medallion 2; red TAX scissors arrive and go for the paycheck, not the growing certificate pile; two lanes split by a gold pillar, EACH +$1 MILLION · EXAMPLE: ANA beside a tall column of cash bundles (SALARY $1M) — the scissors snip it all year, red slices fall, the top part turns red: TOP PART: 37% TAX, Ana facepalms; BEN beside his certificate pile that rises with a green +$1M GAIN, he hugs it; a SELL? sign on a stand — scissors hover toward it — gets a cross because he did not sell; his tax meter swings to $0 and he celebrates.', {
  canvas: 'tall', mood: 'light', Component: Tax,
  beats: ["s14", "s14:growth", "s14:taxed", "s14:differently", "s14:paycheck", "s15", "s15:people", "s15:million", "s16:ana", "s16:salary", "s17:income", "s17:paychecks", "s17:top", "s17:37", "s18:ben's", "s18:rise", "s18:million", "s18:keeps", "s19:us", "s19:gain", "s19:sell", "s20:didn't", "s20:tax", "s20:zero"],
  sfx: [['s14:differently', 'swish', 0.2], ['s16:salary', 'cash', 0.2], ['s17:37', 'thud', 0.25], ['s18:rise', 'softpop', 0.2], ['s20:zero', 'ding', 0.25]] })
