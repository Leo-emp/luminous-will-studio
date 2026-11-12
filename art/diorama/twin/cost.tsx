// ---------------------------------------------------------------- s15–s21: step two, what the debt costs. The street at night.
// s15: a bundle on the pavement gets a paper price tag swung onto it ("every debt also has a price").
// Then two glass tanks drawn TO SCALE (0.0248 px per $ of interest, base y 1180): ZOE's (teal) and MAX's (coral).
// A dashed line on each marks $16,000 borrowed. Each tank gets its rate tag (6.52% / about 22%) and its monthly
// payment tag; the tap pours for 10 years: Zoe's fills to $5,800, Max's rises past the borrowed line to $24,200.
import React from 'react'
import { lerp, on, pop, span, easeOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { Bundle, City, CX, GROUND, HangTag, Headline, MAX, MAX_L, PAPER, Tank, Vig, win, ZOE, ZOE_L, GOLD } from './kit'

const PX = 0.0248, BASE = 1180, TH = 640
const Cost: React.FC<PieceProps> = ({ f, c }) => {
  const s15 = c('s15'), debt15 = c('s15:debt'), half = c('s15:half'), story = c('s15:story'), price = c('s15:price')
  const s16 = c('s16'), two = c('s16:two'), costs = c('s16:costs')
  const s17 = c('s17'), student = c('s17:student'), federal = c('s17:federal'), fixed = c('s17:fixed'), r652 = c('s17:652')
  const paid = c('s18:paid'), ten = c('s18:10'), d182 = c('s18:182'), month = c('s18:month'), d58 = c('s18:5800'), total = c('s18:total')
  const s19 = c('s19'), cards = c('s19:cards'), r22 = c('s19:22')
  const s20 = c('s20'), max20 = c('s20:max'), pays20 = c('s20:pays'), same = c('s20:same'), d335 = c('s20:335'), month2 = c('s20:month')
  const s21 = c('s21'), d242 = c('s21:24200'), more = c('s21:more'), borrowed = c('s21:borrowed')
  const A = win(f, s15, s16 + 6, 8), T = on(f, s16, 10)
  // # liquid: Zoe's pours from "paid" to "total", Max's from "same" to the end of "24,200"
  const zFill = 5821 * PX / TH * easeOut(span(f, paid, total + 10))
  const mFill = 24157 * PX / TH * easeOut(span(f, same, d242 + 26))
  const markY = 16000 * PX
  const zB: Beat[] = [[0, 'idle', 'neutral'], [r652, 'point', 'smiling'], [d58, 'thumbsUp', 'smiling']]
  const mB: Beat[] = [[0, 'idle', 'neutral'], [r22, 'shock', 'shocked'], [pays20, 'point', 'worried'], [d335, 'nervous', 'worried'], [more, 'despair', 'worried']]
  return (
    <g>
      <City id="tw-cost" f={f} tone="night" />
      {/* # s15: what it buys is half the story — the bundle gets a price tag */}
      {A > 0.001 && <g opacity={A}>
        <Bundle x={CX} y={920} s={1.5 * pop(f, s15)} />
        <g opacity={on(f, half, 6)}><rect x={CX - 4} y={780} width={8} height={170} fill="#FFFFFF" opacity={0.5} /></g>
        <g opacity={on(f, debt15, 4) * (1 - on(f, price, 6))}><line x1={CX + 120} y1={540} x2={CX + 120} y2={lerp(540, 820, on(f, debt15, 14))} stroke="#FFFFFF" strokeWidth={4} strokeDasharray="10 8" /></g>
        <g opacity={on(f, story, 8) * 0.55}><rect x={CX - 196} y={800} width={196} height={190} rx={8} fill="#2B2340" /></g>
        <g transform={`rotate(${Math.sin((f - price) / 7) * 10 * (1 - on(f, price, 40))} ${CX + 120} 780)`}><HangTag x={CX + 230} y={700} text="PRICE?" size={70} o={on(f, price, 4)} s={pop(f, price)} color={GOLD} string={[CX + 120, 820]} /></g>
      </g>}
      {/* # the two tanks */}
      {T > 0.001 && <g opacity={T}>
        <g opacity={on(f, two, 6) * (1 - on(f, s17, 8))}><HangTag x={CX} y={760} text="2" size={120} string={[CX, 560]} s={pop(f, two)} /></g>
        <g opacity={on(f, costs, 8)}>
          <Tank id="tw-tz" x={300} o={1} glow={win(f, student, r652, 6)} y={BASE} h={TH} fill={zFill} color={ZOE} f={f} mark={markY} markO={on(f, s17, 8)} tap={win(f, paid, total + 12, 6)} />
          <Tank id="tw-tm" x={720} o={1} glow={win(f, max20, d335, 6)} y={BASE} h={TH} fill={mFill} color={MAX} f={f} mark={markY} markO={on(f, s17, 8)} tap={win(f, same, d242 + 28, 6) * 1.8} />
          {/* # the borrowed line, named once */}
          <g opacity={on(f, fixed, 8)}><text x={CX + 10} y={BASE - markY - 14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>$16,000 BORROWED</text></g>
        </g>
        {/* # rates on the tanks */}
        <HangTag x={300} y={BASE - 70} text="6.52%" size={60} color={ZOE_L} o={on(f, r652, 6)} s={pop(f, r652)} r={-4} />
        <HangTag x={720} y={BASE - 70} text="~22%" size={60} color={MAX_L} o={on(f, r22, 6)} s={pop(f, r22)} r={4} />
        {/* # monthly payments for 10 years */}
        <HangTag x={300} y={BASE - TH + 60} text="$182/MO" size={50} o={on(f, d182, 6) * (1 - on(f, d58, 8))} s={pop(f, d182)} />
        <HangTag x={720} y={BASE - TH + 60} text="$335/MO" size={50} o={on(f, d335, 6) * (1 - on(f, d242, 8))} s={pop(f, d335)} />
        {/* # the interest totals, riding the liquid */}
        <HangTag x={300} y={BASE - zFill * TH - 60} text="$5,800" size={60} color={PAPER} o={on(f, d58, 6)} s={pop(f, d58)} />
        <HangTag x={720} y={BASE - mFill * TH - 60} text="$24,200" size={60} color={PAPER} o={on(f, d242, 6)} s={pop(f, d242)} />
        {/* # over the line: the part above $16,000 glows */}
        <g opacity={on(f, more, 8) * (0.6 + 0.4 * Math.sin(f / 5))}><rect x={720 - 115} y={BASE - mFill * TH} width={230} height={Math.max(0, mFill * TH - markY)} rx={10} fill="#FFFFFF" opacity={0.25} /></g>
        <g opacity={on(f, s17, 8)}><text x={300} y={BASE + 50} textAnchor="middle" fill={ZOE_L} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>ZOE'S INTEREST</text></g>
        <g opacity={on(f, s19, 8)}><text x={720} y={BASE + 50} textAnchor="middle" fill={MAX_L} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 2 }}>MAX'S INTEREST</text></g>
        {/* # a 10-year counter between the tanks */}
        <g opacity={win(f, ten, s19, 8) + win(f, same, s21 + 30, 8)}>
          <circle cx={CX + 10} cy={560} r={58} fill={PAPER} stroke="#FFFFFF" strokeWidth={5} />
          <text x={CX + 10} y={578} textAnchor="middle" fill="#2B2340" style={{ font: '400 56px "Bebas Neue"' }}>{f < s19 ? Math.max(1, Math.min(10, Math.round(1 + 9 * span(f, paid, total)))) : Math.max(1, Math.min(10, Math.round(1 + 9 * span(f, same, d242 + 20))))}</text>
          <text x={CX + 10} y={650} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 32px "Bebas Neue"', letterSpacing: 2 }}>YEARS</text>
        </g>
      </g>}
      {/* # the two of them watching their own tank, small at the sides */}
      {T > 0.001 && <g opacity={on(f, s17, 8)}>
        <Person f={f} who="zoe" beats={zB} x={105} y={GROUND + 20} s={0.4} />
        <Person f={f} who="max" beats={mB} x={890} y={GROUND + 20} s={0.4} flip />
      </g>}
      <Vig id="tw-cost" />
      <Headline f={f} lines={[[price, 'EVERY DEBT HAS A PRICE', '#FFFFFF', 88], [s16, 'STEP 2: WHAT IT COSTS', '#FFFFFF', 92], [federal, 'STUDENT LOAN: 6.52%', ZOE_L, 96], [cards, 'CREDIT CARD: ~22%', MAX_L, 96], [more, 'MORE THAN HE BORROWED', MAX_L, 88]]} />
    </g>
  )
}

