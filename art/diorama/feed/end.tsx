// ---------------------------------------------------------------- s21–s25: you pay with your attention.
// A) you scroll the giant phone; two soft beams run from your eyes into the screen (attention) and every AD post
//    that passes pops a coin up to the META tower. B) the scroll speeds up — more ads, more coins. C) a shopping bag
//    marked CUSTOMER beside you gets a cross; the businesses light up as THE CUSTOMERS. D) a gold tag swings on
//    you: ≈ $67 A YEAR — and the feed keeps scrolling (loop to the opening).
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, hand, type Beat } from '../aimoney/common'
import { FeedWorld, Vig, Headline, Pill, Cross, Coin, FeedPhone, Biz, Tower, Glint, win, CX, FLOOR, WHITE, PINK, CYAN, GOLD, TXT } from './kit'

const End: React.FC<PieceProps> = ({ f, c }) => {
  const app = c('s21:app'), free = c('s21:free'), pay = c('s21:pay'), attention = c('s21:attention')
  const extra = c('s22:extra'), minute = c('s22:minute'), scroll = c('s22:scroll'), ads = c('s22:ads'), money = c('s22:money')
  const next = c('s24:next'), customer = c('s24:customer'), advertisers = c('s24:advertisers')
  const average = c('s25:average'), worth = c('s25:worth'), d67 = c('s25:67'), year = c('s25:year')

  const A = win(f, c('s21') - 2, next - 2), B = on(f, next - 2, 8)
  const speed = lerp(5, 14, on(f, extra, 20))
  const t0 = c('s21') - 2
  const sc = (f - t0) * speed
  const you: Beat[] = [[t0, 'phone', 'neutral'], [pay, 'phone', 'thinking']]
  const eye = { x: 260, y: FLOOR - 0.7 * 560 }
  const you2: Beat[] = [[next - 2, 'phone', 'smiling'], [c('s24:ten'), 'think', 'thinking'], [customer, 'shrug', 'thinking'], [average, 'phone', 'smiling']]
  const hp = hand(f, you2, 230, FLOOR, 0.72)
  return (
    <g>
      <FeedWorld f={f} id="ig-end" />
      {A > 0.001 && <g opacity={A}>
        <Tower x={880} y={FLOOR - 0} s={0.55} t="META" lit={on(f, money, 30)} o={on(f, ads - 30, 8)} />
        <FeedPhone x={560} y={780} s={0.72} f={f} scroll={sc} adEvery={3} adGlow={on(f, ads, 8)} />
        {/* # attention beams from your eyes into the screen */}
        <g opacity={on(f, attention, 10) * (0.6 + 0.3 * Math.sin(f / 5))}>
          <path d={`M${eye.x + 30} ${eye.y - 10} L${380} ${560} L${380} ${960} Z`} fill={CYAN} opacity={0.22} />
        </g>
        {/* # coins popping from ad posts up to the tower */}
        {f >= ads - 30 && Array.from({ length: 4 }, (_, i) => { const per = lerp(40, 18, on(f, extra, 20)), ph = ((f - ads + 30) / per + i / 4) % 1
          return <Coin key={i} x={lerp(600, 880, ph)} y={lerp(800, FLOOR - 400, ph) - Math.sin(Math.PI * ph) * 160} s={0.5} o={on(f, ads - 30, 8)} /> })}
        <Person f={f} who="investorF" beats={you} x={220} y={FLOOR} s={0.7} />
        <g opacity={on(f, free, 6) * (1 - on(f, pay, 8))}><Pill x={CX} y={1180} t="FREE?" size={52} col={PINK} /></g>
        <Glint f={f} at={app} x={560} y={420} col={PINK} />
        <Glint f={f} at={minute} x={560} y={600} col={GOLD} />
        <Glint f={f} at={scroll} x={560} y={1000} col={CYAN} />
        <Glint f={f} at={c('s22:means')} x={700} y={700} col={GOLD} />
        <Glint f={f} at={c('s22:seen')} x={480} y={900} col={GOLD} />
        <Glint f={f} at={c('s22:every#2')} x={760} y={560} col={PINK} />
      </g>}
      {B > 0.001 && <g opacity={B}>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, advertisers + k * 3, 8)}><Biz x={600 + k * 150} y={[820, 700, 820][k]} kind={k as 0 | 1 | 2} s={0.55} /></g>)}
        <g opacity={on(f, advertisers + 6, 6) * (1 - on(f, average, 8))}><Pill x={750} y={980} t="THE CUSTOMERS" size={44} col={CYAN} tc="#06303A" /></g>
        <Person f={f} who="investorF" beats={you2} x={230} y={FLOOR} s={0.72} />
        {/* # the shopping bag that isn't yours */}
        <g opacity={on(f, c('s24:remember'), 6) * (1 - on(f, average, 8))} transform={`translate(430 ${FLOOR})`}>
          <path d="M-70 0 L-80 -170 L80 -170 L70 0 Z" fill={PINK} /><path d="M-40 -170 Q-40 -230 0 -230 Q40 -230 40 -170" fill="none" stroke={PINK} strokeWidth={10} />
          <text y={-70} textAnchor="middle" fill={WHITE} style={TXT(34)}>CUSTOMER</text>
          <g opacity={on(f, customer + 6, 6)}><Cross x={0} y={-90} s={0.75} /></g>
        </g>
        {/* # the $67 tag */}
        <g opacity={on(f, d67, 6)}>
          <line x1={hp.x} y1={hp.y} x2={hp.x + 120} y2={hp.y - 160} stroke={WHITE} strokeWidth={3} />
          <g transform={`translate(${hp.x + 190} ${hp.y - 230}) rotate(${-6 + Math.sin((f - d67) / 7) * 4}) scale(${pop(f, d67)})`}><rect x={-170} y={-60} width={340} height={120} rx={20} fill={GOLD} /><text y={30} textAnchor="middle" fill="#4A2E00" style={TXT(84)}>≈ $67</text></g>
          <g opacity={on(f, year, 6)}><Pill x={hp.x + 190} y={hp.y - 120} t="A YEAR, ON AVERAGE" size={36} col="#3E3490" /></g>
        </g>
        <Glint f={f} at={worth} x={hp.x + 300} y={hp.y - 300} col={GOLD} />
      </g>}
      <Vig id="ig-end" />
      <Headline f={f} lines={[[app, "IT'S NOT REALLY FREE", WHITE, 100], [attention, 'YOU PAY WITH ATTENTION', CYAN, 92], [extra, 'MORE SCROLL = MORE ADS', WHITE, 96], [money, '= MONEY FOR META', GOLD, 104], [customer, "YOU'RE NOT THE CUSTOMER", WHITE, 92], [average, "WHAT YOU'RE WORTH", GOLD, 104]]} />
    </g>
  )
}

export const IG_END = makePiece('ig-end', 'The payoff: you scroll the giant glowing phone while a soft cyan beam runs from your eyes into the screen (you pay with attention); every gold AD post that passes pops a coin that arcs up to a small META tower, faster and faster as the scroll speeds up; then a pink shopping bag marked CUSTOMER beside you gets a red cross while three little glowing businesses light up as THE CUSTOMERS; finally a big gold ≈ $67 tag swings from your hand — A YEAR, ON AVERAGE.', {
  canvas: 'tall', mood: 'dark', Component: End,
  beats: ["s21:app", "s21:free", "s21:pay", "s21:attention", "s22:extra", "s22:minute", "s22:scroll", "s22:ads", "s22:money", "s24:next", "s24:customer", "s24:advertisers", "s25:average", "s25:worth", "s25:67", "s25:year", "s21", "s24:ten", "s22:means", "s22:seen", "s22:every#2", "s24:remember"],
  sfx: [['s21:attention', 'swish', 0.2], ['s22:money', 'cash', 0.25], ['s24:customer', 'thud', 0.25], ['s25:67', 'chime', 0.3]] })
