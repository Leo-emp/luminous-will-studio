// ---------------------------------------------------------------- s14–s19: step three — price it like a loan, on a brass scale
// A) left pan: the red $27 fee; right pan: the $24 bag of groceries; a stopwatch: 3 days; the fee side sinks (FEE > GROCERIES)
// B) the bag lifts off, a credit card lands (≈ 22% A YEAR) with $24 on it; its 3-day interest drops in: a 4¢ coin;
//    "27 dollars, against 4 cents": the fee side crashes down, the 4¢ side flies up
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline } from './common'
import { DeskWorld, NightWorld, Vig, Scale, panAt, Tag, Bag, Card, Bills, Penny, Watch, Gauge, Spark, win, swing, drop, CX, RED, INK, BLUE, GOLD, TXT, PAPER } from './kit'

const Price: React.FC<PieceProps> = ({ f, c }) => {
  const s14 = c('s14'), price = c('s14:price'), loan = c('s14:loan')
  const paid = c('s15:paid'), d27 = c('s15:27'), borrow = c('s15:borrow'), d24 = c('s15:24'), three = c('s15:three'), days = c('s15:days')
  const fee = c('s16:fee'), more = c('s16:more'), groceries = c('s16:groceries')
  const compare = c('s17:compare'), credit = c('s17:credit'), average = c('s17:average'), interest = c('s17:interest'), d22 = c('s17:22'), year = c('s17:year')
  const s18 = c('s18'), d24b = c('s18:24'), three18 = c('s18:three'), interest18 = c('s18:interest'), d4 = c('s18:4')
  const s19 = c('s19'), against = c('s19:against'), d4b = c('s19:4')
  // # the beam: level, a small dip toward the fee on "more", then a crash on "against"
  const tilt = lerp(0, -9, on(f, more, 16)) + lerp(0, -13, on(f, against, 14)) + swing(f, more, 2) + swing(f, against, 3)
  const bx = CX, by = 660
  const p = panAt(bx, by, tilt)
  const bagOff = on(f, compare, 14)
  const watchOn = win(f, three, d4 + 40, 8)
  return (
    <g>
      <DeskWorld f={f} id="od-price" />
      <g opacity={on(f, s14, 8)}>
        <Scale x={bx} y={by} tilt={tilt} o={pop(f, price)} />
        {/* left pan: the fee */}
        <g opacity={on(f, d27, 6)} transform={`translate(${p.L.x} ${p.L.y - 14 + drop(f, d27, 200) * (f < d27 + 12 ? 1 : 0)})`}><Tag x={0} y={-150} s={0.95} rot={0} str={18} t="$27" /></g>
        <g opacity={on(f, fee, 6)}><text x={p.L.x} y={p.L.y + 110} textAnchor="middle" fill={RED} style={TXT(52)}>THE FEE</text></g>
        {/* right pan: the groceries, then the credit card */}
        <g opacity={on(f, d24, 6) * (1 - bagOff)} transform={`translate(${p.R.x} ${p.R.y - 6 - 300 * bagOff + drop(f, d24, 200) * (f < d24 + 12 ? 1 : 0)})`}><Bag x={0} y={0} s={0.55} sticker="$24" /></g>
        <g opacity={on(f, groceries, 6) * (1 - bagOff)}><text x={p.R.x} y={p.R.y + 110} textAnchor="middle" fill={INK} style={TXT(52)}>GROCERIES</text></g>
        <g opacity={on(f, credit, 6)} transform={`translate(${p.R.x} ${p.R.y - 8 + drop(f, credit, 220) * (f < credit + 12 ? 1 : 0)})`}>
          <Card x={0} y={-62} s={0.55} col="#6B4FC9" t="CREDIT" />
          <g opacity={on(f, d24b, 8)}><Bills x={-20} y={-122} s={0.3} n={2} /><text x={0} y={-200} textAnchor="middle" fill={INK} style={TXT(44)}>$24</text></g>
          <g opacity={on(f, d4, 6)} transform={`translate(60 ${-150 + drop(f, d4, 160) * (f < d4 + 12 ? 1 : 0)})`}><Penny x={0} y={0} s={0.8} /></g>
        </g>
        <g opacity={on(f, d22, 6)}><text x={p.R.x} y={p.R.y + 110} textAnchor="middle" fill="#4B33A0" style={TXT(52)}>≈ 22% A YEAR</text></g>
        {/* the 3-day stopwatch above the beam */}
        <g opacity={watchOn}><Watch x={bx} y={470} s={0.62 * pop(f, three)} t={0.75 * on(f, days, 26)} /></g>
        <Spark f={f} at={loan} x={bx} y={by} col="#FFFFFF" />
        <Spark f={f} at={paid} x={p.L.x + 90} y={p.L.y - 200} col="#FFFFFF" />
        <Spark f={f} at={borrow} x={p.R.x + 90} y={p.R.y - 200} col="#FFFFFF" />
        <Spark f={f} at={average} x={p.R.x + 100} y={p.R.y - 120} col="#FFFFFF" />
        <Spark f={f} at={interest} x={p.R.x - 90} y={p.R.y - 120} col="#FFFFFF" />
        <Spark f={f} at={year} x={p.R.x + 120} y={p.R.y + 80} col="#FFFFFF" />
        <Spark f={f} at={three18} x={bx + 80} y={420} col="#FFFFFF" />
        <Spark f={f} at={interest18} x={p.R.x + 60} y={p.R.y - 230} col="#FFE08A" />
        <Spark f={f} at={s19} x={p.L.x} y={p.L.y - 200} col="#FFE08A" />
        <Spark f={f} at={d4b} x={p.R.x + 60} y={p.R.y - 160} col="#FFE08A" />
      </g>
      <Vig id="od-price" k={0.22} />
      <Headline f={f} lines={[[price, 'PRICE IT LIKE A LOAN'], [d27, 'PAY $27 …'], [d24, '… TO BORROW $24'], [days, '… FOR 3 DAYS'], [more, 'FEE > GROCERIES', RED], [credit, 'NOW: A CREDIT CARD'], [d22, 'AVERAGE: ≈ 22% A YEAR'], [d4, '$24 FOR 3 DAYS ≈ 4¢'], [c('s19:27'), '$27 …', RED], [against, '$27 VS 4¢', RED]]} until={c('s20') - 4} />
      {void s18}
    </g>
  )
}

