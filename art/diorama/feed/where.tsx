// ---------------------------------------------------------------- s14–s20: STEP THREE — where you live changes everything.
// A) the $67 stack splits into very different stacks over a band of regions (a world average). B) two pedestals:
//    WORLDWIDE with a small $13 stack, US & CANADA with a tall $68 stack — ≈ 5× — FACEBOOK · END OF 2023; the tall
//    stack grows to ≈ $227 for the year. C) behind the US pedestal a wall of glowing billboards and businesses
//    (bigger ad markets). D) a ring: 45% of Meta's money from US & Canada users.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Person, type Beat } from '../aimoney/common'
import { FeedWorld, Vig, Headline, Pill, Stack, Pedestal, Biz, Ring, Glint, win, CX, FLOOR, WHITE, PINK, CYAN, GOLD, MINT, VIOLET } from './kit'

const Where: React.FC<PieceProps> = ({ f, c }) => {
  const three = c('s14:three'), live = c('s14:live'), changes = c('s14:changes')
  const d67 = c('s15:67'), world = c('s15:world'), average = c('s15:average'), rich = c('s15:rich'), poorer = c('s15:poorer')
  const split = c('s16:split'), region = c('s16:region'), d2023 = c('s16:2023'), facebook = c('s16:facebook'), worldwide = c('s16:worldwide'), d13 = c('s16:13'), quarter = c('s16:quarter')
  const us = c('s17:us'), canada = c('s17:canada'), d68 = c('s17:68'), five = c('s17:five')
  const whole = c('s18:whole'), d227 = c('s18:227'), users = c('s18:users')
  const markets = c('s19:markets'), bigger = c('s19:bigger'), businesses = c('s19:businesses'), reach = c('s19:reach')
  const today = c('s20:today'), d45 = c('s20:45'), money = c('s20:money'), us20 = c('s20:us')

  const A = win(f, c('s14') - 2, split - 2), B = win(f, split - 2, today - 2), D = on(f, today - 2, 8)
  const regions: [number, string, string][] = [[3, 'POORER', CYAN], [6, '', VIOLET], [10, '', PINK], [16, 'RICH', GOLD]]
  const year = on(f, d227, 24)
  const left: Beat[] = [[split - 2, 'idle', 'neutral'], [d13, 'shrug', 'neutral']]
  const right: Beat[] = [[split - 2, 'idle', 'neutral'], [d68, 'celebrate', 'smiling'], [whole, 'present', 'smiling']]
  return (
    <g>
      <FeedWorld f={f} id="ig-where" />
      {/* # A) one average hides very different places */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={1 - on(f, rich - 4, 10)}><Stack x={CX} y={FLOOR} n={12} s={1.4} glow={1} /><Pill x={CX} y={620} t="$67 = A WORLD AVERAGE" size={48} col={GOLD} tc="#4A2E00" o={on(f, average, 6)} /></g>
        {regions.map(([n, t, col], k) => <g key={k} opacity={on(f, rich - 4 + k * 3, 6)}>
          <Stack x={190 + k * 210} y={FLOOR} n={n * on(f, rich - 4 + k * 3, 14)} s={0.9} />
          <rect x={190 + k * 210 - 80} y={FLOOR + 10} width={160} height={14} rx={7} fill={col} />
          {t && <Pill x={190 + k * 210} y={FLOOR - n * 16 * 0.9 - 70} t={t} size={36} col={col} tc={k === 3 ? '#4A2E00' : WHITE} o={on(f, k === 3 ? rich : poorer, 6)} />}
        </g>)}
        <Glint f={f} at={live} x={CX} y={560} col={GOLD} />
        <Glint f={f} at={changes} x={CX + 200} y={700} col={PINK} />
        <Glint f={f} at={world} x={CX - 200} y={700} col={CYAN} />
        <Glint f={f} at={d67} x={CX + 120} y={900} col={GOLD} />
      </g>}
      {/* # B/C) worldwide vs US & Canada (Facebook, end of 2023) */}
      {B > 0.001 && <g opacity={B}>
        {/* # bigger ad markets: glowing businesses crowd in behind the US pedestal */}
        {[0, 1, 2].map((k) => { const bx = 200, by = 620 + k * 230
          return <g key={k} opacity={on(f, markets + k * 3, 8)}><Biz x={bx} y={by} kind={k as 0 | 1 | 2} s={0.5} />
            {f >= businesses && Array.from({ length: 2 }, (_, i) => { const ph = ((f - businesses) / 22 + i / 2 + k / 3) % 1
              return <circle key={i} cx={lerp(bx + 60, 790, ph)} cy={lerp(by - 60, FLOOR - 460, ph) - Math.sin(Math.PI * ph) * 120} r={16} fill={GOLD} /> })}</g> })}
        <Pedestal x={730} y={FLOOR} w={300} t="US & CANADA" col={PINK} o={on(f, us, 6)} />
        <g opacity={1 - on(f, markets - 4, 10)}><Pedestal x={250} y={FLOOR} w={260} t="WORLDWIDE" col="#3E3490" o={on(f, worldwide, 6)} />
        <g opacity={on(f, worldwide, 6) * (1 - on(f, markets - 4, 10))}><Person f={f} who="investor" beats={left} x={150} y={FLOOR - 70} s={0.5} /></g>
        <g opacity={on(f, d13, 6)}><Stack x={300} y={FLOOR - 70} n={lerp(0, 5, on(f, d13, 14))} s={0.9} /><Pill x={300} y={FLOOR - 230} t="$13" size={56} col="#3E3490" o={on(f, d13 + 4, 6)} /></g></g>
        <g opacity={on(f, us, 6)}><Person f={f} who="investorF" beats={right} x={620} y={FLOOR - 70} s={0.5} /></g>
        <g opacity={on(f, d68, 6)}><Stack x={800} y={FLOOR - 70} n={lerp(0, lerp(25, 34, year), on(f, d68, 18))} s={0.9} glow={on(f, five, 8)} />
          <Pill x={800} y={FLOOR - 70 - lerp(25, 34, year) * 14.4 - 70} t={f >= d227 ? '≈ $227 A YEAR' : '$68'} size={52} col={GOLD} tc="#4A2E00" s={pop(f, d68)} /></g>
        <g opacity={on(f, five, 6) * (1 - on(f, whole, 8))}><Pill x={CX} y={560} t="≈ 5× MORE" size={64} col={PINK} s={pop(f, five)} /></g>
        <g opacity={on(f, d2023, 6) * (1 - on(f, d68, 8))}><Pill x={CX} y={560} t="FACEBOOK · END OF 2023" size={42} col="#3E3490" /></g>
        <Glint f={f} at={region} x={CX} y={640} col={CYAN} />
        <Glint f={f} at={c('s19:meta')} x={800} y={FLOOR - 420} col={GOLD} />
        <Glint f={f} at={c('s19:mainly')} x={600} y={760} col={PINK} />
        <Glint f={f} at={c('s19:ad')} x={960} y={600} col={CYAN} />
        <Glint f={f} at={facebook} x={250} y={FLOOR - 160} col={WHITE} />
        <Glint f={f} at={quarter} x={300} y={FLOOR - 300} col={GOLD} />
        <Glint f={f} at={canada} x={730} y={FLOOR - 120} col={WHITE} />
        <Glint f={f} at={users} x={800} y={FLOOR - 560} col={GOLD} />
        <Glint f={f} at={bigger} x={860} y={640} col={MINT} />
        <Glint f={f} at={businesses} x={600} y={640} col={PINK} />
        <Glint f={f} at={reach} x={720} y={480} col={CYAN} />
      </g>}
      {/* # D) 45% of Meta's money */}
      {D > 0.001 && <g opacity={D}>
        <Ring x={CX} y={800} r={250} p={on(f, d45, 30) * 0.447} col={PINK} t={f >= d45 ? '45%' : ''} sub={f >= us20 ? 'US & CANADA' : f >= money ? "OF META'S MONEY" : ''} s={pop(f, today - 2)} />
        <Glint f={f} at={today} x={CX + 240} y={560} col={GOLD} />
      </g>}
      <Vig id="ig-where" />
      <Headline f={f} lines={[[three, 'STEP 3', GOLD, 120], [live, 'WHERE YOU LIVE MATTERS', WHITE, 92], [split, 'SPLIT BY REGION', WHITE, 104], [d68, 'US & CANADA: $68', PINK, 104], [whole, 'ALL OF 2023', WHITE, 110], [markets, 'BIGGER AD MARKETS', CYAN, 100], [today, 'TODAY', WHITE, 120]]} />
    </g>
  )
}

