// ---------------------------------------------------------------- s6–s14: step one, what the money buys.
// TW_BUY (s6–s9): Max's flat (coral wall). His bundle turns into a credit card; a TV, a sofa and a suitcase pop in,
//   then age: the TV screen cracks and fades, the sofa sags and gets a patch, the suitcase gathers dust. A dashed
//   "pay back" arrow from the things to Max fizzles and is crossed out.
// TW_DEGREE (s10–s14): Zoe's flat (mint wall, study desk). Her bundle + a federal loan paper; a graduation cap lands
//   on her. Then two weekly-pay piles drawn TO SCALE (966 vs 1,578 a week, 0.42 px per $): the 612 gap glows gold,
//   tags ×52 = $31,800 a year; a green arrow from the gap curls back to Zoe ("can pay her back").
import React from 'react'
import { lerp, on, pop, span, easeOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Bundle, Cap, Card, City, Cross, Curve, Desk, Flat, GROUND, HangTag, Headline, INK, INK2, MAX, PAPER, PayPile, Sofa, Suitcase, TV, Vig, win, ZOE, GOLD, CASH } from './kit'

const Buy: React.FC<PieceProps> = ({ f, c }) => {
  const s6 = c('s6'), one = c('s6:one'), buys = c('s6:buys')
  const puts = c('s7:puts'), d16 = c('s7:16000'), cards = c('s7:cards'), tv = c('s7:tv'), sofa = c('s7:sofa'), trip = c('s7:trip')
  const fun = c('s8:fun'), old = c('s8:old'), wears = c('s8:wears'), over = c('s8:over'), week = c('s8:week')
  const s9 = c('s9'), ever = c('s9:ever'), pay = c('s9:pay'), cent = c('s9:cent'), back = c('s9:back')
  const maxB: Beat[] = [[0, 'hold', 'smiling'], [cards, 'offer', 'smiling'], [trip, 'celebrate', 'smiling'], [fun, 'thumbsUp', 'smiling'], [old, 'scratchHead', 'worried'], [over, 'oops', 'worried'], [s9, 'emptyPockets', 'worried'], [cent, 'slump', 'worried']]
  const toCard = on(f, cards, 10)
  return (
    <g>
      <City id="tw-buy" f={f} />
      <Flat x={100} y={GROUND} w={800} h={700} wall="#F4C7B4" lit={1 - 0.5 * on(f, s9, 20)} />
      {/* # the step tag */}
      <g opacity={on(f, one, 6) * (1 - on(f, puts, 8))}><HangTag x={250} y={600} text="1" size={110} string={[250, 520]} s={pop(f, one)} /></g>
      {/* # his bundle becomes a credit card */}
      <g opacity={(1 - toCard) * on(f, buys, 6)}><Bundle x={400} y={GROUND - 240} s={0.6 * pop(f, buys)} /></g>
      <g opacity={toCard * (1 - on(f, fun, 8))}><Card x={400} y={GROUND - 250} s={0.9 * pop(f, cards)} r={-10} /></g>
      {/* # what the card buys, then how it ages */}
      <g opacity={on(f, tv, 6)}><TV x={470} y={GROUND - 340} s={0.85 * pop(f, tv)} age={on(f, old, 24)} f={f} /></g>
      <g opacity={on(f, sofa, 6)}><Sofa x={590} y={GROUND - 26} s={0.8 * pop(f, sofa)} age={on(f, wears, 24)} /></g>
      <g opacity={on(f, trip, 6)}><Suitcase x={830} y={GROUND - 26} s={0.8 * pop(f, trip)} age={on(f, week, 24)} /></g>
      {/* # nothing comes back: a dashed arrow from the things to Max that fizzles out */}
      <g opacity={on(f, pay, 6) * (1 - 0.5 * on(f, back, 10))}><Curve a={[700, GROUND - 330]} b={[260, GROUND - 470]} lift={170} p={on(f, pay, 22)} color={INK2} dash /></g>
      <Cross x={470} y={GROUND - 560} r={60} f={f} at={cent} />
      <Person f={f} who="max" beats={maxB} x={210} y={GROUND + 20} s={0.78} />
      <Vig id="tw-buy" />
      <Headline f={f} lines={[[s6, 'STEP 1: WHAT IT BUYS', INK, 96], [cards, 'ON CREDIT CARDS', MAX, 100], [old, 'IT ALL GETS OLD', INK, 100], [ever, 'PAYS HIM BACK: $0', MAX, 96]]} />
    </g>
  )
}