// ---------------------------------------------------------------- s20–s21: the yearly rate, on a dial in the night city
// A) a rate dial 0–100%: the credit card needle sits at 22%; the overdraft needle sweeps past the end and cracks the dial
// B) the dial moves up; the watchdog's 2014 report (a clipboard with a shield) gets a $34 tag and writes 17,000%
const Rate: React.FC<PieceProps> = ({ f, c }) => {
  const s20 = c('s20'), yearly = c('s20:yearly'), rate = c('s20:rate'), overdraft = c('s20:overdraft'), works = c('s20:works'), d136 = c('s20:13600')
  const s21 = c('s21'), y2014 = c('s21:2014'), watchdog = c('s21:watchdog'), ran = c('s21:ran'), sum = c('s21:sum'), d34 = c('s21:34'), got = c('s21:got'), d17 = c('s21:17000')
  const sweep = on(f, overdraft, 40)
  const odV = f < overdraft ? 0 : lerp(0, 108, sweep) + (f > d136 ? 1.2 * Math.sin(f / 1.6) * Math.exp(-(f - d136) / 30) : 0)
  const up = on(f, y2014, 18)
  const gx = CX, gy = lerp(1000, 640, up), gs = lerp(1, 0.58, up)
  return (
    <g>
      <NightWorld f={f} id="od-rate" glow={0.3} />
      <g transform={`translate(${gx} ${gy}) scale(${gs * pop(f, s20)}) translate(${-gx} ${-gy})`} opacity={on(f, s20, 8)}>
        <Gauge x={gx} y={gy} r={330} max={100} ticks={[0, 25, 50, 75, 100]} fmt={(v) => `${v}%`} crack={on(f, d136, 10)}
          needles={[{ v: 22.36 * on(f, rate, 14), col: BLUE, o: on(f, rate, 6) }, { v: odV, col: RED, o: on(f, overdraft, 6) }]} />
        {/* labels attached under each needle's side */}
        <g opacity={on(f, rate, 8)}><Card x={gx - 210} y={gy + 90} s={0.3} col="#6B4FC9" t="CREDIT" /><text x={gx - 210} y={gy + 190} textAnchor="middle" fill="#B9C8FF" style={TXT(48)}>CARD ≈ 22%</text></g>
        <g opacity={on(f, overdraft, 8)}><g transform={`translate(${gx + 210} ${gy + 30})`}><Tag x={0} y={0} s={0.55} str={20} t="$27" /></g><text x={gx + 210} y={gy + 190} textAnchor="middle" fill="#FF9A85" style={TXT(48)}>{f >= d136 ? '≈ 13,600%' : 'OVERDRAFT'}</text></g>
        {f >= d136 && f < d136 + 24 && Array.from({ length: 8 }, (_, k) => { const a = -Math.PI / 2 + (k - 3.5) * 0.3, t = (f - d136) / 24; return <line key={k} x1={gx + 360 + 30 * t * Math.cos(a)} y1={gy - 40 + 30 * t * Math.sin(a)} x2={gx + 360 + 80 * t * Math.cos(a)} y2={gy - 40 + 80 * t * Math.sin(a)} stroke={GOLD} strokeWidth={6} strokeLinecap="round" opacity={1 - t} /> })}
      </g>
      {/* B) the watchdog's 2014 sum */}
      <g opacity={on(f, y2014, 8)} transform={`translate(0 ${lerp(500, 0, on(f, y2014, 18))})`}>
        <g transform="translate(450 1090)">
          <rect x={-200} y={-200} width={400} height={360} rx={14} fill="rgba(0,0,0,0.3)" transform="translate(10 12)" />
          <rect x={-200} y={-200} width={400} height={360} rx={14} fill="#8A5A34" />
          <rect x={-176} y={-170} width={352} height={310} rx={6} fill={PAPER} />
          <rect x={-70} y={-222} width={140} height={50} rx={10} fill="#C9CED6" stroke="#6A7080" strokeWidth={4} />
          {/* the watchdog's shield */}
          <g opacity={on(f, watchdog, 8)} transform={`translate(-100 -80) scale(${pop(f, watchdog)})`}><path d="M0 -60 L52 -40 L46 20 Q30 56 0 70 Q-30 56 -46 20 L-52 -40 Z" fill="#2C3F68" /><path d="M0 -40 L32 -28 L28 14 Q18 38 0 48 Z" fill="#FFFFFF" opacity={0.25} /><circle cx={0} cy={4} r={16} fill={GOLD} /></g>
          <text x={60} y={-90} textAnchor="middle" fill={INK} style={TXT(56)}>2014</text>
          <g opacity={on(f, ran, 8)}>{[0, 1].map((k) => <rect key={k} x={-150} y={-10 + k * 36} width={300 - k * 80} height={14} rx={7} fill="#D7DCE4" />)}</g>
          <g opacity={on(f, d17, 6)} transform={`scale(${pop(f, d17)})`}><text x={0} y={120} textAnchor="middle" fill={RED} style={TXT(96)}>17,000%</text></g>
        </g>
        <g opacity={on(f, d34, 6)} transform={`translate(700 ${910 + drop(f, d34, 220)})`}><Tag x={0} y={0} s={0.85} rot={-16 + swing(f, d34)} t="$34" /></g>
        <Spark f={f} at={sum} x={300} y={980} col="#FFE08A" />
        <Spark f={f} at={got} x={640} y={1150} col="#FFE08A" />
      </g>
      <Vig id="od-rate" k={0.35} />
      <Headline f={f} lines={[[yearly, 'AS A YEARLY RATE', '#FFFFFF'], [d136, 'OVERDRAFT: ≈ 13,600%', '#FF9A85'], [y2014, '2014: THE WATCHDOG', '#FFFFFF'], [d34, 'A $34 FEE', '#FFFFFF'], [d17, '→ 17,000% A YEAR', '#FF9A85']]} until={c('s22') - 4} />
      {void works}
    </g>
  )
}