export const IG_WHERE = makePiece('ig-where', 'Step three: the glowing $67 stack ($67 = A WORLD AVERAGE) splits into four very different stacks over coloured bands from POORER to RICH; then two pedestals — a small indigo WORLDWIDE one with a short $13 stack and a pink US & CANADA one with a tall glowing $68 stack (FACEBOOK · END OF 2023, ≈ 5× MORE) that grows to ≈ $227 A YEAR while little glowing businesses crowd in behind it (bigger ad markets); finally a pink ring fills to 45% — US & CANADA share of Meta\'s money.', {
  canvas: 'tall', mood: 'dark', Component: Where,
  beats: ["s14:three", "s14:live", "s14:changes", "s15:67", "s15:world", "s15:average", "s15:rich", "s15:poorer", "s16:split", "s16:region", "s16:2023", "s16:facebook", "s16:worldwide", "s16:13", "s16:quarter", "s17:us", "s17:canada", "s17:68", "s17:five", "s18:whole", "s18:227", "s18:users", "s19:markets", "s19:bigger", "s19:businesses", "s19:reach", "s20:today", "s20:45", "s20:money", "s20:us", "s14", "s19:meta", "s19:mainly", "s19:ad"],
  sfx: [['s15:rich', 'pop', 0.2], ['s16:13', 'tick', 0.2], ['s17:68', 'ding', 0.25], ['s18:227', 'riser', 0.2], ['s20:45', 'chime', 0.25]] })