export const TW_COST = makePiece('tw-cost', 'Step two on the brick street at night: two glass interest tanks drawn to scale with a dashed $16,000 BORROWED line — Zoe’s teal tank (6.52%, $182/MO) fills from a tap for 10 years to $5,800; Max’s coral tank (~22%, $335/MO) pours harder and rises past the borrowed line to $24,200, the part above the line glowing; a YEARS counter ticks 1→10; small Zoe and Max watch at the sides', {
  canvas: 'tall', mood: 'dark', Component: Cost,
  beats: ["s17", "s17:student", "s20:max", "s20:pays", "s17:fixed", "s17:652", "s18:paid", "s18:10", "s18:182", "s18:5800", "s18:total", "s19", "s19:22", "s20:same", "s20:335", "s21", "s21:24200", "s21:more", "s21:borrowed"],
  sfx: [['s17:652', 'ding', 0.15], ['s18:5800', 'coin', 0.15], ['s19:22', 'impact', 0.2], ['s21:more', 'thud', 0.25]] })

// # the same drawing, split so no shot runs past 30 s: TW_PRICE plays s15–s16 (price tag, tag 2, empty tanks appear)
export const TW_PRICE = makePiece('tw-price', 'Every debt has a price, on the brick street at night: a big cash bundle gets a gold PRICE? tag swung onto it on a string; then a paper tag 2 swings in and two empty glass interest tanks (teal for Zoe, coral for Max) rise with their taps', {
  canvas: 'tall', mood: 'dark', Component: Cost,
  beats: ["s15", "s15:half", "s15:story", "s15:debt", "s15:price", "s16", "s16:two", "s16:costs"],
  sfx: [['s15:price', 'pop', 0.2]] })