const K = 0.42                                            // # px of pile height per $1 of weekly pay
const Degree: React.FC<PieceProps> = ({ f, c }) => {
  const s10 = c('s10'), borrows = c('s10:borrows'), federal = c('s10:federal'), loan = c('s10:loan'), finish = c('s10:finish'), bach = c("s10:bachelor's"), degree = c('s10:degree')
  const s11 = c('s11'), workers = c('s11:workers'), median = c('s11:median'), d1578 = c('s11:1578'), week = c('s11:week')
  const s12 = c('s12'), d966 = c('s12:966')
  const gap = c('s13:gap'), d612 = c('s13:612'), d318 = c('s13:31800'), year = c('s13:year')
  const s14 = c('s14'), promise = c('s14:promise'), person = c('s14:person'), pay = c('s14:pay'), back = c('s14:back')
  const R = 1 - on(f, s11, 12)                             // # the room (s10) fades to a plain wall for the pay piles
  const zoeX = lerp(780, 860, on(f, s11, 14)), zs = lerp(0.78, 0.6, on(f, s11, 14))
  const zoeB: Beat[] = [[0, 'hold', 'smiling'], [federal, 'read', 'thinking'], [degree, 'celebrate', 'smiling'], [s11, 'point', 'neutral'], [gap, 'present', 'smiling'], [promise, 'shrug', 'thinking'], [pay, 'thumbsUp', 'smiling']]
  const B = 1158                                           // # the piles' base
  const hBA = 1578 * K, hHS = 966 * K
  return (
    <g>
      <City id="tw-deg" f={f} />
      <Flat x={100} y={GROUND} w={800} h={700} wall="#CDEDE4" lit={1} />
      <g opacity={R}>
        <Desk x={330} y={GROUND - 26} s={0.95} />
        {/* # her bundle and the federal loan paper */}
        <g opacity={on(f, borrows, 6) * (1 - on(f, loan + 10, 8))}><Bundle x={620} y={GROUND - 330} s={0.6 * pop(f, borrows)} /></g>
        <g opacity={on(f, federal, 6)} transform={`translate(600 ${GROUND - 470}) rotate(5) scale(${0.7 * pop(f, federal)})`}>
          <rect x={-150} y={-190} width={300} height={380} rx={10} fill={PAPER} stroke={INK} strokeWidth={5} />
          <circle cx={0} cy={-110} r={46} fill={ZOE} /><path d="M-24 -110 l16 16 l32 -34" fill="none" stroke="#FFFFFF" strokeWidth={9} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-110} y={-30 + k * 46} width={k % 2 ? 160 : 220} height={14} rx={7} fill={INK2} opacity={0.4} />)}
          <text x={0} y={170} textAnchor="middle" fill={ZOE} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>STUDENT LOAN</text>
        </g>
      </g>
      {/* # the cap lands on her head on "degree" */}
      <g opacity={on(f, bach, 4) * (1 - on(f, s11, 8))}><Cap x={zoeX - 6} y={lerp(GROUND - 760, GROUND - 545, easeOut(span(f, bach, degree + 6)))} s={0.5} r={-6} f={f} /></g>
      {/* # s11–s13: two weekly-pay piles to scale */}
      <g opacity={on(f, s11, 10) * (1 - on(f, s14 + 40, 12) * 0.35)}>
        <g opacity={on(f, s12, 8)}><PayPile x={300} y={B} h={hHS} grow={span(f, s12, d966 + 4)} color="#8FBF8A" />
          <HangTag x={300} y={B - hHS - 60} text="$966" size={56} o={on(f, d966, 6)} s={pop(f, d966)} /></g>
        <PayPile x={600} y={B} h={hBA} grow={span(f, workers, d1578 + 4)} color={CASH} gap={[hHS, hBA]} gapO={on(f, gap, 8)} />
        <HangTag x={600} y={B - hBA - 62} text="$1,578" size={56} o={on(f, d1578, 6)} s={pop(f, d1578)} />
        <g opacity={on(f, median, 6)}><text x={450} y={B + 70} textAnchor="middle" fill={INK} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>PAY PER WEEK</text></g>
        <g opacity={on(f, d966, 6)}><text x={300} y={B - 14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>HIGH SCHOOL</text></g>
        <g opacity={on(f, d1578, 6)}><text x={600} y={B - 14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>BACHELOR'S</text></g>
        {/* # the 612 gap, then ×52 */}
        <HangTag x={820} y={B - (hHS + hBA) / 2 - 20} text="+$612" size={54} color={GOLD} o={on(f, d612, 6)} s={pop(f, d612)} r={4} string={[716, B - (hHS + hBA) / 2]} />
        <HangTag x={300} y={560} text="$31,800 A YEAR" size={46} color={GOLD} o={on(f, d318, 6) * (1 - on(f, s14, 8))} s={pop(f, d318)} r={-4} />
        {/* # the gap's year: 52 small gold slabs stack up beside it */}
        {Array.from({ length: 13 }, (_, i) => <rect key={i} x={140 + i * 25} y={630} width={18} height={40} rx={3} fill={GOLD} opacity={on(f, year + i, 4) * (1 - on(f, s14, 8))} />)}
      </g>
      {/* # s14: from the gap, a green arrow curls back to Zoe (can — not a promise) */}
      <g opacity={on(f, s14, 8)}>
        <Curve a={[640, B - (hHS + hBA) / 2]} b={[zoeX - 10, GROUND - 400]} lift={120} p={on(f, person, 18)} color={ZOE} dash={f < pay} />
      </g>
      <Person f={f} who="zoe" beats={zoeB} x={zoeX} y={GROUND + 20} s={zs} flip />
      <Vig id="tw-deg" />
      <Headline f={f} lines={[[federal, 'FEDERAL STUDENT LOAN', ZOE, 92], [s11, 'PAY PER WEEK, 2025', INK, 92], [gap, '+$612 A WEEK', '#B07A10', 100], [promise, 'NOT A PROMISE', INK, 100], [pay, 'IT CAN PAY HER BACK', ZOE, 92]]} />
    </g>
  )
}