export const OD_PRICE = makePiece('od-price', 'Step three on a warm wooden desk: a brass balance scale — the left pan gets a red $27 tag (THE FEE), the right pan a $24 grocery bag (GROCERIES) under a 3-day stopwatch (PAY $27 … TO BORROW $24 … FOR 3 DAYS); the fee side sinks (FEE > GROCERIES); the bag lifts off and a purple CREDIT card lands with $24 on it (≈ 22% A YEAR), a tiny 4¢ coin drops in ($24 FOR 3 DAYS ≈ 4¢), and on "against" the fee side crashes down ($27 VS 4¢)', {
  canvas: 'tall', mood: 'light', Component: Price, beats: ["s14", "s14:price", "s14:loan", "s15:paid", "s15:27", "s15:borrow", "s15:24", "s15:three", "s15:days", "s16:fee", "s16:more", "s16:groceries", "s17:compare", "s17:credit", "s17:average", "s17:interest", "s17:22", "s17:year", "s18", "s18:24", "s18:three", "s18:interest", "s18:4", "s19", "s19:against", "s19:4", "s20"],
  sfx: [['s15:27', 'thud', 0.3], ['s16:more', 'tick', 0.25], ['s18:4', 'coin', 0.3], ['s19:against', 'thud', 0.35]] })
export const OD_RATE = makePiece('od-rate', 'In the navy night city: a cream YEARLY RATE dial 0–100% (green then red arc) — a blue needle stops at CARD ≈ 22% (purple card under it), a red needle (the $27 tag) sweeps right past 100% and cracks the dial with gold sparks (OVERDRAFT: ≈ 13,600%); then the dial moves up and the watchdog\'s 2014 clipboard rises with a navy shield, a red $34 tag swings on, and 17,000% is written in red (2014: THE WATCHDOG · A $34 FEE · → 17,000% A YEAR)', {
  canvas: 'tall', mood: 'dark', Component: Rate, beats: ["s20", "s20:yearly", "s20:rate", "s20:overdraft", "s20:works", "s20:13600", "s21", "s21:2014", "s21:watchdog", "s21:ran", "s21:sum", "s21:34", "s21:got", "s21:17000", "s22"],
  sfx: [['s20:13600', 'thud', 0.35], ['s21:34', 'pop', 0.25], ['s21:17000', 'riser', 0.3]] })