export const TW_BUY = makePiece('tw-buy', 'Step one in Max’s cut-away brick flat (coral wall, window to the dusk city): a paper tag 1 swings in; his $16,000 bundle becomes a credit card; a TV, a sofa and a suitcase pop in, then age — the TV screen cracks and fades, the sofa sags with a patch, the suitcase gathers dust; a dashed pay-back arrow from the things to Max fizzles and is crossed out while Max slumps', {
  canvas: 'tall', mood: 'light', Component: Buy,
  beats: ["s6:one", "s6:buys", "s7:puts", "s7:cards", "s7:tv", "s7:sofa", "s7:trip", "s8:fun", "s8:old", "s8:wears", "s8:over", "s8:week", "s9", "s9:pay", "s9:cent", "s9:back"],
  sfx: [['s7:cards', 'click', 0.2], ['s7:tv', 'pop', 0.15], ['s7:sofa', 'pop', 0.15], ['s7:trip', 'pop', 0.15], ['s8:old', 'crack', 0.2], ['s9:cent', 'swish', 0.2]] })

export const TW_DEGREE = makePiece('tw-degree', 'Zoe’s cut-away flat (mint wall, study desk with books and a lamp): her $16,000 bundle and a federal STUDENT LOAN paper with a tick seal; a graduation cap lands on her; the room clears for two weekly-pay piles of bills drawn to scale — HIGH SCHOOL $966 and BACHELOR’S $1,578 (BLS 2025 medians) — the +$612 gap glows gold, gold slabs stack up for $31,800 A YEAR; a green arrow curls from the gap back to Zoe, dashed at “not a promise”, solid at “can pay her back”', {
  canvas: 'tall', mood: 'light', Component: Degree,
  beats: ["s10", "s10:borrows", "s10:federal", "s10:loan", "s10:bachelor's", "s10:degree", "s11", "s11:workers", "s11:median", "s11:1578", "s12", "s12:966", "s13:gap", "s13:612", "s13:31800", "s13:year", "s14", "s14:promise", "s14:person", "s14:pay", "s14:back"],
  sfx: [['s10:degree', 'chime', 0.2], ['s11:1578', 'cash', 0.15], ['s13:612', 'ding', 0.2], ['s14:pay', 'coin', 0.15]] })
